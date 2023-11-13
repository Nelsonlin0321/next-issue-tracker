import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_component/IssueFormSkeleton";
const IssueForm = dynamic(() => import("@/app/issues/_component/issueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton formType="Create" />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
