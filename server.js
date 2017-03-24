if (process.env.NODE_ENV !== 'production') {
  require('babel-register')({ ignore: /node_modules/ })
}

const fs = require('fs')

const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { StaticRouter } = require('react-router')
const Routes = require('./src/Components/Router/CompiledRoutes').default
const Layout = require('./src/Components/Layout').default

const _template = require('lodash/template')
const baseTemplate = fs.readFileSync('./index.html')
const template = _template(baseTemplate)

const config = require('./config.json')

const connectMongoose = require('./server/models/')
const MONGO_URI = config.mongoUriDev

const express = require('express')
const helmet = require('helmet')
const PORT = process.env.PORT || 4000
const app = express()

connectMongoose(MONGO_URI)

app.use(helmet())

app.use('/public', express.static('./public'))

/**
 * Handles server requests, and serves per-rendered context-aware
 * React markup based on the url
 */
app.use((req, res) => {
  const context = {}
  const body = ReactDOMServer.renderToString(
    React.createElement(StaticRouter, { location: req.url, context: context },
      React.createElement(Layout, null,
        React.createElement(Routes)
      )
    )
  )
  if (context.url) {
    res.redirect(context.url)
  } else {
    res.status(200).send(template({ body }))
  }
})
console.log(`Express: Listening on port ${PORT}`)
app.listen(PORT)
