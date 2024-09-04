import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import React from 'react'


const Layout = ({ children } ) => {
  return (
    <>
      <Head>
        <meta name="twitter:site" content="SimbaStore" />
        <meta property="og:locale" content="Africa,KE,Kenya,en" />
        <meta property="og:type" content="article" />
        <meta property="article:tag" content="" />
        <meta property="article:section" content="Products" />
        <meta
          property="article:published_time"
          content={new Date().toISOString()}
        />
      </Head>

      <Header />

      <main>
        <div>{children}</div>
      </main>
        <Footer />

        <style>
          {`
          * {
            margin: 0;
            padding: 0;
          }
          body {
            font-family: Bernada, san-serif;
            transition: .4s ease-in-out;
          }
          `}
        </style>
    </>
  )
}

export default Layout;
