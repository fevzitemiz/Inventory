import { Routes } from '@angular/router';
import { AuthGuard } from "./services/auth.guard"
import { LoginComponent } from './pages/account-module/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: '',
    // pathMatch: 'full',
    component: DashboardComponent,

    children: [
      { path: 'brands', loadChildren: () => import('./pages/brand-module/brand.routes').then(m => m.BRAND_ROUTES), canActivate: [AuthGuard] },
      { path: 'employees', loadChildren: () => import('./pages/employee-module/employee.routes').then(m => m.EMPLOYEE_ROUTES), canActivate: [AuthGuard] },
      { path: 'positions', loadChildren: () => import('./pages/position-module/position.routes').then(m => m.POSITION_ROUTES), canActivate: [AuthGuard] },
      { path: 'titles', loadChildren: () => import('./pages/title-module/title.routes').then(m => m.TITLE_ROUTES), canActivate: [AuthGuard] },
      { path: 'types-of-item', loadChildren: () => import('./pages/type-of-item-module/type-of-item.routes').then(m => m.TYPESOFITEM_ROUTES), canActivate: [AuthGuard] },
      { path: 'users', loadChildren: () => import('./pages/user-module/user.routes').then(m => m.USER_ROUTES), canActivate: [AuthGuard] },
      { path: 'inventory-records', loadChildren: () => import('./pages/inventory-records-module/inventory-records.routes').then(m => m.INVENTORYRECORD_ROUTES), canActivate: [AuthGuard] },
      { path: 'items', loadChildren: () => import('./pages/item-module/items.routes').then(m => m.ITEMS_ROUTES), canActivate: [AuthGuard] },
      { path: 'softwares', loadChildren: () => import('./pages/software-module/softwares.routes').then(m => m.SOFTWARES_ROUTES), canActivate: [AuthGuard] },
    ]
  },
  //Login
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
];