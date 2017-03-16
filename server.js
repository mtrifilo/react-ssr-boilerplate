if (process.env.NODE_ENV !== 'production') {
  require('babel-register')({ ignore: /node_modules/ })
}

const fs = require('fs')

const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { StaticRouter } = require('react-router')
const Routes = require('./src/Components/Router/CompiledRoutes').default

const _template = require('lodash/template')
const baseTemplate = fs.readFileSync('./index.html')
const template = _template(baseTemplate)

const express = require('express')
const helmet = require('helmet')

const port = process.env.PORT || 4000
const app = express()

app.use(helmet())

app.use('/public', express.static('./public'))

app.use((req, res) => {
  const context = {}
  const body = ReactDOMServer.renderToString(
    React.createElement(StaticRouter, { location: req.url, context: context },
      React.createElement(Routes)
    )
  )
  if (context.url) {
    res.redirect(context.url)
  } else {
    res.status(200).send(template({ body }))
  }
})
console.log(`Express: Listening on port ${port}`)
app.listen(port)
