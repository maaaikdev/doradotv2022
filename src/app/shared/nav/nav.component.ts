import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BrokerService } from 'src/app/core/broker.service';
import { ProjectsService } from 'src/app/core/projects.service';

declare var $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
	menuArray: any;
	url: any;
	bgCategory: any;
	scroll = false;

	constructor(
		public broker: BrokerService,
		private router: Router,
		public project: ProjectsService
	) {		}

	@HostListener('window:scroll', ['$event'])
	onScroll(event) {
		if (window.pageYOffset !== 0) {
			this.scroll = true;
		} else {
		this.scroll = false;
		}
	}

	ngOnInit() {
		this.configHeader();
		this.broker.menuOptions().subscribe((response: any) => {
			this.menuArray = response.data;
		});
	}
	configHeader() {
		this.router.events.subscribe((val) => {
			if (val instanceof NavigationEnd) {
			  this.url = val.url.split('?')[0];			  
		   	}
			if(this.url == '/project') {
				
			}
	  });
	}

	onButtonGroupClick($event){
		let clickedElement = $event.target || $event.srcElement;
	
		if( clickedElement.nodeName === "A" ) {
	
		  let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
		  // if a Button already has Class: .active
		  if( isCertainButtonAlreadyActive ) {
			isCertainButtonAlreadyActive.classList.remove("active");
		  }
	
		  clickedElement.className += " active";
		}
	
	}

	changeColor(bg) {
		var change = $(".modal-body");
		var btnMenu = $(".btn-aMenu");
		switch (bg) {
			case 'Edición':
				change.addClass("edition");
				change.removeClass("color");
				change.removeClass("animation");
				change.removeClass("online");
				change.removeClass("music");			
				break
			case 'Corrección de Color':
				change.addClass("color");
				change.removeClass("edition");
				change.removeClass("animation");
				change.removeClass("online");
				change.removeClass("music");				
				break
			case 'Animación':
				change.addClass("animation");
				change.removeClass("color");
				change.removeClass("edition");
				change.removeClass("online");
				change.removeClass("music");				
				break
			case 'Online':
				change.addClass("online");
				change.removeClass("color");
				change.removeClass("animation");
				change.removeClass("edition");
				change.removeClass("music");
				break
			case 'Música Original':
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
