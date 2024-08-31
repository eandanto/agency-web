import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AppointmentDto } from '../../models/appointment';

@Component({
  selector: 'app-new-appointment-modal',
  templateUrl: './new-appointment-modal.component.html',
  styleUrls: ['./new-appointment-modal.component.css']
})
export class NewAppointmentModalComponent {
  appointmentForm: FormGroup;
  customerId: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewAppointmentModalComponent>,
    private authService: AuthService
  ) {
    this.customerId = this.authService.getCustomerIdFromToken();
    this.appointmentForm = this.fb.group({
      appointmentDate: ['', [Validators.required, this.noPastDateValidator]],
    });
  }

  noPastDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    // Set the time of 'today' to 00:00:00 to ignore the current time
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return { 'pastDate': true };
    }
    return null;
  }

  submit(): void {
    if (this.appointmentForm.valid) {
      const formData: AppointmentDto = {
        CustomerId: this.customerId,
        AppointmentDate: this.appointmentForm.value.appointmentDate,
        Token: '',
        InsertedAt: new Date(),
      };
      this.dialogRef.close(formData);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
