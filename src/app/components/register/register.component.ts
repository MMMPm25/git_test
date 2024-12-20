import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { passwordMismatchValidator } from '../../shared/password-mismatch.directive';
import { AuthService } from '../../services/auth.service';
import { RegisterPostData } from '../../interfaces/auth';
import { Subscriber } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
    NgStyle
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private registerService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  value : any;
  registerForm = new FormGroup({
    fullname:new FormControl('',[Validators.required]),
    email:new FormControl('',[
      Validators.required,
      Validators.pattern(/[a-z0-9\._%\+\-]+@[a-z0-9\.\-]+\.[a-z]{2,}$/),
    ]),
    password:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required]),
    level: new FormControl('user', [Validators.required]),
  },{
    validators:passwordMismatchValidator
  });

  onRegister(){
    //console.log(this.registerForm.value)

    const postData = {...this.registerForm.value};


    delete postData.confirmPassword;
    postData.level = 'user';//add data
    this.registerService.registerUser(postData as RegisterPostData).subscribe({
      next:(response) =>{
        //console.log(response);
        this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:'Registered successfully',
        });
        this.router.navigate(['login']);
        console.log(response);
      },
      error:(err)=>{
        console.log(err);
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:'Something went wrong',
        })
      },
    });
  }

  get fullname(){
    return this.registerForm.controls['fullname'];
  }
  get email(){
    return this.registerForm.controls['email'];
  }
  get password(){
    return this.registerForm.controls['password'];
  }
  get confirmPassword(){
    return this.registerForm.controls['confirmPassword'];
  }
}
