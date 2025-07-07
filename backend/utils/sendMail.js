import nodemailer from 'nodemailer';

export const sendBookingConfirmation = async (toEmail, bookingDetails) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"WanderWorld 👣" <no-reply@wanderworld.com>',
    to: toEmail,
    subject: '🎉 Tour Booking Confirmed!',
    html: `
      <h2>Your tour has been booked!</h2>
      <p><strong>Tour:</strong> ${bookingDetails.tourName}</p>
      <p><strong>Date:</strong> ${bookingDetails.date}</p>
      <p><strong>Guests:</strong> ${bookingDetails.guests}</p>
      <br>
      <p>Thanks for choosing WanderWorld</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
