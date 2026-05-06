// Initialize geolocation to show user's current position
function initGeolocation(map, campusBounds) {
    if (!navigator.geolocation) return;

    var userMarker = null;
    var offCampusToast = createOffCampusToast();

    // Create locate-me button as a Leaflet control
    var LocateControl = L.Control.extend({
        options: { position: 'bottomright' },

        onAdd: function() {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control locate-btn-container');
            var btn = L.DomUtil.create('a', 'locate-btn', container);
            btn.href = '#';
            btn.title = 'Zoom to your location';
            btn.setAttribute('role', 'button');
            btn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>';

            L.DomEvent.disableClickPropagation(container);
            L.DomEvent.on(btn, 'click', function(e) {
                L.DomEvent.preventDefault(e);
                if (!userMarker) return;
                var latlng = userMarker.getLatLng();
                if (campusBounds.contains(latlng)) {
                    map.flyTo(latlng, 17, { duration: 1.5 });
                } else {
                    map.flyToBounds(campusBounds, { padding: [10, 10] });
                    offCampusToast.show();
                }
            });

            container.style.display = 'none';
            this._container = container;
            return container;
        }
    });

    var locateControl = new LocateControl();
    locateControl.addTo(map);

    navigator.geolocation.watchPosition(
        function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            if (userMarker) {
                userMarker.setLatLng([lat, lng]);
            } else {
                userMarker = L.marker([lat, lng], {
                    icon: L.divIcon({
                        className: 'user-location-icon',
                        html: '<div class="user-location-dot"></div>',
                        iconSize: [16, 16]
                    })
                }).addTo(map);
                userMarker.bindPopup('You are here');

                // On first fix: slowly fly to the user only if they're inside campus.
                // Otherwise leave the view focused on campus (already framed by main.js)
                // and let the user know why we didn't zoom to them.
                if (campusBounds.contains([lat, lng])) {
                    map.flyTo([lat, lng], 17, { duration: 2.5 });
                } else {
                    offCampusToast.show();
                }

                // Show the locate button now that we have a position
                locateControl._container.style.display = '';
            }
        },
        function(error) {
            // Geolocation denied or unavailable — fail silently
        },
        {
            enableHighAccuracy: true
        }
    );
}

// Toast banner shown when the user's location is outside campus,
// so they understand why the map didn't zoom to them.
function createOffCampusToast() {
    var el = document.createElement('div');
    el.id = 'off-campus-toast';
    el.className = 'hidden';
    el.setAttribute('role', 'status');
    el.innerHTML = '<span>You\'re outside the UW-Madison campus area, so the map stayed centered on campus.</span>' +
                   '<button type="button" aria-label="Dismiss">&times;</button>';
    document.body.appendChild(el);

    var hideTimer = null;
    function hide() {
        el.classList.remove('visible');
        clearTimeout(hideTimer);
        hideTimer = setTimeout(function() { el.classList.add('hidden'); }, 250);
    }

    el.querySelector('button').addEventListener('click', hide);

    return {
        show: function() {
            el.classList.remove('hidden');
            // Force reflow so the transition plays on first show
            void el.offsetWidth;
            el.classList.add('visible');
            clearTimeout(hideTimer);
            hideTimer = setTimeout(hide, 6000);
        }
    };
}
