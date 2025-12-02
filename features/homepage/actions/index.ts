"use server";

import { QuoteFormData } from "../schema";

export async function submitQuoteForm(data: QuoteFormData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/quote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to submit quote request. Please try again later.",
      };
    }

    return {
      success: true,
      message:
        "Quote request received! We'll send you a competitive rate within 2 hours.",
    };
  } catch (error) {
    console.error("Quote form submission error:", error);
    return {
      success: false,
      message: "Failed to submit quote request. Please try again later.",
    };
  }
}
