$(function(){
	//https://stackoverflow.com/questions/19700020/change-progress-bar-value-based-on-scrolling
	$(window).scroll(function () {
		$(".headered").each(function(){
			var s = $(window).scrollTop() - $(this).offset().top + $(this).width()*0.3 - $(this).find(".progbar1 img").width()/2 + 2;
			//s += s*s*s/6000;
			
			$(this).find(".progbar1 img").css('margin-left', s);
			$(this).find(".progbar2 img").css('margin-left', s-$(window).width()/3.33);
			
			if(s > 365)$(this).find(".sectionheader").addClass("darkblue").removeClass("lightblue");
			else $(this).find(".sectionheader").addClass("lightblue").removeClass("darkblue");
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
				$("nav a[href=\"#"+this.id+"\"]").addClass("active");
			else
				$("nav a[href=\"#"+this.id+"\"]").removeClass("active");
		});
	}

	//Smooth scrolling.
	//Adapted from //http://www.paulund.co.uk/smooth-scroll-to-internal-links-with-jquery
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
	
	//Clubfair-style form
	var lockColor = false;
	var hovering = false;
	function rewidth(){$("#submitbtn").width($("#submitbtn span").width());}
	$("#submitbtn").mouseenter(function(){hovering = true;if(!lockColor)$(this).css({"background-color":"black","color":"white"});});
	$("#submitbtn").mouseleave(function(){hovering = false;if(!lockColor)$(this).css({"background-color":"white","color":"black"});});
	$("#ss-form").on("submit", function () {
		$("#submitbtn span").text("Sending response...");
		$("#submitbtn").css({"background-color":"red","color":"white"});
		rewidth();
		lockColor=true;
		$("#hiddenFrame").on("load", function(){
			$("#submitbtn span").html("Thanks! We'll get back to you soon. Click to submit another response.");
			$("#submitbtn").css("background-color","green");
			$("#submitbtn").on("click.resubmit", function(e){
				$("#submitbtn span").text("Submit");
				$("#submitbtn").css("background-color","black");
				rewidth();
				lockColor=false;
				if(hovering) $("#submitbtn").mouseenter();
				$("#ss-form .resettable").val("");
				$("#ss-form input").get(0).focus();
				e.preventDefault();
				$("#submitbtn").off("click.resubmit");
			});
			rewidth();
		});
    });
	
	updateNav();
	setInterval(updateNav,1000);
	$(window).scroll();
});
