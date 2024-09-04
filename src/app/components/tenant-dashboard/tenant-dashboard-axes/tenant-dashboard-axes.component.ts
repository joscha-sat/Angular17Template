import { TuiContext } from '@taiga-ui/cdk';
import { Component, OnInit } from '@angular/core';
import {
  TuiAxes,
  TuiLineChart,
  TuiLineChartHint,
  TuiLineDaysChart,
  TuiLineDaysChartHint,
} from '@taiga-ui/addon-charts';
import { TuiPoint } from '@taiga-ui/core';
import { Months } from '../../../other/enums/months';

// TODO: this is dummy data, update to use real data

@Component({
  selector: 'app-tenant-dashboard-axes',
  standalone: true,
  imports: [
    TuiAxes,
    TuiLineDaysChart,
    TuiLineDaysChartHint,
    TuiLineChart,
    TuiLineChartHint,
  ],
  templateUrl: './tenant-dashboard-axes.component.html',
  styleUrl: './tenant-dashboard-axes.component.scss',
})
export class TenantDashboardAxesComponent implements OnInit {
  public months: Months[] = Object.values(Months);
  public values: TuiPoint[] = [];

  ngOnInit(): void {
    this.populateDummyValues();
  }

  populateDummyValues() {
    this.values = this.months.map((month, index) => {
      // For each month, generate a random number of assignments between 10 and 50.
      const numOfAssignments = Math.floor(Math.random() * (50 - 10 + 1)) + 10;

      // Return the array with the index (representing the month) and num of assignments.
      return [index, numOfAssignments];
    });
  }

  readonly hintContent = ({
    $implicit,
  }: TuiContext<readonly TuiPoint[]>): number => $implicit[0][1];

  readonly stringifyMonths = (t: number) => {
    return `${this.months[t]}`;
  };

  readonly stringifyValues = (t: number) => {
    return `${t} Einsätze`;
  };

  // Gets the highest value from the array of values to set the y-axis of the chart
  public getHighestArrayValue(): number {
    const columnValues = this.values.map((value) => value[1]);
    return Math.max(...columnValues);
  }
}
