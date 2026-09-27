const state = {
  templates: JSON.parse(localStorage.getItem("wv_templates") || JSON.stringify([
    "I love you 💜","You are amazing!","So proud of you 🥹","This is beautiful ✨","ARMY forever 💜"
  ])),
  targets: [
    {name:"kimtae_love", text:"I miss you so much 💜", checked:true},
    {name:"jhopeworld", text:"This comeback is everything! 🔥", checked:true},
    {name:"armyforever", text:"You are all so talented 😭", checked:true},
    {name:"minyoongl_93", text:"Can't wait for the next album!", checked:true},
    {name:"jiminhearts", text:"You look so happy lately 💜", checked:true}
  ],
  activities: JSON.parse(localStorage.getItem("wv_activity") || "[]"),
  connected: false
};

const content = document.getElementById("content");
const toast = document.getElementById("toast");
const modalBackdrop = document.getElementById("modalBackdrop");

function save(){
  localStorage.setItem("wv_templates", JSON.stringify(state.templates));
  localStorage.setItem("wv_activity", JSON.stringify(state.activities));
}
function notify(msg){
  toast.textContent = msg; toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2400);
}
function selectedCount(){ return state.targets.filter(x=>x.checked).length; }

function activityHtml(){
  const rows = state.activities.length ? state.activities : [
    {name:"kimtae_love",comment:"I love you 💜",likes:12,time:"2m ago"},
    {name:"jhopeworld",comment:"You are amazing!",likes:8,time:"5m ago"},
    {name:"armyforever",comment:"So proud of you 🥹",likes:15,time:"7m ago"},
    {name:"minyoongl_93",comment:"Can't wait for the next album!",likes:10,time:"9m ago"},
    {name:"jiminhearts",comment:"You look so happy lately 💜",likes:7,time:"11m ago"}
  ];
  return rows.map(a=>`<div class="activity-item"><div class="mini">♡</div><div style="flex:1"><p>Your reply was posted under <strong>@${a.name}</strong>'s comment<br><strong>"${a.comment}"</strong></p><span class="success">Success</span><span class="heart">♥ ${a.likes ?? 0}</span><small style="display:block;color:#687694;margin-top:3px">${a.time||"just now"}</small></div></div>`).join("");
}

