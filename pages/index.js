import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First meetup",
    image:
      "https://images.lonelyplanetitalia.it/uploads/il-tempio-di-pura-ulun-danu-bratan-allalba-balicgu-820.jpg?q=80&p=slider&s=ee8bf88b05570823302fca07bcdc547a",
    address: "Bali",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "Second meetup",
    image:
      "https://images.lonelyplanetitalia.it/uploads/il-tempio-di-pura-ulun-danu-bratan-allalba-balicgu-820.jpg?q=80&p=slider&s=ee8bf88b05570823302fca07bcdc547a",
    address: "Bali",
    description: "This is a first meetup",
  },
  {
    id: "m3",
    title: "Third meetup",
    image:
      "https://images.lonelyplanetitalia.it/uploads/il-tempio-di-pura-ulun-danu-bratan-allalba-balicgu-820.jpg?q=80&p=slider&s=ee8bf88b05570823302fca07bcdc547a",
    address: "Bali",
    description: "This is a first meetup",
  },
];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta
          name="description"
          content="Browse meetups all around the globe"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export async function getServerSideProps({ req, res }) {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:admin@cluster0.vzvub.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map(({ title, address, image, _id }) => ({
        title,
        address,
        image,
        id: _id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
