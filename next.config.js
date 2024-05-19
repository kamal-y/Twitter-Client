/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com','lh3.googleusercontent.com',"avatars.githubusercontent.com","kamal-twitter-dev.s3.ap-south-1.amazonaws.com"],
  },
}

module.exports = nextConfig
