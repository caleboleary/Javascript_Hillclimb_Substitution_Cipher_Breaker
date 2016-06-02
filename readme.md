
# Hillclimbing/Genetic Mutating Function Demo & Tutorial

Today I'll be walking you through a programming techinque called 'hillclimbing', and how we can use it with genetic mutating functions to solve problems that seem like they'd take a huge amount of time, or a real human to break.

Hillclimbing at it's core is meant to find something called the 'local maxima'. Imagine a chart with several peaks and valleys, one way to find the highest peak would be to pick a random position and start going up. You may end up at a peak that isn't the highest, but chances are, if you did this enough times you'd find the tallest peak. The below code repeats this process 100 times and returns the highest peak it found.

Here's a quick example in JavaScript showing something like what I described:

```sh
var dataSet = [3,15,25,67,68,54,32,12,56,69,70,57,43,32,12,34,54,25,10,3];
var peaks = [];
var iterations = 100;
for (var i = 0; i < iterations; i++) {
	var random = Math.floor(Math.random() * dataSet.length-1) + 1;
	var letsClimb = true;
	while (letsClimb) {
		if (typeof dataSet[random + 1] !== 'undefined' && dataSet[random + 1] > dataSet[random]) {
			random++;
		}
		else if (typeof dataSet[random - 1] !== 'undefined' && dataSet[random - 1] > dataSet[random]) {
			random--;
		}
		else {
			peaks.push(dataSet[random]);
			letsClimb = false;
		}
	}
}
console.log(peaks.sort()[peaks.length-1]);

```

Now we know this isn't the best way to find the highest point, but bear with me, because there are instances where this strategy does come in handy.

So when is this random searching useful? Enter the Substitution Cipher. Using the english alphabet, 
messages can be encoded with up to 400 septillion (after trillion, quadrillion, quintillion, and sextillion -- this number: 403291461126605635584000000) different keys.

Say we have the following message, pulled from Simon Singh's 'The Code Book' (excellent read) which is encoded with a random
substitution cipher. Every letter has been replaced by one letter throughout the whole test, for example we've replaced
every 'a' with 'x', every 'b' with 'd' or something like that, no rhyme or reason, and not in alphabetical order (that would be a Caesar Cipher, much easier to break).

BT JPX RMLX PCUV AMLX ICVJP IBTWXVR CI M LMT’R PMTN, MTN YVCJX CDXV MWMBTRJ JPX AMTNGXRJBAH UQCT JPX QGMRJXV CI JPX 
YMGG CI JPX HBTW’R QMGMAX; MTN JPX HBTW RMY JPX QMVJ CI JPX PMTN JPMJ YVCJX. JPXT JPX HBTW’R ACUTJXTMTAX YMR APMTWXN, 
MTN PBR JPCUWPJR JVCUFGXN PBL, RC JPMJ JPX SCBTJR CI PBR GCBTR YXVX GCCRXN, MTN PBR HTXXR RLCJX CTX MWMBTRJ MTCJPXV. 
JPX HBTW AVBXN MGCUN JC FVBTW BT JPX MRJVCGCWXVR, JPX APMGNXMTR, MTN JPX RCCJPRMEXVR. MTN JPX HBTW RQMHX, MTN RMBN JC 
JPX YBRX LXT CI FMFEGCT, YPCRCXDXV RPMGG VXMN JPBR YVBJBTW, MTN RPCY LX JPX BTJXVQVXJMJBCT JPXVXCI, RPMGG FX AGCJPXN YBJP RAM

Now, there are definitely techniques out there to solve this by hand, but how could we apply a shotgun hillclimb approach here, and solve this with a computer so we don't have to think? (Shotgun hillclimb is the type of hillclimbing where we don't just find 1 local maxima, but many at random intervals and take the best, like doing that hillclimb above 100 times.) A total random search would involve us testing 400 septillion keys, which seems a sight impractical.

