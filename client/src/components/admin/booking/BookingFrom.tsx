"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Smartphone, UploadCloud, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  BookingInput,
  BookingSchema,
} from "@/lib/validations/booking.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { adminCreateBooking } from "@/lib/store/booking/bookingSlice";
import { useAppDispatch } from "@/hooks/hook";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function BookingAddComponents() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTrackingId, setSuccessTrackingId] = useState<string | null>(
    null,
  );
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm<BookingInput>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      customerFirstName: "",
      customerLastName: "",
      customerEmail: "",
      customerPhone: "",
      customerAddress: "",
      deviceType: "",
      deviceBrand: "",
      deviceModel: "",
      issueDescription: "",
      notes: "",
    },
  });
  useEffect(() => {
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const chosenFiles = Array.from(e.target.files);
    if (images.length + chosenFiles.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }
    const updatedFiles = [...images, ...chosenFiles];
    setImages(updatedFiles);
    const newUrls = chosenFiles.map((file) => URL.createObjectURL(file));
    setImageUrls((prev) => [...prev, ...newUrls]);
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setImageUrls((prev) => {
      URL.revokeObjectURL(prev[indexToRemove]);
      return prev.filter((_, idx) => idx !== indexToRemove);
    });
  };

  const onFormSubmit = async (data: BookingInput) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const result = await dispatch(adminCreateBooking(data, images) as any);
      if (!result?.success) {
        toast.error(result.message || "Something went wrong");
        return;
      }
      toast.success(result.message || "Booking created successfully");
      reset();
      setImages([]);
      setImageUrls([]);
      setTimeout(() => {
        router.push("/admin/booking");
      }, 800);
    } catch (err: any) {
      toast.error(err.message || "Unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Walk-in Booking</h2>
          <p className="text-slate-500">
            Create a repair request for a physical walk-in customer.
          </p>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Customer Information
              </CardTitle>
              <CardDescription>
                Enter details of the customer for tracking and contact.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="customerFirstName">First Name</Label>
                <Input
                  id="customerFirstName"
                  placeholder="John"
                  {...register("customerFirstName")}
                  className={errors.customerFirstName ? "border-red-500" : ""}
                />
                {errors.customerFirstName && (
                  <p className="text-sm text-red-500">
                    {errors.customerFirstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerLastName">Last Name</Label>
                <Input
                  id="customerLastName"
                  placeholder="Doe"
                  {...register("customerLastName")}
                />
                {errors.customerLastName && (
                  <p className="text-sm text-red-500">
                    {errors.customerLastName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  placeholder="98XXXXXXXX"
                  {...register("customerPhone")}
                  className={errors.customerPhone ? "border-red-500" : ""}
                />
                {errors.customerPhone && (
                  <p className="text-sm text-red-500">
                    {errors.customerPhone.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email Address</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  placeholder="john@example.com"
                  {...register("customerEmail")}
                  className={errors.customerEmail ? "border-red-500" : ""}
                />
                {errors.customerEmail && (
                  <p className="text-sm text-red-500">
                    {errors.customerEmail.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerAddress">Contact Address</Label>
                <Input
                  id="customerAddress"
                  placeholder="123 Main St, City"
                  {...register("customerAddress")}
                  className={errors.customerAddress ? "border-red-500" : ""}
                />
                {errors.customerAddress && (
                  <p className="text-sm text-red-500">
                    {errors.customerAddress.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-500" />
                Device Details
              </CardTitle>
              <CardDescription>
                Specify the device and the problem description.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 w-full">
                  <Controller
                    name="deviceType"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2 w-full">
                        <Label htmlFor="deviceType">Device Type</Label>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger
                            id="deviceType"
                            className={`w-full ${
                              errors.deviceType
                                ? "border-red-500 focus:ring-red-500"
                                : ""
                            }`}
                          >
                            <SelectValue placeholder="Select device type" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="smartphone">
                              Smartphone
                            </SelectItem>

                            <SelectItem value="laptop">Laptop</SelectItem>

                            <SelectItem value="tablet">Tablet</SelectItem>

                            <SelectItem value="smartwatch">
                              Smartwatch
                            </SelectItem>

                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>

                        {errors.deviceType && (
                          <p className="text-sm text-red-500">
                            {errors.deviceType.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deviceBrand">Brand</Label>
                  <Input
                    id="deviceBrand"
                    placeholder="e.g., Apple, Samsung, Dell"
                    {...register("deviceBrand")}
                    className={errors.deviceBrand ? "border-red-500" : ""}
                  />
                  {errors.deviceBrand && (
                    <p className="text-sm text-red-500">
                      {errors.deviceBrand.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deviceModel">Model</Label>
                <Input
                  id="deviceModel"
                  placeholder="e.g., iPhone 13 Pro, Galaxy S22, XPS 15"
                  {...register("deviceModel")}
                  className={errors.deviceModel ? "border-red-500" : ""}
                />
                {errors.deviceModel && (
                  <p className="text-sm text-red-500">
                    {errors.deviceModel.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="issueDescription">Issue Description</Label>
                <Textarea
                  id="issueDescription"
                  placeholder="Please describe what's wrong with the device in detail..."
                  className={`min-h-[120px] ${errors.issueDescription ? "border-red-500" : ""}`}
                  {...register("issueDescription")}
                />
                {errors.issueDescription && (
                  <p className="text-sm text-red-500">
                    {errors.issueDescription.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Device Photos (Optional, max 5)</Label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={images.length >= 5}
                  />
                  <div className="flex flex-col items-center justify-center space-y-2 text-slate-500">
                    <UploadCloud className="w-8 h-8 text-slate-400" />
                    <p className="text-sm font-medium">
                      Click or drag images here
                    </p>
                    <p className="text-xs">PNG, JPG up to 5MB</p>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    {images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-md overflow-hidden border"
                      >
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Preview ${idx}`}
                          className="w-full h-24 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="pt-4 flex justify-end">
            <Link href="/admin/dashboard/booking">
              <Button
                type="button"
                variant="outline"
                className="mr-4"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 h-11 px-8"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Creating Booking..."
                : "Complete Walk-in Booking"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
