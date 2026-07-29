"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const schema = z.object({
  transactionId: z.string().min(4, "Required"),
  reference: z.string().min(3, "Required"),
  amount: z.string().min(1, "Required"),
  network: z.string().min(1, "Required"),
  phone: z.string().min(10, "Enter a valid phone"),
  date: z.string().min(1, "Required"),
  time: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

export default function VerifyPaymentPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "pending">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    if (!fileName) {
      toast.error("Upload a payment screenshot");
      return;
    }
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("pending");
    toast.success("Verification submitted — pending admin review");
    reset();
    setFileName(null);
    console.log(data);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          Secure verification
        </div>
        <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0A2A66]">
          Verify Payment
        </h1>
        <p className="mt-2 text-slate-600">
          Submit your MoMo or bank transfer proof for admin approval.
        </p>
      </div>

      {status === "pending" && (
        <Card className="mb-6 flex items-center justify-between p-4">
          <div>
            <p className="font-semibold text-slate-900">Latest submission</p>
            <p className="text-sm text-slate-500">
              Your payment is in the admin verification queue.
            </p>
          </div>
          <Badge variant="warning">Pending</Badge>
        </Card>
      )}

      <Card className="p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label>Payment screenshot</Label>
            <label className="mt-1 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-10 transition hover:border-sky-300 hover:bg-sky-50/40">
              <Upload className="mb-2 h-8 w-8 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">
                {fileName ?? "Click to upload screenshot"}
              </span>
              <span className="mt-1 text-xs text-slate-400">
                PNG, JPG up to 5MB
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setFileName(e.target.files?.[0]?.name ?? null)
                }
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input id="transactionId" {...register("transactionId")} />
              {errors.transactionId && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.transactionId.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="reference">Reference number</Label>
              <Input id="reference" {...register("reference")} />
              {errors.reference && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.reference.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="amount">Amount (GHS)</Label>
              <Input id="amount" type="number" step="0.01" {...register("amount")} />
              {errors.amount && (
                <p className="mt-1 text-xs text-red-600">{errors.amount.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="network">Network / Channel</Label>
              <select
                id="network"
                className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-sky-400/30"
                {...register("network")}
              >
                <option value="">Select</option>
                <option value="MTN MoMo">MTN MoMo</option>
                <option value="Telecel Cash">Telecel Cash</option>
                <option value="AirtelTigo Money">AirtelTigo Money</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
              {errors.network && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.network.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" {...register("phone")} />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" {...register("date")} />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" {...register("time")} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button type="submit" disabled={isSubmitting} size="lg">
              {isSubmitting ? "Submitting…" : "Submit for Verification"}
            </Button>
            <div className="flex gap-2 text-xs text-slate-500">
              <Badge variant="warning">Pending</Badge>
              <Badge variant="success">Approved</Badge>
              <Badge variant="danger">Rejected</Badge>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
