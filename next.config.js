module.exports = {

  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/callback',
        destination: '/',
        permanent: false,
      },
    ]
  },
  
}
