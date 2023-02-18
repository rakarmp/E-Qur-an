import { Box, Heading, Link as ChakraLink } from "@chakra-ui/react";

export default function SurahList({ surah }) {
  return (
    <Box>
      <Heading as="h2" size="2xl" mb={8}>
        Daftar Surah
      </Heading>
      <Box>
        {surah.map((s) => (
          <Box
            key={s.nomor}
            display="flex"
            alignItems="center"
            py={2}
            borderBottom="1px solid"
            borderBottomColor="gray.200"
          >
            <Box w="20px" textAlign="center" fontWeight="bold">
              {s.nomor}
            </Box>

            <ChakraLink
              href={`/surah/${s.nomor}`}
              ml={4}
              color="blue.500"
              fontWeight="bold"
            >
              {s.nama}
            </ChakraLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
