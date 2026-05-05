import { useState,useEffect } from 'react'

import './App.css'

function App() {
    interface Jokes{
      id:number,
      categories:string,
      content:string
    }

    const [joke,setJoke]=useState<Jokes[]>([])
    const [loading,setLoading]=useState<boolean>(true)

     useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("https://api.freeapi.app/api/v1/public/randomjokes");
            const result = await response.json();
            setJoke(result?.data?.data || []);
          }
          catch (error) {
            console.log(error);
          }
          finally {
            setLoading(false);
          }
        };
        fetchData()
      }, []);

  return (
    <>
    <div className='container'>
        {loading ? (
          <div className='loading'>
            <div className='spinner'></div>
            <p> Loading jokes... </p>
          </div>
        ) : joke.length === 0 ? (
          <div className='empty-state'>
            <p>No jokes available</p>
          </div>
        ):(
          <div className='card-grid'>
            {joke.map((item, index) => (
              <div className='card' key={item?.id ?? index}>
               
                  <div className='card-content'>
                    <h2 className='car-title info-label'> 🎭 Joke : {item?.content
                      ? `${item.content} `
                      : 'No Joke Available'}</h2>
                    
                  </div>
                
              </div>
            ))}
          </div>
        )}
    </div>
    
    </>
  )
}

export default App
