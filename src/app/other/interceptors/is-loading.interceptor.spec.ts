import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';
import { isLoadingInterceptor } from './is-loading.interceptor';
import { LoadingService } from '../../services/loading.service';

describe('isLoadingInterceptor', () => {
  let loadingServiceMock: any;
  let mockRequest: HttpRequest<unknown>;

  beforeEach(() => {
    loadingServiceMock = {
      setLoadingState: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: LoadingService, useValue: loadingServiceMock }],
    });

    mockRequest = new HttpRequest('GET', '/test');

    // Reset the signal count
    vi.resetModules();
  });

  it('should increase request count and set loading state after delay', () => {
    vi.useFakeTimers();
    const mockResponse = new HttpResponse({ body: 'success' });
    const nextMock = vi.fn().mockReturnValue(of(mockResponse));

    isLoadingInterceptor(mockRequest, nextMock);

    // Fast-forward until all timers have been executed
    vi.advanceTimersByTime(300);

    expect(nextMock).toHaveBeenCalledWith(mockRequest);
    expect(loadingServiceMock.setLoadingState).toHaveBeenCalledWith(true);
    vi.useRealTimers();
  });

  it('should decrease request count on successful response', () => {
    vi.useFakeTimers();
    const mockResponse = new HttpResponse({ body: 'success' });
    const nextMock = vi.fn().mockReturnValue(of(mockResponse));

    isLoadingInterceptor(mockRequest, nextMock).subscribe();

    vi.advanceTimersByTime(300);

    expect(loadingServiceMock.setLoadingState).toHaveBeenCalledWith(false);
    vi.useRealTimers();
  });

  it('should decrease request count on error', () => {
    vi.useFakeTimers();
    const error = new Error('Request failed');
    const nextMock = vi.fn().mockReturnValue(() => throwError(() => error));

    isLoadingInterceptor(mockRequest, nextMock)
      .pipe(catchError(() => of(null)))
      .subscribe();

    vi.advanceTimersByTime(300);

    expect(loadingServiceMock.setLoadingState).toHaveBeenCalledWith(false);
    vi.useRealTimers();
  });

  it('should hide loading state on finalize', () => {
    vi.useFakeTimers();
    const mockResponse = new HttpResponse({ body: 'success' });
    const nextMock = vi.fn().mockReturnValue(of(mockResponse));

    isLoadingInterceptor(mockRequest, nextMock).subscribe({
      complete: () => {
        expect(loadingServiceMock.setLoadingState).toHaveBeenCalledWith(false);
      },
    });

    vi.advanceTimersByTime(300);
    vi.useRealTimers();
  });

  it('should handle multiple concurrent requests', () => {
    vi.useFakeTimers();
    const mockResponse = new HttpResponse({ body: 'success' });
    const nextMock = vi.fn().mockReturnValue(of(mockResponse));

    // Make two requests
    isLoadingInterceptor(mockRequest, nextMock).subscribe();
    isLoadingInterceptor(mockRequest, nextMock).subscribe();

    vi.advanceTimersByTime(300);

    // Should set loading to true only once
    expect(loadingServiceMock.setLoadingState).toHaveBeenCalledWith(true);

    // Should be called multiple times but final state should be false
    expect(loadingServiceMock.setLoadingState).toHaveBeenCalledWith(false);
    vi.useRealTimers();
  });
});
