!function(e,n,i,t){"use strict";n=void 0!==n&&n.Math==Math?n:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.modal=function(o){var a,r=e(this),s=e(n),c=e(i),l=e("body"),d=r.selector||"",u=(new Date).getTime(),m=[],f=arguments[0],g="string"==typeof f,h=[].slice.call(arguments,1),v=n.requestAnimationFrame||n.mozRequestAnimationFrame||n.webkitRequestAnimationFrame||n.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var r,b,p,y,k,S,w,C,F,M=e.isPlainObject(o)?e.extend(!0,{},e.fn.modal.settings,o):e.extend({},e.fn.modal.settings),x=M.selector,H=M.className,A=M.namespace,O=M.error,D="."+A,T="module-"+A,z=e(this),E=e(M.context),j=z.find(x.close),q=this,L=z.data(T),N=!1;F={initialize:function(){F.verbose("Initializing dimmer",E),F.create.id(),F.create.dimmer(),F.refreshModals(),F.bind.events(),M.observeChanges&&F.observeChanges(),F.instantiate()},instantiate:function(){F.verbose("Storing instance of modal"),L=F,z.data(T,L)},create:{dimmer:function(){var n={debug:M.debug,variation:!M.centered&&"top aligned",dimmerName:"modals"},i=e.extend(!0,n,M.dimmerSettings);e.fn.dimmer!==t?(F.debug("Creating dimmer"),y=E.dimmer(i),M.detachable?(F.verbose("Modal is detachable, moving content into dimmer"),y.dimmer("add content",z)):F.set.undetached(),k=y.dimmer("get dimmer")):F.error(O.dimmer)},id:function(){w=(Math.random().toString(16)+"000000000").substr(2,8),S="."+w,F.verbose("Creating unique id for element",w)}},destroy:function(){F.verbose("Destroying previous modal"),z.removeData(T).off(D),s.off(S),k.off(S),j.off(D),E.dimmer("destroy")},observeChanges:function(){"MutationObserver"in n&&((C=new MutationObserver(function(e){F.debug("DOM tree modified, refreshing"),F.refresh()})).observe(q,{childList:!0,subtree:!0}),F.debug("Setting up mutation observer",C))},refresh:function(){F.remove.scrolling(),F.cacheSizes(),F.can.useFlex()||F.set.modalOffset(),F.set.screenHeight(),F.set.type()},refreshModals:function(){b=z.siblings(x.modal),r=b.add(z)},attachEvents:function(n,i){var t=e(n);i=e.isFunction(F[i])?F[i]:F.toggle,t.length>0?(F.debug("Attaching modal events to element",n,i),t.off(D).on("click"+D,i)):F.error(O.notFound,n)},bind:{events:function(){F.verbose("Attaching events"),z.on("click"+D,x.close,F.event.close).on("click"+D,x.approve,F.event.approve).on("click"+D,x.deny,F.event.deny),s.on("resize"+S,F.event.resize)},scrollLock:function(){y.get(0).addEventListener("touchmove",F.event.preventScroll,{passive:!1})}},unbind:{scrollLock:function(){y.get(0).removeEventListener("touchmove",F.event.preventScroll,{passive:!1})}},get:{id:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},event:{approve:function(){N||!1===M.onApprove.call(q,e(this))?F.verbose("Approve callback returned false cancelling hide"):(N=!0,F.hide(function(){N=!1}))},preventScroll:function(e){e.preventDefault()},deny:function(){N||!1===M.onDeny.call(q,e(this))?F.verbose("Deny callback returned false cancelling hide"):(N=!0,F.hide(function(){N=!1}))},close:function(){F.hide()},click:function(n){if(M.closable){var t=e(n.target).closest(x.modal).length>0,o=e.contains(i.documentElement,n.target);!t&&o&&F.is.active()&&(F.debug("Dimmer clicked, hiding all modals"),F.remove.clickaway(),M.allowMultiple?F.hide():F.hideAll())}else F.verbose("Dimmer clicked but closable setting is disabled")},debounce:function(e,n){clearTimeout(F.timer),F.timer=setTimeout(e,n)},keyboard:function(e){27==e.which&&(M.closable?(F.debug("Escape key pressed hiding modal"),F.hide()):F.debug("Escape key pressed, but closable is set to false"),e.preventDefault())},resize:function(){y.dimmer("is active")&&(F.is.animating()||F.is.active())&&v(F.refresh)}},toggle:function(){F.is.active()||F.is.animating()?F.hide():F.show()},show:function(n){n=e.isFunction(n)?n:function(){},F.refreshModals(),F.set.dimmerSettings(),F.set.dimmerStyles(),F.showModal(n)},hide:function(n){n=e.isFunction(n)?n:function(){},F.refreshModals(),F.hideModal(n)},showModal:function(n){n=e.isFunction(n)?n:function(){},F.is.animating()||!F.is.active()?(F.showDimmer(),F.cacheSizes(),F.can.useFlex()?F.remove.legacy():(F.set.legacy(),F.set.modalOffset(),F.debug("Using non-flex legacy modal positioning.")),F.set.screenHeight(),F.set.type(),F.set.clickaway(),!M.allowMultiple&&F.others.active()?F.hideOthers(F.showModal):(M.allowMultiple&&M.detachable&&z.detach().appendTo(k),M.onShow.call(q),M.transition&&e.fn.transition!==t&&z.transition("is supported")?(F.debug("Showing modal with css animations"),z.transition({debug:M.debug,animation:M.transition+" in",queue:M.queue,duration:M.duration,useFailSafe:!0,onComplete:function(){M.onVisible.apply(q),M.keyboardShortcuts&&F.add.keyboardShortcuts(),F.save.focus(),F.set.active(),M.autofocus&&F.set.autofocus(),n()}})):F.error(O.noTransition))):F.debug("Modal is already visible")},hideModal:function(n,i){n=e.isFunction(n)?n:function(){},F.debug("Hiding modal"),!1!==M.onHide.call(q,e(this))?(F.is.animating()||F.is.active())&&(M.transition&&e.fn.transition!==t&&z.transition("is supported")?(F.remove.active(),z.transition({debug:M.debug,animation:M.transition+" out",queue:M.queue,duration:M.duration,useFailSafe:!0,onStart:function(){F.others.active()||i||F.hideDimmer(),M.keyboardShortcuts&&F.remove.keyboardShortcuts()},onComplete:function(){M.onHidden.call(q),F.remove.dimmerStyles(),F.restore.focus(),n()}})):F.error(O.noTransition)):F.verbose("Hide callback returned false cancelling hide")},showDimmer:function(){y.dimmer("is animating")||!y.dimmer("is active")?(F.debug("Showing dimmer"),y.dimmer("show")):F.debug("Dimmer already visible")},hideDimmer:function(){y.dimmer("is animating")||y.dimmer("is active")?(F.unbind.scrollLock(),y.dimmer("hide",function(){F.remove.clickaway(),F.remove.screenHeight()})):F.debug("Dimmer is not visible cannot hide")},hideAll:function(n){var i=r.filter("."+H.active+", ."+H.animating);n=e.isFunction(n)?n:function(){},i.length>0&&(F.debug("Hiding all visible modals"),F.hideDimmer(),i.modal("hide modal",n))},hideOthers:function(n){var i=b.filter("."+H.active+", ."+H.animating);n=e.isFunction(n)?n:function(){},i.length>0&&(F.debug("Hiding other modals",b),i.modal("hide modal",n,!0))},others:{active:function(){return b.filter("."+H.active).length>0},animating:function(){return b.filter("."+H.animating).length>0}},add:{keyboardShortcuts:function(){F.verbose("Adding keyboard shortcuts"),c.on("keyup"+D,F.event.keyboard)}},save:{focus:function(){e(i.activeElement).closest(z).length>0||(p=e(i.activeElement).blur())}},restore:{focus:function(){p&&p.length>0&&p.focus()}},remove:{active:function(){z.removeClass(H.active)},legacy:function(){z.removeClass(H.legacy)},clickaway:function(){k.off("click"+S)},dimmerStyles:function(){k.removeClass(H.inverted),y.removeClass(H.blurring)},bodyStyle:function(){""===l.attr("style")&&(F.verbose("Removing style attribute"),l.removeAttr("style"))},screenHeight:function(){F.debug("Removing page height"),l.css("height","")},keyboardShortcuts:function(){F.verbose("Removing keyboard shortcuts"),c.off("keyup"+D)},scrolling:function(){y.removeClass(H.scrolling),z.removeClass(H.scrolling)}},cacheSizes:function(){z.addClass(H.loading);var o=z.prop("scrollHeight"),a=z.outerWidth(),r=z.outerHeight();F.cache!==t&&0===r||(F.cache={pageHeight:e(i).outerHeight(),width:a,height:r+M.offset,scrollHeight:o+M.offset,contextHeight:"body"==M.context?e(n).height():y.height()},F.cache.topOffset=-F.cache.height/2),z.removeClass(H.loading),F.debug("Caching modal and container sizes",F.cache)},can:{useFlex:function(){return"auto"==M.useFlex?M.detachable&&!F.is.ie():M.useFlex},fit:function(){var e=F.cache.contextHeight,n=F.cache.contextHeight/2,i=F.cache.topOffset,t=F.cache.scrollHeight,o=F.cache.height,a=M.padding;return t>o?n+i+t+a<e:o+2*a<e}},is:{active:function(){return z.hasClass(H.active)},ie:function(){return!n.ActiveXObject&&"ActiveXObject"in n||"ActiveXObject"in n},animating:function(){return z.transition("is supported")?z.transition("is animating"):z.is(":visible")},scrolling:function(){return y.hasClass(H.scrolling)},modernBrowser:function(){return!(n.ActiveXObject||"ActiveXObject"in n)}},set:{autofocus:function(){var e=z.find("[tabindex], :input").filter(":visible"),n=e.filter("[autofocus]"),i=n.length>0?n.first():e.first();i.length>0&&i.focus()},clickaway:function(){k.on("click"+S,F.event.click)},dimmerSettings:function(){if(e.fn.dimmer!==t){var n={debug:M.debug,dimmerName:"modals",closable:"auto",useFlex:F.can.useFlex(),variation:!M.centered&&"top aligned",duration:{show:M.duration,hide:M.duration}},i=e.extend(!0,n,M.dimmerSettings);M.inverted&&(i.variation=i.variation!==t?i.variation+" inverted":"inverted"),E.dimmer("setting",i)}else F.error(O.dimmer)},dimmerStyles:function(){M.inverted?k.addClass(H.inverted):k.removeClass(H.inverted),M.blurring?y.addClass(H.blurring):y.removeClass(H.blurring)},modalOffset:function(){var e=F.cache.width,n=F.cache.height;z.css({marginTop:M.centered&&F.can.fit()?-n/2:0,marginLeft:-e/2}),F.verbose("Setting modal offset for legacy mode")},screenHeight:function(){F.can.fit()?l.css("height",""):(F.debug("Modal is taller than page content, resizing page height"),l.css("height",F.cache.height+2*M.padding))},active:function(){z.addClass(H.active)},scrolling:function(){y.addClass(H.scrolling),z.addClass(H.scrolling),F.unbind.scrollLock()},legacy:function(){z.addClass(H.legacy)},type:function(){F.can.fit()?(F.verbose("Modal fits on screen"),F.others.active()||F.others.animating()||(F.remove.scrolling(),F.bind.scrollLock())):(F.verbose("Modal cannot fit on screen setting to scrolling"),F.set.scrolling())},undetached:function(){y.addClass(H.undetached)}},setting:function(n,i){if(F.debug("Changing setting",n,i),e.isPlainObject(n))e.extend(!0,M,n);else{if(i===t)return M[n];e.isPlainObject(M[n])?e.extend(!0,M[n],i):M[n]=i}},internal:function(n,i){if(e.isPlainObject(n))e.extend(!0,F,n);else{if(i===t)return F[n];F[n]=i}},debug:function(){!M.silent&&M.debug&&(M.performance?F.performance.log(arguments):(F.debug=Function.prototype.bind.call(console.info,console,M.name+":"),F.debug.apply(console,arguments)))},verbose:function(){!M.silent&&M.verbose&&M.debug&&(M.performance?F.performance.log(arguments):(F.verbose=Function.prototype.bind.call(console.info,console,M.name+":"),F.verbose.apply(console,arguments)))},error:function(){M.silent||(F.error=Function.prototype.bind.call(console.error,console,M.name+":"),F.error.apply(console,arguments))},performance:{log:function(e){var n,i;M.performance&&(i=(n=(new Date).getTime())-(u||n),u=n,m.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:q,"Execution Time":i})),clearTimeout(F.performance.timer),F.performance.timer=setTimeout(F.performance.display,500)},display:function(){var n=M.name+":",i=0;u=!1,clearTimeout(F.performance.timer),e.each(m,function(e,n){i+=n["Execution Time"]}),n+=" "+i+"ms",d&&(n+=" '"+d+"'"),(console.group!==t||console.table!==t)&&m.length>0&&(console.groupCollapsed(n),console.table?console.table(m):e.each(m,function(e,n){console.log(n.Name+": "+n["Execution Time"]+"ms")}),console.groupEnd()),m=[]}},invoke:function(n,i,o){var r,s,c,l=L;return i=i||h,o=q||o,"string"==typeof n&&l!==t&&(n=n.split(/[\. ]/),r=n.length-1,e.each(n,function(i,o){var a=i!=r?o+n[i+1].charAt(0).toUpperCase()+n[i+1].slice(1):n;if(e.isPlainObject(l[a])&&i!=r)l=l[a];else{if(l[a]!==t)return s=l[a],!1;if(!e.isPlainObject(l[o])||i==r)return l[o]!==t&&(s=l[o],!1);l=l[o]}})),e.isFunction(s)?c=s.apply(o,i):s!==t&&(c=s),e.isArray(a)?a.push(c):a!==t?a=[a,c]:c!==t&&(a=c),s}},g?(L===t&&F.initialize(),F.invoke(f)):(L!==t&&L.invoke("destroy"),F.initialize())}),a!==t?a:this},e.fn.modal.settings={name:"Modal",namespace:"modal",useFlex:"auto",offset:0,silent:!1,debug:!1,verbose:!1,performance:!0,observeChanges:!1,allowMultiple:!1,detachable:!0,closable:!0,autofocus:!0,inverted:!1,blurring:!1,centered:!0,dimmerSettings:{closable:!1,useCSS:!0},keyboardShortcuts:!0,context:"body",queue:!1,duration:500,transition:"scale",padding:50,onShow:function(){},onVisible:function(){},onHide:function(){return!0},onHidden:function(){},onApprove:function(){return!0},onDeny:function(){return!0},selector:{close:"> .close",approve:".actions .positive, .actions .approve, .actions .ok",deny:".actions .negative, .actions .deny, .actions .cancel",modal:".ui.modal"},error:{dimmer:"UI Dimmer, a required component is not included in this page",method:"The method you called is not defined.",notFound:"The element you specified could not be found"},className:{active:"active",animating:"animating",blurring:"blurring",inverted:"inverted",legacy:"legacy",loading:"loading",scrolling:"scrolling",undetached:"undetached"}}}(jQuery,window,document);