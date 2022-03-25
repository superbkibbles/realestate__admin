import {create} from "apisauce";
import settings from "../../config/settings";

import {getToken, removeUserToken} from "../../auth/storage";

const apiClient = create({
    baseURL: "http://5.188.36.230:3031/api/agency"
});

// apiClient.addAsyncRequestTransform(async (req) => {
//     const token = await getToken();
//     if (!token) return;
//
//     req.headers["Authorization"] = "Bearer " + token;
//     // req.headers["x-auth-token"] = token;
// });

// apiClient.addAsyncResponseTransform(async (res) => {
//     if (res.status === 401) {
//         removeUserToken();
//         console.log(res.status);
//         // window.location.reload();
//     }
// })

export default apiClient;