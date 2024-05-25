import OrgDetailCard from "../components/Cards/OrgDetailCard";
import { useLoaderData } from "react-router-dom";

function OrgDetail () {
  const org = useLoaderData();

  if (org.isLoading) {
    console.log("Org detail loading...", org);
    return <div>Loading...</div>;
  }

  if (org.isError) {
    console.log("Org detail error...", org);
    return <div>Error loading org.</div>;
  }

  console.log('Org detail:', org);

  return (
    <OrgDetailCard
      org={org}
    />
  );
}

export default OrgDetail;