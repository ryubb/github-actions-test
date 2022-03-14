const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
  core.info("Info: Hello world!");
  console.log("デバッグ中です");

  const myToken = core.getInput("access-token");
  console.log(myToken);
  const octokit = github.getOctokit(myToken);
  console.log(octokit);
}

run();
