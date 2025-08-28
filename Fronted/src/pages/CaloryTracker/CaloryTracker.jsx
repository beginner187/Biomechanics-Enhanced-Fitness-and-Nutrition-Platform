import React, { useState } from "react";
import "./CaloryTracker.css";

function App() {
  // Categorized food data with calories and protein
  const foodCategories = {
    // ... (keep the existing foodCategories data)
    Fruits: [
      { id: 1, name: "Apple (1 medium)", calories: 95, protein: 0.5 },
      { id: 2, name: "Banana (1 medium)", calories: 105, protein: 1.3 },
      { id: 3, name: "Orange (1 medium)", calories: 62, protein: 1.2 },
      { id: 4, name: "Mango (1 medium)", calories: 150, protein: 1.0 },
      { id: 5, name: "Guava (1 medium)", calories: 68, protein: 2.6 },
      { id: 6, name: "Pomegranate (1 medium)", calories: 234, protein: 4.7 },
      { id: 7, name: "Papaya (1 cup)", calories: 62, protein: 0.9 },
      { id: 8, name: "Watermelon (1 cup)", calories: 46, protein: 0.9 },
      { id: 9, name: "Pineapple (1 cup)", calories: 82, protein: 0.9 },
      { id: 10, name: "Grapes (1 cup)", calories: 104, protein: 1.1 },
      { id: 11, name: "Kiwi (1 medium)", calories: 42, protein: 0.8 },
      { id: 12, name: "Pear (1 medium)", calories: 101, protein: 0.6 },
      { id: 13, name: "Peach (1 medium)", calories: 59, protein: 1.4 },
      { id: 14, name: "Plum (1 medium)", calories: 30, protein: 0.5 },
      { id: 15, name: "Cherry (1 cup)", calories: 87, protein: 1.5 },
    ],
    Curries: [
      {
        id: 16,
        name: "Paneer Butter Masala (1 cup)",
        calories: 350,
        protein: 12,
      },
      { id: 17, name: "Butter Chicken (1 cup)", calories: 400, protein: 25 },
      { id: 18, name: "Chole (1 cup)", calories: 250, protein: 10 },
      { id: 19, name: "Rajma (1 cup)", calories: 200, protein: 8 },
      { id: 20, name: "Dal Tadka (1 cup)", calories: 150, protein: 6 },
      { id: 21, name: "Palak Paneer (1 cup)", calories: 300, protein: 15 },
      { id: 22, name: "Aloo Gobi (1 cup)", calories: 150, protein: 4 },
      { id: 23, name: "Baingan Bharta (1 cup)", calories: 120, protein: 3 },
      { id: 24, name: "Malai Kofta (1 cup)", calories: 400, protein: 10 },
      { id: 25, name: "Kadai Paneer (1 cup)", calories: 350, protein: 12 },
      { id: 26, name: "Fish Curry (1 cup)", calories: 300, protein: 20 },
      { id: 27, name: "Egg Curry (1 cup)", calories: 250, protein: 15 },
      { id: 28, name: "Mushroom Masala (1 cup)", calories: 200, protein: 8 },
      { id: 29, name: "Vegetable Korma (1 cup)", calories: 250, protein: 6 },
      { id: 30, name: "Sambar (1 cup)", calories: 100, protein: 4 },
      { id: 31, name: "Rasam (1 cup)", calories: 80, protein: 2 },
      { id: 32, name: "Kadhi (1 cup)", calories: 150, protein: 5 },
      { id: 33, name: "Undhiyu (1 cup)", calories: 200, protein: 6 },
      { id: 34, name: "Pav Bhaji (1 plate)", calories: 400, protein: 10 },
      { id: 35, name: "Misal Pav (1 plate)", calories: 350, protein: 12 },
    ],
    Bread: [
      { id: 36, name: "Roti (1 piece)", calories: 70, protein: 3 },
      { id: 37, name: "Chapati (1 piece)", calories: 104, protein: 4 },
      { id: 38, name: "Naan (1 piece)", calories: 320, protein: 10 },
      { id: 39, name: "Paratha (1 piece)", calories: 280, protein: 8 },
      { id: 40, name: "Kulcha (1 piece)", calories: 280, protein: 7 },
    ],
    Rice: [
      { id: 41, name: "Steamed Rice (1 cup)", calories: 206, protein: 4 },
      { id: 42, name: "Jeera Rice (1 cup)", calories: 250, protein: 5 },
      { id: 43, name: "Biryani (1 cup)", calories: 300, protein: 10 },
      { id: 44, name: "Pulao (1 cup)", calories: 250, protein: 6 },
    ],
    Snacks: [
      { id: 45, name: "Samosa (1 piece)", calories: 260, protein: 4 },
      { id: 46, name: "Pakora (1 piece)", calories: 150, protein: 3 },
      { id: 47, name: "Vada Pav (1 piece)", calories: 300, protein: 8 },
      { id: 48, name: "Dhokla (1 piece)", calories: 50, protein: 2 },
      { id: 49, name: "Kachori (1 piece)", calories: 200, protein: 5 },
      { id: 50, name: "Pani Puri (1 plate)", calories: 150, protein: 2 },
      { id: 51, name: "Bhel Puri (1 plate)", calories: 200, protein: 4 },
      { id: 52, name: "Aloo Tikki (1 piece)", calories: 150, protein: 3 },
      { id: 53, name: "Pav Bhaji (1 plate)", calories: 400, protein: 10 },
      { id: 54, name: "Misal Pav (1 plate)", calories: 350, protein: 12 },
    ],
    Dairy: [
      { id: 55, name: "Milk (1 cup)", calories: 150, protein: 8 },
      { id: 56, name: "Paneer (100g)", calories: 265, protein: 18 },
      { id: 57, name: "Yogurt (1 cup)", calories: 150, protein: 8 },
      { id: 58, name: "Cheese (1 slice)", calories: 113, protein: 7 },
      { id: 59, name: "Butter (1 tbsp)", calories: 102, protein: 0.1 },
      { id: 60, name: "Ghee (1 tbsp)", calories: 135, protein: 0 },
      { id: 61, name: "Cream (1 tbsp)", calories: 52, protein: 0.3 },
      { id: 62, name: "Lassi (1 glass)", calories: 160, protein: 8 },
      { id: 63, name: "Kheer (1 cup)", calories: 250, protein: 6 },
      { id: 64, name: "Rasgulla (1 piece)", calories: 100, protein: 2 },
    ],
    "Beverages and Sweets": [
      { id: 65, name: "Chai (1 cup)", calories: 60, protein: 1 },
      { id: 66, name: "Coffee (1 cup)", calories: 50, protein: 1 },
      { id: 67, name: "Lassi (1 glass)", calories: 160, protein: 8 },
      { id: 68, name: "Kheer (1 cup)", calories: 250, protein: 6 },
      { id: 69, name: "Gulab Jamun (1 piece)", calories: 150, protein: 2 },
      { id: 70, name: "Rasgulla (1 piece)", calories: 100, protein: 2 },
      { id: 71, name: "Jalebi (1 piece)", calories: 150, protein: 1 },
      { id: 72, name: "Barfi (1 piece)", calories: 100, protein: 2 },
      { id: 73, name: "Ladoo (1 piece)", calories: 150, protein: 3 },
      { id: 74, name: "Halwa (1 cup)", calories: 300, protein: 4 },
      { id: 75, name: "Kulfi (1 piece)", calories: 200, protein: 4 },
      { id: 76, name: "Peda (1 piece)", calories: 120, protein: 2 },
      { id: 77, name: "Sandesh (1 piece)", calories: 100, protein: 3 },
      { id: 78, name: "Rasmalai (1 piece)", calories: 150, protein: 4 },
      { id: 79, name: "Shrikhand (1 cup)", calories: 250, protein: 6 },
      { id: 80, name: "Kaju Katli (1 piece)", calories: 100, protein: 2 },
      { id: 81, name: "Besan Ladoo (1 piece)", calories: 150, protein: 3 },
      { id: 82, name: "Malpua (1 piece)", calories: 200, protein: 3 },
      { id: 83, name: "Puran Poli (1 piece)", calories: 250, protein: 5 },
      { id: 84, name: "Modak (1 piece)", calories: 150, protein: 2 },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState("Fruits"); // Default category
  const [selectedFood, setSelectedFood] = useState(""); // Selected food item
  const [quantity, setQuantity] = useState(1); // Quantity of the selected food
  const [selectedItems, setSelectedItems] = useState([]); // List of selected items

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedFood(""); // Reset selected food when category changes
  };

  // Handle food item change
  const handleFoodChange = (e) => {
    setSelectedFood(e.target.value);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(parseFloat(e.target.value)); // Parse as a float to handle decimal values
  };

  // Handle adding a food item
  const handleAddItem = () => {
    if (selectedFood && quantity > 0) {
      const foodItem = foodCategories[selectedCategory].find(
        (item) => item.name === selectedFood
      );
      const itemWithQuantity = {
        ...foodItem,
        quantity: quantity,
        totalCalories: foodItem.calories * quantity,
        totalProtein: foodItem.protein * quantity,
      };
      setSelectedItems([...selectedItems, itemWithQuantity]);
      setQuantity(1); // Reset quantity after adding
    }
  };

  // Calculate total calories and protein
  const calculateTotalCalories = () => {
    return selectedItems.reduce((total, item) => total + item.totalCalories, 0);
  };

  const calculateTotalProtein = () => {
    return selectedItems.reduce((total, item) => total + item.totalProtein, 0);
  };

  const [image, setImage] = useState(null);
  const [calorieData, setCalorieData] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file)); // Show preview

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setCalorieData(data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="hello">
      <div className="App">
        <h1>Indian Food Calorie Tracker</h1>
        <div className="container">
          {/* Category Dropdown */}
          <div className="category-selector">
            <label htmlFor="category">Select Category: </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {Object.keys(foodCategories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {/* Food Items Dropdown */}
          <div className="food-selector">
            <label htmlFor="food">Select Food: </label>
            <select id="food" value={selectedFood} onChange={handleFoodChange}>
              <option value="">-- Select a food item --</option>
              {foodCategories[selectedCategory].map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name} - {item.calories} kcal, {item.protein}g protein
                </option>
              ))}
            </select>
            {/* Quantity Input */}
            <label htmlFor="quantity">Quantity: </label>
            <input
              id="quantity"
              type="number"
              step="0.1"
              min="0.1"
              value={quantity}
              onChange={handleQuantityChange}
              style={{ width: "60px", marginRight: "10px" }}
            />
            <button onClick={handleAddItem}>Add</button>
          </div>
          {/* Selected Items and Total Calories/Protein */}
          <div className="selected-items">
            <h2>Selected Items</h2>
            <ul>
              {selectedItems.map((item, index) => (
                <li key={index}>
                  {item.quantity} x {item.name} -{" "}
                  {item.totalCalories.toFixed(2)} kcal,{" "}
                  {item.totalProtein.toFixed(2)}g protein
                </li>
              ))}
            </ul>
            <h3>Total Calories: {calculateTotalCalories().toFixed(2)} kcal</h3>
            <h3>Total Protein: {calculateTotalProtein().toFixed(2)}g</h3>
          </div>
        </div>
      </div>
      <button onClick={() => document.getElementById("fileInput").click()}>
        📷 Image Calorie Tracker
      </button>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
      {calorieData && (
        <div>
          <h3>Detected Food Items</h3>
          <pre>{JSON.stringify(calorieData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
