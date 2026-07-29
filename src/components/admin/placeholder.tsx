import { Card } from "@/components/ui/card";

export function AdminPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0A2A66]">
          {title}
        </h1>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <Card className="p-8 text-sm text-slate-600">
        This module is wired into the admin shell and ready for API integration
        with Prisma, Redis, and role-based access control.
      </Card>
    </div>
  );
}
