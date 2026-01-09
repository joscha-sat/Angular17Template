import type { MockedObject } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpStatusMsgService } from './http-status-msg.service';
import { ApiRoutes } from '../../other/enums/api_routes';

describe('HttpStatusMsgService', () => {
  let service: HttpStatusMsgService;
  let translateServiceSpy: MockedObject<TranslateService>;
  let injector: Injector;

  beforeEach(() => {
    const spy = {
      instant: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        HttpStatusMsgService,
        { provide: TranslateService, useValue: spy },
        Injector,
      ],
    });

    service = TestBed.inject(HttpStatusMsgService);
    translateServiceSpy = TestBed.inject(
      TranslateService,
    ) as MockedObject<TranslateService>;
    injector = TestBed.inject(Injector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getStatusErrorMessage', () => {
    it('should return translated message when error key is provided', () => {
      const error = new HttpErrorResponse({
        error: { key: 'TEST_ERROR' },
        status: 400,
      });
      translateServiceSpy.instant.mockReturnValue('Translated error message');

      const result = service.getStatusErrorMessage(
        error,
        'POST',
        ApiRoutes.USER,
      );

      expect(translateServiceSpy.instant).toHaveBeenCalledWith(
        'http-error.user.post_test_error',
      );
      expect(result).toBe('Translated error message');
    });

    it('should return generic translated message when specific translation not found', () => {
      const error = new HttpErrorResponse({
        error: { key: 'TEST_ERROR' },
        status: 400,
      });
      translateServiceSpy.instant.mockImplementation((key) => {
        if (key === 'http-error.user.post_test_error') {
          return 'http-error.user.post_test_error';
        }
        if (key === 'http-error.test_error') {
          return 'Generic translated message';
        }
        return key;
      });

      const result = service.getStatusErrorMessage(
        error,
        'POST',
        ApiRoutes.USER,
      );

      expect(translateServiceSpy.instant).toHaveBeenCalledWith(
        'http-error.user.post_test_error',
      );
      expect(translateServiceSpy.instant).toHaveBeenCalledWith(
        'http-error.test_error',
      );
      expect(result).toBe('Generic translated message');
    });

    it('should return error message when no translation found', () => {
      const error = new HttpErrorResponse({
        error: { message: 'Direct error message' },
        status: 400,
      });
      translateServiceSpy.instant.mockReturnValue('translation-key');

      const result = service.getStatusErrorMessage(error);

      expect(result).toBe('Direct error message');
    });

    it('should return status message when no error message or translation found', () => {
      const error = new HttpErrorResponse({
        status: 404,
      });
      translateServiceSpy.instant.mockReturnValue('Not Found');

      const result = service.getStatusErrorMessage(error);

      expect(translateServiceSpy.instant).toHaveBeenCalledWith(
        'generic-http-error.status-404',
      );
      expect(result).toBe('Not Found');
    });

    it('should return default message for unknown status code', () => {
      const error = new HttpErrorResponse({
        status: 999,
      });
      translateServiceSpy.instant.mockReturnValue('translation-key');

      const result = service.getStatusErrorMessage(error);

      expect(result).toBe('Unknown error, status code 999.');
    });

    it('should handle empty error key', () => {
      const error = new HttpErrorResponse({
        error: { key: '' },
        status: 400,
      });
      translateServiceSpy.instant.mockReturnValue('Bad Request');

      const result = service.getStatusErrorMessage(error);

      expect(translateServiceSpy.instant).toHaveBeenCalledWith(
        'generic-http-error.status-400',
      );
      expect(result).toBe('Bad Request');
    });

    it('should handle undefined error object', () => {
      const error = new HttpErrorResponse({
        error: undefined,
        status: 400,
      });
      translateServiceSpy.instant.mockReturnValue('Bad Request');

      const result = service.getStatusErrorMessage(error);

      expect(translateServiceSpy.instant).toHaveBeenCalledWith(
        'generic-http-error.status-400',
      );
      expect(result).toBe('Bad Request');
    });
  });

  describe('getEndpointFromError', () => {
    it('should extract endpoint from URL', () => {
      const error = new HttpErrorResponse({
        url: 'https://example.com/api/users',
      });

      const result = service.getEndpointFromError(error);

      expect(result).toBe('users');
    });

    it('should extract endpoint before UUID when UUID is present', () => {
      const error = new HttpErrorResponse({
        url: 'https://example.com/api/users/123e4567-e89b-12d3-a456-426614174000',
      });

      const result = service.getEndpointFromError(error);

      expect(result).toBe('users');
    });

    it('should return undefined when no URL is provided', () => {
      const error = new HttpErrorResponse({});

      const result = service.getEndpointFromError(error);

      expect(result).toBeUndefined();
    });

    it('should handle empty URL', () => {
      const error = new HttpErrorResponse({
        url: '',
      });

      const result = service.getEndpointFromError(error);

      expect(result).toBeUndefined();
    });

    it('should handle URL with multiple segments', () => {
      const error = new HttpErrorResponse({
        url: 'https://example.com/api/v1/customers/123/orders',
      });

      const result = service.getEndpointFromError(error);

      expect(result).toBe('orders');
    });

    it('should handle URL with trailing slash', () => {
      const error = new HttpErrorResponse({
        url: 'https://example.com/api/users/',
      });

      const result = service.getEndpointFromError(error);

      expect(result).toBe('users');
    });
  });
});
