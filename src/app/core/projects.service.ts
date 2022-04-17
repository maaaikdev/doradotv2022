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
	home: any;
	homeSlider: any;
	
	constructor(
		public router: Router,
		public broker: BrokerService,
		private activateRoute: ActivatedRoute
	) {
		
	 }

	openProject(itemArrived, author, id, home, homeSlider){
		this.projectAuthor = itemArrived;
		localStorage.setItem("home", home);
		localStorage.setItem("home_slider", homeSlider);
		//this.router.navigate(['/project/'+itemArrived.services[0].service_id.slug+'/'+author+'/'+itemArrived.id+''])
		this.router.navigate(['/project/'+itemArrived.services[0].service_id.slug+'/'+author+'/'+itemArrived.id+'']).then(() => {
			window.location.reload();
		});	
	}

	openProjectHome(proj, author, color, id){
		this.projectAuthor = author;
		setTimeout(() => {
			this.spinnerActive = true;	
		}, 1500);	
		this.router.navigate(['/project/'+color+'/'+author+'/'+id+'']).then(() => {
			window.location.reload();
		});	
	}

	openProjectHome2(proj, author, color, id, home, homeSlider){
		this.projectAuthor = author;
		localStorage.setItem("home", home);
		localStorage.setItem("home_slider", homeSlider);
		this.router.navigate(['/project/'+color+'/'+author+'/'+id+''])
		// this.router.navigate(['/project/'+color+'/'+author+'/'+id+'']).then(() => {
		// 	window.location.reload();
		// });	
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
						$("#menuModal").modal('hide');				
						this.router.navigate(['/studio/'+this.workers.data[0].slug]).then(() => {
							window.location.reload();
						});	
					} else {
						$("#menuModal").modal('hide');
						this.router.navigate(['/'])
					}					
				} else {
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
		$element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
	}
}
