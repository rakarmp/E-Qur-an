import { Heading, Text, VStack, Box } from "@chakra-ui/react";
import Head from "next/head";

export default function SurahDetail({ surah }) {
  const { namaLatin, arti, ayat } = surah;

  return (
    <>
      <Head>
        <title>{namaLatin}</title>
        <meta name="description" content={`Surah ${namaLatin}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack py={8} spacing={4}>
        <Heading as="h1" size="2xl">
          {namaLatin}
        </Heading>
        <Text fontSize="xl">{arti}</Text>
        {ayat.map((a) => (
          //   <Text key={a.nomor} fontSize="xl">
          //     {a.ar} ({a.teksArab})
          //   </Text>
          <Box
            key={a.nomor}
            display="flex"
            alignItems="center"
            py={2}
            borderBottom="1px solid"
            borderBottomColor="gray.200"
          >
            <Box w="20px" textAlign="right" fontWeight="bold" mr={2}>
              {a.nomor}
            </Box>
            <Box>
              <Text fontSize="xl" fontWeight="bold" textAlign={"justify"}>
                {a.ar} {a.teksArab}
              </Text>
              <Text fontSize="lg" mt={1}>
                {a.teksLatin}
              </Text>
              <Text fontSize="lg" mt={1}>
                {a.teksIndonesia}
              </Text>
            </Box>
          </Box>
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
