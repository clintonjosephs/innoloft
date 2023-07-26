import { getRequest } from "../../helpers/calls";

export const fetchProductData = async (id: string): Promise<any> => {
    try {
        const productData: any = await getRequest(`product/${id}`).then(data => data.json());
        return productData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};