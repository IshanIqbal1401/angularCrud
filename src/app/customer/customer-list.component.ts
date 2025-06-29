import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.model';
import { CustomerFormComponent } from './customer-form.component';

@Component({
  standalone: true,
  selector: 'app-customer-list',
  imports: [CommonModule, CustomerFormComponent],
  template: `
    <app-customer-form [customer]="editingCustomer" (save)="handleSave($event)"></app-customer-form>
    <ul>
      <li *ngFor="let customer of customers">
        {{ customer.name }} - {{ customer.email }} - {{ customer.phone }}
        <button (click)="edit(customer)">Edit</button>
        <button (click)="remove(customer.id)">Delete</button>
      </li>
    </ul>
  `
})
export class CustomerListComponent {
  customers: Customer[] = [];
  editingCustomer?: Customer;

  constructor(private customerService: CustomerService) {
    this.fetch();
  }

  fetch() {
    this.customerService.getAll().subscribe(data => this.customers = data);
  }

  handleSave(customer: Customer) {
    if (customer.id) {
      this.customerService.update(customer).subscribe(() => this.fetch());
    } else {
      this.customerService.create(customer).subscribe(() => this.fetch());
    }
    this.editingCustomer = undefined;
  }

  edit(customer: Customer) {
    this.editingCustomer = { ...customer };
  }

  remove(id: number) {
    this.customerService.delete(id).subscribe(() => this.fetch());
  }
}
