
import { React, useState } from 'react';
import Rating from 'react-rating-stars-component';

function Filter({ genres, onFilterChange }) {
    const [rating, setRating] = useState(0);
    const [resetCounter, setResetCounter] = useState(0);
    const [genre, setGenre] = useState('');
    const [sort, setSort] = useState('');
    const handleSortChange = (e) => {
        setSort(e.target.value);
        onFilterChange({ sort: e.target.value });
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
        onFilterChange({ genre: e.target.value });
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        console.log("Stella:", newRating);
        onFilterChange({ rating: parseInt(newRating, 10) });
    };

    const resetFilters = () => {
        setRating(0);
        setGenre('');
        setSort('');
        setResetCounter(prev => prev + 1);
        onFilterChange({ genre: '', sort: '', rating: 0 });
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <div className="flex flex-wrap space-x-4 items-center justify-between">
                <div>
                    <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genere</label>
                    <select
                        id="genre"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        onChange={handleGenreChange}
                        value={genre}
                    >
                        <option value="">Tutti i generi</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Ordina per</label>
                    <select
                        id="sort"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        onChange={handleSortChange}
                        value={sort}
                    >
                        <option value="">Seleziona...</option>
                        <option value="recent">Più recenti</option>
                        <option value="rating">Miglior Rating</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rating Minimo</label>
                    <Rating
                        key={resetCounter}
                        count={10}
                        onChange={handleRatingChange}
                        size={24}
                        activeColor="#ffd700"
                        value={rating}
                    />


                </div>
                <div>
                    <button onClick={resetFilters} className="px-4 py-2 bg-slate-500 rounded-full text-white hover:bg-slate-600">
                        Resetta i filtri
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filter;
