/*!
 * jalali.js
 * Javascript Jalali date conversion functions by Farshad Shahbazi
 * Note: converted from php functions at http://jdf.scr.ir/
 * Copyright c 2015 Farshad Shahbazi
 * Released under the MIT license
 */
function gregorian_to_jalali(g_y,g_m,g_d)
{
	g_y = parseInt(g_y);
	g_m = parseInt(g_m+1);
	g_d = parseInt(g_d);

	var d_4=g_y%4,
		g_a = [0,0,31,59,90,120,151,181,212,243,273,304,334],
		doy_g = g_a[parseInt(g_m)] + g_d,
		jy,doy_j,jm,jd;
	if (d_4==0 && g_m>2)
		doy_g++;
	var d_33 = parseInt( ((g_y-16) % 132) * 0.0305),
		a = (d_33==3 || d_33 < (d_4-1) || d_4==0) ? 286 : 287,
		b = ((d_33==1 || d_33==2) && (d_33==d_4 || d_4==1)) ? 78: ((d_33==3 && d_4==0)?80:79);
	if (parseInt((g_y-10)/63)==30)
	{
		a--;
		b++;
	}
	
	if (doy_g>b)
	{
		jy=g_y-621;
		doy_j=doy_g-b;
	}
	else
	{
		jy=g_y-622;
		doy_j=doy_g+a;
	}
	
	if (doy_j<187)
	{
		jm=parseInt((doy_j-1)/31);
		jd=doy_j-(31*jm++);
	}
	else
	{
		jm=parseInt((doy_j-187)/30);
		jd=doy_j-186-(jm*30);
		jm+=7;
	}
	return {year:jy,month:jm,day:jd};
}

function jalali_to_gregorian(j_y, j_m, j_d)
{
	j_y = parseInt(j_y);
	j_m = parseInt(j_m);
	j_d = parseInt(j_d);
	
	var d_4 = (j_y+1) % 4,
		doy_j = (j_m<7) ? ((j_m-1)*31)+j_d : ((j_m-7)*30) + j_d + 186,
		d_33 = parseInt(((j_y-55)%132) * 0.0305),
		a = (d_33!=3 && d_4<=d_33) ? 287 : 286,
		b = ((d_33==1 || d_33==2) && (d_33==d_4 || d_4==1)) ? 78 : ((d_33==3 && d_4==0) ? 80:79),
		gy,gd,gm,
		ar = [0,31,(gy%4==0)?29:28,31,30,31,30,31,31,30,31,30,31];
	if (parseInt((j_y-19)/63)==20)
	{
		a--;
		b++;
	}
	
	if (doy_j <= a)
	{
		gy = j_y + 621;
		gd = doy_j+b;
	}
	else
	{
		gy = j_y + 622;
		gd = doy_j - a;
	}
	
	for (gm=0; gm<13; ++gm)
	{
		var v = ar[gm];
		if (gd <= v)
			break;
		gd-=v;
	}
	return {year:gy,month:gm-1,day:gd};
}