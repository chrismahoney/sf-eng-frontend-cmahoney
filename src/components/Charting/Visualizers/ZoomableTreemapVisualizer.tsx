import * as d3 from "d3";
import { useEffect, useRef } from "react";

/**
 * DOM.uid will not work in React and comes from the Observable interface.
 * Use these below.
 */
let count = 0;

/**
 * Generates a unique id for a named SVG element
 */
export function uid(name) {
  return new Id("O-" + (name == null ? "" : name + "-") + ++count);
}
function Id(id) {
  this.id = id;
  this.href = new URL(`#${id}`, location) + "";
}
Id.prototype.toString = function() {
  return "url(" + this.href + ")";
};

const ZoomableTreemapVisualizer = (props) => {
  // Accept data in expected format from parent component
  const {
    data
  } = props;

  // Must use svg ref instead of direct D3 svg selection
  const ref = useRef();

  useEffect(() => {
    // We have to clear the svg container when it re-renders
    if (ref && ref.current)
      ref.current.innerHTML = '';

    /** All D3 render code goes here **/

    // Specify the chart’s dimensions.
    const width = 928;
    const height = 400;

    // This custom tiling function adapts the built-in binary tiling function
    // for the appropriate aspect ratio when the treemap is zoomed-in.
    function tile(node, x0, y0, x1, y1) {
      d3.treemapBinary(node, 0, 0, width, height);
      for (const child of node.children) {
        child.x0 = x0 + child.x0 / width * (x1 - x0);
        child.x1 = x0 + child.x1 / width * (x1 - x0);
        child.y0 = y0 + child.y0 / height * (y1 - y0);
        child.y1 = y0 + child.y1 / height * (y1 - y0);
      }
    }

    // Compute the layout.
    const hierarchy = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    const root = d3.treemap().tile(tile)(hierarchy);

    // Create the scales.
    const x = d3.scaleLinear().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([0, height]);

    // Formatting utilities.
    const format = d3.format(",d");
    const name = d => d.ancestors().reverse().map(d => d.data.name).join("/");

    // Create the SVG container.
    /* This must be a select call instead of what's usually d3.create("svg"). We're
      using the ref to control the SVG element directly and it is already available
      for selection in D3. 
    */
    const svg = d3.select(ref.current)
        .attr("viewBox", [0.5, -60.5, width, height + 60])
        .attr("width", width)
        .attr("height", height + 60)
        .attr("style", "max-width: 100%; height: auto;")
        .style("font", "18px sans-serif");

    // Display the root.
    let group = svg.append("g")
        .call(render, root);

    function render(group, root) {
      const node = group
        .selectAll("g")
        .data(root.children.concat(root))
        .join("g");

      node.filter(d => d === root ? d.parent : d.children)
          .attr("cursor", "pointer")
          .on("click", (event, d) => d === root ? zoomout(root) : zoomin(d));

      // Zoom box text title (name & value)
      node.append("title")
          .text((d) => `${name(d)}\n${format(d.value)}`);

      node.append("rect")
          .attr("id", d => (d.leafUid = uid("leaf")).id)
          .attr("fill", d => d === root ? "#fff" : d.children ? "#ccc" : "#ddd")
          .attr("stroke", "#fff");

      node.append("clipPath")
          .attr("id", d => (d.clipUid = uid("clip")).id)
        .append("use")
          .attr("xlink:href", d => d.leafUid.href);

      // Position and styling conditionals for node text elements
      // Splits on backslash and space characters, arranges text within
      // clip path
      node.append("text")
          .attr("clip-path", d => d.clipUid)
          .attr("font-weight", d => d === root ? "700" : null)
        .selectAll("tspan")
        // This is your dynamic header to describe context
        // of current level. Interests -> Matches -> Role -> Orgs -> Roles etc.
        .data(d => (d.data.name).split(/[\/\ ]/g).concat(d.value ? format(d.value) : ""))
        .join("tspan")
          .attr("x", 10)
          .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
          .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
          .attr("font-weight", (d, i, nodes) => { d === root ? "normal" : "700" })
          .attr("fill", (d, i, nodes) => i === nodes.length - 1 ? "#fff" : "#fff")
          .text(d => d);  

      group.call(position, root);
    }

    // Positioning of treemap nodes based on zoom level
    function position(group, root) {
      group.selectAll("g")
          .attr("transform", d => d === root ? `translate(0,-60)` : `translate(${x(d.x0)},${y(d.y0)})`)
        .select("rect")
          // Control the conditional properties of the treemap rects
          .attr("fill", d => d === root ? "#27086E" : "#29A6E1")
          .attr("width", d => (d === root ? width : x(d.x1) - x(d.x0)) + 60)
          .attr("height", d => d === root ? 60 : y(d.y1) - y(d.y0));
    }

    // When zooming in, draw the new nodes on top, and fade them in.
    function zoomin(d) {
      const group0 = group.attr("pointer-events", "none");
      const group1 = group = svg.append("g").call(render, d);

      x.domain([d.x0, d.x1]);
      y.domain([d.y0, d.y1]);

      svg.transition()
          .duration(750)
          .call(t => group0.transition(t).remove()
            .call(position, d.parent))
          .call(t => group1.transition(t)
            .attrTween("opacity", () => d3.interpolate(0, 1))
            .call(position, d));
    }

    // When zooming out, draw the old nodes on top, and fade them out.
    function zoomout(d) {
      const group0 = group.attr("pointer-events", "none");
      const group1 = group = svg.insert("g", "*").call(render, d.parent);

      x.domain([d.parent.x0, d.parent.x1]);
      y.domain([d.parent.y0, d.parent.y1]);

      svg.transition()
          .duration(750)
          .call(t => group0.transition(t).remove()
            .attrTween("opacity", () => d3.interpolate(1, 0))
            .call(position, d))
          .call(t => group1.transition(t)
            .call(position, d.parent));
    }

      /** There is not a need to return from this useEffect block 
       *  because a ref to the SVG element is being used to control it instead. **/
    }, [data]);

  // Render svg with explicit bounds and ref
  return <svg id="treemap-visualizer" ref={ref} />;
};

export default ZoomableTreemapVisualizer;