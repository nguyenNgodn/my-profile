import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Configure Nodemailer SMTP Transporter
    // Uses environment variables if set, with fallback to direct SMTP configuration
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER || "ngonguyen295@gmail.com";
    const smtpPass = process.env.SMTP_PASS || "nmkz pqgb pmgt qfeq"; // Gmail App Password

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for port 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      to: "ngonguyen295@gmail.com",
      replyTo: email,
      subject: `[Stylo CV Contact] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 8px;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin-top: 20px;"><strong>Message:</strong></p>
          <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #10b981; border-radius: 4px;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;" />
          <p style="font-size: 12px; color: #888;">Sent automatically from your Stylo CV Portfolio contact form.</p>
        </div>
      `,
    };

    // If SMTP_PASS is missing in dev mode, log gracefully instead of crashing
    if (!smtpPass) {
      console.log("----------------------------------------------------");
      console.log("[MOCK EMAIL SENT - SMTP_PASS not set in environment]");
      console.log(`To: ngonguyen295@gmail.com`);
      console.log(`From: ${name} (${email})`);
      console.log(`Message: ${message}`);
      console.log("----------------------------------------------------");
      return NextResponse.json({
        success: true,
        message: "Message received! (Logged locally - add SMTP_PASS to .env.local to send live emails)",
      });
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error: unknown) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
