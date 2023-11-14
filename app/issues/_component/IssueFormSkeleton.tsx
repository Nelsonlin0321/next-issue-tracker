import { Box, Flex, Card } from "@radix-ui/themes";
import React from "react";
import Skeleton from "@/app/components/Skeleton";

interface Props {
  formType: "Edit" | "Preview" | "Create";
}

const IssueFormSkeleton = ({ formType }: Props) => {
  const skeletonHeight = "1.5rem";
  const margin = "3";
  return (
    <Box className="max-w-2xl">
      <Skeleton height={skeletonHeight} className={`mb-${margin}`} />
      {formType === "Preview" && (
        <Flex gap="2" className={`mb-${margin}`}>
          <Skeleton width="2rem" height={skeletonHeight} />
          <Skeleton width="8rem" height={skeletonHeight} />
        </Flex>
      )}
      {formType === "Edit" && (
        <Skeleton
          width="5rem"
          height={skeletonHeight}
          className={`mb-${margin}`}
        />
      )}
      <Card>
        <Skeleton count={10} className={`my-${margin}`} />
      </Card>
    </Box>
  );
};

export default IssueFormSkeleton;
