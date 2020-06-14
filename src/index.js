const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

const projectWorkspace = vscode.workspace.workspaceFolders[0].uri
  .toString()
  .split(":")[1];

module.exports = (text) => {
  fs.readdir(projectWorkspace, (err, files) => {
    if (err) {
      console.log("Unable to read workspace files");
      return;
    }

    if (files.find((file) => file == ".git")) {
      if (files.find((file) => file == ".env")) {
        // add text to env
        const matchedText = text.split("=");
        const key = matchedText[0].trim().split(' ')[1];
        const value = matchedText[1].trim();
        if (!key || !value) {
          console.log("Cannot add line to env");
          return;
        }
        const data = `${key}=${value}\r\n`;
        try {
          fs.appendFileSync(`${projectWorkspace}/.env`, data);
        } catch (e) {
          console.log("Cannot write .env file: ", e);
        }
      } else {
        // create .env
      }
    }
  });
};
