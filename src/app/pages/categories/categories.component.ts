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
	
	constructor(
		private activateRoute: ActivatedRoute,
		public broker: BrokerService,
		public project: ProjectsService
	) {
		this.activateRoute.queryParams.subscribe((params): any => {
			this.category = params.category;		
			console.log("PARMASSSS CATEGORY", this.category);			
		});
		console.log("WORKERRSSS COMPONENT", this.project.workers)
	}

	ngOnInit() {
		this.project.colorCategory(this.category);
	}

	tabData(names) {
		this.project.workerData = names;
		console.log("WORKER DATA", this.workerData)
	}

	lineBreak(txt) {
		//txt.split("\n").join("<br />");
		txt.replace(/\s+/g, " ").trim();
		// console.log("TXT", txt)
		return txt
	}

	videoModal(projects) {
		this.captureVideo = projects;
		console.log("CAPTURE VIDEO", this.captureVideo)
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
