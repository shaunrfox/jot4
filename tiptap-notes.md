# TipTap notes

## Extensions

### [Starter Kit extensions](https://tiptap.dev/docs/editor/extensions/functionality/starterkit)

``` shell
npm install @tiptap/starter-kit
```

**Nodes:** Blockquote, BulletList, CodeBlock, Document, HardBreak, Heading, HorizontalRule, ListItem, OrderedList, Paragraph, Text

**Marks:** Bold, Code, Italic, Strike

**Functionality:** Dropcursor, Gapcursor, History

### Additional extensions

``` shell
npm install 
@tiptap/extension-code-block-lowlight lowlight 
@tiptap/extension-image 
@tiptap/extension-table 
@tiptap/extension-table-row 
@tiptap/extension-table-header 
@tiptap/extension-table-cell 
@tiptap/extension-task-list 
@tiptap/extension-task-item 
@tiptap/extension-mention 
@tiptap/suggestion tippy.js 
@tiptap/extension-highlight 
@tiptap/extension-link 
@tiptap/extension-text-style 
@tiptap/extension-underline 
@tiptap/extension-bubble-menu 
@tiptap/extension-color 
@tiptap/extension-focus 
@tiptap/extension-list-keymap 
@tiptap/extension-placeholder 
@tiptap/extension-text-align 
@tiptap/extension-typography
@tiptap/extension-character-count
```

#### Nodes

- CodeBlock Lowlight `@tiptap/extension-code-block-lowlight` 
  - Depends on lowlight  `lowlight`
- Image `@tiptap/extension-image`
- Table `@tiptap/extension-table`
  - Table Row `@tiptap/extension-table-row` 
  - Table Header `@tiptap/extension-table-header`
  - Table Cell `@tiptap/extension-table-cell`
- Task List `@tiptap/extension-task-list`
  - Task Item `@tiptap/extension-task-item`
- Mention `@tiptap/extension-mention`
  - Depends on:
    - `@tiptap/suggestion`
    - `tippy.js`

#### Marks

- Highlight `@tiptap/extension-highlight`
- Link `@tiptap/extension-link`
- Text Style (Dependency of Color, Font Family) `@tiptap/extension-text-style`
- Underline `@tiptap/extension-underline`

#### Functionality

- Bubble Menu `@tiptap/extension-bubble-menu`
- Color `@tiptap/extension-color`
- Focus `@tiptap/extension-focus`
- List Keymap `@tiptap/extension-list-keymap`
- Placeholder `@tiptap/extension-placeholder`
- Text Align `@tiptap/extension-text-align`
- Typography `@tiptap/extension-typography`
- Character Count `@tiptap/extension-character-count`
- ??? Undo/Redo `@tiptap/extension-history`
  - Same as History, which is a Pro feature?
- ??? Font Family? `@tiptap/extension-font-family`
- ??? Floating Menu? `@tiptap/extension-floating-menu`

#### Pro – decide what to do

- Unique ID
- History
- Emoji
- Comments
- File Handler