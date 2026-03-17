"use client";

import { useState } from "react";
import { Upload, X, Info } from "lucide-react";

export default function RepairDetailsStep() {
  const [issue, setIssue] = useState("hardware");
  const [images, setImages] = useState<string[]>([]);

  // Handle image upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      newImages.push(URL.createObjectURL(files[i]));
    }

    setImages((prev) => [...prev, ...newImages]);
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow border">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between mb-3">
            <h2 className="font-semibold text-gray-800">Repair Details</h2>
            <span className="text-xs text-blue-600 font-medium">
              Step 2 of 4
            </span>
          </div>

          {/* Progress */}
          <div className="w-full bg-gray-200 h-2 rounded mb-4">
            <div className="bg-blue-500 h-2 w-1/2 rounded"></div>
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>DEVICE</span>
            <span className="text-blue-600 font-medium">ISSUE</span>
            <span>SCHEDULE</span>
            <span>CONFIRM</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <h3 className="text-lg font-semibold">Describe the problem</h3>
            <p className="text-sm text-gray-500">
              Tell us what's wrong with your MacBook Pro M2
            </p>
          </div>

          {/* Issue Select */}
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setIssue("hardware")}
              className={`border rounded-lg p-4 cursor-pointer ${
                issue === "hardware"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <p className="font-medium text-sm">Hardware Damage</p>
              <p className="text-xs text-gray-500">
                Screen, battery, ports, keys
              </p>
            </div>

            <div
              onClick={() => setIssue("software")}
              className={`border rounded-lg p-4 cursor-pointer ${
                issue === "software"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <p className="font-medium text-sm">Software Issue</p>
              <p className="text-xs text-gray-500">
                OS crashes, virus, slow performance
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Detailed Description</label>

            <textarea
              rows={4}
              placeholder="e.g. My screen flickers when opening lid..."
              className="mt-2 w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Upload Section */}
          <div>
            <label className="text-sm font-medium">Add Photos (Optional)</label>

            <label className="mt-2 border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50">
              <Upload size={28} />

              <p className="text-sm mt-2">Upload clear photos of the damage</p>

              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </label>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg overflow-hidden border"
                  >
                    <img src={img} className="w-full h-24 object-cover" />

                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Schedule */}
          <div>
            <h4 className="font-semibold mb-4">Pick-up or Drop-off</h4>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Select Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg p-2 mt-1 text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Preferred Time</label>

                <select className="w-full border rounded-lg p-2 mt-1 text-sm">
                  <option>09:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 01:00 PM</option>
                  <option>02:00 PM - 04:00 PM</option>
                </select>
              </div>
            </div>

            {/* Info */}
            <div className="mt-4 bg-blue-50 text-blue-600 p-3 rounded-lg flex items-center gap-2 text-sm">
              <Info size={16} />
              Pick-up service is available for an additional $15 within 10
              miles.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex justify-between">
          <button className="px-6 py-2 bg-gray-100 rounded-lg text-gray-600">
            Back
          </button>

          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Continue to Summary
          </button>
        </div>
      </div>
    </div>
  );
}
