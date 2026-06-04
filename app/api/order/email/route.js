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

    const { email, address, orderDetails, items } = await request.json();

    // Generate Items HTML Table
    const itemsHtml = items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}<br/><span style="font-size:11px;color:#888;">${item.category || ''}</span></td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.size && item.size !== 'N/A' ? item.size : '—'}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.color && item.color !== 'N/A' ? item.color : '—'}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">Rs ${(item.price * item.quantity).toLocaleString()}.00</td>
      </tr>
    `).join('');

    const itemsTable = `
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background: #f4eae4;">
            <th style="padding: 10px; text-align: left;">Item</th>
            <th style="padding: 10px; text-align: center;">Size</th>
            <th style="padding: 10px; text-align: center;">Color</th>
            <th style="padding: 10px; text-align: center;">Qty</th>
            <th style="padding: 10px; text-align: right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" style="padding: 10px; text-align: right; font-weight: bold;">Shipping:</td>
            <td style="padding: 10px; text-align: right;">Rs 299.00</td>
          </tr>
          <tr>
            <td colspan="4" style="padding: 10px; text-align: right; font-weight: bold; font-size: 1.2em;">Total:</td>
            <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 1.2em;">Rs ${orderDetails.amount.toLocaleString()}.00</td>
          </tr>
        </tfoot>
      </table>
    `;

    // 1. Send Email to CUSTOMER
    const customerMailOptions = {
      from: `"Fashion Hubb" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Order Confirmation - Fashion Hubb',
      html: `
        <div style="font-family: serif; color: #3d251e; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for your order, ${address.firstName}!</h2>
          <p>We've received your order and are currently processing it. Here are your order details:</p>
          <div style="background: #fdfaf7; padding: 25px; border-radius: 12px; border: 1px solid #f4eae4;">
            <h3 style="margin-top: 0;">Order Receipt</h3>
            ${itemsTable}
            
            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee;">
              <h4 style="margin-bottom: 5px;">Shipping Address:</h4>
              <p style="margin: 0;">${address.fullName}</p>
              <p style="margin: 0;">${address.address}</p>
              <p style="margin: 0;">${address.city}, ${address.postalCode}</p>
              <p style="margin: 0;">Phone: ${address.phone}</p>
            </div>
          </div>
          <p style="margin-top: 20px;">We'll notify you once your package is on its way!</p>
        </div>
      `
    };

    // 2. Send Email to ADMIN
    const adminMailOptions = {
      from: `"Fashion Hubb System" <${process.env.GMAIL_USER}>`,
      to: 'thefashionhubbstore1@gmail.com',
      subject: 'NEW ORDER RECEIVED - ACTION REQUIRED',
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d35400;">New Order Alert!</h2>
          <p>A new order has been placed by <strong>${address.fullName}</strong>.</p>
          
          <div style="background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3>Items to Fulfill</h3>
            ${itemsTable}
          </div>

          <div style="margin-top: 20px; background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin-top: 0;">Customer Details</h3>
            <p><strong>Name:</strong> ${address.fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${address.phone}</p>
            <p><strong>Shipping Address:</strong><br/>
              ${address.address}<br/>
              ${address.apartment ? address.apartment + '<br/>' : ''}
              ${address.city}, ${address.postalCode}
            </p>
          </div>
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
