import React, { useState, useEffect } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import axios from 'axios';


const ScreenList1 = () => {
    const [characters, setCharacters] = useState([]);
    const [nextPage, setNextPage] = useState('');
    const [prevPage, setPrevPage] = useState('');
  
    useEffect(() => {
      const fetchCharacters = async () => {
        try {

          const response = await axios.get('https://swapi.dev/api/people/');
          setCharacters(response.data.results);
          setNextPage(response.data.next);

          setPrevPage(response.data.previous);
        } catch (error) {
          console.error('Error fetching characters:', error);
        }
      };
      fetchCharacters();
    }, []);
  
    const handleNextPage = async () => {
      if (nextPage) {
        try {
          const response = await axios.get(nextPage);
          setCharacters(response.data.results);
          setNextPage(response.data.next);
          setPrevPage(response.data.previous);
        } catch (error) {
          console.error('Error fetching characters:', error);
        }
      }
    };
  
    const handlePrevPage = async () => {
      if (prevPage) {
        try {
          const response = await axios.get(prevPage);
          setCharacters(response.data.results);
          setNextPage(response.data.next);
          setPrevPage(response.data.previous);
        } catch (error) {
          console.error('Error fetching characters:', error);
        }
      }
    };
  
    return (
     <Box maxW="800px" m="auto" p={4}>
      <Text fontSize="20" color="green" mb={4} textAlign="center">Star Wars Characters</Text>
      <Box>
        {characters.map((character) => (
          <Box key={character.url}p={4}borderWidth="1px"borderRadius="md"mb={4}bg="white"boxShadow="md"
          >
            <Text fontSize="lg">{character.name}</Text>
           
          </Box>
        ))}
      </Box>
      <Box textAlign="center" >
        <Button padding="5px 10px" margin-right="3px" border-radius= "4px"font-weight= "normal" color= "rgba(255, 255, 255, 0.8)"background=" rgb(145, 92, 182)" onClick={handlePrevPage} mr={2}  >Previous</Button>
        <Button  padding="5px 10px" border-radius= "4px"font-weight= "normal" color= "rgba(255, 255, 255, 0.8)"background=" rgb(145, 92, 182)"  onClick={handleNextPage}>Next</Button>
      </Box>
    </Box>
    );
  };
  
  export default ScreenList1;


