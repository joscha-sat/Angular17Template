import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  router: Router = inject(Router);

  urlContainsName(name: string): Observable<boolean> {
    return this.router.events.pipe(
      // eslint-disable-next-line @typescript-eslint/typedef
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url.includes(name)),
    );
  }
}
