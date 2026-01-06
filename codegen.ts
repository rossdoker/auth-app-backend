import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/graphql/schema.graphql',
  generates: {
    'src/graphql/generated/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../setup.js#GraphQLContext',
        scalars: {
          ID: 'string | number',
          Date: 'Date | string',
        },
        useTypeImports: true,
        inputMaybeValue: 'undefined | T',
        enumValues: {
          Role: '@prisma/client#Role',
          Gender: '@prisma/client#Gender',
          PhoneStatus: '@/schemas/adminSchemas.js#PhoneStatus',
        },
      },
    },
  },
};

export default config;
