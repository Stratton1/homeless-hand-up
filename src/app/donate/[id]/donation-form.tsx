"use client";

import { useState } from "react";

interface WishlistItem {
  id: string;
  label: string;
  emoji: string;
  amountPence: number;
  description: string;
}

interface DonationFormProps {
  slug: string;
  firstName: string;
  presetAmounts: readonly number[];
  minimumDonation: number;
  maximumDonation: number;
  serviceChargePercentage: number;
  savingsPercentage: number;
  wishlistItems?: WishlistItem[];
  matchedFundingPartner?: string;
  matchedFundingMultiplier?: number;
}

type Frequency = "one-time" | "monthly";

export default function DonationForm({
  slug,
  firstName,
  presetAmounts,
  minimumDonation,
  maximumDonation,
  serviceChargePercentage,
  savingsPercentage,
  wishlistItems = [],
  matchedFundingPartner,
  matchedFundingMultiplier = 1,
}: DonationFormProps) {
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [selectedWishlistId, setSelectedWishlistId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [companyName, setCompanyName] = useState("No");
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate donation amount from selection
  const donationAmount = selectedWishlistId
    ? (wishlistItems.find((w) => w.id === selectedWishlistId)?.amountPence ?? 0) / 100
    : isCustom
      ? parseFloat(customAmount) || 0
      : selectedAmount ?? 0;

  // Calculate charges and breakdown
  const serviceCharge = donationAmount * (serviceChargePercentage / 100);
  const totalCharge = donationAmount + serviceCharge;
  const operationalContribution = donationAmount * (serviceChargePercentage / 100);
  const housingContribution = donationAmount * (savingsPercentage / 100);
  const amountToRecipient = donationAmount - housingContribution;

  const isValid =
    donationAmount >= minimumDonation && donationAmount <= maximumDonation;

  async function handleDonate() {
    if (!isValid || isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          amountPounds: donationAmount,
          frequency,
          wishlistItemId: selectedWishlistId || undefined,
          message: message || undefined,
          companyName: companyName !== "No" ? companyName : undefined,
          notifyEmail: notifyEmail ? true : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-warm/10 space-y-6">
      {/* Frequency toggle */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-brand-dark">Donation type</h3>
        <div className="flex gap-3">
          <button
            onClick={() => setFrequency("one-time")}
            className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
              frequency === "one-time"
                ? "bg-brand-warm text-white shadow-md shadow-brand-warm/20"
                : "bg-brand-cream text-brand-dark hover:bg-brand-warm/10"
            }`}
          >
            One-Time
          </button>
          <button
            onClick={() => setFrequency("monthly")}
            className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
              frequency === "monthly"
                ? "bg-brand-warm text-white shadow-md shadow-brand-warm/20"
                : "bg-brand-cream text-brand-dark hover:bg-brand-warm/10"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Wishlist grid */}
      {wishlistItems.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-brand-dark">Or pick from a wishlist</h3>
          <div className="grid grid-cols-2 gap-3">
            {wishlistItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedWishlistId(item.id);
                  setIsCustom(false);
                  setSelectedAmount(null);
                  setCustomAmount("");
                  setError("");
                }}
                className={`p-3 rounded-xl text-left transition-all border-2 ${
                  selectedWishlistId === item.id
                    ? "border-brand-warm bg-brand-warm/5 shadow-md shadow-brand-warm/20"
                    : "border-brand-warm/10 bg-brand-cream hover:border-brand-warm/30"
                }`}
              >
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-xs font-semibold text-brand-dark">{item.label}</div>
                <div className="text-xs text-brand-gray">{item.description}</div>
                <div className="text-xs font-bold text-brand-warm mt-1">
                  £{(item.amountPence / 100).toFixed(2)}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preset amounts */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-brand-dark">
          {wishlistItems.length > 0 ? "Or choose an amount" : "Choose an amount"}
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount);
                setIsCustom(false);
                setCustomAmount("");
                setSelectedWishlistId(null);
                setError("");
              }}
              className={`py-3 rounded-xl font-semibold text-lg transition-all ${
                !isCustom && !selectedWishlistId && selectedAmount === amount
                  ? "bg-brand-warm text-white shadow-md shadow-brand-warm/20"
                  : "bg-brand-cream text-brand-dark hover:bg-brand-warm/10"
              }`}
            >
              £{amount}
            </button>
          ))}
        </div>
      </div>

      {/* Custom amount */}
      <div>
        <button
          onClick={() => {
            setIsCustom(true);
            setSelectedAmount(null);
            setSelectedWishlistId(null);
            setError("");
          }}
          className={`w-full text-left text-sm font-medium mb-2 transition-colors ${
            isCustom ? "text-brand-warm" : "text-brand-gray hover:text-brand-warm"
          }`}
        >
          Or enter a custom amount
        </button>
        {isCustom && (
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray font-semibold">
              £
            </span>
            <input
              type="number"
              min={minimumDonation}
              max={maximumDonation}
              step="0.50"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setError("");
              }}
              placeholder={`${minimumDonation}–${maximumDonation}`}
              className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-brand-warm/30 focus:border-brand-warm"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Message of support */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-brand-dark flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          Message of support (optional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, 280))}
          placeholder={`Tell ${firstName} you're rooting for them (max 280 characters)`}
          maxLength={280}
          className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-warm/30 focus:border-brand-warm resize-none"
          rows={3}
        />
        <div className="text-xs text-brand-gray text-right">
          {message.length} / 280
        </div>
      </div>

      {/* Company attribution */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-brand-dark flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.5m0 0H9m0 0h-.5M9 7h.5M9 11h.5" />
          </svg>
          Is your company matching this?
        </label>
        <select
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-warm/30 focus:border-brand-warm"
        >
          <option value="No">No</option>
          <option value="Deloitte">Deloitte</option>
          <option value="PwC">PwC</option>
          <option value="BBC Media City">BBC Media City</option>
          <option value="NatWest Group">NatWest Group</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Gift Aid policy note */}
      <div className="flex items-start gap-3 p-3 bg-brand-trust/5 rounded-xl border border-brand-trust/10">
        <svg className="w-4 h-4 text-brand-trust mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 6a9 9 0 100 18 9 9 0 000-18z" />
        </svg>
        <div>
          <div className="text-sm font-medium text-brand-dark">
            Gift Aid temporarily unavailable
          </div>
          <div className="text-xs text-brand-gray">
            Gift Aid will be enabled after HMRC and legal registration is complete.
          </div>
        </div>
      </div>

      {/* Breakdown display */}
      {donationAmount > 0 && (
        <div className="bg-gradient-to-br from-brand-warm/5 to-brand-trust/5 rounded-xl p-4 space-y-3 border border-brand-warm/10">
          <div className="text-sm font-semibold text-brand-dark mb-3">
            Your donation breakdown
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-gray">
                Base donation
              </span>
              <span className="font-semibold text-brand-dark">
                £{donationAmount.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-brand-warm/20 pt-2 mt-2 flex justify-between">
              <span className="font-medium text-brand-dark">
                To {firstName}
              </span>
              <span className="font-bold text-brand-warm">
                £{amountToRecipient.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-gray text-xs">
                Housing savings (10%)
              </span>
              <span className="text-xs font-semibold text-brand-trust">
                £{housingContribution.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-gray text-xs">
                Platform contribution (15%)
              </span>
              <span className="text-xs font-semibold text-brand-gray">
                £{operationalContribution.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="border-t border-brand-warm/20 pt-3 flex justify-between">
            <span className="font-bold text-brand-dark">Total you pay</span>
            <span className="font-bold text-lg text-brand-warm">
              £{totalCharge.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Milestone notification opt-in */}
      <label className="flex items-start gap-3 p-3 bg-brand-cream rounded-xl cursor-pointer hover:bg-brand-cream/80 transition-colors">
        <input
          type="checkbox"
          checked={notifyEmail}
          onChange={(e) => setNotifyEmail(e.target.checked)}
          className="mt-1 w-4 h-4 accent-brand-warm rounded"
        />
        <div>
          <div className="text-sm font-medium text-brand-dark">
            Email me updates
          </div>
          <div className="text-xs text-brand-gray">
            Get updates about {firstName}'s progress towards their goals
          </div>
          <div className="text-[11px] text-brand-gray mt-1">
            We currently store preferences only. Outbound email sends are coming soon.
          </div>
        </div>
      </label>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-700 text-sm rounded-xl p-3 border border-red-200">
          {error}
        </div>
      )}

      {/* Donate button */}
      <button
        onClick={handleDonate}
        disabled={!isValid || isLoading}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
          isValid && !isLoading
            ? "bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white hover:shadow-lg hover:shadow-brand-warm/30 active:scale-[0.98] shadow-md shadow-brand-warm/20"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {frequency === "monthly" ? "Setting up subscription..." : "Redirecting to payment..."}
          </span>
        ) : isValid ? (
          `${frequency === "monthly" ? "Set up monthly" : "Donate"} £${totalCharge.toFixed(2)}`
        ) : (
          "Choose an amount"
        )}
      </button>

      <p className="text-xs text-center text-brand-gray">
        Secure payment powered by Stripe. We never see your card details.
      </p>
    </div>
  );
}
