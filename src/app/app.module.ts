import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { CountryListComponent } from './country-list/country-list.component';
import { DetailCountryComponent } from './detail-country/detail-country.component';
// import { IgxItemLegendModule, IgxPieChartModule } from 'igniteui-angular-charts';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, CountryListComponent, DetailCountryComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
