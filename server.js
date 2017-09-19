if (process.env.NODE_ENV !== 'production') {
  require('babel-register')({ ignore: /node_modules/ })
}

const fs = require('fs')

// React
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { StaticRouter } = require('react-router-dom')
const { Provider } = require('react-redux')
const { store } = process.env.NODE_ENV === 'production'
  ? require('./public/production/client/redux/store')
  : require('./client/redux/store')
const Routes = process.env.NODE_ENV === 'production'
  ? require('./public/production/client/components/Router/CompiledRoutes')
      .default
  : require('./client/components/Router/CompiledRoutes').default
const Layout = process.env.NODE_ENV === 'production'
  ? require('./public/production/client/components/Layout').default
  : require('./client/components/Layout').default

// Template for injecting server-side rendered React markup
const _template = require('lodash/template')
const baseTemplate = fs.readFileSync('./index.html')
const template = _template(baseTemplate)

// App configuration and secrets
const config = require('./config.json')

const connectMongoose = require('./server/db/connectMongoose')
const MONGO_URI = process.env.NODE_ENV === 'production'
  ? config.mongoUriProduction
  : config.mongoUriDev

const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const passport = require('passport')
const localStrategy = require('./server/passport/localStrategy')
const githubStrategy = require('./server/passport/githubStrategy')
const PORT = process.env.PORT || config.expressPort
const app = express()

const signup = require('./server/routes/signup')
const login = require('./server/routes/login')
const user = require('./server/routes/user')

connectMongoose(MONGO_URI)

// Middleware
app.use(helmet())
app.use(bodyParser.json())
app.use(passport.initialize())
passport.use('local-login', localStrategy)
passport.use('login-github', githubStrategy)

// Routes
app.use('/api/signup', signup)
app.use('/api/login', login)
app.use('/api/user', user)
app.use('/public', express.static('./public'))

/**
 * Handles server requests, and serves per-rendered context-aware
 * React markup based on the url
 */
app.use((req, res) => {
  const context = {}
  const body = ReactDOMServer.renderToString(
    React.createElement(
      Provider,
      { store },
      React.createElement(
        StaticRouter,
        { location: req.url, context: context },
        React.createElement(Layout, null, React.createElement(Routes))
      )
    )
  )
  if (context.url) {
    res.redirect(context.url)
  } else {
    res.status(200).send(template({ body }))
  }
})
console.log('node environment:', process.env.NODE_ENV)
console.log(`Express: Listening on port ${PORT}`)
app.listen(PORT)
