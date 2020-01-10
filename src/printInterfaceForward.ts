import {InterfaceForwardDeclaration} from 'slice2json';
import {FastPath, ParserOptions, Doc, doc, util} from 'prettier';
import {printDoc} from './printDoc';
import {groupConcat} from './utils/groupConcat';

const {concat, hardline, line, indent, join} = doc.builders;
const {isNextLineEmpty} = util;

export function printInterfaceForward(
  path: FastPath<InterfaceForwardDeclaration>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();

  return concat([
    val.doc != null ? concat([printDoc(val.doc), hardline]) : '',
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
                indent(concat([line, join(concat([',', line]), val.extends)])),
              ]),
            ]),
          )
        : '',
      ';',
    ]),
    isNextLineEmpty(options.originalText, path.getNode(), options)
      ? hardline
      : '',
  ]);
}
