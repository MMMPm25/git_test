import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../Services/home.service';
import { UserModel } from '../../Model/home';
import { ToolbarModule } from 'primeng/toolbar';
import { AsyncPipe, CommonModule, NgStyle } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

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
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit  {

  UList: UserModel[] = [];
  ngOnInit(): void {


    this.getUList();
  }
  constructor(private _homeService: HomeService, private _toastrService: ToastrService) { }
  getUList() {
    this._homeService.getU().subscribe((res) => {
      this.UList = res;
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
}
