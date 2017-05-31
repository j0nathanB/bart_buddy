// Real Time Estimates
// {`http://api.bart.gov/api/
// 	etd.aspx? ${this shows us what request we are in in this case Estimated time departure, not sure about aspx}
// 	cmd=etd ${Requests current departure information}
// 	&
// 	orig=12th ${Specifies the station}
// 	&
// 	key=MW9S-E7SL-26DU-VV8V ${API registration key}
// 	&
// 	plat= ${(optional) shows the specific platform}
// 	&
// 	dir=n ${(optional) Specifies North or Southbound}`} 

// ////////////////////////////////////////////////////////////////////////////////////////////

// Specific route INfo 

// {`http://api.bart.gov/api/
// 	route.aspx? ${}
// 	cmd=routeinfo ${}
// 	&
// 	route=6 ${}
// 	&
// 	key=MW9S-E7SL-26DU-VV8V`}

// ////////////////////////////////////////////////////////////////////////////////////////////
// Advisory information 

// {}

// ////////////////////////////////////////////////////////////////////////////////////////////

// QUICK PLANNER ARRIVE / DEPART

// {`http://api.bart.gov/api/
// 	sched.aspx?
// 	cmd=arrive ${Quick Planner arrive, if specified as depart then this becomes quick planner depart}
// 	&
// 	orig=ASHB ${origin station and station abbreviation}
// 	&
// 	dest=CIVC ${destionation station}
// 	&
// 	time=h:mm+am/pm ${(optional) Specifies the arrival time for the trip. Using "time=now" is also valid}
// 	&
// 	date=now ${(optional) defaults to now if not Specified}
// 	&
// 	key=MW9S-E7SL-26DU-VV8V
// 	&
// 	b=2 ${(optional) This allows specifying how many trips before the specified time should be returned}
// 	&
// 	a=2 ${(optional) same as above but this allows you to specify times after}
// 	&
// 	l=1 ${0 or 1 adnd specifies whether the legend information should be included}`}

// ////////////////////////////////////////////////////////////////////////////////////////////




// ////////////////////////////////////////////////////////////////////////////////////////////


let stations = {
//12th:	'12th St. Oakland City Center',
//16th:	'16th St. Mission (SF)',
//19th:	'19th St. Oakland',
//24th:	'24th St. Mission (SF)',
ashb:	'Ashby (Berkeley)',
balb:	'Balboa Park (SF)',
bayf:	'Bay Fair (San Leandro)',
cast:	'Castro Valley',
civc:	'Civic Center (SF)',
cols:	'Coliseum',
colm:	'Colma',
conc:	'Concord',
daly:	'Daly City',
dbrk:	'Downtown Berkeley',
dubl:	'Dublin/Pleasanton',
deln:	'El Cerrito del Norte',
plza:	'El Cerrito Plaza',
embr:	'Embarcadero (SF)',
frmt:	'Fremont',
ftvl:	'Fruitvale (Oakland)',
glen:	'Glen Park (SF)',
hayw:	'Hayward',
lafy:	'Lafayette',
lake:	'Lake Merritt (Oakland)',
mcar:	'MacArthur (Oakland)',
mlbr:	'Millbrae',
mont:	'Montgomery St. (SF)',
nbrk:	'North Berkeley',
ncon:	'North Concord/Martinez',
oakl:	'Oakland Int\'l Airport',
orin:	'Orinda',
pitt:	'Pittsburg/Bay Point',
phil:	'Pleasant Hill',
powl:	'Powell St. (SF)',
rich:	'Richmond',
rock:	'Rockridge (Oakland)',
sbrn:	'San Bruno',
sfia:	'San Francisco Int\'l Airport',
sanl:	'San Leandro',
shay:	'South Hayward',
ssan:	'South San Francisco',
ucty:	'Union City',
warm:	'Warm Springs/South Fremont',
wcrk:	'Walnut Creek',
wdub:	'West Dublin',
woak:	'West Oakland'
};

module.exports = stations;