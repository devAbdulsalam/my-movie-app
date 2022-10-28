import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import MovieInfo from "./components/MovieInfo"
import Series from "./components/Series"
import EpisodeInfo from "./components/EpisodeInfo"
import Footer from "./components/Footer/Footer"
import Season from "./components/Season";

function App ()
{
  return (
    <div className="">
      <BrowserRouter>
      <nav className="p-3 pl-8 bg-gray-900">
        <Link to="/" className="text-2xl text-cyan-500 mx-2 hover:text-white">Home</Link>
        <Link to="/" className="text-2xl text-cyan-500 mx-2 hover:text-white">Movies</Link>
        <Link to="/series" className="text-2xl text-cyan-500 mx-2 hover:text-white">Series</Link>
      </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="series" element={<Series />} />
          <Route exact path="/:type/:id" element={<MovieInfo />} />
          <Route exact path="/:type/:id/season/:season/" element={<Season />} />
          <Route exact path="/:type/:id/season/:season/episode/:episode" element={<EpisodeInfo />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App