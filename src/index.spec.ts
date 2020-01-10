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
      expect(removeLocations(parse(formatted))).toEqual(
        removeLocations(parse(slice)),
      );
    });
  }
});

function removeLocations(source: SliceSource) {
  return cloneDeepWith(source, (value, key) =>
    key === 'location' ? null : undefined,
  );
}
