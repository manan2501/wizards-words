
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
          “People that have trust issues only need to look in the mirror. There they will meet the one person that will betray them the most.”
          </em>
          <div style={{fontWeight: 200, fontSize: 15}}>
           ― Shannon L. Alder 
          </div>
        </strong>
        {author.summary}
        {` `}
      </p>
    </div>
  )
}

export default Bio
