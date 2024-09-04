import { TuiLink } from '@taiga-ui/core';
import { TuiItem } from '@taiga-ui/cdk';
import { TuiBreadcrumbs } from '@taiga-ui/kit';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterLink,
} from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export type BreadcrumbItem = {
  url: string | null;
  label: string;
};

@Component({
  selector: 'app-base-breadcrumbs',
  standalone: true,
  imports: [
    TuiBreadcrumbs,
    TuiItem,
    RouterLink,
    TuiLink,
    NgIf,
    NgForOf,
    TranslateModule,
  ],
  templateUrl: './base-breadcrumbs.component.html',
  styleUrl: './base-breadcrumbs.component.scss',
})
export class BaseBreadcrumbsComponent implements OnInit {
  breadcrumbItems: BreadcrumbItem[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Generate breadcrumb items on init
    this.generateBreadcrumbItems(this.route.snapshot.root);
  }

  generateBreadcrumbItems(routeSnapshot: ActivatedRouteSnapshot | null) {
    if (!routeSnapshot) return;

    // Add breadcrumb item for each route segment
    const routeUrl = routeSnapshot.url.map((segment) => segment.path);

    let accumulatedUrl = '';

    routeUrl.forEach((urlSegment) => {
      if (urlSegment.length < 36) {
        accumulatedUrl += '/' + urlSegment;
        this.breadcrumbItems.push({
          label: urlSegment,
          url: accumulatedUrl,
        });
      }
    });

    if (
      routeUrl &&
      routeUrl.length > 0 &&
      routeUrl[routeUrl.length - 1].length >= 36
    ) {
      this.breadcrumbItems[this.breadcrumbItems.length - 1].url = null;
    }

    // Recursively generate breadcrumb items for child routes
    this.generateBreadcrumbItems(routeSnapshot.firstChild);
  }
}
