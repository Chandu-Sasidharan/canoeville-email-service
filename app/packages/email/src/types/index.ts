export type ContactFormType = {
  userName: string;
  userEmail: string;
  message: string;
  type: 'contact' | 'reservation';
  hp?: string; // honeypot field
  elapsedTime?: number; // time taken to fill the form
};

export type ReservationFormType = {
  userName: string;
  userPhone: string;
  userEmail: string;
  guests: number;
  date: string;
  time: string;
  type: 'contact' | 'reservation';
  hp?: string; // honeypot field
  elapsedTime?: number; // time taken to fill the form
};
