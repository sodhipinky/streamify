import { useState, useEffect } from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [movies, setMovies] = useState([
    {
      "adult": false,
      "backdrop_path": "/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg",
      "genre_ids": [
        16,
        28,
        12,
        35,
        10751
      ],
      "id": 1011985,
      "original_language": "en",
      "original_title": "Kung Fu Panda 4",
      "overview": "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
      "popularity": 2962.347,
      "poster_path": "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
      "release_date": "2024-03-02",
      "title": "Kung Fu Panda 4",
      "video": false,
      "vote_average": 6.857,
      "vote_count": 724
    },
    {
      "adult": false,
      "backdrop_path": "/d1RHScaZc7I8j0lDke1c4AxI435.jpg",
      "genre_ids": [
        28,
        12,
        16,
        10751,
        35
      ],
      "id": 9502,
      "original_language": "en",
      "original_title": "Kung Fu Panda",
      "overview": "When the Valley of Peace is threatened, lazy Po the panda discovers his destiny as the \"chosen one\" and trains to become a kung fu hero, but transforming the unsleek slacker into a brave warrior won't be easy. It's up to Master Shifu and the Furious Five -- Tigress, Crane, Mantis, Viper and Monkey -- to give it a try.",
      "popularity": 186.855,
      "poster_path": "/wWt4JYXTg5Wr3xBW2phBrMKgp3x.jpg",
      "release_date": "2008-06-04",
      "title": "Kung Fu Panda",
      "video": false,
      "vote_average": 7.276,
      "vote_count": 11079
    },
    {
      "adult": false,
      "backdrop_path": "/uT5G4fA7jKxlJNfwYPMm353f5AI.jpg",
      "genre_ids": [
        28,
        12,
        16,
        35,
        10751
      ],
      "id": 140300,
      "original_language": "en",
      "original_title": "Kung Fu Panda 3",
      "overview": "While Po and his father are visiting a secret panda village, an evil spirit threatens all of China, forcing Po to form a ragtag army to fight back.",
      "popularity": 150.469,
      "poster_path": "/oajNi4Su39WAByHI6EONu8G8HYn.jpg",
      "release_date": "2016-01-23",
      "title": "Kung Fu Panda 3",
      "video": false,
      "vote_average": 6.903,
      "vote_count": 5687
    },
    {
      "adult": false,
      "backdrop_path": "/7BdxZXbSkUiVeCRXKD3hi9KYeWm.jpg",
      "genre_ids": [
        16,
        10751,
        35
      ],
      "id": 49444,
      "original_language": "en",
      "original_title": "Kung Fu Panda 2",
      "overview": "Po is now living his dream as The Dragon Warrior, protecting the Valley of Peace alongside his friends and fellow kung fu masters, The Furious Five - Tigress, Crane, Mantis, Viper and Monkey. But Po’s new life of awesomeness is threatened by the emergence of a formidable villain, who plans to use a secret, unstoppable weapon to conquer China and destroy kung fu. It is up to Po and The Furious Five to journey across China to face this threat and vanquish it. But how can Po stop a weapon that can stop kung fu? He must look to his past and uncover the secrets of his mysterious origins; only then will he be able to unlock the strength he needs to succeed.",
      "popularity": 147.338,
      "poster_path": "/mtqqD00vB4PGRt20gWtGqFhrkd0.jpg",
      "release_date": "2011-05-25",
      "title": "Kung Fu Panda 2",
      "video": false,
      "vote_average": 7.009,
      "vote_count": 6770
    }
  ]);

  return (
    <div className='container-fluid movie-app'>
      <div className='row'>

      </div>
    </div>
  );
}

export default App