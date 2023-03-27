import React from 'react'
import ra from '@/styles/rank.module.scss'

function Ranking() {
  return (
    <>
      <div className={ra.rankWrap}>
        <nav className={ra.bam}>
          <img></img>
        </nav>
        <nav className={ra.bawi}>
          <img></img>
        </nav>
        <nav className={ra.bburi}>
          <img></img>
        </nav>
        <nav className={ra.bada}>
          <img></img>
        </nav>
      </div>
    </>
  )
}

export default Ranking