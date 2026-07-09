import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';
import { mockCustomer, mockCustomerRoute } from '../mock/mock-customer';
import { mockRole, mockRoleRoute } from '../mock/mock-role';
import { mockTenant, mockTenantRoute } from '../mock/mock-tenant';
import { mockUser, mockUserRoute } from '../mock/mock-user';
import { MockResource } from '../mock/mock-resource';

const mockResources: Record<string, MockResource> = {
  [mockTenantRoute]: mockTenant,
  [mockUserRoute]: mockUser,
  [mockCustomerRoute]: mockCustomer,
  [mockRoleRoute]: mockRole,
};

export const mockApiInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const requestPath: string = getRequestPath(request.url);
  const [resourcePath, resourceId] = requestPath.split('/');
  const resource: MockResource | undefined = mockResources[resourcePath];

  if (!resource) {
    return next(request);
  }

  return of(resource.handleRequest(request, resourceId));
};

function getRequestPath(requestUrl: string): string {
  const url: URL = new URL(requestUrl, 'http://mock.local');
  return url.pathname
    .replace(/^\//, '')
    .replace(/^api\//, '')
    .replace(/\/$/, '');
}
