import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
const RESTRICTED_COUNTRIES = ["PH", "US"];
export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const res = NextResponse.next();
  const country = request.cookies.get("country")?.value ?? "";
  //get the ip address depending on your hosting provider.
  const ip = request.ip;
  if (!country) {
    try {
      const response = await fetch(`https://ipapi.co/${ip}/country/`);
      const country = await response.text();
      if (country) {
        res.cookies.set("country", country);
      }
    } catch (error) {}
  }

  if (RESTRICTED_COUNTRIES.includes(country)) {
    return NextResponse.rewrite(new URL("/restricted", request.url));
  }
  return res;
}
