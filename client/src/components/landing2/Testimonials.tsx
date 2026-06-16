import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Anish Sharma",
    role: "Software Engineer",
    quote:
      "My MacBook Pro had a liquid spill and the authorized center said it couldn't be fixed. Within hours the logic board in 2 days at a fraction of the cost.",
    rating: 5,
  },
  {
    name: "Maya Gurung",
    role: "Content Creator",
    quote:
      "Best iPhone screen repair in Kathmandu. They used a genuine display and it lasts like new. The 6-month warranty gave me confidence.",
    rating: 5,
  },
  {
    name: "Rajesh Thapa",
    role: "Photographer",
    quote:
      "Professional service and very transparent about the process. They explained exactly what was wrong with my iPad battery before fixing it.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Loved by Apple Users</h2>
        <p className="text-gray-500 mb-8">
          Real stories from our Kathmandu community
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-start text-left"
            >
              <div className="flex items-center mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 mr-1">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">{t.quote}</p>
              <p className="font-semibold">{t.name}</p>
              <p className="text-gray-500 text-sm">{t.role}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
