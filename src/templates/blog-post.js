import React from "react"
import { Link, graphql } from "gatsby"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import Helmet from "react-helmet"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <div style={{marginLeft: `auto`,
    marginRight: `auto`,
    maxWidth: rhythm(24)}}>
      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css"/>
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
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
                color:'var(--textTitle)'
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
                color: 'var(--textNormal)'
              }}
            >
                {post.frontmatter.date}  
                <div>
                  by <strong style={{fontStyle: "italic"}}>{post.frontmatter.author}</strong> 
                </div>
            </p>
          </header>
          <section style={{color: 'var(--textNormal)'}} dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer  style={{color: 'var(--textNormal)'}}>
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} style={{color: "#FF3E4D"}} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} style={{color: "#FF3E4D"}} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    </div>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        description
      }
    }
  }
`
