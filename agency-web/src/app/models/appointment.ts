export interface AppointmentDto {
    Id?: string;
    CustomerId: string;
    Token: string;
    AppointmentDate: Date;
    InsertedAt: Date;
    CustomerEmailAddress?: string | null;
  }
  