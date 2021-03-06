const token = JSON.parse(localStorage.getItem('tpAuth'));
console.log(token);
if (!token) {
	location.href = '/';
}
(function () {
	'use strict';
	const response = JSON.parse(atob(token.token.split('.')[1]));
	console.log(response.userTypeId);
	// Redirecting
	if (response.userTypeId == null) {
		// Redirect to employer profile creation page
		window.location.href = '/employer-type';
	} else {
		if (response.verificationStatus == 'Approved') {
			return (window.location.href = '/employer-dashboard');
		} else if (response.verificationStatus == 'Disapproved') {
			return (window.location.href = '/upload-doc-failure');
		} else if (response.verificationStatus == 'Uploaded') {
			return (window.location.href = '/upload-doc-upload-doc-success');
		}
	}
})();
