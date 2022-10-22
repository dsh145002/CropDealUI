import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddCropDto } from 'src/app/Model/crop.model';
import { CropService } from 'src/app/crop.service';
import { NgToastService } from 'ng-angular-popup'

@Component({
  selector: 'app-add-crop',
  templateUrl: './add-crop.component.html',
  styleUrls: ['./add-crop.component.css']
})
export class AddCropComponent implements OnInit {

  public addForm !: FormGroup;

  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private api: CropService, private router: Router, private toast: NgToastService) { }

  crop:AddCropDto={
    CropType:'',
    CropName:'',
    fid:0,
    CropLocation:'',
    CropQtyAvailable:0,
    CropExpectedPrice:0

  }
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      cropType: ['', Validators.required],
      cropName: ['', Validators.required],
      cropLocation: ['', Validators.required],
      qtyAvailable: ['', Validators.required],
      expectedPrice: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    this.crop.CropType = this.addForm.controls['cropType'].value;
    this.crop.CropName = this.addForm.controls['cropName'].value;
    this.crop.fid = Number(localStorage.getItem('userId'));
    this.crop.CropLocation= this.addForm.controls['cropLocation'].value;
    this.crop.CropQtyAvailable = this.addForm.controls['qtyAvailable'].value;
    this.crop.CropExpectedPrice = this.addForm.controls['expectedPrice'].value;
    
    this.api.addCrop(this.crop)
    .subscribe(response=>{
    console.log(response); 
    this.toast.success({detail: "Success Message", summary: "Crop added successfully", duration: 5000});
    this.addForm.reset();
    //this.router.navigate('farmerHome')
    }, error =>{
      if(error.status==401){
        alert('Unauthorized')
      }
      console.log(error);
      this.toast.error({detail: "Error Message", summary: "Something went wrong while adding crop, Try again later!!", duration: 5000});
    })

   
  }

}

//   onSubmit(){
//     this.submitted = true;
//     // if(this.addForm.invalid){
//     //   console.log("Something went wrong");
//     //   return ;
//     // }
//     // else{
//       // this.addObj.CropType ="priya ji";// this.addForm.value.cropName;
//       // this.addObj.CropName = "sarso";//this.addForm.controls['cropName'].value;
//       // this.addObj.fid =1 ;//this.addForm.controls['farmerId'].value;
//       // this.addObj.CropLocation ="rajastan";// this.addForm.controls['cropLocation'].value;
//       // this.addObj.CropQtyAvailable = 50;//this.addForm.controls['qtyAvailable'].value;
//       // this.addObj.CropExpectedPrice = 50;//this.addForm.controls['expectedPrice'].value;
      
//       this.api.createUser(this.addObj)
//       .subscribe( data => {
//         console.log(data);
//         alert('Crop added!!');
//         this.addForm.reset();
//         this.router.navigate(['view-crop-farmer']);
//       });
//   //}
      
//   }




