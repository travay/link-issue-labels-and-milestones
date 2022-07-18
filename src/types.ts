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
  title: string;
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

export interface issueDescriptionsObj {
  body: string;
  title: string;
  issue_number: number;
}
