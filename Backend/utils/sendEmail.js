import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // change if using another provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendOTPEmail = async (to, otp) => {
    // Always log for dev visibility, even if email sending fails
    console.log(`[DEV] Password reset OTP for ${to}: ${otp}`);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('EMAIL_USER/EMAIL_PASS not set — skipping actual email send.');
        return;
    }

    try {
        await transporter.sendMail({
            from: `"ExpenseFlow" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Your ExpenseFlow Password Reset Code',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Password Reset Request</h2>
                    <p>Use the code below to reset your password. It expires in 10 minutes.</p>
                    <h1 style="letter-spacing: 4px;">${otp}</h1>
                    <p>If you didn't request this, you can ignore this email.</p>
                </div>
            `
        });
    } catch (error) {
        console.error('Error sending OTP email:', error.message);
    }
};