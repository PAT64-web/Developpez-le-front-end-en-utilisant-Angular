import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CountryListComponent } from './country-list/country-list.component';
import { DetailCountryComponent} from './detail-country/detail-country.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  } ,
  { path: 'olympic/:id', 
    component: DetailCountryComponent
  },
  {
    path: 'olympic', 
    component: CountryListComponent,
  },  
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
