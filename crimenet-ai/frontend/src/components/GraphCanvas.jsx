import React, { useEffect, useRef } from "react";
import Sigma from "sigma";
import { generateWepesiGraph } from "../lib/graph-data";

export default function GraphCanvas({ onNodeClick }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const graph = generateWepesiGraph();

    const sigma = new Sigma(graph, containerRef.current, {
      allowInvalidContainer: true,
      defaultNodeType: "circle",
      nodeReducer: (node, data) => ({
        ...data,
        // Force render type to a built-in program so custom semantic types
        // like "person" or "company" don't break Sigma.
        type: "circle",
        borderColor: data.risk > 85 ? "#FF0022" : undefined,
        borderWidth: data.risk > 85 ? 5 : 0,
        label: data.label,
      }),
      edgeReducer: (edge, data) => ({
        ...data,
        // Force a built-in edge render type so semantic types like "command"
        // don't break Sigma.
        type: "line",
        color: data.color || "#333",
        size: data.size || 2,
      }),
    });

    sigma.on("clickNode", ({ node }) => {
      const attrs = graph.getNodeAttributes(node);
      if (onNodeClick) onNodeClick({ id: node, ...attrs });
    });

    sigma.on("clickStage", () => {
      if (onNodeClick) onNodeClick(null);
    });

    return () => sigma.kill();
  }, [onNodeClick]);

  return <div ref={containerRef} className="absolute inset-0" />;
}
