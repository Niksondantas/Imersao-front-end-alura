const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

//Consumindo a Api
function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
    .then((response) => response.json())
    .then((result) => displayResults(result, searchTerm))
}

function displayResults(result, searchTerm) {
    // Limpar resultados antigos
    resultArtist.innerHTML = '';

    // Se não houver artistas
    if (result.length === 0) {
        resultArtist.innerHTML = '<p>Nenhum artista encontrado</p>';
        resultArtist.classList.remove('hidden');
        return;
    }

    resultPlaylist.classList.add('hidden');
    resultArtist.classList.remove('hidden');
    
    // Filtrando os artistas com base no termo de busca
    const filteredResults = result.filter(artist => 
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredResults.forEach(element => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');
        
        const cardImg = document.createElement('div');
        cardImg.classList.add('card-img');
        const img = document.createElement('img');
        img.src = element.urlImg;
        img.classList.add('artist-img');
        cardImg.appendChild(img);
        
        const playIcon = document.createElement('div');
        playIcon.classList.add('play');
        playIcon.innerHTML = '<span class="fa fa-solid fa-play"></span>';
        cardImg.appendChild(playIcon);

        const cardText = document.createElement('div');
        cardText.classList.add('card-text');
        const artistName = document.createElement('span');
        artistName.classList.add('artist-name');
        artistName.innerText = element.name;
        cardText.appendChild(artistName);

        artistCard.appendChild(cardImg);
        artistCard.appendChild(cardText);
        resultArtist.appendChild(artistCard);
    });
}

document.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim(); 
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        resultArtist.innerHTML = ''; 
        return;
    }
    requestApi(searchTerm);
});
