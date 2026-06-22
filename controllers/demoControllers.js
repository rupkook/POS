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

        // Send email asynchronously to the user without blocking the response
        sendEmail({
            email: email,
            subject: "Your Markt POS Demo Request",
            html: htmlContent
        });

        // Send notification email asynchronously to the admin
        const adminHtmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>New Demo Request Received</h2>
                <p><strong>Company Name:</strong> ${companyName}</p>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Country:</strong> ${country}</p>
            </div>
        `;

        sendEmail({
            email: process.env.EMAIL_USER,
            subject: `New Demo Request from ${companyName}`,
            html: adminHtmlContent
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

const getDemos = async (req, res) => {
    try {
        const demos = await Demo.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: demos });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteDemo = async (req, res) => {
    try {
        const demo = await Demo.findByIdAndDelete(req.params.id);
        if (!demo) {
            return res.status(404).json({ success: false, message: 'Demo request not found' });
        }
        res.status(200).json({ success: true, message: 'Demo request deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    submitDemo,
    getDemos,
    deleteDemo,
};