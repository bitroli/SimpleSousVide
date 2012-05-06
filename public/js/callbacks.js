// Two relevant events: mousedown, mouseup

stop_condition = -1;

function increment(txt)
{
  clearInterval(stop_condition);
  var v = Number($('#'+txt).attr('value'));
  up_iteration = 0;
  stop_condition = setInterval( function(){
    if(up_iteration < 4){
      v += 0.5;
      $('#'+txt).attr('value', v);
      up_iteration +=1;
    }
    else{
      v += 1;
      $('#'+txt).attr('value', v);
      up_iteration +=1;
    }
  }, 500);
}

function decrement(txt)
{
  clearInterval(stop_condition);
  var v = Number($('#'+txt).attr('value'));
  up_iteration = 0;
  stop_condition = setInterval( function(){
    if(up_iteration < 4){
      v -= 0.5;
      $('#'+txt).attr('value', v);
      up_iteration +=1;
    }
    else{
      v -= 1;
      $('#'+txt).attr('value', v);
      up_iteration +=1;
    }
  }, 500);
}

$(document).ready( function(){



$('#setter-up-arrow').on('mousedown', function() { increment("setter-input");     } );
$('#setter-up-arrow').on('mouseup',   function() { clearInterval(stop_condition); } );
$('#setter-up-arrow').on('click',     function() { v = Number($('#setter-input').attr('value')) + 0.5 ; $('#setter-input').val(v); } );


$('#setter-down-arrow').on('mousedown', function() { decrement("setter-input");     } );
$('#setter-down-arrow').on('mouseup',   function() { clearInterval(stop_condition); } );
$('#setter-down-arrow').on('click', function() { newVal = Number($('#setter-input').attr('value')) - 0.5 ; $('#setter-input').attr('value',newVal);} );

$('#setter-ok-button').on('click', function() {
      $.ajax({
      dataType: 'json',
      type: 'PUT',
      url: '/setTemperature/'+$('#setter-input').val()

    }).success(function() {
    });


});


});
