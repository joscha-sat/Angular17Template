import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpHeaders, HttpRequest, } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';
import { errorInterceptor } from './error.interceptor';
import { HttpStatusMsgService } from '../../api/base-error-messages/http-status-msg.service';
import { MatSnackbarService, SnackBarData, } from '../../services/mat-snackbar.service';

describe('errorInterceptor', () => {
  let statusTranslationServiceMock: any;
  let snackbarServiceMock: any;
  let mockRequest: HttpRequest<unknown>;

  beforeEach(() => {
    statusTranslationServiceMock = {
      getStatusErrorMessage: vi.fn(),
    };

    snackbarServiceMock = {
      openSnackBar: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpStatusMsgService,
          useValue: statusTranslationServiceMock,
        },
        { provide: MatSnackbarService, useValue: snackbarServiceMock },
      ],
    });

    TestBed.runInInjectionContext(() => {
      errorInterceptor(mockRequest, nextMock);
    }).subscribe();
  });

  it('should pass through successful requests', () => {
    const mockResponse = { body: 'success' };
    const nextMock = vi.fn().mockReturnValue(of(mockResponse));

    TestBed.runInInjectionContext(() => {
      errorInterceptor(mockRequest, nextMock);
    }).subscribe();
    });

    expect(nextMock).toHaveBeenCalledWith(mockRequest);
    expect(snackbarServiceMock.openSnackBar).not.toHaveBeenCalled();
  });

  it('should show snackbar with translated error message on HTTP error', () => {
    const error = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      url: '/test',
    });
    const translatedMessage = 'Resource not found';
    statusTranslationServiceMock.getStatusErrorMessage.mockReturnValue(
      translatedMessage,
    );

    const nextMock = vi.fn().mockReturnValue(() => throwError(() => error));

    TestBed.runInInjectionContext(() => {
      errorInterceptor(mockRequest, nextMock);
    })
      .pipe(catchError(() => of(null)))
      .subscribe();

    const expectedPayload: SnackBarData = {
      errorStatus: 404,
      i18nKeyOrMessage: translatedMessage,
    };

    expect(
      statusTranslationServiceMock.getStatusErrorMessage,
    ).toHaveBeenCalledWith(error, mockRequest.method);
    expect(snackbarServiceMock.openSnackBar).toHaveBeenCalledWith(
      expect.any(Function), // ApiSnackbarComponent
      'error',
      expectedPayload,
    );
  });

  it('should use default error message when translation service returns empty', () => {
    const error = new HttpErrorResponse({
      error: { message: 'Server error occurred' },
      status: 500,
      statusText: 'Internal Server Error',
      url: '/test',
    });
    statusTranslationServiceMock.getStatusErrorMessage.mockReturnValue('');

    const nextMock = vi.fn().mockReturnValue(() => throwError(() => error));

    TestBed.runInInjectionContext(() => {
      errorInterceptor(mockRequest, nextMock);
    })
      .pipe(catchError(() => of(null)))
      .subscribe();

    const expectedPayload: SnackBarData = {
      errorStatus: 500,
      i18nKeyOrMessage: 'Server error occurred',
    };

    expect(snackbarServiceMock.openSnackBar).toHaveBeenCalledWith(
      expect.any(Function),
      'error',
      expectedPayload,
    );
  });

  it('should use fallback message when no translation and no error message', () => {
    const error = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
      url: '/test',
    });
    statusTranslationServiceMock.getStatusErrorMessage.mockReturnValue('');

    const nextMock = vi.fn().mockReturnValue(() => throwError(() => error));

    TestBed.runInInjectionContext(() => {
      errorInterceptor(mockRequest, nextMock);
    })
      .pipe(catchError(() => of(null)))
      .subscribe();

    const expectedPayload: SnackBarData = {
      errorStatus: 500,
      i18nKeyOrMessage: 'unknown error',
    };

    expect(snackbarServiceMock.openSnackBar).toHaveBeenCalledWith(
      expect.any(Function),
      'error',
      expectedPayload,
    );
  });

  it('should include HTTP method in status translation call', () => {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const postRequest = new HttpRequest(
      'POST',
      '/test',
      {},
      {
        headers: headers,
      },
    );
    const httpError = new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request',
      url: '/test',
    });
    const translatedMessage = 'Bad request';
    statusTranslationServiceMock.getStatusErrorMessage.mockReturnValue(
      translatedMessage,
    );

    const nextMock = vi.fn().mockReturnValue(() => throwError(() => httpError));

    TestBed.runInInjectionContext(() => {
      errorInterceptor(postRequest, nextMock);
    })
      .pipe(catchError(() => of(null)))
      .subscribe();

    expect(
      statusTranslationServiceMock.getStatusErrorMessage,
    ).toHaveBeenCalledWith(httpError, 'POST');
  });

  it('should still throw error after showing snackbar', () => {
    const error = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      url: '/test',
    });
    statusTranslationServiceMock.getStatusErrorMessage.mockReturnValue(
      'Not found',
    );

    const nextMock = vi.fn().mockReturnValue(() => throwError(() => error));

    TestBed.runInInjectionContext(() => {
      errorInterceptor(mockRequest, nextMock);
    }).subscribe({
      next: () => expect.fail('Should have failed'),
      error: (err: any) => {
        expect(err).toBe(error);
        expect(snackbarServiceMock.openSnackBar).toHaveBeenCalled();
      },
    });
  });
})
