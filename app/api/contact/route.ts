import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/features/contact/schema";
import { emailService } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate with zod schema
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Determine conditional flags based on subject
    const emailData = {
      ...data,
      isTrackingInquiry: data.subject === "Track Shipment",
      isPartnershipInquiry: data.subject === "Partnership",
      isBillingInquiry: data.subject === "Billing Inquiry",
      isIssueReport: data.subject === "Report an Issue",
      isCareerInquiry: data.subject === "Career Opportunities",
    };

    // Send email notification to admin
    await emailService.sendContactNotification(emailData);

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
