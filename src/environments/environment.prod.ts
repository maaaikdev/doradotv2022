export const environment = {
  production: true,
  apiEndPoint: 'https://admin.dorado.tv/doradotv/items',
  menuOptions: {
	menu: '/service',
	project: '/project',
	worker: '/worker',
	service: '/service',
	home_projects:'/home_projects',
	slider_projects:'/slider_projects'
},
filters: {
	projectFilter: '?filter[home_slider][nempty]&fields=*.*.*.*.*',
	projectHome:'?filter[home][nempty]&fields=*.*.*.*.*',
	workersProject: '?filter[slug][eq]=',
	projectPerService: '?filter[slug][eq]=',
	menuLang: '/menu?fields=*.*',
	newProjectsWorker: 'filter[workers.worker_id.slug]=',
	newProjectsService: 'filter[services.service_id.slug]=',
	fields:'&fields=*.*.*.*.*'
}
};
