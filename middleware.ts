import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// The country to block from accessing crowdsales
const BLOCKED_COUNTRIES = ["US", "RU", "CU", "IR", "SY", "SD", "KP"];
const ALLOWED_CHAINS = [5, 11155111, 31337];

export const config = {
  matcher: ["/ipnft/:nftid/crowdsale/:anything*"],
};

export function middleware(request: NextRequest) {
  if (
    ALLOWED_CHAINS.includes(Number(process.env.NEXT_PUBLIC_CHAIN_ID as string))
  ) {
    return NextResponse.next();
  }

  // Extract country. Default to US if not found.
  const country = (request.geo && request.geo.country) || "US";

  console.log(`Visitor from ${country}`);

  if (BLOCKED_COUNTRIES.includes(country)) {
    request.nextUrl.pathname = "/blocked";
    return NextResponse.rewrite(request.nextUrl);
  } else {
    return NextResponse.next();
  }
}
