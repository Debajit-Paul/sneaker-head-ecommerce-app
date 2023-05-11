import React from "react";
import { client } from "../../lib/client";
import { Product, FooterBanner, HeroBanner } from "../../components";
import { useDispatch } from "react-redux";
import { addData } from "../../redux/feature/categoryDataSlice";

const Home = ({ products, bannerData, categories }) => {
  const dispatch = useDispatch();
  dispatch(addData(categories));
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Products on Sale</h2>
        <p>Find your next Sneakers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-14 lg:px-8 md:px-8 px-8">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const categoryQuery = `*[_type == 'category'] {
    _id,
    name,
      slug,
  }`;
  const categories = await client.fetch(categoryQuery);

  return {
    props: { products, bannerData, categories },
  };
};

export default Home;
