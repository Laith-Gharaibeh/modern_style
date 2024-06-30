// next.js
import Image from "next/image";
import Link from "next/link";

const ProductCard = (props) => {
  const { price, priceAfterDiscount, discountPercentage } = props;

  return (
    <div className="relative w-[250px] bg-slate-500 border border-gray-200">
      {discountPercentage && (
        <span className="px-4 py-1 absolute top-[10px] z-10 bg-orange-400 text-white">
          {discountPercentage}%
        </span>
      )}

      <div className="group relative left-[50%] translate-x-[-50%] overflow-hidden">
        <Image
          src="/Nike_Windrunner_PrimaLoft_1.png"
          width={250}
          height={300}
          alt="Nike Windrunner PrimaLoft"
          className="transition ease-in-out group-hover:scale-110"
        />
        <div className="w-full absolute bottom-2 z-20 flex justify-center gap-2">
          <button className="p-2 bg-black hover:bg-orange-400 text-white">
            Add to cart
          </button>
          <Link
            href="#"
            className="p-2 bg-white hover:bg-orange-400 text-black hover:text-white"
          >
            Product Info
          </Link>
        </div>
        <div className="overlay absolute top-0 left-0 w-full h-full group-hover:bg-orange-400 group-hover:opacity-25 "></div>
      </div>

      <div className="p-2 bg-white">
        <h3>Nike Windrunner PrimaLoft</h3>
        <div className="font-bold">
          {priceAfterDiscount ? (
            <div className="flex gap-2">
              <span className="price line-through text-gray-400">${price}</span>
              <span className="price-after-discount text-gray-800">
                ${priceAfterDiscount}
              </span>
            </div>
          ) : (
            <div>
              <span className="price text-gray-400">${price}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
