"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  adSlot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  responsive?: boolean;
  className?: string;
}

export function AdBanner({
  adSlot,
  format = "auto",
  responsive = true,
  className = "",
}: AdBannerProps) {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && adContainerRef.current) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }
  }, []);

  return (
    <div
      className={`ad-container my-4 text-center ${className}`}
      ref={adContainerRef}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
      <div className="text-xs text-gray-400 mt-1">Publicidade</div>
    </div>
  );
}
