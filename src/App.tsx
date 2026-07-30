import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [dogs, setDogs] = useState([
    { name: "Otis", status: "listed" },
    { name: "Sir Barks-a-lot", status: "listed" },
    { name: "Scooby", status: "examining" },
    { name: "Brownie", status: "finally_back_to_hooman" },
  ]);
  const [newDog, setNewDog] = useState("");
  const listed = dogs.filter((dog) => dog.status === "listed");
  const examining = dogs.filter((dog) => dog.status === "examining");
  const finally_back_to_hooman = dogs.filter((dog) => dog.status === "finally_back_to_hooman");
  const handleSubmit = (e) => {
    e.preventDefault();
    setDogs((prev) => [...prev, { name: newDog, status: "listed" }]);
    setNewDog("");
  };

  const handleNext = (currentDog) => {
    console.log(currentDog);
    if (currentDog.status === "listed") {
      const foundDog = dogs.find((dog) => dog.name === currentDog.name);
      setDogs((prev) => [
        ...prev.filter((dog) => dog.name !== currentDog.name),
        { ...foundDog, status: "examining" },
      ]);
    } else if (currentDog.status === "examining") {
      const foundDog = dogs.find((dog) => dog.name === currentDog.name);
      setDogs((prev) => [
        ...prev.filter((dog) => dog.name !== currentDog.name),
        { ...foundDog, status: "finally_back_to_hooman" },
      ]);
    }
  };

  return (
    <>
      <header className="flex-items justify">
        <h1>Pet Manager 3000</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="dog-name">Dog name: </label>
          <input name="dog-name" value={newDog} onChange={(e) => setNewDog(e.target.value)} />
          <button type="submit">Add pet</button>
        </form>
      </header>
      <main className="grid">
        <div>
          <h2>Listed</h2>
          {listed.map((dog) => (
            <div key={`${dog.name}-${dog.status}`} className="flex-items">
              <li>{dog.name}</li>
              <button type="button" onClick={() => handleNext(dog)}>
                Next
              </button>
            </div>
          ))}
        </div>
        <div>
          <h2>Examining</h2>
          {examining.map((dog) => (
            <div key={`${dog.name}-${dog.status}`} className="flex-items">
              <li key={`${dog.name}-${dog.status}`}>{dog.name}</li>
              <button type="button" onClick={() => handleNext(dog)}>
                Next
              </button>
            </div>
          ))}
        </div>
        <div>
          <h2>Finally Back to Hooman</h2>
          {finally_back_to_hooman.map((dog) => (
            <div key={`${dog.name}-${dog.status}`} className="flex-items">
              <li key={`${dog.name}-${dog.status}`}>{dog.name}</li>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

// function ListOfDogs({ dogs }) {

//   if (status === "listed") {
//     return <div>
//       <h2>Listed</h2>
//       {listed.map((dog) => (
//         <div key={`${dog.name}-${dog.status}`} className="flex-items">
//           <li>{dog.name}</li>
//           <button type="button" onClick={() => handleNext(dog)}>
//             Next
//           </button>
//         </div>
//       ))}
//     </div>
//   }
// }

export default App;
