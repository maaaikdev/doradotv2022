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
	id: any;
	slug: string;
	author: string;
	nextProjectAdd: any;
	workers: any;
	workerData: any;
	authorWorker: any;
	projects: any;
	projectAuthor: any;
	projectsData: any;
	home: any;
	homeSlider: any;
	projectsDataSlider: any;
	

	constructor(
		public addProject: ProjectsService,
		private activateRoute: ActivatedRoute,
		public router: Router,
		public broker: BrokerService,
		public _location: Location
	) {
		this.id = this.activateRoute.snapshot.params['id'];
		this.slug = this.activateRoute.snapshot.params['slug'];
    	this.author = this.activateRoute.snapshot.params['author'];
	}

	ngOnInit() {		
		window.scrollTo(0, 0);
		this.home = localStorage.getItem('home');
		this.homeSlider = localStorage.getItem('home_slider')
		this.broker.projectsService(this.slug).subscribe((response: any) => {	
			this.workers = response;
			if(this.workers.data[0].workers[0] == undefined) {
				this.router.navigate(['/']);
			} else {
					this.changeColor();
					if(this.home == 'true' && this.homeSlider == 'true') {
						this.broker.projectsItemsSlider().subscribe((response: any) => {					
							this.projects = response.data;
							this.projects.sort(function(a, b){return a.sort_order - b.sort_order});	

							const refreshProject = this.projects.find((p) => p.id === parseInt(this.id));
							this.projectAuthor = refreshProject;
							const index = this.projects.findIndex( (element) => element.id === parseInt(this.id));
							this.getNextMember(this.projects, index);
							this.addProject.spinnerActive = false;	
						});	
					} else if (this.home == 'true' && this.homeSlider == 'false') {
						this.broker.projectsItemsHome().subscribe((response: any) => {
							this.projects = response.data;
							this.projects.sort(function(a, b){return a.sort_order - b.sort_order});	

							const refreshProject = this.projects.find((p) => p.id === parseInt(this.id));
							this.projectAuthor = refreshProject;
							const index = this.projects.findIndex( (element) => element.id === parseInt(this.id));
							this.getNextMember(this.projects, index);
							this.addProject.spinnerActive = false;
						});
					} else {
						this.broker.newProjectsWorker(this.author).subscribe((response: any) => {						
							this.authorWorker = response;
							this.projects = response.data;
							this.projects.sort(function(a, b){return a.sort_order - b.sort_order});	
	
							const refreshProject = this.projects.find((p) => p.id === parseInt(this.id));
							this.projectAuthor = refreshProject;
							const index = this.projects.findIndex( (element) => element.id === parseInt(this.id));
							this.getNextMember(this.projects, index)		
							this.addProject.spinnerActive = false;	
						});
					}					
			//	}
			}			
		});		
		this.addProject.spinnerActive = false;		
	}

	getNextMember(array, startIndex) {
		startIndex = startIndex || 0;
		startIndex++;
		this.nextProjectUp = array[startIndex];
	 };

	withinProject(proj, author, color, id, home, homeSlider) {
		this.addProject.openProject(proj, author, color, id, home, homeSlider);
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

	changeColor() {
		var change = $(".project-in");
		switch (this.slug) {			
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
			case 'musica-original':
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
