import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';

import { StepperModule } from 'primeng/stepper';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    RouterLink,
    MenubarModule,
    ButtonModule,
    AccordionModule,
    CardModule,
    StepperModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{
  events:any;
  menu : MenuItem[]|undefined;
  ngOnInit(){
    this.menu =[
      {label:'Home',routerLink:'/main',icon: PrimeIcons.HOME},


    ]
  }
  private router = inject(Router)
  logout() {
    sessionStorage.clear();
    this.router.navigate(['first']);
  }

}
