import React, { useEffect, useState } from "react";
import NotFound from "./NotFound";
import { useLinkClickHandler, useNavigate, useParams } from "react-router-dom";

const DescCat = () => {
  const id = useParams().id;
  const [catData, setCatData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

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
          console.log(`result is ${result}`);
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
  } else if (catData.error == "Cat not found") {
    return (
      <div className="App">
        <NotFound />
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="desc">
          <div className="catName">
            <h1> {catData.name} </h1>
            <a href="http://localhost:3000/">
              <p> К списку котов </p>
            </a>
          </div>
          <div className="imageCat">
            <img src={catData.image_url} />
          </div>
          <p>{catData.description}</p>
        </div>
      </div>
    );
  }
};
export default DescCat;
