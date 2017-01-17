import { animationEvent, autoinject } from 'aurelia-framework';
import { Rest } from './rest';

export interface User {email:string; password:string;}

@autoinject()
export class Auth {
  constructor(public rest: Rest) {}

  login(user: User){
    return this.rest.app.authenticate({
      type:'local',
      "email":user.email,
      "password":user.password 
    });
  }

  logout(){
    return this.rest.app.logout();
  }
  
  register(user: User): Promise<User>{
    return this.rest.post('signup', user);
  }

  isAuthenticated(){
    return !!this.rest.app.get('user'); 
  }

  getLoginRoute(): string{
    return '';
  }

  setInitialUrl(localtion: string){
    
  }

  getLoginRedirect(): string{
    return '';
  }
}
