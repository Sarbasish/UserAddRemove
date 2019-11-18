import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthGuardServiceService implements CanActivate{

  constructor(private authService: AuthServiceService) { }

  canActivate(){
    if(this.authService.isAuthenticated())
      return true;
    else{
      window.alert("You don't have permission to view this page");
      return false;   
    }
  }
}
