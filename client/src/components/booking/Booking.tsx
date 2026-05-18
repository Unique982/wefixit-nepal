"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, X, CheckCircle2, AlertCircle } from "lucide-react";

import { z } from "zod";
import { BookingSchema } from "@/lib/validations/booking.validation";
import { useAppDispatch } from "@/hooks/hook";
import { createBooking } from "@/lib/store/booking/bookingSlice";

export default function PublicBooking() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTrackingId, setSuccessTrackingId] = useState<string | null>(
    null,
  );
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const chosenFiles = Array.from(e.target.files);
    const totalFilesCount = images.length + chosenFiles.length;

    if (totalFilesCount > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    setErrors((prev) => ({ ...prev, images: "" }));

    const updatedFiles = [...images, ...chosenFiles];
    setImages(updatedFiles);

    const newUrls = chosenFiles.map((file) => URL.createObjectURL(file));
    setImageUrls((prev) => [...prev, ...newUrls]);
  };

  // Remove uploaded image safely
  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setImageUrls((prev) => {
      URL.revokeObjectURL(prev[indexToRemove]);
      return prev.filter((_, idx) => idx !== indexToRemove);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const form = new FormData(e.currentTarget);

      const payload = {
        customerFirstName: form.get("customerFirstName")?.toString() || "",
        customerLastName: form.get("customerLastName")?.toString() || "",
        customerEmail: form.get("customerEmail")?.toString() || "",
        customerPhone: form.get("customerPhone")?.toString() || "",
        customerAddress: form.get("customerAddress")?.toString() || "",
        deviceType: form.get("deviceType")?.toString() || "",
        deviceBrand: form.get("deviceBrand")?.toString() || "",
        deviceModel: form.get("deviceModel")?.toString() || "",
        issueDescription: form.get("issueDescription")?.toString() || "",
        notes: form.get("notes")?.toString() || "",
      };
      const parsed = BookingSchema.safeParse({
        ...payload,
        images,
      });

      if (!parsed.success) {
        toast.error(parsed.error.issues[0].message);
        setIsSubmitting(false);
        return;
      }

      const result = await dispatch(createBooking(payload, images) as any);

      if (!result?.success) {
        toast.error(result.message || "Something went wrong");
        return;
      }

      toast.success(result.message || "Booking created successfully");

      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch (err: any) {
      toast.error(err.message || "Unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const FieldError = ({ fieldName }: { fieldName: string }) => {
    if (!errors[fieldName]) return null;
    return (
      <span className="text-xs font-medium text-red-500 flex items-center gap-1 mt-1 animate-in fade-in-50 duration-200">
        <AlertCircle className="w-3 h-3" /> {errors[fieldName]}
      </span>
    );
  };

  if (successTrackingId) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto text-center space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Request Submitted!
            </h2>
            <p className="text-slate-600 mb-6">
              Your repair request has been successfully sent to our technicians.
              We will review it shortly.
            </p>

            <div className="bg-slate-50 rounded-xl p-4 mb-8">
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">
                Your Tracking ID
              </p>
              <p className="text-3xl font-bold text-blue-600 tracking-widest select-all">
                {successTrackingId}
              </p>
            </div>

            <p className="text-sm text-slate-500 mb-8">
              You will receive an email once your request is approved containing
              your login credentials to track your repair.
            </p>

            <Button
              onClick={() => router.push("/")}
              className="w-full"
              size="lg"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardHeader className="text-center pb-8 border-b border-slate-100">
            <CardTitle className="text-3xl font-bold text-slate-900">
              Book a Repair
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Fill out the form below to submit a repair request. You do not
              need an account—we will create one for you upon approval.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* Section 1: Personal Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm">
                    1
                  </span>
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className={errors.customerFirstName ? "text-red-500" : ""}
                    >
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="customerFirstName"
                      required
                      placeholder="John"
                      className={
                        errors.customerFirstName
                          ? "border-red-400 focus-visible:ring-red-400"
                          : ""
                      }
                    />
                    <FieldError fieldName="customerFirstName" />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className={errors.customerLastName ? "text-red-500" : ""}
                    >
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="customerLastName"
                      required
                      placeholder="Doe"
                      className={
                        errors.customerLastName
                          ? "border-red-400 focus-visible:ring-red-400"
                          : ""
                      }
                    />
                    <FieldError fieldName="customerLastName" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className={errors.customerEmail ? "text-red-500" : ""}
                    >
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="customerEmail"
                      type="email"
                      required
                      placeholder="john@example.com"
                      className={
                        errors.customerEmail
                          ? "border-red-400 focus-visible:ring-red-400"
                          : ""
                      }
                    />
                    <FieldError fieldName="customerEmail" />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className={errors.customerPhone ? "text-red-500" : ""}
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="customerPhone"
                      required
                      placeholder="+977 98..."
                      className={
                        errors.customerPhone
                          ? "border-red-400 focus-visible:ring-red-400"
                          : ""
                      }
                    />
                    <FieldError fieldName="customerPhone" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className={errors.customerAddress ? "text-red-500" : ""}
                  >
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    name="customerAddress"
                    required
                    placeholder="Kathmandu, Nepal"
                    className={
                      errors.customerAddress
                        ? "border-red-400 focus-visible:ring-red-400"
                        : ""
                    }
                  />
                  <FieldError fieldName="customerAddress" />
                </div>
              </div>

              <div className="border-t border-slate-100"></div>

              {/* Section 2: Device Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm">
                    2
                  </span>
                  Device Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="deviceType"
                      className={errors.deviceType ? "text-red-500" : ""}
                    >
                      Device Type <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="deviceType"
                      name="deviceType"
                      required
                      placeholder="Phone, Laptop..."
                      className={
                        errors.deviceType
                          ? "border-red-400 focus-visible:ring-red-400"
                          : ""
                      }
                    />
                    <FieldError fieldName="deviceType" />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="deviceBrand"
                      className={errors.deviceBrand ? "text-red-500" : ""}
                    >
                      Brand <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="deviceBrand"
                      name="deviceBrand"
                      required
                      placeholder="Apple, Samsung..."
                      className={
                        errors.deviceBrand
                          ? "border-red-400 focus-visible:ring-red-400"
                          : ""
                      }
                    />
                    <FieldError fieldName="deviceBrand" />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="deviceModel"
                      className={errors.deviceModel ? "text-red-500" : ""}
                    >
                      Model <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="deviceModel"
                      name="deviceModel"
                      required
                      placeholder="iPhone 13 Pro"
                      className={
                        errors.deviceModel
                          ? "border-red-400 focus-visible:ring-red-400"
                          : ""
                      }
                    />
                    <FieldError fieldName="deviceModel" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="issueDescription"
                    className={errors.issueDescription ? "text-red-500" : ""}
                  >
                    Issue Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="issueDescription"
                    name="issueDescription"
                    required
                    placeholder="Describe the problem you are experiencing with your device..."
                    className={`min-h-[100px] ${errors.issueDescription ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                  />
                  <FieldError fieldName="issueDescription" />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="notes"
                    className={errors.notes ? "text-red-500" : ""}
                  >
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any specific requests or information we should know?"
                    className={`min-h-[80px] ${errors.notes ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                  />
                  <FieldError fieldName="notes" />
                </div>
              </div>

              <div className="border-t border-slate-100"></div>

              {/* Section 3: Device Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm">
                    3
                  </span>
                  Device Images (Optional)
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("images")?.click()}
                      className={`border-dashed border-2 hover:border-blue-500 hover:text-blue-600 transition-colors ${errors.images ? "border-red-400 bg-red-50/10" : "border-slate-300"}`}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Images (Max 5)
                    </Button>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <span className="text-sm text-slate-500">
                      {images.length}/5 images selected
                    </span>
                  </div>
                  <FieldError fieldName="images" />

                  {imageUrls.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                      {imageUrls.map((url, index) => (
                        <div
                          key={url}
                          className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-square"
                        >
                          <img
                            src={url}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting Request..."
                    : "Submit Repair Request"}
                </Button>
                <p className="text-center text-sm text-slate-500 mt-4">
                  By submitting this form, you agree to our terms of service.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
