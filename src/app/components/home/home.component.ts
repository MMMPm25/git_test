import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { HomeModel } from '../../Model/home';
import { HomeService } from '../../Services/home.service';
import { ToastrService } from 'ngx-toastr';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, FormsModule, AsyncPipe,ToolbarModule,RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  pList: HomeModel[] = [];
  searchQuery: string = '';  // Store the search query
  filteredUserList: HomeModel[] = [];
  editMode: boolean = false;
  ngOnInit(): void {
    this.getPList();

  }

  private router = inject(Router)
  logout() {
    sessionStorage.clear();
    this.router.navigate(['first']);
  }
  /////////////////////////////////
  product: HomeModel = {
    pname: "",
    price: "",
  }
  constructor(private _homeService: HomeService, private _toastrService: ToastrService) { }
  getPList() {
    this._homeService.getP().subscribe((res) => {
      this.pList = res;
      this.filteredUserList = res;
    });
  }

  onSubmit(form: NgForm): void {
    debugger;
    if (this.editMode) {
      console.log(form);
      this._homeService.updateP(this.product).subscribe((res) => {
        this.getPList();
        this.editMode = false;
        form.reset();
        this._toastrService.success('Product Updated Success', 'Success')
      });
    } else {
      console.log(form);
      this._homeService.addP(this.product).subscribe((res) => {
        this.getPList();
        form.reset();
        this._toastrService.success('Product Added Success', 'Success')
      });
    }

  }
  onReset(form: NgForm) {
    form.reset();
    this.editMode = false;
    this.getPList();
  }
  onEdit(pdata: HomeModel) {
    this.product = pdata;
    this.editMode = true;
  }
  onDelete(id:any) {
    const iscon = confirm('Are you sure yo delete this product?');
    if(iscon){
      this._homeService.deleteP(id).subscribe((res)=>{
        this._toastrService.error('Product Deleted Succes','Deleted')
        this.getPList();
      })
    }
  }
  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredUserList = [...this.pList];  // Ensure fresh copy of userList is assigned
    } else {
      this.filteredUserList = this.pList.filter(p =>
        p.pname.toLowerCase().includes(this.searchQuery.toLowerCase())

      );
    }
  }
  trackByIndex(index: number, item: any): number {
    return index;  // Just return the index as the identifier for simplicity
  }


}

