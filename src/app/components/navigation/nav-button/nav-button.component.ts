import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NavItem } from "../../../enums/nav-items";
import { TuiButtonModule, TuiHintModule, TuiSvgModule } from "@taiga-ui/core";
import { RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-nav-button",
  standalone: true,
  imports: [
    TuiButtonModule,
    TuiHintModule,
    TuiSvgModule,
    RouterLinkActive,
  ],
  templateUrl: "./nav-button.component.html",
  styleUrl: "./nav-button.component.scss",
})
export class NavButtonComponent {
  @Input() navItem: NavItem | undefined;
  @Input() selected: boolean = false; // Checks if the button is selected.

  @Output() isClicked: EventEmitter<NavItem> = new EventEmitter<NavItem>(); // Emits the clicked button to the parent component.

  onClick() {
    this.isClicked.emit(this.navItem);
  }
}
