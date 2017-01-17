import { autoinject } from 'aurelia-framework';
import { Auth, AuthStep, Rest } from './api/index';
import {RouterConfiguration, Router} from 'aurelia-router';
import routes from './routes/index';

@autoinject()
export class App {
  router: Router;
   
  constructor(public api: Rest, public auth: Auth) {}

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.title = 'App'; 
    config.options.pushState = true;
    config.options.root = '/';

    config.addPipelineStep('authorize', AuthStep); 

    config.map([...routes, {route:'', redirect: 'home'}]);
    
    config.mapUnknownRoutes('pages/not-found');
  }
}
