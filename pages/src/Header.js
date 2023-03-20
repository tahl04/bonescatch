import React from 'react'
import Link from 'next/link'
import hd from '@/styles/header.module.scss'

function Header() {
  return (
    <header className={hd.header}>
        <Link href="/page/Main">
            <img src='/img/logo0.png' className={hd.logo}></img>
        </Link>
    </header>
  )
}

export default Header