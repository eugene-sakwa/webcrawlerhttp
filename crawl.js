const { JSDOM} = require('jsdom')

const getURLsFromHTML = (htmlBody, baseURL) => {
  const urls = [];
  const dom = new JSDOM( htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a')
  for( let linkElement of linkElements){
    urls.push(linkElement.href);
  }
  return urls;
};

const normalizeURL = (urlString) => {
  const urlObj = new URL(urlString);
  const hostpath = `${urlObj.hostname}${urlObj.pathname}`;
  return hostpath.length && hostpath.slice(-1) === "/"
    ? hostpath.slice(0, -1)
    : hostpath;
};

module.exports = { normalizeURL, getURLsFromHTML };
