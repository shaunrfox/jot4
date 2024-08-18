import { forwardRef } from 'react'
import { Box } from '~/components/Box'
import { modes } from '~/utils/theme'
import Button from '~/components/Button'

export type CommandButtonProps = {
  active?: boolean
  description: string
  icon: React.ComponentType
  onClick: () => void
  title: string
}

export const CommandButton = forwardRef<HTMLButtonElement, CommandButtonProps>(
  ({ active, icon, onClick, title }, ref) => {
    console.log('Icon:', icon);
    console.log('Title:', title);

    return (
      <Button
        ref={ref}
        onClick={onClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          padding: 1.5,
          gap: 2,
          borderRadius: 'md',
          fontSize: 'xs',
          fontWeight: 'semibold',
          color: ({ mode }) => mode === modes.dark ? 'neutral.400' : 'neutral.500',
          backgroundColor: ({ mode }) => {
            if (active) {
              return mode === modes.dark ? 'neutral.800' : 'neutral.100'
            }
            return 'transparent'
          },
          '&:hover': {
            backgroundColor: ({ mode }) => {
              if (active) {
                return mode === modes.dark ? 'neutral.800' : 'neutral.100'
              }
              return mode === modes.dark ? 'neutral.900' : 'neutral.50'
            },
            color: ({ mode }) => mode === modes.dark ? 'white' : 'black',
          },
        }}
      >
        {icon ? (
          <Box sx={{ width: 24, height: 24 }} as={icon} />
        ) : (
          <Box sx={{ width: 24, height: 24, backgroundColor: 'red' }} />
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start' }}>
          <Box sx={{ fontSize: 'sm', fontWeight: 'medium' }}>{title}</Box>
        </Box>
      </Button>
    )
  },
)

CommandButton.displayName = 'CommandButton'