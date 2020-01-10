import {Doc, doc} from 'prettier';

const {join, hardline} = doc.builders;

export function printDoc(doc: string): Doc {
  return join(hardline, [
    '/**',
    ...doc.split('\n').map(line => ` * ${line}`),
    ' **/',
  ]);
}
