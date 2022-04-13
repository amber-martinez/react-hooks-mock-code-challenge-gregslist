import React, { useState, useEffect } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {

  const [searchText, setSearchText] = useState("");
  const [listings, setListings] = useState([]);

  function handleSearch(e) {
    console.log(e.target.value)
    setSearchText(e.target.value)
  }

      const filteredListings = listings.filter(listing => {
        if (listing.description.toLowerCase().includes(searchText.toLowerCase())) {
          console.log('match', listing)
          return listing
        } else {
          console.log('none')
          return false
        }
      })

  console.log(listings)
  console.log(searchText)

  useEffect(() => {
    fetch(`http://localhost:6001/listings`)
    .then((r) => r.json())
    .then((listings) => setListings(listings))
  }, [])
  
  function deleteListing(deletedListing) {
    const updatedListings = listings.filter((listing) => listing.id !== deletedListing.id)
    setListings(updatedListings)
  }

  return (
    <div className="app">
      <Header searchText={searchText} handleSearch={handleSearch} />
      <ListingsContainer searchText={searchText} deleteListing={deleteListing} filteredListings={filteredListings} />
    </div>
  );
}

export default App;
