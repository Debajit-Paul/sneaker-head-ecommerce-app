import React from "react";
import { Product } from "../../../components";
import { client } from "../../../lib/client";

const Category = ({ products, categoryName }) => {
  console.log(products.products);
  return (
    <div>
      <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
        <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
          {categoryName}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-14 lg:px-8 md:px-8 px-8">
        {products?.data.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == 'category'] {
    slug {
      current
    }
  }`;
  const categories = await client.fetch(query);

  const paths = categories.map((category) => ({
    params: {
      slug: category.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const categoryNameQuery = `*[_type == "category" && slug.current == '${slug}'][0].name`;
  const productQuery = `*[_type == "category" && slug.current == '${slug}'][0]{
    "data": products[]->{
      ...
    }
  }`;
  const products = await client.fetch(productQuery);
  const categoryName = await client.fetch(categoryNameQuery);
  return {
    props: { products, categoryName },
  };
};

export default Category;