We'll need a few things set up before our computers can crack this code unaided, let's check out the recipe:
	
	--Decoding function - we need a function that decodes this message for a given key. We can try many keys, and evaluate the deciphered message to see if it's legible.
	--Dictionary - we need a way to decide if our random key resulted in any non-gibberish, let's do the top 1000 english words. (Or whatever language we're cracking).
	--Scoring function - use our dictionary to give us a 'score' for how well the key does.
	--Generator function - something to generate random keys for us to score.
	--Mutator function - take a good key in, and return a lot of slightly altered ones to test. Hopefully this will result in us moving closer to the real key.
	--Starting Point Function - A good place to start looking, lets make a key that would be right if the message had the exact letter distribution as normal English. This will be a great place to mutate from.
	--Controller - a function to generate keys, test them all, pick the best using the scores, and mutate/generate more for testing


Let's see the pieces:

###Decoding Function
	```sh
	function deSubstitute(str,key){
	return str.split('').map(function(letter){
		if (letter.match(/^[a-z]*$/g)) {
			return String.fromCharCode(key.indexOf(letter)+97);
		}
		else if (letter.match(/^[A-Z]*$/g)) {
			return String.fromCharCode(key.indexOf(letter.toLowerCase())+65);
		}
		return letter;
	}).join('');
}
	
	```
This function takes in a string and a key, and shifts each letter as if it were a subsitution cipher, and the key the correct key, returning the deciphered string.


