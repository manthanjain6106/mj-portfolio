/**
 * Unit tests for pure functions in lib/sanitize.ts
 */

import {
  sanitizeHtml,
  calculateReadingTime,
  extractHeadings,
  injectHeadingIds,
  renderArticleHtml,
} from "@/lib/sanitize";

export function runSanitizeTests() {
  console.log("Running sanitize tests...");

  // 1. sanitizeHtml: strips dangerous tags
  const dirty =
    '<p>Safe paragraph <script>alert("hack")</script><iframe src="evil.com"></iframe><b>Bold</b></p>';
  const sanitized = sanitizeHtml(dirty);
  if (sanitized.includes("<script>") || sanitized.includes("<iframe>")) {
    throw new Error("sanitizeHtml failed to strip dangerous tags");
  }
  if (
    !sanitized.includes("<p>Safe paragraph") ||
    !sanitized.includes("<b>Bold</b>")
  ) {
    throw new Error("sanitizeHtml altered safe tags");
  }

  // 2. sanitizeHtml: link attributes transformed safely
  const linkHtml = '<a href="https://example.com" onclick="steal()">Link</a>';
  const cleanLink = sanitizeHtml(linkHtml);
  if (cleanLink.includes("onclick")) {
    throw new Error("sanitizeHtml failed to strip event handlers");
  }
  if (
    !cleanLink.includes('rel="noopener noreferrer"') ||
    !cleanLink.includes('target="_blank"')
  ) {
    throw new Error(
      "sanitizeHtml failed to add safe rel/target attributes to links"
    );
  }

  // 3. calculateReadingTime: 200 words per minute pure calculation
  if (calculateReadingTime("") !== 1) {
    throw new Error("calculateReadingTime empty string should return 1");
  }
  const shortText = "<p>" + new Array(100).fill("word").join(" ") + "</p>";
  if (calculateReadingTime(shortText) !== 1) {
    throw new Error("calculateReadingTime 100 words should return 1 min");
  }
  const longText = "<p>" + new Array(450).fill("word").join(" ") + "</p>";
  if (calculateReadingTime(longText) !== 3) {
    throw new Error("calculateReadingTime 450 words should return 3 min");
  }

  // 4. extractHeadings: extracts h2 and h3
  const article = `
    <h2>First Heading</h2>
    <p>Some text</p>
    <h3>Nested Subheading</h3>
    <h4>Ignored H4</h4>
    <h2 id="custom-id">Custom ID Heading</h2>
  `;
  const headings = extractHeadings(article);
  if (headings.length !== 3) {
    throw new Error(
      `extractHeadings expected 3 headings, got ${headings.length}`
    );
  }
  if (
    headings[0].text !== "First Heading" ||
    headings[0].id !== "first-heading"
  ) {
    throw new Error("extractHeadings slugified heading ID mismatch");
  }
  if (headings[1].text !== "Nested Subheading" || headings[1].level !== 3) {
    throw new Error("extractHeadings level 3 mismatch");
  }
  if (headings[2].id !== "custom-id") {
    throw new Error("extractHeadings custom id not preserved");
  }

  // 5. injectHeadingIds: injects id attributes if missing
  const injected = injectHeadingIds(
    "<h2>No ID</h2><h3>Already <span id='x'>has no tag id</span></h3>"
  );
  if (!injected.includes('<h2 id="no-id">')) {
    throw new Error("injectHeadingIds failed to inject ID into h2");
  }

  // 6. renderArticleHtml: combines sanitization and id injection
  const rendered = renderArticleHtml(
    "<h2>Test</h2><script>bad</script><p>Text</p>"
  );
  if (rendered.includes("<script>") || !rendered.includes('<h2 id="test">')) {
    throw new Error("renderArticleHtml failed to sanitize and inject ID");
  }

  console.log("All sanitize tests passed successfully!");
}
