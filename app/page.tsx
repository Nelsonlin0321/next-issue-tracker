import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination itemCount={100} currentPage={5} pageSize={10} />;
}
