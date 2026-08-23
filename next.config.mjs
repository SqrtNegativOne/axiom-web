/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
                ]
            },
            {
                source: '/newsletter(.*)',
                headers: [
                    { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://unpkg.com; style-src 'self' https://unpkg.com 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests" },
                ]
            },
            {
                source: '/((?!newsletter).*)',
                headers: [
                    { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://upload.wikimedia.org; font-src 'self'; connect-src 'self' https://axiomnsut.goatcounter.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests" },
                    {
                        key: "Link",
                        value: '<https://axiomnsut.in/sitemap.xml>; rel="sitemap", <https://axiomnsut.in/newsletter/feed.xml>; rel="alternate"; type="application/rss+xml", <https://axiomnsut.in/llms.txt>; rel="alternate"; type="text/plain", <https://axiomnsut.in/.well-known/security.txt>; rel="help"'
                    }
                ]
            }
        ];
    },
};

export default nextConfig;
