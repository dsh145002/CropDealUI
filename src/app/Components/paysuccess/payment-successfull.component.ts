import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { NgToastService } from 'ng-angular-popup'

@Component({
  selector: 'app-payment-successfull',
  templateUrl: './payment-successfull.component.html',
  styleUrls: ['./payment-successfull.component.css']
})
export class PaymentSuccessfullComponent implements OnInit {

  public ngForm !: FormGroup;
  submitted: boolean = false;
  farmer:any={
    farmerRating:'',
    farmerReview:''
  }

  constructor(private formBuilder: FormBuilder, private toast: NgToastService) { }

  ngOnInit(): void {
    this.ngForm = this.formBuilder.group({
      farmerRating: [''],
      farmerReview: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if(this.ngForm.invalid){
      return;
    }
    this.farmer.farmerRating = this.ngForm.controls['farmerRating'].value;
    this.farmer.farmerReview = this.ngForm.controls['farmerReview'].value;
    this.toast.success({detail: "Success Message", summary: "You rated farmer successfully", duration: 5000});
    this.ngForm.reset();
  }

}
