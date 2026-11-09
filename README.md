# Ayu for TablePlus

[ayu](https://github.com/ayu-theme/ayu-colors) color themes for [TablePlus](https://tableplus.com):

| Theme | ayu variant | Base |
|---|---|---|
| Ayu Day | light | light |
| Ayu Dusk | mirage | dark |
| Ayu Night | dark | dark |

## Install

TablePlus main menu: **Theme › Import theme from Git…** and add:

```
https://github.com/adoundakov/tableplus-ayu.git
```

Or download a JSON file from `themes/` and import it manually.

## Regenerate

Colors are generated from the `ayu` npm package, so the themes can be refreshed when ayu updates:

```bash
npm install
npm run generate
```

Mapping lives in `generate.mjs` (keywords → orange, functions → yellow, strings → green, numbers → purple, identifiers → cyan, etc.). Translucent ayu colors are flattened onto the editor background since TablePlus themes use opaque `#RRGGBB` values.

## License

MIT. Colors © ayu-theme (MIT).
