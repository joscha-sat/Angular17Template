import { z } from 'zod';

export type ApiResponseSchema<T> = z.ZodType<T>;

export type PaginatedApiResponse<T> = {
  total: number;
  records: T[];
};

export const createPaginatedResponseSchema = <T>(
  recordSchema: ApiResponseSchema<T>,
): ApiResponseSchema<PaginatedApiResponse<T>> =>
  z.object({
    total: z.number().int().nonnegative(),
    records: z.array(recordSchema),
  });

export type DeleteResponse = {
  affected: number;
};

export const deleteResponseSchema: ApiResponseSchema<DeleteResponse> = z.object({
  affected: z.number().int().nonnegative(),
});

export type EmptyDeleteResponse = Record<string, unknown> | null;

export const emptyDeleteResponseSchema: ApiResponseSchema<EmptyDeleteResponse> = z
  .record(z.string(), z.unknown())
  .nullable();
