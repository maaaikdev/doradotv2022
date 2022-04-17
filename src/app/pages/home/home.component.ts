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
				this.itemVideoNull = this.projectItem.filter(video => video.gif != null);
				//this.project.nextProject(this.projectsData.data);
				this.spinnerActive = false;
				//this.projectVideoItem = this.projectVideoItem.concat(this.project.openProject2(response.data));
			}			
		});
	}
	getProjectsHomeSlider(){
		this.spinnerActive = true;		
		this.broker.projectsItemsSlider().subscribe((response: any) => {					
			this.projectsDataSlider = response;
			this.projectItemSlider = this.projectsDataSlider.data;
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
