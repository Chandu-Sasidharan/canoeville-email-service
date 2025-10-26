import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // CORS preflight support
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.body === null) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Missing request body' }),
    };
  }

  let data: ContactFormType | ReservationFormType;

  // Try parsing JSON body
  try {
    if (typeof event.body === 'string') {
      data = JSON.parse(event.body);
    } else {
      data = event.body as ContactFormType | ReservationFormType;
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Invalid Data' }),
    };
  }

  // Validate data structure
  if (!data || typeof data !== 'object' || !('type' in data)) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Invalid Data' }),
    };
  }

  if (isContactForm(data)) return handleContact(data);
  if (isReservationForm(data)) return handleReservation(data);

  return {
    statusCode: 400,
    headers: corsHeaders,
    body: JSON.stringify({ message: 'Invalid request type' }),
  };
};
