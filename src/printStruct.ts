import {StructDeclaration} from 'slice2json';
import {FastPath, ParserOptions, Doc, doc, util} from 'prettier';
import {printDoc} from './printDoc';
import {groupConcat} from './utils/groupConcat';
import {printMetadata} from './printMetadata';

const {concat, hardline, line, indent, softline, join} = doc.builders;
const {isNextLineEmpty} = util;

export function printStruct(
  path: FastPath<StructDeclaration>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();

  return concat([
    val.doc != null ? concat([printDoc(val.doc), hardline]) : '',
    groupConcat([
      val.metadata != null ? concat([printMetadata(val.metadata), line]) : '',
      val.local ? 'local ' : '',
      'struct ',
      val.name,
      groupConcat([
        ' {',
        indent(
          concat([
            val.fields.length === 0 ? '' : hardline,
            join(hardline, path.map(print, 'fields')),
          ]),
        ),
        softline,
        '};',
      ]),
    ]),
    isNextLineEmpty(options.originalText, path.getNode(), options)
      ? hardline
      : '',
  ]);
}
