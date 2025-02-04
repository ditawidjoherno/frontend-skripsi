/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/storage/:path*',
                destination: 'https://backend-monitoring-btn-production.up.railway.app/storage/:path*',
            },
        ];
    },
};

export default nextConfig;
