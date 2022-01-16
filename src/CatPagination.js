import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";

const CatPagination = () => {
  console.log("params");
  console.log(useParams());
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 2;
  const pagesVisited = pageNumber * usersPerPage;

  const displayItems = items
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      const href = `/${item.slug}`;
      return (
        <div id="cat">
          <div id="name">
            {" "}
            <a href={href}> {item.name} </a>{" "}
          </div>
          <img src={item.image_url} />
        </div>
      );
    });

  useEffect(() => {
    fetch("https://cats-api.strsqr.cloud/cats?p=2")
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

    return (
      <div className="App">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"navigationButtons"}
          previousLinkClassName={"previousButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"navigationDisabled"}
          activeClassName={"navigationActive"}
        />
        {displayItems}
      </div>
    );
  }
};

export default CatPagination;
