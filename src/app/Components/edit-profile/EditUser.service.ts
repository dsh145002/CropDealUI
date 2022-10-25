import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPageDto } from './UserPageDto';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  private baseurl = "Give the URL";
  constructor(private http: HttpClient) { }

  public edituser(user : UserPageDto, id : number) : Observable<any>{
    return this.http.put<any>(this.baseurl, user);
  }
}