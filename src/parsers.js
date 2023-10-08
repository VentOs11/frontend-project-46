import YAML from 'js-yaml';

export default (data, formatExtension) => {
  const formats = {
    json: JSON.parse,
    yml: YAML.load,
    yaml: YAML.load,
  };
  const format = formats[formatExtension];
  if (!format) {
    throw new Error(`'Unknown format! ${format}'`);
  }
  return format(data);
};
