import { autoinject } from 'aurelia-framework';
import {
  Redirect, PipelineStep, NavigationInstruction, Next
} from 'aurelia-router';

import { Auth } from './auth';

@autoinject()
export class AuthStep implements PipelineStep {
  constructor(public auth: Auth) {}

  run(routingContext:NavigationInstruction, next: Next) {
    const isLoggedIn = this.auth.isAuthenticated();
    const loginRoute = this.auth.getLoginRoute();
    
    const instructions = routingContext.getAllInstructions();
    
    const hasAuthConfig = instructions.some((i:any) => i.config.auth)
    const hasLoginRoute = instructions.some(i => i.fragment === loginRoute);

    if (hasAuthConfig) {
      if (!isLoggedIn) {
        this.auth.setInitialUrl(window.location.href);
        
        return next.cancel(new Redirect(loginRoute));
      }
    } else if (isLoggedIn && hasLoginRoute) {
      let loginRedirect = this.auth.getLoginRedirect();
      
      return next.cancel(new Redirect(loginRedirect));
    }

    return next();
  }
}
