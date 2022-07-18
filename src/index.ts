import * as core from '@actions/core'
import * as github from '@actions/github'
import { graphql } from '@octokit/graphql';
import { linkedLabelsAndMilestonesQueryString } from './graphqlQueries';
import { LinkedLabelsAndMilestonesData } from './types';

const main = async () => {
  try {
    const owner = core.getInput("owner");
    const repo = core.getInput("repo");
    const myToken = core.getInput("myToken");
    const pr_number = parseInt(core.getInput("pr_number"));

    const octokit = github.getOctokit(myToken);
    const labels: string[] = [];
    let milestones: number[] = [];

    const data: LinkedLabelsAndMilestonesData = await graphql({
      query: linkedLabelsAndMilestonesQueryString,
      name: repo, 
      owner: owner, 
      number: pr_number, 
      headers: {
        authorization: "bearer " + myToken,
      },
    });

    const linkedIssues = data?.repository?.pullRequest?.closingIssuesReferences?.nodes

    if(!linkedIssues) {
      throw Error('Could not find linked issues')
    }

    // Find and store all labels
    linkedIssues.forEach((issue) => {
      issue.labels.nodes.forEach(
        (issueLabel) => labels.push(issueLabel.name)
      )
    })

    // Find and store all milestones
    linkedIssues.forEach((issue) => {
      milestones.push(issue.milestone.number)
    })
  
    if(labels.length === 0) {
      throw Error('Linked issue has no labels, please make sure to appropriately label the issue linked to this PR.')
    }
  
    if( milestones.length === 0) {
      throw Error('Linked issue has no milestone, please make sure to add a milestone to the issue linked to this PR.')
    }
  
    // Add milestone and labels to PR
    await octokit.rest.issues.update({
      owner,
      repo,
      issue_number: pr_number,
      milestone: milestones[milestones.length - 1],
      labels,
    })

    // Find all labels
    // resource.closingIssuesReferences.nodes.forEach((issue) => {
    //   issue.labels.edges.forEach((issueLabels) =>
    //     labels.push(issueLabels.node.name)
    //   );
    // });

    // // Find all milestones
    // resource.closingIssuesReferences.nodes.forEach((issue) => {
    //   milestones.push(issue.milestone.number);
    // });

    // if (labels.length === 0) {
    //   throw Error(
    //     "Linked issue has no labels, please make sure to appropriately label the issue linked to this PR."
    //   );
    // }

    // if (milestones.length === 0) {
    //   throw Error(
    //     "Linked issue has no milestone, please make sure to add a milestone to the issue linked to this PR."
    //   );
    // }

    // // Add milestone to PR
    // await octokit.rest.issues.update({
    //   owner,
    //   repo,
    //   issue_number: pr_number,
    //   milestone: milestones[milestones.length - 1],
    //   labels,
    // });
  } catch (err) {
    core.setFailed(err.message);
  }
};

main();
