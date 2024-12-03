import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { HomeService } from '../../Services/home.service';
import { UserModel } from '../../Model/home';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    AsyncPipe,
    ToolbarModule,
    RouterLink,
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CardModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  display : any;
  searchQuery: string = '';
  UList: UserModel[] = [];
  filteredUsersL: UserModel[] = [];
  admin: UserModel[] = [];
  ngOnInit(): void {
    this.getUList();
  }
  constructor(private _homeService: HomeService, private _toastrService: ToastrService) { }
  getUList() {
    this._homeService.getU().subscribe((res) => {
      this.UList = res;
      const email = sessionStorage.getItem('email');
      this.filteredUsersL = res.filter(user => user.level === 'admin'&& user.email !== email);

      this.display = email;
    });
  }
  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      const email = sessionStorage.getItem('email');
      // หากช่องค้นหาว่าง ให้แสดงผู้ใช้ทั้งหมดที่มี level = admin
      this.filteredUsersL = this.UList.filter(user => user.level === 'admin' && user.email !== email);
    } else {
      const email = sessionStorage.getItem('email');
      // ค้นหาผู้ใช้ที่มี level = admin และตรงกับคำค้น
      this.filteredUsersL = this.UList.filter(user =>
        user.level === 'admin' && user.email !== email &&
        (user.fullname && user.fullname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
         user.email && user.email.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
  }
  trackByIndex(index: number, item: any): number {
    return index;  // Just return the index as the identifier for simplicity
  }
  onDU(id:any) {
    const iscon = confirm('Are you sure yo delete this User?');
    if(iscon){
      this._homeService.deleteU(id).subscribe((res)=>{
        this._toastrService.error('User Deleted Succes','Deleted')
        this.getUList();
      })
    }
  }
  private router = inject(Router)
  logout() {
    sessionStorage.clear();
    this.router.navigate(['first']);
  }
}
