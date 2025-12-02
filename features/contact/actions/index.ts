"use server";

import { ContactFormData } from "../schema";

export async function submitContactForm(data: ContactFormData) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/contact`,
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
          result.message || "Failed to send message. Please try again later.",
      };
    }

    return {
      success: true,
      message:
        "Thank you for contacting us! We'll get back to you within 2 hours.",
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    };
  }
}
