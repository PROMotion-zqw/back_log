const express = require('express');
const router = express.Router();
var svgCaptcha = require('svg-captcha');
const crt = require('../libs/cryptos');
const {
	attrEmpty
} = require('../libs/m_api');
module.exports = function(db) {
	// db 是 mongoose 中的 model 
	let {
		users,
		apiUrl
	} = db;
	// get verification code svg
	router.get('/api/login', function(req, res) {
		var codeConfig = {
			size: 5, // 验证码长度
			ignoreChars: '0o1i', // 验证码字符中排除 0o1i
			noise: 2, // 干扰线条的数量
			// height: 45,
		}
		var captcha = svgCaptcha.create(codeConfig);
		req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
		var codeData = {
			img: captcha.data
		}
		res.status(200).json({
			ok: true,
			img: codeData.img
		});
	})

	// login
	router.post('/api/login', (req, res) => {
		let us = req.body.name;
		let pd = crt.enCrypt(req.body.pass, crt.Suffix);
		// operation Database
		users.find({
			name: us,
			pass: pd
		}).then((qe) => {
			if (qe.length) {
				if (qe[0].name === us && qe[0].pass === pd) {
					if (req.session.captcha === req.body.auth) {
						req.session["admin_id"] = "quanwei";
						let {_id, name, pass, phone, roles, createTime, email} = qe[0]
						res.status(200).send({
							ok: true,
							msg: "登录成功",
							data: {
								sd: _id+"."+pass,
								ns: name,
								phone,
								rs: roles,
								createTime,
								email
							}
						})
					} else {
						res.status(404).send({
							ok: false,
							msg: "验证码错误"
						}).end()
					}
				}
			} else {
				res.status(404).send({
					ok: false,
					msg: "用户名或密码不正确"
				}).end()
			}
		}).catch(err => {
			res.status(500).send({
				ok: false,
				msg: "数据库出错"
			}).end()
		})
	})
	// 跳转
	router.use((req, res, next) => {
		if (!req.session["admin_id"] && req.url !== "/api/login") {
			res.status(403).json({
				ok: false,
				msg: "Unauthorized",
				status: 403
			})
		} else {
			next()
		}
	})

	// 获取用户
	router.get('/api/getUser', (req, res) => {
		let {
			page,
			pageSize
		} = req.query;
		let pages = (page - 1) * pageSize;
		users.count().then(cn => {
			req.data_count = cn;
			if (page !== undefined && pageSize !== undefined) {
				users.find({}, {
					name: 1,
					email: 1,
					phone: 1,
					createTime: 1
				}).sort({
					createTime: -1
				}).skip(pages).limit(pageSize).then(us => {
					res.status(200).json({
						ok: true,
						data: us,
						total: req.data_count
					})
				}).catch(err => {
					res.status(404).json({
						ok: false,
						msg: "404 not found"
					}).end()
				})
			} else {
				res.status(404).json({
					ok: false,
					msg: "param 'page' or 'pageSize' is undefined"
				})
			}
		}).catch(err => {
			res.status(400).send({
				ok: false,
				msg: "数据长度出错"
			}).end()
		})
	})
	// 创建用户
	router.post('/api/create', (req, res) => {
		let {
			name,
			pass,
			phone,
			email,
			roles,
			createTime
		} = req.body,
			em_msg = attrEmpty(req.body, ["name", "pass", "phone", "email", "roles", "createTime"]);
		if (em_msg) {
			res.status(404).json({
				ok: false,
				msg: em_msg
			})
			return
		}
		users.find({
			name
		}).then(filterUser => {
			console.log('filterUser', filterUser);
			if (!filterUser.length) {
				let newUser = new users({
					name: name,
					pass: crt.enCrypt(pass, crt.Suffix),
					phone: phone,
					email: email,
					roles: roles,
					createTime: createTime
				})
				newUser.save((err, sas) => {
					if (err) {
						console.log('save', err);
						res.status(404).json({
							ok: false,
							msg: err
						}).end()
					} else {
						res.status(200).json({
							ok: true,
							data: sas
						})
					}
				})
			} else {
				res.status(400).json({
					ok: false,
					msg: '用户·已存在!'
				})
			}
		}).catch(userErr => {
			res.status(400).json({
				ok: false,
				msg: userErr
			})
		})
	})
	// 删除用户
	router.delete('/api/delUser', (req, res) => {
		let {
			name
		} = req.query,
			em_msg = attrEmpty(req.query, ["name"]);
		if (em_msg) {
			res.status(404).json({
				ok: false,
				msg: em_msg
			})
			return
		}
		if ("name" in req.query) {
			users.remove({
				name: name
			}, (err, des) => {
				if (err) {
					res.status(404).json({
						ok: false,
						msg: "name is not found"
					}).end()
				} else {
					res.status(200).json({
						ok: true,
						status: 200
					})
				}
			})
		} else {
			res.status(404).json({
				ok: false,
				msg: "name is empty"
			}).end()
		}

	})
	// 退出当前用户
	router.get('/api/Logout', (req, res) => {
		req.session = null;
		res.status(200).send({
			ok: true,
			msg: 'ok'
		})
	})
	// 接口列表
	router.get('/api/api_table', (req, res) => {
		let apiPath = require('../libs/apiPath')(db, {});
		apiPath.then(apis => {
			res.status(200).json(apis)
		}).catch(ape => {
			res.status(500).send({
				ok: false,
				msg: '数据库出错'
			}).end()
		})
	})

	// 创建 api 路径
	router.post('/api/create_api', (req, res) => {
		let {
			url,
			head,
			type,
			roles
		} = req.body,
			em_msg = attrEmpty(req.body, ["url", "head", "type", "roles"]);
		if (em_msg) {
			res.status(404).json({
				ok: false,
				msg: em_msg
			})
			return
		}
		let createApi = new apiUrl({
			url,
			headers: JSON.stringify(head),
			type,
			roles
		})
		createApi.save((err, cApi) => {
			if (err) {
				res.status(404).json({
					ok: false,
					msg: '接口创建失败'
				})
				return
			}
			res.status(200).json({
				ok: true,
				msg: cApi
			})
		})
	})
	router.post('/api/multer', (req, res) => {
		console.log('multer files', req.body);
		res.json({ok: true})
	})

	return router
}
