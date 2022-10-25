import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditUserService } from './EditUser.service';
import { UserPageDto } from './UserPageDto';

@Component({
  selector: 'app-profile',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.css']
})
export class EditUserComponent implements OnInit {
  
  
  EdituserForm!: FormGroup;
  public userdto : UserPageDto = new UserPageDto();
  submitted:boolean = false;
  constructor(private router:Router,private edituserservice : EditUserService,private formBuilder:FormBuilder
    ,private http : HttpClient) {

      this.http.get('https://localhost:44346/api/User/getuser/'+localStorage.getItem('userId'))
      .subscribe((res:any)=>{
        this.EdituserForm = this.formBuilder.group({
       
          email:  [res.value.email, [Validators.required,Validators.email]],
          phoneNo:  [res.value.phone,  [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      
          address:  [res.value.address.line, Validators.required],
          city:  [res.value.address.city, Validators.required],
          state:  [res.value.address.state, Validators.required],
      
          accountNumber:  [ res.value.account.accountNumber, Validators.required],
          ifscCode:  [res.value.account.bankName, Validators.required],
          bankName: [ res.value.account.ifscCode, Validators.required],
    
    }); 
      });
     }

  crop!:any
  ngOnInit(): void {   

   
    
}
  
  userId = Number(localStorage.getItem('userId'))
  get f() { return this.EdituserForm.controls; }
 
  goHome(){this.router.navigate(['']);}

  SaveChanges(){
    console.log('Clicked')
    this.submitted = true;
    if(this.EdituserForm.invalid){
      return;
    }
    this.userdto.Email=this.EdituserForm.controls['email'].value;
    this.userdto.Phone=this.EdituserForm.controls['phoneNo'].value;

    this.userdto.Line=this.EdituserForm.controls['address'].value;
    this.userdto.City=this.EdituserForm.controls['city'].value;
    this.userdto.State=this.EdituserForm.controls['state'].value;

    this.userdto.AccountNumber=this.EdituserForm.controls['accountNumber'].value;
    this.userdto.IFSCCode =this.EdituserForm.controls['ifscCode'].value;
    this.userdto.BankName=this.EdituserForm.controls['bankName'].value;

    console.log(this.userdto)
    // this.edituserservice.edituser(this.userdto, this.userId )
    // .subscribe(
    //   response => {
    //     console.log(response)
    //   }
    // );
  }
}
