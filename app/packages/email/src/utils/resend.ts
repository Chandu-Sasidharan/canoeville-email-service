import { Resource } from 'sst';
import { Resend } from 'resend';

// Get Resend API key from aws secret manager
const RESEND_API_KEY = Resource.RESEND_API_KEY.value;
if (!RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

// Initialize Resend client
const resend = new Resend(RESEND_API_KEY);

export default resend;
