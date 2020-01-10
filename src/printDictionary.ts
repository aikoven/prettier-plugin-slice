import {DictionaryDeclaration} from 'slice2json';
import {FastPath, ParserOptions, Doc, doc, util} from 'prettier';
import {printDoc} from './printDoc';
import {groupConcat} from './utils/groupConcat';
import {printMetadata} from './printMetadata';

const {concat, hardline, line, indent, softline} = doc.builders;
const {isNextLineEmpty} = util;

export function printDictionary(
  path: FastPath<DictionaryDeclaration>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();

  return concat([
    val.doc != null ? concat([printDoc(val.doc), hardline]) : '',
    groupConcat([
      val.metadata != null ? concat([printMetadata(val.metadata), line]) : '',
      val.local ? 'local ' : '',
      'dictionary<',
      groupConcat([
        indent(
          concat([
            softline,
            groupConcat([
              val.keyTypeMetadata != null
                ? concat([printMetadata(val.keyTypeMetadata), line])
                : '',
              val.keyType,
              ',',
            ]),
            line,
            groupConcat([
              val.valueTypeMetadata != null
                ? concat([printMetadata(val.valueTypeMetadata), line])
                : '',
              val.valueType,
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
