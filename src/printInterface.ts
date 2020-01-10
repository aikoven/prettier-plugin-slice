import {Doc, FastPath, ParserOptions, doc, util} from 'prettier';
import {InterfaceDeclaration} from 'slice2json';
import {groupConcat} from './utils/groupConcat';
import {printDoc} from './printDoc';
import {printMetadata} from './printMetadata';

const {concat, hardline, softline, line, join, indent} = doc.builders;
const {isNextLineEmpty} = util;

export function printInterface(
  path: FastPath<InterfaceDeclaration>,
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
        'interface ',
        val.name,
        val.extends
          ? indent(
              concat([
                line,
                groupConcat([
                  'extends',
                  indent(
                    concat([line, join(concat([',', line]), val.extends)]),
                  ),
                ]),
              ]),
            )
          : '',
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
