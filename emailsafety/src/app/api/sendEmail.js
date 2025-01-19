import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendTestEmail = async () => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'derekatabayev4@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.accessToken
            }
        })
        const mailOptions = {
            from: 'derekatabayev4@gmail.com',
            to: 'derekatabayev4@gmail.com',
            subject: 'Test Email',
            text: 'This is a test email',
            html: '<h1>This is a test email</h1>'

        };
        const result = await transport.sendMail(mailOptions);
        return result;
    }
    catch (error) {
        return error;
    }
}
export default sendTestEmail;

