const data = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Manuel Data Plug",
  url: "https://manueldataplug.com",
  description: "Fast • Affordable • Reliable Data packages",
  logo: "https://manueldataplug.com/icon.svg",
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
