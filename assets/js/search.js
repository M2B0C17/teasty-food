//Activacion del select 
$(document).ready(function() {
    $('select').material_select();
  });

var cont = 1;
var comp = 1;
var fav = 1;
var favoritoRest = JSON.parse(localStorage.getItem("favoritoRestaurant"));
	if(favoritoRest == null){
		favoritoRest = [];
	}

$('.selectStyles').on('change', function() {
	var cityCode = this.value;
	$(".search-rest").empty();
	$.ajax({
		url: 'https://developers.zomato.com/api/v2.1/search?entity_id='+cityCode+'&entity_type=city&count=15',
		type: 'GET',
		dataType: 'json',
		headers: {'user-key' : '68caa26ae70ec571a32d410254a6c631'}
		
	})
	.done(function(val) {
		console.log("success");
		tasty(val);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

	function tasty(val){
		var arr = val.restaurants;
		console.log(arr);
		arr.forEach(function(rest){
			var nameRest = rest.restaurant.name;
			var comunaRest = rest.restaurant.location.locality;
			var direcRest = rest.restaurant.location.address;
			var ratingRest = rest.restaurant.user_rating.aggregate_rating;
			var costRest = rest.restaurant.average_cost_for_two;
			var imgRest = rest.restaurant.featured_image;
			
			var tarjeta = $("<div>").attr('class', 'tarjeta col s4');
				tarjeta.attr('id', 'rest-'+ cont);

			if(imgRest == ""){
				var iamgen = $("<img>").attr('src','dist/img/Blurry-Restaurant2.jpg' );
					iamgen.attr('class', 'imgblurry');
			}else{
				var iamgen = $("<img>").attr('src',imgRest );
			}
			
			var infoTarje = $("<div>").attr('class', 'info-tarjeta');
			var nombretarje = $("<p>").text(nameRest);
			var comunaTarje = $("<p>").text(comunaRest);

			infoTarje.append(nombretarje);
			infoTarje.append(comunaTarje);
			tarjeta.append(iamgen);
			tarjeta.append(infoTarje);

			$(".search-rest").append(tarjeta);
			
			$( "#rest-"+cont ).click(function() {
				if( comp % 2 != 0 ){
					$("footer").empty();
					var tarjFooter = $("<div>").attr('class', 'tarjeta-footer col s12');
					var nombreFooter = $("<h5>").text(nameRest);
					var infoFooter = $("<div>").attr('class', 'info-footer');
					var favFotter = $('<i class="fa fa-heart" aria-hidden="true" id="fav'+fav+'"></i>')
					infoFooter.append('<p>'+direcRest+'</p>'+'<p>'+costRest+'</p>'+'<p>'+ratingRest+'</p>')
	  				tarjFooter.append(nombreFooter);
	  				tarjFooter.append(infoFooter);
	  				tarjFooter.append(favFotter);
	  				$("footer").append(tarjFooter);
	  				$( "#fav"+fav ).click(function() {
						if( favoritoRest.indexOf(rest.restaurant.name) == -1){
							favoritoRest.push(rest.restaurant.name);
							localStorage.setItem("favoritoRestaurant", JSON.stringify(favoritoRest));
							var storedFavorites = JSON.parse(localStorage.getItem("favoritoRestaurant"));
							$(this).css('color', 'red');
							console.log(storedFavorites);
						}
						else if( favoritoRest.indexOf(rest.restaurant.name) != -1){
							
							favoritoRest.splice(favoritoRest.indexOf(rest.restaurant.name),1);
							localStorage.setItem("favoritoRestaurant", JSON.stringify(favoritoRest));
							var storedFavorites = JSON.parse(localStorage.getItem("favoritoRestaurant"));
							$(this).css('color', 'black');
							console.log(storedFavorites);
						}
					});
	  				comp++;
	  				fav++;
				}else{
					var tarjFooter = $("<div>").attr('class', 'tarjeta-footer');
					var nombreFooter = $("<h5>").text(nameRest);
					var infoFooter = $("<div>").attr('class', 'info-footer');
					var favFotter = $('<div id="fav'+fav+'"><i class="fa fa-heart" aria-hidden="true"></i></div>')
					infoFooter.append('<p>'+direcRest+'</p>'+'<p>'+costRest+'</p>'+'<p>'+ratingRest+'</p>')
	  				tarjFooter.append(nombreFooter);
	  				tarjFooter.append(infoFooter);
	  				tarjFooter.append(favFotter);

	  				$(".tarjeta-footer").attr('class', 'col s6');
	  				$("footer").append(tarjFooter);
	  				$( "#fav"+fav ).click(function() {
						if( favoritoRest.indexOf(rest.restaurant.name) == -1){
							favoritoRest.push(rest.restaurant.name);
							localStorage.setItem("favoritoRestaurant", JSON.stringify(favoritoRest));
							var storedFavorites = JSON.parse(localStorage.getItem("favoritoRestaurant"));
							$(this).css('color', 'red');
							console.log(storedFavorites);
						}
						else if( favoritoRest.indexOf(rest.restaurant.name) != -1){
							
							favoritoRest.splice(favoritoRest.indexOf(rest.restaurant.name),1);
							localStorage.setItem("favoritoRestaurant", JSON.stringify(favoritoRest));
							var storedFavorites = JSON.parse(localStorage.getItem("favoritoRestaurant"));
							$(this).css('color', 'black');
							console.log(storedFavorites);
						}
					});
	  				comp++;
	  				fav++;
				}
			});

			cont++;
			
		});
	}
});