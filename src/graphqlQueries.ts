export const linkedLabelsAndMilestonesQueryString = `
  query linkedLabelsAndMilestones($name: String!, $owner: String!, $number: Int!) {
    repository(name: $name, owner: $owner) {
      pullRequest(number: $number) {
        id
        body
        closingIssuesReferences(first: 10) {
          nodes {
            number
            body
            title
            milestone {
              id
              number
              title
            }
            labels(first: 10) {
              nodes {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;