import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const headers: any = new HttpHeaders({
  'Content-Type':'application-json'
});

@Injectable({
  	providedIn: 'root'
})
export class BrokerService {

	category: any;
	workers:any;
	workerData: any;

  	constructor(private http: HttpClient) { }

	menuOptions(){
		return this.http.get(environment.apiEndPoint + environment.menuOptions.menu, {headers})
	}

	projectsItems(){
		return this.http.get(environment.apiEndPoint + environment.menuOptions.project, {headers})
	}

	projectsItemsSlider(){
		return this.http.get(environment.apiEndPoint + environment.menuOptions.project + environment.filters.projectFilter, {headers})
	}
	projectsItemsHome() {
		return this.http.get(environment.apiEndPoint + environment.menuOptions.project + environment.filters.projectHome, {headers})
	}
	workerItems(){
		return this.http.get(environment.apiEndPoint + environment.menuOptions.worker, {headers})
	}
	workerProjects(){
		return this.http.get(environment.apiEndPoint + environment.menuOptions.worker + environment.filters.workersProject, {headers})
	}
	projectsService(category){
		return this.http.get(environment.apiEndPoint + environment.menuOptions.service + environment.filters.projectPerService+category+'&fields=*.*.*.*.*', {headers})
	}
}
