import createApiClient from "./api.service";

class NhanvienService {
    constructor(baseUrl = "/api/nhanvien") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get("/")).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    async deleteAll() {
        return (await this.api.delete("/")).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async get_user(username) {
        return (await this.api.get(`?taikhoanNV=${username}`)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async changePassword(id, oldPassword, newPassword) {
        return (await this.api.put(`/${id}/changePassword`, { oldPassword, newPassword })).data;
    }

    // async forgotPassword(id, email) {
    //     return (await this.api.post(`/forgotPassword`, { id, email })).data;
    // }

    async forgotPassword(id, email) {
        return (await this.api.post(`/forgotPassword`, { id, emailNV: email })).data;
    }

}
export default new NhanvienService();