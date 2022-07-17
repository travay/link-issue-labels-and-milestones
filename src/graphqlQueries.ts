export const linkedLabelsAndMilestones = (pr_number: number) => {
  const queryUrl = `https://github.com/travay/client/pull/${pr_number}`
  const queryString = 
  `query linkedIssues($queryUrl: URI!) { 
    resource(url: $queryUrl) { 
      ... on PullRequest {
        closingIssuesReferences(first:5) {
          nodes {
            number, 
            body,
            labels(first: 5) {
              edges {
                node {
                  id, 
                  name
                }
              }
            }, 
            milestone {
              id, 
              number,
              title
            },
          }
        }
      }
    }
  }
  `

  return { queryString, queryUrl }
}