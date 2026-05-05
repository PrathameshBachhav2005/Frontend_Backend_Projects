import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/meals");
        const result = await response.json();
        setMeals(result?.data?.data || []);
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
            <p> Loading Meals... </p>
          </div>
        ) : meals.length === 0 ? (
          <div className='empty-state'>
            <p>No Meals available</p>
          </div>
        ) : (
          <div className='card-grid'>
            {meals.map((item, index) => (
              <div className='card' key={item?.idMeal ?? index}>
                <div className='card-image'>
                  <img src={item?.strMealThumb} alt={item?.strMeal} />
                  <div className='card-content'>
                    <h2 className='car-title info-label'>Meal Name : {item?.strMeal
                      ? `${item.strMeal} `
                      : 'No Meal is Available'}</h2>
                    <div className='card-info'>
                      <div className='info-row'>
                        <span className='info-label'>Category:</span>
                        <span className='info-value'>{item?.strCategory
                          ? item.strCategory
                          : 'No Category is Available '}</span>
                      </div>

                      <div className='info-row'>
                        <span className='info-label'>Area:</span>
                        <span className='info-value'>{item?.strArea
                          ? item.strArea
                          : 'No Area is Found '}</span>
                      </div>

                      <div className='info-row-button'>
                        {selectedMeal === item  ? (
                          <div className="recipe-details">

                            <p><b>Category:</b> {selectedMeal?.strCategory}</p>
                            <p><b>Area:</b> {selectedMeal?.strArea}</p>
                            <p><b>Tags:</b> {selectedMeal?.strTags || "No Tags Available"}</p>
                            <p><b>Instructions:</b>{ selectedMeal?.strInstructions
                              ?.split("\r\n")
                              .map((line, index) => (
                                <p key={index}><ul><li>{line}</li></ul></p>
                              ))}</p>
                            <p><b>Link:</b> <a href={selectedMeal?.strYoutube} target="_blank" rel="noopener noreferrer">
                              Watch on YouTube
                            </a></p>

                            <button onClick={() => setSelectedMeal(null)}>
                              Close
                            </button>
                          </div>
                        ) : (
                          <div className="meal-list">
                            {

                              <button onClick={() => {
                                setSelectedMeal(item);
                                alert(`${item?.strMeal} recipe details are displayed below!`);
                              }}>
                                View Recipe
                              </button>
                            }
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
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
