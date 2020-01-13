import {Doc, FastPath, ParserOptions, doc, util} from 'prettier';
import {ModuleDeclaration} from 'slice2json';
import {groupConcat} from './utils/groupConcat';
import {printMetadata} from './printMetadata';
import {printDoc} from './printDoc';

const {concat, hardline, softline, line, join, indent} = doc.builders;
const {isNextLineEmpty} = util;

export function printModule(
  path: FastPath<ModuleDeclaration>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();
  return concat([
    val.doc != null ? concat([printDoc(val.doc), hardline]) : '',
    groupConcat([
      val.metadata != null ? concat([printMetadata(val.metadata), line]) : '',
      groupConcat([
        `module ${val.name} {`,
        indent(
          concat([
            val.content.length === 0 ? '' : hardline,
            join(hardline, path.map(print, 'content')),
          ]),
        ),
        softline,
        `};`,
      ]),
    ]),
    isNextLineEmpty(options.originalText, path.getNode(), options)
      ? hardline
      : '',
  ]);
}
