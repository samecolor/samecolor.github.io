$(document).ready(function(){
 
  var colors = new Array();
  colors[0] = '#e74c3c'; //red
  colors[1] = '#ea4c89'; //pink
  colors[2] = '#8e44ad'; //purple
  colors[3] = '#2980b9'; //blue
  colors[4] = '#27ae60'; //green
  colors[5] = '#f1c40f'; //yellow
  colors[6] = '#e67e22'; //orange
  colors[7] = '#5d4037'; //brown
  colors[8] = '#4d4e56'; //grey
  var score = 0;
  var circle = new ProgressBar.Circle('.circle', {
    color: '#2c3e50',
    fill: '#FFF',
    strokeWidth: 5
  });


  randomGet();
  var random = randomGet();
  filling();
  circle.set(1);
  play();

  function randomGet() {
    var n = new Array();
    var z = colors[Math.floor(Math.random()*colors.length)];
    n[0] = colors[Math.floor(Math.random()*colors.length)];

    do {
      n[1] = colors[Math.floor(Math.random()*colors.length)];
    } while(n[1] == n[0]);
   
    do {
      n[2] = colors[Math.floor(Math.random()*colors.length)];
    } while(n[2] == n[1] || n[2] == n[0]);
      
    do {
      n[3] = colors[Math.floor(Math.random()*colors.length)];
    } while(n[3] == n[2] || n[3] == n[1] || n[3] == n[0]);
      var x = n[Math.floor(Math.random()*n.length)];
    return {
      topLeft: n[0],
      topRight: n[1],
      bottomLeft: n[2],
      bottomRight: n[3],
      text: x,
      textColor: z
    }
  }

  function filling() {
    $('#top-left').css('background-color', random.topLeft);
    $('#top-right').css('background-color', random.topRight);
    $('#bottom-left').css('background-color', random.bottomLeft);
    $('#bottom-right').css('background-color', random.bottomRight);
    $('#color').css('color', random.textColor);
    $("#score").html(score);
    switch(random.text) {
      case colors[0]:
        $('#color').html('Red');
        break;
      case colors[1]:
        $('#color').html('Pink');
        break;
      case colors[2]:
        $('#color').html('Purple');
        break;
      case colors[3]:
        $('#color').html('Blue');
        break;
      case colors[4]:
        $('#color').html('Green');
        break;
      case colors[5]:
        $('#color').html('Yellow');
        break;
      case colors[6]:
        $('#color').html('Orange');
        break;
      case colors[7]:
        $('#color').html('Brown');
        break;
      case colors[8]:
        $('#color').html('Grey');
        break;
    }
    console.log('Kolor tekstu: ' + random.textColor);
    console.log('Tekst: ' + random.text);
  }

  function play() {
    circle.set(1);
    $('#play').html('Play');
    $('#play').bind('click', function(){
      $('#play').css('cursor', 'default');
      score = 0;
      counter();
      circle.animate(-1, {
        duration: 4800
      }, function() {
        gameover();
      });

      setTimeout(function(){
        $('header div, #color').removeClass('hidden');
        $('#play').addClass('hidden');
        $('.rectangle').css('cursor','pointer');
        $('#score').html(score);
        randomGet();
        random = randomGet();
        checkColor();
      }, 2400);
      $('#play').unbind("click");
    });
}

  function checkColor() {
    filling();
    $('.rectangle').each(function(){ 
      $(this).bind('click', function(){
        var check = $(this).css('background-color');
        console.log('Clicked: ' + rgb2hex(check));
        if(random.text == rgb2hex(check)){
          score++;
          circle.set(0);
          levels();
          randomGet();
          random = randomGet();
          filling();
        } else {
          gameover();
        }
      });
    });
  }

  function counter() {
    $('#play').html('3');
    setTimeout(function(){
      $('#play').html('2');
    },1000)
    setTimeout(function(){
      $('#play').html('1');
    },1800)
  }


  function levels() {
      if(score <= 5 && score > 0)circle.animate(-1, {duration: 2400}, function() {gameover(); });
      if(score <= 10 && score > 5)circle.animate(-1, {duration: 2000}, function() {gameover(); });
      if(score <= 20 && score > 10)circle.animate(-1, {duration: 1800}, function() {gameover(); });
      if(score <= 30 && score > 20)circle.animate(-1, {duration: 1600}, function() {gameover(); });
      if(score <= 40 && score > 30)circle.animate(-1, {duration: 1400}, function() {gameover(); });
      if(score <= 50 && score > 40)circle.animate(-1, {duration: 1200}, function() {gameover(); });
      if(score <= 60 && score > 50)circle.animate(-1, {duration: 1000}, function() {gameover(); });
      if(score > 60)circle.animate(-1, {duration: 900}, function() {gameover(); });
  }

  function rgb2hex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }

  function gameover() {
    $('header div, #color, .circle').addClass('hidden');
    $('#gameover, #center-box').removeClass('hidden');
    $('.rectangle').unbind('click');
    $('#score-gameover').html(score);
    $('.rectangle').css('cursor','auto');
    $('#play-again').bind('click', function(){
      $('#gameover, #center-box').addClass('hidden');
      $('#play, .circle').removeClass('hidden');
      $('#play').css('cursor', 'pointer');
      $('#play-again').unbind("click");
      play();
    });
  }
});