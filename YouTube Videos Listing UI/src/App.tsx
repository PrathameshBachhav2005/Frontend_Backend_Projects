import { useState, useEffect } from 'react'
import './App.css'

function App() {

  interface Product {
    id: number;
    items: {
      snippet: {
        thumbnails: {
          medium: {
            url: string;
          };
        };
        channelTitle: string;
        tags: string[];
        join: string;
        defaultAudioLanguage: string;
        description: string;
        publishedAt: number;
      };
      statistics: {
        viewCount: number;
        likeCount: number;
        commentCount: number;
      }
    };

  }

  const [getdata, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          "https://api.freeapi.app/api/v1/public/youtube/videos"
        );
        const datas = await res.json();

        setData(datas?.data?.data ?? []);
      } catch {
        setError("Failed to fetch Channels");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);



  return (
    <>
      <div className="pl-page">
        <h1 className="pl-title">📺 YouTube Video Listing UI</h1>

        {loading && <p className="pl-center">Loading...</p>}
        {error && <p className="pl-center pl-error">{error}</p>}

        <div className="pl-grid">
          {getdata.map((item) => (
            <div key={item.id} className="pl-card">
              <img
                src={item?.items?.snippet?.thumbnails?.medium?.url}
                alt={item.items?.snippet?.channelTitle}
                className="pl-image"
                loading="lazy"
              />

              <div className="pl-cardBody">
                <h2 className="pl-cardTitle" title={item.items?.snippet.channelTitle}>
                  {item.items?.snippet.channelTitle}
                </h2>
                <p className="pl-category">Tags : {item.items?.snippet.tags?.join(", ")}</p>
                <p className="pl-price">Language : {item.items?.snippet.defaultAudioLanguage}</p>
                <p className="pl-publishedAt">Published : {new Date(item.items?.snippet.publishedAt).toLocaleDateString()}</p>
                <p className="pl-description"><a rel="stylesheet" href={item.items?.snippet?.description} target="_blank" >Visit</a></p>
                <p className="pl-description">Views : {item.items?.statistics?.viewCount?.toLocaleString()}</p>
                <p className="pl-description">Likes : {item.items?.statistics?.likeCount?.toLocaleString()}</p>
                <p className="pl-description">Comments : {item.items?.statistics?.commentCount?.toLocaleString()}</p>
              </div>

              {/* <div className="dis-flex" >
              <button onClick={() => setDetail(item)}>Details</button> 
              <button onClick={() => setDetail(null)}>Cancel</button>
            </div> */}


              {/*           
            <div>
              {detail === item && (
                <div>
                  <hr />
              <p>Description : {detail.description}</p><hr />
              <p>Brand: {detail.brand}</p><hr />
              <p>Rating: {detail.rating}</p>
                </div>
              )}
            </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
