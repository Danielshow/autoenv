const vscode = require("vscode");
const fs = require("fs");
const { checkIfEnvExist, replaceEditorText} = require('./utils');

const projectWorkspace = vscode.workspace.workspaceFolders[0].uri
  .toString()
  .split(":")[1];

module.exports = (text, fileContents, fileName, line) => {
  fs.readdir(projectWorkspace, (err, files) => {
    if (err) {
      console.log("Unable to read workspace files");
      return;
    }

    if (files.find((file) => file == ".git")) {
      const matchedText = text.split("=");
      const key = matchedText[0].trim().split(" ")[1];
      const value = matchedText[1].trim();
      if (!key || !value) {
        vscode.window.showErrorMessage("Cannot add line to env");
        return;
      }
      const data = `${key}=${value}\r\n`;
      if (files.find((file) => file == ".env")) {
        if (checkIfEnvExist(key)) {
          replaceEditorText(fileContents, line, fileName, key);
          return;
        }
        try {
          fs.appendFileSync(`${projectWorkspace}/.env`, data);
          fs.appendFileSync(`${projectWorkspace}/sample-env`, `${key}=\r\n`);
        } catch (e) {
          console.log("Cannot write .env file: ", e);
          vscode.window.showErrorMessage("Cannot write .env file");
        }
      } else {
        fs.appendFileSync(`${projectWorkspace}/.env`, data);
        fs.appendFileSync(`${projectWorkspace}/sample-env`, `${key}=\r\n`);
      }

      replaceEditorText(fileContents, line, fileName, key);
      vscode.window.showInformationMessage("Env added to .env file");
    }
  });
};
