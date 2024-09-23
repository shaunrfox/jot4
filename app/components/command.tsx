import * as React from "react";
import styled from "@emotion/styled";
import Box from "~/components/Box";

const CommandDialog = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1000;
`;

const CommandInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #e2e8f0;
  outline: none;
`;

const CommandList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
`;

const CommandItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f7fafc;
  }
`;

const CommandEmpty = styled.li`
  padding: 12px 16px;
  color: #a0aec0;
`;

interface CommandProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Command({ isOpen, onClose, children }: CommandProps) {
  if (!isOpen) return null;

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
        }}
        onClick={onClose}
      />
      <CommandDialog>{children}</CommandDialog>
    </>
  );
}

Command.Input = CommandInput;
Command.List = CommandList;
Command.Item = CommandItem;
Command.Empty = CommandEmpty;

// export { SearchIcon, CommandIcon };
