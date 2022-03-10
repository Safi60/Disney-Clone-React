import { gql, GraphQLClient } from "graphql-request";
import Section from "../components/Section.js";
import Link from "next/link";
import NavBar from "../components/NavBar.js";
import ImageLogo from "next/image";
import disney from "../public/disney.png";
import marvel from "../public/marvel.png";
import pixar from "../public/pixar.png";
import natGeo from "../public/natgeo.png";
import starWars from "../public/star-wars.png";

export const getStaticProps = async () => {
  // Content API from API ACCES
  const url = process.env.ENDPOINT;

  const client = new GraphQLClient(url, {
    //Auth Token
    headers: {
      authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const query = gql`
    query {
      videos {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        mp4 {
          url
        }
        thumbnail {
          url
        }
      }
    }
  `;

  const accountQuery = gql`
    query {
      account(where: { id: "cl0dgda6p0qcb0blejwq7m56b" }) {
        username
        avatar {
          url
        }
      }
    }
  `;

  const data = await client.request(query);
  const videos = data.videos;
  const accountData = await client.request(accountQuery);
  const account = accountData.account;

  return {
    props: {
      videos,
      account,
    },
  };
};

const Home = ({ videos, account }) => {
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const filterVideo = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const unseenVideo = (videos) => {
    return videos.filter((video) => video.seen == false || video.seen == null);
  };

  return (
    <>
      <NavBar account={account} />
      <div className="App">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>
        <div className="video-feed">
          <Link href="#disney">
            <div className="franchise" id="disney">
              <ImageLogo
                className="logo-franchise"
                src={disney}
                alt="logo-disney"
                width={400}
                height={200}
              />
            </div>
          </Link>
          <Link href="#pixar">
            <div className="franchise" id="pixar">
              <ImageLogo
                className="logo-franchise"
                src={pixar}
                alt="logo-pixar"
                width={400}
                height={200}
              />
            </div>
          </Link>
          <Link href="#star-wars">
            <div className="franchise" id="star-war">
              <ImageLogo
                className="logo-franchise"
                src={starWars}
                alt="logo-star-war"
                width={400}
                height={200}
              />
            </div>
          </Link>
          <Link href="#nat-geo">
            <div className="franchise" id="nat">
              <ImageLogo
                className="logo-franchise"
                src={natGeo}
                alt="logo-nat"
                width={400}
                height={200}
              />
            </div>
          </Link>
          <Link href="#marvel">
            <div className="franchise" id="marvel">
              <ImageLogo
                className="logo-franchise"
                src={marvel}
                alt="logo-marvel"
                width={400}
                height={200}
              />
            </div>
          </Link>
        </div>
        <Section genre={"Recommended for you"} videos={unseenVideo(videos)} />
        <Section genre={"Family"} videos={filterVideo(videos, "family")} />
        <Section
          id="marvel"
          genre={"Marvel"}
          videos={filterVideo(videos, "marvel")}
        />
        <Section
          id="pixar"
          genre={"Pixar"}
          videos={filterVideo(videos, "pixar")}
        />
        <Section
          id="disney"
          genre={"Disney"}
          videos={filterVideo(videos, "disney")}
        />
        <Section
          id="nat-geo"
          genre={"National Geographic"}
          videos={filterVideo(videos, "national-geographic")}
        />
        <Section
          id="star-wars"
          genre={"Star Wars"}
          videos={filterVideo(videos, "starwars")}
        />
      </div>
    </>
  );
};

export default Home;
