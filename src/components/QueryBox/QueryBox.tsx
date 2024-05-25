import { rem, Button } from '@mantine/core';
import { 
  Spotlight, 
  SpotlightActionData, 
  SpotlightActionGroupData,
} from '@mantine/spotlight';
import {
  IconSearch
} from '@tabler/icons-react';

const orgActions: SpotlightActionData[] = Array(325)
  .fill(0)
  .map((_, index) => ({
    id: `action-org-${index}`,
    label: `Organization ${index}`,
    description: `Organization ${index} description`,
  }));

const userActions: SpotlightActionData[] = Array(1000)
  .fill(0)
  .map((_, index) => ({
    id: `action-user-${index}`,
    label: `User ${index}`,
    description: `User ${index} description`,
  }));

const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
  {
    group: 'Users',
    actions: userActions,
  },
  {
    group: 'Organizations',
    actions: orgActions,
  }
];

function QueryBox () {
  return (
    <>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        scrollable
        centered
        limit={5}
        maxHeight={350}
        searchProps={{
          leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
          placeholder: 'Search...',
        }}
      />
    </>
  );
}

export default QueryBox;