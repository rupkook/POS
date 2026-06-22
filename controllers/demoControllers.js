const Demo = require("../models/Demo");
const { validateEmail, validatePhone } = require("../utils/validation");
const sendEmail = require("../utils/sendEmail");

const submitDemo = async (req, res) => {
    try {
        const { companyName, firstName, lastName, email, phone, country } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format." });
        }

        if (!validatePhone(phone, country)) {
            return res.status(400).json({ success: false, message: "Invalid phone number for the selected country." });
        }

        const demo = await Demo.create({ companyName, firstName, lastName, email, phone, country });

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>Thank You for Requesting a Demo!</h2>
                <p>Hi ${firstName},</p>
                <p>We've received your demo request for <strong>${companyName}</strong>. A Markt POS expert will reach out to you shortly at <strong>${phone}</strong> to schedule your 30-minute custom walkthrough.</p>
                <p>We're excited to show you what Markt POS can do for your specialty market.</p>
                <br/>
                <p>Best regards,</p>
                <p><strong>The Markt POS Team</strong></p>
            </div>
        `;

        // Send email asynchronously without blocking the response
        sendEmail({
            email: email,
            subject: "Your Markt POS Demo Request",
            html: htmlContent
        });

        res.status(201).json({
            success: true,
            data: demo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    submitDemo,
};