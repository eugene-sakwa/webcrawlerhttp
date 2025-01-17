const { crawlPage } = require("./crawl");


const main = () => {
  if(process.argv.length < 3){
    console.log(`Please pass in a valid url`);
    process.exit(1);
  }
  if(process.argv.length > 3){
    console.log(`You have provide excess arguments `);
    process.exit(1);
  }
const baseURL = process.argv[2];
  console.log(`Starting crawl of ${baseURL}...`)
  crawlPage(baseURL);
};


main();