import {EnumDeclaration} from 'slice2json';
import {FastPath, ParserOptions, Doc, doc, util} from 'prettier';
import {printDoc} from './printDoc';
import {groupConcat} from './utils/groupConcat';
import {printMetadata} from './printMetadata';

const {concat, hardline, line, indent, join} = doc.builders;
const {isNextLineEmpty} = util;

export function printEnum(
  path: FastPath<EnumDeclaration>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();

  return concat([
    val.doc != null ? concat([printDoc(val.doc), hardline]) : '',
    groupConcat([
      val.metadata != null ? concat([printMetadata(val.metadata), line]) : '',
      val.local ? 'local ' : '',
      'enum ',
      val.name,
      groupConcat([
        ' {',
        indent(
          concat([
            line,
            join(hardline, path.map(print, 'enums')),
          ]),
        ),
        line,
        '};',
      ]),
    ]),
    isNextLineEmpty(options.originalText, path.getNode(), options)
      ? hardline
      : '',
  ]);
}
