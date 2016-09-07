angular.module('dziws')
	.directive('dziSocial', function() {
		return {
			restrict : 'E',
			scope : {
				articleId : "@"
			},
			link : function(scope, element, attrs) {
				var messages = scope.$root.messages;
				var shareLink = encodeURIComponent(messages.social_url);
				if (scope.articleId) {
					shareLink += '/article?id=' + scope.articleId;
				}
				var shareMsg = encodeURIComponent(messages.social_description);
				var logo = encodeURIComponent(messages.social_logo);
				var twitMsg = encodeURIComponent(messages.social_twitter);
				var linkedInMsg = encodeURIComponent(messages.social_linkedIn);
				
				var html = element.html().format({
								'shareLink': shareLink,
								'shareMsg': shareMsg,
								'logo': logo,
								'twitMsg': twitMsg,
								'linkedInMsg': linkedInMsg
								});
				element.html(html);
			},
			template : "<a href='https://www.facebook.com/sharer/sharer.php?u={shareLink}&amp;src=sdkpreparse' target='_blank'>" +
					   "	<i class='fa fa-facebook'></i>" +
					   "</a>" +
					   "<a href='https://twitter.com/intent/tweet?text={twitMsg}&tw_p=tweetbutton&url={shareLink}' class='fa fa-twitter' data-show-count='false'>" +
					   "</a>" +
					   "<a href='https://plusone.google.com/_/+1/confirm?hl=en&url={shareLink}' target='_blank'>" +
					   "	<i class='fa fa-google-plus'></i>" +
					   "</a>" +
					   "<a href='https://www.linkedin.com/shareArticle?mini=true&url={shareLink}&title={linkedInMsg}&source=Datzinfo%20Inc' target='_blank'>" +
					   "	<i class='fa fa-linkedin'></i>" +
					   "</a>" +
					   "<a href='http://pinterest.com/pin/create/button/?url={shareLink}&media={logo}&description={shareMsg}' class='pin-it-button' count-layout='horizontal' target='_blank'>" +
					   "	<i class='fa fa-pinterest'></i>" +
					   "</a>"
		};
});