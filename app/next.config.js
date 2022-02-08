module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  env: {
    URL_CLOUDINARY_RES:
      'https://api.cloudinary.com/v1_1/fervillalbag/image/upload',
    CLOUDINARY_NAME_PRESET_REPORT: 'reports'
  }
}
