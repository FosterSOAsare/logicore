import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import { services } from "@/features/services/data";
import { notFound } from "next/navigation";
import ServiceDetailHero from "@/features/services/ui/ServiceDetailHero";
import ServiceDetailContent from "@/features/services/ui/ServiceDetailContent";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found - LogiCore",
    };
  }

  return {
    title: `${service.title} - LogiCore Services`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = (await params).slug as string;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ServiceDetailHero
        title={service.title}
        description={service.description}
      />
      <ServiceDetailContent slug={slug} />
      <Footer />
    </main>
  );
}
