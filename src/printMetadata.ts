import {Doc} from 'prettier';

export function printMetadata(metadata: string[]): Doc {
  return `[${metadata.map(item => `"${item}"`).join(', ')}]`;
}
