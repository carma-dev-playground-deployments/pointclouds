import{j as e}from"./jsx-runtime-DNp_qQjF.js";import{useMDXComponents as r}from"./index-CQWN4_cf.js";import{M as t}from"./index-CWBiWwNG.js";import"./index-CSJjS6Ct.js";import"./iframe-DB7FTL_0.js";import"./index-D1cknlJ6.js";import"./index-0qebO5di.js";import"./index-ogSvIofg.js";function i(n){const s={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Pointcloud Investigation/Overview"}),`
`,e.jsx(s.h1,{id:"laz-jpeg-and-geojson-investigation",children:"LAZ, JPEG and GeoJSON investigation"}),`
`,e.jsxs(s.p,{children:[`This Storybook is the executable investigation surface for
`,e.jsx(s.a,{href:"https://github.com/cismet/wupp/issues/4064",rel:"nofollow",children:"wupp#4064"}),` and the related
`,e.jsx(s.a,{href:"https://github.com/cismet/wupp/issues/4089",rel:"nofollow",children:"wupp#4089"}),`. It deliberately uses the
existing COPC loader and point-cloud visualizer methods. The dataset stories put
that shared renderer into a plain Three.js scene, without a map or application
shell; MapLibre remains isolated to the dedicated integration section.`]}),`
`,e.jsx(s.h2,{id:"what-the-issues-require",children:"What the issues require"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:`Explore and verify the point clouds, photographs and geometries already delivered;
do not wait for future campaigns to become complete.`}),`
`,e.jsx(s.li,{children:`Record the preprocessing required to make LAZ data browser-streamable and publish
the resulting data on an HTTP server.`}),`
`,e.jsx(s.li,{children:`Determine whether CARMA's existing MapLibre/Three technology is viable and compare
it with the compromises of an external point-cloud viewer.`}),`
`,e.jsx(s.li,{children:"Provide a directly reachable playground URL and document the findings in the issues."}),`
`,e.jsx(s.li,{children:"Treat Cesium / 3D Dynamic Feature Collections as a separate parallel investigation."}),`
`]}),`
`,e.jsxs(s.p,{children:["Sources: ",e.jsx(s.a,{href:"https://github.com/cismet/wupp/issues/4062",rel:"nofollow",children:"data delivery #4062"}),`,
`,e.jsx(s.a,{href:"https://github.com/cismet/wupp/issues/4064#issuecomment-4810095048",rel:"nofollow",children:"integration investigation #4064"}),`,
`,e.jsx(s.a,{href:"https://github.com/cismet/wupp/issues/4068",rel:"nofollow",children:"Ölberg/F4R data delivery #4068"}),`, and
`,e.jsx(s.a,{href:"https://github.com/cismet/wupp/issues/4089",rel:"nofollow",children:"point-cloud investigation #4089"}),"."]}),`
`,e.jsx(s.h2,{id:"verified-local-dataset-inventory",children:"Verified local dataset inventory"}),`
`,e.jsx(s.p,{children:`| Dataset                               | Source tag     | Acquisition date |  Verified points | Browser artifact | Observed attributes                                          | Height interpretation                                      |
| ------------------------------------- | -------------- | ---------------- | ---------------: | ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| Kaiser-Wilhelm-Hain, RGB              | Fraunhofer     | unknown          |        8,025,198 | 55 MB COPC       | RGB, custom classification                                   | approximately DHHN                                         |
| AWG 2 Wuppertal, 3D segmentation      | Fraunhofer     | unknown          |       14,720,114 | 61 MB COPC       | custom classification                                        | ellipsoidal; ground median about +55.6 m vs DGM1           |
| Wuppertal-Ölberg, MLS                 | F4R            | 2025-09-11       |      969,061,406 | 10 GB COPC       | RGB, intensity, returns; classification effectively constant | DHHN                                                       |
| Nordbahntrasse 0–3000 m, segmentation | Fraunhofer IPM | 2025-12          | about 90 million | 273 MB COPC      | RGB, classification, intensity, returns, user data           | ellipsoidal; ground median +47.9 m vs DGM1                 |`}),`
`,e.jsxs(s.p,{children:["The December delivery additionally contains ",e.jsx(s.strong,{children:"50 classified GeoJSON files"}),` and
`,e.jsx(s.strong,{children:"2,169 JPEGs"}),` across three camera perspectives. The public Twin4Road panorama
source supplies `,e.jsx(s.code,{children:"reference.csv"})," camera poses plus panorama JPEGs."]}),`
`,e.jsx(s.h2,{id:"published-reproducible-tooling",children:"Published reproducible tooling"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"scripts/build-derived.sh"}),": source extraction and untwine → COPC."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"scripts/derive-georadar-survey.mjs"})," and ",e.jsx(s.code,{children:"scripts/build-georadar-mdio-survey.sh"}),": lossless reconstruction and MDIO packaging of all 27 Georadar captures."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"scripts/inventory/scan-fields.sh"}),": LAS/COPC field inventory."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"scripts/verify-elevation.sh"}),": sampled point heights versus Wuppertal DGM1; results stay under ignored ",e.jsx(s.code,{children:".data/reports/"}),"."]}),`
`]}),`
`,e.jsxs(s.p,{children:["Machine-specific source locations are loaded only from ignored ",e.jsx(s.code,{children:".env.local"}),"."]}),`
`,e.jsx(s.h2,{id:"story-sections",children:"Story sections"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Point Clouds"})," — one standalone Three.js story per surface COPC dataset, defaulting to the full file. Controls expose only populated RGB/classification and scalar point metrics for that dataset, uniform pixel/metre sizing, color mixing, ramps, clamp ranges, and optional Mesh 2024 in the same anchored scene."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Elevation Calibration"})," — point cloud and Mesh 2024 in one Three.js scene with the same metric/color controls plus correction and offset controls."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"MapLibre Integration"})," — a fixed bare composition of COPC, a delivered GeoJSON sample, existing vector tiles and terrain elevation."]}),`
`]}),`
`,e.jsx(s.p,{children:`The local Storybook serves the existing COPC files with HTTP Range support without
copying them. A static deployment still requires the generated COPCs and GeoJSON to
be published on the project data server with Range requests and CORS enabled.`}),`
`,e.jsx(s.h2,{id:"georadar-provenance-and-reconstructed-slices",children:"Georadar provenance and reconstructed slices"}),`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.a,{href:"https://doi.org/10.34657/20970",rel:"nofollow",children:"official TWIN4ROAD final report"}),` documents
sequential access for ground-radar data, delivery packages for different depth
layers, precise acquisition trajectories, and browser-based exploration of radar and
core-sample data. The reviewed delivery retains the radar volumes and T0 surface files but
does not include those trajectories or a populated GPS-time attribute.`]}),`
`,e.jsxs(s.p,{children:["The georadar belongs to the same F4R Wuppertal-Ölberg campaign of 2025-09-11 as the large MLS delivery; it is not a Nordbahntrasse dataset. The source order is nevertheless regular and reproducible: each Wuppertal capture contains 25 continuous T0 traces sampled at approximately 7.5 cm, followed by the same surface order in 136 depth layers. The build reconstructs a lossless ",e.jsx(s.code,{children:"[slice, trace, depth]"})," tensor and stores each Slice's horizontal anchor and Forward/Right/Down pose separately in MDIO. This is a reconstruction from delivered record order, not recovered manufacturer metadata."]}),`
`,e.jsxs(s.p,{children:[`The delivered volume coordinates encode the labelled depth layers at an inferred
scale of 50:1: the explicit 25/75/150/250 mm reference layers are stored at Z
-1.25/-3.75/-7.5/-12.5, consistently across all 27 captures. The LAS metadata does
not declare that scale. `,e.jsx(s.code,{children:"DepthMm = -Z × 20"}),` exposes the inferred physical millimetres
without changing the source amplitudes used by the viewers. See the
`,e.jsx(s.a,{href:"../../docs/datenuebersicht.md",children:"German data overview"}),` and the
`,e.jsx(s.a,{href:"../../docs/georadar-mdio-pipeline.md",children:"MDIO pipeline review"})," for the evidence and caveats."]})]})}function m(n={}){const{wrapper:s}={...r(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(i,{...n})}):i(n)}export{m as default};
