import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentService } from '../../services/appointment.service';
import { NewAppointmentModalComponent } from '../new-appointment-modal/new-appointment-modal.component';
import { AppointmentDto } from '../../models/appointment';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
})
export class CustomerDashboardComponent implements OnInit {
  appointments: AppointmentDto[] = [];
  totalAppointments: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  customerId: string;

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {
    this.customerId = this.authService.getCustomerIdFromToken();
  }

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.appointmentService
      .getAppointments(this.customerId, this.currentPage, this.pageSize)
      .subscribe((response) => {
        this.appointments = response.appointments;
        this.totalAppointments = response.totalCounts;
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchAppointments();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  createNewAppointment(): void {
    const dialogRef = this.dialog.open(NewAppointmentModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const userSelectedDate = result.AppointmentDate;

        // Format the date as a local time string before sending
      const localDateString = format(userSelectedDate, "yyyy-MM-dd'T'HH:mm:ss");
      const appointment = {
        ...result,
        AppointmentDate: localDateString,
      };

        this.appointmentService.setAppointment(result).subscribe(
          (apiResponse: any) => {
            const createdAppointment: AppointmentDto = {
              CustomerId: apiResponse.customerId,
              AppointmentDate: new Date(apiResponse.appointmentDate),
              Token: apiResponse.token,
              InsertedAt: new Date(apiResponse.insertedAt),
            };

            const createdDate = new Date(createdAppointment.AppointmentDate);
            const selectedDate = new Date(userSelectedDate);
            if (createdDate.getTime() !== selectedDate.getTime()) {
              console.log(createdDate.getTime());
              console.log(selectedDate.getTime());
              this.toastr.info(
                `Appointment slots for your selected date are full. Your appointment has been created on the next available date: ${createdDate.toDateString()}`
              );
            } else {
              this.toastr.success(
                `Appointment created successfully for ${createdDate.toDateString()}`
              );
            }

            this.fetchAppointments(); // Refresh the appointments list
          },
          (error) => {
            this.toastr.error('Failed to create appointment');
          }
        );
      }
    });
  }
}
