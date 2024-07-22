// import { getImageRecords } from "./records";
import { getRouteImages } from "./records";
import { allImages } from "../data/objects";

export async function loadShopImages() {
  const images = await getRouteImages("shop");
  console.log("imageRecords (from loadShopImages): ", images);
  return { images };
}

export async function loadCustomImages() {
  const images = await getRouteImages("custom");
  console.log("imageRecords (from loadCustomImages): ", images);
  return { images };
}

export async function loadArtworkImages() {
  const images = await getRouteImages("artwork");
  console.log("imageRecords (from loadArtworkImages): ", images);
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
