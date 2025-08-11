import "./../styles/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Nathan Kitching — Portfolio",
  description: "Homelabber • IT Technician • Web Dev",
  metadataBase: new URL("https://nkitch.com"),
  openGraph: {
    title: "Nathan Kitching — Portfolio",
    description: "Homelabber • IT Technician • Web Dev",
    url: "https://nkitch.com",
    siteName: "nkitch.com",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nathan Kitching — Portfolio",
    description: "Homelabber • IT Technician • Web Dev",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          defer
          data-domain="nkitch.com"
          src="https://plausible.io/js/script.js"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nathan Kitching",
              url: "https://nkitch.com",
              jobTitle: "IT Technician",
              knowsAbout: ["Homelab", "Web Development", "InfoSec"],
            }),
          }}
        />
      </head>
      <body className="font-[Inter]">
        <Nav />
        <main className="container py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
