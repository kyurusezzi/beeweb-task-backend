const generateSimilarNames = (name, exclude, count = 3) => {
  const similarNames = [];
  for (let i = 0; i < count; i++) {
    let finalName;
    while (
      !finalName ||
      exclude.includes(finalName) ||
      similarNames.includes(finalName)
    ) {
      finalName = name + `${Math.trunc(Math.random() * 100)}`;
    }
    similarNames.push(finalName);
  }

  return similarNames;
};

module.exports = generateSimilarNames;
