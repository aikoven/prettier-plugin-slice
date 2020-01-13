import {Doc, FastPath, ParserOptions, doc} from 'prettier';
import {SliceSource} from 'slice2json';

const {concat, hardline, join} = doc.builders;

export function printSliceSource(
  path: FastPath<SliceSource>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();
  return concat([
    val.pragmaOnce ? concat(['#pragma once', hardline, hardline]) : '',
    val.globalMetadata != null
      ? concat([
          join(
            hardline,
            val.globalMetadata.map(meta => `[["${meta}"]]`),
          ),
          hardline,
          hardline,
        ])
      : '',
    val.includes != null
      ? concat([
          join(
            hardline,
            val.includes.map(include => `#include <${include}.ice>`),
          ),
          hardline,
          hardline,
        ])
      : '',
    join(hardline, path.map(print, 'modules')),
    hardline,
  ]);
}
