export const config = {
  port: process.env.PORT || 5000,
  database: {
    url: 'mongodb://localhost:27017/blog',
    options: {}
  },
  jwt: {
    secret: process.env.JWT_SECRET || "7c093e3fd2f402d503fc3a59dc5b0d68e07907dca1bf56942e0d5c1345bbdebbfa2f94e11790e13f72e320c901df30fad5aaea56f966bba5e15578",
    options: {
      issuer: process.env.JWT_ISSUER || 'CASL.Express',
      audience: process.env.JTW_AUDIENCE || 'casl.com'
    }
  },
}
