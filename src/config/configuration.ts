export default () => ({
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  // database: {
  //   host: process.env.DATABASE_HOST,
  //   port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  // }
})
