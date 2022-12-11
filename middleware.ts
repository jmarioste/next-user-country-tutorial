import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
const RESTRICTED_COUNTRIES = ["PH", "US"];
export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const res = NextResponse.next();
  const loc = request.cookies.get("country");
  //get the ip address depending on your hosting provider.
  const ip = request.ip;
  let country = "";
  if (!loc) {
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
