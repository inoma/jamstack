import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import * as style from "../styles/blog.module.scss"

/*
  〜記事データを読み込む〜
  dataフォルダに記事のファイルを作った後は
  このデータをblog.jsに渡す必要がある。
  ・gatsby-source-filesystem
  ・gatsby-transformer-remark
  のプラグインが必要。ターミナルでインストール。
  インストール後はgatsby-config.jsに指定。
  （詳細はgatsby-config.jsファイルの方に記載）
*/
/*
  〜GraphQL〜
  さらにblog.jsに記事を読み込むため、GraphQLを利用します。
  http://localhost:8000/___graphql
  にアクセスしてブラウザで確認します。
  （詳細は下の方に記載↓）
*/
/*
  〜呼び出してみよう〜
  GraphQLで問い合わせたデータはpropsに入って届きます。
  propsとはデータやファンクションなどを包みこんで
  別のコンポーネントに渡す「箱」や「袋」のようなものです。
  propsは上位のコンポーネントから下位のコンポーネントへと
  渡されることが多いですが、
  GraphQLでは問い合わせをしたファイルにある
  コンポーネントへとダイレクトに渡されます。

  return内で{console.log(props)}ブラウザの開発ツールで確認すると
  objectの中にallMarkdownRemark:{edges:Array(6)}とあります
  propsの中に入っているのがわかります。
  ---
  {props.data.allMarkdownRemark.edges.map((singleBlog, index) =>
        {console.log(singleBlog)}
  )}
  ---
  mapメソッドで分解し、singleBlogとして一つ分の記事データに展開。
  consoleで確認すると、edgesが展開され各記事データを格納したnodeが６つ書き出されます。
  
  そして各記事のタイトルや日付を呼び出すため
  singleBlog.node.frontmatter.title
  singleBlog.node.frontmatter.date
  等と記載。
  （詳細は下に↓）
*/
/*
  〜ユニークなURLの割り当て〜
  データを流し込む雛形single-blog.jsを作った後
  表示するページ固有のURLを割り当てるためgatsby-node.jsにコードを書き込みます。
  （gatsby-node.jsファイル参照）
  
  1.マークダウンデータを流し込む雛形テンプレファイル作成
  2.gatsby-node.jsに記事ページのユニークなURLを生成
  3.そのURLにテンプレファイルを割り当てる
  4.テンプレファイルからマークダウンデータを読み込む

  mapメソッドを使う場合はどこかにkeyを指定すること
  mapメソッドの中でもdivで括る必要があります。
*/

const Blog = (props) => {

  return(
    <Layout>
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Blog</h1>
        <p>弊社サービスやお客様の声などを紹介します。</p>

        {props.data.allContentfulBlog.edges.map((singleBlog, index) => (
        //ヘッドレスCMSを使わない場合は
        //props.data.allMarkdownRemark.edges.map((singleBlog, index)
          <div className={style.blogcard} key={index}>
            <div className={style.textContainer}>
              {/*
                <h3>{singleBlog.node.frontmatter.title}</h3>
                <p>{singleBlog.node.frontmatter.except}</p>
                <p>{singleBlog.node.frontmatter.date}</p>
                <Link to={singleBlog.node.fields.slug}>Read more</Link>
              */}
              <h3>{singleBlog.node.title}</h3>
              <p>{singleBlog.node.except}</p>
              <p>{singleBlog.node.date}</p>
              <Link to={singleBlog.node.slug}>Read more</Link>
              
            </div>
            {
                /*
                  gatsbyImagesではheaderなどどのページでも同じ画像は
                  StaticImageタグを使いますが、ブログ一覧のように
                  MDファイル毎に表示が異なる場合は
                  GatsbyImageタグを使います
                  StaticImageタグの場合はタグにいろいろ指定できましたが、
                  GatsbyImageタグの場合は下↓のGraphQlの方で指定できます

                  <GatsbyImage image={singleBlog.node.frontmatter.image.childImageSharp.gatsbyImageData} alt="card-image" className={style.cardImg}/>
                */
              }
              <GatsbyImage image={singleBlog.node.image.gatsbyImageData} alt="card-image" className={style.cardImg}/>
          </div>
          )
        )}

      </div>
    </div>
    </Layout>

  )

}

export default Blog

/*
  http://localhost:8000/___graphqlへアクセス
  BlogQueryと名前を変更し、呼び出す
  allMarkdownRemarkはマークダウンファイル全体を指す。
  allMarkdownRemark>edges>node>frontmatterと進むと
  dataファイルで作成した記事データの内容が出てくる。
  全てにチェックをして左側に表示されたものをコピーして貼り付け
*/
/*
  ブログ記事ページのスラッグを取得するため
  allMarkdownRemark>edges>node>fields>slugも追加
  上のと合わせて一括でコピペ

  ※このままでは順番がめちゃめちゃになるので
  allmarkdownRemark > sortで表示の順番を指定してあげること
*/
/*
  gatsbyImageの場合はGraphQlの方でformatなどを指定
*/
/*
export const query = graphql`
query BlogQuery {
  allMarkdownRemark(sort: {fields: frontmatter___id, order: DESC}) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          date
          excerpt
          id
          title
          image {
            childImageSharp {
              gatsbyImageData(
                formats: AUTO, 
                placeholder: DOMINANT_COLOR,
                quality: 90
              )
            }
          }
        }
      }
    }
  }
}
`
*/
//ヘッドレスCMS contentfulと接続するためのquery
export const query = graphql`
query ContentfulBlogQuery {
  allContentfulBlog(sort: {fields: date, order: DESC}){
    edges {
      node {
        slug
        title
        id
        except
        date(formatString: "YYY-MM-DD")
        image {
          gatsbyImageData(formats: AUTO, placeholder: BLURRED, quality: 90)
        }
      }
    }
  }
}
`