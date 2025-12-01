import { Plane, Ship, Truck, Warehouse, FileCheck, Globe2 } from "lucide-react";

export const services = [
  {
    slug: "air-freight",
    icon: Plane,
    title: "Air Freight",
    description:
      "When time is critical, our air freight services ensure your cargo reaches its destination with speed and reliability. We offer direct and consolidated services to major airports worldwide.",
    features: ["Express Delivery", "Door-to-Door", "Charter Services"],
    details:
      "Our air freight solutions are designed for time-sensitive shipments that require the fastest possible delivery. We work with top-tier airlines to provide you with flexible scheduling and competitive rates. Whether you are shipping small packages or oversized cargo, our team ensures your goods are handled with the utmost care and arrive on time.",
  },
  {
    slug: "ocean-freight",
    icon: Ship,
    title: "Ocean Freight",
    description:
      "Cost-effective solutions for large volume shipments. We provide Full Container Load (FCL) and Less than Container Load (LCL) services with flexible sailing schedules.",
    features: ["FCL & LCL", "Port-to-Port", "Cargo Insurance"],
    details:
      "Ocean freight is the most economical way to ship large volumes of goods globally. We offer comprehensive ocean shipping services, including FCL (Full Container Load) and LCL (Less than Container Load), as well as breakbulk and project cargo handling. Our strong relationships with major shipping lines guarantee space availability and competitive pricing.",
  },
  {
    slug: "land-transport",
    icon: Truck,
    title: "Land Transport",
    description:
      "Comprehensive ground transportation network connecting major hubs. From full truckload to LTL, we optimize routes for efficiency and cost-savings.",
    features: ["Road & Rail", "Cross-border", "GPS Tracking"],
    details:
      "Our land transport network covers extensive routes across continents, offering reliable road and rail freight services. We provide FTL (Full Truckload) and LTL (Less than Truckload) options, ensuring your cargo is transported efficiently. With real-time GPS tracking, you can monitor your shipment's progress every step of the way.",
  },
  {
    slug: "warehousing",
    icon: Warehouse,
    title: "Warehousing",
    description:
      "State-of-the-art storage facilities with advanced inventory management systems. We offer short-term and long-term storage solutions for all types of goods.",
    features: ["Climate Control", "24/7 Security", "Pick & Pack"],
    details:
      "Our warehousing solutions provide secure and scalable storage for your inventory. Equipped with modern technology, our facilities offer climate control, 24/7 security monitoring, and advanced inventory management systems. We also offer value-added services such as pick and pack, labeling, and distribution to streamline your supply chain.",
  },
  {
    slug: "customs-brokerage",
    icon: FileCheck,
    title: "Customs Brokerage",
    description:
      "Navigate complex customs regulations with ease. Our experts handle all documentation and compliance requirements to ensure smooth clearance of your goods.",
    features: ["Import/Export", "Duty Consulting", "Compliance"],
    details:
      "Navigating international customs regulations can be challenging. Our experienced customs brokers handle all necessary documentation and compliance procedures to ensure your shipments clear customs smoothly and without delay. We stay up-to-date with the latest trade laws to minimize risks and avoid costly penalties.",
  },
  {
    slug: "supply-chain",
    icon: Globe2,
    title: "Supply Chain",
    description:
      "End-to-end supply chain optimization. We analyze your logistics needs and design tailored solutions to improve efficiency and reduce operational costs.",
    features: ["Consulting", "Optimization", "Analytics"],
    details:
      "We offer end-to-end supply chain management services to optimize your logistics operations. From procurement to distribution, our experts analyze your supply chain to identify inefficiencies and implement cost-saving strategies. We use advanced analytics and technology to improve visibility, agility, and overall performance.",
  },
];
