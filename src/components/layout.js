import * as React from "react"

import Header from "./header"
import Footer from "./footer"

import "../styles/all.scss"

const Layout = (props) =>{
  return(
    <>
      <Header />
      {/*
        index.jsの方でlayaoutで囲ったところは表示されない
        そのため、layoutタグで囲まれたものは全てchildrenに情報が渡されるので
        下記のように記載
      */}
      <main>{props.children}</main>
      <Footer />
    </>
  )
}

export default Layout