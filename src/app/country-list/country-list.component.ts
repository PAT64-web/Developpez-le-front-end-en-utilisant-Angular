import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

import { OlympicCountry } from '../core/models/Olympic';
import { OlympicService } from '../core/services/olympic.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  olympicCountries!: OlympicCountry[];
  public chart: any;
  
  constructor(private olympicService: OlympicService) {}

  ngOnInit(){
    //this.olympicService.getOlympics();
    this.olympicCountries = this.olympicService.getAllOlympics();
    this.createChart();
  }    

  createChart(){
    // [dataSource]="energyGlobalDemand"
    // dataArray!: string[];
    // dataArray[]= {'Red', 'Pink','Green','Yellow','Orange','Blue'};

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Red', 'Pink','Green','Yellow','Orange','Blue', ],
	       datasets: [{
    label: 'My First Dataset',
    data: [300, 240, 100, 432, 253, 34],
    backgroundColor: [
      'red',
      'pink',
      'green',
			'yellow',
      'orange',
      'blue',			
    ],
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio:2.5
      }

    });
    // this.chart.config.data.labels = this.olympicCountries;
  }

}
