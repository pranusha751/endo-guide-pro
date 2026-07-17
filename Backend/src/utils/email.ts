import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `http://localhost:3000/verify-email?token=${token}`;

  if (resend) {
    try {
      await resend.emails.send({
        from: "Endo Guide Pro <onboarding@resend.dev>",
        to: email,
        subject: "Verify your email address",
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
            <h2>Welcome to Endo Guide Pro!</h2>
            <p>Please click the button below to verify your email address and activate your account.</p>
            <a href="${verificationLink}" style="display: inline-block; padding: 12px 24px; background-color: #10b981; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 16px;">Verify Email</a>
            <p style="margin-top: 24px; color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="color: #666; font-size: 12px; word-break: break-all;">${verificationLink}</p>
          </div>
        `,
      });
      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error("Failed to send email via Resend:", error);
    }
  } else {
    // Development fallback
    console.log("\n==================================================");
    console.log(`[MOCK EMAIL] Verification Email for ${email}`);
    console.log(`Click here to verify: ${verificationLink}`);
    console.log("==================================================\n");
  }
}
