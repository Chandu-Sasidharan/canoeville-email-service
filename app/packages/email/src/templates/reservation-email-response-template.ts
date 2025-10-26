import { ReservationFormType } from '../types';

export default function getReservationEmailResponseTemplat(
  data: ReservationFormType
): string {
  const { userName, guests, date, time } = data;
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
                .user-message {
                    line-height: 1.2;
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
                    Your reservation request has been received!
                </div>
                <div class="email-content">
                    <p>Hello ${userName},</p>
                    <p>Thank you for your request. We are on it, and will get back to you as soon as possible.</p>
                    <p><strong>You Requested for:</strong></p>
                    <p class="user-message">Arrival Date: ${date}</p>
                    <p class="user-message">Nuber of guests: ${guests}</p>
                    <p class="user-message">Check-in Time: ${time}</p>
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
