import { Component, OnInit } from '@angular/core';
import { BrokerService } from 'src/app/core/broker.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectsService } from 'src/app/core/projects.service';
import { NgxSpinnerService } from "ngx-spinner";

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
	spinner1 = 'sp1';
	spinnerActive = true

	constructor(
		public broker: BrokerService,
		private sanitazer: DomSanitizer,
		public project: ProjectsService,
		private spinner: NgxSpinnerService
	) {	 }

	ngOnInit() {
		this.getProjectsHome();
		this.getProjectsHomeSlider();		
	}

	getProjectsHome(){
		this.broker.projectsItemsHome().subscribe((response: any) => {
			if(response != undefined) {
				this.projectsData = response;
				this.projectItem = this.projectsData.data;
				this.itemVideoNull = this.projectItem.filter(video => video.gif != null);
				this.project.nextProject(this.projectsData);
				//this.projectVideoItem = this.projectVideoItem.concat(this.project.openProject2(response.data));
			}			
		});
	}
	getProjectsHomeSlider(){
		// this.spinner.show('spinner1')
		this.spinnerActive = true;
		
		this.broker.projectsItemsSlider().subscribe((response: any) => {					
			this.projectsDataSlider = response;
			this.projectItemSlider = this.projectsDataSlider.data;
			this.spinnerActive = false;
			// setTimeout(() => {
			// 	/** spinner ends after 5 seconds */
			// 	this.spinner.hide();
			// }, 5000);	
		});		
	}

	getVideoCarousel(items) {
		this.projectVideo = items.filter(video => video.home_slider === true)		
	}
	
	getVideo(){
		return this.sanitazer.bypassSecurityTrustResourceUrl(this.projectVideo);
	}

	scrollToElement($element): void {
		console.log($element);
		$element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
	}

	withinProject(proj) {
		console.log("PROJECT para nuevo component", proj);
		this.project.openProject(proj);
	}
}
