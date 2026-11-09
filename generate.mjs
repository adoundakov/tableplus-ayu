// Generates TablePlus themes from the ayu color palette (npm: ayu).
// Usage: node generate.mjs
import { writeFileSync, mkdirSync } from 'node:fs'
import { dark, mirage, light } from 'ayu'

const { version: ayuVersion } = JSON.parse(
  (await import('node:fs')).readFileSync(new URL('./node_modules/ayu/package.json', import.meta.url))
)

const variants = [
  { file: 'ayu-day', name: 'Ayu Day', base: 'light', scheme: light },
  { file: 'ayu-dusk', name: 'Ayu Dusk', base: 'dark', scheme: mirage },
  { file: 'ayu-night', name: 'Ayu Night', base: 'dark', scheme: dark },
]

function build({ name, base, scheme: s }) {
  const isLight = base === 'light'
  const content = s.editor.bg
  const window = s.ui.bg

  // Flatten any translucent ayu color onto an opaque background -> #RRGGBB
  const hex = (c, bg = content) => c.blend(bg).hex().toUpperCase()
  // Tinted background for status rows / notifications
  const tint = (c, bg = content) => hex(c.alpha(isLight ? 0.3 : 0.35), bg)

  const fg = hex(s.editor.fg)
  const muted = hex(s.ui.fg)
  const faint = hex(s.ui.fg.alpha(0.6))
  const line = hex(s.ui.line)
  const accent = hex(s.common.accent.tint)
  const added = tint(s.vcs.added)
  const modified = tint(s.syntax.func)
  const removed = tint(s.vcs.removed)
  const errorBg = tint(s.common.error)
  const hover = hex(s.ui.selection.active, window)
  const panel = hex(s.ui.panel.bg)
  const syn = s.syntax

  return {
    name,
    base,
    version: '1.0.0',
    author: { name: 'adoundakov', email: '' },
    colors: {
      AppChartPaletteColor1: hex(syn.markup),
      AppChartPaletteColor2: hex(syn.func),
      AppChartPaletteColor3: hex(syn.entity),
      AppChartPaletteColor4: hex(syn.string),
      AppChartPaletteColor5: hex(syn.constant),
      AppConnectionColorPreset1: tint(syn.string, window),
      AppConnectionColorPreset2: tint(syn.regexp, window),
      AppConnectionColorPreset3: tint(syn.entity, window),
      AppConnectionColorPreset4: tint(syn.func, window),
      AppConnectionColorPreset5: tint(syn.markup, window),
      AppConnectionStatusBorder: line,
      AppConnectionStatusDefaultBackground: panel,
      AppConnectionStatusDisconnectedBackground: removed,
      AppConnectionStatusErrorBackground: errorBg,
      AppConnectionStatusReconnectingBackground: modified,
      AppContentBackground: hex(content),
      AppControlBackground: hex(s.ui.popup.bg),
      AppControlBorder: line,
      AppInputInvalidBackground: hex(s.common.error.alpha(0.6)),
      AppInputValidBackground: hex(s.vcs.added.alpha(0.6)),
      AppLogText: fg,
      AppNotificationErrorBackground: errorBg,
      AppNotificationSuccessBackground: added,
      AppNotificationWarningBackground: modified,
      AppPluginUpdateText: hex(s.vcs.added),
      AppQueryMessageText: fg,
      AppSeparator: line,
      AppSidebarBackground: hex(window),
      AppTabBackground: hex(window),
      AppTabButtonHoverBackground: hover,
      AppTabHoverBackground: hover,
      AppTabSelectedBackground: hex(content),
      AppTabSelectedBarInactiveText: muted,
      AppTabSelectedWindowInactiveBackground: hex(content),
      AppTabSelectedWindowInactiveText: muted,
      AppTabUnselectedText: muted,
      AppWelcomeButtonBackground: panel,
      AppWindowBackground: hex(window),
      ContentDeletedRowBackground: removed,
      ContentInsertedBackground: added,
      ContentModifiedBackground: modified,
      EditorBacktickQuotedText: hex(syn.special),
      EditorBracketQuotedText: hex(syn.tag),
      EditorCommentText: hex(syn.comment),
      EditorCurrentQueryBackground: hex(s.editor.line),
      EditorDoubleQuotedText: hex(syn.entity),
      EditorErrorBackground: errorBg,
      EditorFunctionText: hex(syn.func),
      EditorIdentifierText: hex(syn.tag),
      EditorInvisibleCharacterText: hex(s.editor.indentGuide.normal),
      EditorKeywordText: hex(syn.keyword),
      EditorMatchingBracketBackground: hex(s.editor.findMatch.active),
      EditorNumberText: hex(syn.constant),
      EditorSelectionBackground: hex(s.editor.selection.active),
      EditorSingleQuotedText: hex(syn.string),
      EditorText: fg,
      GridAccessoryForeground: muted,
      GridCellSelectionBorder: accent,
      GridDateTimeText: fg,
      GridDropdownText: fg,
      GridEvenRowBackground: hex(content),
      GridHeaderBackground: hex(window),
      GridHeaderText: fg,
      GridIconCellText: fg,
      GridInactiveSelectionText: muted,
      GridLinkText: hex(syn.tag),
      GridNumberText: fg,
      GridOddRowBackground: hex(s.editor.line),
      GridPlaceholderText: faint,
      GridRowDetailText: fg,
      GridRowHeaderForeground: muted,
      GridSeparator: line,
      GridText: fg,
      JSONKeyText: hex(syn.entity),
      SearchResultCountText: muted,
      SpatialPreviewGeometryStroke: hex(syn.markup),
      SpatialPreviewPolygonFill1: added,
      SpatialPreviewPolygonFill2: modified,
      SpatialPreviewPolygonFill3: tint(syn.entity),
    },
    icons: {},
  }
}

mkdirSync('themes', { recursive: true })
for (const v of variants) {
  writeFileSync(`themes/${v.file}.json`, JSON.stringify(build(v), null, 2) + '\n')
  console.log(`themes/${v.file}.json  (ayu ${ayuVersion})`)
}
