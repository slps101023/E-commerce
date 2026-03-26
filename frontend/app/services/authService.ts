export async function fetchProducts() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    let products = [];
    try {
        const res = await fetch(`${baseUrl}/products`, { cache: 'no-store' });
        if (res.ok) {
            products = await res.json();
        }
    } catch (error) {
        console.error("無法取得商品:", error);
    }

    return products;   
}