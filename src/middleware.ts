import createIntlMiddleware from 'next-intl/middleware';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const header = headers()
  let ip = header.get('x-real-ip') as string;

  const forwardedFor = header.get('x-forwarded-for') as string
  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(",").at(0) ?? "Unknown";
  }
  const lang = await getCountryByIp(ip);
  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createIntlMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'es', 'fr'],
    defaultLocale: getLangByCountryCode(lang),
    // Used when no locale matches
    localeDetection: false,
    localePrefix: 'always',
    pathnames: {
      // The key is the pathname for the given locale
      // The value is the pathname for the default locale
      en: '/en',
      es: '/es',
      fr: '/fr'
    }
  });
  const response = handleI18nRouting(request);

  return response;
}



export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en|fr)/:path*']
};

async function getCountryByIp(ip: string) {
  const response = await fetch(`http://ip-api.com/json/${ip}`);
  const data = await response.json();
  console.log('data', data);
  return data.countryCode?.toLowerCase() ?? 'en';
}

const countrySpanish = ['es', 'mx', 'ar', 'co', 'pe', 've', 'cl', 'ec', 'gt', 'cu', 'bo', 'do', 'hn', 'py', 'sv', 'ni', 'cr', 'uy', 'pa', 'pr'];
const countryFrench = ['fr', 'ca', 'be', 'ch', 'lu'];
function getLangByCountryCode(countryCode: string) {
  console.log('country code', countryCode);
  switch (countryCode) {
    case countrySpanish.includes(countryCode) ? countryCode : '':
      return 'es';
    case countryFrench.includes(countryCode) ? countryCode : '':
      return 'fr';
    default:
      return 'en';
  }
}