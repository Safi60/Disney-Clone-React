import { gql, GraphQLClient } from "graphql-request";
import { useState } from "react";

export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    //Auth Token
    headers: {
      authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  //Get the slug (name video) from the URL
  const pageSlug = pageContext.query.slug;

  const query = gql`
    query ($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
        createdAt
        id
        title
        description
        tags
        seen
        slug
        mp4 {
          url
        }
        thumbnail {
          url
        }
      }
    }
  `;

  const variables = {
    pageSlug,
  };

  const data = await graphQLClient.request(query, variables);
  const video = data.video;

  return {
    props: {
      video,
    },
  };
};

const changeToSeen = async (slug) => {
  await fetch("/api/ChangeToSeen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  });
};

const Video = ({ video }) => {
  const [watching, setWatching] = useState(false);
  console.log(video);
  return (
    <>
      {!watching && (
        <img
          className="video-image"
          src={video.thumbnail.url}
          alt={video.title}
        />
      )}
      {!watching && (
        <div className="video-info">
          <div className="genre">
            {video.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
          <p className="title">{video.title}</p>
          <p className="description">{video.description}</p>
          <a className="back" href="/">
            Back
          </a>
          <button
            onClick={() => {
              changeToSeen(video.slug);
              watching ? setWatching(false) : setWatching(true);
            }}
            className="video-overlay"
          >
            <span>&#9656;</span>
            Play
          </button>
        </div>
      )}
      {watching && (
        <video width="100%" controls>
          <source src={video.mp4.url} type="video/mp4" />
        </video>
      )}
      <div
        className="info-footer"
        onClick={() => (watching ? setWatching(false) : null)}
      ></div>
    </>
  );
};

export default Video;
