import { useState, useEffect } from "react";
import "./ProductsSearch.css";

function ProductsSearch() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API endpoint
  const API_ENDPOINT = "https://fakestoreapi.com/products";
  // Fetch products on component load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term (case-insensitive)
  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.title.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="products-container">
      <h1>Product Search</h1>

      {/* Search Input */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by product title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <p className="search-info">
          Found {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <p>Loading products...</p>
          <div className="spinner"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-state">
          <p>Error: {error}</p>
        </div>
      )}

      {/* Products Table */}
      {!loading && !error && (
        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="title-cell">
                      <div className="title-content">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="product-image"
                        />
                        <span>{product.title}</span>
                      </div>
                    </td>
                    <td className="price-cell">${product.price.toFixed(2)}</td>
                    <td className="category-cell">
                      <span className="category-badge">{product.category}</span>
                    </td>
                    <td className="rating-cell">
                      <div className="rating">
                        <span className="stars">★</span>
                        <span className="rate">
                          {product.rating.rate.toFixed(1)}
                        </span>
                        <span className="count">({product.rating.count})</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-results">
                    No products found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductsSearch;
