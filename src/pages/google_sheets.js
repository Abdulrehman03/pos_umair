import React, { useEffect, useState, Fragment } from "react";
import Tabletop from "tabletop";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Tabletop.init({
      key: "1sQIEU9H-cy6yPDCqUF6TsRUu2IpxK1mCNL1Uqao5xyw",
      simpleSheet: true,
    })
      .then((data) => {
        //   console.log(data)
          setData(data)
      })
      .catch((err) => console.warn(err));
  }, []);
  console.log(data);
  return (
    <>
      <h1>data from google sheets</h1>
      {/* // render data here */}
    </>
  );
}
