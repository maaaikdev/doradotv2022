import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BrokerService } from 'src/app/core/broker.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectsService } from 'src/app/core/projects.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	modalRef?: BsModalRef;
	projectsData: any;
	projectItem: any;
	projectVideo: string;
	sanitizedVideos: any;
	projectsDataSlider: any;
	projectItemSlider: any;
	itemVideoNull: any;
	projectVideoItem = [];
	spinnerActive = true;
	nextProjectUp: any;

	//NEW MODAL
	projectAuthor: any;

	constructor(
		public broker: BrokerService,
		private sanitazer: DomSanitizer,
		public project: ProjectsService,
		private modalService: BsModalService
	) {	 }

	ngOnInit() {
		window.scrollTo(0, 0);
		this.getProjectsHome();
		this.getProjectsHomeSlider();		
	}

	getProjectsHome(){
		this.spinnerActive = true;	
		this.broker.projectsItemsHome().subscribe((response: any) => {
			if(response != undefined) {
				this.projectsData = response;
				this.projectItem = this.projectsData.data;
				this.projectItem = this.projectItem.sort((a,b)=> (a.order_home > b.order_home) ? 1 : -1) 

				this.itemVideoNull = this.projectItem.filter(video => video.gif != null);
				this.itemVideoNull.sort(function(a, b){return a.sort_order - b.sort_order});
				this.spinnerActive = false;
			}			
		});
	}
	getProjectsHomeSlider(){
		this.spinnerActive = true;		
		this.broker.projectsItemsSlider().subscribe((response: any) => {					
			this.projectsDataSlider = response;
			this.projectItemSlider = this.projectsDataSlider.data;
			this.projectItemSlider.sort(function(a, b){return a.sort_order - b.sort_order});
			this.spinnerActive = false;
		});		
	}

	//NEW MODAL
	openModal(template: TemplateRef<any>, item) {
		this.modalRef = this.modalService.show(template);
		this.projectAuthor = item
		const refreshProject = this.projectItemSlider.find((p) => p.id === parseInt(this.projectAuthor.id));
		const index = this.projectItemSlider.findIndex( (element) => element.id === parseInt(this.projectAuthor.id));
		this.getNextMember(this.projectItemSlider, index);
	}

	nextProject(nextProjectUp){
		this.projectAuthor = nextProjectUp
		const refreshProject = this.projectItemSlider.find((p) => p.id === parseInt(this.projectAuthor.id));
		const index = this.projectItemSlider.findIndex( (element) => element.id === parseInt(this.projectAuthor.id));
		this.getNextMember(this.projectItemSlider, index);
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

	getVideoCarousel(items) {
		this.projectVideo = items.filter(video => video.home_slider === true)		
	}
	
	getVideo(){
		return this.sanitazer.bypassSecurityTrustResourceUrl(this.projectVideo);
	}

	scrollToElement($element): void {
		$element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
	}	

	withinProject(proj, author, color, id, home, homeSlider) {
		this.project.openProjectHome2(proj, author, color, id, home, homeSlider);
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
}
