import {Doc, FastPath, ParserOptions, doc, util} from 'prettier';
import {StructFieldDeclaration} from 'slice2json';
import {groupConcat} from './utils/groupConcat';
import {printDoc} from './printDoc';
import {printMetadata} from './printMetadata';

const {concat, hardline, line, indent} = doc.builders;
const {isNextLineEmpty} = util;

export function printStructField(
  path: FastPath<StructFieldDeclaration>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();

  return concat([
    val.doc != null ? concat([printDoc(val.doc), hardline]) : '',
    // metadata <break> rest
    groupConcat([
      val.metadata != null ? concat([printMetadata(val.metadata), line]) : '',
      // rest <break> = default
      groupConcat([
        // type <break> name
        groupConcat([val.dataType, line, val.name]),
        val.defaultValue != null
          ? indent(concat([line, '= ', val.defaultValue]))
          : '',
      ]),
      ';',
    ]),
    isNextLineEmpty(options.originalText, path.getNode(), options)
      ? hardline
      : '',
  ]);
}
