import { autoinject } from 'aurelia-framework';
import { Auth } from '../api/index';
import { Router } from 'aurelia-router';

@autoinject()
export class Login {
  user = {email:'', password:''};

  constructor(public auth:Auth, public router: Router){}  
  
  async singin(){
    await this.auth.login(this.user);
    this.router.navigateToRoute('home');  
  }
}
