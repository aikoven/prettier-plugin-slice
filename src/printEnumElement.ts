import {Doc, FastPath, ParserOptions, doc} from 'prettier';
import {EnumElement} from 'slice2json';
import {groupConcat} from './utils/groupConcat';
import {printDoc} from './printDoc';

const {concat, hardline, line, indent} = doc.builders;

export function printEnumElement(
  path: FastPath<EnumElement>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();

  return concat([
    val.doc != null ? concat([printDoc(val.doc), hardline]) : '',
    // name <break> = value
    groupConcat([
      val.name,
      val.value != null ? indent(concat([line, '= ', val.value])) : '',
    ]),
  ]);
}
