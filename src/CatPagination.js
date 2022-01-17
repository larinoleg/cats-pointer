import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const CatPagination = () => {
  let navigate = useNavigate();
  let [params] = useSearchParams();
  const page = Number(params.get("p") ?? "1");
  const q = params.get("q") ?? "";
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [catsCount, setCatCount] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const nextPage = page + 1;
  const prvPage = page - 1;
  const urlCat = `/?p=${nextPage}`;
  const urlCat2 = `/?p=${prvPage}`;

  const fetchCats = (p, q) => {
    fetch(`https://cats-api.strsqr.cloud/cats?p=${p}&q=${q}`)
      .then(async (response) => {
        const catsCount = Number(response.headers.get("Cats-Count"));
        const items = await response.json();

        setCatCount(catsCount);
        setIsLoaded(true);
        setItems(items);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  };

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
    fetchCats(page, q);
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
      fetchCats(page, inputValue);
    };

    const button = (x) => {
      const catsLink = `?p=${x}&q=${q}`;
      return (
        <button>
          {" "}
          <a href={catsLink}>
            <p> {x} </p>
          </a>
        </button>
      );
    };

    const pageArray = [
      ...Array(Math.ceil(catsCount / usersPerPage)).keys(),
    ].map((x) => x + 1);

    return (
      <div className="App">
        <div className="Search">
          <form onSubmit={handleSubmit}>
            <input id="search" onChange={inputChange}></input>
          </form>
        </div>

        <div className="buttonPage">{pageArray.map(button)}</div>

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
