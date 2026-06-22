const { isValidPhoneNumber } = require("libphonenumber-js");

const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
};

const validatePhone = (phone, country) => {
    try {
        return isValidPhoneNumber(phone, country);
    } catch (error) {
        return false;
    }
};

module.exports = { validateEmail, validatePhone };
