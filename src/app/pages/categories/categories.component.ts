import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrokerService } from 'src/app/core/broker.service';
import { ProjectsService } from 'src/app/core/projects.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
	modalRef?: BsModalRef;
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
	animationPorj: any;
	lang: string;
	public activePillIndex:number = 0;
	activeTabTemplate: any;
	projectAuthor: any;
	projectItemSlider: any;
	nextProjectUp: any;
	area:any;
	
	constructor(
		private activateRoute: ActivatedRoute,
		public broker: BrokerService,
		public project: ProjectsService,
		public router: Router,
		private modalService: BsModalService
	) {
		this.slug = this.activateRoute.snapshot.params['slug'];
    	this.author = this.activateRoute.snapshot.params['author'];
		this.projectItems(this.slug, this.author);
		if(localStorage.getItem('activeTabTemplate')){
			this.activeTabTemplate = localStorage.getItem('activeTabTemplate');
			setTimeout(() => {
				$('#worker'+this.activeTabTemplate+'-tab').addClass('active');
			}, 1600);
		} else {
		}
	}

	ngOnInit() {
		this.getBg();		
		this.lang = localStorage.getItem('lang');		
		
	}

	private projectItems(slug, author) {		
		this.broker.projectsService(slug).subscribe((response: any) => {
			this.project.spinnerActive = true;
			this.workers = response;
			this.workers.data[0].workers.sort((a,b)=> (a.worker_id.sort > b.worker_id.sort) ? 1 : -1)
			this.area = this.workers?.data[0].translations.find(a=>a.language === this.lang);
			console.log("aaaareaaaa")
			console.log(this.area.translation);
			
			if(this.workers.data[0] == undefined) {
				$("#menuModal").modal('hide');
				this.router.navigate(['/'])
			} else {				
				if(this.slug == 'animacion') {
					if(this.workers.data[0].reel != "") {
						this.project.spinnerActive = false;	
					} else {
						$("#menuModal").modal('hide');
						this.router.navigate(['/'])
					}					
				} else {	
					 			
					this.workerData = this.workers.data[0].workers[0];
					$("#menuModal").modal('hide');					
					this.broker.newProjectsPerWorker( author).subscribe((response: any) => {					
						this.authorWorker = response.data;
						this.authorWorker = this.authorWorker.sort((a,b)=> (a.sort > b.sort) ? 1 : -1); 

						this.projects= this.authorWorker.map(function(e){
							return e.project;
						});
						this.projects = this.projects.filter(video => video.status == "published");

						this.project.spinnerActive = false;	
					});					
				}				
			}			
		});		
	}

	tabData(names, index, slug) {
		this.workerData = names;
		localStorage.setItem('activeTabTemplate', index);
		this.router.navigate(['/studio/'+this.slug+'/'+this.workerData.worker_id.slug+'']).then(() => {
			this.projectItems(this.slug, this.workerData.worker_id.slug);
			window.location.reload();
		});
	}

	lineBreak(txt) {
		txt.replace(/\s+/g, " ").trim();
		return txt
	}

	videoModal(projects) {
		this.captureVideo = projects;
	}

	withinProject(proj, author, color, id, home, homeSlider) {
		this.project.openProject(proj, author, color, id, home, homeSlider);
	}

	//NEW MODAL
	openModal(template: TemplateRef<any>, item) {
		this.modalRef = this.modalService.show(template);
		this.projectAuthor = item
		const refreshProject = this.projects.find((p) => p.id === parseInt(this.projectAuthor.id));
		const index = this.projects.findIndex( (element) => element.id === parseInt(this.projectAuthor.id));
		this.getNextMember(this.projects, index);
	}

	nextProject(nextProjectUp){
		this.projectAuthor = nextProjectUp
		const refreshProject = this.projects.find((p) => p.id === parseInt(this.projectAuthor.id));
		const index = this.projects.findIndex( (element) => element.id === parseInt(this.projectAuthor.id));
		this.getNextMember(this.projects, index);
	}

	getNextMember(array, startIndex) {
		const ultimoElemento = array[array.length - 1]
		startIndex = startIndex || 0;
		startIndex++;
		//this.nextProjectUp = array[startIndex];
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
			case 'diseno-sonoro-y-mezcla':
				return 'music';
				break	
			default:
				return '';
		}		
	}

	

	getBgFill(category) {
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
			case 'diseno-sonoro-y-mezcla':
				return 'music';
				break		
			default:
				return '';
		}		
	}
}
