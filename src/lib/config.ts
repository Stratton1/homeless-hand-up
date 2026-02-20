/**
 * App-wide configuration.
 * Service charge and savings percentages are defined here so they can
 * be changed in one place when needed.
 */

export const APP_CONFIG = {
  /** Display name shown across the site */
  appName: "Homeless Hand Up",

  /** Public URL — set via env for production, fallback for dev */
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

  /** Percentage of each donation automatically saved for housing (0–100) */
  savingsPercentage: 10,

  /** Platform service charge added on top of the donation (0–100) */
  serviceChargePercentage: 15,

  /** Currency code used for all Stripe transactions */
  currency: "gbp",

  /** Preset donation amounts shown on the donation page (in pounds) */
  presetAmounts: [2, 5, 10, 20],

  /** Minimum donation amount in pounds */
  minimumDonation: 1,

  /** Maximum donation amount in pounds */
  maximumDonation: 200,
} as const;
