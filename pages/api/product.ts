import { getRequest, putRequest } from "../../helpers/calls";

export const fetchProductData = async (id: string): Promise<any> => {
    try {
        const productData: any = await getRequest(`product/${id}`).then(data => data.json());
        return productData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const fetchTrl = async (): Promise<any> => {
    try {
        const trlData: any = await getRequest('trl').then(data => data.json());
        return trlData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateProductData = async (id: string, data: any): Promise<any> => {
    try {
        const updateData: any = await putRequest(`product/${id}`, data).then(data => data.json());
        return updateData;
    } catch (error) {
        console.error(error);
    }
};

export const fetchAppSetup = async (appid: string): Promise<any> => {
    try {
        const appSetup: any = await getRequest(`configuration/${appid}/`).then(data => data.json());
        return appSetup;
    } catch (error) {
        console.error(error);
    }
};