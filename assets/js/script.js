$(document).on('ready', function() {

	// YOUTUBE_KEY will be included via gulp (key.js file will be included - not uploaded)

	const VIDEO_AMOUNT = 4;
	const CHANNEL_CLASSES = 'channel col-6-l col-6-m col-12-s';
	const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId={0}&order=date&key={1}&maxResults={2}';
	const ESCAPE_ENTITY_MAP = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'};

	const CORS_FIXER_URL = 'https://cors-anywhere.herokuapp.com/';
	const YOUTUBE_RSS_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id={0}';
	const YOUTUBE_RSS_CORS_URL = CORS_FIXER_URL.concat(YOUTUBE_RSS_URL);

	let USING_RSS = false;

	let channels = [
		'UCBR8-60-B28hp2BmDPdntcQ', // YouTube
		'UCkRfArvrzheW2E7b6SVT7vQ', // YouTube Creators
		'UCMDQxm7cUx3yXkfeHa5zJIQ', // YouTube Help
		'UCEN58iXQg82TXgsDCjWqIkg', // YouTube Advertisers
		'UCK8sQmJBp8GCxrOtXWBpyEA' // Google
	];

	init();

	/**
	*	Initializing the application.
	*/
	function init() {
		// Auto focus on search field
		$(".search__input").focus();

		// Load the channel order array
		// TODO function
		let order = (localStorage.getItem('order')) ? JSON.parse(localStorage.getItem('order')) : undefined;
		if(order) {
			channels = order;
		}

		// Load the channels
		loadChannels();
	}
	
	/**
	* 	Calls the YouTube API to fill the channels.
	*/
	function loadChannels() {
		let channelCache;
		let channelName;

		// Get use of RSS from cache
		let tempRssUsage = localStorage.getItem('rss-use');
		USING_RSS = (tempRssUsage === 'true');

		changeFetchIcon();
		
		channels.forEach(function(channel) {
			let channelElement = $('.channel[data-id="' + channel + '"]');
			if(channelElement.length) {
				channelElement.remove();
			}

			$('.channels').append(addInnerChannel(channel));
		});

		$('.channels').sortable({
			handle: '.drag-button',
			tolerance: 'pointer',
			accept: '.channel:not(.channel__search)',
			start: function(event, ui) {
				ui.item.data('data-order', ui.item.index());
			},
			stop: function(event, ui) {
				const start_pos = ui.item.data('data-order');
				if (start_pos !== ui.item.index()) {
					let order = [];

					$('.channels').find('.channel:not(.channel__search)').each(function(key, data) {
						order.push($(data).data('id'))
					});

					localStorage.setItem('order', JSON.stringify(order));

					showToast('Saved channel order');
				}
			}
		});

		channels.forEach(function(channel) {

			// Add the elements
			let _this = $(".channel[data-id='" + channel +"']");
			let videos = _this.find(".channel__videos");

			// Try to load the cached data
			channelCache = loadCache(channel);

			if(channelCache) {
				channelName = channelCache.name;

				_this.find(".channel__title").text(channelName);
				_this.find(".channel__title").attr("href", "https://www.youtube.com/channel/" + channel);

				$.each(channelCache.items, function(key, value) {
					videos.append(addVideo(value));
				});
			} else {
				if(USING_RSS) {
					$.ajax({
						url: String.format(YOUTUBE_RSS_CORS_URL, channel),
						type: "GET",
						dataType: "xml",
						async: true,
						cache: false,
						success:function(xml) {
							let $xml = $(xml);

							channelName = $xml.find('author').find('name').first().text();

							_this.find(".channel__title").text(channelName);
							_this.find(".channel__title").attr("href", "https://www.youtube.com/channel/" + channel);

							// Save the channel data to cache.
							saveCache(channel, channelName, $xml.find('entry'));

							// Load the cache right away, required since the addVideo() function
							// expects a certain array format.
							channelCache = loadCache(channel);

							$.each(channelCache.items, function(key, value) {
								videos.append(addVideo(value));
							});
						}
					});
				} else {
					$.ajax({
						url: String.format(YOUTUBE_API_URL, channel, YOUTUBE_KEY, VIDEO_AMOUNT),
						type: "GET",
						async: true,
						cache: false,
						success:function(data) {
							channelName = data.items[0].snippet.channelTitle;

							_this.find(".channel__title").text(channelName);
							_this.find(".channel__title").attr("href", "https://www.youtube.com/channel/" + channel);

							// Save the channel data to cache.
							saveCache(channel, channelName, data.items);

							// Load the cache right away, required since the addVideo() function
							// expects a certain array format.
							channelCache = loadCache(channel);

							$.each(channelCache.items, function(key, value) {
								videos.append(addVideo(value));
							});
						}
					});
				}
			}

			$('.channel:not(.channel__search)').append(_this);
		});
	}

	/**
	* 	Click event on dynamic video element.
	*	Will load the video from YouTube and open up the video player.
	*/
	$('.channels').on('click', '.video', function(){
		let videoId = $(this).data('id');
		let videoTitle = $(this).data('title');

		if(videoId) {
			if($(window).width() <= 768) {
				window.location = 'https://youtu.be/' + videoId;
			} else {
				$('.video-player__background, .video-player__wrapper').show();
				$('.video-player__frame').attr('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1');
				$(".video-player__wrapper .video-player__title").html('<a href="https://youtube.com/watch?v=' + videoId + '">' + videoTitle + '</a>');
			}
		}
	});
	
	/**
	* 	Listens to the click and keypress event to search for
	*	videos with the given search criteria. If the input field is
	*	empty, it will abort the function.
	*/
	$('.search__button').on('click', searchCallback);
	$(".search__input").on('keypress', function() {
		if (event.which === 13) searchCallback();
	});

	// Stop searching button
	$('.stop-searching').on('click', function(){
		
		// Remove the search results
		$( ".channel__search" ).addClass('hide');
		$( ".channel__search" ).empty();
		
		// Hide the 'stop searching' button
		$( ".stop-searching" ).addClass('hide');
		
		// Show the regular stuff
		$( ".clear-cache" ).removeClass('hide');
		$( ".cache-status" ).removeClass('hide');
		$( ".channel" ).each(function() {
			$( this ).removeClass('hide');
		});
	});
	
	/**
	* 	When the video player's background is clicked, it will close the player.
	*/
	$('.video-player__background').on('click', function(){
		$('.video-player__background, .video-player__wrapper').hide();
		$('.video-player__frame').attr('src', '');
	});
	
	/**
	* 	When the 'clear cache' button is clicked, it will clear
	*	the stored videos cache and refresh the page to load the videos
	*	from the API.
	*/
	$('[data-func="refresh"]').on('click', function() {
		let _this = $(this);
		$(this).addClass('db-icon-spin');

		$.each(localStorage, function(key) {
			if(key.indexOf("channel-") >= 0) {
				window.localStorage.removeItem(key);
			}
		});

		setTimeout(function() {
			_this.removeClass('db-icon-spin');
		}, 1000);

		loadChannels();
	});

	/**
	 * 	Toggles the use of RSS on or off, depending on the current state.
	 */
	$('[data-func="rss-toggle"]').on('click', function() {
		USING_RSS = !USING_RSS;
		localStorage.setItem('rss-use', USING_RSS);
	
		changeFetchIcon();
		
		showToast((USING_RSS) ? 'Using RSS for data fetching' : 'Using API for data fetching');
	});
	
	function changeFetchIcon() {
		let elem = $('[data-func="rss-toggle"]');
		
		if(USING_RSS) {
			elem.removeClass('db-icon-plug');
			elem.addClass('db-icon-rss');
		} else {
			elem.removeClass('db-icon-rss');
			elem.addClass('db-icon-plug');
		}
	}
	
	/**
	* 	Callback for the seach button.
	*/
	function searchCallback() {
		let searchValue = escapeHtml($(".search__input").val());
		
		// Check if the input field contains text
		if(searchValue.length === 0) {
			return;
		}

		// Clear
		$( ".channel__search" ).empty();

		// Hide the regular stuff
		$( ".clear-cache" ).addClass('hide');
		$( ".cache-status" ).addClass('hide');
		$( ".channel" ).each(function() {
			$( this ).addClass('hide');
		});
		
		// Show the 'stop searching' button and loader
		$( ".stop-searching" ).removeClass('hide');
		$( "#content .container" ).append('<div class="loader"></div>');
		
		// Add the new channel
		$( ".channel__search" ).html(addInnerChannel());
		$( ".channel__search" ).find(".channel__username").text(searchValue);
		$( ".channel__search" ).find(".channel__header a").attr("href", "https://www.youtube.com/results?search_query=" + searchValue);
		
		// Start the search
		$.ajax({
			url:"https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchValue + "&type=video&order=relevance&relevanceLanguage=NL&key=" + YOUTUBE_KEY + "&maxResults=6",
			type:"GET",
			async: true,
			cache: false,
			success:function(data){
				
				// Remove the loader
				$( ".loader" ).remove();

				// Create the formatted array
				let videos = $( ".channel__search" ).find(".channel__videos");

				let formattedVideos = formatVideo(data.items);
				
				$.each(formattedVideos, function(key, value) {
					videos.append(addVideo(value));
				});
				
				$( ".channel__search" ).removeClass('hide');
			}
		});
	}

	/**
	* 	Returns the video HTML with the given video data.
	*
	*	@param {array} video - One specific YouTube video.
	*/
	function addVideo(video) {
		let date = new Date(video.publishedAt);
		let now = new Date();

		let converted = timeDifference(now, date);

		let videoOpen = "<div class='video' data-id='" + video.id + "' data-title='" + video.title + "'>";
		let videoThumb = "<div class='video__image'><img class='video__thumb' src='" + video.thumbnail + "' /></div>";
		let videoDetailsOpen = "<div class='video__details'><span class='video__title'>" + video.title + "</span><span class='video__channel'>" + video.channel + "</span><span class='video__published'>Published " + converted + "</span>";
		let videoDetailsNew = "<div class='new-badge'>New</div>"
		let videoDetailsClose = "</div>";
		let videoClose = "</div>";

		//																							   432000 = 5 days in seconds
		return videoOpen + videoThumb + videoDetailsOpen + (((now.getTime() - date.getTime()) / 1000 < 432000) ? videoDetailsNew : '') + videoDetailsClose + videoClose;
	}
	
	/**
	* 	Returns the channel HTML string.
	*/
	function addInnerChannel(channelId) {
		let element = document.createElement('div');
		element.setAttribute('class', CHANNEL_CLASSES);

		if(channelId)
			element.setAttribute('data-id', channelId);

		element.innerHTML = '' +
			'<div class="channel__header">' +
				'<a class="channel__title" href="#" target="_blank"></a>' +
				'<span class="drag-button button">move</span>' +
			'</div>' +
			'<div class="channel__inner">' +
				'<div class="channel__videos"></div>' +
			'</div>';

		return $(element);
	}
	
	/**
	* 	Will save the channel data to the local storage.
	*
	*	@param {string} channelId - The channel's identifier.
	*	@param {string} channelName - The channel's name.
	*	@param {array} videos - The channel's videos.
	*/
	function saveCache(channelId, channelName, videos) {
		if(channelId && channelName && videos) {
			let channelCache = {
				id: channelId,
				name: channelName,
				items: formatVideo(videos)
			};

			localStorage.setItem("channel-" + channelId, JSON.stringify(channelCache));
		}
	}
	
	/**
	* 	Will load the channel data from the local storage.
	*	
	*	@param {string} channel - The channel's name.
	*/
	function loadCache(channel) {
		if(channel) {
			return (localStorage.getItem("channel-" + channel)) ? JSON.parse(localStorage.getItem("channel-" + channel)) : undefined;
		}
		
		return undefined;
	}
	
	/**
	*	Takes the YouTube video arrays and formats it in a way that it can
	*	be used by the system.
	*	
	*	@param {array} videos - The array of videos fetched from YouTube.
	*/
	function formatVideo(videos) {
		let videoCache = [];
		let videoTemp = {};

		if(USING_RSS) {
			$.each(videos, function(key, value) {
				if(key === VIDEO_AMOUNT)
					return false;

				let item = $(value);
				let videoId = item.find('yt\\:videoId').text();

				videoTemp = {
					id: videoId,
					title: item.find('title').text(),
					publishedAt: item.find('published').text(),
					thumbnail: String.format('https://i.ytimg.com/vi/{0}/mqdefault.jpg', videoId),
					channel: item.find('author').find('name').text()
				};

				videoCache.push(videoTemp);
			});
		} else {
			$.each(videos, function(key, value) {
				videoTemp = {
					id: value.id.videoId,
					title: escapeHtml(value.snippet.title),
					publishedAt: value.snippet.publishedAt,
					thumbnail: value.snippet.thumbnails.medium.url,
					channel: escapeHtml(value.snippet.channelTitle)
				};

				videoCache.push(videoTemp);
			});
		}
		
		return videoCache;
	}

	/**
	* 	Escapes strings to make sure the text is safe.
	*
	*	@param {string} string - The string which needs to be escaped.
	*/
	function escapeHtml(string) {
		return String(string).replace(/[&<>"'`=\/]/g, function (s) {
			return ESCAPE_ENTITY_MAP[s];
		});
	}
	
	/**
	* 	Formats the video's timestamp to a readable date.
	*
	*	@param {Date} current - The current date.
	*	@param {Date) previous - The video's date.
	*/
	function timeDifference(current, previous) {
		let elapsed = (current.getTime() - previous.getTime()) / 1000;

		if (elapsed < 60) {
			 return elapsed + ' seconds ago';   
		} else if (elapsed < 3600) {
			 return Math.round(elapsed / 60) + ' minutes ago';   
		} else if (elapsed < 86400 ) {
			 return Math.round(elapsed / 3600 ) + ' hours ago';   
		} else if (elapsed < 604800) {
			return Math.round(elapsed / 86400) + ' days ago';   
		} else if (elapsed < 2592000) {
			return Math.round(elapsed / 604800) + ' weeks ago';   
		} else if (elapsed < 31536000) {
			return Math.round(elapsed / 2592000) + ' months ago';   
		} else {
			return Math.round(elapsed / 31536000) + ' years ago';   
		}
	}
	
	function showToast(value) {
		$('.toast').text(value).fadeIn(400);
		setTimeout(function() {
			$('.toast').fadeOut(250);
		}, 3000);
	}
});

// Adds support for string formatting.
String.format = function() {
	let theString = arguments[0];
	for (let i = 1; i < arguments.length; i++) {
		let regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
		theString = theString.replace(regEx, arguments[i]);
	}
	return theString;
};