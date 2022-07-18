export interface LinkedLabelsAndMilestonesData {
  repository: {
    pullRequest: {
      closingIssuesReferences: {
        nodes: IssueNode[];
      }
    }
  }
}

interface IssueNode {
  number: number;
  milestone: {
    id: string;
    number: number;
    title: string;
  }
  labels: {
    nodes:  Array<{
      id: string;
      name: string;
    }>
  }
}

