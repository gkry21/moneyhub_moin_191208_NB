"use strict"
var app = app || {}
app =(()=>{
	const WHEN_ERR = 'js파일을 찾지 못했습니다.'
	let _, js, cmm_vue_js, nav_vue_js, main_vue_js, auth_js
	
	let run =x=>{
		$.getScript( x + '/resources/js/cmm/router.js', ()=>{
			$.extend(new Session(x))
			init()
			onCreate()
		})
	}
	
	let init =()=>{
		_ = $.ctx()
		js = $.js()
		cmm_vue_js = js + '/vue/cmm_vue.js'
		nav_vue_js = js + '/vue/nav_vue.js'
		main_vue_js = js + '/vue/main_vue.js'
		auth_js = js + '/cmm/auth.js'
		
	}
	
	let onCreate =()=>{
		init()
		$.when(
			$.getScript(cmm_vue_js),
			$.getScript(nav_vue_js),
			$.getScript(main_vue_js),
			$.getScript(auth_js)
		)
		.done(()=>{
			setContentView()
			
			$('#join')
			.click(()=>{
				auth.onCreate('join')
			})
			
			$('#login')
			.click(()=>{
				auth.onCreate('login')
			})
		})
		.fail(()=>{
			alert(WHEN_ERR)
		})
	}
	
	let setContentView =()=>{
		$('head')
		.html(cmm_vue.head())

		$('#root')
		.html(nav_vue.nav())
		.append(main_vue.main())
		.append(cmm_vue.footer())
	}
	
	return { run, onCreate }
})()