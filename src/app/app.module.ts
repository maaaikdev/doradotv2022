import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SafePipe } from './pipes/safe.pipe';
import { ProjectsHomeComponent } from './pages/projects-home/projects-home.component';
import { WithinProjectComponent } from './pages/within-project/within-project.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ContactComponent } from './pages/contact/contact.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    SafePipe,
    ProjectsHomeComponent,
    WithinProjectComponent,
    CategoriesComponent,
    ContactComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
