"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Reset link sent — check your inbox");
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0EA5E922,_transparent_55%),linear-gradient(180deg,#F8FAFC,#EEF4FF)]" />
      <Card className="relative w-full max-w-md p-8">
        <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0A2A66]">
          Reset password
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter your email and we&apos;ll send a secure reset link.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send reset link"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          <Link href="/login" className="font-semibold text-[#0A2A66] hover:underline">
            Back to login
          </Link>
        </p>
      </Card>
    </div>
  );
}
