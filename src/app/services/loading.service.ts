import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
/**
 * Service that can be used to set the loading state of the application
 * The loading state is used to show a loading spinner when a request is taking longer than 250ms
 *
 * The functionality to set the loading state based on the request duration is implemented in the LoadingInterceptor
 */
export class LoadingService {
  private loading$ = new BehaviorSubject<boolean>(false); // only true if the request takes longer than 250ms

  get loadingState() {
    return this.loading$.asObservable();
  }

  setLoadingState(value: boolean) {
    this.loading$.next(value);
  }
}
