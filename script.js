var api_key = 'BYLBYN7O3QSEBROAR';
var params = [], artists = [], songs = [];
$(".vevent .line-up ul li a").each(function(i,x){
	if(params.length<5) {	// Max 5 artists supported
		params.push('artist_id=songkick:artist:' + $(this).attr('href').split('/')[2].split('-')[0] + ($(this).parent().hasClass('headliner') ? "^2" : ""));
		artists.push($(this).text());
	}
});
if(params.length>0) {
	$.getJSON('http://developer.echonest.com/api/v4/playlist/static?'+params.join('&')+'&api_key='+api_key+'&format=json&results=20&type=artist&bucket=tracks&bucket=id:spotify-WW',function(data){
		$.each(data.response.songs,function(i,song){
			songs.push(song.tracks[0].foreign_id.split(':')[2]);
		})
		var playlist = 'spotify:trackset:'+artists.join(' + ')+':'+songs.join(',');
		var player = '<iframe style="margin-top:10px" src="https://embed.spotify.com/?uri='+playlist+'" width="260" height="340" frameborder="0" allowtransparency="true"></iframe>';
		$(".secondary.col").prepend('<div id="pregig" style="padding:16px 20px 15px 20px"><h3>PreGig Playlist</h3></div>');
		$("#pregig").append(player);
	});
}