import Pagination from "./components/Pagination";

interface Props {
  searchParams: { page: string };
}

export default function Home({ searchParams }: Props) {
  const currentPage = parseInt(searchParams.page);

  return (
    <Pagination
      itemCount={100}
      currentPage={isNaN(currentPage) ? 1 : currentPage}
      pageSize={10}
    />
  );
}
