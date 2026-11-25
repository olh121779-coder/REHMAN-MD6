const country=document.querySelector('#country'),customWrap=document.querySelector('#customWrap'),customCode=document.querySelector('#customCode'),number=document.querySelector('#number'),button=document.querySelector('#getCode'),status=document.querySelector('#status'),result=document.querySelector('#result'),codeEl=document.querySelector('#code');
country.addEventListener('change',()=>customWrap.hidden=country.value!=='custom');
button.addEventListener('click',async()=>{
 const dial=country.value==='custom'?customCode.value:country.value;
 const digits=(dial+number.value).replace(/\D/g,'');
 if(!dial || digits.length<7 || digits.length>15){status.textContent='Enter a valid international number with country code.';return;}
 button.disabled=true;status.textContent='Generating secure pairing code…';result.hidden=true;
 try{const r=await fetch('/api/pair',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({number:digits})});const data=await r.json();if(!r.ok)throw new Error(data.error||'Pairing failed');codeEl.textContent=data.code;result.hidden=false;status.textContent='Code ready. Enter it in WhatsApp linked devices.';}
 catch(e){status.textContent=e.message;}
 finally{button.disabled=false;}
});
document.querySelector('#copy').addEventListener('click',async()=>{await navigator.clipboard.writeText(codeEl.textContent.replace(/-/g,''));status.textContent='Pair code copied.';});
