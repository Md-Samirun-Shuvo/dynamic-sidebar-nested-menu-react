import axios from "axios";
import React, { useEffect, useState } from "react";

function Sidebar({ categories }) {
  const [expandedCategories, setExpandedCategories] = useState([]);
  

  const toggleSideMenu = categoryIndex => {
    setExpandedCategories(
      expandedCategories.includes(categoryIndex)
        ? expandedCategories.filter(index => index !== categoryIndex)
        : [...expandedCategories, categoryIndex]
    );
  };
  return (
    <div>
      {categories?.map((category, categoryIndex) => {
        return(
        <div key={categoryIndex}>
          <h1 onClick={() => toggleSideMenu(categoryIndex)}>
            {category.name}
          </h1>
          {expandedCategories?.includes(categoryIndex) && (
            <div>
              {category?.childes?.map((subcategory, subcategoryIndex) => {
                return(
                <div key={subcategoryIndex}>
                  <p onClick={() => toggleSideMenu(categoryIndex + "-" + subcategoryIndex)}>
                    {subcategory.name}
                  </p>
                  {expandedCategories?.includes(categoryIndex + "-" + subcategoryIndex) && (
                    <ul>
                      {subcategory?.childes?.map((subsubcategory, subsubcategoryIndex) => {
                        console.log(subsubcategory.name)
                        return(
                        <p key={subsubcategoryIndex}>{subsubcategory.name}</p>
                      )
                      })}
                    </ul>
                  )}
                </div>
              )
              })}
            </div>
          )}
        </div>
      )
      })}
    </div>
  );
}

function App() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("https://backend.bppshop.com.bd/api/v1/categories")
      .then((res) => setCategories(res.data.data));
  }, []);
  return (
    <div>
      <Sidebar categories={categories} />
    </div>
  );
}

export default App;
