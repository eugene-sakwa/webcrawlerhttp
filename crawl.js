const normalizeURL = urlString => {
  const urlObj = new URL(urlString);
  const hostpath = `${urlObj.hostname}${urlObj.pathname}`;
  return hostpath.length && hostpath.slice(-1) ==='/' ? hostpath.slice(0, -1): hostpath;
};

module.exports = normalizeURL;
