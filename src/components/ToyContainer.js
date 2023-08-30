import React,{ useEffect } from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, setToys}) {
  const handleLike = (toyId, updatedLikes) => {
    setToys((prevToys) => {
      return prevToys.map((toy) => 
      toy.id === toyId ? {...toy, likes: updatedLikes} : toy
      );
    })
  }
const handleDelete = (toyId) => {
  setToys((prevToys) => prevToys.filter((toy) => toy.id !== toyId));
};

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data))
      .catch((error) => console.error("Error fetching toys:", error))
  }, [setToys])
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard 
        key={toy.id} 
        toy={toy} 
        handleDelete={handleDelete} 
        handleLike={handleLike}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
