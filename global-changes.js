$(document).ready(function(){
	
	//header and footer links
	$('.menu-link').click(function(){
		$('.active').removeClass('active');
		$(this).addClass('active');
		
		//if click was made in top nav, identical footer link will also go active and vise versa
		var linkVal = $(this).text();
		$('.menu-link').each(function(){
			if($(this).text() == linkVal){
				$(this).addClass('active');
			}
		});
	});
	
	//mobile links
	$('#mobile-menu-img').click(function () {
		$('#mobile-links').fadeIn(250);
		$('#login-btn').css('top', '196px');
	});

	$(document).mouseup(function (e) {
		if (!$('#mobile-links').is(e.target) && $('#mobile-links').is(':visible')){
			$('#mobile-links').toggle();
			$('#login-btn').css('top', '28px');
			}
	});
	
	//new and archive tabs
	$('.tab').click(function(){
		var tabID = $(this).attr('data-tab');

		$('.tab').removeClass('chosen');
		$('.tab-content').removeClass('chosen');

		$(this).addClass('chosen');
		$('#'+tabID).addClass('chosen');
	});
	
	
	//builds json table
	 $.getJSON('https://api.myjson.com/bins/6c1wq', function(data) {		 
		var table='<tbody>';
		//add tbody to rates-table
		$.each( data, function( index, item){
		table+="<tr class='rate-row'><td>"+item.name+"</td><td class='percent'>"+item.apy+"</td><td class='earnings'>"+item.earnings.toFixed(2)+"</td></tr>";       
		});
		table+='</tbody>';
      $("#rates-table").append(table);		
	});
	
	//fire sort table function once json data populates table
	setTimeout(sortTable, 500);
	
	
	////////login modal stuff/////
	
	//open pop up and dim page
	$('#login-btn').click(function(){
		$('#login-pop').fadeIn(250);
		$('body').append('<div id="page-fade"></div>');
		$('#page-fade').fadeIn(250);
		$('body').css('overflow', 'hidden');
	});
	
	
	//close pop up
	$('#login-pop').find('img').click(function(){
		$('#login-pop').toggle();
		$('#page-fade').toggle();
		$('body').css('overflow-y', 'scroll');
	});

});

// sort table rows based on earnings
function sortTable(){
	 
	var rows = $('.rate-row').get();

	rows.sort(function(a, b) {

		var e1 = $(a).children('td').eq(2).text();
		var e2 = $(b).children('td').eq(2).text();

		var E1 = parseInt(e1);
		var E2 = parseInt(e2);
		
		if(E1 < E2) {
			return 1;
		}
		if(E1 > E2) {
			return -1;
		}
		return 0;
	});

	$.each(rows, function(index, row) {
    
		$('#rates-table').children('tbody').append(row);
		
	});
}