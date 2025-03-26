'use client';

type AdSize = {
  [key: string]: {
    width: string;
    height: string;
    label: string;
  };
};

type AdPlaceholderProps = {
  type: 'banner' | 'inline' | 'large-banner' | 'square';
};

const AD_SIZES: AdSize = {
  'banner': {
    width: '728px',
    height: '90px',
    label: 'Banner Ad (728x90)'
  },
  'inline': {
    width: '300px',
    height: '250px',
    label: 'Inline Rectangle (300x250)'
  },
  'large-banner': {
    width: '970px',
    height: '250px',
    label: 'Large Banner (970x250)'
  },
  'square': {
    width: '336px',
    height: '280px',
    label: 'Large Rectangle (336x280)'
  }
};

export default function AdPlaceholder({ type }: AdPlaceholderProps) {
  const adSize = AD_SIZES[type] || AD_SIZES['banner'];
  
  return (
    <div className="ad-placeholder w-full flex justify-center items-center my-4">
      <div 
        className="bg-gray-100 border border-dashed border-gray-300 flex justify-center items-center text-gray-400 text-sm"
        style={{ 
          width: '100%', 
          maxWidth: adSize.width, 
          height: adSize.height,
          minHeight: '60px'
        }}
      >
        <p>{adSize.label}</p>
        {/* Ad code would go here in production */}
        {/* 
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true">
        </ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        */}
      </div>
    </div>
  );
} 