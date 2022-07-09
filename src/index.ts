import * as core from '@actions/core'
import * as github from '@actions/github'
import { graphql } from '@octokit/graphql';
import { linkedLabelsAndMilestones } from './graphqlQueries';
import { ILinkedLabelsAndMilestonesData } from './types';

const main = async() => {
  try {
    const owner = core.getInput('owner');
    const repo = core.getInput('repo')
    const myToken = core.getInput('myToken');
    const pr_number = parseInt(core.getInput('pr_number'))
  
    console.log('INPUTS', { owner, repo, myToken, pr_number })

    const octokit = github.getOctokit(myToken)

    // Get labels and milestones of issues linked to the PR
    const { queryString, queryUrl  } = linkedLabelsAndMilestones(pr_number)
    console.log({ queryString, queryUrl })
    const { data }: ILinkedLabelsAndMilestonesData = await graphql({
      query: queryString,
      queryUrl,
      headers: {
        authorization: 'bearer ' + myToken
      }
    }) 

    console.log('QUERY RESULT', data)

    const labels = data.resource.closingIssuesReferences.nodes.labels.edges
    const milestone_number = parseInt(data.milestone.id)
  
    console.log('LABELS', labels)
    console.log('MILESTONE', milestone_number)
  
  
    if(labels.length === 0 && !milestone_number) {
      throw Error('No linked issues. Please link the PR to an existing issue, or create an issue that outlines the problem solved with this pull request.')
    }
  
    // Add labels to PR
    await octokit.rest.issues.addLabels({
      owner, 
      repo,
      issue_number: pr_number,
      labels,
    })
  
    // Add milestone to PR
    await octokit.rest.issues.updateMilestone({
      owner,
      repo,
      milestone_number,
    })

  } catch(err) {
    core.setFailed(JSON.stringify(err))
  }
}

main()
