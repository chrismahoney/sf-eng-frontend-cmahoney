import { Container, Center, Group, Flex } from "@mantine/core";
import { useRouteError } from "react-router-dom";

export default function ErrorRoute () {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <p>Error while attempting route.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </>
  );
}