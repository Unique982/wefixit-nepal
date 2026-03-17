"use client";

import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "My MacBook Pro had a liquid spill and the authorized center said it couldn't be fixed. WEfixit repaired the logic board in 2 days at a fraction of the cost!",
    name: "Anish Sharma",
    role: "Software Engineer",
    location: "Kathmandu, Nepal",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHzxwK-qjpwSArGcNh3i0Qv_u_ggVTocOioah-9u3gNxDdyc_3QAVml1Js_ojWElV6e6zq7h00kVUk9piZRf1fZ1yyYPaVoIzBF9-Pm-QAJw_BC5wWNJ75vrDHvF69WC0rtsg_NXRJLjFvb94lzyxxXvLwPJV3VbkpAEsCR4IekRnhOqQA816qdn73KTj3N2FAdrxtrxIRPq_X1UnMX9N8cDtHSp-V4H1fdVNEDNbTx5VoMmb7dC66oHO3uN6VHG7xo-GRgcad2scy",
    rating: 5,
  },
  {
    quote:
      "Best iPhone screen repair in Kathmandu. They used a genuine display and it feels like new. The 6-month warranty gave me confidence.",
    name: "Maya Gurung",
    role: "Content Creator",
    location: "Kathmandu, Nepal",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBs9hDJajBrN0EVD05zVNJ07lzp_bhrzqRnA26eka_RU5yInn476E9ScDQ5goHMFN1PYza4P1F_yvu7q9_pJsflPozesfHe4zB0Bl7whOvPi94yiOmXzz7iode0lYy9h4CFyLzNXpenR56_d9KtPNrnWl2gFNXanzueEzgnbmnlUyDOX-xj1OSld2jiyuG-XO3VVWd5Vh1V9hUmCurf1i3AS9uovIpOBr1klUhASIdFUEOMd4-01NaOXMhNRB3EX565kkqs6xm2Es6s",
    rating: 5,
  },
  {
    quote:
      "Specialized micro-repair on MacBooks. They explained exactly what was wrong with my iPad battery before fixing it. Excellent service!",
    name: "Rajesh Thapa",
    role: "Photographer",
    location: "Kathmandu, Nepal",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuABuNtCj73BQL11iLwRSozvq2VkwVP2FuMqLfaDQgH3_jEy3eiR6RB44MIz6oylc96htFG1W9fECN7GD6ft7q7lD1YEFYxpbuClG-zHZJzb2bkTP8uZIHYHKSaoeduuFgxSLyKCf6BTPANHcknhpLF4nTP5q8ZDneTcSJIXyWq5okRWUqYAhulTc_1f0JUdpCAZ8GSaKDjNknwSH2je7oTH0ZbA89L3uetYgldbONSKShB0NVhdE73njQ6XLQKqbN1rXzADgbm5RR3k",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 bg-white text-slate-900" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 font-semibold mb-3 block">
            ✦ Customer Stories ✦
          </span>
          <h2 className="font-bold text-3xl md:text-5xl mb-4">
            Trusted by Apple Users
          </h2>

          <p className="text-gray-600 max-w-lg mx-auto">
            See how Kathmandu customers trust us for MacBook, iPhone, and iPad
            repairs with genuine parts, quick service, and warranties.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-7 bg-white border border-slate-100 flex flex-col shadow-md"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed flex-1 mb-6 italic text-gray-700">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                  <p className="text-[10px] text-gray-500">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
