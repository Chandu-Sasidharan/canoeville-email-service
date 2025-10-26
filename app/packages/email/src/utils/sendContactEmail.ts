import resend from './resend';
import getContactEmailIncomingTemplate from '../templates/contact-email-incoming-template';
import getContactEmailResponseTemplate from '../templates/contact-email-response-template';
import { ContactFormType } from '../types';

// Function to send contact email
export default async function sendContactEmail(
  data: ContactFormType
): Promise<boolean> {
  const incomingHtmlContent = getContactEmailIncomingTemplate(data);
  const responseHtmlContent = getContactEmailResponseTemplate(data);

  try {
    // Send email to internal team
    const response = await resend.emails.send({
      from: 'Contact Us Form Submission <contact-us-form@canoeville.com>',
      to: 'admin@canoeville.com',
      replyTo: data.userEmail,
      subject: `New message from ${data.userName}`,
      html: incomingHtmlContent,
    });

    if (response.error) {
      throw new Error('Error sending email to internal team');
    }

    // Send email to user
    await resend.emails.send({
      from: 'Canoeville <hello@canoeville.com>',
      to: data.userEmail,
      subject: 'Thank you for contacting Canoeville!',
      html: responseHtmlContent,
    });

    return true;
  } catch (error) {
    throw error;
  }
}
