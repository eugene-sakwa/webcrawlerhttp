const { JSDOM } = require("jsdom");

const crawlPage = async (baseURL, currentURL, pages) => {
  const bareURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (bareURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);

  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  console.log(`actively crawling: ${currentURL}`);
  try {
    const res = await fetch(currentURL);

    if (res.status > 399) {
      console.log(
        `error in fetch with status code: ${res.status} on page ${currentURL}`
      );
      return pages;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non-html response, content-type: ${contentType} on page ${currentURL}`
      );
      return pages;
    }

    const htmlBody = await res.text();

    const nextURLs = getURLsFromHTML( htmlBody, baseURL);

    for( const nextURL of nextURLs){
      pages = await crawlPage( baseURL, nextURL, pages);
    }

  } catch (error) {
    console.log(
      `Invalid url encountered: ${error.message}, on page ${currentURL}`
    );
  }
  return pages;
};


const getURLsFromHTML = (htmlBody, baseURL) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (let linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with relative url: ${err.message}`);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with absolute url: ${err.message}`);
      }
    }
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

module.exports = { normalizeURL, getURLsFromHTML, crawlPage };
