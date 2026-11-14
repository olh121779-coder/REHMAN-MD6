export default async function(sock,m,from,ctx) {
  const url='https://www.pinterest.com/search/pins/?q='+encodeURIComponent('Bad Boy Black Mask Real Boy');
  return m.reply('👦 BOYS DP REHMAN-MD\\nReal-photo search: '+url+'\\nNote: Open Pinterest to choose an image. No unverified image URLs are sent.');
}
