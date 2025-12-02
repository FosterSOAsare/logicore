# Email Templates - LogiCore Logistics

This directory contains HTML email templates for the LogiCore website contact forms.

## Templates

### 1. Quote Request Template (`quote-request.html`)

Used when a customer submits a shipping quote request from the homepage.

**Variables to replace:**

- `{{firstName}}` - Customer's first name
- `{{lastName}}` - Customer's last name
- `{{email}}` - Customer's email address
- `{{shippingRequirements}}` - Selected freight type (Air Freight, Ocean Freight, Land Transport, Warehousing)
- `{{message}}` - Customer's message about their cargo

**Usage Example:**

```javascript
const emailHtml = quoteTemplate
  .replace("{{firstName}}", formData.firstName)
  .replace("{{lastName}}", formData.lastName)
  .replace("{{email}}", formData.email)
  .replace("{{shippingRequirements}}", formData.shippingRequirements)
  .replace("{{message}}", formData.message);
```

---

### 2. Contact Inquiry Template (`contact-inquiry.html`)

Used when a customer submits a general inquiry from the contact page.

**Variables to replace:**

- `{{firstName}}` - Customer's first name
- `{{lastName}}` - Customer's last name
- `{{email}}` - Customer's email address
- `{{subject}}` - Selected inquiry subject
- `{{message}}` - Customer's message

**Conditional Sections (Handlebar-style):**

- `{{#if isTrackingInquiry}}...{{/if}}` - Shows when subject is "Track Shipment"
- `{{#if isPartnershipInquiry}}...{{/if}}` - Shows when subject is "Partnership"
- `{{#if isBillingInquiry}}...{{/if}}` - Shows when subject is "Billing Inquiry"
- `{{#if isIssueReport}}...{{/if}}` - Shows when subject is "Report an Issue"
- `{{#if isCareerInquiry}}...{{/if}}` - Shows when subject is "Career Opportunities"

**Usage Example:**

```javascript
let emailHtml = contactTemplate
  .replace("{{firstName}}", formData.firstName)
  .replace("{{lastName}}", formData.lastName)
  .replace("{{email}}", formData.email)
  .replace("{{subject}}", formData.subject)
  .replace("{{message}}", formData.message);

// Handle conditional sections based on subject
const isTrackingInquiry = formData.subject === "Track Shipment";
emailHtml = emailHtml.replace(
  /{{#if isTrackingInquiry}}([\s\S]*?){{\/if}}/g,
  isTrackingInquiry ? "$1" : ""
);
// Repeat for other conditional sections...
```

---

## Design Features

- **Responsive Design**: Works on all email clients and devices
- **Inline Styles**: All CSS is inline for maximum email client compatibility
- **Brand Consistency**: Uses LogiCore color scheme (Primary: #0f172a, Secondary: #0ea5e9)
- **Professional Layout**: Clean, modern design with gradients and proper spacing
- **Call-to-Action**: Reply buttons with mailto links
- **Mobile-Friendly**: Optimized for mobile email clients

## Testing

Test templates with various email clients:

- Gmail (desktop & mobile)
- Outlook (desktop & web)
- Apple Mail
- Yahoo Mail
- Mobile clients (iOS Mail, Android)

Use tools like [Litmus](https://litmus.com) or [Email on Acid](https://www.emailonacid.com) for comprehensive testing.

## Integration

These templates are designed to be used with your backend email service (e.g., SendGrid, Mailgun, Nodemailer, Resend, etc.).

Example integration with Nodemailer:

```javascript
import nodemailer from "nodemailer";
import fs from "fs";

const quoteTemplate = fs.readFileSync("./templates/quote-request.html", "utf8");

const mailOptions = {
  from: "noreply@logicore.com",
  to: "quotes@logicore.com",
  subject: "New Quote Request",
  html: processedTemplate,
};

transporter.sendMail(mailOptions);
```

## Customization

To customize templates:

1. Maintain inline styles for email client compatibility
2. Update color values to match brand guidelines
3. Test thoroughly across email clients after changes
4. Keep file size under 100KB for optimal delivery
