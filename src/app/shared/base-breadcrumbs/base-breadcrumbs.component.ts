import { Component } from "@angular/core";
import { TuiBreadcrumbsModule } from "@taiga-ui/kit";
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink } from "@angular/router";
import { TuiLinkModule } from "@taiga-ui/core";

export type BreadcrumbItem = {
  url: string;
  label: string;
}

@Component({
  selector: "app-base-breadcrumbs",
  standalone: true,
  imports: [
    TuiBreadcrumbsModule,
    RouterLink,
    TuiLinkModule,
  ],
  templateUrl: "./base-breadcrumbs.component.html",
  styleUrl: "./base-breadcrumbs.component.scss",
})
export class BaseBreadcrumbsComponent {
  breadcrumbItems: BreadcrumbItem[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Generate breadcrumb items on init
    this.generateBreadcrumbItems(this.route.snapshot.root);
  }

  generateBreadcrumbItems(routeSnapshot: ActivatedRouteSnapshot | null) {
    if (!routeSnapshot) return;

    // Add breadcrumb item for each route segment
    const routeUrl = routeSnapshot.url.map(segment => segment.path);

    if (routeUrl.length > 0) {
      // Generate breadcrumb item values
      const url = "/" + routeUrl.join("/");
      const label = routeUrl[routeUrl.length - 1];

      // only strings less than 36 characters (exclude long ids)
      if (label.length < 36)

        this.breadcrumbItems.push({ label, url });
    }

    // Recursively generate breadcrumb items for child routes
    this.generateBreadcrumbItems(routeSnapshot.firstChild);
  }
}
