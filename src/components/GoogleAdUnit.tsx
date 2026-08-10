'use client';

import React, { useEffect, useRef } from 'react';

interface GoogleAdUnitProps {
  slot?: string;
  client?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function GoogleAdUnit({
  slot = '1234567890',
  client,
  format = 'auto',
  responsive = true,
  className = '',
  style = { display: 'block' }
}: GoogleAdUnitProps) {
  const adClientId = client || process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || 'ca-pub-1234567890123456';
  const isPushed = useRef(false);

  useEffect(() => {
    try {
      if (!isPushed.current && typeof window !== 'undefined') {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        isPushed.current = true;
      }
    } catch (e) {
      console.error('Google Adsense unit error:', e);
    }
  }, []);

  return (
    <div className={`my-8 text-center overflow-hidden border border-slate-200/60 rounded-xl bg-slate-50/50 p-3 relative ${className}`}>
      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1.5 block">
        Publicidade • Google Ads
      </div>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={adClientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
