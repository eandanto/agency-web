import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfigurationService } from '../../services/configuration.service';
import { OffDayService } from '../../services/offday.service';
import { ToastrService } from 'ngx-toastr';
import { OffDayDto } from 'src/app/models/offday';

@Component({
  selector: 'app-configuration-modal',
  templateUrl: './configuration-modal.component.html',
  styleUrls: ['./configuration-modal.component.css'],
})
export class ConfigurationModalComponent implements OnInit {
  configForm: FormGroup = this.fb.group({});
  configurations: any[] = [];
  dayOffs: OffDayDto[] = []; // Array to hold the list of day-offs
  newDayOff: Date | null = null; // Variable to hold the new day-off date

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ConfigurationModalComponent>,
    private configService: ConfigurationService,
    private offDayService: OffDayService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadConfigurations();
    this.loadDayOffs(); // Load the existing day-offs
  }

  loadConfigurations(): void {
    this.configService.getConfigurations().subscribe(
      (configs) => {
        this.configurations = configs;

        configs.forEach((config: any) => {
          this.configForm.addControl(
            config.PropertyName,
            this.fb.control(config.Value)
          );
        });
      },
      (error) => {
        this.toastr.error('Failed to load configurations');
      }
    );
  }

  replaceUnderscoresWithSpaces(propertyName: string): string {
    return propertyName.replace(/_/g, ' ');
  }

  addDayOff(): void {
    if (this.newDayOff) {
      this.offDayService.addDayOff(this.newDayOff).subscribe(
        () => {
          this.toastr.success('Day Off added successfully');
          this.loadDayOffs(); // Refresh the day off list
          this.newDayOff = null; // Clear the selected date
        },
        (errorMessage) => {
          this.toastr.error(errorMessage);
        }
      );
    }
  }

  loadDayOffs(): void {
    this.offDayService.getDayOffs().subscribe(
      (dayOffs) => {
        this.dayOffs = dayOffs;
      },
      (error) => {
        this.toastr.error('Failed to load day-offs');
      }
    );
  }

  removeDayOff(dayOff: OffDayDto): void {
    this.offDayService.removeDayOff(dayOff.Day).subscribe(
      () => {
        this.dayOffs = this.dayOffs.filter((d) => d.Day !== dayOff.Day);
        this.toastr.success('Day Off removed successfully');
      },
      (error) => {
        this.toastr.error('Failed to remove day off');
      }
    );
  }

  onSaveGeneral(): void {
    if (this.configForm.valid) {
      const updatedConfigs = this.configurations.map((config) => ({
        Id: config.Id,
        PropertyName: config.PropertyName,
        Value: this.configForm.get(config.PropertyName)?.value,
      }));

      this.configService.updateConfiguration(updatedConfigs).subscribe(
        () => {
          this.toastr.success('General Configuration saved successfully');
          this.dialogRef.close();
        },
        (error) => {
          this.toastr.error('Failed to save general configuration');
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
