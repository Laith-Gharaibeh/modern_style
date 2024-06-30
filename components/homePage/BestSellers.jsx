// components
import ProductCard from "@/components/ProductCard";

const BestSellers = (props) => {
  // console.log("[BestSellers.jsx] props = ", props);
  const { productCardWords } = props;

  return (
    <section className="bg-slate-500">
      <div className="container">
        <h2 className="text-center font-bold">BestSellers</h2>

        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse corporis
          facere porro veritatis culpa tenetur?
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          <ProductCard price={100} productCardWords={productCardWords} />
          <ProductCard
            productCardWords={productCardWords}
            price={100}
            priceAfterDiscount={70}
            discountPercentage={30}
          />
          <ProductCard price={20} productCardWords={productCardWords} />
          <ProductCard
            productCardWords={productCardWords}
            price={50}
            priceAfterDiscount={25}
            discountPercentage={50}
          />
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
