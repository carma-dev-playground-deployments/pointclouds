import{j as T}from"./jsx-runtime-DNp_qQjF.js";import{r as P}from"./index-CSJjS6Ct.js";import{V as ur,W as pr,D as mr,w as fr,N as hr,k as gr,G as yr,s as vr,n as wr,t as xr}from"./DRACOLoader-DFzQRO_0.js";import{k as ve,V as L,dd as br,d7 as Pn,cr as qt,d3 as qe,de as qn,ap as Bn,b as Ge,df as Nn,dg as ut,dh as Er,di as pt,p as $e,o as ce,dj as Sr,j as Un,c as Z,d8 as Mr,a0 as Tr,af as Pr,e as Cr,Z as Vn,f as zr,M as At,db as Cn,aa as Lr,a6 as Rr,G as jn,d6 as mt,aC as Bt,dk as Dt,cF as Or,aP as Ar,aJ as Dr,aW as zn,dl as Wn,cs as Hn,dc as Gn}from"./colorRamps-DtMNMcNc.js";import{O as kr}from"./OrbitControls-BzCzQKCA.js";import{a as Nt,b as Ln}from"./maplibre-gl-DkUQMLNi.js";import{r as Ir,d as _r}from"./georadar-road-centerlines-D1Mg1UbL.js";import{D as Fr,e as qr,s as Rn,f as Br,F as Nr,g as Ur,d as Vr,P as jr,o as Wr,h as Hr,G as Gr}from"./PointColorizer-CJTL5ai5.js";const On=new ve,st=new L;class Ut extends br{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],i=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],r=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(r),this.setAttribute("position",new Pn(e,3)),this.setAttribute("uv",new Pn(i,2))}applyMatrix4(e){const i=this.attributes.instanceStart,r=this.attributes.instanceEnd;return i!==void 0&&(i.applyMatrix4(e),r.applyMatrix4(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));const r=new qt(i,6,1);return this.setAttribute("instanceStart",new qe(r,3,0)),this.setAttribute("instanceEnd",new qe(r,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));const r=new qt(i,6,1);return this.setAttribute("instanceColorStart",new qe(r,3,0)),this.setAttribute("instanceColorEnd",new qe(r,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new qn(e.geometry)),this}fromLineSegments(e){const i=e.geometry;return this.setPositions(i.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ve);const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;e!==void 0&&i!==void 0&&(this.boundingBox.setFromBufferAttribute(e),On.setFromBufferAttribute(i),this.boundingBox.union(On))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bn),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;if(e!==void 0&&i!==void 0){const r=this.boundingSphere.center;this.boundingBox.getCenter(r);let n=0;for(let u=0,s=e.count;u<s;u++)st.fromBufferAttribute(e,u),n=Math.max(n,r.distanceToSquared(st)),st.fromBufferAttribute(i,u),n=Math.max(n,r.distanceToSquared(st));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}ut.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Ge(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};pt.line={uniforms:Nn.merge([ut.common,ut.fog,ut.line]),vertexShader:`
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
		`};class Fe extends Er{constructor(e){super({type:"LineMaterial",uniforms:Nn.clone(pt.line.uniforms),vertexShader:pt.line.vertexShader,fragmentShader:pt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const kt=new $e,An=new L,Dn=new L,B=new $e,N=new $e,ie=new $e,It=new L,_t=new ce,U=new Sr,kn=new L,lt=new ve,dt=new Bn,ae=new $e;let oe,Pe;function In(t,e,i){return ae.set(0,0,-e,1).applyMatrix4(t.projectionMatrix),ae.multiplyScalar(1/ae.w),ae.x=Pe/i.width,ae.y=Pe/i.height,ae.applyMatrix4(t.projectionMatrixInverse),ae.multiplyScalar(1/ae.w),Math.abs(Math.max(ae.x,ae.y))}function $r(t,e){const i=t.matrixWorld,r=t.geometry,n=r.attributes.instanceStart,u=r.attributes.instanceEnd,s=Math.min(r.instanceCount,n.count);for(let p=0,g=s;p<g;p++){U.start.fromBufferAttribute(n,p),U.end.fromBufferAttribute(u,p),U.applyMatrix4(i);const m=new L,O=new L;oe.distanceSqToSegment(U.start,U.end,O,m),O.distanceTo(m)<Pe*.5&&e.push({point:O,pointOnLine:m,distance:oe.origin.distanceTo(O),object:t,face:null,faceIndex:p,uv:null,uv1:null})}}function Kr(t,e,i){const r=e.projectionMatrix,u=t.material.resolution,s=t.matrixWorld,p=t.geometry,g=p.attributes.instanceStart,m=p.attributes.instanceEnd,O=Math.min(p.instanceCount,g.count),D=-e.near;oe.at(1,ie),ie.w=1,ie.applyMatrix4(e.matrixWorldInverse),ie.applyMatrix4(r),ie.multiplyScalar(1/ie.w),ie.x*=u.x/2,ie.y*=u.y/2,ie.z=0,It.copy(ie),_t.multiplyMatrices(e.matrixWorldInverse,s);for(let o=0,x=O;o<x;o++){if(B.fromBufferAttribute(g,o),N.fromBufferAttribute(m,o),B.w=1,N.w=1,B.applyMatrix4(_t),N.applyMatrix4(_t),B.z>D&&N.z>D)continue;if(B.z>D){const V=B.z-N.z,q=(B.z-D)/V;B.lerp(N,q)}else if(N.z>D){const V=N.z-B.z,q=(N.z-D)/V;N.lerp(B,q)}B.applyMatrix4(r),N.applyMatrix4(r),B.multiplyScalar(1/B.w),N.multiplyScalar(1/N.w),B.x*=u.x/2,B.y*=u.y/2,N.x*=u.x/2,N.y*=u.y/2,U.start.copy(B),U.start.z=0,U.end.copy(N),U.end.z=0;const A=U.closestPointToPointParameter(It,!0);U.at(A,kn);const R=Z.lerp(B.z,N.z,A),se=R>=-1&&R<=1,X=It.distanceTo(kn)<Pe*.5;if(se&&X){U.start.fromBufferAttribute(g,o),U.end.fromBufferAttribute(m,o),U.start.applyMatrix4(s),U.end.applyMatrix4(s);const V=new L,q=new L;oe.distanceSqToSegment(U.start,U.end,q,V),i.push({point:q,pointOnLine:V,distance:oe.origin.distanceTo(q),object:t,face:null,faceIndex:o,uv:null,uv1:null})}}}class Ft extends Un{constructor(e=new Ut,i=new Fe({color:Math.random()*16777215})){super(e,i),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,i=e.attributes.instanceStart,r=e.attributes.instanceEnd,n=new Float32Array(2*i.count);for(let s=0,p=0,g=i.count;s<g;s++,p+=2)An.fromBufferAttribute(i,s),Dn.fromBufferAttribute(r,s),n[p]=p===0?0:n[p-1],n[p+1]=n[p]+An.distanceTo(Dn);const u=new qt(n,2,1);return e.setAttribute("instanceDistanceStart",new qe(u,1,0)),e.setAttribute("instanceDistanceEnd",new qe(u,1,1)),this}raycast(e,i){const r=this.material.worldUnits,n=e.camera;n===null&&!r&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const u=e.params.Line2!==void 0&&e.params.Line2.threshold||0;oe=e.ray;const s=this.matrixWorld,p=this.geometry,g=this.material;Pe=g.linewidth+u,p.boundingSphere===null&&p.computeBoundingSphere(),dt.copy(p.boundingSphere).applyMatrix4(s);let m;if(r)m=Pe*.5;else{const D=Math.max(n.near,dt.distanceToPoint(oe.origin));m=In(n,D,g.resolution)}if(dt.radius+=m,oe.intersectsSphere(dt)===!1)return;p.boundingBox===null&&p.computeBoundingBox(),lt.copy(p.boundingBox).applyMatrix4(s);let O;if(r)O=Pe*.5;else{const D=Math.max(n.near,lt.distanceToPoint(oe.origin));O=In(n,D,g.resolution)}lt.expandByScalar(O),oe.intersectsBox(lt)!==!1&&(r?$r(this,i):Kr(this,n,i))}onBeforeRender(e){const i=this.material.uniforms;i&&i.resolution&&(e.getViewport(kt),this.material.uniforms.resolution.value.set(kt.z,kt.w))}}class Xr extends Ut{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const i=e.length-3,r=new Float32Array(2*i);for(let n=0;n<i;n+=3)r[2*n]=e[n],r[2*n+1]=e[n+1],r[2*n+2]=e[n+2],r[2*n+3]=e[n+3],r[2*n+4]=e[n+4],r[2*n+5]=e[n+5];return super.setPositions(r),this}setColors(e){const i=e.length-3,r=new Float32Array(2*i);for(let n=0;n<i;n+=3)r[2*n]=e[n],r[2*n+1]=e[n+1],r[2*n+2]=e[n+2],r[2*n+3]=e[n+3],r[2*n+4]=e[n+4],r[2*n+5]=e[n+5];return super.setColors(r),this}setFromPoints(e){const i=e.length-1,r=new Float32Array(6*i);for(let n=0;n<i;n++)r[6*n]=e[n].x,r[6*n+1]=e[n].y,r[6*n+2]=e[n].z||0,r[6*n+3]=e[n+1].x,r[6*n+4]=e[n+1].y,r[6*n+5]=e[n+1].z||0;return super.setPositions(r),this}fromLine(e){const i=e.geometry;return this.setPositions(i.attributes.position.array),this}}const Yr=()=>{let t;try{t=new Worker(new URL(""+new URL("copc-stream.worker-BF67LNaf.js",import.meta.url).href,import.meta.url),{type:"module"})}catch{return null}let e=!1,i=null,r=null,n=null;const u=new Map;let s=1,p=Promise.resolve();const g=o=>{p=p.then(()=>{if(!e)return o()})},m=o=>{i==null||i.reject(o),i=null,n==null||n.reject(o),n=null,u.forEach(x=>x.reject(o)),u.clear()},O=o=>t.postMessage(o);t.addEventListener("error",o=>{m(new Error(`COPC worker failed: ${o.message||"unknown error"}`))}),t.addEventListener("message",o=>{var z,A;const x=o.data;switch(x.type){case"metadata":g(()=>r==null?void 0:r.onMetadata(x.metadata));break;case"chunk":g(()=>r==null?void 0:r.onChunk(x.chunk));break;case"progress":g(()=>{var R;return(R=r==null?void 0:r.onProgress)==null?void 0:R.call(r,x.loadedPoints,x.selectedPoints)});break;case"stream-done":g(()=>{i==null||i.resolve(),i=null});break;case"stream-error":g(()=>{i==null||i.reject(new Error(x.message)),i=null});break;case"source-nodes":n==null||n.resolve(x.nodes),n=null;break;case"source-error":n==null||n.reject(new Error(x.message)),n=null;break;case"node":{(z=u.get(x.requestId))==null||z.resolve(x.chunk),u.delete(x.requestId);break}case"node-error":{(A=u.get(x.requestId))==null||A.reject(new Error(x.message)),u.delete(x.requestId);break}}});const D=o=>new Promise((x,z)=>{if(e){z(new Error("COPC worker client disposed"));return}const A=s++;u.set(A,{resolve:x,reject:z}),O({type:"load-node",requestId:A,key:o})});return{stream:(o,x)=>new Promise((z,A)=>{if(e){A(new Error("COPC worker client disposed"));return}r=x,i={resolve:z,reject:A},O({type:"stream",options:o})}),cancelStream:()=>{e||O({type:"cancel-stream"})},openSource:o=>new Promise((x,z)=>{if(e){z(new Error("COPC worker client disposed"));return}n={resolve:x,reject:z},O({type:"open-source",options:o})}).then(x=>({nodes:x,loadNode:D})),dispose:()=>{e||(e=!0,m(new Error("COPC worker client disposed")),t.terminate())}}},Zr=JSON.parse(Ir),$n=Zr.features,Jr="Hochstraße",Kn=t=>$n.find(e=>e.properties.name===t),Qr=t=>{var e;return(((e=Kn(t))==null?void 0:e.geometry.coordinates)??[]).map(([i,r])=>[Nt(i),Nt(r)])},ei=(t,e)=>{var u;const i=Ln.MercatorCoordinate.fromLngLat(e.centerLngLat,0),r=i.meterInMercatorCoordinateUnits(),n=([s,p])=>{const g=Ln.MercatorCoordinate.fromLngLat([s,p],0);return[(g.x-i.x)/r,(g.y-i.y)/r]};return(((u=Kn(t))==null?void 0:u.geometry.coordinates)??[]).map(([s,p])=>{const[g,m]=n(s),[O,D]=n(p);return{startX:g,startZ:m,endX:O,endZ:D}})},Xn={DHHN2016:"dhhn2016",ELLIPSOIDAL:"ellipsoidal"},bi=["none","rgb","classification","z","intensity","returnnumber","numberofreturns","synthetic","keypoint","withheld","overlap","scannerchannel","scandirectionflag","edgeofflightline","userdata","scanangle","pointsourceid","gpstime","traceid","tracestation","sliceindex","sliceid","depthlayer","depthmm","surfacepointindex","pointindex"],ct=(t,e,i)=>{t.updateWorldMatrix(!0,!0);const r=new ve().setFromObject(t);if(r.isEmpty())return;const n=r.getCenter(new L),u=r.getSize(new L),s=Math.max(u.x,u.y,u.z,10)*.5,p=s/Math.tan(Z.degToRad(e.fov/2)),g=new L(1,.72,1).normalize();i.target.copy(n),e.position.copy(n).addScaledVector(g,p*1.25),e.near=Math.max(.05,s/1e4),e.far=Math.max(2e3,s*100),e.updateProjectionMatrix(),i.update()},ti=async(t,e,i,r,n,u,s,p,g,m)=>{const[O,D]=Nt(r.centerLngLat),o=new ur(pr.url);window.__meshTiles=o;const x=new mr;x.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"),o.registerPlugin(new fr),o.registerPlugin(new hr),o.registerPlugin(new Gr),o.registerPlugin(new gr({dracoLoader:x})),o.registerPlugin(new yr({lat:Z.degToRad(r.centerLngLat[1]),lon:Z.degToRad(r.centerLngLat[0]),height:n===Xn.DHHN2016?await _r({east:O,north:D,zone:32},r.zBase):r.zBase}));const z=64;let A=u,R=Math.max(A,z);o.errorTarget=R;const se=()=>o.stats,X=window.setInterval(()=>{if(R<=A)return;const{queued:I,downloading:J,parsing:Re}=se();I+J+Re>0||(R=Math.max(A,R/2),o.errorTarget=R,o.dispatchEvent({type:"needs-update"}))},600),V=I=>{A=I,I>R&&(R=I,o.errorTarget=I,o.dispatchEvent({type:"needs-update"}))};o.loadSiblings=!1,o.loadAncestors=!1,o.downloadQueue.maxJobs=8,o.parseQueue.maxJobs=8,o.processNodeQueue.maxJobs=64,o.maxTilesProcessed=1e3,o.lruCache.minSize=128,o.lruCache.maxSize=4096,o.lruCache.unloadPercent=.35,o.setCamera(i),o.setResolutionFromRenderer(i,e);const q=new jn;q.rotation.y=Math.PI,q.add(o.group),t.add(q),q.updateWorldMatrix(!0,!0);const Ce=new ve(new L(r.boundsLocal[0][0],r.zMin-r.zBase,r.boundsLocal[0][1]),new L(r.boundsLocal[1][0],r.zMax-r.zBase,r.boundsLocal[1][1])),we=new xr,ue=new vr({mask:!0,errorTarget:Number.POSITIVE_INFINITY});we.addRegion(ue);const pe=new wr({mask:!1,errorTarget:0});we.addRegion(pe),o.registerPlugin(we);const Be=30,xe=new ce,be=()=>{o.group.updateWorldMatrix(!0,!1),Ce.getBoundingSphere(ue.sphere),ue.sphere.radius+=Be,xe.copy(o.group.matrixWorld).invert(),ue.sphere.applyMatrix4(xe),i.updateMatrixWorld(),pe.ray.origin.copy(i.position),i.getWorldDirection(pe.ray.direction),pe.ray.applyMatrix4(xe)};be(),o.addEventListener("update-before",be);const ze=[1e3,3e3,8e3,2e4,6e4];let me=0,le=0,fe=0,he="",Ee=!1,Ke=!1;const ht=()=>o.stats,ge=()=>{m&&(fe>0?m(`Mesh 2024: ${fe} tile error(s) · ${he}${le?` · retry ${me} scheduled`:""}`):m(Ke?null:Ee?"Mesh 2024: loading visible tiles…":"Mesh 2024: loading tileset index…"))};ge();const Le=()=>{if(le)return;const I=ze[Math.min(me,ze.length-1)];me+=1,le=window.setTimeout(()=>{le=0;try{o.resetFailedTiles()}catch(J){he=J instanceof Error?J.message:String(J)}o.dispatchEvent({type:"needs-update"}),ge()},I)},Se=()=>{Ee=!0,ge(),o.dispatchEvent({type:"needs-update"})},Ne=I=>{fe+=1,he=(I.error instanceof Error?I.error.message:String(I.error)).replace(/\s+/g," ").slice(0,140),Le(),ge()},Ue=()=>{ht().failed===0&&(fe=0,he="",me=0),ge()};o.addEventListener("load-root-tileset",Se),o.addEventListener("load-error",Ne),o.addEventListener("tiles-load-end",Ue);const Xe=window.setInterval(()=>{o.dispatchEvent({type:"needs-update"})},2e3),de=I=>{I.scene&&(Ke=!0,ge(),g==null||g(I.scene))};return o.addEventListener("load-model",de),{tiles:o,applyErrorTarget:V,kick:()=>o.dispatchEvent({type:"needs-update"}),resetProgressiveLoad:()=>{R=Math.max(A,z),o.errorTarget=R,o.dispatchEvent({type:"needs-update"})},isIdle:()=>{const{queued:I,downloading:J,parsing:Re}=se();return Ee&&I+J+Re===0&&R<=A},dispose:()=>{window.clearInterval(X),window.clearInterval(Xe),window.clearTimeout(le),t.remove(q),o.removeEventListener("update-before",be),o.removeEventListener("load-root-tileset",Se),o.removeEventListener("load-error",Ne),o.removeEventListener("tiles-load-end",Ue),o.removeEventListener("load-model",de),m==null||m(null),o.dispose(),x.dispose()}}},ni=t=>Math.min(100,Math.max(0,t)),ri=6e6,_n=(t,e)=>t.enabled===e.enabled&&t.roadName===e.roadName&&t.widthMeters===e.widthMeters&&t.budgetPercent===e.budgetPercent&&t.outsideMode===e.outsideMode&&t.outsideDepth===e.outsideDepth,ii=t=>({segments:Qr(t.roadName),widthMeters:Math.max(1,t.widthMeters),insideBudgetShare:ni(t.budgetPercent)/100,outsideMode:t.outsideMode,outsideDepth:Math.max(0,Math.round(t.outsideDepth))});function ai({value:t,onChange:e,onApply:i}){const r=(n,u)=>e({...t,[n]:u});return T.jsxs("div",{className:"pointcloud-roi-panel",children:[T.jsxs("label",{className:"pointcloud-roi-heading",children:[T.jsx("input",{type:"checkbox",checked:t.enabled,onChange:n=>r("enabled",n.target.checked)}),"Named-road ROI"]}),T.jsxs("label",{children:["Road / path",T.jsx("select",{value:t.roadName,onChange:n=>r("roadName",n.target.value),children:$n.map(n=>T.jsx("option",{value:n.properties.name,children:n.properties.name},n.properties.name))})]}),T.jsxs("label",{children:["Corridor width ",t.widthMeters.toFixed(0)," m",T.jsx("input",{type:"range",min:2,max:80,step:2,value:t.widthMeters,onChange:n=>r("widthMeters",Number(n.target.value))})]}),T.jsxs("label",{children:["ROI budget ",t.budgetPercent.toFixed(0),"%",T.jsx("input",{type:"range",min:10,max:100,step:5,value:t.budgetPercent,onChange:n=>r("budgetPercent",Number(n.target.value))})]}),T.jsxs("label",{children:["Outside",T.jsxs("select",{value:t.outsideMode,onChange:n=>r("outsideMode",n.target.value),children:[T.jsx("option",{value:"hide",children:"Hide"}),T.jsx("option",{value:"uniform",children:"Uniform tree level"})]})]}),t.outsideMode==="uniform"&&T.jsxs("label",{children:["Outside tree level ",t.outsideDepth,T.jsx("input",{type:"range",min:0,max:8,value:t.outsideDepth,onChange:n=>r("outsideDepth",Number(n.target.value))})]}),T.jsx("button",{type:"button",onClick:i,children:"Apply named road"})]})}const Yn=t=>t==="none"||t==="rgb"||t==="classification"?null:t,Zn=(t,e)=>{const i=t.ranges.get(e)??{min:1/0,max:-1/0,chunkCount:0};for(let r=i.chunkCount;r<t.chunks.length;r++){const n=t.chunks[r].fieldValues[e];if(n)for(let u=0;u<n.length;u++){const s=n[u];Number.isFinite(s)&&(s<i.min&&(i.min=s),s>i.max&&(i.max=s))}}return i.chunkCount=t.chunks.length,t.ranges.set(e,i),Number.isFinite(i.min)&&Number.isFinite(i.max)?[i.min,i.max]:[0,1]},oi=(t,e)=>e.color==="intensity"?{mode:3,rampTexture:Gn(e.colorRamp),range:e.clampMode==="manual"?[e.clampMin,e.clampMax]:Zn(t,"intensity"),gamma:1}:{mode:e.color==="white"?0:e.color==="rgb"?1:2},si=(t,e)=>{if(e.metric==="none")return{mode:0};if(e.metric==="rgb")return{mode:1};if(e.metric==="classification")return{mode:2};const i=e.clampMode==="manual"?[e.clampMin,e.clampMax]:Zn(t,e.metric);return{mode:3,rampTexture:Gn(e.colorRamp),range:i,gamma:1}},Jn=(t,e)=>{const i=Yn(e);i!==t.uploadedMetric&&(t.chunks.forEach((r,n)=>{t.visualizer.setChunkField("b",n,i?r.fieldValues[i]??null:null)}),t.uploadedMetric=i)},Qn=(t,e)=>{const i=e==="intensity"?"intensity":null;i!==t.uploadedBaseField&&(t.chunks.forEach((r,n)=>{t.visualizer.setChunkField("a",n,i?r.fieldValues[i]??null:null)}),t.uploadedBaseField=i)},er=(t,e)=>{Qn(t,e.color),Jn(t,e.metric);const i=e.metricBlendMode==="multiply"?1:0;t.visualizer.setColorization(oi(t,e),si(t,e),{mode:0},{mode:i,opacity:1},{mode:0,opacity:0})},li=(t,e)=>{t.meshDesiredVisible=e.showMesh2024;const i=t.meshDesiredErrorTarget!==e.meshErrorTarget;if(t.meshDesiredErrorTarget=e.meshErrorTarget,t.meshOpacity=e.meshOpacity,t.meshWhite=e.meshWhite,e.showMesh2024&&t.metadata&&!t.mesh&&!t.meshLoad){t.meshLoadStateChange("loading");let r=!1;const n=ti(t.scene,t.renderer,t.camera,t.metadata,e.sourceHeightDatum,e.meshErrorTarget,e.meshOpacity,e.meshWhite,u=>{r||(r=!0,t.meshLoadStateChange("loaded")),u.traverse(s=>{if(s.userData.isRegistrationWireframeOverlay)return;const p=s.material;(Array.isArray(p)?p:[p]).forEach(m=>{m&&(m.transparent=t.meshOpacity<1,m.opacity=t.meshOpacity,t.meshWhite&&"color"in m&&m.color.set(16777215),m.needsUpdate=!0)})}),t.meshInspectionPreview&&ft(u,{enabled:!0,opacity:t.meshPreviewOpacity,wireframe:t.meshPreviewWireframe})},u=>t.meshStatusChange(u)).then(u=>{if(t.disposed||!t.meshDesiredVisible){u.dispose();return}u.applyErrorTarget(t.meshDesiredErrorTarget),u.tiles.group.traverse(s=>{if(s.userData.isRegistrationWireframeOverlay)return;const p=s.material;(Array.isArray(p)?p:[p]).forEach(m=>{m&&(m.transparent=t.meshOpacity<1,m.opacity=t.meshOpacity,t.meshWhite&&"color"in m&&m.color.set(16777215),m.needsUpdate=!0)})}),t.mesh=u,t.meshInspectionPreview&&ft(t.mesh.tiles.group,{enabled:!0,opacity:t.meshPreviewOpacity,wireframe:t.meshPreviewWireframe})}).catch(u=>{t.meshLoadStateChange("error"),t.disposed||t.reportError(`Mesh 2024: ${u instanceof Error?u.message:String(u)}`)}).finally(()=>{t.meshLoad===n&&(t.meshLoad=void 0)});t.meshLoad=n}else!e.showMesh2024&&t.mesh&&(t.mesh.dispose(),t.mesh=void 0,t.meshStatusChange(null));t.mesh&&(i&&t.mesh.applyErrorTarget(e.meshErrorTarget),t.mesh.tiles.group.traverse(r=>{if(r.userData.isRegistrationWireframeOverlay)return;const n=r.material;!n||Array.isArray(n)||(n.transparent=e.meshOpacity<1,n.opacity=e.meshOpacity,n.needsUpdate=!0)}),t.meshInspectionPreview&&ft(t.mesh.tiles.group,{enabled:!0,opacity:t.meshPreviewOpacity,wireframe:t.meshPreviewWireframe})),t.visualizer.setDepthTest(!0),t.visualizer.group.renderOrder=0},ft=(t,e)=>{t.traverse(i=>{const r=i;if(!r.material||r.userData.isRegistrationWireframeOverlay)return;const n=r.userData.registrationWireframeOverlay;if(e.enabled&&e.wireframe&&!n){const s=new Wn(new qn(r.geometry),new Hn({color:0,transparent:!1,opacity:1,depthTest:!0,depthWrite:!1}));s.renderOrder=1001,s.userData.isRegistrationWireframeOverlay=!0,r.add(s),r.userData.registrationWireframeOverlay=s}else(!e.enabled||!e.wireframe)&&n&&(r.remove(n),n.geometry.dispose(),n.material.dispose(),delete r.userData.registrationWireframeOverlay);(Array.isArray(r.material)?r.material:[r.material]).forEach(s=>{const p=s;p.userData.registrationPreview||(p.userData.registrationPreview={transparent:s.transparent,opacity:s.opacity,wireframe:p.wireframe,color:"color"in s?s.color.getHex():void 0,polygonOffset:s.polygonOffset,polygonOffsetFactor:s.polygonOffsetFactor,polygonOffsetUnits:s.polygonOffsetUnits});const g=p.userData.registrationPreview;s.transparent=e.enabled||g.transparent,s.opacity=e.enabled?e.opacity:g.opacity,p.wireframe=g.wireframe;const m=e.enabled&&e.wireframe;s.polygonOffset=m||g.polygonOffset,s.polygonOffsetFactor=m?1:g.polygonOffsetFactor,s.polygonOffsetUnits=m?1:g.polygonOffsetUnits,"color"in s&&s.color.setHex(g.color??16777215),s.needsUpdate=!0})})},di=(t,e)=>{t.meshInspectionPreview=e.enabled,t.meshPreviewOpacity=e.opacity,t.meshPreviewWireframe=e.wireframe,t.mesh&&ft(t.mesh.tiles.group,e)},tr=t=>{const e=t.roiGuide;if(!e)return;t.scene.remove(e),e.geometry.dispose(),(Array.isArray(e.material)?e.material:[e.material]).forEach(r=>r.dispose()),t.roiGuide=void 0},ci=(t,e,i)=>{if(tr(t),!i.enabled||!t.metadata){t.visualizer.setClipCorridor(null);return}const r=ei(i.roadName,t.metadata);t.visualizer.setClipCorridor(i.outsideMode==="hide"?{segments:r,halfWidth:Math.max(1,i.widthMeters)/2}:null);const n=e.heightOffset+t.metadata.zMax-t.metadata.zBase,u=new Float32Array(r.flatMap(m=>[m.startX,n,m.startZ,m.endX,n,m.endZ])),s=new mt;s.setAttribute("position",new Bt(u,3));const p=new Hn({color:43208,depthTest:!1,transparent:!0,opacity:.9}),g=new Wn(s,p);g.renderOrder=10,t.scene.add(g),t.roiGuide=g},He=(t,e,i)=>{t.visualizer.setSizeMode(e.sizeMode),t.visualizer.setPointSize(e.pointSize),t.visualizer.setRadiusMeters(e.radiusMeters),t.visualizer.setRadiusScale(e.radiusScale),t.visualizer.setShape(e.shape),t.visualizer.setHeightOffset(e.heightOffset),er(t,e),li(t,e),t.visualizer.setCompositeMode(e.pointCompositeMode),t.scene.background=new Vn(e.background==="white"?16777215:0),ci(t,e,i)},Fn=(t,e)=>e.enabled&&t.metadata?` · ${e.roadName} ${t.metadata.selectedInsidePoints.toLocaleString()} / outside ${t.metadata.selectedOutsidePoints.toLocaleString()}`:"";function ui({datasetUrl:t,datasetName:e,sourceTag:i,acquiredOn:r=null,registration:n,fieldDimensions:u,hasRgb:s=!0,pointBudgetPercent:p=100,sizeMode:g=Vr.METERS,pointSize:m=2,radiusMeters:O=.3,radiusScale:D=1,shape:o=jr.CIRCLE,color:x="rgb",metric:z="z",metricBlendMode:A="multiply",colorRamp:R="elevation",clampMode:se="auto",clampMin:X=0,clampMax:V=1,pointCompositeMode:q="normal",background:Ce="white",sourceHeightDatum:we=Xn.DHHN2016,heightOffset:ue=0,showMesh2024:pe=!1,meshErrorTarget:Be=12,meshOpacity:xe=1,meshWhite:be=!1,roadRoiEnabled:ze=!1,roadName:me=Jr,roadWidthMeters:le=24,roadBudgetPercent:fe=85,roadOutsideMode:he="uniform",roadOutsideDepth:Ee=2,showRoadRoiControls:Ke=!1,showFieldColorizer:ht=!1,showFieldColorizerButton:ge=!0,pickingEnabled:Le=!1,pickKind:Se,registrationMatrix:Ne,sourceTransform:Ue,onMountPriorResolved:Xe,cameraStorageKey:de,autoMaximizeOnCameraEnd:I=!1,onPick:J,onPairPicked:Re,onColorizerOptionsChange:gt,onMeshLoadStateChange:yt,onViewerReady:vt}){const Vt=P.useRef(null),ye=P.useRef(null),jt=P.useRef(I);jt.current=I;const[Q,Wt]=P.useState({enabled:ze,roadName:me,widthMeters:le,budgetPercent:fe,outsideMode:he,outsideDepth:Ee}),[Ht,Gt]=P.useState(Q),Oe=P.useRef(Q);Oe.current=Q;const Ye=P.useRef({}),$t=P.useRef(null),_=P.useRef({sizeMode:g,pointSize:m,radiusMeters:O,radiusScale:D,shape:o,color:x,metric:z,metricBlendMode:A,colorRamp:R,clampMode:se,clampMin:X,clampMax:V,pointCompositeMode:q,background:Ce,sourceHeightDatum:we,heightOffset:ue,showMesh2024:pe,meshErrorTarget:Be,meshOpacity:xe,meshWhite:be});_.current={sizeMode:g,pointSize:m,radiusMeters:O,radiusScale:D,shape:o,color:x,metric:z,metricBlendMode:A,colorRamp:R,clampMode:se,clampMin:X,clampMax:V,pointCompositeMode:q,background:Ce,sourceHeightDatum:we,heightOffset:ue,showMesh2024:pe,meshErrorTarget:Be,meshOpacity:xe,meshWhite:be,...Ye.current};const[nr,Ze]=P.useState("Loading point cloud…"),[Kt,rr]=P.useState(null),[Xt,Je]=P.useState(null),Yt=P.useRef(Le);Yt.current=Le;const Qe=P.useRef(Se);Qe.current=Se,P.useEffect(()=>{var E;(E=ye.current)==null||E.visualizer.setGlobalOpacity(Le&&Se==="mesh"?.5:1)},[Le,Se]);const Zt=P.useRef(J);Zt.current=J;const Jt=P.useRef(Re);Jt.current=Re;const Qt=P.useRef(Ue);Qt.current=Ue;const wt=P.useRef(Xe);wt.current=Xe;const et=P.useRef(Ne??new ce);et.current=Ne??new ce;const[ir,xt]=P.useState(!1),[ar,en]=P.useState(()=>structuredClone(Fr)),[or,sr]=P.useState([]);return P.useEffect(()=>{const E=$t.current;E&&E.color===x&&E.metric===z&&E.colorRamp===R&&E.clampMode===se&&E.clampMin===X&&E.clampMax===V||(Ye.current={});const j=x==="intensity"&&z==="intensity"?null:z==="rgb"?{kind:"rgb"}:z==="classification"?{kind:"classification"}:z==="none"?null:{kind:"field",field:z};en(c=>({...c,layers:[{...c.layers[0],source:x==="rgb"?{kind:"rgb"}:x==="classification"?{kind:"classification"}:x==="intensity"?{kind:"field",field:"intensity"}:{kind:"solid",color:"#ffffff"},ramp:R,clampMin:X,clampMax:V},{...c.layers[1],source:j,ramp:R,clampMin:X,clampMax:V},c.layers[2]]}))},[V,X,x,R,z]),P.useEffect(()=>{const E={enabled:ze,roadName:me,widthMeters:le,budgetPercent:fe,outsideMode:he,outsideDepth:Ee};Wt(v=>_n(v,E)?v:E),Gt(v=>_n(v,E)?v:E)},[fe,me,Ee,he,ze,le]),P.useEffect(()=>{const E=ye.current;E&&He(E,_.current,Oe.current)},[Ce,V,X,se,x,R,ue,Be,xe,be,z,A,m,q,O,D,o,pe,g]),P.useEffect(()=>{var v;const E=ye.current;E!=null&&E.metadata&&((v=E.mesh)==null||v.dispose(),E.mesh=void 0,He(E,_.current,Oe.current))},[we]),P.useEffect(()=>{const E=Vt.current;if(!E)return;Ze("Loading point cloud…"),Je(null);const v=new Mr({antialias:!0});v.setPixelRatio(Math.min(window.devicePixelRatio,2)),v.outputColorSpace=Tr,v.toneMapping=Pr,v.toneMappingExposure=1,E.append(v.domElement);const j=new Cr;j.background=new Vn(_.current.background==="white"?16777215:0);const c=new zr(50,1,.05,1e5);c.position.set(100,80,100);const h=new kr(c,v.domElement);h.enableRotate=!0,h.enableZoom=!1,h.screenSpacePanning=!1,h.mouseButtons.LEFT=At.PAN,h.mouseButtons.MIDDLE=At.ROTATE,h.mouseButtons.RIGHT=At.ROTATE,h.maxPolarAngle=Z.degToRad(85),h.enableDamping=!0,h.dampingFactor=.08;let Ae=0,Me=!1,H=!1,G=!1;const Te={cancelled:!1};let De=0;const Ve=()=>{if(de)try{localStorage.setItem(de,JSON.stringify({position:c.position.toArray(),target:h.target.toArray()}))}catch{}},bt=()=>{de&&(window.clearTimeout(De),De=window.setTimeout(Ve,300))};if(de){try{const a=localStorage.getItem(de);if(a){const d=JSON.parse(a);Array.isArray(d.position)&&Array.isArray(d.target)&&[...d.position,...d.target].every(Number.isFinite)&&(c.position.fromArray(d.position),h.target.fromArray(d.target),h.update(),Me=!0,H=!0)}}catch{}h.addEventListener("end",bt)}const Et=new Cn,tt=new L,tn=new Ge,lr=1.5,nn=a=>{var b,S;a.preventDefault();const d=v.domElement.getBoundingClientRect();tn.set((a.clientX-d.left)/d.width*2-1,-((a.clientY-d.top)/d.height)*2+1),Et.setFromCamera(tn,c),tt.copy(Et.ray.direction);const f=Math.max(c.position.distanceTo(h.target),10),w=Z.clamp(-a.deltaY*35e-5*f,-f*.2,f*.2);let M=w;if(w>0){const C=(S=(b=ye.current)==null?void 0:b.mesh)==null?void 0:S.tiles.group;if(C){const y=Et.intersectObject(C,!0)[0];if(y){const Y=y.distance-lr;M=Math.min(w,Math.max(0,Y*.45))}}}c.position.addScaledVector(tt,M),h.target.addScaledVector(tt,M),h.update(),bt(),Ct(),zt()};v.domElement.addEventListener("wheel",nn,{passive:!1});const rn=a=>a.preventDefault();v.domElement.addEventListener("contextmenu",rn),j.add(new Lr(16777215,3358797,2.2));const an=new Rr(16777215,2.5);an.position.set(300,500,200),j.add(an);const F=qr();j.add(F.group);const ee=new jn;j.add(ee);const St=new Map,on=new ce,Mt=(a,d)=>new Promise(f=>{let w=0;const M=()=>{window.clearInterval(b),window.clearTimeout(S),f()},b=window.setInterval(()=>{var C;if(G||d!=null&&d.cancelled){M();return}w=(C=l.mesh)!=null&&C.isIdle()?w+1:0,w>=3&&M()},250),S=window.setTimeout(M,a)}),sn=()=>{F.group.matrixAutoUpdate=!1,F.group.matrix.copy(et.current),F.group.matrixWorldNeedsUpdate=!0,on.copy(et.current).invert()};sn();const l={scene:j,renderer:v,camera:c,visualizer:F,chunks:[],chunksByNodeKey:new Map,ranges:new Map,uploadedMetric:null,uploadedBaseField:null,meshDesiredVisible:_.current.showMesh2024,meshDesiredErrorTarget:_.current.meshErrorTarget,meshOpacity:_.current.meshOpacity,meshWhite:_.current.meshWhite,meshInspectionPreview:!1,meshPreviewOpacity:.5,meshPreviewWireframe:!0,disposed:!1,reportError:Je,meshLoadStateChange:a=>{yt==null||yt(a)},meshStatusChange:rr};ye.current=l;const te=Yr(),je={url:t,registration:n,fieldDimensions:u,includeRgb:s,pointBudgetPercent:p,roi:Q.enabled?ii(Q):void 0},Tt=new Map;let Pt=0;const ln=()=>{sr([...Tt.values()].map(a=>{const d=Math.max(...a.histogram,1);return{...a,histogram:a.histogram.map(f=>f/d)}}))},dn=a=>{if(G||a.nodeKey&&l.chunksByNodeKey.has(a.nodeKey))return;l.chunks.push(a),a.nodeKey&&l.chunksByNodeKey.set(a.nodeKey,a),Object.entries(a.fieldValues).forEach(([w,M])=>{const b=Tt.get(w)??{name:w,min:1/0,max:-1/0,empty:!0,histogram:Array.from({length:32},()=>0)};M.forEach(C=>{Number.isFinite(C)&&(b.min=Math.min(b.min,C),b.max=Math.max(b.max,C),b.empty=!1)});const S=b.max-b.min||1;M.forEach(C=>{if(!Number.isFinite(C))return;const y=Z.clamp(Math.floor((C-b.min)/S*b.histogram.length),0,b.histogram.length-1);b.histogram[y]+=1}),Tt.set(w,b)}),Pt+=1,Pt>=8&&(Pt=0,ln()),F.addChunk(a);const d=_.current.color==="intensity"?"intensity":null;d&&d===l.uploadedBaseField?F.setChunkField("a",l.chunks.length-1,a.fieldValues[d]??null):Qn(l,_.current.color);const f=Yn(_.current.metric);f&&f===l.uploadedMetric?F.setChunkField("b",l.chunks.length-1,a.fieldValues[f]??null):Jn(l,_.current.metric),er(l,_.current),Me||(Me=!0,ct(F.group,c,h))},cn=()=>{l.refineToken&&(l.refineToken.cancelled=!0);const a={cancelled:!1};l.refineToken=a,c.updateMatrixWorld(),l.visualizer.group.updateWorldMatrix(!0,!0);const d=new zn().setFromProjectionMatrix(new ce().multiplyMatrices(c.projectionMatrix,c.matrixWorldInverse)),f=l.visualizer.group.matrixWorld.clone(),w=y=>d.intersectsBox(new ve(new L(y[0],y[1],y[2]),new L(y[3],y[4],y[5])).applyMatrix4(f));l.chunks.filter(y=>y.nodeKey&&y.boundsLocal&&!w(y.boundsLocal)).forEach(y=>{l.visualizer.removeChunk(y.nodeKey),l.chunksByNodeKey.delete(y.nodeKey)}),l.chunks=l.chunks.filter(y=>!y.nodeKey||l.chunksByNodeKey.has(y.nodeKey)),l.visualizer.setPointBudget(Number.POSITIVE_INFINITY);const M=l.mesh,b=Math.min(.05,l.meshDesiredErrorTarget);M&&(M.applyErrorTarget(b),M.kick());const S=new L,C=y=>(S.set((y[0]+y[3])/2,(y[1]+y[4])/2,(y[2]+y[5])/2).applyMatrix4(f).project(c),Math.hypot(S.x,S.y));l.copcSource??(l.copcSource=te?te.openSource(je):Wr({...je,cancelToken:Te})),Promise.all([l.copcSource,Mt(9e4,a)]).then(async([y])=>{let Y=0;const ot=y.nodes.filter(W=>!l.chunksByNodeKey.has(W.key)).filter(W=>w(W.boundsLocal)).map(W=>({node:W,screenDistance:C(W.boundsLocal)})).sort((W,ke)=>W.screenDistance-ke.screenDistance||W.node.depth-ke.node.depth);for(const{node:W}of ot){if(a.cancelled||G)return;if(Y+W.pointCount>ri)break;if(l.mesh&&!l.mesh.isIdle()&&(await Mt(3e4,a),a.cancelled||G))return;const ke=await y.loadNode(W.key);if(a.cancelled||G)return;dn(ke),Y+=W.pointCount,Ze(`${F.pointCount.toLocaleString()} points (maximized view)`),await new Promise(We=>setTimeout(We,0))}}).catch(y=>{G||a.cancelled||Je(y instanceof Error?y.message:String(y))})};let nt=0;const un=c.position.clone(),pn=c.quaternion.clone(),Ct=()=>{window.clearTimeout(nt),l.refineToken&&(l.refineToken.cancelled=!0)},zt=()=>{const a=l.mesh;if(a){const d=Math.max(c.position.distanceTo(h.target),10);c.position.distanceTo(un)>d*.2||c.quaternion.angleTo(pn)>Z.degToRad(10)?(a.resetProgressiveLoad(),un.copy(c.position),pn.copy(c.quaternion)):a.kick()}jt.current&&(window.clearTimeout(nt),nt=window.setTimeout(cn,400))};h.addEventListener("start",Ct),h.addEventListener("end",zt),vt==null||vt({framePointCloud:()=>ct(l.visualizer.group,c,h),frameMesh:()=>{l.mesh&&ct(l.mesh.tiles.group,c,h)},frameRegistrationPairs:a=>{if(a.length===0)return;const d=new ve().setFromPoints([...a]);if(d.isEmpty())return;const f=d.getCenter(new L),w=d.getSize(new L),M=Math.max(w.length()*.5,2),b=M/Math.tan(Z.degToRad(c.fov/2)),S=new L(1,.72,1).normalize();h.target.copy(f),c.position.copy(f).addScaledVector(S,b*1.65),c.near=Math.max(.05,M/1e4),c.far=Math.max(2e3,M*100),c.updateProjectionMatrix(),h.update()},maximizeCurrentView:cn,setRegistrationPairLines:(a,d=null)=>{if(ee.children.slice().forEach(k=>{if(ee.remove(k),"geometry"in k&&k.geometry instanceof mt&&k.geometry.dispose(),"material"in k){const $=k.material;(Array.isArray($)?$:[$]).forEach(K=>K.dispose())}}),a.length===0)return;const f=new Ge(v.domElement.width,v.domElement.height),w=new Fe({color:1054752,transparent:!0,opacity:.95,linewidth:7,resolution:f}),M=new Fe({color:16773632,transparent:!0,opacity:1,linewidth:3,resolution:f}),b=new Fe({color:58879,transparent:!0,opacity:1,linewidth:4,resolution:f});w.depthTest=!1,w.depthWrite=!1,M.depthTest=!1,M.depthWrite=!1,b.depthTest=!1,b.depthWrite=!1,a.forEach(({pointcloud:k,mesh:$},K)=>{const re=new Xr;re.setPositions([k.x,k.y,k.z,$.x,$.y,$.z]);const Ie=new Ft(re,w),_e=new Ft(re,K===d?b:M);Ie.renderOrder=900,_e.renderOrder=901,Ie.userData.pairIndex=K,_e.userData.pairIndex=K,ee.add(Ie,_e)});const S=new Float32Array(a.length*3),C=new Float32Array(a.length*3);a.forEach(({pointcloud:k},$)=>{S.set([k.x,k.y,k.z],$*3),C.set($===d?[0,.9,1]:[1,.83,0],$*3)});const y=new mt;y.setAttribute("position",new Bt(S,3)),y.setAttribute("color",new Bt(C,3));const Y=new Dt(y,new Or({vertexColors:!0,size:8,sizeAttenuation:!1,depthTest:!1,depthWrite:!1,transparent:!0}));Y.renderOrder=902,Y.userData.pairAnchorKind="pointcloud";const ot=[],W=[],ke=[[new L(1,0,0),1,.15,.15],[new L(0,1,0),.2,1,.2],[new L(0,0,1),.2,.4,1]];a.forEach(({mesh:k},$)=>{const K=$===d?1:.45;ke.forEach(([re,Ie,_e,Tn])=>{ot.push(k.x-re.x,k.y-re.y,k.z-re.z,k.x+re.x,k.y+re.y,k.z+re.z),W.push(Ie*K,_e*K,Tn*K,Ie*K,_e*K,Tn*K)})});const We=new Ut;We.setPositions(ot),We.setColors(W);const Ot=new Ft(We,new Fe({vertexColors:!0,linewidth:3,resolution:f,depthTest:!1,depthWrite:!1,transparent:!0}));Ot.renderOrder=902,Ot.userData.pairAxes=!0,ee.add(Y,Ot),ee.renderOrder=900},highlightPoint:(a,d)=>{let f=St.get(a);if(!f){const w=new Ar({color:a==="pointcloud"?16765952:16726832});w.depthTest=!1,w.depthWrite=!1,f=new Un(new Dr(.45,12,8),w),f.userData.registrationMarker=a,f.renderOrder=1e3,St.set(a,f),j.add(f)}f.position.copy(d),a==="pointcloud"&&f.position.applyMatrix4(et.current),f.updateMatrix()},setMeshInspectionPreview:a=>di(l,a),openFieldColorizer:()=>xt(!0)}),He(l,_.current,Oe.current);const ne=new Cn,rt=new Ge;let it=!1,mn=0,fn=0;const dr=3e6,cr=a=>{const d=v.domElement.getBoundingClientRect();rt.set((a.clientX-d.left)/d.width*2-1,-((a.clientY-d.top)/d.height)*2+1),ne.setFromCamera(rt,c),ne.params.Points.threshold=Z.clamp(c.position.distanceTo(h.target)*.01,.25,3);const w=(l.mesh?ne.intersectObject(l.mesh.tiles.group,!0)[0]:void 0)??(F.pointCount<=dr?ne.intersectObject(F.group,!0)[0]:void 0);if(!w)return;const M=c.getWorldDirection(tt),b=w.point.clone().sub(c.position).dot(M);b<=c.near*2||(h.target.copy(c.position).addScaledVector(M,b),h.update())},hn=a=>{it=!1,mn=a.clientX,fn=a.clientY,(a.button===0||a.button===2)&&cr(a)},gn=a=>{Math.hypot(a.clientX-mn,a.clientY-fn)>5&&(it=!0)},yn=a=>{if(it||a.button!==0){it=!1;return}const d=v.domElement.getBoundingClientRect();rt.set((a.clientX-d.left)/d.width*2-1,-((a.clientY-d.top)/d.height)*2+1),ne.setFromCamera(rt,c),ne.params.Points.threshold=Z.clamp(c.position.distanceTo(h.target)*.01,.25,3);const f=Zt.current;if(!Yt.current||!f){const S=Jt.current;if(!S)return;ne.params.Line2={threshold:0};const C=ne.intersectObject(ee,!0)[0];if(!C)return;const y=C.object.userData,Y=typeof y.pairIndex=="number"?y.pairIndex:y.pairAnchorKind==="pointcloud"&&C.index!==void 0?C.index:y.pairAxes&&C.faceIndex!==void 0&&C.faceIndex!==null?Math.floor(C.faceIndex/3):void 0;Y!==void 0&&S(Y);return}const w=ne.intersectObject(F.group,!0)[0],M=l.mesh?ne.intersectObject(l.mesh.tiles.group,!0)[0]:void 0,b=S=>{if(!(S.object instanceof Dt)||S.index===void 0)return S.point.clone();const C=S.object.geometry.getAttribute("position");return S.object.localToWorld(new L().fromBufferAttribute(C,S.index))};Qe.current==="pointcloud"&&w?f("pointcloud",b(w).applyMatrix4(on)):Qe.current==="mesh"&&M?f("mesh",M.point.clone()):!Qe.current&&w&&f("pointcloud",b(w))};v.domElement.addEventListener("pointerdown",hn),v.domElement.addEventListener("pointermove",gn),v.domElement.addEventListener("click",yn);const vn=()=>{var w;const a=Math.max(E.clientWidth,1),d=Math.max(E.clientHeight,1);v.setSize(a,d,!1),c.aspect=a/d,c.updateProjectionMatrix();const f=v.getDrawingBufferSize(new Ge);F.setViewport(f.x,f.y),(w=l.mesh)==null||w.tiles.setResolutionFromRenderer(c,v),ee.traverse(M=>{const b="material"in M?M.material:void 0;b instanceof Fe&&b.resolution.set(v.domElement.width,v.domElement.height)})},wn=new ResizeObserver(vn);wn.observe(E),vn();const xn=new zn,at=new ce,bn=new ce,Lt=new ve;let En=-1,Sn=0;const Mn=()=>{var a;if(Ae=window.requestAnimationFrame(Mn),sn(),h.update(),(a=l.mesh)==null||a.tiles.update(),Sn--<=0){Sn=6;const d=Math.max(c.position.distanceTo(h.target),1),f=Math.max(.05,d/5e3),w=Math.max(5e3,d*200);(Math.abs(c.near-f)/f>.25||Math.abs(c.far-w)/w>.25)&&(c.near=f,c.far=w,c.updateProjectionMatrix()),c.updateMatrixWorld(),l.visualizer.group.updateWorldMatrix(!0,!1),at.multiplyMatrices(c.projectionMatrix,c.matrixWorldInverse).multiply(l.visualizer.group.matrixWorld);const M=l.visualizer.group.children.length;if(!at.equals(bn)||M!==En){bn.copy(at),En=M,xn.setFromProjectionMatrix(at);for(const b of l.visualizer.group.children){if(!(b instanceof Dt))continue;const S=l.chunksByNodeKey.get(b.userData.nodeKey);S!=null&&S.boundsLocal&&(Lt.min.set(S.boundsLocal[0],S.boundsLocal[1],S.boundsLocal[2]),Lt.max.set(S.boundsLocal[3],S.boundsLocal[4],S.boundsLocal[5]),b.visible=xn.intersectsBox(Lt))}}}v.render(j,c)};Mn();const Rt={onMetadata:async a=>{if(G)return;l.metadata=a;const d=Qt.current;d&&wt.current&&wt.current(new ce().fromArray(Hr(d.matrix,a.sourceOrigin))),He(l,_.current,Oe.current),_.current.showMesh2024&&await Mt(45e3)},onChunk:dn,onProgress:(a,d)=>{G||Ze(`${a.toLocaleString()} / ${d.toLocaleString()} points (${p}%)${Fn(l,Q)}`)}};return(te?te.stream(je,Rt).catch(a=>{if(G||l.metadata)throw a;return l.copcSource=void 0,Rn({...je,cancelToken:Te,...Rt})}):Rn({...je,cancelToken:Te,...Rt})).then(()=>{G||(ln(),H||ct(Q.enabled&&Q.outsideMode==="hide"&&l.roiGuide?l.roiGuide:F.group,c,h),Ze(`${F.pointCount.toLocaleString()} points (${p}%)${Fn(l,Q)}`))}).catch(a=>{G||Je(a instanceof Error?a.message:String(a))}),()=>{var a;G=!0,l.disposed=!0,l.refineToken&&(l.refineToken.cancelled=!0),Te.cancelled=!0,te==null||te.cancelStream(),te==null||te.dispose(),window.clearTimeout(De),window.clearTimeout(nt),Ve(),h.removeEventListener("end",bt),h.removeEventListener("start",Ct),h.removeEventListener("end",zt),wn.disconnect(),window.cancelAnimationFrame(Ae),h.dispose(),(a=l.mesh)==null||a.dispose(),tr(l),j.remove(F.group),j.remove(ee),ee.traverse(d=>{if("geometry"in d&&d.geometry instanceof mt&&d.geometry.dispose(),"material"in d){const f=d.material;(Array.isArray(f)?f:[f]).forEach(w=>w.dispose())}}),St.forEach(d=>{d.geometry.dispose(),d.material.dispose(),j.remove(d)}),F.dispose(),v.dispose(),v.domElement.remove(),v.domElement.removeEventListener("click",yn),v.domElement.removeEventListener("pointerdown",hn),v.domElement.removeEventListener("pointermove",gn),v.domElement.removeEventListener("wheel",nn),v.domElement.removeEventListener("contextmenu",rn),ye.current===l&&(ye.current=null)}},[de,t,n,u,s,p,Q]),T.jsxs("div",{ref:Vt,className:"pointcloud-viewer",style:{background:Ce==="white"?"#fff":"#000"},children:[T.jsxs("div",{className:`pointcloud-status${Xt?" is-error":""}`,children:[e&&T.jsxs("div",{className:"pointcloud-status-metadata",children:[T.jsx("strong",{children:e}),i&&T.jsx("span",{children:i}),T.jsx("span",{children:Br(r)})]}),T.jsx("div",{children:Xt??nr}),Kt&&T.jsx("div",{className:"pointcloud-mesh-status",children:Kt})]}),Ke&&T.jsx(ai,{value:Ht,onChange:Gt,onApply:()=>Wt({...Ht})}),ht&&(ir?T.jsx(Nr,{title:"Point cloud field colorizer",onClose:()=>xt(!1),showClose:!1,className:"point-colorizer-modal",initial:{x:24,y:72},zIndex:40,children:T.jsx(Ur,{fields:or,hasRgb:s,value:ar,onChange:E=>{var Te,De,Ve;en(E);const v=E.layers[0],j=E.layers[1],c=j.source??null,h=v.source,Ae=(c==null?void 0:c.kind)==="field"?c.field:(c==null?void 0:c.kind)==="rgb"?"rgb":(c==null?void 0:c.kind)==="classification"?"classification":"none",Me=(h==null?void 0:h.kind)==="field"&&h.field==="intensity"?"intensity":(h==null?void 0:h.kind)==="rgb"?"rgb":(h==null?void 0:h.kind)==="classification"?"classification":"white",H=(h==null?void 0:h.kind)==="field"?v:j;_.current={..._.current,color:Me,metric:Ae,colorRamp:H.ramp,clampMode:((Te=H.source)==null?void 0:Te.kind)==="field"?"manual":"auto",clampMin:H.clampMin,clampMax:H.clampMax},Ye.current={color:Me,metric:Ae,colorRamp:H.ramp,clampMode:((De=H.source)==null?void 0:De.kind)==="field"?"manual":"auto",clampMin:H.clampMin,clampMax:H.clampMax},$t.current=Ye.current,gt==null||gt({color:Me,metric:Ae,colorRamp:H.ramp,clampMode:((Ve=H.source)==null?void 0:Ve.kind)==="field"?"manual":"auto",clampMin:H.clampMin,clampMax:H.clampMax});const G=ye.current;G&&He(G,_.current,Oe.current)},storageKey:"carma-mesh-registration-colorizer"})}):ge?T.jsx("button",{type:"button",className:"pointcloud-colorizer-reopen",onClick:()=>xt(!0),children:"Open field colorizer"}):null)]})}ui.__docgenInfo={description:"",methods:[],displayName:"StandalonePointCloudViewer",props:{datasetUrl:{required:!0,tsType:{name:"string"},description:""},datasetName:{required:!1,tsType:{name:"string"},description:""},sourceTag:{required:!1,tsType:{name:"string"},description:""},acquiredOn:{required:!1,tsType:{name:"union",raw:"PointCloudAcquisitionDate | null",elements:[{name:"PointCloudAcquisitionDate"},{name:"null"}]},description:"",defaultValue:{value:"null",computed:!1}},registration:{required:!1,tsType:{name:"CopcRigidRegistration"},description:""},fieldDimensions:{required:!1,tsType:{name:"unknown"},description:"Canonical lowercase scalar fields decoded from each COPC node."},hasRgb:{required:!1,tsType:{name:"boolean"},description:"Whether the asset-wide audit found usable varying RGB channels.",defaultValue:{value:"true",computed:!1}},pointBudgetPercent:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},sizeMode:{required:!1,tsType:{name:"union",raw:'"auto" | "pixels" | "meters"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"pixels"'},{name:"literal",value:'"meters"'}]},description:"",defaultValue:{value:'"meters"',computed:!1}},pointSize:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"2",computed:!1}},radiusMeters:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0.3",computed:!1}},radiusScale:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},shape:{required:!1,tsType:{name:"unknown[union]",raw:"(typeof POINT_SHAPES)[keyof typeof POINT_SHAPES]"},description:"",defaultValue:{value:'"circle"',computed:!1}},color:{required:!1,tsType:{name:"union",raw:'"white" | "rgb" | "classification" | "intensity"',elements:[{name:"literal",value:'"white"'},{name:"literal",value:'"rgb"'},{name:"literal",value:'"classification"'},{name:"literal",value:'"intensity"'}]},description:"",defaultValue:{value:'"rgb"',computed:!1}},metric:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof POINT_METRICS)[number]"},description:"",defaultValue:{value:'"z"',computed:!1}},metricBlendMode:{required:!1,tsType:{name:"union",raw:'"normal" | "multiply"',elements:[{name:"literal",value:'"normal"'},{name:"literal",value:'"multiply"'}]},description:"",defaultValue:{value:'"multiply"',computed:!1}},colorRamp:{required:!1,tsType:{name:"union",raw:`| "viridis"
| "inferno"
| "turbo"
| "spectral"
| "elevation"
| "grayscale"
| "classification"`,elements:[{name:"literal",value:'"viridis"'},{name:"literal",value:'"inferno"'},{name:"literal",value:'"turbo"'},{name:"literal",value:'"spectral"'},{name:"literal",value:'"elevation"'},{name:"literal",value:'"grayscale"'},{name:"literal",value:'"classification"'}]},description:"",defaultValue:{value:'"elevation"',computed:!1}},clampMode:{required:!1,tsType:{name:"union",raw:'"auto" | "manual"',elements:[{name:"literal",value:'"auto"'},{name:"literal",value:'"manual"'}]},description:"",defaultValue:{value:'"auto"',computed:!1}},clampMin:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},clampMax:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},pointCompositeMode:{required:!1,tsType:{name:"union",raw:'"normal" | "multiply" | "screen"',elements:[{name:"literal",value:'"normal"'},{name:"literal",value:'"multiply"'},{name:"literal",value:'"screen"'}]},description:"",defaultValue:{value:'"normal"',computed:!1}},background:{required:!1,tsType:{name:"union",raw:'"white" | "black"',elements:[{name:"literal",value:'"white"'},{name:"literal",value:'"black"'}]},description:"",defaultValue:{value:'"white"',computed:!1}},sourceHeightDatum:{required:!1,tsType:{name:"unknown[union]",raw:"(typeof POINT_CLOUD_HEIGHT_DATUMS)[keyof typeof POINT_CLOUD_HEIGHT_DATUMS]"},description:"",defaultValue:{value:'"dhhn2016"',computed:!1}},heightOffset:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},showMesh2024:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},meshErrorTarget:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"12",computed:!1}},meshOpacity:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},meshWhite:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},roadRoiEnabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},roadName:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Hochstraße"',computed:!1}},roadWidthMeters:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"24",computed:!1}},roadBudgetPercent:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"85",computed:!1}},roadOutsideMode:{required:!1,tsType:{name:"union",raw:'"hide" | "uniform"',elements:[{name:"literal",value:'"hide"'},{name:"literal",value:'"uniform"'}]},description:"",defaultValue:{value:'"uniform"',computed:!1}},roadOutsideDepth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"2",computed:!1}},showRoadRoiControls:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showFieldColorizer:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showFieldColorizerButton:{required:!1,tsType:{name:"boolean"},description:"Hides the floating reopen button when an external UI hosts the trigger.",defaultValue:{value:"true",computed:!1}},pickingEnabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},pickKind:{required:!1,tsType:{name:"union",raw:'"pointcloud" | "mesh"',elements:[{name:"literal",value:'"pointcloud"'},{name:"literal",value:'"mesh"'}]},description:""},registrationMatrix:{required:!1,tsType:{name:"THREE.Matrix4"},description:""},sourceTransform:{required:!1,tsType:{name:"signature",type:"object",raw:"{ matrix: readonly number[] }",signature:{properties:[{key:"matrix",value:{name:"unknown",required:!0}}]}},description:"Source-frame mount prior (carma-pointcloud-v1 transform convention)."},onMountPriorResolved:{required:!1,tsType:{name:"signature",type:"function",raw:"(matrix: THREE.Matrix4) => void",signature:{arguments:[{type:{name:"THREE.Matrix4"},name:"matrix"}],return:{name:"void"}}},description:"Reports the mount prior converted into the viewer's scene frame."},cameraStorageKey:{required:!1,tsType:{name:"string"},description:"localStorage key that keeps camera position and target across reloads."},autoMaximizeOnCameraEnd:{required:!1,tsType:{name:"boolean"},description:"Re-runs the maximize-current-view refinement after every camera move.",defaultValue:{value:"false",computed:!1}},onPick:{required:!1,tsType:{name:"signature",type:"function",raw:'(kind: "pointcloud" | "mesh", point: THREE.Vector3) => void',signature:{arguments:[{type:{name:"union",raw:'"pointcloud" | "mesh"',elements:[{name:"literal",value:'"pointcloud"'},{name:"literal",value:'"mesh"'}]},name:"kind"},{type:{name:"THREE.Vector3"},name:"point"}],return:{name:"void"}}},description:""},onPairPicked:{required:!1,tsType:{name:"signature",type:"function",raw:"(pairIndex: number) => void",signature:{arguments:[{type:{name:"number"},name:"pairIndex"}],return:{name:"void"}}},description:"Fires when a pair's scene marker (point, axes, or line) is clicked."},onColorizerOptionsChange:{required:!1,tsType:{name:"signature",type:"function",raw:`(options: {
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
) => void`,signature:{arguments:[{type:{name:"unknown"},name:"pairs"},{type:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}]},name:"selectedPairIndex"}],return:{name:"void"}},required:!0}},{key:"highlightPoint",value:{name:"signature",type:"function",raw:'(kind: "pointcloud" | "mesh", point: THREE.Vector3) => void',signature:{arguments:[{type:{name:"union",raw:'"pointcloud" | "mesh"',elements:[{name:"literal",value:'"pointcloud"'},{name:"literal",value:'"mesh"'}]},name:"kind"},{type:{name:"THREE.Vector3"},name:"point"}],return:{name:"void"}},required:!0}},{key:"setMeshInspectionPreview",value:{name:"signature",type:"function",raw:"(preview: { enabled: boolean; opacity: number; wireframe: boolean }) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ enabled: boolean; opacity: number; wireframe: boolean }",signature:{properties:[{key:"enabled",value:{name:"boolean",required:!0}},{key:"opacity",value:{name:"number",required:!0}},{key:"wireframe",value:{name:"boolean",required:!0}}]}},name:"preview"}],return:{name:"void"}},required:!0}},{key:"openFieldColorizer",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},name:"actions"}],return:{name:"void"}}},description:""}}};export{bi as P,ui as S,Xn as a};
