const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

const projectWorkspace = vscode.workspace.workspaceFolders[0].uri
  .toString()
  .split(":")[1];

const checkIfEnvExist = (key) => {
  let filesInEnv = fs.readFileSync(`${projectWorkspace}/.env`, "utf8");
  filesInEnv = filesInEnv.split("\n").filter(Boolean);
  let found = false;
  filesInEnv.forEach((line) => {
    if (line.split("=")[0].trim() == key) {
      found = true;
      vscode.window.showErrorMessage("ENV already exists in .env file");
    }
  });
  return found;
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

      // add file
      fileContents = replaceLineBreak(fileContents);
      // get line
      let line_text = fileContents[line];
      line_text.replace()
      line_text = `${line_text.split("=")[0]} = process.env.${key};`;
      fileContents[line] = line_text;
      // remap
      fileContents = addLineBreak(fileContents);
      fs.writeFileSync(path.join(fileName), fileContents.join("\n"));
      vscode.window.showInformationMessage("Env added to .env file");
    }
  });
};
