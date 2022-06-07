# JavaScript/Alpaca Algorithmic Trading
## About
This repository houses work that is a part of my series on algorithmic trading with Alpaca. I have been posting explanantions for the code here on both YouTube and Medium.

## Setup
1) Clone the repository
2) Sign up for Alpaca and get API keys
3) Insert your Alpaca API keys into a file called `.env` like this:
```
API_KEY=<insert API key>
SECRET_API_KEY=<insert secret API key>
```
4) Run `npm install`
5) Run `node index.js`


## To get ts-node working 
1. Install typescript globally:
npm i typescript -g

2. Go to your project directory and link typescript to the project:
cd <my-project>
npm link typescript

3. Add type: module in package.json
"type": "module" in package.json

4. Execute ts-node using npx:
npx ts-node <your-ts-script>.ts
