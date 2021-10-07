// user class functions
// import axios
import axios from "axios";

// import config
const Config = "http://localhost:5000/";

const api = { //api endpoints with crud
    getall: "api/coupons/getall",
    create: "api/coupons/createcoupon",
    update: "api/coupons/update",
    delete: "api/coupons/delete",
    get: "api/coupons/get"
};

//let userinfo = localStorage.getItem('userInfo')
//let token = JSON.parse(userinfo).token;
let userinfo = localStorage.getItem('userInfo')
let userJsom = JSON.parse(userinfo)
let token = ""

if(userJsom ){
    if(userJsom.token){
        token = userJsom.token
    }
}

class Coupon {
    api;

    //Coupons

    async getAllCoupons(params = {}) { //coupn function

        const config = {
            headers: { Authorization: `"token"${token}` }, //passing the token
            params
        };
        return new Promise((resolve, reject) => {
            return axios.get(`${Config}${api.getall}`, config) //connect to backend using axios
                .then(result => {
                    if (result.status === 200) {
                        resolve(result.data)

                    } else {
                        resolve([])

                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }


    async getCouponByID(params) { 
        const config = {
            headers: { Authorization: `"token"${token}` }
        };
        return new Promise((resolve, reject) => {
            return axios.get(`${Config}${api.get}/${params}`, config)
                .then(result => {
                    if (result.status === 200) {
                        resolve(result.data)

                    } else {
                        resolve([])

                    }
                })
                .catch(err => {
                    reject(err)
                })

        })
    }



    async createCoupons(data) {
        const config = {
            headers: { Authorization: `"token"${token}` }
        };
        console.log("dd", data);

        return new Promise((resolve, reject) => {
            axios.post(`${Config}${api.create}`, data, config)
                .then((Response) => {
                    resolve(Response.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    async updateCoupons(data) {
        const config = {
            headers: { Authorization: `"token"${token}` }
        };
        console.log(data.id);

        return new Promise((resolve, reject) => {
            axios.patch(`${Config}${api.update}/${data.id}`, data, config).then((Response) => {
                resolve(Response.data)
            })
                .catch(err => {
                    reject(err)
                })
        })
    }

    async deleteCoupon(data) {
        const config = {
            headers: { authorization: `"token"${token}` }
        };
        console.log(data);

        return new Promise((resolve, reject) => {
            axios.delete(`${Config}${api.delete}/${data}`, config)
                .then((Response) => {
                    resolve(Response.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
export default new Coupon();
