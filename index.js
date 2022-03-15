const github = require("@actions/github");
const core = require("@actions/core");
const { Client } = require("@notionhq/client");

const notionKey = core.getInput("notion-key");
const statusProperty = core.getInput("status-property");
const statusValue = core.getInput("status-value");

const notion = new Client({
  auth: notionKey,
});

async function updatePage(pageId, statusProperty, statusValue) {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        [statusProperty]: {
          select: {
            name: statusValue,
          },
        },
      },
    });
  } catch (error) {
    console.error("errorが発生しました");
    console.error(error.body);
  }
}

function getPageId(url) {
  const pattern = /^.*-(\w+)$/;
  const result = pattern.exec(url);
  return result && result[1];
}

async function run() {
  core.info("Info: Hello world!");
  console.log("デバッグ中です");

  // workflow example:
  // access-token: ${{ secrets.GITHUB_TOKEN }}
  // const octokit = github.getOctokit(core.getInput("github-token"));
  // const data = await octokit.rest.pulls;

  const pullRequestBody = github.context.payload.pull_request.body;
  const pattern = /^#notion\s*(https:\/\/www.notion.so\/.+)/;
  const result = pattern.exec(pullRequestBody);
  const notionPageUrl = result && result[1];
  const pageId = getPageId(notionPageUrl);

  await updatePage(pageId, statusProperty, statusValue);
  console.log("ページの更新が完了しました");
}

run();
