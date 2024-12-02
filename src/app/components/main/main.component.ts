import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InplaceModule } from 'primeng/inplace';
import { MenubarModule } from 'primeng/menubar';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { SplitterModule } from 'primeng/splitter';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RippleModule,
    ToastModule,
    ProgressBarModule,
    InplaceModule,
    NgStyle,
    RouterLink,
    MenubarModule,
    ButtonModule,
    CardModule,
    SplitterModule,
    AccordionModule,
    TabViewModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  display : any;
  menu: MenuItem[]| undefined;
  ngOnInit(){
    this.menu =[
      {label:'Home',routerLink:['/'],icon: PrimeIcons.HOME},


    ]
    const email = sessionStorage.getItem('email');
    this.display = email;
  }
  private router = inject(Router)
  logout() {
    sessionStorage.clear();
    this.router.navigate(['first']);
  }
}
