import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../Services/home.service';
import { HomeModel, UserModel } from '../../Model/home';
import { ToolbarModule } from 'primeng/toolbar';
import { AsyncPipe, CommonModule, NgStyle } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink,
    ToolbarModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CardModule,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit  {
  searchQuery: string = '';
  UList: UserModel[] = [];
  filteredUsersL: UserModel[] = [];
  ngOnInit(): void {


    this.getUList();
  }
  constructor(private _homeService: HomeService, private _toastrService: ToastrService) { }
  getUList() {
    this._homeService.getU().subscribe((res) => {
      this.UList = res;
      this.filteredUsersL = res.filter(user => user.level !== 'admin');
    });
  }
  private router = inject(Router)
  logout() {
    sessionStorage.clear();
    this.router.navigate(['first']);
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
  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      // หากช่องค้นหาว่าง ให้แสดงผู้ใช้ทั้งหมดที่มี level = admin
      this.filteredUsersL = this.UList.filter(user => user.level !== 'admin');
    } else {
      // ค้นหาผู้ใช้ที่มี level = admin และตรงกับคำค้น
      this.filteredUsersL = this.UList.filter(user =>
        user.level !== 'admin' &&
        (user.fullname && user.fullname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
         user.email && user.email.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
  }
  trackByIndex(index: number, item: any): number {
    return index;  // Just return the index as the identifier for simplicity
  }
}
