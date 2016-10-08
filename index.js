$(document).ready(function()
{
	var step = 1;
	var bindkey;
	var rawlyrics;
	var errorMessage = "Please enter something.";
	var device;
	
	$("#infolink").click(function()
	{
		$("#info").slideToggle();
	});

	if ($("#header").css("font-size") == "96px")
	{
		$("i").addClass("medium");
		device = "desktop";
	}
	else
	{
		$("i").addClass("small");
		device = "mobile";
	}

	$(function() {
		$("form").submit(function() { return false; });
	});

	$('input').keypress(function(e){
		if(e.keyCode==13)
			$('.step').click();
	});

	$(".step").click(function()
	{
		if (step == 1)
		{
			if ($(".rawtext").val().length > 0)
			{	
				rawLyrics = $(".rawtext").val();
				console.log(rawLyrics.length);
				$(".temptext").html(rawLyrics);
				$(".temptext").trigger('autoresize');
				$(".row1").slideUp();
				$(".row2").slideDown();
				$(".row3").slideUp();
				$(".rightcol").slideDown();
				step++;
			}
			else {
				console.log("invalid");
				$(".rawtext").addClass("invalid");
				Materialize.toast(errorMessage, 3000);
			}
		}
		else if (step == 2)
		{
			if ($("#bindKey").val().length > 0)
			{
				bindKey = $("#bindKey").val();
				$(".temptext").html("<span style=\"color:yellow;\">bind " + bindKey + " \"nextLine\"</span>\r\n" + $(".temptext").html());
				$(".temptext").trigger('autoresize');
				$(".row1").slideUp();
				$(".row2").slideUp();
				$(".row3").slideDown();
				$(this).fadeOut();
				step++;
			}
			else {
				console.log("invalid");
				$("#bindKey").addClass("invalid");
				Materialize.toast(errorMessage, 3000);
			}
		}
	});

	$("#convertBtn").click(function()
	{
		var lines = rawLyrics.split("\n");
		var scriptedLyrics = "<span style=\"color:yellow;\">alias nextLine \"l0\"</span>";
		for (let i = 0; i < lines.length; i++)
		{
			scriptedLyrics += "\r\n<span style=\"color:yellow;\">alias l" + i + " \"say </span>" + lines[i] + "<span style=\"color:yellow;\">;alias nextLine l" + (i + 1) + "\"</span>";
		}
		$(".temptext").html("<span style=\"color:yellow;\">bind " + bindKey + " \"nextLine\"</span>\r\n" + scriptedLyrics);
		
		
		setTimeout(function()
		{
			$(".leftcol").slideUp(400, function()
			{
				$(".rightcol").removeClass("offset-l1");
				$(".rightcol").removeClass("hide-on-med-and-down");
				$("#temptextTitle").text("Result");
			});
		});
	});
});