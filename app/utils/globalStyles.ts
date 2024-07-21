import type { SystemStyleObject } from '@styled-system/css';
import { modes } from './theme';

export default (mode: modes): SystemStyleObject => ({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
  'html, body, #root': {
    height: '100%',
    fontFamily: 'default',
    padding: 0,
    margin: 0,
    color: mode === modes.dark ? 'gray.20' : 'gray.60',
  },
  body: {
    bg: mode === modes.dark ? 'gray.100' : 'gray.0',
  },
  'p, h1, h2, h3, h4, h5, h6, span, div': {
    padding: 0,
    margin: 0,
  },
  'h1, h2, h3, h4, h5, h6': {
    color: mode === modes.dark ? 'gray.5' : 'gray.80',
  },
  'code, pre': {
    backgroundColor: mode === modes.dark ? 'gray.80' : 'gray.5',
    borderRadius: 4,
    color: mode === modes.dark ? 'gray.5' : 'gray.80',
    fontSize: 3,
    fontFamily: 'mono',
    padding: 6,
  },
  code: {
    padding: 6,
  },
  'pre code': {
    backgroundColor: 'transparent',
    color: 'inherit',
    fontSize: 'inherit',
    padding: 0,
  },
  blockquote: {
    borderLeft: '3px solid',
    borderColor: mode === modes.dark ? 'gray.3' : 'gray.60',
    margin: '1.5rem 0',
    paddingLeft: '1rem',
  },
  hr: {
    border: 'none',
    borderTop: '1px solid',
    borderColor: mode === modes.dark ? 'gray.2' : 'gray.60',
    margin: '2rem 0',
  },
  '.tiptap': {
    py: 9,
    '&:focus': {
      outline: 'none',
    },
  }
});
