// testEmail.js
const nodemailer = require("nodemailer");
require("dotenv").config();
// testBrevoEmail.js

const SibApiV3Sdk = require("sib-api-v3-sdk");

const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications["api-key"].apiKey = "JxftgHmZbr6cG0K5"; // replace

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
  to: [{ email: "pratham.dahakepsd@gmail.com", name: "Prathamesh" }],
  sender: { email: "prathameshd025@gmail.com", name: "Test Sender" },
  subject: "Brevo Test",
  htmlContent: "<p>Hello, this is a test.</p>",
});

apiInstance
  .sendTransacEmail(sendSmtpEmail)
  .then((data) => console.log("✅ Success:", data))
  .catch((err) =>
    console.error("❌ Error:", err.response ? err.response.text : err)
  );
