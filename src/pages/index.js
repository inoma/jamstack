import * as React from "react"

import { graphql } from "gatsby"
import Seo from "../components/seo"

import { Link } from "gatsby" //リンクだ
//import * as style from "../styles/index.module.css"//CSS呼び出し

import{ StaticImage } from "gatsby-plugin-image"
//画像を読み込むためのプラグイン（自動で最適化してくれる）

import JSLogo from "../images/javascript.svg"
import ReactLogo from "../images/react.svg"
import GatsbyLogo from "../images/gatsby.svg"
import NextLogo from "../images/next.svg"
//SVGファイルの場合はgatsbyImagesで読み込む必要なはないので、imgタグを使う

import Layout from "../components/layout"
//header footer

import * as style from "../styles/index.module.scss"

const Index = (props) => {
    return (
      <Layout>
        <Seo title="ここにサイトタイトル" description="このサイトはテストサイトです" />
        <div className={style.hero}>
          {/*
            gatsby-plugin-imageのできる設定一覧
            https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/  
          */}
          <StaticImage src="../images/index-hero.jpg" alt="hero" 
          quality={90} placeholder="dominantColor" formats={["AUTO","WEBP","AVIF"]}
          className={style.heroImg}/>
          <div className={style.textContainer}>
            <h1>Jack of All Trades</h1>
            <h3>World's Largest Provider</h3>
          </div>
        </div>

        <div>

          <div className={style.container}>
            <div className={style.company}>
              <h2>弊社について</h2>
              <p>Last Update: {props.data.contentfulLastupdate.lastupdate}</p>
              <p>Lorem Ipsum is simply summy text of the aaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </p>
            </div>
            <StaticImage src="../images/company.jpg" alt="company" 
            quality={90} placeholder="dominantColor" formats={["AUTO","WEBP","AVIF"]}/>
          </div>

          <div className={style.service}>
            <h2>Service</h2>
            <div className={style.serviceContainer}>
              <div><img src={JSLogo} alt="javascript"/><span>JaveScript / 10 years</span></div>
              <div><img src={ReactLogo} alt="react"/><span>React / 5 years</span></div>
              <div><img src={GatsbyLogo} alt="gatsby"/><span>Gatsby / 3 years</span></div>
              <div><img src={NextLogo} alt="next"/><span>Next.JS / 3 years</span></div>
            </div>
          </div>

          <div className={style.ctaButton}>
            <Link to="/contact">Contact Us!</Link>
          </div>

        </div>
      </Layout>
    )
}

export default Index

export const query = graphql`
query IndexQuery {
  contentfulLastupdate {
    lastupdate(formatString: "YYY-MM-DD")
  }
}

`