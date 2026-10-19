import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/connect";
import Package from "@/lib/db/models/package.model";
import { seedPackages } from "@/lib/db/seed-data";

export async function GET() {
  // Destructive: wipes the packages collection. Never expose outside local development.
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    await connectToDatabase();

    // Validate everything before deleting, so bad seed data can't leave
    // the collection empty
    const docs = seedPackages.map((pkg) => new Package(pkg));
    await Promise.all(docs.map((doc) => doc.validate()));

    await Package.deleteMany({});
    await Package.insertMany(docs);

    return NextResponse.json({
      message: "Database seeded successfully!",
      count: docs.length,
      trackingIds: docs.map((doc) => doc.trackingId),
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
