import request from 'superagent'
import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'

import PullRequest from './pull-request'

class App extends Component {
  constructor() {
    super()

    this.state = { prs: [] }
  }

  render() {
    return (
      <div className={css(styles.root)}>
        <h1 className={css(styles.heading)}>
          ATC
        </h1>
        <div className={css(styles.prsWrapper)}>
          {this.state.prs.map((pr, idx) => <PullRequest key={idx} pr={pr} />)}
        </div>
      </div>
    )
  }

  componentDidMount() {
    request
      .get('/api/pull-requests')
      .end((err, res) => {
        this.setState({
          prs: res.body,
        })
      })
  }
}

const styles = StyleSheet.create({
  root: {
    fontFamily: 'sans-serif',
    fontSize: '16px',
    padding: '20px',
  },
  heading: {
    textTransform: 'uppercase',
    fontFamily: 'sans-serif',
    fontSize: '32px',
    margin: '0 0 10px 0',
  },
  prsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '-10px',
    width: 'calc(100% + 20px)',
  },
})

export default App
