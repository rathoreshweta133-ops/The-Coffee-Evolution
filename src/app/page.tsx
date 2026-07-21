import { CafeExperience } from "@/components/cafe-experience";
import { siteConfig } from "@/config/site";
import { brand, hours } from "@/data/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: siteConfig.siteName,
    image: siteConfig.logo,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pragathi Nagar",
      addressLocality: "Nizamabad",
      addressRegion: "Telangana",
      postalCode: "503003",
      addressCountry: "IN",
    },
    telephone: brand.phone,
    email: brand.email,
    url: siteConfig.url,
    openingHoursSpecification: hours.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.day,
      opens: entry.open,
      closes: entry.close,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CafeExperience />
    </>
  );
}
