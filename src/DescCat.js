import React, { useEffect, useState } from "react";
import { useLinkClickHandler, useParams } from "react-router-dom";

const DescCat = () => {
  const id = useParams().id;
  const [catData, setCatData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = "https://cats-api.strsqr.cloud/cats";
  const url = `${baseUrl}/${id}`;
  console.log("");
  console.log(isLoaded);
  console.log(catData);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setCatData(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className="App">
        <div className="desc">
          <h1> {catData.name} </h1>
          <img src={catData.image_url} />
          <div class="descripton">
            <p>{catData.description}</p>
          </div>
        </div>
      </div>
    );
  }
};
export default DescCat;
