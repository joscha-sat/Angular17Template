import { Component, inject } from '@angular/core';
import { TuiLoaderModule } from "@taiga-ui/core";
import { LoadingService } from "../../services/loading.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [
    TuiLoaderModule,
    AsyncPipe
  ],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  loaderService = inject(LoadingService)

}
