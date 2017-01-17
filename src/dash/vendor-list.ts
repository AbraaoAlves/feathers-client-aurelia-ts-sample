import { autoinject } from 'aurelia-framework';
import { Vendor } from '../vendor';
import { WebAPI } from '../web-api';
import {EventAggregator} from 'aurelia-event-aggregator';
import {VendorUpdated, VendorViewed} from './messages';

@autoinject()
export class VendorList {
  selectedId:number = null;
  vendors:Vendor[] = [];

  constructor(public api: WebAPI, public ea:EventAggregator){
    ea.subscribe(VendorViewed, (msg:VendorViewed) => this.select(msg.user));
    ea.subscribe(VendorUpdated, (msg:VendorUpdated) => {
      let id = msg.user.id;
      let found = this.vendors.find(x => x.id == id);
      
      Object.assign(found, msg.user);
    });
  }

  created(){
    this.api.getContactList().then(vendors => this.vendors = vendors);
  }

  select(vendor){
    this.selectedId = vendor.id;
    return true;
  }

  mask(cpf){
    return cpf;
  }
}
