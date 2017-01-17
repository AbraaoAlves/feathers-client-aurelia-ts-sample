import { Factory, autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import * as feathers from 'feathers-client';
import * as localforage from 'localforage';

@autoinject()
export class Rest {
  private _baseUrl = 'http://localhost:3030';
  isRequesting = false;

  public app  : feathers.Application;
  constructor(public http: HttpClient) {

    this.app = feathers()
    
    let rest = feathers.rest(this._baseUrl);
    
    this.app
      .configure(feathers.hooks())
      .configure(rest.fetch(http.fetch.bind(http)))
      .configure(feathers.authentication({ storage: localforage }));
  }

  async post(url, data){
    url = this._baseUrl + '/' + url;
    
    let resp = await this.http.fetch(url, {
      method:'post',
      body:json(data)
    });
    
    return await resp.json();
  }
} 
   