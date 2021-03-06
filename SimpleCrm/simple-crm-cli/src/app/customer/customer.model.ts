import { TitleCasePipe } from "@angular/common";

export type InteractionMethod = 'phone' | 'email';

  export interface Customer {
    CustomerId: any;
    customerId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    statusCode: string;
    preferredContactMethod: InteractionMethod;
    lastContactDate: string;
  }
