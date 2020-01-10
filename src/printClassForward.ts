import {ClassForwardDeclaration} from 'slice2json';
import {FastPath, ParserOptions, Doc, doc, util} from 'prettier';
import {printDoc} from './printDoc';
import {groupConcat} from './utils/groupConcat';

const {concat, hardline, line, indent} = doc.builders;
const {isNextLineEmpty} = util;

export function printClassForward(
  path: FastPath<ClassForwardDeclaration>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();

  return concat([
    val.doc != null ? concat([printDoc(val.doc), hardline]) : '',
    groupConcat([
      val.local ? 'local ' : '',
      'class ',
      val.name,
      val.extends ? indent(concat([line, 'extends ', val.extends])) : '',
      ';',
    ]),
    isNextLineEmpty(options.originalText, path.getNode(), options)
      ? hardline
      : '',
  ]);
}
