import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeModel, UserModel } from '../Model/home';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiurl = "http://localhost:3000/product";
  private au = "http://localhost:3000/users"
  constructor() { }
  httpp = inject(HttpClient);

  getU() :Observable<UserModel[]>{
    return this.httpp.get<UserModel[]>(this.au)
  }
  getP() :Observable<HomeModel[]>{
    return this.httpp.get<HomeModel[]>(this.apiurl)
  }
  addP(product : HomeModel) : Observable<HomeModel>{
    return this.httpp.post<HomeModel>(this.apiurl, product);
  }
  updateP(product : HomeModel) : Observable<HomeModel>{
    return this.httpp.put<HomeModel>(`${this.apiurl}/${product.id}`,product );
  }
  deleteU(id:number):Observable<void>{
    return this.httpp.delete<void>(`${this.au}/${id}`);
  }
  deleteP(pid:number):Observable<void>{
    return this.httpp.delete<void>(`${this.apiurl}/${pid}`);
  }
}
