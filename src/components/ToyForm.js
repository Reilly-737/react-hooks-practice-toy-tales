import React,{useState} from "react";


function ToyForm({setToys}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
 

  const handleSubmit = (event) => {
    event.preventDefault();
    const newToy = {name, image, likes: 0};

    console.log(newToy)
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy)
    })
    .then((r) => r.json())
    .then((createdToy) => {
     setToys((prevToys) => [...prevToys, createdToy])
     setName("");
     setImage("");
    })
  }
  return (
    <div className="container">
      <form className="add-toy-form"onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
