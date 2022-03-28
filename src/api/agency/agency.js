import client from "./client";

const newAgency = (values) => client.post("", values);
const getAllAgencies = () => client.get("");
const uploadImage = (icon, agencyID, headerPhoto) => {
  const data = new FormData();
  if (icon) data.append("icon", icon, icon.name);
  if (headerPhoto) data.append("header_photo", headerPhoto, headerPhoto.name);
  return client.post(`${agencyID}`, data);
};
const updateAgency = (agencyID, fields) =>
  client.patch(`${agencyID}`, { fields: fields });
const getAgencyByID = (agencyID) => client.get(`${agencyID}`);
const deleteIcon = (agencyID) => client.delete(`${agencyID}`);
const translateAgency = (agencyID, values, lang) =>
  client.patch(`${agencyID}/translate`, values, {
    headers: {
      local: lang,
    },
  });

const requests = {
  newAgency,
  getAllAgencies,
  uploadImage,
  updateAgency,
  getAgencyByID,
  deleteIcon,
  translateAgency,
};

export default requests;
