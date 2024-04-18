import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminServiceService } from './services/admin-service.service';
import {SearchUrl} from './pipe/search-url';
import {SearchPeople} from './pipe/search-people';
import {SearchCompany} from './pipe/search-company';


@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    SearchUrl,
    SearchPeople,
    SearchCompany
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AdminServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
