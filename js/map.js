(() => {
  const container=document.querySelector('#cafe-map');
  if(!container || !window.L) return;
  container.textContent='';
  const coordinates=[3.1453,101.6955];
  const map=L.map(container,{scrollWheelZoom:false}).setView(coordinates,16);
  const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:19,
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  const status=document.querySelector('.map-status');
  tiles.on('tileerror',()=>{status.textContent='Map tiles could not load. Use the Google Maps link below for directions.';});
  const icon=L.divIcon({className:'cafe-marker',html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 8h12v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Zm12 1h2a3 3 0 0 1 0 6h-2M3 23h16M8 5V2m5 3V2"/></svg>',iconSize:[44,44],iconAnchor:[22,44],popupAnchor:[0,-46]});
  L.marker(coordinates,{icon,title:'Amber & Oak — sample location',alt:'Sample café location near Central Market'}).addTo(map).bindPopup('<strong>Amber &amp; Oak</strong><br>Sample neighbourhood · Central Market<br>Kuala Lumpur, Malaysia');
  new ResizeObserver(()=>map.invalidateSize()).observe(container);
})();
