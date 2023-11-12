import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingIssuePage = () => (
  <Box className="max-w-2xl">
    <Heading>
      <Skeleton />
    </Heading>
    <Flex gap="2" className="my-5">
      <Skeleton width="5rem" />
      <Skeleton width="8rem" />
    </Flex>
    <Card className="prose">
      <Skeleton count={3} />
    </Card>
  </Box>
);

export default LoadingIssuePage;
