import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      return NextResponse.json({ success: false, message: "Email credentials missing" }, { status: 500 });
    }

    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // 1. Send Email to ADMIN
    const adminMailOptions = {
      from: `"Fashion Hubb Contact" <${process.env.GMAIL_USER}>`,
      to: 'thefashionhubbstore1@gmail.com',
      subject: `Contact Form: ${subject || 'New Message'}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; border-left: 4px solid #3d251e;">
            ${message}
          </div>
        </div>
      `
    };

    // 2. Send Confirmation Email to USER
    const userMailOptions = {
      from: `"Fashion Hubb" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'We received your message!',
      html: `
        <div style="font-family: serif; color: #3d251e; max-width: 600px; margin: auto; padding: 20px;">
          <h1>Hello ${name},</h1>
          <p>Thank you for reaching out to us. We've received your message regarding "<strong>${subject || 'Inquiry'}</strong>" and our team will get back to you as soon as possible.</p>
          <p>In the meantime, feel free to browse our latest collections.</p>
          <p style="margin-top: 30px;">Best regards,<br>The Fashion Hubb Team</p>
        </div>
      `
    };

    const adminInfo = await transporter.sendMail(adminMailOptions);
    const userInfo = await transporter.sendMail(userMailOptions);

    return NextResponse.json({ 
      success: true, 
      message: "Message sent successfully",
      tracking: {
        adminEmailId: adminInfo.messageId,
        userEmailId: userInfo.messageId
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Contact Gmail Error:", error);
    return NextResponse.json({ success: false, message: "Contact Error: " + error.message }, { status: 500 });
  }
}
