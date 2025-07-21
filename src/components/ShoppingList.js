import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [allItems, setAllItems] = useState(items);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  function handleAddItem(newItem) {
    setAllItems([...allItems, newItem]);
  }

  const itemsToDisplay = allItems.filter((item) => {
    const matchedCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchedSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchedCategory && matchedSearch;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleAddItem} />
      <Filter
        search={search}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
