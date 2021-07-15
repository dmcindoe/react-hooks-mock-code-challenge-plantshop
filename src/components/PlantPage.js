import React, { useEffect, useState } from "react"
import NewPlantForm from "./NewPlantForm"
import PlantList from "./PlantList"
import Search from "./Search"

const PlantPage = () => {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((plantsArray) => {
        setPlants(plantsArray);
      });
  }, []);

  const handleAddPlant = (newPlant) =>  {
    const updatedPlantsArray = [...plants, newPlant]
    setPlants(updatedPlantsArray)
  }

  const handleDeletePlant = (id) => {
    const updatedPlantsArray = plants.filter((plant) => plant.id !== id)
    setPlants(updatedPlantsArray)
  }

  const handleUpdatePlant = (updatedPlant) => {
    const updatedPlantsArray = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant
      } else {
        return plant
      }
    })
    setPlants(updatedPlantsArray)
  }

  const displayedPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList
        plants={displayedPlants}
        onDeletePlant={handleDeletePlant}
        onUpdatePlant={handleUpdatePlant}
      />
    </main>
  )
}

export default PlantPage
