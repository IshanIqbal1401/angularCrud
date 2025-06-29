import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer/customer-list.component'
export const routes: Routes = [
    { path: '', component: CustomerListComponent },
  { path: '**', redirectTo: '' }
];
