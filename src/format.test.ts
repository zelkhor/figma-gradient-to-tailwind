import {
  format,
  backgroundRegex,
  spaceRegex,
  urlRegex,
  hexadecimalFollowedByPercentageRegex,
  gradientPositionRegex,
} from './format';

describe('Regex should match pattern', () => {
  it('Should match "background:" with optional space', () => {
    expect('background:').toMatch(backgroundRegex);
    expect('background: ').toMatch(backgroundRegex);
    expect('background: anything').toMatch(backgroundRegex);
    expect('background anything').not.toMatch(backgroundRegex);
  });

  it('Should match all space characters', () => {
    expect(' ').toMatch(spaceRegex);
    expect('  ').toMatch(spaceRegex);
    expect('anything').not.toMatch(spaceRegex);
  });

  it('Should match url() pattern', () => {
    expect('url()').toMatch(urlRegex);
    expect('url(whatever)').toMatch(urlRegex);
    expect('something').not.toMatch(urlRegex);
  });

  it('Should match HEX color followed by percentage', () => {
    expect('#000000 0%').toMatch(hexadecimalFollowedByPercentageRegex);
    expect('#fff 100%').toMatch(hexadecimalFollowedByPercentageRegex);
    expect('#ff0000 0.2%').toMatch(hexadecimalFollowedByPercentageRegex);
    expect('#ABCDEF 0.02%').toMatch(hexadecimalFollowedByPercentageRegex);
    expect('ABCDEF 10.5%').not.toMatch(hexadecimalFollowedByPercentageRegex);
    expect('000000 10.5').not.toMatch(hexadecimalFollowedByPercentageRegex);
    expect('000000 0').not.toMatch(hexadecimalFollowedByPercentageRegex);
  });

  it('Should match radial-gradient() pattern', () => {
    expect('conic-gradient(').toMatch(gradientPositionRegex);
    expect('radial-gradient(').toMatch(gradientPositionRegex);
    expect('anything').not.toMatch(gradientPositionRegex);
  });
});

describe('Format Figma gradient string to Tailwind JIT css className', () => {
  it('Should throw an error if argument is not a string', () => {
    expect(() => format(1 as any)).toThrow('Argument must be a string');
  });

  it('Should trim the string', () => {
    const str = ' background: ';
    const expectedResult = 'bg-[]';
    expect(format(str)).toBe(expectedResult);
  });

  it('Should throw an error if argument does not start with "background:"', () => {
    expect(() => format('anything')).toThrow(
      'Invalid background string : argument must start with "background:"'
    );
    expect(() => format('background:')).not.toThrow();
    expect(() => format('background: ')).not.toThrow();
  });

  it('Should return a string if argument is valid', () => {
    expect(typeof format('background:')).toBe('string');
  });

  it('Should replace "background:" with "bg-[]"', () => {
    expect(format('background:')).toBe('bg-[]');
  });

  it('Should remove ";" character at the end of the string', () => {
    const str = 'background: something;';
    const expectedResult = 'bg-[something]';
    expect(format(str)).toBe(expectedResult);
  });

  it('Should remove url() from the string', () => {
    const str = 'background: url(.jpg)';
    const expectedResult = 'bg-[]';

    expect(format(str)).toBe(expectedResult);
  });

  it('Should add a "_" character before HEX color and percentage value', () => {
    const str = 'background: linear-gradient(180deg, #000000 0%, #ffffff 100%)';
    const expectedResult =
      'bg-[linear-gradient(180deg,#000000_0%,#ffffff_100%)]';

    expect(format(str)).toBe(expectedResult);
  });

  it('Should replace space character with "_" character for radial gradient 1st argument', () => {
    const str =
      'background: radial-gradient(50% 50% at 50% 50%, #000000, #ffffff)';
    const expectedResult =
      'bg-[radial-gradient(50%_50%_at_50%_50%,#000000,#ffffff)]';

    expect(format(str)).toBe(expectedResult);
  });

  it('Should format a complex gradient string to a valid Tailwind JIT css className', () => {
    const figmaString =
      'background: radial-gradient(50% 50% at 50% 50%, rgba(218, 23, 23, 0.2) 0%, rgba(87, 255, 7, 0.2) 100%), linear-gradient(171.32deg, rgba(250, 255, 7, 0.2) 0%, rgba(255, 61, 0, 0.2) 89.46%), linear-gradient(0deg, rgba(35, 55, 228, 0.2), rgba(35, 55, 228, 0.2)),; ';

    const expectedResult =
      'bg-[radial-gradient(50%_50%_at_50%_50%,rgba(218,23,23,0.2)0%,rgba(87,255,7,0.2)100%),linear-gradient(171.32deg,rgba(250,255,7,0.2)0%,rgba(255,61,0,0.2)89.46%),linear-gradient(0deg,rgba(35,55,228,0.2),rgba(35,55,228,0.2))]';

    expect(format(figmaString)).toBe(expectedResult);
  });
});
