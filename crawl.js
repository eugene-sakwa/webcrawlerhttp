const { JSDOM } = require("jsdom");

const crawlPage = async (currentURL) => {
  console.log(`actively crawling: ${currentURL}`);

  try {
    const res = await fetch(currentURL);

    if (res.status > 399) {
      console.log(
        `error in fetch with status code: ${res.status} on page ${currentURL}`
      );
      return;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non-html response, content-type: ${contentType} on page ${currentURL}`
      );
      return;
    }

    console.log(await res.text());
  } catch (error) {
    console.log(
      `Invalid url encountered: ${error.message}, on page ${currentURL}`
    );
  }
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
