import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RouteConfig } from 'aurelia-router';

import { VendorUpdated,VendorViewed } from './messages';
import { areEqual } from './utility';
import { Vendor } from '../vendor';
import { WebAPI } from '../web-api';

type VendorType =  new (vendor:Vendor) => VendorUpdated | VendorViewed;

@autoinject()
export class VendorDetail {
  vendor: Vendor;
  routeConfig: RouteConfig;
  originalVendor: Vendor;

  constructor(public api: WebAPI, public ea: EventAggregator){}

  private updateInfoMethod(vendorConstructor: VendorType){
    return (vendor:Vendor) => {
      this.vendor = vendor;
      this.routeConfig.navModel.setTitle(vendor.name);
      this.originalVendor = JSON.parse(JSON.stringify(vendor));
      
      this.ea.publish(new vendorConstructor(vendor));
    };
  }

  activate(params: any, routeConfig: RouteConfig){
    this.routeConfig = routeConfig;
    
    return this.api.getContactDetails(params.id)
      .then(this.updateInfoMethod(VendorViewed));
  }

  get canSave(){
    return this.vendor.name && this.vendor.cpf && !this.api.isRequesting;
  }

  save(){
    this.api.saveContact(this.vendor)
      .then(this.updateInfoMethod(VendorUpdated));
  }
  
  cancel(){

  }

  canDeactivate(){
    if(!areEqual(this.originalVendor, this.vendor)){
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if(!result){
        this.ea.publish(new VendorViewed(this.vendor));
      }

      return result;
    }

    return true;
  }
}
