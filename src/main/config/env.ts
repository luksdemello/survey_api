export default {
  mongoUrl: process.env.MONGOURL ?? 'mongodb://localhost:27017/survey',
  port: 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'tj12J345=*'
}
