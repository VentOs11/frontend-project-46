import formatStylish from './stylish.js';
import plainStylish from './plain.js';

const formatter = (tree, formatName) => {
  // let format;
  // return format = {
  //   stylish: formatStylish(tree),
  //   plain: plainStylish(tree),
  //   json: JSON.stringify(tree),
  //   error: `The ${formatName} format is supported.\n supported formats: stylish, plain, json`,
  // }
  switch (formatName) {
    case 'stylish':
      return formatStylish(tree);
    case 'plain':
      return plainStylish(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(
        `The ${formatName} format is supported.\n supported formats: stylish, plain, json`,
      );
  }
};
export default formatter;
