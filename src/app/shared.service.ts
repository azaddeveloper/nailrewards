import { Injectable } from '@angular/core';
import { StoreUser } from './models/store-user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public loggedInUser:StoreUser;
  public forgetUserEmailId:String="";
  public selectedCustomer:any;
  constructor() { }
}
