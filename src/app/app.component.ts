import { BrokerService } from './core/broker.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'doradoTV';
	constructor(
		// public broker: BrokerService
	) { 
		// this.broker.menuOptions().subscribe((response: any) => {
		// 	console.log("MENU", response)
		// });

		// this.broker.projectsItems().subscribe((response: any) => {
		// 	console.log("PROJECTS", response)
		// });

		// this.broker.workerItems().subscribe((response: any) => {
		// 	console.log("WORKERS", response)
		// });
	}
}
