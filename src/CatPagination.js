import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import axios from "axios";

const CatPagination = () => {
  let navigate = useNavigate();
  let [params] = useSearchParams();
  const page = Number(params.get("p") ?? "1");
  const q = params.get("q") ?? "";
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const nextPage = page + 1;
  const prvPage = page - 1;
  const urlCat = `/?p=${nextPage}`;
  const urlCat2 = `/?p=${prvPage}`;

  const displayItems = items
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      const href = `/${item.slug}`;
      return (
        <div id="cat">
          <div id="element">
            {" "}
            <div className="catName">
              <a href={href}> {item.name} </a>
            </div>
            <div>
              {" "}
              <img src={item.image_url} />{" "}
            </div>
          </div>
        </div>
      );
    });

  useEffect(() => {
    fetch(`https://cats-api.strsqr.cloud/cats?p=${page}&q=${q}`)
      .then((res) => {
        console.log(res);
        return res;
      })
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
    const handleSubmit = (e) => {
      e.preventDefault();
      const inputValue = document.getElementById("search").value;
      navigate(`?q=${inputValue}`);
    };

    const inputChange = (e) => {
      const inputValue = document.getElementById("search").value;
      navigate(`?q=${inputValue}`);

      fetch(`https://cats-api.strsqr.cloud/cats?p=${page}&q=${inputValue}`)
        .then((res) => {
          console.log(res);
          return res;
        })
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
    };

    return (
      <div className="App">
        <div className="Search">
          <form onSubmit={handleSubmit}>
            <input id="search" onChange={inputChange}></input>
          </form>
        </div>
        <div className="button">
          <a href={urlCat2}>
            <button type="button" class="btn">
              Назад
            </button>
          </a>
          <a href={urlCat}>
            <button type="button" class="btn">
              Вперёд
            </button>
          </a>
        </div>

        {displayItems}
      </div>
    );
  }
};

export default CatPagination;
