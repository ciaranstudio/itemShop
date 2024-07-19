import { getImageRecords } from "./records";
import { allImages } from "../data/objects";

export async function loadShopImages() {
  const images = await getImageRecords();
  console.log("imageRecords (from loadShopImages): ", images);
  return { images };
}

export async function loadCustomImages(params) {
  console.log("params = ", params);
  const images = allImages;
  if (!images) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { images };
}

export async function loadArtImages(params) {
  console.log("params = ", params);
  const images = allImages;
  if (!images) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { images };
}

export async function loadAboutImages(params) {
  console.log("params = ", params);
  const images = allImages;
  if (!images) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { images };
}

// export async function loadItemImages({ params }) {
//   console.log("params = ", params);
//   const images = allImages;
//   if (!images) {
//     throw new Response("", {
//       status: 404,
//       statusText: "Not Found",
//     });
//   }
//   return { images };
// }

// export async function loadSaleImages({ request }) {
//   console.log("request: ", request);
//   // const url = new URL(request.url);
//   // console.log("request url:", url);
//   // const contacts = await getContacts();
//   // return { contacts };
//   return null;
// }

// export async function loadImage({ params }) {
//   // const contact = await getContact(params.contactId);
//   console.log("params.imageId = ", params.imageId);
//   const image = allImages[params.imageId];
//   if (!image) {
//     throw new Response("", {
//       status: 404,
//       statusText: "Not Found",
//     });
//   }
//   return { image };
// }
