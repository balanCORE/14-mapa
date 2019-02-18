

var slides = [
  { 
    carouselNo: '',
    title: '',
    description: '',
    coords: {lat: -25.363, lng: 131.044},
    image: 'https://www.fotopolis.pl/i/images/7/6/7/dz00NjA4Jmg9MzQ1Ng==_src_152767-P1010373.JPG'
  },
    { 
    carouselNo: '',
    title: '',
    description: '',
    coords: {lat: -25.363, lng: 131.044},
    image: 'https://www.fotopolis.pl/i/images/7/4/8/dz0xMDAwJmg9NzUw_src_152748-P1010187.JPG'
  },
    { 
    carouselNo: '',
    title: '',
    description: '',
    coords: {lat: -25.363, lng: 131.044},
    image: 'https://images.unsplash.com/photo-1548382340-e7280a94e3ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  },
    { 
    carouselNo: '',
    title: '',
    description: '',
    coords: {lat: -25.363, lng: 131.044},
    image: 'https://images.unsplash.com/photo-1548422664-b0e182816520?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80'
  },
    { 
    carouselNo: '',
    title: '5',
    description: '5',
    coords: {lat: -25.363, lng: 131.044},
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
  // The location of Uluru
  	
  	function createCoords(){
	  var coords = [];

	  for (var i = 0; i <= 20; ++i) {
	      coords[i] = "coords"+i;
	  }

	  return coords;
	}
		createCoords();	
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}

