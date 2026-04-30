// FocusFlow app.js v22-stable
'use strict';

const PX=1.4,HOUR_H=60*PX,TOTAL_H=24*HOUR_H,BAR_W=28,LABEL_W=34,TEXT_LEFT=LABEL_W+BAR_W+10,R=BAR_W/2;
const DAY_NAMES=['日','月','火','水','木','金','土'];
const PALETTE=['#F06E8A','#F4845A','#F5A623','#4CAF70','#5B9BD5','#A07BC8','#30B8B0','#E05C8A','#8B6F47','#607D8B'];
const LONG_PRESS_MS=280;
const ICONS=[
  {id:'study',label:'勉強',svg:c=>`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2.5" y="1.5" width="7" height="9" rx="1" stroke="${c}" stroke-width="1.3"/><line x1="4.5" y1="4" x2="7.5" y2="4" stroke="${c}" stroke-width="1" stroke-linecap="round"/><line x1="4.5" y1="6" x2="7.5" y2="6" stroke="${c}" stroke-width="1" stroke-linecap="round"/><line x1="4.5" y1="8" x2="6.5" y2="8" stroke="${c}" stroke-width="1" stroke-linecap="round"/><path d="M9.5 9L11.5 3.5L12.5 4L10.5 10L9 10.2L9.5 9Z" fill="${c}"/></svg>`},
  {id:'work',label:'仕事',svg:c=>`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="3" width="11" height="7" rx="1.2" stroke="${c}" stroke-width="1.3"/><line x1="1" y1="10" x2="13" y2="10" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/><line x1="4.5" y1="12" x2="9.5" y2="12" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/><line x1="4.5" y1="10" x2="4.5" y2="12" stroke="${c}" stroke-width="1.2" stroke-linecap="round"/><line x1="9.5" y1="10" x2="9.5" y2="12" stroke="${c}" stroke-width="1.2" stroke-linecap="round"/></svg>`},
  {id:'move',label:'移動',svg:c=>`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2.5" y="1.5" width="9" height="8.5" rx="1.5" stroke="${c}" stroke-width="1.3"/><line x1="2.5" y1="5.5" x2="11.5" y2="5.5" stroke="${c}" stroke-width="1" stroke-linecap="round"/><circle cx="4.5" cy="11.5" r="1.2" stroke="${c}" stroke-width="1.2"/><circle cx="9.5" cy="11.5" r="1.2" stroke="${c}" stroke-width="1.2"/><line x1="5.5" y1="10" x2="8.5" y2="10" stroke="${c}" stroke-width="1.1" stroke-linecap="round"/><line x1="5" y1="3.5" x2="5" y2="4.5" stroke="${c}" stroke-width="1" stroke-linecap="round"/><line x1="7" y1="3.5" x2="7" y2="4.5" stroke="${c}" stroke-width="1" stroke-linecap="round"/><line x1="9" y1="3.5" x2="9" y2="4.5" stroke="${c}" stroke-width="1" stroke-linecap="round"/></svg>`},
  {id:'hospital',label:'病院',svg:c=>`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="1.5" stroke="${c}" stroke-width="1.3"/><line x1="7" y1="4.5" x2="7" y2="9.5" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/><line x1="4.5" y1="7" x2="9.5" y2="7" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/></svg>`},
  {id:'shop',label:'買い物',svg:c=>`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 4.5h8l-1 7H4L3 4.5z" stroke="${c}" stroke-width="1.3" stroke-linejoin="round"/><path d="M5 4.5V3.5a2 2 0 014 0v1" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/></svg>`},
  {id:'chores',label:'家事',svg:c=>`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2L2 6v6h4V9h2v3h4V6L7 2z" stroke="${c}" stroke-width="1.3" stroke-linejoin="round"/></svg>`},
  {id:'active',label:'運動',svg:c=>`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="9" cy="2.5" r="1.3" fill="${c}"/><path d="M7 5.5C6 6.5 4.5 7 3 7" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/><path d="M7 5.5L8.5 8L7 11" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 5.5L9.5 4.5L11 6" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 11L5.5 12.5M7 11L8.5 12.5" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/></svg>`},
  {id:'gym',label:'筋トレ',svg:c=>`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><line x1="1.5" y1="7" x2="12.5" y2="7" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/><rect x="3" y="5" width="2" height="4" rx="0.8" stroke="${c}" stroke-width="1.2"/><rect x="9" y="5" width="2" height="4" rx="0.8" stroke="${c}" stroke-width="1.2"/><rect x="1.5" y="5.8" width="1.5" height="2.4" rx="0.6" fill="${c}"/><rect x="11" y="5.8" width="1.5" height="2.4" rx="0.6" fill="${c}"/></svg>`},
  {id:'food',label:'食事',svg:c=>`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><line x1="4.5" y1="2" x2="4.5" y2="12" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/><path d="M3 2v3.5a1.5 1.5 0 003 0V2" stroke="${c}" stroke-width="1.2" stroke-linecap="round"/><path d="M9.5 2v3c0 1 .8 1.8 1.5 1.8V12" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/></svg>`},
  {id:'cafe',label:'カフェ',svg:c=>`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5h7v4.5a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="${c}" stroke-width="1.3"/><path d="M10 6.5h1a1.5 1.5 0 010 3h-1" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/><path d="M5 3c.4-.6.8-.6.8-1.2M7.5 3c.4-.6.8-.6.8-1.2" stroke="${c}" stroke-width="1.1" stroke-linecap="round"/></svg>`},
  {id:'private',label:'プライベート',svg:c=>`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5l1.5 3.2 3.5.5-2.5 2.5.6 3.5L7 9.5l-3.1 1.7.6-3.5L2 5.2l3.5-.5L7 1.5z" fill="${c}"/></svg>`},
  {id:'other',label:'その他',svg:c=>`<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="${c}" stroke-width="1.3"/><circle cx="5" cy="7" r="0.9" fill="${c}"/><circle cx="7" cy="7" r="0.9" fill="${c}"/><circle cx="9" cy="7" r="0.9" fill="${c}"/></svg>`},
];
function iconSvg(id,c){const ic=ICONS.find(i=>i.id===id)||ICONS[ICONS.length-1];return ic.svg(c||'white');}

function save(){try{localStorage.setItem('ff_tasks',JSON.stringify(tasks));localStorage.setItem('ff_sched',JSON.stringify(schedByDate));localStorage.setItem('ff_repeat',JSON.stringify(repeatTemplates));localStorage.setItem('ff_nextId',String(nextId));}catch(e){}}
function load(){try{const t=localStorage.getItem('ff_tasks');if(t)tasks=JSON.parse(t);const s=localStorage.getItem('ff_sched');if(s)schedByDate=JSON.parse(s);const r=localStorage.getItem('ff_repeat');if(r)repeatTemplates=JSON.parse(r);const n=localStorage.getItem('ff_nextId');if(n)nextId=parseInt(n)||10;}catch(e){}}

let tasks=[
  {id:1,text:'明日のMTG準備',mins:15,color:'#F06E8A',icon:'work',repeat:'none',subtasks:[],memo:'',startH:null,startMin:null},
  {id:2,text:'店舗営業日カレンダー',mins:30,color:'#5B9BD5',icon:'work',repeat:'none',subtasks:[],memo:'',startH:9,startMin:0},
  {id:3,text:'写真撮影',mins:15,color:'#F06E8A',icon:'active',repeat:'none',subtasks:[],memo:'',startH:null,startMin:null},
  {id:4,text:'Apple Watch動画',mins:30,color:'#F4845A',icon:'private',repeat:'none',subtasks:[],memo:'',startH:14,startMin:30},
  {id:5,text:'領収書発行の準備',mins:15,color:'#A07BC8',icon:'work',repeat:'none',subtasks:[],memo:'',startH:null,startMin:null},
];
let schedByDate={},repeatTemplates=[];
let nextId=10,weekStart=getWeekStart(new Date()),currentDate=new Date();currentDate.setHours(0,0,0,0);
let currentTab='task',editTarget=null,detailTarget=null,rolloverTarget=null;
let selectedColor=PALETTE[0],selectedIcon='work',modalSubtasks=[];
let drag=null,deleteTarget=null,simpleDeleteTarget=null;

