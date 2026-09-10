// Failed experiments data structure
// Each failure should support: id, title, status, reason, learned, nextTime

export const failures = [
  {
    id: "failure-001",
    title: "Initial Skills Graph Layout",
    status: "failed",
    reason:
      "The first graph layout relied too heavily on automatic positioning and produced a cluttered network. Nodes became difficult to read and the large number of relationships created excessive visual noise.",
    learned:
      "A graph with many skills and project relationships needs controlled positioning and a clear visual hierarchy. Automatically spreading nodes does not always produce a readable interface.",
    nextTime:
      "Start with a deterministic layout and design the information hierarchy before adding more visual complexity."
  },

  {
    id: "failure-002",
    title: "First LAB Layout",
    status: "failed",
    reason:
      "The initial LAB presentation displayed experiments in a long vertical sequence, making the section unnecessarily long and requiring too much scrolling.",
    learned:
      "The LAB contains smaller experiments, so the presentation should be compact and scannable rather than giving every experiment the same visual weight as a major project.",
    nextTime:
      "Use a more compact horizontal or grid-based presentation and reserve detailed views for experiments that need additional context."
  }
];