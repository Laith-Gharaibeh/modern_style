// ===================================================================================
// ----- this code before adding the CORS code
// import { i18n } from "@/i18n.config";
// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";
// import { NextResponse } from "next/server";

// function getLocale(request) {
//   console.log(
//     "getLocale() request.nextUrl.pathname = ",
//     request.nextUrl.pathname
//   );
//   const negotiatorHeaders = {};
//   request?.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
//   const locales = i18n.locales;
//   const languages = new Negotiator({
//     headers: negotiatorHeaders,
//   }).languages();

//   const locale = matchLocale(languages, locales, i18n.defaultLocale);

//   const pathname = request.nextUrl.pathname;
//   const oldLang = pathname.split("/")[1];
//   const newPathname = pathname.replace(`/${oldLang}`, `/${locale}`);
//   // console.log("getLocal() newPathname = ", newPathname);
//   return newPathname;
// }

// export function middleware(request) {
//   console.log("middleware");

//   const pathname = request.nextUrl.pathname;

//   const pathnameIsMissingLocale = i18n.locales.every(
//     (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//   );

//   // redirect if there is no locale
//   if (pathnameIsMissingLocale) {
//     const locale = getLocale(request);
//     // console.log("middleware() locale = ", locale);
//     const newURL = new URL(locale, request.url);
//     // console.log("middleware() newURL = ", newURL);
//     return NextResponse.redirect(newURL);
//     // return NextResponse.redirect(new URL(locale, request.url));
//   }

//   console.log("After redirect if there is no locale");
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// ===================================================================================
// import { i18n } from "@/i18n.config";
// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";
// import { NextResponse } from "next/server";

// function getLocale(request) {
//   console.log(
//     "getLocale() request.nextUrl.pathname = ",
//     request.nextUrl.pathname
//   );
//   const negotiatorHeaders = {};
//   request?.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
//   const locales = i18n.locales;
//   const languages = new Negotiator({
//     headers: negotiatorHeaders,
//   }).languages();

//   const locale = matchLocale(languages, locales, i18n.defaultLocale);

//   const pathname = request.nextUrl.pathname;
//   const oldLang = pathname.split("/")[1];
//   const newPathname = pathname.replace(`/${oldLang}`, `/${locale}`);
//   // console.log("getLocal() newPathname = ", newPathname);
//   return newPathname;
// }

// export function middleware(request) {
//   console.log("middleware");

//   const pathname = request.nextUrl.pathname;

//   const pathnameIsMissingLocale = i18n.locales.every(
//     (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//   );

//   // redirect if there is no locale
//   if (pathnameIsMissingLocale) {
//     const locale = getLocale(request);
//     // console.log("middleware() locale = ", locale);
//     const newURL = new URL(locale, request.url);
//     // console.log("middleware() newURL = ", newURL);
//     return NextResponse.redirect(newURL);
//     // return NextResponse.redirect(new URL(locale, request.url));
//   }

//   console.log("After redirect if there is no locale");

//   // Add CORS headers
//   const response = NextResponse.next();
//   response.headers.set("Access-Control-Allow-Origin", "*");
//   response.headers.set(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   response.headers.set(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Accept, Accept-Language, Accept-Encoding"
//   );
//   return response;
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers":
//       "Content-Type, Accept, Accept-Language, Accept-Encoding",
//   },
// };
// ===================================================================================
import { i18n } from "@/i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function getLocale(request) {
  console.log(
    "getLocale() request.nextUrl.pathname = ",
    request.nextUrl.pathname
  );
  const negotiatorHeaders = {};
  request?.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const locales = i18n.locales;
  const languages = new Negotiator({
    headers: negotiatorHeaders,
  }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  const pathname = request.nextUrl.pathname;
  const oldLang = pathname.split("/")[1];
  const newPathname = pathname.replace(`/${oldLang}`, `/${locale}`);
  // console.log("getLocal() newPathname = ", newPathname);
  return newPathname;
}

export function middleware(request) {
  console.log("[middleware.js] middleware");

  const pathname = request.nextUrl.pathname;
  console.log("[middleware.js] pathname = ", pathname);

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    // console.log("middleware() locale = ", locale);
    const newURL = new URL(locale, request.url);
    // console.log("middleware() newURL = ", newURL);
    return NextResponse.redirect(newURL);
    // return NextResponse.redirect(new URL(locale, request.url));
  }

  console.log("After redirect if there is no locale");

  // const response = NextResponse.next();

  // return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
