import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './app-routing.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/component/sidebar/sidebar.component';
import { NavbarComponent } from './dashboard/component/navbar/navbar.component';
import { FooterComponent } from './dashboard/component/footer/footer.component';
import { HomeComponent } from './dashboard/content/home/home.component';
import { UserComponent } from './dashboard/content/user/user.component';
import { TransactionComponent } from './dashboard/content/transaction/transaction.component';
import { AccountComponent } from './dashboard/content/account/account.component';
import { ViewComponent } from './dashboard/content/user/view/view.component';
import { ManageComponent } from './dashboard/content/manage/manage.component';
import { ProjectComponent } from './dashboard/content/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    UserComponent,
    TransactionComponent,
    AccountComponent,
    ViewComponent,
    ManageComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
