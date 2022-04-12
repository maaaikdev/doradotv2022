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

	constructor(
		public broker: BrokerService,
		private sanitazer: DomSanitizer,
		public project: ProjectsService
	) { }

	ngOnInit() {
		this.getProjectsHome();
		this.getProjectsHomeSlider();		
	}

	getProjectsHome(){
		this.broker.projectsItemsHome().subscribe((response: any) => {
			if(response != undefined) {
				this.projectsData = response;
				console.log("PROJECT DATA HOME", this.projectsData)
				this.projectItem = this.projectsData.data;
				this.itemVideoNull = this.projectItem.filter(video => video.gif != null);
				this.project.nextProject(this.projectsData);
				//this.projectVideoItem = this.projectVideoItem.concat(this.project.openProject2(response.data));
			}			
		});
	}
	getProjectsHomeSlider(){
		this.broker.projectsItemsSlider().subscribe((response: any) => {			
			this.projectsDataSlider = response;
			this.projectItemSlider = this.projectsDataSlider.data
			console.log("PROJECTS SLIDER", this.projectsDataSlider)
		});		
	}

	getVideoCarousel(items) {
		console.log("ITEMSSSS", items)
		this.projectVideo = items.filter(video => video.home_slider === true)
		console.log("FILTRO", this.projectVideo)		
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
