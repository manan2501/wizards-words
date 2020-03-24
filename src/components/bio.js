
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)
  const linkedInLinks = [`https://www.linkedin.com/in/manan-kevadiya/`,`https://www.linkedin.com/in/bhavesh-suthar-b3538b16a/`,`https://www.linkedin.com/in/lav-senghani-4764a0167/https://www.linkedin.com/in/lav-senghani-4764a0167/`]
  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(0),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p style={{color: 'var(--textNormal)'}}>
        <strong>
          <em>
          "Do not take life too seriously. You will never get out of it alive."
          <div style={{float: "right"}}>
            -Elbert Hubbard
          </div>
          </em>
        </strong>
        {author.summary}
        {` `}
      </p>
    </div>
  )
}

export default Bio
