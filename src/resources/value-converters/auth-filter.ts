import { NavModel } from 'aurelia-router';

export class AuthFilterValueConverter {
  toView(routes: NavModel[], isAuthenticated) {
    
    const isAuth = (r: NavModel) => 
      r.config['auth'] === undefined || 
      r.config['auth'] === isAuthenticated;
    
    return routes.filter(isAuth);
  }
}
