import resend from './resend';
import getReservationEmailIncomingTemplate from '../templates/reservation-email-incoming-template';
import getReservationEmailResponseTemplate from '../templates/reservation-email-response-template';
import { ReservationFormType } from '../types';

export default async function sendReservationEmail(
  data: ReservationFormType
): Promise<boolean> {
  const incomingHtmlContent = getReservationEmailIncomingTemplate(data);
  const responseHtmlContent = getReservationEmailResponseTemplate(data);

  try {
    // Send email to internal team
    const response = await resend.emails.send({
      from: 'Reservation Form Submission <reservation-form@canoeville.com>',
      to: 'hello@canoeville.com',
      subject: `New reservation request from ${data.userName}`,
      replyTo: data.userEmail,
      html: incomingHtmlContent,
    });

    if (response.error) {
      throw new Error('Error sending email to internal team');
    }

    // Send email to user
    await resend.emails.send({
      from: 'Canoeville Team <hello@canoeville.com>',
      to: data.userEmail,
      subject: 'Thank you for your reservation request!',
      html: responseHtmlContent,
    });

    return true;
  } catch (error) {
    throw error;
  }
}
