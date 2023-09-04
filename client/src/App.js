import React, { useState } from 'react';
import axios from 'axios';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import AddExperience from "./component/add";
import UpdateExperienceForm from "./component/update"
import Inspirations from "./component/inspiration"
import Categories from './component/categories';
import Beaches from './component/beaches';
import Cultural from './component/cultural';
import Desert from './component/desert'; 
import Historical from './component/historical';
import Nature from './component/mountains';
import Castles from "./component/medieval"
import Island from './component/islands';
import SignUp from './login/SignUp';
import SignIn from './login/SignIn';
import TravelDetails from "./component/details"
// import  Search from './component/search'

const App = () => {

  return (
    <div>
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<SignUp />} />
  <Route path="/signin" element={<SignIn />} />
  <Route path="/add" element={<AddExperience />}/>
  <Route path="/updatetravel/:id" element={< UpdateExperienceForm/>}/>
  <Route path="/shared" element={< Inspirations/>}/>
  <Route path="/Categories" element={< Categories/>}/>
  <Route path="/beaches" element={< Beaches/>}/>
  <Route path="/cultural-centers" element={< Cultural/>}/>
  <Route path="/desert-landscapes" element={< Desert/>}/>
  <Route path="/historical-sites" element={< Historical/>}/>
  <Route path="/mountains-and-nature" element={< Nature/>}/>
  <Route path="/medieval-fortresses-and-castles" element={< Castles/>}/>
  <Route path="/islands" element={< Island/>}/>
  <Route path="/experience/:id" element={< TravelDetails/>}/>
  {/* <Route path="/search" element={<  Search/>}/> */}

  </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
