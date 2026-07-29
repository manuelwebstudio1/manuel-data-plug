"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const schema = z
  .object({
    fullName: z.string().min(2, "Required"),
    username: z.string().min(3, "Min 3 characters"),
    phone: z.string().min(10, "Enter a valid phone"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Min 8 characters"),
    confirmPassword: z.string(),
    referral: z.string().optional(),
    terms: z.boolean().refine((v) => v === true, {
      message: "Accept terms to continue",
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1100));
    toast.success("Account created — verify OTP next");
    router.push("/profile");
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0EA5E922,_transparent_55%),linear-gradient(180deg,#F8FAFC,#EEF4FF)]" />
      <Card className="relative w-full max-w-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0A2A66]">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Join 10,000+ customers on Manuel Data Plug
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" {...register("fullName")} />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register("username")} />
            {errors.username && (
              <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="referral">Referral code (optional)</Label>
            <Input id="referral" {...register("referral")} />
          </div>
          <div className="sm:col-span-2">
            <label className="flex items-start gap-2 text-sm text-slate-600">
              <input type="checkbox" className="mt-1 rounded" {...register("terms")} />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="text-[#0A2A66] underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#0A2A66] underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p className="mt-1 text-xs text-red-600">{errors.terms.message}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Creating account…" : "Create Account"}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#0A2A66] hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
