import { Component, OnInit } from '@angular/core';
import { BrokerService } from 'src/app/core/broker.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectsService } from 'src/app/core/projects.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	projectsData: any;
	projectItem: any;
	projectVideo: string;
	sanitizedVideos: any;
	projectsDataSlider: any;
	projectItemSlider: any;
	itemVideoNull: any;
	projectVideoItem = [];
	spinnerActive = true

	constructor(
		public broker: BrokerService,
		private sanitazer: DomSanitizer,
		public project: ProjectsService,
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
				this.spinnerActive = false;
			}			
		});
	}
	getProjectsHomeSlider(){
		this.spinnerActive = true;		
		this.broker.projectsItemsSlider().subscribe((response: any) => {					
			this.projectsDataSlider = response;
			this.projectItemSlider = this.projectsDataSlider.data;
			this.projectItemSlider = this.projectItemSlider.sort((a,b)=> (a.order_home > b.order_home) ? 1 : -1) 
			this.spinnerActive = false;
		});		
	}

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
}
