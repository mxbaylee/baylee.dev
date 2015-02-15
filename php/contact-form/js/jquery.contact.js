/*global jQuery, document*/
/* ==========================================================================
Document Ready Function
========================================================================== */
jQuery(document).ready(function () {

    'use strict';

    var emailReg, successmessage, failedmessage, username, useremail, usersubject, usermessage, isvalid, url;

    jQuery('#contactform').submit(
		function nestocontact() {

            emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            successmessage = "Thank you " + jQuery('#contact-name').val() + ", we will contact you shortly.";
            failedmessage = "There was a problem, please try again";
            username = jQuery('#contact-name');
            useremail = jQuery('#contact-email');
            usersubject = jQuery('#contact-subject');
            usermessage = jQuery('#contact-message');
            isvalid = 1;
            url = "php/contact-form/php/contact.php";

            if (username.val() === "") {
                jQuery('#ResponseModal-title').html('Contact Us');
                jQuery('#contact-name').addClass('form-error');
                jQuery('#ResponseModal').modal('show');
                jQuery('#ResponseModalLabel').html('<i class="glyphicon glyphicon-remove-circle nesto_error"></i>');
                jQuery('.nesto-response').html('Your name is required');
				return false;
			}

            if (useremail.val() === "") {
                jQuery('#ResponseModal-title').html('Contact Us');
                jQuery('#contact-email').addClass('form-error');
                jQuery('#ResponseModal').modal('show');
                jQuery('#ResponseModalLabel').html('<i class="glyphicon glyphicon-remove-circle nesto_error"></i>');
                jQuery('.nesto-response').html('Your email address is required');
                return false;
			}
            var valid = emailReg.test(useremail.val());
            if (!valid) {
                jQuery('#ResponseModal-title').html('Contact Us');
                jQuery('#contact-email').addClass('form-error');
                jQuery('#ResponseModal').modal('show');
                jQuery('#ResponseModalLabel').html('<i class="glyphicon glyphicon-remove-circle nesto_error"></i>');
                jQuery('.nesto-response').html('Please enter a valid email address');
                jQuery('input[type=submit]', jQuery("#contactform")).removeAttr('disabled');
                return false;
			}

            if (usersubject.val() === "") {
                jQuery('#ResponseModal-title').html('Contact Us');
                jQuery('#contact-subject').addClass('form-error');
                jQuery('#ResponseModal').modal('show');
                jQuery('#ResponseModalLabel').html('<i class="glyphicon glyphicon-remove-circle nesto_error"></i>');
                jQuery('.nesto-response').html('Your subject is required');
				return false;
			}

            if (usermessage.val() === "") {
                jQuery('#ResponseModal-title').html('Contact Us');
                jQuery('#contact-message').addClass('form-error');
                jQuery('#ResponseModal').modal('show');
                jQuery('#ResponseModalLabel').html('<i class="glyphicon glyphicon-remove-circle nesto_error"></i>');
                jQuery('.nesto-response').html('Your message is required');
				return false;
			}


            jQuery.post(url, { username: username.val(), useremail: useremail.val(), usersubject: usersubject.val(), usermessage: usermessage.val(), isvalid: isvalid }, function (data) {

                if (data === 'success') {
                    jQuery('#ResponseModal-title').html('Contact Us');
                    jQuery('#ResponseModal').modal('show');
                    jQuery('#ResponseModalLabel').html('<i class="glyphicon glyphicon-ok-circle nesto_success"></i>');
                    jQuery('.nesto-response').html(successmessage);
                    jQuery('#contact-name').val('');
                    jQuery('#contact-email').val('');
                    jQuery('#contact-subject').val('');
                    jQuery('#contact-message').val('');
				} else {
                    jQuery('#ResponseModal').modal('show');
                    jQuery('#ResponseModalLabel').html('<i class="glyphicon glyphicon-ok-circle nesto_error"></i>');
                    jQuery('.nesto-response').html(failedmessage);
                    return false;
				}

			});


		}

	);

    jQuery('#contact-name').focus(function () {
        jQuery('#contact-name').removeClass('form-error');
        jQuery('.form-message').html('');

    });
    jQuery('#contact-email').focus(function () {
        jQuery('#contact-email').removeClass('form-error');
        jQuery('.form-message').html('');
    });
    jQuery('#contact-subject').focus(function () {
        jQuery('#contact-subject').removeClass('form-error');
        jQuery('.form-message').html('');
    });
    jQuery('#contact-message').focus(function () {
        jQuery('#contact-message').removeClass('form-error');
        jQuery('.form-message').html('');
    });

});