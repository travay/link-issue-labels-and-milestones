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
  body: string;
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

