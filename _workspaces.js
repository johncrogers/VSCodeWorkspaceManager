module.exports.show = () => {
  const config = require("./config.js").config;
  const child_process = require("child_process");
  console.log("Opening workspace folder:");
  child_process.exec(`open ${config.pathToWorkspaces}/`);
};
module.exports.list = () => {
  const config = require("./config.js").config;
  const fs = require("fs");
  process.chdir(config.pathToWorkspaces);
  fs.readdir(process.cwd(), function(err, files) {
    if (err) {
      console.log(err);
      return;
    }
    let filter = process.argv[3];
    console.log("Current Workspaces:", filter ? `by ${filter}` : "");
    files.sort().forEach(file => {
      if (filter && file.includes(filter)) {
        console.log(`  -> ${file}`);
      }
      if (!filter) {
        console.log(`  -> ${file}`);
      }
    });
  });
};
module.exports.open = () => {
  const config = require("./config.js").config;
  const child_process = require("child_process");
  let fileName = process.argv[3];
  let path = `open ${config.pathToWorkspaces}/${fileName}.code-workspace`;
  console.log(`Opening workspace: ${process.argv[3]}`);
  console.log(`  -> path: ${path}`);
  child_process.exec(path);
};
module.exports.create = () => {
  const config = require("./config.js").config;
  const fs = require("fs");
  let fileName = `${config.pathToWorkspaces}/${process.argv[3]}.code-workspace`;
  let path = process.argv[4];
  let contents = `{
  "folders": [
    {
      "path": "${path}"
    }
  ],
  "settings": {}
}`;
  console.log(`Creating workspace: ${process.argv[3]}`);
  fs.writeFile(fileName, contents, err => {
    if (err) {
      console.log(`ERROR:`, err);
    }
  });
};
module.exports.edit = () => {
  const config = require("./config.js").config;
  const child_process = require("child_process");
  let command = `open -t ${config.pathToWorkspaces}/${
    process.argv[3]
  }.code-workspace`;
  console.log(`Open to edit: ${process.argv[3]}`);
  child_process.exec(command);
};
