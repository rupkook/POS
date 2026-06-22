const Contact = require("../models/Contact");
const { validateEmail, validatePhone } = require("../utils/validation");
const sendEmail = require("../utils/sendEmail");

const submitContact = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, country, message } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format." });
        }

        if (!validatePhone(phone, country)) {
            return res.status(400).json({ success: false, message: "Invalid phone number for the selected country." });
        }

        const contact = await Contact.create({ firstName, lastName, email, phone, country, message });

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>We've Received Your Message!</h2>
                <p>Hi ${firstName},</p>
                <p>Thank you for getting in touch with us. We have received your message and our team will get back to you as soon as possible.</p>
                <br/>
                <p><strong>Your Message:</strong></p>
                <blockquote style="border-left: 4px solid #E8FAAA; padding-left: 15px; font-style: italic; background-color: #f9f9f9; padding: 10px;">
                    ${message}
                </blockquote>
                <br/>
                <p>Best regards,</p>
                <p><strong>The Markt POS Team</strong></p>
            </div>
        `;

        // Send email asynchronously without blocking the response
        sendEmail({
            email: email,
            subject: "Thank you for contacting Markt POS",
            html: htmlContent
        });

        res.status(201).json({
            success: true,
            data: contact,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    submitContact,
};