###Dictionary
	```sh
	var mostCommon = ['the','of','to','and','a','in','is','it','you','that','he','was','for','on','are','with','as','I','his','they','be','at','one','have','this','from','or','had','by','hot','word','but','what','some','we','can','out','other','were','all','there','when','up','use','your','how','said','an','each','she','which','do','their','time','if','will','way','about','many','then','them','write','would','like','so','these','her','long','make','thing','see','him','two','has','look','more','day','could','go','come','did','number','sound','no','most','people','my','over','know','water','than','call','first','who','may','down','side','been','now','find','any','new','work','part','take','get','place','made','live','where','after','back','little','only','round','man','year','came','show','every','good','me','give','our','under','name','very','through','just','form','sentence','great','think','say','help','low','line','differ','turn','cause','much','mean','before','move','right','boy','old','too','same','tell','does','set','three','want','air','well','also','play','small','end','put','home','read','hand','port','large','spell','add','even','land','here','must','big','high','such','follow','act','why','ask','men','change','went','light','kind','off','need','house','picture','try','us','again','animal','point','mother','world','near','build','self','earth','father','head','stand','own','page','should','country','found','answer','school','grow','study','still','learn','plant','cover','food','sun','four','between','state','keep','eye','never','last','let','thought','city','tree','cross','farm','hard','start','might','story','saw','far','sea','draw','left','late','run','dont','while','press','close','night','real','life','few','north','open','seem','together','next','white','children','begin','got','walk','example','ease','paper','group','always','music','those','both','mark','often','letter','until','mile','river','car','feet','care','second','book','carry','took','science','eat','room','friend','began','idea','fish','mountain','stop','once','base','hear','horse','cut','sure','watch','color','face','wood','main','enough','plain','girl','usual','young','ready','above','ever','red','list','though','feel','talk','bird','soon','body','dog','family','direct','pose','leave','song','measure','door','product','black','short','numeral','class','wind','question','happen','complete','ship','area','half','rock','order','fire','south','problem','piece','told','knew','pass','since','top','whole','king','space','heard','best','hour','better','true .','during','hundred','five','remember','step','early','hold','west','ground','interest','reach','fast','verb','sing','listen','six','table','travel','less','morning','ten','simple','several','vowel','toward','war','lay','against','pattern','slow','center','love','person','money','serve','appear','road','map','rain','rule','govern','pull','cold','notice','voice','unit','power','town','fine','certain','fly','fall','lead','cry','dark','machine','note','wait','plan','figure','star','box','noun','field','rest','correct','able','pound','done','beauty','drive','stood','contain','front','teach','week','final','gave','green','oh','quick','develop','ocean','warm','free','minute','strong','special','mind','behind','clear','tail','produce','fact','street','inch','multiply','nothing','course','stay','wheel','full','force','blue','object','decide','surface','deep','moon','island','foot','system','busy','test','record','boat','common','gold','possible','plane','stead','dry','wonder','laugh','thousand','ago','ran','check','game','shape','equate','hot','miss','brought','heat','snow','tire','bring','yes','distant','fill','east','paint','language','among','grand','ball','yet','wave','drop','heart','am','present','heavy','dance','engine','position','arm','wide','sail','material','size','vary','settle','speak','weight','general','ice','matter','circle','pair','include','divide','syllable','felt','perhaps','pick','sudden','count','square','reason','length','represent','art','subject','region','energy','hunt','probable','bed','brother','egg','ride','cell','believe','fraction','forest','sit','race','window','store','summer','train','sleep','prove','lone','leg','exercise','wall','catch','mount','wish','sky','board','joy','winter','sat','written','wild','instrument','kept','glass','grass','cow','job','edge','sign','visit','past','soft','fun','bright','gas','weather','month','million','bear','finish','happy','hope','flower','clothe','strange','gone','jump','baby','eight','village','meet','root','buy','raise','solve','metal','whether','push','seven','paragraph','third','shall','held','hair','describe','cook','floor','either','result','burn','hill','safe','cat','century','consider','type','law','bit','coast','copy','phrase','silent','tall','sand','soil','roll','temperature','finger','industry','value','fight','lie','beat','excite','natural','view','sense','ear','else','quite','broke','case','middle','kill','son','lake','moment','scale','loud','spring','observe','child','straight','consonant','nation','dictionary','milk','speed','method','organ','pay','age','section','dress','cloud','surprise','quiet','stone','tiny','climb','cool','design','poor','lot','experiment','bottom','key','iron','single','stick','flat','twenty','skin','smile','crease','hole','trade','melody','trip','office','receive','row','mouth','exact','symbol','die','least','trouble','shout','except','wrote','seed','tone','join','suggest','clean','break','lady','yard','rise','bad','blow','oil','blood','touch','grew','cent','mix','team','wire','cost','lost','brown','wear','garden','equal','sent','choose','fell','fit','flow','fair','bank','collect','save','control','decimal','gentle','woman','captain','practice','separate','difficult','doctor','please','protect','noon','whose','locate','ring','character','insect','caught','period','indicate','radio','spoke','atom','human','history','effect','electric','expect','crop','modern','element','hit','student','corner','party','supply','bone','rail','imagine','provide','agree','thus','capital','wont','chair','danger','fruit','rich','thick','soldier','process','operate','guess','necessary','sharp','wing','create','neighbor','wash','bat','rather','crowd','corn','compare','poem','string','bell','depend','meat','rub','tube','famous','dollar','stream','fear','sight','thin','triangle','planet','hurry','chief','colony','clock','mine','tie','enter','major','fresh','search','send','yellow','gun','allow','print','dead','spot','desert','suit','current','lift','rose','continue','block','chart','hat','sell','success','company','subtract','event','particular','deal','swim','term','opposite','wife','shoe','shoulder','spread','arrange','camp','invent','cotton','born','determine','quart','nine','truck','noise','level','chance','gather','shop','stretch','throw','shine','property','column','molecule','select','wrong','gray','repeat','require','broad','prepare','salt','nose','plural','anger','claim','continent','oxygen','sugar','death','pretty','skill','women','season','solution','magnet','silver','thank','branch','match','suffix','especially','fig','afraid','huge','sister','steel','discuss','forward','similar','guide','experience','score','apple','bought','led','pitch','coat','mass','card','band','rope','slip','win','dream','evening','condition','feed','tool','total','basic','smell','valley','nor','double','seat','arrive','master','track','parent','shore','division','sheet','substance','favor','connect','post','spend','chord','fat','glad','original','share','station','dad','bread','charge','proper','bar','offer','segment','slave','duck','instant','market','degree','populate','chick','dear','enemy','reply','drink','occur','support','speech','nature','range','steam','motion','path','liquid','log','meant','quotient','teeth','shell','neck'];//from https://gist.github.com/deekayen/4148741\

	
	```
