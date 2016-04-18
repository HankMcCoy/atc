import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const PullRequest = ({ pr }) => (
  <div className={css(styles.root)}>
    <h2 className={css(styles.heading)}>{pr.title}</h2>
    <div>
      by {pr.user.login}
    </div>
    <div>
      <span className={css(styles.additions)}>+{pr.additions}</span>,
      <span className={css(styles.deletions)}> -{pr.deletions}</span>
    </div>
  </div>
)

const styles = StyleSheet.create({
  root: {
    background: '#fff',
    border: '1px solid #ddd',
    flex: '1 0 250px',
    fontSize: '14px',
    margin: '10px',
    padding: '20px',
  },
  heading: {
    margin: '0',
    fontSize: '16px',
  },
  additions: {
    color: '#229922',
  },
  deletions: {
    color: '#992222',
  },
})

export default PullRequest
