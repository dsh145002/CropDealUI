import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CropService } from 'src/app/crop.service';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-view-crop-dealer',
  templateUrl: './view-crop-dealer.component.html',
  styleUrls: ['./view-crop-dealer.component.css']
})
export class ViewCropDealerComponent implements AfterViewInit, OnInit {


  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  
  cropForm: any[] =[];

  constructor(private observer : BreakpointObserver, private cd : ChangeDetectorRef, private cropService : CropService) {} 

  ngOnInit(): void {
    this.getAllCrops();
  }

  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width:800px)'])
    .subscribe((res)=>{
      if(res?.matches){
        this.sideNav.mode="over";
        this.sideNav.close();
      }else{
        this.sideNav.mode = 'side';
        this.sideNav.open();
      }
    })
    this.cd.detectChanges();
  }

  getAllCrops(){
    this.cropService.getAllCrops()
    .subscribe(
      response =>{
        this.cropForm= response;
      }
    )
  }




}
