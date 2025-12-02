import { readFile } from "fs/promises";
import path from "path";
import Handlebars from "handlebars";
import nodemailer from "nodemailer";

interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  // Conditional flags for subject-specific content
  isTrackingInquiry?: boolean;
  isPartnershipInquiry?: boolean;
  isBillingInquiry?: boolean;
  isIssueReport?: boolean;
  isCareerInquiry?: boolean;
}

interface QuoteEmailData {
  firstName: string;
  lastName: string;
  email: string;
  shippingRequirements: string;
  message: string;
}

export class EmailService {
  private transporter?: nodemailer.Transporter;
  private templatesDir: string;
  private templates: { [key: string]: HandlebarsTemplateDelegate } = {};
  private isConfigured: boolean = false;

  constructor() {
    // Check if email configuration is available
    const requiredEnvVars = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASSWORD",
      "EMAIL_FROM",
    ];
    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
      console.warn(
        `📧 Email service not configured. Missing environment variables: ${missingVars.join(
          ", "
        )}`
      );
      console.warn(
        "Email functionality will be disabled. Please configure SMTP settings in your .env file."
      );
      this.isConfigured = false;
    } else {
      this.isConfigured = true;

      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_PORT === "465", // true for port 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      // Test the connection
      this.testConnection();
    }

    this.templatesDir = path.resolve(process.cwd(), "templates");
  }

  private async testConnection() {
    if (!this.transporter) {
      console.warn("❌ Email transporter not initialized");
      this.isConfigured = false;
      return;
    }

    try {
      await this.transporter.verify();
      console.log("✅ Email service connected successfully");
      this.isConfigured = true;
    } catch (error) {
      console.error("❌ Email service connection failed:", error);
      console.warn(
        "Email functionality will be disabled. Please check your SMTP configuration."
      );
      this.isConfigured = false;
    }
  }

  /**
   * Load and compile an email template
   */
  private async loadTemplate(
    templateName: string
  ): Promise<HandlebarsTemplateDelegate> {
    // Check if template is already cached
    if (this.templates[templateName]) {
      return this.templates[templateName];
    }

    const templatePath = path.join(this.templatesDir, `${templateName}.html`);
    const templateContent = await readFile(templatePath, "utf-8");
    const compiled = Handlebars.compile(templateContent);

    // Cache the compiled template
    this.templates[templateName] = compiled;

    return compiled;
  }

  /**
   * Generate contact inquiry email HTML
   */
  async generateContactEmail(data: ContactEmailData): Promise<string> {
    const template = await this.loadTemplate("contact-inquiry");
    return template(data);
  }

  /**
   * Generate quote request email HTML
   */
  async generateQuoteEmail(data: QuoteEmailData): Promise<string> {
    const template = await this.loadTemplate("quote-request");
    return template(data);
  }

  /**
   * Send contact inquiry notification to admin
   */
  async sendContactNotification(data: ContactEmailData): Promise<void> {
    if (!this.isConfigured) {
      console.warn(
        "📧 Email service not configured. Skipping contact notification."
      );
      return;
    }

    if (!process.env.SUPPORT_EMAIL) {
      console.warn(
        "⚠️ SUPPORT_EMAIL not configured. Skipping contact notification."
      );
      return;
    }

    const html = await this.generateContactEmail(data);

    await this.sendEmail({
      to: process.env.SUPPORT_EMAIL,
      subject: `New Contact Inquiry: ${data.subject}`,
      html,
    });

    console.log(`✅ Contact notification sent to ${process.env.SUPPORT_EMAIL}`);
  }

  /**
   * Send quote request notification to admin
   */
  async sendQuoteNotification(data: QuoteEmailData): Promise<void> {
    if (!this.isConfigured) {
      console.warn(
        "📧 Email service not configured. Skipping quote notification."
      );
      return;
    }

    if (!process.env.SUPPORT_EMAIL) {
      console.warn(
        "⚠️ SUPPORT_EMAIL not configured. Skipping quote notification."
      );
      return;
    }

    const html = await this.generateQuoteEmail(data);

    await this.sendEmail({
      to: process.env.SUPPORT_EMAIL,
      subject: `New Quote Request - ${data.shippingRequirements}`,
      html,
    });

    console.log(`✅ Quote notification sent to ${process.env.SUPPORT_EMAIL}`);
  }

  /**
   * Send email using SMTP service
   */
  private async sendEmail(options: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    if (!this.isConfigured || !this.transporter) {
      console.warn("📧 Email service not configured. Email not sent.");
      console.log("📋 Email preview:", {
        to: options.to,
        subject: options.subject,
        htmlLength: options.html.length,
      });
      return;
    }

    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
    } catch (error) {
      console.error("❌ Failed to send email:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();
