import { z } from 'zod';

export type AuthenticatedUserResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export const authenticatedUserSchema: z.ZodType<AuthenticatedUserResponse> = z
  .object({
    id: z.string().min(1),
    email: z.email(),
    firstName: z.string(),
    lastName: z.string(),
  })
  .passthrough();

export type LoginResponsePayload = {
  access_token: string;
  refresh_token: string;
  user: AuthenticatedUserResponse;
};

export const loginResponseSchema: z.ZodType<LoginResponsePayload> = z.object({
  access_token: z.string().min(1),
  refresh_token: z.string().min(1),
  user: authenticatedUserSchema,
});

export type RefreshTokenResponsePayload = {
  status: number;
  data: {
    access: string;
    refresh: string;
    user: AuthenticatedUserResponse;
  };
};

export const refreshTokenResponseSchema: z.ZodType<RefreshTokenResponsePayload> = z.object({
  status: z.number().int(),
  data: z.object({
    access: z.string().min(1),
    refresh: z.string().min(1),
    user: authenticatedUserSchema,
  }),
});
