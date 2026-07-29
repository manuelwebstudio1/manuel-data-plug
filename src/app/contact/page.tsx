"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10, "Tell us a bit more"),
});

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent — we'll reply shortly");
    reset();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-xl">
        <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0A2A66]">
          Contact us
        </h1>
        <p className="mt-2 text-slate-600">
          Reach support via WhatsApp, phone, email, or the form below.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {[
            {
              icon: MessageCircle,
              label: "WhatsApp",
              value: "+233 00 000 0000",
            },
            { icon: Phone, label: "Phone", value: "+233 00 000 0000" },
            { icon: Mail, label: "Email", value: "support@manueldataplug.com" },
            {
              icon: Clock,
              label: "Business hours",
              value: "24/7 digital delivery · Support 8am–10pm",
            },
            {
              icon: MapPin,
              label: "Location",
              value: "Accra, Ghana",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="flex items-start gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-0.5 font-medium text-slate-800">{item.value}</p>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-6 lg:col-span-3">
          <h2 className="mb-4 font-semibold text-slate-900">Send a message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                rows={5}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400/30"
                {...register("message")}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send message"}
            </Button>
          </form>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <iframe
              title="Google Map"
              src="https://maps.google.com/maps?q=Accra%20Ghana&t=&z=12&ie=UTF8&iwloc=&output=embed"
              className="h-56 w-full border-0 grayscale-[20%]"
              loading="lazy"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
