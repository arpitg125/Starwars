import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import axios from 'axios';

const ScreenList2 = ({ characterId }) => {
  const [character, setCharacter] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/${characterId}/`);
        setCharacter(response.data);

        // Fetch and set movies
        const moviesData = await Promise.all(
          response.data.films.map((film) => axios.get(film))
        );
        setMovies(moviesData.map((movie) => movie.data.title));
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };
    fetchCharacter();
  }, [characterId]);

  return (
    <Box>
      {character && (
        <Box>
          <Text fontSize="2xl">{character.name}</Text>
          {/* Display other character details */}
        </Box>
      )}
      <Box>
        <Text fontSize="xl" mt={4}>Movies appeared in:</Text>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default ScreenList2;