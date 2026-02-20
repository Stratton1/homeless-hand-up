"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPence, type CommunityMember } from "@/lib/users";

interface LocalFinderProps {
  locations: string[];
  members: CommunityMember[];
}

export default function LocalFinder({ locations, members }: LocalFinderProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredMembers = selectedCity
    ? members.filter((member) => member.location === selectedCity)
    : [];

  return (
    <div className="space-y-12">
      {/* City Filter Buttons */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-brand-dark">Select Your City</h2>
        <div className="flex flex-wrap gap-3">
          {locations.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city === selectedCity ? null : city)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedCity === city
                  ? "bg-brand-warm text-white shadow-lg"
                  : "bg-white text-brand-dark border-2 border-brand-warm/20 hover:border-brand-warm/40"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gray-200 rounded-2xl h-64 w-full flex items-center justify-center border-4 border-gray-300">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-600 mb-2">🗺️</p>
          <p className="text-gray-600 font-medium">Map coming soon</p>
        </div>
      </div>

      {/* Community Members Grid */}
      {selectedCity && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-brand-dark">
            Community Members in {selectedCity}
          </h2>

          {filteredMembers.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border-2 border-brand-warm/20">
              <p className="text-brand-gray">
                No community members currently in {selectedCity}.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member: CommunityMember) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-brand-warm/10"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-brand-warm to-brand-warm-dark p-6 text-white">
                    <h3 className="text-2xl font-bold">{member.firstName}</h3>
                    <p className="text-sm opacity-90">
                      {member.area}, {member.location}
                    </p>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    {/* Bio */}
                    <p className="text-brand-gray text-sm leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Balance & Savings */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-brand-cream rounded-lg p-3 border border-brand-warm/10">
                        <p className="text-xs text-brand-gray font-medium mb-1">
                          Current Balance
                        </p>
                        <p className="text-xl font-bold text-brand-warm">
                          {formatPence(member.balancePence)}
                        </p>
                      </div>
                      <div className="bg-brand-cream rounded-lg p-3 border border-brand-warm/10">
                        <p className="text-xs text-brand-gray font-medium mb-1">
                          Savings
                        </p>
                        <p className="text-xl font-bold text-brand-trust">
                          {formatPence(member.savingsPence)}
                        </p>
                      </div>
                    </div>

                    {/* Savings Goal Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-brand-gray">
                          Housing Goal
                        </p>
                        <p className="text-xs font-bold text-brand-warm">
                          {Math.round(
                            (member.savingsPence / member.savingsGoalPence) * 100
                          )}%
                        </p>
                      </div>
                      <div className="w-full bg-brand-cream rounded-full h-2 overflow-hidden border border-brand-warm/10">
                        <div
                          className="h-full bg-gradient-to-r from-brand-warm to-brand-warm-dark transition-all"
                          style={{
                            width: `${Math.min(
                              (member.savingsPence / member.savingsGoalPence) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-brand-gray mt-2">
                        {member.savingsGoalDescription}
                      </p>
                    </div>

                    {/* Support Worker */}
                    {member.supportWorker && (
                      <div className="bg-brand-trust/5 rounded-lg p-3 border border-brand-trust/20">
                        <p className="text-xs text-brand-gray font-medium mb-1">
                          Support Worker
                        </p>
                        <p className="text-sm font-semibold text-brand-dark">
                          {member.supportWorker}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-brand-warm/10">
                      <Link
                        href={`/profile/${member.slug}`}
                        className="bg-brand-trust/10 text-brand-trust font-medium py-2 rounded-lg text-center text-sm hover:bg-brand-trust/20 transition-colors"
                      >
                        View Profile
                      </Link>
                      <Link
                        href={`/donate/${member.slug}`}
                        className="bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white font-medium py-2 rounded-lg text-center text-sm hover:shadow-lg transition-all"
                      >
                        Donate
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
