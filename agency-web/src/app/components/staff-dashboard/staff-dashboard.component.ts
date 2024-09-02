import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentDto } from '../../models/appointment';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConfigurationModalComponent } from '../configuration-modal/configuration-modal.component';
import { format } from 'date-fns';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css'],
})
export class StaffDashboardComponent implements OnInit {
  appointments: AppointmentDto[] = [];
  totalAppointments: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  selectedDate: Date = new Date(); // Default to today's date

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    const date = new Date(this.selectedDate);
    if (
      date.getHours() !== 0 ||
      date.getMinutes() !== 0 ||
      date.getSeconds() !== 0
    ) {
      date.setHours(0, 0, 0, 0); // Set time to 00:00:00
    }
    const formattedDate = new Date(date).toISOString(); // Format date to send to the backend
    this.appointmentService
      .getAppointments(null, this.currentPage, this.pageSize, formattedDate)
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

  onDateChange(event: any): void {
    this.selectedDate = event.value;
    this.currentPage = 0; // Reset to first page when date is changed
    this.fetchAppointments();
  }

  openConfigurationModal(): void {
    this.dialog.open(ConfigurationModalComponent, {
      width: '600px',
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
