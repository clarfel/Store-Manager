import { db } from "../screens/CaisseScreen";

export const addItem = (item, p, stock) => {
  db.ref("/items").child("items").set({
    name: item,
    price: p,
    stock: stock,
    id: Math.random(),
  });
};
