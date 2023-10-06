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
  // switch (format) {
  //   case 'json':
  //     return JSON.parse(data);
  //   case 'yml':
  //     return YAML.load(data);
  //   case 'yaml':
  //     return YAML.load(data);
  //   default:
  //     throw new Error(`'Unknown format! ${format}'`);
  // }
};
