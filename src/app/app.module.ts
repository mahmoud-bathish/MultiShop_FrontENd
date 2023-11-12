import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { SuggestedProductsComponent } from './components/suggested-products/suggested-products.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OpenProductsDirective } from './open-products.directive';
import { OpenProductDetailsDirective } from './open-product-details.directive';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SuggestedProductsComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    OpenProductsDirective,
    OpenProductDetailsDirective,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return localStorage.getItem('user');
        },
        allowedDomains:['localhost:7294'],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
