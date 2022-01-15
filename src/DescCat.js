import React, { useEffect, useState } from "react";

const DescCat = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [desc, setDesc] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayItems = items.map((item) => {
    return (
      <div id="cat">
        <img src={item.image_url} />
      </div>
    );
  });

  useEffect(() => {
    fetch(`https://cats-api.strsqr.cloud/cats`)
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

  // useEffect(() => {
  //   fetch(`https://cats-api.strsqr.cloud/cats=${paths[0]}`)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setDesc(result);
  //       },
  //       (error) => {
  //         setIsLoaded(true);
  //         setDesc(error);
  //       }
  //     );
  // }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    let paths = items.map((item) => item.slug);

    Promise.all([
      fetch(`https://cats-api.strsqr.cloud/cats=${paths[2]}`).then(
        (resp) => resp.description
      ),
    ]).then(console.log);

    console.log(paths);
    console.log(desc);
    const changePage = ({ selected }) => {
      console.log("abc");
      setPageNumber(selected);
      console.log(selected);
    };

    return <div className="App">{displayItems}</div>;
  }
};

export default DescCat;
