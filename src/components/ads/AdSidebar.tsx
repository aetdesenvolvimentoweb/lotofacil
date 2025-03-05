import { AdBanner } from "./AdBanner";

export function AdSidebar() {
  return (
    <AdBanner
      adSlot="8348381422" // Substitua pelo seu slot de anúncio real
      format="auto"
      responsive={true}
      className="my-auto"
    />
  );
}
