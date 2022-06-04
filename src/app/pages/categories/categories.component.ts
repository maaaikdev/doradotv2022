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
	animationPorj: any;
	lang: string;
	public activePillIndex:number = 0;
	activeTabTemplate: any;
	
	constructor(
		private activateRoute: ActivatedRoute,
		public broker: BrokerService,
		public project: ProjectsService,
		public router: Router,
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
			
			if(this.workers.data[0] == undefined) {
				$("#menuModal").modal('hide');
				this.router.navigate(['/'])
			} else {				
				if(this.slug == 'animacion') {
					if(this.workers.data[0].reel != "") {
					} else {
						$("#menuModal").modal('hide');
						this.router.navigate(['/'])
					}					
				} else {	
					 			
					this.workerData = this.workers.data[0].workers[0];
					$("#menuModal").modal('hide');					
					this.broker.newProjectsPerServiceAndWorker(slug, author).subscribe((response: any) => {					
						this.authorWorker = response.data;
						console.log(this.authorWorker)
						this.projects = this.authorWorker;
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

	withinProject(proj, color, id, home, homeSlider) {
		this.project.openProject(proj, color, id, home, homeSlider);
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
