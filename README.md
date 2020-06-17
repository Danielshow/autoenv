# Autoenv

This extension allows you to add a variable to `env` file and `sample-env` file automatically by right clicking on the line and click on `Add Line to env`.


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

## Requirements

- None

## Known Issues

- No issues

## Release Notes

### 1.0.0

Initial release of autoenv

**Enjoy!**
https://marketplace.visualstudio.com/items?itemName=danielshow.autoenv&ssr=false
