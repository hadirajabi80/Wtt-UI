import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { DashboardService } from 'src/app/Services/dashboard.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  pieChartDataSet =
    this.dashboardService.resDashboard.pieChart.datasets[0].data;
  pieChartLabels = this.dashboardService.resDashboard.pieChart.labels;
  barChartLabel = this.dashboardService.resDashboard.barChart.datasets[0].label;
  barChartData = this.dashboardService.resDashboard.barChart.datasets[0].data;

  pieChartData: ChartData<'pie'> = {
    labels: [
      this.pieChartLabels[0],
      this.pieChartLabels[1],
      this.pieChartLabels[2],
      this.pieChartLabels[3],
    ],
    datasets: [
      {
        data: [
          this.pieChartDataSet[0],
          this.pieChartDataSet[1],
          this.pieChartDataSet[2],
          this.pieChartDataSet[3],
        ],
      },
    ],
  };

  public pieChartType: ChartType = 'pie';
  pieChartD1ata: any = this.dashboardService.resDashboard.pieChart;
  pieChartOptions: ChartOptions = {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr: any[] = ctx.chart.data.datasets[0].data;
          dataArr.map((data: number) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + '%';
          return percentage;
        },
      },
    },
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'زمان حضور و کار',
      },
    },
  };
  salesData: ChartData<'bar'> = {
    labels: this.dashboardService.resDashboard.barChart.labels,
    datasets: this.dashboardService.resDashboard.barChart.datasets
  };
  constructor(public dashboardService: DashboardService) {}

  ngOnInit(): void {
  }

}
