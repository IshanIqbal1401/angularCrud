import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Customer } from './customer.model';

@Component({
  standalone: true,
  selector: 'app-customer-form',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h3>{{ customer ? 'Edit' : 'Add' }} Customer</h3>
    <form [formGroup]="form" (ngSubmit)="submitForm()">
      <input formControlName="name" placeholder="Name" />
      <input formControlName="email" placeholder="Email" />
      <input formControlName="phone" placeholder="Phone" />
      <button type="submit">{{ customer ? 'Update' : 'Create' }}</button>
      <button type="button" (click)="resetForm()">Reset</button>
    </form>
  `
})
export class CustomerFormComponent implements OnChanges {
  @Input() customer?: Customer;
  @Output() save = new EventEmitter<Customer>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.customer) {
      this.form.patchValue(this.customer);
    }
  }

  submitForm() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.form.reset();
    }
  }

  resetForm() {
    this.form.reset();
  }
}
