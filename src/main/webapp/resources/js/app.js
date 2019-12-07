"use strict"
var app = app || {}
app =(()=>{
	const WHEN_ERR = 'js파일을 찾지 못했습니다.'
	let _, js, main_vue_js, auth_js
	
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
		main_vue_js = js + '/vue/main_vue.js'
		auth_js = js + '/cmm/auth.js'
		
	}
	
	let onCreate =()=>{
		$.when(
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
		.html(main_vue.main_head())

		$('body')
		.html(main_vue.main_body())
	}
	
	return { run }
})()