'use client';

import Script from 'next/script';

interface GoogleAdScriptProps {
  client?: string;
}

export default function GoogleAdScript({ client }: GoogleAdScriptProps) {
  const adClientId = client || process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  if (!adClientId) {
    return null;
  }

  return (
    <Script
      id="google-adsense-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
