$(document).ready(function()
{
	var step = 1;
	var bindkey;
	var rawlyrics;
	var errorMessage = "Please enter something.";
	var device;
	var scriptedLyrics;
	var rawScriptedLyrics;
	var loop;
	
	$("#infolink").click(function()
	{
		$("#info").slideToggle();
	});

	if ($("#header").css("font-size") == "96px")
	{
		$("i").addClass("medium");
		device = "desktop";
		$("#bottom").remove();
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
				$(".temptext").html(rawLyrics);
				$(".temptext").trigger('autoresize');
				rawScriptedLyrics = rawLyrics;
				$(".row1").slideUp();
				$(".row2").slideDown();
				$(".row3").slideUp();
				$(".rightcol").slideDown();
				step++;
			}
			else {
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
				$("#bindKey").addClass("invalid");
				Materialize.toast(errorMessage, 3000);
			}
		}
	});

	$("#convertBtn").click(function()
	{
		var lines = rawLyrics.split("\n");
		for (var i = 0; i < lines.length; i++)
		{
			if (lines[i].length <= 0)
			{
				lines.splice(i, 1);
			}
		}
		scriptedLyrics = "<span style=\"color:yellow;\">alias nextLine \"l0\"</span>";
		scriptedLyrics += "\r\n<span style=\"color:yellow;\">bind " + bindKey + " \"nextLine\"</span>";
		rawScriptedLyrics = "alias nextLine \"l0\"";
		rawScriptedLyrics += "\r\nbind " + bindKey + " \"nextLine\"";
		loop = $("#loopbox").is(":checked");
		for (let i = 0; i < lines.length; i++)
		{
			if (i == lines.length - 1) // IF LAST LINE
			{
				if(loop)
				{
					scriptedLyrics += "\r\n<span style=\"color:yellow;\">alias l" + i + " \"say </span>" + lines[i] + "<span style=\"color:yellow;\">;alias nextLine l0\"</span>";
					rawScriptedLyrics += "\r\nalias l" + i + " \"say " + lines[i] + ";alias nextLine l0\"";
				}
				else {
					scriptedLyrics += "\r\n<span style=\"color:yellow;\">alias l" + i + " \"say </span>" + lines[i] + "\"";
					rawScriptedLyrics += "\r\nalias l" + i + " \"say " + lines[i] + "\"";
				}
				break;
			}
			scriptedLyrics += "\r\n<span style=\"color:yellow;\">alias l" + i + " \"say </span>" + lines[i] + "<span style=\"color:yellow;\">;alias nextLine l" + (i + 1) + "\"</span>";
			rawScriptedLyrics += "\r\nalias l" + i + " \"say " + lines[i] + ";alias nextLine l" + (i + 1) + "\"";

		}
		$(".temptext").html(scriptedLyrics);
		
		$(".leftcol").slideUp(400, function()
		{
			$(".rightcol").removeClass("offset-l1");
			$(".rightcol").removeClass("hide-on-med-and-down");
			$("#temptextTitle").text("Result");
			$(".saveBtn").fadeIn();
		});
		
	});
	$(".saveBtn").click(function()
	{
		var file = new File([rawScriptedLyrics], "lyrics.cfg");
		saveAs(file);
		$("#finalInst").show();
	});
});