An array of the top 1000 most used English words.


###Scoring Function
	```sh
	function score(str, keyArr) {
	var winnerIndex = 0;
	var winnerScore = 0;
	str = str.toLowerCase();
	for (var k = 0; k < keyArr.length; k++) {
		var ds = deSubstitute(str,keyArr[k]);
		var score = 0;
		for (var i = 0, len = mostCommon.length; i < len; i++) {
			if (ds.indexOf(' '+mostCommon[i].toLowerCase()+' ') > -1) {
				score++;
			}
		}
		if (score > winnerScore) {
			winnerScore = score;
			winnerIndex = k;
		}
	}
	return [keyArr[winnerIndex], winnerScore];
}
	
	```
This function takes in the string you're trying to crack, and an array of possible keys, each needing scoring. It returns the best fit candidate (most real English words matched) and it's score.


###Generator Function
	```sh
	//base code from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle() {
	var newArr= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var currentIndex = newArr.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = newArr[currentIndex];
		newArr[currentIndex] = newArr[randomIndex];
		newArr[randomIndex] = temporaryValue;
  }
  return newArr;
}
	
	```
This function creates a new shuffled version of the English alphabet and returns it.


###Mutator Function
	```sh
	function mutate(arr,amount) {
	var newCopy = arr.slice(0);
	for (var i = 0; i < amount; i++) {		
		var pos1=Math.floor(Math.random() * newCopy.length),
			pos2=Math.floor(Math.random() * newCopy.length),
			temp=newCopy[pos2];
		newCopy[pos2]=newCopy[pos1];
		newCopy[pos1]=temp;
	}
	return newCopy;
}
	
	```
This duplicates the passed in array (to avoid editing the original by reference) and swaps 2 random array values *amount* times. This gives us control to mutate the alphabet as drasticly as we wish, if we're barking up the wrong figurative tree we can start trying more extreme variants.


###Starting Point Functions
	```sh
	function getMatchIndexes(str, toMatch) {
	var toMatchLength = toMatch.length,
		indexMatches = [], match,
		i = 0;
	while ((match = str.indexOf(toMatch, i)) > -1) {
		indexMatches.push(match);
		i = match + toMatchLength;
	}
	return indexMatches;
}
function orderFrequency(str){
	var countObj = [];
	str = str.toLowerCase();
	var baseCharFreq = [{freq:0.08,letter:'a'},{freq:0.015,letter:'b'},{freq:0.025,letter:'c'},{freq:0.044,letter:'d'},{freq:0.126,letter:'e'},{freq:0.024,letter:'f'},{freq:0.02,letter:'g'},{freq:0.063,letter:'h'},{freq:0.07,letter:'i'},{freq:0.0014,letter:'j'},{freq:0.0074,letter:'k'},{freq:0.04,letter:'l'},{freq:0.025,letter:'m'},{freq:0.07,letter:'n'},{freq:0.076,letter:'o'},{freq:0.018,letter:'p'},{freq:0.001,letter:'q'},{freq:0.06,letter:'r'},{freq:0.063,letter:'s'},{freq:0.08,letter:'t'},{freq:0.028,letter:'u'},{freq:0.009,letter:'v'},{freq:0.02,letter:'w'},{freq:0.0017,letter:'x'},{freq:0.02,letter:'y'},{freq:0.0008,letter:'z'}];
	for (var i = 0; i < 26; i++) {
		countObj.push({
			letter:String.fromCharCode(i+97),
			count:getMatchIndexes(str,String.fromCharCode(i+97)).length,
			guessLetter:0,
			origOrder:i
		});
	}
	baseCharFreq.sort(function(a, b){
		if(a.freq < b.freq) return 1;
		if(a.freq > b.freq) return -1;
		return 0;
	});
	countObj.sort(function(a, b){
		if(a.count < b.count) return 1;
		if(a.count > b.count) return -1;
		return 0;
	});
	for (var j = 0; j < countObj.length; j++) {
		countObj[j].guessLetter = baseCharFreq[j].letter;
	}
	countObj.sort(function(a, b){
		if(a.guessLetter > b.guessLetter) return 1;
		if(a.guessLetter < b.guessLetter) return -1;
		return 0;
	});
	var guessKey = [];
	for (var i = 0; i < countObj.length; i++) {
		guessKey.push(countObj[i].letter);
	}
	return guessKey;
}
	
	```
