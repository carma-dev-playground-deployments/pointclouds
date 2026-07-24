import{j as e}from"./jsx-runtime-DNp_qQjF.js";import{r as v}from"./index-CSJjS6Ct.js";import{F as be,c as ue,P as ie,a as Fe,b as Le}from"./PointColorizer-D8aM4ueM.js";import{S as Ie,a as ve,P as Ue}from"./StandalonePointCloudViewer-ghszwg2J.js";import{F as ee,e as Ve,g as je,h as Ee,i as Re,j as De}from"./DRACOLoader-DFzQRO_0.js";import{V as h,c as le,Q as ne,aq as xe,o as me,R as $e}from"./colorRamps-DtMNMcNc.js";import"./maplibre-gl-CzKkYb8g.js";import"./index-D1cknlJ6.js";import"./iframe-BPsabpo9.js";import"./OrbitControls-BzCzQKCA.js";import"./georadar-road-centerlines-D9Vw2yKO.js";const He=3,Be=.005,We=4,Je=1e-4,te=a=>new h(a.x,a.y,a.z),ze={allowTranslation:{x:!0,y:!0,z:!0},allowRotation:{x:!0,y:!0,z:!0}};function Qe(a){if(a.length===0)return[];const l=a.reduce((w,p)=>w.add(te(p)),new h).multiplyScalar(1/a.length),x=a.reduce((w,p)=>w+te(p).distanceToSquared(l),0)/a.length*.0625;if(x<=Number.EPSILON)return a.map(()=>1);const u=-1/(2*x),o=a.map(w=>{const p=te(w);let C=0;for(const P of a)C+=Math.exp(u*p.distanceToSquared(te(P)));return 1/C}),y=o.reduce((w,p)=>w+p,0)/o.length;return o.map(w=>w/y)}const Ye=a=>{const l=a.map(u=>[...u]),d=[[1,0,0],[0,1,0],[0,0,1]],x=[[0,1],[0,2],[1,2]];for(let u=0;u<32;u++){let o=0,y=1,w=0;for(const[f,k]of x)Math.abs(l[f][k])>w&&(w=Math.abs(l[f][k]),o=f,y=k);if(w<1e-14)break;const p=.5*Math.atan2(2*l[o][y],l[y][y]-l[o][o]),C=Math.cos(p),P=Math.sin(p);for(let f=0;f<3;f++){const k=l[f][o],L=l[f][y];l[f][o]=C*k-P*L,l[f][y]=P*k+C*L}for(let f=0;f<3;f++){const k=l[o][f],L=l[y][f];l[o][f]=C*k-P*L,l[y][f]=P*k+C*L}for(let f=0;f<3;f++){const k=d[f][o],L=d[f][y];d[f][o]=C*k-P*L,d[f][y]=P*k+C*L}}return{values:[l[0][0],l[1][1],l[2][2]],vectors:[new h(d[0][0],d[1][0],d[2][0]),new h(d[0][1],d[1][1],d[2][1]),new h(d[0][2],d[1][2],d[2][2])]}},Xe=(a,l)=>{const d=l.length,x=a.map((u,o)=>[...u,l[o]]);for(let u=0;u<d;u++){let o=u;for(let y=u+1;y<d;y++)Math.abs(x[y][u])>Math.abs(x[o][u])&&(o=y);if(Math.abs(x[o][u])<1e-12)return null;[x[u],x[o]]=[x[o],x[u]];for(let y=0;y<d;y++){if(y===u)continue;const w=x[y][u]/x[u][u];for(let p=u;p<=d;p++)x[y][p]-=w*x[u][p]}}return x.map((u,o)=>u[d]/x[o][o])},we=(a,l)=>{const d=2*Math.acos(le.clamp(Math.abs(a.w),-1,1));return d<=l||d===0?a:new ne().slerp(a,l/d)};function Ge(a,l={}){if(a.length<3)throw new Error("At least three point pairs are required");const d=a.map(t=>te(t.source)),x=a.map(t=>te(t.target)),u=(l.weighting??"density")==="density"?Qe(d):d.map(()=>1),o=u.reduce((t,i)=>t+i,0),y=d.reduce((t,i,c)=>t.addScaledVector(i,u[c]),new h).multiplyScalar(1/o),w=x.reduce((t,i,c)=>t.addScaledVector(i,u[c]),new h).multiplyScalar(1/o),p={...ze.allowRotation,...l.allowRotation},C=p.x||p.y||p.z,P=le.degToRad(Math.max(0,l.maxRotationDegrees??He)),f=Math.max(0,l.maxUniformScaleDeviation??Be),k=l.minUniformScale??1-f,L=l.maxUniformScale??1+f,$=[1,Math.max(Number.EPSILON,l.verticalErrorWeight??We),1],g=new Float64Array(9);for(let t=0;t<a.length;t++){const i=u[t],c=d[t].clone().sub(y),S=x[t].clone().sub(w);g[0]+=i*S.x*c.x,g[1]+=i*S.x*c.y,g[2]+=i*S.x*c.z,g[3]+=i*S.y*c.x,g[4]+=i*S.y*c.y,g[5]+=i*S.y*c.z,g[6]+=i*S.z*c.x,g[7]+=i*S.z*c.y,g[8]+=i*S.z*c.z}const A=g[0]+g[4]+g[8],Q=g[7]-g[5],re=g[2]-g[6],V=g[3]-g[1],Z=g[0]-g[4]-g[8],H=g[3]+g[1],G=g[2]+g[6],D=-g[0]+g[4]-g[8],ae=g[7]+g[5],Y=-g[0]-g[4]+g[8],I=[[A,Q,re,V],[Q,Z,H,G],[re,H,D,ae],[V,G,ae,Y]],O=Math.max(...I.map(t=>t.reduce((i,c)=>i+Math.abs(c),0))),K=I.map((t,i)=>t.map((c,S)=>i===S?c+O:c));let N=[1,.5,.25,.125];for(let t=0;t<128;t++){const i=K.map(S=>S.reduce((U,j,n)=>U+j*N[n],0)),c=Math.hypot(...i);N=i.map(S=>S/(c||1))}let z=C?new ne(N[1],N[2],N[3],N[0]).normalize():new ne;if(!(p.x&&p.y&&p.z)){const t=new xe().setFromQuaternion(z,"XYZ");t.x=p.x?t.x:0,t.y=p.y?t.y:0,t.z=p.z?t.z:0,z=new ne().setFromEuler(t)}z=we(z,P);let q=1;if(l.allowUniformScale){let t=0,i=0;for(let c=0;c<d.length;c++){const S=u[c],U=d[c].clone().sub(y),j=x[c].clone().sub(w);t+=S*j.dot(U.applyQuaternion(z)),i+=S*U.lengthSq()}q=i>Number.EPSILON?t/i:1,q=le.clamp(q,k,L)}let _=w.clone().sub(y.clone().applyQuaternion(z).multiplyScalar(q));const E=[];if(C){const t=[[0,0,0],[0,0,0],[0,0,0]],i=[new h(1,0,0),new h(0,1,0),new h(0,0,1)];for(let n=0;n<d.length;n++){const s=d[n].clone().sub(y).applyQuaternion(z).multiplyScalar(q),T=i.map(M=>M.clone().cross(s));for(let M=0;M<3;M++)for(let F=M;F<3;F++){let R=0;R+=$[0]*T[M].x*T[F].x,R+=$[1]*T[M].y*T[F].y,R+=$[2]*T[M].z*T[F].z,t[M][F]+=u[n]*R,M!==F&&(t[F][M]=t[M][F])}}if(!p.x){t[0]=[0,0,0];for(const n of t)n[0]=0}if(!p.y){t[1]=[0,0,0];for(const n of t)n[1]=0}if(!p.z){t[2]=[0,0,0];for(const n of t)n[2]=0}const{values:c,vectors:S}=Ye(t),U=Math.max(...c,0);for(let n=0;n<3;n++)c[n]>U*Je&&E.push(S[n]);const j=2*Math.acos(le.clamp(Math.abs(z.w),-1,1));if(j>1e-9&&E.length<3){const s=new h(z.x,z.y,z.z).multiplyScalar(Math.sign(z.w)||1).normalize().multiplyScalar(j),T=E.reduce((F,R)=>F.addScaledVector(R,s.dot(R)),new h),M=T.length();z=M>1e-12?new ne().setFromAxisAngle(T.clone().normalize(),M):new ne}}const J=!!l.allowUniformScale,B=E.length+3+(J?1:0);for(let t=0;t<20;t++){const i=Array.from({length:B},()=>new Array(B).fill(0)),c=new Array(B).fill(0),S=new Array(B);for(let j=0;j<d.length;j++){const n=d[j].clone().applyQuaternion(z),s=n.clone().multiplyScalar(q),T=s.clone().add(_),M=x[j].clone().sub(T);for(let R=0;R<E.length;R++)S[R]=E[R].clone().cross(s);S[E.length]=new h(1,0,0),S[E.length+1]=new h(0,1,0),S[E.length+2]=new h(0,0,1),J&&(S[E.length+3]=n);const F=u[j];for(let R=0;R<B;R++){const ce=S[R];c[R]+=F*($[0]*ce.x*M.x+$[1]*ce.y*M.y+$[2]*ce.z*M.z);for(let se=R;se<B;se++){const fe=S[se],_e=F*($[0]*ce.x*fe.x+$[1]*ce.y*fe.y+$[2]*ce.z*fe.z);i[R][se]+=_e,R!==se&&(i[se][R]=i[R][se])}}}for(let j=0;j<B;j++)i[j][j]+=1e-12+i[j][j]*1e-9;const U=Xe(i,c);if(!U)break;if(E.length>0){const j=E.reduce((s,T,M)=>s.addScaledVector(T,U[M]),new h),n=j.length();n>1e-15&&(z=new ne().setFromAxisAngle(j.clone().normalize(),n).multiply(z),z=we(z,P))}if(_.x+=U[E.length],_.y+=U[E.length+1],_.z+=U[E.length+2],J&&(q=le.clamp(q+U[E.length+3],k,L)),Math.max(...U.map(j=>Math.abs(j)))<1e-12)break}const W=new xe().setFromQuaternion(z,"XYZ");W.x=p.x?W.x:0,W.y=p.y?W.y:0,W.z=p.z?W.z:0;const X=we(new ne().setFromEuler(W),P),pe=new xe().setFromQuaternion(X,"XYZ");_=new h;for(let t=0;t<d.length;t++){const i=d[t].clone().applyQuaternion(X).multiplyScalar(q);_.addScaledVector(x[t].clone().sub(i),u[t])}_.multiplyScalar(1/o);const oe={...ze.allowTranslation,...l.allowTranslation};if(oe.x||(_.x=0),oe.y||(_.y=0),oe.z||(_.z=0),l.maxTranslationMeters!==void 0){const t=Math.max(0,l.maxTranslationMeters);_.clampLength(0,t)}const r=new me().compose(_,X,new h(q,q,q)),m=a.map(t=>te(t.target).distanceTo(te(t.source).applyMatrix4(r))),b=m.reduce((t,i)=>t+i*i,0);return{matrix:r,translation:_,rotation:pe,residuals:m,rmsResidualMeters:Math.sqrt(b/m.length),maximumResidualMeters:Math.max(...m),uniformScale:q,weights:u}}const Te=a=>`[${a.x.toFixed(3)}, ${a.y.toFixed(3)}, ${a.z.toFixed(3)}]`;function Ke({pair:a,anchor:l,onChange:d}){const x=v.useRef(null),u=w=>{var L;const p=(L=x.current)==null?void 0:L.getBoundingClientRect();if(!p)return;const C=le.clamp((w.clientX-p.left)/p.width*4-2,-2,2),P=le.clamp(2-(w.clientY-p.top)/p.height*4,-2,2),f=Math.hypot(C,P),k=f>2?2/f:1;d(C*k,P*k)},o=a.target.x-l.east,y=-a.target.z-l.north;return e.jsxs("div",{ref:x,className:"mesh-xy-pad",role:"slider","aria-label":"Mesh relative East North adjustment",onPointerDown:w=>{w.currentTarget.setPointerCapture(w.pointerId),u(w)},onPointerMove:w=>{w.currentTarget.hasPointerCapture(w.pointerId)&&u(w)},children:[e.jsx("span",{className:"mesh-xy-pad-axis mesh-xy-pad-axis-x"}),e.jsx("span",{className:"mesh-xy-pad-axis mesh-xy-pad-axis-y"}),e.jsx("span",{className:"mesh-xy-pad-point",style:{left:`${50+o*25}%`,top:`${50-y*25}%`}}),e.jsx("span",{className:"mesh-xy-pad-label mesh-xy-pad-label-x",children:"+E"}),e.jsx("span",{className:"mesh-xy-pad-label mesh-xy-pad-label-y",children:"+N"})]})}function Ze({pair:a,xyAnchor:l,zAnchor:d,onXYChange:x,onZChange:u,onZStart:o}){return e.jsxs("div",{className:"mesh-point-adjustment",children:[e.jsxs("div",{className:"mesh-point-delta","aria-live":"polite",children:["ΔE ",(a.target.x-l.east).toFixed(2)," m · ΔN ",(-a.target.z-l.north).toFixed(2)," m · ΔU ",(a.target.y-d).toFixed(2)," m"]}),e.jsxs("div",{className:"mesh-point-inputs",children:[e.jsx("div",{title:"Mesh relative East/North adjustment, maximum radius 2 meters",children:e.jsx(Ke,{pair:a,anchor:l,onChange:x})}),e.jsx("input",{type:"range",min:"-10",max:"10",step:"0.01",className:"mesh-z-adjustment","aria-label":"Mesh relative Up adjustment",title:"Mesh relative Up adjustment",value:a.target.y-d,onFocus:o,onChange:y=>u(Number(y.target.value))})]})]})}function qe({pairs:a,onRemoveLastPair:l,onClear:d,onSolved:x,onSelectPair:u,selectedPairIndex:o,onUpdatePair:y,onRemovePair:w,onAddPointPair:p,onImportPairs:C,onLoadPreset:P,meshLoadState:f,onFramePointCloud:k,onMaximizeCurrentView:L,onFrameMesh:he,onFrameRegistrationPairs:$,onFrameRegistrationPair:g,pointStyle:A,onPointStyleChange:Q,onOpenFieldColorizer:re,meshInspectionPreview:V,onMeshInspectionPreviewChange:Z,meshErrorTarget:H,onMeshErrorTargetChange:G}){const[D,ae]=v.useState(!0),[Y,I]=v.useState(!0),[O,K]=v.useState(100),[N,z]=v.useState(null),[q,_]=v.useState(!1),E=v.useRef(new Map),J=v.useRef(new Map),B=v.useMemo(()=>a.map(({source:r,target:m})=>`${r.x},${r.y},${r.z}|${m.x},${m.y},${m.z}`).join(";"),[a]),W=v.useMemo(()=>({allowRotation:{x:D,y:D,z:D},allowTranslation:{x:!0,y:!0,z:!0},maxTranslationMeters:O,allowUniformScale:Y}),[D,O,Y]),X=()=>{if(a.length<3)return;const r=Ge(a,W);z(r),x==null||x(r)};v.useEffect(()=>{a.length>=3?X():z(null)},[B,W]);const pe=()=>{const r={format:"carma-mesh-registration-v1",pairs:a.map(({source:i,target:c})=>({source:[i.x,i.y,i.z],target:[c.x,c.y,c.z]})),constraints:{allowRotation:D,allowVerticalTranslation:!0,maxTranslation:O,allowUniformScale:Y}},m=new Blob([JSON.stringify(r,null,2)],{type:"application/json"}),b=URL.createObjectURL(m),t=document.createElement("a");t.href=b,t.download="mesh-registration.json",t.click(),URL.revokeObjectURL(b)},oe=async r=>{try{const m=JSON.parse(await r.text());if(m.format!=="carma-mesh-registration-v1"||!Array.isArray(m.pairs))throw new Error("Unsupported registration file");const b=m.pairs.map(({source:t,target:i})=>{if(![t,i].every(c=>Array.isArray(c)&&c.length===3&&c.every(Number.isFinite)))throw new Error("Invalid registration pair");return{source:new h(...t),target:new h(...i)}});C==null||C(b)}catch(m){window.alert(m instanceof Error?m.message:"Invalid registration file")}};return e.jsxs(e.Fragment,{children:[e.jsx(be,{title:"Mesh registration",onClose:()=>{},showClose:!1,className:"registration-modal",initial:{x:12,y:12},zIndex:20,headerActions:e.jsx("button",{className:"info-action",type:"button",onClick:()=>_(r=>!r),title:"Registration info","aria-label":"Registration info",children:e.jsx(ee,{icon:Ve})}),children:e.jsxs("aside",{className:"pointcloud-registration-panel","aria-label":"Registration",children:[q&&e.jsxs("div",{className:"registration-info",children:[e.jsxs("p",{children:["Click a point on the point cloud, then the corresponding point on the mesh. The solver moves point-cloud coordinates into Mesh 2024 coordinates. Pair ",a.length," of at least 3 is currently selected."]}),e.jsxs("div",{className:"pointcloud-registration-status",children:["Mesh 2024: ",f==="loaded"?"loaded":f==="error"?"error":"loading…"]})]}),e.jsxs("fieldset",{className:"pointcloud-style-fieldset",children:[e.jsx("legend",{children:"Point cloud style"}),e.jsxs("label",{children:["Size mode",e.jsx("span",{className:"pointcloud-style-buttons",children:[[ue.AUTO,"Auto"],[ue.PIXELS,"Pixels"],[ue.METERS,"Meters"]].map(([r,m])=>e.jsx("button",{type:"button",className:A.sizeMode===r?"is-active":"",onClick:()=>Q({...A,sizeMode:r}),children:m},r))})]}),A.sizeMode===ue.PIXELS&&e.jsxs("label",{className:"inline-range-label",children:["Point size ",e.jsx("input",{type:"range",min:"0.5",max:"8",step:"0.25",value:A.pointSize,onChange:r=>Q({...A,pointSize:Number(r.target.value)})}),e.jsxs("output",{children:[A.pointSize.toFixed(2)," px"]})]}),A.sizeMode===ue.METERS&&e.jsxs("label",{className:"inline-range-label",children:["Radius ",e.jsx("input",{type:"range",min:"0.01",max:"2",step:"0.01",value:A.radiusMeters,onChange:r=>Q({...A,radiusMeters:Number(r.target.value)})}),e.jsxs("output",{children:[A.radiusMeters.toFixed(2)," m"]})]}),A.sizeMode===ue.AUTO&&e.jsxs("label",{className:"inline-range-label",children:["Radius scale ",e.jsx("input",{type:"range",min:"0.25",max:"4",step:"0.25",value:A.radiusScale,onChange:r=>Q({...A,radiusScale:Number(r.target.value)})}),e.jsxs("output",{children:["×",A.radiusScale.toFixed(2)]})]}),e.jsxs("label",{children:["Form",e.jsx("span",{className:"pointcloud-style-buttons",children:[[ie.SQUARE,"Square"],[ie.CIRCLE,"Circle"],[ie.DOME,"Dome"],[ie.SOFT_SPLAT,"Gradient"]].map(([r,m])=>e.jsx("button",{type:"button",className:A.shape===r?"is-active":"",onClick:()=>Q({...A,shape:r}),children:m},r))})]}),re&&e.jsx("div",{className:"pointcloud-style-buttons",children:e.jsx("button",{type:"button",onClick:re,children:"Field colorizer…"})})]}),e.jsxs("div",{className:"mesh-appearance-controls",children:[e.jsxs("label",{children:["Quality",e.jsx("input",{type:"range",min:"0",max:"50",step:"0.5",value:H,onChange:r=>G(Number(r.target.value))}),e.jsx("output",{children:H.toFixed(1)})]}),e.jsxs("label",{children:["Opacity",e.jsx("input",{type:"range",min:"0.1",max:"1",step:"0.05",value:V.opacity,onChange:r=>{const m=Number(r.target.value);Z({...V,enabled:m<1||V.wireframe,opacity:m})}}),e.jsxs("output",{children:[Math.round(V.opacity*100),"%"]})]}),e.jsx("button",{type:"button",className:V.wireframe?"is-active":"",onClick:()=>{const r=!V.wireframe;Z({...V,enabled:r||V.opacity<1,wireframe:r})},children:"Wireframe"})]}),e.jsxs("div",{className:"pointcloud-registration-actions pointcloud-registration-view-actions",children:[e.jsx("button",{type:"button",onClick:k,children:"Fly to point cloud"}),e.jsx("button",{type:"button",onClick:L,children:"Maximize current view"}),e.jsx("button",{type:"button",disabled:f!=="loaded",onClick:he,children:"Fly to mesh"}),e.jsx("button",{type:"button",disabled:a.length===0,onClick:$,children:"Fly to pairs"})]}),e.jsxs("div",{className:"registration-constraints",children:[e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:D,onChange:r=>ae(r.target.checked)})," Rotation"]}),e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:Y,onChange:r=>I(r.target.checked)})," Scale"]})]}),e.jsxs("div",{className:"pointcloud-registration-actions",children:[e.jsx("button",{type:"button",disabled:a.length<3,onClick:X,children:"Solve"}),e.jsx("button",{type:"button",disabled:a.length===0,onClick:pe,children:"Export JSON"}),e.jsxs("label",{className:"pointcloud-registration-file-button",children:["Import JSON",e.jsx("input",{type:"file",accept:"application/json,.json",hidden:!0,onChange:r=>{var b;const m=(b=r.target.files)==null?void 0:b[0];m&&oe(m),r.target.value=""}})]}),P&&e.jsx("button",{type:"button",onClick:P,children:"Nordbahn preset"})]})]})}),e.jsx(be,{title:`Point pairs (${a.length})`,onClose:()=>{},showClose:!1,className:"point-pairs-modal",headerActions:e.jsxs("span",{className:"pair-header-actions",children:[e.jsx("button",{type:"button",disabled:a.length===0,onClick:$,title:"Fly to all pairs","aria-label":"Fly to all pairs",children:e.jsx(ee,{icon:je})}),e.jsx("button",{type:"button",disabled:o===null||o<=0,onClick:()=>{if(o!==null){const r=o-1;u(r),g(r)}},title:"Previous pair","aria-label":"Previous pair",children:e.jsx(ee,{icon:Ee})}),e.jsx("button",{type:"button",disabled:o===null||o>=a.length-1,onClick:()=>{if(o!==null){const r=o+1;u(r),g(r)}},title:"Next pair","aria-label":"Next pair",children:e.jsx(ee,{icon:Re})})]}),initial:{x:430,y:12},zIndex:21,children:e.jsxs("aside",{className:"pointcloud-registration-panel pointcloud-pair-list-panel","aria-label":"Point pairs",children:[e.jsxs("div",{className:"pointcloud-registration-actions",children:[e.jsx("button",{type:"button",onClick:p,children:"Add point pair"}),e.jsx("button",{type:"button",disabled:a.length===0,onClick:l,children:"Remove last"}),e.jsx("button",{type:"button",disabled:a.length===0,onClick:d,children:"Clear"})]}),e.jsx("ol",{children:a.map((r,m)=>{var b,t;return e.jsxs("li",{className:"pointcloud-registration-pair",children:[e.jsxs("button",{className:`pair-summary-button${o===m?" is-selected":""}`,type:"button",onClick:()=>u(m),title:"Adjust pair",children:[e.jsxs("span",{children:["Pair ",m+1]}),e.jsx("code",{children:Te(new h(r.source.x,r.source.y,r.source.z))})]}),e.jsxs("span",{className:"pair-target-summary",title:"Mesh point",children:["→ ",Te(new h(r.target.x,r.target.y,r.target.z))]}),e.jsxs("span",{className:"pair-delta-summary",title:"Mesh adjustment delta",children:["Δ ",(r.target.x-(((b=J.current.get(m))==null?void 0:b.east)??r.target.x)).toFixed(2),", ",(-r.target.z-(((t=J.current.get(m))==null?void 0:t.north)??-r.target.z)).toFixed(2),", ",(r.target.y-(E.current.get(m)??r.target.y)).toFixed(2)," m"]}),N&&Number.isFinite(N.residuals[m])&&e.jsxs("small",{className:`pair-error${N.residuals[m]===N.maximumResidualMeters?" is-worst":""}`,title:"Pair residual",children:[N.residuals[m].toFixed(3)," m"]}),e.jsx("button",{className:"icon-action",type:"button",onClick:()=>g(m),title:"Fly to pair","aria-label":"Fly to pair",children:e.jsx(ee,{icon:je})}),e.jsx("button",{className:"icon-action icon-action-danger",type:"button",onClick:()=>w(m),title:"Delete pair","aria-label":"Delete pair",children:e.jsx(ee,{icon:De})})]},m)})}),N&&e.jsxs("output",{className:"registration-result",children:["RMS residual: ",N.rmsResidualMeters.toFixed(3)," m; maximum: "," ",N.maximumResidualMeters.toFixed(3)," m",Y&&`; scale: ${N.uniformScale.toFixed(5)}×`,e.jsx("div",{className:"matrix-readout","aria-label":"Solved transformation matrix",children:Array.from({length:4},(r,m)=>e.jsx("div",{children:Array.from({length:4},(b,t)=>N.matrix.elements[t*4+m].toFixed(5)).join("  ")},m))})]})]})}),o!==null&&a[o]&&e.jsx(be,{title:`Adjust pair ${o+1}`,onClose:()=>{},showClose:!1,className:"point-adjustment-modal",transparent:!0,headerActions:e.jsxs("span",{className:"pair-header-actions",children:[e.jsx("button",{type:"button",disabled:o<=0,onClick:()=>{const r=o-1;u(r),g(r)},title:"Previous pair","aria-label":"Previous pair",children:e.jsx(ee,{icon:Ee})}),e.jsx("button",{type:"button",disabled:o>=a.length-1,onClick:()=>{const r=o+1;u(r),g(r)},title:"Next pair","aria-label":"Next pair",children:e.jsx(ee,{icon:Re})})]}),initial:{x:430,y:360},zIndex:22,children:e.jsx("div",{className:"point-adjustment-modal-content",children:e.jsx(Ze,{pair:a[o],xyAnchor:J.current.get(o)??{east:a[o].target.x,north:-a[o].target.z},zAnchor:E.current.get(o)??a[o].target.y,onXYChange:(r,m)=>{const b=o,t=a[b],i=J.current.get(b)??{east:t.target.x,north:-t.target.z};J.current.set(b,i),y(b,{source:t.source,target:new h(i.east+r,t.target.y,-(i.north+m))})},onZStart:()=>E.current.set(o,a[o].target.y),onZChange:r=>{const m=o,b=a[m],t=E.current.get(m)??b.target.y;y(m,{source:b.source,target:new h(b.target.x,t+r,b.target.z)})}})})})]})}qe.__docgenInfo={description:"",methods:[],displayName:"RegistrationWorkbench",props:{pairs:{required:!0,tsType:{name:"unknown"},description:""},onRemoveLastPair:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onClear:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onSolved:{required:!1,tsType:{name:"signature",type:"function",raw:"(result: RigidRegistrationResult) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  matrix: THREE.Matrix4;
  translation: THREE.Vector3;
  rotation: THREE.Euler;
  residuals: number[];
  rmsResidualMeters: number;
  maximumResidualMeters: number;
  uniformScale: number;
  /** Per-pair solver weights (normalized to mean 1); absent on restored solves. */
  weights?: number[];
}`,signature:{properties:[{key:"matrix",value:{name:"THREE.Matrix4",required:!0}},{key:"translation",value:{name:"THREE.Vector3",required:!0}},{key:"rotation",value:{name:"THREE.Euler",required:!0}},{key:"residuals",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"rmsResidualMeters",value:{name:"number",required:!0}},{key:"maximumResidualMeters",value:{name:"number",required:!0}},{key:"uniformScale",value:{name:"number",required:!0}},{key:"weights",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1},description:"Per-pair solver weights (normalized to mean 1); absent on restored solves."}]}},name:"result"}],return:{name:"void"}}},description:""},onSelectPair:{required:!0,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},selectedPairIndex:{required:!0,tsType:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}]},description:""},onUpdatePair:{required:!0,tsType:{name:"signature",type:"function",raw:"(index: number, pair: RegistrationPair) => void",signature:{arguments:[{type:{name:"number"},name:"index"},{type:{name:"signature",type:"object",raw:`{
  /** Point-cloud coordinate that is transformed by the result matrix. */
  source: THREE.Vector3Like;
  /** Corresponding Mesh 2024 coordinate. */
  target: THREE.Vector3Like;
}`,signature:{properties:[{key:"source",value:{name:"THREE.Vector3Like",required:!0},description:"Point-cloud coordinate that is transformed by the result matrix."},{key:"target",value:{name:"THREE.Vector3Like",required:!0},description:"Corresponding Mesh 2024 coordinate."}]}},name:"pair"}],return:{name:"void"}}},description:""},onRemovePair:{required:!0,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},onAddPointPair:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onImportPairs:{required:!1,tsType:{name:"signature",type:"function",raw:"(pairs: RegistrationPair[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /** Point-cloud coordinate that is transformed by the result matrix. */
  source: THREE.Vector3Like;
  /** Corresponding Mesh 2024 coordinate. */
  target: THREE.Vector3Like;
}`,signature:{properties:[{key:"source",value:{name:"THREE.Vector3Like",required:!0},description:"Point-cloud coordinate that is transformed by the result matrix."},{key:"target",value:{name:"THREE.Vector3Like",required:!0},description:"Corresponding Mesh 2024 coordinate."}]}}],raw:"RegistrationPair[]"},name:"pairs"}],return:{name:"void"}}},description:""},onLoadPreset:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Replaces the current pairs with the story's bundled preset."},meshLoadState:{required:!0,tsType:{name:"union",raw:'"loading" | "loaded" | "error"',elements:[{name:"literal",value:'"loading"'},{name:"literal",value:'"loaded"'},{name:"literal",value:'"error"'}]},description:""},onFramePointCloud:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMaximizeCurrentView:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onFrameMesh:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onFrameRegistrationPairs:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onFrameRegistrationPair:{required:!0,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},pointStyle:{required:!0,tsType:{name:"signature",type:"object",raw:"{ sizeMode: PointSizeMode; pointSize: number; radiusMeters: number; radiusScale: number; shape: PointShape }",signature:{properties:[{key:"sizeMode",value:{name:"unknown[union]",raw:"(typeof POINT_SIZE_MODES)[keyof typeof POINT_SIZE_MODES]",required:!0}},{key:"pointSize",value:{name:"number",required:!0}},{key:"radiusMeters",value:{name:"number",required:!0}},{key:"radiusScale",value:{name:"number",required:!0}},{key:"shape",value:{name:"unknown[union]",raw:"(typeof POINT_SHAPES)[keyof typeof POINT_SHAPES]",required:!0}}]}},description:""},onPointStyleChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(next: RegistrationWorkbenchProps["pointStyle"]) => void',signature:{arguments:[{type:{name:"signature",raw:'RegistrationWorkbenchProps["pointStyle"]'},name:"next"}],return:{name:"void"}}},description:""},onOpenFieldColorizer:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Opens the field colorizer panel; renders its trigger in the style section."},meshInspectionPreview:{required:!0,tsType:{name:"signature",type:"object",raw:"{ enabled: boolean; opacity: number; wireframe: boolean }",signature:{properties:[{key:"enabled",value:{name:"boolean",required:!0}},{key:"opacity",value:{name:"number",required:!0}},{key:"wireframe",value:{name:"boolean",required:!0}}]}},description:""},onMeshInspectionPreviewChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(next: RegistrationWorkbenchProps["meshInspectionPreview"]) => void',signature:{arguments:[{type:{name:"signature",raw:'RegistrationWorkbenchProps["meshInspectionPreview"]'},name:"next"}],return:{name:"void"}}},description:""},meshErrorTarget:{required:!0,tsType:{name:"number"},description:""},onMeshErrorTargetChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: number) => void",signature:{arguments:[{type:{name:"number"},name:"value"}],return:{name:"void"}}},description:""}}};const en=`{
  "format": "carma-mesh-registration-v1",
  "pairs": [
    {
      "source": [
        890.3499239973465,
        25.310189668635992,
        -683.870014354774
      ],
      "target": [
        895.8295238736391,
        -18.861171336212006,
        -682.7662032682346
      ]
    },
    {
      "source": [
        861.5480113784284,
        26.27822254570915,
        -668.4721818466365
      ],
      "target": [
        866.4000196502494,
        -17.677400262626698,
        -666.1739850911
      ]
    },
    {
      "source": [
        835.3984945041783,
        26.75934491389927,
        -650.9865674945731
      ],
      "target": [
        839.8425509415837,
        -17.022922030055625,
        -648.3941578214478
      ]
    },
    {
      "source": [
        786.7532306186023,
        26.098772291911516,
        -611.7725363762765
      ],
      "target": [
        790.4851022803922,
        -17.929437394075542,
        -611.1698164696376
      ]
    },
    {
      "source": [
        784.748552685149,
        22.584242358259015,
        -606.3999044001878
      ],
      "target": [
        788.0640836405362,
        -21.090033456667992,
        -605.7710391339638
      ]
    },
    {
      "source": [
        813.8469118394893,
        24.015783654487542,
        -636.2602083587952
      ],
      "target": [
        818.0558233335717,
        -20.010234861794675,
        -634.4935732505614
      ]
    },
    {
      "source": [
        837.6535501277064,
        23.491841524266405,
        -655.5521014399975
      ],
      "target": [
        842.3973113460373,
        -20.098669698529363,
        -653.1879390924358
      ]
    },
    {
      "source": [
        889.2081884802005,
        23.18690277101934,
        -729.41883759705
      ],
      "target": [
        894.0707477369155,
        -18.295542106814366,
        -728.2980837834862
      ]
    },
    {
      "source": [
        871.5185652385921,
        21.31149895195828,
        -701.7762545161089
      ],
      "target": [
        876.8410567715094,
        -21.010486099648713,
        -700.5994681125485
      ]
    },
    {
      "source": [
        733.7437704970088,
        16.879797200753075,
        -558.6031650797344
      ],
      "target": [
        736.0841482243485,
        -28.234435361487055,
        -558.3991346931916
      ]
    },
    {
      "source": [
        743.020464896249,
        17.233189850815638,
        -554.6264960790248
      ],
      "target": [
        745.7592445942453,
        -28.067287357284407,
        -553.8379764109575
      ]
    },
    {
      "source": [
        674.8649468993408,
        14.55379984132481,
        -485.9618716030955
      ],
      "target": [
        677.0187997468536,
        -31.737111302590478,
        -485.85900489776526
      ]
    },
    {
      "source": [
        -61.153133801041264,
        19.36436807753466,
        42.736514682437644
      ],
      "target": [
        -60.873923673406,
        -27.63397364204036,
        45.120454843122545
      ]
    },
    {
      "source": [
        -63.290336410800535,
        18.802241838138738,
        36.19574891606061
      ],
      "target": [
        -62.86799077809065,
        -27.736924933779605,
        38.007812256658134
      ]
    },
    {
      "source": [
        536.4882281560516,
        11.976537304854057,
        -499.8420094723357
      ],
      "target": [
        537.3749203798775,
        -29.11560040290566,
        -498.8194360892053
      ]
    },
    {
      "source": [
        531.8707160227452,
        12.043260351107847,
        -490.1773063841601
      ],
      "target": [
        532.6754472606052,
        -29.127528531686846,
        -488.9726886276573
      ]
    },
    {
      "source": [
        -63.266685842448155,
        18.904175612905814,
        43.046909298785
      ],
      "target": [
        -63.20647669085746,
        -27.66893337452685,
        45.137555281797226
      ]
    },
    {
      "source": [
        -63.16026518874685,
        18.853722049270857,
        44.19882223021935
      ],
      "target": [
        -62.90007629966725,
        -27.650987901088037,
        46.0519909525846
      ]
    },
    {
      "source": [
        -992.7449883822836,
        18.301283417983264,
        813.8548804993634
      ],
      "target": [
        -995.1535336504542,
        -30.566124589076267,
        815.0960640142903
      ]
    },
    {
      "source": [
        -973.2617240306091,
        18.93150526912781,
        821.4844516082987
      ],
      "target": [
        -976.1080017438778,
        -32.38807736186271,
        822.0954266023766
      ]
    },
    {
      "source": [
        530.4044799804686,
        17.501703262329098,
        -497.4608764648437
      ],
      "target": [
        531.1264442368304,
        -22.86919249098667,
        -496.02176994812964
      ]
    },
    {
      "source": [
        541.7421264648438,
        22.70199966430665,
        -450.54574584960926
      ],
      "target": [
        543.3345762799142,
        -20.91482835011316,
        -448.62420528306814
      ]
    },
    {
      "source": [
        105.0669708251953,
        19.400289535522468,
        -76.07749176025393
      ],
      "target": [
        105.28094699938494,
        -27.31479028594576,
        -75.52102748056083
      ]
    },
    {
      "source": [
        91.40924835205077,
        19.400247573852532,
        -65.08194732666016
      ],
      "target": [
        90.87892937548429,
        -27.19929164355458,
        -63.96365991061423
      ]
    },
    {
      "source": [
        63.70952987670899,
        19.250160217285146,
        -42.6848258972168
      ],
      "target": [
        64.98422168873354,
        -27.285894499912562,
        -42.28578791076329
      ]
    },
    {
      "source": [
        18.75416564941406,
        19.20003318786621,
        -8.636353492736816
      ],
      "target": [
        17.537425540460994,
        -27.563157599958373,
        -6.227560045473615
      ]
    },
    {
      "source": [
        -21.2696762084961,
        20.149942398071286,
        14.555904388427734
      ],
      "target": [
        -22.76302714078503,
        -27.619134853997316,
        17.388842109783575
      ]
    },
    {
      "source": [
        -203.12760925292977,
        17.39949798583985,
        147.6065826416016
      ],
      "target": [
        -203.20493576723368,
        -27.827831982737965,
        150.57601371627283
      ]
    },
    {
      "source": [
        -196.57135009765625,
        17.499513626098636,
        142.36973571777344
      ],
      "target": [
        -196.60897737512866,
        -27.776755295256255,
        145.28517383399358
      ]
    },
    {
      "source": [
        -156.71359252929688,
        17.749612808227532,
        111.49617767333983
      ],
      "target": [
        -157.3496032125025,
        -27.749931584477583,
        113.97837580008192
      ]
    }
  ],
  "constraints": {
    "allowRotation": true,
    "allowVerticalTranslation": true,
    "maxTranslation": 100,
    "allowUniformScale": true
  }
}`,nn=Le,de="carma.mesh-registration.seg2512",ye=`${de}.solve`,Ne=`${de}.style`,ke=`${de}.mesh-preview`,Ce=a=>({source:new h(a.source.x,a.source.y,a.source.z),target:new h(a.target.x,a.target.y,a.target.z)}),tn=JSON.parse(en),Me=()=>tn.pairs.map(({source:a,target:l})=>({source:new h(...a),target:new h(...l)}));function Se({color:a="classification",metric:l="z",colorRamp:d,sizeMode:x,pointSize:u,radiusMeters:o,radiusScale:y,shape:w=ie.CIRCLE,metricBlendMode:p,pointCompositeMode:C,background:P,sourceHeightDatum:f=ve.ELLIPSOIDAL,heightOffset:k,meshOpacity:L,meshErrorTarget:he,meshWhite:$,clampMode:g,clampMin:A,clampMax:Q,onColorizerOptionsChange:re}={}){const V=Fe.seg2512,[Z,H]=v.useState(()=>{try{const n=localStorage.getItem(de);return n?JSON.parse(n).map(({source:T,target:M})=>({source:new h(...T),target:new h(...M)})):Me()}catch{return Me()}}),[G,D]=v.useState("pointcloud"),[ae,Y]=v.useState(!1),[I]=v.useState(()=>{try{const n=localStorage.getItem(ye);return n?JSON.parse(n):null}catch{return null}}),[O,K]=v.useState(()=>I?{matrix:new me().fromArray(I.matrix),translation:new h(...I.translation),rotation:new xe(...I.rotation),residuals:I.residuals,rmsResidualMeters:I.rmsResidualMeters,maximumResidualMeters:I.maximumResidualMeters,uniformScale:I.uniformScale??1}:null),[N,z]=v.useState(()=>I?new me().fromArray(I.matrix):new me),[q,_]=v.useState(null),[E,J]=v.useState(()=>{try{const n=localStorage.getItem(ke);if(n){const s=JSON.parse(n),T=typeof s.opacity=="number"?Math.min(1,Math.max(.1,s.opacity)):1,M=!!s.wireframe;return{enabled:T<1||M,opacity:T,wireframe:M}}}catch{}return{enabled:!1,opacity:1,wireframe:!1}}),[B,W]=v.useState(he??.5),X=v.useRef(!1),[pe,oe]=v.useState("loading"),[r,m]=v.useState(()=>{const n={sizeMode:x??"meters",pointSize:u??2,radiusMeters:o??.3,radiusScale:y??1,shape:w};try{const s=localStorage.getItem(Ne);return s?{...n,...JSON.parse(s)}:n}catch{return n}});v.useEffect(()=>{localStorage.setItem(Ne,JSON.stringify(r))},[r]),v.useEffect(()=>{localStorage.setItem(ke,JSON.stringify({opacity:E.opacity,wireframe:E.wireframe}))},[E]);const b=v.useRef({framePointCloud:()=>{},frameMesh:()=>{},frameRegistrationPairs:n=>{},maximizeCurrentView:()=>{},setRegistrationPairLines:(n,s)=>{},highlightPoint:(n,s)=>{},setMeshInspectionPreview:n=>{},openFieldColorizer:()=>{}}),t=v.useRef(Z);t.current=Z;const i=v.useCallback((n,s)=>{if(n===G)if(n==="pointcloud")H(t.current.concat({source:s.clone(),target:new h})),D("mesh");else{const T=t.current,M=T[T.length-1];if(!M)return;const F=T.slice(0,-1).concat({source:M.source,target:s.clone()});H(F),_(F.filter(R=>R.target.lengthSq()>0).length-1),D("pointcloud"),Y(!1)}},[G]),c=Z.filter(n=>n.target.lengthSq()>0),S=n=>{_(n);const s=c[n];s&&(b.current.highlightPoint("pointcloud",new h(s.source.x,s.source.y,s.source.z)),b.current.highlightPoint("mesh",new h(s.target.x,s.target.y,s.target.z)))},U=v.useCallback(()=>{b.current.setRegistrationPairLines(c.map(n=>({pointcloud:new h(n.source.x,n.source.y,n.source.z).applyMatrix4(N),mesh:new h(n.target.x,n.target.y,n.target.z)})),q)},[c,N,q]);v.useEffect(U,[U]);const j=c.map(({source:n,target:s})=>`${n.x},${n.y},${n.z}|${s.x},${s.y},${s.z}`).join(";");return v.useEffect(()=>{I&&I.pairSignature!==j&&(X.current?X.current=!1:(K(null),z(new me),localStorage.removeItem(ye)))},[j,I]),v.useEffect(()=>{if(!O){localStorage.removeItem(ye);return}localStorage.setItem(ye,JSON.stringify({pairSignature:j,matrix:O.matrix.toArray(),translation:[O.translation.x,O.translation.y,O.translation.z],rotation:[O.rotation.x,O.rotation.y,O.rotation.z],residuals:O.residuals,rmsResidualMeters:O.rmsResidualMeters,maximumResidualMeters:O.maximumResidualMeters,uniformScale:O.uniformScale}))},[j,O]),v.useEffect(()=>{localStorage.setItem(de,JSON.stringify(c.map(({source:n,target:s})=>({source:[n.x,n.y,n.z],target:[s.x,s.y,s.z]}))))},[c]),e.jsxs("div",{className:"pointcloud-registration-scene",children:[e.jsx(Ie,{datasetUrl:`${nn}/${V.artifactFileName}`,datasetName:V.label,sourceTag:V.sourceTag,fieldDimensions:V.fieldDimensions,hasRgb:V.hasRgb,sourceHeightDatum:f,color:a,metric:l,colorRamp:d,sizeMode:r.sizeMode,pointSize:r.pointSize,radiusMeters:r.radiusMeters,shape:r.shape,metricBlendMode:p,pointCompositeMode:C,pointBudgetPercent:5,background:P,heightOffset:k,clampMode:g,clampMin:A,clampMax:Q,showFieldColorizer:!0,showFieldColorizerButton:!1,showMesh2024:!0,registrationMatrix:N,meshErrorTarget:B,meshOpacity:L,meshWhite:$,pickingEnabled:ae,pickKind:G,cameraStorageKey:`${de}.camera`,autoMaximizeOnCameraEnd:!0,onPick:i,onPairPicked:S,onColorizerOptionsChange:re,onMeshLoadStateChange:oe,onViewerReady:n=>{b.current=n,U(),E.enabled&&n.setMeshInspectionPreview(E)}}),e.jsx(qe,{pairs:c,onImportPairs:n=>{H(n.map(Ce)),D("pointcloud"),K(null)},onLoadPreset:()=>{H(Me()),D("pointcloud"),K(null)},onRemoveLastPair:()=>{H(n=>n.slice(0,-1)),D("pointcloud")},onClear:()=>{H([]),K(null),D("pointcloud")},onSolved:n=>{K(n),z(n.matrix.clone())},onSelectPair:S,selectedPairIndex:q,onUpdatePair:(n,s)=>{const T=c[n],M=Ce(s);X.current=!0,H(F=>F.map(R=>R===T?M:R)),b.current.highlightPoint("mesh",new h(s.target.x,s.target.y,s.target.z))},onRemovePair:n=>{const s=c[n];H(T=>T.filter(M=>M!==s)),_(null),K(null),z(new me),D("pointcloud")},onAddPointPair:()=>{D("pointcloud"),Y(!0)},meshLoadState:pe,onFramePointCloud:()=>b.current.framePointCloud(),onMaximizeCurrentView:()=>b.current.maximizeCurrentView(),onFrameMesh:()=>b.current.frameMesh(),onFrameRegistrationPairs:()=>b.current.frameRegistrationPairs(c.flatMap(n=>[new h(n.source.x,n.source.y,n.source.z).applyMatrix4(N),new h(n.target.x,n.target.y,n.target.z)])),onFrameRegistrationPair:n=>{const s=c[n];s&&b.current.frameRegistrationPairs([new h(s.source.x,s.source.y,s.source.z).applyMatrix4(N),new h(s.target.x,s.target.y,s.target.z)])},pointStyle:r,onPointStyleChange:m,onOpenFieldColorizer:()=>b.current.openFieldColorizer(),meshInspectionPreview:E,onMeshInspectionPreviewChange:n=>{const s={...n,enabled:n.opacity<1||n.wireframe};J(s),b.current.setMeshInspectionPreview(s)},meshErrorTarget:B,onMeshErrorTargetChange:n=>W(n)}),e.jsx("div",{className:"pointcloud-registration-instruction",children:O?"Solved. Export the transform from the result panel.":ae?`Pick a ${G} point.`:"Use Add point pair to start picking."})]})}Se.__docgenInfo={description:"",methods:[],displayName:"MeshRegistrationScene"};const{useArgs:rn}=__STORYBOOK_MODULE_PREVIEW_API__,yn={title:"Pointcloud Investigation/Mesh Registration",component:Se,argTypes:{color:{control:"inline-radio",options:["white","rgb","classification","intensity"]},metric:{control:"select",options:Ue},colorRamp:{control:"select",options:$e},sizeMode:{name:"point size mode",control:"inline-radio",options:["auto","pixels","meters"],table:{category:"Point cloud"}},radiusScale:{name:"automatic radius scale",control:{type:"range",min:.25,max:4,step:.25},if:{arg:"sizeMode",eq:"auto"},table:{category:"Point cloud"}},pointSize:{name:"point size (pixels)",control:{type:"range",min:.5,max:8,step:.25},if:{arg:"sizeMode",eq:"pixels"},table:{category:"Point cloud"}},radiusMeters:{name:"point radius (meters)",control:{type:"range",min:.01,max:2,step:.01},if:{arg:"sizeMode",eq:"meters"},table:{category:"Point cloud"}},shape:{name:"point form",control:"inline-radio",options:Object.values(ie),table:{category:"Point cloud"}},metricBlendMode:{name:"metric blend",control:"inline-radio",options:["normal","multiply"]},pointCompositeMode:{name:"point blend",control:"inline-radio",options:["normal","multiply"]},background:{control:"inline-radio",options:["white","black"]},sourceHeightDatum:{name:"source height datum",control:"inline-radio",options:Object.values(ve)},heightOffset:{name:"height offset",control:{type:"range",min:-70,max:70,step:.5}},meshOpacity:{name:"mesh opacity",control:{type:"range",min:0,max:1,step:.05}},meshErrorTarget:{name:"mesh error target",control:{type:"range",min:0,max:50,step:.5}},meshWhite:{name:"white mesh shading",control:"boolean"},clampMode:{name:"field clamp",control:"inline-radio",options:["auto","manual"]},clampMin:{name:"field minimum",control:"number",if:{arg:"clampMode",eq:"manual"}},clampMax:{name:"field maximum",control:"number",if:{arg:"clampMode",eq:"manual"}}},parameters:{docs:{description:{component:"Click corresponding point-cloud and Mesh 2024 positions, then solve a constrained rigid registration. The solver never estimates scale and reports pair residuals."}}}},ge={render:a=>{const[,l]=rn();return e.jsx(Se,{...a,onColorizerOptionsChange:d=>{Object.entries(d).some(([u,o])=>a[u]!==o)&&l(d)}})}};ge.args={sizeMode:"meters",pointSize:2,radiusMeters:.3,radiusScale:1,shape:ie.DOME,metricBlendMode:"multiply",pointCompositeMode:"normal",background:"white",sourceHeightDatum:ve.ELLIPSOIDAL,heightOffset:0,color:"intensity",metric:"none",colorRamp:"viridis",clampMode:"manual",clampMin:2,clampMax:24};var Pe,Ae,Oe;ge.parameters={...ge.parameters,docs:{...(Pe=ge.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  render: args => {
    const [, updateArgs] = useArgs<typeof args>();
    return <MeshRegistrationScene {...args} onColorizerOptionsChange={next => {
      const changed = Object.entries(next).some(([key, value]) => args[key as keyof typeof args] !== value);
      if (changed) updateArgs(next);
    }} />;
  }
}`,...(Oe=(Ae=ge.parameters)==null?void 0:Ae.docs)==null?void 0:Oe.source}}};const xn=["Nordbahntrasse"];export{ge as Nordbahntrasse,xn as __namedExportsOrder,yn as default};
