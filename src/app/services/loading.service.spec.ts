import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadingState observable', () => {
    it('should return an observable', () => {
      const loadingState = service.loadingState;
      expect(loadingState).toBeDefined();
      expect(typeof loadingState.pipe).toBe('function');
    });

    it('should emit values when setLoadingState is called', () => {
      const values: boolean[] = [];

      service.loadingState.subscribe((value) => {
        values.push(value);
      });

      service.setLoadingState(true);
      service.setLoadingState(false);

      expect(values).toContain(true);
      expect(values).toContain(false);
    });

    it('should handle multiple state changes', () => {
      const values: boolean[] = [];

      service.loadingState.subscribe((value) => {
        values.push(value);
      });

      // Rapid state changes
      service.setLoadingState(true);
      service.setLoadingState(false);
      service.setLoadingState(true);
      service.setLoadingState(false);

      expect(values.length).toBeGreaterThan(2);
      expect(values[0]).toBe(false); // Initial value
    });
  });

  describe('setLoadingState', () => {
    it('should set loading state to true', () => {
      let currentValue: boolean = false;

      service.loadingState.subscribe((value) => {
        currentValue = value;
      });

      service.setLoadingState(true);
      expect(currentValue).toBe(true);
    });

    it('should set loading state to false', () => {
      service.setLoadingState(true);
      let currentValue: boolean = true;

      service.loadingState.subscribe((value) => {
        currentValue = value;
      });

      service.setLoadingState(false);
      expect(currentValue).toBe(false);
    });

    it('should handle setting same state multiple times', () => {
      service.setLoadingState(true);
      service.setLoadingState(true);

      let currentValue: boolean = false;
      service.loadingState.subscribe((value) => {
        currentValue = value;
      });

      expect(currentValue).toBe(true);
    });

    it('should toggle between states correctly', () => {
      const values: boolean[] = [];

      service.loadingState.subscribe((value) => {
        values.push(value);
      });

      service.setLoadingState(true);
      service.setLoadingState(false);
      service.setLoadingState(true);

      expect(values).toEqual([false, true, false, true]);
    });
  });

  describe('service behavior', () => {
    it('should maintain singleton behavior', () => {
      const service2 = TestBed.inject(LoadingService);

      service.setLoadingState(true);

      let currentValue: boolean = false;
      service2.loadingState.subscribe((value) => {
        currentValue = value;
      });

      expect(currentValue).toBe(true);
    });

    it('should handle error states gracefully', () => {
      expect(() => {
        service.setLoadingState(true);
        service.setLoadingState(false);
      }).not.toThrow();
    });

    it('should accept boolean parameter', () => {
      expect(() => {
        service.setLoadingState(true);
        service.setLoadingState(false);
      }).not.toThrow();
    });
  });

  describe('RxJS integration', () => {
    it('should work with subscription', () => {
      const emissionCount = vi.fn();

      service.loadingState.subscribe(emissionCount);

      service.setLoadingState(true);
      service.setLoadingState(false);

      expect(emissionCount).toHaveBeenCalledTimes(3); // Initial + 2 updates
    });

    it('should allow multiple subscribers', () => {
      const subscriber1 = vi.fn();
      const subscriber2 = vi.fn();

      service.loadingState.subscribe(subscriber1);
      service.loadingState.subscribe(subscriber2);

      service.setLoadingState(true);

      expect(subscriber1).toHaveBeenCalled();
      expect(subscriber2).toHaveBeenCalled();
    });
  });
});
