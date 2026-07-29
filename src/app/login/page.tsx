"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { BrandLogo } from "@/components/layout/brand-logo";
import { supabase } from "@/lib/supabase/client";

const schema = z.object({
  emailOrPhone: z.string().min(5, "Enter email or phone"),
  password: z.string().min(6, "Minimum 6 characters"),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { remember: true },
  });

  const onSubmit = async (values: FormValues) => {
    const email = values.emailOrPhone.trim();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message || "Invalid login details");
      return;
    }

    const userId = data.user?.id;
    let role = "USER";

    if (userId) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();

      const profileRole = (profile as { role?: string } | null)?.role;
      role = profileRole ?? "USER";
    }

    toast.success("Welcome back");

    if (role === "ADMIN" || role === "SUPER_ADMIN" || role === "STAFF") {
      router.push("/admin");
    } else {
      router.push("/profile");
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0EA5E922,_transparent_55%),linear-gradient(180deg,#F8FAFC,#EEF4FF)]" />
      <Card className="relative w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <BrandLogo href="" size={56} showWordmark={false} />
          </div>
          <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0A2A66]">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to Manuel Data Plug
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="emailOrPhone">Email or phone</Label>
            <Input
              id="emailOrPhone"
              type="email"
              placeholder="admin@manueldataplug.com"
              {...register("emailOrPhone")}
            />
            {errors.emailOrPhone && (
              <p className="mt-1 text-xs text-red-600">
                {errors.emailOrPhone.message}
              </p>
            )}
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <Label htmlFor="password" className="mb-0">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-sky-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" className="rounded" {...register("remember")} />
            Remember me
          </label>
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <div className="mt-6">
          <Button variant="secondary" className="w-full" disabled>
            Continue with Google (soon)
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          No account?{" "}
          <Link href="/register" className="font-semibold text-[#0A2A66] hover:underline">
            Create one
          </Link>
        </p>
      </Card>
    </div>
  );
}
