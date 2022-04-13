import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BrokerService } from './broker.service';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

	projectAuthor: any;
	dataProject: any;
	workers: any;
	workerData: any;
	dataProjectVimeo: any;
	nextProjectAdd: any;
	spinnerActive = true
	
	constructor(
		public router: Router,
		public broker: BrokerService,
	) {
		
	 }

	openProject(itemArrived){
		this.projectAuthor = itemArrived;
		this.dataProject = itemArrived.id;
		this.dataProjectVimeo = itemArrived.vimeo;
		this.router.navigate(['/project'])
		//this.router.navigate(['/project'],{ queryParams: { category: this.projectAuthor.services[0].service_id.slug, idProject: this.projectAuthor.gif.id } });
	}

	colorCategory(bgProj) {		
		this.spinnerActive = true;
		this.broker.projectsService(bgProj).subscribe((response: any) => {
			this.workers = response;
			if(this.workers.data[0].workers[0] == undefined) {
				$("#menuModal").modal('hide');
				this.router.navigate(['/'])
			} else {				
				this.workerData = this.workers.data[0].workers[0];
				$("#menuModal").modal('hide');
				this.broker.workerProjects(this.workers.data[0].workers[0].worker_id.slug).subscribe((response: any) => {					
					this.broker.authorWorker = response;
					this.broker.projects = this.broker.authorWorker?.data[0].projects;							
				});
				this.spinnerActive = false;	
				this.router.navigate(['/studio'],{ queryParams: { category: bgProj} });
			}			
		});
	}

	scrollToElement($element): void {
		console.log($element);
		$element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
	}

	nextProject(next) {
		this.nextProjectAdd = next
	}
}
