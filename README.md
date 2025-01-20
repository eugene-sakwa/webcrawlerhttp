# Web Crawler HTTP

A lightweight and efficient web crawler built using Node.js that scans web pages, extracts links, and generates a detailed report of all crawled URLs and their respective link counts.

## Features

- Crawl websites recursively, starting from a base URL.
- Extract and normalize URLs from HTML content.
- Generate a report showing the number of links pointing to each page.
- Handle various edge cases such as non-HTML content, invalid URLs, and cross-origin restrictions.
- Comprehensive unit tests to ensure code reliability.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for dependency management

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:eugene-sakwa/webcrawlerhttp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd webcrawlerhttp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Run the web crawler by providing a valid base URL as a command-line argument:

```bash
node index.js https://example.com
```

### Example Output

```plaintext
Starting crawl of https://example.com...
actively crawling: https://example.com
actively crawling: https://example.com/about
actively crawling: https://example.com/contact
===========
REPORT
===========
Found 5 links to page: https://example.com
Found 2 links to page: https://example.com/about
Found 1 link to page: https://example.com/contact
===========
END REPORT
===========
```

## Code Overview

### Key Files

- **main.js**: Entry point of the application. Handles argument parsing, initiates the crawling process, and displays the final report.
- **crawl.js**: Contains functions for crawling web pages, extracting URLs, and normalizing URLs.
- **report.js**: Responsible for sorting pages by link count and printing the report.

### Main Functions

#### `crawlPage(baseURL, currentURL, pages)`
Recursively crawls pages, normalizing and counting links.

#### `getURLsFromHTML(htmlBody, baseURL)`
Extracts absolute and relative links from HTML content.

#### `normalizeURL(urlString)`
Normalizes URLs by removing protocols, trailing slashes, and capitalization.

#### `sortPages(pages)`
Sorts URLs based on the number of links pointing to them.

#### `printReport(pages)`
Prints the sorted list of URLs and their link counts.

## Testing

Run the test suite using Jest:

```bash
npm test
```

### Example Test Cases

- **normalizeURL**: Ensures consistent URL normalization.
- **getURLsFromHTML**: Validates correct extraction of absolute and relative URLs.
- **sortPages**: Verifies accurate sorting of pages by link count.

### Sample Output

```plaintext
PASS  ./crawl.test.js
PASS  ./report.test.js
Test Suites: 2 passed, 2 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        0.916 s
```

## Contributions

Contributions are welcome! Please fork the repository, create a new branch for your feature or bug fix, and submit a pull request.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as needed.

---

### Author

Eugene Sakwa

[GitHub Repository](https://github.com/eugene-sakwa/webcrawlerhttp)

