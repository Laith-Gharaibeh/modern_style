import { i18n } from "@/i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

function getLocale(request) {
  console.log(
    "getLocale request.nextUrl.pathname = ",
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

  return newPathname;
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(new URL(locale, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
