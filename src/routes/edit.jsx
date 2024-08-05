import { useState, useEffect } from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateImageRecord } from "../utils/records.js";
import { useOptionStore } from "../store/useOptionStore.tsx";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import OptionsOnly from "../components/interface/OptionsOnly.jsx";

// TODO: Create toggle in edit form to enable or disable the Storage upload / file handling aspect of this,
// no need for it if image has not been updated.
export async function action({ request, params }) {
  // state from store
  // const updateImgPathEdit = useOptionStore((state) => state.updateImgPathEdit);
  const formData = await request.formData();
  const imageFiles = [];
  let routeFolder = "";
  let updateImagesCheck = false;
  for (const key of formData.keys()) {
    console.log("key: ", key);
    if (key.startsWith("route")) {
      routeFolder = formData.get(key);
      // console.log("routeFolder: ", routeFolder);
    }
    if (key.startsWith("imgUpdate")) {
      updateImagesCheck = formData.get(key);
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
  if (updateImagesCheck)
    Object.defineProperty(updates, "imgPath", { value: photos });
  // console.log("Updates in Edit formData action: ", updates);
  await updateImageRecord(
    params.imageRecordId,
    updates,
    updateImagesCheck,
    false,
  );
  return redirect(`/admin/records/${params.imageRecordId}`);
}

// const ariaLabel = { "aria-label": "image file upload" };

export default function EditRecord() {
  // state from store
  // const updateImgPathEdit = useOptionStore((state) => state.updateImgPathEdit);

  // action from store
  const setStoreOpen = useOptionStore((state) => state.setOpen);
  // const setUpdateImgPathEdit = useOptionStore(
  //   (state) => state.setUpdateImgPathEdit,
  // );

  const { imageRecord } = useLoaderData();
  const navigate = useNavigate();

  const [fileInputCount, setFileInputCount] = useState(1);
  const [fileInputArray, setFileInputArray] = useState([]);
  useEffect(() => {
    setFileInputArray(Array(fileInputCount).fill(0));
    setStoreOpen(true);
  }, [fileInputCount]);

  // const [checked, setChecked] = useState(false);
  const [showFileInputs, setShowFileInputs] = useState(false);
  const [showShopOptions, setShowShopOptions] = useState(false);

  const handleCheckBoxClick = (type) => () => {
    if (type === "images") {
      setShowFileInputs((prev) => !prev);
    } else if (type === "shop") {
      setShowShopOptions((prev) => !prev);
    }
    // setChecked((prev) => !prev);
  };

  // useEffect(() => {
  //   console.log("checked: ", checked);
  //   setUpdateImgPathEdit(checked);
  // }, [checked]);

  // useEffect(() => {
  //   console.log("updateImgPathEdit: ", updateImgPathEdit);
  // }, [updateImgPathEdit]);

  return (
    <>
      <Form method="post" encType="multipart/form-data">
        <Box
          sx={{
            "& > :not(style)": { p: 1, width: "100%" },
          }}
        >
          {/* <Box
            sx={{
              maxWidth: "md",
              m: 0,
            }}
          >
            {imageRecord.imgPath && (
              <>
                {imageRecord.imgPath.length}
                {imageRecord.imgPath.length === 1 ? " image " : " images "}
                uploaded
              </>
            )}
          </Box> */}

          <Box
            sx={{
              maxWidth: "md",
              m: 0,
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <Checkbox
                onClick={handleCheckBoxClick("images")}
                inputProps={{ "aria-label": "controlled" }}
                name="showFileInputs"
                checked={showFileInputs}
                sx={{ p: 0, mr: 1 }}
              />
              <Typography variant="body2" color="inherit">
                Update image(s)?
              </Typography>
            </Box>
            <Typography variant="body2" color="inherit">
              {imageRecord.imgPath && (
                <>
                  {imageRecord.imgPath.length}
                  {imageRecord.imgPath.length === 1 ? " image " : " images "}
                  uploaded : {imageRecord.imgPath}
                  {/* <img src={imageRecord.imgPath}></img> */}
                </>
              )}
            </Typography>
          </Box>

          {showFileInputs && (
            <Box
              sx={{
                maxWidth: "md",
              }}
            >
              {fileInputArray.map((file, index) => {
                return (
                  <TextField
                    key={index}
                    id={`edit_file${index}`}
                    name={`imgPath${index}`}
                    variant="outlined"
                    type="file"
                    // inputProps={{
                    //   multiple: true,
                    //   accept: "image/*",
                    // }}
                    sx={{ mb: 1, mr: 1 }}
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
                sx={{ my: { sm: 1 } }}
              >
                Add image
              </Button>
            </Box>
          )}

          <Box
            sx={{
              maxWidth: "md",
            }}
          >
            <TextField
              id="edit_title"
              label="Title"
              name="title"
              defaultValue={imageRecord.title}
              size="small"
              sx={{ mr: 1, mb: { xs: 1, sm: 0 }, input: { color: "#546E7A" } }}
            />
            <TextField
              id="edit_year"
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
              id="edit_materials"
              label="Materials"
              defaultValue={imageRecord.materials}
              name="materials"
              size="small"
              sx={{ mr: 1, mb: { xs: 1, sm: 0 }, input: { color: "#607D8B" } }}
            />
            <TextField
              id="edit_route"
              label="Route"
              defaultValue={imageRecord.route}
              name="route"
              size="small"
              sx={{ mr: 1, input: { color: "#607D8B" } }}
            />
          </Box>
          <Box
            sx={{
              maxWidth: "md",
            }}
          >
            <TextField
              id="edit_size"
              label="Size"
              name="size"
              defaultValue={imageRecord.size}
              size="small"
              sx={{
                mr: 1,
                mb: { xs: 1, sm: 1 },
                input: { color: "#546E7A" },
              }}
            />
            <TextField
              id="edit_order"
              label="Order"
              name="order"
              defaultValue={imageRecord.order}
              size="small"
              sx={{ mr: 1, input: { color: "#546E7A" } }}
            />
          </Box>

          <TextField
            id="edit_description"
            label="Description"
            defaultValue={imageRecord.description}
            name="description"
            multiline
            minRows={6} //  minRows={12}
            size="small"
            inputProps={{ style: { color: "#546E7A" } }}
          />

          <Box
            sx={{
              maxWidth: "md",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <Checkbox
                onClick={handleCheckBoxClick("shop")}
                inputProps={{ "aria-label": "controlled" }}
                name="showShopOptions"
                checked={showShopOptions}
                sx={{ p: 0, mr: 1 }}
              />
              <Typography variant="body2" color="inherit">
                Set part options?
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>{showShopOptions && <OptionsOnly admin={true} />}</Box>
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
