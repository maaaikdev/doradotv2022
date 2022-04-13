import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrokerService } from 'src/app/core/broker.service';
import { ProjectsService } from 'src/app/core/projects.service';
import { Location } from '@angular/common';

declare var $: any

@Component({
  selector: 'app-within-project',
  templateUrl: './within-project.component.html',
  styleUrls: ['./within-project.component.scss']
})
export class WithinProjectComponent implements OnInit {

	category: any;
	idProject: any;
	dataProject: any;
	videoVimeo: any;
	otherProject: any;
	colorBg: '';
	randomProjects: any;
	projectAdd: any;
	imgAdd: any;
	nanData: any;
	nextProjectUp: any;
	

	constructor(
		public addProject: ProjectsService,
		private activateRoute: ActivatedRoute,
		public router: Router,
		public broker: BrokerService,
		public _location: Location
	) {	}

	ngOnInit() {
		window.scrollTo(0, 0);
		this.changeColor(this.addProject.projectAuthor.services[0].service_id.slug);
		console.log("NEXT PROJECT A", this.addProject.nextProjectAdd)
		console.log("NEXT PROJECT 1", this.addProject.projectAuthor)
		this.nextProjectUp = this.addProject.nextProjectAdd.find((p) => p.id === this.addProject.projectAuthor.id+1);
		console.log("NEXT PROJECT 2", this.nextProjectUp)
	}

	withinProject(proj) {
		this.addProject.projectAuthor = proj;
		this.nextProjectUp = this.addProject.nextProjectAdd.find((p) => p.id === this.addProject.projectAuthor.id+1);
		if(this.nextProjectUp == undefined) {
			this.nextProjectUp = this.addProject.nextProjectAdd.data.shift();
		}
	}

	getBg(color) {
		switch (color) {			
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

	changeColor(bg) {
		var change = $(".project-in");
		switch (bg) {
			case 'edicion':
				change.addClass("edition");
				change.removeClass("color");
				change.removeClass("animation");
				change.removeClass("online");
				change.removeClass("music");
				break
			case 'correccion-de-color':
				change.addClass("color");
				change.removeClass("edition");
				change.removeClass("animation");
				change.removeClass("online");
				change.removeClass("music");
				break
			case 'animacion':
				change.addClass("animation");
				change.removeClass("color");
				change.removeClass("edition");
				change.removeClass("online");
				change.removeClass("music");
				break
			case 'online':
				change.addClass("online");
				change.removeClass("color");
				change.removeClass("animation");
				change.removeClass("edition");
				change.removeClass("music");
				break
			case 'musica-originall':
				change.addClass("music");
				change.removeClass("color");
				change.removeClass("animation");
				change.removeClass("online");
				change.removeClass("edition");
				break
			default:
				return '';
		}
	}

}
