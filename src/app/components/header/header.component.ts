import { HttpHeaders } from '@angular/common/http';
import { Component, HostListener, Input, OnInit ,ElementRef, ViewChild, ViewContainerRef, Type} from '@angular/core';
import { Router } from '@angular/router';
import {  Category, NavigationItem } from 'src/app/models/model';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('modalTitle') modalTitle!:ElementRef;
  @ViewChild('container',{read:ViewContainerRef,static:true})
  container!:ViewContainerRef;
  cartItems:number = 0;

  navigationList:NavigationItem[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private navigationSvc: NavigationService,
    public utilityService: UtilityService
    ) { }

  ngOnInit(): void {
    this.navigationSvc.getCategoryList().subscribe((list:Category[])=>{
      for(let item of list){
        let present = false;
        for(let navItem of this.navigationList){
          if(navItem.category == item.category){
            navItem.subcategories.push(item.subCategory);
            present= true;
          }
        }
        if(!present){
          this.navigationList.push({
            category:item.category,
            subcategories:[item.subCategory]
          })
        }
      }
    });
    //cart
    if(this.utilityService.isLoggedIn()){
      this.navigationSvc.getActiveCartOfUser(this.utilityService.getUser().id)
      .subscribe((res:any)=>{
        this.cartItems = res.cartitems.length;
      })
    }

    this.utilityService.changeCart.subscribe((res:any)=>{
      this.cartItems += parseInt(res);
    })
  }
  openModal(name: string) {
    this.container.clear();

    let componentType!: Type<any>;
    if (name === 'login') {
      componentType = LoginComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Login Information';
    }
    if (name === 'register') {
      componentType = RegisterComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Register Information';
    }

    this.container.createComponent(componentType);
  }

}
