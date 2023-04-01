import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { Router} from "@angular/router";
import { ActivatedRoute} from "@angular/router";

import { OlympicCountry } from '../core/models/Olympic';
import { OlympicService } from '../core/services/olympic.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  public olympicCountries!: OlympicCountry[];
  public pieChart!: any;
  public numberOfJo!:number;
  public numberOfCountries!:number;

  public olympicCountry!:OlympicCountry;
  public countryId!:number;   
  public oC!:any;

  constructor(private olympicService: OlympicService, private router: Router) {}
  // constructor(private olympicService: OlympicService) {}
 
  ngOnInit(){    
    this.olympicService.getOlympics().subscribe((olympics) => {       
        this.olympicCountries = olympics;    
        if (this.olympicCountries !== undefined) {
          this.numberOfCountries= this.olympicCountries.length;
          this.numberOfJo=0;
          
          for (let i=0;i< this.olympicCountries.length; i++)
          {     
            this.olympicCountries[i].totalMedals = 0;
            for (let j=0;j<this.olympicCountries[i].participations.length; j++) {
              this.olympicCountries[i].totalMedals += this.olympicCountries[i].participations[j].medalsCount;
            }
                       
            if (this.numberOfJo<this.olympicCountries[i].participations.length) {
              this.numberOfJo = this.olympicCountries[i].participations.length;      
            }          
          }
          this.createChart(); 
        }
      });       
  }    


  onChartClicked = ($event: any) => {
    window.console.log('onChartClicked', $event);
    alert('onChartClicked' + $event);
  }
  onChartHovered = ($event: any) => {
    window.console.log('onChartHover', $event);
  }

  createChart(){
    // myChart = document.getElementById("myChart").getContext("2d");

    this.pieChart = new Chart("pie-country", {
      type: 'pie',      
      data: {
            labels: this.olympicCountries.map(row => row.country),
	          datasets: [{
            label: 'Médals',
            data: this.olympicCountries.map(row => row.totalMedals),            
            hoverOffset: 4  }],
      },   
      options: {
        onClick: (evt, el, chart) => {
          console.log('Active el list: ', chart.data.datasets[el[0].datasetIndex].label, chart.data.datasets[el[0].datasetIndex].data[el[0].index])
    
          // let point = chart.getElementsAtEventForMode(evt, 'point', {intersect: true
          //  }, true);
    
          // console.log('Mode point list: ', chart.data.datasets[point[0].datasetIndex].label, chart.data.datasets[point[0].datasetIndex].data[point[0].index])
        
        // (chartClick)="onViewOlympicCountry($event)
      //   onClick: function(e, elements, chart) {
      //     if (elements[0]) {            
      //       const datasetIndex = elements[0].datasetIndex;
      //       const dataIndex = elements[datasetIndex].index;
      //       alert( chart.data.datasets[datasetIndex].data[dataIndex]);
      //       //alert(chart.data.datasets[datasetIndex].labels[dataIndex]);
      //    }
        },       
        animation: false,
        aspectRatio:3.5,
        plugins: {
          title: {
            display: true,
            text: 'Medals per Country',            
          }          
        }
      }
    });      
  }

  onViewOlympicCountry(){
    // this.olympicService.getOlympics().subscribe((olympics) => {
    //   this.olympicCountries = olympics;
    //   // const olympicCountry = olympics.find(olympicCountry => olympicCountry.id===olympicId);
     
    // });
  //   public olympicCountry!:OlympicCountry;
  // public countryId!:number;   
  // public oC!:any;

    this.oC = this.olympicCountries.find(o => o.id===3);                    
    this.olympicCountry = this.oC;


    this.router.navigateByUrl(`olympic/${this.olympicCountry.id}`);

   //mathieu this.router.navigate(["olympic/" + this.olympicCountries[0].id]);
   }
}


 // public olympicCountries2!: OlympicCountry[];
// pieChartData ={
//   labels: ["Lun","Ma","Me","Jeu","Ven","Sa","Dim"],
//   datasets:
//       {data:[89,34,43,54,28,74,93],
//       label:'Sales percent',
//       backgroundColor: [
//         'rgba(255,0,25,0.7)',
//         'rgba(0,255,25,0.7)',
//         'rgba(0,25,255,0.7)',
//         'rgba(67,25,255,0.7)',
//         'rgba(67,25,78,0.7)',
//         'rgba(167,125,78,0.7)',
//         'rgba(67,255,178,0.7)'
//       ]
//       } }
// pieChartOption ={
//   responsive:false
// }


     