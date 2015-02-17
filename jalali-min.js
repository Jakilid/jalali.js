/*!
 * jalali.js
 * Javascript Jalali date conversion functions by Farshad Shahbazi
 * Note: converted from php functions at http://jdf.scr.ir/
 * Copyright c 2015 Farshad Shahbazi
 * Released under the MIT license
 */
function gregorian_to_jalali(r,a,n){r=parseInt(r),a=parseInt(a+1),n=parseInt(n);var t,e,p,s,I=r%4,o=[0,0,31,59,90,120,151,181,212,243,273,304,334],i=o[parseInt(a)]+n;0==I&&a>2&&i++;var f=parseInt((r-16)%132*.0305),g=3==f||I-1>f||0==I?286:287,l=1!=f&&2!=f||f!=I&&1!=I?3==f&&0==I?80:79:78;return 30==parseInt((r-10)/63)&&(g--,l++),i>l?(t=r-621,e=i-l):(t=r-622,e=i+g),187>e?(p=parseInt((e-1)/31),s=e-31*p++):(p=parseInt((e-187)/30),s=e-186-30*p,p+=7),{year:t,month:p,day:s}}function jalali_to_gregorian(r,a,n){r=parseInt(r),a=parseInt(a),n=parseInt(n);var t,e,p,s=(r+1)%4,I=7>a?31*(a-1)+n:30*(a-7)+n+186,o=parseInt((r-55)%132*.0305),i=3!=o&&o>=s?287:286,f=1!=o&&2!=o||o!=s&&1!=s?3==o&&0==s?80:79:78,g=[0,31,t%4==0?29:28,31,30,31,30,31,31,30,31,30,31];for(20==parseInt((r-19)/63)&&(i--,f++),i>=I?(t=r+621,e=I+f):(t=r+622,e=I-i),p=0;13>p;++p){var l=g[p];if(l>=e)break;e-=l}return{year:t,month:p-1,day:e}}