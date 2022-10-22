import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddCropDto } from './Model/crop.model';
import { getAllCrop } from './Model/getAllCrop.model';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  baseUrl:string = 'https://localhost:44346/api/Crop/';
  

  constructor(private http: HttpClient) { }

  addCrop(crop: AddCropDto) {
    return this.http.post(this.baseUrl+'addCrop', crop);
  }

  viewCropById(id: number){
    return this.http.get<any>(this.baseUrl+'viewCrop/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getAllCrops(): Observable<getAllCrop[]>{
    return this.http.get<getAllCrop[]>(this.baseUrl+'getCrops')
  }

  // getUsers(){

  //   return this.http.get<Crop[]>(this.baseUrl);
  // } 

  // getUserById(id: number){
  //   return this.http.get<User>(this.baseUrl+'/'+id);
  // }
  
  // updateUser(user: User) {
  //   return this.http.put(this.baseUrl + '/' + user.id, user);
  // }
}
