const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

const projectWorkspace = vscode.workspace.workspaceFolders[0].uri
  .toString()
  .split(":")[1];

const checkIfEnvExist = (key) => {
  let filesInEnv = fs.readFileSync(`${projectWorkspace}/.env`, "utf8");
  filesInEnv = filesInEnv.split("\n").filter(Boolean);
  for (let i = 0; i < filesInEnv.length; i++) {
    let line = filesInEnv[i];
    if (line.split("=")[0].trim() == key) {
      vscode.window.showErrorMessage("ENV already exists in .env file");
      return true;
    }
  }
  return false;
};

const replaceLineBreak = (contents) => {
  return contents.map((content) => {
    return content.split(" ").join("r--autoenv");
  });
};

const addLineBreak = (contents) => {
  return contents.map((content) => {
    return content.split("r--autoenv").join(" ");
  });
};

const replaceEditorText = (fileContents, line, fileName, key) => {
  fileContents = replaceLineBreak(fileContents);
  let line_text = fileContents[line];
  line_text = `${line_text.split("=")[0]} = process.env.${key};`;
  fileContents[line] = line_text;
  fileContents = addLineBreak(fileContents);
  fs.writeFileSync(path.join(fileName), fileContents.join("\n"));
};

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
