import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /**
   * Emit plain HTML/CSS/JS into `out/` so the site can be served by a Render
   * Static Site (CDN, no server to cold-start). A static export cannot run
   * redirects, rewrites or response headers: the rewritten URLs are written as
   * real files by scripts/finalize-export.mjs, and the rest live in render.yaml.
   */
  output: "export",
  /**
   * Every page is written as `<route>/index.html`, which any static host
   * resolves without extension-guessing rules.
   */
  trailingSlash: true,
  /**
   * Stamped once per build and inlined. Reading the clock at render time would
   * instead report whenever a page was rendered, which is not a moment anyone
   * cares about once the site is a set of files.
   */
  env: {
    BUILD_TIMESTAMP: new Date().toISOString(),
  },
  reactStrictMode: true,
  typedRoutes: true,
  transpilePackages: ["next-mdx-remote"],
  allowedDevOrigins: ["hasanmavlonov.localhost", "hasanmavlonov.local"],
  devIndicators: false,
  experimental: {
    // Rewrite barrel imports to deep imports so a single icon doesn't pull the
    // whole package into the module graph. Next already optimizes lucide-react,
    // @tabler/icons-react, date-fns and lodash-es by default; these are the
    // heavy icon packages this app uses that are NOT on that default list.
    optimizePackageImports: [
      "@hugeicons/react",
      "@hugeicons/core-free-icons",
      "@phosphor-icons/react",
      "@remixicon/react",
    ],
  },
  images: {
    // The image optimizer is a server feature; images are served as-is.
    unoptimized: true,
  },
  compiler:
    process.env.NODE_ENV === "production"
      ? {
          removeConsole: {
            exclude: ["error"],
          },
        }
      : undefined,
}

export default nextConfig
