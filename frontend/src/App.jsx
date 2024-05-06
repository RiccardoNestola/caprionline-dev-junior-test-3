import React, { useEffect, useState } from 'react';
import { Button, Rating, Spinner } from 'flowbite-react';
import Filter from './components/Filter';

const App = props => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [genres, setGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalFilm, setTotalFilm] = useState(0);




  const fetchMovies = async () => {
    setLoading(true);
    setErrorMessage('');
    const query = new URLSearchParams(filters).toString();
    try {
      const response = await fetch(`http://localhost:8000/movies?${query}`);
      const data = await response.json();
      console.log("film", data);
      setTotalFilm(data.length);
      console.log("Totale:", data.length);
      if (!data.length) {
        setErrorMessage('Non ci sono film per il rating selezionato.');
        setMovies([]);
      } else {
        setMovies(data);
      }
    } catch (error) {
      console.error('Errore nel caricamento dei film:', error);
      setErrorMessage('Errore nel caricamento dei film.');
    }
    setLoading(false);
  };


  const fetchGenres = async () => {
    const response = await fetch('http://localhost:8000/genres');
    const data = await response.json();
    console.log("Generi", data);
    setGenres(data);
  };



  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <Layout>
      <Heading />

      <div className="text-right mb-4 font-bold">Film totali:
        <span className="inline-flex items-center rounded-md bg-slate-500 px-2 py-1 text-sm font-medium text-white ring-1 ring-inset ring-gray-500/10 ml-2">{totalFilm}</span>


      </div>

      <Filter onFilterChange={handleFilterChange} genres={genres} />

      {errorMessage ? (
        <div className="text-red-500 text-center mt-4">{errorMessage}</div>
      ) : (
        <MovieList loading={loading}>
          {movies.map((item, key) => (
            <MovieItem key={key} {...item} />
          ))}
        </MovieList>
      )}


    </Layout>
  );
};

const Layout = props => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        {props.children}
      </div>
    </section>
  );
};

const Heading = props => {
  return (
    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
      <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        Movie Collection
      </h1>

      <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
        Explore the whole collection of movies
      </p>
    </div>
  );
};

const MovieList = props => {
  if (props.loading) {
    return (
      <div className="text-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-y-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
      {props.children}
    </div>
  );
};

const MovieItem = props => {
  return (
    <div className="flex flex-col w-full h-full rounded-lg shadow-md lg:max-w-sm">
      <div className="grow">
        <img
          className="object-cover w-full h-60 md:h-80"
          src={props.imageUrl}
          alt={props.title}
          loading="lazy"
        />
      </div>

      <div className="grow flex flex-col h-full p-3">
        <div className="grow mb-3 last:mb-0">
          {props.year || props.rating
            ? <div className="flex justify-between align-middle text-gray-900 text-xs font-medium mb-2">
              <span>{props.year}</span>

              {props.rating
                ? <Rating>
                  <Rating.Star />

                  <span className="ml-0.5">
                    {props.rating}
                  </span>
                </Rating>
                : null
              }
            </div>
            : null
          }

          <h3 className="text-gray-900 text-lg leading-tight font-semibold mb-1">
            {props.title}
          </h3>

          <p className="text-gray-600 text-sm leading-normal mb-4 last:mb-0">
            {props.plot.substr(0, 80)}...
          </p>
        </div>

        {props.wikipediaUrl
          ? <Button
            color="light"
            size="xs"
            className="w-full"
            onClick={() => window.open(props.wikipediaUrl, '_blank')}
          >
            More
          </Button>
          : null
        }
      </div>
    </div>
  );
};

export default App;
