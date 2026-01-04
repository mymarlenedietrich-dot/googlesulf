
export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD'
}

export interface Attendee {
  id: string;
  name: string;
  guests: number;
  isGoing: boolean;
  paymentMethod?: PaymentMethod;
}

export interface SaunaSlot {
  id: string;
  date: string;
  startTime: string;
  duration: number; // in hours
  totalCost: number;
  attendees: Attendee[];
  isLocked?: boolean; 
}

export type ViewState = 
  | 'START' 
  | 'ORGANIZER_AUTH' 
  | 'ORGANIZER_DASHBOARD' 
  | 'VISITOR_ONBOARDING' 
  | 'VISITOR_CABINET' 
  | 'VISITOR_LIST' 
  | 'VISITOR_DETAIL';
