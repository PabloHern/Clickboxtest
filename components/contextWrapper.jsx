"use client";
import { useContext } from "react";
import CartState from "@/context/cart/CartState";
import Wawa from "./wawa";
export default function ContextWrapper({ prices }) {
  return (
    <>
      <CartState>
        <Wawa prices={prices}></Wawa>
      </CartState>
    </>
  );
}
