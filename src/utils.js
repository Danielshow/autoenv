const fs = require("fs");
const path = require("path");
const vscode = require("vscode");

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
  
  module.exports = {
      checkIfEnvExist,
      replaceEditorText
  }