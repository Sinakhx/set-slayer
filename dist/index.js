var f,n=class{constructor(t=[]){this[f]=this.constructor.name;this.contains=this.has;this.remove=this.delete;this.subtract=this.difference;this.subsets=function*t(s=this.elements,e=0){for(;e<s.length;){let r=s[e++];for(let o of t.call(this,s,e))o.push(r),yield o}yield[]};this.set=new Set(t)}[Symbol.iterator](){return this.set.keys()}get size(){return this.set.size}get elements(){return Array.from(this.set.keys())}valueOf(){return this}toString(){return`[object ${this.constructor.name}]`}keys(){return this.set.keys()}values(){return this.set.values()}entries(){return this.set.entries()}isEmpty(){return this.set.size===0}has(t){return this.set.has(t)}add(t){return this.set.add(t),this}delete(t){return this.set.delete(t),this}clear(){return this.set.clear(),this}from(...t){let s=new n;for(let e of t)if(e instanceof n)for(let r of e.set.keys())s.add(r);else s.add(e);return s}forEach(t,s){for(let e of this.set.keys())t.call(s,e,e,this)}map(t,s){let e=[];for(let r of this.set.keys())e.push(t.call(s,r,r,this));return new n(e)}filter(t,s){let e=[];for(let r of this.set.keys())t.call(s,r,r,this)&&e.push(r);return new n(e)}reduce(t,s){let e=s;for(let r of this.set.keys())e=t.call(this,e,r,r,this);return e}isSet(t){return t instanceof n||t instanceof Set}clone(){return new n(this.elements)}isSubsetOf(t){for(let s of this.set.keys())if(!t.has(s))return!1;return!0}isSupersetOf(t){return t.isSubsetOf(this)}isDisjointOf(t){for(let s of this.set.keys())if(t.has(s))return!1;return!0}isEqualTo(t){return this.set.size!==t.size?!1:this.isSubsetOf(t)}union(t){return new n(Array.from(this.elements.concat(t.elements)))}intersection(t){let s=[];for(let e of this.set.keys())t.has(e)&&s.push(e);return new n(s)}difference(t){let s=[];for(let e of this.set.keys())t.has(e)||s.push(e);return new n(s)}symmetricDifference(t){let s=[];for(let e of this.set.keys())t.has(e)||s.push(e);for(let e of t.set.keys())this.has(e)||s.push(e);return new n(s)}complement(t){return t.difference(this)}cartesianProduct(t){let s=[];for(let e of this.set.keys())for(let r of t.keys())s.push([e,r]);return new n(s)}powerSet(){let t=this.elements,s=[],e=(r,o)=>{if(r===t.length){s.push(o);return}e(r+1,o.concat([t[r]])),e(r+1,o)};return e(0,[]),new n(s.map(r=>new n(r)))}subsetsCount(){return 2**this.set.size}},a=n;f=Symbol.toStringTag;var i=a;var l=i;export{l as default};