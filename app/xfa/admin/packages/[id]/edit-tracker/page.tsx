import { notFound } from "next/navigation";
import { getPackageById } from "@/features/packages/actions";
import EditTrackerForm from "@/features/packages/ui/edit-tracker-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTrackerPage({ params }: PageProps) {
  const { id } = await params;
  const pkg = await getPackageById(id);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Update Tracker</h1>
          <p className="text-slate-500 mt-2">
            Update status and location for {pkg.trackingId}
          </p>
        </div>

        <EditTrackerForm pkg={pkg} />
      </div>
    </div>
  );
}
