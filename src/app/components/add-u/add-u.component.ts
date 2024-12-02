import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterPostData } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';
import { passwordMismatchValidator } from '../../shared/password-mismatch.directive';
import { NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-add-u',
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
  templateUrl: './add-u.component.html',
  styleUrl: './add-u.component.css'
})
export class AddUComponent {
  private registerService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  addForm = new FormGroup({
    fullname:new FormControl('',[Validators.required]),
    email:new FormControl('',[
      Validators.required,
      Validators.pattern(/[a-z0-9\._%\+\-]+@[a-z0-9\.\-]+\.[a-z]{2,}$/),
    ]),
    password:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required]),
    level: new FormControl('admin', [Validators.required]),
  },{
    validators:passwordMismatchValidator
  });

  onUadd(){
    //console.log(this.registerForm.value)
    const postData = {...this.addForm.value};
    delete postData.confirmPassword;
    postData.level = 'admin';//add level == admin เมื่อ ทำการเพิ่ม admin
    this.registerService.registerUser(postData as RegisterPostData).subscribe({
      next:(response) =>{
        //console.log(response);
        this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:'Registered successfully',
        });
        this.router.navigate(['admin']);
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
    return this.addForm.controls['fullname'];
  }
  get email(){
    return this.addForm.controls['email'];
  }
  get password(){
    return this.addForm.controls['password'];
  }
  get confirmPassword(){
    return this.addForm.controls['confirmPassword'];
  }
}
