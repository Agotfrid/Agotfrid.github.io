
/*
 * Removes spaces from a string value.
 */
function trim(str) {
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g, "");
}

/**
 * 
 * @param {*} textInput A text input
 */
function formFieldHasInput(textInput) {
	// Check if the text field has a value
	if (textInput.value == null || trim(textInput.value) == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {

	hideErrors();

	if (formHasErrors()) {
		e.preventDefault();
		return false;
	}

}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear order?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("qty1").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
	var errorFlag = false;

	var requiredTextFields = [
		"fullname",
		"address",
		"city",
		"province",
		"postal",
		"email"];


	// checks if the fields from the array have been filled
	for (var i = 0; i < requiredTextFields.length; i++) {
		var textField = document.getElementById(requiredTextFields[i]);
		if (!formFieldHasInput(textField)) {
			document.getElementById(requiredTextFields[i] + "_error").style.display = "block";

			if (!errorFlag) {
				textField.focus();
				textField.select();
			}
			// raise the error
			errorFlag = true;
		}
	}

	//create expression for email
	var regex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i); // Reference: Tyler Quick
	var emailFieldValue = document.getElementById("email").value;

	if (!regex.test(emailFieldValue)) {
		document.getElementById("emailformat_error").style.display = "block";
		if (!errorFlag) {
			textField.focus();
			textField.select();
		}
		// raise the error
		errorFlag = true;
	}

	//create expression for postal code
	regex = new RegExp(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i);
	var postalFieldValue = document.getElementById("postal").value;

	if (!regex.test(postalFieldValue)) {
		document.getElementById("postalformat_error").style.display = "block";
		if (!errorFlag) {
			textField.focus();
			textField.select();
		}
		// raise the error
		errorFlag = true;
	}


	return errorFlag;
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {

	let shippingError = document.getElementsByClassName("shippingError");
	for (let i = 0; i < shippingError.length; i++) {
		shippingError[i].setAttribute("style", "display: none");
    }
}

/*
 * Handles the load event of the document.
 */
function load() {
	hideErrors();
	//	Populate the year select with up to date values
	// let year = document.getElementById("year");
	// let currentDate = new Date();
	// for (let i = 0; i < 7; i++) {
	// 	let newYearOption = document.createElement("option");
	// 	newYearOption.value = currentDate.getFullYear() + i;
	// 	newYearOption.innerHTML = currentDate.getFullYear() + i;
	// 	year.appendChild(newYearOption);
	// }

	submit.addEventListener("click", validate);
	clear.addEventListener("click", resetForm);


}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);












