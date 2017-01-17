import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Auth } from '../api/index';

@autoinject()
export class Register {
  user = {email:'', password:''};
  
  constructor(public auth: Auth, public router: Router){}
  
  async singup(){
    debugger;
    let user = await this.auth.register(this.user);
    await this.auth.login(this.user);
    
    this.router.navigateToRoute('dash');  
  }
}
    