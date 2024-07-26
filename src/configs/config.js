const BASE_URL = 'http://localhost:8091';

const API_URLS = {
    LOGIN: `${BASE_URL}/admin/login`,
    ADMIN_LIST : `${BASE_URL}/admin/getAdminList`,
    RUNNING_NUMBER : `${BASE_URL}/queueNumber/getRunningNumber`,
    CREATE_GUEST: `${BASE_URL}/guest/createGuest`,
    REGISTER: `${BASE_URL}/admin/createAdmin`,

    DO_ACTION : (selectedGuestId,actionType) => `${BASE_URL}/guest/doAction/${selectedGuestId}/${actionType}`,
    GET_GUEST_LIST: (page, size, query) => `${BASE_URL}/guest/getPage?pageNumber=${page}&pageSize=${size}&filter=${query}`,
    GET_ADMIN_LIST: (page, size, query) => `${BASE_URL}/admin/getPage?pageNumber=${page}&pageSize=${size}&filter=${query}`,
    DOWNLOAD_REPORT : (formattedDate, status) => `${BASE_URL}/guest/generateXlsxReport/${formattedDate}/${status}`,
    DELETE_ADMIN : (adminId) => `${BASE_URL}/admin/deleteAdmin/${adminId}`,
    ADMIN_GET_BY_ID: (adminId) => `${BASE_URL}/admin/getById/${adminId}`,
    UPDATE_ADMIN:(adminId) => `${BASE_URL}/admin/updateAdmin/${adminId}`,

};

export default API_URLS;