import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/component/sidebar/sidebar.component';
import { NavbarComponent } from './dashboard/component/navbar/navbar.component';
//children of dashboard
import { HomeComponent } from './dashboard/content/home/home.component';
import { UserComponent } from './dashboard/content/user/user.component';
import { TransactionComponent } from './dashboard/content/transaction/transaction.component';
import { AccountComponent } from './dashboard/content/account/account.component';
import { ViewComponent } from './dashboard/content/user/view/view.component';
import { ManageComponent } from './dashboard/content/manage/manage.component';
import { ProjectComponent } from './dashboard/content/project/project.component';

import { AuthGuard } from './guards/auth.guard';
import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard], 
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'view', component: ViewComponent, canActivate: [AuthGuard] },
      { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard] },
      { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
      { path: 'manage', component: ManageComponent, canActivate: [AuthGuard] },
      { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },

  { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuard] },
  { path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export class CustomReuseStrategy implements RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false; // Jangan simpan state komponen
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {}

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}