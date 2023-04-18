import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ActivatedRoute} from "@angular/router";
import { Subject, takeUntil} from 'rxjs';  

import { OlympicCountry } from '../core/models/Olympic';
import { OlympicService } from '../core/services/olympic.service';

@Component({
  selector: 'app-detail-country',
  templateUrl: './detail-country.component.html',
  styleUrls: ['./detail-country.component.scss']
})
export class DetailCountryComponent implements OnInit, OnDestroy {
  private destroy$!: Subject<boolean>;   
  public olympicCountry!:OlympicCountry;
  public countryId!:number;   
  public lineChart!: Chart;
  public numberOfEntries:number=0;
  public numberOfMedals:number=0;
  public numberOfAthletes:number=0;
  olympicCountries!: OlympicCountry[];
       
  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {}

  ngOnInit(): void {  
    this.destroy$ = new Subject();

    const countryId = +this.route.snapshot.params['id'];    
    
    this.olympicService.getOlympics().pipe(takeUntil(this.destroy$)).subscribe((olympics) => {  
        this.olympicCountries = olympics;
        if (this.olympicCountries !== undefined) {          
          this.olympicCountry = <OlympicCountry>this.olympicCountries.find(o => o.id===countryId);

          if (this.olympicCountry== undefined){
            throw new Error('Olympic not found');
          }        
          this.numberOfEntries= this.olympicCountry.participations.length;      
          for (let i=0;i<this.numberOfEntries; i++)
          {
            this.numberOfMedals += this.olympicCountry.participations[i].medalsCount;      
            this.numberOfAthletes += this.olympicCountry.participations[i].athleteCount;            
          }    

          // affichage des données sous forme graphique
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
 
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }  
}
