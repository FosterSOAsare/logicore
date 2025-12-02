import { NextRequest, NextResponse } from "next/server";
import { quoteFormSchema } from "@/features/homepage/schema";
import { emailService } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate with zod schema
    const validationResult = quoteFormSchema.safeParse(body);

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

    // Send email notification to admin
    await emailService.sendQuoteNotification(data);

    return NextResponse.json({
      success: true,
      message: "Quote request submitted successfully",
    });
  } catch (error) {
    console.error("Quote form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
