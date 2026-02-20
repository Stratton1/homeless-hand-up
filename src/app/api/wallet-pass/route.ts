export async function GET() {
  return Response.json(
    {
      status: "coming_soon",
      message:
        "Apple Wallet and Google Pay passes will be available in a future update.",
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
