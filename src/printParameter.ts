import {Doc, FastPath, ParserOptions, doc} from 'prettier';
import {ParameterDeclaration} from 'slice2json';
import {groupConcat} from './utils/groupConcat';
import {printMetadata} from './printMetadata';

const {concat, line} = doc.builders;

export function printParameter(
  path: FastPath<ParameterDeclaration>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();
  return groupConcat([
    val.metadata != null ? concat([printMetadata(val.metadata), line]) : '',
    groupConcat([
      val.out ? 'out ' : '',
      val.optional != null ? `optional(${val.optional}) ` : '',
      val.dataType,
      line,
      val.name,
    ]),
  ]);
}
