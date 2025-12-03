import { notFound } from "next/navigation";
import { getPackageById } from "@/features/packages/actions";
import PackageDetailsView from "@/features/packages/ui/package-details-view";

export default async function SinglePackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const packageData = await getPackageById((await params).id);

  if (!packageData) {
    notFound();
  }

  return <PackageDetailsView packageData={packageData} />;
}
