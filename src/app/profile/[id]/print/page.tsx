import { getUserBySlug } from "@/lib/users";
import { APP_CONFIG } from "@/lib/config";
import QRCodeDisplay from "../qr-code-display";
import type { CommunityMember } from "@/lib/users";

interface PrintPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PrintPage({ params }: PrintPageProps) {
  const { id } = await params;
  const user = await getUserBySlug(id);

  if (!user) {
    return (
      <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">User Not Found</h1>
          <p className="text-gray-600">
            Could not find a community member with the ID: {id}
          </p>
        </div>
      );
  }

  const donateUrl = `${APP_CONFIG.appUrl}/donate/${user.slug}`;

  return (
    <>
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-brand-cream p-4 no-print">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-brand-dark mb-2">
            Print QR Badge
          </h1>
          <p className="text-brand-gray mb-4">
            Print this badge and display it for contactless donations. The QR
            code links directly to {user.firstName}'s donation page.
          </p>
          <button
            onClick={() => window.print()}
            className="bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all"
          >
            🖨️ Print Badge
          </button>
        </div>
      </div>

      {/* Badge Card - A6 Size (105x148mm) */}
      <div className="flex items-center justify-center min-h-screen bg-white no-print">
        <div className="w-full h-full max-w-[210mm] max-h-[297mm] p-8 bg-white">
          <BadgeContent user={user} donateUrl={donateUrl} />
        </div>
      </div>

      {/* Actual Print Content */}
      <div className="hidden no-print" style={{ display: "none" }}>
        <BadgeContent user={user} donateUrl={donateUrl} />
      </div>
    </>
  );
}

interface BadgeContentProps {
  user: CommunityMember;
  donateUrl: string;
}

function BadgeContent({ user, donateUrl }: BadgeContentProps) {
  return (
    <div
      style={{
        width: "105mm",
        height: "148mm",
        padding: "12mm",
        background: "white",
        border: "2px solid #F5DEB3",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12mm",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
      className="bg-white"
    >
      {/* Branding */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#1A1A2E",
            marginBottom: "4px",
          }}
        >
          Homeless Hand Up
        </div>
        <div
          style={{
            fontSize: "10px",
            color: "#8B7B6B",
            fontStyle: "italic",
          }}
        >
          Bottom up charity
        </div>
      </div>

      {/* Member Name */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#D4644F",
            marginBottom: "4px",
          }}
        >
          {user.firstName}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "#666666",
          }}
        >
          {user.location}, {user.area}
        </div>
      </div>

      {/* QR Code */}
      <div
        style={{
          padding: "8px",
          background: "#F5F5F5",
          borderRadius: "4px",
        }}
      >
        <QRCodeDisplay url={donateUrl} />
      </div>

      {/* Call to Action */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            color: "#1A1A2E",
            marginBottom: "4px",
          }}
        >
          Scan to Donate
        </div>
        <div
          style={{
            fontSize: "9px",
            color: "#8B7B6B",
            lineHeight: "1.3",
          }}
        >
          Help {user.firstName} get back on their feet
        </div>
      </div>

      {/* URL (small) */}
      <div
        style={{
          fontSize: "8px",
          color: "#999999",
          textAlign: "center",
          wordBreak: "break-all",
        }}
      >
        {donateUrl}
      </div>
    </div>
  );
}
