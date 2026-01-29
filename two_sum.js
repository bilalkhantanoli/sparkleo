/**
 * Given an array of integers nums and an integer target,
 * return the indices of the two numbers such that they add up to target.
 *
 * Approach: Hash Map (Two-pass)
 * - First pass: Store each number and its index in a map
 * - Second pass: For each number, check if (target - number) exists in the map
 * - Time Complexity: O(n)
 * - Space Complexity: O(n)
 */
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement) && map.get(complement) !== i) {
      return [i, map.get(complement)];
    }
  }

  return [];
}

// testCases
const testCases = [
  { nums: [2, 7, 11, 15], target: 18, expected: [1, 2] },
  { nums: [3, 2, 4], target: 6, expected: [1, 2] },
  { nums: [3, 3], target: 6, expected: [0, 1] },
];

console.log("=== Two Sum Test Results ===\n");

testCases.forEach((testCase, index) => {
  const result = twoSum(testCase.nums, testCase.target);
  const passed =
    JSON.stringify(result.sort((a, b) => a - b)) ===
    JSON.stringify(testCase.expected.sort((a, b) => a - b));

  console.log(`Test ${index + 1}:`);
  console.log(`Input: nums = [${testCase.nums}], target = ${testCase.target}`);
  console.log(`Output: [${result}]`);
});

module.exports = { twoSum };
