import {assertNever} from 'assert-never';
import {Plugin} from 'prettier';
import {
  parse,
  Location,
  SliceSource,
  ModuleDeclaration,
  ModuleChild,
  ClassChild,
  StructFieldDeclaration,
  EnumElement,
  ParameterDeclaration,
} from 'slice2json';
import {printSliceSource} from './printSliceSource';
import {printModule} from './printModule';
import {printClassForward} from './printClassForward';
import {printClass} from './printClass';
import {printField} from './printField';
import {printInterfaceForward} from './printInterfaceForward';
import {printInterface} from './printInterface';
import {printException} from './printException';
import {printStruct} from './printStruct';
import {printStructField} from './printStructField';
import {printEnum} from './printEnum';
import {printEnumElement} from './printEnumElement';
import {printSequence} from './printSequence';
import {printDictionary} from './printDictionary';
import {printConst} from './printConst';
import {printOperation} from './printOperation';
import {printParameter} from './printParameter';

type Node =
  | SliceSource
  | ModuleDeclaration
  | ModuleChild
  | ClassChild
  | StructFieldDeclaration
  | EnumElement
  | ParameterDeclaration;

const plugin: Plugin = {
  languages: [
    {
      name: 'Slice',
      vscodeLanguageIds: ['slice'],
      extensions: ['.ice'],
      parsers: ['slice2json'],
    },
  ],
  parsers: {
    slice2json: {
      parse: (text): Node => {
        return parse(text);
      },
      astFormat: 'slice2json',
      locStart: node => (node.location as Location).start,
      locEnd: node => (node.location as Location).end,
    },
  },
  printers: {
    slice2json: {
      print(path, options, print) {
        const node = path.getValue() as Node;

        switch (node.type) {
          case 'source':
            return printSliceSource(path, options, print);
          case 'module':
            return printModule(path, options, print);
          case 'classForward':
            return printClassForward(path, options, print);
          case 'class':
            return printClass(path, options, print);
          case 'field':
            return printField(path, options, print);
          case 'interfaceForward':
            return printInterfaceForward(path, options, print);
          case 'interface':
            return printInterface(path, options, print);
          case 'exception':
            return printException(path, options, print);
          case 'struct':
            return printStruct(path, options, print);
          case 'structField':
            return printStructField(path, options, print);
          case 'enum':
            return printEnum(path, options, print);
          case 'enumElement':
            return printEnumElement(path, options, print);
          case 'sequence':
            return printSequence(path, options, print);
          case 'dictionary':
            return printDictionary(path, options, print);
          case 'const':
            return printConst(path, options, print);
          case 'operation':
            return printOperation(path, options, print);
          case 'parameter':
            return printParameter(path, options, print);
          default:
            return assertNever(node);
        }
      },
    },
  },
};

export = plugin;
