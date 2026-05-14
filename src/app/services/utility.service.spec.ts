import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  let service: UtilityService;
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      events: of(new NavigationEnd(1, '/test', '/test')),
      url: '/test',
    };

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerMock }],
    });

    service = TestBed.inject(UtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('urlContainsName', () => {
    it('should return true when URL contains specified name', () => {
      const testName = 'test';

      service.urlContainsName(testName).subscribe((result) => {
        expect(result).toBe(true);
      });
    });

    it('should return false when URL does not contain specified name', () => {
      routerMock.url = '/users';
      const testName = 'test';

      service.urlContainsName(testName).subscribe((result) => {
        expect(result).toBe(false);
      });
    });

    it('should handle empty name', () => {
      const testName = '';

      service.urlContainsName(testName).subscribe((result) => {
        expect(result).toBe(true); // Empty string is found in any URL
      });
    });

    it('should handle multiple navigation events', () => {
      const events = [new NavigationEnd(1, '/users', '/users'), new NavigationEnd(2, '/customers', '/customers')];
      routerMock.events = of(...events);

      service.urlContainsName('customers').subscribe((result) => {
        expect(result).toBe(false); // First event is users
      });
    });

    it('should filter only NavigationEnd events', () => {
      const events = [
        { type: 'RouteConfigLoadStart' } as any,
        new NavigationEnd(1, '/test', '/test'),
        { type: 'RouteConfigLoadEnd' } as any,
      ];
      routerMock.events = of(...events);

      service.urlContainsName('test').subscribe((result) => {
        expect(result).toBe(true);
      });
    });

    it('should work with URL containing multiple segments', () => {
      routerMock.url = '/users/123/edit';
      const testName = 'edit';

      service.urlContainsName(testName).subscribe((result) => {
        expect(result).toBe(true);
      });
    });

    it('should be case sensitive', () => {
      routerMock.url = '/Users';
      const testName = 'users';

      service.urlContainsName(testName).subscribe((result) => {
        expect(result).toBe(false);
      });
    });

    it('should work with query parameters', () => {
      routerMock.url = '/users?page=1&limit=10';
      const testName = 'users';

      service.urlContainsName(testName).subscribe((result) => {
        expect(result).toBe(true);
      });
    });

    it('should work with hash fragments', () => {
      routerMock.url = '/users#section';
      const testName = 'users';

      service.urlContainsName(testName).subscribe((result) => {
        expect(result).toBe(true);
      });
    });
  });
});
