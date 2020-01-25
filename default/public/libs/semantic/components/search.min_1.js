!function(e,t,s,n){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.search=function(r){var i,a=e(this),c=a.selector||"",o=(new Date).getTime(),u=[],l=arguments[0],d="string"==typeof l,f=[].slice.call(arguments,1);return e(this).each(function(){var g,h=e.isPlainObject(r)?e.extend(!0,{},e.fn.search.settings,r):e.extend({},e.fn.search.settings),p=h.className,m=h.metadata,v=h.regExp,y=h.fields,b=h.selector,R=h.error,C=h.namespace,x="."+C,w=C+"-module",S=e(this),F=S.find(b.prompt),j=S.find(b.searchButton),T=S.find(b.results),k=S.find(b.result),q=(S.find(b.category),this),A=S.data(w),E=!1,D=!1;g={initialize:function(){g.verbose("Initializing module"),g.get.settings(),g.determine.searchFields(),g.bind.events(),g.set.type(),g.create.results(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),A=g,S.data(w,g)},destroy:function(){g.verbose("Destroying instance"),S.off(x).removeData(w)},refresh:function(){g.debug("Refreshing selector cache"),F=S.find(b.prompt),j=S.find(b.searchButton),S.find(b.category),T=S.find(b.results),k=S.find(b.result)},refreshResults:function(){T=S.find(b.results),k=S.find(b.result)},bind:{events:function(){g.verbose("Binding events to search"),h.automatic&&(S.on(g.get.inputEvent()+x,b.prompt,g.event.input),F.attr("autocomplete","off")),S.on("focus"+x,b.prompt,g.event.focus).on("blur"+x,b.prompt,g.event.blur).on("keydown"+x,b.prompt,g.handleKeyboard).on("click"+x,b.searchButton,g.query).on("mousedown"+x,b.results,g.event.result.mousedown).on("mouseup"+x,b.results,g.event.result.mouseup).on("click"+x,b.result,g.event.result.click)}},determine:{searchFields:function(){r&&r.searchFields!==n&&(h.searchFields=r.searchFields)}},event:{input:function(){h.searchDelay?(clearTimeout(g.timer),g.timer=setTimeout(function(){g.is.focused()&&g.query()},h.searchDelay)):g.query()},focus:function(){g.set.focus(),h.searchOnFocus&&g.has.minimumCharacters()&&g.query(function(){g.can.show()&&g.showResults()})},blur:function(e){var t=function(){g.cancel.query(),g.remove.focus(),g.timer=setTimeout(g.hideResults,h.hideDelay)};s.activeElement===this||(D=!1,g.resultsClicked?(g.debug("Determining if user action caused search to close"),S.one("click.close"+x,b.results,function(e){g.is.inMessage(e)||E?F.focus():(E=!1,g.is.animating()||g.is.hidden()||t())})):(g.debug("Input blurred without user action, closing results"),t()))},result:{mousedown:function(){g.resultsClicked=!0},mouseup:function(){g.resultsClicked=!1},click:function(s){g.debug("Search result selected");var n=e(this),r=n.find(b.title).eq(0),i=n.is("a[href]")?n:n.find("a[href]").eq(0),a=i.attr("href")||!1,c=i.attr("target")||!1,o=(r.html(),r.length>0&&r.text()),u=g.get.results(),l=n.data(m.result)||g.get.result(o,u);if(e.isFunction(h.onSelect)&&!1===h.onSelect.call(q,l,u))return g.debug("Custom onSelect callback cancelled default select action"),void(E=!0);g.hideResults(),o&&g.set.value(o),a&&(g.verbose("Opening search link found in result",i),"_blank"==c||s.ctrlKey?t.open(a):t.location.href=a)}}},handleKeyboard:function(e){var t,s=S.find(b.result),n=S.find(b.category),r=s.filter("."+p.active),i=s.index(r),a=s.length,c=r.length>0,o=e.which,u=13,l=38,d=40;if(o==27&&(g.verbose("Escape key pressed, blurring search field"),g.hideResults(),D=!0),g.is.visible())if(o==u){if(g.verbose("Enter key pressed, selecting active result"),s.filter("."+p.active).length>0)return g.event.result.click.call(s.filter("."+p.active),e),e.preventDefault(),!1}else o==l&&c?(g.verbose("Up key pressed, changing active result"),t=i-1<0?i:i-1,n.removeClass(p.active),s.removeClass(p.active).eq(t).addClass(p.active).closest(n).addClass(p.active),e.preventDefault()):o==d&&(g.verbose("Down key pressed, changing active result"),t=i+1>=a?i:i+1,n.removeClass(p.active),s.removeClass(p.active).eq(t).addClass(p.active).closest(n).addClass(p.active),e.preventDefault());else o==u&&(g.verbose("Enter key pressed, executing query"),g.query(),g.set.buttonPressed(),F.one("keyup",g.remove.buttonFocus))},setup:{api:function(t,s){var n={debug:h.debug,on:!1,cache:h.cache,action:"search",urlData:{query:t},onSuccess:function(e){g.parse.response.call(q,e,t),s()},onFailure:function(){g.displayMessage(R.serverError),s()},onAbort:function(e){},onError:g.error};e.extend(!0,n,h.apiSettings),g.verbose("Setting up API request",n),S.api(n)}},can:{useAPI:function(){return e.fn.api!==n},show:function(){return g.is.focused()&&!g.is.visible()&&!g.is.empty()},transition:function(){return h.transition&&e.fn.transition!==n&&S.transition("is supported")}},is:{animating:function(){return T.hasClass(p.animating)},hidden:function(){return T.hasClass(p.hidden)},inMessage:function(t){if(t.target){var n=e(t.target);return e.contains(s.documentElement,t.target)&&n.closest(b.message).length>0}},empty:function(){return""===T.html()},visible:function(){return T.filter(":visible").length>0},focused:function(){return F.filter(":focus").length>0}},get:{settings:function(){e.isPlainObject(r)&&r.searchFullText&&(h.fullTextSearch=r.searchFullText,g.error(h.error.oldSearchSyntax,q))},inputEvent:function(){var e=F[0];return e!==n&&e.oninput!==n?"input":e!==n&&e.onpropertychange!==n?"propertychange":"keyup"},value:function(){return F.val()},results:function(){return S.data(m.results)},result:function(t,s){var r=["title","id"],i=!1;return t=t!==n?t:g.get.value(),s=s!==n?s:g.get.results(),"category"===h.type?(g.debug("Finding result that matches",t),e.each(s,function(s,n){if(e.isArray(n.results)&&(i=g.search.object(t,n.results,r)[0]))return!1})):(g.debug("Finding result in results object",t),i=g.search.object(t,s,r)[0]),i||!1}},select:{firstResult:function(){g.verbose("Selecting first result"),k.first().addClass(p.active)}},set:{focus:function(){S.addClass(p.focus)},loading:function(){S.addClass(p.loading)},value:function(e){g.verbose("Setting search input value",e),F.val(e)},type:function(e){e=e||h.type,"category"==h.type&&S.addClass(h.type)},buttonPressed:function(){j.addClass(p.pressed)}},remove:{loading:function(){S.removeClass(p.loading)},focus:function(){S.removeClass(p.focus)},buttonPressed:function(){j.removeClass(p.pressed)}},query:function(t){t=e.isFunction(t)?t:function(){};var s=g.get.value(),n=g.read.cache(s);t=t||function(){},g.has.minimumCharacters()?(n?(g.debug("Reading result from cache",s),g.save.results(n.results),g.addResults(n.html),g.inject.id(n.results),t()):(g.debug("Querying for",s),e.isPlainObject(h.source)||e.isArray(h.source)?(g.search.local(s),t()):g.can.useAPI()?g.search.remote(s,t):(g.error(R.source),t())),h.onSearchQuery.call(q,s)):g.hideResults()},search:{local:function(e){var t,s=g.search.object(e,h.content);g.set.loading(),g.save.results(s),g.debug("Returned full local search results",s),h.maxResults>0&&(g.debug("Using specified max results",s),s=s.slice(0,h.maxResults)),"category"==h.type&&(s=g.create.categoryResults(s)),t=g.generateResults({results:s}),g.remove.loading(),g.addResults(t),g.inject.id(s),g.write.cache(e,{html:t,results:s})},remote:function(t,s){s=e.isFunction(s)?s:function(){},S.api("is loading")&&S.api("abort"),g.setup.api(t,s),S.api("query")},object:function(t,s,r){var i=[],a=[],c=[],o=t.toString().replace(v.escape,"\\$&"),u=new RegExp(v.beginsWith+o,"i"),l=function(t,s){var n=-1==e.inArray(s,i),r=-1==e.inArray(s,c),o=-1==e.inArray(s,a);n&&r&&o&&t.push(s)};return s=s||h.source,r=r!==n?r:h.searchFields,e.isArray(r)||(r=[r]),s===n||!1===s?(g.error(R.source),[]):(e.each(r,function(n,r){e.each(s,function(e,s){"string"==typeof s[r]&&(-1!==s[r].search(u)?l(i,s):"exact"===h.fullTextSearch&&g.exactSearch(t,s[r])?l(a,s):1==h.fullTextSearch&&g.fuzzySearch(t,s[r])&&l(c,s))})}),e.merge(a,c),e.merge(i,a),i)}},exactSearch:function(e,t){return e=e.toLowerCase(),(t=t.toLowerCase()).indexOf(e)>-1},fuzzySearch:function(e,t){var s=t.length,n=e.length;if("string"!=typeof e)return!1;if(e=e.toLowerCase(),t=t.toLowerCase(),n>s)return!1;if(n===s)return e===t;e:for(var r=0,i=0;r<n;r++){for(var a=e.charCodeAt(r);i<s;)if(t.charCodeAt(i++)===a)continue e;return!1}return!0},parse:{response:function(e,t){var s=g.generateResults(e);g.verbose("Parsing server response",e),e!==n&&t!==n&&e[y.results]!==n&&(g.addResults(s),g.inject.id(e[y.results]),g.write.cache(t,{html:s,results:e[y.results]}),g.save.results(e[y.results]))}},cancel:{query:function(){g.can.useAPI()&&S.api("abort")}},has:{minimumCharacters:function(){return g.get.value().length>=h.minCharacters},results:function(){return 0!==T.length&&""!=T.html()}},clear:{cache:function(e){var t=S.data(m.cache);e?e&&t&&t[e]&&(g.debug("Removing value from cache",e),delete t[e],S.data(m.cache,t)):(g.debug("Clearing cache",e),S.removeData(m.cache))}},read:{cache:function(e){var t=S.data(m.cache);return!!h.cache&&(g.verbose("Checking cache for generated html for query",e),"object"==typeof t&&t[e]!==n&&t[e])}},create:{categoryResults:function(t){var s={};return e.each(t,function(e,t){t.category&&(s[t.category]===n?(g.verbose("Creating new category of results",t.category),s[t.category]={name:t.category,results:[t]}):s[t.category].results.push(t))}),s},id:function(e,t){var s,r=e+1;return t!==n?(s=String.fromCharCode(97+t)+r,g.verbose("Creating category result id",s)):(s=r,g.verbose("Creating result id",s)),s},results:function(){0===T.length&&(T=e("<div />").addClass(p.results).appendTo(S))}},inject:{result:function(e,t,s){g.verbose("Injecting result into results");var r=s!==n?T.children().eq(s).children(b.results).first().children(b.result).eq(t):T.children(b.result).eq(t);g.verbose("Injecting results metadata",r),r.data(m.result,e)},id:function(t){g.debug("Injecting unique ids into results");var s=0,r=0;return"category"===h.type?e.each(t,function(t,i){r=0,e.each(i.results,function(e,t){var a=i.results[e];a.id===n&&(a.id=g.create.id(r,s)),g.inject.result(a,r,s),r++}),s++}):e.each(t,function(e,s){var i=t[e];i.id===n&&(i.id=g.create.id(r)),g.inject.result(i,r),r++}),t}},save:{results:function(e){g.verbose("Saving current search results to metadata",e),S.data(m.results,e)}},write:{cache:function(e,t){var s=S.data(m.cache)!==n?S.data(m.cache):{};h.cache&&(g.verbose("Writing generated html to cache",e,t),s[e]=t,S.data(m.cache,s))}},addResults:function(t){if(e.isFunction(h.onResultsAdd)&&!1===h.onResultsAdd.call(T,t))return g.debug("onResultsAdd callback cancelled default action"),!1;t?(T.html(t),g.refreshResults(),h.selectFirstResult&&g.select.firstResult(),g.showResults()):g.hideResults(function(){T.empty()})},showResults:function(t){t=e.isFunction(t)?t:function(){},D||!g.is.visible()&&g.has.results()&&(g.can.transition()?(g.debug("Showing results with css animations"),T.transition({animation:h.transition+" in",debug:h.debug,verbose:h.verbose,duration:h.duration,onComplete:function(){t()},queue:!0})):(g.debug("Showing results with javascript"),T.stop().fadeIn(h.duration,h.easing)),h.onResultsOpen.call(T))},hideResults:function(t){t=e.isFunction(t)?t:function(){},g.is.visible()&&(g.can.transition()?(g.debug("Hiding results with css animations"),T.transition({animation:h.transition+" out",debug:h.debug,verbose:h.verbose,duration:h.duration,onComplete:function(){t()},queue:!0})):(g.debug("Hiding results with javascript"),T.stop().fadeOut(h.duration,h.easing)),h.onResultsClose.call(T))},generateResults:function(t){g.debug("Generating html from response",t);var s=h.templates[h.type],n=e.isPlainObject(t[y.results])&&!e.isEmptyObject(t[y.results]),r=e.isArray(t[y.results])&&t[y.results].length>0,i="";return n||r?(h.maxResults>0&&(n?"standard"==h.type&&g.error(R.maxResults):t[y.results]=t[y.results].slice(0,h.maxResults)),e.isFunction(s)?i=s(t,y):g.error(R.noTemplate,!1)):h.showNoResults&&(i=g.displayMessage(R.noResults,"empty")),h.onResults.call(q,t),i},displayMessage:function(e,t){return t=t||"standard",g.debug("Displaying message",e,t),g.addResults(h.templates.message(e,t)),h.templates.message(e,t)},setting:function(t,s){if(e.isPlainObject(t))e.extend(!0,h,t);else{if(s===n)return h[t];h[t]=s}},internal:function(t,s){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(s===n)return g[t];g[t]=s}},debug:function(){!h.silent&&h.debug&&(h.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,h.name+":"),g.debug.apply(console,arguments)))},verbose:function(){!h.silent&&h.verbose&&h.debug&&(h.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,h.name+":"),g.verbose.apply(console,arguments)))},error:function(){h.silent||(g.error=Function.prototype.bind.call(console.error,console,h.name+":"),g.error.apply(console,arguments))},performance:{log:function(e){var t,s;h.performance&&(s=(t=(new Date).getTime())-(o||t),o=t,u.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:q,"Execution Time":s})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,500)},display:function(){var t=h.name+":",s=0;o=!1,clearTimeout(g.performance.timer),e.each(u,function(e,t){s+=t["Execution Time"]}),t+=" "+s+"ms",c&&(t+=" '"+c+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==n||console.table!==n)&&u.length>0&&(console.groupCollapsed(t),console.table?console.table(u):e.each(u,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),u=[]}},invoke:function(t,s,r){var a,c,o,u=A;return s=s||f,r=q||r,"string"==typeof t&&u!==n&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(s,r){var i=s!=a?r+t[s+1].charAt(0).toUpperCase()+t[s+1].slice(1):t;if(e.isPlainObject(u[i])&&s!=a)u=u[i];else{if(u[i]!==n)return c=u[i],!1;if(!e.isPlainObject(u[r])||s==a)return u[r]!==n&&(c=u[r],!1);u=u[r]}})),e.isFunction(c)?o=c.apply(r,s):c!==n&&(o=c),e.isArray(i)?i.push(o):i!==n?i=[i,o]:o!==n&&(i=o),c}},d?(A===n&&g.initialize(),g.invoke(l)):(A!==n&&A.invoke("destroy"),g.initialize())}),i!==n?i:this},e.fn.search.settings={name:"Search",namespace:"search",silent:!1,debug:!1,verbose:!1,performance:!0,type:"standard",minCharacters:1,selectFirstResult:!1,apiSettings:!1,source:!1,searchOnFocus:!0,searchFields:["title","description"],displayField:"",fullTextSearch:"exact",automatic:!0,hideDelay:0,searchDelay:200,maxResults:7,cache:!0,showNoResults:!0,transition:"scale",duration:200,easing:"easeOutExpo",onSelect:!1,onResultsAdd:!1,onSearchQuery:function(e){},onResults:function(e){},onResultsOpen:function(){},onResultsClose:function(){},className:{animating:"animating",active:"active",empty:"empty",focus:"focus",hidden:"hidden",loading:"loading",results:"results",pressed:"down"},error:{source:"Cannot search. No source used, and Semantic API module was not included",noResults:"Your search returned no results",logging:"Error in debug logging, exiting.",noEndpoint:"No search endpoint was specified",noTemplate:"A valid template name was not specified.",oldSearchSyntax:"searchFullText setting has been renamed fullTextSearch for consistency, please adjust your settings.",serverError:"There was an issue querying the server.",maxResults:"Results must be an array to use maxResults setting",method:"The method you called is not defined."},metadata:{cache:"cache",results:"results",result:"result"},regExp:{escape:/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,beginsWith:"(?:s|^)"},fields:{categories:"results",categoryName:"name",categoryResults:"results",description:"description",image:"image",price:"price",results:"results",title:"title",url:"url",action:"action",actionText:"text",actionURL:"url"},selector:{prompt:".prompt",searchButton:".search.button",results:".results",message:".results > .message",category:".category",result:".result",title:".title, .name"},templates:{escape:function(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};return/[&<>"'`]/.test(e)?e.replace(/[&<>"'`]/g,function(e){return t[e]}):e},message:function(e,t){var s="";return e!==n&&t!==n&&(s+='<div class="message '+t+'">',s+="empty"==t?'<div class="header">No Results</div class="header"><div class="description">'+e+'</div class="description">':' <div class="description">'+e+"</div>",s+="</div>"),s},category:function(t,s){var r="";e.fn.search.settings.templates.escape;return t[s.categoryResults]!==n&&(e.each(t[s.categoryResults],function(t,i){i[s.results]!==n&&i.results.length>0&&(r+='<div class="category">',i[s.categoryName]!==n&&(r+='<div class="name">'+i[s.categoryName]+"</div>"),r+='<div class="results">',e.each(i.results,function(e,t){t[s.url]?r+='<a class="result" href="'+t[s.url]+'">':r+='<a class="result">',t[s.image]!==n&&(r+='<div class="image"> <img src="'+t[s.image]+'"></div>'),r+='<div class="content">',t[s.price]!==n&&(r+='<div class="price">'+t[s.price]+"</div>"),t[s.title]!==n&&(r+='<div class="title">'+t[s.title]+"</div>"),t[s.description]!==n&&(r+='<div class="description">'+t[s.description]+"</div>"),r+="</div>",r+="</a>"}),r+="</div>",r+="</div>")}),t[s.action]&&(r+='<a href="'+t[s.action][s.actionURL]+'" class="action">'+t[s.action][s.actionText]+"</a>"),r)},standard:function(t,s){var r="";return t[s.results]!==n&&(e.each(t[s.results],function(e,t){t[s.url]?r+='<a class="result" href="'+t[s.url]+'">':r+='<a class="result">',t[s.image]!==n&&(r+='<div class="image"> <img src="'+t[s.image]+'"></div>'),r+='<div class="content">',t[s.price]!==n&&(r+='<div class="price">'+t[s.price]+"</div>"),t[s.title]!==n&&(r+='<div class="title">'+t[s.title]+"</div>"),t[s.description]!==n&&(r+='<div class="description">'+t[s.description]+"</div>"),r+="</div>",r+="</a>"}),t[s.action]&&(r+='<a href="'+t[s.action][s.actionURL]+'" class="action">'+t[s.action][s.actionText]+"</a>"),r)}}}}(jQuery,window,document);