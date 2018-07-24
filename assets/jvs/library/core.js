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
		sky.libraryDeferred = sky.Promise();
		sky.projectDeffered = sky.Promise();
		sky.servicesDeferred = sky.Promise();

		/** Executes specified function after library ready */
		sky.exec = func => sky.libraryDeferred.done(() => sky.func(func, false)());

		/** Executes specified function after services ready */
		sky.onServicesInit = func => sky.servicesDeferred.done(() => sky.func(func, true)());

		/** Executes specified function after all ready */
		sky.onReady = func => sky.projectDeffered.done(() => sky.func(func, true)());

		/* Shortcuts */
		sky.service = (name, service, dependencies) => service ? sky.exec(() => sky.services.add(name, service, dependencies)) : sky.services.get(name);
		sky.action = (name, action) => { sky.onServicesInit(({actions}) => { actions.add(name, action)	}) };
		sky.directive = (name, options, directive) => { sky.onServicesInit(({directives}) => { directives.add(name, options, directive) }) };
	