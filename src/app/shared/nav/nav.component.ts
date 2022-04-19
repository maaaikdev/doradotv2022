import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
// import { Console } from 'console';
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
	btnCta: any;
	color: any;
	logoDorado = '';
	insta = '';
	email = '';
	vimeo = '';
	socialPurple = true;
	socialGold = false;
	slug: any;
	urlSplit: any;
	light = false;
	dark = false;
	langTxt = 'EN';
	menuItems: any;
	item: any;
	about = 'Acerca de'
	rrSS = [
		{
			title:"DoradoTV Instagram",
			img: "assets/images/nav/social-instagram.svg",
			imgMobile: "assets/images/footer/social-instagram.svg",
			alt: "Social Media DoradoTV",
			link: "https://www.instagram.com/dorado.tv/"
		},
		{
			title:"DoradoTV Email",
			img: "assets/images/nav/social-mail.svg",
			imgMobile: "assets/images/footer/social-mail.svg",
			alt: "Social Media DoradoTV",
			link: "mailto:contacto@dorado.tv"
		},
		{
			title:"DoradoTV Vimeo",
			img: "assets/images/nav/social-vimeo.svg",
			imgMobile: "assets/images/footer/social-vimeo.svg",
			alt: "Social Media DoradoTV",
			link: "https://vimeo.com/doradotv"
		},
	]

	constructor(
		public broker: BrokerService,
		private router: Router,
		public project: ProjectsService,
		private activateRoute: ActivatedRoute
	) {
		this.slug = this.activateRoute.snapshot.params['slug'];
	}

	@HostListener('window:scroll', ['$event'])
	onScroll(event) {
		if (window.pageYOffset !== 0) {
			this.scroll = true;
		} else {
		this.scroll = false;
		}
	}

	ngOnInit() {	
		var lang = localStorage.getItem('lang');
		this.lang(lang)

		this.configHeader();
		this.logo()
		this.btnColorMobile()
		// this.broker.menuOptions().subscribe((response: any) => {
		// 	this.menuArray = response.data;
		// 	this.menuArray.forEach(element => {
		// 		this.btnCta = element.id,
		// 		this.color = element.slug
		// 	});	
		// });
		this.broker.languageApp().subscribe((response: any) => {
			this.menuItems = response.data;
		})
	}

	lang(l){
		localStorage.setItem('lang', l)
		var lang = localStorage.getItem('lang');
		if(lang == 'es') {
			this.langTxt = 'ES';
			this.about = 'Acerca de'
			window.onload
		} else {
			this.langTxt = 'EN';
			this.about = 'About'
			window.onload
		}
		return this.langTxt
	}

	author(category){
		switch (category) {					
			case 'edicion':
				//this.router.navigate(['/studio/'+category+'/'+this.menuItems[6].slug+''])
				this.router.navigate(['/studio/'+category+'/'+this.menuItems[6].slug+'']).then(() => {
					window.location.reload();
				});
				break;
			case 'correccion-de-color':
				this.router.navigate(['/studio/'+category+'/'+this.menuItems[9].slug+'']).then(() => {
					window.location.reload();
				});
				break;
			case 'animacion':
				this.router.navigate(['/studio/'+category+'/'+this.menuItems[4].slug+'']).then(() => {
					window.location.reload();
				});
				break;
			case 'online':
				this.router.navigate(['/studio/'+category+'/'+this.menuItems[5].slug+'']).then(() => {
					window.location.reload();
				});
				break;
			case 'musica-original':
				this.router.navigate(['/studio/'+category+'/'+this.menuItems[12].slug+'']).then(() => {
					window.location.reload();
				});
				break;
			default:
				return '';
		}
	}
	configHeader() {
		this.router.events.subscribe((val) => {
			if (val instanceof NavigationEnd) {
				this.url = val.url.split('?')[0];
				if(this.url == '/') {
					this.light = true;
					this.dark = false;
				} else {
					var urlSplit = this.url.split("/")[2];
					this.urlSplit = urlSplit;
					switch (this.urlSplit) {			
						case 'edicion':
							this.dark = true;
							break
						case 'correccion-de-color':
							this.dark = true;
							break
						case 'animacion':
							this.dark = true;
							break
						case 'online':
							this.light = true;
							break
						case 'musica-original':
							this.dark = true;
							break
						default:
							return '';
					}
				}				
		   	}			
	  	});
	}

	onButtonGroupClick($event){
		let clickedElement = $event.target || $event.srcElement;	
		if( clickedElement.nodeName === "A" ) {	
		  let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
		  if( isCertainButtonAlreadyActive ) {
			isCertainButtonAlreadyActive.classList.remove("active");
		  }	
		  clickedElement.className += " active";
		}	
	}

	logo() {
		if ($(window).width() >= 768) {			
			switch (this.color) {			
				case 'edicion, correccion-de-color, animacion, musica-original':
					this.logoDorado = 'assets/images/nav/icon-dorado.svg'
					break
				case 'online':
					this.logoDorado = 'assets/images/nav/logo-DorardoTV-icon.png' 
					break
				default:
					this.logoDorado = 'assets/images/nav/icon-dorado.svg'
					break
			}
		} else {
			this.logoDorado = 'assets/images/nav/logo-DorardoTV-icon.png' 		
		}
	}

	btnColorMobile() {
		if ($(window).width() >= 768) {
			$("#btn0").removeClass("edition");
			$("#btn1").removeClass("color");
			$("#btn2").removeClass("music");
			$("#btn3").removeClass("animation");
			$("#btn4").removeClass("online");
		} else {
			$("#btn0").addClass("edition");
			$("#btn1").addClass("color");
			$("#btn2").addClass("music");
			$("#btn3").addClass("animation");
			$("#btn4").addClass("online");
		}
	}

	changeColor(bg) {
		var change = $(".modal-body");
		var about = $(".section-about a");
		if ($(window).width() >= 768) {				
			switch (bg) {
				case 'edicion':
					this.logoDorado = 'assets/images/nav/icon-dorado.svg';
					this.socialPurple = true;
					this.socialGold = false;
					change.addClass("edition");
					change.removeClass("color");
					change.removeClass("animation");
					change.removeClass("online");
					change.removeClass("music");						
					about.removeClass("gold");					
					break
				case 'correccion-de-color':
					this.logoDorado = 'assets/images/nav/icon-dorado.svg';
					this.socialPurple = true;
					this.socialGold = false;
					change.addClass("color");
					change.removeClass("edition");
					change.removeClass("animation");
					change.removeClass("online");
					change.removeClass("music");					
					about.removeClass("gold");
					
					break
				case 'animacion':
					this.logoDorado = 'assets/images/nav/icon-dorado.svg';
					this.socialPurple = true;
					this.socialGold = false;
					change.addClass("animation");
					change.removeClass("color");
					change.removeClass("edition");
					change.removeClass("online");
					change.removeClass("music");
					about.removeClass("gold");
					break
				case 'online':
					this.logoDorado = 'assets/images/nav/logo-DorardoTV-icon.png';
					this.socialPurple = false;
					this.socialGold = true;
					change.addClass("online");
					change.removeClass("color");
					change.removeClass("animation");
					change.removeClass("edition");
					change.removeClass("music");					
					about.addClass("gold");
					break
				case 'musica-original':
					this.logoDorado = 'assets/images/nav/icon-dorado.svg';
					this.socialPurple = true;
					this.socialGold = false;
					change.addClass("music");
					change.removeClass("color");
					change.removeClass("animation");
					change.removeClass("online");
					change.removeClass("edition");
					about.removeClass("gold");
					break
				default:
					return '';
			}
		} else {
			this.logoDorado = 'assets/images/nav/icon-dorado.svg';
			this.socialPurple = false;
			this.socialGold = true;
		}
	}
}
