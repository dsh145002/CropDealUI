import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Location } from "@angular/common";

@Injectable({
    providedIn:'root'
})
export class HasRoleGuard implements CanActivate{

    constructor(){}
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): 
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        const isAuthorized =  localStorage.getItem('role') == route.data["role"]

        if(!isAuthorized){
            window.alert('Unauthoirzed access!!!')
            
        }
        return isAuthorized
    }
}