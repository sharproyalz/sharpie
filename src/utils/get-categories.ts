export function getCategories(prod: Product[]) {
  const cat = prod?.map((prod) => prod.category);
  const uniq = Array.from(new Set(cat));
  return uniq;
}
