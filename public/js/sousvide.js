$(document).ready( function(){

    $('.settings-title').on('click', function() {
        $('.settings').toggleClass('active');
    })

    $('.setter input').val('101.5')


    var saved = null;

    $('.setter input').on('click', function() {
        if (!$(this).val() == ''){
            saved = $(this).val();
            $(this).val('');
        }
    });

    $('.setter input').on('blur', function() {
        if (saved){
            if ($(this).val() == ''){
                $(this).val(saved)
            }
        }
    });


	setInterval(function() {
/*		var x = Math.floor((10) * Math.random() + 90) */
    /*var x = 0;*/
    $.getJSON('/readTemperature', function(data) {
    var x = data['temperature'];
    $("#target-temp span").html(data['target']);

    var y = $("#current-temp").html();
    $("#current-temp").html("<span>"+x+"</span>");
//    $("#current-temp").addClass("temp-display");
		$(".number-list ul li").last().remove();
		$(".number-list ul li:eq(0)").before('<li>'+y+'</li>');
		var series = $(".number-list ul li");
		alpha_factor = 0;
		series.remove();
		series.each(function() {
			opacity = parseFloat(1-(alpha_factor*(1.0/series.length)));
			$(".number-list ul").append('<li style="opacity:'+opacity+';">'+$(this).text()+'</li>');
			alpha_factor++;
/*			if ($(this).prev()){
				$(this).html($(this).prev());
			}
			else{
				$(this).html($(".temp-display span"));
			}*/
		});
    });
		}, 3000);



    $('body').css('display', 'block');
});

$(document).on('click', '.setter-input', function(event) {
  if (event.which == 13) {
    event.preventDefault();
    $.ajax({
      dataType: 'json',
      type: 'PUT',
      url: '/setTemperature/'+$('.setter-input').val()

    }).success(function() {
        alert('Done');
    });
  }  
});
