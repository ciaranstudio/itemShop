import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
// import { useOptionStore } from "../../store/useOptionStore.tsx";
import { goTo } from "../../utils/goTo.js";
import { theme } from "../../data/theme.js";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import {
//   Form,
//   // useLoaderData, redirect, useNavigate
// } from "react-router-dom";
// import { createSubscribedEmailRecord } from "../../utils/records.js";

// export async function action({ request }) {
//   const formData = await request.formData();
//   const updates = Object.fromEntries(formData);
//   console.log("Updates in SubscribeEmailBox formData action: ", updates);
//   // create email record doc in Firestore and return it (with ID for updating)
//   const newEmailRecord = await createSubscribedEmailRecord();
//   console.log("newEmailRecord: ", newEmailRecord);
//   // update Firestore emails collection with entered user email address in updates
//   // await updateImageRecord(newEmailRecord.uuid, updates, false);
//   return redirect(`/subscribe`);
// }

export default function SubscribeEmailBox() {
  // state from store
  // const signedUpForMailingList = useOptionStore(
  //   (state) => state.signedUpForMailingList,
  // );

  // actions from store
  // const setSignedUpForMailingList = useOptionStore(
  //   (state) => state.setSignedUpForMailingList,
  // );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div
        className="shop-item-description"
        style={{
          paddingBottom: "1rem",
        }}
      >
        <div
          id="title"
          style={{
            color: theme.palette.info.main,
          }}
        >
          <IconButton
            onClick={() => goTo("/")}
            color="inherit"
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: -3,
              left: 0,
              padding: "0.5rem",
            }}
            aria-label="close info box"
          >
            <CloseOutlinedIcon color="primary" fontSize={"small"} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.125rem",
              mb: 1,
            }}
          >
            PRE-SALE LIST
          </Typography>
        </div>
        <div id="description" style={{ marginTop: "0.25rem" }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "0.82rem",
            }}
            color="prmimary"
          >
            Click below to sign up:
          </Typography>
          <Button
            variant="outlined"
            sx={{
              pointerEvents: "auto",
              mt: 1,
              backgroundColor: "rgb(233, 234, 233)",
            }}
            onClick={() => {
              window.open("http://eepurl.com/iUjMH-/", "_blank", "noreferrer");
            }}
          >
            Sign up
          </Button>
        </div>
        <div
          id="description"
          style={{
            background: "rgb(233, 234, 233)",
            borderRadius: "2rem",
            border: "2px solid lightGrey",
            padding: "0.25rem",
            marginTop: "0.75rem",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "0.82rem",
              color: theme.palette.primary.main,
            }}
          >
            Sale coming soon!
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "0.82rem",
              color: theme.palette.primary.main,
            }}
          >
            Summer/Fall 2024
          </Typography>
        </div>
      </div>
      {/* use signedUpForMailingList to enable / disable submit email button / show email entry text field */}
      {/* <Form method="post">
        <Box
          sx={{
            maxWidth: "md",
            mt: -0.75,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              id="outlined-uncontrolled"
              label="Email"
              name="email"
              defaultValue=""
              size="small"
              sx={{ mr: 1, input: { color: "white" } }}
              color="info"
              variant="outlined"
              focused
            />
            <Button
              type="submit"
              component="button"
              variant="contained"
              color="success"
              aria-label="submit email for pre-sale mailing list"
              sx={{
                display: "inline",
                pointerEvents: "auto",
                color: "#ffffff",
                fontSize: "1rem",             
              }}
              // onClick={}
            >
              SIGN UP
            </Button>
          </span>
        </Box>
      </Form> */}
    </ThemeProvider>
    // </Html>
  );
}
