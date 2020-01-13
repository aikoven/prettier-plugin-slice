import * as fs from 'fs';
import {sync} from 'glob';
import {parse, SliceSource} from 'slice2json';
import {format} from 'prettier';
import {cloneDeepWith} from 'lodash';

describe('Built-in slices', () => {
  const sliceDir = 'node_modules/slice2js/ice/slice';

  const slices = sync('**/*.ice', {
    cwd: sliceDir,
  });

  for (const slicePath of slices) {
    test(slicePath, () => {
      const slice = fs.readFileSync(`${sliceDir}/${slicePath}`, 'utf-8');
      const formatted = format(slice, {
        parser: 'slice2json' as any,
        plugins: ['.'],
      });

      expect(formatted).toMatchSnapshot();
      expect(normalize(parse(formatted))).toEqual(normalize(parse(slice)));
    });
  }
});

describe('Slices', () => {
  const sliceDir = 'fixtures';

  const slices = sync('**/*.ice', {
    cwd: sliceDir,
  });

  for (const slicePath of slices) {
    test(slicePath, () => {
      const slice = fs.readFileSync(`${sliceDir}/${slicePath}`, 'utf-8');
      const formatted = format(slice, {
        parser: 'slice2json' as any,
        plugins: ['.'],
      });

      expect(formatted).toMatchSnapshot();
      expect(normalize(parse(formatted))).toEqual(normalize(parse(slice)));
    });
  }
});

function normalize(source: SliceSource) {
  return cloneDeepWith(source, (value, key) => {
    if (key === 'location') {
      return null;
    }

    if (key === 'doc' && typeof value === 'string') {
      return value.replace(/\s+/g, ' ');
    }

    return undefined;
  });
}
