import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieChartLabelsdos: Label[] = [];
  public pieChartDatados: SingleDataSet = [];


  public pieChartLabelstres: Label[] = [];
  public pieChartDatatres: SingleDataSet = [];

  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  Result: any = {};

  constructor(private apiService: ApiService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {

    this.getDashboard();
  }

  getDashboard() {

    this.apiService.loader = true;

    this.apiService.get(`/BackOffice/GetDashboardBackOffice`).subscribe((r) => {
      this.apiService.loader = false;
      if (r.success) {
        this.Result = r.result;
        console.log(this.Result);
        for (let item of this.Result.postulacionesPorEstudioClinico) {
          this.pieChartLabels.push(item.nombreEstudio.substring(0, 11));
                
          this.pieChartData.push(item.numeroPostulaciones);
          
        }

        for (let item of this.Result.compartidosPorEstudioClinico) {
          this.pieChartLabelsdos.push(item.nombreEstudio.substring(0, 11));

          this.pieChartDatados.push(item.numeroPostulaciones);

        }


        for (let item of this.Result.postulacionesPorMedico) {
          this.pieChartLabelstres.push(item.nombreMedico);

          this.pieChartDatatres.push(item.numeroPosulaciones);

        }
        
        console.log(this.pieChartLabels);
        console.log(this.pieChartData);

      }
    }, (r) => {
      console.log(r);
      this.apiService.loader = false;
    })

    
  }


  
}
