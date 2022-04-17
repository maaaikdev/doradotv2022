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
		console.log("DATA WITHIN PROJECT", [parseInt(this.id), this.slug, this.author])
	}

	ngOnInit() {		
		window.scrollTo(0, 0);
		this.home = localStorage.getItem('home');
		this.homeSlider = localStorage.getItem('home_slider')
		console.log("HOMEEEEE LOCAL STORAGE", this.home);
		console.log("HOMEEEEE LOCAL STORAGE SLIDER", this.homeSlider)
		this.broker.projectsService(this.slug).subscribe((response: any) => {	
			this.workers = response;
			console.log("TTTTTTTT 1", this.workers)		
			if(this.workers.data[0].workers[0] == undefined) {
				this.router.navigate(['/']);
			} else {
				if(this.home == 'true' && this.homeSlider == 'false') {
					console.log("ENTRE AL PROYECTOS HOME");
					this.broker.workerProjects(this.author).subscribe((response: any) => {
						this.authorWorker = response;
						this.broker.projectsItemsHome().subscribe((response: any) => {
							this.projectsData = response;
							this.projects = this.projectsData.data
							const refreshProject = this.projects.find((p) => p.id === parseInt(this.id));
							this.projectAuthor = refreshProject
							console.log("TTTTTTTT 2 HOME", this.projectAuthor);
							const nextProject = this.projects[Math.floor(Math.random() * this.projects.length)];
							this.nextProjectUp = nextProject;			
							console.log("NEXT-Project", this.nextProjectUp);
							this.changeColor();
							this.addProject.spinnerActive = false;		
						});						
					});
				} else if(this.home == 'true' && this.homeSlider == 'true'){
					console.log("ENTRE AL HOME SLIDER");
					this.broker.workerProjects(this.author).subscribe((response: any) => {
						this.authorWorker = response;	
						this.broker.projectsItemsSlider().subscribe((response: any) => {					
							this.projectsDataSlider = response;
							this.projects = this.projectsDataSlider.data
							const refreshProject = this.projects.find((p) => p.id === parseInt(this.id));
							this.projectAuthor = refreshProject
							console.log("TTTTTTTT 2 HOME", this.projectAuthor);
							const nextProject = this.projects[Math.floor(Math.random() * this.projects.length)];
							this.nextProjectUp = nextProject;			
							console.log("NEXT-Project", this.nextProjectUp);
							this.changeColor();
							this.addProject.spinnerActive = false;	
						});				
					});
				}else {
					console.log("ENTRE AL PROYECTOS CATEGORIA")
					this.broker.workerProjects(this.author).subscribe((response: any) => {
						this.authorWorker = response;
						console.log("TTTTTTTT 2", this.authorWorker)
						this.projects = this.authorWorker?.data[0].projects;
						console.log("ProjectSSSS", this.projects);
						const refreshProject = this.projects.find((p) => p.project_id.id === parseInt(this.id));
						this.projectAuthor = refreshProject.project_id;
						console.log("MAIN-Project", this.projectAuthor);
						const nextProject = this.projects[Math.floor(Math.random() * this.projects.length)];
						this.nextProjectUp = nextProject?.project_id;			
						console.log("NEXT-Project", this.nextProjectUp);
						this.changeColor();
						this.addProject.spinnerActive = false;	
					});
				}
			}			
		});
		this.addProject.spinnerActive = false;		
	}
	withinProject(proj, author, id, home, homeSLider) {
		console.log("PROJJ NEXT PROYECT", [proj, author, id, home, homeSLider])
		this.addProject.openProject(proj, author, id, home, homeSLider);
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
		console.log("COLOR BG", this.slug)
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
