function levenshteinDistance(str1, str2) {
  if (typeof str1 !== "string" || typeof str2 !== "string") {
    throw new TypeError("Both arguments must be strings.");
  }
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  const lenStr1 = str1.length + 1;
  const lenStr2 = str2.length + 1;

  const matrix = Array.from({ length: lenStr1 }, () => Array(lenStr2).fill(0));

  for (let i = 0; i < lenStr1; i++) {
    matrix[i][0] = i;
  }
  for (let j = 0; j < lenStr2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i < lenStr1; i++) {
    for (let j = 1; j < lenStr2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // Deletion
        matrix[i][j - 1] + 1, // Insertion
        matrix[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return matrix[lenStr1 - 1][lenStr2 - 1];
}

function similarityPercentage(str1, str2) {
  const levDistance = levenshteinDistance(str1, str2);
  const maxLen = Math.max(str1.length, str2.length);
  const similarity = (1 - levDistance / maxLen) * 100;
  return similarity;
}

export default function findTopMatches(target, strings, topN = 3) {
  const matches = strings.map((s) => {
    const sim = similarityPercentage(target, s);
    return { string: s, similarity: sim };
  });

  matches.sort((a, b) => b.similarity - a.similarity);

  return matches.slice(0, topN);
}
