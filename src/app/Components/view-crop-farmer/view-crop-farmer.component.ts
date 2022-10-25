import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { getAllCrop } from 'src/app/Model/getAllCrop.model';
import { CropService } from 'src/app/crop.service';
import {filter, map} from 'rxjs';

@Component({
  selector: 'app-view-crop-farmer',
  templateUrl: './view-crop-farmer.component.html',
  styleUrls: ['./view-crop-farmer.component.css']
})
export class ViewCropFarmerComponent implements OnInit {

  cropForm: any[] =[];
 

  selectedCropNumber: string="Top 10 Trending Crops!";
  
  constructor(private observer : BreakpointObserver, private cd : ChangeDetectorRef, private cropService : CropService) {} 

  ngOnInit(): void {
    this.getAllCrops();
  }

  getAllCrops(){
    this.cropService.getAllCrops()
    .subscribe(
      response =>{
        this.cropForm= response;
        this.cropForm=this.cropForm.filter(res=>res.farmerId==Number(localStorage.getItem('userId')))
      }
    )
  }

  // searchSource(source:any){
  //   this.cropService.getArticlesByID(source.id)
  //   .subscribe((res:any)=>{
  //     this.selectedCropNumber = source.name
  //     this.articles = res.articles;
  //   })
  // }
}