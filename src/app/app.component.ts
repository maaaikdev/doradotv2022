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
		// localStorage.setItem('lang', 'es')
	}
}
