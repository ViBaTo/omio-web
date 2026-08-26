import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { POSTHOG_PROXY_PATH } from "./src/lib/posthog-proxy";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // PostHog captura en /e/ (con barra final). Sin esto Next redirige y se pierde el evento.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: `${POSTHOG_PROXY_PATH}/static/:path*`,
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: `${POSTHOG_PROXY_PATH}/array/:path*`,
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: `${POSTHOG_PROXY_PATH}/:path*`,
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
