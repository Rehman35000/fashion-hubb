import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API Key from environment variables
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export async function POST(request) {
  try {
    if (!resend) {
      console.error("Resend API Key is missing in .env");
      return NextResponse.json({ success: false, message: "Email service not configured. Please add RESEND_API_KEY to your .env file and restart the server." }, { status: 500 });
    }

    const body = await request.json();
    const { email, address, orderDetails } = body;

    console.log("Attempting to send emails to:", email, "and admin");

    // 1. Send Email to CUSTOMER
    const { data: customerData, error: customerError } = await resend.emails.send({
      from: 'Fashion Hubb <onboarding@resend.dev>',
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
    });

    if (customerError) {
        console.error("Resend Customer Email Error:", customerError);
    }

    // 2. Send Email to ADMIN
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: 'Fashion Hubb <onboarding@resend.dev>',
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
    });

    if (adminError) {
        console.error("Resend Admin Email Error:", adminError);
    }

    if (customerError || adminError) {
        const errorMessage = customerError?.message || adminError?.message || "Failed to send one or more emails.";
        return NextResponse.json({ 
            success: false, 
            message: `Resend Error: ${errorMessage}. Note: In test mode, you can only send to your own Resend account email.` 
        }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Emails sent successfully",
      tracking: {
        customerEmailId: customerData?.id,
        adminEmailId: adminData?.id
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Critical Email API Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error: " + error.message }, { status: 500 });
  }
}
