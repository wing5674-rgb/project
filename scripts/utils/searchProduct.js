export async function searchProduct(keyword) {
  window.location.href = `index.html?search=${keyword}`;
}

export default searchProduct;