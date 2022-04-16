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

	openProject(itemArrived, author, id){
		console.log("DATA", [itemArrived, author, id])
		this.projectAuthor = itemArrived;
		this.router.navigate(['/project/'+itemArrived.services[0].service_id.slug+'/'+author+'/'+itemArrived.id+'']).then(() => {
			window.location.reload();
		});	
	}

	openProjectHome(proj, author, color, id){
		console.log("DATA", [proj, author, color, id])
		this.projectAuthor = author;
		setTimeout(() => {
			this.spinnerActive = true;	
		}, 1500);	
		this.router.navigate(['/project/'+color+'/'+author+'/'+id+'']).then(() => {
			window.location.reload();
		});	
	}

	colorCategory(colorCatgeory) {
		this.spinnerActive = true;
		this.broker.projectsService(colorCatgeory).subscribe((response: any) => {
			this.workers = response;
			if(this.workers.data[0] == undefined) {
				$("#menuModal").modal('hide');
				this.router.navigate(['/'])
			} else {				
				if(colorCatgeory == 'animacion' || colorCatgeory == 'online') {
					if(this.workers.data[0].reel != "") {
						console.log("ENTRE ANIMACION", this.workers);	
						$("#menuModal").modal('hide');				
						this.router.navigate(['/studio/'+this.workers.data[0].slug]).then(() => {
							window.location.reload();
						});	
					} else {
						$("#menuModal").modal('hide');
						this.router.navigate(['/'])
					}					
				} else {
					console.log("ENTRE A OTRO", this.workers);	
					this.workerData = this.workers.data[0].workers[0];
					$("#menuModal").modal('hide');
					this.broker.workerProjects(this.workers.data[0].workers[0].worker_id.slug).subscribe((response: any) => {					
						this.broker.authorWorker = response;
						//this.nextProject(this.broker.authorWorker.data[0].projects);
						this.broker.projects = this.broker.authorWorker?.data[0].projects;							
					});
					this.spinnerActive = false;
					this.router.navigate(['/studio/'+this.workers.data[0].slug+'/'+this.workers.data[0].workers[0].worker_id.slug+'']).then(() => {
						window.location.reload();
					});	
				}				
				// this.router.navigate(['/studio/'+this.workers.data[0].slug+'/'+this.workers.data[0].workers[0].worker_id.slug+'']);
			}			
		});
	}

	scrollToElement($element): void {
		console.log($element);
		$element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
	}

	// nextProject(next) {
	// 	this.nextProjectAdd = next
	// 	console.log("NEXT NEXT 11111", this.nextProjectAdd)
	// }
	// nextProjectWorker(next) {
	// 	this.nextProjectAddWorker = next
	// }
}
