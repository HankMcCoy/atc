'use strict'

const _ = require('lodash')
const cors = require('cors')
const express = require('express')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const Promise = require('bluebird')
const request = require('superagent-promise')(require('superagent'), Promise)

const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

const api = 'https://api.github.com'
const org = process.env.GH_ORG
const repo = process.env.GH_REPO
const token = process.env.GH_TOKEN
const repoUrl = `${api}/repos/${org}/${repo}`

app.use(cors())

app.use(devMiddleware(compiler, {
	noInfo: true,
	publicPath: webpackConfig.output.publicPath,
}))

app.get('/', (req, res) => {
  res.send(
`
<body>
	<style>
		body {
			margin: 0;
			padding: 0;
			background-color: #f9f9f9;
		}
	</style>
	<script src="http://localhost:3000/js/index.js"></script>
</body>
`
	)
})

app.get('/api/pull-requests', (req, res) => {
	request
		.get(`${repoUrl}/pulls?access_token=${token}&per_page=100`)
		.end()
		.then((res) => {
			return res.body
		})
		.then((prs) => {
			return Promise.all(prs.map((pr) => (
				request.get(`${repoUrl}/pulls/${pr.number}/files?access_token=${token}`)
					.end()
					.then((res) => res.body)
					.then((files) => ({
						title: pr.title,
						user: pr.user,
						additions: _.sumBy(files, 'additions'),
						deletions: _.sumBy(files, 'deletions'),
					}))
			)))
		})
		.then((prs) => {
			res.send(prs)
		})
		.catch((err) => {
			console.error(err)
			res.status(500).send('Well shit')
		})
})

app.listen(3000, () => {
  console.log('Server started')
})
