import * as axios from '../helpers/axios';

const getCstItems = () =>
    new Promise((resolve, reject) => {
        axios.auth
            .request({
                url: '/cst-items',
                method: 'GET',
                params: { status: 1 }
            })
            .then(
                ({ data: { data: responseData } }) => {
                    if (responseData) {
                        resolve(responseData);
                    }
                },
                (error) => {
                    reject(error);
                },
            );
    });

export { getCstItems };
