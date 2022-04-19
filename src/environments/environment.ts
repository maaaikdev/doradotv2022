// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	apiEndPoint: 'https://admin.dorado.tv/doradotv/items',
	menuOptions: {
		menu: '/service',
		project: '/project',
		worker: '/worker',
		service: '/service'
	},
	filters: {
		projectFilter: '?filter[home_slider][nempty]&fields=*.*.*.*.*',
		projectHome:'?filter[home][nempty]&fields=*.*.*.*.*',
		workersProject: '?filter[slug][eq]=',
		projectPerService: '?filter[slug][eq]=',
		menuLang: '/menu?fields=*.*',
		projectsWorker: '?filter[workers.worker_id.slug]='
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
