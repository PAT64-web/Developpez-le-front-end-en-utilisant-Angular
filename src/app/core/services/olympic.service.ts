import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from "src/app/core/models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService implements OnInit{
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);
  olympicCountries: OlympicCountry[] = [
    {
      "id": 1,
      "country": "Italy",
      "totalMedals":23,
      "participations": [
        {
          "id": 1,
          "year": 2012,
          "city": "Londres",
          "medalsCount": 28,
          "athleteCount": 372
        },

      {
        "id": 2,
        "year": 2016,
        "city": "Rio de Janeiro",
        "medalsCount": 28,
        "athleteCount": 375
      },
      {
        "id": 3,
        "year": 2020,
        "city": "Tokyo",
        "medalsCount": 40,
        "athleteCount": 381
      }
    ]
  },
  {
    "id": 2,
    "country": "Spain",
    "totalMedals":50,
    "participations": [
      {
        "id": 1,
        "year": 2012,
        "city": "Londres",
        "medalsCount": 20,
        "athleteCount": 315
      },
      {
        "id": 2,
        "year": 2016,
        "city": "Rio de Janeiro",
        "medalsCount": 17,
        "athleteCount": 312
      },
      {
        "id": 3,
        "year": 2020,
        "city": "Tokyo",
        "medalsCount": 17,
        "athleteCount": 321
      }
    ]
  }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    for (let i = 0; i < this.olympicCountries.length; i++) {
      for (let j = 0; j < this.olympicCountries[i].participations.length; i++) {
        this.olympicCountries[i].totalMedals += this.olympicCountries[i].participations[j].medalsCount;
      }    
    }    
  }
  
  

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
  
  getAllOlympics(): OlympicCountry[] {
    return this.olympicCountries;
  }
  
}
