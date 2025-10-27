import sendContactEmail from './utils/sendContactEmail';
import getErrorMessage from './utils/getErrorMessage';
import { ContactFormType } from './types';

async function handleContact(data: ContactFormType) {
  try {
    // Bot detection: honeypot
    if (data.hp && data.hp.trim() !== '') {
      return {
        statusCode: 204, // No Content — don't reveal detection logic
        body: '',
      };
    }

    // Bot detection: time-based (frontend measures elapsedTime)
    const MIN_FILL_TIME_MS = 3000;
    const elapsedTime = Number(data.elapsedTime || 0);
    if (!elapsedTime || elapsedTime < MIN_FILL_TIME_MS) {
      return {
        statusCode: 204, // No Content — don't reveal detection logic
        body: '',
      };
    }

    if (!data.userName || !data.userEmail || !data.message || !data.userPhone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    await sendContactEmail(data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email sent successfully',
      }),
    };
  } catch (error: unknown) {
    //TODO: Integrate with monitoring service like Sentry
    console.error(
      'Error occurred while sending email:',
      getErrorMessage(error)
    );

    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
}

export default handleContact;
