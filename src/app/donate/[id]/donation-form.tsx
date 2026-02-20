"use client";

import { useState } from "react";

interface DonationFormProps {
  slug: string;
  firstName: string;
  presetAmounts: readonly number[];
  minimumDonation: number;
  maximumDonation: number;
  serviceChargePercentage: number;
  savingsPercentage: number;
}

export default function DonationForm({
  slug,
  firstName,
  presetAmounts,
  minimumDonation,
  maximumDonation,
  serviceChargePercentage,
  savingsPercentage,
}: DonationFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const donationAmount = isCustom
    ? parseFloat(customAmount) || 0
    : selectedAmount ?? 0;

  const serviceCharge = donationAmount * (serviceChargePercentage / 100);
  const totalCharge = donationAmount + serviceCharge;
  const savingsAmount = donationAmount * (savingsPercentage / 100);

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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-warm/10">
      <h2 className="font-bold text-lg text-brand-dark mb-4">
        Choose an amount
      </h2>

      {/* Preset amounts */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => {
              setSelectedAmount(amount);
              setIsCustom(false);
              setCustomAmount("");
              setError("");
            }}
            className={`py-3 rounded-xl font-semibold text-lg transition-all ${
              !isCustom && selectedAmount === amount
                ? "bg-brand-warm text-white shadow-md shadow-brand-warm/20"
                : "bg-brand-cream text-brand-dark hover:bg-brand-warm/10"
            }`}
          >
            £{amount}
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="mb-6">
        <button
          onClick={() => {
            setIsCustom(true);
            setSelectedAmount(null);
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

      {/* Breakdown */}
      {donationAmount > 0 && (
        <div className="bg-brand-cream rounded-xl p-4 mb-6 text-sm">
          <div className="flex justify-between mb-2">
            <span className="text-brand-gray">
              Donation to {firstName}
            </span>
            <span className="font-semibold">
              £{donationAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-brand-gray">
              Platform fee ({serviceChargePercentage}%)
            </span>
            <span className="font-semibold">
              £{serviceCharge.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
            <span className="font-bold text-brand-dark">Total charge</span>
            <span className="font-bold text-brand-dark">
              £{totalCharge.toFixed(2)}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-2 text-xs text-brand-trust">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            £{savingsAmount.toFixed(2)} will be automatically saved towards
            housing
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-700 text-sm rounded-xl p-3 mb-4">
          {error}
        </div>
      )}

      {/* Donate button */}
      <button
        onClick={handleDonate}
        disabled={!isValid || isLoading}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
          isValid && !isLoading
            ? "bg-brand-warm text-white hover:bg-brand-warm-dark shadow-lg shadow-brand-warm/20 active:scale-[0.98]"
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
            Redirecting to payment...
          </span>
        ) : isValid ? (
          `Donate £${totalCharge.toFixed(2)}`
        ) : (
          "Choose an amount"
        )}
      </button>

      <p className="text-xs text-center text-brand-gray mt-3">
        Secure payment powered by Stripe. We never see your card details.
      </p>
    </div>
  );
}
