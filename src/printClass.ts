import {ClassDeclaration} from 'slice2json';
import {FastPath, ParserOptions, Doc, doc, util} from 'prettier';
import {printDoc} from './printDoc';
import {groupConcat} from './utils/groupConcat';
import {printMetadata} from './printMetadata';

const {concat, hardline, line, indent, softline, join} = doc.builders;
const {isNextLineEmpty} = util;

export function printClass(
  path: FastPath<ClassDeclaration>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();

  return concat([
    val.doc != null ? concat([printDoc(val.doc), hardline]) : '',
    groupConcat([
      val.metadata != null ? concat([printMetadata(val.metadata), line]) : '',
      groupConcat([
        val.local ? 'local ' : '',
        'class ',
        val.name,
        val.compactTypeId != null ? `(${val.compactTypeId})` : '',
        val.extends ? indent(concat([line, 'extends ', val.extends])) : '',
      ]),
      groupConcat([
        ' {',
        indent(concat([softline, join(hardline, path.map(print, 'content'))])),
        softline,
        '};',
      ]),
    ]),
    isNextLineEmpty(options.originalText, path.getNode(), options)
      ? hardline
      : '',
  ]);
}
