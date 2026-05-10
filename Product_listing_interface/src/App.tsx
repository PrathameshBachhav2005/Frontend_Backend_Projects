import { useEffect, useState } from "react";
import "./App.css";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  brand: string;
  description: string;
  rating: number;
}


export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [detail, setDetail] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "https://api.freeapi.app/api/v1/public/randomproducts"
      );
      const datas = await res.json();


      // API shape: { data: { data: Product[] } }
      setProducts(datas?.data?.data ?? []);
    } catch {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // const details = () => {
  //   alert("Product details will be shown here.");
  //   products.map((p) => { 
  //     console.log(`Brand: ${p.brand}`);
  //     console.log(`Description: ${p.description}`);
  //     console.log(`Rating: ${p.rating}`);

  //   });
  // };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="pl-page">
      <h1 className="pl-title">🛍️ Product Store</h1>

      {loading && <p className="pl-center">Loading...</p>}
      {error && <p className="pl-center pl-error">{error}</p>}

      <div className="pl-grid">
        {products.map((p) => (
          <div key={p.id} className="pl-card">
            <img
              src={p.thumbnail}
              alt={p.title}
              className="pl-image"
              loading="lazy"
            />

            <div className="pl-cardBody">
              <h2 className="pl-cardTitle" title={p.title}>
                {p.title}
              </h2>
              <p className="pl-category">Product : {p.category}</p>
              <p className="pl-price">Price : ₹{p.price}</p>
            </div>

            <div className="dis-flex" >
              <button onClick={() => setDetail(p)}>Details</button> 
              <button onClick={() => setDetail(null)}>Cancel</button>
            </div>

            
          
            <div>
              {detail === p && (
                <div>
                  <hr />
              <p>Description : {detail.description}</p><hr />
              <p>Brand: {detail.brand}</p><hr />
              <p>Rating: {detail.rating}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
