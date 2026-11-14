export default async function(sock,m,from,ctx) {
  const url='https://www.pinterest.com/search/pins/?q='+encodeURIComponent('Princess Queen Crown Real Girl');
  return m.reply('👧 GIRLS DP REHMAN-MD\\nReal-photo search: '+url+'\\nNote: Open Pinterest to choose an image. No unverified image URLs are sent.');
}
