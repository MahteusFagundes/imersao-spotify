const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            // Filtra os resultados manualmente no frontend
            const filteredResults = result.filter(artist =>
                artist.name.toLowerCase().includes(searchTerm)
            );
            displayResults(filteredResults);
        })
        .catch((error) => console.error("Erro na requisição:", error));
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden");
    const artistContainer = document.getElementById('result-artist');
    
    // Limpa os resultados anteriores
    artistContainer.innerHTML = '';

    if (result.length === 0) {
        artistContainer.innerHTML = '<p>Nenhum artista encontrado.</p>';
        artistContainer.classList.remove('hidden');
        return;
    }

    // Cria o grid container
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    result.forEach(element => {
        // Cria o card de artista completo
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        // Cria o container da imagem
        const cardImgContainer = document.createElement('div');
        cardImgContainer.classList.add('card-img');

        // Cria a imagem do artista
        const artistImage = document.createElement('img');
        artistImage.src = element.urlImg;
        artistImage.alt = element.name;
        artistImage.classList.add('artist-img');

        // Cria o botão de play
        const playContainer = document.createElement('div');
        playContainer.classList.add('play');
        const playIcon = document.createElement('span');
        playIcon.classList.add('fa', 'fa-solid', 'fa-play');
        playContainer.appendChild(playIcon);

        // Adiciona imagem e play ao container de imagem
        cardImgContainer.appendChild(artistImage);
        cardImgContainer.appendChild(playContainer);

        // Cria o container de texto
        const cardTextContainer = document.createElement('div');
        cardTextContainer.classList.add('card-text');

        // Cria link do artista
        const artistLink = document.createElement('a');
        artistLink.href = '#';
        artistLink.title = element.name;
        artistLink.classList.add('vst');

        // Cria nome do artista
        const artistName = document.createElement('span');
        artistName.classList.add('artist-name');
        artistName.innerText = element.name;

        // Cria categoria
        const artistCategory = document.createElement('span');
        artistCategory.classList.add('artist-categorie');
        artistCategory.innerText = 'Artista';

        // Adiciona elementos ao container de texto
        cardTextContainer.appendChild(artistLink);
        cardTextContainer.appendChild(artistName);
        cardTextContainer.appendChild(artistCategory);

        // Adiciona containers ao card
        artistCard.appendChild(cardImgContainer);
        artistCard.appendChild(cardTextContainer);

        // Adiciona card ao grid container
        gridContainer.appendChild(artistCard);
    });

    // Adiciona grid container ao container de resultados
    artistContainer.appendChild(gridContainer);

    // Mostra os resultados
    artistContainer.classList.remove('hidden');
}

// Exemplo de como chamar a função quando o usuário digitar algo
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase(); // Remove espaços em branco e converte para minúsculas
    if (searchTerm) {
        requestApi(searchTerm);
    } else {
        resultArtist.classList.add("hidden"); // Esconde se não houver busca
        resultPlaylist.classList.remove("hidden"); // Mostra a playlist novamente
    }
});