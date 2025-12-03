import { notFound, redirect } from "next/navigation";
import { getPackageById } from "@/features/packages/actions";
import EditPackageForm from "@/features/packages/ui/edit-package-form";
import { PackageFormValues } from "@/features/packages/schemas";
import { error } from "console";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPackageDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const pkg = await getPackageById(id);

  if (!pkg) {
    notFound();
  }

  // If package is not pending, redirect to edit-tracker (or just show a message?)
  // User said: "This is when the package is still pending else create /[id]/edit-tracker"
  if (pkg.status !== "Pending") {
    redirect(`/xfa/admin/packages/${id}/edit-tracker`);
  }

  // Transform package data to form values
  const initialData: PackageFormValues & { trackingId: string } = {
    trackingId: pkg.trackingId,
    receiverName: pkg.receiver.name,
    receiverEmail: pkg.receiver.email,
    receiverPhone: pkg.receiver.phone,
    receiverAddress: pkg.receiver.address,
    originLocation: pkg.origin.location,
    destinationLocation: pkg.destination.location,
    destinationDate: pkg.destination.date,
    weight: pkg.details.weight,
    dimensions: pkg.details.dimensions,
    items: pkg.details.items,
    value: pkg.details.value,
    carrier: pkg.carrier,
    service: pkg.service,
    stops: pkg.plannedRoute
      .filter((stop: any) => stop.id !== "origin" && stop.id !== "dest")
      .map((stop: any) => ({
        location: stop.location,
        status: stop.status,
      })),
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Edit Package Details
          </h1>
          <p className="text-slate-500 mt-2">
            Update shipment information for {pkg.trackingId}
          </p>
        </div>

        <EditPackageForm initialData={initialData} />
      </div>
    </div>
  );
}
