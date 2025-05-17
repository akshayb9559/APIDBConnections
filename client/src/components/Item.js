import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Item = ({ item, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(item);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/items/${item.id}`, updatedItem);
      onUpdate(updatedItem);
      setEditing(false);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="item-card">
      {editing ? (
        <div>
          <input
            type="text"
            value={updatedItem.name}
            onChange={(e) => setUpdatedItem({ ...updatedItem, name: e.target.value })}
          />
          <input
            type="text"
            value={updatedItem.description}
            onChange={(e) => setUpdatedItem({ ...updatedItem, description: e.target.value })}
          />
          <input
            type="number"
            value={updatedItem.price}
            onChange={(e) => setUpdatedItem({ ...updatedItem, price: e.target.value })}
          />
          <input
            type="number"
            value={updatedItem.quantity}
            onChange={(e) => setUpdatedItem({ ...updatedItem, quantity: e.target.value })}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Item;
