import { z } from 'zod';
import type { User } from '../../models/User';
import type { ApiResponseSchema } from './common.schemas';
import { createUserResponseSchema } from './resource.schemas';

const TEST_LOGIN_USERNAME: string = 'admin';
const authenticatedUserEmailSchema: z.ZodType<string> = z.union([z.email(), z.literal(TEST_LOGIN_USERNAME)]);

const authUserResponseSchema: ApiResponseSchema<User> = createUserResponseSchema(authenticatedUserEmailSchema);

export type AuthenticatedUserResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export const authenticatedUserSchema: z.ZodType<AuthenticatedUserResponse> = z
  .object({
    id: z.string().min(1),
    email: authenticatedUserEmailSchema,
    firstName: z.string(),
    lastName: z.string(),
  })
  .catchall(z.any());

export type LoginResponsePayload = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export const loginResponseSchema: z.ZodType<LoginResponsePayload> = z.object({
  access_token: z.string().min(1),
  refresh_token: z.string().min(1),
  user: authUserResponseSchema,
});

export type RefreshTokenResponsePayload = {
  status: number;
  data: {
    access: string;
    refresh: string;
    user: User;
  };
};

export const refreshTokenResponseSchema: z.ZodType<RefreshTokenResponsePayload> = z.object({
  status: z.number().int(),
  data: z.object({
    access: z.string().min(1),
    refresh: z.string().min(1),
    user: authUserResponseSchema,
  }),
});
