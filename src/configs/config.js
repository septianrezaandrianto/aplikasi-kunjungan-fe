const BASE_URL = 'http://localhost:8091';

const API_URLS = {
    LOGIN: `${BASE_URL}/admin/login`,
    ADMIN_LIST : `${BASE_URL}/admin/getAdminList`,
    RUNNING_NUMBER : `${BASE_URL}/queueNumber/getRunningNumber`,
    CREATE_GUEST: `${BASE_URL}/guest/createGuest`,

    DO_ACTION : (selectedGuestId,actionType) => `${BASE_URL}/guest/doAction/${selectedGuestId}/${actionType}`,
    GET_GUEST_LIST: (page, size, query) => `${BASE_URL}/guest/getPage?pageNumber=${page}&pageSize=${size}&filter=${query}`
};

export default API_URLS;