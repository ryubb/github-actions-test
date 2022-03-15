const github = require("@actions/github");
const core = require("@actions/core");
const { Client, APIResponseError } = require("@notionhq/client");

const notionKey = core.getInput("notion-key");
const statusProperty = core.getInput("status-property");
const statusValue = core.getInput("status-value");

const notion = new Client({
  auth: notionKey,
});

async function updatePage(
  pageId: string,
  statusProperty: string,
  statusValue: string,
): Promise<void> {
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
  } catch (error: typeof APIResponseError) {
    core.setFailed("pageIdの取得に失敗しました");
    console.error(error.body.message);
  }
}

function getPageId(url: string): string | null {
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

  if (!notionPageUrl) {
    core.setFailed("notionのURLがPRに記載されていません");
    return;
  }

  const pageId = getPageId(notionPageUrl);
  if (!pageId) {
    core.setFailed("pageIdの取得に失敗しました");
    return;
  }

  await updatePage("pageId", statusProperty, statusValue);
  console.log("ページの更新が完了しました");
}

run();
