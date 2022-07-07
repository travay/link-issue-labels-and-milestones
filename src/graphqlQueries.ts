export const linkedIssuesQuery = (pr_number: number) => `
query linkedIssues { 
  resource(url:"https://github.com/travay/client/pull/${pr_number}") { 
    ... on PullRequest {
      closingIssuesReferences(first:10) {
        nodes {
          number
        }
      }
    }
  }
}
`


export const linkedLabelsAndMilestones = (pr_number: number) => {
  const queryUrl = `https://github.com/travay/client/pull/${pr_number}`
  const queryString = `
    query linkedIssues($queryString: URI!) { 
      resource(url:$queryString) { 
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