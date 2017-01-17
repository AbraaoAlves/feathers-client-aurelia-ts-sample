import {Vendor} from './vendor';

let latency = 200;
let id = 0;

const getId = () => ++id;


let contacts:Vendor[] = [
  {
    id:getId(),
    name:'John Tolkien',
    cpf:'02139085300',
    email:'tolkien@inklings.com',
    phoneNumber:'867-5309',
    senha:'123456'
  },
  {
    id:getId(),
    name:'Clive Lewis',
    cpf:'02139085301',
    email:'lewis@inklings.com',
    phoneNumber:'867-5309',
    senha:'123456'
  },
  {
    id:getId(),
    name:'Owen Barfield',
    cpf:'02139085302',
    email:'barfield@inklings.com',
    phoneNumber:'867-5309',
    senha:'123456'
  },
  {
    id:getId(),
    name:'Charles Williams',
    cpf:'02139085303',
    email:'williams@inklings.com',
    phoneNumber:'867-5309',
    senha:'123456'
  },
  {
    id:getId(),
    name:'Roger Green',
    cpf:'02139085304',
    email:'green@inklings.com',
    phoneNumber:'867-5309',
    senha:'123456'
  }
];

export class WebAPI {
  isRequesting = false;
  
  getContactList() : Promise<Vendor[]>{
    this.isRequesting = true;
    return new Promise<Vendor[]>(resolve => {
      setTimeout(() => {
        let results = contacts.map(x =>  
          ({ id:x.id, name:x.name, cpf:x.cpf, email:x.email })
        );
        resolve(<Vendor[]>results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getContactDetails(id) : Promise<Vendor>{
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = contacts.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveContact(contact): Promise<Vendor>{
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(contact));
        let found = contacts.filter(x => x.id == contact.id)[0];

        if(found){
          let index = contacts.indexOf(found);
          contacts[index] = instance;
        }else{
          instance.id = getId();
          contacts.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}
