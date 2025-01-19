import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CartOverlay from "../features/cart/CartOverly"; 


const Header = ({ onCategoryChange }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All"); // State for active category
  const navigate = useNavigate();

  // Function to calculate and update total items
  const updateTotalItems = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cartItems.reduce((total, item) => {
      const quantity =
        item.quantity && typeof item.quantity === "number" && item.quantity > 0
          ? item.quantity
          : 1;
      return total + quantity;
    }, 0);
    setTotalItems(total);
  };

  // Update total items when the component mounts
  useEffect(() => {
    updateTotalItems();
  }, []);

  // Listen to localStorage changes and custom events
  useEffect(() => {
    const handleStorageChange = () => {
      updateTotalItems();
    };

    const handleCartUpdate = () => {
      updateTotalItems();
    };

    // Add event listener for `storage` changes
    window.addEventListener("storage", handleStorageChange);

    // Add event listener for custom "cartUpdated" event
    window.addEventListener("cartUpdated", handleCartUpdate);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // Monitor total items for changes in the same tab
  useEffect(() => {
    const originalSetItem = localStorage.setItem;

    // Monkey patch `localStorage.setItem` to trigger state updates
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments); // Call the original setItem
      if (key === "cart") {
        updateTotalItems();
      }
    };

    return () => {
      localStorage.setItem = originalSetItem; // Restore original method
    };
  }, []);

  // Handle category change and navigate to ProductListPage
  const handleCategoryChange = (category) => {
    setActiveCategory(category); // Update active category
    if (onCategoryChange) {
      onCategoryChange(category); // Call parent function if provided
    }
    navigate("/"); // Navigate to the ProductListPage
  };

  // Toggle cart overlay
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Close cart overlay
  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="flex flex-row items-center w-full h-16 p-1 m-0 border-b-4 shadow-sm text-black font-medium text-lg">
      <div className="flex flex-row items-center w-fit h-full ml-8">
        {["Tech", "Clothes", "All"].map((category) => (
          <button
            key={category}
            className={`h-full w-fit p-1 m-2 text-slate-500 hover:text-green-400 hover:border-b-2 hover:border-green-400 ${
              activeCategory === category
                ? "text-green-400 border-b-2 border-green-400"
                : ""
            }`}
            onClick={() => handleCategoryChange(category)}
            data-testid={
              activeCategory === category
                ? "active-category-link"
                : "category-link"
            }
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex-1"></div>
      {isCartOpen && (
        <img
          src="/refresh-svgrepo-com.svg"
          alt="refresh icon"
          className="w-9 h-9"
        />
      )}
      <div className="flex-1"></div>
      <button
        data-testid="cart-btn"
        className="relative h-full w-fit p-1 text-slate-500 hover:text-green-400 mr-12"
        onClick={toggleCart}
      >
        <AiOutlineShoppingCart className="h-6 w-6 text-green-500" />
        {totalItems > 0 && (
          <span className="absolute top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
      {isCartOpen && <CartOverlay onClose={closeCart} />}
    </div>
  );
};

export default Header;
