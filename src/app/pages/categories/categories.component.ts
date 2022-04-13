import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrokerService } from 'src/app/core/broker.service';
import { ProjectsService } from 'src/app/core/projects.service';

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
	// authorWorker: any;
	// projects: any;
	
	constructor(
		private activateRoute: ActivatedRoute,
		public broker: BrokerService,
		public project: ProjectsService
	) {
		this.activateRoute.queryParams.subscribe((params): any => {
			this.category = params.category;		
		});
	}

	ngOnInit() {	
	}

	tabData(names) {
		this.project.workerData = names;
		this.broker.workerProjects(this.project.workerData.worker_id.slug).subscribe((response: any) => {
			this.broker.authorWorker = response;
			this.broker.projects = this.broker.authorWorker?.data[0].projects
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

	withinProject(proj) {
		console.log("PROJJ", proj.project_id)
		this.project.openProject(proj.project_id);
		this.project.nextProject(this.broker.authorWorker.data[0].projects);
	}

	getBg() {
		switch (this.category) {			
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
