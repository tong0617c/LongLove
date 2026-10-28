const english='a about after again all always am an and are as at away baby back be beautiful because before best better blue book both bring but by call can care come could day dear did do dream each even every feel find first flower for forever friend from get give go good great happy have heart hello here home hope how hug i if in into is it just keep know last late learn left let life light like little live long look love make many may me mean miss moon more morning most much music my name near need never new next night no not now of off oh on once one only open or other our out over own people please rain read really remember right room say sea see she should sky sleep smile snow so some song soon star stay still story sun sweet take talk tea tell than thank that the their them then there these they thing think this those three through time to today together too tomorrow two under up us use very voice wait walk want warm was watch water way we well were what when where which white who why will wind winter wish with word work world would yes yet you your'.split(' ');
export function createKeyboardIndex(rows){
  // Sorted prefix ranges avoid retaining a large trie on mobile devices.
  const make=entries=>entries.slice().sort((a,b)=>a[0]<b[0]?-1:a[0]>b[0]?1:0);
  return {zh:make(rows),en:make(english.map(w=>[w,w]))};
}
function range(rows,prefix){const lower=value=>{let a=0,b=rows.length;while(a<b){const m=(a+b)>>>1;if(rows[m][0]<value)a=m+1;else b=m;}return a;};return [lower(prefix),lower(prefix+'{')];}
function keysFor(rows,prefix){return [...'abcdefghijklmnopqrstuvwxyz'].filter(k=>{const [a,b]=range(rows,prefix+k);return a<b;});}
function choose(a,rng){return a[Math.floor(rng()*a.length)];}
export function keyboardSession(index,{min=2,max=12,chinese=90}={},rng=Math.random){
  if(!Number.isInteger(min)||!Number.isInteger(max)||min<1||max>40||min>max)throw Error('输入词数须为 1–40，最少不能超过最多');
  const count=min+Math.floor(rng()*(max-min+1)),steps=[];let text='';
  for(let i=0;i<count;i++){
    const language=rng()*100<chinese?'zh':'en';const rows=index[language];let prefix='',candidates=[];
    for(let k=0;k<18;k++){
      const keys=keysFor(rows,prefix);if(!keys.length)break;
      const key=choose(keys,rng);prefix+=key;
      const [a,b]=range(rows,prefix),used=new Set();candidates=[];
      // Sample without replacement, including with a deterministic RNG in tests.
      for(let n=0;n<Math.min(6,b-a);n++){let j=a+Math.floor(rng()*(b-a));while(used.has(j))j=a+(j-a+1)%(b-a);used.add(j);candidates.push(rows[j][1]);}
      steps.push({kind:'key',key,prefix,candidates:[...candidates],language,text});
      if(!keysFor(rows,prefix).length||(prefix.length>=2&&rng()<.48))break;
    }
    const selected=choose(candidates,rng);if(!selected)continue;
    const gap=i?(rng()<.7?' ':rng()<.67?'，':'\n'):'';text+=gap+selected;
    steps.push({kind:'select',key:'space',prefix,candidates,selected,language,text});
  }
  return {text,steps,count};
}
