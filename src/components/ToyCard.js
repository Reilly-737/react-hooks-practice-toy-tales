import React, {useState} from "react";

function ToyCard({toy, handleLike, handleDelete}) {
  const [likes, setLikes] = useState(toy.likes);

  const handleLikeClick =() => {
    const updatedLikes = likes + 1;

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({likes: updatedLikes}),
    })
    .then((r) => r.json())
    .then((updatedToy) => {
      handleLike(toy.id, updatedToy.likes);
      setLikes(updatedToy.likes);
    })
  }
  const handleDeleteClick = () => {
    fetch(`http://localhost:3001/toys/${toy.id}`,{
      method: "DELETE",
    })
    .then(() => {
      handleDelete(toy.id);
    })
  }
  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button 
      className="like-btn" 
      onClick={handleLikeClick}
      >Like {"<3"}</button>
      <button 
      className="del-btn" 
      onClick={handleDeleteClick}
      >Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
