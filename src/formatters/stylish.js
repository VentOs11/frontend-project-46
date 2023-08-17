import _ from 'lodash';

const replacer = ' ';

const ident = (depth, isFull) => (isFull ? ' '.repeat(depth * 4) : ' '.repeat(depth * 4 - 2));

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object.entries(data).flatMap(([key, value]) => `${ident(depth + 1, true)}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${ident(depth, true)}}`;
};

const iter = (diff, depth = 1) => diff.map((node) => {
  switch (node.type) {
    case 'deleted':
      return `${ident(depth)}- ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'added':
      return `${ident(depth)}+ ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'changed': {
      return `${ident(depth)}- ${node.key}: ${stringify(
        node.value1,
        depth,
      )}\n${ident(depth)}+ ${node.key}: ${stringify(
        node.value2,
        depth,
      )}`;
    }
    case 'unchanged':
      return `${ident(depth)}${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'nested': {
      const lines = iter(node.children, depth + 1);
      return `${ident(depth)}${node.key}: {\n${lines.join(
        '\n',
      )}\n${ident(depth)}}`;
    }
    default:
      throw new Error(`Unknown type of node '${node.type}'.`);
  }
});

const formatStylish = (tree) => {
  const result = iter(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};
export default formatStylish;
