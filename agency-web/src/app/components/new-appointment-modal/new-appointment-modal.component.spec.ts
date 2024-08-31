import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppointmentModalComponent } from './new-appointment-modal.component';

describe('NewAppointmentModalComponent', () => {
  let component: NewAppointmentModalComponent;
  let fixture: ComponentFixture<NewAppointmentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAppointmentModalComponent]
    });
    fixture = TestBed.createComponent(NewAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
