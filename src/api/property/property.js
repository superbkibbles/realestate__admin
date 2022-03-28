import client from "./client";

const getPropertiesById = (propertyID) => client.get(`${propertyID}`);
const getAllProperties = () => client.get(``);
const searchProperties = (search) => client.post("search", { equals: search });
const updateProperty = (propertyID, fields) =>
  client.patch(`update/${propertyID}`, {
    fields,
  });
const newProperty = (values) => client.post("", values);
const uploadMedia = (propertyID, files) => {
  let fileData = new FormData();

  files.forEach((file) => fileData.append("files", file));

  return client.post(`media/${propertyID}`, fileData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const deleteMedia = (propertyID, mediaID) =>
  client.delete(`media/${propertyID}/${mediaID}`);
const uploadMainPic = (propertyID, file) => {
  let fileData = new FormData();

  fileData.append("property_pic", file);
  return client.post(`property_pic/${propertyID}`, fileData);
};

const translate = (id, values, lang) =>
  client.post(`${id}/translate`, values, {
    headers: {
      local: lang,
    },
  });

const getTranslatedArabic = (id) =>
  client.get(
    `${id}/translate`,
    {},
    {
      headers: {
        local: "ar",
      },
    }
  );

const getTranslatedKurdish = (id) =>
  client.get(
    `${id}/translate`,
    {},
    {
      headers: {
        local: "kur",
      },
    }
  );

const requests = {
  getPropertiesById,
  searchProperties,
  newProperty,
  uploadMedia,
  getAllProperties,
  updateProperty,
  deleteMedia,
  uploadMainPic,
  translate,
  getTranslatedArabic,
  getTranslatedKurdish,
};

export default requests;
