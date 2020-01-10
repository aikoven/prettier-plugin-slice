import {doc, Doc} from 'prettier';

const {concat, group} = doc.builders;

export function groupConcat(contents: Doc[]): Doc {
  return group(concat(contents));
}
