import formatStylish from './stylish.js';
import plainStylish from './plain.js';

const formatter = (tree, formatName) => {
  const formatters = {
    stylish: formatStylish,
    plain: plainStylish,
    json: JSON.stringify,
  };
  const format = formatters[formatName];
  if (!format) {
    throw new Error(`The ${formatName} format is supported.\n supported formats: stylish, plain, json`);
  }
  return format(tree);
};
export default formatter;
