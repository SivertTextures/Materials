function catalogCode(index) {
    return "MAT-" + String(index + 1).padStart(3, "0");
}

function buildCard(texture, index) {
    const item = document.createElement("div");
    item.className = "item";
    item.dataset.name = (texture.name + " " + texture.maps.join(" ")).toLowerCase();

    item.innerHTML = `
        <span class="code">${catalogCode(index)}</span>
        <img src="${texture.folder}/Preview.png" alt="${texture.name} texture preview"
             onerror="this.src='data:image/svg+xml,' + encodeURIComponent(placeholderSVG('${texture.name}'))">
        <h2>${texture.name}</h2>
        <p class="resolution">${texture.resolution}</p>
        <div class="tags">
            ${texture.maps.map(m => `<span class="tag">${m}</span>`).join("")}
        </div>
        <a href="${texture.folder}.zip"><button>Download</button></a>
    `;
    return item;
}

// Deterministic placeholder swatch so the grid never looks broken
// while a Preview.png is still missing for a new entry.
function placeholderSVG(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    const hue = Math.abs(hash) % 360;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
        <rect width="300" height="300" fill="hsl(${hue},18%,20%)"/>
        <rect width="300" height="300" fill="hsl(${hue},30%,14%)" opacity="0.5"
              transform="rotate(45 150 150)" x="-150" y="140" width="600" height="20"/>
    </svg>`;
}

function renderGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    TEXTURES.forEach((texture, index) => grid.appendChild(buildCard(texture, index)));
    document.getElementById("count").textContent = TEXTURES.length;
}

function filterTextures() {
    const query = document.getElementById("searchBar").value.trim().toLowerCase();
    const items = document.querySelectorAll(".item");
    let anyVisible = false;

    items.forEach(item => {
        const match = item.dataset.name.includes(query);

        item.style.display = match ? "" : "none";

        if (match) {
            anyVisible = true;
        }
    });

    document.getElementById("noResults").style.display =
        anyVisible ? "none" : "block";
}

renderGrid();
document.getElementById("searchBar").addEventListener("input", filterTextures);
