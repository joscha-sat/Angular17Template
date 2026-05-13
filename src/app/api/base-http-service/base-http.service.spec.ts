import type { MockedObject } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GenericHttpService } from './base-http.service';
import { ToastService } from '../../services/toast.service';

interface TestModel {
  id: number;
  name?: string;
}

class TestClassModel {
  id!: number;
  name?: string;

  constructor(data: Partial<TestClassModel>) {
    Object.assign(this, data);
  }
}

describe('GenericHttpService', () => {
  let service: GenericHttpService;
  let httpMock: HttpTestingController;
  let snackBarMock: MockedObject<ToastService>;

  beforeEach(() => {
    snackBarMock = {
      openSnackBar: vi.fn(),
    } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ToastService, useValue: snackBarMock }],
    });

    service = TestBed.inject(GenericHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUrl', () => {
    it('should return base URL with endpoint', () => {
      const url = service.getUrl('users');
      expect(url).toBe('https://nest.template.dev.28apps-software.de/users');
    });

    it('should return base URL with endpoint and ID', () => {
      const url = service.getUrl('users', '123');
      expect(url).toBe('https://nest.template.dev.28apps-software.de/users/123');
    });

    it('should handle numeric IDs', () => {
      const url = service.getUrl('users', 123);
      expect(url).toBe('https://nest.template.dev.28apps-software.de/users/123');
    });

    it('should handle array of IDs', () => {
      const url = service.getUrl('users', ['123', '456']);
      expect(url).toBe('https://nest.template.dev.28apps-software.de/users/123,456');
    });
  });

  describe('getAll', () => {
    it('should fetch all records without model type', () => {
      const mockResponse = { total: 2, records: [{ id: 1 }, { id: 2 }] };

      service.getAll<TestModel>('users').subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://nest.template.dev.28apps-software.de/users');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch all records with query parameters', () => {
      const mockResponse = { total: 1, records: [{ id: 1 }] };
      const queryParams = { skip: 0, limit: 10, search: 'test' };

      service.getAll<TestModel>('users', queryParams).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        'https://nest.template.dev.28apps-software.de/users?skip=0&limit=10&search=test',
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should map records to model type when provided', () => {
      const mockResponse = { total: 1, records: [{ id: 1 }] };

      service.getAll<TestClassModel>('users', undefined, TestClassModel).subscribe((response) => {
        expect(response.records[0]).toBeInstanceOf(TestClassModel);
        expect(response.records[0].id).toBe(1);
      });

      const req = httpMock.expectOne('https://nest.template.dev.28apps-software.de/users');
      req.flush(mockResponse);
    });
  });

  describe('getOne', () => {
    it('should fetch single record without model type', () => {
      const mockResponse = { id: 1, name: 'Test' };

      service.getOne<TestModel>('users', '1').subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://nest.template.dev.28apps-software.de/users/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should map record to model type when provided', () => {
      const mockResponse = { id: 1, name: 'Test' };

      service.getOne<TestClassModel>('users', '1', TestClassModel).subscribe((response) => {
        expect(response).toBeInstanceOf(TestClassModel);
        expect(response.id).toBe(1);
      });

      const req = httpMock.expectOne('https://nest.template.dev.28apps-software.de/users/1');
      req.flush(mockResponse);
    });
  });

  describe('createOne', () => {
    it('should create single record', () => {
      const mockBody = { id: 1, name: 'New User' };
      const mockResponse = { id: 1, name: 'New User' };

      service.createOne<TestModel>('users', mockBody, 'user').subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://nest.template.dev.28apps-software.de/users');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockBody);
      req.flush(mockResponse);

      expect(snackBarMock.openSnackBar).toHaveBeenCalled();
    });
  });

  describe('updateOne', () => {
    it('should update single record', () => {
      const mockBody = { id: 1, name: 'Updated User' };
      const mockResponse = { id: 1, name: 'Updated User' };

      service.updateOne<TestModel>('users', mockBody, '1', 'user').subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://nest.template.dev.28apps-software.de/users/1');
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(mockBody);
      req.flush(mockResponse);

      expect(snackBarMock.openSnackBar).toHaveBeenCalled();
    });
  });

  describe('deleteOne', () => {
    it('should delete single record', () => {
      const mockResponse = { success: true };

      service.deleteOne('users', '1', 'user').subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://nest.template.dev.28apps-software.de/users/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);

      expect(snackBarMock.openSnackBar).toHaveBeenCalled();
    });
  });

  describe('deleteAll', () => {
    it('should delete all records', () => {
      const mockResponse = { success: true };

      service.deleteAll<TestModel>('users').subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://nest.template.dev.28apps-software.de/users');
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });
  });

  describe('signals', () => {
    it('should have search signal', () => {
      expect(service.search()).toBe('');
      service.search.set('test search');
      expect(service.search()).toBe('test search');
    });

    it('should have searchDate signal', () => {
      expect(service.searchDate()).toBe('');
      service.searchDate.set('2023-01-01');
      expect(service.searchDate()).toBe('2023-01-01');
    });

    it('should have tabValueActive signal', () => {
      expect(service.tabValueActive()).toBeUndefined();
      service.tabValueActive.set(true);
      expect(service.tabValueActive()).toBe(true);
    });
  });

  describe('refreshObservable', () => {
    it('should emit refresh events on successful operations', () => {
      const spy = vi.fn();
      service.refreshObservable$.subscribe(spy);

      service.createOne<TestModel>('users', { id: 1, name: 'Test' }, 'user').subscribe();

      const req = httpMock.expectOne('https://nest.template.dev.28apps-software.de/users');
      req.flush({ id: 1, name: 'Test' });

      expect(spy).toHaveBeenCalled();
    });
  });
});
