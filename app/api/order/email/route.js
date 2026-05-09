import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Initialize Nodemailer Transporter
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

    const { email, address, orderDetails } = await request.json();

    // 1. Send Email to CUSTOMER
    const customerMailOptions = {
      from: `"Fashion Hubb" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Order Confirmation - Fashion Hubb',
      html: `
        <div style="font-family: serif; color: #3d251e;">
          <h1>Thank you for your order, ${address.firstName}!</h1>
          <p>We've received your order and are currently processing it.</p>
          <div style="background: #fdfaf7; padding: 20px; border-radius: 12px;">
            <h3>Order Summary</h3>
            <p><strong>Total Amount:</strong> Rs ${orderDetails.amount.toLocaleString()}.00</p>
            <p><strong>Shipping Address:</strong> ${address.address}, ${address.city}</p>
          </div>
          <p>We'll notify you once your package is on its way.</p>
        </div>
      `
    };

    // 2. Send Email to ADMIN
    const adminMailOptions = {
      from: `"Fashion Hubb System" <${process.env.GMAIL_USER}>`,
      to: 'thefashionhubbstore1@gmail.com',
      subject: 'NEW ORDER RECEIVED',
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Order Alert</h2>
          <p><strong>Customer:</strong> ${address.fullName} (${email})</p>
          <p><strong>Phone:</strong> ${address.phone}</p>
          <p><strong>Amount:</strong> Rs ${orderDetails.amount.toLocaleString()}.00</p>
          <p><strong>Address:</strong> ${address.address}, ${address.city}</p>
        </div>
      `
    };

    // Send emails
    const customerInfo = await transporter.sendMail(customerMailOptions);
    const adminInfo = await transporter.sendMail(adminMailOptions);

    return NextResponse.json({ 
      success: true, 
      message: "Emails sent successfully via Gmail",
      tracking: {
        customerEmailId: customerInfo.messageId,
        adminEmailId: adminInfo.messageId
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Gmail Error:", error);
    return NextResponse.json({ success: false, message: "Email Error: " + error.message }, { status: 500 });
  }
}
