import { Injectable } from '@angular/core';


@Injectable()
export class AuthServiceService {

  constructor() {
    
  }
  public isAuthenticated(): boolean {
    if(sessionStorage.getItem('sessionKey') != null)
      return true;
    else
      return false;
  }
}
