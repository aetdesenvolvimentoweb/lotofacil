import { AdBanner } from "./AdBanner";

export function AdRectangle() {
  return (
    <AdBanner
      adSlot="1112889238" // Substitua pelo seu slot de anúncio real
      format="auto"
      responsive={true}
      className="mx-auto max-w-md"
    />
  );
}
