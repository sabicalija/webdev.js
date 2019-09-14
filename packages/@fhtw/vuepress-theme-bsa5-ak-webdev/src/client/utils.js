const diff = (text, sub) => text.split(sub).join("");
const diffValidate = (text, sub) => text !== diff(text, sub);
const isWithinSubDir = (index, path, level = 1) => {
  if (level > 0 && diffValidate(path, index)) {
    const dirLevel = diff(path, index).split("/").length;
    return dirLevel > 0 && dirLevel <= level + 1;
  }
  return false;
};

export { diff, diffValidate, isWithinSubDir };
