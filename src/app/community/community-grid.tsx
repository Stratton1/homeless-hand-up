"use client";

import { useState } from "react";
import Link from "next/link";
import { CommunityMember, formatPence } from "@/lib/users";

interface CommunityGridProps {
  users: CommunityMember[];
  locations: string[];
}

export default function CommunityGrid({ users, locations }: CommunityGridProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const filteredUsers = selectedLocation
    ? users.filter((u) => u.location === selectedLocation)
    : users;

  const savingsPercentage = (user: CommunityMember) => {
    if (user.savingsGoalPence === 0) return 0;
    return Math.round((user.savingsPence / user.savingsGoalPence) * 100);
  };

  return (
    <div>
      {/* Location Filter Buttons */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <button
            onClick={() => setSelectedLocation(null)}
            className={`px-6 py-2.5 rounded-full font-medium transition-all ${
              selectedLocation === null
                ? "bg-brand-warm text-white shadow-lg shadow-brand-warm/30"
                : "bg-white text-brand-dark border border-brand-warm/20 hover:border-brand-warm hover:bg-brand-warm/5"
            }`}
          >
            All Members
          </button>
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => setSelectedLocation(location)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                selectedLocation === location
                  ? "bg-brand-warm text-white shadow-lg shadow-brand-warm/30"
                  : "bg-white text-brand-dark border border-brand-warm/20 hover:border-brand-warm hover:bg-brand-warm/5"
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* Results Counter */}
      <div className="mb-8">
        <p className="text-sm text-brand-gray">
          Showing <span className="font-bold text-brand-dark">{filteredUsers.length}</span> member
          {filteredUsers.length !== 1 ? "s" : ""} {selectedLocation && `in ${selectedLocation}`}
        </p>
      </div>

      {/* Member Cards Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl overflow-hidden border border-brand-warm/10 hover:shadow-xl hover:shadow-brand-warm/15 transition-all hover:-translate-y-1 group flex flex-col"
            >
              {/* Coloured header bar */}
              <div className="h-24 bg-gradient-to-br from-brand-trust to-brand-trust-light relative overflow-hidden">
                {/* Decorative pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 100">
                  <circle cx="50" cy="20" r="30" fill="white" />
                  <circle cx="350" cy="60" r="40" fill="white" />
                  <circle cx="200" cy="80" r="20" fill="white" />
                </svg>

                {/* Avatar initial */}
                <div className="absolute -bottom-8 left-6">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-white flex items-center justify-center shadow-md">
                    <span className="text-2xl font-bold text-brand-trust">
                      {user.firstName.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-12 pb-6 px-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-brand-dark mb-1">{user.firstName}</h3>
                <p className="text-sm text-brand-gray mb-1">{user.age} years old</p>

                <p className="text-sm text-brand-gray flex items-center gap-1 mb-4">
                  <svg
                    className="w-3.5 h-3.5 text-brand-warm"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {user.location}
                </p>

                <p className="text-brand-gray text-sm leading-relaxed mb-5 line-clamp-2">
                  {user.bio}
                </p>

                {/* Matched Funding Badge */}
                {user.matchedFundingPartner && (
                  <div className="mb-4 inline-block bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    <p className="text-xs font-semibold text-amber-900">
                      ✨ Matched by {user.matchedFundingPartner}
                    </p>
                  </div>
                )}

                {/* Savings Progress */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
                      Housing Savings Goal
                    </p>
                    <p className="text-xs font-bold text-brand-warm">
                      {savingsPercentage(user)}%
                    </p>
                  </div>
                  <div className="w-full bg-brand-gray/20 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-brand-warm to-brand-warm-dark h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(savingsPercentage(user), 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-brand-gray mt-2">
                    {formatPence(user.savingsPence)} of {formatPence(user.savingsGoalPence)}
                  </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-brand-cream rounded-lg px-3 py-2 text-center">
                    <div className="text-sm font-bold text-brand-dark">
                      {formatPence(user.balancePence)}
                    </div>
                    <div className="text-[10px] text-brand-gray uppercase tracking-wide">
                      Donated
                    </div>
                  </div>
                  <div className="bg-brand-trust/5 rounded-lg px-3 py-2 text-center">
                    <div className="text-sm font-bold text-brand-trust">
                      {formatPence(user.savingsPence)}
                    </div>
                    <div className="text-[10px] text-brand-gray uppercase tracking-wide">
                      Saved
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                  <Link
                    href={`/donate/${user.slug}`}
                    className="flex-1 bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white py-3 rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-brand-warm/20 transition-all text-sm group-hover:shadow-xl"
                  >
                    Support {user.firstName}
                  </Link>
                  <Link
                    href={`/profile/${user.slug}`}
                    className="px-4 py-3 rounded-xl border border-brand-warm/20 text-brand-warm hover:bg-brand-warm/5 transition-colors flex items-center justify-center"
                    title="View profile & QR code"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-brand-gray text-lg mb-4">
            No members found in {selectedLocation}.
          </p>
          <button
            onClick={() => setSelectedLocation(null)}
            className="text-brand-warm font-semibold hover:text-brand-warm-dark transition-colors"
          >
            View all members
          </button>
        </div>
      )}
    </div>
  );
}
