import { useEffect } from "react";
import { useFetcher, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useOptionStore } from "../../store/useOptionStore.tsx";

export default function AuthStatus() {
  let fetcher = useFetcher();
  let isLoggingOut = fetcher.formData != null;

  // get location from Router hook
  const routerLocation = useLocation();

  // store function to disable three controls
  // so that scroll works in admin interface when open is set to true
  const setStoreOpen = useOptionStore((state) => state.setOpen);

  // useEffect
  useEffect(() => {
    setStoreOpen(false);
  }, [isLoggingOut]);

  return (
    <div>
      <fetcher.Form method="post" action="/logout">
        <ListItemButton
          component="button"
          sx={{ width: "100%" }}
          type="submit"
          disabled={isLoggingOut}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary={isLoggingOut ? "Signing out..." : "Sign out"}
          />
        </ListItemButton>
      </fetcher.Form>
    </div>
  );
}
