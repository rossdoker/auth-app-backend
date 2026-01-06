import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: unknown): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === 'string' || typeof value === 'number') {
      return new Date(value).toISOString();
    }
    throw new Error(
      'Date Scalar serializer expected a `Date`, `string` or `number` object',
    );
  },
  parseValue(value: unknown): Date {
    if (typeof value === 'string' || typeof value === 'number') {
      return new Date(value);
    }
    throw new Error(
      'GraphQL Date Scalar parser expected a `string` or `number`',
    );
  },
  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
      return new Date(
        ast.kind === Kind.INT ? parseInt(ast.value, 10) : ast.value,
      );
    }
    return null;
  },
});
