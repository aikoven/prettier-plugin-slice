import {SequenceDeclaration} from 'slice2json';
import {FastPath, ParserOptions, Doc, doc, util} from 'prettier';
import {printDoc} from './printDoc';
import {groupConcat} from './utils/groupConcat';
import {printMetadata} from './printMetadata';

const {concat, hardline, line, indent, softline} = doc.builders;
const {isNextLineEmpty} = util;

export function printSequence(
  path: FastPath<SequenceDeclaration>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();

  return concat([
    val.doc != null ? concat([printDoc(val.doc), hardline]) : '',
    groupConcat([
      val.metadata != null ? concat([printMetadata(val.metadata), line]) : '',
      val.local ? 'local ' : '',
      'sequence<',
      groupConcat([
        indent(
          concat([
            softline,
            groupConcat([
              val.dataTypeMetadata != null
                ? concat([printMetadata(val.dataTypeMetadata), line])
                : '',
              val.dataType,
            ]),
          ]),
        ),
        softline,
      ]),
      '> ',
      val.name,
      ';',
    ]),
    isNextLineEmpty(options.originalText, path.getNode(), options)
      ? hardline
      : '',
  ]);
}
