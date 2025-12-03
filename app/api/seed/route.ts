import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/connect";
import Package, { IPackage } from "@/lib/db/models/package.model";

const seedPackages = [
  {
    trackingId: "LGC-882910",
    status: "In Transit",
    progress: 45,
    carrier: "Logicore Logistics",
    service: "Sea Freight - Express",
    receiver: {
      name: "TechFlow Inc.",
      email: "logistics@techflow.com",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Blvd, San Francisco, CA 94105",
    },
    origin: {
      location: "Shanghai, CN",
      date: "Dec 01, 2025",
      time: "08:30 AM",
    },
    destination: {
      location: "San Francisco, US",
      date: "Dec 15, 2025 (Est)",
      time: "02:00 PM",
    },
    details: {
      weight: "4,500 kg",
      dimensions: "20ft Container",
      items: 1240,
      value: "$125,000.00",
    },
    // Route: Shanghai -> Tokyo -> LA -> SF
    plannedRoute: [
      {
        id: "stop-1",
        location: "Shanghai, CN",
        status: "Completed",
        date: "Dec 01, 2025",
      },
      {
        id: "stop-2",
        location: "Tokyo Port, JP",
        status: "Completed",
        date: "Dec 03, 2025",
      },
      {
        id: "stop-3",
        location: "Los Angeles Port, US",
        status: "In Transit",
        date: "Dec 12, 2025 (Est)",
      },
      {
        id: "stop-4",
        location: "San Francisco, US",
        status: "Pending",
        date: "Dec 15, 2025 (Est)",
      },
    ],
    timeline: [
      {
        status: "Shipment Created",
        location: "Shanghai, CN",
        date: "Nov 28, 2025",
        time: "10:00 AM",
        completed: true,
      },
      {
        status: "Export Customs Cleared",
        location: "Shanghai, CN",
        date: "Nov 30, 2025",
        time: "04:00 PM",
        completed: true,
      },
      {
        status: "Departed Origin",
        location: "Shanghai Port",
        date: "Dec 01, 2025",
        time: "08:30 AM",
        completed: true,
      },
      {
        status: "Arrived at Hub",
        location: "Tokyo Port, JP",
        date: "Dec 03, 2025",
        time: "07:00 AM",
        completed: true,
      },
      {
        status: "Departed Hub",
        location: "Tokyo Port, JP",
        date: "Dec 04, 2025",
        time: "02:00 PM",
        completed: true,
      },
      {
        status: "In Transit",
        location: "Pacific Ocean",
        date: "Dec 05, 2025",
        time: "12:00 PM",
        completed: false,
        current: true,
      },
    ],
  },
  {
    trackingId: "LGC-992103",
    status: "Delivered",
    progress: 100,
    carrier: "Logicore Air",
    service: "Air Freight - Priority",
    receiver: {
      name: "Global Trade Solutions",
      email: "import@globaltrade.com",
      phone: "+1 (212) 555-0199",
      address: "456 Market St, New York, NY 10001",
    },
    origin: {
      location: "Hamburg, DE",
      date: "Nov 25, 2025",
      time: "09:00 AM",
    },
    destination: {
      location: "New York, US",
      date: "Nov 28, 2025",
      time: "04:15 PM",
    },
    details: {
      weight: "1,200 kg",
      dimensions: "3x Pallets",
      items: 450,
      value: "$85,000.00",
    },
    // Route: Hamburg -> JFK -> Manhattan -> NY
    plannedRoute: [
      {
        id: "stop-1",
        location: "Hamburg, DE",
        status: "Completed",
        date: "Nov 25, 2025",
      },
      {
        id: "stop-2",
        location: "JFK Airport, NY",
        status: "Completed",
        date: "Nov 27, 2025",
      },
      {
        id: "stop-3",
        location: "Manhattan Dist. Center",
        status: "Completed",
        date: "Nov 28, 2025",
      },
      {
        id: "stop-4",
        location: "New York, US",
        status: "Completed",
        date: "Nov 28, 2025",
      },
    ],
    timeline: [
      {
        status: "Shipment Created",
        location: "Hamburg, DE",
        date: "Nov 25, 2025",
        time: "09:00 AM",
        completed: true,
      },
      {
        status: "Export Customs Cleared",
        location: "Hamburg Airport",
        date: "Nov 26, 2025",
        time: "10:00 AM",
        completed: true,
      },
      {
        status: "Departed Origin",
        location: "Hamburg Airport",
        date: "Nov 26, 2025",
        time: "11:00 AM",
        completed: true,
      },
      {
        status: "Arrived at Destination Hub",
        location: "JFK Airport, NY",
        date: "Nov 27, 2025",
        time: "06:00 PM",
        completed: true,
      },
      {
        status: "Import Customs Cleared",
        location: "JFK Airport, NY",
        date: "Nov 28, 2025",
        time: "08:00 AM",
        completed: true,
      },
      {
        status: "Delivered",
        location: "New York, NY",
        date: "Nov 28, 2025",
        time: "04:15 PM",
        completed: true,
        current: true,
      },
    ],
  },
  {
    trackingId: "LGC-554102",
    status: "Customs",
    progress: 60,
    carrier: "Logicore Sea",
    service: "Sea Freight",
    receiver: {
      name: "Acme Corp",
      email: "supply@acmecorp.com",
      phone: "+61 2 9876 5432",
      address: "101 Industrial Park, Sydney, AU",
    },
    origin: {
      location: "Tokyo, JP",
      date: "Nov 30, 2025",
      time: "10:00 AM",
    },
    destination: {
      location: "Sydney, AU",
      date: "Dec 20, 2025",
      time: "TBD",
    },
    details: {
      weight: "12,000 kg",
      dimensions: "40ft Container",
      items: 5000,
      value: "$45,000.00",
    },
    // Route: Tokyo -> Singapore -> Sydney
    plannedRoute: [
      {
        id: "stop-1",
        location: "Tokyo, JP",
        status: "Completed",
        date: "Nov 30, 2025",
      },
      {
        id: "stop-2",
        location: "Singapore Hub",
        status: "Completed",
        date: "Dec 05, 2025",
      },
      {
        id: "stop-3",
        location: "Sydney Port, AU",
        status: "Pending",
        date: "Dec 18, 2025",
      },
      {
        id: "stop-4",
        location: "Sydney, AU",
        status: "Pending",
        date: "Dec 20, 2025",
      },
    ],
    timeline: [
      {
        status: "Shipment Created",
        location: "Tokyo, JP",
        date: "Nov 30, 2025",
        time: "10:00 AM",
        completed: true,
      },
      {
        status: "Export Customs Cleared",
        location: "Tokyo Port",
        date: "Dec 01, 2025",
        time: "04:00 PM",
        completed: true,
      },
      {
        status: "Departed Origin",
        location: "Tokyo Port",
        date: "Dec 01, 2025",
        time: "06:00 PM",
        completed: true,
      },
      {
        status: "Arrived at Hub",
        location: "Singapore Hub",
        date: "Dec 05, 2025",
        time: "08:00 AM",
        completed: true,
      },
      {
        status: "Customs Hold",
        location: "Singapore Hub",
        date: "Dec 05, 2025",
        time: "09:00 AM",
        completed: false,
        current: true,
      },
    ],
  },
];

export async function GET() {
  try {
    await connectToDatabase();

    // Clear existing data to avoid duplicates
    await Package.deleteMany({});

    // Insert new seed data
    await Package.create(seedPackages as any);

    return NextResponse.json({
      message: "Database seeded successfully!",
      count: seedPackages.length,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
