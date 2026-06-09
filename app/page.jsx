import { getProfileJsonLd } from "./seo";
import HomePage from "./components/HomePage";

export default function Page() {
  const profileJsonLd = getProfileJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profileJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomePage />
    </>
  );
}
