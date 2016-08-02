const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const compiler = webpack(webpackConfig)

const app = express()

app.use(webpackDevMiddleware(compiler, {
  stats: 'errors-only', publicPath: webpackConfig.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
)

const PORT = process.env.PORT || 8080

app.listen(PORT, () =>
  console.log('👀  Dev server running at localhost:' + PORT)
)