Technically this piece isn't needed, but it makes the process much more efficient. Rather than starting with random keys, we use the known average character frequency to give ourselves a nice starting place to begin mutating. This function essentially creates a key that would be correct if the character frequency of the string to crack exactly matched up with English as a whole.


###Controller
	```sh
	function crackSubstitution (str, attempts) {
	var runningKeys = [],
		runningWinner,
		runningWinnerScore; 
	runningKeys.push(orderFrequency(str));
	var scoreVar = score(str,runningKeys);
	runningWinner = scoreVar[0];
	runningWinnerScore = scoreVar[1];
	runningKeys = [runningWinner];
	for (var attempt = 1; attempt < attempts; attempt++) {
		while(runningKeys.length < 20) {
			runningKeys.push(mutate(runningWinner,runningKeys.length));
		} 
		scoreVar = score(str,runningKeys);
		if (scoreVar[1] > runningWinnerScore) {
			runningWinner = scoreVar[0];
			runningWinnerScore = scoreVar[1];
		}
		runningKeys = [runningWinner];
		if (attempt%100===0) console.log('attempt: '+attempt);
	}
	return runningWinner;
}
	
	```
The controller makes use of the rest of the pieces we just defined, you pass in the string you want to crack and the number of 'turns' you want to allow the program to run. First it defines some variables and generates an array of 20 random alphabets, and scores them all. It then runs a loop *attempts* times and continuously mutates the best key it's found. Over hundreds or thousands of repetitions, this slowly can actually find the correct key for a cipher.


###Go time!
	```sh

var crack = 'BT JPX RMLX PCUV AMLX ICVJP IBTWXVR CI M LMT’R PMTN, MTN YVCJX CDXV MWMBTRJ JPX AMTNGXRJBAH UQCT JPX QGMRJXV CI JPX YMGG CI JPX HBTW’R QMGMAX; MTN JPX HBTW RMY JPX QMVJ CI JPX PMTN JPMJ YVCJX. JPXT JPX HBTW’R ACUTJXTMTAX YMR APMTWXN, MTN PBR JPCUWPJR JVCUFGXN PBL, RC JPMJ JPX SCBTJR CI PBR GCBTR YXVX GCCRXN, MTN PBR HTXXR RLCJX CTX MWMBTRJ MTCJPXV. JPX HBTW AVBXN MGCUN JC FVBTW BT JPX MRJVCGCWXVR, JPX APMGNXMTR, MTN JPX RCCJPRMEXVR. MTN JPX HBTW RQMHX, MTN RMBN JC JPX YBRX LXT CI FMFEGCT, YPCRCXDXV RPMGG VXMN JPBR YVBJBTW, MTN RPCY LX JPX BTJXVQVXJMJBCT JPXVXCI, RPMGG FX AGCJPXN YBJP RAM';


console.log(deSubstitute(crack,crackSubstitution(crack, 2000)));
	
	```
Here's how you can run all that code! I suggest running it with Node, but it will run in the browser (if slowly). 


