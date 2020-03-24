import React from "react"
import { Link, graphql } from "gatsby"
import './main.css'
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Helmet from "react-helmet"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  
  return (
    <div style={{marginLeft: `auto`,
    marginRight: `auto`,
    maxWidth: rhythm(24)}}>
      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css"/>
        <script type="text/javascript" src="//cdn.livetrafficfeed.com/static/hitcounterjs/live.js"></script>
      </Helmet>
      <ThemeToggler>
          {({ theme, toggleTheme }) => (
            <div className="pretty p-switch p-fill" style={{float: "right", marginTop: 20}}>
              <input
                type="checkbox" 
                onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                checked={theme === 'dark'}
              />
              <div style={{color: 'var(--textNormal)'}} className="state">
                  <label>Theme</label>
              </div>
            </div>
          )}
        </ThemeToggler>
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 10),
                  }}
                >
                  <Link style={{ boxShadow: `none`, color: `#FF3E4D` }} to={node.fields.slug}>
                    <span id="title">
                      {title}
                    </span>
                  </Link>
                </h3>
                <small style={{color: 'var(--textNormal)'}}>
                  {node.frontmatter.date}  
                  <div>
                    by <strong style={{fontStyle: "italic"}}>{node.frontmatter.author}</strong> 
                  </div>
                </small>
              </header>
              <section style={{color: 'var(--textNormal)'}}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    </div>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            author
            description
          }
        }
      }
    }
  }
`
