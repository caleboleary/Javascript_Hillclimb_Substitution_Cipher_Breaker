var crackSubstitution = (function() {
	'use strict';

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

	var mostCommon = ['the','of','to','and','a','in','is','it','you','that','he','was','for','on','are','with','as','I','his','they','be','at','one','have','this','from','or','had','by','hot','word','but','what','some','we','can','out','other','were','all','there','when','up','use','your','how','said','an','each','she','which','do','their','time','if','will','way','about','many','then','them','write','would','like','so','these','her','long','make','thing','see','him','two','has','look','more','day','could','go','come','did','number','sound','no','most','people','my','over','know','water','than','call','first','who','may','down','side','been','now','find','any','new','work','part','take','get','place','made','live','where','after','back','little','only','round','man','year','came','show','every','good','me','give','our','under','name','very','through','just','form','sentence','great','think','say','help','low','line','differ','turn','cause','much','mean','before','move','right','boy','old','too','same','tell','does','set','three','want','air','well','also','play','small','end','put','home','read','hand','port','large','spell','add','even','land','here','must','big','high','such','follow','act','why','ask','men','change','went','light','kind','off','need','house','picture','try','us','again','animal','point','mother','world','near','build','self','earth','father','head','stand','own','page','should','country','found','answer','school','grow','study','still','learn','plant','cover','food','sun','four','between','state','keep','eye','never','last','let','thought','city','tree','cross','farm','hard','start','might','story','saw','far','sea','draw','left','late','run','dont','while','press','close','night','real','life','few','north','open','seem','together','next','white','children','begin','got','walk','example','ease','paper','group','always','music','those','both','mark','often','letter','until','mile','river','car','feet','care','second','book','carry','took','science','eat','room','friend','began','idea','fish','mountain','stop','once','base','hear','horse','cut','sure','watch','color','face','wood','main','enough','plain','girl','usual','young','ready','above','ever','red','list','though','feel','talk','bird','soon','body','dog','family','direct','pose','leave','song','measure','door','product','black','short','numeral','class','wind','question','happen','complete','ship','area','half','rock','order','fire','south','problem','piece','told','knew','pass','since','top','whole','king','space','heard','best','hour','better','true .','during','hundred','five','remember','step','early','hold','west','ground','interest','reach','fast','verb','sing','listen','six','table','travel','less','morning','ten','simple','several','vowel','toward','war','lay','against','pattern','slow','center','love','person','money','serve','appear','road','map','rain','rule','govern','pull','cold','notice','voice','unit','power','town','fine','certain','fly','fall','lead','cry','dark','machine','note','wait','plan','figure','star','box','noun','field','rest','correct','able','pound','done','beauty','drive','stood','contain','front','teach','week','final','gave','green','oh','quick','develop','ocean','warm','free','minute','strong','special','mind','behind','clear','tail','produce','fact','street','inch','multiply','nothing','course','stay','wheel','full','force','blue','object','decide','surface','deep','moon','island','foot','system','busy','test','record','boat','common','gold','possible','plane','stead','dry','wonder','laugh','thousand','ago','ran','check','game','shape','equate','hot','miss','brought','heat','snow','tire','bring','yes','distant','fill','east','paint','language','among','grand','ball','yet','wave','drop','heart','am','present','heavy','dance','engine','position','arm','wide','sail','material','size','vary','settle','speak','weight','general','ice','matter','circle','pair','include','divide','syllable','felt','perhaps','pick','sudden','count','square','reason','length','represent','art','subject','region','energy','hunt','probable','bed','brother','egg','ride','cell','believe','fraction','forest','sit','race','window','store','summer','train','sleep','prove','lone','leg','exercise','wall','catch','mount','wish','sky','board','joy','winter','sat','written','wild','instrument','kept','glass','grass','cow','job','edge','sign','visit','past','soft','fun','bright','gas','weather','month','million','bear','finish','happy','hope','flower','clothe','strange','gone','jump','baby','eight','village','meet','root','buy','raise','solve','metal','whether','push','seven','paragraph','third','shall','held','hair','describe','cook','floor','either','result','burn','hill','safe','cat','century','consider','type','law','bit','coast','copy','phrase','silent','tall','sand','soil','roll','temperature','finger','industry','value','fight','lie','beat','excite','natural','view','sense','ear','else','quite','broke','case','middle','kill','son','lake','moment','scale','loud','spring','observe','child','straight','consonant','nation','dictionary','milk','speed','method','organ','pay','age','section','dress','cloud','surprise','quiet','stone','tiny','climb','cool','design','poor','lot','experiment','bottom','key','iron','single','stick','flat','twenty','skin','smile','crease','hole','trade','melody','trip','office','receive','row','mouth','exact','symbol','die','least','trouble','shout','except','wrote','seed','tone','join','suggest','clean','break','lady','yard','rise','bad','blow','oil','blood','touch','grew','cent','mix','team','wire','cost','lost','brown','wear','garden','equal','sent','choose','fell','fit','flow','fair','bank','collect','save','control','decimal','gentle','woman','captain','practice','separate','difficult','doctor','please','protect','noon','whose','locate','ring','character','insect','caught','period','indicate','radio','spoke','atom','human','history','effect','electric','expect','crop','modern','element','hit','student','corner','party','supply','bone','rail','imagine','provide','agree','thus','capital','wont','chair','danger','fruit','rich','thick','soldier','process','operate','guess','necessary','sharp','wing','create','neighbor','wash','bat','rather','crowd','corn','compare','poem','string','bell','depend','meat','rub','tube','famous','dollar','stream','fear','sight','thin','triangle','planet','hurry','chief','colony','clock','mine','tie','enter','major','fresh','search','send','yellow','gun','allow','print','dead','spot','desert','suit','current','lift','rose','continue','block','chart','hat','sell','success','company','subtract','event','particular','deal','swim','term','opposite','wife','shoe','shoulder','spread','arrange','camp','invent','cotton','born','determine','quart','nine','truck','noise','level','chance','gather','shop','stretch','throw','shine','property','column','molecule','select','wrong','gray','repeat','require','broad','prepare','salt','nose','plural','anger','claim','continent','oxygen','sugar','death','pretty','skill','women','season','solution','magnet','silver','thank','branch','match','suffix','especially','fig','afraid','huge','sister','steel','discuss','forward','similar','guide','experience','score','apple','bought','led','pitch','coat','mass','card','band','rope','slip','win','dream','evening','condition','feed','tool','total','basic','smell','valley','nor','double','seat','arrive','master','track','parent','shore','division','sheet','substance','favor','connect','post','spend','chord','fat','glad','original','share','station','dad','bread','charge','proper','bar','offer','segment','slave','duck','instant','market','degree','populate','chick','dear','enemy','reply','drink','occur','support','speech','nature','range','steam','motion','path','liquid','log','meant','quotient','teeth','shell','neck'];//from https://gist.github.com/deekayen/4148741\

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

	var crackSubstitution = function(str, attempts){
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
			if (attempt%100===0) console.log('attempt: '+attempt + ' current winner has a score of: ' + runningWinnerScore);
		}
		return {
			key:runningWinner,
			decoded: deSubstitute(str, runningWinner)
		};
	};

	return crackSubstitution;
}());

