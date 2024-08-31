import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { StaffDashboardComponent } from './components/staff-dashboard/staff-dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { NewAppointmentModalComponent } from './components/new-appointment-modal/new-appointment-modal.component';
import { ConfigurationModalComponent } from './components/configuration-modal/configuration-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerDashboardComponent,
    StaffDashboardComponent,
    RegisterComponent,
    NewAppointmentModalComponent,
    ConfigurationModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
