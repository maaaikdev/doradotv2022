import { Component, Injectable, Input, OnInit, TemplateRef } from '@angular/core';
import { ProjectsService } from 'src/app/core/projects.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare var $: any

@Component({
	selector: 'app-projects-home',
	templateUrl: './projects-home.component.html',
	styleUrls: ['./projects-home.component.scss']
})
export class ProjectsHomeComponent implements OnInit {

	projectArray: any;
	modalRef?: BsModalRef;
	projectAuthor: any;
	projectItemSlider: any;
	nextProjectUp: any;

	@Input() dataVideo: any;

	constructor(
		public projecAuthor: ProjectsService,
		private modalService: BsModalService
	) { }


	ngOnInit() {
	}

	withinProject(proj, author, color, id, home, homeSlider) {
		this.projecAuthor.openProjectHome(proj, author, color, id, home, homeSlider);
	}

	withinProjectHome(proj, author, color, id, home, homeSlider) {
		this.projecAuthor.openProjectHome2(proj, author, color, id, home, homeSlider);
	}

	//NEW MODAL
	openModal(template: TemplateRef<any>, item) {
		this.modalRef = this.modalService.show(template);
		this.projectAuthor = item
		const refreshProject = this.dataVideo.find((p) => p.id === parseInt(this.projectAuthor.id));
		const index = this.dataVideo.findIndex( (element) => element.id === parseInt(this.projectAuthor.id));
		this.getNextMember(this.dataVideo, index);
	}

	nextProject(nextProjectUp){
		this.projectAuthor = nextProjectUp
		const refreshProject = this.dataVideo.find((p) => p.id === parseInt(this.projectAuthor.id));
		const index = this.dataVideo.findIndex( (element) => element.id === parseInt(this.projectAuthor.id));
		this.getNextMember(this.dataVideo, index);
	}

	getNextMember(array, startIndex) {
		const ultimoElemento = array[array.length - 1]
		startIndex = startIndex || 0;
		startIndex++;
		if(this.nextProjectUp == ultimoElemento){
			this.nextProjectUp = array[0];
		}
		 else if(this.projectAuthor == ultimoElemento) {
			this.nextProjectUp = array[0];
		} 
		else {
			this.nextProjectUp = array[startIndex];
		}
	};

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
