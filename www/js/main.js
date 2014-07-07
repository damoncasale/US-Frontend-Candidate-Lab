$(document).ready(function() {
	$( "#signup_dialog" ).dialog({
		autoOpen: false,
	  buttons: [
	    {
	      text: "Signup",
	      click: function() {
	      	$(this).find("form").find("input[type='submit']").trigger("click");
	      }
	    },
	    {
	      text: "Cancel",
	      click: function() {
	        $( this ).dialog( "close" );
	      }
	    }
	  ]
	});
	$( "#refuse_dialog" ).dialog({
		autoOpen: false,
	  buttons: [
	    {
	      text: "OK",
	      click: function() {
	        $( this ).dialog( "close" );
	      }
	    }
	  ]
	});
	$("#invitation a[href='#yes']").bind("click", function(e) {
		e.preventDefault();
		$( "#signup_dialog" ).dialog( "open" );
		return false;
	});
	$("#invitation a[href='#no']").bind("click", function(e) {
		e.preventDefault();
		$( "#refuse_dialog" ).dialog( "open" );
		return false;
	});
});

var login_validator = $("#signup_dialog form").validate({
	focusInvalid: false,
	errorClass: 'error',
	highlight: function (element, errorClass, validClass) {
		jQuery(element)
			.addClass(errorClass)
			.removeClass(validClass)
			.closest('.field')
			.addClass('has-error')
			.removeClass('has-success');
	},
	unhighlight: function (element, errorClass, validClass) {
		jQuery(element)
			.addClass(validClass)
			.removeClass(errorClass)
			.closest('.field')
			.addClass('has-success')
			.removeClass('has-error');
	},
	submitHandler: function(frm) {
		var fields = jQuery(frm).find("input")
			.not("[type='hidden'],[type='submit']")
			.serializeArray();
		var data = {};
		var fieldname;
		jQuery.each(fields, function(index, node) {
			if ("[]" == node.name.substr(node.name.length-2,2))
			{
				fieldname = node.name.substr(0, node.name.length-2);
				if ("undefined" == typeof data[fieldname])
					data[fieldname] = [node.value];
				else
					data[fieldname].push(node.value);
			}
			else
				data[node.name] = node.value;
		});
		console.log(data);
		$.ajax({
			type: "POST",
			url: "signup.php",
			data: data,
			cache: false
		}).done(function(response) {
			if (response.success)
			{
        $( "#signup_dialog" ).dialog( "close" );
				alert("You're all set!");
			}
			else
				login_validator.showErrors(response.messages);
		});
	}
});
