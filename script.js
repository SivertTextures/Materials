const textures = [
    { name: "Lava", filename: "lava.zip" preview: "./Previews/Lava_Preview.png" },
    { name: "Smooth Stone", filename: "smooth_stone.zip", preview: "./Previews/Lava_Preview.png" },
    { name: "Warped Wood Planks", filename: "warped_wood.zip" preview: "./Previews/Lava_Preview.png" },
    { name: "Clear Glass", filename: "clear_glass.zip" preview: "./Previews/Lava_Preview.png" }
];

const textureGrid = document.getElementById('textureGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

function renderTextures(textureList) {
    textureGrid.innerHTML = ''; 

    if (textureList.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');

    textureList.forEach(texture => {
        const card = document.createElement('div');
        card.className = 'texture-card';

        const preview = document.createElement('img');
        preview.className = 'texture-preview';
        preview.src = texture.preview;
        preview.alt = texture.name + " texture preview";
        const title = document.createElement('h2');
        title.className = 'texture-name';
        title.textContent = texture.name;

        const downloadBtn = document.createElement('a');
        downloadBtn.className = 'download-btn';
        downloadBtn.textContent = 'Download';
        downloadBtn.href = texture.filename; 
        downloadBtn.setAttribute('download', ''); 

        card.appendChild(preview);
        card.appendChild(title);
        card.appendChild(downloadBtn);
        textureGrid.appendChild(card);
    });
}

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase(); 

    const filteredTextures = textures.filter(texture => 
        texture.name.toLowerCase().includes(searchTerm)
    );

    renderTextures(filteredTextures);
});

renderTextures(textures);
