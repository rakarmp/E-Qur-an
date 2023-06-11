import Head from "next/head";
import { Box, Text, Heading } from "@chakra-ui/react";
import SurahList from "./components/SurahList";
// import SurahList from "../components/SurahList";

export default function Home({ surah }) {
  return (
    <Box>
      <Head>
        <title>E-Qur'an</title>
        <meta name="description" content="simple al-qur'an online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box px={[4, 8]} py={8}>
        <Box maxW="800px" mx="auto">
          <Heading as="h1" size="3xl" mb={4} textAlign="center">
            Baca Al-Qur'an
          </Heading>
          <Text fontSize="2xl" mb={8} textAlign="center">
            Online Al-Qur'an
          </Text>

          <SurahList surah={surah} />
        </Box>
      </Box>
    </Box>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://equran.id/api/v2/surat");
  const data = await res.json();

  return {
    props: {
      surah: data.data,
    },
  };
}
