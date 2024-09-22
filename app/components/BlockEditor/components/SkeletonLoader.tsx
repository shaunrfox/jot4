import React, { useMemo } from "react";
import Box from "~/components/Box";

const SkeletonLoader: React.FC = () => {
  // Memoize the random widths
  const randomWidths = useMemo(
    () =>
      Array(5)
        .fill(0)
        .map(() => 60 + Math.random() * 40),
    [],
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "6",
        paddingTop: "30px",
        width: "100%",
        maxWidth: "650px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {randomWidths.map((width, index) => (
        <Box
          key={index}
          sx={{
            height: "2rem",
            width: `${width}%`,
            backgroundColor: "gray.5",
            borderRadius: "4px",
            animation: "pulse 1.5s infinite ease-in-out",
            "@keyframes pulse": {
              "0%": { opacity: 0.6 },
              "50%": { opacity: 1 },
              "100%": { opacity: 0.6 },
            },
          }}
        />
      ))}
    </Box>
  );
};

export default SkeletonLoader;
