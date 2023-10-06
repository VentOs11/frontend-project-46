import formatStylish from './stylish.js';
import plainStylish from './plain.js';

const formatter = (tree, formatName) => {
  const formatters = {
    stylish: formatStylish,
    plain: plainStylish,
    json: JSON.stringify,
    error: `The ${formatName} format is supported.\n supported formats: stylish, plain, json`,
  };
  const format = formatters[formatName];
  if (!format) {
    throw new Error(`The ${formatName} format is supported.\n supported formats: stylish, plain, json`);
  }
  return format(tree);
  // switch (formatName) {
  //   case 'stylish':
  //     return formatStylish(tree);
  //   case 'plain':
  //     return plainStylish(tree);
  //   case 'json':
  //     return JSON.stringify(tree);
  //   default:
  //     throw new Error(
  //       `The ${formatName} format is supported.\n supported formats: stylish, plain, json`,
  //     );
  // }
};
export default formatter;
