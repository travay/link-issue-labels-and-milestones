export interface LinkedLabelsAndMilestonesData {
  resource: {
    closingIssuesReferences: {
      nodes: IssueNode[]
    }
  }
}

interface IssueNode {
  number: number;
  labels: {
    edges: LabelNode[]
  };
  milestone:MilestoneNode
}

interface LabelNode {
 node: {
  id: string;
  name: string;
 }
}

interface MilestoneNode {
  id: string;
  title: string;
}

