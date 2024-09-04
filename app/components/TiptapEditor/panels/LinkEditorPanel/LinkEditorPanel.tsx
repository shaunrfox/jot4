// TODO Update this to use the new UI components

import { Surface } from "~/components/ui/Surface";
import { Toggle } from "~/components/ui/Toggle";
import Box from "~/components/Box";
import Button from "~/components/Button";
import { Input } from "~/components/Input";
import Link from "~/components/icons/Link";
import { useState, useCallback, useMemo } from "react";

export type LinkEditorPanelProps = {
  initialUrl?: string;
  initialOpenInNewTab?: boolean;
  onSetLink: (url: string, openInNewTab?: boolean) => void;
};

export const useLinkEditorState = ({
  initialUrl,
  initialOpenInNewTab,
  onSetLink,
}: LinkEditorPanelProps) => {
  const [url, setUrl] = useState(initialUrl || "");
  const [openInNewTab, setOpenInNewTab] = useState(
    initialOpenInNewTab || false,
  );

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }, []);

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isValidUrl) {
        onSetLink(url, openInNewTab);
      }
    },
    [url, isValidUrl, openInNewTab, onSetLink],
  );

  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    onChange,
    handleSubmit,
    isValidUrl,
  };
};

export const LinkEditorPanel = ({
  onSetLink,
  initialOpenInNewTab,
  initialUrl,
}: LinkEditorPanelProps) => {
  const state = useLinkEditorState({
    onSetLink,
    initialOpenInNewTab: initialOpenInNewTab || false,
    initialUrl,
  });

  return (
    <Surface sx={{ p: 4 }}>
      <Box
        as="form"
        onSubmit={state.handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 4, mb: 0 }}
      >
        <Input
          id="url-input"
          type="url"
          aria-labelledby="url-input-label"
          placeholder="Enter URL"
          value={state.url}
          onChange={state.onChange}
          withLabel
          label={<Link sx={{ flexShrink: 0 }} />}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Toggle
            checked={state.openInNewTab}
            onCheckedChange={state.setOpenInNewTab}
            label="New tab"
          />
          <Button
            variant="utility"
            size="small"
            type="submit"
            disabled={!state.isValidUrl}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Surface>
  );
};
