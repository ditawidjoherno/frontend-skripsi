/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/storage/:path*', // Setiap permintaan yang dimulai dengan /storage/
                destination: 'http://localhost:8000/storage/:path*', // Diteruskan ke backend Laravel di port 8000
            },
        ];
    },
};

export default nextConfig;
