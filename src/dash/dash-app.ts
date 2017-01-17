import { RouterConfiguration, Router, RouteConfig } from 'aurelia-router';

export class DashApp {
  router: Router;
  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Vendedores';
    
    config.map([
       { route: ['', '/'], moduleId: 'dash/no-selection', name:'no-selection',  title: 'Select', nav:false},
       { route: '/:id',  moduleId: 'dash/vendor-detail',  name:'vendor-detail', nav:false }  
    ]);
    this.router = router;
  }
}
