import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
	spinnerActive = true;
	nextProjectAddWorker: any;
	colorCatgeory: any;
	
	constructor(
		public router: Router,
		public broker: BrokerService,
		private activateRoute: ActivatedRoute
	) {
		
	 }

	openProject(itemArrived, color, id){
		console.log("DATA", [itemArrived, color, id])
		this.projectAuthor = itemArrived;
		// this.colorCatgeory = color;
		// this.dataProject = itemArrived.id;
		// this.dataProjectVimeo = itemArrived.vimeo;
		//this.router.navigate(['/project']);
		this.router.navigate(['/project/'+color+'/'+itemArrived.gif.id+'']);
		//this.router.navigate(['/project'],{ queryParams: { category: this.projectAuthor.services[0].service_id.slug, idProject: this.projectAuthor.gif.id } });
	}

	colorCategory(colorCatgeory) {		
		this.spinnerActive = true;
		this.broker.projectsService(colorCatgeory).subscribe((response: any) => {
			this.workers = response;
			console.log("WORKERS SEERVICES", this.workers)
			if(this.workers.data[0].workers[0] == undefined) {
				$("#menuModal").modal('hide');
				this.router.navigate(['/'])
			} else {				
				this.workerData = this.workers.data[0].workers[0];
				$("#menuModal").modal('hide');
				this.broker.workerProjects(this.workers.data[0].workers[0].worker_id.slug).subscribe((response: any) => {					
					this.broker.authorWorker = response;
					console.log("AUTHOR ROKER", this.broker.authorWorker)
					this.nextProject(this.broker.authorWorker.data[0].projects);
					this.broker.projects = this.broker.authorWorker?.data[0].projects;							
				});
				this.spinnerActive = false;	
				this.router.navigate(['/studio/'+this.workers.data[0].slug+'/'+this.workers.data[0].workers[0].worker_id.slug+'']);
			}			
		});
	}

	scrollToElement($element): void {
		console.log($element);
		$element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
	}

	nextProject(next) {
		this.nextProjectAdd = next
		console.log("NEXT NEXT 11111", this.nextProjectAdd)
	}
	// nextProjectWorker(next) {
	// 	this.nextProjectAddWorker = next
	// }
}
