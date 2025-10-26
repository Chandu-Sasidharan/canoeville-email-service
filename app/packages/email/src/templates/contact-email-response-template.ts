import { ContactFormType } from '../types';

export default function getContactEmailResponseTemplate(
  data: ContactFormType
): string {
  const { userName, message } = data;
  const currentYear = new Date().getFullYear();

  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    color: #475569;
                }
                .email-wrapper {
                    background-color: #ffffff;
                    margin: 20px;
                    padding: 20px;
                }
                .email-header {
                    font-size: 20px;
                    color: #ffaa17;
                    padding-bottom: 10px;
                    border-bottom: 2px solid #eeeeee;
                    margin-bottom: 20px;
                }
                .email-content {
                    line-height: 1.5;
                    font-size: 16px;
                }
                .email-footer {
                    font-size: 14px;
                    border-top: 1px solid #eeeeee;
                    margin-top: 20px;
                    padding-top: 10px;
                }
                .email-signature {
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-wrapper">
                <div class="email-header">
                    Your message has been received!
                </div>
                <div class="email-content">
                    <p>Hello ${userName},</p>
                    <p>Thank you for contacting us. We are on it, and will get back to you as soon as possible.</p>
                    <p>Your Message:</p>
                    <p class="user-message">${message}</p>
                    <p class="email-signature">Best wishes,<br>CanoeVille Team</p>
                </div>
                <div class="email-footer">
                    © ${currentYear} Canoeville | All Rights Reserved.
                </div>
            </div>
        </body>
        </html>
    `;
}
