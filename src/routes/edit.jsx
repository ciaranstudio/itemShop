import { useState, useEffect } from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateImageRecord } from "../utils/records.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useOptionStore } from "../store/useOptionStore.tsx";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// TODO: Create toggle in edit form to enable or disable the Storage upload / file handling aspect of this,
// no need for it if image has not been updated.
export async function action({ request, params }) {
  const formData = await request.formData();
  const imageFiles = [];
  let routeFolder = "";
  for (const key of formData.keys()) {
    // console.log("key: ", key);
    if (key.startsWith("route")) {
      routeFolder = formData.get(key);
      // console.log("routeFolder: ", routeFolder);
    }
    if (key.startsWith("imgPath")) {
      const file = formData.get(key);
      // console.log(file);
      imageFiles.push(file);
    }
  }

  const promises = [];

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
  // console.log(
  //   "Prepped photos (downloadURLs) for Firebase Storage upload: ",
  //   photos,
  // );

  const updates = Object.fromEntries(formData);
  for (var key in updates) {
    if (updates.hasOwnProperty(key)) {
      // object[key] is the current value
      if (key.startsWith("imgPath")) delete updates[key];
    }
  }
  Object.defineProperty(updates, "imgPath", { value: photos });
  // console.log("Updates in Edit formData action: ", updates);

  await updateImageRecord(params.imageRecordId, updates, false);
  return redirect(`/admin/records/${params.imageRecordId}`);
}

// const ariaLabel = { "aria-label": "image file upload" };

export default function EditRecord() {
  const setStoreOpen = useOptionStore((state) => state.setOpen);

  const { imageRecord } = useLoaderData();
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
            {imageRecord.imgPath && (
              <>{imageRecord.imgPath.length} images uploaded</>
            )}
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
              defaultValue={imageRecord.title}
              size="small"
              sx={{ mr: 1, mb: { xs: 1, sm: 0 }, input: { color: "#546E7A" } }}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Year"
              name="year"
              defaultValue={imageRecord.year}
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
              defaultValue={imageRecord.materials}
              name="materials"
              size="small"
              sx={{ mr: 1, mb: { xs: 1, sm: 0 }, input: { color: "#607D8B" } }}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Route"
              defaultValue={imageRecord.route}
              name="route"
              size="small"
              sx={{ mr: 1, mb: 1, input: { color: "#607D8B" } }}
            />
          </Box>

          <TextField
            id="outlined-uncontrolled"
            label="Description"
            defaultValue={imageRecord.description}
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
