export const backgroundRegex = /background:\s?/g;
export const spaceRegex = /\s/g;
export const urlRegex = /url\(.*\)/g;
export const hexadecimalFollowedByPercentageRegex =
  /#([0-9a-f]{3}){1,2}\b\s?(\d*\.?\d+)%/gi;
export const gradientPositionRegex =
  /(?<=(radial-gradient|conic-gradient)\()(.*)/;

export const replaceGradientPositionSpacesWithUnderscores = (match) => {
  const result = match.split(',');
  const formattedFirstParam = result[0].replace(spaceRegex, '_');
  const params = [formattedFirstParam, ...result.slice(1)].join(',');

  return match.replace(match, params);
};

export const format = (figmaString: string) => {
  if (typeof figmaString !== 'string') {
    throw new Error('Argument must be a string');
  }

  figmaString = figmaString.trim();

  if (!figmaString.startsWith('background:'))
    throw new Error(
      'Invalid background string : argument must start with "background:"'
    );


  if (figmaString.endsWith(';')) figmaString = figmaString.slice(0, -1);

  figmaString = figmaString.replace(urlRegex, '');

  figmaString = figmaString.replace(backgroundRegex, 'bg-[');

  figmaString = figmaString.replace(
    hexadecimalFollowedByPercentageRegex,
    (match) => {
      return match.replace(spaceRegex, '_');
    }
  );

  figmaString = figmaString.replace(
    gradientPositionRegex,
    replaceGradientPositionSpacesWithUnderscores
  );

  figmaString = figmaString.replace(spaceRegex, '');
  if (figmaString.endsWith(',')) figmaString = figmaString.slice(0, -1);
  figmaString = figmaString.concat(']');

  return figmaString;
};
