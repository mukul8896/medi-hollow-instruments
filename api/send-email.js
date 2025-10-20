import fs from "fs";
import path from "path";
import { createTransport } from "nodemailer";

// Simple HTML template function
function createEmailHTML({ productName, contactNumber, email, query }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        New Product Query
      </h2>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Customer Contact No:</strong> ${contactNumber}</p>
        <p><strong>Customer Email:</strong> ${email}</p>
        <div style="margin-top: 15px;">
          <strong>Query:</strong>
          <div style="background: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
            ${query.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Get email config
function getEmailConfig() {
  try {
    const configPath = path.join(process.cwd(), 'src', 'siteConfig.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return config.contact.email;
  } catch (error) {
    console.error('Error reading siteConfig.json:', error);
    return process.env.TO_EMAIL;
  }
}

export default async function handler(req, res) {
  // Only allow POST
  console.log('Received request method:', req.method);
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { productName, contactNumber, email, query } = req.body;

    // Validate required fields
    if (!productName || !contactNumber || !email || !query) {
      console.log('Validation error: Missing fields', { productName, contactNumber, email, query });
      return res.status(400).json({ 
        ok: false, 
        error: `Validation error: Missing fields ${ productName, contactNumber, email, query }`
      });
    }

    // Create transporter (using Gmail SMTP as example)
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const toEmail = getEmailConfig();
    const emailHTML = createEmailHTML({ productName, contactNumber, email, query });

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: `Product Query: ${productName}`,
      html: emailHTML
    });

    console.log('Email sent:', info.messageId);

    return res.status(200).json({ 
      ok: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ 
      ok: false, 
      error: 'Failed to send email' 
    });
  }
}
