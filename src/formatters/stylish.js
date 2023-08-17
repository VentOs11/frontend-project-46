import _ from 'lodash';

const ident = (depth, isFull) => (isFull ? ' '.repeat(depth * 4) : ' '.repeat(depth * 4 - 2));

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object.entries(data).flatMap(([key, value]) => `${ident(depth + 1, true)}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${ident(depth, true)}}`;
};

const iter = (tree, depth) => tree.flatMap((node) => {
  switch (node.type) {
    case 'removed': {
      return `${ident(depth, false)}- ${node.key}: ${stringify(node.value, depth)}`;
    }
    case 'added': {
      return `${ident(depth, false)}+ ${node.key}: ${stringify(node.value, depth)}`;
    }
    case 'changed': {
      const output1 = `${ident(depth, false)}- ${node.key}: ${stringify(node.value1, depth)}`;
      const output2 = `${ident(depth, false)}+ ${node.key}: ${stringify(node.value2, depth)}`;
      return `${output1}\n${output2}`;
    }
    case 'unchanged': {
      return `${ident(depth, true)}${node.key}: ${stringify(node.value, depth)}`;
    }
    case 'nested': {
      const output = iter(node.children, depth + 1).join('\n');
      return `${ident(depth, true)}${node.key}: {\n${output}\n${ident(depth, true)}}`;
    }
    default:
      throw new Error(`Wrong node type.`);
  }
});

const formatStylish = (tree) => {
  const result = iter(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};
export default formatStylish;
