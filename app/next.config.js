module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  env: {
    URL_CLOUDINARY_RES: process.env.URL_CLOUDINARY_RES,
    CLOUDINARY_NAME_PRESET_REPORT: process.env.CLOUDINARY_NAME_PRESET_REPORT,
    API_URL: process.env.API_URL
  }
}
