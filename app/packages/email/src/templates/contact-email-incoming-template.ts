import { ContactFormType } from '../types';

export default function getContactEmailIncomingTemplate(data: ContactFormType) {
  const { userName, userEmail, message } = data;
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
                <div class="email-content">
                    <p>Message from <strong>${userName}</strong>,  <strong>${userEmail}</strong></p>
                    <p>Hello Jijo,</p>
                    <p>${message}</p>
                </div>
                <div class="email-footer">
                    © ${currentYear} Canoeville | All Rights Reserved.
                </div>
            </div>
        </body>
        </html>
    `;
}
