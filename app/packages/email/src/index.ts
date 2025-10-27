import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import handleContact from './handleContact.js';
import handleReservation from './handleReservation.js';
import { ContactFormType, ReservationFormType } from './types';

function isContactForm(
  data: ContactFormType | ReservationFormType
): data is ContactFormType {
  return data.type === 'contact';
}

function isReservationForm(
  data: ContactFormType | ReservationFormType
): data is ReservationFormType {
  return data.type === 'reservation';
}

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing request body' }),
    };
  }

  let data: ContactFormType | ReservationFormType;

  // Try parsing JSON body
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid Data' }),
    };
  }

  // Validate data structure
  if (!data || typeof data !== 'object' || !('type' in data)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid Data' }),
    };
  }

  if (isContactForm(data)) return handleContact(data);
  if (isReservationForm(data)) return handleReservation(data);

  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Invalid request type' }),
  };
};
