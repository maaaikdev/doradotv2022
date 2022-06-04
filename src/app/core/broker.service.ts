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
	authorWorker:any;
	projects: any;

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
	workerProjects(author){
		return this.http.get(environment.apiEndPoint + environment.menuOptions.worker + environment.filters.workersProject+author+'&fields=*.*.*.*.*', {headers})
	}
	workerProjects1(){
		return this.http.get('https://admin.dorado.tv/doradotv/items/worker?filter%5bslug%5d%5beq%5d=julian-rivera-contreras&fields=*.*.*.*.*', {headers})
	}	
	projectsService(category){
		return this.http.get(environment.apiEndPoint + environment.menuOptions.service + environment.filters.projectPerService+category+'&fields=*.*.*.*.*', {headers})
	}
	newProjectsWorker(author){
		return this.http.get(environment.apiEndPoint + environment.menuOptions.project + '?' + environment.filters.newProjectsWorker+author+'&fields=*.*.*.*', {headers})
	}
	languageApp() {
		return this.http.get(environment.apiEndPoint + environment.filters.menuLang, {headers})
	}
	newProjectsPerServiceAndWorker(category, worker){
		return this.http.get(environment.apiEndPoint + environment.menuOptions.project + '?' + + environment.filters.newProjectsService+category+ '&' +environment.filters.newProjectsWorker+ worker +'&fields=*.*.*.*', {headers})

	}

}
