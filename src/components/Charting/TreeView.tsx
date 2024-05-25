import { Tree } from '@mantine/core';
import { Tooltip } from 'recharts';
import { Sankey } from 'recharts'

export default function TreeView() {
  // 
  const testTreeData = [
    {
      value: 'src',
      label: 'src',
      children: [
        { value: 'src/components', label: 'components' },
        { value: 'src/hooks', label: 'hooks' },
      ],
    },
    { value: 'package.json', label: 'package.json' },
  ];

  return (
    <>
      <Tree data={testTreeData} />
    </>
  );
}