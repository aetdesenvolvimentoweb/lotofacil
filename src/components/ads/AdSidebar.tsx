import { AdBanner } from "./AdBanner";

export function AdSidebar() {
  return (
    <AdBanner
      adSlot="0987654321" // Substitua pelo seu slot de anúncio real
      format="vertical"
      responsive={false}
      className="h-full"
    />
  );
}
