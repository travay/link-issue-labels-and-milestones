import * as core from '@actions/core'
import * as github from '@actions/github'
import { addLabelsAndMilestoneToPR, getLinkedLabelsAndMilestone } from './utils';

const main = async() => {
  try {
    const owner = core.getInput('owner');
    const repo = core.getInput('repo')
    const myToken = core.getInput('myToken');
    const pr_number = parseInt(core.getInput('pr_number'))
  
    console.log('INPUTS', { owner, repo, myToken, pr_number })
  
    const octokit = github.getOctokit(myToken)
  
    const graphqlWithAuth = octokit.graphql.defaults({
      headers: {
        authorization: myToken,
      }
    })
  
    const { labels, milestone_number } = await 
      getLinkedLabelsAndMilestone({
        graphqlWithAuth, 
        pr_number,
      })
  
    if(labels.length === 0 && !milestone_number) {
      throw Error('No linked issues. Please link the PR to an existing issue, or create an issue that outlines the problem solved with this pull request.')
    }
  
    await addLabelsAndMilestoneToPR({ 
      octokit,
      owner,
      repo,
      labels,
      issue_number: pr_number, 
      milestone_number 
    })

  } catch(err) {
    core.setFailed(err.message)
  }
}

main()