function pad(n){return n<10?'0'+n:''+n;}
function dateKey(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
function dateFromKey(k){const[y,m,d]=k.split('-').map(Number);const dt=new Date(y,m-1,d);dt.setHours(0,0,0,0);return dt;}
function currentKey(){return dateKey(currentDate);}
function topPx(h,m){return h*HOUR_H+m*PX;}
function minsLabel(m){if(m<60)return m+'分';if(m%60===0)return(m/60)+'時間';return Math.floor(m/60)+'時間'+m%60+'分';}
function endT(sh,sm,m){const t=sh*60+sm+m;return(Math.floor(t/60)%24)+':'+pad(t%60);}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function sameDay(a,b){return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();}
function today0(){const d=new Date();d.setHours(0,0,0,0);return d;}
function getWeekStart(d){const day=new Date(d);day.setHours(0,0,0,0);day.setDate(day.getDate()-day.getDay());return day;}
function changeWeek(dir){weekStart=new Date(weekStart.getTime()+dir*7*86400000);renderWeekStrip();}
function goThisWeek(){weekStart=getWeekStart(new Date());currentDate=new Date();currentDate.setHours(0,0,0,0);renderWeekStrip();redraw();updateTlLabel();}

function matchesRepeat(tmpl,d){
  if(!tmpl.repeatFromDate)return false;
  const from=dateFromKey(tmpl.repeatFromDate);if(d<from)return false;
  if((tmpl.skipDates||[]).includes(dateKey(d)))return false;
  const dow=d.getDay();
  if(tmpl.repeat==='daily')return true;if(tmpl.repeat==='weekday')return dow>=1&&dow<=5;
  if(tmpl.repeat==='weekend')return dow===0||dow===6;if(tmpl.repeat==='weekly')return(tmpl.repeatDays||[]).includes(dow);return false;
}
function currentItems(){
  const key=currentKey(),manual=schedByDate[key]||[];
  const ri=repeatTemplates.filter(t=>matchesRepeat(t,currentDate)).map(t=>({...t,id:'r'+t.id,done:false,isRepeat:true,templateId:t.id}));
  const mids=new Set(manual.map(i=>i.templateId).filter(Boolean));
  return [...manual,...ri.filter(r=>!mids.has(r.templateId))].sort((a,b)=>(a.startH*60+a.startMin)-(b.startH*60+b.startMin));
}
function findManualItem(id){for(const[,arr]of Object.entries(schedByDate)){const f=arr.find(i=>i.id===id);if(f)return f;}return null;}
function materialiseRepeat(item){const key=currentKey();if(!schedByDate[key])schedByDate[key]=[];let m=schedByDate[key].find(i=>i.templateId===item.templateId);if(!m){m={...item,id:nextId++,isRepeat:false};schedByDate[key].push(m);}return m;}

function buildUI(){
  document.getElementById('app').innerHTML=`
<div id="root" style="background:var(--bg);width:100%;height:100%;display:flex;flex-direction:column;overflow:hidden;position:relative;">
<div style="background:var(--white);border-bottom:0.5px solid var(--line);flex-shrink:0;">
  <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 14px 5px;">
    <div style="display:flex;align-items:center;gap:6px;">
      <div style="width:22px;height:22px;background:var(--pink);border-radius:6px;display:flex;align-items:center;justify-content:center;"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="white" stroke-width="1.2"/><line x1="5.5" y1="3" x2="5.5" y2="5.5" stroke="white" stroke-width="1.2" stroke-linecap="round"/><line x1="5.5" y1="5.5" x2="7.5" y2="6.8" stroke="white" stroke-width="1.2" stroke-linecap="round"/></svg></div>
      <div id="ym-label" style="font-size:14px;font-weight:700;color:var(--pink);"></div>
    </div>
    <div style="display:flex;align-items:center;gap:4px;">
      <button onclick="changeWeek(-1)" style="width:26px;height:26px;border:none;background:var(--pink-bg);border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;"><svg width="7" height="11" viewBox="0 0 7 11" fill="none"><path d="M5 1.5L2 5.5L5 9.5" stroke="var(--pink)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <button onclick="goThisWeek()" style="font-size:11px;color:var(--pink);background:var(--pink-bg);border:none;border-radius:14px;padding:4px 11px;cursor:pointer;font-weight:600;">今週</button>
      <button onclick="changeWeek(1)" style="width:26px;height:26px;border:none;background:var(--pink-bg);border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;"><svg width="7" height="11" viewBox="0 0 7 11" fill="none"><path d="M2 1.5L5 5.5L2 9.5" stroke="var(--pink)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(7,1fr);padding:0 8px 3px;" id="dow-labels"></div>
  <div style="display:grid;grid-template-columns:repeat(7,1fr);padding:0 8px 8px;" id="date-strip"></div>
</div>
<div style="display:flex;flex:1;overflow:hidden;min-height:0;">
  <div style="width:126px;min-width:126px;background:var(--white);border-right:0.5px solid var(--line);display:flex;flex-direction:column;overflow:hidden;">
    <div style="display:flex;border-bottom:0.5px solid var(--line);flex-shrink:0;">
      <button id="tab-task" onclick="switchTab('task')" style="flex:1;padding:7px 0;font-size:11px;font-weight:600;border:none;background:var(--pink-bg);color:var(--pink);cursor:pointer;">タスク</button>
      <button id="tab-done" onclick="switchTab('done')" style="flex:1;padding:7px 0;font-size:11px;font-weight:500;border:none;background:transparent;color:var(--muted);cursor:pointer;">完了</button>
    </div>
    <div id="panel-task" style="flex:1;display:flex;flex-direction:column;overflow:hidden;">
      <div id="task-list" style="flex:1;overflow-y:auto;padding:6px;"></div>
      <div style="padding:6px 7px;border-top:0.5px solid var(--line);flex-shrink:0;">
        <input id="inp-name" type="text" placeholder="タスク名..." style="width:100%;padding:5px 6px;border-radius:6px;border:0.5px solid var(--line);background:var(--pink-bg);color:var(--text);outline:none;font-size:11px;margin-bottom:4px;" onfocus="this.style.borderColor='var(--pink)'" onblur="this.style.borderColor='var(--line)'"/>
        <div style="display:flex;gap:3px;">
          <select id="inp-mins" style="flex:1;font-size:10px;background:var(--pink-bg);border:0.5px solid var(--line);border-radius:5px;color:var(--text);outline:none;padding:4px 2px;">
            <option value="5">5分</option><option value="10">10分</option><option value="15">15分</option><option value="20">20分</option><option value="30" selected>30分</option><option value="45">45分</option><option value="60">1時間</option><option value="90">1.5h</option><option value="120">2時間</option><option value="180">3時間</option><option value="240">4時間</option>
          </select>
          <button onclick="openAddModal()" style="background:var(--pink);border:none;border-radius:5px;width:26px;height:26px;display:flex;align-items:center;justify-content:center;padding:0;flex-shrink:0;"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><line x1="5" y1="1" x2="5" y2="9" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="1" y1="5" x2="9" y2="5" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></button>
        </div>
      </div>
    </div>
    <div id="panel-done" style="flex:1;overflow-y:auto;padding:6px;display:none;"></div>
  </div>
  <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;">
    <div style="padding:4px 12px;background:var(--bg);border-bottom:0.5px solid var(--line);display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <span id="tl-day-label" style="font-size:11px;color:var(--muted);"></span>
      <span id="sched-count" style="font-size:11px;color:var(--pink);background:var(--pink-bg);padding:2px 9px;border-radius:12px;">0件</span>
    </div>
    <div id="tl-scroll" style="flex:1;overflow-y:auto;padding:0 12px 60px;"><div id="tl-wrap" style="position:relative;"></div></div>
  </div>
</div>
<div id="ghost" style="position:fixed;pointer-events:none;z-index:9999;display:none;background:var(--pink);color:white;font-size:11px;font-weight:600;padding:5px 14px;border-radius:20px;white-space:nowrap;transform:translate(-50%,-50%);box-shadow:0 4px 16px rgba(240,110,138,.4);"></div>
<div id="tooltip" style="position:fixed;pointer-events:none;z-index:9998;display:none;background:rgba(26,26,26,.88);color:white;font-size:12px;font-weight:600;padding:5px 12px;border-radius:10px;white-space:nowrap;transform:translate(-50%,-140%);"></div>
<div id="edit-modal" style="display:none;position:absolute;inset:0;z-index:8000;background:rgba(0,0,0,.28);align-items:flex-start;justify-content:center;overflow-y:auto;padding:18px 12px;">
<div style="background:var(--white);border-radius:18px;padding:18px;width:100%;max-width:310px;margin:0 auto;">
  <div id="modal-title" style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:14px;"></div>
  <div style="font-size:11px;color:var(--muted);margin-bottom:4px;">タスク名</div>
  <input id="edit-name" type="text" style="width:100%;padding:8px 10px;border-radius:8px;border:0.5px solid var(--line);background:var(--pink-bg);color:var(--text);outline:none;font-size:13px;margin-bottom:12px;" onfocus="this.style.borderColor='var(--pink)'" onblur="this.style.borderColor='var(--line)'"/>
  <div style="font-size:11px;color:var(--muted);margin-bottom:4px;">開始時刻</div>
  <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;">
    <select id="edit-start-h" style="flex:1;padding:7px 6px;font-size:13px;border-radius:8px;border:0.5px solid var(--line);background:var(--pink-bg);color:var(--text);outline:none;"></select>
    <span style="color:var(--muted);font-size:15px;font-weight:600;">:</span>
    <select id="edit-start-m" style="flex:1;padding:7px 6px;font-size:13px;border-radius:8px;border:0.5px solid var(--line);background:var(--pink-bg);color:var(--text);outline:none;"></select>
    <label style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--muted);white-space:nowrap;cursor:pointer;"><input type="checkbox" id="edit-no-time" onchange="onNoTimeChange()" style="accent-color:var(--pink);width:15px;height:15px;"/>未設定</label>
  </div>
  <div style="font-size:11px;color:var(--muted);margin-bottom:4px;">所要時間</div>
  <select id="edit-mins" style="width:100%;padding:8px 10px;font-size:13px;border-radius:8px;border:0.5px solid var(--line);background:var(--pink-bg);color:var(--text);outline:none;margin-bottom:12px;">
    <option value="5">5分</option><option value="10">10分</option><option value="15">15分</option><option value="20">20分</option><option value="30">30分</option><option value="45">45分</option><option value="60">1時間</option><option value="90">1.5時間</option><option value="120">2時間</option><option value="180">3時間</option><option value="240">4時間</option>
  </select>
  <div style="font-size:11px;color:var(--muted);margin-bottom:6px;">カラー</div>
  <div id="color-picker" style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:12px;"></div>
  <div style="font-size:11px;color:var(--muted);margin-bottom:6px;">アイコン</div>
  <div id="icon-picker" style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin-bottom:12px;"></div>
  <div style="font-size:11px;color:var(--muted);margin-bottom:4px;">繰り返し</div>
  <select id="edit-repeat" onchange="onRepeatChange()" style="width:100%;padding:8px 10px;font-size:13px;border-radius:8px;border:0.5px solid var(--line);background:var(--pink-bg);color:var(--text);outline:none;margin-bottom:10px;">
    <option value="none">なし</option><option value="daily">毎日</option><option value="weekly">毎週（曜日指定）</option><option value="weekday">平日のみ（月〜金）</option><option value="weekend">土日のみ</option>
  </select>
  <div id="weekly-days" style="display:none;margin-bottom:10px;"><div style="font-size:11px;color:var(--muted);margin-bottom:4px;">曜日</div><div style="display:flex;gap:5px;" id="day-picker"></div></div>
  <div id="repeat-time-row" style="display:none;margin-bottom:12px;">
    <div style="font-size:11px;color:var(--muted);margin-bottom:4px;">繰り返し開始時刻</div>
    <div style="display:flex;gap:8px;align-items:center;">
      <select id="repeat-start-h" style="flex:1;padding:6px;font-size:13px;border-radius:8px;border:0.5px solid var(--line);background:var(--pink-bg);color:var(--text);outline:none;"></select>
      <span style="color:var(--muted);">:</span>
      <select id="repeat-start-m" style="flex:1;padding:6px;font-size:13px;border-radius:8px;border:0.5px solid var(--line);background:var(--pink-bg);color:var(--text);outline:none;"></select>
    </div>
  </div>
  <div style="font-size:11px;color:var(--muted);margin-bottom:6px;">サブタスク</div>
  <div id="subtask-list" style="margin-bottom:8px;"></div>
  <div style="display:flex;gap:5px;margin-bottom:12px;">
    <input id="subtask-inp" type="text" placeholder="サブタスクを追加..." style="flex:1;padding:6px 9px;border-radius:7px;border:0.5px solid var(--line);background:var(--pink-bg);color:var(--text);outline:none;font-size:12px;" onfocus="this.style.borderColor='var(--pink)'" onblur="this.style.borderColor='var(--line)'"/>
    <button onclick="addSubtask()" style="background:var(--pink);border:none;border-radius:7px;width:28px;height:30px;display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer;flex-shrink:0;"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><line x1="5" y1="1" x2="5" y2="9" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="1" y1="5" x2="9" y2="5" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></button>
  </div>
  <div style="font-size:11px;color:var(--muted);margin-bottom:4px;">メモ</div>
  <textarea id="edit-memo" rows="3" placeholder="メモを入力..." style="width:100%;padding:8px 10px;border-radius:8px;border:0.5px solid var(--line);background:var(--pink-bg);color:var(--text);outline:none;font-size:12px;margin-bottom:16px;" onfocus="this.style.borderColor='var(--pink)'" onblur="this.style.borderColor='var(--line)'"></textarea>
  <div style="display:flex;gap:9px;">
    <button onclick="closeEditModal()" style="flex:1;padding:9px;border-radius:10px;border:0.5px solid var(--line);background:var(--white);font-size:13px;color:var(--muted);">キャンセル</button>
    <button onclick="applyEdit()" style="flex:1;padding:9px;border-radius:10px;border:none;background:var(--pink);color:white;font-size:13px;font-weight:600;">保存</button>
  </div>
</div>
</div>
<div id="detail-panel" style="display:none;position:absolute;inset:0;z-index:7000;background:rgba(0,0,0,.22);align-items:flex-end;justify-content:center;">
<div style="background:var(--white);border-radius:20px 20px 0 0;padding:18px;width:100%;max-height:72%;overflow-y:auto;">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
    <div id="dp-title" style="font-size:15px;font-weight:600;color:var(--text);"></div>
    <button onclick="closeDetail()" style="border:none;background:transparent;font-size:20px;color:var(--muted);cursor:pointer;padding:0;">×</button>
  </div>
  <div id="dp-time" style="font-size:12px;color:var(--muted);margin-bottom:12px;"></div>
  <div id="dp-subtasks" style="margin-bottom:12px;"></div>
  <div id="dp-memo" style="font-size:12px;color:var(--text);white-space:pre-wrap;background:var(--bg);border-radius:10px;padding:10px;min-height:32px;"></div>
  <div style="display:flex;gap:9px;margin-top:14px;">
    <button id="dp-edit-btn" style="flex:1;padding:9px;border-radius:10px;border:0.5px solid var(--line);background:var(--white);font-size:12px;color:var(--text);">編集</button>
    <button id="dp-back-btn" style="flex:1;padding:9px;border-radius:10px;border:none;background:var(--pink-bg);color:var(--pink);font-size:12px;font-weight:600;">↩ 一覧に戻す</button>
    <button id="dp-del-btn" style="flex:1;padding:9px;border-radius:10px;border:none;background:#FEE;color:#E05050;font-size:12px;font-weight:600;">削除</button>
  </div>
</div>
</div>
<div id="delete-modal" style="display:none;position:absolute;inset:0;z-index:9000;background:rgba(0,0,0,.32);align-items:center;justify-content:center;">
<div style="background:var(--white);border-radius:18px;padding:20px;width:260px;">
  <div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:6px;">🔁 繰り返しタスクの削除</div>
  <div id="del-modal-name" style="font-size:12px;color:var(--muted);margin-bottom:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"></div>
  <div style="display:flex;flex-direction:column;gap:9px;">
    <button onclick="deleteOnlyToday()" style="padding:11px;border-radius:11px;border:0.5px solid var(--line);background:var(--white);font-size:12px;color:var(--text);cursor:pointer;text-align:left;"><div style="font-weight:600;margin-bottom:2px;">この日だけ削除</div><div style="font-size:11px;color:var(--muted);">他の日の繰り返しはそのまま</div></button>
    <button onclick="deleteAllRepeat()" style="padding:11px;border-radius:11px;border:none;background:#FEE;font-size:12px;color:#E05050;cursor:pointer;text-align:left;"><div style="font-weight:600;margin-bottom:2px;">すべての繰り返しを削除</div></button>
    <button onclick="closeDeleteModal()" style="padding:9px;border-radius:11px;border:0.5px solid var(--line);background:var(--white);font-size:12px;color:var(--muted);cursor:pointer;">キャンセル</button>
  </div>
</div>
</div>
<div id="simple-delete-modal" style="display:none;position:absolute;inset:0;z-index:9000;background:rgba(0,0,0,.32);align-items:center;justify-content:center;">
<div style="background:var(--white);border-radius:18px;padding:20px;width:240px;">
  <div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:6px;">タスクを削除</div>
  <div id="sdel-modal-name" style="font-size:12px;color:var(--muted);margin-bottom:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"></div>
  <div style="display:flex;gap:9px;">
    <button onclick="closeSimpleDeleteModal()" style="flex:1;padding:9px;border-radius:10px;border:0.5px solid var(--line);background:var(--white);font-size:12px;color:var(--muted);">キャンセル</button>
    <button onclick="confirmSimpleDelete()" style="flex:1;padding:9px;border-radius:10px;border:none;background:#E05050;color:white;font-size:12px;font-weight:600;">削除</button>
  </div>
</div>
</div>
<div id="rollover-modal" style="display:none;position:absolute;inset:0;z-index:8000;background:rgba(0,0,0,.28);align-items:center;justify-content:center;">
<div style="background:var(--white);border-radius:16px;padding:18px;width:220px;">
  <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:8px;">翌日に繰り越し</div>
  <div id="rollover-name" style="font-size:12px;color:var(--muted);margin-bottom:16px;"></div>
  <div style="display:flex;gap:9px;">
    <button onclick="closeRollover()" style="flex:1;padding:8px;border-radius:9px;border:0.5px solid var(--line);background:var(--white);font-size:12px;color:var(--muted);">キャンセル</button>
    <button onclick="applyRollover()" style="flex:1;padding:8px;border-radius:9px;border:none;background:var(--pink);color:white;font-size:12px;font-weight:600;">繰り越す</button>
  </div>
</div>
</div>
</div>`;
}

function renderWeekStrip(){
  const months=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  document.getElementById('ym-label').textContent=weekStart.getFullYear()+'年'+months[weekStart.getMonth()];
  const dl=document.getElementById('dow-labels');dl.innerHTML='';
  DAY_NAMES.forEach((n,i)=>{const el=document.createElement('div');el.style.cssText='text-align:center;font-size:11px;color:'+(i===0?'#E05050':i===6?'var(--pink)':'var(--muted)')+';font-weight:500;padding-bottom:2px;';el.textContent=n;dl.appendChild(el);});
  const strip=document.getElementById('date-strip');strip.innerHTML='';const td=today0();
  for(let i=0;i<7;i++){
    const d=new Date(weekStart.getTime()+i*86400000);
    const isTd=sameDay(d,td),isSel=sameDay(d,currentDate),isWe=d.getDay()===0||d.getDay()===6;
    const hasSched=(schedByDate[dateKey(d)]||[]).length>0||repeatTemplates.some(t=>matchesRepeat(t,d));
    const cell=document.createElement('div');cell.style.cssText='display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;';
    const num=document.createElement('div');num.style.cssText='width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:'+(isTd||isSel?'700':'500')+';background:'+(isSel?'var(--text)':'transparent')+';color:'+(isSel?'white':isTd?'var(--pink)':d.getDay()===0?'#E05050':isWe?'var(--pink)':'var(--text)')+';border:'+(isTd&&!isSel?'1.5px solid var(--pink)':'none')+';';num.textContent=d.getDate();
    const dot=document.createElement('div');dot.style.cssText='width:4px;height:4px;border-radius:50%;background:'+(hasSched?'var(--pink)':'transparent')+';';
    cell.appendChild(num);cell.appendChild(dot);
    cell.addEventListener('click',()=>{currentDate=new Date(d);currentDate.setHours(0,0,0,0);renderWeekStrip();redraw();updateTlLabel();});
    strip.appendChild(cell);
  }
}
function updateTlLabel(){
  const td=today0();const diff=Math.round((currentDate-td)/86400000);
  const label=diff===0?'今日':diff===1?'明日':diff===-1?'昨日':(currentDate.getMonth()+1)+'/'+currentDate.getDate()+'('+DAY_NAMES[currentDate.getDay()]+')';
  document.getElementById('tl-day-label').textContent=label+' のタイムライン';
}
function switchTab(tab){currentTab=tab;document.getElementById('panel-task').style.display=tab==='task'?'flex':'none';document.getElementById('panel-done').style.display=tab==='done'?'block':'none';['task','done'].forEach(t=>{const b=document.getElementById('tab-'+t);b.style.background=t===tab?'var(--pink-bg)':'transparent';b.style.color=t===tab?'var(--pink)':'var(--muted)';b.style.fontWeight=t===tab?'600':'500';});if(tab==='done')renderDonePanel();}
function renderDonePanel(){const panel=document.getElementById('panel-done');panel.innerHTML='';const done=[];Object.entries(schedByDate).forEach(([dk,arr])=>{arr.filter(i=>i.done).forEach(i=>done.push({...i,dateKey:dk}));});if(!done.length){panel.innerHTML='<div style="font-size:11px;color:var(--muted);text-align:center;padding:18px 0;">完了タスクなし</div>';return;}done.sort((a,b)=>(b.dateKey||'').localeCompare(a.dateKey||''));done.forEach(item=>{const el=document.createElement('div');el.style.cssText='background:var(--bg);border-radius:8px;padding:6px 7px;margin-bottom:5px;';el.innerHTML='<div style="display:flex;align-items:center;gap:5px;"><div style="width:18px;height:18px;border-radius:5px;background:'+item.color+'88;display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+iconSvg(item.icon||'other','white')+'</div><div style="flex:1;min-width:0;"><div style="font-size:11px;color:var(--muted);text-decoration:line-through;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+esc(item.text)+'</div><div style="font-size:10px;color:var(--muted);">'+item.dateKey+'</div></div><div onclick="rolloverItem(\''+item.dateKey+'\','+item.id+')" style="font-size:10px;color:var(--pink);cursor:pointer;background:var(--pink-bg);padding:3px 6px;border-radius:5px;flex-shrink:0;">繰越</div></div>';panel.appendChild(el);});}
function rolloverItem(fk,id){const arr=schedByDate[fk];if(!arr)return;const item=arr.find(i=>i.id===id);if(!item)return;rolloverTarget={fk,id};document.getElementById('rollover-name').textContent=item.text;document.getElementById('rollover-modal').style.display='flex';}
function closeRollover(){document.getElementById('rollover-modal').style.display='none';rolloverTarget=null;}
function applyRollover(){if(!rolloverTarget)return;const{fk,id}=rolloverTarget;const arr=schedByDate[fk];if(!arr)return;const idx=arr.findIndex(i=>i.id===id);if(idx<0)return;const item={...arr[idx],done:false,id:nextId++};arr.splice(idx,1);const tk=dateKey(new Date(currentDate.getTime()+86400000));if(!schedByDate[tk])schedByDate[tk]=[];schedByDate[tk].push(item);save();closeRollover();renderDonePanel();renderWeekStrip();redraw();}
function renderColorPicker(){const pk=document.getElementById('color-picker');pk.innerHTML='';PALETTE.forEach(c=>{const btn=document.createElement('div');const sel=c===selectedColor;btn.style.cssText='width:26px;height:26px;border-radius:50%;background:'+c+';cursor:pointer;border:3px solid '+(sel?'var(--text)':'transparent')+';flex-shrink:0;';btn.addEventListener('click',()=>{selectedColor=c;renderColorPicker();renderIconPicker();});pk.appendChild(btn);});}
function renderIconPicker(){const pk=document.getElementById('icon-picker');pk.innerHTML='';ICONS.forEach(ic=>{const btn=document.createElement('div');const sel=ic.id===selectedIcon;btn.style.cssText='display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;padding:5px 2px;border-radius:9px;background:'+(sel?selectedColor+'22':'transparent')+';border:1.5px solid '+(sel?selectedColor:'transparent')+';';btn.innerHTML='<div style="width:24px;height:24px;border-radius:7px;background:'+(sel?selectedColor:'var(--line)')+';display:flex;align-items:center;justify-content:center;">'+ic.svg('white')+'</div><div style="font-size:8px;color:'+(sel?selectedColor:'var(--muted)')+';text-align:center;line-height:1.2;">'+ic.label+'</div>';btn.addEventListener('click',()=>{selectedIcon=ic.id;renderIconPicker();});pk.appendChild(btn);});}
function renderModalSubtasks(){const list=document.getElementById('subtask-list');list.innerHTML='';modalSubtasks.forEach((st,i)=>{const row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:6px;margin-bottom:5px;';const chk=document.createElement('div');chk.style.cssText='width:16px;height:16px;border-radius:5px;border:1.5px solid '+(st.done?selectedColor:'#D0C8C0')+';background:'+(st.done?selectedColor:'transparent')+';display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;';if(st.done)chk.innerHTML='<svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4L3 6L7 2" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg>';chk.addEventListener('click',()=>{modalSubtasks[i].done=!modalSubtasks[i].done;renderModalSubtasks();});const lbl=document.createElement('div');lbl.style.cssText='flex:1;font-size:12px;color:'+(st.done?'var(--muted)':'var(--text)')+';'+(st.done?'text-decoration:line-through;':'');lbl.textContent=st.text;const del=document.createElement('div');del.style.cssText='width:16px;height:16px;border-radius:50%;background:rgba(0,0,0,.06);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;';del.innerHTML='<svg width="8" height="8" viewBox="0 0 8 8" fill="none"><line x1="2" y1="2" x2="6" y2="6" stroke="var(--muted)" stroke-width="1.3" stroke-linecap="round"/><line x1="6" y1="2" x2="2" y2="6" stroke="var(--muted)" stroke-width="1.3" stroke-linecap="round"/></svg>';del.addEventListener('click',()=>{modalSubtasks.splice(i,1);renderModalSubtasks();});row.appendChild(chk);row.appendChild(lbl);row.appendChild(del);list.appendChild(row);});}
function addSubtask(){const inp=document.getElementById('subtask-inp');const text=inp.value.trim();if(!text)return;modalSubtasks.push({text,done:false});inp.value='';renderModalSubtasks();}
function populateStartTimePickers(){const sh=document.getElementById('edit-start-h'),sm=document.getElementById('edit-start-m');sh.innerHTML='';sm.innerHTML='';for(let h=0;h<24;h++){const o=document.createElement('option');o.value=h;o.textContent=pad(h);sh.appendChild(o);}for(let m=0;m<60;m+=5){const o=document.createElement('option');o.value=m;o.textContent=pad(m);sm.appendChild(o);}}
function onNoTimeChange(){const noTime=document.getElementById('edit-no-time').checked;['edit-start-h','edit-start-m'].forEach(id=>{const el=document.getElementById(id);el.disabled=noTime;el.style.opacity=noTime?'0.35':'1';});}
function buildPillPath(x,y,w,h,ct,cb){const r=w/2,cx=x+r;let d='';if(ct){d+=`M ${x} ${y} A ${r} ${r} 0 0 0 ${x+w} ${y} `;if(cb)d+=`L ${x+w} ${y+h} A ${r} ${r} 0 0 0 ${x} ${y+h} Z`;else d+=`L ${x+w} ${y+h-r} A ${r} ${r} 0 0 1 ${cx} ${y+h} A ${r} ${r} 0 0 1 ${x} ${y+h-r} Z`;}else{d+=`M ${x} ${y+r} A ${r} ${r} 0 0 1 ${cx} ${y} A ${r} ${r} 0 0 1 ${x+w} ${y+r} `;if(cb)d+=`L ${x+w} ${y+h} A ${r} ${r} 0 0 0 ${x} ${y+h} Z`;else d+=`L ${x+w} ${y+h-r} A ${r} ${r} 0 0 1 ${cx} ${y+h} A ${r} ${r} 0 0 1 ${x} ${y+h-r} Z`;}return d;}
function buildTimeline(){
  const wrap=document.getElementById('tl-wrap');wrap.innerHTML='';wrap.style.cssText='position:relative;height:'+TOTAL_H+'px;';
  for(let h=0;h<=24;h++){const top=topPx(h,0);const lbl=document.createElement('div');lbl.style.cssText='position:absolute;left:0;top:'+(top-7)+'px;width:'+LABEL_W+'px;font-size:10px;color:var(--muted);font-weight:500;text-align:right;z-index:4;pointer-events:none;';lbl.textContent=pad(h)+':00';wrap.appendChild(lbl);if(h<24){const tick=document.createElement('div');tick.style.cssText='position:absolute;left:'+TEXT_LEFT+'px;right:0;top:'+top+'px;height:0.5px;background:var(--line);z-index:1;pointer-events:none;';wrap.appendChild(tick);}}
  const stem=document.createElement('div');stem.style.cssText='position:absolute;left:'+(LABEL_W+R-1)+'px;top:0;width:2px;height:'+TOTAL_H+'px;background:var(--line);border-radius:2px;z-index:1;pointer-events:none;';wrap.appendChild(stem);
  for(let h=0;h<24;h++){const dz=document.createElement('div');dz.className='dz';dz.dataset.hour=h;dz.style.cssText='position:absolute;left:'+TEXT_LEFT+'px;right:0;top:'+topPx(h,0)+'px;height:'+HOUR_H+'px;z-index:2;border-radius:8px;';wrap.appendChild(dz);}
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.id='bar-svg';svg.style.cssText='position:absolute;left:'+LABEL_W+'px;top:0;width:'+(TEXT_LEFT-LABEL_W)+'px;height:'+TOTAL_H+'px;z-index:5;overflow:visible;';svg.setAttribute('viewBox','0 0 '+(TEXT_LEFT-LABEL_W)+' '+TOTAL_H);wrap.appendChild(svg);
  const iov=document.createElement('div');iov.id='bar-iov';iov.style.cssText='position:absolute;left:'+LABEL_W+'px;top:0;width:'+(TEXT_LEFT-LABEL_W)+'px;height:'+TOTAL_H+'px;z-index:6;pointer-events:none;';wrap.appendChild(iov);
  const tl=document.createElement('div');tl.id='txt-layer';tl.style.cssText='position:absolute;left:'+TEXT_LEFT+'px;top:0;right:0;height:'+TOTAL_H+'px;z-index:3;';wrap.appendChild(tl);
}
function redraw(){renderBars();renderTexts();}
function renderBars(){
  const svg=document.getElementById('bar-svg');if(!svg)return;const iov=document.getElementById('bar-iov');if(!iov)return;svg.innerHTML='';iov.innerHTML='';
  const items=currentItems();
  function sM(i){return i.startH*60+i.startMin;}function eM(i){return sM(i)+i.mins;}
  function hasOvTop(idx){const s=sM(items[idx]);return items.some((o,j)=>j!==idx&&sM(o)<s&&eM(o)>s);}
  function hasOvBot(idx){const e=eM(items[idx]);return items.some((o,j)=>j!==idx&&sM(o)<e&&eM(o)>e);}
  items.forEach((item,idx)=>{
    const y=topPx(item.startH,item.startMin),h=Math.max(item.mins*PX,20),a=item.done?'88':'';
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',buildPillPath(0,y,BAR_W,h,hasOvTop(idx),hasOvBot(idx)));path.setAttribute('fill',item.color+a);svg.appendChild(path);
    if(h>=22){const fo=document.createElementNS('http://www.w3.org/2000/svg','foreignObject');const is=16;fo.setAttribute('x',(BAR_W-is)/2);fo.setAttribute('y',y+h/2-is/2);fo.setAttribute('width',is);fo.setAttribute('height',is);fo.style.cssText='pointer-events:none;';const div=document.createElement('div');div.style.cssText='width:'+is+'px;height:'+is+'px;border-radius:4px;background:rgba(255,255,255,.28);display:flex;align-items:center;justify-content:center;';div.innerHTML=iconSvg(item.icon,'white');fo.appendChild(div);svg.appendChild(fo);}
    const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');rect.setAttribute('x',0);rect.setAttribute('y',y+18);rect.setAttribute('width',BAR_W);rect.setAttribute('height',Math.max(h-36,4));rect.setAttribute('fill','transparent');rect.style.cssText='cursor:grab;';
    rect.addEventListener('mousedown',e=>{e.stopPropagation();e.preventDefault();startMove(e.clientY,item.id,item.startH,item.startMin);});
    rect.addEventListener('touchstart',e=>{e.stopPropagation();e.preventDefault();startMove(e.touches[0].clientY,item.id,item.startH,item.startMin);},{passive:false});
    svg.appendChild(rect);
    const th=document.createElement('div');th.style.cssText='position:absolute;left:-6px;top:'+(y-4)+'px;width:'+(BAR_W+12)+'px;height:24px;cursor:n-resize;display:flex;align-items:center;justify-content:center;pointer-events:all;z-index:10;';
    th.innerHTML='<div style="width:20px;height:5px;background:rgba(255,255,255,.8);border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,.25);"></div>';
    th.addEventListener('mousedown',e=>{e.stopPropagation();e.preventDefault();startResizeTop(e.clientY,item.id,item.startH,item.startMin,item.mins);});
    th.addEventListener('touchstart',e=>{e.stopPropagation();e.preventDefault();startResizeTop(e.touches[0].clientY,item.id,item.startH,item.startMin,item.mins);},{passive:false});iov.appendChild(th);
    const bh=document.createElement('div');bh.style.cssText='position:absolute;left:-6px;top:'+(y+h-20)+'px;width:'+(BAR_W+12)+'px;height:24px;cursor:s-resize;display:flex;align-items:center;justify-content:center;pointer-events:all;z-index:10;';
    bh.innerHTML='<div style="width:20px;height:5px;background:rgba(255,255,255,.8);border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,.25);"></div>';
    bh.addEventListener('mousedown',e=>{e.stopPropagation();e.preventDefault();startResizeBot(e.clientY,item.id,item.mins);});
    bh.addEventListener('touchstart',e=>{e.stopPropagation();e.preventDefault();startResizeBot(e.touches[0].clientY,item.id,item.mins);},{passive:false});iov.appendChild(bh);
  });
  const n=new Date(),td=today0();if(sameDay(currentDate,td)){const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');dot.setAttribute('cx',R);dot.setAttribute('cy',topPx(n.getHours(),n.getMinutes()));dot.setAttribute('r',5);dot.setAttribute('fill','var(--pink)');dot.setAttribute('stroke','white');dot.setAttribute('stroke-width','2');dot.style.pointerEvents='none';svg.appendChild(dot);}
}
function renderTexts(){
  const layer=document.getElementById('txt-layer');if(!layer)return;layer.innerHTML='';
  const items=currentItems();document.getElementById('sched-count').textContent=items.length+'件';
  const n=new Date(),td=today0();if(sameDay(currentDate,td)){const nl=document.createElement('div');nl.style.cssText='position:absolute;left:0;right:0;top:'+topPx(n.getHours(),n.getMinutes())+'px;height:1px;background:var(--pink);opacity:.3;z-index:1;pointer-events:none;';layer.appendChild(nl);}
  items.forEach((item,idx)=>{
    const barTop=topPx(item.startH,item.startMin),barH=Math.max(item.mins*PX,20);
    const et=endT(item.startH,item.startMin,item.mins),tr=item.startH+':'+pad(item.startMin)+'〜'+et;
    const isShort=barH<30,showBadge=item.isRepeat||item.hasRepeatBadge;
    const rb=showBadge?'<span style="font-size:10px;margin-left:2px;">🔁</span>':'';
    const hasSub=(item.subtasks||[]).length>0,hasMemo=item.memo&&item.memo.trim();
    const row=document.createElement('div');row.style.cssText='position:absolute;left:0;right:0;top:'+barTop+'px;height:'+barH+'px;display:flex;align-items:center;gap:3px;padding:0 4px 0 8px;overflow:visible;';
    const txt=document.createElement('div');txt.style.cssText='flex:1;min-width:0;user-select:none;-webkit-user-select:none;';
    if(isShort){txt.innerHTML='<div style="display:flex;align-items:center;gap:3px;white-space:nowrap;"><span style="font-size:11px;font-weight:600;color:'+(item.done?'var(--muted)':'var(--text)')+';'+(item.done?'text-decoration:line-through;':'')+';overflow:hidden;text-overflow:ellipsis;max-width:80px;">'+esc(item.text)+'</span>'+rb+'<span style="font-size:9px;color:'+item.color+';flex-shrink:0;">'+tr+'</span></div>';}
    else{txt.innerHTML='<div style="font-size:9px;color:'+item.color+';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+tr+rb+'</div><div style="font-size:12px;font-weight:600;color:'+(item.done?'var(--muted)':'var(--text)')+';line-height:1.3;'+(item.done?'text-decoration:line-through;':'')+';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+esc(item.text)+'</div>'+(hasSub||hasMemo?'<div style="display:flex;gap:4px;margin-top:1px;">'+(hasSub?'<span style="font-size:9px;color:var(--muted);">📋'+item.subtasks.length+'</span>':'')+(hasMemo?'<span style="font-size:9px;color:var(--muted);">📝</span>':'')+'</div>':'');}
    let lpTimer=null,lpFired=false,lpSX=0,lpSY=0;
    txt.addEventListener('touchstart',e=>{lpFired=false;lpSX=e.touches[0].clientX;lpSY=e.touches[0].clientY;lpTimer=setTimeout(()=>{lpFired=true;txt.style.opacity='.7';startMove(lpSY,item.id,item.startH,item.startMin);},LONG_PRESS_MS);},{passive:true});
    txt.addEventListener('touchmove',e=>{if(!lpFired){const dx=e.touches[0].clientX-lpSX,dy=e.touches[0].clientY-lpSY;if(Math.sqrt(dx*dx+dy*dy)>6)clearTimeout(lpTimer);}},{passive:true});
    txt.addEventListener('touchend',()=>{clearTimeout(lpTimer);txt.style.opacity='';if(!lpFired)openDetail(idx);},{passive:true});
    txt.addEventListener('click',()=>{if(!lpFired)openDetail(idx);});
    const acts=document.createElement('div');acts.style.cssText='display:flex;gap:2px;align-items:center;flex-shrink:0;';
    const chk=document.createElement('div');chk.style.cssText='width:20px;height:20px;border-radius:50%;border:1.5px solid '+(item.done?item.color:'#D0C8C0')+';background:'+(item.done?item.color:'transparent')+';display:flex;align-items:center;justify-content:center;cursor:pointer;';
    if(item.done)chk.innerHTML='<svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 4.5L3.5 7L8 2" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>';
    chk.addEventListener('click',()=>{if(!item.isRepeat){item.done=!item.done;}else{const key=currentKey();if(!schedByDate[key])schedByDate[key]=[];let m=schedByDate[key].find(i=>i.templateId===item.templateId);if(m){m.done=!m.done;}else{schedByDate[key].push({...item,id:nextId++,done:true,isRepeat:false});}}save();redraw();});
    if(!item.isRepeat){const back=document.createElement('div');back.style.cssText='width:20px;height:20px;border-radius:50%;background:var(--pink-bg);display:flex;align-items:center;justify-content:center;cursor:pointer;';back.innerHTML='<svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M9 5A4 4 0 105.3 1.3" stroke="var(--pink)" stroke-width="1.3" stroke-linecap="round"/><path d="M5 1l.5 2.5L3 4" stroke="var(--pink)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';back.addEventListener('click',()=>returnToList(idx));acts.appendChild(chk);acts.appendChild(back);}else{acts.appendChild(chk);}
    row.appendChild(txt);row.appendChild(acts);layer.appendChild(row);
  });
}
function openDetail(idx){
  const item=currentItems()[idx];if(!item)return;detailTarget=idx;
  document.getElementById('dp-title').textContent=item.text;
  document.getElementById('dp-time').textContent=item.startH+':'+pad(item.startMin)+' 〜 '+endT(item.startH,item.startMin,item.mins)+' （'+minsLabel(item.mins)+'）';
  const subEl=document.getElementById('dp-subtasks');subEl.innerHTML='';
  (item.subtasks||[]).forEach((st,si)=>{const row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:7px;margin-bottom:6px;';const chk=document.createElement('div');chk.style.cssText='width:16px;height:16px;border-radius:5px;border:1.5px solid '+(st.done?item.color:'#D0C8C0')+';background:'+(st.done?item.color:'transparent')+';display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;';if(st.done)chk.innerHTML='<svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4L3 6L7 2" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg>';chk.addEventListener('click',()=>{item.subtasks[si].done=!item.subtasks[si].done;save();openDetail(idx);redraw();});const lbl=document.createElement('div');lbl.style.cssText='font-size:12px;color:'+(st.done?'var(--muted)':'var(--text)')+';'+(st.done?'text-decoration:line-through;':'');lbl.textContent=st.text;row.appendChild(chk);row.appendChild(lbl);subEl.appendChild(row);});
  const memoEl=document.getElementById('dp-memo');memoEl.textContent=item.memo||'';memoEl.style.color=item.memo?'var(--text)':'var(--muted)';if(!item.memo)memoEl.textContent='メモなし';
  document.getElementById('dp-edit-btn').onclick=()=>{closeDetail();openEditModal('sched',null,idx);};
  const bb=document.getElementById('dp-back-btn');if(item.isRepeat){bb.style.display='none';}else{bb.style.display='';bb.onclick=()=>returnToList(idx);}
  document.getElementById('dp-del-btn').onclick=()=>{closeDetail();requestDelete(idx);};
  document.getElementById('detail-panel').style.display='flex';
}
function closeDetail(){document.getElementById('detail-panel').style.display='none';detailTarget=null;}
function returnToList(idx){const item=currentItems()[idx];if(!item||item.isRepeat)return;const key=currentKey();schedByDate[key]=(schedByDate[key]||[]).filter(i=>i.id!==item.id);tasks.push({id:nextId++,text:item.text,mins:item.mins,color:item.color,icon:item.icon||'other',repeat:'none',subtasks:item.subtasks||[],memo:item.memo||'',startH:item.startH??null,startMin:item.startMin??null});save();closeDetail();renderTasks();redraw();renderWeekStrip();}
function requestDelete(idx){const item=currentItems()[idx];if(!item)return;if(item.isRepeat||(item.hasRepeatBadge&&item.templateId)){deleteTarget={idx,item};document.getElementById('del-modal-name').textContent=item.text;document.getElementById('delete-modal').style.display='flex';}else{simpleDeleteTarget={type:'sched',idx,item};document.getElementById('sdel-modal-name').textContent=item.text;document.getElementById('simple-delete-modal').style.display='flex';}}
function closeDeleteModal(){document.getElementById('delete-modal').style.display='none';deleteTarget=null;}
function deleteOnlyToday(){if(!deleteTarget)return;const{item}=deleteTarget;const key=currentKey();if(item.isRepeat){const tmpl=repeatTemplates.find(t=>t.id===item.templateId);if(tmpl){if(!tmpl.skipDates)tmpl.skipDates=[];tmpl.skipDates.push(key);}if(schedByDate[key])schedByDate[key]=(schedByDate[key]||[]).filter(i=>i.templateId!==item.templateId);}else{if(schedByDate[key])schedByDate[key]=(schedByDate[key]||[]).filter(i=>i.id!==item.id);if(item.hasRepeatBadge&&item.templateId){const tmpl=repeatTemplates.find(t=>t.id===item.templateId);if(tmpl){if(!tmpl.skipDates)tmpl.skipDates=[];tmpl.skipDates.push(key);}}}save();closeDeleteModal();closeDetail();renderTasks();redraw();renderWeekStrip();}
function deleteAllRepeat(){if(!deleteTarget)return;const{item}=deleteTarget;const tid=item.templateId||item.id;repeatTemplates=repeatTemplates.filter(t=>t.id!==tid);Object.keys(schedByDate).forEach(k=>{schedByDate[k]=(schedByDate[k]||[]).filter(i=>i.templateId!==tid);});const key=currentKey();if(schedByDate[key])schedByDate[key]=(schedByDate[key]||[]).filter(i=>i.id!==item.id);save();closeDeleteModal();closeDetail();renderTasks();redraw();renderWeekStrip();}
function requestSimpleDelete(type,id,idx){let name='';if(type==='task'){const t=tasks.find(t=>t.id===id);if(!t)return;name=t.text;}else{const items=currentItems();const item=items[idx];if(!item)return;name=item.text;}simpleDeleteTarget={type,id,idx};document.getElementById('sdel-modal-name').textContent=name;document.getElementById('simple-delete-modal').style.display='flex';}
function closeSimpleDeleteModal(){document.getElementById('simple-delete-modal').style.display='none';simpleDeleteTarget=null;}
function confirmSimpleDelete(){if(!simpleDeleteTarget)return;const{type,id,idx}=simpleDeleteTarget;if(type==='task'){tasks=tasks.filter(t=>t.id!==id);save();renderTasks();}else if(type==='sched'){const item=currentItems()[idx];if(!item)return;const key=currentKey();schedByDate[key]=(schedByDate[key]||[]).filter(i=>i.id!==item.id);save();renderTasks();redraw();renderWeekStrip();}closeSimpleDeleteModal();closeDetail();}
function startMove(cy,itemId,sh,sm){drag={type:'move',itemId,startY:cy,startMin:sh*60+sm};addDL();}
function startResizeTop(cy,itemId,sh,sm,mins){drag={type:'resizeTop',itemId,startY:cy,startTotal:sh*60+sm,startMins:mins};addDL();}
function startResizeBot(cy,itemId,mins){drag={type:'resizeBot',itemId,startY:cy,startMins:mins};addDL();}
function addDL(){document.addEventListener('mousemove',onDM);document.addEventListener('mouseup',onDU);document.addEventListener('touchmove',onDT,{passive:false});document.addEventListener('touchend',onDU);}
function onDM(e){doD(e.clientX,e.clientY);}function onDT(e){e.preventDefault();doD(e.touches[0].clientX,e.touches[0].clientY);}
function doD(x,y){if(!drag||drag.type==='schedule')return;const allItems=currentItems();const item=allItems.find(i=>i.id===drag.itemId||(i.isRepeat&&'r'+i.templateId===String(drag.itemId)));if(!item)return;const mi=item.isRepeat?materialiseRepeat(item):findManualItem(item.id);if(!mi)return;if(drag.type==='move'){const dm=Math.round((y-drag.startY)/PX/5)*5;const nm=Math.max(0,Math.min(24*60-mi.mins,drag.startMin+dm));mi.startH=Math.floor(nm/60);mi.startMin=nm%60;showTip(x,y,mi.startH+':'+pad(mi.startMin));}else if(drag.type==='resizeTop'){const dm=Math.round((y-drag.startY)/PX/5)*5;const ns=Math.max(0,Math.min(drag.startTotal+drag.startMins-5,drag.startTotal+dm));mi.startH=Math.floor(ns/60);mi.startMin=ns%60;mi.mins=Math.max(5,drag.startMins-(ns-drag.startTotal));showTip(x,y,mi.startH+':'+pad(mi.startMin));}else if(drag.type==='resizeBot'){const dm=Math.round((y-drag.startY)/PX/5)*5;const mx=24*60-(mi.startH*60+mi.startMin);mi.mins=Math.max(5,Math.min(mx,drag.startMins+dm));showTip(x,y,endT(mi.startH,mi.startMin,mi.mins));}redraw();}
function onDU(){drag=null;hideTip();save();document.removeEventListener('mousemove',onDM);document.removeEventListener('mouseup',onDU);document.removeEventListener('touchmove',onDT);document.removeEventListener('touchend',onDU);}
function startDrag(e,id){e.preventDefault();initSD(id,e.clientX,e.clientY);document.addEventListener('mousemove',onSD);document.addEventListener('mouseup',onSDU);}
function startDragT(e,id){e.preventDefault();initSD(id,e.touches[0].clientX,e.touches[0].clientY);document.addEventListener('touchmove',onSDT,{passive:false});document.addEventListener('touchend',onSDTU);}
function initSD(id,x,y){drag={type:'schedule',taskId:id};const t=tasks.find(t=>t.id===id);if(!t)return;const g=document.getElementById('ghost');g.textContent=t.text;g.style.display='block';g.style.left=x+'px';g.style.top=y+'px';}
function onSD(e){mvG(e.clientX,e.clientY);}function onSDT(e){e.preventDefault();mvG(e.touches[0].clientX,e.touches[0].clientY);}
function mvG(x,y){const g=document.getElementById('ghost');g.style.left=x+'px';g.style.top=y+'px';document.querySelectorAll('.dz').forEach(z=>{const r=z.getBoundingClientRect();z.style.background=(x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom)?'rgba(240,110,138,.15)':''});}
function onSDU(e){endSD(e.clientX,e.clientY);document.removeEventListener('mousemove',onSD);document.removeEventListener('mouseup',onSDU);}
function onSDTU(e){const t=e.changedTouches[0];endSD(t.clientX,t.clientY);document.removeEventListener('touchmove',onSDT);document.removeEventListener('touchend',onSDTU);}
function endSD(x,y){document.getElementById('ghost').style.display='none';document.querySelectorAll('.dz').forEach(z=>{const r=z.getBoundingClientRect();if(x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom)dropOn(parseInt(z.dataset.hour));z.style.background='';});drag=null;}
function dropOn(h){if(!drag||drag.type!=='schedule')return;const t=tasks.find(t=>t.id===drag.taskId);if(!t)return;const key=currentKey();if(!schedByDate[key])schedByDate[key]=[];const useH=(t.startH!==null&&t.startH!==undefined)?t.startH:h;const useM=(t.startMin!==null&&t.startMin!==undefined)?t.startMin:0;schedByDate[key].push({id:nextId++,text:t.text,mins:t.mins,color:t.color,icon:t.icon||'other',done:false,startH:useH,startMin:useM,repeat:'none',subtasks:JSON.parse(JSON.stringify(t.subtasks||[])),memo:t.memo||''});tasks=tasks.filter(t=>t.id!==drag.taskId);drag=null;save();renderTasks();redraw();renderWeekStrip();document.getElementById('tl-scroll').scrollTo({top:Math.max(0,topPx(useH,useM)-80),behavior:'smooth'});}
function showTip(x,y,t){const tt=document.getElementById('tooltip');tt.textContent=t;tt.style.display='block';tt.style.left=x+'px';tt.style.top=y+'px';}
function hideTip(){document.getElementById('tooltip').style.display='none';}
function populateTimePickers(){const hs=document.getElementById('repeat-start-h'),ms=document.getElementById('repeat-start-m');hs.innerHTML='';ms.innerHTML='';for(let h=0;h<24;h++){const o=document.createElement('option');o.value=h;o.textContent=pad(h);hs.appendChild(o);}for(let m=0;m<60;m+=5){const o=document.createElement('option');o.value=m;o.textContent=pad(m);ms.appendChild(o);}}
function populateDayPicker(sel){const pk=document.getElementById('day-picker');pk.innerHTML='';DAY_NAMES.forEach((name,i)=>{const btn=document.createElement('div');const s=(sel||[]).includes(i);btn.dataset.dow=i;btn.style.cssText='width:26px;height:26px;border-radius:50%;border:1.5px solid '+(s?'var(--pink)':'var(--line)')+';background:'+(s?'var(--pink-bg)':'transparent')+';display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:11px;font-weight:500;color:'+(s?'var(--pink)':'var(--muted)')+';';btn.textContent=name;btn.addEventListener('click',()=>{const on=btn.style.border.includes('var(--pink)');btn.style.border='1.5px solid '+(on?'var(--line)':'var(--pink)');btn.style.background=on?'transparent':'var(--pink-bg)';btn.style.color=on?'var(--muted)':'var(--pink)';});pk.appendChild(btn);});}
function getSelectedDays(){const d=[];document.getElementById('day-picker').querySelectorAll('div').forEach(b=>{if(b.style.border&&b.style.border.includes('var(--pink)'))d.push(parseInt(b.dataset.dow));});return d;}
function onRepeatChange(){const v=document.getElementById('edit-repeat').value;document.getElementById('weekly-days').style.display=v==='weekly'?'block':'none';document.getElementById('repeat-time-row').style.display=v!=='none'?'block':'none';}
function openAddModal(){editTarget={type:'new'};document.getElementById('modal-title').textContent='タスクを追加';document.getElementById('edit-name').value=document.getElementById('inp-name').value.trim();document.getElementById('edit-mins').value=document.getElementById('inp-mins').value;document.getElementById('edit-repeat').value='none';onRepeatChange();selectedColor=PALETTE[0];selectedIcon='work';modalSubtasks=[];renderColorPicker();renderIconPicker();renderModalSubtasks();document.getElementById('edit-memo').value='';populateDayPicker([]);populateTimePickers();const now=new Date();document.getElementById('edit-start-h').value=now.getHours();document.getElementById('edit-start-m').value=Math.floor(now.getMinutes()/5)*5;document.getElementById('edit-no-time').checked=true;onNoTimeChange();document.getElementById('edit-modal').style.display='flex';}
function openEditModal(type,id,idx){let item;if(type==='task')item=tasks.find(t=>t.id===id);else if(type==='repeat')item=repeatTemplates.find(t=>t.id===id);else{const arr=currentItems();item=arr[idx];}if(!item)return;editTarget={type,id,idx};document.getElementById('modal-title').textContent='タスクを編集';document.getElementById('edit-name').value=item.text;const opts=[5,10,15,20,30,45,60,90,120,180,240];document.getElementById('edit-mins').value=opts.reduce((a,b)=>Math.abs(b-item.mins)<Math.abs(a-item.mins)?b:a);document.getElementById('edit-repeat').value=item.repeat||'none';onRepeatChange();selectedColor=item.color||PALETTE[0];selectedIcon=item.icon||'work';modalSubtasks=JSON.parse(JSON.stringify(item.subtasks||[]));renderColorPicker();renderIconPicker();renderModalSubtasks();document.getElementById('edit-memo').value=item.memo||'';populateDayPicker(item.repeatDays||[]);populateTimePickers();if(item.startH!==undefined&&item.startH!==null){document.getElementById('repeat-start-h').value=item.startH;document.getElementById('repeat-start-m').value=item.startMin||0;}const hasStart=item.startH!==null&&item.startH!==undefined;document.getElementById('edit-no-time').checked=!hasStart;document.getElementById('edit-start-h').value=hasStart?item.startH:new Date().getHours();document.getElementById('edit-start-m').value=hasStart?(item.startMin||0):0;onNoTimeChange();document.getElementById('edit-modal').style.display='flex';}
function closeEditModal(){document.getElementById('edit-modal').style.display='none';editTarget=null;}
function applyEdit(){if(!editTarget)return;const name=document.getElementById('edit-name').value.trim();if(!name)return;const mins=parseInt(document.getElementById('edit-mins').value)||30;const repeat=document.getElementById('edit-repeat').value,repeatDays=repeat==='weekly'?getSelectedDays():[];const rStartH=parseInt(document.getElementById('repeat-start-h').value)||0,rStartM=parseInt(document.getElementById('repeat-start-m').value)||0;const memo=document.getElementById('edit-memo').value,color=selectedColor,icon=selectedIcon;const subtasks=JSON.parse(JSON.stringify(modalSubtasks));const noTime=document.getElementById('edit-no-time').checked;const startH=noTime?null:parseInt(document.getElementById('edit-start-h').value);const startMin=noTime?null:parseInt(document.getElementById('edit-start-m').value)||0;if(editTarget.type==='new'){if(repeat!=='none')repeatTemplates.push({id:nextId++,text:name,mins,color,icon,repeat,repeatDays,startH:rStartH,startMin:rStartM,subtasks,memo,repeatFromDate:currentKey()});else{tasks.push({id:nextId++,text:name,mins,color,icon,repeat:'none',subtasks,memo,startH,startMin});document.getElementById('inp-name').value='';}}else if(editTarget.type==='task'){const t=tasks.find(t=>t.id===editTarget.id);if(t){t.text=name;t.mins=mins;t.color=color;t.icon=icon;t.subtasks=subtasks;t.memo=memo;t.startH=startH;t.startMin=startMin;}if(repeat!=='none'){repeatTemplates.push({id:nextId++,text:name,mins,color,icon,repeat,repeatDays,startH:rStartH,startMin:rStartM,subtasks,memo,repeatFromDate:currentKey()});tasks=tasks.filter(t=>t.id!==editTarget.id);}}else if(editTarget.type==='repeat'){const tmpl=repeatTemplates.find(t=>t.id===editTarget.id);if(tmpl){tmpl.text=name;tmpl.mins=mins;tmpl.color=color;tmpl.icon=icon;tmpl.subtasks=subtasks;tmpl.memo=memo;tmpl.repeat=repeat;tmpl.repeatDays=repeatDays;tmpl.startH=rStartH;tmpl.startMin=rStartM;}}else if(editTarget.type==='sched'){const items=currentItems();const srcItem=items[editTarget.idx];if(srcItem&&!srcItem.isRepeat){const mItem=findManualItem(srcItem.id);if(mItem){mItem.text=name;mItem.mins=mins;mItem.color=color;mItem.icon=icon;mItem.subtasks=subtasks;mItem.memo=memo;if(!noTime){mItem.startH=startH;mItem.startMin=startMin;}if(repeat!=='none')mItem.hasRepeatBadge=true;}}else if(srcItem&&srcItem.isRepeat){const mItem=materialiseRepeat(srcItem);if(mItem){mItem.text=name;mItem.mins=mins;mItem.color=color;mItem.icon=icon;mItem.subtasks=subtasks;mItem.memo=memo;}}if(repeat!=='none'){const tomorrow=new Date(currentDate.getTime()+86400000);const src=items[editTarget.idx];repeatTemplates.push({id:nextId++,text:name,mins,color,icon,repeat,repeatDays,startH:src?src.startH:rStartH,startMin:src?src.startMin:rStartM,subtasks,memo,repeatFromDate:dateKey(tomorrow)});}}save();renderTasks();redraw();renderWeekStrip();closeEditModal();}
function repeatLabel(t){if(t.repeat==='daily')return'毎日';if(t.repeat==='weekday')return'平日';if(t.repeat==='weekend')return'土日';if(t.repeat==='weekly')return'毎週'+(t.repeatDays||[]).map(d=>DAY_NAMES[d]).join('・');return'';}
function renderTasks(){
  const list=document.getElementById('task-list');list.innerHTML='';
  if(!tasks.length&&!repeatTemplates.length){list.innerHTML='<div style="font-size:11px;color:var(--muted);text-align:center;padding:14px 0;">タスクなし</div>';return;}
  tasks.forEach(t=>{
    const el=document.createElement('div');el.style.cssText='background:var(--bg);border-radius:8px;padding:6px;margin-bottom:5px;cursor:grab;user-select:none;touch-action:none;';
    const hasSub=(t.subtasks||[]).length>0,hasMemo=t.memo&&t.memo.trim();
    const tl=(t.startH!==null&&t.startH!==undefined)?'<span style="font-size:9px;color:var(--pink);background:var(--pink-bg);padding:1px 4px;border-radius:4px;">'+pad(t.startH)+':'+pad(t.startMin||0)+'</span>':'';
    el.innerHTML='<div style="display:flex;align-items:center;gap:5px;"><div style="width:22px;height:22px;border-radius:6px;background:'+t.color+';display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+iconSvg(t.icon||'other','white')+'</div><div style="flex:1;min-width:0;"><div style="font-size:11px;font-weight:500;color:var(--text);line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+esc(t.text)+'</div><div style="display:flex;gap:3px;align-items:center;flex-wrap:wrap;"><span style="font-size:10px;color:var(--muted);">'+minsLabel(t.mins)+'</span>'+tl+(hasSub?'<span style="font-size:10px;color:var(--muted);">📋'+t.subtasks.length+'</span>':'')+(hasMemo?'<span style="font-size:10px;color:var(--muted);">📝</span>':'')+'</div></div><div style="display:flex;gap:3px;flex-shrink:0;"><div data-edit="1" style="width:18px;height:18px;border-radius:5px;background:var(--pink-bg);display:flex;align-items:center;justify-content:center;cursor:pointer;"><svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 8L5.5 2L7.5 4L3 9H1V8Z" fill="var(--pink)"/></svg></div><div data-del="1" style="width:18px;height:18px;border-radius:5px;background:#FEE;display:flex;align-items:center;justify-content:center;cursor:pointer;"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><line x1="2" y1="2" x2="8" y2="8" stroke="#E05050" stroke-width="1.5" stroke-linecap="round"/><line x1="8" y1="2" x2="2" y2="8" stroke="#E05050" stroke-width="1.5" stroke-linecap="round"/></svg></div></div></div>';
    el.querySelector('[data-edit]').addEventListener('click',e=>{e.stopPropagation();openEditModal('task',t.id,null);});
    el.querySelector('[data-del]').addEventListener('click',e=>{e.stopPropagation();requestSimpleDelete('task',t.id,null);});
    el.addEventListener('mousedown',e=>{if(e.target.closest('[data-edit],[data-del]'))return;startDrag(e,t.id);});
    el.addEventListener('touchstart',e=>{if(e.target.closest('[data-edit],[data-del]'))return;startDragT(e,t.id);},{passive:false});
    list.appendChild(el);
  });
  if(repeatTemplates.length){
    const hdr=document.createElement('div');hdr.style.cssText='font-size:10px;color:var(--muted);padding:6px 3px 3px;font-weight:600;';hdr.innerHTML='🔁 繰り返し';list.appendChild(hdr);
    repeatTemplates.forEach(t=>{
      const el=document.createElement('div');el.style.cssText='background:var(--pink-bg);border-radius:8px;padding:5px 6px;margin-bottom:4px;';
      el.innerHTML='<div style="display:flex;align-items:center;gap:4px;"><div style="width:18px;height:18px;border-radius:5px;background:'+t.color+';display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+iconSvg(t.icon,'white')+'</div><div style="flex:1;min-width:0;"><div style="font-size:11px;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+esc(t.text)+'</div><div style="font-size:10px;color:var(--pink);">'+repeatLabel(t)+'</div></div><div style="display:flex;gap:3px;flex-shrink:0;"><div data-er="'+t.id+'" style="width:18px;height:18px;border-radius:5px;background:rgba(240,110,138,.15);display:flex;align-items:center;justify-content:center;cursor:pointer;"><svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 8L5.5 2L7.5 4L3 9H1V8Z" fill="var(--pink)"/></svg></div><div data-dr="'+t.id+'" style="width:18px;height:18px;border-radius:5px;background:#FEE;display:flex;align-items:center;justify-content:center;cursor:pointer;"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><line x1="2" y1="2" x2="8" y2="8" stroke="#E05050" stroke-width="1.5" stroke-linecap="round"/><line x1="8" y1="2" x2="2" y2="8" stroke="#E05050" stroke-width="1.5" stroke-linecap="round"/></svg></div></div></div>';
      el.querySelector('[data-er]').addEventListener('click',e=>{e.stopPropagation();openEditModal('repeat',t.id,null);});
      el.querySelector('[data-dr]').addEventListener('click',e=>{e.stopPropagation();deleteTarget={idx:null,item:{isRepeat:true,templateId:t.id,text:t.text}};document.getElementById('del-modal-name').textContent=t.text;document.getElementById('delete-modal').style.display='flex';});
      list.appendChild(el);
    });
  }
}
function init(){
  load();buildUI();
  document.getElementById('inp-name').addEventListener('keydown',e=>{if(e.key==='Enter')openAddModal();});
  document.getElementById('subtask-inp').addEventListener('keydown',e=>{if(e.key==='Enter')addSubtask();});
  document.getElementById('edit-modal').addEventListener('click',e=>{if(e.target===document.getElementById('edit-modal'))closeEditModal();});
  document.getElementById('detail-panel').addEventListener('click',e=>{if(e.target===document.getElementById('detail-panel'))closeDetail();});
  document.getElementById('delete-modal').addEventListener('click',e=>{if(e.target===document.getElementById('delete-modal'))closeDeleteModal();});
  document.getElementById('simple-delete-modal').addEventListener('click',e=>{if(e.target===document.getElementById('simple-delete-modal'))closeSimpleDeleteModal();});
  document.getElementById('rollover-modal').addEventListener('click',e=>{if(e.target===document.getElementById('rollover-modal'))closeRollover();});
  populateStartTimePickers();populateTimePickers();renderWeekStrip();buildTimeline();renderTasks();redraw();updateTlLabel();
  setTimeout(()=>{document.getElementById('tl-scroll').scrollTo({top:Math.max(0,topPx(new Date().getHours(),0)-80),behavior:'smooth'});},200);
  setInterval(()=>{redraw();},60000);
}
if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('./sw.js').catch(()=>{});});}
document.addEventListener('DOMContentLoaded',init);
