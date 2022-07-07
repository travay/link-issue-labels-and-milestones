export interface ILinkedLabelsAndMilestonesData {
  data: {
    resource: Labels
    milestone: Milestone
  }
 
}

interface Labels {
  closingIssuesReferences: {
    nodes: {
      number: number;
      labels: {
        edges: Array<{
          id: string;
          name: string;
        }>
      }
    }
  }
}

interface Milestone {
  id: string;
  title: string;
}

