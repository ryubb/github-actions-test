const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
  core.info("Info: Hello world!");
  console.log("デバッグ中です");

  const myToken = core.getInput("access-token");
  const octokit = github.getOctokit(myToken);
  const data = await octokit.rest.pulls;

  const pullRequestBody = github.context.payload.pull_request.body;
  const pattern = /^#notion\s*(https:\/\/www.notion.so\/.+)/;
  const result = pattern.exec(pullRequestBody);

  console.log("result is");
  console.log(result);
}

run();
