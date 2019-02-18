

var slides = [
  { 
    carouselNo: '',
    title: '',
    description: '',
    coords: {lat: -20.363, lng: 131.044},
    image: 'https://www.fotopolis.pl/i/images/7/6/7/dz00NjA4Jmg9MzQ1Ng==_src_152767-P1010373.JPG'
  },
    { 
    carouselNo: '',
    title: '',
    description: '',
    coords: {lat: -21.363, lng: 131.044},
    image: 'https://www.fotopolis.pl/i/images/7/4/8/dz0xMDAwJmg9NzUw_src_152748-P1010187.JPG'
  },
    { 
    carouselNo: '',
    title: '',
    description: '',
    coords: {lat: -22.363, lng: 131.044},
    image: 'https://images.unsplash.com/photo-1548382340-e7280a94e3ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  },
    { 
    carouselNo: '',
    title: '',
    description: '',
    coords: {lat: -23.363, lng: 131.044},
    image: 'https://images.unsplash.com/photo-1548422664-b0e182816520?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80'
  },
    { 
    carouselNo: '',
    title: '5',
    description: '5',
    coords: {lat: -24.363, lng: 131.044},
    image: 'https://www.fotopolis.pl/i/images/7/5/6/dz0zNDU2Jmg9NDYwOA==_src_152756-P1010071.JPG'
  }
];


  (function(){
    
    var templateSlide = document.getElementById('template-slide').innerHTML;


    Mustache.parse(templateSlide);

    var slide = '';

    for (var i = 0; i < slides.length; i++) {
      slides[i].carouselNo = 'carousel-cell' + (i+1);
      slide += Mustache.render(templateSlide, slides[i]);
    }
    results.insertAdjacentHTML('beforeend', slide);

  })();

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true
});

var flkty = new Flickity( '.main-carousel', {
  hash: true,
  groupCells: true,
});

var progressBar = document.querySelector('.progress-bar')

flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});

var buttonGroup = document.querySelector('.button-group');
var buttons = buttonGroup.querySelector('.button');

buttonGroup.addEventListener( 'click', function( event ) {

  if ( !matchesSelector( event.target, '.button' ) ) {
    return;
  }
  var index = 0;
  flkty.selectCell( index );
});


function initMap() {

  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: slides[0].coords });

  for(var i=0; i < slides.length; i++) {
    new google.maps.Marker({position: slides[i].coords, map: map});
  }

  flkty.on( 'change', function( event ) {
    smoothPanAndZoom(map, 4, slides[event].coords);
  });

}

var smoothPanAndZoom = function(map, zoom, coords){
  // Trochę obliczeń, aby wyliczyć odpowiedni zoom do którego ma oddalić się mapa na początku animacji.
  var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
  jumpZoom = Math.min(jumpZoom, zoom -1);
  jumpZoom = Math.max(jumpZoom, 3);

  // Zaczynamy od oddalenia mapy do wyliczonego powiększenia.
  smoothZoom(map, jumpZoom, function(){
    // Następnie przesuwamy mapę do żądanych współrzędnych.
    smoothPan(map, coords, function(){
      // Na końcu powiększamy mapę do żądanego powiększenia.
      smoothZoom(map, zoom);
    });
  });
};

var smoothZoom = function(map, zoom, callback) {
  var startingZoom = map.getZoom();
  var steps = Math.abs(startingZoom - zoom);

  // Jeśli steps == 0, czyli startingZoom == zoom
  if(!steps) {
    // Jeśli podano trzeci argument
    if(callback) {
      // Wywołaj funkcję podaną jako trzeci argument.
      callback();
    }
    // Zakończ działanie funkcji
    return;
  }

  // Trochę matematyki, dzięki której otrzymamy -1 lub 1, w zależności od tego czy startingZoom jest mniejszy od zoom
  var stepChange = - (startingZoom - zoom) / steps;

  var i = 0;
  // Wywołujemy setInterval, który będzie wykonywał funkcję co X milisekund (X podany jako drugi argument, w naszym przypadku 80)
  var timer = window.setInterval(function(){
    // Jeśli wykonano odpowiednią liczbę kroków
    if(++i >= steps) {
      // Wyczyść timer, czyli przestań wykonywać funkcję podaną w powyższm setInterval
      window.clearInterval(timer);
      // Jeśli podano trzeci argument
      if(callback) {
        // Wykonaj funkcję podaną jako trzeci argument
        callback();
      }
    }
    // Skorzystaj z metody setZoom obiektu map, aby zmienić powiększenie na zaokrąglony wynik poniższego obliczenia
    map.setZoom(Math.round(startingZoom + stepChange * i));
  }, 80);
};

// Poniższa funkcja działa bardzo podobnie do smoothZoom. Spróbuj samodzielnie ją przeanalizować.
var smoothPan = function(map, coords, callback) {
  var mapCenter = map.getCenter();
  coords = new google.maps.LatLng(coords);

  var steps = 12;
  var panStep = {lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps};

  var i = 0;
  var timer = window.setInterval(function(){
    if(++i >= steps) {
      window.clearInterval(timer);
      if(callback) callback();
    }
    map.panTo({lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i});
  }, 1000/30);
};



