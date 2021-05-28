# Umzugsauktion Task Assigment with Serverless Nodejs Rest API and TypeScript

## Invoke the function locally

```bash
serverless invoke local --function print --data '{"pathParameters":{"x":"3", "y": "5"}}'
```
## Deploy

### To Test It Locally

* Run ```npm install``` to install all the necessary dependencies.
* Run ```npm run local``` use serverless offline to test locally. 

### Deploy on AWS, simply run:

```
$ npm run deploy

# or

$ npm run deploy:dev

## Usage
There is already an available version for you to test it.

```
curl https://66eniktko1.execute-api.us-east-1.amazonaws.com/dev/print/{x}/{y}
```