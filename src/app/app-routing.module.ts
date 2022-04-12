import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WithinProjectComponent } from './pages/within-project/within-project.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ContactComponent } from './pages/contact/contact.component';


const routes: Routes = [
	{
		path: '', component: HomeComponent
	},
	{
		path: 'project', component: WithinProjectComponent
	},
	{
		path: 'studio', component: CategoriesComponent
	},
	{
		path: 'contact', component: ContactComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
