import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class OlympicService implements OnInit{
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);  
   
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
    
  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        if (error.error instanceof Error) {
          console.error('An error occurred:', error.error.error_description ||error.error.message  || error.statusText);
        } else {
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }

        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }  
}
