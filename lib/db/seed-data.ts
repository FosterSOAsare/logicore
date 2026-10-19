import type { Document } from "mongoose";
import type { IPackage } from "@/lib/db/models/package.model";

export type SeedPackage = Omit<
  IPackage,
  keyof Document | "createdAt" | "updatedAt"
>;

// Seed data mirrors what the admin actions produce:
// - plannedRoute ids are "origin", "stop-N", "dest", with exactly one stop
//   marked isActive (the stop the package last reached)
// - timeline is newest-first, with only the newest event marked current
// - progress follows updateTracker(): each leg is 100 / (stops - 1) percent,
//   plus 50% of the next leg for In Transit, 20% for Customs Hold
export const seedPackages: SeedPackage[] = [
  {
    trackingId: "LGC-882910",
    status: "In Transit",
    // Active at stop 1 of 4 (Tokyo), in transit: 33.33 + 50% of 33.33
    progress: 50,
    carrier: "Logicore Logistics",
    service: "Sea Freight - Express",
    receiver: {
      name: "TechFlow Inc.",
      email: "logistics@techflow.example",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Blvd, San Francisco, CA 94105",
    },
    origin: {
      location: "Port of Shanghai, China",
      date: "Dec 01, 2025",
      time: "08:30 AM",
    },
    destination: {
      location: "San Francisco, US",
      date: "Dec 15, 2025 (Est)",
    },
    details: {
      weight: "4,500 kg",
      dimensions: "20ft Container",
      items: 1240,
      value: "$125,000.00",
    },
    plannedRoute: [
      { id: "origin", location: "Port of Shanghai, China", isActive: false, date: "Dec 01, 2025" },
      { id: "stop-1", location: "Tokyo Port, Japan", isActive: true, date: "Dec 03, 2025" },
      { id: "stop-2", location: "Port of Los Angeles, USA", isActive: false, date: "Dec 12, 2025 (Est)" },
      { id: "dest", location: "San Francisco, US", isActive: false, date: "Dec 15, 2025 (Est)" },
    ],
    timeline: [
      { status: "In Transit", location: "Tokyo Port, Japan", date: "Dec 04, 2025", time: "02:00 PM", completed: true, current: true },
      { status: "Arrived at Facility", location: "Tokyo Port, Japan", date: "Dec 03, 2025", time: "07:00 AM", completed: true, current: false },
      { status: "In Transit", location: "Port of Shanghai, China", date: "Dec 01, 2025", time: "08:30 AM", completed: true, current: false },
      { status: "Shipment Created", location: "Port of Shanghai, China", date: "Nov 28, 2025", time: "10:00 AM", completed: true, current: false },
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
      email: "import@globaltrade.example",
      phone: "+1 (212) 555-0199",
      address: "456 Market St, New York, NY 10001",
    },
    origin: {
      location: "Frankfurt Airport, Germany",
      date: "Nov 25, 2025",
      time: "09:00 AM",
    },
    destination: {
      location: "New York, US",
      date: "Nov 28, 2025",
    },
    details: {
      weight: "1,200 kg",
      dimensions: "3x Pallets",
      items: 450,
      value: "$85,000.00",
    },
    plannedRoute: [
      { id: "origin", location: "Frankfurt Airport, Germany", isActive: false, date: "Nov 25, 2025" },
      { id: "stop-1", location: "JFK International Airport, NY", isActive: false, date: "Nov 27, 2025" },
      { id: "dest", location: "New York, US", isActive: true, date: "Nov 28, 2025" },
    ],
    timeline: [
      { status: "Delivered", location: "New York, US", date: "Nov 28, 2025", time: "04:15 PM", completed: true, current: true },
      { status: "Out for Delivery", location: "New York, US", date: "Nov 28, 2025", time: "09:30 AM", completed: true, current: false },
      { status: "Arrived at Destination", location: "New York, US", date: "Nov 28, 2025", time: "08:00 AM", completed: true, current: false },
      { status: "Customs Cleared", location: "JFK International Airport, NY", date: "Nov 27, 2025", time: "11:00 PM", completed: true, current: false },
      { status: "Arrived at Facility", location: "JFK International Airport, NY", date: "Nov 27, 2025", time: "06:00 PM", completed: true, current: false },
      { status: "In Transit", location: "Frankfurt Airport, Germany", date: "Nov 26, 2025", time: "11:00 AM", completed: true, current: false },
      { status: "Shipment Created", location: "Frankfurt Airport, Germany", date: "Nov 25, 2025", time: "09:00 AM", completed: true, current: false },
    ],
  },
  {
    trackingId: "LGC-554102",
    status: "Customs Hold",
    // Active at stop 1 of 4 (Singapore), held: 33.33 + 20% of 33.33
    progress: 40,
    carrier: "Logicore Sea",
    service: "Sea Freight",
    receiver: {
      name: "Acme Corp",
      email: "supply@acmecorp.example",
      phone: "+61 2 9876 5432",
      address: "101 Industrial Park, Sydney, AU",
    },
    origin: {
      location: "Tokyo Port, Japan",
      date: "Nov 30, 2025",
      time: "10:00 AM",
    },
    destination: {
      location: "Sydney, AU",
      date: "Dec 20, 2025 (Est)",
    },
    details: {
      weight: "12,000 kg",
      dimensions: "40ft Container",
      items: 5000,
      value: "$45,000.00",
    },
    plannedRoute: [
      { id: "origin", location: "Tokyo Port, Japan", isActive: false, date: "Nov 30, 2025" },
      { id: "stop-1", location: "Port of Singapore", isActive: true, date: "Dec 05, 2025" },
      { id: "stop-2", location: "Port Botany, Sydney", isActive: false, date: "Dec 18, 2025 (Est)" },
      { id: "dest", location: "Sydney, AU", isActive: false, date: "Dec 20, 2025 (Est)" },
    ],
    timeline: [
      { status: "Customs Hold", location: "Port of Singapore", date: "Dec 05, 2025", time: "09:00 AM", completed: true, current: true },
      { status: "Arrived at Facility", location: "Port of Singapore", date: "Dec 05, 2025", time: "08:00 AM", completed: true, current: false },
      { status: "In Transit", location: "Tokyo Port, Japan", date: "Dec 01, 2025", time: "06:00 PM", completed: true, current: false },
      { status: "Shipment Created", location: "Tokyo Port, Japan", date: "Nov 30, 2025", time: "10:00 AM", completed: true, current: false },
    ],
  },
  {
    trackingId: "LGC-773211",
    status: "Pending",
    // Freshly created, so it can be edited on /edit-details
    progress: 0,
    carrier: "Logicore Logistics",
    service: "Land Transport",
    receiver: {
      name: "BuildRight Construction",
      email: "orders@buildright.example",
      phone: "+44 20 7946 0958",
      address: "22 Canary Wharf, London, UK",
    },
    origin: {
      location: "Port of Jebel Ali, UAE",
      date: "Dec 02, 2025",
      time: "11:00 AM",
    },
    destination: {
      location: "London, UK",
      date: "Dec 22, 2025 (Est)",
    },
    details: {
      weight: "8,300 kg",
      dimensions: "2x Flatbed",
      items: 36,
      value: "$62,500.00",
    },
    plannedRoute: [
      { id: "origin", location: "Port of Jebel Ali, UAE", isActive: true, date: "Dec 02, 2025" },
      { id: "stop-1", location: "Port of Rotterdam, Netherlands", isActive: false },
      { id: "dest", location: "London, UK", isActive: false, date: "Dec 22, 2025 (Est)" },
    ],
    timeline: [
      { status: "Shipment Created", location: "Port of Jebel Ali, UAE", date: "Dec 02, 2025", time: "11:00 AM", completed: true, current: true },
    ],
  },
];
