// Initialize the building search bar with a dropdown of matching buildings
function initSearch(map, buildingLayer) {
    var searchInput = document.getElementById('search-bar');
    var container = document.getElementById('search-container');

    // Create dropdown element
    var dropdown = document.createElement('ul');
    dropdown.id = 'search-results';
    dropdown.setAttribute('role', 'listbox');
    dropdown.className = 'hidden mt-1 bg-white rounded-lg shadow-md max-h-[60vh] overflow-y-auto list-none p-0 m-0';
    container.appendChild(dropdown);

    var activeIndex = -1;
    var currentMatches = [];

    function clearDropdown() {
        dropdown.innerHTML = '';
        dropdown.classList.add('hidden');
        currentMatches = [];
        activeIndex = -1;
    }

    function selectBuilding(layer) {
        map.fitBounds(layer.getBounds());
        openBuildingSheet(layer.feature);
        searchInput.value = layer.feature.properties.name;
        clearDropdown();
        searchInput.blur();
    }

    function renderResults(matches) {
        dropdown.innerHTML = '';
        if (matches.length === 0) {
            dropdown.classList.add('hidden');
            return;
        }
        for (var i = 0; i < matches.length; i++) {
            var layer = matches[i];
            var item = document.createElement('li');
            item.setAttribute('role', 'option');
            item.className = 'px-3.5 py-2.5 text-sm text-gray-800 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-100';
            item.textContent = layer.feature.properties.name;
            (function(l) {
                item.addEventListener('mousedown', function(e) {
                    e.preventDefault();
                    selectBuilding(l);
                });
            })(layer);
            dropdown.appendChild(item);
        }
        dropdown.classList.remove('hidden');
    }

    function findMatches(query) {
        var matches = [];
        buildingLayer.eachLayer(function(layer) {
            var name = layer.feature.properties.name.toLowerCase();
            if (name.indexOf(query) !== -1) matches.push(layer);
        });
        matches.sort(function(a, b) {
            return a.feature.properties.name.localeCompare(b.feature.properties.name);
        });
        return matches;
    }

    function updateActive() {
        var items = dropdown.querySelectorAll('li');
        for (var i = 0; i < items.length; i++) {
            if (i === activeIndex) {
                items[i].classList.add('bg-gray-100');
                items[i].scrollIntoView({ block: 'nearest' });
            } else {
                items[i].classList.remove('bg-gray-100');
            }
        }
    }

    searchInput.addEventListener('input', function() {
        var query = searchInput.value.toLowerCase().trim();
        if (!query) {
            clearDropdown();
            return;
        }
        currentMatches = findMatches(query);
        activeIndex = -1;
        renderResults(currentMatches);
    });

    searchInput.addEventListener('keydown', function(e) {
        if (currentMatches.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIndex = (activeIndex + 1) % currentMatches.length;
            updateActive();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIndex = (activeIndex - 1 + currentMatches.length) % currentMatches.length;
            updateActive();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            var idx = activeIndex >= 0 ? activeIndex : 0;
            selectBuilding(currentMatches[idx]);
        } else if (e.key === 'Escape') {
            clearDropdown();
            searchInput.blur();
        }
    });

    searchInput.addEventListener('focus', function() {
        if (currentMatches.length > 0) dropdown.classList.remove('hidden');
    });

    document.addEventListener('click', function(e) {
        if (!container.contains(e.target)) clearDropdown();
    });
}
