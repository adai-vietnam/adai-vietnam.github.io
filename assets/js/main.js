/**
* Template Name: Squadfree - v4.0.1
* Template URL: https://bootstrapmade.com/squadfree-free-bootstrap-template-creative/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 24
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()


// Visualization 

var w = c.width = window.innerWidth,
  h = c.height = window.innerHeight,
  ctx = c.getContext('2d'),

  opts = {

    range: 180,
    baseConnections: 5,
    addedConnections: 5,
    baseSize: 5,
    minSize: .5,
    dataToConnectionSize: .1,
    sizeMultiplier: .5,
    allowedDist: 40,
    baseDist: 40,
    addedDist: 30,
    connectionAttempts: 100,

    dataToConnections: 1,
    baseSpeed: .05,
    addedSpeed: .001,
    baseGlowSpeed: .1,
    addedGlowSpeed: .1,

    rotVelX: .0009,
    rotVelY: .0009,

    repaintColor: 'rgba(0,0,0,.5)',
    connectionColor: '#fff',
    rootColor: '#fff',
    endColor: '#fff',
    dataColor: '#fff',

    wireframeWidth: .1,
    wireframeColor: '#fff',

    depth: 175,
    focalLength: 250,
    vanishPoint: {
      x: w / 2,
      y: h / 2
    }
  },

  squareRange = opts.range * opts.range,
  squareAllowed = opts.allowedDist * opts.allowedDist,
  mostDistant = opts.depth + opts.range,
  sinX = sinY = 0,
  cosX = cosY = 0,

  connections = [],
  toDevelop = [],
  data = [],
  all = [],
  tick = 0,
  totalProb = 0,

  animating = false,

  Tau = Math.PI * 2;

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, w, h);
ctx.fillStyle = '#000';
ctx.font = '50px Verdana';
ctx.fillText('', w / 2 - ctx.measureText('').width / 2, h / 2 - 15);

window.setTimeout(init, 4); // to render the loading screen

function init() {

  connections.length = 0;
  data.length = 0;
  all.length = 0;
  toDevelop.length = 0;

  var connection = new Connection(0, 0, 0, opts.baseSize);
  connection.step = Connection.rootStep;
  connections.push(connection);
  all.push(connection);
  connection.link();

  while (toDevelop.length > 0) {

    toDevelop[0].link();
    toDevelop.shift();
  }

  if (!animating) {
    animating = true;
    anim();
  }
}

function Connection(x, y, z, size) {

  this.x = x;
  this.y = y;
  this.z = z;
  this.size = size;

  this.screen = {};

  this.links = [];
  this.probabilities = [];
  this.isEnd = false;

  this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random();
}
Connection.prototype.link = function() {

  if (this.size < opts.minSize)
    return this.isEnd = true;

  var links = [],
    connectionsNum = opts.baseConnections + Math.random() * opts.addedConnections | 0,
    attempt = opts.connectionAttempts,

    alpha, beta, len,
    cosA, sinA, cosB, sinB,
    pos = {},
    passedExisting, passedBuffered;

  while (links.length < connectionsNum && --attempt > 0) {

    alpha = Math.random() * Math.PI;
    beta = Math.random() * Tau;
    len = opts.baseDist + opts.addedDist * Math.random();

    cosA = Math.cos(alpha);
    sinA = Math.sin(alpha);
    cosB = Math.cos(beta);
    sinB = Math.sin(beta);

    pos.x = this.x + len * cosA * sinB;
    pos.y = this.y + len * sinA * sinB;
    pos.z = this.z + len * cosB;

    if (pos.x * pos.x + pos.y * pos.y + pos.z * pos.z < squareRange) {

      passedExisting = true;
      passedBuffered = true;
      for (var i = 0; i < connections.length; ++i)
        if (squareDist(pos, connections[i]) < squareAllowed)
          passedExisting = false;

      if (passedExisting)
        for (var i = 0; i < links.length; ++i)
          if (squareDist(pos, links[i]) < squareAllowed)
            passedBuffered = false;

      if (passedExisting && passedBuffered)
        links.push({
          x: pos.x,
          y: pos.y,
          z: pos.z
        });

    }

  }

  if (links.length === 0)
    this.isEnd = true;
  else {
    for (var i = 0; i < links.length; ++i) {

      var pos = links[i],
        connection = new Connection(pos.x, pos.y, pos.z, this.size * opts.sizeMultiplier);

      this.links[i] = connection;
      all.push(connection);
      connections.push(connection);
    }
    for (var i = 0; i < this.links.length; ++i)
      toDevelop.push(this.links[i]);
  }
}
Connection.prototype.step = function() {

  this.setScreen();
  this.screen.color = (this.isEnd ? opts.endColor : opts.connectionColor).replace('light', 300 + ((tick * this.glowSpeed) % 300)).replace('alp', 4 + (1 - this.screen.z / mostDistant) * .8);

  for (var i = 0; i < this.links.length; ++i) {
    ctx.moveTo(this.screen.x, this.screen.y);
    ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y);
  }
}
Connection.rootStep = function() {
  this.setScreen();
  this.screen.color = opts.rootColor.replace('light', 30 + ((tick * this.glowSpeed) % 30)).replace('alp', (1 - this.screen.z / mostDistant) * .8);

  for (var i = 0; i < this.links.length; ++i) {
    ctx.moveTo(this.screen.x, this.screen.y);
    ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y);
  }
}
Connection.prototype.draw = function() {
  ctx.fillStyle = this.screen.color;
  ctx.beginPath();
  ctx.arc(this.screen.x, this.screen.y, this.screen.scale * this.size, 0, Tau);
  ctx.fill();
}

function Data(connection) {

  this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random();
  this.speed = opts.baseSpeed + opts.addedSpeed * Math.random();

  this.screen = {};

  this.setConnection(connection);
}
Data.prototype.reset = function() {

  this.setConnection(connections[0]);
  this.ended = 2;
}
Data.prototype.step = function() {

  this.proportion += this.speed;

  if (this.proportion < 1) {
    this.x = this.ox + this.dx * this.proportion;
    this.y = this.oy + this.dy * this.proportion;
    this.z = this.oz + this.dz * this.proportion;
    this.size = (this.os + this.ds * this.proportion) * opts.dataToConnectionSize;
  } else
    this.setConnection(this.nextConnection);

  this.screen.lastX = this.screen.x;
  this.screen.lastY = this.screen.y;
  this.setScreen();
  this.screen.color = opts.dataColor.replace('light', 400 + ((tick * this.glowSpeed) % 500)).replace('alp', .2 + (1 - this.screen.z / mostDistant) * .6);

}
Data.prototype.draw = function() {

  if (this.ended)
    return --this.ended; // not sre why the thing lasts 2 frames, but it does

  ctx.beginPath();
  ctx.strokeStyle = this.screen.color;
  ctx.lineWidth = this.size * this.screen.scale;
  ctx.moveTo(this.screen.lastX, this.screen.lastY);
  ctx.lineTo(this.screen.x, this.screen.y);
  ctx.stroke();
}
Data.prototype.setConnection = function(connection) {

  if (connection.isEnd)
    this.reset();

  else {

    this.connection = connection;
    this.nextConnection = connection.links[connection.links.length * Math.random() | 0];

    this.ox = connection.x; // original coordinates
    this.oy = connection.y;
    this.oz = connection.z;
    this.os = connection.size; // base size

    this.nx = this.nextConnection.x; // new
    this.ny = this.nextConnection.y;
    this.nz = this.nextConnection.z;
    this.ns = this.nextConnection.size;

    this.dx = this.nx - this.ox; // delta
    this.dy = this.ny - this.oy;
    this.dz = this.nz - this.oz;
    this.ds = this.ns - this.os;

    this.proportion = 0;
  }
}
Connection.prototype.setScreen = Data.prototype.setScreen = function() {

  var x = this.x,
    y = this.y,
    z = this.z;

  // apply rotation on X axis
  var Y = y;
  y = y * cosX - z * sinX;
  z = z * cosX + Y * sinX;

  // rot on Y
  var Z = z;
  z = z * cosY - x * sinY;
  x = x * cosY + Z * sinY;

  this.screen.z = z;

  // translate on Z
  z += opts.depth;

  this.screen.scale = opts.focalLength / z;
  this.screen.x = opts.vanishPoint.x + x * this.screen.scale;
  this.screen.y = opts.vanishPoint.y + y * this.screen.scale;

}

function squareDist(a, b) {

  var x = b.x - a.x,
    y = b.y - a.y,
    z = b.z - a.z;

  return x * x + y * y + z * z;
}

function anim() {

  window.requestAnimationFrame(anim);

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = opts.repaintColor;
  ctx.fillRect(0, 0, w, h);

  ++tick;

  var rotX = tick * opts.rotVelX,
    rotY = tick * opts.rotVelY;

  cosX = Math.cos(rotX);
  sinX = Math.sin(rotX);
  cosY = Math.cos(rotY);
  sinY = Math.sin(rotY);

  if (data.length < connections.length * opts.dataToConnections) {
    var datum = new Data(connections[0]);
    data.push(datum);
    all.push(datum);
  }

  ctx.globalCompositeOperation = 'lighter';
  ctx.beginPath();
  ctx.lineWidth = opts.wireframeWidth;
  ctx.strokeStyle = opts.wireframeColor;
  all.map(function(item) {
    item.step();
  });
  ctx.stroke();
  ctx.globalCompositeOperation = 'source-over';
  all.sort(function(a, b) {
    return b.screen.z - a.screen.z
  });
  all.map(function(item) {
    item.draw();
  });

  /*ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.arc( opts.vanishPoint.x, opts.vanishPoint.y, opts.range * opts.focalLength / opts.depth, 0, Tau );
  ctx.stroke();*/
}

window.addEventListener('resize', function() {

  opts.vanishPoint.x = (w = c.width = window.innerWidth) / 2;
  opts.vanishPoint.y = (h = c.height = window.innerHeight) / 2;
  ctx.fillRect(0, 0, w, h);
});