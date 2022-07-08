export const linkedLabelsAndMilestones = (pr_number: number) => {
  const queryUrl = encodeURI(`https://github.com/travay/client/pull/${pr_number}`)
  const queryString = `
    query linkedIssues($queryUrl: URI!) { 
      resource(url: $queryUrl) { 
        ... on PullRequest {
          closingIssuesReferences(first:5) {
            nodes {
              number, 
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