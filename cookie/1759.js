const fs = require("fs");
const [input, rest] = fs.readFileSync(0, "utf8").trim().split("\n");

const [l, c] = input.split(" ").map(Number);
const alphabets = rest.split(" ").sort((a, b) => a.localeCompare(b));

const vowels = new Set(["a", "e", "i", "o", "u"]);

const answerList = [];

const backTracking = (start, password, vowelCount, consonantsCount) => {
  if (password.length === l) {
    if (vowelCount >= 1 && consonantsCount >= 2) {
      answerList.push(password.join(""));
    }
    return;
  }

  for (let i = start; i < c; i++) {
    const alphabet = alphabets[i];
    const isVowel = vowels.has(alphabet);

    backTracking(i + 1, [...password, alphabet], vowelCount + isVowel, consonantsCount + !isVowel);
  }
};

backTracking(0, [], 0, 0);
console.log(answerList.join("\n"));