var toCrack = 'BT JPX RMLX PCUV AMLX ICVJP IBTWXVR CI M LMT’R PMTN, MTN YVCJX CDXV MWMBTRJ JPX AMTNGXRJBAH UQCT JPX QGMRJXV CI JPX YMGG CI JPX HBTW’R QMGMAX; MTN JPX HBTW RMY JPX QMVJ CI JPX PMTN JPMJ YVCJX. JPXT JPX HBTW’R ACUTJXTMTAX YMR APMTWXN, MTN PBR JPCUWPJR JVCUFGXN PBL, RC JPMJ JPX SCBTJR CI PBR GCBTR YXVX GCCRXN, MTN PBR HTXXR RLCJX CTX MWMBTRJ MTCJPXV. JPX HBTW AVBXN MGCUN JC FVBTW BT JPX MRJVCGCWXVR, JPX APMGNXMTR, MTN JPX RCCJPRMEXVR. MTN JPX HBTW RQMHX, MTN RMBN JC JPX YBRX LXT CI FMFEGCT, YPCRCXDXV RPMGG VXMN JPBR YVBJBTW, MTN RPCY LX JPX BTJXVQVXJMJBCT JPXVXCI, RPMGG FX AGCJPXN YBJP RAM';

console.log(crackSubstitution(toCrack, 1000).decoded);
