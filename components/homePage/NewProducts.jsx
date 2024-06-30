// components
import ProductCard from "@/components/ProductCard";

const NewProducts = (props) => {
  const { productCardWords } = props;

  return (
    <section className="bg-gray-50">
      <div className="container">
        <h2 className="text-center font-bold">NewProducts</h2>

        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse corporis
          facere porro veritatis culpa tenetur?
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          <ProductCard productCardWords={productCardWords} price={100} />
          <ProductCard
            productCardWords={productCardWords}
            price={100}
            priceAfterDiscount={70}
            discountPercentage={30}
          />
          <ProductCard productCardWords={productCardWords} price={20} />
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

export default NewProducts;
