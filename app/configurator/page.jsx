import Wawa from "@/components/wawa";
import { use } from "react";
import ContextWrapper from "@/components/contextWrapper";
const getPrices = async () => {
  const data = await fetch("http://localhost:3000/api/prices", {
    cache: "no-store",
  });
  const prices = await data.json();
  return prices;
};
export default function Page() {
  const prices = use(getPrices());
  return (
    <>
      <ContextWrapper prices={prices}></ContextWrapper>
    </>
  );
}
