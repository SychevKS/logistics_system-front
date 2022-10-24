/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        API_URL: "https://localhost:7128/api/",
    },
}

module.exports = nextConfig
