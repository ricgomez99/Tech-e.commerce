import React, { createContext, ReactNode, useContext, useState } from "react";

type Props = {
  children?: ReactNode;
};

let cartJSON: Map<string, object> = new Map ();
typeof window !== "undefined"
  ? localStorage.getItem("cart")
    ? (cartJSON = new Map(
        Object.entries(JSON.parse(localStorage.getItem("cart")!))
      ))
    : null
  : null;

let itemsArr: Array<Object> = Array.from(cartJSON.values());

interface AppContextInterface {
  isOpen: boolean;
  items: any[];
  openCart: any;
  closeCart: any;
  addItemToCart: any;
  deleteItem: any;
  deletePerItem: any;
  getNumberOfItems: any;
  updateCart: any;
  getCart: any;
}

const AppContext = createContext<AppContextInterface>({
  isOpen: false,
  items: [],
  openCart: () => {},
  closeCart: () => {},
  addItemToCart: (item: any) => {},
  deleteItem: (id: number) => {},
  deletePerItem: (id: number) => {},
  getNumberOfItems: () => {},
  updateCart: () => {},
  getCart: () => {},
});

export default function StateWrapper({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<any[]>(itemsArr);

  function handleOpenCart() {
    setIsOpen(true);
  }

  function handleCloseCart() {
    setIsOpen(false);
  }

  function handleAddItemToCart(item: any) {
    const temp = [...items];
    const found = temp.find((product: any) => product.id === item.id);

    if (found) {
      found.qty++;
    } else {
      item.qty = 1;
      temp.push(item);
    }
    setItems([...temp]);
  }

  function handleDeleteItem(id: number) {
    const temp = [...items];
    const deleteItem = temp.filter((product: any) => product.id !== id);

    setItems(deleteItem);
  }

  function handleDeletePerItem(id: number) {
    const temp = [...items];
    const found = temp.find((product: any) => product.id === id);

    if(found) {
      found.qty--
    } 
    setItems([...temp]);
  }

  function handleNumberOfItems() {
    const total = items.reduce((acc, item) => acc + item.qty, 0);

    return total;
  }

  function localCart(): any {
    localStorage.setItem("cart", JSON.stringify(items));
  }

  function storedCart(): any {
    let cartMap = new Map();
    if (localStorage.getItem("cart")) {
      const cartJSON = localStorage.getItem("cart");
      return cartJSON !== null
        ? new Map(Object.entries(JSON.parse(cartJSON)))
        : cartMap;
    }
    return cartMap;
  }

  return (
    <AppContext.Provider
      value={{
        isOpen,
        items,
        openCart: handleOpenCart,
        closeCart: handleCloseCart,
        addItemToCart: handleAddItemToCart,
        deleteItem: handleDeleteItem,
        deletePerItem: handleDeletePerItem,
        getNumberOfItems: handleNumberOfItems,
        updateCart: localCart,
        getCart: storedCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