function dashboard(){
  content.innerHTML = `
    <div class="hero-title"><h1>Welcome back, ARMY! 💜</h1><p>Manage your comment targets, reply templates and activity in one place.</p></div>
    <div class="grid stats">
      <div class="stat"><div class="stat-icon">◌</div><div><small>Total Comments Posted</small><strong>${248+state.activities.length}<span class="up">↑ 12%</span></strong></div></div>
      <div class="stat"><div class="stat-icon">♥</div><div><small>Total Likes Received</small><strong>1.2K <span class="up">↑ 18%</span></strong></div></div>
      <div class="stat"><div class="stat-icon">▣</div><div><small>Total Replies</small><strong>186 <span class="up">↑ 14%</span></strong></div></div>
    </div>
    <div class="layout">
      <section class="card">
        <div style="display:flex;justify-content:space-between;align-items:center"><h3>Select Post & Comments</h3><button class="secondary" id="changePost">Change Post</button></div>
        <div class="post">
          <div class="post-head"><div class="artist">BTS</div><div><b>BTS ✓</b><small>2 hours ago</small></div></div>
          <div class="post-body">We're always so grateful for you ARMY 💜<br>What a beautiful day! Let's keep making amazing memories together ✨</div>
          <div class="post-img">BTS · ARMY</div>
        </div>
        <div class="target-title"><b style="font-size:11px">People's Comments</b><span>Select ${selectedCount()} different comments</span></div>
        ${state.targets.map((t,i)=>`<div class="target"><input class="check target-check" data-index="${i}" type="checkbox" ${t.checked?"checked":""}><div class="person">${i+1}</div><div class="target-text"><b>@${t.name}</b><span>${t.text}</span></div><span class="pill">Target ${i+1}</span></div>`).join("")}
        <button class="primary wide" id="nextStep">Next: Set Replies & Schedule →</button>
      </section>
      <aside>
        <div class="card">
          <h3>Comment Templates (5)</h3><div style="font-size:9px;color:#7f8aa5;margin-bottom:10px">These 5 comments are used in rotation.</div>
          ${state.templates.map((t,i)=>`<div class="template"><span class="num">${i+1}</span><span>${escapeHtml(t)}</span><button class="icon-btn edit-template" data-index="${i}">✎</button></div>`).join("")}
          <button class="secondary wide" id="editTemplates">Edit Templates</button>
        </div>
        <div class="card schedule-box">
          <h3>Schedule</h3><div style="font-size:9px;color:#7f8aa5">Set when the dashboard should prepare/track activity.</div>
          <div class="row"><div class="field"><label>Start time</label><input type="time" id="startTime" value="10:00"></div><div class="field"><label>Stop time</label><input type="time" id="stopTime" value="22:00"></div></div>
          <label class="toggle"><input type="checkbox" id="approval" checked> Require confirmation before posting</label>
          <button class="primary wide" id="saveSchedule">Save Schedule</button>
        </div>
        <div class="card schedule-box"><h3>Comment Type</h3><label class="toggle"><input type="radio" name="type" checked> Reply to people's comments</label><label class="toggle"><input type="radio" name="type"> Comment under post</label></div>
      </aside>
      <aside class="card activity"><div style="display:flex;justify-content:space-between"><h3>Recent Activity</h3><button class="icon-btn" id="viewAll">View All</button></div>${activityHtml()}</aside>
    </div>`;
  bindDashboard();
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

function bindDashboard(){
  document.querySelectorAll(".target-check").forEach(el=>el.onchange=()=>{state.targets[+el.dataset.index].checked=el.checked; dashboard();});
  document.getElementById("editTemplates").onclick=editTemplates;
  document.querySelectorAll(".edit-template").forEach(b=>b.onclick=()=>editOne(+b.dataset.index));
  document.getElementById("saveSchedule").onclick=()=>notify("Schedule saved locally.");
  document.getElementById("changePost").onclick=()=>notify("Demo post selector opened. Connect an authorized Weverse source to load live posts.");
  document.getElementById("nextStep").onclick=()=>{
    if(selectedCount()!==5){notify("Select exactly 5 different comments first.");return}
    showPreview();
  };
  document.getElementById("viewAll").onclick=()=>showView("activity");
}
function editTemplates(){
  document.getElementById("modalContent").innerHTML=`<h2 style="font-size:18px;margin-top:0">Edit 5 Comment Templates</h2><p class="muted" style="font-size:11px">These are saved in your browser for this starter project.</p>${state.templates.map((t,i)=>`<div class="field"><label>Comment ${i+1}</label><textarea rows="2" id="temp${i}">${escapeHtml(t)}</textarea></div>`).join("")}<button class="primary wide" id="saveTemps">Save Templates</button>`;
  modalBackdrop.hidden=false;
  document.getElementById("saveTemps").onclick=()=>{state.templates=state.templates.map((_,i)=>document.getElementById("temp"+i).value.trim()||"");save();modalBackdrop.hidden=true;dashboard();notify("Templates saved.");};
}
function editOne(i){editTemplates();}
function showPreview(){
  document.getElementById("modalContent").innerHTML=`<h2 style="font-size:18px;margin-top:0">Review before posting</h2><p class="muted" style="font-size:11px">This starter intentionally requires your confirmation. It does not log into Weverse or store your password.</p>${state.targets.filter(t=>t.checked).map((t,i)=>`<div class="target"><div class="person">${i+1}</div><div class="target-text"><b>@${t.name}</b><span>${t.text}</span></div><span class="pill">${escapeHtml(state.templates[i])}</span></div>`).join("")}<button class="primary wide" id="confirmDemo">Run Demo / Record Activity</button>`;
  modalBackdrop.hidden=false;
  document.getElementById("confirmDemo").onclick=()=>{
    state.targets.filter(t=>t.checked).forEach((t,i)=>state.activities.unshift({name:t.name,comment:state.templates[i],likes:0,time:"just now"}));
    state.activities=state.activities.slice(0,30);save();modalBackdrop.hidden=true;notify("Demo batch recorded. No live Weverse post was sent.");dashboard();
  };
}

function showView(view){
  if(view==="dashboard"){dashboard();return}
  if(view==="comments"){
    content.innerHTML=`<div class="hero-title"><h1>Create Comment</h1><p>Prepare a post comment or a reply to a selected person's comment.</p></div><div class="view-grid"><div class="card view-card"><h3>Comment under post</h3><textarea id="singleComment" rows="6" placeholder="Write your comment..."></textarea><button class="primary wide" id="saveSingle">Save Draft</button></div><div class="card view-card"><h3>Reply under person's comment</h3><select id="replyTarget">${state.targets.map(t=>`<option>@${t.name} — ${escapeHtml(t.text)}</option>`).join("")}</select><textarea rows="6" placeholder="Write your reply..." style="margin-top:10px"></textarea><button class="primary wide" id="saveReply">Save Draft</button></div></div>`;
    document.getElementById("saveSingle").onclick=()=>notify("Draft saved locally.");document.getElementById("saveReply").onclick=()=>notify("Reply draft saved locally.");return;
  }
  if(view==="targets"){
    content.innerHTML=`<div class="hero-title"><h1>Targets</h1><p>Choose up to 5 different people from the selected post in the demo workspace.</p></div><div class="card">${state.targets.map((t,i)=>`<div class="target"><input class="check target-check" data-index="${i}" type="checkbox" ${t.checked?"checked":""}><div class="person">${i+1}</div><div class="target-text"><b>@${t.name}</b><span>${escapeHtml(t.text)}</span></div><span class="pill">Target ${i+1}</span></div>`).join("")}<button class="primary wide" id="saveTargets">Save Targets</button></div>`;
    document.querySelectorAll(".target-check").forEach(el=>el.onchange=()=>state.targets[+el.dataset.index].checked=el.checked);document.getElementById("saveTargets").onclick=()=>{save();notify("Targets saved.");};return;
  }
  if(view==="schedule"){
    content.innerHTML=`<div class="hero-title"><h1>Schedule</h1><p>Configure your local dashboard schedule. Live posting requires an authorized integration.</p></div><div class="card view-card" style="max-width:620px"><div class="row"><div class="field"><label>Start</label><input type="datetime-local" value="2026-09-27T10:00"></div><div class="field"><label>Stop</label><input type="datetime-local" value="2026-09-27T22:00"></div></div><label class="toggle"><input type="checkbox" checked> Require confirmation before each live action</label><button class="primary" id="saveSchedule2">Save Schedule</button></div>`;
    document.getElementById("saveSchedule2").onclick=()=>notify("Schedule saved locally.");return;
  }
  if(view==="activity"){
    content.innerHTML=`<div class="hero-title"><h1>Activity Log</h1><p>Local demo history of actions recorded by this starter.</p></div><div class="card activity">${activityHtml()}</div>`;return;
  }
  if(view==="settings"){
    content.innerHTML=`<div class="hero-title"><h1>Settings</h1><p>Account and application preferences.</p></div><div class="view-grid"><div class="card"><h3>Weverse Account</h3><p class="muted" style="font-size:11px">Status: <b style="color:var(--green)">Demo Connected</b></p><button class="secondary" id="connectBtn">Connect / Disconnect</button><p class="muted" style="font-size:10px;margin-top:15px">This starter does not request or store your Weverse password. Replace this demo connector with an officially authorized integration when available.</p></div><div class="card"><h3>Preferences</h3><label class="toggle"><input type="checkbox" checked> Desktop notifications</label><label class="toggle"><input type="checkbox" checked> Sound notifications</label><label class="toggle"><input type="checkbox" checked> Dark mode</label></div></div>`;
    document.getElementById("connectBtn").onclick=()=>{state.connected=!state.connected;document.getElementById("connectionText").textContent=state.connected?"Demo Connected":"Not Connected";notify(state.connected?"Demo account connected.":"Demo account disconnected.");};return;
  }
}
document.querySelectorAll(".nav-item").forEach(b=>b.onclick=()=>{document.querySelectorAll(".nav-item").forEach(x=>x.classList.remove("active"));b.classList.add("active");showView(b.dataset.view);document.getElementById("sidebar").classList.remove("open");});
document.getElementById("mobileMenu").onclick=()=>document.getElementById("sidebar").classList.toggle("open");
document.getElementById("modalClose").onclick=()=>modalBackdrop.hidden=true;
modalBackdrop.onclick=e=>{if(e.target===modalBackdrop)modalBackdrop.hidden=true};
dashboard();
