import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Stack, IconButton } from "@mui/material";
import { MENU_ITEMS, LOGO_URL } from "../../constants/appConstants";
import { useMediaQuery } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

function Header(props) {
  const isSmallScreen = useMediaQuery("(max-width:899px)");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{ top: 0, bottom: "auto", backgroundColor: "#131313" }}
      >
        <Toolbar
          sx={{
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <Stack
            width={isSmallScreen ? "100%" : "80%"}
            direction={isSmallScreen ? "column" : "row"}
            alignItems="center"
            justifyContent="center"
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                width: isSmallScreen ? "100%" : "auto",
                justifyContent: isSmallScreen ? "space-between" : "flex-start",
              }}
            >
              <Link href="#" underline="none">
                <img
                  src={LOGO_URL}
                  width={"250px"}
                  height="auto"
                  alt="LOGO WEB COURSE"
                  style={{
                    maxWidth: "100%",
                  }}
                />
              </Link>
              {isSmallScreen && (
                <IconButton
                  size="large"
                  color="primary"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuRoundedIcon fontSize="large" sx={{ color: "#FFF" }} />
                </IconButton>
              )}
            </Stack>
            <Stack
              direction={isSmallScreen ? "column" : "row"}
              justifyContent={"center"}
              alignItems="center"
              gap={isSmallScreen ? 2 : 0}
              sx={{
                width: isSmallScreen ? "100%" : "80%",
              }}
            >
              {isSmallScreen ? null : (
                <Stack direction="row" spacing={4} alignItems="center">
                  {MENU_ITEMS.map((item) => (
                    <Link
                      key={item.name}
                      href={item.url}
                      color="white"
                      underline="none"
                      textTransform="uppercase"
                      fontFamily="Open Sans"
                    >
                      {item.name}
                    </Link>
                  ))}
                </Stack>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ "& .MuiDrawer-paper": { width: "50%" } }}
      >
        <Box
          sx={{ width: "100%", p: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {MENU_ITEMS.map((item) => (
              <ListItem button key={item.name}>
                <Link
                  href={item.url}
                  color="black"
                  underline="none"
                  textTransform="uppercase"
                  fontFamily="Open Sans"
                >
                  <ListItemText primary={item.name} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default Header;
