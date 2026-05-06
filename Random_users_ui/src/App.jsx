import { useState, useEffect } from 'react'
import "./App.css";

function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/randomusers");
        const result = await response.json();
        setData(result?.data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <header className='header'>
        <h1>Explore Random User Profiles</h1>
        
      </header>

      {loading ? (
        <div className='loading'>
          <div className='spinner'></div>
          <p>Loading user profiles...</p>
        </div>
      ) : data.length === 0 ? (
        <div className='empty-state'>
          <p>No users available</p>
        </div>
      ) : (
        <div className='cards-grid'>
          {data.map((item, index) => (
            <div className='card' key={item?.login?.uuid ?? item?.email ?? index}>
              <div className='card-image'>
                <img src={item?.picture?.large} alt={item?.name?.first} />
              </div>
              <div className='card-content'>
                <h2 className='card-title'>
                 <p className='car-title'>Name : {item?.name?.title && item?.name?.first && item?.name?.last
                    ? `${item.name.title} ${item.name.first} ${item.name.last}`
                    : 'No name'}</p>
                </h2>

                <div className='card-info'>
                  <div className='info-row'>
                    <span className='info-label'>Gender:</span>
                    <span className='info-value'>{item?.gender
                      ? item.gender.charAt(0).toUpperCase() + item.gender.slice(1)
                      : 'N/A'}</span>
                  </div>

                  <div className='info-row'>
                    <span className='info-label'>age:</span>
                    <span className='info-value'>{item?.dob?.age || 'N/A'}</span>
                  </div>

                  <div className='info-row'>
                    <span className='info-label'>Email:</span>
                    <span className='info-value'>{item?.email || 'N/A'}</span>
                  </div>

                  <div className='info-row'>
                    <span className='info-label'>Street:</span>
                    <span className='info-value'>{item?.location?.street?.number && item?.location?.street?.name ? `${item.location.street.number},${item.location.street.name}` : 'N/A'}</span>
                  </div>

                  <div className='info-row'>
                    <span className='info-label'>City:</span>
                    <span className='info-value'>{item?.location?.city || 'N/A'}</span>
                  </div>

                  <div className='info-row'>
                    <span className='info-label'>Country:</span>
                    <span className='info-value'>{item?.location?.country || 'N/A'}</span>
                  </div>

                  <div className='info-row'>
                    <span className='info-label'>Phone:</span>
                    <span className='info-value'>{item?.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App
