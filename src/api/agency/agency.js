import client from "./client";

const newAgency = (values) => client.post('', values);
const getAllAgencies = () => client.get('');
const uploadImage = (icon, agencyID) => {
    const data = new FormData();
    data.append('icon', icon, icon.name);
    return client.post(`${agencyID}`, data);
};
const updateAgency = (agencyID, fields) => client.patch(`${agencyID}`, {fields: fields});
const getAgencyByID = (agencyID) => client.get(`${agencyID}`);
const deleteIcon = (agencyID) => client.delete(`${agencyID}`);

const requests = {
    newAgency,
    getAllAgencies,
    uploadImage,
    updateAgency,
    getAgencyByID,
    deleteIcon,
}

export default requests;