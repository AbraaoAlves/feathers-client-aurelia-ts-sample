import { Router } from 'aurelia-router';
import { noView, autoinject } from 'aurelia-framework';
import { Auth } from '../api/index';

@noView()
@autoinject()
export class Logout {
  constructor(private auth: Auth, private router: Router){}
  
  async activate(){
    await this.auth.logout();
    this.router.navigate('login');
  }
}
    