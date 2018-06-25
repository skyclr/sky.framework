(() => {

    'use strict';

	/**
	 * Holds current page specific data
	 */
	window.page = window.page || { data: {} };
	window.sky = {};

    /** Base promise */
    sky.Promise=()=>{
    	let s=0, c=[];
    	return { resolve:()=>{if(!s)for(let f of c)f();s=1;}, done:(f)=>{c.push(f);if(s)f(); }}
    };
    // sky.Promise=()=>{let d,p=new Promise(r=>d=r);return{done:f=>p.then(f),resolve:d}};

    /** Deferred object for delayed executing */
    sky.execDeferred = sky.Promise();
    sky.execDeferredProject = sky.Promise();

    /** Executes specified function after all initializations ready */
    sky.exec = func => sky.execDeferred.done(() => sky.func(func, false)());

    /** Executes specified function after all initializations ready */
    sky.onReady = func => sky.execDeferredProject.done(() => sky.func(func, true)());

    /* Shortcuts */
	sky.action = (name, action) => { sky.onReady(({actions}) => { actions.add(name, action)	}) };
	sky.directive = (name, options, directive) => { sky.onReady(({directives}) => { directives.add(name, options, directive) }) };

})();