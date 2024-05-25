import { Grid, Paper, Title, Tree, Text } from "@mantine/core";

function OrgDetailCard (props) {
  const {
    org
  } = props;
  console.log(org);

  const roleData = org.roles.map((role) => {
    return {
      value: role,
      label: role
    }
  });
  const matchData = org.matches.map((match) => {
    return {
      value: match.role,
      label: match.role
    }
  });

  return (
    <p>Organization Detail</p>
  );
}

export default OrgDetailCard;