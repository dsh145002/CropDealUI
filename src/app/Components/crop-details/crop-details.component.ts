import { Component, OnInit } from '@angular/core';
import { getAllCrop } from 'src/app/Model/getAllCrop.model';
import { CropService } from 'src/app/crop.service';
import { Payment } from 'src/app/Model/Payment';

@Component({
  selector: 'app-crop-details',
  templateUrl: './crop-details.component.html',
  styleUrls: ['./crop-details.component.css']
})
export class CropDetailsComponent implements OnInit {

  cropForm: getAllCrop[] =[];
  crop: getAllCrop ={
    CropId: 0, 
    CropTypeId: 0, 
    FarmerId: 0,  
    User: '',  
    CropName: '',  
    Location: '',
    QtyAvailable: 0,
    ExpectedPrice: 0,
    CropType: '',
    Invoices: ''
  }

  constructor(private cropService: CropService) { }

  ngOnInit(): void {
    //this.getAllCrops();
    this.GetCropById('1005');
  }
  pay = new Payment()
  onPay(){
    this.pay.cropId=this.singleCrop.value.cropId;
    this.pay.farmerId=this.singleCrop.value.farmerId;
    this.pay.dealerId= Number(localStorage.getItem('userId'))
    this.cropService.postInvoice(this.pay).subscribe(res=>{
      console.log(res)
      
    },err=>{
      console.log(err)
    })
  }
  // getAllCrops(){
  //   this.cropService.getAllCrops()
  //   .subscribe(
  //     response =>{
  //       this.cropForm = response;
  //       console.log(response);
  //     }
  //   )
  // }
  singleCrop!:any
  GetCropById(id:any){
    this.cropService.getCropById(id).subscribe(res=>{
      this.singleCrop= res
      console.log(this.singleCrop.value.cropName)
    })
  }

}
