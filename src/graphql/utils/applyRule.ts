import { chain } from 'graphql-shield';

type ShieldRule = Parameters<typeof chain>[number];

export const applyRule = (rule: ShieldRule, fields: string[]) => {
  return fields.reduce(
    (acc, field) => {
      acc[field] = rule;
      return acc;
    },
    {} as Record<string, ShieldRule>,
  );
};
