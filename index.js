const core = require("@actions/core");

async function run() {
  core.info("Info: Hello world!");
  console.log("デバッグ中です");

  const testInput = core.getInput("test-input");
  core.info(testInput);
}

run();
