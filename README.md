# Slice Prettier Plugin

Prettier plugin for the Slice language.

## Installation

    yarn add --dev prettier prettier-plugin-slice

## Configuration

Add this to you Prettier config:

```json
{
  "overrides": [
    {
      "files": "*.ice",
      "options": {
        "parser": "slice2json"
      }
    }
  ]
}
```
