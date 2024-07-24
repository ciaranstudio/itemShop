import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getImageRecord, updateImageRecord } from "../utils/records";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateImageRecord(
    params.imageRecordId,
    {
      favorite: formData.get("favorite") === "true",
    },
    false,
    true,
  );
}

export async function loader({ params }) {
  const imageRecord = await getImageRecord(params.imageRecordId);
  if (!imageRecord) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { imageRecord };
}

export default function Record() {
  const { imageRecord } = useLoaderData();

  return (
    <>
      <Box
        sx={{
          position: "relative",
          p: { xs: 3, md: 6 },
          pr: { md: 0 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Typography
            component="h4"
            variant="h4"
            color="inherit"
            gutterBottom
            sx={{ flexGrow: 1, color: "#424242", mb: 2 }}
          >
            {imageRecord.title || imageRecord.year ? (
              <>{imageRecord.title}</>
            ) : (
              <i>No Title</i>
            )}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", mb: 1, pr: { xs: 0, sm: 1, md: 6 } }}>
          <Favorite imageRecord={imageRecord} />
          <Form action="edit">
            <Button
              type="submit"
              component="button"
              variant="outlined"
              color="primary"
              sx={{ mx: 1 }}
            >
              Edit
            </Button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <Button
              type="submit"
              component="button"
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </Form>
        </Box>

        <Typography variant="subtitle1" color="inherit" sx={{ mt: 0, py: 0 }}>
          {imageRecord.year && <>{imageRecord.year}</>}
        </Typography>
        <Typography variant="subtitle1" color="inherit" sx={{ mt: 0, py: 0 }}>
          {imageRecord.materials && <>{imageRecord.materials}</>}
        </Typography>
        <Typography variant="subtitle1" color="inherit" sx={{ mt: 0, py: 0 }}>
          {imageRecord.size && <>{imageRecord.size}</>}
        </Typography>
        <Typography variant="subtitle1" color="inherit" sx={{ mt: 0, py: 0 }}>
          {imageRecord.order && <>#{imageRecord.order}</>}
        </Typography>
        <Typography variant="subtitle1" color="inherit" sx={{ mt: 0 }}>
          {imageRecord.route && <>{imageRecord.route}</>}
        </Typography>

        <Typography
          variant="body2"
          color="inherit"
          paragraph
          sx={{ pt: 1, pr: { sm: 2, md: 6 }, color: "#455A64" }}
        >
          {imageRecord.description && <>{imageRecord.description}</>}
        </Typography>
        <Typography
          variant="body2"
          color="inherit"
          paragraph
          sx={{ pt: 0, pr: { sm: 2, md: 6 }, color: "#455A64" }}
        >
          {imageRecord.imgPath && (
            <>
              {imageRecord.imgPath.length}
              {imageRecord.imgPath.length === 1 ? " image " : " images "}
              uploaded
            </>
          )}
        </Typography>
      </Box>
    </>
  );
}

function Favorite({ imageRecord }) {
  const fetcher = useFetcher();

  let favorite = imageRecord.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <IconButton
        type="submit"
        component="button"
        name="favorite"
        value={favorite ? "false" : "true"}
        sx={{ p: 0 }}
      >
        {favorite ? <StarIcon /> : <StarBorder />}
      </IconButton>
    </fetcher.Form>
  );
}
