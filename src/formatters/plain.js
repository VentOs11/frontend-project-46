import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  if (data === null) {
    return data;
  }
  return String(data);
};

const iter = (children, path) => {
  const lines = children.map((node) => {
    switch (node.type) {
      case 'added':
        return `Property '${path}${node.key}' was added with value: ${stringify(node.value)}\n`;
      case 'removed':
        return `Property '${path}${node.key}' was removed\n`;
      case 'nested':
        return iter(node.children, `${path}${node.key}.`);
      case 'changed':
        return `Property '${path}${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}\n`;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown type of data ${node.type}\n`);
    }
  });
  return lines.join('');
};

const formatPlain = (tree) => iter(tree, '').replace(/\n$/, '');

export default formatPlain;
