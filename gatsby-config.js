module.exports = {
  siteMetadata: {
    defaultTitle: `jamstack site`,
    defaultDescription: `モダン開発を得意とする〜〜〜〜〜〜`,
    defaultImage: `src/images/social-card.png`,
    siteUrl: `https://effulgent-alpaca-ca6cae.netlify.app`,
  },
  plugins: [
    `gatsby-plugin-sass`,//gatsbyでsassを動かすプラグイン
    `gatsby-transformer-remark`,//新しく追加したプラグイン
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    
    //ヘッドレスCMS　contentfulと繋げるためのプラグイン----
    //contentfulの方でAPIKeyを作成してください
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `59xl3gmbdmw4`,
        accessToken: `65wxUjd57o-cPqS7eMLt-TxnusmorOGHn-aXmDVW8Yw`,
      },
    },
    //-----------------------------------------------

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    
    //dataフォルダも読み込ませるため追加------

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/data`,
      },
    },

    //-----------------------------------

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
