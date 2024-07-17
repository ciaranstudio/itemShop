import { useState, useEffect } from "react";
import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { updateContact } from "../data/contacts";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDashContext } from "../context/ViewContext";
import { useOptionStore } from "../store/useOptionStore.tsx";
// import Input from "@mui/material/Input";

export async function action({ request, params }) {
  const formData = await request.formData();
  const imageFiles = [];
  for (const key of formData.keys()) {
    if (key.startsWith("imgPath")) {
      const file = formData.get(key);
      imageFiles.push(file);
    }
  }
  const updates = Object.fromEntries(formData);
  for (var key in updates) {
    if (updates.hasOwnProperty(key)) {
      //Now, object[key] is the current value
      console.log("key: ", key);
      if (key.startsWith("imgPath")) delete updates[key];
    }
  }
  Object.defineProperty(updates, "imgPath", { value: imageFiles });
  console.log("Updates: ", updates);
  await updateContact(params.contactId, updates);
  return redirect(`/admin/contacts/${params.contactId}`);
}

// const ariaLabel = { "aria-label": "image file upload" };

export default function EditContact() {
  // get location from Router hook
  // const routerLocation = useLocation();
  // // get and set context location value
  // const { location, setLocation } = useDashContext();
  // disable three controls so that scroll works in admin interface with open set to true
  const setStoreOpen = useOptionStore((state) => state.setOpen);

  // useEffect
  // useEffect(() => {
  //   setStoreOpen(true);
  // }, []);

  // useEffect(() => {
  //   console.log("routerLocation: ", routerLocation);
  //   setLocation(routerLocation);
  // }, [routerLocation]);

  const { contact } = useLoaderData();
  const navigate = useNavigate();

  const [fileInputCount, setFileInputCount] = useState(1);
  const [fileInputArray, setFileInputArray] = useState([]);
  useEffect(() => {
    setFileInputArray(Array(fileInputCount).fill(0));
    setStoreOpen(true);
  }, [fileInputCount]);

  return (
    <>
      <Form method="post" encType="multipart/form-data">
        <Box
          sx={{
            "& > :not(style)": { p: 1, width: "100%" },
          }}
        >
          <Box
            sx={{
              maxWidth: "md",
            }}
          >
            {fileInputArray.map(() => {
              return (
                <TextField
                  id="outlined-basic"
                  // label="Outlined"
                  name="imgPath0"
                  variant="outlined"
                  type="file"
                  // inputProps={{
                  //   multiple: true,
                  //   accept: "image/*",
                  // }}
                />
              );
            })}
            <Button
              component="button"
              variant="outlined"
              color="primary"
              onClick={() => {
                setFileInputCount((prev) => prev + 1);
              }}
              sx={{ mt: 1 }}
            >
              Add image
            </Button>
          </Box>
          <Box
            sx={{
              maxWidth: "md",
            }}
          >
            <TextField
              id="outlined-uncontrolled"
              label="First name"
              name="first"
              defaultValue={contact.first}
              size="small"
              sx={{ mr: 1, mb: { xs: 1, sm: 0 }, input: { color: "#546E7A" } }}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Last name"
              name="last"
              defaultValue={contact.last}
              size="small"
              sx={{ mr: 1, input: { color: "#546E7A" } }}
            />
          </Box>
          <Box
            sx={{
              maxWidth: "md",
            }}
          >
            <TextField
              id="outlined-uncontrolled"
              label="@instagram"
              defaultValue={contact.instagram}
              name="instagram"
              size="small"
              sx={{ mr: 1, mb: { xs: 1, sm: 0 }, input: { color: "#607D8B" } }}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Artist website"
              defaultValue={contact.website}
              name="website"
              size="small"
              sx={{ mr: 1, mb: 1, input: { color: "#607D8B" } }}
            />
          </Box>

          <TextField
            id="outlined-uncontrolled"
            label="Artist bio..."
            defaultValue={contact.notes}
            multiline
            minRows={12}
            name="notes"
            size="small"
            inputProps={{ style: { color: "#546E7A" } }}
          />
        </Box>

        <Box sx={{ display: "flex", pl: 0.25, pt: 1 }}>
          <Button
            type="submit"
            component="button"
            variant="outlined"
            color="primary"
            sx={{ ml: 0.75, mr: 1.25 }}
          >
            Save
          </Button>

          <Button
            component="button"
            variant="outlined"
            color="warning"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </Box>
      </Form>
    </>
  );
}
