import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SideBar from '../../components/SideBar';
import styles from '../../styles/Products.module.css';
import UserProfile from '../../components/UserProfile';
import Image from 'next/image';
import NavBar from '../../components/NavBar';
import { fetchProductData } from '../api/product';
import { setproductData } from '../../redux/product/productSlice';
import { convertToEmbedURL, stripTags } from '../../helpers/formatter';
import Label from '../../components/Label';

interface Params extends ParsedUrlQuery {
  ids: string;
}

const ViewProduct: React.FC<{ productData: any; apiKey: string }> = ({
  productData,
  apiKey,
}) => {
  const data =
    useSelector((state: RootState) => state.product.data) || undefined;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setproductData(productData));
  }, [productData]);

  if (data === undefined) {
    return;
  }

  const latitude = data.company.address.latitude;
  const longitude = data.company.address.longitude;
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x400&markers=color:red%7C${latitude},${longitude}&key=${apiKey}`;

  return (
    <>
      <Header />
      <div className="flex md:flex-row md:px-10 container mx-auto flex-shrink-0 px-4 lg:px-10 my-5 w-100">
        <div className="hidden md:block">
          <SideBar />
        </div>
        <div className="feeds">
          <NavBar offer_title={data.name}/>
          <div
            className={`${styles.card} md:ml-5 rounded-lg flex flex-col lg:flex-row bg-white shadow-md`}
          >
            <div className={styles.main_info}>
              <div
                className={`${styles.card_header} rounded-tl-lg`}
                style={{ backgroundImage: `url(${data.picture})` }}
              >
                <div
                  className={`${styles.label} bg-white w-28 rounded-br-lg flex flex-row items-center`}
                >
                  <div className={`${styles.medal}`}>
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 7.75C7.72917 7.75 8.34896 7.49479 8.85938 6.98438C9.38021 6.46354 9.64062 5.83854 9.64062 5.10938C9.64062 4.38021 9.38021 3.76042 8.85938 3.25C8.34896 2.72917 7.72917 2.46875 7 2.46875C6.27083 2.46875 5.64583 2.72917 5.125 3.25C4.61458 3.76042 4.35938 4.38021 4.35938 5.10938C4.35938 5.83854 4.61458 6.46354 5.125 6.98438C5.64583 7.49479 6.27083 7.75 7 7.75ZM7 3.46875C7.45833 3.46875 7.84375 3.63021 8.15625 3.95312C8.47917 4.27604 8.64062 4.66146 8.64062 5.10938C8.64062 5.56771 8.47917 5.95833 8.15625 6.28125C7.84375 6.59375 7.45833 6.75 7 6.75C6.54167 6.75 6.15104 6.59375 5.82812 6.28125C5.51562 5.95833 5.35938 5.56771 5.35938 5.10938C5.35938 4.66146 5.51562 4.27604 5.82812 3.95312C6.15104 3.63021 6.54167 3.46875 7 3.46875ZM13.4062 13.6406L10.5469 8.6875L10.75 8.625C10.9688 8.5625 11.1458 8.44271 11.2812 8.26562C11.4271 8.07812 11.5 7.86979 11.5 7.64062C11.5 7.63021 11.5 7.61979 11.5 7.60938C11.5 7.59896 11.5 7.58854 11.5 7.57812L11.4531 6.54688L12.0938 5.75C12.1667 5.66667 12.2188 5.57292 12.25 5.46875C12.2917 5.35417 12.3125 5.23438 12.3125 5.10938C12.3125 4.98438 12.2917 4.86979 12.25 4.76562C12.2188 4.65104 12.1667 4.55208 12.0938 4.46875L11.4531 3.65625L11.5 2.64062C11.5 2.63021 11.5 2.625 11.5 2.625C11.5 2.61458 11.5 2.60417 11.5 2.59375C11.5 2.35417 11.4271 2.14583 11.2812 1.96875C11.1458 1.78125 10.9688 1.65625 10.75 1.59375L9.75 1.3125L9.1875 0.46875C9.09375 0.322917 8.96875 0.208333 8.8125 0.125C8.66667 0.0416667 8.50521 0 8.32812 0C8.26562 0 8.20312 0.00520833 8.14062 0.015625C8.07812 0.0260417 8.01562 0.0416667 7.95312 0.0625H7.96875L7 0.4375C7 0.4375 6.99479 0.4375 6.98438 0.4375C6.98438 0.427083 6.98438 0.427083 6.98438 0.4375L6.03125 0.0625C5.97917 0.0416667 5.92188 0.0260417 5.85938 0.015625C5.79688 0.00520833 5.73438 0 5.67188 0C5.49479 0 5.32812 0.0416667 5.17188 0.125C5.02604 0.208333 4.90625 0.322917 4.8125 0.46875L4.23438 1.32812L3.25 1.59375C3.03125 1.65625 2.84896 1.78125 2.70312 1.96875C2.56771 2.14583 2.5 2.35417 2.5 2.59375C2.5 2.59375 2.5 2.59896 2.5 2.60938C2.5 2.61979 2.5 2.63021 2.5 2.64062L2.54688 3.67188L1.90625 4.46875C1.83333 4.55208 1.77604 4.65104 1.73438 4.76562C1.70312 4.86979 1.6875 4.98438 1.6875 5.10938C1.6875 5.23438 1.70312 5.35417 1.73438 5.46875C1.77604 5.57292 1.83333 5.66667 1.90625 5.75L2.54688 6.5625L2.5 7.57812C2.5 7.58854 2.5 7.59896 2.5 7.60938C2.5 7.61979 2.5 7.63021 2.5 7.64062C2.5 7.86979 2.56771 8.07812 2.70312 8.26562C2.84896 8.44271 3.03125 8.5625 3.25 8.625L3.45312 8.6875L0.59375 13.6406C0.572917 13.6823 0.557292 13.724 0.546875 13.7656C0.536458 13.8073 0.53125 13.849 0.53125 13.8906C0.53125 13.9531 0.536458 14.0104 0.546875 14.0625C0.567708 14.1146 0.59375 14.1615 0.625 14.2031C0.677083 14.2552 0.734375 14.3021 0.796875 14.3438C0.869792 14.375 0.947917 14.3906 1.03125 14.3906C1.05208 14.3906 1.07292 14.3906 1.09375 14.3906C1.11458 14.3906 1.13542 14.3854 1.15625 14.375L2.85938 13.9219L3.32812 15.625C3.35938 15.7396 3.41667 15.8281 3.5 15.8906C3.59375 15.9635 3.69792 16 3.8125 16C3.89583 16 3.97396 15.974 4.04688 15.9219C4.13021 15.8802 4.19271 15.8229 4.23438 15.75L7 10.9688L9.76562 15.75C9.80729 15.8229 9.86458 15.8802 9.9375 15.9219C10.0208 15.974 10.1042 16 10.1875 16C10.1979 16 10.2031 16 10.2031 16C10.3177 16 10.4167 15.9635 10.5 15.8906C10.5938 15.8281 10.651 15.7396 10.6719 15.625L11.1406 13.9219L12.8438 14.375C12.8646 14.3854 12.8854 14.3906 12.9062 14.3906C12.9271 14.3906 12.9479 14.3906 12.9688 14.3906C13.0521 14.3906 13.125 14.375 13.1875 14.3438C13.2604 14.3021 13.3229 14.2552 13.375 14.2031C13.4062 14.1615 13.4271 14.1146 13.4375 14.0625C13.4583 14.0104 13.4688 13.9531 13.4688 13.8906C13.4688 13.849 13.4635 13.8073 13.4531 13.7656C13.4427 13.724 13.4271 13.6823 13.4062 13.6406ZM2.6875 5.09375L3.32812 4.29688C3.40104 4.21354 3.45312 4.11979 3.48438 4.01562C3.52604 3.90104 3.54688 3.78125 3.54688 3.65625C3.54688 3.64583 3.54688 3.63542 3.54688 3.625C3.54688 3.61458 3.54688 3.60938 3.54688 3.60938L3.51562 2.5625L4.5 2.29688C4.625 2.26562 4.73438 2.21354 4.82812 2.14062C4.93229 2.05729 5.02083 1.96875 5.09375 1.875V1.85938L5.6875 1L6.64062 1.35938C6.69271 1.38021 6.75 1.40104 6.8125 1.42188C6.875 1.43229 6.9375 1.4375 7 1.4375C7.0625 1.4375 7.125 1.43229 7.1875 1.42188C7.25 1.40104 7.3125 1.38021 7.375 1.35938H7.35938L8.34375 1.01562L8.90625 1.85938C8.97917 1.96354 9.0625 2.05729 9.15625 2.14062C9.26042 2.21354 9.36979 2.26562 9.48438 2.29688H9.5L10.5 2.59375L10.4531 3.60938C10.4531 3.61979 10.4531 3.63021 10.4531 3.64062C10.4531 3.64062 10.4531 3.64583 10.4531 3.65625C10.4531 3.78125 10.4688 3.90104 10.5 4.01562C10.5417 4.11979 10.599 4.21354 10.6719 4.29688L11.3125 5.125L10.6719 5.92188C10.599 6.00521 10.5417 6.10417 10.5 6.21875C10.4688 6.32292 10.4531 6.4375 10.4531 6.5625C10.4531 6.57292 10.4531 6.58333 10.4531 6.59375C10.4531 6.60417 10.4531 6.61458 10.4531 6.625V6.60938L10.4844 7.65625L9.5 7.92188C9.375 7.96354 9.26042 8.02083 9.15625 8.09375C9.0625 8.16667 8.97917 8.25521 8.90625 8.35938L8.3125 9.21875L7.35938 8.85938C7.30729 8.83854 7.25 8.82292 7.1875 8.8125C7.125 8.80208 7.0625 8.79688 7 8.79688C6.9375 8.79688 6.875 8.80208 6.8125 8.8125C6.75 8.82292 6.6875 8.83854 6.625 8.85938H6.64062L5.65625 9.20312L5.09375 8.35938C5.02083 8.25521 4.93229 8.16667 4.82812 8.09375C4.73438 8.02083 4.63021 7.96354 4.51562 7.92188H4.5L3.5 7.64062L3.54688 6.60938C3.54688 6.60938 3.54688 6.60417 3.54688 6.59375C3.54688 6.58333 3.54688 6.57292 3.54688 6.5625C3.54688 6.4375 3.52604 6.32292 3.48438 6.21875C3.45312 6.10417 3.40104 6.00521 3.32812 5.92188L2.6875 5.09375ZM3.98438 14.2031L3.70312 13.1719C3.67188 13.0677 3.60938 12.9844 3.51562 12.9219C3.43229 12.849 3.33333 12.8125 3.21875 12.8125C3.19792 12.8125 3.17188 12.8125 3.14062 12.8125C3.11979 12.8125 3.10417 12.8177 3.09375 12.8281L2.0625 13.0938L4.375 9.09375L4.8125 9.75C4.90625 9.89583 5.02604 10.0104 5.17188 10.0938C5.32812 10.1771 5.49479 10.2188 5.67188 10.2188C5.74479 10.2188 5.80729 10.2135 5.85938 10.2031C5.92188 10.1927 5.98438 10.1771 6.04688 10.1562H6.03125L6.39062 10.0156L3.98438 14.2031ZM10.9062 12.8281C10.8854 12.8177 10.8646 12.8125 10.8438 12.8125C10.8229 12.8125 10.8021 12.8125 10.7812 12.8125C10.6667 12.8125 10.5625 12.849 10.4688 12.9219C10.3854 12.9844 10.3281 13.0677 10.2969 13.1719L10.0156 14.2031L7.60938 10.0156L7.95312 10.1562C8.01562 10.1771 8.07812 10.1927 8.14062 10.2031C8.20312 10.2135 8.26562 10.2188 8.32812 10.2188C8.50521 10.2188 8.66667 10.1771 8.8125 10.0938C8.96875 10.0104 9.09375 9.90104 9.1875 9.76562V9.75L9.625 9.09375L11.9375 13.0938L10.9062 12.8281Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <span className="text-center w-16">Patent</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-sm font-bold mb-2">{data.name}</h2>
                <p className="text-gray-600 text-sm">
                  {stripTags(data.description)}
                </p>
              </div>
            </div>
            <div className={`${styles.address} rounded-tr-lg md:w-40 p-4`}>
              <div className="w-100">
                <h2 className="text-base font-bold mb-2 text-indigo-900">
                  Offered By
                </h2>
                <Image
                  src={data.company.logo}
                  width={250}
                  height={16}
                  alt="flag"
                  style={{ objectFit: 'contain' }}
                  className="my-4"
                />
                <UserProfile
                  user={data.user}
                  company_name={data.company.name}
                />
                <div className="flex flex-row w-3/4 gap-2 mt-5">
                  <div className="text-[#6B7280]">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_11001_560)">
                        <path
                          d="M8.00001 16.3149C7.8674 16.3149 7.74023 16.2623 7.64646 16.1685C7.55269 16.0747 7.50001 15.9475 7.50001 15.8149C7.50001 13.646 6.25781 12.0073 5.05661 10.4233C3.93551 8.94494 2.77731 7.41744 2.77731 5.53764C2.77731 4.1525 3.32756 2.82408 4.30701 1.84463C5.28645 0.865189 6.61487 0.314941 8.00001 0.314941C9.38516 0.314941 10.7136 0.865189 11.693 1.84463C12.6725 2.82408 13.2227 4.1525 13.2227 5.53764C13.2227 7.41764 12.0645 8.94484 10.9434 10.4233C9.74221 12.0073 8.50001 13.646 8.50001 15.8149C8.50001 15.9475 8.44734 16.0747 8.35357 16.1685C8.2598 16.2623 8.13262 16.3149 8.00001 16.3149ZM8.00001 1.31494C6.8805 1.31629 5.80722 1.76161 5.0156 2.55323C4.22399 3.34485 3.77866 4.41813 3.77731 5.53764C3.77731 7.08054 4.78611 8.41064 5.85351 9.81884C6.72252 10.8678 7.44466 12.0302 8.00001 13.2739C8.55537 12.0302 9.2775 10.8678 10.1465 9.81884C11.2139 8.41064 12.2227 7.08054 12.2227 5.53764C12.2214 4.41813 11.776 3.34485 10.9844 2.55323C10.1928 1.76161 9.11953 1.31629 8.00001 1.31494Z"
                          fill="#6B7280"
                        />
                        <path
                          d="M8 7.64405C7.58327 7.64398 7.17592 7.52032 6.82946 7.28872C6.48301 7.05713 6.21301 6.728 6.05362 6.34295C5.89422 5.95791 5.85259 5.53424 5.93398 5.12553C6.01537 4.71683 6.21614 4.34143 6.51088 4.04683C6.80563 3.75222 7.18112 3.55164 7.58986 3.47044C7.99861 3.38924 8.42226 3.43107 8.80723 3.59065C9.1922 3.75023 9.5212 4.02038 9.75263 4.36695C9.98406 4.71351 10.1075 5.12092 10.1074 5.53765C10.1066 6.09623 9.88426 6.63167 9.48919 7.02655C9.09413 7.42143 8.55858 7.6435 8 7.64405ZM8 4.43015C7.7811 4.43023 7.56713 4.49521 7.38515 4.61688C7.20317 4.73854 7.06134 4.91143 6.9776 5.11369C6.89386 5.31594 6.87197 5.53848 6.91469 5.75318C6.9574 5.96788 7.06282 6.16509 7.2176 6.31989C7.37238 6.47468 7.56959 6.58011 7.78428 6.62285C7.99897 6.66559 8.22152 6.64372 8.42378 6.55999C8.62604 6.47627 8.79894 6.33446 8.92062 6.15249C9.04231 5.97052 9.1073 5.75656 9.1074 5.53765C9.10701 5.24407 8.99021 4.96262 8.78262 4.75501C8.57503 4.5474 8.29359 4.43058 8 4.43015Z"
                          fill="#6B7280"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_11001_560">
                          <rect
                            width="16"
                            height="16"
                            fill="white"
                            transform="translate(0 0.314941)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="text-sm text-[#6B7280]">
                    {data.company.address.street} {data.company.address.house}{' '}
                    {data.company.address.zipCode} {data.company.address.city.name}
                  </div>
                </div>
                <div style={{ width: '100%' }}>
                  {/* Set the width to 100% */}
                  <Image
                    src={staticMapUrl}
                    alt="map"
                    layout="responsive"
                    width={250}
                    height={250}
                  />
                </div>
              </div>
            </div>
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

  const response = await fetchProductData(ids);
  if (!response.id) {
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
    },
  };
};

export default ViewProduct;
