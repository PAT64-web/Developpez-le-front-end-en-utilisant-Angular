import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router} from "@angular/router";
import { OlympicService } from 'src/app/core/services/olympic.service';
import { CountryListComponent } from 'src/app/country-list/country-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    // this.router.navigateByUrl('olympic');
  }
  
  onContinue():void {
    this.router.navigateByUrl('olympic');
  }
}
