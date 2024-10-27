import twilio from 'twilio';
import nodemailer from 'nodemailer';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendSMSAlert = async (to, alert) => {
  try {
    const message = `
      DISASTER ALERT: ${alert.type}
      Severity: ${alert.severity}
      Location: ${alert.location.district}, ${alert.location.state}
      ${alert.description}
    `;

    await twilioClient.messages.create({
      body: message,
      to,
      from: process.env.TWILIO_PHONE_NUMBER
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

export const sendEmailAlert = async (to, alert) => {
  try {
    await emailTransporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `DISASTER ALERT: ${alert.type} - ${alert.severity} Severity`,
      html: `
        <h2>Disaster Alert</h2>
        <p><strong>Type:</strong> ${alert.type}</p>
        <p><strong>Severity:</strong> ${alert.severity}</p>
        <p><strong>Location:</strong> ${alert.location.district}, ${alert.location.state}</p>
        <p><strong>Description:</strong> ${alert.description}</p>
        <p><strong>Coordinates:</strong> ${alert.location.coordinates.lat}, ${alert.location.coordinates.lng}</p>
      `
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};