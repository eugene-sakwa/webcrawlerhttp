import {normalizeURL} from "./crawl.js";
import { test, expect } from "@jest/globals";

test("normalizeURl", () => {
  const input = '';
  const actual = normalizeURL(input);
  const expected = '';
  expect(actual).toEqual(expected);
});
