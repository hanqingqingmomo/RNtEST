import { sizeMap, getRealSize } from './Utils';

describe('Icon Component Utils', () => {
  test('`getRealSize` returns correct size for `sm`', () => {
    expect(getRealSize('sm')).toBe(sizeMap['sm']);
  });

  test('`getRealSize` returns correct size for `md`', () => {
    expect(getRealSize('md')).toBe(sizeMap['md']);
  });

  test('`getRealSize` returns correct size for `lg`', () => {
    expect(getRealSize('lg')).toBe(sizeMap['lg']);
  });

  test('`getRealSize` returns correct size for numeric value', () => {
    expect(getRealSize(50)).toBe(50);
  });
});
