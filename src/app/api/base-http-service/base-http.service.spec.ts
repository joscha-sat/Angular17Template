import type { MockedObject } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GenericHttpService } from './base-http.service';
import { MatSnackbarService } from '../../services/mat-snackbar.service';

describe('GenericHttpService', () => {
  let service: GenericHttpService;
  let httpMock: HttpTestingController;
  let snackBarMock: MockedObject<MatSnackbarService>;

  beforeEach(() => {
    snackBarMock = {
      openSnackBar: vi.fn(),
    } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: MatSnackbarService, useValue: snackBarMock }],
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
      expect(url).toBe(
        'https://nest.template.dev.28apps-software.de/users/123',
      );
    });

    it('should handle numeric IDs', () => {
      const url = service.getUrl('users', 123);
      expect(url).toBe(
        'https://nest.template.dev.28apps-software.de/users/123',
      );
    });

    it('should handle array of IDs', () => {
      const url = service.getUrl('users', ['123', '456']);
      expect(url).toBe(
        'https://nest.template.dev.28apps-software.de/users/123,456',
      );
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
});
