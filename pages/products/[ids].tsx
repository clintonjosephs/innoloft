import React from 'react'
import Header from '../../components/Header'
import { ParsedUrlQuery } from 'querystring';
import LoadingOverlay from 'react-loading-overlay-ts';
import { GetServerSideProps } from 'next';

interface Params extends ParsedUrlQuery {
    ids: string;
}

const isLoading = true;

const ViewProduct = () => {
  return (
    <LoadingOverlay active={isLoading} spinner text="Processing request ...">
        <Header />
    </LoadingOverlay>

  )
}

  

export default ViewProduct