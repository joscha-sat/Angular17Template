import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TUI_SANITIZER, TuiRootModule } from "@taiga-ui/core";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";


@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, TuiRootModule, TranslateModule, NavigationComponent, LoadingSpinnerComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
  title = "Angular-Template-V2";
}

