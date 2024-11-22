import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    NgStyle,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = {
    email:'',
    password:'',
  };
  private router = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  onLogin(){
    //console.log(this.login);
    const {email,password}=this.login;
    this.authService.getUserDetails(email,password).subscribe({
      next: (response) =>{
        if(response.length>=1){
          sessionStorage.setItem('email',email);

          this.router.navigate(['home']);
        }else{
          this.messageService.add({
            severity:'error',
            summary:'Error',
            detail:'Something went wrong',
          });
        }
      },
      error:()=>{
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:'Something went wrong',
        });
      }
    })
  }
}
