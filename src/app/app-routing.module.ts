import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryListComponent } from './country-list/country-list.component';
import { DetailCountryComponent} from './detail-country/detail-country.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/olympic',
    pathMatch: 'full'
  } ,
  { path: 'olympic/:id',
    component: DetailCountryComponent
  },
  {
    path: 'olympic', 
    component: CountryListComponent,
  },  
  {
    path: '**', 
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
