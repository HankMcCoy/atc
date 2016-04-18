import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'

const contentEl = document.createElement('div')
document.body.appendChild(contentEl)
ReactDOM.render(<App />, contentEl)
