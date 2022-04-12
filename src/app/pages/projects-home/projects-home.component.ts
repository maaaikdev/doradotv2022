import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/core/projects.service';

declare var $: any

@Component({
	selector: 'app-projects-home',
	templateUrl: './projects-home.component.html',
	styleUrls: ['./projects-home.component.scss']
})
export class ProjectsHomeComponent implements OnInit {

	@Input() dataVideo: any;

	constructor(
		public projecAuthor: ProjectsService
	) { }

	ngOnInit() {
	}

	withinProject(proj) {
		console.log("PROJECT para nuevo component", proj);
		this.projecAuthor.openProject(proj);
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
