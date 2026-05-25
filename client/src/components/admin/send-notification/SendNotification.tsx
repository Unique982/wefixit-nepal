"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Bell, Send, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface NotificationForm {
  userId: string;
  type: string;
  title: string;
  message: string;
}

const NOTIFICATION_TYPES = [
  { value: "SYSTEM", label: "ℹ️ Info / System" },
  { value: "BOOKING", label: "✅ Repair Update" },
  { value: "PROMO", label: "🎁 Promotion" },
  { value: "ALERT", label: "⚠️ Alert / Warning" },
];

export default function SendNotification() {
  // Controlled components को लागि प्रारम्भिक स्टेट सुरक्षित रूपमा खाली स्ट्रिङ सेट गरिएको छ
  const [form, setForm] = useState<NotificationForm>({
    userId: "",
    type: "SYSTEM",
    title: "",
    message: "",
  });

  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await APIWITHTOKEN.get("/admin/users");
      return res.data.data;
    },
  });

  const sendMutation = useMutation({
    mutationFn: async (formData: NotificationForm) => {
      if (!formData.userId || !formData.title || !formData.message) {
        throw new Error("All fields are required");
      }
      await APIWITHTOKEN.post("/admin/send-notification", formData);
    },
    onSuccess: () => {
      toast.success("Notification sent successfully!");
      setForm({ userId: "", title: "", message: "", type: "SYSTEM" });
    },
    onError: (err: any) => {
      toast.error(
        err.message ||
          err.response?.data?.message ||
          "Failed to send notification",
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.userId || !form.title || !form.message) return;
    sendMutation.mutate(form);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Send Notification</h2>
        <p className="text-slate-500">
          Send a custom in-app notification (+ email) to any client.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <CardTitle>Compose Notification</CardTitle>
          </div>
          <CardDescription>
            The user will receive an in-app notification and an email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* native form wrap गर्नाले accessibility र enter key submission राम्रो हुन्छ */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Selector */}
            <div className="space-y-2">
              <Label htmlFor="userId" className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Select Client
              </Label>
              {usersLoading ? (
                <div className="h-10 bg-slate-100 animate-pulse rounded-md" />
              ) : (
                <Select
                  value={form.userId}
                  onValueChange={(val) => setForm({ ...form, userId: val })}
                >
                  <SelectTrigger id="userId" className="w-full">
                    <SelectValue placeholder="Choose a client..." />
                  </SelectTrigger>
                  <SelectContent>
                    {users
                      ?.filter((u) => u.role !== "admin")
                      .map((user) => (
                        <SelectItem key={user._id} value={user._id}>
                          {user.firstName} {user.lastName} — {user.email}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label>Notification Type</Label>
              <Select
                value={form.type}
                onValueChange={(val) => setForm({ ...form, type: val })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {NOTIFICATION_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="notif-title">Title</Label>
              <Input
                id="notif-title"
                placeholder="e.g. Your repair is ready!"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="notif-message">Message</Label>
              <textarea
                id="notif-message"
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Enter your notification message here..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            {/* Preview */}
            {(form.title || form.message) && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-in fade-in duration-200">
                <p className="text-xs font-semibold text-blue-600 mb-1">
                  Preview
                </p>
                <p className="font-semibold text-slate-900">
                  {form.title || "Title..."}
                </p>
                <p className="text-sm text-slate-600">
                  {form.message || "Message..."}
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={
                sendMutation.isPending ||
                !form.userId ||
                !form.title ||
                !form.message
              }
            >
              <Send className="w-4 h-4 mr-2" />
              {sendMutation.isPending ? "Sending..." : "Send Notification"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
