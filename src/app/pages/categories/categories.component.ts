import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrokerService } from 'src/app/core/broker.service';
import { ProjectsService } from 'src/app/core/projects.service';

declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

	category: any;
	workers: any;
	workerItem: any;
	workerData: any;
	captureVideo: any;
	urlSlug: any;
	slug: string;
	author: string;
	authorWorker: any;
	projects: any;
	// authorWorker: any;
	// projects: any;
	
	constructor(
		private activateRoute: ActivatedRoute,
		public broker: BrokerService,
		public project: ProjectsService,
		public router: Router,
	) {
		this.slug = this.activateRoute.snapshot.params['slug'];
    	this.author = this.activateRoute.snapshot.params['author'];
	}

	ngOnInit() {
		this.getBg();
		this.broker.projectsService(this.slug).subscribe((response: any) => {
			this.workers = response;
			if(this.workers.data[0].workers[0] == undefined) {
				$("#menuModal").modal('hide');
				this.router.navigate(['/'])
			} else {				
				this.workerData = this.workers.data[0].workers[0];
				$("#menuModal").modal('hide');
				this.broker.workerProjects(this.author).subscribe((response: any) => {					
					this.authorWorker = response;
					this.projects = this.authorWorker?.data[0].projects;
					console.log("PROJECTS", this.projects)
				});
				this.project.spinnerActive = false;	
			}			
		});
	}

	tabData(names) {
		this.workerData = names;
		this.broker.workerProjects(this.workerData.worker_id.slug).subscribe((response: any) => {
			this.authorWorker = response;
			this.projects = this.authorWorker?.data[0].projects;
			this.project.spinnerActive = false;
		});
		
	}

	lineBreak(txt) {
		//txt.split("\n").join("<br />");
		txt.replace(/\s+/g, " ").trim();
		return txt
	}

	videoModal(projects) {
		this.captureVideo = projects;
	}

	withinProject(proj, color, id) {
		console.log("PROJJ", proj.project_id)
		this.project.openProject(proj.project_id, color, id);
		this.project.nextProject(this.authorWorker.data[0].projects);
	}

	getBg() {
		switch (this.slug) {			
			case 'edicion':
				return 'edition'
				break
			case 'correccion-de-color':
				return 'color';
				break
			case 'animacion':
				return 'animation';
				break
			case 'online':
				return 'online';
				break
			case 'musica-original':
				return 'music';
				break
			default:
				return '';
		}		
	}
}
