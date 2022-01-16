import React, { useEffect, useState } from "react";

//search
const SearchCat = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayItems = items
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      return (
        <div id="cat">
          <div id="name">
            {" "}
            <h1> {item.description} </h1>{" "}
          </div>
          <img src={item.image_url} />
        </div>
      );
    });

  useEffect(() => {
    fetch("https://cats-api.strsqr.cloud/cats")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    const pageCount = Math.ceil(items.length / usersPerPage);

    const changePage = ({ selected }) => {
      console.log("abc");
      setPageNumber(selected);
      console.log(selected);
    };

    return <div className="App">{displayItems}</div>;
  }
};

export default DescCat;
