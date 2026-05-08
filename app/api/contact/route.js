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

    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // 1. Send Email to ADMIN
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: 'Fashion Hubb Contact <onboarding@resend.dev>',
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
    });

    // 2. Send Confirmation Email to USER
    const { data: userData, error: userError } = await resend.emails.send({
      from: 'Fashion Hubb <onboarding@resend.dev>',
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
    });

    if (adminError || userError) {
      console.error("Resend Contact Error:", adminError || userError);
      return NextResponse.json({ 
        success: false, 
        message: `Resend Error: ${(adminError || userError).message}. Note: In test mode, you can only send messages from/to your own Resend account email.` 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Message sent successfully",
      tracking: {
        adminEmailId: adminData?.id,
        userEmailId: userData?.id
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
