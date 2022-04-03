var l=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var T=(a,e)=>{for(var t in e)l(a,t,{get:e[t],enumerable:!0})},y=(a,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of m(e))!h.call(a,r)&&r!==t&&l(a,r,{get:()=>e[r],enumerable:!(s=c(e,r))||s.enumerable});return a};var b=a=>y(l({},"__esModule",{value:!0}),a);var p={};T(p,{default:()=>k});module.exports=b(p);var n=class extends Set{constructor(...e){super(...e);this.contains=this.has;this.copy=this.clone;this.remove=this.delete;this.subtract=this.difference;if(!!n.autoGlobals)if(!n._globalSet)n._globalSet=new Set(this.elements);else for(let t of e)n._globalSet.add(t)}get globalSet(){return new n(n._globalSet?Array.from(n._globalSet):[])}set globalSet(e){n._globalSet=new Set(e.elements)}static from(...e){let t=new n;for(let s of e)if(Array.isArray(s))for(let r of s)t.add(r);else if(s instanceof n||s instanceof Set)for(let r of s.keys())t.add(r);else t.add(s);return t}get elements(){return Array.from(this.keys())}get cardinality(){return this.size}add(e){return n.autoGlobals&&n._globalSet&&n._globalSet.add(e),super.add(e),this}toArray(){return this.elements}isEmpty(){return this.size===0}isSingleton(){return this.size===1}random(){return this.elements[Math.floor(Math.random()*this.size)]}forEach(e,t){for(let s of this.keys())e.call(t,s,s,this)}map(e,t){let s=[];for(let r of this.keys())s.push(e.call(t,r,r,this));return new n(s)}filter(e,t){let s=[];for(let r of this.keys())e.call(t,r,r,this)&&s.push(r);return new n(s)}reduce(e,t){let s=t;for(let r of this.keys())s=e.call(this,s,r,r,this);return s}isSet(e){return e instanceof n||e instanceof Set}clone(){return new n(this.elements)}isSubsetOf(e){for(let t of this.keys())if(!e.has(t))return!1;return!0}isProperSubsetOf(e){return this.size>=e.size?!1:this.isSubsetOf(e)}isSupersetOf(e){return e.isSubsetOf(this)}isProperSupersetOf(e){return this.size<=e.size?!1:this.isSupersetOf(e)}isDisjointOf(e){for(let t of this.keys())if(e.has(t))return!1;return!0}isEqualTo(e){return this.size!==e.size?!1:this.isSubsetOf(e)}union(...e){let t=e.reduce((s,r)=>s.concat(r.elements),this.elements);return new n(t)}intersection(...e){let t=this.elements;for(let s of e){let r=[];for(let o of t)s.has(o)&&r.push(o);t=r}return new n(t)}difference(e){let t=[];for(let s of this.keys())e.has(s)||t.push(s);return new n(t)}symmetricDifference(...e){let t=e.concat(this),s=(r,o)=>{let i=[];for(let S of r.keys())o.has(S)||i.push(S);for(let S of o.keys())r.has(S)||i.push(S);return new n(i)};return t.reduce((r,o)=>s(r,o),new n)}complement(e){let t=this;if(e)return e.difference(this);if(n.autoGlobals&&n._globalSet)t=this.globalSet;else throw new Error(`Global set is not defined: ${e}`);return t.difference(this)}relativeComplement(e){return e.difference(this)}cartesianProduct(e){let t=[];for(let s of this.keys())for(let r of e.keys())t.push([s,r]);return new n(t)}powerSet(){let e=this.elements,t=[],s=(r,o)=>{if(r===e.length){t.push(o);return}s(r+1,o.concat([e[r]])),s(r+1,o)};return s(0,[]),new n(t.map(r=>new n(r)))}subsets(){return function*t(s,r){for(;r<s.length;){let o=s[r++];for(let i of t(s,r))i.push(o),yield i}yield[]}(this.elements,0)}subsetsCount(){return 2**this.size}},f=n;f.autoGlobals=!1;var u=f;var k=u;0&&(module.exports={});
