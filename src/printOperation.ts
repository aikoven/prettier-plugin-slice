import {Doc, FastPath, ParserOptions, doc, util} from 'prettier';
import {OperationDeclaration} from 'slice2json';
import {groupConcat} from './utils/groupConcat';
import {printDoc} from './printDoc';
import {printMetadata} from './printMetadata';

const {concat, hardline, softline, line, join, indent} = doc.builders;
const {isNextLineEmpty} = util;

export function printOperation(
  path: FastPath<OperationDeclaration>,
  options: ParserOptions,
  print: (path: FastPath) => Doc,
): Doc {
  const val = path.getValue();

  return concat([
    val.doc != null ? concat([printDoc(val.doc), hardline]) : '',
    // metadata <break> rest
    groupConcat([
      val.metadata != null ? concat([printMetadata(val.metadata), line]) : '',
      // rest <break> throws
      groupConcat([
        // rest(break parameters)
        groupConcat([
          // type <break> name
          groupConcat([
            val.idempotent ? 'idempotent ' : '',
            val.returnOptional != null
              ? `optional(${val.returnOptional}) `
              : '',
            val.returnType,
            line,
            val.name,
          ]),
          '(',
          val.parameters.length > 0
            ? concat([
                indent(
                  concat([
                    softline,
                    join(concat([',', line]), path.map(print, 'parameters')),
                  ]),
                ),
                softline,
              ])
            : '',
          ')',
        ]),
        val.throws
          ? indent(
              concat([
                line,
                groupConcat([
                  'throws',
                  indent(concat([line, join(concat([',', line]), val.throws)])),
                ]),
              ]),
            )
          : '',
      ]),
      ';',
    ]),
    isNextLineEmpty(options.originalText, path.getNode(), options)
      ? hardline
      : '',
  ]);
}
