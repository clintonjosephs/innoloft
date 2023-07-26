import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useRouter } from 'next/router';
import LoadingOverlay from 'react-loading-overlay-ts';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import NavBar from '../../components/NavBar';
import styles from '../../styles/Products.module.css';
import OfferingDetails from '../../components/OfferingDetails';
import { GetServerSideProps } from 'next';
import { useForm, Controller } from 'react-hook-form';
import { getNamesAsString } from '../../helpers/formatter';
import { fetchTrl, updateProductData } from '../api/product';
import Trl from '../../models/Trl';
import { setformData } from '../../redux/product/formDataSlice';
import { toast } from 'react-toastify';

export interface EditForm {
    video: string;
    categories: string;
    businessModels: string;
    trl: number;
}

const EditOffer: React.FC<{ apiKey: string; trl: Trl[] }> = ({
  apiKey,
  trl,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const data = useSelector((state: RootState) => state.product.data) || undefined;
  const formNameData = useSelector((state: RootState) => state.form) || undefined;
  useEffect(() => {
    if (!data) {
      router.push('/');
    } else {
        dispatch(setformData({ description: data.description, name: data.name }));
    }
  }, [data, router]);

  if (data === undefined) {
    return;
  }
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const { handleSubmit, control } = useForm();

  // post the form data to the backend
  const onSubmit = async (fData: any) => {
    setIsSubmitting(true);
    const formData = { ...fData, ...formNameData };
    const response = await updateProductData(data.id, formData);
    setIsSubmitting(false);
    toast.success(response.name + " offering updated successfully");
    router.push('/products/[ids]', `/products/${data.id}`);
  };

  const latitude = data.company.address.latitude;
  const longitude = data.company.address.longitude;
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x400&markers=color:red%7C${latitude},${longitude}&key=${apiKey}`;

  return (
    <LoadingOverlay active={isSubmitting} spinner text="Updating product offering ...">
      <Header />
      <div className="flex md:flex-row md:px-10 container mx-auto flex-shrink-0 px-4 lg:px-10 my-5 w-100">
        <div className="hidden md:block">
          <SideBar />
        </div>
        <div className="feeds">
          <form onSubmit={handleSubmit(onSubmit)}>
            <NavBar offer_title={data.name} edit={true} />
            <div
              className={`${styles.card} md:ml-5 rounded-lg flex flex-col lg:flex-row bg-white shadow-md`}
            >
              <OfferingDetails
                data={data}
                staticMapUrl={staticMapUrl}
                edit={true}
                handleSubmit={handleSubmit(onSubmit)}
              />
            </div>
            <div
              className={`${styles.card} md:ml-5 rounded-lg flex flex-col bg-white shadow-md mt-8 p-5`}
            >
              <span className="text-sm">Video</span>
              <div className={styles.video}>
                <Controller
                  name="video"
                  control={control}
                  defaultValue={data.video}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="mt-2 w-full text-sm rounded border border-gray-300 px-2 py-1"
                    />
                  )}
                />
              </div>
            </div>

            <div
              className={`${styles.card} md:ml-5 rounded-lg flex flex-col bg-white shadow-md mt-8 p-5`}
            >
              <span className="text-sm">Offer details</span>
              <div className="grid grid-cols-1 sm:w-full md:grid-cols-2 gap-2 mt-4">
                <div className="inputgroup">
                  <label htmlFor="categories">Technology / Categories</label>
                  <Controller
                    name="categories"
                    control={control}
                    defaultValue={getNamesAsString(data.categories)}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="mt-2 w-full text-sm rounded border border-gray-300 px-2 py-1"
                        placeholder="tech1, tech2, tech3"
                      />
                    )}
                  />
                </div>
                <div className="inputgroup">
                  <label htmlFor="businessModels">Business Model</label>
                  <Controller
                    name="businessModels"
                    control={control}
                    defaultValue={getNamesAsString(data.businessModels)}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="mt-2 w-full text-sm rounded border border-gray-300 px-2 py-1"
                        placeholder="model 1, model 2, model 3"
                      />
                    )}
                  />
                </div>
                <div className="inputgroup">
                  <label htmlFor="trl">TRL</label>
                  <Controller
                    name="trl"
                    control={control}
                    defaultValue={data.trl.id}
                    render={({ field }) => (
                      <select
                        id="trl"
                        className="mt-2 w-full text-sm rounded border border-gray-300 px-2 py-1"
                        {...field}
                      >
                        <option value="">Select an option</option>
                        {trl.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                <div className="inputgroup flex flex-col">
                  <label htmlFor="categories">Costs</label>
                  <input
                    id="categories"
                    type="text"
                    readOnly
                    value={data.investmentEffort}
                    className="mt-2 w-full text-sm rounded border border-gray-300 px-2 py-1"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const trl = await fetchTrl();
  return {
    props: {
      trl: trl,
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_STATIC_MAP_API_KEY,
    },
  };
};

export default EditOffer;
