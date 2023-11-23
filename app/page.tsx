import LatestIssue from "./LatestIssue";

interface Props {
  searchParams: { page: string };
}

export default function Home({ searchParams }: Props) {
  return <LatestIssue />;
}
