import { useState, useEffect } from "react";
import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
  // useLocation,
} from "react-router-dom";
import { updateContact } from "../data/contacts";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import { useDashContext } from "../context/ViewContext";
import { useOptionStore } from "../store/useOptionStore.tsx";
// import Input from "@mui/material/Input";
// import { storage } from "../firebaseConfig.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export async function action({ request, params }) {
  const formData = await request.formData();
  const imageFiles = [];
  let routeFolder = "";
  for (const key of formData.keys()) {
    console.log("key: ", key);
    if (key.startsWith("route")) {
      routeFolder = formData.get(key);
      console.log("routeFolder: ", routeFolder);
    }
    if (key.startsWith("imgPath")) {
      const file = formData.get(key);
      console.log(file);
      imageFiles.push(file);
    }
  }

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();

  // Create a storage reference from our storage service
  // const storageRef = ref(storage);

  const promises = [];
  // // const storage = getStorage();

  for (var i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    if (file !== null) {
      const storage = getStorage();
      const storageRef = ref(storage, `${routeFolder}/${file.name}`);

      promises.push(
        uploadBytesResumable(storageRef, file).then((uploadResult) => {
          return getDownloadURL(uploadResult.ref);
        }),
      );
    }
  }
  // Get all the downloadURLs
  const photos = await Promise.all(promises);
  console.log("Photos (downloadURLs): ", photos);

  const updates = Object.fromEntries(formData);
  for (var key in updates) {
    if (updates.hasOwnProperty(key)) {
      // object[key] is the current value
      if (key.startsWith("imgPath")) delete updates[key];
    }
  }
  Object.defineProperty(updates, "imgPath", { value: photos });
  console.log("Updates in Edit formData action: ", updates);

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
              m: 0,
            }}
          >
            {contact.imgPath.length} images uploaded
          </Box>
          <Box
            sx={{
              maxWidth: "md",
            }}
          >
            {fileInputArray.map((file, index) => {
              return (
                <TextField
                  key={index}
                  id="outlined-basic"
                  // label="Outlined"
                  name={`imgPath${index}`}
                  variant="outlined"
                  type="file"
                  // inputProps={{
                  //   multiple: true,
                  //   accept: "image/*",
                  // }}
                  sx={{ my: 1, mr: 1 }}
                />
              );
            })}
            <Button
              component="button"
              variant="outlined"
              color="info"
              onClick={() => {
                setFileInputCount((prev) => prev + 1);
              }}
              sx={{ my: 1 }}
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
              label="Title"
              name="title"
              defaultValue={contact.title}
              size="small"
              sx={{ mr: 1, mb: { xs: 1, sm: 0 }, input: { color: "#546E7A" } }}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Year"
              name="year"
              defaultValue={contact.year}
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
              label="Materials"
              defaultValue={contact.materials}
              name="materials"
              size="small"
              sx={{ mr: 1, mb: { xs: 1, sm: 0 }, input: { color: "#607D8B" } }}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Route"
              defaultValue={contact.route}
              name="route"
              size="small"
              sx={{ mr: 1, mb: 1, input: { color: "#607D8B" } }}
            />
          </Box>

          <TextField
            id="outlined-uncontrolled"
            label="Description"
            defaultValue={contact.description}
            multiline
            minRows={12}
            name="description"
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
