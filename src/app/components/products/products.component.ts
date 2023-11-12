import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/model';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  view: 'grid'| 'list' = 'list';
  sortby:'default' | 'htl' | 'lth' = 'default';
  products:Product[]=[]
    constructor(
    private activatedRoute:ActivatedRoute,
    private navigationSvc:NavigationService,
    private utilitySvc:UtilityService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params:any)=>{
      let category = params.category;
      let subCategory = params.subcategory;
      if(category && subCategory){
        this.navigationSvc.getProducts(category,subCategory,10)
        .subscribe((res:any)=>{
          this.products = res
        })
      }
    })
  }
  sortByPrice(sortkey:string){
    this.products.sort((a,b)=>{
      if(sortkey == 'default'){
        return a.id > b.id ? 1 : -1;
      }
      if(sortkey == 'htl'){
        return this.utilitySvc.applyDiscount(a.price, a.offer.discount) >
        this.utilitySvc.applyDiscount(b.price,b.offer.discount)
        ? -1
        : 1;
      }
      if(sortkey == 'lth'){
        return this.utilitySvc.applyDiscount(a.price, a.offer.discount) >
        this.utilitySvc.applyDiscount(b.price,b.offer.discount)
        ? 1
        : -1;
      }
      // (sortkey == 'htl' ? 1 : -1)*
      // ( this.utilitySvc.applyDiscount(a.price, a.offer.discount) >
      // this.utilitySvc.applyDiscount(b.price,b.offer.discount)
      // ? -1
      // :1);
      return 0;
    })
  }

}
