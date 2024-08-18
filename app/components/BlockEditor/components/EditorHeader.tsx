import { Icon } from '~/components/ui/Icon'
import { EditorInfo } from './EditorInfo'
import { EditorUser } from '../types'
import { WebSocketStatus } from '@hocuspocus/provider'
import { Toolbar } from '~/components/ui/Toolbar'
import Box from '~/components/Box'
import { themeHelper, sxPropHelper, type StyleProps } from "~/utils/styled";
import { modes } from "~/utils/theme";

export type EditorHeaderProps = {
  isSidebarOpen?: boolean
  toggleSidebar?: () => void
  characters: number
  words: number
  collabState: WebSocketStatus
  users: EditorUser[]
}

export const EditorHeader = ({
  characters,
  collabState,
  users,
  words,
  isSidebarOpen,
  toggleSidebar,
}: EditorHeaderProps) => {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      flexShrink: 0,
      py: 2,
      pl: 6,
      pr: 3,
      color: ({ mode }) =>
          mode === modes.dark ? "gray.0" : "gray.900",
      bg: ({ mode }) =>
          mode === modes.dark ? "gray.800" : "gray.0",
      borderBottom: "1px solid",
      borderColor: ({ mode }) =>
          mode === modes.dark ? "gray.200" : "gray.800",
    }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5, alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5, alignItems: "center" }}>
          <Toolbar.Button
            tooltip={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            onClick={toggleSidebar}
            active={isSidebarOpen}
          >
            <Icon name={isSidebarOpen ? 'PanelLeftClose' : 'PanelLeft'} />
          </Toolbar.Button>
        </Box>
      </Box>
      <EditorInfo characters={characters} words={words} collabState={collabState} users={users} />
    </Box>
  )
}
