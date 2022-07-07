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
  const queryURL = `https://github.com/travay/client/pull/${pr_number}`
  const queryString = `
    query linkedIssues($query_string: String!) { 
      resource(url:$query_string) { 
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
      },
      query_string
    }
  `

  return { queryString, queryURL }
}