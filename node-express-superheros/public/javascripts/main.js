$(document).on('ready', function(){
  listHeros();
  $('#edit-form').hide();
});

$('form').on('submit', function(e){
  e.preventDefault();
  // form inputs
  var $superHeroName = $('#superhero-name').val();
  var $superHeroAbility = $('#superhero-ability').val();
  var $superHeroNemesis = $('#superhero-nemesis').val();
  // creating payload
  var payload = {
    name: $superHeroName,
    ability: $superHeroAbility,
    nemesis: $superHeroNemesis
  };

  $.post('/api/superheros', payload, function(data) {
    $( "#results" ).html(data.message);
    $( "#all" ).html("");
    $(':input', 'form').val('');
    listHeros();
  });
});

$(document).on('click', '.delete-button', function(){

  $.ajax({
    method: "DELETE",
    url: '/api/superhero/'+$(this).attr('id')
  }).done(function(data) {
    $("#all").html("");
    $( "#results" ).html('Success!');
    listHeros();
  });

});

$(document).on('click', '.edit-button', function(){

  $.get('/api/superhero/'+$(this).attr('id'), function(data){
    $('#edit-name').val(data.name);
    $('#edit-ability').val(data.ability);
    $('#edit-nemesis').val(data.nemesis);
    $('.update-button').attr('id', data._id);
  });
  $('#edit-form').show();
  $('#super-hero-table').hide();

});

$(document).on('click', '.update-button', function(e){
  e.preventDefault();
  // form inputs
  var $updatedSuperHeroName = $('#edit-name').val();
  var $updatedsuperHeroAbility = $('#edit-ability').val();
  var $updatedsuperHeroNemesis = $('#edit-nemesis').val();
  // creating payload
  var payload = {
    name: $updatedSuperHeroName,
    ability: $updatedsuperHeroAbility,
    nemesis: $updatedsuperHeroNemesis
  };

  $.ajax({
    method: "PUT",
    url: '/api/superhero/'+$(this).attr('id'),
    data: payload
  }).done(function(data) {
    $("#all").html("");
    listHeros();
    $('#edit-form').hide();
    $('#super-hero-table').show();
  });


});

$(document).on('click', '#cancel-edit', function(e) {
  e.preventDefault();
  $('#edit-form').hide();
  $('#super-hero-table').show();
});

//helper function
function listHeros(){
  $.get('/api/superheros', function(data){
    for (var i = 0; i < data.length; i++) {
      $('#all').prepend(
        '<tr>'+
          '<td><a href="#">'+data[i].name+'</a></td>'+
          '<td>'+data[i].ability+'</td>'+
          '<td>'+data[i].nemesis+'</td>'+
          '<td><a class="btn btn-danger btn-xs delete-button" id="'+data[i]._id+'" role="button">Delete</a>'+
          '&nbsp;<a class="btn btn-primary btn-xs edit-button" id="'+data[i]._id+'" role="button">Edit</a></td>'+
          '</tr>'
      );
    }
  });
}
