// utilities
import { getDictionary } from "@/utilities/dictionary";
// components
import Hero from "@/components/homePage/Hero";
import BestSellers from "@/components/homePage/BestSellers";
import NewProducts from "@/components/homePage/NewProducts";

export default async function Home(props) {
  console.log("[Home.js] props = ", props);
  const { lang } = props.params;
  // translation
  const { productCardWords } = await getDictionary(lang).then((words) => {
    const productCardWords = words.components.productCard;

    return { productCardWords };
  });

  return (
    <>
      <Hero />

      <BestSellers productCardWords={productCardWords} />

      <NewProducts productCardWords={productCardWords} />
    </>
  );
}
