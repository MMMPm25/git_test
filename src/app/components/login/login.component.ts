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
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login = {
    email: '',
    password: '',
  };

  private router = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  onLogin() {
    const { email, password } = this.login;
    // ตรวจสอบ email ว่าเป็น admin หรือไม่
    this.authService.getUserDetails(email, password).subscribe({
      next: (response) => {
        if (response.length >= 1) {
          // ตรวจสอบค่า level ใน response
          const user = response[0]; // สมมุติว่า response เป็น array ของผู้ใช้
          const userLevel = user.level;

          // ถ้า level เป็น 'admin' ให้ไปหน้า admin
          if (userLevel === 'admin') {
            this.messageService.add({
              severity: 'success',
              summary: 'Login Admin Successfully',
              detail: 'Welcome Admin!',
            });
            sessionStorage.setItem('email', email);// เก็บข้อมูลใน sessionStorage
            this.router.navigate(['home']); // เปลี่ยนเส้นทางไปที่หน้า admin
          } else {
            // ถ้าไม่ใช่ admin ให้ไปหน้า main
            this.messageService.add({
              severity: 'success',
              summary: 'Login Successfully',
              detail: 'Welcome back!',
            });
            sessionStorage.setItem('email', email); // เก็บข้อมูลใน sessionStorage
            this.router.navigate(['main']); // เปลี่ยนเส้นทางไปที่หน้า main
          }
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid email or password',
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      }
    });
  }
}
