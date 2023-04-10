import { Component, OnInit } from '@angular/core';
import { Chart} from 'chart.js/auto';
import { Router} from "@angular/router";
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

import { OlympicCountry } from '../core/models/Olympic';
import { OlympicService } from '../core/services/olympic.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})

export class CountryListComponent implements OnInit  {

  public olympicCountries!: OlympicCountry[];
  public pieChart!: any;

  public numberOfJo!:number;
  public numberOfCountries!:number;

  public olympicCountry!:OlympicCountry;
  public countryId!:number;   
  
  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(){    
    this.olympicService.getOlympics().subscribe((olympics) => {       
        this.olympicCountries = olympics;    
        if (this.olympicCountries !== undefined) {
          this.numberOfCountries=this.olympicCountries.length;
          this.numberOfJo=0;

          // enrichissement propriétés de l'instance avec boucle sur les participations
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

          // affichage des données sous forme graphique
          this.createChart(); 
        }
      });       
  }    

  createChart(){       
    this.pieChart = new Chart("pie-country", {
      type: 'pie',               
      data: {
            labels: this.olympicCountries.map(row => row.country),            
	          datasets: [{
                label: "",                                 
                data: this.olympicCountries.map(row => row.totalMedals),                     
                backgroundColor: [
                  'rgb(102, 0, 51)',
                  'rgb(51, 153, 255)',
                  'rgb(153, 153, 255)',
                  'rgb(102, 204, 255)',
                  'rgb(153, 51, 51)',
                ],
                datalabels: {
                  align: 'end',
                  anchor: 'start',
                  offset:4
                },
                hoverOffset: 10  }],
      },
      options: {             
        onClick: (evt, el, chart) => {
          // déclenchement de l'écran de détail
          this.viewOlympicCountry((this.olympicCountries[el[0].index].id));                    
        },               
        animation: false,
        aspectRatio:3.5,
        plugins: {   
          datalabels:{      
            align:'end',
            offset:4,
            borderWidth:50,
            display: true,
            color: 'white',
            font: {
              weight: 'bold',
              size:12
            },
            padding: 6,
            opacity:0.7,
            formatter: function(value, context) {  
              // affichage nom du pays dans slice                          
              if (context.chart.data.labels !== undefined){
                return context.chart.data.labels[context.dataIndex];
              }
              else {
                return "";
              }                         
            }
          },                   
          title: {
            display: false,
            text: 'Medals per Country',            
          }, 
          legend: {
            display:false,
            position: 'bottom'
          }                    
        }
      }, 
      
    });      
  }

  viewOlympicCountry(idCountry: number){              
    this.olympicCountry = <OlympicCountry>this.olympicCountries.find(o => o.id===idCountry);    
    this.router.navigateByUrl(`olympic/${this.olympicCountry.id}`);
   }
}
