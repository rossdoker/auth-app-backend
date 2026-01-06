import { Application } from 'express';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { readFileSync } from 'fs';
import { join } from 'path';
import { resolvers } from './resolvers/index.js';
import { AppError } from '@/exceptions/AppError.js';
import { authenticateTokenService } from '@/services/auth/index.js';
import { Role } from '@prisma/client';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './permissions/index.js';

export interface GraphQLContext {
  user: { id: number; role: Role } | null;
  otpCode?: string;
}

const typeDefs = readFileSync(
  join(import.meta.dirname, 'schema.graphql'),
  'utf-8',
);

export const setupGraphQL = async (app: Application) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  const schemaWithPermissions = applyMiddleware(schema, permissions);

  const apolloServer = new ApolloServer({
    schema: schemaWithPermissions,
    formatError: (formattedError, error) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const originalError = (error as any).originalError;
      if (originalError instanceof AppError) {
        return {
          ...formattedError,
          extensions: {
            code: originalError.code,
            httpStatus: originalError.statusCode,
          },
        };
      }
      return formattedError;
    },
  });

  await apolloServer.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const context: GraphQLContext = {
          otpCode: (req.headers['x-otp-code'] as string) || undefined,
          user: null,
        };

        try {
          const { userId, role } = authenticateTokenService(
            req.headers.authorization,
          );
          context.user = { id: userId, role };
          return context;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          return context;
        }
      },
    }),
  );

  console.log('🚀 GraphQL is ready at /graphql');
};
