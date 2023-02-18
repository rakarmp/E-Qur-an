import { Heading, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";

export default function SurahDetail({ surah }) {
  const { nama, arti, ayat } = surah;

  return (
    <>
      <Head>
        <title>{nama}</title>
        <meta name="description" content={`Surah ${nama}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack py={8} spacing={4}>
        <Heading as="h1" size="2xl">
          {nama}
        </Heading>
        <Text fontSize="xl">{arti}</Text>
        {ayat.map((a) => (
          <Text key={a.nomor} fontSize="xl">
            {a.ar} ({a.nomor})
          </Text>
        ))}
      </VStack>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://equran.id/api/v2/surat");
  const data = await res.json();

  const paths = data.data.map((surah) => ({
    params: { surahNumber: surah.nomor.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://equran.id/api/v2/surat/${params.surahNumber}`
  );
  const data = await res.json();

  return {
    props: {
      surah: data.data,
    },
  };
}
