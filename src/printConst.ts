import {Doc, FastPath, ParserOptions, doc} from 'prettier';
import {ConstDeclaration} from 'slice2json';
import {groupConcat} from './utils/groupConcat';
import {printDoc} from './printDoc';

const {concat, hardline, line, indent} = doc.builders;

export function printConst(
  path: FastPath<ConstDeclaration>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();

  return concat([
    val.doc != null ? concat([printDoc(val.doc), hardline]) : '',
    // const type name <break> = value
    groupConcat([
      'const ',
      val.dataType,
      ' ',
      val.name,
      val.value != null ? indent(concat([line, '= ', val.value])) : '',
      ';',
    ]),
  ]);
}
