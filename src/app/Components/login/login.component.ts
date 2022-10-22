import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted:boolean = false;
  result!:any
  roles = [ 'Farmer', 'Dealer','Admin'];
  show_button: Boolean = false;
  show_eye: Boolean = false;
  user = new User();
  constructor(private router:Router, private formBuilder:FormBuilder ,public api:ApiService) { }

  ngOnInit(): void {   this.loginForm = this.formBuilder.group({
    email:  ['', [Validators.required,Validators.email]],
    password:  ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    userRole:['', Validators.required]
 
  });
  }
  onSubmit(){this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    else{
      this.user.role=this.loginForm.controls['userRole'].value;
      this.user.userName=this.loginForm.controls['email'].value;
      this.user.password=this.loginForm.controls['password'].value;
      this.api.login(this.user).subscribe( res => {
        this.result = res
        localStorage.setItem('role',this.result.role)
        localStorage.setItem('userId',this.result.userId)
        localStorage.setItem('token',this.result.token)
      });

    }
    
    
   }
  gohome(){this.router.navigate(['register']);}
  get f() { return this.loginForm.controls; }
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
}

}
