import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export async function POST(request) {
  try {
    if (!resend) {
      console.error("Resend API Key is missing in .env");
      return NextResponse.json({ success: false, message: "Email service not configured. Please add RESEND_API_KEY and restart server." }, { status: 500 });
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // Send Welcome Email to Subscriber
    const { data, error } = await resend.emails.send({
      from: 'Fashion Hubb <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to the Fashion Hubb Inner Circle!',
      html: `
        <div style="font-family: serif; color: #3d251e; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #f0e6e0; border-radius: 12px;">
          <h1 style="text-align: center; color: #3d251e;">Welcome to the Family!</h1>
          <p>Thank you for joining the Fashion Hubb Inner Circle. We're thrilled to have you with us.</p>
          <p>As a subscriber, you'll be the first to know about:</p>
          <ul>
            <li>Exclusive early access to new collections</li>
            <li>Members-only offers and discounts</li>
            <li>Latest style trends and inspiration</li>
          </ul>
          <div style="background: #fdfaf7; padding: 20px; border-radius: 12px; text-align: center; margin-top: 30px;">
            <p style="margin: 0; font-weight: bold; color: #3d251e;">Enjoy 10% OFF your next order!</p>
            <p style="margin: 10px 0; font-size: 24px; letter-spacing: 2px;">CODE: <strong>WELCOME10</strong></p>
          </div>
          <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #999;">
            © 2026 Fashion Hubb. All rights reserved.
          </p>
        </div>
      `
    });

    if (error) {
      console.error("Resend Newsletter Error:", error);
      return NextResponse.json({ 
        success: false, 
        message: `Resend Error: ${error.message}. Note: In test mode, you can only subscribe with your own Resend account email.` 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Subscribed successfully",
      trackingId: data?.id 
    }, { status: 200 });

  } catch (error) {
    console.error("Newsletter API Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
