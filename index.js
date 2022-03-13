const core = require("@actions/core");

async function run() {
  core.info("Info: Hello world!");
  core.debug("Debug: Hello world!");
  core.setFailed("Error: Hello world!");
}

run();
