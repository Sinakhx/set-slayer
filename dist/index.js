var n=class extends Set{constructor(...e){super(...e);this.contains=this.has;this.copy=this.clone;this.remove=this.delete;this.subtract=this.difference;this.relativeComplement=this.difference;!n.autoGlobals||(n._globalSet||(n._globalSet=new Set(Array.from(super.values()))),n.extendGlobalSet(e[0]))}static get globalSet(){let e=n.autoGlobals,t=s=>{n.autoGlobals=s};t(!1);let r=new n(n._globalSet?Array.from(n._globalSet.keys()):[]);return t(e),r}static set globalSet(e){n._globalSet=new Set(e.elements)}static extendGlobalSet(e){n._globalSet||(n._globalSet=new Set);for(let t of e)n._globalSet.add(t)}static clearGlobalSet(){n._globalSet=void 0}static from(...e){let t=new n;for(let r of e)if(Array.isArray(r))for(let s of r)t.add(s);else if(r instanceof n||r instanceof Set)for(let s of r.keys())t.add(s);else t.add(r);return t}get elements(){return Array.from(this.keys())}get cardinality(){return this.size}add(e){return n.autoGlobals&&n._globalSet&&n._globalSet.add(e),super.add(e),this}extends(...e){for(let t of e){let r=Array.isArray(t)?t:Array.from(t.keys());for(let s of r)this.add(s)}return this}toArray(){return this.elements}isEmpty(){return this.size===0}isSingleton(){return this.size===1}random(){return this.elements[Math.floor(Math.random()*this.size)]}stringify(e=", "){let t=(r,s=e,o=0)=>{let a=r.elements.map(i=>i instanceof n?`{ ${t(i,s,1)} }`:JSON.stringify(i)).sort().join(e);return o?a:a?`{ ${a} }`:"{}"};return t(this)}forEach(e,t){for(let r of this.keys())e.call(t,r,r,this)}map(e,t){let r=[];for(let s of this.keys())r.push(e.call(t,s,s,this));return new n(r)}filter(e,t){let r=[];for(let s of this.keys())e.call(t,s,s,this)&&r.push(s);return new n(r)}reduce(e,t){let r=t;for(let s of this.keys())r=e.call(this,r,s,s,this);return r}static isSet(e){return e instanceof n||e instanceof Set}clone(){return new n(this.elements)}isSubsetOf(e){for(let t of this.keys())if(!e.has(t))return!1;return!0}isProperSubsetOf(e){return this.size>=e.size?!1:this.isSubsetOf(e)}isSupersetOf(e){return e.isSubsetOf(this)}isProperSupersetOf(e){return this.size<=e.size?!1:this.isSupersetOf(e)}isDisjointOf(e){for(let t of this.keys())if(e.has(t))return!1;return!0}isEqualTo(e){return this.size!==e.size?!1:this.isSubsetOf(e)}union(...e){let t=e.reduce((r,s)=>r.concat(s.elements),this.elements);return new n(t)}intersection(...e){let t=this.elements;for(let r of e){let s=[];for(let o of t)r.has(o)&&s.push(o);t=s}return new n(t)}difference(e){let t=[];for(let r of this.keys())e.has(r)||t.push(r);return new n(t)}symmetricDifference(...e){let t=e.concat(this),r=(s,o)=>{let a=[];for(let i of s.keys())o.has(i)||a.push(i);for(let i of o.keys())s.has(i)||a.push(i);return new n(a)};return t.reduce((s,o)=>r(s,o),new n)}complement(e){let t=this;if(e)return e.difference(this);if(n.autoGlobals)t=n.globalSet;else throw new Error("autoGlobals is set to false. 'globalset' argument is required.");return t.difference(this)}cartesianProduct(e){let t=[];for(let r of this.keys())for(let s of e.keys())t.push([r,s]);return new n(t)}powerSet(){let e=this.elements,t=[],r=(s,o)=>{if(s===e.length){t.push(o);return}r(s+1,o.concat([e[s]])),r(s+1,o)};return r(0,[]),new n(t.map(s=>new n(s)))}subsets(){return function*t(r,s){for(;s<r.length;){let o=r[s++];for(let a of t(r,s))a.push(o),yield a}yield[]}(this.elements,0)}subsetsCount(){return 2**this.size}},l=n;l.autoGlobals=!1;var S=l;var h=S;export{h as default};
