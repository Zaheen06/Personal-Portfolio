/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/webp'],
    },
    devIndicators: {
        appIsrStatus: false, // Hides the static/dynamic indicator
        buildActivity: false, // Hides the build activity icon
    },
};

export default nextConfig;
