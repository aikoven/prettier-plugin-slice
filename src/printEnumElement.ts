import {Doc, FastPath, ParserOptions, doc, util} from 'prettier';
import {EnumElement, EnumDeclaration} from 'slice2json';
import {groupConcat} from './utils/groupConcat';
import {printDoc} from './printDoc';

const {concat, hardline, line, indent, ifBreak} = doc.builders;
const {isNextLineEmpty} = util;

export function printEnumElement(
  path: FastPath<EnumElement>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();

  const enumDeclaration = (path.getParentNode() as unknown) as EnumDeclaration;
  const isLastElement = path.getName() === enumDeclaration.enums.length - 1;

  return concat([
    val.doc != null ? concat([printDoc(val.doc), hardline]) : '',
    // name <break> = value
    groupConcat([
      val.name,
      val.value != null ? indent(concat([line, '= ', val.value])) : '',
    ]),
    isLastElement ? ifBreak(',', '') : ',',
    isNextLineEmpty(options.originalText, path.getNode(), options)
      ? hardline
      : '',
  ]);
}
