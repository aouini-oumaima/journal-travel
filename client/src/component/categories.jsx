import React from 'react';
import { Link } from 'react-router-dom';
import './categories.css';

const Categories = () => {
  return (
    <div className="categories">
      <ul>
        <li>
          <Link className="category-link" to="/historical-sites">
            Historical Sites
          </Link>
        </li>
        <li>
          <Link className="category-link" to="/beaches">
            Beaches
          </Link>
        </li>
        <li>
          <Link className="category-link" to="/desert-landscapes">
            Desert Landscapes
          </Link>
        </li>
        <li>
          <Link className="category-link" to="/mountains-and-nature">
            Mountains and Nature
          </Link>
        </li>
        <li>
          <Link className="category-link" to="/cultural-centers">
            Cultural Centers
          </Link>
        </li>
        <li>
          <Link className="category-link" to="/medieval-fortresses-and-castles">
            Medieval Fortresses and Castles
          </Link>
        </li>
        <li>
          <Link className="category-link" to="/islands">
            Islands
          </Link>
        </li>
        <li>
          <Link className="category-link" to="/religious-sites">
            Religious Sites
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Categories;
