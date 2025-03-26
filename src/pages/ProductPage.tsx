
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductDetail from "@/components/ProductDetail";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <Layout>
      <ProductDetail />
    </Layout>
  );
};

export default ProductPage;
