import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
