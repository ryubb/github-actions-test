const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
  core.info("Info: Hello world!");
  console.log("デバッグ中です");

  const myToken = core.getInput("access-token");
  const octokit = github.getOctokit(myToken);
  const data = await octokit.rest.pulls;
  console.log(data);
}

run();
