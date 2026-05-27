import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"KETA.COMP Website" <${process.env.EMAIL_USER}>`,
      to: 'keta.comp.dev@gmail.com',
      replyTo: email,
      subject: `[KETA.COMP] ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #05060a; color: #f8fafc; padding: 32px; border-radius: 12px; border: 1px solid #1e293b;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px;">
            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #3b82f6, #22d3ee); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-weight: bold; font-size: 14px;">K</span>
            </div>
            <span style="font-family: monospace; font-weight: bold; color: white; font-size: 16px;">KETA<span style="color: #22d3ee;">.</span>COMP</span>
          </div>

          <h2 style="color: #22d3ee; font-size: 20px; margin-bottom: 20px;">New Contact Form Submission</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px 0; color: #64748b; font-size: 13px; width: 100px;">Name</td>
              <td style="padding: 10px 0; color: #f1f5f9; font-size: 14px;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; color: #3b82f6; font-size: 14px;">
                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Subject</td>
              <td style="padding: 10px 0; color: #f1f5f9; font-size: 14px;">${subject}</td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <div style="color: #64748b; font-size: 13px; margin-bottom: 8px;">Message</div>
            <div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; color: #cbd5e1; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #1e293b; color: #475569; font-size: 12px;">
            Sent from KETA.COMP website contact form — ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Tashkent' })} (Tashkent time)
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
