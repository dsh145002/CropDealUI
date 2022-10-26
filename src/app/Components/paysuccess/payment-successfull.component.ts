import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    TotalRating:'',
    Review:''
  }

  constructor(private formBuilder: FormBuilder,private http:HttpClient, private toast: NgToastService,private route:ActivatedRoute) { }
  id:any
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.ngForm = this.formBuilder.group({
      totalRating: [''],
      Review: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if(this.ngForm.invalid){
      return;
    }
    this.farmer.TotalRating = this.ngForm.controls['totalRating'].value;
    this.farmer.Review = this.ngForm.controls['Review'].value;
    this.http.post('https://localhost:44346/api/User/add-rating/'+1012,this.farmer).subscribe(
      res=>{
        console.log(res)
      }
    )
    this.toast.success({detail: "Success Message", summary: "You rated farmer successfully", duration: 5000});
    this.ngForm.reset();
  }

}
