$(document).on('ready', function(){
  console.log('sanity check!');
});

$('form').on('submit', function(e){
  e.preventDefault();
  var $superHeroName = $('#superhero-name');
  console.log($superHeroName.val());

  $.post('/api/superheros', {}, function(data){
    $('.result').html(data);
  });
});
