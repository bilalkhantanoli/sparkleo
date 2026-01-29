/**
 * Returns the length of the longest substring without repeating characters.
 * Uses a sliding window approach, keeping track of the last seen index of each character.
 * Time complexity: O(n)
 * Space complexity: O(n)
 * @param {string} s
 * @returns {number}
 */
function lengthOfLongestSubstring(s) {
  const charMap = new Map();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // If character is found and is in the current window
    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1;
    }

    charMap.set(char, right);

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

function getLongestSubstring(s) {
  const charMap = new Map();
  let left = 0;
  let maxLength = 0;
  let maxLeft = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1;
    }

    charMap.set(char, right);

    if (right - left + 1 > maxLength) {
      maxLength = right - left + 1;
      maxLeft = left;
    }
  }

  return s.substring(maxLeft, maxLeft + maxLength);
}
// test Cases
const testCases = [
  { input: "abcabcbb", expected: 3, expectedSubstring: "abc" },
  { input: "bbbbb", expected: 1, expectedSubstring: "b" },
  { input: "pwwkew", expected: 3, expectedSubstring: "wke" },
];

testCases.forEach((testCase, index) => {
  const result = lengthOfLongestSubstring(testCase.input);
  const substring = getLongestSubstring(testCase.input);
  const passed = result === testCase.expected;

  console.log(`Test ${index + 1}:`);
  console.log(`Input: "${testCase.input}"`);
  console.log(`Output: ${result} (substring: "${substring}")`);
  console.log(
    `Expected: ${testCase.expected} (substring: "${testCase.expectedSubstring}")`,
  );
});

module.exports = { lengthOfLongestSubstring, getLongestSubstring };
