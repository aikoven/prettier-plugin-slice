import {Doc, doc} from 'prettier';

const {join, hardline, align, concat, line, fill} = doc.builders;

export function printDoc(doc: string): Doc {
  return concat([
    '/**',
    align(
      ' * ',
      concat([
        hardline,
        join(
          concat([hardline, hardline]),
          doc.split('\n\n').map(paragraph => {
            const docs: Doc[] = [];

            for (const [i, line_] of paragraph.split('\n').entries()) {
              if (i > 0 && /^[@ ]/.test(line_)) {
                docs.push(hardline);
              }

              for (const word of line_.split(' ')) {
                docs.push(word, line);
              }
            }

            while (docs.length > 0 && docs[docs.length - 1] === line) {
              docs.pop();
            }

            return fill(docs);
          }),
        ),
      ]),
    ),
    hardline,
    ' **/',
  ]);
}
