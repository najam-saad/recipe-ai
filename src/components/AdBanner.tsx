'use client';

import React, { useEffect, useRef } from 'react';

// Add type definitions for AdSense
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

type AdBannerProps = {
  adClient: string;
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
};

const AdBanner: React.FC<AdBannerProps> = ({
  adClient,
  adSlot,
  adFormat = 'auto',
  style = {},
  className = '',
  responsive = true,
}) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    // Only load ads once
    if (isLoaded.current) return;
    isLoaded.current = true;

    // Wait for AdSense to be available
    if (window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    } else {
      // If AdSense isn't loaded yet, wait and retry
      const timer = setInterval(() => {
        if (window.adsbygoogle) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            clearInterval(timer);
          } catch (error) {
            console.error('AdSense error:', error);
            clearInterval(timer);
          }
        }
      }, 500);

      // Clear timer if component unmounts
      return () => clearInterval(timer);
    }
  }, []);

  return (
    <div ref={adContainerRef} className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        {...(responsive ? { 'data-full-width-responsive': 'true' } : {})}
      />
      <div className="text-xs text-gray-400 text-center mt-1">Advertisement</div>
    </div>
  );
};

// Special horizontal ad banner for top/bottom of pages
export const HorizontalAdBanner: React.FC = () => (
  <div className="w-full py-4 bg-gray-50">
    <div className="max-w-screen-xl mx-auto">
      <AdBanner
        adClient="ca-pub-9262259592522097"
        adSlot="1234567890"
        adFormat="horizontal"
        className="flex justify-center"
        style={{ minHeight: '90px' }}
      />
    </div>
  </div>
);

// Sidebar ad for larger screens
export const SidebarAdBanner: React.FC = () => (
  <div className="hidden lg:block w-full">
    <AdBanner
      adClient="ca-pub-9262259592522097"
      adSlot="0987654321"
      adFormat="vertical"
      style={{ minHeight: '600px' }}
    />
  </div>
);

// In-content ad for article pages
export const InContentAdBanner: React.FC = () => (
  <div className="my-8 py-4 border-t border-b border-gray-100">
    <AdBanner
      adClient="ca-pub-9262259592522097"
      adSlot="5555555555"
      style={{ minHeight: '250px' }}
    />
  </div>
);

// In-feed ad for listing pages (between recipe cards)
export const InFeedAdBanner: React.FC = () => (
  <div className="card h-full transform transition-transform hover:scale-[1.02] shadow-sm border border-gray-100 bg-gray-50 flex flex-col justify-center items-center">
    <div className="h-full w-full p-4">
      <AdBanner
        adClient="ca-pub-9262259592522097"
        adSlot="6666666666"
        adFormat="fluid"
        style={{ 
          minHeight: '300px',
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  </div>
);

// Video Ad Component
export const VideoAdBanner: React.FC = () => {
  const videoAdRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Video ads typically need custom initialization
    // This is a simplified example - follow Google's specific instructions for video ads
    if (window.adsbygoogle && videoAdRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({
          params: {
            google_ad_client: "ca-pub-9262259592522097",
            enable_page_level_ads: true,
            overlays: {
              bottom: true
            }
          }
        });
      } catch (error) {
        console.error('Video AdSense error:', error);
      }
    }
  }, []);
  
  return (
    <div className="w-full my-6 rounded-lg overflow-hidden shadow-md">
      <div 
        ref={videoAdRef}
        className="relative w-full" 
        style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}
      >
        {/* Video player container - AdSense will inject the ad here */}
        <div 
          className="absolute inset-0 bg-gray-100 flex items-center justify-center"
          data-ad-client="ca-pub-9262259592522097"
          data-ad-slot="VIDEO_SLOT_ID"
          data-ad-format="video"
        >
          <div className="text-gray-400">Video advertisement loading...</div>
        </div>
      </div>
      <div className="text-xs text-gray-400 text-center mt-1">Video Advertisement</div>
    </div>
  );
};

export default AdBanner; 