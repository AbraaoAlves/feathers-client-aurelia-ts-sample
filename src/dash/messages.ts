import { autoinject } from 'aurelia-framework';
import { Vendor } from '../vendor';

@autoinject()
export class VendorUpdated {
  constructor(public user:Vendor){
  }
}

@autoinject()
export class VendorViewed {
  constructor(public user: Vendor){
  }
}
