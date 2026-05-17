import { Component, signal, WritableSignal } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-template-table-skeleton',
  imports: [Skeleton, TableModule],
  templateUrl: './template-table-skeleton.html',
  styleUrl: './template-table-skeleton.scss',
})
export class TemplateTableSkeleton {
  public readonly skeletonArray: WritableSignal<string[]> = signal(Array<string>(10).fill('0'));
}
