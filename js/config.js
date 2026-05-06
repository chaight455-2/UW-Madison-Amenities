var CONFIG = {
    CENTER: [43.0766, -89.4125],
    ZOOM: 15,
    TILE_URL: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    TILE_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    CSV_PATH: 'data/building-data.csv',
    FOOTPRINTS_PATH: 'data/Building Footprints.geojson',
    BOUNDARY_PATH: 'data/Campus Boundary.json',
    AMENITIES: [
        { type: 'microwaves', label: 'Microwaves', color: '#d55e00', icon: '🔴' },
        { type: 'refrigerators', label: 'Refrigerators', color: '#0072b2', icon: '🔵' },
        { type: 'vending', label: 'Vending Machines', color: '#009e73', icon: '🟢' },
        { type: 'computers', label: 'Public Computer Labs', color: '#cc79a7', icon: '🟣' },
        { type: 'printers', label: 'Printers/Copy Machines', color: '#e69f00', icon: '🟠' }
    ],
    CLOSED_COLOR: '#c0392b',
    OPEN_COLOR: '#2ecc71',
    DEFAULT_COLOR: '#3388ff',
    BOUNDARY_STYLE: {
        color: '#c5050c',
        weight: 2,
        dashArray: '6 4',
        fill: false,
        interactive: false
    }
};
