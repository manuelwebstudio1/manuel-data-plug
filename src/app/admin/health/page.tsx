import { AdminPlaceholder } from "@/components/admin/placeholder";

export default function Page() {
  return (
    <AdminPlaceholder
      title="System health"
      description="API latency, Redis, database, and delivery uptime."
    />
  );
}
