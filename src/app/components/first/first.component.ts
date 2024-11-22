import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import "primeicons/primeicons.css";
import { NgStyle } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-first',
  standalone: true,
  imports: [RippleModule,ToastModule,ProgressBarModule,InplaceModule,NgStyle,RouterLink,ToolbarModule,ButtonModule,SplitButtonModule,ImageModule],
  templateUrl: './first.component.html',
  styleUrl: './first.component.css'
})
export class FirstComponent {
  items = [
    {
      label : "/login"
    }
  ]
value: unknown;



}
