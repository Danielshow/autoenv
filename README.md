# Autoenv

This extension allows you to add a variable to `env` file and `sample-env` file automatically by right clicking on the line and click on `Add Line to env`.
Note: If only works for Javascript file at the moment. 

![danielgifs](https://user-images.githubusercontent.com/24846513/84892812-2aed5000-b096-11ea-867d-254b8545a92d.gif)

## Features

This extension save you the stress of creating .env file and sample-env file. 
To add this line to env file automatically;

```javascript
const KEY = "MysecretKey";  
```
- Right click on the line
- Click on `Add Line to env`

The line will change to:

```javascript
const KEY = process.env.KEY
```

The env and sample-env file will also be populated

## Extensions settings
This extension requires that `autoenv.filename` key be added to your VSCODE settings.json file and value should be the `sample-env` filename, if not privided it will default to `sample-env`. See example below

```json
"autoenv-filename": "sample-env"
```

## Requirements

- None

## Known Issues

- No issues

## Release Notes

### 1.0.0

Initial release of autoenv

## [1.0.1]

- Add a new Gif
- ALlow extension be compatible with previous versions of vscode

## [1.0.2]
- Fix env appending to existing env
- Choose sample-env filename from vscode settings

**Enjoy!**
https://marketplace.visualstudio.com/items?itemName=danielshow.autoenv&ssr=false
