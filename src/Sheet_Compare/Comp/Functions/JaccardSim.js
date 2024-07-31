/**
 * Calculates the Jaccard similarity between two arrays of strings.
 * @param {string[]} arr1 - The first array.
 * @param {string[]} arr2 - The second array.
 * @returns {number} - The Jaccard similarity coefficient between arr1 and arr2.
 */
function jaccardSimilarity(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    const intersection = new Set([...set1].filter(item => set2.has(item)));
    const union = new Set([...set1, ...set2]);

    return intersection.size / union.size;
}

/**
 * Finds the closest array to the target array based on Jaccard similarity.
 * @param {string[][]} arrays - An array of arrays containing strings.
 * @param {string[]} targetArray - The target array to compare against.
 * @returns {string[]} - The array from the input that is closest to the target array.
 */
export function findClosestArray(arrays, targetArray) {
    let closestArray = null;
    let highestSimilarity = -1;

    for (const array of arrays) {
        const similarity = jaccardSimilarity(array, targetArray);

        if (similarity > highestSimilarity) {
            highestSimilarity = similarity;
            closestArray = array;
        }
    }

    return closestArray;
}

// Example usage:
const arrays = [
    ['apple', 'banana', 'cherry'],
    ['banana', 'cherry', 'date'],
    ['cherry', 'date', 'fig'],
    ['date', 'fig', 'grape'],
    ['fig', 'grape', 'apple'],
    ['grape', 'apple', 'banana'],
    ['apple', 'banana', 'date'],
    ['banana', 'cherry', 'fig'],
    ['cherry', 'date', 'grape'],
    ['date', 'fig', 'apple']
];

const targetArray = ['grape', 'apple', 'date'];

const closestArray = findClosestArray(arrays, targetArray);
console.log('The closest array is:', closestArray);
