import PackagesHeader from "@/features/packages/ui/packages-header";
import PackagesList from "@/features/packages/ui/packages-list";
import { getPackages } from "@/features/packages/actions";

export default async function PackagesPage({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    status?: string;
    view?: string;
  }>;
}) {
  const resolvedQuery = await searchParams;
  const query = resolvedQuery?.query || "";
  const status = resolvedQuery?.status || "All";
  const view = resolvedQuery?.view || "list";

  const packages = await getPackages({ query, status });

  return (
    <>
      <PackagesHeader />
      <PackagesList initialPackages={packages} view={view as "grid" | "list"} />
    </>
  );
}
