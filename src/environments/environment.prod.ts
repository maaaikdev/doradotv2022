export const environment = {
  production: true,
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
