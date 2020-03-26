import React from "react"
import { Link, graphql } from "gatsby"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import Helmet from "react-helmet"
import clap from './clap.webp'
import './blog.css'
import { useState, useEffect } from "react"
import { fireDb } from "../firebase"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const [clapNumber, setClapNumber] = useState(0)
  const [clapError, setClapError] = useState('')

  const handleClap = () =>{
    let isClapClickedLocal = localStorage.getItem('isClapClicked');
    if(!isClapClickedLocal){
      localStorage.setItem('isClapClicked', 1);
    }
    isClapClickedLocal = localStorage.getItem('isClapClicked');
    if(isClapClickedLocal === "1"){
      let clapNumber1 = clapNumber
      fireDb.collection('clap').doc(post.frontmatter.title.slice(0,20)).set({
        clap_number: clapNumber1+1
      })
      .then(()=> {setClapNumber(clapNumber1+1); localStorage.setItem('isClapClicked', 0)})
      .catch(e => console.log('some error try'))
    }
    else{
      setClapError('You have already clapped. Thank You')
    }
  }

  useEffect(()=>{

    let docRef = fireDb.collection("clap").doc(post.frontmatter.title.slice(0,20));

    docRef.get().then(function(doc) {
        if (doc.exists) {
          setClapNumber(doc.data().clap_number)
        } else {
          fireDb.collection('clap').doc(post.frontmatter.title.slice(0,20)).set({
            clap_number: clapNumber
          })
          .then(()=> {})
          .catch(e => console.log('some error try again later'))
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

  },[])

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
          <div style={{color: 'var(--textNormal)'}} >
              <img src={clap} alt="clap" className="clap" onClick={() => handleClap()}/>
              <span className="support">
                {clapError !== "" ? clapError :"Show your support by Clapping." }
                &#128522;
              </span>
          </div>
          <span className="clap-number" style={{color: 'var(--textNormal)'}}>
            {clapNumber} {clapNumber > 1 ? "claps": "clap"}
          </span>
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
