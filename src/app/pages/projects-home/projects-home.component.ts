import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/core/projects.service';

declare var $: any

@Component({
	selector: 'app-projects-home',
	templateUrl: './projects-home.component.html',
	styleUrls: ['./projects-home.component.scss']
})
export class ProjectsHomeComponent implements OnInit {

	projectArray: any;

	@Input() dataVideo: any;

	constructor(
		public projecAuthor: ProjectsService
	) {
		this.projectArray = this.dataVideo
	 }


	ngOnInit() {
	}

	withinProject(proj, author, color, id) {
		this.projecAuthor.openProjectHome(proj, author, color, id);
	}

	withinProjectHome(proj, author, color, id, home, homeSlider) {
		this.projecAuthor.openProjectHome2(proj, author, color, id, home, homeSlider);
	}

	getBg(category) {
		switch (category) {			
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
