import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import * as style from "../styles/singleBlog.module.scss"

const SingleBlog = (props) => {
    return (
      <Layout>
        {/*　マークダウンから取得する場合
        <div className={style.hero}>
          <GatsbyImage image={props.data.markdownRemark.frontmatter.image.childImageSharp.gatsbyImageData} alt="blog-image"/>
        </div>

        <div className={style.wrapper}>
          <div className={style.container}>
            <h1>{props.data.markdownRemark.frontmatter.title}</h1>
            <p>{props.data.markdownRemark.frontmatter.date}</p>
            {
              //テキストデータを表示する場合は特殊なdangerouslySetInnerHTMLを使う
            }
            <div dangerouslySetInnerHTML={{__html:props.data.markdownRemark.html}}/>
            {console.log(props)}
          </div>
        </div>
         */}
         <div className={style.hero}>
          <GatsbyImage image={props.data.contentfulBlog.image.gatsbyImageData} alt="blog-image"/>
        </div>

        <div className={style.wrapper}>
          <div className={style.container}>
            <h1>{props.data.contentfulBlog.title}</h1>
            <p>{props.data.contentfulBlog.date}</p>
            <div dangerouslySetInnerHTML={{__html:props.data.contentfulBlog.textBody.childMarkdownRemark.html}}/>
          </div>
        </div>
        
      </Layout>
    )
}

export default SingleBlog

/*
  http://localhost:8000/___graphql
  にアクセスします
  blog.jsでは全mdデータが必要でしたが
  single-blogでは個別のmdファイルのデータが必要なので
  markdownRremarkをクリック
  コピーして貼り付けるが、slugと内容が噛み合わない
  そこでgatsuby-nodeで指定したslugを用いて
  関係付ける
*/

/* マークダウンファイルから取得する場合
export const query = graphql`
query SingleBlogQuery($slug:String!) {
  markdownRemark(fields:{ slug:{eq:$slug} }) {
    frontmatter {
      date
      excerpt
      id
      title
      image {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            quality: 90
            width: 1000
          )
        }
      }
    }
    html
  }
}
`
*/

//ヘッドレスCMS contentfulから取得する場合
export const query = graphql`
query ContentfulSingleBlogQuery($slug: String!) {
  contentfulBlog(slug:{eq:$slug}) {
    title
    date(formatString: "YYY-MM-DD")
    image {
      gatsbyImageData(formats: AUTO, placeholder: BLURRED, quality: 90, width: 1000)
    }
    textBody {
      childMarkdownRemark {
        html
      }
    }
  }
}

`
