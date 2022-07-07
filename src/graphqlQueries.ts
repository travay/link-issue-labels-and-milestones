export const linkedLabelsAndMilestones = (pr_number: number) => {
  const queryUrl = encodeURIComponent(`https://github.com/travay/client/pull/${pr_number}`)
  const queryString = `
    query linkedIssues($queryString: URI!) { 
      resource(url: $queryString) { 
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