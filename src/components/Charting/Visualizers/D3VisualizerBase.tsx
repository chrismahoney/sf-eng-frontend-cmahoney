import { Container, Group, Paper } from '@mantine/core'
import CollapsibleTreeVisualizer from './CollapsibleTreeVisualizer';
import NestedTreeVisualizer from './NestedTreeVisualizer';

/**
 * D3VisualizerBase: Contains display type, configuration and data input for the visualizer.
 * @param props Data and configuration for visualization use
 */
function D3VisualizerBase(props) {
  const {
    data
  } = props;

  return (
    <Group justify="flex-start" align="flex-start">
      <NestedTreeVisualizer
        data={data}
      />
    </Group>
  )
}

export default D3VisualizerBase