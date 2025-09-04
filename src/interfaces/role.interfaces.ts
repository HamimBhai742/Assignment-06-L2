export const Role = {
  USER: 'user',
  AGENT: 'agent',
  ADMIN: 'admin',
} as const;

export type Role = typeof Role[keyof typeof Role];
