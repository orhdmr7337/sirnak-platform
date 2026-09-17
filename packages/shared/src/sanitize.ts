const HTML_TAG_REGEX = /<[^>]*>/g;
const MULTIPLE_SPACES_REGEX = /\s+/g;

export function sanitizeInput(input: string, maxLength = 1000): string {
  return input
    .replace(HTML_TAG_REGEX, "")
    .trim()
    .replace(MULTIPLE_SPACES_REGEX, " ")
    .slice(0, maxLength);
}
