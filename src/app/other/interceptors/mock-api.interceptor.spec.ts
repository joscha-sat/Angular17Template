import '@angular/compiler';
import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { firstValueFrom, of } from 'rxjs';
import { describe, expect, it } from 'vitest';
import { mockApiInterceptor } from './mock-api.interceptor';

describe('mockApiInterceptor', () => {
  it('forwards non-API requests such as translation assets', async () => {
    const response: HttpResponse<unknown> = await executeRequest(new HttpRequest('GET', '/assets/i18n/de.json'), () =>
      of(new HttpResponse({ status: 200, body: { translation: 'Übersetzung' } })),
    );

    expect(response.body).toEqual({ translation: 'Übersetzung' });
  });

  it('returns the default tenant data without calling the backend', async () => {
    const response: HttpResponse<unknown> = await executeRequest(new HttpRequest('GET', 'http://mock.local/tenant'));

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      total: 3,
      records: [
        expect.objectContaining({
          id: 'tenant-1',
          name: 'Demo Tenant',
        }),
        expect.objectContaining({ id: 'tenant-2' }),
        expect.objectContaining({ id: 'tenant-3' }),
      ],
    });
  });

  it.each(['tenant', 'user', 'customers', 'role'])('provides at least three %s records', async (resourcePath) => {
    const response: HttpResponse<unknown> = await executeRequest(
      new HttpRequest('GET', `http://mock.local/${resourcePath}`),
    );
    const responseBody = response.body as { total: number; records: unknown[] };

    expect(responseBody.total).toBeGreaterThanOrEqual(3);
    expect(responseBody.records).toHaveLength(responseBody.total);
  });

  it('simulates create, update, and delete operations in memory', async () => {
    const createdResponse: HttpResponse<unknown> = await executeRequest(
      new HttpRequest('POST', 'http://mock.local/customers', { name: 'Temporary Customer' }),
    );
    const createdCustomer = createdResponse.body as { id: string };

    expect(createdResponse.status).toBe(201);
    expect(createdCustomer.id).toMatch(/^mock-/);

    const updatedResponse: HttpResponse<unknown> = await executeRequest(
      new HttpRequest('PATCH', `http://mock.local/customers/${createdCustomer.id}`, {
        name: 'Updated Customer',
      }),
    );

    expect(updatedResponse.status).toBe(200);
    expect(updatedResponse.body).toEqual(expect.objectContaining({ name: 'Updated Customer' }));

    const deletedResponse: HttpResponse<unknown> = await executeRequest(
      new HttpRequest('DELETE', `http://mock.local/customers/${createdCustomer.id}`),
    );

    expect(deletedResponse.status).toBe(204);

    const listResponse: HttpResponse<unknown> = await executeRequest(
      new HttpRequest('GET', 'http://mock.local/customers'),
    );

    expect(listResponse.body).toEqual({
      total: 3,
      records: [
        expect.objectContaining({ id: 'customer-1' }),
        expect.objectContaining({ id: 'customer-2' }),
        expect.objectContaining({ id: 'customer-3' }),
      ],
    });
  });
});

async function executeRequest(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn = () => {
    throw new Error('The mock interceptor must not call the backend.');
  },
): Promise<HttpResponse<unknown>> {
  return firstValueFrom(mockApiInterceptor(request, next) as ReturnType<typeof mockApiInterceptor>) as Promise<
    HttpResponse<unknown>
  >;
}
