"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Check,
  FileText,
  FileCheck,
} from "lucide-react";
import Link from "next/link";

// Static Mock Data
const booking = {
  _id: "6a087bf1c7f57d61c7a1c9c1",
  trackingId: "TRK-98234-X",
  deviceType: "Smartphone",
  deviceBrand: "Apple",
  deviceModel: "iPhone 15 Pro",
  issueDescription:
    "Screen flickering and touch unresponsive after accidental drop.",
  currentStatus: "Pending Drop-off",
  price: 15000,
  createdAt: "2026-05-15T10:00:00Z",
  isGuest: true,
  customerFirstName: "Rajesh",
  customerLastName: "Hamal",
  customerEmail: "rajesh.h@example.com",
  customerPhone: "+977-9800000000",
  customerAddress: "New Baneshwor, Kathmandu",
  timeline: [
    {
      status: "Pending Approval",
      notes: "Booking received and under review.",
      createdAt: "2026-05-15T10:05:00Z",
      isInternal: false,
    },
    {
      status: "Pending Drop-off",
      notes: "Customer requested to drop off device.",
      createdAt: "2026-05-16T09:00:00Z",
      isInternal: false,
    },
  ],
};

const invoice = {
  _id: "INV-001",
  invoiceNumber: "INV-2026-001",
  amount: 15000,
  status: "VERIFICATION_REQUIRED",
  paymentProofUrl: "#",
};

export default function AdminBookingDetails() {
  const [newStatus, setNewStatus] = useState(booking.currentStatus);
  const [newPrice, setNewPrice] = useState(booking.price?.toString() || "");
  const [trackingMessage, setTrackingMessage] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/dashboard/booking">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            Booking Details
            <Badge variant="outline" className="font-mono bg-white">
              {booking.trackingId}
            </Badge>
          </h2>
          <p className="text-slate-500">
            Manage repair status, tracking, and invoicing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Device & Issue Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Device Type</p>
                  <p className="font-medium">{booking.deviceType}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Brand</p>
                  <p className="font-medium">{booking.deviceBrand}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Model</p>
                  <p className="font-medium">{booking.deviceModel}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Created At</p>
                  <p className="font-medium">May 15, 2026</p>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-slate-500 mb-2">Issue Description</p>
                <p className="text-slate-800 bg-slate-50 p-4 rounded-md border">
                  {booking.issueDescription}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tracking Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-4 rounded-lg border space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Status Context</Label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending Drop-off">
                          Pending Drop-off
                        </SelectItem>
                        <SelectItem value="Diagnosing">Diagnosing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Visibility</Label>
                    <Select
                      value={isInternal ? "internal" : "public"}
                      onValueChange={(v) => setIsInternal(v === "internal")}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="internal">Internal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Update Message</Label>
                  <Textarea
                    value={trackingMessage}
                    onChange={(e) => setTrackingMessage(e.target.value)}
                  />
                </div>
                <Button className="w-full">Add Timeline Update</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-medium">
                  {booking.customerFirstName} {booking.customerLastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium">{booking.customerEmail}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="bg-blue-50 pb-4">
              <CardTitle className="text-blue-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Estimated Price (Rs.)</Label>
                <Input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>
              <Button className="w-full bg-blue-600">Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" /> Invoice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md border">
                <div>
                  <p className="text-sm font-medium">
                    Invoice {invoice.invoiceNumber}
                  </p>
                  <p className="text-xs">Rs. {invoice.amount}</p>
                </div>
                <Badge variant="secondary">VERIFICATION_REQUIRED</Badge>
              </div>
              <div className="border p-3 rounded-md border-blue-200 bg-blue-50 mt-4">
                <p className="text-sm font-medium mb-2">Review Payment</p>
                <Button className="w-full bg-green-600">Approve Payment</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
