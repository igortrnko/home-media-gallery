"use client";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ImageIcon from "@mui/icons-material/Image";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";

const BottomBarNavigation = () => {
  const page = useSelectedLayoutSegment();

  return (
    <Box className="bottom-0 right-0 left-0 fixed">
      <BottomNavigation value={page}>
        <BottomNavigationAction
          href="/pictures"
          LinkComponent={Link}
          label="Slike"
          value="pictures"
          icon={<ImageIcon />}
        />
        <BottomNavigationAction
          href="/albums"
          LinkComponent={Link}
          label="Fototeka"
          value="albums"
          icon={<CollectionsIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomBarNavigation;
