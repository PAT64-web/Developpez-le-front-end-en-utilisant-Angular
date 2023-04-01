import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ActivatedRoute} from "@angular/router";

import { OlympicCountry } from '../core/models/Olympic';
import { OlympicService } from '../core/services/olympic.service';

@Component({
  selector: 'app-detail-country',
  templateUrl: './detail-country.component.html',
  styleUrls: ['./detail-country.component.scss']
})
export class DetailCountryComponent implements OnInit {
  
  public olympicCountry!:OlympicCountry;
  public countryId!:number;   
  public lineChart!: any;
  public numberOfEntries:number=0;
  public numberOfMedals:number=0;
  public numberOfAthletes:number=0;
  olympicCountries!: OlympicCountry[];
  public oC!:any;

     
  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {}
    // constructor(private olympicService: OlympicService, ) { 
    //   this.route.queryParams.subscribe(params => {
    //     this.countryId = params.countryId;
    //   });
    // }

  ngOnInit(): void {
    const countryId = +this.route.snapshot.params['id'];    
    // const countryId = 1 ;
    
    this.olympicService.getOlympics().subscribe((olympics) => {  
        this.olympicCountries = olympics;
        if (this.olympicCountries !== undefined) {
          this.oC = this.olympicCountries.find(o => o.id===countryId);                    
          this.olympicCountry = this.oC;
          
          if (!this.olympicCountry){
            throw new Error('Olympic not found');
          }        
          this.numberOfEntries= this.olympicCountry.participations.length;      
          for (let i=0;i<this.numberOfEntries; i++)
          {
            this.numberOfMedals = +this.olympicCountry.participations[i].medalsCount;      
            this.numberOfAthletes = +this.olympicCountry.participations[i].athleteCount;            
          }    
        
          this.createChart();
        }  
    });     
  }
  
  createChart(){
    this.lineChart = new Chart("line-chart", {
      type: 'line',      
      data: {
            labels: this.olympicCountry.participations.map(row => row.year),
	          datasets: [{              
              data: this.olympicCountry.participations.map(row => row.medalsCount)
            }]
      } ,
      options: {
        responsive: true,
        scales: {x: { title: { display: true, text: 'Dates' }}},
        plugins: {
          legend: {
              display: false,
              labels: {
                  color: 'rgb(255, 99, 132)'
              }
          }
      }    
      },
      
    });
  }
}
