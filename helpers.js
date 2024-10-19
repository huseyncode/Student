// get all data
export async function getAllData(url, endpoint) {
    try {
        const response = await axios.get(url + endpoint);
        console.log("STATUS CODE:", response.status);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message);
    }
}

export async function getDataById(url, endpoint, id) {
    try {
        const response = await axios.get(`${url}${endpoint}/${id}`);
        console.log("STATUS CODE:", response.status);
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

export async function deleteDataById(url, endpoint, id) {
    try {
        const response = await axios.delete(`${url}${endpoint}/${id}`);
        console.log("STATUS CODE:", response.status);
        console.log("Resource deleted successfully!");
    } catch (error) {
        console.error("Error:", error.message);
    }
}