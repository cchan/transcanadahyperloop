$(function(){
	//https://stackoverflow.com/questions/19700020/change-progress-bar-value-based-on-scrolling
	$(window).scroll(function () {
		$(".headered").each(function(){
			var s = $(window).scrollTop() - $(this).offset().top + $(this).width()*0.3 - $(this).find(".progbar1 img").width()/2 + 2;
			//s += s*s*s/6000;
			
			$(this).find(".progbar1 img").css('margin-left', s);
			$(this).find(".progbar2 img").css('margin-left', s-$(window).width()/3.33);
			
			if(s > 365)$(this).find(".sectionheader").css("color","#00adef");
			else $(this).find(".sectionheader").css("color","#ff6a00");
		});
		updateNav();
	});
	function updateNav(){
		var totalHeight = $(".headered").last().offset().top - $(".headered").first().offset().top;
		var navHeight = $(window).height()/3;
		
		$("#nav-slider").height($(window).scrollTop() * (navHeight) / (totalHeight));
		$("nav a").each(function(){
			$(this).css("top",$($(this).attr("href")).offset().top * navHeight / totalHeight);
		});
		$("section").each(function(){
			if($(window).scrollTop() > $(this).offset().top - 5 * totalHeight / navHeight)
				$("nav a[href=#"+this.id+"]").addClass("active");
			else
				$("nav a[href=#"+this.id+"]").removeClass("active");
		});
	}
	updateNav();

	//Smooth scrolling.
	//Adapted from //http://www.paulund.co.uk/smooth-scroll-to-internal-links-with-jquery
	$(document).ready(function(){
		$('a[href^="#"]').on('click',function (e) {
			e.preventDefault();

			var target = this.hash;
			var $target = $(target);

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, 900, 'swing', function () {
				window.location.hash = target;
			});
		});
	});
	
	//Clubfair-style form
	var lockColor = false;
	var hovering = false;
	function rewidth(){$("#submitbtn").width($("#submitbtn span").width());}
	$("#submitbtn").mouseenter(function(){hovering = true;if(!lockColor)$(this).css({"background-color":"white","color":"black"});});
	$("#submitbtn").mouseleave(function(){hovering = false;if(!lockColor)$(this).css({"background-color":"black","color":"white"});});
	$("#ss-form").on("submit", function () {
		$("#submitbtn span").text("Sending response...");
		$("#submitbtn").css({"background-color":"red","color":"white"});
		rewidth();
		lockColor=true;
		$("#hiddenFrame").load(function(){
			//$("#ss-form").trigger("reset");
			$("#submitbtn span").html("Sent! Thanks for your interest; we'll be getting back to you soon.");
			$("#submitbtn").css("background-color","green");
			rewidth();
			setTimeout(function(){
				$("#submitbtn span").text("Submit");
				$("#submitbtn").css("background-color","black");
				rewidth();
				lockColor=false;
				if(hovering)
					$("#submitbtn").mouseenter();
			},5000);
		});
    });
});
