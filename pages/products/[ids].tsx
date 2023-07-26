import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SideBar from '../../components/SideBar';
import styles from '../../styles/Products.module.css';
import Image from 'next/image';
import NavBar from '../../components/NavBar';
import { fetchAppSetup, fetchProductData } from '../api/product';
import { setproductData } from '../../redux/product/productSlice';
import { convertToEmbedURL } from '../../helpers/formatter';
import Label from '../../components/Label';
import OfferingDetails from '../../components/OfferingDetails';
import { setAppSetupData } from '../../redux/product/appSetupSlice';

interface Params extends ParsedUrlQuery {
  ids: string;
}

const ViewProduct: React.FC<{ productData: any; apiKey: string, appSetup: any }> = ({
  productData,
  apiKey,
  appSetup
}) => {
  const data =
    useSelector((state: RootState) => state.product.data) || undefined;
  const { hasUserSection, mainColor } = useSelector((state: RootState) => state.appSetup) || undefined;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setproductData(productData));
    dispatch(setAppSetupData(appSetup));
  }, [productData]);

  if (data === undefined) {
    return;
  }

  const latitude = data.company.address.latitude;
  const longitude = data.company.address.longitude;
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x400&markers=color:red%7C${latitude},${longitude}&key=${apiKey}`;

  return (
    <>
      <Header mainColor={mainColor || 'bg-header-blue'} />
      <div className="flex md:flex-row md:px-10 container mx-auto flex-shrink-0 px-4 lg:px-10 my-5 w-100">
        <div className="hidden md:block">
          <SideBar />
        </div>
        <div className="feeds">
          <NavBar offer_title={data.name} edit={false}/>
          <div className={`${styles.card} md:ml-5 rounded-lg flex flex-col lg:flex-row bg-white shadow-md`}>
            <OfferingDetails data={data} staticMapUrl={staticMapUrl} edit={false} hasUserSection={hasUserSection || true} />
          </div>

          {/* Video content start */}
          <div
            className={`${styles.card} md:ml-5 rounded-lg flex flex-col bg-white shadow-md mt-8 p-5`}
          >
            <span className="text-sm">Video</span>
            <div className={styles.video}>
              <iframe
                src={convertToEmbedURL(data.video)}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>

          <div
            className={`${styles.card} md:ml-5 rounded-lg flex flex-col bg-white shadow-md mt-8 p-5`}
          >
            <span className="text-sm">Offer details</span>
            <div className="flex md:flex-row flex-col mt-3">
              <div className="flex flex-col md:w-1/2 mb-4">
                <span className="text-sm text-[#6B7280] flex gap-2 items-center">
                  <Image
                    src="/assets/images/technology_icon.png"
                    width={24}
                    height={24}
                    alt="innoloft_logo"
                  />
                  Categories
                </span>
                <div className="flex flex-row gap-1 mt-4 flex-wrap">
                  {data.categories.map((item: any) => (
                    <Label text={item.name} key={item.id} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col md:w-1/2">
                <span className="text-sm text-[#6B7280] flex gap-2 items-center">
                  <Image
                    src="/assets/images/business_model_icon.png"
                    width={24}
                    height={24}
                    alt="innoloft_logo"
                  />
                  Business Model
                </span>
                <div className="flex flex-row gap-1 mt-4 w-full flex-wrap">
                  {data.businessModels.map((item: any) => (
                    <Label text={item.name} key={item.id} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex md:flex-row flex-col mt-8">
              <div className="flex flex-col md:w-1/2 mb-4">
                <span className="text-sm text-[#6B7280] flex gap-2 items-center">
                  <Image
                    src="/assets/images/trl_icon.png"
                    width={24}
                    height={24}
                    alt="innoloft_logo"
                  />
                  TRL
                </span>
                <div className="flex flex-row gap-1 mt-4 flex-wrap">
                  <Label text={data.trl.name} />
                </div>
              </div>
              <div className="flex flex-col md:w-1/2">
                <span className="text-xs text-[#6B7280] flex gap-2 items-center">
                  <Image
                    src="/assets/images/costs_icon.png"
                    width={24}
                    height={24}
                    alt="innoloft_logo"
                  />
                  Costs
                </span>
                <div className="flex flex-row gap-1 mt-4">
                  <Label text={data.investmentEffort} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ids } = context.params as Params;
  const APP_ID = process.env.NEXT_PUBLIC_APP_ID || '';

  const response = await fetchProductData(ids);
  const appSetup = await fetchAppSetup(APP_ID);
  if (!response.id || !appSetup.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      productData: response,
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_STATIC_MAP_API_KEY,
      appSetup,
    },
  };
};

export default ViewProduct;
