export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const requestJson = await request.json();
  return requestJson;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const requestJson = await request.json();

  return requestJson;
}

export async function getDetailsProductById(itemId) {
  const request = await fetch(`https://api.mercadolibre.com/items/${itemId}`);
  const requestJson = await request.json();

  return requestJson;
}
