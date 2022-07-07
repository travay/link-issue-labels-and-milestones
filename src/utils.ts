import { linkedLabelsAndMilestones } from "./graphqlQueries"
import { ILinkedLabelsAndMilestonesData } from "./types"

export const getLinkedLabelsAndMilestone = async ({ graphqlWithAuth, pr_number }) => {
  const { data }: ILinkedLabelsAndMilestonesData = await graphqlWithAuth(linkedLabelsAndMilestones(pr_number)) 

  const labels = data.resource.closingIssuesReferences.nodes.labels.edges
  const milestone_number = data.milestone.id

  console.log('LABELS', labels)
  console.log('MILESTONE', milestone_number)

  return {  labels, milestone_number }
}


export const addLabelsAndMilestoneToPR = async ({ octokit, owner, repo, issue_number, labels, milestone_number }) => {
  await octokit.rest.issues.addLabels({
    owner, 
    repo,
    issue_number,
    labels,
  })

  await octokit.rest.issues.updateMilestone({
    owner,
    repo,
    milestone_number
  })
}