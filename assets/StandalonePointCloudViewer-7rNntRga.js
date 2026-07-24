import{j as L}from"./jsx-runtime-DNp_qQjF.js";import{r as z}from"./index-CSJjS6Ct.js";import{V as Vn,D as jn,N as Wn,k as Hn,G as Gn,s as xr,n as br,t as Er}from"./DRACOLoader-BOzF2nOi.js";import{w as $n,W as Mr}from"./index.core-plugins-D1jggWNa.js";import{i as ve,V as A,da as Tr,d9 as Rn,ct as Gt,d5 as Ue,db as Kn,at as Xn,a as Je,dc as Yn,dd as gt,de as Sr,df as yt,x as Ze,w as ce,dg as Pr,h as Jn,b as J,W as Lr,m as Cr,A as zr,c as Rr,n as Zn,d as Or,M as Bt,t as On,H as Ar,o as Dr,G as Kt,d8 as vt,aG as $t,l as Ve,cH as Ir,q as kr,u as _r,aY as An,dh as Qn,cu as er}from"./three.module-DO1r4UR2.js";import{O as qr}from"./OrbitControls-aWIyla12.js";import{c as xt,d as Dn,f as Fr,e as Ut}from"./point-cloud-assets-YZKnu9LT.js";import{r as Nr,d as tr}from"./georadar-road-centerlines-Celb5QdZ.js";import{g as nr}from"./colorRamps-i6MvUiEq.js";import{D as Br,c as Ur,s as In,F as Vr,b as jr,a as Wr,P as Hr,o as Gr,d as $r,G as Kr}from"./PointColorizer-DyNp_6dd.js";const kn=new ve,pt=new A;class Xt extends Tr{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],i=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],r=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(r),this.setAttribute("position",new Rn(e,3)),this.setAttribute("uv",new Rn(i,2))}applyMatrix4(e){const i=this.attributes.instanceStart,r=this.attributes.instanceEnd;return i!==void 0&&(i.applyMatrix4(e),r.applyMatrix4(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));const r=new Gt(i,6,1);return this.setAttribute("instanceStart",new Ue(r,3,0)),this.setAttribute("instanceEnd",new Ue(r,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));const r=new Gt(i,6,1);return this.setAttribute("instanceColorStart",new Ue(r,3,0)),this.setAttribute("instanceColorEnd",new Ue(r,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Kn(e.geometry)),this}fromLineSegments(e){const i=e.geometry;return this.setPositions(i.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ve);const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;e!==void 0&&i!==void 0&&(this.boundingBox.setFromBufferAttribute(e),kn.setFromBufferAttribute(i),this.boundingBox.union(kn))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xn),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;if(e!==void 0&&i!==void 0){const r=this.boundingSphere.center;this.boundingBox.getCenter(r);let n=0;for(let p=0,o=e.count;p<o;p++)pt.fromBufferAttribute(e,p),n=Math.max(n,r.distanceToSquared(pt)),pt.fromBufferAttribute(i,p),n=Math.max(n,r.distanceToSquared(pt));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}gt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Je(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};yt.line={uniforms:Yn.merge([gt.common,gt.fog,gt.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class Be extends Sr{constructor(e){super({type:"LineMaterial",uniforms:Yn.clone(yt.line.uniforms),vertexShader:yt.line.vertexShader,fragmentShader:yt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Vt=new Ze,_n=new A,qn=new A,j=new Ze,W=new Ze,oe=new Ze,jt=new A,Wt=new ce,H=new Pr,Fn=new A,ft=new ve,ht=new Xn,se=new Ze;let le,ze;function Nn(t,e,i){return se.set(0,0,-e,1).applyMatrix4(t.projectionMatrix),se.multiplyScalar(1/se.w),se.x=ze/i.width,se.y=ze/i.height,se.applyMatrix4(t.projectionMatrixInverse),se.multiplyScalar(1/se.w),Math.abs(Math.max(se.x,se.y))}function Xr(t,e){const i=t.matrixWorld,r=t.geometry,n=r.attributes.instanceStart,p=r.attributes.instanceEnd,o=Math.min(r.instanceCount,n.count);for(let f=0,v=o;f<v;f++){H.start.fromBufferAttribute(n,f),H.end.fromBufferAttribute(p,f),H.applyMatrix4(i);const c=new A,R=new A;le.distanceSqToSegment(H.start,H.end,R,c),R.distanceTo(c)<ze*.5&&e.push({point:R,pointOnLine:c,distance:le.origin.distanceTo(R),object:t,face:null,faceIndex:f,uv:null,uv1:null})}}function Yr(t,e,i){const r=e.projectionMatrix,p=t.material.resolution,o=t.matrixWorld,f=t.geometry,v=f.attributes.instanceStart,c=f.attributes.instanceEnd,R=Math.min(f.instanceCount,v.count),O=-e.near;le.at(1,oe),oe.w=1,oe.applyMatrix4(e.matrixWorldInverse),oe.applyMatrix4(r),oe.multiplyScalar(1/oe.w),oe.x*=p.x/2,oe.y*=p.y/2,oe.z=0,jt.copy(oe),Wt.multiplyMatrices(e.matrixWorldInverse,o);for(let s=0,x=R;s<x;s++){if(j.fromBufferAttribute(v,s),W.fromBufferAttribute(c,s),j.w=1,W.w=1,j.applyMatrix4(Wt),W.applyMatrix4(Wt),j.z>O&&W.z>O)continue;if(j.z>O){const k=j.z-W.z,F=(j.z-O)/k;j.lerp(W,F)}else if(W.z>O){const k=W.z-j.z,F=(W.z-O)/k;W.lerp(j,F)}j.applyMatrix4(r),W.applyMatrix4(r),j.multiplyScalar(1/j.w),W.multiplyScalar(1/W.w),j.x*=p.x/2,j.y*=p.y/2,W.x*=p.x/2,W.y*=p.y/2,H.start.copy(j),H.start.z=0,H.end.copy(W),H.end.z=0;const D=H.closestPointToPointParameter(jt,!0);H.at(D,Fn);const S=J.lerp(j.z,W.z,D),X=S>=-1&&S<=1,U=jt.distanceTo(Fn)<ze*.5;if(X&&U){H.start.fromBufferAttribute(v,s),H.end.fromBufferAttribute(c,s),H.start.applyMatrix4(o),H.end.applyMatrix4(o);const k=new A,F=new A;le.distanceSqToSegment(H.start,H.end,F,k),i.push({point:F,pointOnLine:k,distance:le.origin.distanceTo(F),object:t,face:null,faceIndex:s,uv:null,uv1:null})}}}class Ht extends Jn{constructor(e=new Xt,i=new Be({color:Math.random()*16777215})){super(e,i),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,i=e.attributes.instanceStart,r=e.attributes.instanceEnd,n=new Float32Array(2*i.count);for(let o=0,f=0,v=i.count;o<v;o++,f+=2)_n.fromBufferAttribute(i,o),qn.fromBufferAttribute(r,o),n[f]=f===0?0:n[f-1],n[f+1]=n[f]+_n.distanceTo(qn);const p=new Gt(n,2,1);return e.setAttribute("instanceDistanceStart",new Ue(p,1,0)),e.setAttribute("instanceDistanceEnd",new Ue(p,1,1)),this}raycast(e,i){const r=this.material.worldUnits,n=e.camera;n===null&&!r&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const p=e.params.Line2!==void 0&&e.params.Line2.threshold||0;le=e.ray;const o=this.matrixWorld,f=this.geometry,v=this.material;ze=v.linewidth+p,f.boundingSphere===null&&f.computeBoundingSphere(),ht.copy(f.boundingSphere).applyMatrix4(o);let c;if(r)c=ze*.5;else{const O=Math.max(n.near,ht.distanceToPoint(le.origin));c=Nn(n,O,v.resolution)}if(ht.radius+=c,le.intersectsSphere(ht)===!1)return;f.boundingBox===null&&f.computeBoundingBox(),ft.copy(f.boundingBox).applyMatrix4(o);let R;if(r)R=ze*.5;else{const O=Math.max(n.near,ft.distanceToPoint(le.origin));R=Nn(n,O,v.resolution)}ft.expandByScalar(R),le.intersectsBox(ft)!==!1&&(r?Xr(this,i):Yr(this,n,i))}onBeforeRender(e){const i=this.material.uniforms;i&&i.resolution&&(e.getViewport(Vt),this.material.uniforms.resolution.value.set(Vt.z,Vt.w))}}class Jr extends Xt{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const i=e.length-3,r=new Float32Array(2*i);for(let n=0;n<i;n+=3)r[2*n]=e[n],r[2*n+1]=e[n+1],r[2*n+2]=e[n+2],r[2*n+3]=e[n+3],r[2*n+4]=e[n+4],r[2*n+5]=e[n+5];return super.setPositions(r),this}setColors(e){const i=e.length-3,r=new Float32Array(2*i);for(let n=0;n<i;n+=3)r[2*n]=e[n],r[2*n+1]=e[n+1],r[2*n+2]=e[n+2],r[2*n+3]=e[n+3],r[2*n+4]=e[n+4],r[2*n+5]=e[n+5];return super.setColors(r),this}setFromPoints(e){const i=e.length-1,r=new Float32Array(6*i);for(let n=0;n<i;n++)r[6*n]=e[n].x,r[6*n+1]=e[n].y,r[6*n+2]=e[n].z||0,r[6*n+3]=e[n+1].x,r[6*n+4]=e[n+1].y,r[6*n+5]=e[n+1].z||0;return super.setPositions(r),this}fromLine(e){const i=e.geometry;return this.setPositions(i.attributes.position.array),this}}const Zr=()=>{let t;try{t=new Worker(new URL(""+new URL("copc-stream.worker-BF67LNaf.js",import.meta.url).href,import.meta.url),{type:"module"})}catch{return null}let e=!1,i=null,r=null,n=null;const p=new Map;let o=1,f=Promise.resolve();const v=s=>{f=f.then(()=>{if(!e)return s()})},c=s=>{i==null||i.reject(s),i=null,n==null||n.reject(s),n=null,p.forEach(x=>x.reject(s)),p.clear()},R=s=>t.postMessage(s);t.addEventListener("error",s=>{c(new Error(`COPC worker failed: ${s.message||"unknown error"}`))}),t.addEventListener("message",s=>{var C,D;const x=s.data;switch(x.type){case"metadata":v(()=>r==null?void 0:r.onMetadata(x.metadata));break;case"chunk":v(()=>r==null?void 0:r.onChunk(x.chunk));break;case"progress":v(()=>{var S;return(S=r==null?void 0:r.onProgress)==null?void 0:S.call(r,x.loadedPoints,x.selectedPoints)});break;case"stream-done":v(()=>{i==null||i.resolve(),i=null});break;case"stream-error":v(()=>{i==null||i.reject(new Error(x.message)),i=null});break;case"source-nodes":n==null||n.resolve(x.nodes),n=null;break;case"source-error":n==null||n.reject(new Error(x.message)),n=null;break;case"node":{(C=p.get(x.requestId))==null||C.resolve(x.chunk),p.delete(x.requestId);break}case"node-error":{(D=p.get(x.requestId))==null||D.reject(new Error(x.message)),p.delete(x.requestId);break}}});const O=s=>new Promise((x,C)=>{if(e){C(new Error("COPC worker client disposed"));return}const D=o++;p.set(D,{resolve:x,reject:C}),R({type:"load-node",requestId:D,key:s})});return{stream:(s,x)=>new Promise((C,D)=>{if(e){D(new Error("COPC worker client disposed"));return}r=x,i={resolve:C,reject:D},R({type:"stream",options:s})}),cancelStream:()=>{e||R({type:"cancel-stream"})},openSource:s=>new Promise((x,C)=>{if(e){C(new Error("COPC worker client disposed"));return}n={resolve:x,reject:C},R({type:"open-source",options:s})}).then(x=>({nodes:x,loadNode:O})),dispose:()=>{e||(e=!0,c(new Error("COPC worker client disposed")),t.terminate())}}},Qr=JSON.parse(Nr),rr=Qr.features,ei="Hochstraße",ir=t=>rr.find(e=>e.properties.name===t),ti=t=>{var e;return(((e=ir(t))==null?void 0:e.geometry.coordinates)??[]).map(([i,r])=>[xt(i),xt(r)])},ni=(t,e)=>{var p;const i=Dn.MercatorCoordinate.fromLngLat(e.centerLngLat,0),r=i.meterInMercatorCoordinateUnits(),n=([o,f])=>{const v=Dn.MercatorCoordinate.fromLngLat([o,f],0);return[(v.x-i.x)/r,(v.y-i.y)/r]};return(((p=ir(t))==null?void 0:p.geometry.coordinates)??[]).map(([o,f])=>{const[v,c]=n(o),[R,O]=n(f);return{startX:v,startZ:c,endX:R,endZ:O}})},Yt={DHHN2016:"dhhn2016",ELLIPSOIDAL:"ellipsoidal"},Li=["none","rgb","classification","z","intensity","returnnumber","numberofreturns","synthetic","keypoint","withheld","overlap","scannerchannel","scandirectionflag","edgeofflightline","userdata","scanangle","pointsourceid","gpstime","traceid","tracestation","sliceindex","sliceid","depthlayer","depthmm","surfacepointindex","pointindex"],Ye=(t,e,i)=>{t.updateWorldMatrix(!0,!0);const r=new ve().setFromObject(t);if(r.isEmpty())return;const n=r.getCenter(new A),p=r.getSize(new A),o=Math.max(p.x,p.y,p.z,10)*.5,f=o/Math.tan(J.degToRad(e.fov/2)),v=new A(1,.72,1).normalize();i.target.copy(n),e.position.copy(n).addScaledVector(v,f*1.25),e.near=Math.max(.05,o/1e4),e.far=Math.max(2e3,o*100),e.updateProjectionMatrix(),i.update()},ri=async(t,e,i,r,n,p,o,f,v,c)=>{const[R,O]=xt(r.centerLngLat),s=new Vn(Mr.url);window.__meshTiles=s;const x=new jn;x.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"),s.registerPlugin(new $n),s.registerPlugin(new Wn),s.registerPlugin(new Kr),s.registerPlugin(new Hn({dracoLoader:x})),s.registerPlugin(new Gn({lat:J.degToRad(r.centerLngLat[1]),lon:J.degToRad(r.centerLngLat[0]),height:n===Yt.DHHN2016?await tr({east:R,north:O,zone:32},r.zBase):r.zBase}));const C=64;let D=p,S=Math.max(D,C);s.errorTarget=S;const X=()=>s.stats,U=window.setInterval(()=>{if(S<=D)return;const{queued:I,downloading:ne,parsing:De}=X();I+ne+De>0||(S=Math.max(D,S/2),s.errorTarget=S,s.dispatchEvent({type:"needs-update"}))},600),k=I=>{D=I,I>S&&(S=I,s.errorTarget=I,s.dispatchEvent({type:"needs-update"}))};s.loadSiblings=!1,s.loadAncestors=!1,s.downloadQueue.maxJobs=8,s.parseQueue.maxJobs=8,s.processNodeQueue.maxJobs=64,s.maxTilesProcessed=1e3,s.lruCache.minSize=128,s.lruCache.maxSize=4096,s.lruCache.unloadPercent=.35,s.setCamera(i),s.setResolutionFromRenderer(i,e);const F=new Kt;F.rotation.y=Math.PI,F.add(s.group),t.add(F),F.updateWorldMatrix(!0,!0);const Re=new ve(new A(r.boundsLocal[0][0],r.zMin-r.zBase,r.boundsLocal[0][1]),new A(r.boundsLocal[1][0],r.zMax-r.zBase,r.boundsLocal[1][1])),we=new Er,ue=new xr({mask:!0,errorTarget:Number.POSITIVE_INFINITY});we.addRegion(ue);const me=new br({mask:!1,errorTarget:0});we.addRegion(me),s.registerPlugin(we);const je=30,xe=new ce,be=()=>{s.group.updateWorldMatrix(!0,!1),Re.getBoundingSphere(ue.sphere),ue.sphere.radius+=je,xe.copy(s.group.matrixWorld).invert(),ue.sphere.applyMatrix4(xe),i.updateMatrixWorld(),me.ray.origin.copy(i.position),i.getWorldDirection(me.ray.direction),me.ray.applyMatrix4(xe)};be(),s.addEventListener("update-before",be);const Oe=[1e3,3e3,8e3,2e4,6e4];let pe=0,de=0,fe=0,he="",Ee=!1,Qe=!1;const bt=()=>s.stats,ge=()=>{c&&(fe>0?c(`Mesh 2024: ${fe} tile error(s) · ${he}${de?` · retry ${pe} scheduled`:""}`):c(Qe?null:Ee?"Mesh 2024: loading visible tiles…":"Mesh 2024: loading tileset index…"))};ge();const Ae=()=>{if(de)return;const I=Oe[Math.min(pe,Oe.length-1)];pe+=1,de=window.setTimeout(()=>{de=0;try{s.resetFailedTiles()}catch(ne){he=ne instanceof Error?ne.message:String(ne)}s.dispatchEvent({type:"needs-update"}),ge()},I)},Me=()=>{Ee=!0,ge(),s.dispatchEvent({type:"needs-update"})},We=I=>{fe+=1,he=(I.error instanceof Error?I.error.message:String(I.error)).replace(/\s+/g," ").slice(0,140),Ae(),ge()},Te=()=>{bt().failed===0&&(fe=0,he="",pe=0),ge()};s.addEventListener("load-root-tileset",Me),s.addEventListener("load-error",We),s.addEventListener("tiles-load-end",Te);const et=window.setInterval(()=>{s.dispatchEvent({type:"needs-update"})},2e3),He=I=>{I.scene&&(Qe=!0,ge(),v==null||v(I.scene))};return s.addEventListener("load-model",He),{tiles:s,applyErrorTarget:k,kick:()=>s.dispatchEvent({type:"needs-update"}),resetProgressiveLoad:()=>{S=Math.max(D,C),s.errorTarget=S,s.dispatchEvent({type:"needs-update"})},isIdle:()=>{const{queued:I,downloading:ne,parsing:De}=X();return Ee&&I+ne+De===0&&S<=D},dispose:()=>{window.clearInterval(U),window.clearInterval(et),window.clearTimeout(de),t.remove(F),s.removeEventListener("update-before",be),s.removeEventListener("load-root-tileset",Me),s.removeEventListener("load-error",We),s.removeEventListener("tiles-load-end",Te),s.removeEventListener("load-model",He),c==null||c(null),s.dispose(),x.dispose()}}},ii=async(t,e,i,r,n,p,o)=>{const[f,v]=xt(r.centerLngLat),c=new Vn(p),R=new jn;R.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"),c.registerPlugin(new $n),c.registerPlugin(new Wn),c.registerPlugin(new Hn({dracoLoader:R})),c.registerPlugin(new Gn({lat:J.degToRad(r.centerLngLat[1]),lon:J.degToRad(r.centerLngLat[0]),height:n===Yt.DHHN2016?await tr({east:f,north:v,zone:32},r.zBase):r.zBase})),c.downloadQueue.maxJobs=8,c.parseQueue.maxJobs=8,c.lruCache.minSize=512,c.lruCache.maxSize=4096,c.setCamera(i),c.setResolutionFromRenderer(i,e);const O=new Kt;O.rotation.y=Math.PI,O.add(c.group),t.add(O);let s=0;const x=S=>{S.scene&&(S.scene.traverse(X=>{var F;const U=X;if(!(U instanceof Ve))return;const k=U.material;k.size=2,k.sizeAttenuation=!1,k.vertexColors=!!U.geometry.getAttribute("color"),k.needsUpdate=!0,s+=((F=U.geometry.getAttribute("position"))==null?void 0:F.count)??0}),o==null||o(`3D Tiles: ${s.toLocaleString()} points`))},C=S=>{o==null||o(`3D Tiles error: ${S.error instanceof Error?S.error.message:String(S.error)}`)};c.addEventListener("load-model",x),c.addEventListener("load-error",C);const D=window.setInterval(()=>c.dispatchEvent({type:"needs-update"}),2e3);return{tiles:c,group:O,setPointSize:S=>{c.group.traverse(X=>{const U=X;U instanceof Ve&&(U.material.size=S)})},dispose:()=>{window.clearInterval(D),c.removeEventListener("load-model",x),c.removeEventListener("load-error",C),t.remove(O),c.dispose(),R.dispose(),o==null||o(null)}}},ai=t=>{const e=(t.min[0]+t.max[0])/2,i=(t.min[1]+t.max[1])/2,r=Ut([e,i]),n=Ut([t.min[0],t.min[1]]),p=Ut([t.max[0],t.max[1]]),o=(t.max[0]-t.min[0])/2,f=(t.max[1]-t.min[1])/2;return{sourceOrigin:{easting:e,northing:i,height:t.min[2]},centerLngLat:r,boundsLngLat:[n,p],boundsLocal:[[-o,-f],[o,f]],zBase:t.min[2],zMin:t.min[2],zMax:t.max[2],totalFilePoints:0,selectedPoints:0,selectedNodes:0,totalNodes:0,selectedInsidePoints:0,selectedOutsidePoints:0,hasRgb:!0,hasClassification:!0}},oi=t=>Math.min(100,Math.max(0,t)),si=6e6,Bn=(t,e)=>t.enabled===e.enabled&&t.roadName===e.roadName&&t.widthMeters===e.widthMeters&&t.budgetPercent===e.budgetPercent&&t.outsideMode===e.outsideMode&&t.outsideDepth===e.outsideDepth,li=t=>({segments:ti(t.roadName),widthMeters:Math.max(1,t.widthMeters),insideBudgetShare:oi(t.budgetPercent)/100,outsideMode:t.outsideMode,outsideDepth:Math.max(0,Math.round(t.outsideDepth))});function di({value:t,onChange:e,onApply:i}){const r=(n,p)=>e({...t,[n]:p});return L.jsxs("div",{className:"pointcloud-roi-panel",children:[L.jsxs("label",{className:"pointcloud-roi-heading",children:[L.jsx("input",{type:"checkbox",checked:t.enabled,onChange:n=>r("enabled",n.target.checked)}),"Named-road ROI"]}),L.jsxs("label",{children:["Road / path",L.jsx("select",{value:t.roadName,onChange:n=>r("roadName",n.target.value),children:rr.map(n=>L.jsx("option",{value:n.properties.name,children:n.properties.name},n.properties.name))})]}),L.jsxs("label",{children:["Corridor width ",t.widthMeters.toFixed(0)," m",L.jsx("input",{type:"range",min:2,max:80,step:2,value:t.widthMeters,onChange:n=>r("widthMeters",Number(n.target.value))})]}),L.jsxs("label",{children:["ROI budget ",t.budgetPercent.toFixed(0),"%",L.jsx("input",{type:"range",min:10,max:100,step:5,value:t.budgetPercent,onChange:n=>r("budgetPercent",Number(n.target.value))})]}),L.jsxs("label",{children:["Outside",L.jsxs("select",{value:t.outsideMode,onChange:n=>r("outsideMode",n.target.value),children:[L.jsx("option",{value:"hide",children:"Hide"}),L.jsx("option",{value:"uniform",children:"Uniform tree level"})]})]}),t.outsideMode==="uniform"&&L.jsxs("label",{children:["Outside tree level ",t.outsideDepth,L.jsx("input",{type:"range",min:0,max:8,value:t.outsideDepth,onChange:n=>r("outsideDepth",Number(n.target.value))})]}),L.jsx("button",{type:"button",onClick:i,children:"Apply named road"})]})}const ar=t=>t==="none"||t==="rgb"||t==="classification"?null:t,or=(t,e)=>{const i=t.ranges.get(e)??{min:1/0,max:-1/0,chunkCount:0};for(let r=i.chunkCount;r<t.chunks.length;r++){const n=t.chunks[r].fieldValues[e];if(n)for(let p=0;p<n.length;p++){const o=n[p];Number.isFinite(o)&&(o<i.min&&(i.min=o),o>i.max&&(i.max=o))}}return i.chunkCount=t.chunks.length,t.ranges.set(e,i),Number.isFinite(i.min)&&Number.isFinite(i.max)?[i.min,i.max]:[0,1]},ci=(t,e)=>e.color==="intensity"?{mode:3,rampTexture:nr(e.colorRamp),range:e.clampMode==="manual"?[e.clampMin,e.clampMax]:or(t,"intensity"),gamma:1}:{mode:e.color==="white"?0:e.color==="rgb"?1:2},ui=(t,e)=>{if(e.metric==="none")return{mode:0};if(e.metric==="rgb")return{mode:1};if(e.metric==="classification")return{mode:2};const i=e.clampMode==="manual"?[e.clampMin,e.clampMax]:or(t,e.metric);return{mode:3,rampTexture:nr(e.colorRamp),range:i,gamma:1}},sr=(t,e)=>{const i=ar(e);i!==t.uploadedMetric&&(t.chunks.forEach((r,n)=>{t.visualizer.setChunkField("b",n,i?r.fieldValues[i]??null:null)}),t.uploadedMetric=i)},lr=(t,e)=>{const i=e==="intensity"?"intensity":null;i!==t.uploadedBaseField&&(t.chunks.forEach((r,n)=>{t.visualizer.setChunkField("a",n,i?r.fieldValues[i]??null:null)}),t.uploadedBaseField=i)},dr=(t,e)=>{lr(t,e.color),sr(t,e.metric);const i=e.metricBlendMode==="multiply"?1:0;t.visualizer.setColorization(ci(t,e),ui(t,e),{mode:0},{mode:i,opacity:1},{mode:0,opacity:0})},mi=(t,e)=>{t.meshDesiredVisible=e.showMesh2024;const i=t.meshDesiredErrorTarget!==e.meshErrorTarget;if(t.meshDesiredErrorTarget=e.meshErrorTarget,t.meshOpacity=e.meshOpacity,t.meshWhite=e.meshWhite,e.showMesh2024&&t.metadata&&!t.mesh&&!t.meshLoad){t.meshLoadStateChange("loading");let r=!1;const n=ri(t.scene,t.renderer,t.camera,t.metadata,e.sourceHeightDatum,e.meshErrorTarget,e.meshOpacity,e.meshWhite,p=>{r||(r=!0,t.meshLoadStateChange("loaded")),p.traverse(o=>{if(o.userData.isRegistrationWireframeOverlay)return;const f=o.material;(Array.isArray(f)?f:[f]).forEach(c=>{c&&(c.transparent=t.meshOpacity<1,c.opacity=t.meshOpacity,t.meshWhite&&"color"in c&&c.color.set(16777215),c.needsUpdate=!0)})}),t.meshInspectionPreview&&wt(p,{enabled:!0,opacity:t.meshPreviewOpacity,wireframe:t.meshPreviewWireframe})},p=>t.meshStatusChange(p)).then(p=>{if(t.disposed||!t.meshDesiredVisible){p.dispose();return}p.applyErrorTarget(t.meshDesiredErrorTarget),p.tiles.group.traverse(o=>{if(o.userData.isRegistrationWireframeOverlay)return;const f=o.material;(Array.isArray(f)?f:[f]).forEach(c=>{c&&(c.transparent=t.meshOpacity<1,c.opacity=t.meshOpacity,t.meshWhite&&"color"in c&&c.color.set(16777215),c.needsUpdate=!0)})}),t.mesh=p,t.meshInspectionPreview&&wt(t.mesh.tiles.group,{enabled:!0,opacity:t.meshPreviewOpacity,wireframe:t.meshPreviewWireframe})}).catch(p=>{t.meshLoadStateChange("error"),t.disposed||t.reportError(`Mesh 2024: ${p instanceof Error?p.message:String(p)}`)}).finally(()=>{t.meshLoad===n&&(t.meshLoad=void 0)});t.meshLoad=n}else!e.showMesh2024&&t.mesh&&(t.mesh.dispose(),t.mesh=void 0,t.meshStatusChange(null));t.mesh&&(i&&t.mesh.applyErrorTarget(e.meshErrorTarget),t.mesh.tiles.group.traverse(r=>{if(r.userData.isRegistrationWireframeOverlay)return;const n=r.material;!n||Array.isArray(n)||(n.transparent=e.meshOpacity<1,n.opacity=e.meshOpacity,n.needsUpdate=!0)}),t.meshInspectionPreview&&wt(t.mesh.tiles.group,{enabled:!0,opacity:t.meshPreviewOpacity,wireframe:t.meshPreviewWireframe})),t.visualizer.setDepthTest(!0),t.visualizer.group.renderOrder=0},wt=(t,e)=>{t.traverse(i=>{const r=i;if(!r.material||r.userData.isRegistrationWireframeOverlay)return;const n=r.userData.registrationWireframeOverlay;if(e.enabled&&e.wireframe&&!n){const o=new Qn(new Kn(r.geometry),new er({color:0,transparent:!1,opacity:1,depthTest:!0,depthWrite:!1}));o.renderOrder=1001,o.userData.isRegistrationWireframeOverlay=!0,r.add(o),r.userData.registrationWireframeOverlay=o}else(!e.enabled||!e.wireframe)&&n&&(r.remove(n),n.geometry.dispose(),n.material.dispose(),delete r.userData.registrationWireframeOverlay);(Array.isArray(r.material)?r.material:[r.material]).forEach(o=>{const f=o;f.userData.registrationPreview||(f.userData.registrationPreview={transparent:o.transparent,opacity:o.opacity,wireframe:f.wireframe,color:"color"in o?o.color.getHex():void 0,polygonOffset:o.polygonOffset,polygonOffsetFactor:o.polygonOffsetFactor,polygonOffsetUnits:o.polygonOffsetUnits});const v=f.userData.registrationPreview;o.transparent=e.enabled||v.transparent,o.opacity=e.enabled?e.opacity:v.opacity,f.wireframe=v.wireframe;const c=e.enabled&&e.wireframe;o.polygonOffset=c||v.polygonOffset,o.polygonOffsetFactor=c?1:v.polygonOffsetFactor,o.polygonOffsetUnits=c?1:v.polygonOffsetUnits,"color"in o&&o.color.setHex(v.color??16777215),o.needsUpdate=!0})})},pi=(t,e)=>{t.meshInspectionPreview=e.enabled,t.meshPreviewOpacity=e.opacity,t.meshPreviewWireframe=e.wireframe,t.mesh&&wt(t.mesh.tiles.group,e)},cr=t=>{const e=t.roiGuide;if(!e)return;t.scene.remove(e),e.geometry.dispose(),(Array.isArray(e.material)?e.material:[e.material]).forEach(r=>r.dispose()),t.roiGuide=void 0},fi=(t,e,i)=>{if(cr(t),!i.enabled||!t.metadata){t.visualizer.setClipCorridor(null);return}const r=ni(i.roadName,t.metadata);t.visualizer.setClipCorridor(i.outsideMode==="hide"?{segments:r,halfWidth:Math.max(1,i.widthMeters)/2}:null);const n=e.heightOffset+t.metadata.zMax-t.metadata.zBase,p=new Float32Array(r.flatMap(c=>[c.startX,n,c.startZ,c.endX,n,c.endZ])),o=new vt;o.setAttribute("position",new $t(p,3));const f=new er({color:43208,depthTest:!1,transparent:!0,opacity:.9}),v=new Qn(o,f);v.renderOrder=10,t.scene.add(v),t.roiGuide=v},Ne=(t,e,i)=>{t.visualizer.setSizeMode(e.sizeMode),t.visualizer.setPointSize(e.pointSize),t.visualizer.setRadiusMeters(e.radiusMeters),t.visualizer.setRadiusScale(e.radiusScale),t.visualizer.setShape(e.shape),t.visualizer.setHeightOffset(e.heightOffset),dr(t,e),mi(t,e),t.visualizer.setCompositeMode(e.pointCompositeMode),t.scene.background=new Zn(e.background==="white"?16777215:0),fi(t,e,i)},Un=(t,e)=>e.enabled&&t.metadata?` · ${e.roadName} ${t.metadata.selectedInsidePoints.toLocaleString()} / outside ${t.metadata.selectedOutsidePoints.toLocaleString()}`:"";function hi({datasetUrl:t,datasetName:e,sourceTag:i,acquiredOn:r=null,registration:n,fieldDimensions:p,hasRgb:o=!0,pointBudgetPercent:f=100,sizeMode:v=Wr.METERS,pointSize:c=2,radiusMeters:R=.3,radiusScale:O=1,shape:s=Hr.CIRCLE,color:x="rgb",metric:C="z",metricBlendMode:D="multiply",colorRamp:S="elevation",clampMode:X="auto",clampMin:U=0,clampMax:k=1,pointCompositeMode:F="normal",background:Re="white",sourceHeightDatum:we=Yt.DHHN2016,heightOffset:ue=0,showMesh2024:me=!1,meshErrorTarget:je=12,meshOpacity:xe=1,meshWhite:be=!1,roadRoiEnabled:Oe=!1,roadName:pe=ei,roadWidthMeters:de=24,roadBudgetPercent:fe=85,roadOutsideMode:he="uniform",roadOutsideDepth:Ee=2,showRoadRoiControls:Qe=!1,showFieldColorizer:bt=!1,showFieldColorizerButton:ge=!0,pickingEnabled:Ae=!1,pickKind:Me,registrationMatrix:We,pointTileset:Te,sourceTransform:et,onMountPriorResolved:He,cameraStorageKey:I,autoMaximizeOnCameraEnd:ne=!1,onPick:De,onPairPicked:Jt,onColorizerOptionsChange:Et,onMeshLoadStateChange:Mt,onViewerReady:Tt}){const Zt=z.useRef(null),re=z.useRef(null),Qt=z.useRef(ne);Qt.current=ne;const[ie,en]=z.useState({enabled:Oe,roadName:pe,widthMeters:de,budgetPercent:fe,outsideMode:he,outsideDepth:Ee}),[tn,nn]=z.useState(ie),Se=z.useRef(ie);Se.current=ie;const tt=z.useRef({}),rn=z.useRef(null),_=z.useRef({sizeMode:v,pointSize:c,radiusMeters:R,radiusScale:O,shape:s,color:x,metric:C,metricBlendMode:D,colorRamp:S,clampMode:X,clampMin:U,clampMax:k,pointCompositeMode:F,background:Re,sourceHeightDatum:we,heightOffset:ue,showMesh2024:me,meshErrorTarget:je,meshOpacity:xe,meshWhite:be});_.current={sizeMode:v,pointSize:c,radiusMeters:R,radiusScale:O,shape:s,color:x,metric:C,metricBlendMode:D,colorRamp:S,clampMode:X,clampMin:U,clampMax:k,pointCompositeMode:F,background:Re,sourceHeightDatum:we,heightOffset:ue,showMesh2024:me,meshErrorTarget:je,meshOpacity:xe,meshWhite:be,...tt.current};const[ur,Ie]=z.useState("Loading point cloud…"),[an,mr]=z.useState(null),[on,Ge]=z.useState(null),sn=z.useRef(Ae);sn.current=Ae;const nt=z.useRef(Me);nt.current=Me,z.useEffect(()=>{var M;(M=re.current)==null||M.visualizer.setGlobalOpacity(Ae&&Me==="mesh"?.5:1)},[Ae,Me]);const ln=z.useRef(De);ln.current=De;const dn=z.useRef(Jt);dn.current=Jt;const cn=z.useRef(et);cn.current=et;const St=z.useRef(He);St.current=He;const rt=z.useRef(We??new ce);rt.current=We??new ce;const[pr,Pt]=z.useState(!1),[fr,un]=z.useState(()=>structuredClone(Br)),[hr,gr]=z.useState([]);return z.useEffect(()=>{const M=rn.current;if(M&&M.color===x&&M.metric===C&&M.colorRamp===S&&M.clampMode===X&&M.clampMin===U&&M.clampMax===k)return;tt.current={};const N=x==="intensity"&&C==="intensity"?null:C==="rgb"?{kind:"rgb"}:C==="classification"?{kind:"classification"}:C==="none"?null:{kind:"field",field:C};un(m=>({...m,layers:[{...m.layers[0],source:x==="rgb"?{kind:"rgb"}:x==="classification"?{kind:"classification"}:x==="intensity"?{kind:"field",field:"intensity"}:{kind:"solid",color:"#ffffff"},ramp:S,clampMin:U,clampMax:k},{...m.layers[1],source:N,ramp:S,clampMin:U,clampMax:k},m.layers[2]]}))},[k,U,x,S,C]),z.useEffect(()=>{const M={enabled:Oe,roadName:pe,widthMeters:de,budgetPercent:fe,outsideMode:he,outsideDepth:Ee};en(g=>Bn(g,M)?g:M),nn(g=>Bn(g,M)?g:M)},[fe,pe,Ee,he,Oe,de]),z.useEffect(()=>{const M=re.current;M&&Ne(M,_.current,Se.current)},[Re,k,U,X,x,S,ue,je,xe,be,C,D,c,F,R,O,s,me,v]),z.useEffect(()=>{var g;const M=re.current;M!=null&&M.metadata&&((g=M.mesh)==null||g.dispose(),M.mesh=void 0,Ne(M,_.current,Se.current))},[we]),z.useEffect(()=>{const M=Zt.current;if(!M)return;Ie("Loading point cloud…"),Ge(null);const g=new Lr({antialias:!0});g.setPixelRatio(Math.min(window.devicePixelRatio,2)),g.outputColorSpace=Cr,g.toneMapping=zr,g.toneMappingExposure=1,M.append(g.domElement);const N=new Rr;N.background=new Zn(_.current.background==="white"?16777215:0);const m=new Or(50,1,.05,1e5);m.position.set(100,80,100);const h=new qr(m,g.domElement);h.enableRotate=!0,h.enableZoom=!1,h.screenSpacePanning=!1,h.mouseButtons.LEFT=Bt.PAN,h.mouseButtons.MIDDLE=Bt.ROTATE,h.mouseButtons.RIGHT=Bt.ROTATE,h.maxPolarAngle=J.degToRad(85),h.enableDamping=!0,h.dampingFactor=.08;let Pe=0,Le=!1,G=!1,V=!1;const ye={cancelled:!1};let Ce=0;const ke=()=>{if(I)try{localStorage.setItem(I,JSON.stringify({position:m.position.toArray(),target:h.target.toArray()}))}catch{}},it=()=>{I&&(window.clearTimeout(Ce),Ce=window.setTimeout(ke,300))};if(I){try{const a=localStorage.getItem(I);if(a){const d=JSON.parse(a);Array.isArray(d.position)&&Array.isArray(d.target)&&[...d.position,...d.target].every(Number.isFinite)&&(m.position.fromArray(d.position),h.target.fromArray(d.target),h.update(),Le=!0,G=!0)}}catch{}h.addEventListener("end",it)}const Lt=new On,at=new A,mn=new Je,yr=1.5,Ct=a=>{var b,E;a.preventDefault();const d=g.domElement.getBoundingClientRect();mn.set((a.clientX-d.left)/d.width*2-1,-((a.clientY-d.top)/d.height)*2+1),Lt.setFromCamera(mn,m),at.copy(Lt.ray.direction);const u=Math.max(m.position.distanceTo(h.target),10),y=J.clamp(-a.deltaY*35e-5*u,-u*.2,u*.2);let T=y;if(y>0){const P=(E=(b=re.current)==null?void 0:b.mesh)==null?void 0:E.tiles.group;if(P){const w=Lt.intersectObject(P,!0)[0];if(w){const te=w.distance-yr;T=Math.min(y,Math.max(0,te*.45))}}}m.position.addScaledVector(at,T),h.target.addScaledVector(at,T),h.update(),it(),st(),lt()};g.domElement.addEventListener("wheel",Ct,{passive:!1});const zt=a=>a.preventDefault();g.domElement.addEventListener("contextmenu",zt),N.add(new Ar(16777215,3358797,2.2));const pn=new Dr(16777215,2.5);pn.position.set(300,500,200),N.add(pn);const B=Ur();N.add(B.group);const Q=new Kt;N.add(Q);const ot=new Map,fn=new ce,Rt=(a,d)=>new Promise(u=>{let y=0;const T=()=>{window.clearInterval(b),window.clearTimeout(E),u()},b=window.setInterval(()=>{var P;if(V||d!=null&&d.cancelled){T();return}y=(P=l.mesh)!=null&&P.isIdle()?y+1:0,y>=3&&T()},250),E=window.setTimeout(T,a)}),hn=()=>{B.group.matrixAutoUpdate=!1,B.group.matrix.copy(rt.current),B.group.matrixWorldNeedsUpdate=!0,fn.copy(rt.current).invert()};hn();const l={scene:N,renderer:g,camera:m,visualizer:B,chunks:[],chunksByNodeKey:new Map,ranges:new Map,uploadedMetric:null,uploadedBaseField:null,meshDesiredVisible:_.current.showMesh2024,meshDesiredErrorTarget:_.current.meshErrorTarget,meshOpacity:_.current.meshOpacity,meshWhite:_.current.meshWhite,meshInspectionPreview:!1,meshPreviewOpacity:.5,meshPreviewWireframe:!0,disposed:!1,reportError:Ge,meshLoadStateChange:a=>{Mt==null||Mt(a)},meshStatusChange:mr};re.current=l;const $=Zr(),$e={url:t,registration:n,fieldDimensions:p,includeRgb:o,pointBudgetPercent:f,roi:ie.enabled?li(ie):void 0},Ot=new Map;let At=0;const gn=()=>{gr([...Ot.values()].map(a=>{const d=Math.max(...a.histogram,1);return{name:a.name,min:a.min,max:a.max,empty:a.empty,histogram:a.histogram.map(u=>u/d),categories:a.counts&&a.counts.size>0?[...a.counts.entries()].map(([u,y])=>({value:u,count:y})).sort((u,y)=>u.value-y.value):void 0}}))},yn=a=>{if(V||a.nodeKey&&l.chunksByNodeKey.has(a.nodeKey))return;l.chunks.push(a),a.nodeKey&&l.chunksByNodeKey.set(a.nodeKey,a),Object.entries(a.fieldValues).forEach(([y,T])=>{const b=Ot.get(y)??{name:y,min:1/0,max:-1/0,empty:!0,histogram:Array.from({length:32},()=>0),counts:new Map};T.forEach(P=>{Number.isFinite(P)&&(b.min=Math.min(b.min,P),b.max=Math.max(b.max,P),b.empty=!1,b.counts&&(Number.isInteger(P)&&P>=0&&P<=255?b.counts.set(P,(b.counts.get(P)??0)+1):b.counts=null))});const E=b.max-b.min||1;T.forEach(P=>{if(!Number.isFinite(P))return;const w=J.clamp(Math.floor((P-b.min)/E*b.histogram.length),0,b.histogram.length-1);b.histogram[w]+=1}),Ot.set(y,b)}),At+=1,At>=8&&(At=0,gn()),B.addChunk(a);const d=_.current.color==="intensity"?"intensity":null;d&&d===l.uploadedBaseField?B.setChunkField("a",l.chunks.length-1,a.fieldValues[d]??null):lr(l,_.current.color);const u=ar(_.current.metric);u&&u===l.uploadedMetric?B.setChunkField("b",l.chunks.length-1,a.fieldValues[u]??null):sr(l,_.current.metric),dr(l,_.current),Le||(Le=!0,Ye(B.group,m,h))},vn=()=>{l.refineToken&&(l.refineToken.cancelled=!0);const a={cancelled:!1};l.refineToken=a,m.updateMatrixWorld(),l.visualizer.group.updateWorldMatrix(!0,!0);const d=new An().setFromProjectionMatrix(new ce().multiplyMatrices(m.projectionMatrix,m.matrixWorldInverse)),u=l.visualizer.group.matrixWorld.clone(),y=w=>d.intersectsBox(new ve(new A(w[0],w[1],w[2]),new A(w[3],w[4],w[5])).applyMatrix4(u));l.chunks.filter(w=>w.nodeKey&&w.boundsLocal&&!y(w.boundsLocal)).forEach(w=>{l.visualizer.removeChunk(w.nodeKey),l.chunksByNodeKey.delete(w.nodeKey)}),l.chunks=l.chunks.filter(w=>!w.nodeKey||l.chunksByNodeKey.has(w.nodeKey)),l.visualizer.setPointBudget(Number.POSITIVE_INFINITY);const T=l.mesh,b=Math.min(.05,l.meshDesiredErrorTarget);T&&(T.applyErrorTarget(b),T.kick());const E=new A,P=w=>(E.set((w[0]+w[3])/2,(w[1]+w[4])/2,(w[2]+w[5])/2).applyMatrix4(u).project(m),Math.hypot(E.x,E.y));l.copcSource??(l.copcSource=$?$.openSource($e):Gr({...$e,cancelToken:ye})),Promise.all([l.copcSource,Rt(9e4,a)]).then(async([w])=>{let te=0;const mt=w.nodes.filter(K=>!l.chunksByNodeKey.has(K.key)).filter(K=>y(K.boundsLocal)).map(K=>({node:K,screenDistance:P(K.boundsLocal)})).sort((K,_e)=>K.screenDistance-_e.screenDistance||K.node.depth-_e.node.depth);for(const{node:K}of mt){if(a.cancelled||V)return;if(te+K.pointCount>si)break;if(l.mesh&&!l.mesh.isIdle()&&(await Rt(3e4,a),a.cancelled||V))return;const _e=await w.loadNode(K.key);if(a.cancelled||V)return;yn(_e),te+=K.pointCount,Ie(`${B.pointCount.toLocaleString()} points (maximized view)`),await new Promise(Xe=>setTimeout(Xe,0))}}).catch(w=>{V||a.cancelled||Ge(w instanceof Error?w.message:String(w))})};let Ke=0;const wn=m.position.clone(),xn=m.quaternion.clone(),st=()=>{window.clearTimeout(Ke),l.refineToken&&(l.refineToken.cancelled=!0)},lt=()=>{const a=l.mesh;if(a){const d=Math.max(m.position.distanceTo(h.target),10);m.position.distanceTo(wn)>d*.2||m.quaternion.angleTo(xn)>J.degToRad(10)?(a.resetProgressiveLoad(),wn.copy(m.position),xn.copy(m.quaternion)):a.kick()}Qt.current&&(window.clearTimeout(Ke),Ke=window.setTimeout(vn,400))};h.addEventListener("start",st),h.addEventListener("end",lt),Tt==null||Tt({framePointCloud:()=>Ye(l.visualizer.group,m,h),frameMesh:()=>{l.mesh&&Ye(l.mesh.tiles.group,m,h)},frameRegistrationPairs:a=>{if(a.length===0)return;const d=new ve().setFromPoints([...a]);if(d.isEmpty())return;const u=d.getCenter(new A),y=d.getSize(new A),T=Math.max(y.length()*.5,2),b=T/Math.tan(J.degToRad(m.fov/2)),E=new A(1,.72,1).normalize();h.target.copy(u),m.position.copy(u).addScaledVector(E,b*1.65),m.near=Math.max(.05,T/1e4),m.far=Math.max(2e3,T*100),m.updateProjectionMatrix(),h.update()},maximizeCurrentView:vn,setRegistrationPairLines:(a,d=null)=>{if(Q.children.slice().forEach(q=>{if(Q.remove(q),"geometry"in q&&q.geometry instanceof vt&&q.geometry.dispose(),"material"in q){const Y=q.material;(Array.isArray(Y)?Y:[Y]).forEach(Z=>Z.dispose())}}),a.length===0)return;const u=new Je(g.domElement.width,g.domElement.height),y=new Be({color:1054752,transparent:!0,opacity:.95,linewidth:7,resolution:u}),T=new Be({color:16773632,transparent:!0,opacity:1,linewidth:3,resolution:u}),b=new Be({color:58879,transparent:!0,opacity:1,linewidth:4,resolution:u});y.depthTest=!1,y.depthWrite=!1,T.depthTest=!1,T.depthWrite=!1,b.depthTest=!1,b.depthWrite=!1,a.forEach(({pointcloud:q,mesh:Y},Z)=>{const ae=new Jr;ae.setPositions([q.x,q.y,q.z,Y.x,Y.y,Y.z]);const qe=new Ht(ae,y),Fe=new Ht(ae,Z===d?b:T);qe.renderOrder=900,Fe.renderOrder=901,qe.userData.pairIndex=Z,Fe.userData.pairIndex=Z,Q.add(qe,Fe)});const E=new Float32Array(a.length*3),P=new Float32Array(a.length*3);a.forEach(({pointcloud:q},Y)=>{E.set([q.x,q.y,q.z],Y*3),P.set(Y===d?[0,.9,1]:[1,.83,0],Y*3)});const w=new vt;w.setAttribute("position",new $t(E,3)),w.setAttribute("color",new $t(P,3));const te=new Ve(w,new Ir({vertexColors:!0,size:8,sizeAttenuation:!1,depthTest:!1,depthWrite:!1,transparent:!0}));te.renderOrder=902,te.userData.pairAnchorKind="pointcloud";const mt=[],K=[],_e=[[new A(1,0,0),1,.15,.15],[new A(0,1,0),.2,1,.2],[new A(0,0,1),.2,.4,1]];a.forEach(({mesh:q},Y)=>{const Z=Y===d?1:.45;_e.forEach(([ae,qe,Fe,zn])=>{mt.push(q.x-ae.x,q.y-ae.y,q.z-ae.z,q.x+ae.x,q.y+ae.y,q.z+ae.z),K.push(qe*Z,Fe*Z,zn*Z,qe*Z,Fe*Z,zn*Z)})});const Xe=new Xt;Xe.setPositions(mt),Xe.setColors(K);const Nt=new Ht(Xe,new Be({vertexColors:!0,linewidth:3,resolution:u,depthTest:!1,depthWrite:!1,transparent:!0}));Nt.renderOrder=902,Nt.userData.pairAxes=!0,Q.add(te,Nt),Q.renderOrder=900},highlightPoint:(a,d)=>{let u=ot.get(a);if(!u){const y=new kr({color:a==="pointcloud"?16765952:16726832});y.depthTest=!1,y.depthWrite=!1,u=new Jn(new _r(.45,12,8),y),u.userData.registrationMarker=a,u.renderOrder=1e3,ot.set(a,u),N.add(u)}u.position.copy(d),a==="pointcloud"&&u.position.applyMatrix4(rt.current),u.updateMatrix()},setMeshInspectionPreview:a=>pi(l,a),openFieldColorizer:()=>Pt(!0)}),Ne(l,_.current,Se.current);const ee=new On,dt=new Je;let ct=!1,bn=0,En=0;const vr=3e6,wr=a=>{const d=g.domElement.getBoundingClientRect();dt.set((a.clientX-d.left)/d.width*2-1,-((a.clientY-d.top)/d.height)*2+1),ee.setFromCamera(dt,m),ee.params.Points.threshold=J.clamp(m.position.distanceTo(h.target)*.01,.25,3);const y=(l.mesh?ee.intersectObject(l.mesh.tiles.group,!0)[0]:void 0)??(B.pointCount<=vr?ee.intersectObject(B.group,!0)[0]:void 0);if(!y)return;const T=m.getWorldDirection(at),b=y.point.clone().sub(m.position).dot(T);b<=m.near*2||(h.target.copy(m.position).addScaledVector(T,b),h.update())},Dt=a=>{ct=!1,bn=a.clientX,En=a.clientY,(a.button===0||a.button===2)&&wr(a)},It=a=>{Math.hypot(a.clientX-bn,a.clientY-En)>5&&(ct=!0)},kt=a=>{if(ct||a.button!==0){ct=!1;return}const d=g.domElement.getBoundingClientRect();dt.set((a.clientX-d.left)/d.width*2-1,-((a.clientY-d.top)/d.height)*2+1),ee.setFromCamera(dt,m),ee.params.Points.threshold=J.clamp(m.position.distanceTo(h.target)*.01,.25,3);const u=ln.current;if(!sn.current||!u){const E=dn.current;if(!E)return;ee.params.Line2={threshold:0};const P=ee.intersectObject(Q,!0)[0];if(!P)return;const w=P.object.userData,te=typeof w.pairIndex=="number"?w.pairIndex:w.pairAnchorKind==="pointcloud"&&P.index!==void 0?P.index:w.pairAxes&&P.faceIndex!==void 0&&P.faceIndex!==null?Math.floor(P.faceIndex/3):void 0;te!==void 0&&E(te);return}const y=(l.pointTileset?ee.intersectObject(l.pointTileset.group,!0):ee.intersectObject(B.group,!0)).filter(E=>E.object instanceof Ve)[0],T=l.mesh?ee.intersectObject(l.mesh.tiles.group,!0)[0]:void 0,b=E=>{if(!(E.object instanceof Ve)||E.index===void 0)return E.point.clone();const P=E.object.geometry.getAttribute("position");return E.object.localToWorld(new A().fromBufferAttribute(P,E.index))};nt.current==="pointcloud"&&y?u("pointcloud",b(y).applyMatrix4(fn)):nt.current==="mesh"&&T?u("mesh",T.point.clone()):!nt.current&&y&&u("pointcloud",b(y))};g.domElement.addEventListener("pointerdown",Dt),g.domElement.addEventListener("pointermove",It),g.domElement.addEventListener("click",kt);const Mn=()=>{var y;const a=Math.max(M.clientWidth,1),d=Math.max(M.clientHeight,1);g.setSize(a,d,!1),m.aspect=a/d,m.updateProjectionMatrix();const u=g.getDrawingBufferSize(new Je);B.setViewport(u.x,u.y),(y=l.mesh)==null||y.tiles.setResolutionFromRenderer(m,g),Q.traverse(T=>{const b="material"in T?T.material:void 0;b instanceof Be&&b.resolution.set(g.domElement.width,g.domElement.height)})},_t=new ResizeObserver(Mn);_t.observe(M),Mn();const Tn=new An,ut=new ce,Sn=new ce,qt=new ve;let Pn=-1,Ln=0;const Cn=()=>{var a;if(Pe=window.requestAnimationFrame(Cn),hn(),h.update(),(a=l.mesh)==null||a.tiles.update(),Ln--<=0){Ln=6;const d=Math.max(m.position.distanceTo(h.target),1),u=Math.max(.05,d/5e3),y=Math.max(5e3,d*200);(Math.abs(m.near-u)/u>.25||Math.abs(m.far-y)/y>.25)&&(m.near=u,m.far=y,m.updateProjectionMatrix()),m.updateMatrixWorld(),l.visualizer.group.updateWorldMatrix(!0,!1),ut.multiplyMatrices(m.projectionMatrix,m.matrixWorldInverse).multiply(l.visualizer.group.matrixWorld);const T=l.visualizer.group.children.length;if(!ut.equals(Sn)||T!==Pn){Sn.copy(ut),Pn=T,Tn.setFromProjectionMatrix(ut);for(const b of l.visualizer.group.children){if(!(b instanceof Ve))continue;const E=l.chunksByNodeKey.get(b.userData.nodeKey);E!=null&&E.boundsLocal&&(qt.min.set(E.boundsLocal[0],E.boundsLocal[1],E.boundsLocal[2]),qt.max.set(E.boundsLocal[3],E.boundsLocal[4],E.boundsLocal[5]),b.visible=Tn.intersectsBox(qt))}}}g.render(N,m)};if(Cn(),Te){const a=ai(Te.bounds);l.metadata=a,Ne(l,_.current,Se.current),Ie("Loading 3D Tiles point cloud…");let d;return ii(N,g,m,a,_.current.sourceHeightDatum,Te.url,u=>{!V&&u&&Ie(u)}).then(u=>{if(V){u.dispose();return}d=u,l.pointTileset=u,G||Ye(u.group,m,h)}).catch(u=>{V||Ge(u instanceof Error?u.message:String(u))}),()=>{var u;V=!0,l.disposed=!0,ye.cancelled=!0,$==null||$.cancelStream(),$==null||$.dispose(),window.clearTimeout(Ce),window.clearTimeout(Ke),ke(),h.removeEventListener("end",it),h.removeEventListener("start",st),h.removeEventListener("end",lt),_t.disconnect(),window.cancelAnimationFrame(Pe),h.dispose(),d==null||d.dispose(),(u=l.mesh)==null||u.dispose(),N.remove(B.group),N.remove(Q),ot.forEach(y=>{y.geometry.dispose(),y.material.dispose(),N.remove(y)}),B.dispose(),g.dispose(),g.domElement.remove(),g.domElement.removeEventListener("click",kt),g.domElement.removeEventListener("pointerdown",Dt),g.domElement.removeEventListener("pointermove",It),g.domElement.removeEventListener("wheel",Ct),g.domElement.removeEventListener("contextmenu",zt),re.current===l&&(re.current=null)}}const Ft={onMetadata:async a=>{if(V)return;l.metadata=a;const d=cn.current;d&&St.current&&St.current(new ce().fromArray($r(d.matrix,a.sourceOrigin))),Ne(l,_.current,Se.current),_.current.showMesh2024&&await Rt(45e3)},onChunk:yn,onProgress:(a,d)=>{V||Ie(`${a.toLocaleString()} / ${d.toLocaleString()} points (${f}%)${Un(l,ie)}`)}};return($?$.stream($e,Ft).catch(a=>{if(V||l.metadata)throw a;return l.copcSource=void 0,In({...$e,cancelToken:ye,...Ft})}):In({...$e,cancelToken:ye,...Ft})).then(()=>{V||(gn(),G||Ye(ie.enabled&&ie.outsideMode==="hide"&&l.roiGuide?l.roiGuide:B.group,m,h),Ie(`${B.pointCount.toLocaleString()} points (${f}%)${Un(l,ie)}`))}).catch(a=>{V||Ge(a instanceof Error?a.message:String(a))}),()=>{var a;V=!0,l.disposed=!0,l.refineToken&&(l.refineToken.cancelled=!0),ye.cancelled=!0,$==null||$.cancelStream(),$==null||$.dispose(),window.clearTimeout(Ce),window.clearTimeout(Ke),ke(),h.removeEventListener("end",it),h.removeEventListener("start",st),h.removeEventListener("end",lt),_t.disconnect(),window.cancelAnimationFrame(Pe),h.dispose(),(a=l.mesh)==null||a.dispose(),cr(l),N.remove(B.group),N.remove(Q),Q.traverse(d=>{if("geometry"in d&&d.geometry instanceof vt&&d.geometry.dispose(),"material"in d){const u=d.material;(Array.isArray(u)?u:[u]).forEach(y=>y.dispose())}}),ot.forEach(d=>{d.geometry.dispose(),d.material.dispose(),N.remove(d)}),B.dispose(),g.dispose(),g.domElement.remove(),g.domElement.removeEventListener("click",kt),g.domElement.removeEventListener("pointerdown",Dt),g.domElement.removeEventListener("pointermove",It),g.domElement.removeEventListener("wheel",Ct),g.domElement.removeEventListener("contextmenu",zt),re.current===l&&(re.current=null)}},[I,t,Te,n,p,o,f,ie]),L.jsxs("div",{ref:Zt,className:"pointcloud-viewer",style:{background:Re==="white"?"#fff":"#000"},children:[L.jsxs("div",{className:`pointcloud-status${on?" is-error":""}`,children:[e&&L.jsxs("div",{className:"pointcloud-status-metadata",children:[L.jsx("strong",{children:e}),i&&L.jsx("span",{children:i}),L.jsx("span",{children:Fr(r)})]}),L.jsx("div",{children:on??ur}),an&&L.jsx("div",{className:"pointcloud-mesh-status",children:an})]}),Qe&&L.jsx(di,{value:tn,onChange:nn,onApply:()=>en({...tn})}),bt&&(pr?L.jsx(Vr,{title:"Point cloud field colorizer",onClose:()=>Pt(!1),showClose:!1,className:"point-colorizer-modal",initial:{x:24,y:72},zIndex:40,children:L.jsx(jr,{fields:hr,hasRgb:o,value:fr,onChange:M=>{var ye,Ce,ke;un(M);const g=M.layers[0],N=M.layers[1],m=N.source??null,h=g.source,Pe=(m==null?void 0:m.kind)==="field"?m.field:(m==null?void 0:m.kind)==="rgb"?"rgb":(m==null?void 0:m.kind)==="classification"?"classification":"none",Le=(h==null?void 0:h.kind)==="field"&&h.field==="intensity"?"intensity":(h==null?void 0:h.kind)==="rgb"?"rgb":(h==null?void 0:h.kind)==="classification"?"classification":"white",G=(h==null?void 0:h.kind)==="field"?g:N;_.current={..._.current,color:Le,metric:Pe,colorRamp:G.ramp,clampMode:((ye=G.source)==null?void 0:ye.kind)==="field"?"manual":"auto",clampMin:G.clampMin,clampMax:G.clampMax},tt.current={color:Le,metric:Pe,colorRamp:G.ramp,clampMode:((Ce=G.source)==null?void 0:Ce.kind)==="field"?"manual":"auto",clampMin:G.clampMin,clampMax:G.clampMax},rn.current=tt.current,Et==null||Et({color:Le,metric:Pe,colorRamp:G.ramp,clampMode:((ke=G.source)==null?void 0:ke.kind)==="field"?"manual":"auto",clampMin:G.clampMin,clampMax:G.clampMax});const V=re.current;V&&Ne(V,_.current,Se.current)},storageKey:"carma-mesh-registration-colorizer"})}):ge?L.jsx("button",{type:"button",className:"pointcloud-colorizer-reopen",onClick:()=>Pt(!0),children:"Open field colorizer"}):null)]})}hi.__docgenInfo={description:"",methods:[],displayName:"StandalonePointCloudViewer",props:{datasetUrl:{required:!0,tsType:{name:"string"},description:""},datasetName:{required:!1,tsType:{name:"string"},description:""},sourceTag:{required:!1,tsType:{name:"string"},description:""},acquiredOn:{required:!1,tsType:{name:"union",raw:"PointCloudAcquisitionDate | null",elements:[{name:"PointCloudAcquisitionDate"},{name:"null"}]},description:"",defaultValue:{value:"null",computed:!1}},registration:{required:!1,tsType:{name:"CopcRigidRegistration"},description:""},fieldDimensions:{required:!1,tsType:{name:"unknown"},description:"Canonical lowercase scalar fields decoded from each COPC node."},hasRgb:{required:!1,tsType:{name:"boolean"},description:"Whether the asset-wide audit found usable varying RGB channels.",defaultValue:{value:"true",computed:!1}},pointBudgetPercent:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},sizeMode:{required:!1,tsType:{name:"union",raw:'"auto" | "pixels" | "meters"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"pixels"'},{name:"literal",value:'"meters"'}]},description:"",defaultValue:{value:'"meters"',computed:!1}},pointSize:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"2",computed:!1}},radiusMeters:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0.3",computed:!1}},radiusScale:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},shape:{required:!1,tsType:{name:"unknown[union]",raw:"(typeof POINT_SHAPES)[keyof typeof POINT_SHAPES]"},description:"",defaultValue:{value:'"circle"',computed:!1}},color:{required:!1,tsType:{name:"union",raw:'"white" | "rgb" | "classification" | "intensity"',elements:[{name:"literal",value:'"white"'},{name:"literal",value:'"rgb"'},{name:"literal",value:'"classification"'},{name:"literal",value:'"intensity"'}]},description:"",defaultValue:{value:'"rgb"',computed:!1}},metric:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof POINT_METRICS)[number]"},description:"",defaultValue:{value:'"z"',computed:!1}},metricBlendMode:{required:!1,tsType:{name:"union",raw:'"normal" | "multiply"',elements:[{name:"literal",value:'"normal"'},{name:"literal",value:'"multiply"'}]},description:"",defaultValue:{value:'"multiply"',computed:!1}},colorRamp:{required:!1,tsType:{name:"union",raw:`| "viridis"
| "inferno"
| "turbo"
| "spectral"
| "elevation"
| "grayscale"
| "classification"`,elements:[{name:"literal",value:'"viridis"'},{name:"literal",value:'"inferno"'},{name:"literal",value:'"turbo"'},{name:"literal",value:'"spectral"'},{name:"literal",value:'"elevation"'},{name:"literal",value:'"grayscale"'},{name:"literal",value:'"classification"'}]},description:"",defaultValue:{value:'"elevation"',computed:!1}},clampMode:{required:!1,tsType:{name:"union",raw:'"auto" | "manual"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"manual"'}]},description:"",defaultValue:{value:'"auto"',computed:!1}},clampMin:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},clampMax:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},pointCompositeMode:{required:!1,tsType:{name:"union",raw:'"normal" | "multiply" | "screen"',elements:[{name:"literal",value:'"normal"'},{name:"literal",value:'"multiply"'},{name:"literal",value:'"screen"'}]},description:"",defaultValue:{value:'"normal"',computed:!1}},background:{required:!1,tsType:{name:"union",raw:'"white" | "black"',elements:[{name:"literal",value:'"white"'},{name:"literal",value:'"black"'}]},description:"",defaultValue:{value:'"white"',computed:!1}},sourceHeightDatum:{required:!1,tsType:{name:"unknown[union]",raw:"(typeof POINT_CLOUD_HEIGHT_DATUMS)[keyof typeof POINT_CLOUD_HEIGHT_DATUMS]"},description:"",defaultValue:{value:'"dhhn2016"',computed:!1}},heightOffset:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},showMesh2024:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},meshErrorTarget:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"12",computed:!1}},meshOpacity:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},meshWhite:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},roadRoiEnabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},roadName:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Hochstraße"',computed:!1}},roadWidthMeters:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"24",computed:!1}},roadBudgetPercent:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"85",computed:!1}},roadOutsideMode:{required:!1,tsType:{name:"union",raw:'"hide" | "uniform"',elements:[{name:"literal",value:'"hide"'},{name:"literal",value:'"uniform"'}]},description:"",defaultValue:{value:'"uniform"',computed:!1}},roadOutsideDepth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"2",computed:!1}},showRoadRoiControls:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showFieldColorizer:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showFieldColorizerButton:{required:!1,tsType:{name:"boolean"},description:"Hides the floating reopen button when an external UI hosts the trigger.",defaultValue:{value:"true",computed:!1}},pickingEnabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},pickKind:{required:!1,tsType:{name:"union",raw:'"pointcloud" | "mesh"',elements:[{name:"literal",value:'"pointcloud"'},{name:"literal",value:'"mesh"'}]},description:""},registrationMatrix:{required:!1,tsType:{name:"THREE.Matrix4"},description:""},pointTileset:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  url: string;
  bounds: {
    min: readonly [number, number, number];
    max: readonly [number, number, number];
  };
}`,signature:{properties:[{key:"url",value:{name:"string",required:!0}},{key:"bounds",value:{name:"signature",type:"object",raw:`{
  min: readonly [number, number, number];
  max: readonly [number, number, number];
}`,signature:{properties:[{key:"min",value:{name:"unknown",required:!0}},{key:"max",value:{name:"unknown",required:!0}}]},required:!0}}]}},description:`Renders the dataset from a 3D Tiles 1.1 point tileset instead of the COPC
delivery. The bounds anchor the scene frame without opening a COPC file.`},sourceTransform:{required:!1,tsType:{name:"signature",type:"object",raw:"{ matrix: readonly number[] }",signature:{properties:[{key:"matrix",value:{name:"unknown",required:!0}}]}},description:"Source-frame mount prior (carma-pointcloud-v1 transform convention)."},onMountPriorResolved:{required:!1,tsType:{name:"signature",type:"function",raw:"(matrix: THREE.Matrix4) => void",signature:{arguments:[{type:{name:"THREE.Matrix4"},name:"matrix"}],return:{name:"void"}}},description:"Reports the mount prior converted into the viewer's scene frame."},cameraStorageKey:{required:!1,tsType:{name:"string"},description:"localStorage key that keeps camera position and target across reloads."},autoMaximizeOnCameraEnd:{required:!1,tsType:{name:"boolean"},description:"Re-runs the maximize-current-view refinement after every camera move.",defaultValue:{value:"false",computed:!1}},onPick:{required:!1,tsType:{name:"signature",type:"function",raw:'(kind: "pointcloud" | "mesh", point: THREE.Vector3) => void',signature:{arguments:[{type:{name:"union",raw:'"pointcloud" | "mesh"',elements:[{name:"literal",value:'"pointcloud"'},{name:"literal",value:'"mesh"'}]},name:"kind"},{type:{name:"THREE.Vector3"},name:"point"}],return:{name:"void"}}},description:""},onPairPicked:{required:!1,tsType:{name:"signature",type:"function",raw:"(pairIndex: number) => void",signature:{arguments:[{type:{name:"number"},name:"pairIndex"}],return:{name:"void"}}},description:"Fires when a pair's scene marker (point, axes, or line) is clicked."},onColorizerOptionsChange:{required:!1,tsType:{name:"signature",type:"function",raw:`(options: {
  color: StandalonePointCloudColor;
  metric: PointMetric;
  colorRamp: RampName;
  clampMode: StandaloneClampMode;
  clampMin: number;
  clampMax: number;
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  color: StandalonePointCloudColor;
  metric: PointMetric;
  colorRamp: RampName;
  clampMode: StandaloneClampMode;
  clampMin: number;
  clampMax: number;
}`,signature:{properties:[{key:"color",value:{name:"union",raw:'"white" | "rgb" | "classification" | "intensity"',elements:[{name:"literal",value:'"white"'},{name:"literal",value:'"rgb"'},{name:"literal",value:'"classification"'},{name:"literal",value:'"intensity"'}],required:!0}},{key:"metric",value:{name:"unknown[number]",raw:"(typeof POINT_METRICS)[number]",required:!0}},{key:"colorRamp",value:{name:"union",raw:`| "viridis"
| "inferno"
| "turbo"
| "spectral"
| "elevation"
| "grayscale"
| "classification"`,elements:[{name:"literal",value:'"viridis"'},{name:"literal",value:'"inferno"'},{name:"literal",value:'"turbo"'},{name:"literal",value:'"spectral"'},{name:"literal",value:'"elevation"'},{name:"literal",value:'"grayscale"'},{name:"literal",value:'"classification"'}],required:!0}},{key:"clampMode",value:{name:"union",raw:'"auto" | "manual"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"manual"'}],required:!0}},{key:"clampMin",value:{name:"number",required:!0}},{key:"clampMax",value:{name:"number",required:!0}}]}},name:"options"}],return:{name:"void"}}},description:""},onMeshLoadStateChange:{required:!1,tsType:{name:"signature",type:"function",raw:'(state: "loading" | "loaded" | "error") => void',signature:{arguments:[{type:{name:"union",raw:'"loading" | "loaded" | "error"',elements:[{name:"literal",value:'"loading"'},{name:"literal",value:'"loaded"'},{name:"literal",value:'"error"'}]},name:"state"}],return:{name:"void"}}},description:""},onViewerReady:{required:!1,tsType:{name:"signature",type:"function",raw:`(actions: {
  framePointCloud: () => void;
  frameMesh: () => void;
  frameRegistrationPairs: (points: readonly THREE.Vector3[]) => void;
  maximizeCurrentView: () => void;
  setRegistrationPairLines: (
    pairs: readonly { pointcloud: THREE.Vector3; mesh: THREE.Vector3 }[],
    selectedPairIndex?: number | null
  ) => void;
  highlightPoint: (kind: "pointcloud" | "mesh", point: THREE.Vector3) => void;
  setMeshInspectionPreview: (preview: { enabled: boolean; opacity: number; wireframe: boolean }) => void;
  openFieldColorizer: () => void;
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  framePointCloud: () => void;
  frameMesh: () => void;
  frameRegistrationPairs: (points: readonly THREE.Vector3[]) => void;
  maximizeCurrentView: () => void;
  setRegistrationPairLines: (
    pairs: readonly { pointcloud: THREE.Vector3; mesh: THREE.Vector3 }[],
    selectedPairIndex?: number | null
  ) => void;
  highlightPoint: (kind: "pointcloud" | "mesh", point: THREE.Vector3) => void;
  setMeshInspectionPreview: (preview: { enabled: boolean; opacity: number; wireframe: boolean }) => void;
  openFieldColorizer: () => void;
}`,signature:{properties:[{key:"framePointCloud",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}},{key:"frameMesh",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}},{key:"frameRegistrationPairs",value:{name:"signature",type:"function",raw:"(points: readonly THREE.Vector3[]) => void",signature:{arguments:[{type:{name:"unknown"},name:"points"}],return:{name:"void"}},required:!0}},{key:"maximizeCurrentView",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}},{key:"setRegistrationPairLines",value:{name:"signature",type:"function",raw:`(
  pairs: readonly { pointcloud: THREE.Vector3; mesh: THREE.Vector3 }[],
  selectedPairIndex?: number | null
) => void`,signature:{arguments:[{type:{name:"unknown"},name:"pairs"},{type:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}]},name:"selectedPairIndex"}],return:{name:"void"}},required:!0}},{key:"highlightPoint",value:{name:"signature",type:"function",raw:'(kind: "pointcloud" | "mesh", point: THREE.Vector3) => void',signature:{arguments:[{type:{name:"union",raw:'"pointcloud" | "mesh"',elements:[{name:"literal",value:'"pointcloud"'},{name:"literal",value:'"mesh"'}]},name:"kind"},{type:{name:"THREE.Vector3"},name:"point"}],return:{name:"void"}},required:!0}},{key:"setMeshInspectionPreview",value:{name:"signature",type:"function",raw:"(preview: { enabled: boolean; opacity: number; wireframe: boolean }) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ enabled: boolean; opacity: number; wireframe: boolean }",signature:{properties:[{key:"enabled",value:{name:"boolean",required:!0}},{key:"opacity",value:{name:"number",required:!0}},{key:"wireframe",value:{name:"boolean",required:!0}}]}},name:"preview"}],return:{name:"void"}},required:!0}},{key:"openFieldColorizer",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},name:"actions"}],return:{name:"void"}}},description:""}}};export{Li as P,hi as S,Yt as a};
