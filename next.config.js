/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com','lh3.googleusercontent.com',"avatars.githubusercontent.com","kamal-twitter-dev.s3.ap-south-1.amazonaws.com","encrypted-tbn0.gstatic.com" ],
  },
}

module.exports = nextConfig
