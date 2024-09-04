import Edit from "~/components/icons/Edit";
import { Surface } from "~/components/ui/Surface";
import { Toolbar } from "~/components/ui/Toolbar";
import Tooltip from "~/components/ui/Tooltip";
import LinkRemove from "~/components/icons/LinkRemove";
import ArrowSquareUpRight from "~/components/icons/ArrowSquareUpRight";
import MyLink from "~/components/MyLink";
import ArrowSquareOut from "~/components/icons/ArrowSquareOut";

export type LinkPreviewPanelProps = {
  url: string;
  openInNewTab: boolean;
  onEdit: () => void;
  onClear: () => void;
};

export const LinkPreviewPanel = ({
  onClear,
  onEdit,
  url,
  openInNewTab,
}: LinkPreviewPanelProps) => {
  console.log("URL in LinkPreviewPanel:", url);
  console.log("Open in new tab:", openInNewTab);

  return (
    <Surface
      sx={{
        display: "flex",
        alignItems: "center",
        height: "fit-content",
        py: "4",
        px: "5",
        gap: "4",
      }}
    >
      <MyLink
        to={url}
        target={openInNewTab ? "_blank" : "_self"}
        rel={openInNewTab ? "noopener noreferrer" : ""}
        blue
        sx={{
          display: "flex",
          alignItems: "center",
          wordBreak: "break-all",
          maxWidth: "300px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          margin: "0 4px",
        }}
      >
        {url || "¯\\_(ツ)_/¯"}
        {openInNewTab && <ArrowSquareOut />}
      </MyLink>
      <Tooltip title="Edit link">
        <Toolbar.Button onClick={onEdit}>
          <Edit />
        </Toolbar.Button>
      </Tooltip>
      <Tooltip title="Remove link">
        <Toolbar.Button onClick={onClear}>
          <LinkRemove />
        </Toolbar.Button>
      </Tooltip>
    </Surface>
  );
};
