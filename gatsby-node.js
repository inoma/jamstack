/*
Node.jsとは
　サーバーをjavascriptであれこれできる環境みたいなもの
　本来javascriptはブラウザ側でしか動かせない言語

マークダウンのファイルからslugを生成するため
createFilePathを使用し
gatsby-source-filesystemから読み込みます
Gatsbyの公式サイトでも一応載ってる creareFilePath
*/

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

/*　マークダウンファイルからスラッグを取得する場合のコード
exports.onCreateNode = ({ node, getNode, actions }) => {
  //このnodeにはサイトの全データが入っているので必要なものだけ選別
    const { createNodeField } = actions
  
    if (node.internal.type === `MarkdownRemark`) {
      const slug = createFilePath({ node, getNode })   
      createNodeField({         
        node,                   
        name: `slug`,           
        value: slug,            
      })
    }
}
*/

/*
テンプレートファイルにslugを割り当てる
・非同期処理なのでasyncを入れる
*/
exports.createPages = async ({ graphql, actions }) => {  
    const { createPage } = actions   

    /*
    const result = await graphql(`              
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)
    */

   //ヘッドレスCSM Contentfulから取得する場合のスラッグ
    const result = await graphql(`              
        query {
            allContentfulBlog {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `)

  /*
  componentでテンプレファイルsinge-blogに割り当てる
  contextを使うことで割り当てたページにデータを渡すことができる

  マークダウンから取得する場合は
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/single-blog.js`),
                context: {
                    slug: node.fields.slug,
                },
            })
        })
    }
  */
    result.data.allContentfulBlog.edges.forEach(({ node }) => {
            createPage({
                path: node.slug,
                component: path.resolve(`./src/templates/single-blog.js`),
                context: {
                    slug: node.slug,
                },
            })
        })
    }