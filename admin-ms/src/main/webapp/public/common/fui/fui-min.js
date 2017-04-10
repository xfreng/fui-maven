fui = {
	components : {},
	uids : {},
	ux : {},
	doc : document,
	window : window,
	isReady : false,
	byClass : function(a, b) {
		if (typeof b == "string") {
			b = fui.byId(b)
		}
		return jQuery("." + a, b)[0]
	},
	getComponents : function() {
		var a = [];
		for ( var d in fui.components) {
			var b = fui.components[d];
			if (b.isControl) {
				a.push(b)
			}
		}
		return a
	},
	get : function(b) {
		if (!b) {
			return null
		}
		if (fui.isControl(b)) {
			return b
		}
		if (typeof b == "string") {
			if (b.charAt(0) == "#") {
				b = b.substr(1)
			}
		}
		if (typeof b == "string") {
			return fui.components[b]
		} else {
			var a = fui.uids[b.uid];
			if (a && a.el == b) {
				return a
			}
		}
		return null
	},
	getbyUID : function(a) {
		return fui.uids[a]
	},
	findControls : function(e, d) {
		if (!e) {
			return []
		}
		d = d || fui;
		var a = [];
		var f = fui.uids;
		for ( var c in f) {
			var g = f[c];
			var b = e.call(d, g);
			if (b === true || b === 1) {
				a.push(g);
				if (b === 1) {
					break
				}
			}
		}
		return a
	},
	getChildControls : function(b) {
		var c = b.el ? b.el : b;
		var a = fui.findControls(function(d) {
			if (!d.el || b == d) {
				return false
			}
			if (fui.isAncestor(c, d.el) && d.within) {
				return true
			}
			return false
		});
		return a
	},
	emptyFn : function() {
	},
	createNameControls : function(h, g) {
		if (!h || !h.el) {
			return
		}
		if (!g) {
			g = "_"
		}
		var f = h.el;
		var b = fui.findControls(function(c) {
			if (!c.el || !c.name) {
				return false
			}
			if (fui.isAncestor(f, c.el)) {
				return true
			}
			return false
		});
		for (var e = 0, a = b.length; e < a; e++) {
			var j = b[e];
			var d = g + j.name;
			if (g === true) {
				d = j.name[0].toUpperCase()
						+ j.name.substring(1, j.name.length)
			}
			h[d] = j
		}
	},
	getsbyName : function(d, a) {
		var b = fui.isControl(a);
		var e = a;
		if (a && b) {
			a = a.el
		}
		a = fui.byId(a);
		a = a || document.body;
		var c = fui.findControls(function(g) {
			if (!g.el) {
				return false
			}
			if (g.name == d && fui.isAncestor(a, g.el)) {
				return true
			}
			return false
		}, this);
		if (b && c.length == 0 && e && e.getbyName) {
			var f = e.getbyName(d);
			if (f) {
				c.push(f)
			}
		}
		return c
	},
	getbyName : function(b, a) {
		return fui.getsbyName(b, a)[0]
	},
	getParams : function(b) {
		if (!b) {
			b = location.href
		}
		b = b.split("?")[1];
		var g = {};
		if (b) {
			var e = b.split("&");
			for (var d = 0, a = e.length; d < a; d++) {
				var f = e[d].split("=");
				try {
					g[f[0]] = decodeURIComponent(unescape(f[1]))
				} catch (c) {
				}
			}
		}
		return g
	},
	reg : function(a) {
		this.components[a.id] = a;
		this.uids[a.uid] = a
	},
	unreg : function(a) {
		delete fui.components[a.id];
		delete fui.uids[a.uid]
	},
	classes : {},
	uiClasses : {},
	getClass : function(a) {
		if (!a) {
			return null
		}
		return this.classes[a.toLowerCase()]
	},
	getClassByUICls : function(a) {
		return this.uiClasses[a.toLowerCase()]
	},
	idPre : "fui-",
	idIndex : 1,
	newId : function(a) {
		return (a || this.idPre) + this.idIndex++
	},
	copyTo : function(c, b) {
		if (c && b) {
			for ( var a in b) {
				c[a] = b[a]
			}
		}
		return c
	},
	copyIf : function(c, b) {
		if (c && b) {
			for ( var a in b) {
				if (fui.isNull(c[a])) {
					c[a] = b[a]
				}
			}
		}
		return c
	},
	createDelegate : function(b, a) {
		if (!b) {
			return function() {
			}
		}
		return function() {
			return b.apply(a, arguments)
		}
	},
	isControl : function(a) {
		return !!(a && a.isControl)
	},
	isElement : function(a) {
		return a && a.appendChild
	},
	isDate : function(a) {
		return a && a.getFullYear
	},
	isArray : function(a) {
		return a && !!a.unshift
	},
	isNull : function(a) {
		return a === null || a === undefined
	},
	isNumber : function(a) {
		return !isNaN(a) && typeof a == "number"
	},
	isEquals : function(d, c) {
		if (d !== 0 && c !== 0) {
			if ((fui.isNull(d) || d == "") && (fui.isNull(c) || c == "")) {
				return true
			}
		}
		if (d && c && d.getFullYear && c.getFullYear) {
			return d.getTime() === c.getTime()
		}
		if (typeof d == "object" && typeof c == "object") {
			return d === c
		}
		return String(d) === String(c)
	},
	forEach : function(g, f, c) {
		var d = g.clone();
		for (var b = 0, a = d.length; b < a; b++) {
			var e = d[b];
			if (f.call(c, e, b, g) === false) {
				break
			}
		}
	},
	sort : function(c, b, a) {
		a = a || c;
		c.sort(b)
	},
	removeNode : function(a) {
		jQuery(a).remove()
	},
	elWarp : document.createElement("div")
};
if (typeof fui_debugger == "undefined") {
	fui_debugger = true
}
fui_regClass = function(a, b) {
	b = b.toLowerCase();
	if (!fui.classes[b]) {
		fui.classes[b] = a;
		a.prototype.type = b
	}
	var c = a.prototype.uiCls;
	if (!fui.isNull(c) && !fui.uiClasses[c]) {
		fui.uiClasses[c] = a
	}
};
fui_extend = function(e, b, f) {
	if (typeof b != "function") {
		return this
	}
	var g = e, d = g.prototype, a = b.prototype;
	if (g.superclass == a) {
		return
	}
	g.superclass = a;
	g.superclass.constructor = b;
	for ( var c in a) {
		d[c] = a[c]
	}
	if (f) {
		for ( var c in f) {
			d[c] = f[c]
		}
	}
	return g
};
fui.copyTo(fui, {
	extend : fui_extend,
	regClass : fui_regClass,
	debug : false
});
fui.namespace = function(f) {
	if (typeof f != "string") {
		return
	}
	f = f.split(".");
	var d = window;
	for (var c = 0, a = f.length; c < a; c++) {
		var b = f[c];
		var e = d[b];
		if (!e) {
			e = d[b] = {}
		}
		d = e
	}
};
fui._BindCallbacks = [];
fui._BindEvents = function(b, a) {
	fui._BindCallbacks.push([ b, a ]);
	if (!fui._EventTimer) {
		fui._EventTimer = setTimeout(function() {
			fui._FireBindEvents()
		}, 50)
	}
};
fui._FireBindEvents = function() {
	for (var b = 0, a = fui._BindCallbacks.length; b < a; b++) {
		var c = fui._BindCallbacks[b];
		c[0].call(c[1])
	}
	fui._BindCallbacks = [];
	fui._EventTimer = null
};
fui._getFunctoin = function(f) {
	if (typeof f != "string") {
		return null
	}
	var e = f.split(".");
	var d = null;
	for (var c = 0, a = e.length; c < a; c++) {
		var b = e[c];
		if (!d) {
			d = window[b]
		} else {
			d = d[b]
		}
		if (!d) {
			break
		}
	}
	return d
};
fui._getMap = function(name, obj) {
	if (!name) {
		return null
	}
	var index = name.indexOf(".");
	if (index == -1 && name.indexOf("[") == -1) {
		return obj[name]
	}
	if (index == (name.length - 1)) {
		return obj[name]
	}
	var s = "obj." + name;
	try {
		var v = eval(s)
	} catch (e) {
		return null
	}
	return v
};
fui._setMap = function(a, m, e) {
	if (!e) {
		return
	}
	if (typeof a != "string") {
		return
	}
	var k = a.split(".");
	function g(r, p, o, n) {
		var l = r[p];
		if (!l) {
			l = r[p] = []
		}
		for (var q = 0; q <= o; q++) {
			var s = l[q];
			if (!s) {
				if (n === null || n === undefined) {
					s = l[q] = {}
				} else {
					s = l[q] = n
				}
			}
		}
		return r[p][o]
	}
	var c = null;
	for (var f = 0, d = k.length; f <= d - 1; f++) {
		var a = k[f];
		if (f == d - 1) {
			if (a.indexOf("]") == -1) {
				e[a] = m
			} else {
				var b = a.split("[");
				var j = b[0], h = parseInt(b[1]);
				g(e, j, h, "");
				e[j][h] = m
			}
			break
		}
		if (a.indexOf("]") == -1) {
			c = e[a];
			if (f <= d - 2 && c == null) {
				e[a] = c = {}
			}
			e = c
		} else {
			var b = a.split("[");
			var j = b[0], h = parseInt(b[1]);
			e = g(e, j, h)
		}
	}
	return m
};
fui.getAndCreate = function(a) {
	if (!a) {
		return null
	}
	if (typeof a == "string") {
		return fui.components[a]
	}
	if (typeof a == "object") {
		if (fui.isControl(a)) {
			return a
		} else {
			if (fui.isElement(a)) {
				return fui.uids[a.uid]
			} else {
				return fui.create(a)
			}
		}
	}
	return null
};
fui.create = function(a) {
	if (!a) {
		return null
	}
	if (fui.get(a.id) === a) {
		return a
	}
	var b = this.getClass(a.type);
	if (!b) {
		return null
	}
	var c = new b();
	c.set(a);
	return c
};
fui.Component = function() {
	this._events = {};
	this.uid = fui.newId(this._idPre);
	this._id = this.uid;
	if (!this.id) {
		this.id = this.uid
	}
	fui.reg(this)
};
fui.Component.prototype = {
	isControl : true,
	id : null,
	_idPre : "fui-",
	_idSet : false,
	_canFire : true,
	set : function(e) {
		if (typeof e == "string") {
			return this
		}
		var d = this._allowLayout;
		this._allowLayout = false;
		var f = e.renderTo || e.render;
		delete e.renderTo;
		delete e.render;
		for ( var b in e) {
			if (b.toLowerCase().indexOf("on") == 0) {
				var c = e[b];
				this.on(b.substring(2, b.length).toLowerCase(), c);
				delete e[b]
			}
		}
		for ( var b in e) {
			var a = e[b];
			var h = "set" + b.charAt(0).toUpperCase()
					+ b.substring(1, b.length);
			var g = this[h];
			if (g) {
				g.call(this, a)
			} else {
				this[b] = a
			}
		}
		if (f && this.render) {
			this.render(f)
		}
		this._allowLayout = d;
		if (this.doLayout) {
			this.doLayout()
		}
		return this
	},
	fire : function(d, e) {
		if (this._canFire == false) {
			return
		}
		d = d.toLowerCase();
		var b = this._events[d];
		if (b) {
			if (!e) {
				e = {}
			}
			if (e && e != this) {
				e.source = e.sender = this;
				if (!e.type) {
					e.type = d
				}
			}
			for (var c = 0, a = b.length; c < a; c++) {
				var f = b[c];
				if (f) {
					f[0].apply(f[1], [ e ])
				}
			}
		}
	},
	on : function(type, fn, scope) {
		if (typeof fn == "string") {
			var f = fui._getFunctoin(fn);
			if (!f) {
				var id = fui.newId("__str_");
				window[id] = fn;
				eval("fn = function(e){var s = "
						+ id
						+ ";var fn = fui._getFunctoin(s); if(fn) {fn.call(this, e)}else{eval(s);}}")
			} else {
				fn = f
			}
		}
		if (typeof fn != "function" || !type) {
			return false
		}
		type = type.toLowerCase();
		var event = this._events[type];
		if (!event) {
			event = this._events[type] = []
		}
		scope = scope || this;
		if (!this.findListener(type, fn, scope)) {
			event.push([ fn, scope ])
		}
		return this
	},
	un : function(c, b, a) {
		if (typeof b != "function") {
			return false
		}
		c = c.toLowerCase();
		var d = this._events[c];
		if (d) {
			a = a || this;
			var e = this.findListener(c, b, a);
			if (e) {
				d.remove(e)
			}
		}
		return this
	},
	findListener : function(f, e, d) {
		f = f.toLowerCase();
		d = d || this;
		var b = this._events[f];
		if (b) {
			for (var c = 0, a = b.length; c < a; c++) {
				var g = b[c];
				if (g[0] === e && g[1] === d) {
					return g
				}
			}
		}
	},
	setId : function(a) {
		if (!a) {
			throw new Error("id not null")
		}
		if (this._idSet) {
			throw new Error("id just set only one")
		}
		fui.unreg(this);
		this.id = a;
		if (this.el) {
			this.el.id = a
		}
		if (this._textEl) {
			this._textEl.id = a + "$text"
		}
		if (this._valueEl) {
			this._valueEl.id = a + "$value"
		}
		this._idSet = true;
		fui.reg(this)
	},
	getId : function() {
		return this.id
	},
	destroy : function() {
		fui.unreg(this);
		this.fire("destroy")
	}
};
fui.Control = function() {
	fui.Control.superclass.constructor.call(this);
	this._create();
	this.el.uid = this.uid;
	this._initEvents();
	if (this._clearBorder) {
		this.el.style.borderWidth = "0"
	}
	this.addCls(this.uiCls);
	this.setWidth(this.width);
	this.setHeight(this.height);
	this.el.style.display = this.visible ? this._displayStyle : "none"
};
fui.extend(fui.Control, fui.Component, {
	jsName : null,
	width : "",
	height : "",
	visible : true,
	readOnly : false,
	enabled : true,
	tooltip : "",
	_readOnlyCls : "fui-readonly",
	_disabledCls : "fui-disabled",
	_create : function() {
		this.el = document.createElement("div")
	},
	_initEvents : function() {
	},
	within : function(a) {
		if (fui.isAncestor(this.el, a.target)) {
			return true
		}
		return false
	},
	name : "",
	setName : function(a) {
		this.name = a
	},
	getName : function() {
		return this.name
	},
	isAutoHeight : function() {
		var a = this.el.style.height;
		return a == "auto" || a == ""
	},
	isAutoWidth : function() {
		var a = this.el.style.width;
		return a == "auto" || a == ""
	},
	isFixedSize : function() {
		var b = this.width;
		var a = this.height;
		if (parseInt(b) + "px" == b && parseInt(a) + "px" == a) {
			return true
		}
		return false
	},
	isRender : function(a) {
		return !!(this.el && this.el.parentNode && this.el.parentNode.tagName)
	},
	render : function(b, a) {
		if (typeof b === "string") {
			if (b == "#body") {
				b = document.body
			} else {
				b = fui.byId(b)
			}
		}
		if (!b) {
			return
		}
		if (!a) {
			a = "append"
		}
		a = a.toLowerCase();
		if (a == "before") {
			jQuery(b).before(this.el)
		} else {
			if (a == "preend") {
				jQuery(b).preend(this.el)
			} else {
				if (a == "after") {
					jQuery(b).after(this.el)
				} else {
					b.appendChild(this.el)
				}
			}
		}
		this.el.id = this.id;
		this.doLayout();
		this.fire("render")
	},
	getEl : function() {
		return this.el
	},
	setJsName : function(a) {
		this.jsName = a;
		window[a] = this
	},
	getJsName : function() {
		return this.jsName
	},
	setTooltip : function(a) {
		this.tooltip = a;
		this.el.title = a
	},
	getTooltip : function() {
		return this.tooltip
	},
	_sizeChaned : function() {
		this.doLayout()
	},
	setWidth : function(a) {
		if (parseInt(a) == a) {
			a += "px"
		}
		this.width = a;
		this.el.style.width = a;
		this._sizeChaned()
	},
	getWidth : function(c) {
		var a = c ? jQuery(this.el).width() : jQuery(this.el).outerWidth();
		if (c && this._borderEl) {
			var b = fui.getBorders(this._borderEl);
			a = a - b.left - b.right
		}
		return a
	},
	setHeight : function(a) {
		if (parseInt(a) == a) {
			a += "px"
		}
		this.height = a;
		this.el.style.height = a;
		this._sizeChaned()
	},
	getHeight : function(c) {
		var b = c ? jQuery(this.el).height() : jQuery(this.el).outerHeight();
		if (c && this._borderEl) {
			var a = fui.getBorders(this._borderEl);
			b = b - a.top - a.bottom
		}
		return b
	},
	getBox : function() {
		return fui.getBox(this.el)
	},
	setBorderStyle : function(b) {
		var a = this._borderEl || this.el;
		fui.setStyle(a, b);
		this.doLayout()
	},
	getBorderStyle : function() {
		return this.borderStyle
	},
	_clearBorder : true,
	setStyle : function(a) {
		this.style = a;
		fui.setStyle(this.el, a);
		if (this._clearBorder) {
			this.el.style.borderWidth = "0";
			this.el.style.padding = "0px"
		}
		this.width = this.el.style.width;
		this.height = this.el.style.height;
		this._sizeChaned()
	},
	getStyle : function() {
		return this.style
	},
	setCls : function(a) {
		this.addCls(a)
	},
	getCls : function() {
		return this.cls
	},
	addCls : function(a) {
		fui.addClass(this.el, a)
	},
	removeCls : function(a) {
		fui.removeClass(this.el, a)
	},
	_doReadOnly : function() {
		if (this.readOnly) {
			this.addCls(this._readOnlyCls)
		} else {
			this.removeCls(this._readOnlyCls)
		}
	},
	setReadOnly : function(a) {
		this.readOnly = a;
		this._doReadOnly()
	},
	getReadOnly : function() {
		return this.readOnly
	},
	getParent : function(d) {
		var b = document;
		var a = this.el.parentNode;
		while (a != b && a != null) {
			var c = fui.get(a);
			if (c) {
				if (!fui.isControl(c)) {
					return null
				}
				if (!d || c.uiCls == d) {
					return c
				}
			}
			a = a.parentNode
		}
		return null
	},
	isReadOnly : function() {
		if (this.readOnly || !this.enabled) {
			return true
		}
		var a = this.getParent();
		if (a) {
			return a.isReadOnly()
		}
		return false
	},
	setEnabled : function(a) {
		this.enabled = a;
		if (this.enabled) {
			this.removeCls(this._disabledCls)
		} else {
			this.addCls(this._disabledCls)
		}
		this._doReadOnly()
	},
	getEnabled : function() {
		return this.enabled
	},
	enable : function() {
		this.setEnabled(true)
	},
	disable : function() {
		this.setEnabled(false)
	},
	_displayStyle : "",
	setVisible : function(a) {
		this.visible = a;
		if (this.el) {
			this.el.style.display = a ? this._displayStyle : "none";
			this.doLayout()
		}
	},
	getVisible : function() {
		return this.visible
	},
	show : function() {
		this.setVisible(true)
	},
	hide : function() {
		this.setVisible(false)
	},
	isDisplay : function(c) {
		if (fui.WindowVisible == false) {
			return false
		}
		var b = document.body;
		var a = this.el;
		while (1) {
			if (a == null || !a.style) {
				return false
			}
			if (a && a.style && a.style.display == "none") {
				if (c) {
					if (c(a) !== true) {
						return false
					}
				} else {
					return false
				}
			}
			if (a == b) {
				return true
			}
			a = a.parentNode
		}
		return true
	},
	_allowUpdate : true,
	beginUpdate : function() {
		this._allowUpdate = false
	},
	endUpdate : function() {
		this._allowUpdate = true;
		this.doUpdate()
	},
	doUpdate : function() {
	},
	canLayout : function() {
		if (this._allowLayout == false) {
			return false
		}
		return this.isDisplay()
	},
	doLayout : function() {
	},
	layoutChanged : function() {
		if (this.canLayout() == false) {
			return
		}
		this.doLayout()
	},
	_destroyChildren : function(d) {
		if (this.el) {
			var c = fui.getChildControls(this);
			for (var b = 0, a = c.length; b < a; b++) {
				var e = c[b];
				if (e.destroyed !== true) {
					e.destroy(d)
				}
			}
		}
	},
	destroy : function(a) {
		if (this.destroyed !== true) {
			this._destroyChildren(a)
		}
		if (this.el) {
			fui.clearEvent(this.el);
			if (a !== false) {
				var b = this.el.parentNode;
				if (b) {
					b.removeChild(this.el)
				}
			}
		}
		this._borderEl = null;
		this.el = null;
		fui.unreg(this);
		this.destroyed = true;
		this.fire("destroy")
	},
	focus : function() {
		try {
			var a = this;
			a.el.focus()
		} catch (b) {
		}
	},
	blur : function() {
		try {
			var a = this;
			a.el.blur()
		} catch (b) {
		}
	},
	allowAnim : true,
	setAllowAnim : function(a) {
		this.allowAnim = a
	},
	getAllowAnim : function() {
		return this.allowAnim
	},
	_getMaskWrapEl : function() {
		return this.el
	},
	mask : function(a) {
		if (typeof a == "string") {
			a = {
				html : a
			}
		}
		a = a || {};
		a.el = this._getMaskWrapEl();
		if (!a.cls) {
			a.cls = this._maskCls
		}
		fui.mask(a)
	},
	unmask : function() {
		fui.unmask(this._getMaskWrapEl());
		this.isLoading = false
	},
	_maskCls : "fui-mask-loading",
	loadingMsg : "Loading...",
	loading : function(a) {
		this.mask(a || this.loadingMsg)
	},
	setLoadingMsg : function(a) {
		this.loadingMsg = a
	},
	getLoadingMsg : function() {
		return this.loadingMsg
	},
	_getContextMenu : function(b) {
		var a = b;
		if (typeof b == "string") {
			a = fui.get(b);
			if (!a) {
				fui.parse(b);
				a = fui.get(b)
			}
		} else {
			if (fui.isArray(b)) {
				a = {
					type : "menu",
					items : b
				}
			} else {
				if (!fui.isControl(b)) {
					a = fui.create(b)
				}
			}
		}
		return a
	},
	__OnHtmlContextMenu : function(b) {
		var a = {
			popupEl : this.el,
			htmlEvent : b,
			cancel : false
		};
		this.contextMenu.fire("BeforeOpen", a);
		if (a.cancel == true) {
			return
		}
		this.contextMenu.fire("opening", a);
		if (a.cancel == true) {
			return
		}
		this.contextMenu.showAtPos(b.pageX, b.pageY);
		this.contextMenu.fire("Open", a);
		return false
	},
	contextMenu : null,
	setContextMenu : function(b) {
		var a = this._getContextMenu(b);
		if (!a) {
			return
		}
		if (this.contextMenu !== a) {
			this.contextMenu = a;
			this.contextMenu.owner = this;
			fui.on(this.el, "contextmenu", this.__OnHtmlContextMenu, this)
		}
	},
	getContextMenu : function() {
		return this.contextMenu
	},
	setDefaultValue : function(a) {
		this.defaultValue = a
	},
	getDefaultValue : function() {
		return this.defaultValue
	},
	setValue : function(a) {
		this.value = a
	},
	getValue : function() {
		return this.value
	},
	ajaxData : null,
	ajaxType : "",
	setAjaxData : function(a) {
		this.ajaxData = a
	},
	getAjaxData : function() {
		return this.ajaxData
	},
	setAjaxType : function(a) {
		this.ajaxType = a
	},
	getAjaxType : function() {
		return this.ajaxType
	},
	_afterApply : function(a) {
	},
	dataField : "",
	setDataField : function(a) {
		this.dataField = a
	},
	getDataField : function() {
		return this.dataField
	},
	getAttrs : function(el) {
		var attrs = {};
		var cls = el.className;
		if (cls) {
			attrs.cls = cls
		}
		if (el.value) {
			attrs.value = el.value
		}
		fui._ParseString(el, attrs, [ "id", "name", "width", "height",
				"borderStyle", "value", "defaultValue", "contextMenu",
				"tooltip", "ondestroy", "data-options", "ajaxData", "ajaxType",
				"dataField" ]);
		fui._ParseBool(el, attrs, [ "visible", "enabled", "readOnly" ]);
		if (el.readOnly && el.readOnly != "false") {
			attrs.readOnly = true
		}
		var style = el.style.cssText;
		if (style) {
			attrs.style = style
		}
		if (isIE9) {
			var bg = el.style.background;
			if (bg) {
				if (!attrs.style) {
					attrs.style = ""
				}
				attrs.style += ";background:" + bg
			}
		}
		if (this.style) {
			if (attrs.style) {
				attrs.style = this.style + ";" + attrs.style
			} else {
				attrs.style = this.style
			}
		}
		if (this.borderStyle) {
			if (attrs.borderStyle) {
				attrs.borderStyle = this.borderStyle + ";" + attrs.borderStyle
			} else {
				attrs.borderStyle = this.borderStyle
			}
		}
		var ts = fui._attrs;
		if (ts) {
			for (var i = 0, l = ts.length; i < l; i++) {
				var t = ts[i];
				var name = t[0];
				var type = t[1];
				if (!type) {
					type = "string"
				}
				if (type == "string") {
					fui._ParseString(el, attrs, [ name ])
				} else {
					if (type == "bool") {
						fui._ParseBool(el, attrs, [ name ])
					} else {
						if (type == "int") {
							fui._ParseInt(el, attrs, [ name ])
						}
					}
				}
			}
		}
		var options = attrs["data-options"];
		if (options) {
			options = eval("(" + options + ")");
			if (options) {
				fui.copyTo(attrs, options)
			}
		}
		return attrs
	}
});
fui._attrs = null;
fui.regHtmlAttr = function(a, b) {
	if (!a) {
		return
	}
	if (!b) {
		b = "string"
	}
	if (!fui._attrs) {
		fui._attrs = []
	}
	fui._attrs.push([ a, b ])
};
__fui_setControls = function(b, f, e) {
	f = f || this._contentEl;
	e = e || this;
	if (!b) {
		b = []
	}
	if (!fui.isArray(b)) {
		b = [ b ]
	}
	for (var d = 0, a = b.length; d < a; d++) {
		var g = b[d];
		if (typeof g == "string") {
			if (g.indexOf("#") == 0) {
				g = fui.byId(g)
			}
		} else {
			if (fui.isElement(g)) {
			} else {
				g = fui.getAndCreate(g);
				g = g.el
			}
		}
		if (!g) {
			continue
		}
		fui.append(f, g)
	}
	fui.parse(f);
	e.doLayout();
	return e
};
fui.Container = function() {
	fui.Container.superclass.constructor.call(this);
	this._contentEl = this.el
};
fui.extend(fui.Container, fui.Control, {
	setControls : __fui_setControls,
	getContentEl : function() {
		return this._contentEl
	},
	getBodyEl : function() {
		return this._contentEl
	},
	within : function(f) {
		if (fui.isAncestor(this.el, f.target)) {
			return true
		}
		var b = fui.getChildControls(this);
		for (var d = 0, a = b.length; d < a; d++) {
			var g = b[d];
			if (g.within(f)) {
				return true
			}
		}
		return false
	}
});
fui.ValidatorBase = function() {
	fui.ValidatorBase.superclass.constructor.call(this)
};
fui.extend(fui.ValidatorBase, fui.Control, {
	required : false,
	requiredErrorText : "This field is required.",
	_requiredCls : "fui-required",
	errorText : "",
	_errorCls : "fui-error",
	_invalidCls : "fui-invalid",
	errorMode : "icon",
	validateOnChanged : true,
	validateOnLeave : true,
	_IsValid : true,
	_tryValidate : function() {
		if (this._tryValidateTimer) {
			clearTimeout(this._tryValidateTimer)
		}
		var a = this;
		this._tryValidateTimer = setTimeout(function() {
			a.validate()
		}, 30)
	},
	validate : function() {
		if (this.enabled == false) {
			this.setIsValid(true);
			return true
		}
		var a = {
			value : this.getValue(),
			errorText : "",
			isValid : true
		};
		if (this.required) {
			if (fui.isNull(a.value) || String(a.value).trim() === "") {
				a.isValid = false;
				a.errorText = this.requiredErrorText
			}
		}
		this.fire("validation", a);
		this.errorText = a.errorText;
		this.setIsValid(a.isValid);
		return this.isValid()
	},
	isValid : function() {
		return this._IsValid
	},
	setIsValid : function(a) {
		this._IsValid = a;
		this.doUpdateValid()
	},
	getIsValid : function() {
		return this._IsValid
	},
	setValidateOnChanged : function(a) {
		this.validateOnChanged = a
	},
	getValidateOnChanged : function(a) {
		return this.validateOnChanged
	},
	setValidateOnLeave : function(a) {
		this.validateOnLeave = a
	},
	getValidateOnLeave : function(a) {
		return this.validateOnLeave
	},
	setErrorMode : function(a) {
		if (!a) {
			a = "none"
		}
		this.errorMode = a.toLowerCase();
		if (this._IsValid == false) {
			this.doUpdateValid()
		}
	},
	getErrorMode : function() {
		return this.errorMode
	},
	setErrorText : function(a) {
		this.errorText = a;
		if (this._IsValid == false) {
			this.doUpdateValid()
		}
	},
	getErrorText : function() {
		return this.errorText
	},
	setRequired : function(a) {
		this.required = a;
		if (this.required) {
			this.addCls(this._requiredCls)
		} else {
			this.removeCls(this._requiredCls)
		}
	},
	getRequired : function() {
		return this.required
	},
	setRequiredErrorText : function(a) {
		this.requiredErrorText = a
	},
	getRequiredErrorText : function() {
		return this.requiredErrorText
	},
	errorIconEl : null,
	getErrorIconEl : function() {
		return this._errorIconEl
	},
	_RemoveErrorIcon : function() {
	},
	doUpdateValid : function() {
		var a = this;
		this._doUpdateValidTimer = setTimeout(function() {
			a.__doUpdateValid()
		}, 1)
	},
	__doUpdateValid : function() {
		if (!this.el) {
			return
		}
		this.removeCls(this._errorCls);
		this.removeCls(this._invalidCls);
		this.el.title = "";
		if (this._IsValid == false) {
			switch (this.errorMode) {
			case "icon":
				this.addCls(this._errorCls);
				var a = this.getErrorIconEl();
				if (a) {
					a.title = this.errorText
				}
				break;
			case "border":
				this.addCls(this._invalidCls);
				this.el.title = this.errorText;
			default:
				this._RemoveErrorIcon();
				break
			}
		} else {
			this._RemoveErrorIcon()
		}
		this.doLayout()
	},
	doValueChanged : function() {
		this._OnValueChanged()
	},
	_OnValueChanged : function() {
		if (this.validateOnChanged) {
			this._tryValidate()
		}
		this.fire("valuechanged", {
			value : this.getValue()
		})
	},
	onValueChanged : function(b, a) {
		this.on("valuechanged", b, a)
	},
	onValidation : function(b, a) {
		this.on("validation", b, a)
	},
	getAttrs : function(b) {
		var a = fui.ValidatorBase.superclass.getAttrs.call(this, b);
		fui._ParseString(b, a, [ "onvaluechanged", "onvalidation",
				"requiredErrorText", "errorMode" ]);
		fui._ParseBool(b, a, [ "validateOnChanged", "validateOnLeave" ]);
		var d = b.getAttribute("required");
		if (!d) {
			d = b.required
		}
		if (!d) {
			var c = b.attributes.required;
			if (c) {
				d = c.value == "null" ? null : "true"
			}
		}
		if (d) {
			a.required = d != "false" ? true : false
		}
		return a
	}
});
fui.ListControl = function() {
	this.data = [];
	this._selecteds = [];
	fui.ListControl.superclass.constructor.call(this);
	this.doUpdate()
};
fui.ListControl.ajaxType = "get";
fui.extend(fui.ListControl, fui.ValidatorBase, {
	defaultValue : "",
	value : "",
	valueField : "id",
	textField : "text",
	dataField : "",
	delimiter : ",",
	data : null,
	url : "",
	_itemCls : "fui-list-item",
	_itemHoverCls : "fui-list-item-hover",
	_itemSelectedCls : "fui-list-item-selected",
	set : function(d) {
		if (typeof d == "string") {
			return this
		}
		var c = d.value;
		delete d.value;
		var a = d.url;
		delete d.url;
		var b = d.data;
		delete d.data;
		fui.ListControl.superclass.set.call(this, d);
		if (!fui.isNull(b)) {
			this.setData(b)
		}
		if (!fui.isNull(a)) {
			this.setUrl(a)
		}
		if (!fui.isNull(c)) {
			this.setValue(c)
		}
		return this
	},
	uiCls : "fui-list",
	_create : function() {
	},
	_initEvents : function() {
		fui._BindEvents(function() {
			fui_onOne(this.el, "click", this.__OnClick, this);
			fui_onOne(this.el, "dblclick", this.__OnDblClick, this);
			fui_onOne(this.el, "mousedown", this.__OnMouseDown, this);
			fui_onOne(this.el, "mouseup", this.__OnMouseUp, this);
			fui_onOne(this.el, "mousemove", this.__OnMouseMove, this);
			fui_onOne(this.el, "mouseover", this.__OnMouseOver, this);
			fui_onOne(this.el, "mouseout", this.__OnMouseOut, this);
			fui_onOne(this.el, "keydown", this.__OnKeyDown, this);
			fui_onOne(this.el, "keyup", this.__OnKeyUp, this);
			fui_onOne(this.el, "contextmenu", this.__OnContextMenu, this)
		}, this)
	},
	destroy : function(a) {
		if (this.el) {
			this.el.onclick = null;
			this.el.ondblclick = null;
			this.el.onmousedown = null;
			this.el.onmouseup = null;
			this.el.onmousemove = null;
			this.el.onmouseover = null;
			this.el.onmouseout = null;
			this.el.onkeydown = null;
			this.el.onkeyup = null;
			this.el.oncontextmenu = null
		}
		fui.ListControl.superclass.destroy.call(this, a)
	},
	name : "",
	setName : function(a) {
		this.name = a;
		if (this._valueEl) {
			fui.setAttr(this._valueEl, "name", this.name)
		}
	},
	getItemByEvent : function(c) {
		var b = fui.findParent(c.target, this._itemCls);
		if (b) {
			var a = parseInt(fui.getAttr(b, "index"));
			return this.data[a]
		}
	},
	addItemCls : function(c, a) {
		var b = this.getItemEl(c);
		if (b) {
			fui.addClass(b, a)
		}
	},
	removeItemCls : function(c, a) {
		var b = this.getItemEl(c);
		if (b) {
			fui.removeClass(b, a)
		}
	},
	getItemEl : function(b) {
		b = this.getItem(b);
		var a = this.data.indexOf(b);
		var c = this._createItemId(a);
		return document.getElementById(c)
	},
	_focusItem : function(b, a) {
		b = this.getItem(b);
		if (!b) {
			return
		}
		var c = this.getItemEl(b);
		if (a && c) {
			this.scrollIntoView(b)
		}
		if (this._focusedItem == b) {
			if (c) {
				fui.addClass(c, this._itemHoverCls)
			}
			return
		}
		this._blurItem();
		this._focusedItem = b;
		if (c) {
			fui.addClass(c, this._itemHoverCls)
		}
	},
	_blurItem : function() {
		if (!this._focusedItem) {
			return
		}
		var a = this.getItemEl(this._focusedItem);
		if (a) {
			fui.removeClass(a, this._itemHoverCls)
		}
		this._focusedItem = null
	},
	getFocusedItem : function() {
		return this._focusedItem
	},
	getFocusedIndex : function() {
		return this.data.indexOf(this._focusedItem)
	},
	_scrollViewEl : null,
	scrollIntoView : function(c) {
		try {
			var b = this.getItemEl(c);
			var a = this._scrollViewEl || this.el;
			fui.scrollIntoView(b, a, false)
		} catch (d) {
		}
	},
	getItem : function(a) {
		if (typeof a == "object") {
			return a
		}
		if (typeof a == "number") {
			return this.data[a]
		}
		return this.findItems(a)[0]
	},
	getCount : function() {
		return this.data.length
	},
	indexOf : function(a) {
		return this.data.indexOf(a)
	},
	getAt : function(a) {
		return this.data[a]
	},
	updateItem : function(b, a) {
		b = this.getItem(b);
		if (!b) {
			return
		}
		fui.copyTo(b, a);
		this.doUpdate()
	},
	load : function(a) {
		if (typeof a == "string") {
			this.setUrl(a)
		} else {
			this.setData(a)
		}
	},
	loadData : function(a) {
		this.setData(a)
	},
	setData : function(data) {
		if (typeof data == "string") {
			data = eval(data)
		}
		if (!fui.isArray(data)) {
			data = []
		}
		this.data = data;
		this.doUpdate();
		if (this.value != "") {
			this.deselectAll();
			var records = this.findItems(this.value);
			this.selects(records)
		}
	},
	getData : function() {
		return this.data.clone()
	},
	setUrl : function(a) {
		this.url = a;
		this._doLoad({})
	},
	getUrl : function() {
		return this.url
	},
	ajaxData : null,
	_doLoad : function(params) {
		try {
			var url = eval(this.url);
			if (url != undefined) {
				this.url = url
			}
		} catch (e) {
		}
		var url = this.url;
		var ajaxMethod = fui.ListControl.ajaxType;
		if (url) {
			if (url.indexOf(".txt") != -1 || url.indexOf(".json") != -1) {
				ajaxMethod = "get"
			}
		}
		var obj = fui._evalAjaxData(this.ajaxData, this);
		fui.copyTo(params, obj);
		var e = {
			url : this.url,
			async : false,
			type : this.ajaxType ? this.ajaxType : ajaxMethod,
			data : params,
			params : params,
			cache : false,
			cancel : false
		};
		this.fire("beforeload", e);
		if (e.data != e.params && e.params != params) {
			e.data = e.params
		}
		if (e.cancel == true) {
			return
		}
		var sf = this;
		var url = e.url;
		fui.copyTo(e, {
			success : function(text) {
				var data = null;
				try {
					data = fui.decode(text)
				} catch (ex) {
					data = [];
					if (fui_debugger == true) {
						alert(url + "\njson is error.")
					}
				}
				if (sf.dataField) {
					data = fui._getMap(sf.dataField, data)
				}
				if (!data) {
					data = []
				}
				var ex = {
					data : data,
					cancel : false
				};
				sf.fire("preload", ex);
				if (ex.cancel == true) {
					return
				}
				sf.setData(ex.data);
				sf.fire("load");
				setTimeout(function() {
					sf.doLayout()
				}, 100)
			},
			error : function(jqXHR, textStatus, errorThrown) {
				var e = {
					xmlHttp : jqXHR,
					errorMsg : jqXHR.responseText,
					errorCode : jqXHR.status
				};
				if (fui_debugger == true) {
					alert(url + "\n" + e.errorCode + "\n" + e.errorMsg)
				}
				sf.fire("loaderror", e)
			}
		});
		this._ajaxer = fui.ajax(e)
	},
	setValue : function(b) {
		if (fui.isNull(b)) {
			b = ""
		}
		if (this.value !== b) {
			this.deselectAll();
			this.value = b;
			if (this._valueEl) {
				this._valueEl.value = b
			}
			var a = this.findItems(this.value);
			this.selects(a)
		}
	},
	getValue : function() {
		return this.value
	},
	getFormValue : function() {
		return this.value
	},
	setValueField : function(a) {
		this.valueField = a
	},
	getValueField : function() {
		return this.valueField
	},
	setTextField : function(a) {
		this.textField = a
	},
	getTextField : function() {
		return this.textField
	},
	getItemValue : function(a) {
		return String(fui._getMap(this.valueField, a))
	},
	getItemText : function(b) {
		var a = fui._getMap(this.textField, b);
		return fui.isNull(a) ? "" : String(a)
	},
	getValueAndText : function(d) {
		if (fui.isNull(d)) {
			d = []
		}
		if (!fui.isArray(d)) {
			d = this.findItems(d)
		}
		var c = [];
		var f = [];
		for (var e = 0, b = d.length; e < b; e++) {
			var a = d[e];
			if (a) {
				c.push(this.getItemValue(a));
				f.push(this.getItemText(a))
			}
		}
		return [ c.join(this.delimiter), f.join(this.delimiter) ]
	},
	findItems : function(o) {
		if (fui.isNull(o) || o === "") {
			return []
		}
		if (typeof o == "function") {
			var n = o;
			var h = [];
			var f = this.data;
			for (var d = 0, c = f.length; d < c; d++) {
				var g = f[d];
				if (n(g, d) === true) {
					h.push(g)
				}
			}
			return h
		}
		var q = String(o).split(this.delimiter);
		var f = this.data;
		var m = {};
		for (var d = 0, c = f.length; d < c; d++) {
			var g = f[d];
			var p = g[this.valueField];
			m[p] = g
		}
		var a = [];
		for (var e = 0, b = q.length; e < b; e++) {
			var p = q[e];
			var g = m[p];
			if (g) {
				a.push(g)
			}
		}
		return a
	},
	removeAll : function() {
		var a = this.getData();
		this.removeItems(a)
	},
	addItems : function(a, b) {
		if (!fui.isArray(a)) {
			return
		}
		if (fui.isNull(b)) {
			b = this.data.length
		}
		this.data.insertRange(b, a);
		this.doUpdate()
	},
	addItem : function(b, a) {
		if (!b) {
			return
		}
		if (this.data.indexOf(b) != -1) {
			return
		}
		if (fui.isNull(a)) {
			a = this.data.length
		}
		this.data.insert(a, b);
		this.doUpdate()
	},
	removeItems : function(a) {
		if (!fui.isArray(a)) {
			return
		}
		this.data.removeRange(a);
		this._checkSelecteds();
		this.doUpdate()
	},
	removeItem : function(b) {
		var a = this.data.indexOf(b);
		if (a != -1) {
			this.data.removeAt(a);
			this._checkSelecteds();
			this.doUpdate()
		}
	},
	moveItem : function(b, a) {
		if (!b || !fui.isNumber(a)) {
			return
		}
		if (a < 0) {
			a = 0
		}
		if (a > this.data.length) {
			a = this.data.length
		}
		this.data.remove(b);
		this.data.insert(a, b);
		this.doUpdate()
	},
	_selected : null,
	_selecteds : [],
	multiSelect : false,
	_checkSelecteds : function() {
		for (var b = this._selecteds.length - 1; b >= 0; b--) {
			var a = this._selecteds[b];
			if (this.data.indexOf(a) == -1) {
				this._selecteds.removeAt(b)
			}
		}
		var c = this.getValueAndText(this._selecteds);
		this.value = c[0];
		if (this._valueEl) {
			this._valueEl.value = this.value
		}
	},
	setMultiSelect : function(a) {
		this.multiSelect = a
	},
	getMultiSelect : function() {
		return this.multiSelect
	},
	isSelected : function(a) {
		if (!a) {
			return false
		}
		return this._selecteds.indexOf(a) != -1
	},
	getSelecteds : function() {
		var a = this._selecteds.clone();
		var b = this;
		fui.sort(a, function(d, c) {
			var f = b.indexOf(d);
			var e = b.indexOf(c);
			if (f > e) {
				return 1
			}
			if (f < e) {
				return -1
			}
			return 0
		});
		return a
	},
	setSelected : function(a) {
		if (a) {
			this._selected = a;
			this.select(a)
		}
	},
	getSelected : function() {
		return this._selected
	},
	select : function(a) {
		a = this.getItem(a);
		if (!a) {
			return
		}
		if (this.isSelected(a)) {
			return
		}
		this.selects([ a ])
	},
	deselect : function(a) {
		a = this.getItem(a);
		if (!a) {
			return
		}
		if (!this.isSelected(a)) {
			return
		}
		this.deselects([ a ])
	},
	selectAll : function() {
		var a = this.data.clone();
		this.selects(a)
	},
	deselectAll : function() {
		this.deselects(this._selecteds)
	},
	clearSelect : function() {
		this.deselectAll()
	},
	selects : function(c) {
		if (!c || c.length == 0) {
			return
		}
		c = c.clone();
		for (var d = 0, b = c.length; d < b; d++) {
			var a = c[d];
			if (!this.isSelected(a)) {
				this._selecteds.push(a)
			}
		}
		var e = this;
		e._doSelects()
	},
	deselects : function(b) {
		if (!b || b.length == 0) {
			return
		}
		b = b.clone();
		for (var c = b.length - 1; c >= 0; c--) {
			var a = b[c];
			if (this.isSelected(a)) {
				this._selecteds.remove(a)
			}
		}
		var d = this;
		d._doSelects()
	},
	_doSelects : function() {
		var g = this.getValueAndText(this._selecteds);
		this.value = g[0];
		if (this._valueEl) {
			this._valueEl.value = this.value
		}
		for (var e = 0, c = this.data.length; e < c; e++) {
			var b = this.data[e];
			var a = this.isSelected(b);
			if (a) {
				this.addItemCls(b, this._itemSelectedCls)
			} else {
				this.removeItemCls(b, this._itemSelectedCls)
			}
			var d = this.data.indexOf(b);
			var h = this._createCheckId(d);
			var f = document.getElementById(h);
			if (f) {
				f.checked = !!a
			}
		}
	},
	_OnSelectionChanged : function(b, a) {
		var c = this.getValueAndText(this._selecteds);
		this.value = c[0];
		if (this._valueEl) {
			this._valueEl.value = this.value
		}
		var d = {
			selecteds : this.getSelecteds(),
			selected : this.getSelected(),
			value : this.getValue()
		};
		this.fire("SelectionChanged", d)
	},
	_createCheckId : function(a) {
		return this.uid + "$ck$" + a
	},
	_createItemId : function(a) {
		return this.uid + "$" + a
	},
	__OnClick : function(a) {
		this._fireEvent(a, "Click")
	},
	__OnDblClick : function(a) {
		this._fireEvent(a, "Dblclick")
	},
	__OnMouseDown : function(a) {
		this._fireEvent(a, "MouseDown")
	},
	__OnMouseUp : function(a) {
		this._fireEvent(a, "MouseUp")
	},
	__OnMouseMove : function(a) {
		this._fireEvent(a, "MouseMove")
	},
	__OnMouseOver : function(a) {
		this._fireEvent(a, "MouseOver")
	},
	__OnMouseOut : function(a) {
		this._fireEvent(a, "MouseOut")
	},
	__OnKeyDown : function(a) {
		this._fireEvent(a, "KeyDown")
	},
	__OnKeyUp : function(a) {
		this._fireEvent(a, "KeyUp")
	},
	__OnContextMenu : function(a) {
		this._fireEvent(a, "ContextMenu")
	},
	_fireEvent : function(f, a) {
		if (!this.enabled) {
			return
		}
		var d = this.getItemByEvent(f);
		if (!d) {
			return
		}
		var c = this["_OnItem" + a];
		if (c) {
			c.call(this, d, f)
		} else {
			var b = {
				item : d,
				htmlEvent : f
			};
			this.fire("item" + a, b)
		}
	},
	_OnItemClick : function(a, c) {
		if (this.isReadOnly() || this.enabled == false || a.enabled === false) {
			c.preventDefault();
			return
		}
		var b = this.getValue();
		if (this.multiSelect) {
			if (this.isSelected(a)) {
				this.deselect(a);
				if (this._selected == a) {
					this._selected = null
				}
			} else {
				this.select(a);
				this._selected = a
			}
			this._OnSelectionChanged()
		} else {
			if (!this.isSelected(a)) {
				this.deselectAll();
				this.select(a);
				this._selected = a;
				this._OnSelectionChanged()
			}
		}
		if (b != this.getValue()) {
			this._OnValueChanged()
		}
		var c = {
			item : a,
			htmlEvent : c
		};
		this.fire("itemclick", c)
	},
	_blurOnOut : true,
	_OnItemMouseOut : function(a, b) {
		fui.repaint(this.el);
		if (!this.enabled) {
			return
		}
		if (this._blurOnOut) {
			this._blurItem()
		}
		var b = {
			item : a,
			htmlEvent : b
		};
		this.fire("itemmouseout", b)
	},
	_OnItemMouseMove : function(a, b) {
		fui.repaint(this.el);
		if (!this.enabled || a.enabled === false) {
			return
		}
		this._focusItem(a);
		var b = {
			item : a,
			htmlEvent : b
		};
		this.fire("itemmousemove", b)
	},
	onItemClick : function(b, a) {
		this.on("itemclick", b, a)
	},
	onItemMouseDown : function(b, a) {
		this.on("itemmousedown", b, a)
	},
	onBeforeLoad : function(b, a) {
		this.on("beforeload", b, a)
	},
	onLoad : function(b, a) {
		this.on("load", b, a)
	},
	onLoadError : function(b, a) {
		this.on("loaderror", b, a)
	},
	onPreLoad : function(b, a) {
		this.on("preload", b, a)
	},
	getAttrs : function(b) {
		var h = fui.ListControl.superclass.getAttrs.call(this, b);
		fui._ParseString(b, h, [ "url", "data", "value", "textField",
				"valueField", "onitemclick", "onitemmousemove",
				"onselectionchanged", "onitemdblclick", "onbeforeload",
				"onload", "onloaderror", "ondataload" ]);
		fui._ParseBool(b, h, [ "multiSelect" ]);
		var j = h.valueField || this.valueField;
		var c = h.textField || this.textField;
		if (b.nodeName.toLowerCase() == "select") {
			var e = [];
			for (var f = 0, d = b.length; f < d; f++) {
				var g = b.options[f];
				var a = {};
				a[c] = g.text;
				a[j] = g.value;
				e.push(a)
			}
			if (e.length > 0) {
				h.data = e
			}
		}
		return h
	}
});
fui._Layouts = {};
fui.layout = function(b, a) {
	if (!document.body) {
		return
	}
	function c(h) {
		if (!h) {
			return
		}
		var j = fui.get(h);
		if (j) {
			if (j.doLayout) {
				if (!fui._Layouts[j.uid]) {
					fui._Layouts[j.uid] = j;
					if (a !== false || j.isFixedSize() == false) {
						j.doLayout(false)
					}
					delete fui._Layouts[j.uid]
				}
			}
		} else {
			var g = h.childNodes;
			if (g) {
				for (var e = 0, d = g.length; e < d; e++) {
					var f = g[e];
					c(f)
				}
			}
		}
	}
	if (!b) {
		b = document.body
	}
	c(b);
	if (b == document.body) {
		fui.layoutIFrames()
	}
};
fui.applyTo = function(b) {
	b = fui.byId(b);
	if (!b) {
		return this
	}
	if (fui.get(b)) {
		throw new Error("not applyTo a fui control")
	}
	var a = this.getAttrs(b);
	delete a._applyTo;
	if (fui.isNull(a.defaultValue) && !fui.isNull(a.value)) {
		a.defaultValue = a.value
	}
	if (fui.isNull(a.defaultText) && !fui.isNull(a.text)) {
		a.defaultText = a.text
	}
	var c = b.parentNode;
	if (c && this.el != b) {
		c.replaceChild(this.el, b)
	}
	this.set(a);
	this._afterApply(b);
	return this
};
fui._doParse = function(b) {
	if (!b) {
		return
	}
	var m = b.nodeName.toLowerCase();
	if (!m) {
		return
	}
	var j = b.className;
	if (j) {
		var f = fui.get(b);
		if (!f) {
			var d = j.split(" ");
			for (var g = 0, e = d.length; g < e; g++) {
				var n = d[g];
				var h = fui.getClassByUICls(n);
				if (h) {
					fui.removeClass(b, n);
					var k = new h();
					fui.applyTo.call(k, b);
					b = k.el;
					break
				}
			}
		}
	}
	if (m == "select" || fui.hasClass(b, "fui-menu")
			|| fui.hasClass(b, "fui-datagrid")
			|| fui.hasClass(b, "fui-treegrid") || fui.hasClass(b, "fui-tree")
			|| fui.hasClass(b, "fui-button") || fui.hasClass(b, "fui-textbox")
			|| fui.hasClass(b, "fui-buttonedit")) {
		return
	}
	var a = fui.getChildNodes(b, true);
	for (var g = 0, e = a.length; g < e; g++) {
		var c = a[g];
		if (c.nodeType == 1) {
			if (c.parentNode == b) {
				fui._doParse(c)
			}
		}
	}
};
fui._Removes = [];
fui.parse = function(a) {
	if (typeof a == "string") {
		var c = a;
		a = fui.byId(c);
		if (!a) {
			a = document.body
		}
	}
	if (a && !fui.isElement(a)) {
		a = a.el
	}
	if (!a) {
		a = document.body
	}
	var b = fui.WindowVisible;
	if (isIE) {
		fui.WindowVisible = false
	}
	fui._doParse(a);
	fui.WindowVisible = b;
	fui.layout(a)
};
fui._ParseString = function(e, c, b) {
	for (var d = 0, a = b.length; d < a; d++) {
		var g = b[d];
		var f = fui.getAttr(e, g);
		if (f) {
			c[g] = f
		}
	}
};
fui._ParseBool = function(e, c, b) {
	for (var d = 0, a = b.length; d < a; d++) {
		var g = b[d];
		var f = fui.getAttr(e, g);
		if (f) {
			c[g] = f == "true" ? true : false
		}
	}
};
fui._ParseInt = function(e, c, b) {
	for (var d = 0, a = b.length; d < a; d++) {
		var g = b[d];
		var f = parseInt(fui.getAttr(e, g));
		if (!isNaN(f)) {
			c[g] = f
		}
	}
};
fui._ParseColumns = function(el) {
	var columns = [];
	var cs = fui.getChildNodes(el);
	for (var i = 0, l = cs.length; i < l; i++) {
		var node = cs[i];
		var jq = jQuery(node);
		var column = {};
		var editor = null, filter = null;
		var subCs = fui.getChildNodes(node);
		if (subCs) {
			for (var ii = 0, li = subCs.length; ii < li; ii++) {
				var subNode = subCs[ii];
				var property = jQuery(subNode).attr("property");
				if (!property) {
					continue
				}
				property = property.toLowerCase();
				if (property == "columns") {
					column.columns = fui._ParseColumns(subNode);
					jQuery(subNode).remove()
				}
				if (property == "editor" || property == "filter") {
					var className = subNode.className;
					var classes = className.split(" ");
					for (var i3 = 0, l3 = classes.length; i3 < l3; i3++) {
						var cls = classes[i3];
						var clazz = fui.getClassByUICls(cls);
						if (clazz) {
							var ui = new clazz();
							if (property == "filter") {
								filter = ui.getAttrs(subNode);
								filter.type = ui.type
							} else {
								editor = ui.getAttrs(subNode);
								editor.type = ui.type
							}
							break
						}
					}
					jQuery(subNode).remove()
				}
			}
		}
		column.header = node.innerHTML;
		fui._ParseString(node, column, [ "name", "header", "field", "editor",
				"filter", "renderer", "width", "type", "renderer",
				"headerAlign", "align", "headerCls", "cellCls", "headerStyle",
				"cellStyle", "displayField", "dateFormat", "listFormat",
				"mapFormat", "trueValue", "falseValue", "dataType", "vtype",
				"currencyUnit", "summaryType", "summaryRenderer",
				"groupSummaryType", "groupSummaryRenderer", "defaultValue",
				"defaultText", "decimalPlaces", "data-options" ]);
		fui._ParseBool(node, column, [ "visible", "readOnly", "allowSort",
				"allowResize", "allowMove", "allowDrag", "autoShowPopup",
				"unique", "autoEscape", "enabled" ]);
		if (editor) {
			column.editor = editor
		}
		if (filter) {
			column.filter = filter
		}
		if (column.dataType) {
			column.dataType = column.dataType.toLowerCase()
		}
		if (column.defaultValue === "true") {
			column.defaultValue = true
		}
		if (column.defaultValue === "false") {
			column.defaultValue = false
		}
		columns.push(column);
		var options = column["data-options"];
		if (options) {
			options = eval("(" + options + ")");
			if (options) {
				fui.copyTo(column, options)
			}
		}
	}
	return columns
};
fui._Columns = {};
fui._getColumn = function(b) {
	var a = fui._Columns[b.toLowerCase()];
	if (!a) {
		return {}
	}
	return a()
};
fui.IndexColumn = function(a) {
	return fui.copyTo({
		width : 30,
		cellCls : "",
		align : "center",
		draggable : false,
		allowDrag : true,
		init : function(b) {
			b.on("addrow", this.__OnIndexChanged, this);
			b.on("removerow", this.__OnIndexChanged, this);
			b.on("moverow", this.__OnIndexChanged, this);
			if (b.isTree) {
				b.on("addnode", this.__OnIndexChanged, this);
				b.on("removenode", this.__OnIndexChanged, this);
				b.on("movenode", this.__OnIndexChanged, this);
				b.on("loadnode", this.__OnIndexChanged, this);
				this._gridUID = b.uid;
				this._rowIdField = "_id"
			}
		},
		getNumberId : function(b) {
			return this._gridUID + "$number$" + b[this._rowIdField]
		},
		createNumber : function(b, c) {
			if (fui.isNull(b.pageIndex)) {
				return c + 1
			} else {
				return (b.pageIndex * b.pageSize) + c + 1
			}
		},
		renderer : function(d) {
			var b = d.sender;
			if (this.draggable) {
				if (!d.cellStyle) {
					d.cellStyle = ""
				}
				d.cellStyle += ";cursor:move;"
			}
			var c = '<div id="' + this.getNumberId(d.record) + '">';
			if (fui.isNull(b.getPageIndex)) {
				c += d.rowIndex + 1
			} else {
				c += (b.getPageIndex() * b.getPageSize()) + d.rowIndex + 1
			}
			c += "</div>";
			return c
		},
		__OnIndexChanged : function(j) {
			var h = j.sender;
			var f = h.toArray();
			for (var g = 0, c = f.length; g < c; g++) {
				var b = f[g];
				var k = this.getNumberId(b);
				var d = document.getElementById(k);
				if (d) {
					d.innerHTML = this.createNumber(h, g)
				}
			}
		}
	}, a)
};
fui._Columns.indexcolumn = fui.IndexColumn;
fui.CheckColumn = function(a) {
	return fui
			.copyTo(
					{
						width : 30,
						cellCls : "fui-checkcolumn",
						headerCls : "fui-checkcolumn",
						_multiRowSelect : true,
						header : function(c) {
							var d = this.uid + "checkall";
							var b = '<input type="checkbox" id="' + d + '" />';
							if (this.multiSelect == false) {
								b = ""
							}
							return b
						},
						getCheckId : function(b, c) {
							return this._gridUID + "$checkcolumn$"
									+ b[this._rowIdField] + "$" + c._id
						},
						init : function(b) {
							b.on("selectionchanged", this.__OnSelectionChanged,
									this);
							b.on("HeaderCellClick", this.__OnHeaderCellClick,
									this)
						},
						renderer : function(f) {
							var g = this.getCheckId(f.record, f.column);
							var d = f.sender.isSelected ? f.sender
									.isSelected(f.record) : false;
							var c = "checkbox";
							var b = f.sender;
							if (b.getMultiSelect() == false) {
								c = "radio"
							}
							return '<input type="'
									+ c
									+ '" id="'
									+ g
									+ '" '
									+ (d ? "checked" : "")
									+ ' hidefocus style="outline:none;" onclick="return false"/>'
						},
						__OnHeaderCellClick : function(d) {
							var c = d.sender;
							if (d.column != this) {
								return
							}
							var f = c.uid + "checkall";
							var b = document.getElementById(f);
							if (b) {
								if (c.getMultiSelect()) {
									if (b.checked) {
										c.selectAll()
									} else {
										c.deselectAll()
									}
								} else {
									c.deselectAll();
									if (b.checked) {
										c.select(0)
									}
								}
								c.fire("checkall")
							}
						},
						__OnSelectionChanged : function(j) {
							var b = j.sender;
							var d = b.toArray();
							var k = this;
							for (var g = 0, f = d.length; g < f; g++) {
								var h = d[g];
								var m = b.isSelected(h);
								var c = k.getCheckId(h, k);
								var n = document.getElementById(c);
								if (n) {
									n.checked = m
								}
							}
							if (!this._timer) {
								this._timer = setTimeout(function() {
									k._doCheckState(b);
									k._timer = null
								}, 10)
							}
						},
						_doCheckState : function(c) {
							var e = c.uid + "checkall";
							var b = document.getElementById(e);
							if (b && c._getSelectAllCheckState) {
								var d = c._getSelectAllCheckState();
								if (d == "has") {
									b.indeterminate = true;
									b.checked = true
								} else {
									b.indeterminate = false;
									b.checked = d
								}
							}
						}
					}, a)
};
fui._Columns.checkcolumn = fui.CheckColumn;
fui.ExpandColumn = function(a) {
	return fui
			.copyTo(
					{
						width : 30,
						headerAlign : "center",
						align : "center",
						draggable : false,
						cellStyle : "padding:0",
						cellCls : "fui-grid-expandCell",
						renderer : function(b) {
							return '<a class="fui-grid-ecIcon" href="javascript:#" onclick="return false"></a>'
						},
						init : function(b) {
							b.on("cellclick", this.__OnCellClick, this)
						},
						__OnCellClick : function(d) {
							var c = d.sender;
							if (d.column == this && c.isShowRowDetail) {
								if (fui.findParent(d.htmlEvent.target,
										"fui-grid-ecIcon")) {
									var b = c.isShowRowDetail(d.record);
									if (!b) {
										d.cancel = false;
										c.fire("beforeshowrowdetail", d);
										if (d.cancel === true) {
											return
										}
									} else {
										d.cancel = false;
										c.fire("beforehiderowdetail", d);
										if (d.cancel === true) {
											return
										}
									}
									if (c.autoHideRowDetail) {
										c.hideAllRowDetail()
									}
									if (b) {
										c.hideRowDetail(d.record)
									} else {
										c.showRowDetail(d.record)
									}
								}
							}
						}
					}, a)
};
fui._Columns.expandcolumn = fui.ExpandColumn;
fui.CheckBoxColumn = function(a) {
	return fui
			.copyTo(
					{
						_type : "checkboxcolumn",
						header : "",
						headerAlign : "center",
						cellCls : "fui-checkcolumn",
						trueValue : true,
						falseValue : false,
						readOnly : false,
						getCheckId : function(b, c) {
							return this._gridUID + "$checkbox$"
									+ b[this._rowIdField] + "$" + c._id
						},
						getCheckBoxEl : function(b, c) {
							return document.getElementById(this
									.getCheckId(b, c))
						},
						renderer : function(f) {
							var g = this.getCheckId(f.record, f.column);
							var b = fui._getMap(f.field, f.record);
							var d = b == this.trueValue ? true : false;
							var c = "checkbox";
							return '<input type="'
									+ c
									+ '" id="'
									+ g
									+ '" '
									+ (d ? "checked" : "")
									+ ' hidefocus style="outline:none;" onclick="return false;"/>'
						},
						init : function(e) {
							this.grid = e;
							function b(i) {
								if (e.isReadOnly() || this.readOnly) {
									return
								}
								i.value = fui._getMap(i.field, i.record);
								e.fire("cellbeginedit", i);
								if (i.cancel !== true) {
									var g = fui._getMap(i.column.field,
											i.record);
									var h = g == this.trueValue ? this.falseValue
											: this.trueValue;
									if (e._OnCellCommitEdit) {
										e._OnCellCommitEdit(i.record, i.column,
												h)
									}
								}
							}
							function d(h) {
								if (h.column == this) {
									var i = this.getCheckId(h.record, h.column);
									var g = h.htmlEvent.target;
									if (g.id == i) {
										if (e.allowCellEdit) {
											h.cancel = false;
											b.call(this, h)
										} else {
											if (e.isEditingRow
													&& e.isEditingRow(h.record)) {
												setTimeout(function() {
													g.checked = !g.checked
												}, 1)
											}
										}
									}
								}
							}
							e.on("cellclick", d, this);
							fui.on(this.grid.el, "keydown", function(h) {
								if (h.keyCode == 32 && e.allowCellEdit) {
									var i = e.getCurrentCell();
									if (!i) {
										return
									}
									if (i[1] != this) {
										return
									}
									var g = {
										record : i[0],
										column : i[1]
									};
									g.field = g.column.field;
									b.call(this, g);
									h.preventDefault()
								}
							}, this);
							var c = parseInt(this.trueValue), f = parseInt(this.falseValue);
							if (!isNaN(c)) {
								this.trueValue = c
							}
							if (!isNaN(f)) {
								this.falseValue = f
							}
						}
					}, a)
};
fui._Columns.checkboxcolumn = fui.CheckBoxColumn;
fui.RadioButtonColumn = function(a) {
	return fui
			.copyTo(
					{
						_type : "radiobuttoncolumn",
						header : "",
						headerAlign : "center",
						cellCls : "fui-checkcolumn",
						trueValue : true,
						falseValue : false,
						readOnly : false,
						getCheckId : function(b, c) {
							return this._gridUID + "$radio$"
									+ b[this._rowIdField] + "$" + c._id
						},
						getCheckBoxEl : function(b, c) {
							return document.getElementById(this
									.getCheckId(b, c))
						},
						renderer : function(g) {
							var b = g.sender;
							var d = this.getCheckId(g.record, g.column);
							var j = fui._getMap(g.field, g.record);
							var i = j == this.trueValue ? true : false;
							var h = "radio";
							var c = b._id + g.column.field;
							var f = "";
							var k = '<div style="position:relative;">';
							k += '<input name="'
									+ c
									+ '" type="'
									+ h
									+ '" id="'
									+ d
									+ '" '
									+ (i ? "checked" : "")
									+ ' hidefocus style="outline:none;" onclick="return false;" style="position:relative;z-index:1;"/>';
							if (!b.allowCellEdit) {
								if (!b.isEditingRow(g.record)) {
									k += '<div class="fui-grid-radio-mask"></div>'
								}
							}
							k += "</div>";
							return k
						},
						init : function(e) {
							this.grid = e;
							function b(n) {
								if (e.isReadOnly() || this.readOnly) {
									return
								}
								n.value = fui._getMap(n.field, n.record);
								e.fire("cellbeginedit", n);
								if (n.cancel !== true) {
									var h = fui._getMap(n.column.field,
											n.record);
									if (h == this.trueValue) {
										return
									}
									var m = h == this.trueValue ? this.falseValue
											: this.trueValue;
									var k = e.getData();
									for (var j = 0, g = k.length; j < g; j++) {
										var o = k[j];
										if (o == n.record) {
											continue
										}
										var h = fui._getMap(n.column.field, o);
										if (h != this.falseValue) {
											e.updateRow(o, n.column.field,
													this.falseValue)
										}
									}
									if (e._OnCellCommitEdit) {
										e._OnCellCommitEdit(n.record, n.column,
												m)
									}
								}
							}
							function d(i) {
								if (i.column == this) {
									var j = this.getCheckId(i.record, i.column);
									var g = i.htmlEvent.target;
									if (g.id == j) {
										if (e.allowCellEdit) {
											i.cancel = false;
											b.call(this, i)
										} else {
											if (e.isEditingRow
													&& e.isEditingRow(i.record)) {
												var h = this;
												setTimeout(
														function() {
															g.checked = true;
															var p = e.getData();
															for (var n = 0, k = p.length; n < k; n++) {
																var s = p[n];
																if (s == i.record) {
																	continue
																}
																var q = i.column.field;
																var m = fui
																		._getMap(
																				q,
																				s);
																if (m != h.falseValue) {
																	if (s != i.record) {
																		if (e._dataSource) {
																			fui
																					._setMap(
																							i.column.field,
																							h.falseValue,
																							s);
																			e._dataSource
																					._setModified(
																							s,
																							q,
																							m)
																		} else {
																			var r = {};
																			fui
																					._setMap(
																							q,
																							h.falseValue,
																							r);
																			e
																					._doUpdateRow(
																							s,
																							r)
																		}
																	}
																}
															}
														}, 1)
											}
										}
									}
								}
							}
							e.on("cellclick", d, this);
							fui.on(this.grid.el, "keydown", function(h) {
								if (h.keyCode == 32 && e.allowCellEdit) {
									var i = e.getCurrentCell();
									if (!i) {
										return
									}
									if (i[1] != this) {
										return
									}
									var g = {
										record : i[0],
										column : i[1]
									};
									g.field = g.column.field;
									b.call(this, g);
									h.preventDefault()
								}
							}, this);
							var c = parseInt(this.trueValue), f = parseInt(this.falseValue);
							if (!isNaN(c)) {
								this.trueValue = c
							}
							if (!isNaN(f)) {
								this.falseValue = f
							}
						}
					}, a)
};
fui._Columns.radiobuttoncolumn = fui.RadioButtonColumn;
fui.ComboBoxColumn = function(a) {
	return fui.copyTo({
		renderer : function(p) {
			var q = !fui.isNull(p.value) ? String(p.value) : "";
			var r = q.split(",");
			var t = "id", h = "text";
			var j = {};
			var n = p.column.editor;
			if (n && n.type == "combobox") {
				var d = this.__editor;
				if (!d) {
					if (fui.isControl(n)) {
						d = n
					} else {
						n = fui.clone(n);
						d = fui.create(n)
					}
					this.__editor = d
				}
				t = d.getValueField();
				h = d.getTextField();
				j = this._valueMaps;
				if (!j) {
					j = {};
					var m = d.getData();
					for (var k = 0, g = m.length; k < g; k++) {
						var c = m[k];
						j[c[t]] = c
					}
					this._valueMaps = j
				}
			}
			var f = [];
			for (var k = 0, g = r.length; k < g; k++) {
				var b = r[k];
				var c = j[b];
				if (c) {
					var s = c[h];
					if (s === null || s === undefined) {
						s = ""
					}
					f.push(s)
				}
			}
			return f.join(",")
		}
	}, a)
};
fui._Columns.comboboxcolumn = fui.ComboBoxColumn;
fui._Resizer = function(a) {
	this.owner = a;
	fui.on(this.owner.el, "mousedown", this.__OnMouseDown, this)
};
fui._Resizer.prototype = {
	__OnMouseDown : function(c) {
		var a = fui.hasClass(c.target, "fui-resizer-trigger");
		if (a && this.owner.allowResize) {
			var b = this._getResizeDrag();
			b.start(c)
		}
	},
	_getResizeDrag : function() {
		if (!this._resizeDragger) {
			this._resizeDragger = new fui.Drag({
				capture : true,
				onStart : fui.createDelegate(this._OnDragStart, this),
				onMove : fui.createDelegate(this._OnDragMove, this),
				onStop : fui.createDelegate(this._OnDragStop, this)
			})
		}
		return this._resizeDragger
	},
	_OnDragStart : function(a) {
		this.mask = fui.append(document.body,
				'<div class="fui-resizer-mask fui-fixed"></div>');
		this.proxy = fui.append(document.body,
				'<div class="fui-resizer-proxy"></div>');
		this.proxy.style.cursor = "se-resize";
		this.elBox = fui.getBox(this.owner.el);
		fui.setBox(this.proxy, this.elBox)
	},
	_OnDragMove : function(e) {
		var b = this.owner;
		var d = e.now[0] - e.init[0];
		var f = e.now[1] - e.init[1];
		var a = this.elBox.width + d;
		var c = this.elBox.height + f;
		if (a < b.minWidth) {
			a = b.minWidth
		}
		if (c < b.minHeight) {
			c = b.minHeight
		}
		if (a > b.maxWidth) {
			a = b.maxWidth
		}
		if (c > b.maxHeight) {
			c = b.maxHeight
		}
		fui.setSize(this.proxy, a, c)
	},
	_OnDragStop : function(a, c) {
		if (!this.proxy) {
			return
		}
		var b = fui.getBox(this.proxy);
		jQuery(this.mask).remove();
		jQuery(this.proxy).remove();
		this.proxy = null;
		this.elBox = null;
		if (c) {
			this.owner.setWidth(b.width);
			this.owner.setHeight(b.height);
			this.owner.fire("resize")
		}
	}
};
fui._topWindow = null;
fui._getTopWindow = function(a) {
	if (fui._topWindow) {
		return fui._topWindow
	}
	var c = [];
	function b(e) {
		try {
			e.___try = 1;
			c.push(e)
		} catch (d) {
		}
		if (e.parent && e.parent != e) {
			b(e.parent)
		}
	}
	b(window);
	fui._topWindow = c[c.length - 1];
	return fui._topWindow
};
var __ps = fui.getParams();
if (__ps._winid) {
	try {
		window.Owner = fui._getTopWindow()[__ps._winid]
	} catch (ex) {
	}
}
fui._WindowID = "w" + Math.floor(Math.random() * 10000);
fui._getTopWindow()[fui._WindowID] = window;
fui.__IFrameCreateCount = 1;
fui.createIFrame = function(b, i) {
	var c = "__iframe_onload" + fui.__IFrameCreateCount++;
	window[c] = d;
	if (!b) {
		b = ""
	}
	var h = b.split("#");
	b = h[0];
	var j = "_t=" + Math.floor(Math.random() * 1000000);
	if (b.indexOf("?") == -1) {
		b += "?" + j
	} else {
		b += "&" + j
	}
	if (h[1]) {
		b = b + "#" + h[1]
	}
	var k = '<iframe style="width:100%;height:100%;" onload="' + c
			+ '()"  frameborder="0"></iframe>';
	var a = document.createElement("div");
	var f = fui.append(a, k);
	var e = false;
	setTimeout(function() {
		if (f) {
			f.src = b;
			e = true
		}
	}, 5);
	var g = true;
	function d() {
		if (e == false) {
			return
		}
		setTimeout(function() {
			if (i) {
				i(f, g)
			}
			g = false
		}, 1)
	}
	f._ondestroy = function() {
		window[c] = fui.emptyFn;
		f.src = "";
		try {
			f.contentWindow.document.write("");
			f.contentWindow.document.close()
		} catch (l) {
		}
		f._ondestroy = null;
		f = null
	};
	return f
};
fui._doOpen = function(c) {
	if (typeof c == "string") {
		c = {
			url : c
		}
	}
	c = fui.copyTo({
		width : 700,
		height : 400,
		allowResize : true,
		allowModal : true,
		closeAction : "destroy",
		title : "",
		titleIcon : "",
		iconCls : "",
		iconStyle : "",
		bodyStyle : "padding: 0",
		url : "",
		showCloseButton : true,
		showFooter : false
	}, c);
	c.closeAction = "destroy";
	var i = c.onload;
	delete c.onload;
	var g = c.ondestroy;
	delete c.ondestroy;
	var b = c.url;
	delete c.url;
	var e = fui.getViewportBox();
	if (c.width && String(c.width).indexOf("%") != -1) {
		var a = parseInt(c.width);
		c.width = parseInt(e.width * (a / 100))
	}
	if (c.height && String(c.height).indexOf("%") != -1) {
		var d = parseInt(c.height);
		c.height = parseInt(e.height * (d / 100))
	}
	var f = new fui.Window();
	f.set(c);
	f.load(b, i, g);
	f.show();
	return f
};
fui.open = function(b) {
	if (!b) {
		return
	}
	var a = b.url;
	if (!a) {
		a = ""
	}
	var f = a.split("#");
	var a = f[0];
	var c = "_winid=" + fui._WindowID;
	if (a.indexOf("?") == -1) {
		a += "?" + c
	} else {
		a += "&" + c
	}
	if (f[1]) {
		a = a + "#" + f[1]
	}
	b.url = a;
	b.Owner = window;
	var g = [];
	function d(h) {
		if (h.fui) {
			g.push(h)
		}
		if (h.parent && h.parent != h) {
			d(h.parent)
		}
	}
	d(window);
	var e = g[g.length - 1];
	return e.fui._doOpen(b)
};
fui.openTop = fui.open;
fui.getData = function(b, g, f, a, c) {
	var e = fui.getText(b, g, f, a, c);
	var d = fui.decode(e);
	return d
};
fui.getText = function(b, f, e, a, c) {
	var d = null;
	fui.ajax({
		url : b,
		data : f,
		async : false,
		type : c ? c : "get",
		cache : false,
		dataType : "text",
		success : function(h, g) {
			d = h;
			if (e) {
				e(h, g)
			}
		},
		error : a
	});
	return d
};
if (!window.fui_RootPath) {
	fui_RootPath = "/"
}
fui_CreateJSPath = function(g) {
	var a = document.getElementsByTagName("script");
	var f = "";
	for (var e = 0, b = a.length; e < b; e++) {
		var h = a[e].src;
		if (h.indexOf(g) != -1) {
			var d = h.split(g);
			f = d[0];
			break
		}
	}
	var c = location.href;
	c = c.split("#")[0];
	c = c.split("?")[0];
	var d = c.split("/");
	d.length = d.length - 1;
	c = d.join("/");
	if (f.indexOf("http:") == -1 && f.indexOf("file:") == -1) {
		f = c + "/" + f
	}
	return f
};
if (!window.fui_JSPath) {
	fui_JSPath = fui_CreateJSPath("fui.js")
}
fui.update = function(a, c) {
	if (typeof a == "string") {
		a = {
			url : a
		}
	}
	if (c) {
		a.el = c
	}
	var b = fui.loadText(a.url);
	fui.innerHTML(a.el, b);
	fui.parse(a.el)
};
fui.createSingle = function(a) {
	if (typeof a == "string") {
		a = fui.getClass(a)
	}
	if (typeof a != "function") {
		return
	}
	var b = a.single;
	if (!b) {
		b = a.single = new a()
	}
	return b
};
fui.createTopSingle = function(b) {
	if (typeof b != "function") {
		return
	}
	var a = b.prototype.type;
	if (top && top != window && top.fui && top.fui.getClass(a)) {
		return top.fui.createSingle(a)
	} else {
		return fui.createSingle(b)
	}
};
fui.sortTypes = {
	string : function(a) {
		return String(a).toUpperCase()
	},
	date : function(a) {
		if (!a) {
			return 0
		}
		if (fui.isDate(a)) {
			return a.getTime()
		}
		return fui.parseDate(String(a))
	},
	"float" : function(a) {
		var b = parseFloat(String(a).replace(/,/g, ""));
		return isNaN(b) ? 0 : b
	},
	"int" : function(a) {
		var b = parseInt(String(a).replace(/,/g, ""), 10);
		return isNaN(b) ? 0 : b
	},
	currency : function(a) {
		var b = parseFloat(String(a).replace(/,/g, ""));
		return isNaN(b) ? 0 : b
	}
};
fui._ValidateVType = function(b, k, d, p) {
	var j = b.split(";");
	for (var c = 0, a = j.length; c < a; c++) {
		var b = j[c].trim();
		var m = b.split(":");
		var n = m[0];
		var g = b.substr(n.length + 1, 1000);
		if (g) {
			g = g.split(",")
		} else {
			g = []
		}
		var h = fui.VTypes[n];
		if (h) {
			var o = h(k, g);
			if (o !== true) {
				d.isValid = false;
				var f = m[0] + "ErrorText";
				d.errorText = p[f] || fui.VTypes[f] || "";
				d.errorText = String.format(d.errorText, g[0], g[1], g[2],
						g[3], g[4]);
				break
			}
		}
	}
};
fui._getErrorText = function(b, a) {
	if (b && b[a]) {
		return b[a]
	} else {
		return fui.VTypes[a]
	}
};
fui.VTypes = {
	minDateErrorText : "Date can not be less than {0}",
	maxDateErrorText : "Date can not be greater than {0}",
	uniqueErrorText : "This field is unique.",
	requiredErrorText : "This field is required.",
	emailErrorText : "Please enter a valid email address.",
	urlErrorText : "Please enter a valid URL.",
	floatErrorText : "Please enter a valid number.",
	intErrorText : "Please enter only digits",
	dateErrorText : "Please enter a valid date. Date format is {0}",
	maxLengthErrorText : "Please enter no more than {0} characters.",
	minLengthErrorText : "Please enter at least {0} characters.",
	maxErrorText : "Please enter a value less than or equal to {0}.",
	minErrorText : "Please enter a value greater than or equal to {0}.",
	rangeLengthErrorText : "Please enter a value between {0} and {1} characters long.",
	rangeCharErrorText : "Please enter a value between {0} and {1} characters long.",
	rangeErrorText : "Please enter a value between {0} and {1}.",
	required : function(a, b) {
		if (fui.isNull(a) || a === "") {
			return false
		}
		return true
	},
	email : function(a, b) {
		if (fui.isNull(a) || a === "") {
			return true
		}
		if (a
				.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
			return true
		} else {
			return false
		}
	},
	url : function(a, b) {
		if (fui.isNull(a) || a === "") {
			return true
		}
		function c(f) {
			f = f.toLowerCase();
			var e = "^((https|http|ftp|rtsp|mms)?://)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((/?)|(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
			var d = new RegExp(e);
			if (d.test(f)) {
				return (true)
			} else {
				return (false)
			}
		}
		return c(a)
	},
	"int" : function(a, b) {
		if (fui.isNull(a) || a === "") {
			return true
		}
		function c(d) {
			if (d < 0) {
				d = -d
			}
			var e = String(d);
			return e.length > 0 && !(/[^0-9]/).test(e)
		}
		return c(a)
	},
	"float" : function(b, c) {
		if (fui.isNull(b) || b === "") {
			return true
		}
		function a(d) {
			if (d < 0) {
				d = -d
			}
			var e = String(d);
			if (e.split(".").length > 2) {
				return false
			}
			return e.length > 0 && !(/[^0-9.]/).test(e)
		}
		return a(b)
	},
	date : function(a, b) {
		if (fui.isNull(a) || a === "") {
			return true
		}
		if (!a) {
			return false
		}
		var e = null;
		var c = b[0];
		if (c) {
			e = fui.parseDate(a, c);
			if (e && e.getFullYear) {
				if (fui.formatDate(e, c) == a) {
					return true
				}
			}
		} else {
			e = fui.parseDate(a, "yyyy-MM-dd");
			if (!e) {
				e = fui.parseDate(a, "yyyy/MM/dd")
			}
			if (!e) {
				e = fui.parseDate(a, "MM/dd/yyyy")
			}
			if (e && e.getFullYear) {
				return true
			}
		}
		return false
	},
	maxLength : function(a, b) {
		if (fui.isNull(a) || a === "") {
			return true
		}
		var c = parseInt(b);
		if (!a || isNaN(c)) {
			return true
		}
		if (a.length <= c) {
			return true
		} else {
			return false
		}
	},
	minLength : function(a, b) {
		if (fui.isNull(a) || a === "") {
			return true
		}
		var c = parseInt(b);
		if (isNaN(c)) {
			return true
		}
		if (a.length >= c) {
			return true
		} else {
			return false
		}
	},
	rangeLength : function(b, c) {
		if (fui.isNull(b) || b === "") {
			return true
		}
		if (!b) {
			return false
		}
		var d = parseFloat(c[0]), a = parseFloat(c[1]);
		if (isNaN(d) || isNaN(a)) {
			return true
		}
		if (d <= b.length && b.length <= a) {
			return true
		}
		return false
	},
	rangeChar : function(h, e) {
		if (fui.isNull(h) || h === "") {
			return true
		}
		var b = parseFloat(e[0]), f = parseFloat(e[1]);
		if (isNaN(b) || isNaN(f)) {
			return true
		}
		function g(i) {
			var k = new RegExp("^[\u4e00-\u9fa5]+$");
			if (k.test(i)) {
				return true
			}
			return false
		}
		var d = 0;
		var j = String(h).split("");
		for (var c = 0, a = j.length; c < a; c++) {
			if (g(j[c])) {
				d += 2
			} else {
				d += 1
			}
		}
		if (b <= d && d <= f) {
			return true
		}
		return false
	},
	range : function(b, c) {
		if (fui.VTypes["float"](b, c) == false) {
			return false
		}
		if (fui.isNull(b) || b === "") {
			return true
		}
		b = parseFloat(b);
		if (isNaN(b)) {
			return false
		}
		var d = parseFloat(c[0]), a = parseFloat(c[1]);
		if (isNaN(d) || isNaN(a)) {
			return true
		}
		if (d <= b && b <= a) {
			return true
		}
		return false
	},
	min : function(a, b) {
		if (fui.VTypes["float"](a, b) == false) {
			return false
		}
		if (fui.isNull(a) || a === "") {
			return true
		}
		a = parseFloat(a);
		if (isNaN(a)) {
			return false
		}
		var c = parseFloat(b[0]);
		if (isNaN(c)) {
			return true
		}
		if (c <= a) {
			return true
		}
		return false
	},
	max : function(b, c) {
		if (fui.VTypes["float"](b, c) == false) {
			return false
		}
		if (fui.isNull(b) || b === "") {
			return true
		}
		b = parseFloat(b);
		if (isNaN(b)) {
			return false
		}
		var a = parseFloat(c[0]);
		if (isNaN(a)) {
			return true
		}
		if (b <= a) {
			return true
		}
		return false
	}
};
fui.summaryTypes = {
	count : function(a) {
		if (!a) {
			a = []
		}
		return a.length
	},
	max : function(e, f) {
		if (!e) {
			e = []
		}
		var a = null;
		for (var c = 0, b = e.length; c < b; c++) {
			var g = e[c];
			var d = parseFloat(g[f]);
			if (d === null || d === undefined || isNaN(d)) {
				continue
			}
			if (a == null || a < d) {
				a = d
			}
		}
		return a
	},
	min : function(e, f) {
		if (!e) {
			e = []
		}
		var c = null;
		for (var b = 0, a = e.length; b < a; b++) {
			var g = e[b];
			var d = parseFloat(g[f]);
			if (d === null || d === undefined || isNaN(d)) {
				continue
			}
			if (c == null || c > d) {
				c = d
			}
		}
		return c
	},
	avg : function(f, g) {
		if (!f) {
			f = []
		}
		if (f.length == 0) {
			return 0
		}
		var d = 0;
		for (var c = 0, a = f.length; c < a; c++) {
			var h = f[c];
			var e = parseFloat(h[g]);
			if (e === null || e === undefined || isNaN(e)) {
				continue
			}
			d += e
		}
		var b = d / f.length;
		return b
	},
	sum : function(e, f) {
		if (!e) {
			e = []
		}
		var c = 0;
		for (var b = 0, a = e.length; b < a; b++) {
			var g = e[b];
			var d = parseFloat(g[f]);
			if (d === null || d === undefined || isNaN(d)) {
				continue
			}
			c += d
		}
		return c
	}
};
fui.formatCurrency = function(a, c) {
	if (a === null || a === undefined) {
		null == ""
	}
	a = String(a).replace(/\$|\,/g, "");
	if (isNaN(a)) {
		a = "0"
	}
	sign = (a == (a = Math.abs(a)));
	a = Math.floor(a * 100 + 0.50000000001);
	cents = a % 100;
	a = Math.floor(a / 100).toString();
	if (cents < 10) {
		cents = "0" + cents
	}
	for (var b = 0; b < Math.floor((a.length - (1 + b)) / 3); b++) {
		a = a.substring(0, a.length - (4 * b + 3)) + ","
				+ a.substring(a.length - (4 * b + 3))
	}
	c = c || "";
	return c + (((sign) ? "" : "-") + a + "." + cents)
};
fui.emptyFn = function() {
};
fui.Drag = function(a) {
	fui.copyTo(this, a)
};
fui.Drag.prototype = {
	onStart : fui.emptyFn,
	onMove : fui.emptyFn,
	onStop : fui.emptyFn,
	capture : false,
	fps : 20,
	event : null,
	delay : 80,
	start : function(b) {
		b.preventDefault();
		if (b) {
			this.event = b
		}
		this.now = this.init = [ this.event.pageX, this.event.pageY ];
		var a = document;
		fui.on(a, "mousemove", this.move, this);
		fui.on(a, "mouseup", this.stop, this);
		fui.on(a, "contextmenu", this.contextmenu, this);
		if (this.context) {
			fui.on(this.context, "contextmenu", this.contextmenu, this)
		}
		this.trigger = b.target;
		fui.selectable(this.trigger, false);
		fui.selectable(a.body, false);
		if (this.capture) {
			if (isIE) {
				this.trigger.setCapture(true)
			} else {
				if (document.captureEvents) {
					document.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP
							| Event.MOUSEDOWN)
				}
			}
		}
		this.started = false;
		this.startTime = new Date()
	},
	contextmenu : function(a) {
		if (this.context) {
			fui.un(this.context, "contextmenu", this.contextmenu, this)
		}
		fui.un(document, "contextmenu", this.contextmenu, this);
		a.preventDefault();
		a.stopPropagation()
	},
	move : function(b) {
		if (this.delay) {
			if (new Date() - this.startTime < this.delay) {
				return
			}
		}
		if (!this.started) {
			this.started = true;
			this.onStart(this)
		}
		var a = this;
		if (!this.timer) {
			this.timer = setTimeout(function() {
				a.now = [ b.pageX, b.pageY ];
				a.event = b;
				a.onMove(a);
				a.timer = null
			}, 5)
		}
	},
	stop : function(c) {
		this.now = [ c.pageX, c.pageY ];
		this.event = c;
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null
		}
		var b = document;
		fui.selectable(this.trigger, true);
		fui.selectable(b.body, true);
		if (isIE) {
			this.trigger.setCapture(false);
			this.trigger.releaseCapture()
		}
		var d = fui.MouseButton.Right != c.button;
		if (d == false) {
			c.preventDefault()
		}
		fui.un(b, "mousemove", this.move, this);
		fui.un(b, "mouseup", this.stop, this);
		var a = this;
		setTimeout(function() {
			fui.un(document, "contextmenu", a.contextmenu, a);
			if (a.context) {
				fui.un(a.context, "contextmenu", a.contextmenu, a)
			}
		}, 1);
		if (this.started) {
			this.onStop(this, d)
		}
	}
};
fui.JSON = new (function() {
	var sb = [];
	var _dateFormat = null;
	var useHasOwn = !!{}.hasOwnProperty, replaceString = function(a, b) {
		var c = m[b];
		if (c) {
			return c
		}
		c = b.charCodeAt();
		return "\\u00" + Math.floor(c / 16).toString(16)
				+ (c % 16).toString(16)
	}, doEncode = function(o, field) {
		if (o === null) {
			sb[sb.length] = "null";
			return
		}
		var t = typeof o;
		if (t == "undefined") {
			sb[sb.length] = "null";
			return
		} else {
			if (o.push) {
				sb[sb.length] = "[";
				var b, i, l = o.length, v;
				for (i = 0; i < l; i += 1) {
					v = o[i];
					t = typeof v;
					if (t == "undefined" || t == "function" || t == "unknown") {
					} else {
						if (b) {
							sb[sb.length] = ","
						}
						doEncode(v);
						b = true
					}
				}
				sb[sb.length] = "]";
				return
			} else {
				if (o.getFullYear) {
					if (_dateFormat) {
						sb[sb.length] = '"';
						if (typeof _dateFormat == "function") {
							sb[sb.length] = _dateFormat(o, field)
						} else {
							sb[sb.length] = fui.formatDate(o, _dateFormat)
						}
						sb[sb.length] = '"'
					} else {
						var n;
						sb[sb.length] = '"';
						sb[sb.length] = o.getFullYear();
						sb[sb.length] = "-";
						n = o.getMonth() + 1;
						sb[sb.length] = n < 10 ? "0" + n : n;
						sb[sb.length] = "-";
						n = o.getDate();
						sb[sb.length] = n < 10 ? "0" + n : n;
						sb[sb.length] = "T";
						n = o.getHours();
						sb[sb.length] = n < 10 ? "0" + n : n;
						sb[sb.length] = ":";
						n = o.getMinutes();
						sb[sb.length] = n < 10 ? "0" + n : n;
						sb[sb.length] = ":";
						n = o.getSeconds();
						sb[sb.length] = n < 10 ? "0" + n : n;
						sb[sb.length] = '"';
						return
					}
				} else {
					if (t == "string") {
						if (strReg1.test(o)) {
							sb[sb.length] = '"';
							sb[sb.length] = o.replace(strReg2, replaceString);
							sb[sb.length] = '"';
							return
						}
						sb[sb.length] = '"' + o + '"';
						return
					} else {
						if (t == "number") {
							sb[sb.length] = o;
							return
						} else {
							if (t == "boolean") {
								sb[sb.length] = String(o);
								return
							} else {
								sb[sb.length] = "{";
								var b, i, v;
								for (i in o) {
									if (!useHasOwn
											|| (o.hasOwnProperty && o
													.hasOwnProperty(i))) {
										v = o[i];
										t = typeof v;
										if (t == "undefined" || t == "function"
												|| t == "unknown") {
										} else {
											if (b) {
												sb[sb.length] = ","
											}
											doEncode(i);
											sb[sb.length] = ":";
											doEncode(v, i);
											b = true
										}
									}
								}
								sb[sb.length] = "}";
								return
							}
						}
					}
				}
			}
		}
	}, m = {
		"\b" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\f" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\"
	}, strReg1 = /["\\\x00-\x1f]/, strReg2 = /([\x00-\x1f\\"])/g;
	this.encode = function() {
		var ec;
		return function(o, dateFormat) {
			sb = [];
			_dateFormat = dateFormat;
			doEncode(o);
			_dateFormat = null;
			return sb.join("")
		}
	}();
	this.decode = function() {
		var re = /[\"\'](\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})[\"\']/g;
		return function(json, parseDate) {
			if (json === "" || json === null || json === undefined) {
				return json
			}
			if (typeof json == "object") {
				json = this.encode(json)
			}
			if (parseDate !== false) {
				json = json.replace(re, "new Date($1,$2-1,$3,$4,$5,$6)");
				json = json.replace(__js_dateRegEx, "$1new Date($2)");
				json = json.replace(__js_dateRegEx2, "new Date($1)")
			}
			var s = eval("(" + json + ")");
			return s
		}
	}()
})();
__js_dateRegEx = new RegExp(
		'(^|[^\\\\])\\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\"',
		"g");
__js_dateRegEx2 = new RegExp("[\"']/Date\\(([0-9]+)\\)/[\"']", "g");
fui.encode = fui.JSON.encode;
fui.decode = fui.JSON.decode;
fui.clone = function(e, c) {
	if (e === null || e === undefined) {
		return e
	}
	var b = fui.encode(e);
	var d = fui.decode(b);
	function a(f) {
		for (var j = 0, g = f.length; j < g; j++) {
			var m = f[j];
			delete m._state;
			delete m._id;
			delete m._pid;
			delete m._uid;
			for ( var k in m) {
				var h = m[k];
				if (h instanceof Array) {
					a(h)
				}
			}
		}
	}
	if (c !== false) {
		a(d instanceof Array ? d : [ d ])
	}
	return d
};
var DAY_MS = 86400000, HOUR_MS = 3600000, MINUTE_MS = 60000;
fui.copyTo(fui, {
	clearTime : function(a) {
		if (!a) {
			return null
		}
		return new Date(a.getFullYear(), a.getMonth(), a.getDate())
	},
	maxTime : function(a) {
		if (!a) {
			return null
		}
		return new Date(a.getFullYear(), a.getMonth(), a.getDate(), 23, 59, 59)
	},
	cloneDate : function(a) {
		if (!a) {
			return null
		}
		return new Date(a.getTime())
	},
	addDate : function(b, a, c) {
		if (!c) {
			c = "D"
		}
		b = new Date(b.getTime());
		switch (c.toUpperCase()) {
		case "Y":
			b.setFullYear(b.getFullYear() + a);
			break;
		case "MO":
			b.setMonth(b.getMonth() + a);
			break;
		case "D":
			b.setDate(b.getDate() + a);
			break;
		case "H":
			b.setHours(b.getHours() + a);
			break;
		case "M":
			b.setMinutes(b.getMinutes() + a);
			break;
		case "S":
			b.setSeconds(b.getSeconds() + a);
			break;
		case "MS":
			b.setMilliseconds(b.getMilliseconds() + a);
			break
		}
		return b
	},
	getWeek : function(f, d, h) {
		d += 1;
		var i = Math.floor((14 - (d)) / 12);
		var g = f + 4800 - i;
		var c = (d) + (12 * i) - 3;
		var j = h + Math.floor(((153 * c) + 2) / 5) + (365 * g)
				+ Math.floor(g / 4) - Math.floor(g / 100) + Math.floor(g / 400)
				- 32045;
		var k = (j + 31741 - (j % 7)) % 146097 % 36524 % 1461;
		var e = Math.floor(k / 1460);
		var b = ((k - e) % 365) + e;
		NumberOfWeek = Math.floor(b / 7) + 1;
		return NumberOfWeek
	},
	getWeekStartDate : function(c, e) {
		if (!e) {
			e = 0
		}
		if (e > 6 || e < 0) {
			throw new Error("out of weekday")
		}
		var a = c.getDay();
		var b = e - a;
		if (a < e) {
			b -= 7
		}
		var f = new Date(c.getFullYear(), c.getMonth(), c.getDate() + b);
		return f
	},
	getShortWeek : function(a) {
		var b = this.dateInfo.daysShort;
		return b[a]
	},
	getLongWeek : function(a) {
		var b = this.dateInfo.daysLong;
		return b[a]
	},
	getShortMonth : function(b) {
		var a = this.dateInfo.monthsShort;
		return a[b]
	},
	getLongMonth : function(b) {
		var a = this.dateInfo.monthsLong;
		return a[b]
	},
	dateInfo : {
		monthsLong : [ "January", "Febraury", "March", "April", "May", "June",
				"July", "August", "September", "October", "November",
				"December" ],
		monthsShort : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
				"Sep", "Oct", "Nov", "Dec" ],
		daysLong : [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
				"Friday", "Saturday" ],
		daysShort : [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
		quarterLong : [ "Q1", "Q2", "Q3", "Q4" ],
		quarterShort : [ "Q1", "Q2", "Q3", "Q4" ],
		halfYearLong : [ "first half", "second half" ],
		patterns : {
			d : "M/d/yyyy",
			D : "dddd, MMMM dd, yyyy",
			f : "dddd, MMMM dd, yyyy H:mm tt",
			F : "dddd, MMMM dd, yyyy H:mm:ss tt",
			g : "M/d/yyyy H:mm tt",
			G : "M/d/yyyy H:mm:ss tt",
			m : "MMMM dd",
			o : "yyyy-MM-ddTHH:mm:ss.fff",
			s : "yyyy-MM-ddTHH:mm:ss",
			t : "H:mm tt",
			T : "H:mm:ss tt",
			U : "dddd, MMMM dd, yyyy HH:mm:ss tt",
			y : "MMM, yyyy"
		},
		tt : {
			AM : "AM",
			PM : "PM"
		},
		ten : {
			Early : "Early",
			Mid : "Mid",
			Late : "Late"
		},
		today : "Today",
		clockType : 24
	}
});
Date.prototype.getHalfYear = function() {
	if (!this.getMonth) {
		return null
	}
	var a = this.getMonth();
	if (a < 6) {
		return 0
	}
	return 1
};
Date.prototype.getQuarter = function() {
	if (!this.getMonth) {
		return null
	}
	var a = this.getMonth();
	if (a < 3) {
		return 0
	}
	if (a < 6) {
		return 1
	}
	if (a < 9) {
		return 2
	}
	return 3
};
fui.formatDate = function(e, r, p) {
	if (!e || !e.getFullYear || isNaN(e)) {
		return ""
	}
	var b = e.toString();
	var a = fui.dateInfo;
	if (!a) {
		a = fui.dateInfo
	}
	if (typeof (a) !== "undefined") {
		var j = typeof (a.patterns[r]) !== "undefined" ? a.patterns[r] : r;
		var k = e.getFullYear();
		var i = e.getMonth();
		var l = e.getDate();
		if (r == "yyyy-MM-dd") {
			i = i + 1 < 10 ? "0" + (i + 1) : i + 1;
			l = l < 10 ? "0" + l : l;
			return k + "-" + i + "-" + l
		}
		if (r == "MM/dd/yyyy") {
			i = i + 1 < 10 ? "0" + (i + 1) : i + 1;
			l = l < 10 ? "0" + l : l;
			return i + "/" + l + "/" + k
		}
		b = j.replace(/yyyy/g, k);
		b = b.replace(/yy/g, (k + "").substring(2));
		var o = e.getHalfYear();
		b = b.replace(/hy/g, a.halfYearLong[o]);
		var c = e.getQuarter();
		b = b.replace(/Q/g, a.quarterLong[c]);
		b = b.replace(/q/g, a.quarterShort[c]);
		b = b.replace(/MMMM/g, a.monthsLong[i].escapeDateTimeTokens());
		b = b.replace(/MMM/g, a.monthsShort[i].escapeDateTimeTokens());
		b = b.replace(/MM/g, i + 1 < 10 ? "0" + (i + 1) : i + 1);
		b = b.replace(/(\\)?M/g, function(t, s) {
			return s ? t : i + 1
		});
		var d = e.getDay();
		b = b.replace(/dddd/g, a.daysLong[d].escapeDateTimeTokens());
		b = b.replace(/ddd/g, a.daysShort[d].escapeDateTimeTokens());
		b = b.replace(/dd/g, l < 10 ? "0" + l : l);
		b = b.replace(/(\\)?d/g, function(t, s) {
			return s ? t : l
		});
		var g = e.getHours();
		var n = g > 12 ? g - 12 : g;
		if (a.clockType == 12) {
			if (g > 12) {
				g -= 12
			}
		}
		b = b.replace(/HH/g, g < 10 ? "0" + g : g);
		b = b.replace(/(\\)?H/g, function(t, s) {
			return s ? t : g
		});
		b = b.replace(/hh/g, n < 10 ? "0" + n : n);
		b = b.replace(/(\\)?h/g, function(t, s) {
			return s ? t : n
		});
		var f = e.getMinutes();
		b = b.replace(/mm/g, f < 10 ? "0" + f : f);
		b = b.replace(/(\\)?m/g, function(t, s) {
			return s ? t : f
		});
		var q = e.getSeconds();
		b = b.replace(/ss/g, q < 10 ? "0" + q : q);
		b = b.replace(/(\\)?s/g, function(t, s) {
			return s ? t : q
		});
		b = b.replace(/fff/g, e.getMilliseconds());
		b = b.replace(/tt/g, e.getHours() > 12 || e.getHours() == 0 ? a.tt.PM
				: a.tt.AM);
		var e = e.getDate();
		var h = "";
		if (e <= 10) {
			h = a.ten.Early
		} else {
			if (e <= 20) {
				h = a.ten.Mid
			} else {
				h = a.ten.Late
			}
		}
		b = b.replace(/ten/g, h)
	}
	return b.replace(/\\/g, "")
};
String.prototype.escapeDateTimeTokens = function() {
	return this.replace(/([dMyHmsft])/g, "\\$1")
};
fui.fixDate = function(b, a) {
	if (+b) {
		while (b.getDate() != a.getDate()) {
			b.setTime(+b + (b < a ? 1 : -1) * HOUR_MS)
		}
	}
};
fui.parseDate = function(s, ignoreTimezone) {
	try {
		var d = eval(s);
		if (d && d.getFullYear) {
			return d
		}
	} catch (ex) {
	}
	if (typeof s == "object") {
		return isNaN(s) ? null : s
	}
	if (typeof s == "number") {
		var d = new Date(s * 1000);
		if (d.getTime() != s) {
			return null
		}
		return isNaN(d) ? null : d
	}
	if (typeof s == "string") {
		m = s.match(/^([0-9]{4})([0-9]{2})([0-9]{2})$/);
		if (m) {
			var date = new Date(m[1], m[2] - 1, m[3]);
			return date
		}
		m = s.match(/^([0-9]{4}).([0-9]*)$/);
		if (m) {
			var date = new Date(m[1], m[2] - 1);
			return date
		}
		if (s.match(/^\d+(\.\d+)?$/)) {
			var d = new Date(parseFloat(s) * 1000);
			if (d.getTime() != s) {
				return null
			} else {
				return d
			}
		}
		if (ignoreTimezone === undefined) {
			ignoreTimezone = true
		}
		var d = fui.parseISO8601(s, ignoreTimezone) || (s ? new Date(s) : null);
		return isNaN(d) ? null : d
	}
	return null
};
fui.parseISO8601 = function(e, b) {
	var a = e
			.match(/^([0-9]{4})([-\/]([0-9]{1,2})([-\/]([0-9]{1,2})([T ]([0-9]{1,2}):([0-9]{1,2})(:([0-9]{1,2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
	if (!a) {
		a = e
				.match(/^([0-9]{4})[-\/]([0-9]{2})[-\/]([0-9]{2})[T ]([0-9]{1,2})/);
		if (a) {
			var d = new Date(a[1], a[2] - 1, a[3], a[4]);
			return d
		}
		a = e.match(/^([0-9]{4}).([0-9]*)/);
		if (a) {
			var d = new Date(a[1], a[2] - 1);
			return d
		}
		a = e.match(/^([0-9]{4}).([0-9]*).([0-9]*)/);
		if (a) {
			var d = new Date(a[1], a[2] - 1, a[3]);
			return d
		}
		a = e.match(/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/);
		if (!a) {
			return null
		} else {
			var d = new Date(a[3], a[1] - 1, a[2]);
			return d
		}
	}
	var d = new Date(a[1], 0, 1);
	if (b || !a[14]) {
		var c = new Date(a[1], 0, 1, 9, 0);
		if (a[3]) {
			d.setMonth(a[3] - 1);
			c.setMonth(a[3] - 1)
		}
		if (a[5]) {
			d.setDate(a[5]);
			c.setDate(a[5])
		}
		fui.fixDate(d, c);
		if (a[7]) {
			d.setHours(a[7])
		}
		if (a[8]) {
			d.setMinutes(a[8])
		}
		if (a[10]) {
			d.setSeconds(a[10])
		}
		if (a[12]) {
			d.setMilliseconds(Number("0." + a[12]) * 1000)
		}
		fui.fixDate(d, c)
	} else {
		d.setUTCFullYear(a[1], a[3] ? a[3] - 1 : 0, a[5] || 1);
		d.setUTCHours(a[7] || 0, a[8] || 0, a[10] || 0, a[12] ? Number("0."
				+ a[12]) * 1000 : 0);
		var f = Number(a[16]) * 60 + (a[18] ? Number(a[18]) : 0);
		f *= a[15] == "-" ? 1 : -1;
		d = new Date(+d + (f * 60 * 1000))
	}
	return d
};
fui.parseTime = function(e, g) {
	if (!e) {
		return null
	}
	var i = parseInt(e);
	if (i == e && g) {
		h = new Date(0);
		if (g[0] == "H") {
			h.setHours(i)
		} else {
			if (g[0] == "m") {
				h.setMinutes(i)
			} else {
				if (g[0] == "s") {
					h.setSeconds(i)
				}
			}
		}
		return h
	}
	var h = fui.parseDate(e);
	if (!h) {
		var b = e.split(":");
		var f = parseInt(parseFloat(b[0]));
		var c = parseInt(parseFloat(b[1]));
		var a = parseInt(parseFloat(b[2]));
		if (!isNaN(f) && !isNaN(c) && !isNaN(a)) {
			h = new Date(0);
			h.setHours(f);
			h.setMinutes(c);
			h.setSeconds(a)
		}
		if (!isNaN(f) && (g == "H" || g == "HH")) {
			h = new Date(0);
			h.setHours(f)
		} else {
			if (!isNaN(f) && !isNaN(c) && (g == "H:mm" || g == "HH:mm")) {
				h = new Date(0);
				h.setHours(f);
				h.setMinutes(c)
			} else {
				if (!isNaN(f) && !isNaN(c) && g == "mm:ss") {
					h = new Date(0);
					h.setMinutes(f);
					h.setSeconds(c)
				}
			}
		}
	}
	return h
};
fui.dateInfo = {
	monthsLong : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月",
			"十一月", "十二月" ],
	monthsShort : [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月",
			"10月", "11月", "12月" ],
	daysLong : [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ],
	daysShort : [ "日", "一", "二", "三", "四", "五", "六" ],
	quarterLong : [ "一季度", "二季度", "三季度", "四季度" ],
	quarterShort : [ "Q1", "Q2", "Q2", "Q4" ],
	halfYearLong : [ "上半年", "下半年" ],
	patterns : {
		d : "yyyy-M-d",
		D : "yyyy年M月d日",
		f : "yyyy年M月d日 H:mm",
		F : "yyyy年M月d日 H:mm:ss",
		g : "yyyy-M-d H:mm",
		G : "yyyy-M-d H:mm:ss",
		m : "MMMd日",
		o : "yyyy-MM-ddTHH:mm:ss.fff",
		s : "yyyy-MM-ddTHH:mm:ss",
		t : "H:mm",
		T : "H:mm:ss",
		U : "yyyy年M月d日 HH:mm:ss",
		y : "yyyy年MM月"
	},
	tt : {
		AM : "上午",
		PM : "下午"
	},
	ten : {
		Early : "上旬",
		Mid : "中旬",
		Late : "下旬"
	},
	today : "今天",
	clockType : 24
};
fui.append = function(c, a) {
	c = fui.byId(c);
	if (!a || !c) {
		return
	}
	if (typeof a == "string") {
		if (a.charAt(0) == "#") {
			a = fui.byId(a);
			if (!a) {
				return
			}
			c.appendChild(a);
			return a
		} else {
			if (a.indexOf("<tr") == 0) {
				return jQuery(c).append(a)[0].lastChild;
				return
			}
			var b = document.createElement("div");
			b.innerHTML = a;
			a = b.firstChild;
			while (b.firstChild) {
				c.appendChild(b.firstChild)
			}
			return a
		}
	} else {
		c.appendChild(a);
		return a
	}
};
fui.prepend = function(c, a) {
	if (typeof a == "string") {
		if (a.charAt(0) == "#") {
			a = fui.byId(a)
		} else {
			var b = document.createElement("div");
			b.innerHTML = a;
			a = b.firstChild
		}
	}
	return jQuery(c).prepend(a)[0].firstChild
};
fui.after = function(c, a) {
	if (typeof a == "string") {
		if (a.charAt(0) == "#") {
			a = fui.byId(a)
		} else {
			var b = document.createElement("div");
			b.innerHTML = a;
			a = b.firstChild
		}
	}
	if (!a || !c) {
		return
	}
	c.nextSibling ? c.parentNode.insertBefore(a, c.nextSibling) : c.parentNode
			.appendChild(a);
	return a
};
fui.before = function(c, a) {
	if (typeof a == "string") {
		if (a.charAt(0) == "#") {
			a = fui.byId(a)
		} else {
			var b = document.createElement("div");
			b.innerHTML = a;
			a = b.firstChild
		}
	}
	if (!a || !c) {
		return
	}
	c.parentNode.insertBefore(a, c);
	return a
};
fui.__wrap = document.createElement("div");
fui.createElements = function(b) {
	fui.removeChilds(fui.__wrap);
	var a = b.indexOf("<tr") == 0;
	if (a) {
		b = "<table>" + b + "</table>"
	}
	fui.__wrap.innerHTML = b;
	return a ? fui.__wrap.firstChild.rows : fui.__wrap.childNodes
};
fui_byId = function(g, d) {
	if (typeof g == "string") {
		if (g.charAt(0) == "#") {
			g = g.substr(1)
		}
		var f = document.getElementById(g);
		if (f) {
			return f
		}
		if (d && !fui.isAncestor(document.body, d)) {
			var c = d.getElementsByTagName("*");
			for (var b = 0, a = c.length; b < a; b++) {
				var f = c[b];
				if (f.id == g) {
					return f
				}
			}
			f = null
		}
		return f
	} else {
		return g
	}
};
fui_hasClass = function(c, b) {
	c = fui.byId(c);
	if (!c) {
		return
	}
	if (!c.className) {
		return false
	}
	var a = String(c.className).split(" ");
	return a.indexOf(b) != -1
};
fui_addClass = function(b, a) {
	if (!a) {
		return
	}
	if (fui.hasClass(b, a) == false) {
		jQuery(b).addClass(a)
	}
};
fui_removeClass = function(b, a) {
	if (!a) {
		return
	}
	jQuery(b).removeClass(a)
};
fui_getMargins = function(a) {
	a = fui.byId(a);
	var b = jQuery(a);
	return {
		top : parseInt(b.css("margin-top"), 10) || 0,
		left : parseInt(b.css("margin-left"), 10) || 0,
		bottom : parseInt(b.css("margin-bottom"), 10) || 0,
		right : parseInt(b.css("margin-right"), 10) || 0
	}
};
fui_getBorders = function(a) {
	a = fui.byId(a);
	var b = jQuery(a);
	return {
		top : parseInt(b.css("border-top-width"), 10) || 0,
		left : parseInt(b.css("border-left-width"), 10) || 0,
		bottom : parseInt(b.css("border-bottom-width"), 10) || 0,
		right : parseInt(b.css("border-right-width"), 10) || 0
	}
};
fui_getPaddings = function(a) {
	a = fui.byId(a);
	var b = jQuery(a);
	return {
		top : parseInt(b.css("padding-top"), 10) || 0,
		left : parseInt(b.css("padding-left"), 10) || 0,
		bottom : parseInt(b.css("padding-bottom"), 10) || 0,
		right : parseInt(b.css("padding-right"), 10) || 0
	}
};
fui_setWidth = function(d, c) {
	d = fui.byId(d);
	c = parseInt(c);
	if (isNaN(c) || !d) {
		return
	}
	if (jQuery.boxModel) {
		var f = fui.getPaddings(d);
		var a = fui.getBorders(d);
		c = c - f.left - f.right - a.left - a.right
	}
	if (c < 0) {
		c = 0
	}
	d.style.width = c + "px"
};
fui_setHeight = function(d, c) {
	d = fui.byId(d);
	c = parseInt(c);
	if (isNaN(c) || !d) {
		return
	}
	if (jQuery.boxModel) {
		var f = fui.getPaddings(d);
		var a = fui.getBorders(d);
		c = c - f.top - f.bottom - a.top - a.bottom
	}
	if (c < 0) {
		c = 0
	}
	d.style.height = c + "px"
};
fui_getWidth = function(a, b) {
	a = fui.byId(a);
	if (a.style.display == "none" || a.type == "text/javascript") {
		return 0
	}
	return b ? jQuery(a).width() : jQuery(a).outerWidth()
};
fui_getHeight = function(a, b) {
	a = fui.byId(a);
	if (a.style.display == "none" || a.type == "text/javascript") {
		return 0
	}
	return b ? jQuery(a).height() : jQuery(a).outerHeight()
};
fui_setBox = function(d, b, f, c, a) {
	if (f === undefined) {
		f = b.y;
		c = b.width;
		a = b.height;
		b = b.x
	}
	fui.setXY(d, b, f);
	fui.setWidth(d, c);
	fui.setHeight(d, a)
};
fui_getBox = function(a) {
	var c = fui.getXY(a);
	var b = {
		x : c[0],
		y : c[1],
		width : fui.getWidth(a),
		height : fui.getHeight(a)
	};
	b.left = b.x;
	b.top = b.y;
	b.right = b.x + b.width;
	b.bottom = b.y + b.height;
	return b
};
fui_setStyle = function(g, f) {
	g = fui.byId(g);
	if (!g || typeof f != "string") {
		return
	}
	var j = jQuery(g);
	var h = f.toLowerCase().split(";");
	for (var c = 0, a = h.length; c < a; c++) {
		var d = h[c];
		var b = d.split(":");
		if (b.length == 2) {
			j.css(b[0].trim(), b[1].trim())
		}
	}
};
fui_getStyle = function() {
	var a = document.defaultView;
	return new Function(
			"el",
			"style",
			[
					"style.indexOf('-')>-1 && (style=style.replace(/-(\\w)/g,function(m,a){return a.toUpperCase()}));",
					"style=='float' && (style='",
					a ? "cssFloat" : "styleFloat",
					"');return el.style[style] || ",
					a ? "window.getComputedStyle(el, null)[style]"
							: "el.currentStyle[style]", " || null;" ].join(""))
}();
fui_isAncestor = function(d, f) {
	var a = false;
	d = fui.byId(d);
	f = fui.byId(f);
	if (d === f) {
		return true
	}
	if (d && f) {
		if (d.contains) {
			try {
				return d.contains(f)
			} catch (b) {
				return false
			}
		} else {
			if (d.compareDocumentPosition) {
				return !!(d.compareDocumentPosition(f) & 16)
			} else {
				while (f = f.parentNode) {
					a = f == d || a
				}
			}
		}
	}
	return a
};
fui_findParent = function(f, c, h) {
	f = fui.byId(f);
	var a = document.body, g = 0, d;
	h = h || 50;
	if (typeof h != "number") {
		d = fui.byId(h);
		h = 10
	}
	while (f && f.nodeType == 1 && g < h && f != a && f != d) {
		if (fui.hasClass(f, c)) {
			return f
		}
		g++;
		f = f.parentNode
	}
	return null
};
fui
		.copyTo(
				fui,
				{
					byId : fui_byId,
					hasClass : fui_hasClass,
					addClass : fui_addClass,
					removeClass : fui_removeClass,
					getMargins : fui_getMargins,
					getBorders : fui_getBorders,
					getPaddings : fui_getPaddings,
					setWidth : fui_setWidth,
					setHeight : fui_setHeight,
					getWidth : fui_getWidth,
					getHeight : fui_getHeight,
					setBox : fui_setBox,
					getBox : fui_getBox,
					setStyle : fui_setStyle,
					getStyle : fui_getStyle,
					repaint : function(a) {
						if (!a) {
							a = document.body
						}
						fui.addClass(a, "fui-repaint");
						setTimeout(function() {
							fui.removeClass(a, "fui-repaint")
						}, 1)
					},
					getSize : function(a, b) {
						return {
							width : fui.getWidth(a, b),
							height : fui.getHeight(a, b)
						}
					},
					setSize : function(c, b, a) {
						fui.setWidth(c, b);
						fui.setHeight(c, a)
					},
					setX : function(b, a) {
						a = parseInt(a);
						var c = jQuery(b).offset();
						var d = parseInt(c.top);
						if (d === undefined) {
							d = c[1]
						}
						fui.setXY(b, a, d)
					},
					setY : function(b, d) {
						d = parseInt(d);
						var c = jQuery(b).offset();
						var a = parseInt(c.left);
						if (a === undefined) {
							a = c[0]
						}
						fui.setXY(b, a, d)
					},
					setXY : function(b, a, d) {
						var c = {
							left : parseInt(a),
							top : parseInt(d)
						};
						jQuery(b).offset(c);
						jQuery(b).offset(c)
					},
					getXY : function(a) {
						var b = jQuery(a).offset();
						return [ parseInt(b.left), parseInt(b.top) ]
					},
					getViewportBox : function() {
						var b = jQuery(window).width(), c = jQuery(window)
								.height();
						var a = jQuery(document).scrollLeft(), d = jQuery(
								document.body).scrollTop();
						if (document.documentElement) {
							d = document.documentElement.scrollTop
						}
						return {
							x : a,
							y : d,
							width : b,
							height : c,
							right : a + b,
							bottom : d + c
						}
					},
					getChildNodes : function(h, g) {
						h = fui.byId(h);
						if (!h) {
							return
						}
						var b = h.childNodes;
						var f = [];
						for (var d = 0, a = b.length; d < a; d++) {
							var j = b[d];
							if (j.nodeType == 1 || g === true) {
								f.push(j)
							}
						}
						return f
					},
					removeChilds : function(g, a) {
						g = fui.byId(g);
						if (!g) {
							return
						}
						var f = fui.getChildNodes(g, true);
						for (var d = 0, b = f.length; d < b; d++) {
							var h = f[d];
							if (a && h == a) {
							} else {
								g.removeChild(f[d])
							}
						}
					},
					isAncestor : fui_isAncestor,
					findParent : fui_findParent,
					findChild : function(f, b) {
						f = fui.byId(f);
						var d = f.getElementsByTagName("*");
						for (var c = 0, a = d.length; c < a; c++) {
							var f = d[c];
							if (fui.hasClass(f, b)) {
								return f
							}
						}
					},
					isAncestor : function(d, f) {
						var a = false;
						d = fui.byId(d);
						f = fui.byId(f);
						if (d === f) {
							return true
						}
						if (d && f) {
							if (d.contains) {
								try {
									return d.contains(f)
								} catch (b) {
									return false
								}
							} else {
								if (d.compareDocumentPosition) {
									return !!(d.compareDocumentPosition(f) & 16)
								} else {
									while (f = f.parentNode) {
										a = f == d || a
									}
								}
							}
						}
						return a
					},
					getOffsetsTo : function(a, c) {
						var d = this.getXY(a), b = this.getXY(c);
						return [ d[0] - b[0], d[1] - b[1] ]
					},
					scrollIntoView : function(h, f, i) {
						var p = fui.byId(f) || document.body, g = this
								.getOffsetsTo(h, p), k = g[0] + p.scrollLeft, u = g[1]
								+ p.scrollTop, q = u + h.offsetHeight, d = k
								+ h.offsetWidth, a = p.clientHeight, m = parseInt(
								p.scrollTop, 10), s = parseInt(p.scrollLeft, 10), j = m
								+ a, n = s + p.clientWidth;
						if (h.offsetHeight > a || u < m) {
							p.scrollTop = u
						} else {
							if (q > j) {
								p.scrollTop = q - a
							}
						}
						p.scrollTop = p.scrollTop;
						if (i !== false) {
							if (h.offsetWidth > p.clientWidth || k < s) {
								p.scrollLeft = k
							} else {
								if (d > n) {
									p.scrollLeft = d - p.clientWidth
								}
							}
							p.scrollLeft = p.scrollLeft
						}
						return this
					},
					setOpacity : function(b, a) {
						jQuery(b).css({
							opacity : a
						})
					},
					selectable : function(b, a) {
						b = fui.byId(b);
						if (!!a) {
							jQuery(b).removeClass("fui-unselectable");
							if (isIE) {
								b.unselectable = "off"
							} else {
								b.style.MozUserSelect = "";
								b.style.KhtmlUserSelect = "";
								b.style.UserSelect = ""
							}
						} else {
							jQuery(b).addClass("fui-unselectable");
							if (isIE) {
								b.unselectable = "on"
							} else {
								b.style.MozUserSelect = "none";
								b.style.UserSelect = "none";
								b.style.KhtmlUserSelect = "none"
							}
						}
					},
					selectRange : function(c, b, a) {
						if (c.createTextRange) {
							var f = c.createTextRange();
							f.moveStart("character", b);
							f.moveEnd("character", a - c.value.length);
							f.select()
						} else {
							if (c.setSelectionRange) {
								c.setSelectionRange(b, a)
							}
						}
						try {
							c.focus()
						} catch (d) {
						}
					},
					getSelectRange : function(b) {
						b = fui.byId(b);
						if (!b) {
							return
						}
						try {
							b.focus()
						} catch (d) {
						}
						var f = 0, a = 0;
						if (b.createTextRange) {
							var c = document.selection.createRange()
									.duplicate();
							c.moveEnd("character", b.value.length);
							if (c.text === "") {
								f = b.value.length
							} else {
								f = b.value.lastIndexOf(c.text)
							}
							var c = document.selection.createRange()
									.duplicate();
							c.moveStart("character", -b.value.length);
							a = c.text.length
						} else {
							f = b.selectionStart;
							a = b.selectionEnd
						}
						return [ f, a ]
					}
				});
(function() {
	var a = {
		tabindex : "tabIndex",
		readonly : "readOnly",
		"for" : "htmlFor",
		"class" : "className",
		maxlength : "maxLength",
		cellspacing : "cellSpacing",
		cellpadding : "cellPadding",
		rowspan : "rowSpan",
		colspan : "colSpan",
		usemap : "useMap",
		frameborder : "frameBorder",
		contenteditable : "contentEditable"
	};
	var c = document.createElement("div");
	c.setAttribute("class", "t");
	var b = c.className === "t";
	fui.setAttr = function(f, d, g) {
		f.setAttribute(b ? d : (a[d] || d), g)
	};
	fui.getAttr = function(h, g) {
		if (g == "value" && (isIE6 || isIE7)) {
			var d = h.attributes[g];
			return d ? d.value : null
		}
		var f = h.getAttribute(b ? g : (a[g] || g));
		if (typeof f == "function") {
			f = h.attributes[g].value
		}
		if (!f && g == "onload") {
			var i = h.getAttributeNode ? h.getAttributeNode(g) : null;
			if (i) {
				f = i.nodeValue
			}
		}
		return f
	}
})();
fui_onOne = function(f, d, c, b) {
	var a = "on" + d.toLowerCase();
	f[a] = function(h) {
		h = h || window.event;
		h.target = h.target || h.srcElement;
		if (!h.preventDefault) {
			h.preventDefault = function() {
				if (window.event) {
					window.event.returnValue = false
				}
			}
		}
		if (!h.stopPropogation) {
			h.stopPropogation = function() {
				if (window.event) {
					window.event.cancelBubble = true
				}
			}
		}
		var g = c.call(b, h);
		if (g === false) {
			return false
		}
	}
};
fui_on = function(d, c, b, a) {
	d = fui.byId(d);
	a = a || d;
	if (!d || !c || !b || !a) {
		return false
	}
	var f = fui.findListener(d, c, b, a);
	if (f) {
		return false
	}
	var g = fui.createDelegate(b, a);
	fui.listeners.push([ d, c, b, a, g ]);
	if (isFirefox && c == "mousewheel") {
		c = "DOMMouseScroll"
	}
	jQuery(d).bind(c, g)
};
fui_un = function(d, c, b, a) {
	d = fui.byId(d);
	a = a || d;
	if (!d || !c || !b || !a) {
		return false
	}
	var f = fui.findListener(d, c, b, a);
	if (!f) {
		return false
	}
	fui.listeners.remove(f);
	if (isFirefox && c == "mousewheel") {
		c = "DOMMouseScroll"
	}
	jQuery(d).unbind(c, f[4])
};
fui.copyTo(fui, {
	listeners : [],
	on : fui_on,
	un : fui_un,
	_getListeners : function() {
		var d = fui.listeners;
		for (var c = d.length - 1; c >= 0; c--) {
			var f = d[c];
			try {
				if (f[0] == 1 && f[1] == 1 && f[2] == 1 && f[3] == 1) {
					var a = 1
				}
			} catch (b) {
				d.removeAt(c)
			}
		}
		return d
	},
	findListener : function(h, g, f, d) {
		h = fui.byId(h);
		d = d || h;
		if (!h || !g || !f || !d) {
			return false
		}
		var c = fui._getListeners();
		for (var b = c.length - 1; b >= 0; b--) {
			var j = c[b];
			try {
				if (j[0] == h && j[1] == g && j[2] == f && j[3] == d) {
					return j
				}
			} catch (a) {
			}
		}
	},
	clearEvent : function(d, c) {
		d = fui.byId(d);
		if (!d) {
			return false
		}
		var b = fui._getListeners();
		for (var a = b.length - 1; a >= 0; a--) {
			var f = b[a];
			if (f[0] == d) {
				if (!c || c == f[1]) {
					fui.un(d, f[1], f[2], f[3])
				}
			}
		}
		d.onmouseover = d.onmousedown = null
	}
});
fui.__windowResizes = [];
fui.onWindowResize = function(b, a) {
	fui.__windowResizes.push([ b, a ])
};
fui.on(window, "resize", function(f) {
	var c = fui.__windowResizes;
	for (var b = 0, a = c.length; b < a; b++) {
		var d = c[b];
		d[0].call(d[1], f)
	}
});
fui.htmlEncode = function(b) {
	if (typeof b !== "string") {
		return b
	}
	var a = "";
	if (b.length == 0) {
		return ""
	}
	a = b;
	a = a.replace(/</g, "&lt;");
	a = a.replace(/>/g, "&gt;");
	a = a.replace(/ /g, "&nbsp;");
	a = a.replace(/\'/g, "&#39;");
	a = a.replace(/\"/g, "&quot;");
	return a
};
fui.htmlDecode = function(b) {
	if (typeof b !== "string") {
		return b
	}
	var a = "";
	if (b.length == 0) {
		return ""
	}
	a = b.replace(/&gt;/g, "&");
	a = a.replace(/&lt;/g, "<");
	a = a.replace(/&gt;/g, ">");
	a = a.replace(/&nbsp;/g, " ");
	a = a.replace(/&#39;/g, "'");
	a = a.replace(/&quot;/g, '"');
	return a
};
fui.copyTo(Array.prototype, {
	add : Array.prototype.enqueue = function(a) {
		this[this.length] = a;
		return this
	},
	getRange : function(f, b) {
		var a = [];
		for (var c = f; c <= b; c++) {
			var d = this[c];
			if (d) {
				a[a.length] = d
			}
		}
		return a
	},
	addRange : function(c) {
		for (var b = 0, a = c.length; b < a; b++) {
			this[this.length] = c[b]
		}
		return this
	},
	clear : function() {
		this.length = 0;
		return this
	},
	clone : function() {
		if (this.length === 1) {
			return [ this[0] ]
		} else {
			return Array.apply(null, this)
		}
	},
	contains : function(a) {
		return (this.indexOf(a) >= 0)
	},
	indexOf : function(c, d) {
		var a = this.length;
		for (var b = (d < 0) ? Math.max(0, a + d) : d || 0; b < a; b++) {
			if (this[b] === c) {
				return b
			}
		}
		return -1
	},
	dequeue : function() {
		return this.shift()
	},
	insert : function(a, b) {
		this.splice(a, 0, b);
		return this
	},
	insertRange : function(b, a) {
		for (var c = a.length - 1; c >= 0; c--) {
			var d = a[c];
			this.splice(b, 0, d)
		}
		return this
	},
	remove : function(b) {
		var a = this.indexOf(b);
		if (a >= 0) {
			this.splice(a, 1)
		}
		return (a >= 0)
	},
	removeAt : function(a) {
		var b = this[a];
		this.splice(a, 1);
		return b
	},
	removeRange : function(b) {
		b = b.clone();
		for (var c = 0, a = b.length; c < a; c++) {
			this.remove(b[c])
		}
	}
});
fui.Keyboard = {
	Left : 37,
	Top : 38,
	Right : 39,
	Bottom : 40,
	PageUp : 33,
	PageDown : 34,
	End : 35,
	Home : 36,
	Enter : 13,
	ESC : 27,
	Space : 32,
	Tab : 9,
	Del : 46,
	F1 : 112,
	F2 : 113,
	F3 : 114,
	F4 : 115,
	F5 : 116,
	F6 : 117,
	F7 : 118,
	F8 : 119,
	F9 : 120,
	F10 : 121,
	F11 : 122,
	F12 : 123
};
var ua = navigator.userAgent.toLowerCase(), check = function(a) {
	return a.test(ua)
}, DOC = document, isStrict = DOC.compatMode == "CSS1Compat", isOpera = Object.prototype.toString
		.call(window.opera) == "[object Opera]", isChrome = check(/chrome/), isWebKit = check(/webkit/), isSafari = !isChrome
		&& check(/safari/), isSafari2 = isSafari && check(/applewebkit\/4/), isSafari3 = isSafari
		&& check(/version\/3/), isSafari4 = isSafari && check(/version\/4/), isIE = !!window.attachEvent
		&& !isOpera, isIE7 = isIE && check(/msie 7/), isIE8 = isIE
		&& check(/msie 8/), isIE9 = isIE && check(/msie 9/), isIE10 = isIE
		&& document.documentMode == 10, isIE6 = isIE && !isIE7 && !isIE8
		&& !isIE9 && !isIE10, isFirefox = navigator.userAgent
		.indexOf("Firefox") > 0, isGecko = !isWebKit && check(/gecko/), isGecko2 = isGecko
		&& check(/rv:1\.8/), isGecko3 = isGecko && check(/rv:1\.9/), isBorderBox = isIE
		&& !isStrict, isWindows = check(/windows|win32/), isMac = check(/macintosh|mac os x/), isAir = check(/adobeair/), isLinux = check(/linux/), isSecure = /^https/i
		.test(window.location.protocol);
if (isIE6) {
	try {
		DOC.execCommand("BackgroundImageCache", false, true)
	} catch (e) {
	}
}
fui.boxModel = !isBorderBox;
fui.isIE = isIE;
fui.isIE6 = isIE6;
fui.isIE7 = isIE7;
fui.isIE8 = isIE8;
fui.isIE9 = isIE9;
fui.isIE10 = isIE10;
fui.isFirefox = isFirefox;
fui.isOpera = isOpera;
fui.isSafari = isSafari;
fui.isChrome = isChrome;
if (jQuery) {
	jQuery.boxModel = fui.boxModel
}
fui.noBorderBox = false;
if (jQuery.boxModel == false && isIE && isIE9 == false) {
	fui.noBorderBox = true
}
fui.MouseButton = {
	Left : 0,
	Middle : 1,
	Right : 2
};
if (isIE && !isIE9 && !isIE10) {
	fui.MouseButton = {
		Left : 1,
		Middle : 4,
		Right : 2
	}
}
fui._MaskID = 1;
fui._MaskObjects = {};
fui.mask = function(c) {
	var d = fui.byId(c);
	if (fui.isElement(d)) {
		c = {
			el : d
		}
	} else {
		if (typeof c == "string") {
			c = {
				html : c
			}
		}
	}
	c = fui.copyTo({
		html : "",
		cls : "",
		style : "",
		backStyle : "background:#ccc"
	}, c);
	c.el = fui.byId(c.el);
	if (!c.el) {
		c.el = document.body
	}
	var d = c.el;
	fui.unmask(c.el);
	d._maskid = fui._MaskID++;
	fui._MaskObjects[d._maskid] = c;
	var f = fui.append(d,
			'<div class="fui-mask"><div class="fui-mask-background" style="'
					+ c.backStyle + '"></div><div class="fui-mask-msg ' + c.cls
					+ '" style="' + c.style + '">' + c.html + "</div></div>");
	if (d == document.body) {
		fui.addClass(f, "fui-fixed")
	}
	c.maskEl = f;
	if (!fui.isNull(c.opacity)) {
		fui.setOpacity(f.firstChild, c.opacity)
	}
	function a() {
		b.style.display = "block";
		var g = fui.getSize(b);
		b.style.marginLeft = -g.width / 2 + "px";
		b.style.marginTop = -g.height / 2 + "px"
	}
	var b = f.lastChild;
	b.style.display = "none";
	setTimeout(function() {
		a()
	}, 0)
};
fui.unmask = function(b) {
	b = fui.byId(b);
	if (!b) {
		b = document.body
	}
	var a = fui._MaskObjects[b._maskid];
	if (!a) {
		return
	}
	delete fui._MaskObjects[b._maskid];
	var c = a.maskEl;
	a.maskEl = null;
	if (c && c.parentNode) {
		c.parentNode.removeChild(c)
	}
};
fui.Cookie = {
	get : function(f) {
		var c = document.cookie.split("; ");
		var g = null;
		for (var d = 0; d < c.length; d++) {
			var a = c[d].split("=");
			if (f == a[0]) {
				g = a
			}
		}
		if (g) {
			var b = g[1];
			if (b === undefined) {
				return b
			}
			return unescape(b)
		}
		return null
	},
	set : function(b, f, a, d) {
		var c = new Date();
		if (a != null) {
			c = new Date(c.getTime() + (a * 1000 * 3600 * 24))
		}
		document.cookie = b + "=" + escape(f)
				+ ((a == null) ? "" : ("; expires=" + c.toGMTString()))
				+ ";path=/" + (d ? "; domain=" + d : "")
	},
	del : function(a, b) {
		this.set(a, null, -100, b)
	}
};
fui.copyTo(fui, {
	treeToArray : function(a, n, c, k, j) {
		if (!n) {
			n = "children"
		}
		var m = [];
		for (var g = 0, f = a.length; g < f; g++) {
			var d = a[g];
			m[m.length] = d;
			if (k) {
				d[k] = j
			}
			var o = d[n];
			if (o && o.length > 0) {
				var b = d[c];
				var h = this.treeToArray(o, n, c, k, b);
				m.addRange(h)
			}
		}
		return m
	},
	arrayToTree : function(j, n, d, m) {
		if (!n) {
			n = "children"
		}
		d = d || "_id";
		m = m || "_pid";
		var a = [];
		var g = {};
		for (var k = 0, h = j.length; k < h; k++) {
			var f = j[k];
			if (!f) {
				continue
			}
			var c = f[d];
			if (c !== null && c !== undefined) {
				g[c] = f
			}
			delete f[n]
		}
		for (var k = 0, h = j.length; k < h; k++) {
			var f = j[k];
			var b = g[f[m]];
			if (!b) {
				a.push(f);
				continue
			}
			if (!b[n]) {
				b[n] = []
			}
			b[n].push(f)
		}
		return a
	}
});
fui.treeToList = fui.treeToArray;
fui.listToTree = fui.arrayToTree;
function UUID() {
	var b = [], c = "0123456789ABCDEF".split("");
	for (var a = 0; a < 36; a++) {
		b[a] = Math.floor(Math.random() * 16)
	}
	b[14] = 4;
	b[19] = (b[19] & 3) | 8;
	for (var a = 0; a < 36; a++) {
		b[a] = c[b[a]]
	}
	b[8] = b[13] = b[18] = b[23] = "-";
	return b.join("")
}
String.format = function(b) {
	var a = Array.prototype.slice.call(arguments, 1);
	b = b || "";
	return b.replace(/\{(\d+)\}/g, function(c, d) {
		return a[d]
	})
};
String.prototype.trim = function() {
	var a = /^\s+|\s+$/g;
	return function() {
		return this.replace(a, "")
	}
}();
fui
		.copyTo(
				fui,
				{
					measureText : function(b, h, a) {
						if (!this.measureEl) {
							this.measureEl = fui.append(document.body,
									"<div></div>")
						}
						this.measureEl.style.cssText = "position:absolute;left:-1000px;top:-1000px;visibility:hidden;";
						if (typeof b == "string") {
							this.measureEl.className = b
						} else {
							this.measureEl.className = "";
							var k = jQuery(b);
							var j = jQuery(this.measureEl);
							var c = [ "font-size", "font-style", "font-weight",
									"font-family", "line-height",
									"text-transform", "letter-spacing" ];
							for (var f = 0, d = c.length; f < d; f++) {
								var g = c[f];
								j.css(g, k.css(g))
							}
						}
						if (a) {
							fui.setStyle(this.measureEl, a)
						}
						this.measureEl.innerHTML = h;
						return fui.getSize(this.measureEl)
					}
				});
jQuery(function() {
	var a = new Date();
	fui.isReady = true;
	fui.parse();
	fui._FireBindEvents();
	if ((fui.getStyle(document.body, "overflow") == "hidden" || fui.getStyle(
			document.documentElement, "overflow") == "hidden")
			&& (isIE6 || isIE7)) {
		jQuery(document.body).css("overflow", "visible");
		jQuery(document.documentElement).css("overflow", "visible")
	}
	fui.__LastWindowWidth = document.documentElement.clientWidth;
	fui.__LastWindowHeight = document.documentElement.clientHeight
});
fui_onload = function(a) {
	fui.layout(null, false);
	fui.on(window, "resize", fui_onresize)
};
fui.on(window, "load", fui_onload);
fui.__LastWindowWidth = document.documentElement.clientWidth;
fui.__LastWindowHeight = document.documentElement.clientHeight;
fui.doWindowResizeTimer = null;
fui.allowLayout = true;
fui_onresize = function(c) {
	if (fui.doWindowResizeTimer) {
		clearTimeout(fui.doWindowResizeTimer)
	}
	fui.WindowVisible = fui.isWindowDisplay();
	if (fui.WindowVisible == false || fui.allowLayout == false) {
		return
	}
	if (typeof Ext != "undefined") {
		fui.doWindowResizeTimer = setTimeout(function() {
			var f = document.documentElement.clientWidth;
			var d = document.documentElement.clientHeight;
			if (fui.__LastWindowWidth == f && fui.__LastWindowHeight == d) {
			} else {
				fui.__LastWindowWidth = f;
				fui.__LastWindowHeight = d;
				fui.layout(null, false)
			}
			fui.doWindowResizeTimer = null
		}, 300)
	} else {
		var a = 100;
		try {
			if (parent && parent != window && parent.fui) {
				a = 0
			}
		} catch (b) {
		}
		fui.doWindowResizeTimer = setTimeout(function() {
			var f = document.documentElement.clientWidth;
			var d = document.documentElement.clientHeight;
			if (fui.__LastWindowWidth == f && fui.__LastWindowHeight == d) {
			} else {
				fui.__LastWindowWidth = f;
				fui.__LastWindowHeight = d;
				fui.layout(null, false)
			}
			fui.doWindowResizeTimer = null
		}, a)
	}
};
fui.isDisplay = function(c, a) {
	var b = a || document.body;
	while (1) {
		if (c == null || !c.style) {
			return false
		}
		if (c && c.style && c.style.display == "none") {
			return false
		}
		if (c == b) {
			return true
		}
		c = c.parentNode
	}
	return true
};
fui.isWindowDisplay = function() {
	try {
		var c = window.parent;
		var m = c != window;
		if (m) {
			var g = c.document.getElementsByTagName("iframe");
			var a = c.document.getElementsByTagName("frame");
			var j = [];
			for (var h = 0, d = g.length; h < d; h++) {
				j.push(g[h])
			}
			for (var h = 0, d = a.length; h < d; h++) {
				j.push(a[h])
			}
			var f = null;
			for (var h = 0, d = j.length; h < d; h++) {
				var b = j[h];
				if (b.contentWindow == window) {
					f = b;
					break
				}
			}
			if (!f) {
				return false
			}
			return fui.isDisplay(f, c.document.body)
		} else {
			return true
		}
	} catch (k) {
		return true
	}
};
fui.WindowVisible = fui.isWindowDisplay();
fui.layoutIFrames = function(a) {
	if (!document.body) {
		return
	}
	if (!a) {
		a = document.body
	}
	var b = a.getElementsByTagName("iframe");
	setTimeout(
			function() {
				for (var f = 0, c = b.length; f < c; f++) {
					var g = b[f];
					try {
						if (fui.isDisplay(g) && fui.isAncestor(a, g)) {
							if (g.contentWindow.fui) {
								if (g.contentWindow.fui.WindowVisible == false) {
									g.contentWindow.fui.WindowVisible = g.contentWindow.fui
											.isWindowDisplay();
									g.contentWindow.fui.layout()
								} else {
									g.contentWindow.fui.layout(null, false)
								}
							}
							g.contentWindow.fui.layoutIFrames()
						}
					} catch (d) {
					}
				}
			}, 30)
};
$.ajaxSetup({
	cache : false
});
if (isIE) {
	setInterval(function() {
		CollectGarbage()
	}, 10000)
}
fui_unload = function(k) {
	try {
		var j = fui._getTopWindow();
		j[fui._WindowID] = "";
		delete j[fui._WindowID]
	} catch (m) {
	}
	var g = document.body.getElementsByTagName("iframe");
	if (g.length > 0) {
		var f = [];
		for (var d = 0, a = g.length; d < a; d++) {
			f.push(g[d])
		}
		for (var d = 0, a = f.length; d < a; d++) {
			try {
				var b = f[d];
				b._ondestroy = null;
				b.src = "";
				try {
					b.contentWindow.document.write("");
					b.contentWindow.document.close()
				} catch (m) {
				}
				if (b.parentNode) {
					b.parentNode.removeChild(b)
				}
			} catch (k) {
			}
		}
	}
	var h = fui.getComponents();
	for (var d = 0, a = h.length; d < a; d++) {
		var c = h[d];
		if (c.destroyed !== true) {
			c.destroy(false)
		}
	}
	h.length = 0;
	h = null;
	fui.un(window, "unload", fui_unload);
	fui.un(window, "load", fui_onload);
	fui.un(window, "resize", fui_onresize);
	fui.components = {};
	fui.classes = {};
	fui.uiClasses = {};
	fui.uids = {};
	fui._topWindow = null;
	window.fui = null;
	window.Owner = null;
	window.CloseOwnerWindow = null;
	try {
		CollectGarbage()
	} catch (k) {
	}
};
fui.on(window, "unload", fui_unload);
function __OnIFrameMouseDown() {
	jQuery(document).trigger("mousedown")
}
function __BindIFrames() {
	var f = document.getElementsByTagName("iframe");
	for (var b = 0, a = f.length; b < a; b++) {
		var c = f[b];
		try {
			if (c.contentWindow && c.contentWindow.document) {
				c.contentWindow.document.onmousedown = __OnIFrameMouseDown
			}
		} catch (d) {
		}
	}
}
setInterval(function() {
	__BindIFrames()
}, 1500);
fui.zIndex = 1000;
fui.getMaxZIndex = function() {
	return fui.zIndex++
};
function js_isTouchDevice() {
	try {
		document.createEvent("TouchEvent");
		return true
	} catch (a) {
		return false
	}
}
function js_touchScroll(c) {
	if (js_isTouchDevice()) {
		var a = typeof c == "string" ? document.getElementById(c) : c;
		var b = 0;
		a.addEventListener("touchstart", function(d) {
			b = this.scrollTop + d.touches[0].pageY;
			d.preventDefault()
		}, false);
		a.addEventListener("touchmove", function(d) {
			this.scrollTop = b - d.touches[0].pageY;
			d.preventDefault()
		}, false)
	}
}
fui._placeholder = function(b) {
	b = fui.byId(b);
	if (!b || !isIE || isIE10) {
		return
	}
	function c() {
		var d = b._placeholder_label;
		if (!d) {
			return
		}
		var f = b.getAttribute("placeholder");
		if (!f) {
			f = b.placeholder
		}
		if (!b.value && !b.disabled) {
			d.innerHTML = f;
			d.style.display = ""
		} else {
			d.style.display = "none"
		}
	}
	if (b._placeholder) {
		c();
		return
	}
	b._placeholder = true;
	var a = document.createElement("label");
	a.className = "fui-placeholder-label";
	b.parentNode.appendChild(a);
	b._placeholder_label = a;
	a.onmousedown = function() {
		b.focus()
	};
	b.onpropertychange = function(d) {
		d = d || window.event;
		if (d.propertyName == "value") {
			c()
		}
	};
	c();
	fui.on(b, "focus", function(d) {
		if (!b.readOnly) {
			a.style.display = "none"
		}
	});
	fui.on(b, "blur", function(d) {
		c()
	})
};
fui.ajax = function(a) {
	if (!a.dataType) {
		a.dataType = "text"
	}
	return window.jQuery.ajax(a)
};
fui._evalAjaxData = function(ajaxData, scope) {
	var obj = ajaxData;
	var t = typeof ajaxData;
	if (t == "string") {
		obj = eval("(" + ajaxData + ")");
		if (typeof obj == "function") {
			obj = obj.call(scope)
		}
	}
	return obj
};
if (typeof window.rootpath == "undefined") {
	rootpath = "/"
}
fui.loadJS = function(a, b) {
	if (!a) {
		return
	}
	if (typeof b == "function") {
		return loadJS._async(a, b)
	} else {
		return loadJS._sync(a)
	}
};
fui.loadJS._js = {};
fui.loadJS._async = function(e, f) {
	var c = fui.loadJS._js[e];
	if (!c) {
		c = fui.loadJS._js[e] = {
			create : false,
			loaded : false,
			callbacks : []
		}
	}
	if (c.loaded) {
		setTimeout(function() {
			f()
		}, 1);
		return
	} else {
		c.callbacks.push(f);
		if (c.create) {
			return
		}
	}
	c.create = true;
	var a = document.getElementsByTagName("head")[0];
	var d = document.createElement("script");
	d.src = e;
	d.type = "text/javascript";
	function b() {
		for (var g = 0; g < c.callbacks.length; g++) {
			var h = c.callbacks[g];
			if (h) {
				h()
			}
		}
		c.callbacks.length = 0
	}
	setTimeout(function() {
		if (document.all) {
			d.onreadystatechange = function() {
				if (d.readyState == "loaded" || d.readyState == "complete") {
					b();
					c.loaded = true
				}
			}
		} else {
			d.onload = function() {
				b();
				c.loaded = true
			}
		}
		a.appendChild(d)
	}, 1);
	return d
};
fui.loadJS._sync = function(c) {
	if (loadJS._js[c]) {
		return
	}
	loadJS._js[c] = {
		create : true,
		loaded : true,
		callbacks : []
	};
	var a = document.getElementsByTagName("head")[0];
	var b = document.createElement("script");
	b.type = "text/javascript";
	b.text = loadText(c);
	a.appendChild(b);
	return b
};
fui.loadText = function(a) {
	var g = "";
	var c = document.all && location.protocol == "file:";
	var b = null;
	if (c) {
		b = new ActiveXObject("Microsoft.XMLHTTP")
	} else {
		if (window.XMLHttpRequest) {
			b = new XMLHttpRequest()
		} else {
			if (window.ActiveXObject) {
				b = new ActiveXObject("Microsoft.XMLHTTP")
			}
		}
	}
	b.onreadystatechange = e;
	var f = "_t=" + new Date().getTime();
	if (a.indexOf("?") == -1) {
		f = "?" + f
	} else {
		f = "&" + f
	}
	a += f;
	b.open("GET", a, false);
	b.send(null);
	function e() {
		if (b.readyState == 4) {
			var d = c ? 0 : 200;
			if (b.status == d) {
				g = b.responseText
			} else {
			}
		}
	}
	return g
};
fui.loadJSON = function(url) {
	var text = loadText(url);
	var o = eval("(" + text + ")");
	return o
};
fui.loadCSS = function(c, d) {
	if (!c) {
		return
	}
	if (loadCSS._css[c]) {
		return
	}
	var a = document.getElementsByTagName("head")[0];
	var b = document.createElement("link");
	if (d) {
		b.id = d
	}
	b.href = c;
	b.rel = "stylesheet";
	b.type = "text/css";
	a.appendChild(b);
	return b
};
fui.loadCSS._css = {};
fui.innerHTML = function(b, a) {
	if (typeof b == "string") {
		b = document.getElementById(b)
	}
	if (!b) {
		return
	}
	a = '<div style="display:none">&nbsp;</div>' + a;
	b.innerHTML = a;
	fui.__executeScripts(b);
	var c = b.firstChild
};
fui.__executeScripts = function(h) {
	var a = h.getElementsByTagName("script");
	for (var c = 0, b = a.length; c < b; c++) {
		var g = a[c];
		var f = g.src;
		if (f) {
			fui.loadJS(f)
		} else {
			var e = document.createElement("script");
			e.type = "text/javascript";
			e.text = g.text;
			h.appendChild(e)
		}
	}
	for (var c = a.length - 1; c >= 0; c--) {
		var g = a[c];
		g.parentNode.removeChild(g)
	}
};
fui.Hidden = function() {
	fui.Hidden.superclass.constructor.call(this)
};
fui.extend(fui.Hidden, fui.Control, {
	_clearBorder : false,
	formField : true,
	value : "",
	uiCls : "fui-hidden",
	_create : function() {
		this.el = document.createElement("input");
		this.el.type = "hidden";
		this.el.className = "fui-hidden"
	},
	setName : function(a) {
		this.name = a;
		this.el.name = a
	},
	setValue : function(b) {
		if (b === null || b === undefined) {
			b = ""
		}
		this.value = b;
		if (fui.isDate(b)) {
			var e = b.getFullYear();
			var a = b.getMonth() + 1;
			var c = b.getDate();
			a = a < 10 ? "0" + a : a;
			c = c < 10 ? "0" + c : c;
			this.el.value = e + "-" + a + "-" + c
		} else {
			this.el.value = b
		}
	},
	getValue : function() {
		return this.value
	},
	getFormValue : function() {
		return this.el.value
	}
});
fui.regClass(fui.Hidden, "hidden");
fui.Popup = function() {
	fui.Popup.superclass.constructor.call(this);
	this.setVisible(false);
	this.setAllowDrag(this.allowDrag);
	this.setAllowResize(this.allowResize)
};
fui.extend(fui.Popup, fui.Container, {
	_clearBorder : false,
	uiCls : "fui-popup",
	_create : function() {
		var a = this.el = document.createElement("div");
		this.el.className = "fui-popup";
		this._contentEl = this.el
	},
	_initEvents : function() {
		fui._BindEvents(function() {
			fui_onOne(this.el, "mouseover", this.__OnMouseOver, this)
		}, this)
	},
	doLayout : function() {
		if (!this.canLayout()) {
			return
		}
		fui.Popup.superclass.doLayout.call(this);
		this._doShadow();
		var d = this.el.childNodes;
		if (d) {
			for (var b = 0, a = d.length; b < a; b++) {
				var c = d[b];
				fui.layout(c)
			}
		}
	},
	destroy : function(a) {
		if (this.el) {
			this.el.onmouseover = null
		}
		fui.un(document, "mousedown", this.__OnBodyMouseDown, this);
		fui.un(window, "resize", this.__OnWindowResize, this);
		if (this._modalEl) {
			jQuery(this._modalEl).remove();
			this._modalEl = null
		}
		if (this.shadowEl) {
			jQuery(this.shadowEl).remove();
			this.shadowEl = null
		}
		fui.Popup.superclass.destroy.call(this, a)
	},
	setWidth : function(a) {
		if (parseInt(a) == a) {
			a += "px"
		}
		this.width = a;
		if (a.indexOf("px") != -1) {
			fui.setWidth(this.el, a)
		} else {
			this.el.style.width = a
		}
		this._sizeChaned()
	},
	setHeight : function(a) {
		if (parseInt(a) == a) {
			a += "px"
		}
		this.height = a;
		if (a.indexOf("px") != -1) {
			fui.setHeight(this.el, a)
		} else {
			this.el.style.height = a
		}
		this._sizeChaned()
	},
	setBody : function(c) {
		if (!c) {
			return
		}
		if (!fui.isArray(c)) {
			c = [ c ]
		}
		for (var b = 0, a = c.length; b < a; b++) {
			fui.append(this._contentEl, c[b])
		}
	},
	getAttrs : function(c) {
		var a = fui.Popup.superclass.getAttrs.call(this, c);
		fui._ParseString(c, a, [ "popupEl", "popupCls", "showAction",
				"hideAction", "xAlign", "yAlign", "modalStyle", "onbeforeopen",
				"open", "onbeforeclose", "onclose" ]);
		fui._ParseBool(c, a, [ "showModal", "showShadow", "allowDrag",
				"allowResize" ]);
		fui._ParseInt(c, a, [ "showDelay", "hideDelay", "xOffset", "yOffset",
				"minWidth", "minHeight", "maxWidth", "maxHeight" ]);
		var b = fui.getChildNodes(c, true);
		a.body = b;
		return a
	}
});
fui.regClass(fui.Popup, "popup");
fui.Popup_prototype = {
	isPopup : false,
	popupEl : null,
	popupCls : "",
	showAction : "mouseover",
	hideAction : "outerclick",
	showDelay : 300,
	hideDelay : 500,
	xAlign : "left",
	yAlign : "below",
	xOffset : 0,
	yOffset : 0,
	minWidth : 50,
	minHeight : 25,
	maxWidth : 2000,
	maxHeight : 2000,
	showModal : false,
	showShadow : true,
	modalStyle : "opacity:0.2",
	_dragCls : "fui-popup-drag",
	_resizeCls : "fui-popup-resize",
	allowDrag : false,
	allowResize : false,
	_unbindPopupEl : function() {
		if (!this.popupEl) {
			return
		}
		fui.un(this.popupEl, "click", this.__OnLeftClick, this);
		fui.un(this.popupEl, "contextmenu", this.__OnRightClick, this);
		fui.un(this.popupEl, "mouseover", this.__OnMouseOver, this)
	},
	_bindPopupEl : function() {
		if (!this.popupEl) {
			return
		}
		fui.on(this.popupEl, "click", this.__OnLeftClick, this);
		fui.on(this.popupEl, "contextmenu", this.__OnRightClick, this);
		fui.on(this.popupEl, "mouseover", this.__OnMouseOver, this)
	},
	doShow : function(c) {
		var b = {
			popupEl : this.popupEl,
			htmlEvent : c,
			cancel : false
		};
		this.fire("BeforeOpen", b);
		if (b.cancel == true) {
			return
		}
		this.fire("opening", b);
		if (b.cancel == true) {
			return
		}
		if (!this.popupEl) {
			this.show()
		} else {
			var a = {};
			if (c) {
				a.xy = [ c.pageX, c.pageY ]
			}
			this.showAtEl(this.popupEl, a)
		}
	},
	doHide : function(b) {
		var a = {
			popupEl : this.popupEl,
			htmlEvent : b,
			cancel : false
		};
		this.fire("BeforeClose", a);
		if (a.cancel == true) {
			return
		}
		this.close()
	},
	show : function(b, a) {
		this.showAtPos(b, a)
	},
	showAtPos : function(a, d) {
		this.render(document.body);
		if (!a) {
			a = "center"
		}
		if (!d) {
			d = "middle"
		}
		this.el.style.position = "absolute";
		this.el.style.left = "-2000px";
		this.el.style.top = "-2000px";
		this.el.style.display = "";
		this._measureSize();
		var b = fui.getViewportBox();
		var c = fui.getBox(this.el);
		if (a == "left") {
			a = 0
		}
		if (a == "center") {
			a = b.width / 2 - c.width / 2
		}
		if (a == "right") {
			a = b.width - c.width
		}
		if (d == "top") {
			d = 0
		}
		if (d == "middle") {
			d = b.y + b.height / 2 - c.height / 2
		}
		if (d == "bottom") {
			d = b.height - c.height
		}
		if (a + c.width > b.right) {
			a = b.right - c.width
		}
		if (d + c.height > b.bottom) {
			d = b.bottom - c.height - 20
		}
		this._Show(a, d)
	},
	_doModal : function() {
		jQuery(this._modalEl).remove();
		if (!this.showModal) {
			return
		}
		if (this.visible == false) {
			return
		}
		var b = document.documentElement;
		var c = parseInt(Math.max(document.body.scrollWidth, b ? b.scrollWidth
				: 0));
		var f = parseInt(Math.max(document.body.scrollHeight,
				b ? b.scrollHeight : 0));
		var d = fui.getViewportBox();
		var a = d.height;
		if (a < f) {
			a = f
		}
		var e = d.width;
		if (e < c) {
			e = c
		}
		this._modalEl = fui.append(document.body,
				'<div class="fui-modal"></div>');
		this._modalEl.style.height = a + "px";
		this._modalEl.style.width = e + "px";
		this._modalEl.style.zIndex = fui.getStyle(this.el, "zIndex") - 1;
		fui.setStyle(this._modalEl, this.modalStyle)
	},
	_doShadow : function() {
		if (!this.shadowEl) {
			this.shadowEl = fui.append(document.body,
					'<div class="fui-shadow"></div>')
		}
		this.shadowEl.style.display = this.showShadow ? "" : "none";
		if (this.showShadow) {
			function b() {
				this.shadowEl.style.display = "";
				var e = fui.getBox(this.el);
				var d = this.shadowEl.style;
				d.width = e.width + "px";
				d.height = e.height + "px";
				d.left = e.x + "px";
				d.top = e.y + "px";
				var c = fui.getStyle(this.el, "zIndex");
				if (!isNaN(c)) {
					this.shadowEl.style.zIndex = c - 2
				}
			}
			this.shadowEl.style.display = "none";
			if (this._doShadowTimer) {
				clearTimeout(this._doShadowTimer);
				this._doShadowTimer = null
			}
			var a = this;
			this._doShadowTimer = setTimeout(function() {
				a._doShadowTimer = null;
				b.call(a)
			}, 20)
		}
	},
	_measureSize : function() {
		this.el.style.display = "";
		var a = fui.getBox(this.el);
		if (a.width > this.maxWidth) {
			fui.setWidth(this.el, this.maxWidth);
			a = fui.getBox(this.el)
		}
		if (a.height > this.maxHeight) {
			fui.setHeight(this.el, this.maxHeight);
			a = fui.getBox(this.el)
		}
		if (a.width < this.minWidth) {
			fui.setWidth(this.el, this.minWidth);
			a = fui.getBox(this.el)
		}
		if (a.height < this.minHeight) {
			fui.setHeight(this.el, this.minHeight);
			a = fui.getBox(this.el)
		}
	},
	_getWindowOffset : function(a) {
		return [ 0, 0 ]
	},
	showAtEl : function(b, r) {
		b = fui.byId(b);
		if (!b) {
			return
		}
		if (!this.isRender() || this.el.parentNode != document.body) {
			this.render(document.body)
		}
		var i = {
			atEl : b,
			popupEl : this.el,
			xAlign : this.xAlign,
			yAlign : this.yAlign,
			xOffset : this.xOffset,
			yOffset : this.yOffset,
			popupCls : this.popupCls
		};
		fui.copyTo(i, r);
		fui.addClass(b, i.popupCls);
		b.popupCls = i.popupCls;
		this._popupEl = b;
		this.el.style.position = "absolute";
		this.el.style.left = "-2000px";
		this.el.style.top = "-2000px";
		this.el.style.display = "";
		this.doLayout();
		this._measureSize();
		var j = fui.getViewportBox();
		var f = fui.getBox(this.el);
		var e = fui.getBox(b);
		var q = i.xy;
		var g = i.xAlign, p = i.yAlign;
		var m = j.width / 2 - f.width / 2, l = 0;
		if (q) {
			m = q[0];
			l = q[1]
		}
		switch (i.xAlign) {
		case "outleft":
			m = e.x - f.width;
			break;
		case "left":
			m = e.x;
			break;
		case "center":
			m = e.x + e.width / 2 - f.width / 2;
			break;
		case "right":
			m = e.right - f.width;
			break;
		case "outright":
			m = e.right;
			break;
		default:
			break
		}
		switch (i.yAlign) {
		case "above":
			l = e.y - f.height;
			break;
		case "top":
			l = e.y;
			break;
		case "middle":
			l = e.y + e.height / 2 - f.height / 2;
			break;
		case "bottom":
			l = e.bottom - f.height;
			break;
		case "below":
			l = e.bottom;
			break;
		default:
			break
		}
		m = parseInt(m);
		l = parseInt(l);
		var n = this._getWindowOffset(r);
		if (i.outYAlign || i.outXAlign) {
			if (i.outYAlign == "above") {
				if (l + f.height > j.bottom) {
					var k = e.y - j.y;
					var a = j.bottom - e.bottom;
					if (k > a) {
						l = e.y - f.height
					}
				}
			}
			if (i.outXAlign == "outleft") {
				if (m + f.width > j.right) {
					var d = e.x - j.x;
					var o = j.right - e.right;
					if (d > o) {
						m = e.x - f.width
					}
				}
			}
			if (i.outXAlign == "right") {
				if (m + f.width > j.right) {
					m = e.right - f.width
				}
			}
			this._Show(m + n[0], l + n[1])
		} else {
			this.showAtPos(m + i.xOffset + n[0], l + i.yOffset + n[1])
		}
	},
	_Show : function(a, c) {
		this.el.style.display = "";
		this.el.style.zIndex = fui.getMaxZIndex();
		fui.setX(this.el, a);
		fui.setY(this.el, c);
		this.setVisible(true);
		if (this.hideAction == "mouseout") {
			fui.on(document, "mousemove", this.__OnBodyMouseMove, this)
		}
		var b = this;
		this._doShadow();
		this._doModal();
		fui.layoutIFrames(this.el);
		this.isPopup = true;
		fui.on(document, "mousedown", this.__OnBodyMouseDown, this);
		fui.on(window, "resize", this.__OnWindowResize, this);
		this.fire("Open")
	},
	open : function() {
		this.show()
	},
	close : function() {
		this.hide()
	},
	hide : function() {
		if (!this.el) {
			return
		}
		if (this.popupEl) {
			fui.removeClass(this.popupEl, this.popupEl.popupCls)
		}
		if (this._popupEl) {
			fui.removeClass(this._popupEl, this._popupEl.popupCls)
		}
		this._popupEl = null;
		jQuery(this._modalEl).remove();
		if (this.shadowEl) {
			this.shadowEl.style.display = "none"
		}
		fui.un(document, "mousemove", this.__OnBodyMouseMove, this);
		fui.un(document, "mousedown", this.__OnBodyMouseDown, this);
		fui.un(window, "resize", this.__OnWindowResize, this);
		this.setVisible(false);
		this.isPopup = false;
		this.fire("Close")
	},
	setPopupEl : function(a) {
		a = fui.byId(a);
		if (!a) {
			return
		}
		this._unbindPopupEl();
		this.popupEl = a;
		this._bindPopupEl()
	},
	setPopupCls : function(a) {
		this.popupCls = a
	},
	setShowAction : function(a) {
		this.showAction = a
	},
	setHideAction : function(a) {
		this.hideAction = a
	},
	setShowDelay : function(a) {
		this.showDelay = a
	},
	setHideDelay : function(a) {
		this.hideDelay = a
	},
	setXAlign : function(a) {
		this.xAlign = a
	},
	setYAlign : function(a) {
		this.yAlign = a
	},
	setxOffset : function(a) {
		a = parseInt(a);
		if (isNaN(a)) {
			a = 0
		}
		this.xOffset = a
	},
	setyOffset : function(a) {
		a = parseInt(a);
		if (isNaN(a)) {
			a = 0
		}
		this.yOffset = a
	},
	setShowModal : function(a) {
		this.showModal = a
	},
	setShowShadow : function(a) {
		this.showShadow = a
	},
	setMinWidth : function(a) {
		if (isNaN(a)) {
			return
		}
		this.minWidth = a
	},
	setMinHeight : function(a) {
		if (isNaN(a)) {
			return
		}
		this.minHeight = a
	},
	setMaxWidth : function(a) {
		if (isNaN(a)) {
			return
		}
		this.maxWidth = a
	},
	setMaxHeight : function(a) {
		if (isNaN(a)) {
			return
		}
		this.maxHeight = a
	},
	setAllowDrag : function(a) {
		this.allowDrag = a;
		fui.removeClass(this.el, this._dragCls);
		if (a) {
			fui.addClass(this.el, this._dragCls)
		}
	},
	setAllowResize : function(a) {
		this.allowResize = a;
		fui.removeClass(this.el, this._resizeCls);
		if (a) {
			fui.addClass(this.el, this._resizeCls)
		}
	},
	__OnLeftClick : function(b) {
		if (this._inAniming) {
			return
		}
		if (this.showAction != "leftclick") {
			return
		}
		var a = jQuery(this.popupEl).attr("allowPopup");
		if (String(a) == "false") {
			return
		}
		this.doShow(b)
	},
	__OnRightClick : function(b) {
		if (this._inAniming) {
			return
		}
		if (this.showAction != "rightclick") {
			return
		}
		var a = jQuery(this.popupEl).attr("allowPopup");
		if (String(a) == "false") {
			return
		}
		b.preventDefault();
		this.doShow(b)
	},
	__OnMouseOver : function(c) {
		if (this._inAniming) {
			return
		}
		if (this.showAction != "mouseover") {
			return
		}
		var a = jQuery(this.popupEl).attr("allowPopup");
		if (String(a) == "false") {
			return
		}
		clearTimeout(this._hideTimer);
		this._hideTimer = null;
		if (this.isPopup) {
			return
		}
		var b = this;
		this._showTimer = setTimeout(function() {
			b.doShow(c)
		}, this.showDelay)
	},
	__OnBodyMouseMove : function(a) {
		if (this.hideAction != "mouseout") {
			return
		}
		this._tryHide(a)
	},
	__OnBodyMouseDown : function(a) {
		if (this.hideAction != "outerclick") {
			return
		}
		if (!this.isPopup) {
			return
		}
		if (this.within(a)
				|| (this.popupEl && fui.isAncestor(this.popupEl, a.target))) {
		} else {
			this.doHide(a)
		}
	},
	_tryHide : function(b) {
		if (fui.isAncestor(this.el, b.target)
				|| (this.popupEl && fui.isAncestor(this.popupEl, b.target))) {
		} else {
			clearTimeout(this._showTimer);
			this._showTimer = null;
			if (this._hideTimer) {
				return
			}
			var a = this;
			this._hideTimer = setTimeout(function() {
				a.doHide(b)
			}, this.hideDelay)
		}
	},
	__OnWindowResize : function(a) {
		if (this.isDisplay() && !fui.isIE6) {
			this._doModal()
		}
	},
	within : function(f) {
		if (fui.isAncestor(this.el, f.target)) {
			return true
		}
		var b = fui.getChildControls(this);
		for (var d = 0, a = b.length; d < a; d++) {
			var g = b[d];
			if (g.within(f)) {
				return true
			}
		}
		return false
	}
};
fui.copyTo(fui.Popup.prototype, fui.Popup_prototype);
fui.Button = function() {
	fui.Button.superclass.constructor.call(this)
};
fui.extend(fui.Button, fui.Control, {
	text : "",
	iconCls : "",
	iconStyle : "",
	plain : false,
	checkOnClick : false,
	checked : false,
	groupName : "",
	_plainCls : "fui-button-plain",
	_hoverCls : "fui-button-hover",
	_pressedCls : "fui-button-pressed",
	_checkedCls : "fui-button-checked",
	_disabledCls : "fui-button-disabled",
	allowCls : "",
	_clearBorder : false,
	set : function(a) {
		if (typeof a == "string") {
			return this
		}
		this._allowUpdate = a.text || a.iconStyle || a.iconCls
				|| a.iconPosition;
		fui.Button.superclass.set.call(this, a);
		if (this._allowUpdate === false) {
			this._allowUpdate = true;
			this.doUpdate()
		}
		return this
	},
	uiCls : "fui-button",
	_create : function() {
		this.el = document.createElement("a");
		this.el.className = "fui-button";
		this.el.hideFocus = true;
		this.el.href = "javascript:void(0)";
		this.doUpdate()
	},
	_initEvents : function() {
		fui._BindEvents(function() {
			fui_onOne(this.el, "mousedown", this.__OnMouseDown, this);
			fui_onOne(this.el, "click", this.__OnClick, this)
		}, this)
	},
	destroy : function(a) {
		if (this.el) {
			this.el.onclick = null;
			this.el.onmousedown = null
		}
		if (this.menu) {
			this.menu.owner = null
		}
		this.menu = null;
		fui.Button.superclass.destroy.call(this, a)
	},
	doUpdate : function() {
		if (this._allowUpdate === false) {
			return
		}
		var a = "", c = this.text;
		if (this.iconCls && c) {
			a = " fui-button-icon " + this.iconCls
		} else {
			if (this.iconCls && c === "") {
				a = " fui-button-iconOnly " + this.iconCls;
				c = "&nbsp;"
			} else {
				if (c == "") {
					c = "&nbsp;"
				}
			}
		}
		var b = '<span class="fui-button-text ' + a + '">' + c + "</span>";
		if (this.allowCls) {
			b = b + '<span class="fui-button-allow ' + this.allowCls
					+ '"></span>'
		}
		this.el.innerHTML = b
	},
	href : "",
	setHref : function(b) {
		this.href = b;
		this.el.href = b;
		var a = this.el;
		setTimeout(function() {
			a.onclick = null
		}, 100)
	},
	getHref : function() {
		return this.href
	},
	target : "",
	setTarget : function(a) {
		this.target = a;
		this.el.target = a
	},
	getTarget : function() {
		return this.target
	},
	setText : function(a) {
		if (this.text != a) {
			this.text = a;
			this.doUpdate()
		}
	},
	getText : function() {
		return this.text
	},
	setIconCls : function(a) {
		this.iconCls = a;
		this.doUpdate()
	},
	getIconCls : function() {
		return this.iconCls
	},
	setIconStyle : function(a) {
		this.iconStyle = a;
		this.doUpdate()
	},
	getIconStyle : function() {
		return this.iconStyle
	},
	setIconPosition : function(a) {
		this.iconPosition = "left";
		this.doUpdate()
	},
	getIconPosition : function() {
		return this.iconPosition
	},
	setPlain : function(a) {
		this.plain = a;
		if (a) {
			this.addCls(this._plainCls)
		} else {
			this.removeCls(this._plainCls)
		}
	},
	getPlain : function() {
		return this.plain
	},
	setGroupName : function(a) {
		this.groupName = a
	},
	getGroupName : function() {
		return this.groupName
	},
	setCheckOnClick : function(a) {
		this.checkOnClick = a
	},
	getCheckOnClick : function() {
		return this.checkOnClick
	},
	setChecked : function(b) {
		var a = this.checked != b;
		this.checked = b;
		if (b) {
			this.addCls(this._checkedCls)
		} else {
			this.removeCls(this._checkedCls)
		}
		if (a) {
			this.fire("CheckedChanged")
		}
	},
	getChecked : function() {
		return this.checked
	},
	doClick : function() {
		this.__OnClick(null)
	},
	__OnClick : function(f) {
		if (!this.href) {
			f.preventDefault()
		}
		if (this.readOnly || this.enabled == false) {
			return
		}
		this.focus();
		if (this.checkOnClick) {
			if (this.groupName) {
				var g = this.groupName;
				var d = fui.findControls(function(e) {
					if (e.type == "button" && e.groupName == g) {
						return true
					}
				});
				if (d.length > 0) {
					for (var c = 0, a = d.length; c < a; c++) {
						var b = d[c];
						if (b != this) {
							b.setChecked(false)
						}
					}
					this.setChecked(true)
				} else {
					this.setChecked(!this.checked)
				}
			} else {
				this.setChecked(!this.checked)
			}
		}
		this.fire("click", {
			htmlEvent : f
		})
	},
	__OnMouseDown : function(a) {
		if (this.isReadOnly()) {
			return
		}
		this.addCls(this._pressedCls);
		fui.on(document, "mouseup", this.__OnDocMouseUp, this)
	},
	__OnDocMouseUp : function(a) {
		this.removeCls(this._pressedCls);
		fui.un(document, "mouseup", this.__OnDocMouseUp, this)
	},
	onClick : function(b, a) {
		this.on("click", b, a)
	},
	getAttrs : function(b) {
		var a = fui.Button.superclass.getAttrs.call(this, b);
		a.text = b.innerHTML;
		fui._ParseString(b, a, [ "text", "href", "iconCls", "iconStyle",
				"iconPosition", "groupName", "menu", "onclick",
				"oncheckedchanged", "target" ]);
		fui._ParseBool(b, a, [ "plain", "checkOnClick", "checked" ]);
		return a
	}
});
fui.regClass(fui.Button, "button");
fui.MenuButton = function() {
	fui.MenuButton.superclass.constructor.call(this)
};
fui.extend(fui.MenuButton, fui.Button, {
	uiCls : "fui-menubutton",
	allowCls : "fui-button-menu",
	setMenu : function(b) {
		if (fui.isArray(b)) {
			b = {
				type : "menu",
				items : b
			}
		}
		if (typeof b == "string") {
			var a = fui.byId(b);
			if (!a) {
				return
			}
			fui.parse(b);
			b = fui.get(b)
		}
		if (this.menu !== b) {
			this.menu = fui.getAndCreate(b);
			this.menu.setPopupEl(this.el);
			this.menu.setPopupCls("fui-button-popup");
			this.menu.setShowAction("leftclick");
			this.menu.setHideAction("outerclick");
			this.menu.setXAlign("left");
			this.menu.setYAlign("below");
			this.menu.hide();
			this.menu.owner = this
		}
	},
	setEnabled : function(a) {
		this.enabled = a;
		if (a) {
			this.removeCls(this._disabledCls)
		} else {
			this.addCls(this._disabledCls)
		}
		jQuery(this.el).attr("allowPopup", !!a)
	}
});
fui.regClass(fui.MenuButton, "menubutton");
fui.SplitButton = function() {
	fui.SplitButton.superclass.constructor.call(this)
};
fui.extend(fui.SplitButton, fui.MenuButton, {
	uiCls : "fui-splitbutton",
	allowCls : "fui-button-split"
});
fui.regClass(fui.SplitButton, "splitbutton");
fui.CheckBox = function() {
	fui.CheckBox.superclass.constructor.call(this)
};
fui.extend(fui.CheckBox, fui.Control, {
	formField : true,
	_clearText : false,
	text : "",
	checked : false,
	defaultValue : false,
	trueValue : true,
	falseValue : false,
	uiCls : "fui-checkbox",
	_create : function() {
		var a = this.uid + "$check";
		this.el = document.createElement("span");
		this.el.className = "fui-checkbox";
		this.el.innerHTML = '<input id="' + a + '" name="' + this.id
				+ '" type="checkbox" class="fui-checkbox-check"><label for="'
				+ a + '" onclick="return false;">' + this.text + "</label>";
		this._checkEl = this.el.firstChild;
		this._labelEl = this.el.lastChild
	},
	destroy : function(a) {
		if (this._checkEl) {
			this._checkEl.onmouseup = null;
			this._checkEl.onclick = null;
			this._checkEl = null
		}
		fui.CheckBox.superclass.destroy.call(this, a)
	},
	_initEvents : function() {
		fui._BindEvents(function() {
			fui.on(this.el, "click", this.__onClick, this);
			this._checkEl.onmouseup = function() {
				return false
			};
			var a = this;
			this._checkEl.onclick = function() {
				if (a.isReadOnly()) {
					return false
				}
			}
		}, this)
	},
	setName : function(a) {
		this.name = a;
		fui.setAttr(this._checkEl, "name", this.name)
	},
	setText : function(a) {
		if (this.text !== a) {
			this.text = a;
			this._labelEl.innerHTML = a
		}
	},
	getText : function() {
		return this.text
	},
	setChecked : function(a) {
		if (a === true) {
			a = true
		} else {
			if (a == this.trueValue) {
				a = true
			} else {
				if (a == "true") {
					a = true
				} else {
					if (a === 1) {
						a = true
					} else {
						if (a == "Y") {
							a = true
						} else {
							a = false
						}
					}
				}
			}
		}
		if (this.checked !== a) {
			this.checked = !!a;
			this._checkEl.checked = this.checked;
			this.value = this.getValue()
		}
	},
	getChecked : function() {
		return this.checked
	},
	setValue : function(a) {
		if (this.checked != a) {
			this.setChecked(a);
			this.value = this.getValue()
		}
	},
	getValue : function() {
		return String(this.checked == true ? this.trueValue : this.falseValue)
	},
	getFormValue : function() {
		return this.getValue()
	},
	setTrueValue : function(a) {
		this._checkEl.value = a;
		this.trueValue = a
	},
	getTrueValue : function() {
		return this.trueValue
	},
	setFalseValue : function(a) {
		this.falseValue = a
	},
	getFalseValue : function() {
		return this.falseValue
	},
	__onClick : function(a) {
		if (this.isReadOnly()) {
			return
		}
		this.setChecked(!this.checked);
		this.fire("checkedchanged", {
			checked : this.checked
		});
		this.fire("valuechanged", {
			value : this.getValue()
		});
		this.fire("click", a, this)
	},
	getAttrs : function(c) {
		var b = fui.CheckBox.superclass.getAttrs.call(this, c);
		var f = jQuery(c);
		b.text = c.innerHTML;
		fui._ParseString(c, b, [ "text", "oncheckedchanged", "onclick",
				"onvaluechanged" ]);
		fui._ParseBool(c, b, [ "enabled" ]);
		var e = fui.getAttr(c, "checked");
		if (e) {
			b.checked = (e == "true" || e == "checked") ? true : false
		}
		var a = f.attr("trueValue");
		if (a) {
			b.trueValue = a;
			a = parseInt(a);
			if (!isNaN(a)) {
				b.trueValue = a
			}
		}
		var d = f.attr("falseValue");
		if (d) {
			b.falseValue = d;
			d = parseInt(d);
			if (!isNaN(d)) {
				b.falseValue = d
			}
		}
		return b
	}
});
fui.regClass(fui.CheckBox, "checkbox");
fui.ButtonEdit = function() {
	fui.ButtonEdit.superclass.constructor.call(this);
	var a = this.isReadOnly();
	if (a || this.allowInput == false) {
		this._textEl.readOnly = true
	}
	if (this.enabled == false) {
		this.addCls(this._disabledCls)
	}
	if (a) {
		this.addCls(this._readOnlyCls)
	}
	if (this.required) {
		this.addCls(this._requiredCls)
	}
};
fui
		.extend(
				fui.ButtonEdit,
				fui.ValidatorBase,
				{
					name : "",
					formField : true,
					selectOnFocus : false,
					showClose : false,
					emptyText : "",
					defaultValue : "",
					defaultText : "",
					value : "",
					text : "",
					maxLength : 1000,
					minLength : 0,
					height : 21,
					inputAsValue : false,
					allowInput : true,
					_noInputCls : "fui-buttonedit-noInput",
					_readOnlyCls : "fui-buttonedit-readOnly",
					_disabledCls : "fui-buttonedit-disabled",
					_emptyCls : "fui-buttonedit-empty",
					_focusCls : "fui-buttonedit-focus",
					_buttonCls : "fui-buttonedit-button",
					_buttonHoverCls : "fui-buttonedit-button-hover",
					_buttonPressedCls : "fui-buttonedit-button-pressed",
					_closeCls : "fui-buttonedit-close",
					set : function(b) {
						if (typeof b == "string") {
							return this
						}
						var a = b.value;
						delete b.value;
						var c = b.text;
						delete b.text;
						this._allowUpdate = !(b.enabled == false
								|| b.allowInput == false || b.readOnly);
						fui.ButtonEdit.superclass.set.call(this, b);
						if (this._allowUpdate === false) {
							this._allowUpdate = true;
							this.doUpdate()
						}
						if (!fui.isNull(c)) {
							this.setText(c)
						}
						if (!fui.isNull(a)) {
							this.setValue(a)
						}
						return this
					},
					uiCls : "fui-buttonedit",
					_getButtonsHTML : function() {
						var a = '<span class="fui-buttonedit-close"></span>'
								+ this._getButtonHtml();
						return '<span class="fui-buttonedit-buttons">' + a
								+ "</span>"
					},
					_getButtonHtml : function() {
						var a = "onmouseover=\"fui.addClass(this, '"
								+ this._buttonHoverCls
								+ "');\" onmouseout=\"fui.removeClass(this, '"
								+ this._buttonHoverCls + "');\"";
						return '<span class="fui-buttonedit-button" '
								+ a
								+ '><span class="fui-buttonedit-icon"></span></span>'
					},
					_create : function() {
						this.el = document.createElement("span");
						this.el.className = "fui-buttonedit";
						var a = this._getButtonsHTML();
						this.el.innerHTML = '<span class="fui-buttonedit-border"><input type="input" class="fui-buttonedit-input" autocomplete="off"/>'
								+ a
								+ '</span><input name="'
								+ this.name
								+ '" type="hidden"/>';
						this._borderEl = this.el.firstChild;
						this._textEl = this._borderEl.firstChild;
						this._valueEl = this.el.lastChild;
						this._buttonsEl = this._borderEl.lastChild;
						this._buttonEl = this._buttonsEl.lastChild;
						this._closeEl = this._buttonEl.previousSibling;
						this._doEmpty()
					},
					destroy : function(a) {
						if (this.el) {
							this.el.onmousedown = null;
							this.el.onmousewheel = null;
							this.el.onmouseover = null;
							this.el.onmouseout = null
						}
						if (this._textEl) {
							this._textEl.onchange = null;
							this._textEl.onfocus = null;
							fui.clearEvent(this._textEl);
							this._textEl = null
						}
						fui.ButtonEdit.superclass.destroy.call(this, a)
					},
					_initEvents : function() {
						fui._BindEvents(function() {
							fui_onOne(this.el, "mousedown",
									this.__OnMouseDown, this);
							fui_onOne(this._textEl, "focus", this.__OnFocus,
									this);
							fui_onOne(this._textEl, "change",
									this.__OnInputTextChanged, this);
							var a = this.text;
							this.text = null;
							this.setText(a)
						}, this)
					},
					_inputEventsInited : false,
					_initInputEvents : function() {
						if (this._inputEventsInited) {
							return
						}
						this._inputEventsInited = true;
						fui.on(this.el, "click", this.__OnClick, this);
						fui.on(this._textEl, "blur", this.__OnBlur, this);
						fui.on(this._textEl, "keydown", this.__OnInputKeyDown,
								this);
						fui
								.on(this._textEl, "keyup", this.__OnInputKeyUp,
										this);
						fui.on(this._textEl, "keypress",
								this.__OnInputKeyPress, this)
					},
					_buttonWidth : 20,
					_closeWidth : 20,
					_doInputLayout : function(b) {
						if (this._closeEl) {
							this._closeEl.style.display = this.showClose ? "inline-block"
									: "none"
						}
						var a = this._buttonsEl.offsetWidth + 2;
						if (a == 2) {
							this._noLayout = true
						} else {
							this._noLayout = false
						}
						this._borderEl.style.paddingRight = a + "px";
						if (b !== false) {
							this.doLayout()
						}
					},
					doLayout : function() {
						if (this._noLayout) {
							this._doInputLayout(false)
						}
					},
					setHeight : function(a) {
						if (parseInt(a) == a) {
							a += "px"
						}
						this.height = a
					},
					focus : function() {
						try {
							this._textEl.focus();
							var a = this;
							setTimeout(function() {
								if (a._focused) {
									a._textEl.focus()
								}
							}, 10)
						} catch (b) {
						}
					},
					blur : function() {
						try {
							this._textEl.blur()
						} catch (a) {
						}
					},
					selectText : function() {
						this._textEl.select()
					},
					getTextEl : function() {
						return this._textEl
					},
					setName : function(a) {
						this.name = a;
						if (this._valueEl) {
							fui.setAttr(this._valueEl, "name", this.name)
						}
					},
					setText : function(b) {
						if (b === null || b === undefined) {
							b = ""
						}
						var a = this.text !== b;
						this.text = b;
						this._textEl.value = b;
						this._doEmpty()
					},
					getText : function() {
						var a = this._textEl.value;
						return a
					},
					setValue : function(b) {
						if (b === null || b === undefined) {
							b = ""
						}
						var a = this.value !== b;
						this.value = b;
						this._valueEl.value = this.getFormValue()
					},
					getValue : function() {
						return this.value
					},
					getFormValue : function() {
						var a = this.value;
						if (a === null || a === undefined) {
							a = ""
						}
						return String(a)
					},
					_doEmpty : function() {
						this._textEl.placeholder = this.emptyText;
						if (this.emptyText) {
							fui._placeholder(this._textEl)
						}
					},
					setEmptyText : function(a) {
						if (this.emptyText != a) {
							this.emptyText = a;
							this._doEmpty()
						}
					},
					getEmptyText : function() {
						return this.emptyText
					},
					setMaxLength : function(a) {
						a = parseInt(a);
						if (isNaN(a)) {
							return
						}
						this.maxLength = a;
						this._textEl.maxLength = a
					},
					getMaxLength : function() {
						return this.maxLength
					},
					setMinLength : function(a) {
						a = parseInt(a);
						if (isNaN(a)) {
							return
						}
						this.minLength = a
					},
					getMinLength : function() {
						return this.minLength
					},
					setEnabled : function(a) {
						fui.ButtonEdit.superclass.setEnabled.call(this, a);
						this._tryValidate()
					},
					_doReadOnly : function() {
						var a = this.isReadOnly();
						if (a || this.allowInput == false) {
							this._textEl.readOnly = true
						} else {
							this._textEl.readOnly = false
						}
						if (a) {
							this.addCls(this._readOnlyCls)
						} else {
							this.removeCls(this._readOnlyCls)
						}
						if (this.allowInput) {
							this.removeCls(this._noInputCls)
						} else {
							this.addCls(this._noInputCls)
						}
						if (this.enabled) {
							this._textEl.disabled = false
						} else {
							this._textEl.disabled = true
						}
					},
					setAllowInput : function(a) {
						this.allowInput = a;
						this._doReadOnly()
					},
					getAllowInput : function() {
						return this.allowInput
					},
					setInputAsValue : function(a) {
						this.inputAsValue = a
					},
					getInputAsValue : function() {
						return this.inputAsValue
					},
					_errorIconEl : null,
					getErrorIconEl : function() {
						if (!this._errorIconEl) {
							this._errorIconEl = fui.append(this.el,
									'<span class="fui-errorIcon"></span>')
						}
						return this._errorIconEl
					},
					_RemoveErrorIcon : function() {
						if (this._errorIconEl) {
							var a = this._errorIconEl;
							jQuery(a).remove()
						}
						this._errorIconEl = null
					},
					__OnClick : function(b) {
						if (this.isReadOnly() || this.enabled == false) {
							return
						}
						if (!fui.isAncestor(this._borderEl, b.target)) {
							return
						}
						var a = new Date();
						if (fui.isAncestor(this._buttonEl, b.target)) {
							this._OnButtonClick(b)
						}
						if (fui.findParent(b.target, this._closeCls)) {
							this.fire("closeclick", {
								htmlEvent : b
							})
						}
					},
					__OnMouseDown : function(c) {
						if (this.isReadOnly() || this.enabled == false) {
							return
						}
						if (!fui.isAncestor(this._borderEl, c.target)) {
							return
						}
						if (!fui.isAncestor(this._textEl, c.target)) {
							this._clickTarget = c.target;
							var b = this;
							setTimeout(function() {
								b.focus();
								fui.selectRange(b._textEl, 1000, 1000)
							}, 1);
							if (fui.isAncestor(this._buttonEl, c.target)) {
								var a = fui.findParent(c.target,
										"fui-buttonedit-up");
								var d = fui.findParent(c.target,
										"fui-buttonedit-down");
								if (a) {
									fui.addClass(a, this._buttonPressedCls);
									this._OnButtonMouseDown(c, "up")
								} else {
									if (d) {
										fui.addClass(d, this._buttonPressedCls);
										this._OnButtonMouseDown(c, "down")
									} else {
										fui.addClass(this._buttonEl,
												this._buttonPressedCls);
										this._OnButtonMouseDown(c)
									}
								}
								fui.on(document, "mouseup",
										this.__OnDocMouseUp, this)
							}
						}
					},
					__OnDocMouseUp : function(b) {
						this._clickTarget = null;
						var a = this;
						setTimeout(function() {
							var e = a._buttonEl.getElementsByTagName("*");
							for (var d = 0, c = e.length; d < c; d++) {
								fui.removeClass(e[d], a._buttonPressedCls)
							}
							fui.removeClass(a._buttonEl, a._buttonPressedCls);
							fui.removeClass(a.el, a._pressedCls)
						}, 80);
						fui.un(document, "mouseup", this.__OnDocMouseUp, this)
					},
					__OnFocus : function(a) {
						this.doUpdate();
						this._initInputEvents();
						if (this.isReadOnly()) {
							return
						}
						this._focused = true;
						this.addCls(this._focusCls);
						if (this.selectOnFocus) {
							this.selectText()
						}
						this.fire("focus", {
							htmlEvent : a
						})
					},
					__doFocusCls : function() {
						if (this._focused == false) {
							this.removeCls(this._focusCls)
						}
					},
					__fireBlur : function(c) {
						this._focused = false;
						var a = this;
						function b() {
							if (a._focused == false) {
								a.removeCls(a._focusCls)
							}
						}
						setTimeout(function() {
							b.call(a)
						}, 2);
						this.fire("blur", {
							htmlEvent : c
						})
					},
					__OnBlur : function(b) {
						var a = this;
						setTimeout(function() {
							a.__fireBlur(b)
						}, 10);
						if (this.validateOnLeave) {
							this._tryValidate()
						}
					},
					__OnInputKeyDown : function(d) {
						var a = {
							htmlEvent : d
						};
						this.fire("keydown", a);
						if (d.keyCode == 8
								&& (this.isReadOnly() || this.allowInput == false)) {
							return false
						}
						if (d.keyCode == 13 || d.keyCode == 9) {
							var c = this;
							c.__OnInputTextChanged(null);
							if (d.keyCode == 13) {
								var b = this;
								b.fire("enter", a)
							}
						}
						if (d.keyCode == 27) {
							d.preventDefault()
						}
					},
					__OnInputTextChanged : function() {
						var a = this._textEl.value;
						if (a == this.text) {
							return
						}
						var b = this.getValue();
						this.setValue(a);
						if (b !== this.getFormValue()) {
							this._OnValueChanged()
						}
					},
					__OnInputKeyUp : function(a) {
						this.fire("keyup", {
							htmlEvent : a
						})
					},
					__OnInputKeyPress : function(a) {
						this.fire("keypress", {
							htmlEvent : a
						})
					},
					_OnButtonClick : function(a) {
						var b = {
							htmlEvent : a,
							cancel : false
						};
						this.fire("beforebuttonclick", b);
						if (b.cancel == true) {
							return
						}
						this.fire("buttonclick", b)
					},
					_OnButtonMouseDown : function(a, b) {
						this.focus();
						this.addCls(this._focusCls);
						this.fire("buttonmousedown", {
							htmlEvent : a,
							spinType : b
						})
					},
					onButtonClick : function(b, a) {
						this.on("buttonclick", b, a)
					},
					onButtonMouseDown : function(b, a) {
						this.on("buttonmousedown", b, a)
					},
					onTextChanged : function(b, a) {
						this.on("textchanged", b, a)
					},
					textName : "",
					setTextName : function(a) {
						this.textName = a;
						if (this._textEl) {
							fui.setAttr(this._textEl, "name", this.textName)
						}
					},
					getTextName : function() {
						return this.textName
					},
					setSelectOnFocus : function(a) {
						this.selectOnFocus = a
					},
					getSelectOnFocus : function(a) {
						return this.selectOnFocus
					},
					setShowClose : function(a) {
						this.showClose = a;
						this._doInputLayout()
					},
					getShowClose : function(a) {
						return this.showClose
					},
					inputStyle : "",
					setInputStyle : function(a) {
						this.inputStyle = a;
						fui.setStyle(this._textEl, a)
					},
					getAttrs : function(b) {
						var a = fui.ButtonEdit.superclass.getAttrs
								.call(this, b);
						var c = jQuery(b);
						fui._ParseString(b, a, [ "value", "text", "textName",
								"emptyText", "inputStyle", "defaultText",
								"onenter", "onkeydown", "onkeyup",
								"onkeypress", "onbuttonclick",
								"onbuttonmousedown", "ontextchanged",
								"onfocus", "onblur", "oncloseclick" ]);
						fui._ParseBool(b, a, [ "allowInput", "inputAsValue",
								"selectOnFocus", "showClose" ]);
						fui._ParseInt(b, a, [ "maxLength", "minLength" ]);
						return a
					}
				});
fui.regClass(fui.ButtonEdit, "buttonedit");
fui.TextBox = function() {
	fui.TextBox.superclass.constructor.call(this)
};
fui
		.extend(
				fui.TextBox,
				fui.ValidatorBase,
				{
					name : "",
					formField : true,
					selectOnFocus : false,
					minWidth : 10,
					minHeight : 15,
					maxLength : 5000,
					emptyText : "",
					text : "",
					value : "",
					defaultValue : "",
					height : 21,
					_emptyCls : "fui-textbox-empty",
					_focusCls : "fui-textbox-focus",
					_disabledCls : "fui-textbox-disabled",
					uiCls : "fui-textbox",
					_InputType : "text",
					_create : function() {
						var a = '<input  type="'
								+ this._InputType
								+ '" class="fui-textbox-input" autocomplete="off"/>';
						if (this._InputType == "textarea") {
							a = '<textarea  class="fui-textbox-input" autocomplete="off"/></textarea>'
						}
						a = '<span class="fui-textbox-border">' + a + "</span>";
						a += '<input type="hidden"/>';
						this.el = document.createElement("span");
						this.el.className = "fui-textbox";
						this.el.innerHTML = a;
						this._borderEl = this.el.firstChild;
						this._textEl = this._borderEl.firstChild;
						this._valueEl = this._borderEl.lastChild;
						this._doEmpty()
					},
					_initEvents : function() {
						fui._BindEvents(function() {
							fui_onOne(this._textEl, "drop", this.__OnDropText,
									this);
							fui_onOne(this._textEl, "change",
									this.__OnInputTextChanged, this);
							fui_onOne(this._textEl, "focus", this.__OnFocus,
									this);
							fui_onOne(this.el, "mousedown",
									this.__OnMouseDown, this);
							var a = this.value;
							this.value = null;
							this.setValue(a)
						}, this);
						this.on("validation", this.__OnValidation, this)
					},
					_inputEventsInited : false,
					_initInputEvents : function() {
						if (this._inputEventsInited) {
							return
						}
						this._inputEventsInited = true;
						fui.on(this._textEl, "blur", this.__OnBlur, this);
						fui.on(this._textEl, "keydown", this.__OnInputKeyDown,
								this);
						fui
								.on(this._textEl, "keyup", this.__OnInputKeyUp,
										this);
						fui.on(this._textEl, "keypress",
								this.__OnInputKeyPress, this)
					},
					destroy : function(a) {
						if (this.el) {
							this.el.onmousedown = null
						}
						if (this._textEl) {
							this._textEl.ondrop = null;
							this._textEl.onchange = null;
							this._textEl.onfocus = null;
							fui.clearEvent(this._textEl);
							this._textEl = null
						}
						if (this._valueEl) {
							fui.clearEvent(this._valueEl);
							this._valueEl = null
						}
						fui.TextBox.superclass.destroy.call(this, a)
					},
					doLayout : function() {
					},
					setHeight : function(a) {
						if (parseInt(a) == a) {
							a += "px"
						}
						this.height = a;
						if (this._InputType == "textarea") {
							this.el.style.height = a;
							this.doLayout()
						}
					},
					setName : function(a) {
						if (this.name != a) {
							this.name = a;
							if (this._valueEl) {
								fui.setAttr(this._valueEl, "name", this.name)
							}
						}
					},
					setValue : function(a) {
						if (a === null || a === undefined) {
							a = ""
						}
						a = String(a);
						if (a.length > this.maxLength) {
							a = a.substring(0, this.maxLength)
						}
						if (this.value !== a) {
							this.value = a;
							this._valueEl.value = this._textEl.value = a;
							this._doEmpty()
						}
					},
					getValue : function() {
						return this.value
					},
					getFormValue : function() {
						var a = this.value;
						if (a === null || a === undefined) {
							a = ""
						}
						return String(a)
					},
					setAllowInput : function(a) {
						if (this.allowInput != a) {
							this.allowInput = a;
							this.doUpdate()
						}
					},
					getAllowInput : function() {
						return this.allowInput
					},
					_placeholdered : false,
					_doEmpty : function() {
						this._textEl.placeholder = this.emptyText;
						if (this.emptyText) {
							fui._placeholder(this._textEl)
						}
					},
					setEmptyText : function(a) {
						if (this.emptyText != a) {
							this.emptyText = a;
							this._doEmpty()
						}
					},
					getEmptyText : function() {
						return this.emptyText
					},
					setMaxLength : function(a) {
						this.maxLength = a;
						fui.setAttr(this._textEl, "maxLength", a);
						if (this._InputType == "textarea" && fui.isIE) {
							fui.on(this._textEl, "keypress",
									this.__OnMaxLengthKeyUp, this)
						}
					},
					__OnMaxLengthKeyUp : function(a) {
						if (this._textEl.value.length >= this.maxLength) {
							a.preventDefault()
						}
					},
					getMaxLength : function() {
						return this.maxLength
					},
					setReadOnly : function(a) {
						if (this.readOnly != a) {
							this.readOnly = a;
							this.doUpdate()
						}
					},
					setEnabled : function(a) {
						if (this.enabled != a) {
							this.enabled = a;
							this.doUpdate();
							this._tryValidate()
						}
					},
					doUpdate : function() {
						if (this.enabled) {
							this.removeCls(this._disabledCls)
						} else {
							this.addCls(this._disabledCls)
						}
						if (this.isReadOnly() || this.allowInput == false) {
							this._textEl.readOnly = true;
							fui.addClass(this.el, "fui-textbox-readOnly")
						} else {
							this._textEl.readOnly = false;
							fui.removeClass(this.el, "fui-textbox-readOnly")
						}
						if (this.required) {
							this.addCls(this._requiredCls)
						} else {
							this.removeCls(this._requiredCls)
						}
						if (this.enabled) {
							this._textEl.disabled = false
						} else {
							this._textEl.disabled = true
						}
					},
					focus : function() {
						try {
							this._textEl.focus()
						} catch (a) {
						}
					},
					blur : function() {
						try {
							this._textEl.blur()
						} catch (a) {
						}
					},
					selectText : function() {
						var b = this;
						function a() {
							try {
								b._textEl.select()
							} catch (c) {
							}
						}
						a();
						setTimeout(function() {
							a()
						}, 30)
					},
					getTextEl : function() {
						return this._textEl
					},
					getInputText : function() {
						return this._textEl.value
					},
					setSelectOnFocus : function(a) {
						this.selectOnFocus = a
					},
					getSelectOnFocus : function(a) {
						return this.selectOnFocus
					},
					_errorIconEl : null,
					getErrorIconEl : function() {
						if (!this._errorIconEl) {
							this._errorIconEl = fui.append(this.el,
									'<span class="fui-errorIcon"></span>')
						}
						return this._errorIconEl
					},
					_RemoveErrorIcon : function() {
						if (this._errorIconEl) {
							var a = this._errorIconEl;
							jQuery(a).remove()
						}
						this._errorIconEl = null
					},
					__OnMouseDown : function(b) {
						var a = this;
						if (!fui.isAncestor(this._textEl, b.target)) {
							setTimeout(function() {
								a.focus();
								fui.selectRange(a._textEl, 1000, 1000)
							}, 1)
						} else {
							setTimeout(function() {
								try {
									a._textEl.focus()
								} catch (c) {
								}
							}, 1)
						}
					},
					__OnInputTextChanged : function(c, a) {
						var b = this.value;
						this.setValue(this._textEl.value);
						if (b !== this.getValue() || a === true) {
							this._OnValueChanged()
						}
					},
					__OnDropText : function(b) {
						var a = this;
						setTimeout(function() {
							a.__OnInputTextChanged(b)
						}, 0)
					},
					__OnInputKeyDown : function(c) {
						var a = {
							htmlEvent : c
						};
						this.fire("keydown", a);
						if (c.keyCode == 8
								&& (this.isReadOnly() || this.allowInput == false)) {
							return false
						}
						if (c.keyCode == 13 || c.keyCode == 9) {
							if (this._InputType == "textarea"
									&& c.keyCode == 13) {
							} else {
								this.__OnInputTextChanged(null, true);
								if (c.keyCode == 13) {
									var b = this;
									b.fire("enter", a)
								}
							}
						}
						if (c.keyCode == 27) {
							c.preventDefault()
						}
					},
					__OnInputKeyUp : function(a) {
						this.fire("keyup", {
							htmlEvent : a
						})
					},
					__OnInputKeyPress : function(a) {
						this.fire("keypress", {
							htmlEvent : a
						})
					},
					__OnFocus : function(a) {
						this.doUpdate();
						if (this.isReadOnly()) {
							return
						}
						this._focused = true;
						this.addCls(this._focusCls);
						this._initInputEvents();
						if (this.selectOnFocus) {
							this.selectText()
						}
						this.fire("focus", {
							htmlEvent : a
						})
					},
					__OnBlur : function(b) {
						this._focused = false;
						var a = this;
						setTimeout(function() {
							if (a._focused == false) {
								a.removeCls(a._focusCls)
							}
						}, 2);
						this.fire("blur", {
							htmlEvent : b
						});
						if (this.validateOnLeave) {
							this._tryValidate()
						}
					},
					inputStyle : "",
					setInputStyle : function(a) {
						this.inputStyle = a;
						fui.setStyle(this._textEl, a)
					},
					getAttrs : function(b) {
						var a = fui.TextBox.superclass.getAttrs.call(this, b);
						var c = jQuery(b);
						fui._ParseString(b, a, [ "value", "text", "emptyText",
								"inputStyle", "onenter", "onkeydown",
								"onkeyup", "onkeypress", "maxLengthErrorText",
								"minLengthErrorText", "onfocus", "onblur",
								"vtype", "emailErrorText", "urlErrorText",
								"floatErrorText", "intErrorText",
								"dateErrorText", "minErrorText",
								"maxErrorText", "rangeLengthErrorText",
								"rangeErrorText", "rangeCharErrorText" ]);
						fui._ParseBool(b, a, [ "allowInput", "selectOnFocus" ]);
						fui._ParseInt(b, a, [ "maxLength", "minLength",
								"minHeight", "minWidth" ]);
						return a
					},
					vtype : "",
					setVtype : function(a) {
						this.vtype = a
					},
					getVtype : function() {
						return this.vtype
					},
					__OnValidation : function(a) {
						if (a.isValid == false) {
							return
						}
						fui._ValidateVType(this.vtype, a.value, a, this)
					},
					setEmailErrorText : function(a) {
						this.emailErrorText = a
					},
					getEmailErrorText : function() {
						return this.emailErrorText
					},
					setUrlErrorText : function(a) {
						this.urlErrorText = a
					},
					getUrlErrorText : function() {
						return this.urlErrorText
					},
					setFloatErrorText : function(a) {
						this.floatErrorText = a
					},
					getFloatErrorText : function() {
						return this.floatErrorText
					},
					setIntErrorText : function(a) {
						this.intErrorText = a
					},
					getIntErrorText : function() {
						return this.intErrorText
					},
					setDateErrorText : function(a) {
						this.dateErrorText = a
					},
					getDateErrorText : function() {
						return this.dateErrorText
					},
					setMaxLengthErrorText : function(a) {
						this.maxLengthErrorText = a
					},
					getMaxLengthErrorText : function() {
						return this.maxLengthErrorText
					},
					setMinLengthErrorText : function(a) {
						this.minLengthErrorText = a
					},
					getMinLengthErrorText : function() {
						return this.minLengthErrorText
					},
					setMaxErrorText : function(a) {
						this.maxErrorText = a
					},
					getMaxErrorText : function() {
						return this.maxErrorText
					},
					setMinErrorText : function(a) {
						this.minErrorText = a
					},
					getMinErrorText : function() {
						return this.minErrorText
					},
					setRangeLengthErrorText : function(a) {
						this.rangeLengthErrorText = a
					},
					getRangeLengthErrorText : function() {
						return this.rangeLengthErrorText
					},
					setRangeCharErrorText : function(a) {
						this.rangeCharErrorText = a
					},
					getRangeCharErrorText : function() {
						return this.rangeCharErrorText
					},
					setRangeErrorText : function(a) {
						this.rangeErrorText = a
					},
					getRangeErrorText : function() {
						return this.rangeErrorText
					}
				});
fui.regClass(fui.TextBox, "textbox");
fui.Password = function() {
	fui.Password.superclass.constructor.call(this)
};
fui.extend(fui.Password, fui.TextBox, {
	uiCls : "fui-password",
	_InputType : "password",
	setEmptyText : function(a) {
		this.emptyText = ""
	}
});
fui.regClass(fui.Password, "password");
fui.TextArea = function() {
	fui.TextArea.superclass.constructor.call(this)
};
fui.extend(fui.TextArea, fui.TextBox, {
	maxLength : 10000000,
	height : "",
	minHeight : 50,
	_InputType : "textarea",
	uiCls : "fui-textarea",
	doLayout : function() {
		if (!this.canLayout()) {
			return
		}
		fui.TextArea.superclass.doLayout.call(this);
		var a = fui.getHeight(this.el);
		if (fui.isIE6) {
			fui.setHeight(this._borderEl, a)
		}
		a -= 2;
		if (a < 0) {
			a = 0
		}
		this._textEl.style.height = a + "px"
	}
});
fui.regClass(fui.TextArea, "textarea");
fui.PopupEdit = function() {
	fui.PopupEdit.superclass.constructor.call(this);
	this._createPopup();
	this.el.className += " fui-popupedit"
};
fui.extend(fui.PopupEdit, fui.ButtonEdit, {
	uiCls : "fui-popupedit",
	popup : null,
	popupCls : "fui-buttonedit-popup",
	_hoverCls : "fui-buttonedit-hover",
	_pressedCls : "fui-buttonedit-pressed",
	_destroyPopup : true,
	destroy : function(a) {
		if (this.isShowPopup()) {
			this.hidePopup()
		}
		if (this.popup) {
			if (this._destroyPopup) {
				this.popup.destroy()
			}
			this.popup = null
		}
		if (this._popupInner) {
			this._popupInner.owner = null;
			this._popupInner = null
		}
		fui.PopupEdit.superclass.destroy.call(this, a)
	},
	_initEvents : function() {
		fui.PopupEdit.superclass._initEvents.call(this);
		fui._BindEvents(function() {
			fui_onOne(this.el, "mouseover", this.__OnMouseOver, this);
			fui_onOne(this.el, "mouseout", this.__OnMouseOut, this)
		}, this)
	},
	_initButtons : function() {
		this.buttons = [];
		var a = this.createButton({
			cls : "fui-buttonedit-popup",
			iconCls : "fui-buttonedit-icons-popup",
			name : "popup"
		});
		this.buttons.push(a)
	},
	__OnBlur : function(a) {
		this._focused = false;
		if (this._clickTarget && fui.isAncestor(this.el, this._clickTarget)) {
			return
		}
		if (this.isShowPopup()) {
			return
		}
		fui.PopupEdit.superclass.__OnBlur.call(this, a)
	},
	__OnMouseOver : function(a) {
		if (this.isReadOnly() || this.allowInput) {
			return
		}
		if (fui.findParent(a.target, "fui-buttonedit-border")) {
			this.addCls(this._hoverCls)
		}
	},
	__OnMouseOut : function(a) {
		if (this.isReadOnly() || this.allowInput) {
			return
		}
		this.removeCls(this._hoverCls)
	},
	__OnMouseDown : function(a) {
		if (this.isReadOnly()) {
			return
		}
		fui.PopupEdit.superclass.__OnMouseDown.call(this, a);
		if (this.allowInput == false
				&& fui.findParent(a.target, "fui-buttonedit-border")) {
			fui.addClass(this.el, this._pressedCls);
			fui.on(document, "mouseup", this.__OnDocMouseUp, this)
		}
	},
	__OnInputKeyDown : function(a) {
		this.fire("keydown", {
			htmlEvent : a
		});
		if (a.keyCode == 8 && (this.isReadOnly() || this.allowInput == false)) {
			return false
		}
		if (a.keyCode == 9) {
			this.hidePopup();
			return
		}
		if (a.keyCode == 27) {
			this.hidePopup();
			return
		}
		if (a.keyCode == 13) {
			this.fire("enter")
		}
		if (this.isShowPopup()) {
			if (a.keyCode == 13 || a.keyCode == 27) {
				a.stopPropagation()
			}
		}
	},
	within : function(a) {
		if (fui.isAncestor(this.el, a.target)) {
			return true
		}
		if (this.popup.within(a)) {
			return true
		}
		return false
	},
	popupWidth : "100%",
	popupMinWidth : 50,
	popupMaxWidth : 2000,
	popupHeight : "",
	popupMinHeight : 30,
	popupMaxHeight : 2000,
	setPopup : function(a) {
		if (typeof a == "string") {
			fui.parse(a);
			a = fui.get(a)
		}
		var b = fui.getAndCreate(a);
		if (!b) {
			return
		}
		b.setVisible(false);
		this._popupInner = b;
		b.owner = this;
		b.on("beforebuttonclick", this.__OnPopupButtonClick, this)
	},
	getPopup : function() {
		if (!this.popup) {
			this._createPopup()
		}
		return this.popup
	},
	_createPopup : function() {
		this.popup = new fui.Popup();
		this.popup.setShowAction("none");
		this.popup.setHideAction("outerclick");
		this.popup.setPopupEl(this.el);
		this.popup.on("BeforeClose", this.__OnPopupBeforeClose, this);
		fui.on(this.popup.el, "keydown", this.__OnPopupKeyDown, this)
	},
	__OnPopupBeforeClose : function(a) {
		if (this.within(a.htmlEvent)) {
			a.cancel = true
		}
	},
	__OnPopupKeyDown : function(a) {
	},
	showPopup : function() {
		var b = {
			cancel : false
		};
		this.fire("beforeshowpopup", b);
		if (b.cancel == true) {
			return
		}
		var a = this.getPopup();
		this._syncShowPopup();
		a.on("Close", this.__OnPopupHide, this);
		this.fire("showpopup")
	},
	doLayout : function() {
		fui.PopupEdit.superclass.doLayout.call(this);
		if (this.isShowPopup()) {
		}
	},
	_syncShowPopup : function() {
		var b = this.getPopup();
		if (this._popupInner
				&& this._popupInner.el.parentNode != this.popup._contentEl) {
			this.popup._contentEl.appendChild(this._popupInner.el);
			this._popupInner.setVisible(true)
		}
		var e = this.getBox();
		var a = this.popupWidth;
		if (this.popupWidth == "100%") {
			a = e.width
		}
		b.setWidth(a);
		var d = parseInt(this.popupHeight);
		if (!isNaN(d)) {
			b.setHeight(d)
		} else {
			b.setHeight("auto")
		}
		b.setMinWidth(this.popupMinWidth);
		b.setMinHeight(this.popupMinHeight);
		b.setMaxWidth(this.popupMaxWidth);
		b.setMaxHeight(this.popupMaxHeight);
		var c = {
			xAlign : "left",
			yAlign : "below",
			outYAlign : "above",
			outXAlign : "right",
			popupCls : this.popupCls
		};
		this._doShowAtEl(this.el, c)
	},
	_doShowAtEl : function(c, b) {
		var a = this.getPopup();
		a.showAtEl(c, b)
	},
	__OnPopupHide : function(a) {
		this.__doFocusCls();
		this.fire("hidepopup")
	},
	hidePopup : function() {
		if (this.isShowPopup()) {
			var a = this.getPopup();
			a.close();
			this.blur()
		}
	},
	isShowPopup : function() {
		if (this.popup && this.popup.isDisplay()) {
			return true
		} else {
			return false
		}
	},
	setPopupWidth : function(a) {
		this.popupWidth = a
	},
	setPopupMaxWidth : function(a) {
		this.popupMaxWidth = a
	},
	setPopupMinWidth : function(a) {
		this.popupMinWidth = a
	},
	getPopupWidth : function(a) {
		return this.popupWidth
	},
	getPopupMaxWidth : function(a) {
		return this.popupMaxWidth
	},
	getPopupMinWidth : function(a) {
		return this.popupMinWidth
	},
	setPopupHeight : function(a) {
		this.popupHeight = a
	},
	setPopupMaxHeight : function(a) {
		this.popupMaxHeight = a
	},
	setPopupMinHeight : function(a) {
		this.popupMinHeight = a
	},
	getPopupHeight : function(a) {
		return this.popupHeight
	},
	getPopupMaxHeight : function(a) {
		return this.popupMaxHeight
	},
	getPopupMinHeight : function(a) {
		return this.popupMinHeight
	},
	__OnClick : function(b) {
		if (this.isReadOnly()) {
			return
		}
		if (fui.isAncestor(this._buttonEl, b.target)) {
			this._OnButtonClick(b)
		}
		if (fui.findParent(b.target, this._closeCls)) {
			if (this.isShowPopup()) {
				this.hidePopup()
			}
			this.fire("closeclick", {
				htmlEvent : b
			});
			return
		}
		if (this.allowInput == false
				|| fui.isAncestor(this._buttonEl, b.target)) {
			if (this.isShowPopup()) {
				this.hidePopup()
			} else {
				var a = this;
				setTimeout(function() {
					a.showPopup()
				}, 1)
			}
		}
	},
	__OnPopupButtonClick : function(a) {
		if (a.name == "close") {
			this.hidePopup()
		}
		a.cancel = true
	},
	getAttrs : function(b) {
		var a = fui.PopupEdit.superclass.getAttrs.call(this, b);
		fui._ParseString(b, a, [ "popupWidth", "popupHeight", "popup",
				"onshowpopup", "onhidepopup", "onbeforeshowpopup" ]);
		fui._ParseInt(b, a, [ "popupMinWidth", "popupMaxWidth",
				"popupMinHeight", "popupMaxHeight" ]);
		return a
	}
});
fui.regClass(fui.PopupEdit, "popupedit");
fui.ComboBox = function() {
	this.data = [];
	this.columns = [];
	fui.ComboBox.superclass.constructor.call(this);
	var a = this;
	if (isFirefox) {
		this._textEl.oninput = function() {
			a._tryQuery()
		}
	}
};
fui.extend(fui.ComboBox, fui.PopupEdit, {
	text : "",
	value : "",
	valueField : "id",
	textField : "text",
	dataField : "",
	delimiter : ",",
	multiSelect : false,
	data : [],
	url : "",
	columns : [],
	allowInput : false,
	valueFromSelect : false,
	popupMaxHeight : 200,
	set : function(d) {
		if (typeof d == "string") {
			return this
		}
		var c = d.value;
		delete d.value;
		var a = d.url;
		delete d.url;
		var b = d.data;
		delete d.data;
		fui.ComboBox.superclass.set.call(this, d);
		if (!fui.isNull(b)) {
			this.setData(b);
			d.data = b
		}
		if (!fui.isNull(a)) {
			this.setUrl(a);
			d.url = a
		}
		if (!fui.isNull(c)) {
			this.setValue(c);
			d.value = c
		}
		return this
	},
	uiCls : "fui-combobox",
	_createPopup : function() {
		fui.ComboBox.superclass._createPopup.call(this);
		this._listbox = new fui.ListBox();
		this._listbox.setBorderStyle("border:0;");
		this._listbox.setStyle("width:100%;height:auto;");
		this._listbox.render(this.popup._contentEl);
		this._listbox.on("itemclick", this.__OnItemClick, this);
		this._listbox.on("drawcell", this.__OnItemDrawCell, this);
		var a = this;
		this._listbox.on("beforeload", function(b) {
			a.fire("beforeload", b)
		}, this);
		this._listbox.on("load", function(b) {
			a.fire("load", b)
		}, this);
		this._listbox.on("loaderror", function(b) {
			a.fire("loaderror", b)
		}, this)
	},
	showPopup : function() {
		var a = {
			cancel : false
		};
		this.fire("beforeshowpopup", a);
		if (a.cancel == true) {
			return
		}
		this._listbox.setHeight("auto");
		fui.ComboBox.superclass.showPopup.call(this);
		var b = this.popup.el.style.height;
		if (b == "" || b == "auto") {
			this._listbox.setHeight("auto")
		} else {
			this._listbox.setHeight("100%")
		}
		this._listbox.setValue(this.value)
	},
	select : function(a) {
		this._listbox.deselectAll();
		a = this.getItem(a);
		if (a) {
			this._listbox.select(a);
			this.__OnItemClick({
				item : a
			})
		}
	},
	getItem : function(a) {
		return typeof a == "object" ? a : this.data[a]
	},
	indexOf : function(a) {
		return this.data.indexOf(a)
	},
	getAt : function(a) {
		return this.data[a]
	},
	load : function(a) {
		if (typeof a == "string") {
			this.setUrl(a)
		} else {
			this.setData(a)
		}
	},
	_eval : function(_) {
		return eval("(" + _ + ")")
	},
	setData : function(b) {
		if (typeof b == "string") {
			b = this._eval(b)
		}
		if (!fui.isArray(b)) {
			b = []
		}
		this._listbox.setData(b);
		this.data = this._listbox.data;
		var a = this._listbox.getValueAndText(this.value);
		this.text = this._textEl.value = a[1]
	},
	getData : function() {
		return this.data
	},
	setUrl : function(a) {
		this.getPopup();
		this._listbox.setUrl(a);
		this.url = this._listbox.url;
		this.data = this._listbox.data;
		var b = this._listbox.getValueAndText(this.value);
		this.text = this._textEl.value = b[1]
	},
	getUrl : function() {
		return this.url
	},
	setValueField : function(a) {
		this.valueField = a;
		if (this._listbox) {
			this._listbox.setValueField(a)
		}
	},
	getValueField : function() {
		return this.valueField
	},
	setTextField : function(a) {
		if (this._listbox) {
			this._listbox.setTextField(a)
		}
		this.textField = a
	},
	getTextField : function() {
		return this.textField
	},
	setDisplayField : function(a) {
		this.setTextField(a)
	},
	setDataField : function(a) {
		if (this._listbox) {
			this._listbox.setDataField(a)
		}
		this.dataField = a
	},
	getDataField : function() {
		return this.dataField
	},
	setValue : function(b) {
		if (this.value !== b) {
			var a = this._listbox.getValueAndText(b);
			this.value = b;
			this._valueEl.value = this.value;
			this.text = this._textEl.value = a[1];
			this._doEmpty()
		} else {
			var a = this._listbox.getValueAndText(b);
			this.text = this._textEl.value = a[1]
		}
	},
	setMultiSelect : function(a) {
		if (this.multiSelect != a) {
			this.multiSelect = a;
			if (this._listbox) {
				this._listbox.setMultiSelect(a);
				this._listbox.setShowCheckBox(a)
			}
		}
	},
	getMultiSelect : function() {
		return this.multiSelect
	},
	setColumns : function(a) {
		if (!fui.isArray(a)) {
			a = []
		}
		this.columns = a;
		this._listbox.setColumns(a)
	},
	getColumns : function() {
		return this.columns
	},
	showNullItem : false,
	setShowNullItem : function(a) {
		if (this.showNullItem != a) {
			this.showNullItem = a;
			this._listbox.setShowNullItem(a)
		}
	},
	getShowNullItem : function() {
		return this.showNullItem
	},
	setNullItemText : function(a) {
		if (this.nullItemText != a) {
			this.nullItemText = a;
			this._listbox.setNullItemText(a)
		}
	},
	getNullItemText : function() {
		return this.nullItemText
	},
	setValueFromSelect : function(a) {
		this.valueFromSelect = a
	},
	getValueFromSelect : function() {
		return this.valueFromSelect
	},
	_OnValueChanged : function() {
		if (this.validateOnChanged) {
			this._tryValidate()
		}
		var d = this.getValue();
		var b = this.getSelecteds();
		var a = b[0];
		var c = this;
		c.fire("valuechanged", {
			value : d,
			selecteds : b,
			selected : a
		})
	},
	getSelecteds : function() {
		return this._listbox.findItems(this.value)
	},
	getSelected : function() {
		return this.getSelecteds()[0]
	},
	__OnItemDrawCell : function(a) {
		this.fire("drawcell", a)
	},
	__OnItemClick : function(g) {
		var c = {
			item : g.item,
			cancel : false
		};
		this.fire("beforeitemclick", c);
		if (c.cancel) {
			return
		}
		var a = this._listbox.getSelecteds();
		var f = this._listbox.getValueAndText(a);
		var d = this.getValue();
		this.setValue(f[0]);
		this.setText(f[1]);
		if (g) {
			if (d != this.getValue()) {
				var b = this;
				setTimeout(function() {
					b._OnValueChanged()
				}, 1)
			}
			if (!this.multiSelect) {
				this.hidePopup()
			}
			this.focus();
			this.fire("itemclick", {
				item : g.item
			})
		}
	},
	__OnInputKeyDown : function(i, g) {
		var c = {
			htmlEvent : i
		};
		this.fire("keydown", c);
		if (i.keyCode == 8 && (this.isReadOnly() || this.allowInput == false)) {
			return false
		}
		if (i.keyCode == 9) {
			if (this.isShowPopup()) {
				this.hidePopup()
			}
			return
		}
		if (this.isReadOnly()) {
			return
		}
		switch (i.keyCode) {
		case 27:
			i.preventDefault();
			if (this.isShowPopup()) {
				i.stopPropagation()
			}
			this.hidePopup();
			this.focus();
			break;
		case 13:
			if (this.isShowPopup()) {
				i.preventDefault();
				i.stopPropagation();
				var b = this._listbox.getFocusedIndex();
				if (b != -1) {
					var f = this._listbox.getAt(b);
					var d = {
						item : f,
						cancel : false
					};
					this.fire("beforeitemclick", d);
					if (d.cancel == false) {
						if (this.multiSelect) {
						} else {
							this._listbox.deselectAll();
							this._listbox.select(f)
						}
						var a = this._listbox.getSelecteds();
						var h = this._listbox.getValueAndText(a);
						this.setValue(h[0]);
						this.setText(h[1]);
						this._OnValueChanged()
					}
				}
				this.hidePopup();
				this.focus()
			} else {
				this.fire("enter", c)
			}
			break;
		case 37:
			break;
		case 38:
			i.preventDefault();
			var b = this._listbox.getFocusedIndex();
			if (b == -1) {
				b = 0;
				if (!this.multiSelect) {
					var f = this._listbox.findItems(this.value)[0];
					if (f) {
						b = this._listbox.indexOf(f)
					}
				}
			}
			if (this.isShowPopup()) {
				if (!this.multiSelect) {
					b -= 1;
					if (b < 0) {
						b = 0
					}
					this._listbox._focusItem(b, true)
				}
			}
			break;
		case 39:
			break;
		case 40:
			i.preventDefault();
			var b = this._listbox.getFocusedIndex();
			if (b == -1) {
				b = 0;
				if (!this.multiSelect) {
					var f = this._listbox.findItems(this.value)[0];
					if (f) {
						b = this._listbox.indexOf(f)
					}
				}
			}
			if (this.isShowPopup()) {
				if (!this.multiSelect) {
					b += 1;
					if (b > this._listbox.getCount() - 1) {
						b = this._listbox.getCount() - 1
					}
					this._listbox._focusItem(b, true)
				}
			} else {
				this.showPopup();
				if (!this.multiSelect) {
					this._listbox._focusItem(b, true)
				}
			}
			break;
		default:
			this._tryQuery(this._textEl.value);
			break
		}
	},
	__OnInputKeyUp : function(a) {
		this.fire("keyup", {
			htmlEvent : a
		})
	},
	__OnInputKeyPress : function(a) {
		this.fire("keypress", {
			htmlEvent : a
		})
	},
	_tryQuery : function(a) {
		var b = this;
		setTimeout(function() {
			var c = b._textEl.value;
			if (c != a) {
				b._doQuery(c)
			}
		}, 10)
	},
	_doQuery : function(e) {
		if (this.multiSelect == true) {
			return
		}
		var b = [];
		for (var d = 0, a = this.data.length; d < a; d++) {
			var h = this.data[d];
			var g = fui._getMap(this.textField, h);
			if (typeof g == "string") {
				g = g.toUpperCase();
				e = e.toUpperCase();
				if (g.indexOf(e) != -1) {
					b.push(h)
				}
			}
		}
		this._listbox.setData(b);
		this._filtered = true;
		if (e !== "" || this.isShowPopup()) {
			this.showPopup();
			var c = 0;
			if (this._listbox.getShowNullItem()) {
				c = 1
			}
			var f = this;
			f._listbox._focusItem(c, true)
		}
	},
	__OnPopupHide : function(a) {
		if (this._filtered) {
			this._filtered = false;
			if (this._listbox.el) {
				this._listbox.setData(this.data)
			}
		}
		this.__doFocusCls();
		this.fire("hidepopup")
	},
	findItems : function(a) {
		return this._listbox.findItems(a)
	},
	__OnInputTextChanged : function(h) {
		if (this.isShowPopup()) {
			return
		}
		if (this.multiSelect == false) {
			var n = this._textEl.value;
			var d = this.getData();
			var c = null;
			for (var f = 0, b = d.length; f < b; f++) {
				var o = d[f];
				var k = o[this.textField];
				if (k == n) {
					c = o;
					break
				}
			}
			if (c) {
				this._listbox.setValue(c ? c[this.valueField] : "");
				var m = this._listbox.getValue();
				var a = this._listbox.getValueAndText(m);
				var j = this.getValue();
				this.setValue(m);
				this.setText(a[1])
			} else {
				if (this.valueFromSelect) {
					this.setValue("");
					this.setText("")
				} else {
					this.setValue(n);
					this.setText(n)
				}
			}
			if (j != this.getValue()) {
				var g = this;
				g._OnValueChanged()
			}
		}
	},
	setAjaxData : function(a) {
		this.ajaxData = a;
		this._listbox.setAjaxData(a)
	},
	setAjaxType : function(a) {
		this.ajaxType = a;
		this._listbox.setAjaxType(a)
	},
	getAttrs : function(b) {
		var m = fui.ComboBox.superclass.getAttrs.call(this, b);
		fui._ParseString(b, m, [ "url", "data", "textField", "valueField",
				"displayField", "nullItemText", "ondrawcell", "onbeforeload",
				"onload", "onloaderror", "onitemclick", "onbeforeitemclick" ]);
		fui._ParseBool(b, m,
				[ "multiSelect", "showNullItem", "valueFromSelect" ]);
		if (m.displayField) {
			m.textField = m.displayField
		}
		var n = m.valueField || this.valueField;
		var d = m.textField || this.textField;
		if (b.nodeName.toLowerCase() == "select") {
			var f = [];
			for (var g = 0, e = b.length; g < e; g++) {
				var h = b.options[g];
				var a = {};
				a[d] = h.text;
				a[n] = h.value;
				f.push(a)
			}
			if (f.length > 0) {
				m.data = f
			}
		} else {
			var j = fui.getChildNodes(b);
			for (var g = 0, e = j.length; g < e; g++) {
				var c = j[g];
				var k = jQuery(c).attr("property");
				if (!k) {
					continue
				}
				k = k.toLowerCase();
				if (k == "columns") {
					m.columns = fui._ParseColumns(c)
				} else {
					if (k == "data") {
						m.data = c.innerHTML
					}
				}
			}
		}
		return m
	}
});
fui.regClass(fui.ComboBox, "combobox");
fui.DatePicker = function() {
	fui.DatePicker.superclass.constructor.call(this);
	fui.addClass(this.el, "fui-datepicker");
	this.on("validation", this.__OnValidation, this)
};
fui.extend(fui.DatePicker, fui.PopupEdit, {
	valueFormat : "",
	format : "yyyy-MM-dd",
	maxDate : null,
	minDate : null,
	popupWidth : "",
	viewDate : new Date(),
	showTime : false,
	timeFormat : "H:mm",
	showTodayButton : true,
	showClearButton : true,
	showOkButton : false,
	uiCls : "fui-datepicker",
	_getCalendar : function() {
		if (!fui.DatePicker._Calendar) {
			var a = fui.DatePicker._Calendar = new fui.Calendar();
			a.setStyle("border:0;")
		}
		return fui.DatePicker._Calendar
	},
	destroy : function(a) {
		if (this._destroyPopup) {
			fui.DatePicker._Calendar = null
		}
		fui.DatePicker.superclass.destroy.call(this, a)
	},
	_createPopup : function() {
		fui.DatePicker.superclass._createPopup.call(this);
		this._calendar = this._getCalendar()
	},
	showPopup : function() {
		var a = {
			cancel : false
		};
		this.fire("beforeshowpopup", a);
		if (a.cancel == true) {
			return
		}
		this._calendar = this._getCalendar();
		this._calendar.beginUpdate();
		this._calendar._allowLayout = false;
		if (this._calendar.el.parentNode != this.popup._contentEl) {
			this._calendar.render(this.popup._contentEl)
		}
		this._calendar.set({
			showTime : this.showTime,
			timeFormat : this.timeFormat,
			showClearButton : this.showClearButton,
			showTodayButton : this.showTodayButton,
			showOkButton : this.showOkButton
		});
		this._calendar.setValue(this.value);
		if (this.value) {
			this._calendar.setViewDate(this.value)
		} else {
			this._calendar.setViewDate(this.viewDate)
		}
		fui.DatePicker.superclass.showPopup.call(this);
		function c() {
			if (this._calendar._target) {
				var d = this._calendar._target;
				this._calendar.un("timechanged", d.__OnTimeChanged, d);
				this._calendar.un("dateclick", d.__OnDateClick, d);
				this._calendar.un("drawdate", d.__OnDrawDate, d)
			}
			this._calendar.on("timechanged", this.__OnTimeChanged, this);
			this._calendar.on("dateclick", this.__OnDateClick, this);
			this._calendar.on("drawdate", this.__OnDrawDate, this);
			this._calendar.endUpdate();
			this._calendar._allowLayout = true;
			this._calendar.doLayout();
			this._calendar.focus();
			this._calendar._target = this
		}
		var b = this;
		c.call(b)
	},
	hidePopup : function() {
		fui.DatePicker.superclass.hidePopup.call(this);
		this._calendar.un("timechanged", this.__OnTimeChanged, this);
		this._calendar.un("dateclick", this.__OnDateClick, this);
		this._calendar.un("drawdate", this.__OnDrawDate, this)
	},
	within : function(a) {
		if (fui.isAncestor(this.el, a.target)) {
			return true
		}
		if (this._calendar.within(a)) {
			return true
		}
		return false
	},
	__OnPopupKeyDown : function(a) {
		if (a.keyCode == 13) {
			this.__OnDateClick()
		}
		if (a.keyCode == 27) {
			this.hidePopup();
			this.focus()
		}
	},
	minDateErrorText : "",
	maxDateErrorText : "",
	__OnValidation : function(d) {
		if (d.isValid == false) {
			return
		}
		var b = this.value;
		if (!fui.isDate(b)) {
			return
		}
		var g = fui.parseDate(this.maxDate);
		var c = fui.parseDate(this.minDate);
		var a = this.maxDateErrorText || fui.VTypes.maxDateErrorText;
		var f = this.minDateErrorText || fui.VTypes.minDateErrorText;
		if (fui.isDate(g)) {
			if (b.getTime() > g.getTime()) {
				d.isValid = false;
				d.errorText = String.format(a, fui.formatDate(g, this.format))
			}
		}
		if (fui.isDate(c)) {
			if (b.getTime() < c.getTime()) {
				d.isValid = false;
				d.errorText = String.format(f, fui.formatDate(c, this.format))
			}
		}
	},
	__OnDrawDate : function(c) {
		var a = c.date;
		var d = fui.parseDate(this.maxDate);
		var b = fui.parseDate(this.minDate);
		if (fui.isDate(d)) {
			if (a.getTime() > d.getTime()) {
				c.allowSelect = false
			}
		}
		if (fui.isDate(b)) {
			if (a.getTime() < b.getTime()) {
				c.allowSelect = false
			}
		}
		this.fire("drawdate", c)
	},
	__OnDateClick : function(c) {
		if (this.showOkButton && c.action != "ok") {
			return
		}
		var a = this._calendar.getValue();
		var b = this.getFormValue("U");
		this.setValue(a);
		if (b !== this.getFormValue("U")) {
			this._OnValueChanged()
		}
		this.focus();
		this.hidePopup()
	},
	__OnTimeChanged : function(b) {
		if (this.showOkButton) {
			return
		}
		var a = this._calendar.getValue();
		this.setValue(a);
		this._OnValueChanged()
	},
	setFormat : function(a) {
		if (typeof a != "string") {
			return
		}
		if (this.format != a) {
			this.format = a;
			this._textEl.value = this._valueEl.value = this.getFormValue()
		}
	},
	getFormat : function() {
		return this.format
	},
	setValueFormat : function(a) {
		if (typeof a != "string") {
			return
		}
		if (this.valueFormat != a) {
			this.valueFormat = a
		}
	},
	getValueFormat : function() {
		return this.valueFormat
	},
	setValue : function(a) {
		a = fui.parseDate(a);
		if (fui.isNull(a)) {
			a = ""
		}
		if (fui.isDate(a)) {
			a = new Date(a.getTime())
		}
		if (this.value != a) {
			this.value = a;
			this.text = this._textEl.value = this._valueEl.value = this
					.getFormValue()
		}
	},
	nullValue : "",
	setNullValue : function(a) {
		if (a == "null") {
			a = null
		}
		this.nullValue = a
	},
	getNullValue : function() {
		return this.nullValue
	},
	getValue : function() {
		if (!fui.isDate(this.value)) {
			return this.nullValue
		}
		var a = this.value;
		if (this.valueFormat) {
			a = fui.formatDate(a, this.valueFormat)
		}
		return a
	},
	getFormValue : function(a) {
		if (!fui.isDate(this.value)) {
			return ""
		}
		a = a || this.format;
		return fui.formatDate(this.value, a)
	},
	setViewDate : function(a) {
		a = fui.parseDate(a);
		if (!fui.isDate(a)) {
			return
		}
		this.viewDate = a
	},
	getViewDate : function() {
		return this._calendar.getViewDate()
	},
	setShowTime : function(a) {
		if (this.showTime != a) {
			this.showTime = a
		}
	},
	getShowTime : function() {
		return this.showTime
	},
	setTimeFormat : function(a) {
		if (this.timeFormat != a) {
			this.timeFormat = a
		}
	},
	getTimeFormat : function() {
		return this.timeFormat
	},
	setShowTodayButton : function(a) {
		this.showTodayButton = a
	},
	getShowTodayButton : function() {
		return this.showTodayButton
	},
	setShowClearButton : function(a) {
		this.showClearButton = a
	},
	getShowClearButton : function() {
		return this.showClearButton
	},
	setShowOkButton : function(a) {
		this.showOkButton = a
	},
	getShowOkButton : function() {
		return this.showOkButton
	},
	setMaxDate : function(a) {
		this.maxDate = a
	},
	getMaxDate : function() {
		return this.maxDate
	},
	setMinDate : function(a) {
		this.minDate = a
	},
	getMinDate : function() {
		return this.minDate
	},
	setMaxDateErrorText : function(a) {
		this.maxDateErrorText = a
	},
	getMaxDateErrorText : function() {
		return this.maxDateErrorText
	},
	setMinDateErrorText : function(a) {
		this.minDateErrorText = a
	},
	getMinDateErrorText : function() {
		return this.minDateErrorText
	},
	__OnInputTextChanged : function(c) {
		var a = this._textEl.value;
		var f = fui.parseDate(a);
		if (!f || isNaN(f) || f.getFullYear() == 1970) {
			f = null
		}
		var b = this.getFormValue("U");
		this.setValue(f);
		if (f == null) {
			this._textEl.value = ""
		}
		if (b !== this.getFormValue("U")) {
			this._OnValueChanged()
		}
	},
	__OnInputKeyDown : function(c) {
		var a = {
			htmlEvent : c
		};
		this.fire("keydown", a);
		if (c.keyCode == 8 && (this.isReadOnly() || this.allowInput == false)) {
			return false
		}
		if (c.keyCode == 9) {
			if (this.isShowPopup()) {
				this.hidePopup()
			}
			return
		}
		if (this.isReadOnly()) {
			return
		}
		switch (c.keyCode) {
		case 27:
			c.preventDefault();
			if (this.isShowPopup()) {
				c.stopPropagation()
			}
			this.hidePopup();
			break;
		case 9:
		case 13:
			if (this.isShowPopup()) {
				c.preventDefault();
				c.stopPropagation();
				this.hidePopup()
			} else {
				this.__OnInputTextChanged(null);
				var b = this;
				setTimeout(function() {
					b.fire("enter", a)
				}, 10)
			}
			break;
		case 37:
			break;
		case 38:
			c.preventDefault();
			break;
		case 39:
			break;
		case 40:
			c.preventDefault();
			this.showPopup();
			break;
		default:
			break
		}
	},
	getAttrs : function(b) {
		var a = fui.DatePicker.superclass.getAttrs.call(this, b);
		fui._ParseString(b, a, [ "format", "viewDate", "timeFormat",
				"ondrawdate", "minDate", "maxDate", "valueFormat", "nullValue",
				"minDateErrorText", "maxDateErrorText" ]);
		fui._ParseBool(b, a, [ "showTime", "showTodayButton",
				"showClearButton", "showOkButton" ]);
		return a
	}
});
fui.regClass(fui.DatePicker, "datepicker");
fui.Calendar = function() {
	this.viewDate = new Date();
	this._selectedDates = [];
	fui.Calendar.superclass.constructor.call(this)
};
fui
		.extend(
				fui.Calendar,
				fui.Control,
				{
					width : 220,
					height : 160,
					_clearBorder : false,
					viewDate : null,
					_selectedDate : "",
					_selectedDates : [],
					multiSelect : false,
					firstDayOfWeek : 0,
					todayText : "Today",
					clearText : "Clear",
					okText : "OK",
					cancelText : "Cancel",
					daysShort : [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri",
							"Sat" ],
					format : "MMM, yyyy",
					timeFormat : "H:mm",
					showTime : false,
					currentTime : true,
					rows : 1,
					columns : 1,
					headerCls : "",
					bodyCls : "",
					footerCls : "",
					_todayCls : "fui-calendar-today",
					_weekendCls : "fui-calendar-weekend",
					_otherMonthCls : "fui-calendar-othermonth",
					_selectedDateCls : "fui-calendar-selected",
					showHeader : true,
					showFooter : true,
					showWeekNumber : false,
					showDaysHeader : true,
					showMonthButtons : true,
					showYearButtons : true,
					showTodayButton : true,
					showClearButton : true,
					showOkButton : false,
					isWeekend : function(b) {
						var a = b.getDay();
						return a == 0 || a == 6
					},
					getFirstDateOfMonth : function(a) {
						var a = new Date(a.getFullYear(), a.getMonth(), 1);
						return fui.getWeekStartDate(a, this.firstDayOfWeek)
					},
					getShortWeek : function(a) {
						return this.daysShort[a]
					},
					uiCls : "fui-calendar",
					_create : function() {
						var e = '<tr style="width:100%;"><td style="width:100%;"></td></tr>';
						e += '<tr ><td><div class="fui-calendar-footer"><span style="display:inline-block;"><input name="time" class="fui-timespinner" style="width:80px" format="'
								+ this.timeFormat
								+ '"/><span class="fui-calendar-footerSpace"></span></span><span class="fui-calendar-tadayButton">'
								+ this.todayText
								+ '</span><span class="fui-calendar-footerSpace"></span><span class="fui-calendar-clearButton">'
								+ this.clearText
								+ '</span><span class="fui-calendar-okButton">'
								+ this.okText
								+ '</span><a href="#" class="fui-calendar-focus" style="position:absolute;left:-10px;top:-10px;width:0px;height:0px;outline:none" hideFocus></a></div></td></tr>';
						var b = '<table class="fui-calendar" cellpadding="0" cellspacing="0">'
								+ e + "</table>";
						var f = document.createElement("div");
						f.innerHTML = b;
						this.el = f.firstChild;
						var a = this.el.getElementsByTagName("tr");
						var c = this.el.getElementsByTagName("td");
						this._innerEl = c[0];
						this._footerEl = fui.byClass("fui-calendar-footer",
								this.el);
						this.timeWrapEl = this._footerEl.childNodes[0];
						this.todayButtonEl = this._footerEl.childNodes[1];
						this.footerSpaceEl = this._footerEl.childNodes[2];
						this.closeButtonEl = this._footerEl.childNodes[3];
						this.okButtonEl = this._footerEl.childNodes[4];
						this._focusEl = this._footerEl.lastChild;
						fui.parse(this._footerEl);
						this.timeSpinner = fui.getbyName("time", this.el);
						this.doUpdate()
					},
					focus : function() {
						try {
							this._focusEl.focus()
						} catch (a) {
						}
					},
					destroy : function(a) {
						this._innerEl = this._footerEl = this.timeWrapEl = this.todayButtonEl = this.footerSpaceEl = this.closeButtonEl = null;
						fui.Calendar.superclass.destroy.call(this, a)
					},
					_initEvents : function() {
						if (this.timeSpinner) {
							this.timeSpinner.on("valuechanged",
									this.__OnTimeChanged, this)
						}
						fui._BindEvents(function() {
							fui.on(this.el, "click", this.__OnClick, this);
							fui.on(this.el, "mousedown", this.__OnMouseDown,
									this);
							fui.on(this.el, "keydown", this.__OnKeyDown, this)
						}, this)
					},
					getDateEl : function(a) {
						if (!a) {
							return null
						}
						var b = this.uid + "$" + fui.clearTime(a).getTime();
						return document.getElementById(b)
					},
					within : function(a) {
						if (fui.isAncestor(this.el, a.target)) {
							return true
						}
						if (this.menuEl
								&& fui.isAncestor(this.menuEl, a.target)) {
							return true
						}
						return false
					},
					setShowHeader : function(a) {
						this.showHeader = a;
						this.doUpdate()
					},
					getShowHeader : function() {
						return this.showHeader
					},
					setShowFooter : function(a) {
						this.showFooter = a;
						this.doUpdate()
					},
					getShowFooter : function() {
						return this.showFooter
					},
					setShowWeekNumber : function(a) {
						this.showWeekNumber = a;
						this.doUpdate()
					},
					getShowWeekNumber : function() {
						return this.showWeekNumber
					},
					setShowDaysHeader : function(a) {
						this.showDaysHeader = a;
						this.doUpdate()
					},
					getShowDaysHeader : function() {
						return this.showDaysHeader
					},
					setShowMonthButtons : function(a) {
						this.showMonthButtons = a;
						this.doUpdate()
					},
					getShowMonthButtons : function() {
						return this.showMonthButtons
					},
					setShowYearButtons : function(a) {
						this.showYearButtons = a;
						this.doUpdate()
					},
					getShowYearButtons : function() {
						return this.showYearButtons
					},
					setShowTodayButton : function(a) {
						this.showTodayButton = a;
						this.todayButtonEl.style.display = this.showTodayButton ? ""
								: "none";
						this.doUpdate()
					},
					getShowTodayButton : function() {
						return this.showTodayButton
					},
					setShowClearButton : function(a) {
						this.showClearButton = a;
						this.closeButtonEl.style.display = this.showClearButton ? ""
								: "none";
						this.doUpdate()
					},
					getShowClearButton : function() {
						return this.showClearButton
					},
					setShowOkButton : function(a) {
						this.showOkButton = a;
						this.okButtonEl.style.display = this.showOkButton ? ""
								: "none";
						this.doUpdate()
					},
					getShowOkButton : function() {
						return this.showOkButton
					},
					setViewDate : function(a) {
						a = fui.parseDate(a);
						if (!a) {
							a = new Date()
						}
						if (fui.isDate(a)) {
							a = new Date(a.getTime())
						}
						this.viewDate = a;
						this.doUpdate()
					},
					getViewDate : function() {
						return this.viewDate
					},
					setSelectedDate : function(b) {
						b = fui.parseDate(b);
						if (!fui.isDate(b)) {
							b = ""
						} else {
							b = new Date(b.getTime())
						}
						var a = this.getDateEl(this._selectedDate);
						if (a) {
							fui.removeClass(a, this._selectedDateCls)
						}
						this._selectedDate = b;
						if (this._selectedDate) {
							this._selectedDate = fui
									.cloneDate(this._selectedDate)
						}
						var a = this.getDateEl(this._selectedDate);
						if (a) {
							fui.addClass(a, this._selectedDateCls)
						}
						this.fire("datechanged")
					},
					setSelectedDates : function(a) {
						if (!fui.isArray(a)) {
							a = []
						}
						this._selectedDates = a;
						this.doUpdate()
					},
					getSelectedDate : function() {
						return this._selectedDate ? this._selectedDate : ""
					},
					setTime : function(a) {
						this.timeSpinner.setValue(a)
					},
					getTime : function() {
						return this.timeSpinner.getFormValue()
					},
					setValue : function(a) {
						this.setSelectedDate(a);
						if (!a) {
							a = new Date()
						}
						this.setTime(a)
					},
					getValue : function() {
						var b = this._selectedDate;
						if (b) {
							b = fui.clearTime(b);
							if (this.showTime) {
								var a = this.timeSpinner.getValue();
								b.setHours(a.getHours());
								b.setMinutes(a.getMinutes());
								b.setSeconds(a.getSeconds())
							}
						}
						return b ? b : ""
					},
					getFormValue : function() {
						var a = this.getValue();
						if (a) {
							return fui.formatDate(a, "yyyy-MM-dd HH:mm:ss")
						}
						return ""
					},
					isSelectedDate : function(a) {
						if (!a || !this._selectedDate) {
							return false
						}
						return fui.clearTime(a).getTime() == fui.clearTime(
								this._selectedDate).getTime()
					},
					setMultiSelect : function(a) {
						this.multiSelect = a;
						this.doUpdate()
					},
					getMultiSelect : function() {
						return this.multiSelect
					},
					setRows : function(a) {
						if (isNaN(a)) {
							return
						}
						if (a < 1) {
							a = 1
						}
						this.rows = a;
						this.doUpdate()
					},
					getRows : function() {
						return this.rows
					},
					setColumns : function(a) {
						if (isNaN(a)) {
							return
						}
						if (a < 1) {
							a = 1
						}
						this.columns = a;
						this.doUpdate()
					},
					getColumns : function() {
						return this.columns
					},
					setShowTime : function(a) {
						if (this.showTime != a) {
							this.showTime = a;
							this.timeWrapEl.style.display = this.showTime ? ""
									: "none";
							this.doLayout()
						}
					},
					getShowTime : function() {
						return this.showTime
					},
					setTimeFormat : function(a) {
						if (this.timeFormat != a) {
							this.timeSpinner.setFormat(a);
							this.timeFormat = this.timeSpinner.format
						}
					},
					getTimeFormat : function() {
						return this.timeFormat
					},
					doLayout : function() {
						if (!this.canLayout()) {
							return
						}
						this.timeWrapEl.style.display = this.showTime ? ""
								: "none";
						this.todayButtonEl.style.display = this.showTodayButton ? ""
								: "none";
						this.closeButtonEl.style.display = this.showClearButton ? ""
								: "none";
						this.okButtonEl.style.display = this.showOkButton ? ""
								: "none";
						this.footerSpaceEl.style.display = (this.showClearButton && this.showTodayButton) ? ""
								: "none";
						this._footerEl.style.display = this.showFooter ? ""
								: "none";
						var a = this._innerEl.firstChild;
						var b = this.isAutoHeight();
						if (!b) {
							a.parentNode.style.height = "100px";
							h = jQuery(this.el).height();
							h -= jQuery(this._footerEl).outerHeight();
							a.parentNode.style.height = h + "px"
						} else {
							a.parentNode.style.height = ""
						}
						fui.layout(this._footerEl)
					},
					doUpdate : function() {
						if (!this._allowUpdate) {
							return
						}
						var m = new Date(this.viewDate.getTime());
						var d = this.rows == 1 && this.columns == 1;
						var g = 100 / this.rows;
						var n = '<table class="fui-calendar-views" border="0" cellpadding="0" cellspacing="0">';
						for (var f = 0, b = this.rows; f < b; f++) {
							n += "<tr >";
							for (var e = 0, c = this.columns; e < c; e++) {
								n += '<td style="height:' + g + '%">';
								n += this._CreateView(m, f, e);
								n += "</td>";
								m = new Date(m.getFullYear(), m.getMonth() + 1,
										1)
							}
							n += "</tr>"
						}
						n += "</table>";
						this._innerEl.innerHTML = n;
						var a = this.el;
						setTimeout(function() {
							fui.repaint(a)
						}, 100);
						this.doLayout()
					},
					_CreateView : function(m, d, a) {
						var x = m.getMonth();
						var w = this.getFirstDateOfMonth(m);
						var o = new Date(w.getTime());
						var c = fui.clearTime(new Date()).getTime();
						var l = this.value ? fui.clearTime(this.value)
								.getTime() : -1;
						var q = this.rows > 1 || this.columns > 1;
						var n = "";
						n += '<table class="fui-calendar-view" border="0" cellpadding="0" cellspacing="0">';
						if (this.showHeader) {
							n += '<tr ><td colSpan="10" class="fui-calendar-header"><div class="fui-calendar-headerInner">';
							if (d == 0 && a == 0) {
								n += '<div class="fui-calendar-prev">';
								if (this.showYearButtons) {
									n += '<span class="fui-calendar-yearPrev"></span>'
								}
								if (this.showMonthButtons) {
									n += '<span class="fui-calendar-monthPrev"></span>'
								}
								n += "</div>"
							}
							if (d == 0 && a == this.columns - 1) {
								n += '<div class="fui-calendar-next">';
								if (this.showMonthButtons) {
									n += '<span class="fui-calendar-monthNext"></span>'
								}
								if (this.showYearButtons) {
									n += '<span class="fui-calendar-yearNext"></span>'
								}
								n += "</div>"
							}
							n += '<span class="fui-calendar-title">'
									+ fui.formatDate(m, this.format);
							+"</span>";
							n += "</div></td></tr>"
						}
						if (this.showDaysHeader) {
							n += '<tr class="fui-calendar-daysheader"><td class="fui-calendar-space"></td>';
							if (this.showWeekNumber) {
								n += '<td sclass="fui-calendar-weeknumber"></td>'
							}
							for (var t = this.firstDayOfWeek, r = t + 7; t < r; t++) {
								var z = this.getShortWeek(t);
								n += '<td yAlign="middle">';
								n += z;
								n += "</td>";
								w = new Date(w.getFullYear(), w.getMonth(), w
										.getDate() + 1)
							}
							n += '<td class="fui-calendar-space"></td></tr>'
						}
						w = o;
						for (var u = 0; u <= 5; u++) {
							n += '<tr class="fui-calendar-days"><td class="fui-calendar-space"></td>';
							if (this.showWeekNumber) {
								var f = fui.getWeek(w.getFullYear(), w
										.getMonth() + 1, w.getDate());
								if (String(f).length == 1) {
									f = "0" + f
								}
								n += '<td class="fui-calendar-weeknumber" yAlign="middle">'
										+ f + "</td>"
							}
							for (var t = this.firstDayOfWeek, r = t + 7; t < r; t++) {
								var p = this.isWeekend(w);
								var b = fui.clearTime(w).getTime();
								var y = b == c;
								var g = this.isSelectedDate(w);
								if (x != w.getMonth() && q) {
									b = -1
								}
								var v = this._OnDrawDate(w);
								n += '<td yAlign="middle" id="';
								n += this.uid + "$" + b;
								n += '" class="fui-calendar-date ';
								if (p) {
									n += " fui-calendar-weekend "
								}
								if (v.allowSelect == false) {
									n += " fui-calendar-disabled "
								}
								if (x != w.getMonth() && q) {
								} else {
									if (g) {
										n += " " + this._selectedDateCls + " "
									}
									if (y) {
										n += " fui-calendar-today "
									}
								}
								if (x != w.getMonth()) {
									n += " fui-calendar-othermonth "
								}
								n += '">';
								if (x != w.getMonth() && q) {
								} else {
									n += v.dateHtml
								}
								n += "</td>";
								w = new Date(w.getFullYear(), w.getMonth(), w
										.getDate() + 1)
							}
							n += '<td class="fui-calendar-space"></td></tr>'
						}
						n += '<tr class="fui-calendar-bottom" colSpan="10"><td ></td></tr>';
						n += "</table>";
						return n
					},
					_OnDrawDate : function(a) {
						var b = {
							date : a,
							dateCls : "",
							dateStyle : "",
							dateHtml : a.getDate(),
							allowSelect : true
						};
						this.fire("drawdate", b);
						return b
					},
					_OnDateClick : function(a, b) {
						var c = {
							date : a,
							action : b
						};
						this.fire("dateclick", c);
						this._OnValueChanged()
					},
					menuEl : null,
					menuYear : null,
					menuSelectMonth : null,
					menuSelectYear : null,
					showMenu : function(b) {
						if (!b) {
							return
						}
						this.hideMenu();
						this.menuYear = parseInt(this.viewDate.getFullYear() / 10) * 10;
						this._menuselectMonth = this.viewDate.getMonth();
						this._menuselectYear = this.viewDate.getFullYear();
						var a = '<div class="fui-calendar-menu"></div>';
						this.menuEl = fui.append(document.body, a);
						this.updateMenu(this.viewDate);
						var c = this.getBox();
						if (this.el.style.borderWidth == "0px") {
							this.menuEl.style.border = "0"
						}
						fui.setBox(this.menuEl, c);
						fui.on(this.menuEl, "click", this.__OnMenuClick, this);
						fui.on(document, "mousedown",
								this.__OnBodyMenuMouseDown, this)
					},
					hideMenu : function() {
						if (this.menuEl) {
							fui.un(this.menuEl, "click", this.__OnMenuClick,
									this);
							fui.un(document, "mousedown",
									this.__OnBodyMenuMouseDown, this);
							jQuery(this.menuEl).remove();
							this.menuEl = null
						}
					},
					updateMenu : function() {
						var d = '<div class="fui-calendar-menu-months">';
						for (var c = 0, b = 12; c < b; c++) {
							var e = fui.getShortMonth(c);
							var a = "";
							if (this._menuselectMonth == c) {
								a = "fui-calendar-menu-selected"
							}
							d += '<a id="'
									+ c
									+ '" class="fui-calendar-menu-month '
									+ a
									+ '" href="javascript:void(0);" hideFocus onclick="return false">'
									+ e + "</a>"
						}
						d += '<div style="clear:both;"></div></div>';
						d += '<div class="fui-calendar-menu-years">';
						for (var c = this.menuYear, b = this.menuYear + 10; c < b; c++) {
							var e = c;
							var a = "";
							if (this._menuselectYear == c) {
								a = "fui-calendar-menu-selected"
							}
							d += '<a id="'
									+ c
									+ '" class="fui-calendar-menu-year '
									+ a
									+ '" href="javascript:void(0);" hideFocus onclick="return false">'
									+ e + "</a>"
						}
						d += '<div class="fui-calendar-menu-prevYear"></div><div class="fui-calendar-menu-nextYear"></div><div style="clear:both;"></div></div>';
						d += '<div class="fui-calendar-footer"><span class="fui-calendar-okButton">'
								+ this.okText
								+ '</span><span class="fui-calendar-footerSpace"></span><span class="fui-calendar-cancelButton">'
								+ this.cancelText
								+ '</span></div><div style="clear:both;"></div>';
						this.menuEl.innerHTML = d
					},
					__OnMenuClick : function(f) {
						var d = f.target;
						var c = fui.findParent(d, "fui-calendar-menu-month");
						var a = fui.findParent(d, "fui-calendar-menu-year");
						if (c) {
							this._menuselectMonth = parseInt(c.id);
							this.updateMenu()
						} else {
							if (a) {
								this._menuselectYear = parseInt(a.id);
								this.updateMenu()
							} else {
								if (fui.findParent(d,
										"fui-calendar-menu-prevYear")) {
									this.menuYear = this.menuYear - 1;
									this.menuYear = parseInt(this.menuYear / 10) * 10;
									this.updateMenu()
								} else {
									if (fui.findParent(d,
											"fui-calendar-menu-nextYear")) {
										this.menuYear = this.menuYear + 11;
										this.menuYear = parseInt(this.menuYear / 10) * 10;
										this.updateMenu()
									} else {
										if (fui.findParent(d,
												"fui-calendar-okButton")) {
											var b = new Date(
													this._menuselectYear,
													this._menuselectMonth, 1);
											this.setViewDate(b);
											this.hideMenu()
										} else {
											if (fui
													.findParent(d,
															"fui-calendar-cancelButton")) {
												this.hideMenu()
											}
										}
									}
								}
							}
						}
					},
					__OnBodyMenuMouseDown : function(a) {
						if (!fui.findParent(a.target, "fui-calendar-menu")) {
							this.hideMenu()
						}
					},
					__OnClick : function(j) {
						var m = this.viewDate;
						if (this.enabled == false) {
							return
						}
						var l = j.target;
						var b = fui.findParent(j.target, "fui-calendar-title");
						if (fui.findParent(l, "fui-calendar-monthNext")) {
							m.setMonth(m.getMonth() + 1);
							this.setViewDate(m)
						} else {
							if (fui.findParent(l, "fui-calendar-yearNext")) {
								m.setFullYear(m.getFullYear() + 1);
								this.setViewDate(m)
							} else {
								if (fui.findParent(l, "fui-calendar-monthPrev")) {
									m.setMonth(m.getMonth() - 1);
									this.setViewDate(m)
								} else {
									if (fui.findParent(l,
											"fui-calendar-yearPrev")) {
										m.setFullYear(m.getFullYear() - 1);
										this.setViewDate(m)
									} else {
										if (fui.findParent(l,
												"fui-calendar-tadayButton")) {
											var k = new Date();
											this.setViewDate(k);
											this.setSelectedDate(k);
											if (this.currentTime) {
												var i = new Date();
												this.setTime(i)
											}
											this._OnDateClick(k, "today")
										} else {
											if (fui.findParent(l,
													"fui-calendar-clearButton")) {
												this.setSelectedDate(null);
												this.setTime(null);
												this
														._OnDateClick(null,
																"clear")
											} else {
												if (fui
														.findParent(l,
																"fui-calendar-okButton")) {
													this._OnDateClick(null,
															"ok")
												} else {
													if (b) {
														this.showMenu(b)
													}
												}
											}
										}
									}
								}
							}
						}
						var g = fui.findParent(j.target, "fui-calendar-date");
						if (g && !fui.hasClass(g, "fui-calendar-disabled")) {
							var a = g.id.split("$");
							var f = parseInt(a[a.length - 1]);
							if (f == -1) {
								return
							}
							var c = new Date(f);
							this._OnDateClick(c)
						}
					},
					__OnMouseDown : function(f) {
						if (this.enabled == false) {
							return
						}
						var b = fui.findParent(f.target, "fui-calendar-date");
						if (b && !fui.hasClass(b, "fui-calendar-disabled")) {
							var c = b.id.split("$");
							var d = parseInt(c[c.length - 1]);
							if (d == -1) {
								return
							}
							var a = new Date(d);
							this.setSelectedDate(a)
						}
					},
					__OnTimeChanged : function(a) {
						this.fire("timechanged");
						this._OnValueChanged()
					},
					__OnKeyDown : function(d) {
						if (this.enabled == false) {
							return
						}
						var b = this.getSelectedDate();
						if (!b) {
							b = new Date(this.viewDate.getTime())
						}
						switch (d.keyCode) {
						case 27:
							break;
						case 13:
							break;
						case 37:
							b = fui.addDate(b, -1, "D");
							break;
						case 38:
							b = fui.addDate(b, -7, "D");
							break;
						case 39:
							b = fui.addDate(b, 1, "D");
							break;
						case 40:
							b = fui.addDate(b, 7, "D");
							break;
						default:
							break
						}
						var c = this;
						if (b.getMonth() != c.viewDate.getMonth()) {
							c.setViewDate(fui.cloneDate(b));
							c.focus()
						}
						var a = this.getDateEl(b);
						if (a && fui.hasClass(a, "fui-calendar-disabled")) {
							return
						}
						c.setSelectedDate(b);
						if (d.keyCode == 37 || d.keyCode == 38
								|| d.keyCode == 39 || d.keyCode == 40) {
							d.preventDefault()
						}
					},
					_OnValueChanged : function() {
						this.fire("valuechanged")
					},
					getAttrs : function(b) {
						var a = fui.Calendar.superclass.getAttrs.call(this, b);
						fui._ParseString(b, a,
								[ "viewDate", "rows", "columns", "ondateclick",
										"ondrawdate", "ondatechanged",
										"timeFormat", "ontimechanged",
										"onvaluechanged" ]);
						fui
								._ParseBool(b, a, [ "multiSelect",
										"showHeader", "showFooter",
										"showWeekNumber", "showDaysHeader",
										"showMonthButtons", "showYearButtons",
										"showTodayButton", "showClearButton",
										"showTime", "showOkButton" ]);
						return a
					}
				});
fui.regClass(fui.Calendar, "calendar");
fui.ListBox = function() {
	fui.ListBox.superclass.constructor.call(this)
};
fui
		.extend(
				fui.ListBox,
				fui.ListControl,
				{
					formField : true,
					width : 200,
					columns : null,
					columnWidth : 80,
					showNullItem : false,
					nullItemText : "",
					showEmpty : false,
					emptyText : "",
					showCheckBox : false,
					showAllCheckBox : true,
					multiSelect : false,
					_itemCls : "fui-listbox-item",
					_itemHoverCls : "fui-listbox-item-hover",
					_itemSelectedCls : "fui-listbox-item-selected",
					uiCls : "fui-listbox",
					_create : function() {
						var a = this.el = document.createElement("div");
						this.el.className = "fui-listbox";
						this.el.innerHTML = '<div class="fui-listbox-border"><div class="fui-listbox-header"></div><div class="fui-listbox-view"></div><input type="hidden"/></div><div class="fui-errorIcon"></div>';
						this._borderEl = this.el.firstChild;
						this._headerEl = this._borderEl.firstChild;
						this._viewEl = this._borderEl.childNodes[1];
						this._valueEl = this._borderEl.childNodes[2];
						this._errorIconEl = this.el.lastChild;
						this._scrollViewEl = this._viewEl;
						this._viewEl.innerHTML = '<div class="fui-grid-rows-content"></div>'
					},
					_initEvents : function() {
						fui.ListBox.superclass._initEvents.call(this);
						fui._BindEvents(function() {
							fui_onOne(this._viewEl, "scroll", this.__OnScroll,
									this)
						}, this)
					},
					destroy : function(a) {
						if (this._viewEl) {
							this._viewEl.onscroll = null;
							fui.clearEvent(this._viewEl);
							this._viewEl = null
						}
						this._borderEl = null;
						this._headerEl = null;
						this._viewEl = null;
						this._valueEl = null;
						fui.ListBox.superclass.destroy.call(this, a)
					},
					setColumns : function(f) {
						if (!fui.isArray(f)) {
							f = []
						}
						this.columns = f;
						for (var c = 0, a = this.columns.length; c < a; c++) {
							var e = this.columns[c];
							if (e.type) {
								if (!fui.isNull(e.header)
										&& typeof e.header !== "function") {
									if (e.header.trim() == "") {
										delete e.header
									}
								}
								var b = fui._getColumn(e.type);
								if (b) {
									var g = fui.copyTo({}, e);
									fui.copyTo(e, b);
									fui.copyTo(e, g)
								}
							}
							var d = parseInt(e.width);
							if (fui.isNumber(d) && String(d) == e.width) {
								e.width = d + "px"
							}
							if (fui.isNull(e.width)) {
								e.width = this.columnWidth + "px"
							}
						}
						this.doUpdate()
					},
					getColumns : function() {
						return this.columns
					},
					doUpdate : function() {
						if (this._allowUpdate === false) {
							return
						}
						var m = this.columns && this.columns.length > 0;
						if (m) {
							fui.addClass(this.el, "fui-listbox-showColumns")
						} else {
							fui.removeClass(this.el, "fui-listbox-showColumns")
						}
						this._headerEl.style.display = m ? "" : "none";
						var a = [];
						if (m) {
							a[a.length] = '<table class="fui-listbox-headerInner" cellspacing="0" cellpadding="0"><tr>';
							var A = this.uid + "$ck$all";
							a[a.length] = '<td class="fui-listbox-checkbox"><input type="checkbox" id="'
									+ A + '"></td>';
							for (var u = 0, t = this.columns.length; u < t; u++) {
								var d = this.columns[u];
								var v = d.header;
								if (fui.isNull(v)) {
									v = "&nbsp;"
								}
								var p = d.width;
								if (fui.isNumber(p)) {
									p = p + "px"
								}
								a[a.length] = '<td class="';
								if (d.headerCls) {
									a[a.length] = d.headerCls
								}
								a[a.length] = '" style="';
								if (d.headerStyle) {
									a[a.length] = d.headerStyle + ";"
								}
								if (p) {
									a[a.length] = "width:" + p + ";"
								}
								if (d.headerAlign) {
									a[a.length] = "text-align:" + d.headerAlign
											+ ";"
								}
								a[a.length] = '">';
								a[a.length] = v;
								a[a.length] = "</td>"
							}
							a[a.length] = "</tr></table>"
						}
						this._headerEl.innerHTML = a.join("");
						var a = [];
						var C = this.data;
						a[a.length] = '<table class="fui-listbox-items" cellspacing="0" cellpadding="0">';
						if (this.showEmpty && C.length == 0) {
							a[a.length] = '<tr><td colspan="20">'
									+ this.emptyText + "</td></tr>"
						} else {
							this._doNullItem();
							for (var x = 0, s = C.length; x < s; x++) {
								var z = C[x];
								var g = -1;
								var r = " ";
								var f = -1;
								var B = " ";
								a[a.length] = '<tr id="';
								a[a.length] = this._createItemId(x);
								a[a.length] = '" index="';
								a[a.length] = x;
								a[a.length] = '" class="fui-listbox-item ';
								if (z.enabled === false) {
									a[a.length] = " fui-disabled "
								}
								g = a.length;
								a[a.length] = r;
								a[a.length] = '" style="';
								f = a.length;
								a[a.length] = B;
								a[a.length] = '">';
								var q = this._createCheckId(x);
								var o = this.name;
								var c = this.getItemValue(z);
								var b = "";
								if (z.enabled === false) {
									b = "disabled"
								}
								a[a.length] = '<td class="fui-listbox-checkbox"><input '
										+ b
										+ ' id="'
										+ q
										+ '" type="checkbox" ></td>';
								if (m) {
									for (var u = 0, t = this.columns.length; u < t; u++) {
										var d = this.columns[u];
										var y = this._OnDrawCell(z, x, d);
										var p = d.width;
										if (typeof p == "number") {
											p = p + "px"
										}
										a[a.length] = '<td class="';
										if (y.cellCls) {
											a[a.length] = y.cellCls
										}
										a[a.length] = '" style="';
										if (y.cellStyle) {
											a[a.length] = y.cellStyle + ";"
										}
										if (p) {
											a[a.length] = "width:" + p + ";"
										}
										if (d.align) {
											a[a.length] = "text-align:"
													+ d.align + ";"
										}
										a[a.length] = '">';
										a[a.length] = y.cellHtml;
										a[a.length] = "</td>";
										if (y.rowCls) {
											r = y.rowCls
										}
										if (y.rowStyle) {
											B = y.rowStyle
										}
									}
								} else {
									var y = this._OnDrawCell(z, x, null);
									a[a.length] = '<td class="';
									if (y.cellCls) {
										a[a.length] = y.cellCls
									}
									a[a.length] = '" style="';
									if (y.cellStyle) {
										a[a.length] = y.cellStyle
									}
									a[a.length] = '">';
									a[a.length] = y.cellHtml;
									a[a.length] = "</td>";
									if (y.rowCls) {
										r = y.rowCls
									}
									if (y.rowStyle) {
										B = y.rowStyle
									}
								}
								a[g] = r;
								a[f] = B;
								a[a.length] = "</tr>"
							}
						}
						a[a.length] = "</table>";
						var n = a.join("");
						this._viewEl.firstChild.innerHTML = n;
						this._doSelects();
						this.doLayout()
					},
					doLayout : function() {
						if (!this.canLayout()) {
							return
						}
						if (this.columns && this.columns.length > 0) {
							fui.addClass(this.el, "fui-listbox-showcolumns")
						} else {
							fui.removeClass(this.el, "fui-listbox-showcolumns")
						}
						if (this.showCheckBox) {
							fui
									.removeClass(this.el,
											"fui-listbox-hideCheckBox")
						} else {
							fui.addClass(this.el, "fui-listbox-hideCheckBox")
						}
						var a = this.uid + "$ck$all";
						var j = document.getElementById(a);
						if (j) {
							j.style.display = this.showAllCheckBox ? ""
									: "none"
						}
						var g = this.isAutoHeight();
						h = this.getHeight(true);
						e = this.getWidth(true);
						var i = e;
						var f = this._viewEl;
						f.style.width = e + "px";
						if (!g) {
							var b = fui.getHeight(this._headerEl);
							h = h - b;
							f.style.height = h + "px"
						} else {
							f.style.height = "auto"
						}
						if (isIE) {
							var d = this._headerEl.firstChild, c = this._viewEl.firstChild.firstChild;
							if (this._viewEl.offsetHeight >= this._viewEl.scrollHeight) {
								c.style.width = "100%";
								if (d) {
									d.style.width = "100%"
								}
							} else {
								var e = parseInt(c.parentNode.offsetWidth)
										+ "px";
								if (d) {
									d.style.width = e
								}
							}
						}
						if (this._viewEl.offsetHeight < this._viewEl.scrollHeight) {
							this._headerEl.style.width = (i - 17) + "px"
						} else {
							this._headerEl.style.width = "100%"
						}
					},
					setShowCheckBox : function(a) {
						this.showCheckBox = a;
						this.doLayout()
					},
					getShowCheckBox : function() {
						return this.showCheckBox
					},
					setShowAllCheckBox : function(a) {
						this.showAllCheckBox = a;
						this.doLayout()
					},
					getShowAllCheckBox : function() {
						return this.showAllCheckBox
					},
					setShowNullItem : function(a) {
						if (this.showNullItem != a) {
							this.showNullItem = a;
							this._doNullItem();
							this.doUpdate()
						}
					},
					getShowNullItem : function() {
						return this.showNullItem
					},
					setNullItemText : function(a) {
						if (this.nullItemText != a) {
							this.nullItemText = a;
							this._doNullItem();
							this.doUpdate()
						}
					},
					getNullItemText : function() {
						return this.nullItemText
					},
					_doNullItem : function() {
						for (var b = 0, a = this.data.length; b < a; b++) {
							var c = this.data[b];
							if (c.__NullItem) {
								this.data.removeAt(b);
								break
							}
						}
						if (this.showNullItem) {
							var c = {
								__NullItem : true
							};
							c[this.textField] = "";
							c[this.valueField] = "";
							this.data.insert(0, c)
						}
					},
					_OnDrawCell : function(a, b, c) {
						var f = c ? fui._getMap(c.field, a) : this
								.getItemText(a);
						var g = {
							sender : this,
							index : b,
							rowIndex : b,
							record : a,
							item : a,
							column : c,
							field : c ? c.field : null,
							value : f,
							cellHtml : f,
							rowCls : null,
							cellCls : c ? (c.cellCls || "") : "",
							rowStyle : null,
							cellStyle : c ? (c.cellStyle || "") : ""
						};
						var i = this.columns && this.columns.length > 0;
						if (!i) {
							if (b == 0 && this.showNullItem) {
								g.cellHtml = this.nullItemText
							}
						}
						if (g.autoEscape == true) {
							g.cellHtml = fui.htmlEncode(g.cellHtml)
						}
						if (c) {
							if (c.dateFormat) {
								if (fui.isDate(g.value)) {
									g.cellHtml = fui
											.formatDate(f, c.dateFormat)
								} else {
									g.cellHtml = f
								}
							}
							var d = c.renderer;
							if (d) {
								fn = typeof d == "function" ? d : window[d];
								if (fn) {
									g.cellHtml = fn.call(c, g)
								}
							}
						}
						this.fire("drawcell", g);
						if (g.cellHtml === null || g.cellHtml === undefined
								|| g.cellHtml === "") {
							g.cellHtml = "&nbsp;"
						}
						return g
					},
					__OnScroll : function(a) {
						this._headerEl.scrollLeft = this._viewEl.scrollLeft
					},
					__OnClick : function(f) {
						var d = this.uid + "$ck$all";
						if (f.target.id == d) {
							var a = document.getElementById(d);
							if (a) {
								var b = a.checked;
								var c = this.getValue();
								if (b) {
									this.selectAll()
								} else {
									this.deselectAll()
								}
								this._OnSelectionChanged();
								if (c != this.getValue()) {
									this._OnValueChanged();
									this.fire("itemclick", {
										htmlEvent : f
									})
								}
							}
							return
						}
						this._fireEvent(f, "Click")
					},
					getAttrs : function(e) {
						var b = fui.ListBox.superclass.getAttrs.call(this, e);
						fui
								._ParseString(e, b, [ "nullItemText",
										"ondrawcell" ]);
						fui._ParseBool(e, b, [ "showCheckBox",
								"showAllCheckBox", "showNullItem" ]);
						if (e.nodeName.toLowerCase() != "select") {
							var d = fui.getChildNodes(e);
							for (var c = 0, a = d.length; c < a; c++) {
								var f = d[c];
								var g = jQuery(f).attr("property");
								if (!g) {
									continue
								}
								g = g.toLowerCase();
								if (g == "columns") {
									b.columns = fui._ParseColumns(f)
								} else {
									if (g == "data") {
										b.data = f.innerHTML
									}
								}
							}
						}
						return b
					}
				});
fui.regClass(fui.ListBox, "listbox");
fui.CheckBoxList = function() {
	fui.CheckBoxList.superclass.constructor.call(this)
};
fui
		.extend(
				fui.CheckBoxList,
				fui.ListControl,
				{
					formField : true,
					multiSelect : true,
					repeatItems : 0,
					repeatLayout : "none",
					repeatDirection : "horizontal",
					_itemCls : "fui-checkboxlist-item",
					_itemHoverCls : "fui-checkboxlist-item-hover",
					_itemSelectedCls : "fui-checkboxlist-item-selected",
					_tableCls : "fui-checkboxlist-table",
					_tdCls : "fui-checkboxlist-td",
					_checkType : "checkbox",
					uiCls : "fui-checkboxlist",
					_create : function() {
						var a = this.el = document.createElement("div");
						this.el.className = this.uiCls;
						this.el.innerHTML = '<table><tr><td><div class="fui-list-inner"></div><div class="fui-errorIcon"></div><input type="hidden" /></td></tr></table>';
						this.cellEl = this.el.firstChild.rows[0].cells[0];
						this._innerEl = this.cellEl.firstChild;
						this._valueEl = this.cellEl.lastChild;
						this._errorIconEl = this.cellEl.childNodes[1]
					},
					_getRepeatTable : function() {
						var f = [];
						if (this.repeatItems > 0) {
							if (this.repeatDirection == "horizontal") {
								var g = [];
								for (var d = 0, b = this.data.length; d < b; d++) {
									var e = this.data[d];
									if (g.length == this.repeatItems) {
										f.push(g);
										g = []
									}
									g.push(e)
								}
								f.push(g)
							} else {
								var a = this.repeatItems > this.data.length ? this.data.length
										: this.repeatItems;
								for (var d = 0, b = a; d < b; d++) {
									f.push([])
								}
								for (var d = 0, b = this.data.length; d < b; d++) {
									var e = this.data[d];
									var c = d % this.repeatItems;
									f[c].push(e)
								}
							}
						} else {
							f = [ this.data.clone() ]
						}
						return f
					},
					doUpdate : function() {
						var d = this.data;
						var m = "";
						for (var e = 0, a = d.length; e < a; e++) {
							var f = d[e];
							f._i = e
						}
						if (this.repeatLayout == "flow") {
							var g = this._getRepeatTable();
							for (var e = 0, a = g.length; e < a; e++) {
								var h = g[e];
								for (var c = 0, b = h.length; c < b; c++) {
									var f = h[c];
									m += this._createItemHtml(f, f._i)
								}
								if (e != a - 1) {
									m += "<br/>"
								}
							}
						} else {
							if (this.repeatLayout == "table") {
								var g = this._getRepeatTable();
								m += '<table class="' + this._tableCls
										+ '" cellpadding="0" cellspacing="1">';
								for (var e = 0, a = g.length; e < a; e++) {
									var h = g[e];
									m += "<tr>";
									for (var c = 0, b = h.length; c < b; c++) {
										var f = h[c];
										m += '<td class="' + this._tdCls + '">';
										m += this._createItemHtml(f, f._i);
										m += "</td>"
									}
									m += "</tr>"
								}
								m += "</table>"
							} else {
								for (var e = 0, a = d.length; e < a; e++) {
									var f = d[e];
									m += this._createItemHtml(f, e)
								}
							}
						}
						this._innerEl.innerHTML = m;
						for (var e = 0, a = d.length; e < a; e++) {
							var f = d[e];
							delete f._i
						}
					},
					_createItemHtml : function(i, d) {
						var f = this._OnDrawItem(i, d);
						var a = this._createItemId(d);
						var g = this._createCheckId(d);
						var b = this.getItemValue(i);
						var c = "";
						var j = '<div id="' + a + '" index="' + d + '" class="'
								+ this._itemCls + " ";
						if (i.enabled === false) {
							j += " fui-disabled ";
							c = "disabled"
						}
						var h = 'onclick="return false"';
						h = 'onmousedown="this._checked = this.checked;" onclick="this.checked = this._checked"';
						j += f.itemCls + '" style="' + f.itemStyle
								+ '"><input ' + h + " " + c + ' value="' + b
								+ '" id="' + g + '" type="' + this._checkType
								+ '" /><label for="' + g
								+ '" onclick="return false;">';
						j += f.itemHtml + "</label></div>";
						return j
					},
					_OnDrawItem : function(b, a) {
						var c = this.getItemText(b);
						var d = {
							index : a,
							item : b,
							itemHtml : c,
							itemCls : "",
							itemStyle : ""
						};
						this.fire("drawitem", d);
						if (d.itemHtml === null || d.itemHtml === undefined) {
							d.itemHtml = ""
						}
						return d
					},
					setRepeatItems : function(a) {
						a = parseInt(a);
						if (isNaN(a)) {
							a = 0
						}
						if (this.repeatItems != a) {
							this.repeatItems = a;
							this.doUpdate()
						}
					},
					getRepeatItems : function() {
						return this.repeatItems
					},
					setRepeatLayout : function(a) {
						if (a != "flow" && a != "table") {
							a = "none"
						}
						if (this.repeatLayout != a) {
							this.repeatLayout = a;
							this.doUpdate()
						}
					},
					getRepeatLayout : function() {
						return this.repeatLayout
					},
					setRepeatDirection : function(a) {
						if (a != "vertical") {
							a = "horizontal"
						}
						if (this.repeatDirection != a) {
							this.repeatDirection = a;
							this.doUpdate()
						}
					},
					getRepeatDirection : function() {
						return this.repeatDirection
					},
					getAttrs : function(d) {
						var b = fui.CheckBoxList.superclass.getAttrs.call(this,
								d);
						var f = jQuery(d);
						fui._ParseString(d, b, [ "ondrawitem" ]);
						var e = parseInt(f.attr("repeatItems"));
						if (!isNaN(e)) {
							b.repeatItems = e
						}
						var a = f.attr("repeatLayout");
						if (a) {
							b.repeatLayout = a
						}
						var c = f.attr("repeatDirection");
						if (c) {
							b.repeatDirection = c
						}
						return b
					}
				});
fui.regClass(fui.CheckBoxList, "checkboxlist");
fui.RadioButtonList = function() {
	fui.RadioButtonList.superclass.constructor.call(this)
};
fui.extend(fui.RadioButtonList, fui.CheckBoxList, {
	multiSelect : false,
	_itemCls : "fui-radiobuttonlist-item",
	_itemHoverCls : "fui-radiobuttonlist-item-hover",
	_itemSelectedCls : "fui-radiobuttonlist-item-selected",
	_tableCls : "fui-radiobuttonlist-table",
	_tdCls : "fui-radiobuttonlist-td",
	_checkType : "radio",
	uiCls : "fui-radiobuttonlist"
});
fui.regClass(fui.RadioButtonList, "radiobuttonlist");
fui.TreeSelect = function() {
	this.data = [];
	fui.TreeSelect.superclass.constructor.call(this)
};
fui.extend(fui.TreeSelect, fui.PopupEdit, {
	valueFromSelect : false,
	text : "",
	value : "",
	autoCheckParent : false,
	expandOnLoad : false,
	valueField : "id",
	textField : "text",
	nodesField : "children",
	dataField : "",
	delimiter : ",",
	multiSelect : false,
	data : [],
	url : "",
	allowInput : false,
	showTreeIcon : false,
	showTreeLines : true,
	resultAsTree : false,
	parentField : "pid",
	checkRecursive : false,
	showFolderCheckBox : false,
	popupHeight : 200,
	popupWidth : "100%",
	popupMaxHeight : 250,
	popupMinWidth : 100,
	set : function(d) {
		if (typeof d == "string") {
			return this
		}
		var c = d.value;
		delete d.value;
		var e = d.text;
		delete d.text;
		var a = d.url;
		delete d.url;
		var b = d.data;
		delete d.data;
		fui.TreeSelect.superclass.set.call(this, d);
		if (!fui.isNull(b)) {
			this.setData(b)
		}
		if (!fui.isNull(a)) {
			this.setUrl(a)
		}
		if (!fui.isNull(c)) {
			this.setValue(c)
		}
		if (!fui.isNull(e)) {
			this.setText(e)
		}
		return this
	},
	uiCls : "fui-treeselect",
	_createPopup : function() {
		fui.TreeSelect.superclass._createPopup.call(this);
		this.tree = new fui.Tree();
		this.tree.setShowTreeIcon(true);
		this.tree.setStyle("border:0;width:100%;height:100%;overflow:hidden;");
		this.tree.setResultAsTree(this.resultAsTree);
		this.tree.render(this.popup._contentEl);
		this.tree.setCheckRecursive(this.checkRecursive);
		this.tree.setShowFolderCheckBox(this.showFolderCheckBox);
		this.tree.on("nodeclick", this.__OnNodeClick, this);
		this.tree.on("nodecheck", this.__OnCheckedChanged, this);
		this.tree.on("expand", this.__OnTreeExpand, this);
		this.tree.on("collapse", this.__OnTreeCollapse, this);
		this.tree.on("beforenodecheck", this.__OnTreeBeforeNodeCheck, this);
		this.tree.on("beforenodeselect", this.__OnTreeBeforeNodeSelect, this);
		this.tree.on("drawnode", this.__OnDrawNode, this);
		this.tree.useAnimation = false;
		var a = this;
		this.tree.on("beforeload", function(b) {
			a.fire("beforeload", b)
		}, this);
		this.tree.on("load", function(b) {
			a.fire("load", b)
		}, this);
		this.tree.on("loaderror", function(b) {
			a.fire("loaderror", b)
		}, this)
	},
	__OnDrawNode : function(a) {
		this.fire("drawnode", a)
	},
	__OnTreeBeforeNodeCheck : function(a) {
		a.tree = a.sender;
		this.fire("beforenodecheck", a)
	},
	__OnTreeBeforeNodeSelect : function(a) {
		a.tree = a.sender;
		this.fire("beforenodeselect", a)
	},
	__OnTreeExpand : function(a) {
	},
	__OnTreeCollapse : function(a) {
	},
	findItems : function(a) {
		return this._listbox.findItems(a)
	},
	findNodes : function(a) {
		return this.tree.getNodesByValue(a)
	},
	getSelectedNode : function() {
		return this.getSelectedNodes()[0]
	},
	getCheckedNodes : function(a) {
		return this.tree.getNodesByValue(this.value)
	},
	getSelectedNodes : function() {
		return this.tree.getNodesByValue(this.value)
	},
	getParentNode : function(a) {
		return this.tree.getParentNode(a)
	},
	getChildNodes : function(a) {
		return this.tree.getChildNodes(a)
	},
	showPopup : function() {
		var a = {
			cancel : false
		};
		this.fire("beforeshowpopup", a);
		if (a.cancel == true) {
			return
		}
		var b = this.popup.el.style.height;
		fui.TreeSelect.superclass.showPopup.call(this);
		this.tree.setValue(this.value)
	},
	__OnPopupHide : function(a) {
		this.__doFocusCls();
		this.tree.clearFilter();
		this.fire("hidepopup")
	},
	getItem : function(a) {
		return typeof a == "object" ? a : this.data[a]
	},
	indexOf : function(a) {
		return this.data.indexOf(a)
	},
	getAt : function(a) {
		return this.data[a]
	},
	loadList : function(b, a, c) {
		this.tree.loadList(b, a, c);
		this.data = this.tree.getData()
	},
	getList : function() {
		return this.tree.getList()
	},
	load : function(a) {
		this.tree.load(a);
		this.data = this.tree.data
	},
	setData : function(a) {
		this.tree.setData(a);
		this.data = this.tree.data
	},
	getData : function() {
		return this.data
	},
	setUrl : function(a) {
		this.getPopup();
		this.tree.setUrl(a);
		this.url = this.tree.url;
		this.data = this.tree.data
	},
	getUrl : function() {
		return this.url
	},
	virtualScroll : false,
	setVirtualScroll : function(a) {
		if (this.tree) {
			this.tree.setVirtualScroll(a)
		}
		this.virtualScroll = a
	},
	getVirtualScroll : function() {
		return this.virtualScroll
	},
	setTextField : function(a) {
		if (this.tree) {
			this.tree.setTextField(a)
		}
		this.textField = a
	},
	getTextField : function() {
		return this.textField
	},
	setNodesField : function(a) {
		if (this.tree) {
			this.tree.setNodesField(a)
		}
		this.nodesField = a
	},
	getNodesField : function() {
		return this.nodesField
	},
	setDataField : function(a) {
		if (this.tree) {
			this.tree.setDataField(a)
		}
		this.dataField = a
	},
	getDataField : function() {
		return this.dataField
	},
	setValue : function(b) {
		var a = this.tree.getValueAndText(b);
		if (a[1] == "" && !this.valueFromSelect) {
			a[0] = b;
			a[1] = b
		}
		this.value = b;
		this._valueEl.value = b;
		this.text = this._textEl.value = a[1];
		this._doEmpty()
	},
	setMultiSelect : function(a) {
		if (this.multiSelect != a) {
			this.multiSelect = a;
			this.tree.setShowCheckBox(a);
			this.tree.setAllowSelect(!a);
			this.tree.setEnableHotTrack(!a)
		}
	},
	getMultiSelect : function() {
		return this.multiSelect
	},
	__OnNodeClick : function(f) {
		if (this.multiSelect) {
			return
		}
		var b = this.tree.getSelectedNode();
		var d = this.tree.getValueAndText(b);
		var a = d[0];
		var c = this.getValue();
		this.setValue(a);
		if (c != this.getValue()) {
			this._OnValueChanged()
		}
		this.hidePopup();
		this.focus();
		this.fire("nodeclick", {
			node : f.node
		})
	},
	__OnCheckedChanged : function(c) {
		if (!this.multiSelect) {
			return
		}
		var a = this.tree.getValue();
		var b = this.getValue();
		this.setValue(a);
		if (b != this.getValue()) {
			this._OnValueChanged()
		}
		this.focus()
	},
	__OnInputKeyDown : function(c) {
		var a = {
			htmlEvent : c
		};
		this.fire("keydown", a);
		if (c.keyCode == 8 && (this.isReadOnly() || this.allowInput == false)) {
			return false
		}
		if (c.keyCode == 9) {
			if (this.isShowPopup()) {
				this.hidePopup()
			}
			return
		}
		if (this.isReadOnly()) {
			return
		}
		switch (c.keyCode) {
		case 27:
			if (this.isShowPopup()) {
				c.stopPropagation()
			}
			this.hidePopup();
			break;
		case 13:
			var b = this;
			setTimeout(function() {
				b.fire("enter", a)
			}, 10);
			break;
		case 37:
			break;
		case 38:
			c.preventDefault();
			break;
		case 39:
			break;
		case 40:
			c.preventDefault();
			this.showPopup();
			break;
		default:
			var b = this;
			setTimeout(function() {
				b._doQuery()
			}, 10);
			break
		}
	},
	_doQuery : function() {
		var b = this.textField;
		var a = this._textEl.value.toLowerCase();
		this.tree.filter(function(c) {
			var d = String(c[b] ? c[b] : "").toLowerCase();
			if (d.indexOf(a) != -1) {
				return true
			} else {
				return false
			}
		});
		this.tree.expandAll();
		this.showPopup()
	},
	setCheckRecursive : function(a) {
		this.checkRecursive = a;
		if (this.tree) {
			this.tree.setCheckRecursive(a)
		}
	},
	getCheckRecursive : function() {
		return this.checkRecursive
	},
	setResultAsTree : function(a) {
		this.resultAsTree = a;
		if (this.tree) {
			this.tree.setResultAsTree(a)
		}
	},
	getResultAsTree : function() {
		return this.resultAsTree
	},
	setParentField : function(a) {
		this.parentField = a;
		if (this.tree) {
			this.tree.setParentField(a)
		}
	},
	getParentField : function() {
		return this.parentField
	},
	setValueField : function(a) {
		if (this.tree) {
			this.tree.setIdField(a)
		}
		this.valueField = a
	},
	getValueField : function() {
		return this.valueField
	},
	setShowTreeIcon : function(a) {
		this.showTreeIcon = a;
		if (this.tree) {
			this.tree.setShowTreeIcon(a)
		}
	},
	getShowTreeIcon : function() {
		return this.showTreeIcon
	},
	setShowTreeLines : function(a) {
		this.showTreeLines = a;
		if (this.tree) {
			this.tree.setShowTreeLines(a)
		}
	},
	getShowTreeLines : function() {
		return this.showTreeLines
	},
	setShowFolderCheckBox : function(a) {
		this.showFolderCheckBox = a;
		if (this.tree) {
			this.tree.setShowFolderCheckBox(a)
		}
	},
	getShowFolderCheckBox : function() {
		return this.showFolderCheckBox
	},
	setAutoCheckParent : function(a) {
		this.autoCheckParent = a;
		if (this.tree) {
			this.tree.setAutoCheckParent(a)
		}
	},
	getAutoCheckParent : function() {
		return this.autoCheckParent
	},
	setExpandOnLoad : function(a) {
		this.expandOnLoad = a;
		if (this.tree) {
			this.tree.setExpandOnLoad(a)
		}
	},
	getExpandOnLoad : function() {
		return this.expandOnLoad
	},
	setValueFromSelect : function(a) {
		this.valueFromSelect = a
	},
	getValueFromSelect : function() {
		return this.valueFromSelect
	},
	setAjaxData : function(a) {
		this.ajaxData = a;
		this.tree.setAjaxData(a)
	},
	getAttrs : function(b) {
		var a = fui.ComboBox.superclass.getAttrs.call(this, b);
		fui._ParseString(b, a, [ "url", "data", "textField", "valueField",
				"nodesField", "parentField", "onbeforenodecheck",
				"onbeforenodeselect", "expandOnLoad", "onnodeclick",
				"onbeforeload", "onload", "onloaderror", "ondrawnode" ]);
		fui._ParseBool(b, a, [ "multiSelect", "resultAsTree", "checkRecursive",
				"showTreeIcon", "showTreeLines", "showFolderCheckBox",
				"autoCheckParent", "valueFromSelect", "virtualScroll" ]);
		if (a.expandOnLoad) {
			var c = parseInt(a.expandOnLoad);
			if (fui.isNumber(c)) {
				a.expandOnLoad = c
			} else {
				a.expandOnLoad = a.expandOnLoad == "true" ? true : false
			}
		}
		return a
	}
});
fui.regClass(fui.TreeSelect, "TreeSelect");
fui.Spinner = function() {
	fui.Spinner.superclass.constructor.call(this);
	this.setValue(this.minValue)
};
fui
		.extend(
				fui.Spinner,
				fui.ButtonEdit,
				{
					value : 0,
					minValue : 0,
					maxValue : 100,
					increment : 1,
					decimalPlaces : 0,
					changeOnMousewheel : true,
					allowLimitValue : true,
					set : function(b) {
						if (typeof b == "string") {
							return this
						}
						var a = b.value;
						delete b.value;
						fui.Spinner.superclass.set.call(this, b);
						if (!fui.isNull(a)) {
							this.setValue(a)
						}
						return this
					},
					uiCls : "fui-spinner",
					_getButtonHtml : function() {
						var a = "onmouseover=\"fui.addClass(this, '"
								+ this._buttonHoverCls
								+ "');\" onmouseout=\"fui.removeClass(this, '"
								+ this._buttonHoverCls + "');\"";
						return '<span class="fui-buttonedit-button" '
								+ a
								+ '><span class="fui-buttonedit-up"><span></span></span><span class="fui-buttonedit-down"><span></span></span></span>'
					},
					_initEvents : function() {
						fui.Spinner.superclass._initEvents.call(this);
						fui._BindEvents(function() {
							this.on("buttonmousedown",
									this.__OnButtonMouseDown, this);
							fui.on(this.el, "mousewheel", this.__OnMousewheel,
									this)
						}, this)
					},
					_ValueLimit : function() {
						if (this.allowLimitValue == false) {
							return
						}
						if (this.minValue > this.maxValue) {
							this.maxValue = this.minValue + 100
						}
						if (this.value < this.minValue) {
							this.setValue(this.minValue)
						}
						if (this.value > this.maxValue) {
							this.setValue(this.maxValue)
						}
					},
					getFormValue : function() {
						var b = this.value;
						b = parseFloat(b);
						if (isNaN(b)) {
							b = 0
						}
						var f = String(b).split(".");
						var e = f[0], c = f[1];
						if (!c) {
							c = ""
						}
						if (this.decimalPlaces > 0) {
							for (var d = c.length, a = this.decimalPlaces; d < a; d++) {
								c += "0"
							}
							c = "." + c
						}
						return e + c
					},
					setValue : function(a) {
						a = parseFloat(a);
						if (isNaN(a)) {
							a = this.defaultValue
						}
						a = parseFloat(a);
						if (isNaN(a)) {
							a = this.minValue
						}
						a = parseFloat(a.toFixed(this.decimalPlaces));
						if (this.value != a) {
							this.value = a;
							this._ValueLimit();
							this._valueEl.value = this.value;
							this.text = this._textEl.value = this
									.getFormValue()
						} else {
							this.text = this._textEl.value = this
									.getFormValue()
						}
					},
					setMaxValue : function(a) {
						a = parseFloat(a);
						if (isNaN(a)) {
							return
						}
						a = parseFloat(a.toFixed(this.decimalPlaces));
						if (this.maxValue != a) {
							this.maxValue = a;
							this._ValueLimit()
						}
					},
					getMaxValue : function(a) {
						return this.maxValue
					},
					setMinValue : function(a) {
						a = parseFloat(a);
						if (isNaN(a)) {
							return
						}
						a = parseFloat(a.toFixed(this.decimalPlaces));
						if (this.minValue != a) {
							this.minValue = a;
							this._ValueLimit()
						}
					},
					getMinValue : function(a) {
						return this.minValue
					},
					setIncrement : function(a) {
						a = parseFloat(a);
						if (isNaN(a)) {
							return
						}
						if (this.increment != a) {
							this.increment = a
						}
					},
					getIncrement : function(a) {
						return this.increment
					},
					setDecimalPlaces : function(a) {
						a = parseInt(a);
						if (isNaN(a) || a < 0) {
							return
						}
						this.decimalPlaces = a
					},
					getDecimalPlaces : function(a) {
						return this.decimalPlaces
					},
					setChangeOnMousewheel : function(a) {
						this.changeOnMousewheel = a
					},
					getChangeOnMousewheel : function(a) {
						return this.changeOnMousewheel
					},
					setAllowLimitValue : function(a) {
						this.allowLimitValue = a
					},
					getAllowLimitValue : function(a) {
						return this.allowLimitValue
					},
					_SpinTimer : null,
					_StartSpin : function(a, f, e) {
						this._StopSpin();
						this.setValue(this.value + a);
						var d = this;
						var c = e;
						var b = new Date();
						this._SpinTimer = setInterval(function() {
							d.setValue(d.value + a);
							d._OnValueChanged();
							e--;
							if (e == 0 && f > 50) {
								d._StartSpin(a, f - 100, c + 3)
							}
							var g = new Date();
							if (g - b > 500) {
								d._StopSpin()
							}
							b = g
						}, f);
						fui.on(document, "mouseup", this._OnDocumentMouseUp,
								this)
					},
					_StopSpin : function() {
						clearInterval(this._SpinTimer);
						this._SpinTimer = null
					},
					__OnButtonMouseDown : function(a) {
						this._DownValue = this.getValue();
						this.__OnInputTextChanged();
						if (a.spinType == "up") {
							this._StartSpin(this.increment, 230, 2)
						} else {
							this._StartSpin(-this.increment, 230, 2)
						}
					},
					__OnInputKeyDown : function(b) {
						fui.Spinner.superclass.__OnInputKeyDown.call(this, b);
						var a = fui.Keyboard;
						switch (b.keyCode) {
						case a.Top:
							this.setValue(this.value + this.increment);
							this._OnValueChanged();
							break;
						case a.Bottom:
							this.setValue(this.value - this.increment);
							this._OnValueChanged();
							break
						}
					},
					__OnMousewheel : function(c) {
						if (this.isReadOnly()) {
							return
						}
						if (this.changeOnMousewheel == false) {
							return
						}
						var b = c.wheelDelta || c.originalEvent.wheelDelta;
						if (fui.isNull(b)) {
							b = -c.detail * 24
						}
						var a = this.increment;
						if (b < 0) {
							a = -a
						}
						this.setValue(this.value + a);
						this._OnValueChanged();
						return false
					},
					_OnDocumentMouseUp : function(a) {
						this._StopSpin();
						fui.un(document, "mouseup", this._OnDocumentMouseUp,
								this);
						if (this._DownValue != this.getValue()) {
							this._OnValueChanged()
						}
					},
					__OnInputTextChanged : function(c) {
						var a = this.getValue();
						var b = parseFloat(this._textEl.value);
						this.setValue(b);
						if (a != this.getValue()) {
							this._OnValueChanged()
						}
					},
					getAttrs : function(b) {
						var a = fui.Spinner.superclass.getAttrs.call(this, b);
						fui._ParseString(b, a, [ "minValue", "maxValue",
								"increment", "decimalPlaces",
								"changeOnMousewheel" ]);
						fui._ParseBool(b, a, [ "allowLimitValue" ]);
						return a
					}
				});
fui.regClass(fui.Spinner, "spinner");
fui.TimeSpinner = function() {
	fui.TimeSpinner.superclass.constructor.call(this);
	this.setValue("00:00:00")
};
fui
		.extend(
				fui.TimeSpinner,
				fui.ButtonEdit,
				{
					value : null,
					format : "H:mm:ss",
					uiCls : "fui-timespinner",
					_getButtonHtml : function() {
						var a = "onmouseover=\"fui.addClass(this, '"
								+ this._buttonHoverCls
								+ "');\" onmouseout=\"fui.removeClass(this, '"
								+ this._buttonHoverCls + "');\"";
						return '<span class="fui-buttonedit-button" '
								+ a
								+ '><span class="fui-buttonedit-up"><span></span></span><span class="fui-buttonedit-down"><span></span></span></span>'
					},
					_initEvents : function() {
						fui.TimeSpinner.superclass._initEvents.call(this);
						fui._BindEvents(function() {
							this.on("buttonmousedown",
									this.__OnButtonMouseDown, this);
							fui.on(this.el, "mousewheel", this.__OnMousewheel,
									this);
							fui.on(this._textEl, "keydown", this.__OnKeyDown,
									this)
						}, this)
					},
					setFormat : function(b) {
						if (typeof b != "string") {
							return
						}
						var a = [ "H:mm:ss", "HH:mm:ss", "H:mm", "HH:mm", "H",
								"HH", "mm:ss" ];
						if (this.format != b) {
							this.format = b;
							this.text = this._textEl.value = this
									.getFormattedValue()
						}
					},
					getFormat : function() {
						return this.format
					},
					setValue : function(a) {
						a = fui.parseTime(a, this.format);
						if (!a) {
							a = null
						}
						if (fui.isDate(a)) {
							a = new Date(a.getTime())
						}
						this.value = a;
						this.text = this._textEl.value = this
								.getFormattedValue();
						this._valueEl.value = this.getFormValue()
					},
					getValue : function() {
						return this.value == null ? null : new Date(this.value
								.getTime())
					},
					getFormValue : function() {
						if (!this.value) {
							return ""
						}
						return fui.formatDate(this.value, this.format)
					},
					getFormattedValue : function() {
						if (!this.value) {
							return ""
						}
						return fui.formatDate(this.value, this.format)
					},
					_ChangeValue : function(a, e) {
						var d = this.getValue();
						if (d) {
							switch (e) {
							case "hours":
								var b = d.getHours() + a;
								if (b > 23) {
									b = 23
								}
								if (b < 0) {
									b = 0
								}
								d.setHours(b);
								break;
							case "minutes":
								var c = d.getMinutes() + a;
								if (c > 59) {
									c = 59
								}
								if (c < 0) {
									c = 0
								}
								d.setMinutes(c);
								break;
							case "seconds":
								var f = d.getSeconds() + a;
								if (f > 59) {
									f = 59
								}
								if (f < 0) {
									f = 0
								}
								d.setSeconds(f);
								break
							}
						} else {
							d = "00:00:00"
						}
						this.setValue(d)
					},
					_SpinTimer : null,
					_StartSpin : function(a, f, e) {
						this._StopSpin();
						this._ChangeValue(a, this._timeType);
						var d = this;
						var c = e;
						var b = new Date();
						this._SpinTimer = setInterval(function() {
							d._ChangeValue(a, d._timeType);
							e--;
							if (e == 0 && f > 50) {
								d._StartSpin(a, f - 100, c + 3)
							}
							var g = new Date();
							if (g - b > 500) {
								d._StopSpin()
							}
							b = g
						}, f);
						fui.on(document, "mouseup", this._OnDocumentMouseUp,
								this)
					},
					_StopSpin : function() {
						clearInterval(this._SpinTimer);
						this._SpinTimer = null
					},
					__OnButtonMouseDown : function(a) {
						this._DownValue = this.getFormValue();
						this._timeType = "hours";
						if (a.spinType == "up") {
							this._StartSpin(1, 230, 2)
						} else {
							this._StartSpin(-1, 230, 2)
						}
					},
					_OnDocumentMouseUp : function(a) {
						this._StopSpin();
						fui.un(document, "mouseup", this._OnDocumentMouseUp,
								this);
						if (this._DownValue != this.getFormValue()) {
							this._OnValueChanged()
						}
					},
					__OnInputTextChanged : function(b) {
						var a = this.getFormValue();
						this.setValue(this._textEl.value);
						if (a != this.getFormValue()) {
							this._OnValueChanged()
						}
					},
					getAttrs : function(b) {
						var a = fui.TimeSpinner.superclass.getAttrs.call(this,
								b);
						fui._ParseString(b, a, [ "format" ]);
						return a
					}
				});
fui.regClass(fui.TimeSpinner, "timespinner");
fui.HtmlFile = function() {
	fui.HtmlFile.superclass.constructor.call(this);
	this.on("validation", this.__OnValidation, this)
};
fui.extend(fui.HtmlFile, fui.ButtonEdit, {
	width : 180,
	buttonText : "浏览...",
	_buttonWidth : 56,
	limitType : "",
	limitTypeErrorText : "上传文件格式为：",
	allowInput : false,
	readOnly : true,
	_cellSpacing : 0,
	uiCls : "fui-htmlfile",
	_create : function() {
		fui.HtmlFile.superclass._create.call(this);
		this._fileEl = fui.append(this.el,
				'<input type="file" hideFocus class="fui-htmlfile-file" name="'
						+ this.name + '" ContentEditable=false/>');
		fui.on(this._borderEl, "mousemove", this.__OnMouseMove, this);
		fui.on(this._fileEl, "change", this.__OnFileChange, this)
	},
	_getButtonHtml : function() {
		var a = "onmouseover=\"fui.addClass(this, '" + this._buttonHoverCls
				+ "');\" onmouseout=\"fui.removeClass(this, '"
				+ this._buttonHoverCls + "');\"";
		return '<span class="fui-buttonedit-button" ' + a + ">"
				+ this.buttonText + "</span>"
	},
	__OnFileChange : function(a) {
		this.value = this._textEl.value = this._fileEl.value;
		this._OnValueChanged();
		a = {
			htmlEvent : a
		};
		this.fire("fileselect", a)
	},
	__OnMouseMove : function(c) {
		var a = c.pageX, d = c.pageY;
		var b = fui.getBox(this.el);
		a = (a - b.x - 5);
		d = (d - b.y - 5);
		if (this.enabled == false) {
			a = -20;
			d = -20
		}
		this._fileEl.style.display = "";
		this._fileEl.style.left = a + "px";
		this._fileEl.style.top = d + "px"
	},
	__OnValidation : function(c) {
		if (!this.limitType) {
			return
		}
		if (c.isValid == false) {
			return
		}
		if (this.required == false && c.value == "") {
			return
		}
		var d = c.value.split(".");
		var a = "*." + d[d.length - 1];
		var b = this.limitType.split(";");
		if (b.length > 0 && b.indexOf(a) == -1) {
			c.errorText = this.limitTypeErrorText + this.limitType;
			c.isValid = false
		}
	},
	setName : function(a) {
		this.name = a;
		fui.setAttr(this._fileEl, "name", this.name)
	},
	getValue : function() {
		return this._textEl.value
	},
	setButtonText : function(a) {
		this.buttonText = a
	},
	getButtonText : function() {
		return this.buttonText
	},
	setLimitType : function(a) {
		this.limitType = a
	},
	getLimitType : function() {
		return this.limitType
	},
	getAttrs : function(b) {
		var a = fui.HtmlFile.superclass.getAttrs.call(this, b);
		fui._ParseString(b, a, [ "limitType", "buttonText",
				"limitTypeErrorText" ]);
		return a
	}
});
fui.regClass(fui.HtmlFile, "htmlfile");
fui.FileUpload = function(a) {
	this.postParam = {};
	fui.FileUpload.superclass.constructor.call(this, a);
	this.on("validation", this.__OnValidation, this)
};
fui.extend(fui.FileUpload, fui.ButtonEdit, {
	width : 180,
	buttonText : "浏览...",
	_buttonWidth : 56,
	limitTypeErrorText : "上传文件格式为：",
	readOnly : true,
	_cellSpacing : 0,
	limitSize : "",
	limitType : "",
	typesDescription : "上传文件格式",
	uploadLimit : 0,
	queueLimit : "",
	flashUrl : "",
	uploadUrl : "",
	postParam : null,
	uploadOnSelect : false,
	uiCls : "fui-fileupload",
	_create : function() {
		fui.FileUpload.superclass._create.call(this);
		fui.addClass(this.el, "fui-htmlfile");
		this._uploadId = this.uid + "$button_placeholder";
		this._fileEl = fui.append(this.el, '<span id="' + this._uploadId
				+ '"></span>');
		this.uploadEl = this._fileEl;
		fui.on(this._borderEl, "mousemove", this.__OnMouseMove, this)
	},
	_getButtonHtml : function() {
		var a = "onmouseover=\"fui.addClass(this, '" + this._buttonHoverCls
				+ "');\" onmouseout=\"fui.removeClass(this, '"
				+ this._buttonHoverCls + "');\"";
		return '<span class="fui-buttonedit-button" ' + a + ">"
				+ this.buttonText + "</span>"
	},
	destroy : function(a) {
		if (this._innerEl) {
			fui.clearEvent(this._innerEl);
			this._innerEl = null
		}
		fui.FileUpload.superclass.destroy.call(this, a)
	},
	__OnMouseMove : function(a) {
		if (this.enabled == false) {
			return
		}
		var d = this;
		if (!this.swfUpload) {
			var b = new SWFUpload({
				file_post_name : this.name,
				upload_url : d.uploadUrl,
				flash_url : d.flashUrl,
				file_size_limit : d.limitSize,
				file_types : d.limitType,
				file_types_description : d.typesDescription,
				file_upload_limit : parseInt(d.uploadLimit),
				file_queue_limit : d.queueLimit,
				file_queued_handler : fui.createDelegate(this.__on_file_queued,
						this),
				upload_error_handler : fui.createDelegate(
						this.__on_upload_error, this),
				upload_success_handler : fui.createDelegate(
						this.__on_upload_success, this),
				upload_complete_handler : fui.createDelegate(
						this.__on_upload_complete, this),
				button_placeholder_id : this._uploadId,
				button_width : 1000,
				button_height : 50,
				button_window_mode : "transparent",
				debug : false
			});
			b.flashReady();
			this.swfUpload = b;
			var c = this.swfUpload.movieElement;
			c.style.zIndex = 1000;
			c.style.position = "absolute";
			c.style.left = "0px";
			c.style.top = "0px";
			c.style.width = "100%";
			c.style.height = "50px"
		} else {
		}
	},
	addPostParam : function(a) {
		fui.copyTo(this.postParam, a)
	},
	setPostParam : function(a) {
		this.addPostParam(a)
	},
	getPostParam : function() {
		return this.postParam
	},
	setLimitType : function(a) {
		this.limitType = a
	},
	getLimitType : function() {
		return this.limitType
	},
	setTypesDescription : function(a) {
		this.typesDescription = a
	},
	getTypesDescription : function() {
		return this.typesDescription
	},
	setButtonText : function(a) {
		this.buttonText = a;
		this._buttonEl.innerHTML = a
	},
	getButtonText : function() {
		return this.buttonText
	},
	setUploadLimit : function(a) {
		this.uploadLimit = a
	},
	setQueueLimit : function(a) {
		this.queueLimit = a
	},
	setFlashUrl : function(a) {
		this.flashUrl = a
	},
	setUploadUrl : function(a) {
		if (this.swfUpload) {
			this.swfUpload.setUploadURL(a)
		}
		this.uploadUrl = a
	},
	setName : function(a) {
		this.name = a
	},
	startUpload : function(b) {
		var a = {
			cancel : false
		};
		this.fire("beforeupload", a);
		if (a.cancel == true) {
			return
		}
		if (this.swfUpload) {
			this.swfUpload.setPostParams(this.postParam);
			this.swfUpload.startUpload()
		}
	},
	__on_file_queued : function(a) {
		var b = {
			file : a
		};
		if (this.uploadOnSelect) {
			this.startUpload()
		}
		this.setText(a.name);
		this.fire("fileselect", b)
	},
	__on_upload_success : function(b, a) {
		var c = {
			file : b,
			serverData : a
		};
		this.fire("uploadsuccess", c)
	},
	__on_upload_error : function(a) {
		var b = {
			file : a
		};
		this.fire("uploaderror", b)
	},
	__on_upload_complete : function(a) {
		this.fire("uploadcomplete", a)
	},
	__fileError : function() {
	},
	getAttrs : function(b) {
		var a = fui.FileUpload.superclass.getAttrs.call(this, b);
		fui._ParseString(b, a, [ "limitType", "limitSize", "flashUrl",
				"uploadUrl", "uploadLimit", "buttonText", "onuploadsuccess",
				"onuploaderror", "onuploadcomplete", "onfileselect" ]);
		fui._ParseBool(b, a, [ "uploadOnSelect" ]);
		return a
	}
});
fui.regClass(fui.FileUpload, "fileupload");
fui.Lookup = function() {
	this.data = [];
	fui.Lookup.superclass.constructor.call(this);
	fui.on(this._textEl, "mouseup", this.__OnMouseUp, this);
	this.on("showpopup", this.__OnShowPopup, this)
};
fui.extend(fui.Lookup, fui.PopupEdit, {
	allowInput : true,
	valueField : "id",
	textField : "text",
	delimiter : ",",
	multiSelect : false,
	data : [],
	grid : null,
	_destroyPopup : false,
	uiCls : "fui-lookup",
	destroy : function(a) {
		if (this.grid) {
			this.grid.un("rowclick", this.__OnGridRowClickChanged, this);
			this.grid.un("load", this.__OnGridLoad, this);
			this.grid = null
		}
		fui.Lookup.superclass.destroy.call(this, a)
	},
	setMultiSelect : function(a) {
		this.multiSelect = a;
		if (this.grid) {
			this.grid.setMultiSelect(a)
		}
	},
	setGrid : function(a) {
		if (typeof a == "string") {
			fui.parse(a);
			a = fui.get(a)
		}
		this.grid = fui.getAndCreate(a);
		if (this.grid) {
			this.grid.setMultiSelect(this.multiSelect);
			this.grid.setCheckSelectOnLoad(false);
			this.grid.on("rowclick", this.__OnGridRowClickChanged, this);
			this.grid.on("load", this.__OnGridLoad, this);
			this.grid.on("checkall", this.__OnGridRowClickChanged, this)
		}
	},
	getGrid : function() {
		return this.grid
	},
	setValueField : function(a) {
		this.valueField = a
	},
	getValueField : function() {
		return this.valueField
	},
	setTextField : function(a) {
		this.textField = a
	},
	getTextField : function() {
		return this.textField
	},
	deselectAll : function() {
		this.data = [];
		this.setValue("");
		this.setText("");
		if (this.grid) {
			this.grid.deselectAll()
		}
	},
	getItemValue : function(a) {
		return String(a[this.valueField])
	},
	getItemText : function(b) {
		var a = b[this.textField];
		return fui.isNull(a) ? "" : String(a)
	},
	getValueAndText : function(d) {
		if (fui.isNull(d)) {
			d = []
		}
		var c = [];
		var f = [];
		for (var e = 0, b = d.length; e < b; e++) {
			var a = d[e];
			if (a) {
				c.push(this.getItemValue(a));
				f.push(this.getItemText(a))
			}
		}
		return [ c.join(this.delimiter), f.join(this.delimiter) ]
	},
	_createData : function() {
		this.value = fui.isNull(this.value) ? "" : String(this.value);
		this.text = fui.isNull(this.text) ? "" : String(this.text);
		var d = [];
		var g = this.value.split(this.delimiter);
		var b = this.text.split(this.delimiter);
		var f = g.length;
		if (this.value) {
			for (var e = 0, c = f; e < c; e++) {
				var j = {};
				var a = g[e];
				var h = b[e];
				j[this.valueField] = a ? a : "";
				j[this.textField] = h ? h : "";
				d.push(j)
			}
		}
		this.data = d
	},
	_getValueMaps : function(c) {
		var f = {};
		for (var b = 0, a = c.length; b < a; b++) {
			var d = c[b];
			var e = d[this.valueField];
			f[e] = d
		}
		return f
	},
	setValue : function(a) {
		fui.Lookup.superclass.setValue.call(this, a);
		this._createData()
	},
	setText : function(a) {
		fui.Lookup.superclass.setText.call(this, a);
		this._createData()
	},
	__OnGridRowClickChanged : function(g) {
		var k = this._getValueMaps(this.grid.getData());
		var d = this._getValueMaps(this.grid.getSelecteds());
		var j = this._getValueMaps(this.data);
		if (this.multiSelect == false) {
			j = {};
			this.data = []
		}
		var h = {};
		for ( var a in j) {
			var b = j[a];
			if (k[a]) {
				if (d[a]) {
				} else {
					h[a] = b
				}
			}
		}
		for (var f = this.data.length - 1; f >= 0; f--) {
			var b = this.data[f];
			var a = b[this.valueField];
			if (h[a]) {
				this.data.removeAt(f)
			}
		}
		for ( var a in d) {
			var b = d[a];
			if (!j[a]) {
				this.data.push(b)
			}
		}
		var c = this.getValueAndText(this.data);
		this.setValue(c[0]);
		this.setText(c[1]);
		this._OnValueChanged()
	},
	__OnGridLoad : function(a) {
		this.__OnShowPopup(a)
	},
	__OnShowPopup : function(g) {
		var c = String(this.value).split(this.delimiter);
		var j = {};
		for (var f = 0, b = c.length; f < b; f++) {
			var h = c[f];
			j[h] = 1
		}
		var m = this.grid.getData();
		var d = [];
		for (var f = 0, b = m.length; f < b; f++) {
			var k = m[f];
			var a = k[this.valueField];
			if (j[a]) {
				d.push(k)
			}
		}
		this.grid.selects(d)
	},
	doUpdate : function() {
		fui.Lookup.superclass.doUpdate.call(this);
		this._textEl.readOnly = true;
		this.el.style.cursor = "default"
	},
	__OnInputKeyDown : function(a) {
		fui.Lookup.superclass.__OnInputKeyDown.call(this, a);
		switch (a.keyCode) {
		case 46:
		case 8:
			break;
		case 37:
			break;
		case 39:
			break
		}
	},
	__OnMouseUp : function(d) {
		if (this.isReadOnly()) {
			return
		}
		var c = fui.getSelectRange(this._textEl);
		var f = c[0], a = c[1];
		var b = this._findTextIndex(f)
	},
	_findTextIndex : function(g) {
		var c = -1;
		if (this.text == "") {
			return c
		}
		var e = String(this.text).split(this.delimiter);
		var a = 0;
		for (var d = 0, b = e.length; d < b; d++) {
			var f = e[d];
			if (a < g && g <= a + f.length) {
				c = d;
				break
			}
			a = a + f.length + 1
		}
		return c
	},
	getAttrs : function(b) {
		var a = fui.Lookup.superclass.getAttrs.call(this, b);
		fui._ParseString(b, a, [ "grid", "valueField", "textField" ]);
		fui._ParseBool(b, a, [ "multiSelect" ]);
		return a
	}
});
fui.regClass(fui.Lookup, "lookup");
fui.TextBoxList = function() {
	fui.TextBoxList.superclass.constructor.call(this);
	this.data = [];
	this.doUpdate()
};
fui
		.extend(
				fui.TextBoxList,
				fui.ValidatorBase,
				{
					formField : true,
					value : "",
					text : "",
					valueField : "id",
					textField : "text",
					data : "",
					url : "",
					delay : 150,
					allowInput : true,
					editIndex : 0,
					_focusCls : "fui-textboxlist-focus",
					_itemHoverClass : "fui-textboxlist-item-hover",
					_itemSelectedClass : "fui-textboxlist-item-selected",
					_closeHoverClass : "fui-textboxlist-close-hover",
					textName : "",
					setTextName : function(a) {
						this.textName = a
					},
					getTextName : function() {
						return this.textName
					},
					uiCls : "fui-textboxlist",
					_create : function() {
						var a = '<table class="fui-textboxlist" cellpadding="0" cellspacing="0"><tr ><td class="fui-textboxlist-border"><ul></ul><a href="#"></a><input type="hidden"/></td></tr></table>';
						var b = document.createElement("div");
						b.innerHTML = a;
						this.el = b.firstChild;
						var c = this.el.getElementsByTagName("td")[0];
						this.ulEl = c.firstChild;
						this._valueEl = c.lastChild;
						this.focusEl = c.childNodes[1]
					},
					destroy : function(a) {
						if (this.isShowPopup) {
							this.hidePopup()
						}
						fui.un(document, "mousedown", this.__OnDocMouseDown,
								this);
						fui.TextBoxList.superclass.destroy.call(this, a)
					},
					_initEvents : function() {
						fui.TextBoxList.superclass._initEvents.call(this);
						fui.on(this.el, "mousemove", this.__OnMouseMove, this);
						fui.on(this.el, "mouseout", this.__OnMouseOut, this);
						fui.on(this.el, "mousedown", this.__OnMouseDown, this);
						fui.on(this.el, "click", this.__OnClick, this);
						fui.on(this.el, "keydown", this.__OnKeyDown, this);
						fui.on(document, "mousedown", this.__OnDocMouseDown,
								this)
					},
					__OnDocMouseDown : function(a) {
						if (this.isReadOnly()) {
							return
						}
						if (this.isShowPopup) {
							if (!fui.isAncestor(this.popup.el, a.target)) {
								this.hidePopup()
							}
						}
						if (this._focused) {
							if (this.within(a) == false) {
								this.select(null, false);
								this.showInput(false);
								this.removeCls(this._focusCls);
								this._focused = false
							}
						}
					},
					errorIconEl : null,
					getErrorIconEl : function() {
						if (!this._errorIconEl) {
							var a = this.el.rows[0];
							var b = a.insertCell(1);
							b.style.cssText = "width:18px;vertical-align:top;";
							b.innerHTML = '<div class="fui-errorIcon"></div>';
							this._errorIconEl = b.firstChild
						}
						return this._errorIconEl
					},
					_RemoveErrorIcon : function() {
						if (this._errorIconEl) {
							jQuery(this._errorIconEl.parentNode).remove()
						}
						this._errorIconEl = null
					},
					doLayout : function() {
						if (this.canLayout() == false) {
							return
						}
						fui.TextBoxList.superclass.doLayout.call(this);
						if (this.isReadOnly() || this.allowInput == false) {
							this._inputEl.readOnly = true
						} else {
							this._inputEl.readOnly = false
						}
					},
					doUpdate : function() {
						if (this._ValueChangeTimer) {
							clearInterval(this._ValueChangeTimer)
						}
						if (this._inputEl) {
							fui.un(this._inputEl, "keydown",
									this.__OnInputKeyDown, this)
						}
						var g = [];
						var a = this.uid;
						for (var d = 0, c = this.data.length; d < c; d++) {
							var b = this.data[d];
							var j = a + "$text$" + d;
							var h = fui._getMap(this.textField, b);
							if (fui.isNull(h)) {
								h = ""
							}
							g[g.length] = '<li id="' + j
									+ '" class="fui-textboxlist-item">';
							g[g.length] = h;
							g[g.length] = '<span class="fui-textboxlist-close"></span></li>'
						}
						var f = a + "$input";
						g[g.length] = '<li id="'
								+ f
								+ '" class="fui-textboxlist-inputLi"><input class="fui-textboxlist-input" type="text" autocomplete="off"></li>';
						this.ulEl.innerHTML = g.join("");
						this.editIndex = this.data.length;
						if (this.editIndex < 0) {
							this.editIndex = 0
						}
						this.inputLi = this.ulEl.lastChild;
						this._inputEl = this.inputLi.firstChild;
						fui.on(this._inputEl, "keydown", this.__OnInputKeyDown,
								this);
						var e = this;
						this._inputEl.onkeyup = function() {
							e._syncInputSize()
						};
						e._ValueChangeTimer = null;
						e._LastInputText = e._inputEl.value;
						this._inputEl.onfocus = function() {
							e._ValueChangeTimer = setInterval(function() {
								if (e._LastInputText != e._inputEl.value) {
									e._startQuery();
									e._LastInputText = e._inputEl.value
								}
							}, 10);
							e.addCls(e._focusCls);
							e._focused = true;
							e.fire("focus")
						};
						this._inputEl.onblur = function() {
							clearInterval(e._ValueChangeTimer);
							e.fire("blur")
						}
					},
					getItemByEvent : function(c) {
						var b = fui
								.findParent(c.target, "fui-textboxlist-item");
						if (b) {
							var a = b.id.split("$");
							var d = a[a.length - 1];
							return this.data[d]
						}
					},
					getItem : function(a) {
						if (typeof a == "number") {
							return this.data[a]
						}
						if (typeof a == "object") {
							return a
						}
					},
					getItemEl : function(c) {
						var a = this.data.indexOf(c);
						var b = this.uid + "$text$" + a;
						return document.getElementById(b)
					},
					hoverItem : function(b, c) {
						if (this.isReadOnly() || this.enabled == false) {
							return
						}
						this.blurItem();
						var a = this.getItemEl(b);
						fui.addClass(a, this._itemHoverClass);
						if (c
								&& fui.hasClass(c.target,
										"fui-textboxlist-close")) {
							fui.addClass(c.target, this._closeHoverClass)
						}
					},
					blurItem : function() {
						var b = this.data.length;
						for (var d = 0, c = b; d < c; d++) {
							var e = this.data[d];
							var a = this.getItemEl(e);
							if (a) {
								fui.removeClass(a, this._itemHoverClass);
								fui.removeClass(a.lastChild,
										this._closeHoverClass)
							}
						}
					},
					showInput : function(b) {
						this.select(null);
						if (fui.isNumber(b)) {
							this.editIndex = b
						} else {
							this.editIndex = this.data.length
						}
						if (this.editIndex < 0) {
							this.editIndex = 0
						}
						if (this.editIndex > this.data.length) {
							this.editIndex = this.data.length
						}
						var a = this.inputLi;
						a.style.display = "block";
						if (fui.isNumber(b) && b < this.data.length) {
							var d = this.data[b];
							var c = this.getItemEl(d);
							jQuery(c).before(a)
						} else {
							this.ulEl.appendChild(a)
						}
						if (b !== false) {
							setTimeout(function() {
								try {
									a.firstChild.focus();
									fui.selectRange(a.firstChild, 100)
								} catch (f) {
								}
							}, 10)
						} else {
							this.lastInputText = "";
							this._inputEl.value = ""
						}
						return a
					},
					select : function(d) {
						d = this.getItem(d);
						if (this._selected) {
							var a = this.getItemEl(this._selected);
							fui.removeClass(a, this._itemSelectedClass)
						}
						this._selected = d;
						if (this._selected) {
							var a = this.getItemEl(this._selected);
							fui.addClass(a, this._itemSelectedClass)
						}
						var c = this;
						if (this._selected) {
							this.focusEl.focus();
							var b = this;
							setTimeout(function() {
								try {
									b.focusEl.focus()
								} catch (e) {
								}
							}, 50)
						}
						if (this._selected) {
							c.addCls(c._focusCls);
							c._focused = true
						}
					},
					_doInsertSelectValue : function() {
						var b = this._listbox.getSelected();
						var a = this.editIndex;
						if (b) {
							b = fui.clone(b);
							this.insertItem(a, b)
						}
					},
					insertItem : function(a, b) {
						this.data.insert(a, b);
						var d = this.getText();
						var c = this.getValue();
						this.setValue(c, false);
						this.setText(d, false);
						this._createData();
						this.doUpdate();
						this.showInput(a + 1);
						this._OnValueChanged()
					},
					removeItem : function(b) {
						if (!b) {
							return
						}
						var a = this.getItemEl(b);
						fui.removeNode(a);
						this.data.remove(b);
						var d = this.getText();
						var c = this.getValue();
						this.setValue(c, false);
						this.setText(d, false);
						this._OnValueChanged()
					},
					_createData : function() {
						var f = (this.text ? this.text : "").split(",");
						var c = (this.value ? this.value : "").split(",");
						if (c[0] == "") {
							c = []
						}
						var a = c.length;
						this.data.length = a;
						for (var d = 0, b = a; d < b; d++) {
							var h = this.data[d];
							if (!h) {
								h = {};
								this.data[d] = h
							}
							var g = !fui.isNull(f[d]) ? f[d] : "";
							var e = !fui.isNull(c[d]) ? c[d] : "";
							fui._setMap(this.textField, g, h);
							fui._setMap(this.valueField, e, h)
						}
						this.value = this.getValue();
						this.text = this.getText()
					},
					getInputText : function() {
						return this._inputEl ? this._inputEl.value : ""
					},
					getText : function() {
						var e = [];
						for (var c = 0, a = this.data.length; c < a; c++) {
							var d = this.data[c];
							var b = fui._getMap(this.textField, d);
							if (fui.isNull(b)) {
								b = ""
							}
							b = b.replace(",", "，");
							e.push(b)
						}
						return e.join(",")
					},
					getValue : function() {
						var e = [];
						for (var c = 0, a = this.data.length; c < a; c++) {
							var d = this.data[c];
							var b = fui._getMap(this.valueField, d);
							e.push(b)
						}
						return e.join(",")
					},
					setName : function(a) {
						if (this.name != a) {
							this.name = a;
							this._valueEl.name = a
						}
					},
					setValue : function(a) {
						if (fui.isNull(a)) {
							a = ""
						}
						if (this.value != a) {
							this.value = a;
							this._valueEl.value = a;
							this._createData();
							this.doUpdate()
						}
					},
					setText : function(a) {
						if (fui.isNull(a)) {
							a = ""
						}
						if (this.text !== a) {
							this.text = a;
							this._createData();
							this.doUpdate()
						}
					},
					setValueField : function(a) {
						this.valueField = a;
						this._createData()
					},
					getValueField : function() {
						return this.valueField
					},
					setTextField : function(a) {
						this.textField = a;
						this._createData()
					},
					getTextField : function() {
						return this.textField
					},
					setAllowInput : function(a) {
						this.allowInput = a;
						this.doLayout()
					},
					getAllowInput : function() {
						return this.allowInput
					},
					setUrl : function(a) {
						this.url = a
					},
					getUrl : function() {
						return this.url
					},
					setPopupHeight : function(a) {
						this.popupHeight = a
					},
					getPopupHeight : function() {
						return this.popupHeight
					},
					setPopupMinHeight : function(a) {
						this.popupMinHeight = a
					},
					getPopupMinHeight : function() {
						return this.popupMinHeight
					},
					setPopupMaxHeight : function(a) {
						this.popupMaxHeight = a
					},
					getPopupMaxHeight : function() {
						return this.popupMaxHeight
					},
					doQuery : function() {
						this._startQuery(true)
					},
					_syncInputSize : function() {
						if (this.isDisplay() == false) {
							return
						}
						var d = this.getInputText();
						var b = fui.measureText(this._inputEl, d);
						var c = b.width > 20 ? b.width + 4 : 20;
						var a = fui.getWidth(this.el, true);
						if (c > a - 15) {
							c = a - 15
						}
						this._inputEl.style.width = c + "px"
					},
					_startQuery : function(a) {
						var b = this;
						setTimeout(function() {
							b._syncInputSize()
						}, 1);
						this.showPopup("loading");
						this._stopQuery();
						this._loading = true;
						this.delayTimer = setTimeout(function() {
							var c = b._inputEl.value;
							b._doQuery()
						}, this.delay)
					},
					ajaxDataType : "text",
					ajaxContentType : "application/x-www-form-urlencoded; charset=UTF-8",
					_doQuery : function() {
						if (this.isDisplay() == false) {
							return
						}
						var j = this.getInputText();
						var d = this;
						var a = this._listbox.getData();
						var c = {
							value : this.getValue(),
							text : this.getText()
						};
						c[this.searchField] = j;
						var b = this.url;
						var i = typeof b == "function" ? b : window[b];
						if (typeof i == "function") {
							b = i(this)
						}
						if (!b) {
							return
						}
						var g = "post";
						if (b) {
							if (b.indexOf(".txt") != -1
									|| b.indexOf(".json") != -1) {
								g = "get"
							}
						}
						var f = {
							url : b,
							async : true,
							params : c,
							data : c,
							type : this.ajaxType ? this.ajaxType : g,
							cache : false,
							cancel : false
						};
						this.fire("beforeload", f);
						if (f.cancel) {
							return
						}
						var h = this;
						fui.copyTo(f, {
							success : function(l) {
								var k = fui.decode(l);
								if (fui.isNumber(k.error) && k.error != 0) {
									var e = {};
									e.stackTrace = k.stackTrace;
									e.errorMsg = k.errorMsg;
									if (fui_debugger == true) {
										alert(b + "\n" + e.textStatus + "\n"
												+ e.stackTrace)
									}
									return
								}
								if (h.dataField) {
									k = fui._getMap(h.dataField, k)
								}
								if (!k) {
									k = []
								}
								d._listbox.setData(k);
								d.showPopup();
								d._listbox._focusItem(0, true);
								d.fire("load");
								d._loading = false;
								if (d._selectOnLoad) {
									d.__doSelectValue();
									d._selectOnLoad = null
								}
							},
							error : function(e, l, k) {
								d.showPopup("error")
							}
						});
						d._ajaxer = fui.ajax(f)
					},
					_stopQuery : function() {
						if (this.delayTimer) {
							clearTimeout(this.delayTimer);
							this.delayTimer = null
						}
						if (this._ajaxer) {
							this._ajaxer.abort()
						}
						this._loading = false
					},
					within : function(a) {
						if (fui.isAncestor(this.el, a.target)) {
							return true
						}
						if (this.showPopup && this.popup
								&& this.popup.within(a)) {
							return true
						}
						return false
					},
					popupLoadingText : "<span class='fui-textboxlist-popup-loading'>Loading...</span>",
					popupErrorText : "<span class='fui-textboxlist-popup-error'>Error</span>",
					popupEmptyText : "<span class='fui-textboxlist-popup-noresult'>No Result</span>",
					isShowPopup : false,
					popupHeight : "",
					popupMinHeight : 30,
					popupMaxHeight : 150,
					_createPopup : function() {
						if (!this.popup) {
							this.popup = new fui.ListBox();
							this.popup.addCls("fui-textboxlist-popup");
							this.popup
									.setStyle("position:absolute;left:0;top:0;");
							this.popup.showEmpty = true;
							this.popup.setValueField(this.valueField);
							this.popup.setTextField(this.textField);
							this.popup.render(document.body);
							this.popup.on("itemclick", function(a) {
								this.hidePopup();
								this._doInsertSelectValue()
							}, this)
						}
						this._listbox = this.popup;
						return this.popup
					},
					showPopup : function(d) {
						if (this.isDisplay() == false) {
							return
						}
						this.isShowPopup = true;
						var b = this._createPopup();
						b.el.style.zIndex = fui.getMaxZIndex();
						var e = this._listbox;
						e.emptyText = this.popupEmptyText;
						if (d == "loading") {
							e.emptyText = this.popupLoadingText;
							this._listbox.setData([])
						} else {
							if (d == "error") {
								e.emptyText = this.popupLoadingText;
								this._listbox.setData([])
							}
						}
						this._listbox.doUpdate();
						var c = this.getBox();
						var a = c.x, f = c.y + c.height;
						this.popup.el.style.display = "block";
						fui.setXY(b.el, -1000, -1000);
						this.popup.setWidth(c.width);
						this.popup.setHeight(this.popupHeight);
						if (this.popup.getHeight() < this.popupMinHeight) {
							this.popup.setHeight(this.popupMinHeight)
						}
						if (this.popup.getHeight() > this.popupMaxHeight) {
							this.popup.setHeight(this.popupMaxHeight)
						}
						fui.setXY(b.el, a, f)
					},
					hidePopup : function() {
						this.isShowPopup = false;
						if (this.popup) {
							this.popup.el.style.display = "none"
						}
					},
					__OnMouseMove : function(b) {
						if (this.enabled == false) {
							return
						}
						var a = this.getItemByEvent(b);
						if (!a) {
							this.blurItem();
							return
						}
						this.hoverItem(a, b)
					},
					__OnMouseOut : function(a) {
						this.blurItem()
					},
					__OnClick : function(b) {
						if (this.isReadOnly() || this.enabled == false) {
							return
						}
						if (this.enabled == false) {
							return
						}
						var a = this.getItemByEvent(b);
						if (!a) {
							if (fui.findParent(b.target,
									"fui-textboxlist-input")) {
							} else {
								this.showInput()
							}
							return
						}
						this.focusEl.focus();
						this.select(a);
						if (b
								&& fui.hasClass(b.target,
										"fui-textboxlist-close")) {
							this.removeItem(a)
						}
					},
					__OnKeyDown : function(d) {
						if (this.isReadOnly() || this.allowInput == false) {
							return false
						}
						var b = this.data.indexOf(this._selected);
						var c = this;
						function a() {
							var e = c.data[b];
							c.removeItem(e);
							e = c.data[b];
							if (!e) {
								e = c.data[b - 1]
							}
							c.select(e);
							if (!e) {
								c.showInput()
							}
						}
						switch (d.keyCode) {
						case 8:
							d.preventDefault();
							a();
							break;
						case 37:
						case 38:
							this.select(null);
							this.showInput(b);
							break;
						case 39:
						case 40:
							b += 1;
							this.select(null);
							this.showInput(b);
							break;
						case 46:
							a();
							break
						}
					},
					__doSelectValue : function() {
						var a = this._listbox.getFocusedItem();
						if (a) {
							this._listbox.setSelected(a)
						}
						this.lastInputText = this.text;
						this.hidePopup();
						this._doInsertSelectValue()
					},
					__OnInputKeyDown : function(h) {
						this._selectOnLoad = null;
						if (this.isReadOnly() || this.allowInput == false) {
							return false
						}
						h.stopPropagation();
						if (this.isReadOnly() || this.allowInput == false) {
							return
						}
						var f = fui.getSelectRange(this._inputEl);
						var a = f[0], b = f[1], i = this._inputEl.value.length;
						var c = a == b && a == 0;
						var d = a == b && b == i;
						if (this.isReadOnly() || this.allowInput == false) {
							h.preventDefault()
						}
						if (h.keyCode == 9) {
							this.hidePopup();
							return
						}
						if (h.keyCode == 16 || h.keyCode == 17
								|| h.keyCode == 18) {
							return
						}
						switch (h.keyCode) {
						case 13:
							if (this.isShowPopup) {
								h.preventDefault();
								if (this._loading) {
									this._selectOnLoad = true;
									return
								}
								this.__doSelectValue()
							}
							break;
						case 27:
							h.preventDefault();
							this.hidePopup();
							break;
						case 8:
							if (c) {
								h.preventDefault()
							}
						case 37:
							if (c) {
								if (this.isShowPopup) {
									this.hidePopup()
								} else {
									if (this.editIndex > 0) {
										var g = this.editIndex - 1;
										if (g < 0) {
											g = 0
										}
										if (g >= this.data.length) {
											g = this.data.length - 1
										}
										this.showInput(false);
										this.select(g)
									}
								}
							}
							break;
						case 39:
							if (d) {
								if (this.isShowPopup) {
									this.hidePopup()
								} else {
									if (this.editIndex <= this.data.length - 1) {
										var g = this.editIndex;
										this.showInput(false);
										this.select(g)
									}
								}
							}
							break;
						case 38:
							h.preventDefault();
							if (this.isShowPopup) {
								var g = -1;
								var j = this._listbox.getFocusedItem();
								if (j) {
									g = this._listbox.indexOf(j)
								}
								g--;
								if (g < 0) {
									g = 0
								}
								this._listbox._focusItem(g, true)
							}
							break;
						case 40:
							h.preventDefault();
							if (this.isShowPopup) {
								var g = -1;
								var j = this._listbox.getFocusedItem();
								if (j) {
									g = this._listbox.indexOf(j)
								}
								g++;
								if (g < 0) {
									g = 0
								}
								if (g >= this._listbox.getCount()) {
									g = this._listbox.getCount() - 1
								}
								this._listbox._focusItem(g, true)
							} else {
								this._startQuery(true)
							}
							break;
						default:
							break
						}
					},
					focus : function() {
						try {
							this._inputEl.focus()
						} catch (a) {
						}
					},
					blur : function() {
						try {
							this._inputEl.blur()
						} catch (a) {
						}
					},
					searchField : "key",
					setSearchField : function(a) {
						this.searchField = a
					},
					getSearchField : function() {
						return this.searchField
					},
					getAttrs : function(b) {
						var a = fui.TextBox.superclass.getAttrs.call(this, b);
						var c = jQuery(b);
						fui._ParseString(b, a, [ "value", "text", "valueField",
								"textField", "url", "popupHeight", "textName",
								"onfocus", "onbeforeload", "onload",
								"searchField" ]);
						fui._ParseBool(b, a, [ "allowInput" ]);
						fui._ParseInt(b, a, [ "popupMinHeight",
								"popupMaxHeight" ]);
						return a
					}
				});
fui.regClass(fui.TextBoxList, "textboxlist");
fui.AutoComplete = function() {
	fui.AutoComplete.superclass.constructor.call(this);
	var a = this;
	a._ValueChangeTimer = null;
	this._textEl.onfocus = function() {
		a._LastInputText = a._textEl.value;
		a._ValueChangeTimer = setInterval(function() {
			if (a._LastInputText != a._textEl.value) {
				a._tryQuery();
				a._LastInputText = a._textEl.value;
				if (a._textEl.value == "" && a.value != "") {
					a.setValue("");
					a._OnValueChanged()
				}
			}
		}, 10)
	};
	this._textEl.onblur = function() {
		clearInterval(a._ValueChangeTimer);
		if (!a.isShowPopup()) {
			if (a._LastInputText != a._textEl.value) {
				if (a._textEl.value == "" && a.value != "") {
					a.setValue("");
					a._OnValueChanged()
				}
			}
		}
	};
	this._buttonEl.style.display = "none";
	this._doInputLayout()
};
fui
		.extend(
				fui.AutoComplete,
				fui.ComboBox,
				{
					url : "",
					allowInput : true,
					delay : 150,
					searchField : "key",
					minChars : 0,
					_buttonWidth : 0,
					uiCls : "fui-autocomplete",
					setUrl : function(a) {
						this.url = a
					},
					setValue : function(a) {
						if (fui.isNull(a)) {
							a = ""
						}
						if (this.value != a) {
							this.value = a;
							this._valueEl.value = this.value
						}
					},
					setText : function(a) {
						if (fui.isNull(a)) {
							a = ""
						}
						if (this.text != a) {
							this.text = a;
							this._LastInputText = a
						}
						this._textEl.value = this.text
					},
					setMinChars : function(a) {
						this.minChars = a
					},
					getMinChars : function() {
						return this.minChars
					},
					setSearchField : function(a) {
						this.searchField = a
					},
					getSearchField : function() {
						return this.searchField
					},
					popupLoadingText : "<span class='fui-textboxlist-popup-loading'>Loading...</span>",
					popupErrorText : "<span class='fui-textboxlist-popup-error'>Error</span>",
					popupEmptyText : "<span class='fui-textboxlist-popup-noresult'>No Result</span>",
					showPopup : function(b) {
						var a = this.getPopup();
						var c = this._listbox;
						c.showEmpty = true;
						c.emptyText = this.popupEmptyText;
						if (b == "loading") {
							c.emptyText = this.popupLoadingText;
							this._listbox.setData([])
						} else {
							if (b == "error") {
								c.emptyText = this.popupLoadingText;
								this._listbox.setData([])
							}
						}
						this._listbox.doUpdate();
						fui.AutoComplete.superclass.showPopup.call(this)
					},
					__OnInputKeyDown : function(g) {
						var b = {
							htmlEvent : g
						};
						this.fire("keydown", b);
						if (g.keyCode == 8
								&& (this.isReadOnly() || this.allowInput == false)) {
							return false
						}
						if (g.keyCode == 9) {
							this.hidePopup();
							return
						}
						if (this.isReadOnly()) {
							return
						}
						switch (g.keyCode) {
						case 27:
							if (this.isShowPopup()) {
								g.stopPropagation()
							}
							this.hidePopup();
							break;
						case 13:
							if (this.isShowPopup()) {
								g.preventDefault();
								g.stopPropagation();
								var a = this._listbox.getFocusedIndex();
								if (a != -1) {
									var c = this._listbox.getAt(a);
									var f = this._listbox
											.getValueAndText([ c ]);
									var d = f[0];
									this.setText(f[1]);
									this.setValue(d);
									this._OnValueChanged();
									this.hidePopup();
									this.focus()
								}
							} else {
								this.fire("enter", b)
							}
							break;
						case 37:
							break;
						case 38:
							var a = this._listbox.getFocusedIndex();
							if (a == -1) {
								a = 0;
								if (!this.multiSelect) {
									var c = this._listbox.findItems(this.value)[0];
									if (c) {
										a = this._listbox.indexOf(c)
									}
								}
							}
							if (this.isShowPopup()) {
								if (!this.multiSelect) {
									a -= 1;
									if (a < 0) {
										a = 0
									}
									this._listbox._focusItem(a, true)
								}
							}
							break;
						case 39:
							break;
						case 40:
							var a = this._listbox.getFocusedIndex();
							if (this.isShowPopup()) {
								if (!this.multiSelect) {
									a += 1;
									if (a > this._listbox.getCount() - 1) {
										a = this._listbox.getCount() - 1
									}
									this._listbox._focusItem(a, true)
								}
							} else {
								this._tryQuery(this._textEl.value)
							}
							break;
						default:
							this._tryQuery(this._textEl.value);
							break
						}
					},
					doQuery : function() {
						this._tryQuery()
					},
					_tryQuery : function(a) {
						var b = this;
						if (this._queryTimer) {
							clearTimeout(this._queryTimer);
							this._queryTimer = null
						}
						this._queryTimer = setTimeout(function() {
							var c = b._textEl.value;
							b._doQuery(c)
						}, this.delay);
						this.showPopup("loading")
					},
					_doQuery : function(b) {
						if (!this.url) {
							return
						}
						if (this._ajaxer) {
							this._ajaxer.abort()
						}
						var a = this.url;
						var g = "post";
						if (a) {
							if (a.indexOf(".txt") != -1
									|| a.indexOf(".json") != -1) {
								g = "get"
							}
						}
						var f = {};
						f[this.searchField] = b;
						var d = {
							url : a,
							async : true,
							params : f,
							data : f,
							type : this.ajaxType ? this.ajaxType : g,
							cache : false,
							cancel : false
						};
						this.fire("beforeload", d);
						if (d.cancel) {
							return
						}
						var c = this;
						fui.copyTo(d, {
							success : function(i) {
								try {
									var h = fui.decode(i)
								} catch (e) {
									throw new Error(
											"autocomplete json is error")
								}
								if (fui.isNumber(h.error) && h.error != 0) {
									var e = {};
									e.stackTrace = h.stackTrace;
									e.errorMsg = h.errorMsg;
									if (fui_debugger == true) {
										alert(a + "\n" + e.textStatus + "\n"
												+ e.stackTrace)
									}
									return
								}
								if (c.dataField) {
									h = fui._getMap(c.dataField, h)
								}
								if (!h) {
									h = []
								}
								c._listbox.setData(h);
								c.showPopup();
								c._listbox._focusItem(0, true);
								c.data = h;
								c.fire("load", {
									data : h
								})
							},
							error : function(e, i, h) {
								c.showPopup("error")
							}
						});
						this._ajaxer = fui.ajax(d)
					},
					getAttrs : function(b) {
						var a = fui.AutoComplete.superclass.getAttrs.call(this,
								b);
						fui._ParseString(b, a, [ "searchField" ]);
						return a
					}
				});
fui.regClass(fui.AutoComplete, "autocomplete");
fui.Form = function(a) {
	this.el = fui.byId(a);
	if (!this.el) {
		throw new Error("form element not null")
	}
	fui.Form.superclass.constructor.call(this)
};
fui.extend(fui.Form, fui.Component, {
	el : null,
	getFields : function() {
		if (!this.el) {
			return []
		}
		var a = fui.findControls(function(b) {
			if (!b.el || b.formField != true) {
				return false
			}
			if (fui.isAncestor(this.el, b.el)) {
				return true
			}
			return false
		}, this);
		return a
	},
	getFieldsMap : function() {
		var a = this.getFields();
		var e = {};
		for (var c = 0, b = a.length; c < b; c++) {
			var d = a[c];
			if (d.name) {
				e[d.name] = d
			}
		}
		return e
	},
	getField : function(a) {
		if (!this.el) {
			return null
		}
		return fui.getbyName(a, this.el)
	},
	getData : function(c, j) {
		if (fui.isNull(j)) {
			j = true
		}
		var g = c ? "getFormValue" : "getValue";
		var h = this.getFields();
		var d = {};
		for (var e = 0, a = h.length; e < a; e++) {
			var b = h[e];
			var f = b[g];
			if (!f) {
				continue
			}
			if (b.name) {
				if (j == true) {
					fui._setMap(b.name, f.call(b), d)
				} else {
					d[b.name] = f.call(b)
				}
			}
			if (b.textName && b.getText) {
				if (j == true) {
					fui._setMap(b.textName, b.getText(), d)
				} else {
					d[b.textName] = b.getText()
				}
			}
		}
		return d
	},
	setData : function(d, e, a) {
		if (fui.isNull(a)) {
			a = true
		}
		if (typeof d != "object") {
			d = {}
		}
		var g = this.getFieldsMap();
		for ( var c in g) {
			var f = g[c];
			if (!f) {
				continue
			}
			if (f.setValue) {
				var b = d[c];
				if (a == true) {
					b = fui._getMap(c, d)
				}
				if (b === undefined && e === false) {
					continue
				}
				if (b === null) {
					b = ""
				}
				f.setValue(b)
			}
			if (f.setText && f.textName) {
				var h = d[f.textName];
				if (a == true) {
					h = fui._getMap(f.textName, d)
				}
				if (fui.isNull(h)) {
					h = ""
				}
				f.setText(h)
			}
		}
	},
	reset : function() {
		var b = this.getFields();
		for (var c = 0, a = b.length; c < a; c++) {
			var d = b[c];
			if (!d.setValue) {
				continue
			}
			if (d.setText && d._clearText !== false) {
				var e = d.defaultText;
				if (fui.isNull(e)) {
					e = ""
				}
				d.setText(e)
			}
			d.setValue(d.defaultValue)
		}
		this.setIsValid(true)
	},
	clear : function() {
		var b = this.getFields();
		for (var c = 0, a = b.length; c < a; c++) {
			var d = b[c];
			if (!d.setValue) {
				continue
			}
			if (d.setText && d._clearText !== false) {
				d.setText("")
			}
			d.setValue("")
		}
		this.setIsValid(true)
	},
	getValidateFields : function() {
		function c(g) {
			return g.isDisplay(function(h) {
				if (fui.hasClass(h, "fui-tabs-body")) {
					return true
				}
			})
		}
		var a = [];
		var d = this.getFields();
		for (var e = 0, b = d.length; e < b; e++) {
			var f = d[e];
			if (!f.validate || !f.isDisplay) {
				continue
			}
			if (c(f)) {
				a.push(f)
			}
		}
		return a
	},
	validate : function(e) {
		var c = this.getValidateFields();
		for (var d = 0, b = c.length; d < b; d++) {
			var f = c[d];
			var a = f.validate();
			if (a == false && e === false) {
				break
			}
		}
		return this.isValid()
	},
	isValid : function() {
		var b = this.getValidateFields();
		for (var c = 0, a = b.length; c < a; c++) {
			var d = b[c];
			if (d.isValid() == false) {
				return false
			}
		}
		return true
	},
	setIsValid : function(e) {
		var b = this.getFields();
		for (var c = 0, a = b.length; c < a; c++) {
			var d = b[c];
			if (!d.setIsValid) {
				continue
			}
			d.setIsValid(e)
		}
	},
	getErrorTexts : function() {
		var a = [];
		var e = this.getErrors();
		for (var c = 0, b = e.length; c < b; c++) {
			var d = e[c];
			a.push(d.errorText)
		}
		return a
	},
	getErrors : function() {
		var e = [];
		var b = this.getFields();
		for (var c = 0, a = b.length; c < a; c++) {
			var d = b[c];
			if (!d.isValid) {
				continue
			}
			if (d.isValid() == false) {
				e.push(d)
			}
		}
		return e
	},
	mask : function(a) {
		if (typeof a == "string") {
			a = {
				html : a
			}
		}
		a = a || {};
		a.el = this.el;
		if (!a.cls) {
			a.cls = this._maskCls
		}
		fui.mask(a)
	},
	unmask : function() {
		fui.unmask(this.el)
	},
	_maskCls : "fui-mask-loading",
	loadingMsg : "数据加载中，请稍后...",
	loading : function(a) {
		this.mask(a || this.loadingMsg)
	},
	__OnValueChanged : function(a) {
		this._changed = true
	},
	_changed : false,
	setChanged : function(d) {
		this._changed = d;
		var b = this.getFields();
		for (var c = 0, a = b.length; c < a; c++) {
			var e = b[c];
			e.on("valuechanged", this.__OnValueChanged, this)
		}
	},
	isChanged : function() {
		return this._changed
	},
	setEnabled : function(d) {
		var b = this.getFields();
		for (var c = 0, a = b.length; c < a; c++) {
			var e = b[c];
			e.setEnabled(d)
		}
	}
});
fui.Fit = function() {
	fui.Fit.superclass.constructor.call(this)
};
fui.extend(fui.Fit, fui.Container, {
	style : "",
	_clearBorder : false,
	uiCls : "fui-fit",
	_create : function() {
		this.el = document.createElement("div");
		this.el.className = "fui-fit";
		this._bodyEl = this.el
	},
	_initEvents : function() {
	},
	isFixedSize : function() {
		return false
	},
	doLayout : function() {
		if (!this.canLayout()) {
			return
		}
		var k = this.el.parentNode;
		var p = fui.getChildNodes(k);
		if (k == document.body) {
			this.el.style.height = "0px"
		}
		var q = fui.getHeight(k, true);
		for (var g = 0, c = p.length; g < c; g++) {
			var b = p[g];
			var a = b.tagName ? b.tagName.toLowerCase() : "";
			if (b == this.el || (a == "style" || a == "script")) {
				continue
			}
			var n = fui.getStyle(b, "position");
			if (n == "absolute" || n == "fixed") {
				continue
			}
			var j = fui.getHeight(b);
			var f = fui.getMargins(b);
			q = q - j - f.top - f.bottom
		}
		var d = fui.getBorders(this.el);
		var o = fui.getPaddings(this.el);
		var f = fui.getMargins(this.el);
		q = q - f.top - f.bottom;
		if (jQuery.boxModel) {
			q = q - o.top - o.bottom - d.top - d.bottom
		}
		if (q < 0) {
			q = 0
		}
		this.el.style.height = q + "px";
		try {
			p = fui.getChildNodes(this.el);
			for (var g = 0, c = p.length; g < c; g++) {
				var b = p[g];
				fui.layout(b)
			}
		} catch (m) {
		}
	},
	set_bodyParent : function(b) {
		if (!b) {
			return
		}
		var a = this._bodyEl;
		var d = b;
		while (d.firstChild) {
			try {
				a.appendChild(d.firstChild)
			} catch (c) {
			}
		}
		this.doLayout()
	},
	getAttrs : function(b) {
		var a = fui.Fit.superclass.getAttrs.call(this, b);
		a._bodyParent = b;
		return a
	}
});
fui.regClass(fui.Fit, "fit");
fui.Panel = function() {
	this._initButtons();
	fui.Panel.superclass.constructor.call(this);
	if (this.url) {
		this.setUrl(this.url)
	}
	this._contentEl = this._bodyEl;
	this._doVisibleEls();
	this._Resizer = new fui._Resizer(this);
	this._doTools()
};
fui
		.extend(
				fui.Panel,
				fui.Container,
				{
					width : 250,
					title : "",
					iconCls : "",
					iconStyle : "",
					allowResize : false,
					url : "",
					refreshOnExpand : false,
					maskOnLoad : true,
					collapseOnTitleClick : false,
					showCollapseButton : false,
					showCloseButton : false,
					closeAction : "display",
					showHeader : true,
					showToolbar : false,
					showFooter : false,
					headerCls : "",
					headerStyle : "",
					bodyCls : "",
					bodyStyle : "",
					footerCls : "",
					footerStyle : "",
					toolbarCls : "",
					toolbarStyle : "",
					minWidth : 180,
					minHeight : 100,
					maxWidth : 5000,
					maxHeight : 3000,
					set : function(d) {
						if (typeof d == "string") {
							return this
						}
						var b = this._allowLayout;
						this._allowLayout = false;
						var c = d.toolbar;
						delete d.toolbar;
						var e = d.footer;
						delete d.footer;
						var a = d.url;
						delete d.url;
						fui.Panel.superclass.set.call(this, d);
						if (c) {
							this.setToolbar(c)
						}
						if (e) {
							this.setFooter(e)
						}
						if (a) {
							this.setUrl(a)
						}
						this._allowLayout = b;
						this.doLayout();
						return this
					},
					uiCls : "fui-panel",
					_create : function() {
						this.el = document.createElement("div");
						this.el.className = "fui-panel";
						var b = '<div class="fui-panel-border"><div class="fui-panel-header" ><div class="fui-panel-header-inner" ><span class="fui-panel-icon"></span><div class="fui-panel-title" ></div><div class="fui-tools" ></div></div></div><div class="fui-panel-viewport"><div class="fui-panel-toolbar"></div><div class="fui-panel-body" ></div><div class="fui-panel-footer"></div><div class="fui-resizer-trigger"></div></div></div>';
						this.el.innerHTML = b;
						this._borderEl = this.el.firstChild;
						this._headerEl = this._borderEl.firstChild;
						this._viewportEl = this._borderEl.lastChild;
						this._toolbarEl = fui.byClass("fui-panel-toolbar",
								this.el);
						this._bodyEl = fui.byClass("fui-panel-body", this.el);
						this._footerEl = fui.byClass("fui-panel-footer",
								this.el);
						this._resizeGridEl = fui.byClass("fui-resizer-trigger",
								this.el);
						var a = fui.byClass("fui-panel-header-inner", this.el);
						this._iconEl = fui.byClass("fui-panel-icon", this.el);
						this._titleEl = fui.byClass("fui-panel-title", this.el);
						this._toolsEl = fui.byClass("fui-tools", this.el);
						fui.setStyle(this._bodyEl, this.bodyStyle);
						this._doTitle()
					},
					destroy : function(a) {
						this._doRemoveIFrame();
						this._iframeEl = null;
						this._viewportEl = this._borderEl = this._bodyEl = this._footerEl = this._toolbarEl = null;
						this._toolsEl = this._titleEl = this._iconEl = this._resizeGridEl = null;
						fui.Panel.superclass.destroy.call(this, a)
					},
					_initEvents : function() {
						fui._BindEvents(function() {
							fui.on(this.el, "click", this.__OnClick, this)
						}, this)
					},
					_doVisibleEls : function() {
						this._headerEl.style.display = this.showHeader ? ""
								: "none";
						this._toolbarEl.style.display = this.showToolbar ? ""
								: "none";
						this._footerEl.style.display = this.showFooter ? ""
								: "none"
					},
					_setBodyWidth : true,
					doLayout : function() {
						if (!this.canLayout()) {
							return
						}
						this._resizeGridEl.style.display = this.allowResize ? ""
								: "none";
						var c = this.isAutoHeight();
						var e = this.isAutoWidth();
						var a = fui.getWidth(this._viewportEl, true);
						var d = a;
						if (!c) {
							var f = this.getViewportHeight();
							fui.setHeight(this._viewportEl, f);
							var b = this.getBodyHeight();
							fui.setHeight(this._bodyEl, b)
						} else {
							this._viewportEl.style.height = "auto";
							this._bodyEl.style.height = "auto"
						}
						fui.layout(this._borderEl);
						this.fire("layout")
					},
					deferLayout : function(b) {
						if (!b) {
							b = 10
						}
						if (this._layoutTimer) {
							return
						}
						var a = this;
						this._layoutTimer = setTimeout(function() {
							a._layoutTimer = null;
							a.doLayout()
						}, b)
					},
					_stopLayout : function() {
						clearTimeout(this._layoutTimer);
						this._layoutTimer = null
					},
					getViewportWidth : function(a) {
						return fui.getWidth(this._viewportEl, a)
					},
					getViewportHeight : function(c) {
						var b = this.getHeight(true) - this.getHeaderHeight();
						if (c) {
							var a = fui.getPaddings(this._viewportEl);
							var e = fui.getBorders(this._viewportEl);
							var d = fui.getMargins(this._viewportEl);
							if (jQuery.boxModel) {
								b = b - a.top - a.bottom - e.top - e.bottom
							}
							b = b - d.top - d.bottom
						}
						return b
					},
					getBodyHeight : function(c) {
						var b = this.getViewportHeight();
						var b = b - this.getToolbarHeight()
								- this.getFooterHeight();
						if (c) {
							var e = fui.getPaddings(this._bodyEl);
							var a = fui.getBorders(this._bodyEl);
							var d = fui.getMargins(this._bodyEl);
							if (jQuery.boxModel) {
								b = b - e.top - e.bottom - a.top - a.bottom
							}
							b = b - d.top - d.bottom
						}
						if (b < 0) {
							b = 0
						}
						return b
					},
					getHeaderHeight : function() {
						var a = this.showHeader ? jQuery(this._headerEl)
								.outerHeight() : 0;
						return a
					},
					getToolbarHeight : function() {
						var a = this.showToolbar ? jQuery(this._toolbarEl)
								.outerHeight() : 0;
						return a
					},
					getFooterHeight : function() {
						var a = this.showFooter ? jQuery(this._footerEl)
								.outerHeight() : 0;
						return a
					},
					setHeaderStyle : function(a) {
						this.headerStyle = a;
						fui.setStyle(this._headerEl, a);
						this.doLayout()
					},
					getHeaderStyle : function() {
						return this.headerStyle
					},
					setBodyStyle : function(a) {
						this.bodyStyle = a;
						fui.setStyle(this._bodyEl, a);
						this.doLayout()
					},
					getBodyStyle : function() {
						return this.bodyStyle
					},
					setToolbarStyle : function(a) {
						this.toolbarStyle = a;
						fui.setStyle(this._toolbarEl, a);
						this.doLayout()
					},
					getToolbarStyle : function() {
						return this.toolbarStyle
					},
					setFooterStyle : function(a) {
						this.footerStyle = a;
						fui.setStyle(this._footerEl, a);
						this.doLayout()
					},
					getFooterStyle : function() {
						return this.footerStyle
					},
					setHeaderCls : function(a) {
						jQuery(this._headerEl).removeClass(this.headerCls);
						jQuery(this._headerEl).addClass(a);
						this.headerCls = a;
						this.doLayout()
					},
					getHeaderCls : function() {
						return this.headerCls
					},
					setBodyCls : function(a) {
						jQuery(this._bodyEl).removeClass(this.bodyCls);
						jQuery(this._bodyEl).addClass(a);
						this.bodyCls = a;
						this.doLayout()
					},
					getBodyCls : function() {
						return this.bodyCls
					},
					setToolbarCls : function(a) {
						jQuery(this._toolbarEl).removeClass(this.toolbarCls);
						jQuery(this._toolbarEl).addClass(a);
						this.toolbarCls = a;
						this.doLayout()
					},
					getToolbarCls : function() {
						return this.toolbarCls
					},
					setFooterCls : function(a) {
						jQuery(this._footerEl).removeClass(this.footerCls);
						jQuery(this._footerEl).addClass(a);
						this.footerCls = a;
						this.doLayout()
					},
					getFooterCls : function() {
						return this.footerCls
					},
					_doTitle : function() {
						this._titleEl.innerHTML = this.title;
						this._iconEl.style.display = (this.iconCls || this.iconStyle) ? "inline"
								: "none";
						this._iconEl.className = "fui-panel-icon "
								+ this.iconCls;
						fui.setStyle(this._iconEl, this.iconStyle)
					},
					setTitle : function(a) {
						this.title = a;
						this._doTitle()
					},
					getTitle : function() {
						return this.title
					},
					setIconCls : function(a) {
						this.iconCls = a;
						this._doTitle()
					},
					getIconCls : function() {
						return this.iconCls
					},
					_doTools : function() {
						var c = "";
						for (var b = this.buttons.length - 1; b >= 0; b--) {
							var a = this.buttons[b];
							c += '<span id="' + b + '" class="' + a.cls + " "
									+ (a.enabled ? "" : "fui-disabled")
									+ '" style="' + a.style + ";"
									+ (a.visible ? "" : "display:none;")
									+ '"></span>'
						}
						this._toolsEl.innerHTML = c
					},
					setShowCloseButton : function(b) {
						this.showCloseButton = b;
						var a = this.getButton("close");
						a.visible = b;
						this._doTools()
					},
					getShowCloseButton : function() {
						return this.showCloseButton
					},
					setCloseAction : function(a) {
						this.closeAction = a
					},
					getCloseAction : function() {
						return this.closeAction
					},
					setShowCollapseButton : function(b) {
						this.showCollapseButton = b;
						var a = this.getButton("collapse");
						a.visible = b;
						this._doTools()
					},
					getShowCollapseButton : function() {
						return this.showCollapseButton
					},
					setShowHeader : function(a) {
						this.showHeader = a;
						this._doVisibleEls();
						this.deferLayout()
					},
					getShowHeader : function() {
						return this.showHeader
					},
					setShowToolbar : function(a) {
						this.showToolbar = a;
						this._doVisibleEls();
						this.deferLayout()
					},
					getShowToolbar : function() {
						return this.showToolbar
					},
					setShowFooter : function(a) {
						this.showFooter = a;
						this._doVisibleEls();
						this.deferLayout()
					},
					getShowFooter : function() {
						return this.showFooter
					},
					__OnClick : function(b) {
						if (fui.isAncestor(this._headerEl, b.target)) {
							var c = fui.findParent(b.target, "fui-tools");
							if (c) {
								var a = this.getButton(parseInt(b.target.id));
								if (a) {
									this._OnButtonClick(a, b)
								}
							} else {
								if (this.collapseOnTitleClick) {
									this.toggle()
								}
							}
						}
					},
					_OnButtonClick : function(d, a) {
						var f = {
							button : d,
							index : this.buttons.indexOf(d),
							name : d.name.toLowerCase(),
							htmlEvent : a,
							cancel : false
						};
						this.fire("beforebuttonclick", f);
						try {
							if (f.name == "close"
									&& this.closeAction == "destroy"
									&& this._iframeEl
									&& this._iframeEl.contentWindow) {
								var b = true;
								if (this._iframeEl.contentWindow.CloseWindow) {
									b = this._iframeEl.contentWindow
											.CloseWindow("close")
								} else {
									if (this._iframeEl.contentWindow.CloseOwnerWindow) {
										b = this._iframeEl.contentWindow
												.CloseOwnerWindow("close")
									}
								}
								if (b === false) {
									f.cancel = true
								}
							}
						} catch (c) {
						}
						if (f.cancel == true) {
							return f
						}
						this.fire("buttonclick", f);
						if (f.name == "close") {
							if (this.closeAction == "destroy") {
								this.__HideAction = "close";
								this.destroy()
							} else {
								this.hide()
							}
						}
						if (f.name == "collapse") {
							this.toggle();
							if (this.refreshOnExpand && this.expanded
									&& this.url) {
								this.reload()
							}
						}
						return f
					},
					onButtonClick : function(b, a) {
						this.on("buttonclick", b, a)
					},
					_initButtons : function() {
						this.buttons = [];
						var b = this.createButton({
							name : "close",
							cls : "fui-tools-close",
							visible : this.showCloseButton
						});
						this.buttons.push(b);
						var a = this.createButton({
							name : "collapse",
							cls : "fui-tools-collapse",
							visible : this.showCollapseButton
						});
						this.buttons.push(a)
					},
					createButton : function(a) {
						var b = fui.copyTo({
							name : "",
							cls : "",
							style : "",
							visible : true,
							enabled : true,
							html : ""
						}, a);
						return b
					},
					addButton : function(b, a) {
						if (typeof b == "string") {
							b = {
								iconCls : b
							}
						}
						b = this.createButton(b);
						if (typeof a != "number") {
							a = this.buttons.length
						}
						this.buttons.insert(a, b);
						this._doTools()
					},
					updateButton : function(b, a) {
						var c = this.getButton(b);
						if (!c) {
							return
						}
						fui.copyTo(c, a);
						this._doTools()
					},
					removeButton : function(a) {
						var b = this.getButton(a);
						if (!b) {
							return
						}
						this.buttons.remove(b);
						this._doTools()
					},
					getButton : function(b) {
						if (typeof b == "number") {
							return this.buttons[b]
						} else {
							for (var d = 0, a = this.buttons.length; d < a; d++) {
								var c = this.buttons[d];
								if (c.name == b) {
									return c
								}
							}
						}
					},
					setBody : function(a) {
						__fui_setControls(a, this._bodyEl, this)
					},
					set_bodyParent : function(a) {
					},
					setToolbar : function(a) {
						__fui_setControls(a, this._toolbarEl, this)
					},
					setFooter : function(a) {
						__fui_setControls(a, this._footerEl, this)
					},
					getHeaderEl : function() {
						return this._headerEl
					},
					getToolbarEl : function() {
						return this._toolbarEl
					},
					getBodyEl : function() {
						return this._bodyEl
					},
					getFooterEl : function() {
						return this._footerEl
					},
					getIFrameEl : function(a) {
						return this._iframeEl
					},
					_getMaskWrapEl : function() {
						return this._bodyEl
					},
					_doRemoveIFrame : function(c) {
						if (this._iframeEl) {
							var b = this._iframeEl;
							b.src = "";
							try {
								b.contentWindow.document.write("");
								b.contentWindow.document.close()
							} catch (a) {
							}
							if (b._ondestroy) {
								b._ondestroy()
							}
							try {
								this._iframeEl.parentNode
										.removeChild(this._iframeEl);
								this._iframeEl.removeNode(true)
							} catch (a) {
							}
						}
						this._iframeEl = null;
						if (c === true) {
							fui.removeChilds(this._bodyEl)
						}
					},
					_deferLoadingTime : 80,
					_doLoad : function() {
						this._doRemoveIFrame(true);
						var a = new Date();
						var c = this;
						this.loadedUrl = this.url;
						if (this.maskOnLoad) {
							this.loading()
						}
						jQuery(this._bodyEl).css("overflow", "hidden");
						var b = fui
								.createIFrame(
										this.url,
										function(h, g) {
											var d = (a - new Date())
													+ c._deferLoadingTime;
											if (d < 0) {
												d = 0
											}
											setTimeout(function() {
												c.unmask()
											}, d);
											try {
												c._iframeEl.contentWindow.Owner = c.Owner;
												c._iframeEl.contentWindow.CloseOwnerWindow = function(
														j) {
													c.__HideAction = j;
													var i = true;
													if (c.__onDestroy) {
														i = c.__onDestroy(j)
													}
													if (i === false) {
														return false
													}
													var k = {
														iframe : c._iframeEl,
														action : j
													};
													c.fire("unload", k);
													setTimeout(function() {
														c.destroy()
													}, 10)
												}
											} catch (f) {
											}
											if (g) {
												if (c.__onLoad) {
													c.__onLoad()
												}
												var f = {
													iframe : c._iframeEl
												};
												c.fire("load", f)
											}
										});
						this._bodyEl.appendChild(b);
						this._iframeEl = b
					},
					load : function(a, c, b) {
						this.setUrl(a, c, b)
					},
					reload : function() {
						this.setUrl(this.url)
					},
					setUrl : function(a, c, b) {
						this.url = a;
						this.__onLoad = c;
						this.__onDestroy = b;
						if (this.expanded) {
							this._doLoad()
						}
					},
					getUrl : function() {
						return this.url
					},
					setRefreshOnExpand : function(a) {
						this.refreshOnExpand = a
					},
					getRefreshOnExpand : function() {
						return this.refreshOnExpand
					},
					setMaskOnLoad : function(a) {
						this.maskOnLoad = a
					},
					getMaskOnLoad : function(a) {
						return this.maskOnLoad
					},
					setAllowResize : function(a) {
						if (this.allowResize != a) {
							this.allowResize = a;
							this.doLayout()
						}
					},
					getAllowResize : function() {
						return this.allowResize
					},
					expanded : true,
					setExpanded : function(a) {
						if (this.expanded != a) {
							this.expanded = a;
							if (this.expanded) {
								this.expand()
							} else {
								this.collapse()
							}
						}
					},
					toggle : function() {
						if (this.expanded) {
							this.collapse()
						} else {
							this.expand()
						}
					},
					collapse : function() {
						this.expanded = false;
						if (this.state != "max") {
							this._height = this.el.style.height
						}
						this.el.style.height = "auto";
						this._viewportEl.style.display = "none";
						fui.addClass(this.el, "fui-panel-collapse");
						this.doLayout()
					},
					expand : function() {
						this.expanded = true;
						this.el.style.height = this._height;
						this._viewportEl.style.display = "block";
						if (this.state != "max") {
							delete this._height
						}
						fui.removeClass(this.el, "fui-panel-collapse");
						if (this.url && this.url != this.loadedUrl) {
							this._doLoad()
						}
						this.doLayout()
					},
					setCollapseOnTitleClick : function(a) {
						this.collapseOnTitleClick = a;
						fui.removeClass(this.el, "fui-panel-titleclick");
						if (a) {
							fui.addClass(this.el, "fui-panel-titleclick")
						}
					},
					getCollapseOnTitleClick : function() {
						return this.collapseOnTitleClick
					},
					getAttrs : function(d) {
						var a = fui.Panel.superclass.getAttrs.call(this, d);
						fui._ParseString(d, a, [ "title", "iconCls",
								"iconStyle", "headerCls", "headerStyle",
								"bodyCls", "bodyStyle", "footerCls",
								"footerStyle", "toolbarCls", "toolbarStyle",
								"footer", "toolbar", "url", "closeAction",
								"loadingMsg", "onbeforebuttonclick",
								"onbuttonclick", "onload" ]);
						fui._ParseBool(d, a, [ "allowResize",
								"showCloseButton", "showHeader", "showToolbar",
								"showFooter", "showCollapseButton",
								"refreshOnExpand", "maskOnLoad", "expanded",
								"collapseOnTitleClick" ]);
						var c = fui.getChildNodes(d, true);
						for (var b = c.length - 1; b >= 0; b--) {
							var e = c[b];
							var f = jQuery(e).attr("property");
							if (!f) {
								continue
							}
							f = f.toLowerCase();
							if (f == "toolbar") {
								a.toolbar = e
							} else {
								if (f == "footer") {
									a.footer = e
								}
							}
						}
						a.body = c;
						return a
					}
				});
fui.regClass(fui.Panel, "panel");
fui.Window = function() {
	fui.Window.superclass.constructor.call(this);
	this.addCls("fui-window");
	this.setVisible(false);
	this.setAllowDrag(this.allowDrag);
	this.setAllowResize(this.allowResize)
};
fui
		.extend(
				fui.Window,
				fui.Panel,
				{
					x : 0,
					y : 0,
					state : "restore",
					_dragCls : "fui-window-drag",
					_resizeCls : "fui-window-resize",
					allowDrag : true,
					showCloseButton : true,
					showMaxButton : false,
					showMinButton : false,
					showCollapseButton : false,
					showModal : true,
					minWidth : 150,
					minHeight : 80,
					maxWidth : 2000,
					maxHeight : 2000,
					uiCls : "fui-window",
					_create : function() {
						fui.Window.superclass._create.call(this)
					},
					_initButtons : function() {
						this.buttons = [];
						var d = this.createButton({
							name : "close",
							cls : "fui-tools-close",
							visible : this.showCloseButton
						});
						this.buttons.push(d);
						var a = this.createButton({
							name : "max",
							cls : "fui-tools-max",
							visible : this.showMaxButton
						});
						this.buttons.push(a);
						var b = this.createButton({
							name : "min",
							cls : "fui-tools-min",
							visible : this.showMinButton
						});
						this.buttons.push(b);
						var c = this.createButton({
							name : "collapse",
							cls : "fui-tools-collapse",
							visible : this.showCollapseButton
						});
						this.buttons.push(c)
					},
					_initEvents : function() {
						fui.Window.superclass._initEvents.call(this);
						fui._BindEvents(function() {
							fui.on(this.el, "mouseover", this.__OnMouseOver,
									this);
							fui.on(window, "resize", this.__OnWindowResize,
									this);
							fui.on(this.el, "mousedown",
									this.__OnWindowMouseDown, this)
						}, this)
					},
					doLayout : function() {
						if (!this.canLayout()) {
							return
						}
						if (this.state == "max") {
							var a = this.getParentBox();
							this.el.style.left = "0px";
							this.el.style.top = "0px";
							fui.setSize(this.el, a.width, a.height)
						}
						fui.Window.superclass.doLayout.call(this);
						if (this.allowDrag) {
							fui.addClass(this.el, this._dragCls)
						}
						if (this.state == "max") {
							this._resizeGridEl.style.display = "none";
							fui.removeClass(this.el, this._dragCls)
						}
						this._doModal()
					},
					_doModal : function() {
						var a = this.showModal && this.isDisplay()
								&& this.visible;
						if (!this._modalEl && this.showModal == false) {
							return
						}
						if (!this._modalEl) {
							var b = "<iframe frameborder='0' style='position: absolute; z-index: -1; width: 100%; height: 100%; top: 0;left:0;scrolling:no;'></iframe>";
							this._modalEl = fui.append(document.body,
									'<div class="fui-modal" style="display:none">'
											+ b + "</div>")
						}
						if (a) {
							this._modalEl.style.display = "block";
							this._modalEl.style.zIndex = fui.getStyle(this.el,
									"zIndex") - 1
						} else {
							this._modalEl.style.display = "none"
						}
					},
					getParentBox : function() {
						var a = fui.getViewportBox();
						var b = this._containerEl || document.body;
						if (b != document.body) {
							a = fui.getBox(b)
						}
						return a
					},
					setShowModal : function(a) {
						this.showModal = a
					},
					getShowModal : function() {
						return this.showModal
					},
					setMinWidth : function(a) {
						if (isNaN(a)) {
							return
						}
						this.minWidth = a
					},
					getMinWidth : function() {
						return this.minWidth
					},
					setMinHeight : function(a) {
						if (isNaN(a)) {
							return
						}
						this.minHeight = a
					},
					getMinHeight : function() {
						return this.minHeight
					},
					setMaxWidth : function(a) {
						if (isNaN(a)) {
							return
						}
						this.maxWidth = a
					},
					getMaxWidth : function() {
						return this.maxWidth
					},
					setMaxHeight : function(a) {
						if (isNaN(a)) {
							return
						}
						this.maxHeight = a
					},
					getMaxHeight : function() {
						return this.maxHeight
					},
					setAllowDrag : function(a) {
						this.allowDrag = a;
						fui.removeClass(this.el, this._dragCls);
						if (a) {
							fui.addClass(this.el, this._dragCls)
						}
					},
					getAllowDrag : function() {
						return this.allowDrag
					},
					setShowMaxButton : function(b) {
						this.showMaxButton = b;
						var a = this.getButton("max");
						a.visible = b;
						this._doTools()
					},
					getShowMaxButton : function() {
						return this.showMaxButton
					},
					setShowMinButton : function(b) {
						this.showMinButton = b;
						var a = this.getButton("min");
						a.visible = b;
						this._doTools()
					},
					getShowMinButton : function() {
						return this.showMinButton
					},
					max : function() {
						this.state = "max";
						this.show();
						var a = this.getButton("max");
						if (a) {
							a.cls = "fui-tools-restore";
							this._doTools()
						}
					},
					restore : function() {
						this.state = "restore";
						this.show(this.x, this.y);
						var a = this.getButton("max");
						if (a) {
							a.cls = "fui-tools-max";
							this._doTools()
						}
					},
					showInBody : true,
					setShowInBody : function(a) {
						this.showInBody = a
					},
					getShowInBody : function() {
						return this.showInBody
					},
					containerEl : null,
					showAtPos : function(a, c, b) {
						this.show(a, c, b)
					},
					show : function(a, g, b) {
						this._allowLayout = false;
						var d = this._containerEl || document.body;
						if (!this.isRender()
								|| (this.el.parentNode != d && this.showInBody)) {
							this.render(d)
						}
						this.el.style.zIndex = fui.getMaxZIndex();
						this._doShow(a, g);
						this._allowLayout = true;
						this.setVisible(true);
						if (this.state != "max") {
							var c = this.getBox();
							this.x = c.x;
							this.y = c.y
						}
						try {
							this.el.focus()
						} catch (f) {
						}
					},
					hide : function() {
						this.setVisible(false);
						this._doModal()
					},
					getWidth : function() {
						this._headerEl.style.width = "50px";
						var a = fui.getWidth(this.el);
						this._headerEl.style.width = "auto";
						return a
					},
					getBox : function() {
						this._headerEl.style.width = "50px";
						this.el.style.display = "";
						var a = fui.getWidth(this.el);
						this._headerEl.style.width = "auto";
						var b = fui.getBox(this.el);
						b.width = a;
						b.right = b.x + a;
						return b
					},
					_measureSize : function() {
						this.el.style.display = "";
						var a = this.getBox();
						if (a.width > this.maxWidth) {
							fui.setWidth(this.el, this.maxWidth);
							a = this.getBox()
						}
						if (a.height > this.maxHeight) {
							fui.setHeight(this.el, this.maxHeight);
							a = this.getBox()
						}
						if (a.width < this.minWidth) {
							fui.setWidth(this.el, this.minWidth);
							a = this.getBox()
						}
						if (a.height < this.minHeight) {
							fui.setHeight(this.el, this.minHeight);
							a = this.getBox()
						}
					},
					_doShow : function(a, d) {
						var b = this.getParentBox();
						if (this.state == "max") {
							if (!this._width) {
								var c = this.getBox();
								this._width = c.width;
								this._height = c.height;
								this.x = c.x;
								this.y = c.y
							}
						} else {
							if (fui.isNull(a)) {
								a = "center"
							}
							if (fui.isNull(d)) {
								d = "middle"
							}
							this.el.style.position = "absolute";
							this.el.style.left = "-2000px";
							this.el.style.top = "-2000px";
							this.el.style.display = "";
							if (this._width) {
								this.setWidth(this._width);
								this.setHeight(this._height);
								delete this._width;
								delete this._height
							} else {
							}
							this._measureSize();
							var c = this.getBox();
							if (a == "left") {
								a = 0
							}
							if (a == "center") {
								a = b.width / 2 - c.width / 2
							}
							if (a == "right") {
								a = b.width - c.width
							}
							if (d == "top") {
								d = 0
							}
							if (d == "middle") {
								d = b.y + b.height / 2 - c.height / 2
							}
							if (d == "bottom") {
								d = b.height - c.height
							}
							if (a + c.width > b.right) {
								a = b.right - c.width
							}
							if (d + c.height > b.bottom) {
								d = b.bottom - c.height
							}
							if (a < 0) {
								a = 0
							}
							if (d < 0) {
								d = 0
							}
							this.el.style.display = "";
							fui.setX(this.el, a);
							fui.setY(this.el, d);
							this.el.style.left = a + "px";
							this.el.style.top = d + "px"
						}
						this.doLayout()
					},
					_OnButtonClick : function(b, a) {
						var c = fui.Window.superclass._OnButtonClick.call(this,
								b, a);
						if (c.cancel == true) {
							return c
						}
						if (c.name == "max") {
							if (this.state == "max") {
								this.restore()
							} else {
								this.max()
							}
						}
						return c
					},
					__OnWindowResize : function(a) {
						if (this.state == "max") {
							this.doLayout()
						}
						if (!fui.isIE6) {
							this._doModal()
						}
					},
					__OnWindowMouseDown : function(d) {
						if (this.el) {
							this.el.style.zIndex = fui.getMaxZIndex()
						}
						var c = this;
						if (d.button != fui.MouseButton.Left) {
							return
						}
						if (this.state != "max" && this.allowDrag
								&& fui.isAncestor(this._headerEl, d.target)
								&& !fui.findParent(d.target, "fui-tools")) {
							var c = this;
							var b = this.getBox();
							var a = new fui.Drag(
									{
										capture : false,
										onStart : function() {
											c._maskProxy = fui
													.append(document.body,
															'<div class="fui-resizer-mask"></div>');
											c._dragProxy = fui
													.append(document.body,
															'<div class="fui-drag-proxy"></div>');
											c.el.style.display = "none"
										},
										onMove : function(j) {
											var e = j.now[0] - j.init[0], k = j.now[1]
													- j.init[1];
											e = b.x + e;
											k = b.y + k;
											var i = c.getParentBox();
											var h = e + b.width;
											var f = k + b.height;
											if (h > i.width) {
												e = i.width - b.width
											}
											if (e < 0) {
												e = 0
											}
											if (k < 0) {
												k = 0
											}
											c.x = e;
											c.y = k;
											var g = {
												x : e,
												y : k,
												width : b.width,
												height : b.height
											};
											fui.setBox(c._dragProxy, g);
											this.moved = true
										},
										onStop : function() {
											c.el.style.display = "block";
											if (this.moved) {
												var e = fui
														.getBox(c._dragProxy);
												fui.setBox(c.el, e)
											}
											jQuery(c._maskProxy).remove();
											c._maskProxy = null;
											jQuery(c._dragProxy).remove();
											c._dragProxy = null
										}
									});
							a.start(d)
						}
					},
					destroy : function(a) {
						fui.un(window, "resize", this.__OnWindowResize, this);
						if (this._modalEl) {
							jQuery(this._modalEl).remove();
							this._modalEl = null
						}
						if (this.shadowEl) {
							jQuery(this.shadowEl).remove();
							this.shadowEl = null
						}
						fui.Window.superclass.destroy.call(this, a)
					},
					getAttrs : function(b) {
						var a = fui.Window.superclass.getAttrs.call(this, b);
						fui._ParseString(b, a, [ "modalStyle" ]);
						fui._ParseBool(b, a, [ "showModal", "showShadow",
								"allowDrag", "allowResize", "showMaxButton",
								"showMinButton", "showInBody" ]);
						fui._ParseInt(b, a, [ "minWidth", "minHeight",
								"maxWidth", "maxHeight" ]);
						return a
					},
					showAtEl : function(b, q) {
						b = fui.byId(b);
						if (!b) {
							return
						}
						if (!this.isRender()
								|| this.el.parentNode != document.body) {
							this.render(document.body)
						}
						var i = {
							xAlign : this.xAlign,
							yAlign : this.yAlign,
							xOffset : 0,
							yOffset : 0,
							popupCls : this.popupCls
						};
						fui.copyTo(i, q);
						this._popupEl = b;
						this.el.style.position = "absolute";
						this.el.style.left = "-2000px";
						this.el.style.top = "-2000px";
						this.el.style.display = "";
						this.doLayout();
						this._measureSize();
						var j = fui.getViewportBox();
						var f = this.getBox();
						var e = fui.getBox(b);
						var p = i.xy;
						var g = i.xAlign, o = i.yAlign;
						var m = j.width / 2 - f.width / 2, l = 0;
						if (p) {
							m = p[0];
							l = p[1]
						}
						switch (i.xAlign) {
						case "outleft":
							m = e.x - f.width;
							break;
						case "left":
							m = e.x;
							break;
						case "center":
							m = e.x + e.width / 2 - f.width / 2;
							break;
						case "right":
							m = e.right - f.width;
							break;
						case "outright":
							m = e.right;
							break;
						default:
							break
						}
						switch (i.yAlign) {
						case "above":
							l = e.y - f.height;
							break;
						case "top":
							l = e.y;
							break;
						case "middle":
							l = e.y + e.height / 2 - f.height / 2;
							break;
						case "bottom":
							l = e.bottom - f.height;
							break;
						case "below":
							l = e.bottom;
							break;
						default:
							break
						}
						m = parseInt(m);
						l = parseInt(l);
						if (i.outYAlign || i.outXAlign) {
							if (i.outYAlign == "above") {
								if (l + f.height > j.bottom) {
									var k = e.y - j.y;
									var a = j.bottom - e.bottom;
									if (k > a) {
										l = e.y - f.height
									}
								}
							}
							if (i.outXAlign == "outleft") {
								if (m + f.width > j.right) {
									var d = e.x - j.x;
									var n = j.right - e.right;
									if (d > n) {
										m = e.x - f.width
									}
								}
							}
							if (i.outXAlign == "right") {
								if (m + f.width > j.right) {
									m = e.right - f.width
								}
							}
							this._Show(m, l)
						} else {
							this.showAtPos(m + i.xOffset, l + i.yOffset)
						}
					}
				});
fui.regClass(fui.Window, "window");
fui.MessageBox = {
	alertTitle : "提醒",
	confirmTitle : "确认",
	prompTitle : "输入",
	prompMessage : "请输入内容：",
	buttonText : {
		ok : "确定",
		cancel : "取消",
		yes : "是",
		no : "否"
	},
	show : function(e) {
		e = fui.copyTo({
			width : "auto",
			height : "auto",
			showModal : true,
			minWidth : 150,
			maxWidth : 800,
			minHeight : 100,
			maxHeight : 350,
			showHeader : true,
			title : "",
			titleIcon : "",
			iconCls : "",
			iconStyle : "",
			message : "",
			html : "",
			spaceStyle : "margin-right:15px",
			showCloseButton : true,
			buttons : null,
			buttonWidth : 58,
			callback : null
		}, e);
		var f = e.callback;
		var m = new fui.Window();
		m.setBodyStyle("overflow:hidden");
		m.setShowModal(e.showModal);
		m.setTitle(e.title || "");
		m.setIconCls(e.titleIcon);
		m.setShowHeader(e.showHeader);
		m.setShowCloseButton(e.showCloseButton);
		var d = m.uid + "$table", b = m.uid + "$content";
		var v = '<div class="' + e.iconCls + '" style="' + e.iconStyle
				+ '"></div>';
		var o = '<table class="fui-messagebox-table" id="' + d
				+ '" style="" cellspacing="0" cellpadding="0"><tr><td>' + v
				+ '</td><td id="' + b
				+ '" class="fui-messagebox-content-text">' + (e.message || "")
				+ "</td></tr></table>";
		var c = '<div class="fui-messagebox-content"></div><div class="fui-messagebox-buttons"></div>';
		m._bodyEl.innerHTML = c;
		var g = m._bodyEl.firstChild;
		if (e.html) {
			if (typeof e.html == "string") {
				g.innerHTML = e.html
			} else {
				if (fui.isElement(e.html)) {
					g.appendChild(e.html)
				}
			}
		} else {
			g.innerHTML = o
		}
		m._Buttons = [];
		var w = m._bodyEl.lastChild;
		if (e.buttons && e.buttons.length > 0) {
			for (var t = 0, r = e.buttons.length; t < r; t++) {
				var a = e.buttons[t];
				var n = fui.MessageBox.buttonText[a];
				if (!n) {
					n = a
				}
				var j = new fui.Button();
				j.setText(n);
				j.setWidth(e.buttonWidth);
				j.render(w);
				j.action = a;
				j.on("click", function(l) {
					var i = l.sender;
					if (f) {
						f(i.action)
					}
					fui.MessageBox.hide(m)
				});
				if (t != r - 1) {
					j.setStyle(e.spaceStyle)
				}
				m._Buttons.push(j)
			}
		} else {
			w.style.display = "none"
		}
		m.setMinWidth(e.minWidth);
		m.setMinHeight(e.minHeight);
		m.setMaxWidth(e.maxWidth);
		m.setMaxHeight(e.maxHeight);
		m.setWidth(e.width);
		m.setHeight(e.height);
		m.show();
		var q = m.getWidth();
		m.setWidth(q);
		var p = m.getHeight();
		m.setHeight(p);
		var k = document.getElementById(d);
		if (k) {
			k.style.width = "100%"
		}
		var h = document.getElementById(b);
		if (h) {
			h.style.width = "100%"
		}
		var u = m._Buttons[0];
		if (u) {
			u.focus()
		} else {
			m.focus()
		}
		m.on("beforebuttonclick", function(i) {
			if (f) {
				f("close")
			}
			i.cancel = true;
			fui.MessageBox.hide(m)
		});
		fui.on(m.el, "keydown", function(i) {
		});
		return m.uid
	},
	hide : function(e) {
		if (!e) {
			return
		}
		var d = typeof e == "object" ? e : fui.getbyUID(e);
		if (!d) {
			return
		}
		for (var c = 0, a = d._Buttons.length; c < a; c++) {
			var b = d._Buttons[c];
			b.destroy()
		}
		d._Buttons = null;
		d.destroy()
	},
	alert : function(a, b, c) {
		return fui.MessageBox.show({
			minWidth : 250,
			title : b || fui.MessageBox.alertTitle,
			buttons : [ "ok" ],
			message : a,
			iconCls : "fui-messagebox-warning",
			callback : c
		})
	},
	confirm : function(a, b, c) {
		return fui.MessageBox.show({
			minWidth : 250,
			title : b || fui.MessageBox.confirmTitle,
			buttons : [ "ok", "cancel" ],
			message : a,
			iconCls : "fui-messagebox-question",
			callback : c
		})
	},
	prompt : function(d, f, h, e) {
		var g = "prompt$" + new Date().getTime();
		var c = d || fui.MessageBox.promptMessage;
		if (e) {
			c = c
					+ '<br/><textarea id="'
					+ g
					+ '" style="width:200px;height:60px;margin-top:3px;"></textarea>'
		} else {
			c = c + '<br/><input id="' + g
					+ '" type="text" style="width:200px;margin-top:3px;"/>'
		}
		var b = fui.MessageBox.show({
			title : f || fui.MessageBox.promptTitle,
			buttons : [ "ok", "cancel" ],
			width : 250,
			html : '<div style="padding:5px;padding-left:10px;">' + c
					+ "</div>",
			callback : function(j) {
				var i = document.getElementById(g);
				if (h) {
					h(j, i.value)
				}
			}
		});
		var a = document.getElementById(g);
		a.focus();
		return b
	},
	loading : function(a, b) {
		return fui.MessageBox.show({
			minHeight : 50,
			title : b,
			showCloseButton : false,
			message : a,
			iconCls : "fui-messagebox-waiting"
		})
	}
};
fui.alert = fui.MessageBox.alert;
fui.confirm = fui.MessageBox.confirm;
fui.prompt = fui.MessageBox.prompt;
fui.loading = fui.MessageBox.loading;
fui.showMessageBox = fui.MessageBox.show;
fui.hideMessageBox = fui.MessageBox.hide;
fui.Splitter = function() {
	this._initPanes();
	fui.Splitter.superclass.constructor.call(this)
};
fui
		.extend(
				fui.Splitter,
				fui.Control,
				{
					width : 300,
					height : 180,
					vertical : false,
					allowResize : true,
					pane1 : null,
					pane2 : null,
					showHandleButton : true,
					handlerStyle : "",
					handlerCls : "",
					handlerSize : 5,
					uiCls : "fui-splitter",
					_create : function() {
						this.el = document.createElement("div");
						this.el.className = "fui-splitter";
						this.el.innerHTML = '<div class="fui-splitter-border"><div id="1" class="fui-splitter-pane fui-splitter-pane1"></div><div id="2" class="fui-splitter-pane fui-splitter-pane2"></div><div class="fui-splitter-handler"></div></div>';
						this._borderEl = this.el.firstChild;
						this._pane1El = this._borderEl.firstChild;
						this._pane2El = this._borderEl.childNodes[1];
						this._handlerEl = this._borderEl.lastChild
					},
					_initEvents : function() {
						fui._BindEvents(function() {
							fui.on(this.el, "click", this.__OnClick, this);
							fui.on(this.el, "mousedown", this.__OnMouseDown,
									this)
						}, this)
					},
					_initPanes : function() {
						this.pane1 = {
							id : "",
							index : 1,
							minSize : 30,
							maxSize : 3000,
							size : "",
							showCollapseButton : false,
							cls : "",
							style : "",
							visible : true,
							expanded : true
						};
						this.pane2 = fui.copyTo({}, this.pane1);
						this.pane2.index = 2
					},
					doUpdate : function() {
						this.doLayout()
					},
					doLayout : function() {
						if (!this.canLayout()) {
							return
						}
						this._handlerEl.style.cursor = this.allowResize ? ""
								: "default";
						fui.removeClass(this.el, "fui-splitter-vertical");
						if (this.vertical) {
							fui.addClass(this.el, "fui-splitter-vertical")
						}
						fui.removeClass(this._pane1El,
								"fui-splitter-pane1-vertical");
						fui.removeClass(this._pane2El,
								"fui-splitter-pane2-vertical");
						if (this.vertical) {
							fui.addClass(this._pane1El,
									"fui-splitter-pane1-vertical");
							fui.addClass(this._pane2El,
									"fui-splitter-pane2-vertical")
						}
						fui.removeClass(this._handlerEl,
								"fui-splitter-handler-vertical");
						if (this.vertical) {
							fui.addClass(this._handlerEl,
									"fui-splitter-handler-vertical")
						}
						var t = this.getHeight(true);
						var k = this.getWidth(true);
						if (!jQuery.boxModel) {
							var f = fui.getBorders(this._borderEl);
							t = t + f.top + f.bottom;
							k = k + f.left + f.right
						}
						if (k < 0) {
							k = 0
						}
						if (t < 0) {
							t = 0
						}
						this._borderEl.style.width = k + "px";
						this._borderEl.style.height = t + "px";
						var b = this._pane1El, a = this._pane2El;
						var m = jQuery(b), j = jQuery(a);
						b.style.display = a.style.display = this._handlerEl.style.display = "";
						var y = this.handlerSize;
						this.pane1.size = String(this.pane1.size);
						this.pane2.size = String(this.pane2.size);
						var v = parseFloat(this.pane1.size), n = parseFloat(this.pane2.size);
						var r = isNaN(v), g = isNaN(n);
						var x = !isNaN(v) && this.pane1.size.indexOf("%") != -1;
						var l = !isNaN(n) && this.pane2.size.indexOf("%") != -1;
						var e = !r && !x;
						var d = !g && !l;
						var p = this.vertical ? t - this.handlerSize : k
								- this.handlerSize;
						var u = p2Size = 0;
						if (r || g) {
							if (r && g) {
								u = parseInt(p / 2);
								p2Size = p - u
							} else {
								if (e) {
									u = v;
									p2Size = p - u
								} else {
									if (x) {
										u = parseInt(p * v / 100);
										p2Size = p - u
									} else {
										if (d) {
											p2Size = n;
											u = p - p2Size
										} else {
											if (l) {
												p2Size = parseInt(p * n / 100);
												u = p - p2Size
											}
										}
									}
								}
							}
						} else {
							if (x && d) {
								p2Size = n;
								u = p - p2Size
							} else {
								if (e && l) {
									u = v;
									p2Size = p - u
								} else {
									var c = v + n;
									u = parseInt(p * v / c);
									p2Size = p - u
								}
							}
						}
						if (u > this.pane1.maxSize) {
							u = this.pane1.maxSize;
							p2Size = p - u
						}
						if (p2Size > this.pane2.maxSize) {
							p2Size = this.pane2.maxSize;
							u = p - p2Size
						}
						if (u < this.pane1.minSize) {
							u = this.pane1.minSize;
							p2Size = p - u
						}
						if (p2Size < this.pane2.minSize) {
							p2Size = this.pane2.minSize;
							u = p - p2Size
						}
						if (this.pane1.expanded == false) {
							p2Size = p;
							u = 0;
							b.style.display = "none"
						} else {
							if (this.pane2.expanded == false) {
								u = p;
								p2Size = 0;
								a.style.display = "none"
							}
						}
						if (this.pane1.visible == false) {
							p2Size = p + y;
							u = y = 0;
							b.style.display = "none";
							this._handlerEl.style.display = "none"
						} else {
							if (this.pane2.visible == false) {
								u = p + y;
								p2Size = y = 0;
								a.style.display = "none";
								this._handlerEl.style.display = "none"
							}
						}
						if (this.vertical) {
							fui.setWidth(b, k);
							fui.setWidth(a, k);
							fui.setHeight(b, u);
							fui.setHeight(a, p2Size);
							a.style.top = (u + y) + "px";
							this._handlerEl.style.left = "0px";
							this._handlerEl.style.top = u + "px";
							fui.setWidth(this._handlerEl, k);
							fui.setHeight(this._handlerEl, this.handlerSize);
							b.style.left = "0px";
							a.style.left = "0px"
						} else {
							fui.setWidth(b, u);
							fui.setWidth(a, p2Size);
							fui.setHeight(b, t);
							fui.setHeight(a, t);
							a.style.left = (u + y) + "px";
							this._handlerEl.style.top = "0px";
							this._handlerEl.style.left = u + "px";
							fui.setWidth(this._handlerEl, this.handlerSize);
							fui.setHeight(this._handlerEl, t);
							b.style.top = "0px";
							a.style.top = "0px"
						}
						var o = '<div class="fui-splitter-handler-buttons">';
						if (!this.pane1.expanded || !this.pane2.expanded) {
							if (!this.pane1.expanded) {
								if (this.pane1.showCollapseButton) {
									o += '<a id="1" class="fui-splitter-pane2-button"></a>'
								}
							} else {
								if (this.pane2.showCollapseButton) {
									o += '<a id="2" class="fui-splitter-pane1-button"></a>'
								}
							}
						} else {
							if (this.pane1.showCollapseButton) {
								o += '<a id="1" class="fui-splitter-pane1-button"></a>'
							}
							if (this.allowResize) {
								if ((!this.pane1.showCollapseButton && !this.pane2.showCollapseButton)) {
									o += '<span class="fui-splitter-resize-button"></span>'
								}
							}
							if (this.pane2.showCollapseButton) {
								o += '<a id="2" class="fui-splitter-pane2-button"></a>'
							}
						}
						o += "</div>";
						this._handlerEl.innerHTML = o;
						var q = this._handlerEl.firstChild;
						q.style.display = this.showHandleButton ? "" : "none";
						var i = fui.getBox(q);
						if (this.vertical) {
							q.style.marginLeft = -i.width / 2 + "px"
						} else {
							q.style.marginTop = -i.height / 2 + "px"
						}
						if (!this.pane1.visible || !this.pane2.visible
								|| !this.pane1.expanded || !this.pane2.expanded) {
							fui
									.addClass(this._handlerEl,
											"fui-splitter-nodrag")
						} else {
							fui.removeClass(this._handlerEl,
									"fui-splitter-nodrag")
						}
						fui.layout(this._borderEl);
						this.fire("layout")
					},
					getPaneBox : function(a) {
						var b = this.getPaneEl(a);
						if (!b) {
							return null
						}
						return fui.getBox(b)
					},
					getPane : function(a) {
						if (a == 1) {
							return this.pane1
						} else {
							if (a == 2) {
								return this.pane2
							}
						}
						return a
					},
					setPanes : function(b) {
						if (!fui.isArray(b)) {
							return
						}
						for (var a = 0; a < 2; a++) {
							var c = b[a];
							this.updatePane(a + 1, c)
						}
					},
					setPaneControls : function(a, c) {
						var d = this.getPane(a);
						if (!d) {
							return
						}
						var b = this.getPaneEl(a);
						__fui_setControls(c, b, this)
					},
					getPaneEl : function(a) {
						if (a == 1) {
							return this._pane1El
						}
						return this._pane2El
					},
					updatePane : function(c, b) {
						var h = this.getPane(c);
						if (!h) {
							return
						}
						fui.copyTo(h, b);
						var f = this.getPaneEl(c);
						var e = h.body;
						delete h.body;
						if (e) {
							if (!fui.isArray(e)) {
								e = [ e ]
							}
							for (var d = 0, a = e.length; d < a; d++) {
								fui.append(f, e[d])
							}
						}
						if (h.bodyParent) {
							var g = h.bodyParent;
							while (g.firstChild) {
								f.appendChild(g.firstChild)
							}
						}
						delete h.bodyParent;
						f.id = h.id;
						fui.setStyle(f, h.style);
						fui.addClass(f, h["class"]);
						if (h.controls) {
							var c = h == this.pane1 ? 1 : 2;
							this.setPaneControls(c, h.controls);
							delete h.controls
						}
						this.doUpdate()
					},
					setShowHandleButton : function(a) {
						this.showHandleButton = a;
						this.doUpdate()
					},
					getShowHandleButton : function(a) {
						return this.showHandleButton
					},
					setVertical : function(a) {
						this.vertical = a;
						this.doUpdate()
					},
					getVertical : function() {
						return this.vertical
					},
					expandPane : function(a) {
						var c = this.getPane(a);
						if (!c) {
							return
						}
						c.expanded = true;
						this.doUpdate();
						var b = {
							pane : c,
							paneIndex : this.pane1 == c ? 1 : 2
						};
						this.fire("expand", b)
					},
					collapsePane : function(a) {
						var d = this.getPane(a);
						if (!d) {
							return
						}
						d.expanded = false;
						var b = d == this.pane1 ? this.pane2 : this.pane1;
						if (b.expanded == false) {
							b.expanded = true;
							b.visible = true
						}
						this.doUpdate();
						var c = {
							pane : d,
							paneIndex : this.pane1 == d ? 1 : 2
						};
						this.fire("collapse", c)
					},
					togglePane : function(a) {
						var b = this.getPane(a);
						if (!b) {
							return
						}
						if (b.expanded) {
							this.collapsePane(b)
						} else {
							this.expandPane(b)
						}
					},
					showPane : function(a) {
						var b = this.getPane(a);
						if (!b) {
							return
						}
						b.visible = true;
						this.doUpdate()
					},
					hidePane : function(a) {
						var c = this.getPane(a);
						if (!c) {
							return
						}
						c.visible = false;
						var b = c == this.pane1 ? this.pane2 : this.pane1;
						if (b.visible == false) {
							b.expanded = true;
							b.visible = true
						}
						this.doUpdate()
					},
					setAllowResize : function(a) {
						if (this.allowResize != a) {
							this.allowResize = a;
							this.doLayout()
						}
					},
					getAllowResize : function() {
						return this.allowResize
					},
					setHandlerSize : function(a) {
						if (this.handlerSize != a) {
							this.handlerSize = a;
							this.doLayout()
						}
					},
					getHandlerSize : function() {
						return this.handlerSize
					},
					__OnClick : function(c) {
						var b = c.target;
						if (!fui.isAncestor(this._handlerEl, b)) {
							return
						}
						var a = parseInt(b.id);
						var d = this.getPane(a);
						var c = {
							pane : d,
							paneIndex : a,
							cancel : false
						};
						if (d.expanded) {
							this.fire("beforecollapse", c)
						} else {
							this.fire("beforeexpand", c)
						}
						if (c.cancel == true) {
							return
						}
						if (b.className == "fui-splitter-pane1-button") {
							this.togglePane(a)
						} else {
							if (b.className == "fui-splitter-pane2-button") {
								this.togglePane(a)
							}
						}
					},
					_OnButtonClick : function(b, a) {
						this.fire("buttonclick", {
							pane : b,
							index : this.pane1 == b ? 1 : 2,
							htmlEvent : a
						})
					},
					onButtonClick : function(b, a) {
						this.on("buttonclick", b, a)
					},
					__OnMouseDown : function(c) {
						var a = c.target;
						if (!this.allowResize) {
							return
						}
						if (!this.pane1.visible || !this.pane2.visible
								|| !this.pane1.expanded || !this.pane2.expanded) {
							return
						}
						if (fui.isAncestor(this._handlerEl, a)) {
							if (a.className == "fui-splitter-pane1-button"
									|| a.className == "fui-splitter-pane2-button") {
							} else {
								var b = this._getDrag();
								b.start(c)
							}
						}
					},
					_getDrag : function() {
						if (!this.drag) {
							this.drag = new fui.Drag({
								capture : true,
								onStart : fui.createDelegate(this._OnDragStart,
										this),
								onMove : fui.createDelegate(this._OnDragMove,
										this),
								onStop : fui.createDelegate(this._OnDragStop,
										this)
							})
						}
						return this.drag
					},
					_OnDragStart : function(a) {
						this._maskProxy = fui.append(document.body,
								'<div class="fui-resizer-mask"></div>');
						this._dragProxy = fui.append(document.body,
								'<div class="fui-proxy"></div>');
						this._dragProxy.style.cursor = this.vertical ? "n-resize"
								: "w-resize";
						this.handlerBox = fui.getBox(this._handlerEl);
						this.elBox = fui.getBox(this._borderEl, true);
						fui.setBox(this._dragProxy, this.handlerBox)
					},
					_OnDragMove : function(d) {
						if (!this.handlerBox) {
							return
						}
						if (!this.elBox) {
							this.elBox = fui.getBox(this._borderEl, true)
						}
						var k = this.elBox.width, e = this.elBox.height;
						var c = this.handlerSize;
						var n = this.vertical ? e - this.handlerSize : k
								- this.handlerSize;
						var l = this.pane1.minSize, a = this.pane1.maxSize;
						var g = this.pane2.minSize, m = this.pane2.maxSize;
						if (this.vertical == true) {
							var b = d.now[1] - d.init[1];
							var i = this.handlerBox.y + b;
							if (i - this.elBox.y > a) {
								i = this.elBox.y + a
							}
							if (i + this.handlerBox.height < this.elBox.bottom
									- m) {
								i = this.elBox.bottom - m
										- this.handlerBox.height
							}
							if (i - this.elBox.y < l) {
								i = this.elBox.y + l
							}
							if (i + this.handlerBox.height > this.elBox.bottom
									- g) {
								i = this.elBox.bottom - g
										- this.handlerBox.height
							}
							fui.setY(this._dragProxy, i)
						} else {
							var f = d.now[0] - d.init[0];
							var j = this.handlerBox.x + f;
							if (j - this.elBox.x > a) {
								j = this.elBox.x + a
							}
							if (j + this.handlerBox.width < this.elBox.right
									- m) {
								j = this.elBox.right - m
										- this.handlerBox.width
							}
							if (j - this.elBox.x < l) {
								j = this.elBox.x + l
							}
							if (j + this.handlerBox.width > this.elBox.right
									- g) {
								j = this.elBox.right - g
										- this.handlerBox.width
							}
							fui.setX(this._dragProxy, j)
						}
					},
					_OnDragStop : function(g) {
						var m = this.elBox.width, i = this.elBox.height;
						var b = this.handlerSize;
						var q = parseFloat(this.pane1.size), o = parseFloat(this.pane2.size);
						var n = isNaN(q), l = isNaN(o);
						var k = !isNaN(q) && this.pane1.size.indexOf("%") != -1;
						var j = !isNaN(o) && this.pane2.size.indexOf("%") != -1;
						var a = !n && !k;
						var f = !l && !j;
						var p = this.vertical ? i - this.handlerSize : m
								- this.handlerSize;
						var e = fui.getBox(this._dragProxy);
						var d = e.x - this.elBox.x, c = p - d;
						if (this.vertical) {
							d = e.y - this.elBox.y;
							c = p - d
						}
						if (n || l) {
							if (n && l) {
								q = parseFloat(d / p * 100).toFixed(1);
								this.pane1.size = q + "%"
							} else {
								if (a) {
									q = d;
									this.pane1.size = q
								} else {
									if (k) {
										q = parseFloat(d / p * 100).toFixed(1);
										this.pane1.size = q + "%"
									} else {
										if (f) {
											o = c;
											this.pane2.size = o
										} else {
											if (j) {
												o = parseFloat(c / p * 100)
														.toFixed(1);
												this.pane2.size = o + "%"
											}
										}
									}
								}
							}
						} else {
							if (k && f) {
								this.pane2.size = c
							} else {
								if (a && j) {
									this.pane1.size = d
								} else {
									this.pane1.size = parseFloat(d / p * 100)
											.toFixed(1);
									this.pane2.size = 100 - this.pane1.size
								}
							}
						}
						jQuery(this._dragProxy).remove();
						jQuery(this._maskProxy).remove();
						this._maskProxy = null;
						this._dragProxy = null;
						this.elBox = this.handlerBox = null;
						this.doLayout();
						this.fire("resize")
					},
					getAttrs : function(c) {
						var k = fui.Splitter.superclass.getAttrs.call(this, c);
						fui._ParseBool(c, k, [ "allowResize", "vertical",
								"showHandleButton", "onresize" ]);
						fui._ParseInt(c, k, [ "handlerSize" ]);
						var j = [];
						var a = fui.getChildNodes(c);
						for (var f = 0, e = 2; f < e; f++) {
							var d = a[f];
							var h = jQuery(d);
							var b = {};
							j.push(b);
							if (!d) {
								continue
							}
							b.style = d.style.cssText;
							fui._ParseString(d, b, [ "cls", "size", "id",
									"class" ]);
							fui._ParseBool(d, b, [ "visible", "expanded",
									"showCollapseButton" ]);
							fui._ParseInt(d, b, [ "minSize", "maxSize",
									"handlerSize" ]);
							b.bodyParent = d
						}
						k.panes = j;
						return k
					}
				});
fui.regClass(fui.Splitter, "splitter");
fui.Layout = function() {
	this.regions = [];
	this.regionMap = {};
	fui.Layout.superclass.constructor.call(this)
};
fui
		.extend(
				fui.Layout,
				fui.Control,
				{
					regions : [],
					splitSize : 5,
					collapseWidth : 28,
					collapseHeight : 25,
					regionWidth : 150,
					regionHeight : 80,
					regionMinWidth : 50,
					regionMinHeight : 25,
					regionMaxWidth : 2000,
					regionMaxHeight : 2000,
					uiCls : "fui-layout",
					_create : function() {
						this.el = document.createElement("div");
						this.el.className = "fui-layout";
						this.el.innerHTML = '<div class="fui-layout-border"></div>';
						this._borderEl = this.el.firstChild;
						this.doUpdate()
					},
					_initEvents : function() {
						fui._BindEvents(function() {
							fui.on(this.el, "click", this.__OnClick, this);
							fui.on(this.el, "mousedown", this.__OnMouseDown,
									this);
							fui.on(this.el, "mouseover", this.__OnMouseOver,
									this);
							fui
									.on(this.el, "mouseout", this.__OnMouseOut,
											this);
							fui.on(document, "mousedown",
									this.__OnDocMouseDown, this)
						}, this)
					},
					getRegionEl : function(a) {
						var a = this.getRegion(a);
						if (!a) {
							return null
						}
						return a._el
					},
					getRegionHeaderEl : function(a) {
						var a = this.getRegion(a);
						if (!a) {
							return null
						}
						return a._header
					},
					getRegionBodyEl : function(a) {
						var a = this.getRegion(a);
						if (!a) {
							return null
						}
						return a._body
					},
					getRegionSplitEl : function(a) {
						var a = this.getRegion(a);
						if (!a) {
							return null
						}
						return a._split
					},
					getRegionProxyEl : function(a) {
						var a = this.getRegion(a);
						if (!a) {
							return null
						}
						return a._proxy
					},
					getRegionBox : function(b) {
						var a = this.getRegionEl(b);
						if (a) {
							return fui.getBox(a)
						}
						return null
					},
					getRegion : function(a) {
						if (typeof a == "string") {
							return this.regionMap[a]
						}
						return a
					},
					_getButton : function(f, b) {
						var e = f.buttons;
						for (var d = 0, a = e.length; d < a; d++) {
							var c = e[d];
							if (c.name == b) {
								return c
							}
						}
					},
					_createRegion : function(a) {
						var b = fui.copyTo({
							region : "",
							title : "",
							iconCls : "",
							iconStyle : "",
							showCloseButton : false,
							showCollapseButton : true,
							buttons : [ {
								name : "close",
								cls : "fui-tools-close",
								html : "",
								visible : false
							}, {
								name : "collapse",
								cls : "fui-tools-collapse",
								html : "",
								visible : true
							} ],
							showSplitIcon : false,
							showSplit : true,
							showHeader : true,
							splitSize : this.splitSize,
							collapseSize : this.collapseWidth,
							width : this.regionWidth,
							height : this.regionHeight,
							minWidth : this.regionMinWidth,
							minHeight : this.regionMinHeight,
							maxWidth : this.regionMaxWidth,
							maxHeight : this.regionMaxHeight,
							allowResize : true,
							cls : "",
							style : "",
							headerCls : "",
							headerStyle : "",
							bodyCls : "",
							bodyStyle : "",
							visible : true,
							expanded : true
						}, a);
						return b
					},
					_CreateRegionEl : function(a) {
						var a = this.getRegion(a);
						if (!a) {
							return
						}
						fui
								.append(
										this._borderEl,
										'<div id="'
												+ a.region
												+ '" class="fui-layout-region"><div class="fui-layout-region-header" style="'
												+ a.headerStyle
												+ '"></div><div class="fui-layout-region-body" style="'
												+ a.bodyStyle
												+ '"></div></div>');
						a._el = this._borderEl.lastChild;
						a._header = a._el.firstChild;
						a._body = a._el.lastChild;
						if (a.cls) {
							fui.addClass(a._el, a.cls)
						}
						if (a.style) {
							fui.setStyle(a._el, a.style)
						}
						fui.addClass(a._el, "fui-layout-region-" + a.region);
						if (a.region != "center") {
							fui
									.append(
											this._borderEl,
											'<div uid="'
													+ this.uid
													+ '" id="'
													+ a.region
													+ '" class="fui-layout-split"><div class="fui-layout-spliticon"></div></div>');
							a._split = this._borderEl.lastChild;
							fui.addClass(a._split, "fui-layout-split-"
									+ a.region)
						}
						if (a.region != "center") {
							fui.append(this._borderEl, '<div id="' + a.region
									+ '" class="fui-layout-proxy"></div>');
							a._proxy = this._borderEl.lastChild;
							fui.addClass(a._proxy, "fui-layout-proxy-"
									+ a.region)
						}
					},
					setRegionControls : function(c, b) {
						var c = this.getRegion(c);
						if (!c) {
							return
						}
						var a = this.getRegionBodyEl(c);
						__fui_setControls(b, a, this)
					},
					setRegions : function(c) {
						if (!fui.isArray(c)) {
							return
						}
						for (var b = 0, a = c.length; b < a; b++) {
							this.addRegion(c[b])
						}
					},
					addRegion : function(j, h) {
						var d = j;
						j = this._createRegion(j);
						if (!j.region) {
							j.region = "center"
						}
						j.region = j.region.toLowerCase();
						if (j.region == "center" && d && !d.showHeader) {
							j.showHeader = false
						}
						if (j.region == "north" || j.region == "south") {
							if (!d.collapseSize) {
								j.collapseSize = this.collapseHeight
							}
						}
						this._measureRegion(j);
						if (typeof h != "number") {
							h = this.regions.length
						}
						var a = this.regionMap[j.region];
						if (a) {
							return
						}
						this.regions.insert(h, j);
						this.regionMap[j.region] = j;
						this._CreateRegionEl(j);
						var c = this.getRegionBodyEl(j);
						var g = j.body;
						delete j.body;
						if (g) {
							if (!fui.isArray(g)) {
								g = [ g ]
							}
							for (var f = 0, e = g.length; f < e; f++) {
								fui.append(c, g[f])
							}
						}
						if (j.bodyParent) {
							var b = j.bodyParent;
							while (b.firstChild) {
								c.appendChild(b.firstChild)
							}
						}
						delete j.bodyParent;
						if (j.controls) {
							this.setRegionControls(j, j.controls);
							delete j.controls
						}
						this.doUpdate()
					},
					removeRegion : function(a) {
						var a = this.getRegion(a);
						if (!a) {
							return
						}
						this.regions.remove(a);
						delete this.regionMap[a.region];
						jQuery(a._el).remove();
						jQuery(a._split).remove();
						jQuery(a._proxy).remove();
						this.doUpdate()
					},
					moveRegion : function(c, a) {
						var c = this.getRegion(c);
						if (!c) {
							return
						}
						var b = this.regions[a];
						if (!b || b == c) {
							return
						}
						this.regions.remove(c);
						var a = this.region.indexOf(b);
						this.regions.insert(a, c);
						this.doUpdate()
					},
					_measureRegion : function(b) {
						var a = this._getButton(b, "close");
						a.visible = b.showCloseButton;
						var a = this._getButton(b, "collapse");
						a.visible = b.showCollapseButton;
						if (b.width < b.minWidth) {
							b.width = fui.minWidth
						}
						if (b.width > b.maxWidth) {
							b.width = fui.maxWidth
						}
						if (b.height < b.minHeight) {
							b.height = fui.minHeight
						}
						if (b.height > b.maxHeight) {
							b.height = fui.maxHeight
						}
					},
					updateRegion : function(b, a) {
						b = this.getRegion(b);
						if (!b) {
							return
						}
						if (a) {
							delete a.region
						}
						fui.copyTo(b, a);
						this._measureRegion(b);
						this.doUpdate()
					},
					expandRegion : function(a) {
						a = this.getRegion(a);
						if (!a) {
							return
						}
						a.expanded = true;
						this.doUpdate()
					},
					collapseRegion : function(a) {
						a = this.getRegion(a);
						if (!a) {
							return
						}
						a.expanded = false;
						this.doUpdate()
					},
					toggleRegion : function(a) {
						a = this.getRegion(a);
						if (!a) {
							return
						}
						if (a.expanded) {
							this.collapseRegion(a)
						} else {
							this.expandRegion(a)
						}
					},
					showRegion : function(a) {
						a = this.getRegion(a);
						if (!a) {
							return
						}
						a.visible = true;
						this.doUpdate()
					},
					hideRegion : function(a) {
						a = this.getRegion(a);
						if (!a) {
							return
						}
						a.visible = false;
						this.doUpdate()
					},
					isExpandRegion : function(a) {
						a = this.getRegion(a);
						if (!a) {
							return null
						}
						return this.region.expanded
					},
					isVisibleRegion : function(a) {
						a = this.getRegion(a);
						if (!a) {
							return null
						}
						return this.region.visible
					},
					_tryToggleRegion : function(b) {
						b = this.getRegion(b);
						var a = {
							region : b,
							cancel : false
						};
						if (b.expanded) {
							this.fire("BeforeCollapse", a);
							if (a.cancel == false) {
								this.collapseRegion(b)
							}
						} else {
							this.fire("BeforeExpand", a);
							if (a.cancel == false) {
								this.expandRegion(b)
							}
						}
					},
					_getProxyElByEvent : function(b) {
						var a = fui.findParent(b.target, "fui-layout-proxy");
						return a
					},
					_getRegionElByEvent : function(b) {
						var a = fui.findParent(b.target, "fui-layout-region");
						return a
					},
					__OnClick : function(f) {
						if (this._inAniming) {
							return
						}
						var a = this._getProxyElByEvent(f);
						if (a) {
							var d = a.id;
							var c = fui.findParent(f.target,
									"fui-tools-collapse");
							if (c) {
								this._tryToggleRegion(d)
							} else {
								this._VirtualToggle(d)
							}
						}
						var b = this._getRegionElByEvent(f);
						if (b
								&& fui.findParent(f.target,
										"fui-layout-region-header")) {
							var d = b.id;
							var c = fui.findParent(f.target,
									"fui-tools-collapse");
							if (c) {
								this._tryToggleRegion(d)
							}
							var g = fui.findParent(f.target, "fui-tools-close");
							if (g) {
								this.updateRegion(d, {
									visible : false
								})
							}
						}
						if (fui.hasClass(f.target, "fui-layout-spliticon")) {
							var d = f.target.parentNode.id;
							this._tryToggleRegion(d)
						}
					},
					_OnButtonClick : function(c, b, a) {
						this.fire("buttonclick", {
							htmlEvent : a,
							region : c,
							button : b,
							index : this.buttons.indexOf(b),
							name : b.name
						})
					},
					_OnButtonMouseDown : function(c, b, a) {
						this.fire("buttonmousedown", {
							htmlEvent : a,
							region : c,
							button : b,
							index : this.buttons.indexOf(b),
							name : b.name
						})
					},
					hoverProxyEl : null,
					__OnMouseOver : function(b) {
						var a = this._getProxyElByEvent(b);
						if (a) {
							fui.addClass(a, "fui-layout-proxy-hover");
							this.hoverProxyEl = a
						}
					},
					__OnMouseOut : function(a) {
						if (this.hoverProxyEl) {
							fui.removeClass(this.hoverProxyEl,
									"fui-layout-proxy-hover")
						}
						this.hoverProxyEl = null
					},
					onButtonClick : function(b, a) {
						this.on("buttonclick", b, a)
					},
					onButtonMouseDown : function(b, a) {
						this.on("buttonmousedown", b, a)
					}
				});
fui
		.copyTo(
				fui.Layout.prototype,
				{
					_createHeader : function(e, c) {
						var d = '<div class="fui-tools">';
						if (c) {
							d += '<span class="fui-tools-collapse"></span>'
						} else {
							for (var b = e.buttons.length - 1; b >= 0; b--) {
								var a = e.buttons[b];
								d += '<span class="' + a.cls + '" style="';
								d += a.style + ";"
										+ (a.visible ? "" : "display:none;")
										+ '">' + a.html + "</span>"
							}
						}
						d += "</div>";
						d += '<div class="fui-layout-region-icon '
								+ e.iconCls
								+ '" style="'
								+ e.iconStyle
								+ ";"
								+ ((e.iconStyle || e.iconCls) ? ""
										: "display:none;") + '"></div>';
						d += '<div class="fui-layout-region-title">' + e.title
								+ "</div>";
						return d
					},
					doUpdate : function() {
						for (var d = 0, a = this.regions.length; d < a; d++) {
							var g = this.regions[d];
							var f = g.region;
							var e = g._el, c = g._split, b = g._proxy;
							if (g.cls) {
								fui.addClass(e, g.cls)
							}
							g._header.style.display = g.showHeader ? ""
									: "none";
							g._header.innerHTML = this._createHeader(g);
							if (g._proxy) {
								g._proxy.innerHTML = this
										._createHeader(g, true)
							}
							if (c) {
								fui.removeClass(c, "fui-layout-split-nodrag");
								if (g.expanded == false || !g.allowResize) {
									fui.addClass(c, "fui-layout-split-nodrag")
								}
							}
						}
						this.doLayout()
					},
					doLayout : function() {
						if (!this.canLayout()) {
							return
						}
						if (this._inAniming) {
							return
						}
						var t = fui.getHeight(this.el, true);
						var n = fui.getWidth(this.el, true);
						var m = {
							x : 0,
							y : 0,
							width : n,
							height : t
						};
						var b = this.regions.clone();
						var z = this.getRegion("center");
						b.remove(z);
						if (z) {
							b.push(z)
						}
						for (var s = 0, q = b.length; s < q; s++) {
							var f = b[s];
							f._Expanded = false;
							fui.removeClass(f._el, "fui-layout-popup");
							var g = f.region;
							var c = f._el, p = f._split, r = f._proxy;
							if (f.visible == false) {
								c.style.display = "none";
								if (g != "center") {
									p.style.display = r.style.display = "none"
								}
								continue
							}
							c.style.display = "";
							if (g != "center") {
								p.style.display = r.style.display = ""
							}
							var k = m.x, j = m.y, n = m.width, t = m.height;
							var e = f.width, o = f.height;
							if (!f.expanded) {
								if (g == "west" || g == "east") {
									e = f.collapseSize;
									fui.setWidth(c, f.width)
								} else {
									if (g == "north" || g == "south") {
										o = f.collapseSize;
										fui.setHeight(c, f.height)
									}
								}
							}
							switch (g) {
							case "north":
								t = o;
								m.y += o;
								m.height -= o;
								break;
							case "south":
								t = o;
								j = m.y + m.height - o;
								m.height -= o;
								break;
							case "west":
								n = e;
								m.x += e;
								m.width -= e;
								break;
							case "east":
								n = e;
								k = m.x + m.width - e;
								m.width -= e;
								break;
							case "center":
								break;
							default:
								continue
							}
							if (n < 0) {
								n = 0
							}
							if (t < 0) {
								t = 0
							}
							if (g == "west" || g == "east") {
								fui.setHeight(c, t)
							}
							if (g == "north" || g == "south") {
								fui.setWidth(c, n)
							}
							var u = "left:" + k + "px;top:" + j + "px;";
							var v = c;
							if (!f.expanded) {
								v = r;
								c.style.top = "-100px";
								c.style.left = "-1500px"
							} else {
								if (r) {
									r.style.left = "-1500px";
									r.style.top = "-100px"
								}
							}
							v.style.left = k + "px";
							v.style.top = j + "px";
							fui.setWidth(v, n);
							fui.setHeight(v, t);
							var A = jQuery(f._el).height();
							var a = f.showHeader ? jQuery(f._header)
									.outerHeight() : 0;
							fui.setHeight(f._body, A - a);
							if (g == "center") {
								continue
							}
							e = o = f.splitSize;
							var k = m.x, j = m.y, n = m.width, t = m.height;
							switch (g) {
							case "north":
								t = o;
								m.y += o;
								m.height -= o;
								break;
							case "south":
								t = o;
								j = m.y + m.height - o;
								m.height -= o;
								break;
							case "west":
								n = e;
								m.x += e;
								m.width -= e;
								break;
							case "east":
								n = e;
								k = m.x + m.width - e;
								m.width -= e;
								break;
							case "center":
								break
							}
							if (n < 0) {
								n = 0
							}
							if (t < 0) {
								t = 0
							}
							p.style.left = k + "px";
							p.style.top = j + "px";
							fui.setWidth(p, n);
							fui.setHeight(p, t);
							if (f.showSplit && f.expanded
									&& f.allowResize == true) {
								fui.removeClass(p, "fui-layout-split-nodrag")
							} else {
								fui.addClass(p, "fui-layout-split-nodrag")
							}
							p.firstChild.style.display = f.showSplitIcon ? "block"
									: "none";
							if (f.expanded) {
								fui.removeClass(p.firstChild,
										"fui-layout-spliticon-collapse")
							} else {
								fui.addClass(p.firstChild,
										"fui-layout-spliticon-collapse")
							}
						}
						fui.layout(this._borderEl);
						this.fire("layout")
					},
					__OnMouseDown : function(d) {
						if (this._inAniming) {
							return
						}
						if (fui.findParent(d.target, "fui-layout-split")) {
							var a = jQuery(d.target).attr("uid");
							if (a != this.uid) {
								return
							}
							var c = this.getRegion(d.target.id);
							if (c.expanded == false || !c.allowResize
									|| !c.showSplit) {
								return
							}
							this.dragRegion = c;
							var b = this._getDrag();
							b.start(d)
						}
					},
					_getDrag : function() {
						if (!this.drag) {
							this.drag = new fui.Drag({
								capture : true,
								onStart : fui.createDelegate(this._OnDragStart,
										this),
								onMove : fui.createDelegate(this._OnDragMove,
										this),
								onStop : fui.createDelegate(this._OnDragStop,
										this)
							})
						}
						return this.drag
					},
					_OnDragStart : function(a) {
						this._maskProxy = fui.append(document.body,
								'<div class="fui-resizer-mask"></div>');
						this._dragProxy = fui.append(document.body,
								'<div class="fui-proxy"></div>');
						this._dragProxy.style.cursor = "n-resize";
						if (this.dragRegion.region == "west"
								|| this.dragRegion.region == "east") {
							this._dragProxy.style.cursor = "w-resize"
						}
						this.splitBox = fui.getBox(this.dragRegion._split);
						fui.setBox(this._dragProxy, this.splitBox);
						this.elBox = fui.getBox(this.el, true)
					},
					_OnDragMove : function(s) {
						var z = s.now[0] - s.init[0];
						var l = this.splitBox.x + z;
						var i = s.now[1] - s.init[1];
						var j = this.splitBox.y + i;
						var u = l + this.splitBox.width;
						var g = j + this.splitBox.height;
						var e = this.getRegion("west"), h = this
								.getRegion("east"), q = this.getRegion("north"), n = this
								.getRegion("south"), v = this
								.getRegion("center");
						var w = e && e.visible ? e.width : 0;
						var f = h && h.visible ? h.width : 0;
						var a = q && q.visible ? q.height : 0;
						var k = n && n.visible ? n.height : 0;
						var p = e && e.showSplit ? fui.getWidth(e._split) : 0;
						var m = h && h.showSplit ? fui.getWidth(h._split) : 0;
						var d = q && q.showSplit ? fui.getHeight(q._split) : 0;
						var r = n && n.showSplit ? fui.getHeight(n._split) : 0;
						var c = this.dragRegion, b = c.region;
						if (b == "west") {
							var t = this.elBox.width - f - m - p - v.minWidth;
							if (l - this.elBox.x > t) {
								l = t + this.elBox.x
							}
							if (l - this.elBox.x < c.minWidth) {
								l = c.minWidth + this.elBox.x
							}
							if (l - this.elBox.x > c.maxWidth) {
								l = c.maxWidth + this.elBox.x
							}
							fui.setX(this._dragProxy, l)
						} else {
							if (b == "east") {
								var t = this.elBox.width - w - p - m
										- v.minWidth;
								if (this.elBox.right
										- (l + this.splitBox.width) > t) {
									l = this.elBox.right - t
											- this.splitBox.width
								}
								if (this.elBox.right
										- (l + this.splitBox.width) < c.minWidth) {
									l = this.elBox.right - c.minWidth
											- this.splitBox.width
								}
								if (this.elBox.right
										- (l + this.splitBox.width) > c.maxWidth) {
									l = this.elBox.right - c.maxWidth
											- this.splitBox.width
								}
								fui.setX(this._dragProxy, l)
							} else {
								if (b == "north") {
									var o = this.elBox.height - k - r - d
											- v.minHeight;
									if (j - this.elBox.y > o) {
										j = o + this.elBox.y
									}
									if (j - this.elBox.y < c.minHeight) {
										j = c.minHeight + this.elBox.y
									}
									if (j - this.elBox.y > c.maxHeight) {
										j = c.maxHeight + this.elBox.y
									}
									fui.setY(this._dragProxy, j)
								} else {
									if (b == "south") {
										var o = this.elBox.height - a - d - r
												- v.minHeight;
										if (this.elBox.bottom
												- (j + this.splitBox.height) > o) {
											j = this.elBox.bottom - o
													- this.splitBox.height
										}
										if (this.elBox.bottom
												- (j + this.splitBox.height) < c.minHeight) {
											j = this.elBox.bottom - c.minHeight
													- this.splitBox.height
										}
										if (this.elBox.bottom
												- (j + this.splitBox.height) > c.maxHeight) {
											j = this.elBox.bottom - c.maxHeight
													- this.splitBox.height
										}
										fui.setY(this._dragProxy, j)
									}
								}
							}
						}
					},
					_OnDragStop : function(d) {
						var e = fui.getBox(this._dragProxy);
						var f = this.dragRegion, c = f.region;
						if (c == "west") {
							var b = e.x - this.elBox.x;
							this.updateRegion(f, {
								width : b
							})
						} else {
							if (c == "east") {
								var b = this.elBox.right - e.right;
								this.updateRegion(f, {
									width : b
								})
							} else {
								if (c == "north") {
									var a = e.y - this.elBox.y;
									this.updateRegion(f, {
										height : a
									})
								} else {
									if (c == "south") {
										var a = this.elBox.bottom - e.bottom;
										this.updateRegion(f, {
											height : a
										})
									}
								}
							}
						}
						jQuery(this._dragProxy).remove();
						this._dragProxy = null;
						this.elBox = this.handlerBox = null;
						jQuery(this._maskProxy).remove();
						this._maskProxy = null
					},
					_VirtualToggle : function(a) {
						a = this.getRegion(a);
						if (a._Expanded === true) {
							this._VirtualCollapse(a)
						} else {
							this._VirtualExpand(a)
						}
					},
					_VirtualExpand : function(m) {
						if (this._inAniming) {
							return
						}
						this.doLayout();
						var j = m.region, a = m._el;
						m._Expanded = true;
						fui.addClass(a, "fui-layout-popup");
						var e = fui.getBox(m._proxy);
						var g = fui.getBox(m._el);
						var c = {};
						if (j == "east") {
							var n = e.x;
							var l = e.y;
							var f = e.height;
							fui.setHeight(a, f);
							fui.setX(a, n);
							a.style.top = m._proxy.style.top;
							var d = parseInt(a.style.left);
							c = {
								left : d - g.width
							}
						} else {
							if (j == "west") {
								var n = e.right - g.width;
								var l = e.y;
								var f = e.height;
								fui.setHeight(a, f);
								fui.setX(a, n);
								a.style.top = m._proxy.style.top;
								var d = parseInt(a.style.left);
								c = {
									left : d + g.width
								}
							} else {
								if (j == "north") {
									var n = e.x;
									var l = e.bottom - g.height;
									var o = e.width;
									fui.setWidth(a, o);
									fui.setXY(a, n, l);
									var k = parseInt(a.style.top);
									c = {
										top : k + g.height
									}
								} else {
									if (j == "south") {
										var n = e.x;
										var l = e.y;
										var o = e.width;
										fui.setWidth(a, o);
										fui.setXY(a, n, l);
										var k = parseInt(a.style.top);
										c = {
											top : k - g.height
										}
									}
								}
							}
						}
						fui.addClass(m._proxy, "fui-layout-maxZIndex");
						this._inAniming = true;
						var i = this;
						var b = jQuery(a);
						b.animate(c, 250, function() {
							fui.removeClass(m._proxy, "fui-layout-maxZIndex");
							i._inAniming = false
						})
					},
					_VirtualCollapse : function(h) {
						if (this._inAniming) {
							return
						}
						h._Expanded = false;
						var g = h.region, a = h._el;
						var e = fui.getBox(a);
						var c = {};
						if (g == "east") {
							var d = parseInt(a.style.left);
							c = {
								left : d + e.width
							}
						} else {
							if (g == "west") {
								var d = parseInt(a.style.left);
								c = {
									left : d - e.width
								}
							} else {
								if (g == "north") {
									var i = parseInt(a.style.top);
									c = {
										top : i - e.height
									}
								} else {
									if (g == "south") {
										var i = parseInt(a.style.top);
										c = {
											top : i + e.height
										}
									}
								}
							}
						}
						fui.addClass(h._proxy, "fui-layout-maxZIndex");
						this._inAniming = true;
						var f = this;
						var b = jQuery(a);
						b.animate(c, 250, function() {
							fui.removeClass(h._proxy, "fui-layout-maxZIndex");
							f._inAniming = false;
							f.doLayout()
						})
					},
					__OnDocMouseDown : function(d) {
						if (this._inAniming) {
							return
						}
						for (var b = 0, a = this.regions.length; b < a; b++) {
							var c = this.regions[b];
							if (!c._Expanded) {
								continue
							}
							if (fui.isAncestor(c._el, d.target)
									|| fui.isAncestor(c._proxy, d.target)
									|| d.target.location) {
							} else {
								this._VirtualCollapse(c)
							}
						}
					},
					getAttrs : function(c) {
						var k = fui.Layout.superclass.getAttrs.call(this, c);
						var d = jQuery(c);
						var j = parseInt(d.attr("splitSize"));
						if (!isNaN(j)) {
							k.splitSize = j
						}
						var g = [];
						var a = fui.getChildNodes(c);
						for (var h = 0, f = a.length; h < f; h++) {
							var e = a[h];
							var b = {};
							g.push(b);
							b.cls = e.className;
							b.style = e.style.cssText;
							fui._ParseString(e, b, [ "region", "title",
									"iconCls", "iconStyle", "cls", "headerCls",
									"headerStyle", "bodyCls", "bodyStyle" ]);
							fui._ParseBool(e, b, [ "allowResize", "visible",
									"showCloseButton", "showCollapseButton",
									"showSplit", "showHeader", "expanded",
									"showSplitIcon" ]);
							fui._ParseInt(e, b, [ "splitSize", "collapseSize",
									"width", "height", "minWidth", "minHeight",
									"maxWidth", "maxHeight" ]);
							b.bodyParent = e
						}
						k.regions = g;
						return k
					}
				});
fui.regClass(fui.Layout, "layout");
fui.Box = function() {
	fui.Box.superclass.constructor.call(this)
};
fui.extend(fui.Box, fui.Container, {
	style : "",
	borderStyle : "",
	bodyStyle : "",
	uiCls : "fui-box",
	_create : function() {
		this.el = document.createElement("div");
		this.el.className = "fui-box";
		this.el.innerHTML = '<div class="fui-box-border"></div>';
		this._bodyEl = this._borderEl = this.el.firstChild;
		this._contentEl = this._bodyEl
	},
	_initEvents : function() {
	},
	doLayout : function() {
		if (!this.canLayout()) {
			return
		}
		var b = this.isAutoHeight();
		var g = this.isAutoWidth();
		var f = fui.getPaddings(this._bodyEl);
		var e = fui.getMargins(this._bodyEl);
		if (!b) {
			var d = this.getHeight(true);
			if (jQuery.boxModel) {
				d = d - f.top - f.bottom
			}
			d = d - e.top - e.bottom;
			if (d < 0) {
				d = 0
			}
			this._bodyEl.style.height = d + "px"
		} else {
			this._bodyEl.style.height = ""
		}
		var a = this.getWidth(true);
		var c = a;
		a = a - e.left - e.right;
		if (jQuery.boxModel) {
			a = a - f.left - f.right
		}
		if (a < 0) {
			a = 0
		}
		this._bodyEl.style.width = a + "px";
		fui.layout(this._borderEl);
		this.fire("layout")
	},
	setBody : function(c) {
		if (!c) {
			return
		}
		if (!fui.isArray(c)) {
			c = [ c ]
		}
		for (var b = 0, a = c.length; b < a; b++) {
			fui.append(this._bodyEl, c[b])
		}
		fui.parse(this._bodyEl);
		this.doLayout()
	},
	set_bodyParent : function(b) {
		if (!b) {
			return
		}
		var a = this._bodyEl;
		var c = b;
		while (c.firstChild) {
			a.appendChild(c.firstChild)
		}
		this.doLayout()
	},
	setBodyStyle : function(a) {
		fui.setStyle(this._bodyEl, a);
		this.doLayout()
	},
	getAttrs : function(b) {
		var a = fui.Box.superclass.getAttrs.call(this, b);
		a._bodyParent = b;
		fui._ParseString(b, a, [ "bodyStyle" ]);
		return a
	}
});
fui.regClass(fui.Box, "box");
fui.Include = function() {
	fui.Include.superclass.constructor.call(this)
};
fui.extend(fui.Include, fui.Control, {
	url : "",
	uiCls : "fui-include",
	_create : function() {
		this.el = document.createElement("div");
		this.el.className = "fui-include"
	},
	_initEvents : function() {
	},
	doLayout : function() {
		if (!this.canLayout()) {
			return
		}
		var d = this.el.childNodes;
		if (d) {
			for (var b = 0, a = d.length; b < a; b++) {
				var c = d[b];
				fui.layout(c)
			}
		}
	},
	setUrl : function(a) {
		this.url = a;
		fui.update({
			url : this.url,
			el : this.el,
			async : this.async
		});
		this.doLayout()
	},
	getUrl : function(a) {
		return this.url
	},
	getAttrs : function(b) {
		var a = fui.Include.superclass.getAttrs.call(this, b);
		fui._ParseString(b, a, [ "url" ]);
		return a
	}
});
fui.regClass(fui.Include, "include");
fui.Tabs = function() {
	this._initTabs();
	fui.Tabs.superclass.constructor.call(this)
};
fui
		.extend(
				fui.Tabs,
				fui.Control,
				{
					activeIndex : -1,
					tabAlign : "left",
					tabPosition : "top",
					showBody : true,
					nameField : "name",
					titleField : "title",
					urlField : "url",
					url : "",
					maskOnLoad : true,
					plain : true,
					bodyStyle : "",
					_tabHoverCls : "fui-tab-hover",
					_tabActiveCls : "fui-tab-active",
					set : function(d) {
						if (typeof d == "string") {
							return this
						}
						var c = this._allowLayout;
						this._allowLayout = false;
						var a = d.activeIndex;
						delete d.activeIndex;
						var b = d.url;
						delete d.url;
						fui.Tabs.superclass.set.call(this, d);
						if (b) {
							this.setUrl(b)
						}
						if (fui.isNumber(a)) {
							this.setActiveIndex(a)
						}
						this._allowLayout = c;
						this.doLayout();
						return this
					},
					uiCls : "fui-tabs",
					_create : function() {
						this.el = document.createElement("div");
						this.el.className = "fui-tabs";
						var b = '<table class="fui-tabs-table" cellspacing="0" cellpadding="0"><tr style="width:100%;"><td></td><td style="text-align:left;vertical-align:top;width:100%;"><div class="fui-tabs-bodys"></div></td><td></td></tr></table>';
						this.el.innerHTML = b;
						this._tableEl = this.el.firstChild;
						var a = this.el.getElementsByTagName("td");
						this._td1El = a[0];
						this._td2El = a[1];
						this._td3El = a[2];
						this._bodyEl = this._td2El.firstChild;
						this._borderEl = this._bodyEl;
						this.doUpdate()
					},
					destroy : function(a) {
						this._tableEl = this._td1El = this._td2El = this._td3El = null;
						this._bodyEl = this._borderEl = this.headerEl = null;
						this.tabs = [];
						fui.Tabs.superclass.destroy.call(this, a)
					},
					_doClearElement : function() {
						fui.removeClass(this._td1El, "fui-tabs-header");
						fui.removeClass(this._td3El, "fui-tabs-header");
						this._td1El.innerHTML = "";
						this._td3El.innerHTML = "";
						fui.removeChilds(this._td2El, this._bodyEl)
					},
					_initEvents : function() {
						fui._BindEvents(function() {
							fui.on(this.el, "mousedown", this.__OnMouseDown,
									this);
							fui.on(this.el, "click", this.__OnClick, this);
							fui.on(this.el, "mouseover", this.__OnMouseOver,
									this);
							fui
									.on(this.el, "mouseout", this.__OnMouseOut,
											this)
						}, this)
					},
					_initTabs : function() {
						this.tabs = []
					},
					_TabID : 1,
					createTab : function(a) {
						var b = fui.copyTo({
							_id : this._TabID++,
							name : "",
							title : "",
							newLine : false,
							iconCls : "",
							iconStyle : "",
							headerCls : "",
							headerStyle : "",
							bodyCls : "",
							bodyStyle : "",
							visible : true,
							enabled : true,
							showCloseButton : false,
							active : false,
							url : "",
							loaded : false,
							refreshOnClick : false
						}, a);
						if (a) {
							a = fui.copyTo(a, b);
							b = a
						}
						return b
					},
					_doLoad : function() {
						var a = fui.getData(this.url);
						if (this.dataField) {
							a = fui._getMap(this.dataField, a)
						}
						if (!a) {
							a = []
						}
						this.setTabs(a);
						this.fire("load")
					},
					load : function(a) {
						if (typeof a == "string") {
							this.setUrl(a)
						} else {
							this.setTabs(a)
						}
					},
					setUrl : function(a) {
						this.url = a;
						this._doLoad()
					},
					getUrl : function() {
						return this.url
					},
					setNameField : function(a) {
						this.nameField = a
					},
					getNameField : function() {
						return this.nameField
					},
					setTitleField : function(a) {
						this.titleField = a
					},
					getTitleField : function() {
						return this.titleField
					},
					setUrlField : function(a) {
						this.urlField = a
					},
					getUrlField : function() {
						return this.urlField
					},
					setButtons : function(b) {
						this._buttons = fui.byId(b);
						if (this._buttons) {
							var a = fui.byClass("fui-tabs-buttons", this.el);
							if (a) {
								a.appendChild(this._buttons);
								fui.parse(a);
								this.doLayout()
							}
						}
					},
					setTabControls : function(b, c) {
						var b = this.getTab(b);
						if (!b) {
							return
						}
						var a = this.getTabBodyEl(b);
						__fui_setControls(c, a, this)
					},
					setTabs : function(c) {
						if (!fui.isArray(c)) {
							return
						}
						this.beginUpdate();
						this.removeAll();
						for (var b = 0, a = c.length; b < a; b++) {
							var d = c[b];
							d.title = fui._getMap(this.titleField, d);
							d.url = fui._getMap(this.urlField, d);
							d.name = fui._getMap(this.nameField, d)
						}
						for (var b = 0, a = c.length; b < a; b++) {
							this.addTab(c[b])
						}
						this.setActiveIndex(0);
						this.endUpdate()
					},
					getTabs : function() {
						return this.tabs
					},
					removeAll : function(c) {
						var a = this.getActiveTab();
						if (fui.isNull(c)) {
							c = []
						}
						if (!fui.isArray(c)) {
							c = [ c ]
						}
						for (var e = c.length - 1; e >= 0; e--) {
							var d = this.getTab(c[e]);
							if (!d) {
								c.removeAt(e)
							} else {
								c[e] = d
							}
						}
						var b = this.tabs;
						for (var e = b.length - 1; e >= 0; e--) {
							var f = b[e];
							if (c.indexOf(f) == -1) {
								this.removeTab(f)
							}
						}
						var g = c[0];
						if (a != this.getActiveTab()) {
							if (g) {
								this.activeTab(g)
							}
						}
					},
					addTab : function(c, g) {
						if (typeof c == "string") {
							c = {
								title : c
							}
						}
						c = this.createTab(c);
						if (!c.name) {
							c.name = ""
						}
						if (typeof g != "number") {
							g = this.tabs.length
						}
						this.tabs.insert(g, c);
						var h = this._createTabBodyId(c);
						var j = '<div id="' + h + '" class="fui-tabs-body '
								+ c.bodyCls + '" style="' + c.bodyStyle
								+ ';display:none;"></div>';
						fui.append(this._bodyEl, j);
						var b = this.getTabBodyEl(c);
						var f = c.body;
						delete c.body;
						if (f) {
							if (!fui.isArray(f)) {
								f = [ f ]
							}
							for (var e = 0, d = f.length; e < d; e++) {
								fui.append(b, f[e])
							}
						}
						if (c.bodyParent) {
							var a = c.bodyParent;
							while (a.firstChild) {
								b.appendChild(a.firstChild)
							}
						}
						delete c.bodyParent;
						if (c.controls) {
							this.setTabControls(c, c.controls);
							delete c.controls
						}
						this.doUpdate();
						return c
					},
					removeTab : function(f) {
						f = this.getTab(f);
						if (!f || this.tabs.indexOf(f) == -1) {
							return
						}
						var b = this.getActiveTab();
						var e = f == b;
						var a = this._OnTabDestroy(f);
						this.tabs.remove(f);
						this._doRemoveIFrame(f);
						var d = this.getTabBodyEl(f);
						if (d) {
							this._bodyEl.removeChild(d)
						}
						if (a && e) {
							for (var c = this.activeIndex; c >= 0; c--) {
								var f = this.getTab(c);
								if (f && f.enabled && f.visible) {
									this.activeIndex = c;
									break
								}
							}
							this.doUpdate();
							this.setActiveIndex(this.activeIndex);
							this.fire("activechanged")
						} else {
							this.activeIndex = this.tabs.indexOf(b);
							this.doUpdate()
						}
						return f
					},
					moveTab : function(c, a) {
						c = this.getTab(c);
						if (!c) {
							return
						}
						var b = this.tabs[a];
						if (!b || b == c) {
							return
						}
						this.tabs.remove(c);
						var a = this.tabs.indexOf(b);
						this.tabs.insert(a, c);
						this.doUpdate()
					},
					updateTab : function(b, a) {
						b = this.getTab(b);
						if (!b) {
							return
						}
						fui.copyTo(b, a);
						this.doUpdate()
					},
					_getMaskWrapEl : function() {
						return this._bodyEl
					},
					_doRemoveIFrame : function(h, g) {
						if (h._iframeEl && h._iframeEl.parentNode) {
							h._iframeEl.src = "";
							try {
								iframe.contentWindow.document.write("");
								iframe.contentWindow.document.close()
							} catch (e) {
							}
							if (h._iframeEl._ondestroy) {
								h._iframeEl._ondestroy()
							}
							try {
								h._iframeEl.parentNode.removeChild(h._iframeEl);
								h._iframeEl.removeNode(true)
							} catch (e) {
							}
						}
						h._iframeEl = null;
						h.loadedUrl = null;
						if (g === true) {
							var b = this.getTabBodyEl(h);
							if (b) {
								var f = fui.getChildNodes(b, true);
								for (var c = 0, a = f.length; c < a; c++) {
									var j = f[c];
									if (j && j.parentNode) {
										j.parentNode.removeChild(j)
									}
								}
							}
						}
					},
					_deferLoadingTime : 180,
					_cancelLoadTabs : function(e) {
						var d = this.tabs;
						for (var c = 0, a = d.length; c < a; c++) {
							var b = d[c];
							if (b != e) {
								if (b._loading && b._iframeEl) {
									b._loading = false;
									this._doRemoveIFrame(b, true)
								}
							}
						}
						this._loading = false;
						this.unmask()
					},
					_doLoadTab : function(d) {
						if (!d || d != this.getActiveTab()) {
							return
						}
						var a = this.getTabBodyEl(d);
						if (!a) {
							return
						}
						this._cancelLoadTabs();
						this._doRemoveIFrame(d, true);
						this._loading = true;
						d._loading = true;
						this.unmask();
						if (this.maskOnLoad) {
							this.loading()
						}
						var b = new Date();
						var e = this;
						e.isLoading = true;
						var c = fui
								.createIFrame(
										d.url,
										function(i, h) {
											try {
												d._iframeEl.contentWindow.Owner = window;
												d._iframeEl.contentWindow.CloseOwnerWindow = function(
														k) {
													d.removeAction = k;
													var j = true;
													if (d.ondestroy) {
														if (typeof d.ondestroy == "string") {
															d.ondestroy = window[d.ondestroy]
														}
														if (d.ondestroy) {
															j = d.ondestroy
																	.call(this,
																			g)
														}
													}
													if (j === false) {
														return false
													}
													setTimeout(function() {
														e.removeTab(d)
													}, 10)
												}
											} catch (g) {
											}
											if (d._loading != true) {
												return
											}
											var f = (b - new Date())
													+ e._deferLoadingTime;
											d._loading = false;
											d.loadedUrl = d.url;
											if (f < 0) {
												f = 0
											}
											setTimeout(function() {
												e.unmask();
												e.doLayout();
												e.isLoading = false
											}, f);
											if (h) {
												var g = {
													sender : e,
													tab : d,
													index : e.tabs.indexOf(d),
													name : d.name,
													iframe : d._iframeEl
												};
												if (d.onload) {
													if (typeof d.onload == "string") {
														d.onload = window[d.onload]
													}
													if (d.onload) {
														d.onload.call(e, g)
													}
												}
											}
											if (e.getActiveTab() == d) {
												e.fire("tabload", g)
											}
										});
						setTimeout(function() {
							if (d._iframeEl == c) {
								a.appendChild(c)
							}
						}, 1);
						d._iframeEl = c
					},
					_OnTabDestroy : function(a) {
						var b = {
							sender : this,
							tab : a,
							index : this.tabs.indexOf(a),
							name : a.name,
							iframe : a._iframeEl,
							autoActive : true
						};
						this.fire("tabdestroy", b);
						return b.autoActive
					},
					loadTab : function(a, c, f, e) {
						if (!a) {
							return
						}
						c = this.getTab(c);
						if (!c) {
							c = this.getActiveTab()
						}
						if (!c) {
							return
						}
						var b = this.getTabBodyEl(c);
						if (b) {
							fui.addClass(b, "fui-tabs-hideOverflow")
						}
						c.url = a;
						delete c.loadedUrl;
						if (f) {
							c.onload = f
						}
						if (e) {
							c.ondestroy = e
						}
						var d = this;
						clearTimeout(this._loadTabTimer);
						this._loadTabTimer = null;
						this._loadTabTimer = setTimeout(function() {
							d._doLoadTab(c)
						}, 1)
					},
					reloadTab : function(a) {
						a = this.getTab(a);
						if (!a) {
							a = this.getActiveTab()
						}
						if (!a) {
							return
						}
						this.loadTab(a.url, a)
					},
					getTabRows : function() {
						var d = [];
						var e = [];
						for (var b = 0, a = this.tabs.length; b < a; b++) {
							var c = this.tabs[b];
							if (b != 0 && c.newLine) {
								d.push(e);
								e = []
							}
							e.push(c)
						}
						d.push(e);
						return d
					},
					doUpdate : function() {
						if (this._allowUpdate === false) {
							return
						}
						if (this._buttons && this._buttons.parentNode) {
							this._buttons.parentNode.removeChild(this._buttons)
						}
						fui.removeClass(this.el, "fui-tabs-position-left");
						fui.removeClass(this.el, "fui-tabs-position-top");
						fui.removeClass(this.el, "fui-tabs-position-right");
						fui.removeClass(this.el, "fui-tabs-position-bottom");
						if (this.tabPosition == "bottom") {
							fui.addClass(this.el, "fui-tabs-position-bottom");
							this._doUpdateBottom()
						} else {
							if (this.tabPosition == "right") {
								fui
										.addClass(this.el,
												"fui-tabs-position-right");
								this._doUpdateRight()
							} else {
								if (this.tabPosition == "left") {
									fui.addClass(this.el,
											"fui-tabs-position-left");
									this._doUpdateLeft()
								} else {
									fui.addClass(this.el,
											"fui-tabs-position-top");
									this._doUpdateTop()
								}
							}
						}
						if (this._buttons) {
							var a = fui.byClass("fui-tabs-buttons", this.el);
							if (a) {
								a.appendChild(this._buttons);
								fui.parse(a)
							}
						}
						this.doLayout();
						this.setActiveIndex(this.activeIndex, false)
					},
					_handleIFrameOverflow : function() {
						var a = this.getTabBodyEl(this.activeIndex);
						if (a) {
							fui.removeClass(a, "fui-tabs-hideOverflow");
							var b = fui.getChildNodes(a)[0];
							if (b && b.tagName
									&& b.tagName.toUpperCase() == "IFRAME") {
								fui.addClass(a, "fui-tabs-hideOverflow")
							}
						}
					},
					doLayout : function() {
						if (!this.canLayout()) {
							return
						}
						this._handleIFrameOverflow();
						var A = this.isAutoHeight();
						E = this.getHeight(true);
						n = this.getWidth();
						var o = E;
						var u = n;
						if (this.showBody) {
							this._bodyEl.style.display = ""
						} else {
							this._bodyEl.style.display = "none"
						}
						if (this.plain) {
							fui.addClass(this.el, "fui-tabs-plain")
						} else {
							fui.removeClass(this.el, "fui-tabs-plain")
						}
						if (!A && this.showBody) {
							var z = jQuery(this._headerEl).outerHeight();
							var e = jQuery(this._headerEl).outerWidth();
							if (this.tabPosition == "top") {
								z = jQuery(this._headerEl.parentNode)
										.outerHeight()
							}
							if (this.tabPosition == "left"
									|| this.tabPosition == "right") {
								n = n - e
							} else {
								E = E - z
							}
							if (jQuery.boxModel) {
								var q = fui.getPaddings(this._bodyEl);
								var x = fui.getBorders(this._bodyEl);
								E = E - q.top - q.bottom - x.top - x.bottom;
								n = n - q.left - q.right - x.left - x.right
							}
							margin = fui.getMargins(this._bodyEl);
							E = E - margin.top - margin.bottom;
							n = n - margin.left - margin.right;
							if (E < 0) {
								E = 0
							}
							if (n < 0) {
								n = 0
							}
							this._bodyEl.style.width = n + "px";
							this._bodyEl.style.height = E + "px";
							if (this.tabPosition == "left"
									|| this.tabPosition == "right") {
								var a = this._headerEl
										.getElementsByTagName("tr")[0];
								var B = a.childNodes;
								var p = B[0].getElementsByTagName("tr");
								var f = last = all = 0;
								for (var C = 0, y = p.length; C < y; C++) {
									var a = p[C];
									var m = jQuery(a).outerHeight();
									all += m;
									if (C == 0) {
										f = m
									}
									if (C == y - 1) {
										last = m
									}
								}
								switch (this.tabAlign) {
								case "center":
									var r = parseInt((o - (all - f - last)) / 2);
									for (var C = 0, y = B.length; C < y; C++) {
										B[C].firstChild.style.height = o + "px";
										var j = B[C].firstChild;
										var p = j.getElementsByTagName("tr");
										var H = p[0], G = p[p.length - 1];
										H.style.height = r + "px";
										G.style.height = r + "px"
									}
									break;
								case "right":
									for (var C = 0, y = B.length; C < y; C++) {
										var j = B[C].firstChild;
										var p = j.getElementsByTagName("tr");
										var a = p[0];
										var s = o - (all - f);
										if (s >= 0) {
											a.style.height = s + "px"
										}
									}
									break;
								case "fit":
									for (var C = 0, y = B.length; C < y; C++) {
										B[C].firstChild.style.height = o + "px"
									}
									break;
								default:
									for (var C = 0, y = B.length; C < y; C++) {
										var j = B[C].firstChild;
										var p = j.getElementsByTagName("tr");
										var a = p[p.length - 1];
										var s = o - (all - last);
										if (s >= 0) {
											a.style.height = s + "px"
										}
									}
									break
								}
							}
						} else {
							this._bodyEl.style.width = "auto";
							this._bodyEl.style.height = "auto"
						}
						var d = this.getTabBodyEl(this.activeIndex);
						if (d) {
							if (!A && this.showBody) {
								var E = fui.getHeight(this._bodyEl, true);
								if (jQuery.boxModel) {
									var q = fui.getPaddings(d);
									var x = fui.getBorders(d);
									E = E - q.top - q.bottom - x.top - x.bottom
								}
								d.style.height = E + "px"
							} else {
								d.style.height = "auto"
							}
						}
						switch (this.tabPosition) {
						case "bottom":
							var b = this._headerEl.childNodes;
							for (var C = 0, y = b.length; C < y; C++) {
								var j = b[C];
								fui.removeClass(j, "fui-tabs-header2");
								if (y > 1 && C != 0) {
									fui.addClass(j, "fui-tabs-header2")
								}
							}
							break;
						case "left":
							var B = this._headerEl.firstChild.rows[0].cells;
							for (var C = 0, y = B.length; C < y; C++) {
								var g = B[C];
								fui.removeClass(g, "fui-tabs-header2");
								if (y > 1 && C == 0) {
									fui.addClass(g, "fui-tabs-header2")
								}
							}
							break;
						case "right":
							var B = this._headerEl.firstChild.rows[0].cells;
							for (var C = 0, y = B.length; C < y; C++) {
								var g = B[C];
								fui.removeClass(g, "fui-tabs-header2");
								if (y > 1 && C != 0) {
									fui.addClass(g, "fui-tabs-header2")
								}
							}
							break;
						default:
							var b = this._headerEl.childNodes;
							for (var C = 0, y = b.length; C < y; C++) {
								var j = b[C];
								fui.removeClass(j, "fui-tabs-header2");
								if (y > 1 && C == 0) {
									fui.addClass(j, "fui-tabs-header2")
								}
							}
							break
						}
						fui.removeClass(this.el, "fui-tabs-scroll");
						var g = fui.byClass("fui-tabs-lastSpace", this.el);
						var D = fui.byClass("fui-tabs-buttons", this.el);
						var c = this._headerEl.parentNode;
						c.style.paddingRight = "0px";
						if (this._navEl) {
							this._navEl.style.display = "none"
						}
						if (D) {
							D.style.display = "none"
						}
						fui.setWidth(c, u);
						if (this.tabPosition == "top"
								&& this.tabAlign == "left") {
							this._headerEl.style.width = "auto";
							D.style.display = "block";
							var v = u;
							var k = this._headerEl.firstChild.offsetWidth
									- g.offsetWidth;
							var F = D.firstChild ? D.offsetWidth : 0;
							if (k + F > v) {
								this._navEl.style.display = "block";
								this._navEl.style.right = F + "px";
								var t = this._navEl.offsetWidth;
								var n = v - F - t;
								fui.setWidth(this._headerEl, n)
							}
						}
						this._scrollToTab(this.activeIndex);
						this._doScrollButton();
						fui.layout(this._bodyEl);
						this.fire("layout")
					},
					setTabAlign : function(a) {
						this.tabAlign = a;
						this.doUpdate()
					},
					setTabPosition : function(a) {
						this.tabPosition = a;
						this.doUpdate()
					},
					getTab : function(b) {
						if (typeof b == "object") {
							return b
						}
						if (typeof b == "number") {
							return this.tabs[b]
						} else {
							for (var c = 0, a = this.tabs.length; c < a; c++) {
								var d = this.tabs[c];
								if (d.name == b) {
									return d
								}
							}
						}
					},
					getHeaderEl : function() {
						return this._headerEl
					},
					getBodyEl : function() {
						return this._bodyEl
					},
					getTabEl : function(b) {
						var f = this.getTab(b);
						if (!f) {
							return null
						}
						var g = this._createTabId(f);
						var e = this.el.getElementsByTagName("*");
						for (var c = 0, a = e.length; c < a; c++) {
							var d = e[c];
							if (d.id == g) {
								return d
							}
						}
						return null
					},
					getTabBodyEl : function(b) {
						var f = this.getTab(b);
						if (!f) {
							return null
						}
						var g = this._createTabBodyId(f);
						var e = this._bodyEl.childNodes;
						for (var c = 0, a = e.length; c < a; c++) {
							var d = e[c];
							if (d.id == g) {
								return d
							}
						}
						return null
					},
					getTabIFrameEl : function(a) {
						var b = this.getTab(a);
						if (!b) {
							return null
						}
						return b._iframeEl
					},
					_createTabId : function(a) {
						return this.uid + "$" + a._id
					},
					_createTabBodyId : function(a) {
						return this.uid + "$body$" + a._id
					},
					_doScrollButton : function() {
						if (this.tabPosition == "top") {
							fui.removeClass(this._leftButtonEl, "fui-disabled");
							fui
									.removeClass(this._rightButtonEl,
											"fui-disabled");
							if (this._headerEl.scrollLeft == 0) {
								fui
										.addClass(this._leftButtonEl,
												"fui-disabled")
							}
							var c = this.getTabEl(this.tabs.length - 1);
							if (c) {
								var a = fui.getBox(c);
								var b = fui.getBox(this._headerEl);
								if (a.right <= b.right) {
									fui.addClass(this._rightButtonEl,
											"fui-disabled")
								}
							}
						}
					},
					setActiveIndex : function(o, p) {
						var d = this.getTab(o);
						var r = this.getTab(this.activeIndex);
						var a = d != r;
						var b = this.getTabBodyEl(this.activeIndex);
						if (b) {
							b.style.display = "none"
						}
						if (d) {
							this.activeIndex = this.tabs.indexOf(d)
						} else {
							this.activeIndex = -1
						}
						var b = this.getTabBodyEl(this.activeIndex);
						if (b) {
							b.style.display = ""
						}
						var b = this.getTabEl(r);
						if (b) {
							fui.removeClass(b, this._tabActiveCls)
						}
						var b = this.getTabEl(d);
						if (b) {
							fui.addClass(b, this._tabActiveCls)
						}
						if (b && a) {
							if (this.tabPosition == "bottom") {
								var j = fui.findParent(b, "fui-tabs-header");
								if (j) {
									jQuery(this._headerEl).prepend(j)
								}
							} else {
								if (this.tabPosition == "left") {
									var h = fui
											.findParent(b, "fui-tabs-header").parentNode;
									if (h) {
										h.parentNode.appendChild(h)
									}
								} else {
									if (this.tabPosition == "right") {
										var h = fui.findParent(b,
												"fui-tabs-header").parentNode;
										if (h) {
											jQuery(h.parentNode).prepend(h)
										}
									} else {
										var j = fui.findParent(b,
												"fui-tabs-header");
										if (j) {
											this._headerEl.appendChild(j)
										}
									}
								}
							}
							var g = this._headerEl.scrollLeft;
							this.doLayout();
							var q = this.getTabRows();
							if (q.length > 1) {
							} else {
								this._scrollToTab(this.activeIndex);
								this._doScrollButton()
							}
							for (var k = 0, f = this.tabs.length; k < f; k++) {
								var c = this.getTabEl(this.tabs[k]);
								if (c) {
									fui.removeClass(c, this._tabHoverCls)
								}
							}
						}
						var n = this;
						if (a) {
							var m = {
								tab : d,
								index : this.tabs.indexOf(d),
								name : d ? d.name : ""
							};
							setTimeout(function() {
								n.fire("ActiveChanged", m)
							}, 1)
						}
						this._cancelLoadTabs(d);
						if (p !== false) {
							if (d && d.url && !d.loadedUrl) {
								var n = this;
								n.loadTab(d.url, d)
							}
						}
						if (n.canLayout()) {
							try {
								fui.layoutIFrames(n.el)
							} catch (m) {
							}
						}
					},
					_scrollToTab : function(b) {
						var f = this._headerEl.scrollLeft;
						if (this.tabPosition == "top") {
							this._headerEl.scrollLeft = f;
							var e = this.getTabEl(b);
							if (e) {
								var d = this;
								var a = fui.getBox(e);
								var c = fui.getBox(d._headerEl);
								if (a.x < c.x) {
									d._headerEl.scrollLeft -= (c.x - a.x)
								} else {
									if (a.right > c.right) {
										d._headerEl.scrollLeft += (a.right - c.right)
									}
								}
							}
						}
					},
					getActiveIndex : function() {
						return this.activeIndex
					},
					activeTab : function(a) {
						this.setActiveIndex(a)
					},
					getActiveTab : function() {
						return this.getTab(this.activeIndex)
					},
					getActiveIndex : function() {
						return this.activeIndex
					},
					_tryActiveTab : function(b) {
						b = this.getTab(b);
						if (!b) {
							return
						}
						var a = this.tabs.indexOf(b);
						if (this.activeIndex == a) {
							return
						}
						var c = {
							tab : b,
							index : a,
							name : b.name,
							cancel : false
						};
						this.fire("BeforeActiveChanged", c);
						if (c.cancel == false) {
							this.activeTab(b)
						}
					},
					setShowBody : function(a) {
						if (this.showBody != a) {
							this.showBody = a;
							this.doLayout()
						}
					},
					getShowBody : function() {
						return this.showBody
					},
					setBodyStyle : function(a) {
						this.bodyStyle = a;
						fui.setStyle(this._bodyEl, a);
						this.doLayout()
					},
					getBodyStyle : function() {
						return this.bodyStyle
					},
					setMaskOnLoad : function(a) {
						this.maskOnLoad = a
					},
					getMaskOnLoad : function() {
						return this.maskOnLoad
					},
					setPlain : function(a) {
						this.plain = a;
						this.doLayout()
					},
					getPlain : function() {
						return this.plain
					},
					getTabByEvent : function(a) {
						return this._getTabByEvent(a)
					},
					_getTabByEvent : function(d) {
						var c = fui.findParent(d.target, "fui-tab");
						if (!c) {
							return null
						}
						var b = c.id.split("$");
						if (b[0] != this.uid) {
							return null
						}
						var a = parseInt(jQuery(c).attr("index"));
						return this.getTab(a)
					},
					__OnClick : function(c) {
						var a = this._getTabByEvent(c);
						if (!a) {
							return
						}
						if (a.enabled) {
							var b = this;
							setTimeout(function() {
								if (fui.findParent(c.target, "fui-tab-close")) {
									b._OnCloseButtonClick(a, c)
								} else {
									var d = a.loadedUrl;
									b._tryActiveTab(a);
									if (a.refreshOnClick && a.url == d) {
										b.reloadTab(a)
									}
								}
							}, 10)
						}
					},
					hoverTab : null,
					__OnMouseOver : function(b) {
						var a = this._getTabByEvent(b);
						if (a && a.enabled) {
							var c = this.getTabEl(a);
							fui.addClass(c, this._tabHoverCls);
							this.hoverTab = a
						}
					},
					__OnMouseOut : function(a) {
						if (this.hoverTab) {
							var b = this.getTabEl(this.hoverTab);
							fui.removeClass(b, this._tabHoverCls)
						}
						this.hoverTab = null
					},
					__OnMouseDown : function(d) {
						clearInterval(this._scrollTimer);
						if (this.tabPosition == "top") {
							var c = this;
							var b = 0, a = 10;
							if (d.target == this._leftButtonEl) {
								this._scrollTimer = setInterval(function() {
									c._headerEl.scrollLeft -= a;
									b++;
									if (b > 5) {
										a = 18
									}
									if (b > 10) {
										a = 25
									}
									c._doScrollButton()
								}, 25)
							} else {
								if (d.target == this._rightButtonEl) {
									this._scrollTimer = setInterval(function() {
										c._headerEl.scrollLeft += a;
										b++;
										if (b > 5) {
											a = 18
										}
										if (b > 10) {
											a = 25
										}
										c._doScrollButton()
									}, 25)
								}
							}
							fui.on(document, "mouseup", this.__OnDocMouseUp,
									this)
						}
					},
					__OnDocMouseUp : function(a) {
						clearInterval(this._scrollTimer);
						this._scrollTimer = null;
						fui.un(document, "mouseup", this.__OnDocMouseUp, this)
					},
					_doUpdateTop : function() {
						var p = this.tabPosition == "top";
						var v = "";
						if (p) {
							v += '<div class="fui-tabs-scrollCt">';
							v += '<div class="fui-tabs-nav"><a class="fui-tabs-leftButton" href="javascript:void(0)" hideFocus onclick="return false"></a><a class="fui-tabs-rightButton" href="javascript:void(0)" hideFocus onclick="return false"></a></div>';
							v += '<div class="fui-tabs-buttons"></div>'
						}
						v += '<div class="fui-tabs-headers">';
						var u = this.getTabRows();
						for (var h = 0, f = u.length; h < f; h++) {
							var q = u[h];
							var t = "";
							v += '<table class="fui-tabs-header" cellspacing="0" cellpadding="0"><tr><td class="fui-tabs-space fui-tabs-firstSpace"><div></div></td>';
							for (var n = 0, e = q.length; n < e; n++) {
								var c = q[n];
								var b = this._createTabId(c);
								if (!c.visible) {
									continue
								}
								var o = this.tabs.indexOf(c);
								var t = c.headerCls || "";
								if (c.enabled == false) {
									t += " fui-disabled"
								}
								v += '<td id="' + b + '" index="' + o
										+ '"  class="fui-tab ' + t
										+ '" style="' + c.headerStyle + '">';
								if (c.iconCls || c.iconStyle) {
									v += '<span class="fui-tab-icon '
											+ c.iconCls + '" style="'
											+ c.iconStyle + '"></span>'
								}
								v += '<span class="fui-tab-text">' + c.title
										+ "</span>";
								if (c.showCloseButton) {
									var a = "";
									if (c.enabled) {
										a = "onmouseover=\"fui.addClass(this, 'fui-tab-close-hover')\" onmouseout=\"fui.removeClass(this, 'fui-tab-close-hover')\""
									}
									v += '<span class="fui-tab-close" ' + a
											+ "></span>"
								}
								v += "</td>";
								if (n != e - 1) {
									v += '<td class="fui-tabs-space2"><div></div></td>'
								}
							}
							v += '<td class="fui-tabs-space fui-tabs-lastSpace" ><div></div></td></tr></table>'
						}
						if (p) {
							v += "</div>"
						}
						v += "</div>";
						this._doClearElement();
						fui.prepend(this._td2El, v);
						var d = this._td2El;
						this._headerEl = d.firstChild.lastChild;
						if (p) {
							this._navEl = this._headerEl.parentNode.firstChild;
							this._leftButtonEl = this._navEl.firstChild;
							this._rightButtonEl = this._navEl.childNodes[1]
						}
						switch (this.tabAlign) {
						case "center":
							var r = this._headerEl.childNodes;
							for (var n = 0, e = r.length; n < e; n++) {
								var g = r[n];
								var m = g.getElementsByTagName("td");
								m[0].style.width = "50%";
								m[m.length - 1].style.width = "50%"
							}
							break;
						case "right":
							var r = this._headerEl.childNodes;
							for (var n = 0, e = r.length; n < e; n++) {
								var g = r[n];
								var m = g.getElementsByTagName("td");
								m[0].style.width = "100%"
							}
							break;
						case "fit":
							break;
						default:
							var r = this._headerEl.childNodes;
							for (var n = 0, e = r.length; n < e; n++) {
								var g = r[n];
								var m = g.getElementsByTagName("td");
								m[m.length - 1].style.width = "100%"
							}
							break
						}
					},
					_doUpdateBottom : function() {
						this._doUpdateTop();
						var a = this._td2El;
						fui.append(a, a.firstChild);
						this._headerEl = a.lastChild
					},
					_doUpdateLeft : function() {
						var p = '<table cellspacing="0" cellpadding="0"><tr>';
						var o = this.getTabRows();
						for (var f = 0, e = o.length; f < e; f++) {
							var m = o[f];
							var n = "";
							if (e > 1 && f != e - 1) {
								n = "fui-tabs-header2"
							}
							p += '<td class="'
									+ n
									+ '"><table class="fui-tabs-header" cellspacing="0" cellpadding="0">';
							p += '<tr ><td class="fui-tabs-space fui-tabs-firstSpace" ><div></div></td></tr>';
							for (var g = 0, d = m.length; g < d; g++) {
								var c = m[g];
								var b = this._createTabId(c);
								if (!c.visible) {
									continue
								}
								var h = this.tabs.indexOf(c);
								var n = c.headerCls || "";
								if (c.enabled == false) {
									n += " fui-disabled"
								}
								p += '<tr><td id="' + b + '" index="' + h
										+ '"  class="fui-tab ' + n
										+ '" style="' + c.headerStyle + '">';
								if (c.iconCls || c.iconStyle) {
									p += '<span class="fui-tab-icon '
											+ c.iconCls + '" style="'
											+ c.iconStyle + '"></span>'
								}
								p += '<span class="fui-tab-text">' + c.title
										+ "</span>";
								if (c.showCloseButton) {
									var a = "";
									if (c.enabled) {
										a = "onmouseover=\"fui.addClass(this, 'fui-tab-close-hover')\" onmouseout=\"fui.removeClass(this, 'fui-tab-close-hover')\""
									}
									p += '<span class="fui-tab-close" ' + a
											+ "></span>"
								}
								p += "</td></tr>";
								if (g != d - 1) {
									p += '<tr><td class="fui-tabs-space2"><div></div></td></tr>'
								}
							}
							p += '<tr ><td class="fui-tabs-space fui-tabs-lastSpace" ><div></div></td></tr>';
							p += "</table></td>"
						}
						p += "</tr ></table>";
						this._doClearElement();
						fui.addClass(this._td1El, "fui-tabs-header");
						fui.append(this._td1El, p);
						this._headerEl = this._td1El
					},
					_doUpdateRight : function() {
						this._doUpdateLeft();
						fui.removeClass(this._td1El, "fui-tabs-header");
						fui.removeClass(this._td3El, "fui-tabs-header");
						fui.append(this._td3El, this._td1El.firstChild);
						this._headerEl = this._td3El
					},
					_OnCloseButtonClick : function(d, a) {
						var f = {
							tab : d,
							index : this.tabs.indexOf(d),
							name : d.name.toLowerCase(),
							htmlEvent : a,
							cancel : false
						};
						this.fire("beforecloseclick", f);
						if (f.cancel == true) {
							return
						}
						try {
							if (d._iframeEl && d._iframeEl.contentWindow) {
								var b = true;
								if (d._iframeEl.contentWindow.CloseWindow) {
									b = d._iframeEl.contentWindow
											.CloseWindow("close")
								} else {
									if (d._iframeEl.contentWindow.CloseOwnerWindow) {
										b = d._iframeEl.contentWindow
												.CloseOwnerWindow("close")
									}
								}
								if (b === false) {
									f.cancel = true
								}
							}
						} catch (c) {
						}
						if (f.cancel == true) {
							return
						}
						d.removeAction = "close";
						this.removeTab(d);
						this.fire("closeclick", f)
					},
					onBeforeCloseClick : function(b, a) {
						this.on("beforecloseclick", b, a)
					},
					onCloseClick : function(b, a) {
						this.on("closeclick", b, a)
					},
					onActiveChanged : function(b, a) {
						this.on("activechanged", b, a)
					},
					getAttrs : function(el) {
						var attrs = fui.Tabs.superclass.getAttrs.call(this, el);
						fui._ParseString(el, attrs, [ "tabAlign",
								"tabPosition", "bodyStyle", "onactivechanged",
								"onbeforeactivechanged", "url", "ontabload",
								"ontabdestroy", "onbeforecloseclick",
								"oncloseclick", "titleField", "urlField",
								"nameField", "loadingMsg", "buttons" ]);
						fui._ParseBool(el, attrs, [ "allowAnim", "showBody",
								"maskOnLoad", "plain" ]);
						fui._ParseInt(el, attrs, [ "activeIndex" ]);
						var tabs = [];
						var nodes = fui.getChildNodes(el);
						for (var i = 0, l = nodes.length; i < l; i++) {
							var node = nodes[i];
							var o = {};
							tabs.push(o);
							o.style = node.style.cssText;
							fui._ParseString(node, o, [ "name", "title", "url",
									"cls", "iconCls", "iconStyle", "headerCls",
									"headerStyle", "bodyCls", "bodyStyle",
									"onload", "ondestroy", "data-options" ]);
							fui._ParseBool(node, o, [ "newLine", "visible",
									"enabled", "showCloseButton",
									"refreshOnClick" ]);
							o.bodyParent = node;
							var options = o["data-options"];
							if (options) {
								options = eval("(" + options + ")");
								if (options) {
									fui.copyTo(o, options)
								}
							}
						}
						attrs.tabs = tabs;
						return attrs
					}
				});
fui.regClass(fui.Tabs, "tabs");
fui.Menu = function() {
	this.items = [];
	fui.Menu.superclass.constructor.call(this)
};
fui.extend(fui.Menu, fui.Control);
fui.copyTo(fui.Menu.prototype, fui.Popup_prototype);
var fui_Popup_prototype_hide = fui.Popup_prototype.hide;
fui
		.copyTo(
				fui.Menu.prototype,
				{
					height : "auto",
					width : "auto",
					minWidth : 140,
					vertical : true,
					allowSelectItem : false,
					_selectedItem : null,
					_itemSelectedCls : "fui-menuitem-selected",
					textField : "text",
					resultAsTree : false,
					idField : "id",
					parentField : "pid",
					itemsField : "children",
					showNavArrow : true,
					_clearBorder : false,
					showAction : "none",
					hideAction : "outerclick",
					getbyName : function(b) {
						for (var c = 0, a = this.items.length; c < a; c++) {
							var d = this.items[c];
							if (d.name == b) {
								return d
							}
							if (d.menu) {
								var e = d.menu.getbyName(b);
								if (e) {
									return e
								}
							}
						}
						return null
					},
					set : function(b) {
						if (typeof b == "string") {
							return this
						}
						var a = b.url;
						delete b.url;
						fui.Menu.superclass.set.call(this, b);
						if (a) {
							this.setUrl(a)
						}
						return this
					},
					uiCls : "fui-menu",
					_create : function() {
						this.el = document.createElement("div");
						this.el.className = "fui-menu";
						this.el.innerHTML = '<div class="fui-menu-border"><a class="fui-menu-topArrow" href="#" onclick="return false"></a><div class="fui-menu-inner"></div><a class="fui-menu-bottomArrow" href="#" onclick="return false"></a></div>';
						this._borderEl = this.el.firstChild;
						this._topArrowEl = this._borderEl.childNodes[0];
						this._bottomArrowEl = this._borderEl.childNodes[2];
						this._innerEl = this._borderEl.childNodes[1];
						this._innerEl.innerHTML = '<div class="fui-menu-float"></div><div class="fui-menu-toolbar"></div><div style="clear:both;"></div>';
						this._contentEl = this._innerEl.firstChild;
						this._toolbarEl = this._innerEl.childNodes[1];
						if (this.isVertical() == false) {
							fui.addClass(this.el, "fui-menu-horizontal")
						}
					},
					destroy : function(a) {
						if (this._topArrowEl) {
							this._topArrowEl.onmousedown = this._bottomArrowEl.onmousedown = null
						}
						this._popupEl = this.popupEl = this._borderEl = this._innerEl = this._contentEl = null;
						this._topArrowEl = this._bottomArrowEl = null;
						this.owner = null;
						this.window = null;
						fui.un(document, "mousedown", this.__OnBodyMouseDown,
								this);
						fui.un(window, "resize", this.__OnWindowResize, this);
						fui.Menu.superclass.destroy.call(this, a)
					},
					_disableContextMenu : false,
					_initEvents : function() {
						fui._BindEvents(function() {
							fui.on(document, "mousedown",
									this.__OnBodyMouseDown, this);
							fui_onOne(this.el, "mouseover",
									this.__OnMouseOver, this);
							fui.on(window, "resize", this.__OnWindowResize,
									this);
							if (this._disableContextMenu) {
								fui_onOne(this.el, "contextmenu", function(a) {
									a.preventDefault()
								}, this)
							}
							fui_onOne(this._topArrowEl, "mousedown",
									this.__OnTopMouseDown, this);
							fui_onOne(this._bottomArrowEl, "mousedown",
									this.__OnBottomMouseDown, this)
						}, this)
					},
					within : function(d) {
						if (fui.isAncestor(this.el, d.target)) {
							return true
						}
						for (var b = 0, a = this.items.length; b < a; b++) {
							var c = this.items[b];
							if (c.within(d)) {
								return true
							}
						}
						return false
					},
					setVertical : function(a) {
						this.vertical = a;
						if (!a) {
							fui.addClass(this.el, "fui-menu-horizontal")
						} else {
							fui.removeClass(this.el, "fui-menu-horizontal")
						}
					},
					getVertical : function() {
						return this.vertical
					},
					isVertical : function() {
						return this.vertical
					},
					show : function() {
						this.setVisible(true)
					},
					hide : function() {
						this.hideItems();
						fui_Popup_prototype_hide.call(this)
					},
					hideItems : function() {
						for (var b = 0, a = this.items.length; b < a; b++) {
							var c = this.items[b];
							c.hideMenu()
						}
					},
					showItemMenu : function(c) {
						for (var b = 0, a = this.items.length; b < a; b++) {
							var d = this.items[b];
							if (d == c) {
								d.showMenu()
							} else {
								d.hideMenu()
							}
						}
					},
					hasShowItemMenu : function() {
						for (var b = 0, a = this.items.length; b < a; b++) {
							var c = this.items[b];
							if (c && c.menu && c.menu.isPopup) {
								return true
							}
						}
						return false
					},
					setData : function(a) {
						if (!fui.isArray(a)) {
							a = []
						}
						this.setItems(a)
					},
					getData : function() {
						return this.getItems()
					},
					setItems : function(b) {
						if (!fui.isArray(b)) {
							b = []
						}
						this.removeAll();
						var d = new Date();
						for (var c = 0, a = b.length; c < a; c++) {
							this.addItem(b[c])
						}
					},
					getItems : function() {
						return this.items
					},
					_itemType : "menuitem",
					addItem : function(a) {
						if (a == "-" || a == "|" || a.type == "separator") {
							fui.append(this._contentEl, '<span id="' + a.id
									+ '" class="fui-separator"></span>');
							return
						}
						if (!fui.isControl(a) && !fui.getClass(a.type)) {
							a.type = this._itemType
						}
						a = fui.getAndCreate(a);
						this.items.push(a);
						this._contentEl.appendChild(a.el);
						a.ownerMenu = this;
						this.fire("itemschanged")
					},
					removeItem : function(a) {
						a = fui.get(a);
						if (!a) {
							return
						}
						this.items.remove(a);
						this._contentEl.removeChild(a.el);
						this.fire("itemschanged")
					},
					removeItemAt : function(a) {
						var b = this.items[a];
						this.removeItem(b)
					},
					removeAll : function() {
						var a = this.items.clone();
						for (var b = a.length - 1; b >= 0; b--) {
							this.removeItem(a[b])
						}
						this._contentEl.innerHTML = ""
					},
					getGroupItems : function(c) {
						if (!c) {
							return []
						}
						var b = [];
						for (var d = 0, a = this.items.length; d < a; d++) {
							var e = this.items[d];
							if (e.groupName == c) {
								b.push(e)
							}
						}
						return b
					},
					getItem : function(d) {
						if (typeof d == "number") {
							return this.items[d]
						}
						if (typeof d == "string") {
							for (var b = 0, a = this.items.length; b < a; b++) {
								var c = this.items[b];
								if (c.id == d) {
									return c
								}
							}
							return null
						}
						if (d && this.items.indexOf(d) != -1) {
							return d
						}
						return null
					},
					setAllowSelectItem : function(a) {
						this.allowSelectItem = a
					},
					getAllowSelectItem : function() {
						return this.allowSelectItem
					},
					setSelectedItem : function(a) {
						a = this.getItem(a);
						this._OnItemSelect(a)
					},
					getSelectedItem : function(a) {
						return this._selectedItem
					},
					setShowNavArrow : function(a) {
						this.showNavArrow = a
					},
					getShowNavArrow : function() {
						return this.showNavArrow
					},
					setTextField : function(a) {
						this.textField = a
					},
					getTextField : function() {
						return this.textField
					},
					setResultAsTree : function(a) {
						this.resultAsTree = a
					},
					getResultAsTree : function() {
						return this.resultAsTree
					},
					setIdField : function(a) {
						this.idField = a
					},
					getIdField : function() {
						return this.idField
					},
					setParentField : function(a) {
						this.parentField = a
					},
					getParentField : function() {
						return this.parentField
					},
					doLayout : function() {
						if (!this.canLayout()) {
							return
						}
						if (!this.isAutoHeight()) {
							var a = fui.getHeight(this.el, true);
							fui.setHeight(this._borderEl, a);
							this._topArrowEl.style.display = this._bottomArrowEl.style.display = "none";
							this._contentEl.style.height = "auto";
							if (this.showNavArrow
									&& this._borderEl.scrollHeight > this._borderEl.clientHeight) {
								this._topArrowEl.style.display = this._bottomArrowEl.style.display = "block";
								a = fui.getHeight(this._borderEl, true);
								var e = fui.getHeight(this._topArrowEl);
								var b = fui.getHeight(this._bottomArrowEl);
								var d = a - e - b;
								if (d < 0) {
									d = 0
								}
								fui.setHeight(this._contentEl, d);
								var c = fui.getWidth(this._borderEl, true);
								fui.setWidth(this._topArrowEl, c);
								fui.setWidth(this._bottomArrowEl, c)
							} else {
								this._contentEl.style.height = "auto"
							}
						} else {
							this._borderEl.style.height = "auto";
							this._contentEl.style.height = "auto"
						}
					},
					_measureSize : function() {
						if (this.height == "auto") {
							this.el.style.height = "auto";
							this._borderEl.style.height = "auto";
							this._contentEl.style.height = "auto";
							this._topArrowEl.style.display = this._bottomArrowEl.style.display = "none";
							var a = fui.getViewportBox();
							var c = fui.getBox(this.el);
							this.maxHeight = a.height - 25;
							if (this.ownerItem) {
								var c = fui.getBox(this.ownerItem.el);
								var d = c.top;
								var e = a.height - c.bottom;
								var b = d > e ? d : e;
								b -= 10;
								this.maxHeight = b
							}
						}
						this.el.style.display = "";
						var c = fui.getBox(this.el);
						if (c.width > this.maxWidth) {
							fui.setWidth(this.el, this.maxWidth);
							c = fui.getBox(this.el)
						}
						if (c.height > this.maxHeight) {
							fui.setHeight(this.el, this.maxHeight);
							c = fui.getBox(this.el)
						}
						if (c.width < this.minWidth) {
							fui.setWidth(this.el, this.minWidth);
							c = fui.getBox(this.el)
						}
						if (c.height < this.minHeight) {
							fui.setHeight(this.el, this.minHeight);
							c = fui.getBox(this.el)
						}
					},
					url : "",
					_doLoad : function() {
						var b = fui.getData(this.url);
						if (this.dataField) {
							b = fui._getMap(this.dataField, b)
						}
						if (!b) {
							b = []
						}
						if (this.resultAsTree == false) {
							b = fui.arrayToTree(b, this.itemsField,
									this.idField, this.parentField)
						}
						var e = fui.treeToArray(b, this.itemsField,
								this.idField, this.parentField);
						for (var c = 0, a = e.length; c < a; c++) {
							var f = e[c];
							f.text = fui._getMap(this.textField, f);
							if (fui.isNull(f.text)) {
								f.text = ""
							}
						}
						var d = new Date();
						this.setItems(b);
						this.fire("load")
					},
					loadList : function(e, c, f) {
						if (!e) {
							return
						}
						c = c || this.idField;
						f = f || this.parentField;
						for (var d = 0, b = e.length; d < b; d++) {
							var g = e[d];
							g.text = fui._getMap(this.textField, g);
							if (fui.isNull(g.text)) {
								g.text = ""
							}
						}
						var a = fui.arrayToTree(e, this.itemsField, c, f);
						this.load(a)
					},
					load : function(a) {
						if (typeof a == "string") {
							this.setUrl(a)
						} else {
							this.setItems(a)
						}
					},
					setUrl : function(a) {
						this.url = a;
						this._doLoad()
					},
					getUrl : function() {
						return this.url
					},
					hideOnClick : true,
					setHideOnClick : function(a) {
						this.hideOnClick = a
					},
					getHideOnClick : function() {
						return this.hideOnClick
					},
					_OnItemClick : function(b, a) {
						var c = {
							item : b,
							isLeaf : !b.menu,
							htmlEvent : a
						};
						if (this.hideOnClick) {
							if (this.isPopup) {
								this.hide()
							} else {
								this.hideItems()
							}
						}
						if (this.allowSelectItem && this._selectedItem != b) {
							this.setSelectedItem(b)
						}
						this.fire("itemclick", c);
						if (this.ownerItem) {
						}
					},
					_OnItemSelect : function(a) {
						if (this._selectedItem) {
							this._selectedItem.removeCls(this._itemSelectedCls)
						}
						this._selectedItem = a;
						if (this._selectedItem) {
							this._selectedItem.addCls(this._itemSelectedCls)
						}
						var b = {
							item : this._selectedItem
						};
						this.fire("itemselect", b)
					},
					onItemClick : function(b, a) {
						this.on("itemclick", b, a)
					},
					onItemSelect : function(b, a) {
						this.on("itemselect", b, a)
					},
					__OnTopMouseDown : function(a) {
						this._startScrollMove(-20)
					},
					__OnBottomMouseDown : function(a) {
						this._startScrollMove(20)
					},
					_startScrollMove : function(c) {
						clearInterval(this._scrollTimer);
						var a = function() {
							clearInterval(b._scrollTimer);
							fui.un(document, "mouseup", a)
						};
						fui.on(document, "mouseup", a);
						var b = this;
						this._scrollTimer = setInterval(function() {
							b._contentEl.scrollTop += c
						}, 50)
					},
					setToolbar : function(a) {
						__fui_setControls(a, this._toolbarEl, this)
					},
					parseItems : function(a) {
						var f = [];
						for (var g = 0, e = a.length; g < e; g++) {
							var d = a[g];
							if (d.className == "separator") {
								var c = {
									type : "separator",
									id : d.id,
									name : d.name
								};
								f.add(c);
								continue
							}
							var h = fui.getChildNodes(d);
							var j = h[0];
							var k = h[1];
							var c = new fui.MenuItem();
							if (!k) {
								fui.applyTo.call(c, d);
								f.add(c);
								continue
							}
							fui.applyTo.call(c, j);
							c.render(document.body);
							var b = new fui.Menu();
							fui.applyTo.call(b, k);
							c.setMenu(b);
							b.render(document.body);
							f.add(c)
						}
						return f.clone()
					},
					getAttrs : function(b) {
						var k = fui.Menu.superclass.getAttrs.call(this, b);
						var c = jQuery(b);
						fui._ParseString(b, k, [ "popupEl", "popupCls",
								"showAction", "hideAction", "xAlign", "yAlign",
								"modalStyle", "onbeforeopen", "open",
								"onbeforeclose", "onclose", "url",
								"onitemclick", "onitemselect", "textField",
								"idField", "parentField", "toolbar" ]);
						fui._ParseBool(b, k, [ "resultAsTree", "hideOnClick",
								"showNavArrow" ]);
						var a = fui.getChildNodes(b);
						for (var g = a.length - 1; g >= 0; g--) {
							var d = a[g];
							var j = jQuery(d).attr("property");
							if (!j) {
								continue
							}
							j = j.toLowerCase();
							if (j == "toolbar") {
								k.toolbar = d;
								d.parentNode.removeChild(d)
							}
						}
						var a = fui.getChildNodes(b);
						var h = this.parseItems(a);
						if (h.length > 0) {
							k.items = h
						}
						var f = c.attr("vertical");
						if (f) {
							k.vertical = f == "true" ? true : false
						}
						var e = c.attr("allowSelectItem");
						if (e) {
							k.allowSelectItem = e == "true" ? true : false
						}
						return k
					}
				});
fui.regClass(fui.Menu, "menu");
fui.MenuBar = function() {
	fui.MenuBar.superclass.constructor.call(this)
};
fui.extend(fui.MenuBar, fui.Menu, {
	uiCls : "fui-menubar",
	vertical : false,
	setVertical : function(a) {
		this.vertical = false
	}
});
fui.regClass(fui.MenuBar, "menubar");
fui.ContextMenu = function() {
	fui.ContextMenu.superclass.constructor.call(this)
};
fui.extend(fui.ContextMenu, fui.Menu, {
	uiCls : "fui-contextmenu",
	vertical : true,
	visible : false,
	_disableContextMenu : true,
	setVertical : function(a) {
		this.vertical = true
	}
});
fui.regClass(fui.ContextMenu, "contextmenu");
fui.MenuItem = function() {
	fui.MenuItem.superclass.constructor.call(this)
};
fui
		.extend(
				fui.MenuItem,
				fui.Control,
				{
					text : "",
					iconCls : "",
					iconStyle : "",
					iconPosition : "left",
					showIcon : true,
					showAllow : true,
					checked : false,
					checkOnClick : false,
					groupName : "",
					_hoverCls : "fui-menuitem-hover",
					_pressedCls : "fui-menuitem-pressed",
					_checkedCls : "fui-menuitem-checked",
					_clearBorder : false,
					menu : null,
					uiCls : "fui-menuitem",
					_create : function() {
						var a = this.el = document.createElement("div");
						this.el.className = "fui-menuitem";
						this.el.innerHTML = '<div class="fui-menuitem-inner"><div class="fui-menuitem-icon"></div><div class="fui-menuitem-text"></div><div class="fui-menuitem-allow"></div></div>';
						this._innerEl = this.el.firstChild;
						this._iconEl = this._innerEl.firstChild;
						this._textEl = this._innerEl.childNodes[1];
						this.allowEl = this._innerEl.lastChild
					},
					_initEvents : function() {
						fui._BindEvents(function() {
							fui_onOne(this.el, "mouseover",
									this.__OnMouseOver, this)
						}, this)
					},
					_inputEventsInited : false,
					_initInputEvents : function() {
						if (this._inputEventsInited) {
							return
						}
						this._inputEventsInited = true;
						fui_onOne(this.el, "click", this.__OnClick, this);
						fui_onOne(this.el, "mouseup", this.__OnMouseUp, this);
						fui_onOne(this.el, "mouseout", this.__OnMouseOut, this)
					},
					destroy : function(a) {
						if (this.el) {
							this.el.onmouseover = null
						}
						this.menu = this._innerEl = this._iconEl = this._textEl = this.allowEl = null;
						fui.MenuItem.superclass.destroy.call(this, a)
					},
					within : function(a) {
						if (fui.isAncestor(this.el, a.target)) {
							return true
						}
						if (this.menu && this.menu.within(a)) {
							return true
						}
						return false
					},
					_doUpdateIcon : function() {
						var a = this.iconStyle || this.iconCls
								|| this.checkOnClick;
						if (this._iconEl) {
							fui.setStyle(this._iconEl, this.iconStyle);
							fui.addClass(this._iconEl, this.iconCls);
							this._iconEl.style.display = a ? "block" : "none"
						}
						if (this.iconPosition == "top") {
							fui.addClass(this.el, "fui-menuitem-icontop")
						} else {
							fui.removeClass(this.el, "fui-menuitem-icontop")
						}
					},
					_hasChildMenu : function() {
						return this.menu && this.menu.items.length > 0
					},
					doUpdate : function() {
						if (this._textEl) {
							this._textEl.innerHTML = this.text
						}
						this._doUpdateIcon();
						if (this.checked) {
							fui.addClass(this.el, this._checkedCls)
						} else {
							fui.removeClass(this.el, this._checkedCls)
						}
						if (this.allowEl) {
							if (this._hasChildMenu()) {
								this.allowEl.style.display = "block"
							} else {
								this.allowEl.style.display = "none"
							}
						}
					},
					setText : function(a) {
						this.text = a;
						if (this._textEl) {
							this._textEl.innerHTML = this.text
						}
					},
					getText : function() {
						return this.text
					},
					setIconCls : function(a) {
						fui.removeClass(this._iconEl, this.iconCls);
						this.iconCls = a;
						this._doUpdateIcon()
					},
					getIconCls : function() {
						return this.iconCls
					},
					setIconStyle : function(a) {
						this.iconStyle = a;
						this._doUpdateIcon()
					},
					getIconStyle : function() {
						return this.iconStyle
					},
					setIconPosition : function(a) {
						this.iconPosition = a;
						this._doUpdateIcon()
					},
					getIconPosition : function() {
						return this.iconPosition
					},
					setCheckOnClick : function(a) {
						this.checkOnClick = a;
						if (a) {
							fui.addClass(this.el, "fui-menuitem-showcheck")
						} else {
							fui.removeClass(this.el, "fui-menuitem-showcheck")
						}
						this.doUpdate()
					},
					getCheckOnClick : function() {
						return this.checkOnClick
					},
					setChecked : function(a) {
						if (this.checked != a) {
							this.checked = a;
							this.doUpdate();
							this.fire("checkedchanged")
						}
					},
					getChecked : function() {
						return this.checked
					},
					setGroupName : function(a) {
						if (this.groupName != a) {
							this.groupName = a
						}
					},
					getGroupName : function() {
						return this.groupName
					},
					setChildren : function(a) {
						this.setMenu(a)
					},
					setMenu : function(a) {
						if (fui.isArray(a)) {
							a = {
								type : "menu",
								items : a
							}
						}
						if (this.menu !== a) {
							this.menu = fui.getAndCreate(a);
							this.menu.hide();
							this.menu.ownerItem = this;
							this.doUpdate();
							this.menu.on("itemschanged", this.__OnItemsChanged,
									this)
						}
					},
					getMenu : function() {
						return this.menu
					},
					showMenu : function() {
						if (this.menu && this.menu.isDisplay() == false) {
							this.menu.setHideAction("outerclick");
							var a = {
								xAlign : "outright",
								yAlign : "top",
								outXAlign : "outleft",
								popupCls : "fui-menu-popup"
							};
							if (this.ownerMenu
									&& this.ownerMenu.vertical == false) {
								a.xAlign = "left";
								a.yAlign = "below";
								a.outXAlign = null
							}
							this.menu.showAtEl(this.el, a)
						}
					},
					hideMenu : function() {
						if (this.menu) {
							this.menu.hide()
						}
					},
					hide : function() {
						this.hideMenu();
						this.setVisible(false)
					},
					__OnItemsChanged : function(a) {
						this.doUpdate()
					},
					getTopMenu : function() {
						if (this.ownerMenu) {
							if (this.ownerMenu.ownerItem) {
								return this.ownerMenu.ownerItem.getTopMenu()
							} else {
								return this.ownerMenu
							}
						}
						return null
					},
					__OnClick : function(g) {
						if (this.isReadOnly()) {
							return
						}
						if (this.checkOnClick) {
							if (this.ownerMenu && this.groupName) {
								var a = this.ownerMenu
										.getGroupItems(this.groupName);
								if (a.length > 0) {
									if (this.checked == false) {
										for (var c = 0, b = a.length; c < b; c++) {
											var f = a[c];
											if (f != this) {
												f.setChecked(false)
											}
										}
										this.setChecked(true)
									}
								} else {
									this.setChecked(!this.checked)
								}
							} else {
								this.setChecked(!this.checked)
							}
						}
						this.fire("click");
						var d = this.getTopMenu();
						if (d) {
							d._OnItemClick(this, g)
						}
					},
					__OnMouseUp : function(b) {
						if (this.isReadOnly()) {
							return
						}
						if (this.ownerMenu) {
							var a = this;
							setTimeout(function() {
								if (a.isDisplay()) {
									a.ownerMenu.showItemMenu(a)
								}
							}, 1)
						}
					},
					__OnMouseOver : function(a) {
						if (this.isReadOnly()) {
							return
						}
						this._initInputEvents();
						fui.addClass(this.el, this._hoverCls);
						this.el.title = this.text;
						if (this._textEl.scrollWidth > this._textEl.clientWidth) {
							this.el.title = this.text
						} else {
							this.el.title = ""
						}
						if (this.ownerMenu) {
							if (this.ownerMenu.isVertical() == true) {
								this.ownerMenu.showItemMenu(this)
							} else {
								if (this.ownerMenu.hasShowItemMenu()) {
									this.ownerMenu.showItemMenu(this)
								}
							}
						}
					},
					__OnMouseOut : function(a) {
						fui.removeClass(this.el, this._hoverCls)
					},
					onClick : function(b, a) {
						this.on("click", b, a)
					},
					onCheckedChanged : function(b, a) {
						this.on("checkedchanged", b, a)
					},
					getAttrs : function(b) {
						var a = fui.MenuItem.superclass.getAttrs.call(this, b);
						var c = jQuery(b);
						a.text = b.innerHTML;
						fui._ParseString(b, a, [ "text", "iconCls",
								"iconStyle", "iconPosition", "groupName",
								"onclick", "oncheckedchanged" ]);
						fui._ParseBool(b, a, [ "checkOnClick", "checked" ]);
						return a
					}
				});
fui.regClass(fui.MenuItem, "menuitem");
fui.Separator = function() {
	fui.Separator.superclass.constructor.call(this)
};
fui.extend(fui.Separator, fui.Control, {
	_clearBorder : false,
	uiCls : "fui-separator",
	_create : function() {
		this.el = document.createElement("span");
		this.el.className = "fui-separator"
	}
});
fui.regClass(fui.Separator, "separator");
fui.OutlookBar = function() {
	this._initGroups();
	fui.OutlookBar.superclass.constructor.call(this)
};
fui
		.extend(
				fui.OutlookBar,
				fui.Control,
				{
					width : 180,
					expandOnLoad : true,
					activeIndex : -1,
					autoCollapse : false,
					groupCls : "",
					groupStyle : "",
					groupHeaderCls : "",
					groupHeaderStyle : "",
					groupBodyCls : "",
					groupBodyStyle : "",
					groupHoverCls : "",
					groupActiveCls : "",
					allowAnim : true,
					set : function(c) {
						if (typeof c == "string") {
							return this
						}
						var b = this._allowLayout;
						this._allowLayout = false;
						var a = c.activeIndex;
						delete c.activeIndex;
						fui.OutlookBar.superclass.set.call(this, c);
						if (fui.isNumber(a)) {
							this.setActiveIndex(a)
						}
						this._allowLayout = b;
						this.doLayout();
						return this
					},
					uiCls : "fui-outlookbar",
					_create : function() {
						this.el = document.createElement("div");
						this.el.className = "fui-outlookbar";
						this.el.innerHTML = '<div class="fui-outlookbar-border"></div>';
						this._borderEl = this.el.firstChild
					},
					_initEvents : function() {
						fui._BindEvents(function() {
							fui.on(this.el, "click", this.__OnClick, this)
						}, this)
					},
					_createGroupId : function(a) {
						return this.uid + "$" + a._id
					},
					_GroupId : 1,
					_initGroups : function() {
						this.groups = []
					},
					_createGroupEl : function(h) {
						var b = this._createGroupId(h);
						var k = '<div id="'
								+ b
								+ '" class="fui-outlookbar-group '
								+ h.cls
								+ '" style="'
								+ h.style
								+ '"><div class="fui-outlookbar-groupHeader '
								+ h.headerCls
								+ '" style="'
								+ h.headerStyle
								+ ';"></div><div class="fui-outlookbar-groupBody '
								+ h.bodyCls + '" style="' + h.bodyStyle
								+ ';"></div></div>';
						var c = fui.append(this._borderEl, k);
						var j = c.lastChild;
						var g = h.body;
						delete h.body;
						if (g) {
							if (!fui.isArray(g)) {
								g = [ g ]
							}
							for (var f = 0, e = g.length; f < e; f++) {
								var d = g[f];
								fui.append(j, d)
							}
							g.length = 0
						}
						if (h.bodyParent) {
							var a = h.bodyParent;
							while (a.firstChild) {
								j.appendChild(a.firstChild)
							}
						}
						delete h.bodyParent;
						return c
					},
					createGroup : function(a) {
						var b = fui.copyTo({
							_id : this._GroupId++,
							name : "",
							title : "",
							cls : "",
							style : "",
							iconCls : "",
							iconStyle : "",
							headerCls : "",
							headerStyle : "",
							bodyCls : "",
							bodyStyle : "",
							visible : true,
							enabled : true,
							showCollapseButton : true,
							expanded : this.expandOnLoad
						}, a);
						return b
					},
					setGroups : function(a) {
						if (!fui.isArray(a)) {
							return
						}
						this.removeAll();
						for (var c = 0, b = a.length; c < b; c++) {
							this.addGroup(a[c])
						}
					},
					getGroups : function() {
						return this.groups
					},
					addGroup : function(e, a) {
						if (typeof e == "string") {
							e = {
								title : e
							}
						}
						e = this.createGroup(e);
						if (typeof a != "number") {
							a = this.groups.length
						}
						this.groups.insert(a, e);
						var c = this._createGroupEl(e);
						e._el = c;
						var a = this.groups.indexOf(e);
						var d = this.groups[a + 1];
						if (d) {
							var b = this.getGroupEl(d);
							jQuery(b).before(c)
						}
						this.doUpdate();
						return e
					},
					updateGroup : function(b, a) {
						var b = this.getGroup(b);
						if (!b) {
							return
						}
						fui.copyTo(b, a);
						this.doUpdate()
					},
					removeGroup : function(a) {
						a = this.getGroup(a);
						if (!a) {
							return
						}
						var b = this.getGroupEl(a);
						if (b) {
							b.parentNode.removeChild(b)
						}
						this.groups.remove(a);
						this.doUpdate()
					},
					removeAll : function() {
						for (var a = this.groups.length - 1; a >= 0; a--) {
							this.removeGroup(a)
						}
					},
					moveGroup : function(c, a) {
						c = this.getGroup(c);
						if (!c) {
							return
						}
						target = this.getGroup(a);
						var d = this.getGroupEl(c);
						this.groups.remove(c);
						if (target) {
							a = this.groups.indexOf(target);
							this.groups.insert(a, c);
							var b = this.getGroupEl(target);
							jQuery(b).before(d)
						} else {
							this.groups.add(c);
							this._borderEl.appendChild(d)
						}
						this.doUpdate()
					},
					doUpdate : function() {
						for (var c = 0, a = this.groups.length; c < a; c++) {
							var f = this.groups[c];
							var h = f._el;
							var g = h.firstChild;
							var e = h.lastChild;
							var b = '<div class="fui-outlookbar-icon '
									+ f.iconCls + '" style="' + f.iconStyle
									+ ';"></div>';
							var d = '<div class="fui-tools"><span class="fui-tools-collapse"></span></div>'
									+ ((f.iconStyle || f.iconCls) ? b : "")
									+ '<div class="fui-outlookbar-groupTitle">'
									+ f.title
									+ '</div><div style="clear:both;"></div>';
							g.innerHTML = d;
							if (f.enabled) {
								fui.removeClass(h, "fui-disabled")
							} else {
								fui.addClass(h, "fui-disabled")
							}
							fui.addClass(h, f.cls);
							fui.setStyle(h, f.style);
							fui.addClass(e, f.bodyCls);
							fui.setStyle(e, f.bodyStyle);
							fui.addClass(g, f.headerCls);
							fui.setStyle(g, f.headerStyle);
							fui.removeClass(h, "fui-outlookbar-firstGroup");
							fui.removeClass(h, "fui-outlookbar-lastGroup");
							if (c == 0) {
								fui.addClass(h, "fui-outlookbar-firstGroup")
							}
							if (c == a - 1) {
								fui.addClass(h, "fui-outlookbar-lastGroup")
							}
						}
						this.doLayout()
					},
					doLayout : function() {
						if (!this.canLayout()) {
							return
						}
						if (this._inAniming) {
							return
						}
						this._doLayoutInner();
						for (var d = 0, a = this.groups.length; d < a; d++) {
							var k = this.groups[d];
							var c = k._el;
							var g = c.lastChild;
							if (k.expanded) {
								fui.addClass(c, "fui-outlookbar-expand");
								fui.removeClass(c, "fui-outlookbar-collapse")
							} else {
								fui.removeClass(c, "fui-outlookbar-expand");
								fui.addClass(c, "fui-outlookbar-collapse")
							}
							g.style.height = "auto";
							g.style.display = k.expanded ? "block" : "none";
							c.style.display = k.visible ? "" : "none";
							var h = fui.getWidth(c, true);
							var f = fui.getPaddings(g);
							var b = fui.getBorders(g);
							if (jQuery.boxModel) {
								h = h - f.left - f.right - b.left - b.right
							}
							g.style.width = h + "px"
						}
						var j = this.isAutoHeight();
						var e = this.getActiveGroup();
						if (!j && this.autoCollapse && e) {
							var c = this.getGroupEl(this.activeIndex);
							c.lastChild.style.height = this
									._getFillGroupBodyHeight()
									+ "px"
						} else {
						}
						fui.layout(this._borderEl)
					},
					_doLayoutInner : function() {
						if (this.isAutoHeight()) {
							this._borderEl.style.height = "auto"
						} else {
							var b = this.getHeight(true);
							if (!jQuery.boxModel) {
								var a = fui.getBorders(this._borderEl);
								b = b + a.top + a.bottom
							}
							if (b < 0) {
								b = 0
							}
							this._borderEl.style.height = b + "px"
						}
					},
					_getFillGroupBodyHeight : function() {
						var g = jQuery(this.el).height();
						var o = fui.getBorders(this._borderEl);
						g = g - o.top - o.bottom;
						var k = this.getActiveGroup();
						var m = 0;
						for (var f = 0, b = this.groups.length; f < b; f++) {
							var q = this.groups[f];
							var a = this.getGroupEl(q);
							if (q.visible == false || q == k) {
								continue
							}
							var j = a.lastChild.style.display;
							a.lastChild.style.display = "none";
							var n = jQuery(a).outerHeight();
							a.lastChild.style.display = j;
							var d = fui.getMargins(a);
							n = n + d.top + d.bottom;
							m += n
						}
						g = g - m;
						var e = this.getGroupEl(this.activeIndex);
						if (!e) {
							return 0
						}
						g = g - jQuery(e.firstChild).outerHeight();
						if (jQuery.boxModel) {
							var p = fui.getPaddings(e.lastChild);
							var c = fui.getBorders(e.lastChild);
							g = g - p.top - p.bottom - c.top - c.bottom
						}
						var p = fui.getPaddings(e);
						var c = fui.getBorders(e);
						var d = fui.getMargins(e);
						g = g - d.top - d.bottom;
						g = g - p.top - p.bottom - c.top - c.bottom;
						if (g < 0) {
							g = 0
						}
						return g
					},
					getGroup : function(b) {
						if (typeof b == "object") {
							return b
						}
						if (typeof b == "number") {
							return this.groups[b]
						} else {
							for (var c = 0, a = this.groups.length; c < a; c++) {
								var d = this.groups[c];
								if (d.name == b) {
									return d
								}
							}
						}
					},
					_getGroupById : function(d) {
						for (var b = 0, a = this.groups.length; b < a; b++) {
							var c = this.groups[b];
							if (c._id == d) {
								return c
							}
						}
					},
					getGroupEl : function(a) {
						var b = this.getGroup(a);
						if (!b) {
							return null
						}
						return b._el
					},
					getGroupBodyEl : function(a) {
						var b = this.getGroupEl(a);
						if (b) {
							return b.lastChild
						}
						return null
					},
					setAutoCollapse : function(a) {
						this.autoCollapse = a
					},
					getAutoCollapse : function() {
						return this.autoCollapse
					},
					setExpandOnLoad : function(a) {
						this.expandOnLoad = a
					},
					getExpandOnLoad : function() {
						return this.expandOnLoad
					},
					setActiveIndex : function(d) {
						var e = this.getGroup(d);
						var a = this.getGroup(this.activeIndex);
						var b = e != a;
						if (e) {
							this.activeIndex = this.groups.indexOf(e)
						} else {
							this.activeIndex = -1
						}
						var e = this.getGroup(this.activeIndex);
						if (e) {
							var c = this.allowAnim;
							this.allowAnim = false;
							this.expandGroup(e);
							this.allowAnim = c
						}
					},
					getActiveIndex : function() {
						return this.activeIndex
					},
					getActiveGroup : function() {
						return this.getGroup(this.activeIndex)
					},
					showGroup : function(a) {
						a = this.getGroup(a);
						if (!a || a.visible == true) {
							return
						}
						a.visible = true;
						this.doUpdate()
					},
					hideGroup : function(a) {
						a = this.getGroup(a);
						if (!a || a.visible == false) {
							return
						}
						a.visible = false;
						this.doUpdate()
					},
					toggleGroup : function(a) {
						a = this.getGroup(a);
						if (!a) {
							return
						}
						if (a.expanded) {
							this.collapseGroup(a)
						} else {
							this.expandGroup(a)
						}
					},
					collapseGroup : function(k) {
						k = this.getGroup(k);
						if (!k) {
							return
						}
						var i = k.expanded;
						var f = 0;
						if (this.autoCollapse && !this.isAutoHeight()) {
							f = this._getFillGroupBodyHeight()
						}
						var a = false;
						k.expanded = false;
						var h = this.groups.indexOf(k);
						if (h == this.activeIndex) {
							this.activeIndex = -1;
							a = true
						}
						var b = this.getGroupBodyEl(k);
						if (this.allowAnim && i) {
							this._inAniming = true;
							b.style.display = "block";
							b.style.height = "auto";
							if (this.autoCollapse && !this.isAutoHeight()) {
								b.style.height = f + "px"
							}
							var d = {
								height : "1px"
							};
							fui.addClass(b, "fui-outlookbar-overflow");
							var g = this;
							var c = jQuery(b);
							c.animate(d, 180, function() {
								g._inAniming = false;
								fui.removeClass(b, "fui-outlookbar-overflow");
								g.doLayout()
							})
						} else {
							this.doLayout()
						}
						var j = {
							group : k,
							index : this.groups.indexOf(k),
							name : k.name
						};
						this.fire("Collapse", j);
						if (a) {
							this.fire("activechanged")
						}
					},
					expandGroup : function(r) {
						r = this.getGroup(r);
						if (!r) {
							return
						}
						var p = r.expanded;
						r.expanded = true;
						this.activeIndex = this.groups.indexOf(r);
						fire = true;
						if (this.autoCollapse) {
							for (var j = 0, f = this.groups.length; j < f; j++) {
								var m = this.groups[j];
								if (m.expanded && m != r) {
									this.collapseGroup(m)
								}
							}
						}
						var a = this.getGroupBodyEl(r);
						if (this.allowAnim && p == false) {
							this._inAniming = true;
							a.style.display = "block";
							if (this.autoCollapse && !this.isAutoHeight()) {
								var o = this._getFillGroupBodyHeight();
								a.style.height = (o) + "px"
							} else {
								a.style.height = "auto"
							}
							var k = fui.getHeight(a);
							a.style.height = "1px";
							var c = {
								height : k + "px"
							};
							var d = a.style.overflow;
							a.style.overflow = "hidden";
							fui.addClass(a, "fui-outlookbar-overflow");
							var n = this;
							var b = jQuery(a);
							b.animate(c, 180, function() {
								a.style.overflow = d;
								fui.removeClass(a, "fui-outlookbar-overflow");
								n._inAniming = false;
								n.doLayout()
							})
						} else {
							this.doLayout()
						}
						var q = {
							group : r,
							index : this.groups.indexOf(r),
							name : r.name
						};
						this.fire("Expand", q);
						if (fire) {
							this.fire("activechanged")
						}
					},
					_tryToggleGroup : function(b) {
						b = this.getGroup(b);
						var a = {
							group : b,
							groupIndex : this.groups.indexOf(b),
							groupName : b.name,
							cancel : false
						};
						if (b.expanded) {
							this.fire("BeforeCollapse", a);
							if (a.cancel == false) {
								this.collapseGroup(b)
							}
						} else {
							this.fire("BeforeExpand", a);
							if (a.cancel == false) {
								this.expandGroup(b)
							}
						}
					},
					_getGroupByEvent : function(c) {
						var b = fui
								.findParent(c.target, "fui-outlookbar-group");
						if (!b) {
							return null
						}
						var a = b.id.split("$");
						var d = a[a.length - 1];
						return this._getGroupById(d)
					},
					__OnClick : function(c) {
						if (this._inAniming) {
							return
						}
						var b = fui.findParent(c.target,
								"fui-outlookbar-groupHeader");
						if (!b) {
							return
						}
						var a = this._getGroupByEvent(c);
						if (!a) {
							return
						}
						this._tryToggleGroup(a)
					},
					parseGroups : function(c) {
						var a = [];
						for (var d = 0, b = c.length; d < b; d++) {
							var e = c[d];
							var f = {};
							a.push(f);
							f.style = e.style.cssText;
							fui._ParseString(e, f, [ "name", "title", "cls",
									"iconCls", "iconStyle", "headerCls",
									"headerStyle", "bodyCls", "bodyStyle" ]);
							fui._ParseBool(e, f, [ "visible", "enabled",
									"showCollapseButton", "expanded" ]);
							f.bodyParent = e
						}
						return a
					},
					getAttrs : function(c) {
						var b = fui.OutlookBar.superclass.getAttrs
								.call(this, c);
						fui._ParseString(c, b, [ "onactivechanged",
								"oncollapse", "onexpand" ]);
						fui._ParseBool(c, b, [ "autoCollapse", "allowAnim",
								"expandOnLoad" ]);
						fui._ParseInt(c, b, [ "activeIndex" ]);
						var a = fui.getChildNodes(c);
						b.groups = this.parseGroups(a);
						return b
					}
				});
fui.regClass(fui.OutlookBar, "outlookbar");
fui.OutlookMenu = function() {
	fui.OutlookMenu.superclass.constructor.call(this);
	this.data = []
};
fui.extend(fui.OutlookMenu, fui.OutlookBar, {
	url : "",
	textField : "text",
	iconField : "iconCls",
	urlField : "url",
	resultAsTree : false,
	itemsField : "children",
	idField : "id",
	parentField : "pid",
	style : "width:100%;height:100%;",
	set : function(c) {
		if (typeof c == "string") {
			return this
		}
		var b = c.url;
		delete c.url;
		var a = c.activeIndex;
		delete c.activeIndex;
		fui.OutlookMenu.superclass.set.call(this, c);
		if (b) {
			this.setUrl(b)
		}
		if (fui.isNumber(a)) {
			this.setActiveIndex(a)
		}
		return this
	},
	uiCls : "fui-outlookmenu",
	destroy : function(d) {
		if (this._menus) {
			var c = this._menus.clone();
			for (var b = 0, a = c.length; b < a; b++) {
				var e = c[b];
				e.destroy()
			}
			this._menus.length = 0
		}
		fui.OutlookMenu.superclass.destroy.call(this, d)
	},
	_doParseFields : function(c) {
		for (var b = 0, a = c.length; b < a; b++) {
			var d = c[b];
			d.text = d[this.textField];
			d.url = d[this.urlField];
			d.iconCls = d[this.iconField]
		}
	},
	_doLoad : function() {
		var a = [];
		try {
			a = fui.getData(this.url)
		} catch (b) {
			if (fui_debugger == true) {
				alert("outlooktree json is error.")
			}
		}
		if (this.dataField) {
			a = fui._getMap(this.dataField, a)
		}
		if (!a) {
			a = []
		}
		if (this.resultAsTree == false) {
			a = fui.arrayToTree(a, this.itemsField, this.idField,
					this.parentField)
		}
		var c = fui.treeToArray(a, this.itemsField, this.idField,
				this.parentField);
		this._doParseFields(c);
		this.createNavBarMenu(a);
		this.fire("load")
	},
	loadList : function(c, b, d) {
		b = b || this.idField;
		d = d || this.parentField;
		this._doParseFields(c);
		var a = fui.arrayToTree(c, this.nodesField, b, d);
		this.load(a)
	},
	load : function(b) {
		if (typeof b == "string") {
			this.setUrl(b)
		} else {
			var a = fui.treeToArray(b, this.itemsField, this.idField,
					this.parentField);
			this._doParseFields(a);
			this.createNavBarMenu(b)
		}
	},
	setData : function(a) {
		this.load(a)
	},
	setUrl : function(a) {
		this.url = a;
		this._doLoad()
	},
	getUrl : function() {
		return this.url
	},
	setTextField : function(a) {
		this.textField = a
	},
	getTextField : function() {
		return this.textField
	},
	setIconField : function(a) {
		this.iconField = a
	},
	getIconField : function() {
		return this.iconField
	},
	setUrlField : function(a) {
		this.urlField = a
	},
	getUrlField : function() {
		return this.urlField
	},
	setResultAsTree : function(a) {
		this.resultAsTree = a
	},
	getResultAsTree : function() {
		return this.resultAsTree
	},
	setNodesField : function(a) {
		this.nodesField = a
	},
	getNodesField : function() {
		return this.nodesField
	},
	setIdField : function(a) {
		this.idField = a
	},
	getIdField : function() {
		return this.idField
	},
	setParentField : function(a) {
		this.parentField = a
	},
	getParentField : function() {
		return this.parentField
	},
	_selected : null,
	getSelected : function() {
		return this._selected
	},
	selectNode : function(a) {
		a = this.getNode(a);
		if (!a) {
			return
		}
		var b = this._getOwnerMenu(a);
		if (!b) {
			return
		}
		this.expandGroup(b._ownerGroup);
		setTimeout(function() {
			try {
				b.setSelectedItem(a)
			} catch (c) {
			}
		}, 100)
	},
	findNodes : function(h, n) {
		var a = [];
		n = n || this;
		for (var f = 0, c = this._menus.length; f < c; f++) {
			var g = this._menus[f].getItems();
			var b = [];
			for (var e = 0, d = g.length; e < d; e++) {
				var m = g[e];
				if (h && h.call(n, m) === true) {
					b.push(m)
				}
			}
			a.addRange(b)
		}
		return a
	},
	getNode : function(c) {
		for (var b = 0, a = this._menus.length; b < a; b++) {
			var d = this._menus[b];
			var e = d.getItem(c);
			if (e) {
				return e
			}
		}
		return null
	},
	getList : function() {
		var d = [];
		for (var c = 0, a = this._menus.length; c < a; c++) {
			var e = this._menus[c];
			var b = e.getItems();
			d.addRange(b)
		}
		return d
	},
	_getOwnerMenu : function(c) {
		if (!c) {
			return
		}
		for (var b = 0, a = this._menus.length; b < a; b++) {
			var d = this._menus[b];
			var e = d.getItem(c);
			if (e) {
				return d
			}
		}
	},
	getAttrs : function(b) {
		var a = fui.OutlookMenu.superclass.getAttrs.call(this, b);
		a.text = b.innerHTML;
		fui._ParseString(b, a, [ "url", "textField", "urlField", "idField",
				"parentField", "itemsField", "iconField", "onitemclick",
				"onitemselect" ]);
		fui._ParseBool(b, a, [ "resultAsTree" ]);
		return a
	},
	autoCollapse : true,
	activeIndex : 0,
	createNavBarMenu : function(b) {
		if (!fui.isArray(b)) {
			b = []
		}
		this.data = b;
		var a = [];
		for (var d = 0, c = this.data.length; d < c; d++) {
			var h = this.data[d];
			var f = {};
			f.title = h.text;
			f.iconCls = h.iconCls;
			a.push(f);
			f._children = h[this.itemsField]
		}
		this.setGroups(a);
		this.setActiveIndex(this.activeIndex);
		this._menus = [];
		for (var d = 0, c = this.groups.length; d < c; d++) {
			var f = this.groups[d];
			var e = this.getGroupBodyEl(f);
			var g = new fui.Menu();
			g._ownerGroup = f;
			g.set({
				showNavArrow : false,
				style : "width:100%;height:100%;border:0;background:none",
				borderStyle : "border:0",
				allowSelectItem : true,
				items : f._children
			});
			g.render(e);
			g.on("itemclick", this.__OnItemClick, this);
			g.on("itemselect", this.__OnItemSelect, this);
			this._menus.push(g);
			delete f._children
		}
	},
	__OnItemClick : function(b) {
		var a = {
			item : b.item,
			htmlEvent : b.htmlEvent
		};
		this.fire("itemclick", a)
	},
	__OnItemSelect : function(d) {
		if (!d.item) {
			return
		}
		for (var b = 0, a = this._menus.length; b < a; b++) {
			var f = this._menus[b];
			if (f != d.sender) {
				f.setSelectedItem(null)
			}
		}
		var c = {
			item : d.item,
			htmlEvent : d.htmlEvent
		};
		this._selected = d.item;
		this.fire("itemselect", c)
	}
});
fui.regClass(fui.OutlookMenu, "outlookmenu");
fui.OutlookTree = function() {
	fui.OutlookTree.superclass.constructor.call(this);
	this.data = []
};
fui.extend(fui.OutlookTree, fui.OutlookBar, {
	url : "",
	textField : "text",
	iconField : "iconCls",
	urlField : "url",
	resultAsTree : false,
	nodesField : "children",
	idField : "id",
	parentField : "pid",
	style : "width:100%;height:100%;",
	set : function(c) {
		if (typeof c == "string") {
			return this
		}
		var b = c.url;
		delete c.url;
		var a = c.activeIndex;
		delete c.activeIndex;
		fui.OutlookTree.superclass.set.call(this, c);
		if (b) {
			this.setUrl(b)
		}
		if (fui.isNumber(a)) {
			this.setActiveIndex(a)
		}
		return this
	},
	uiCls : "fui-outlooktree",
	destroy : function(d) {
		if (this._trees) {
			var c = this._trees.clone();
			for (var b = 0, a = c.length; b < a; b++) {
				var e = c[b];
				e.destroy()
			}
			this._trees.length = 0
		}
		fui.OutlookTree.superclass.destroy.call(this, d)
	},
	_doParseFields : function(c) {
		for (var b = 0, a = c.length; b < a; b++) {
			var d = c[b];
			d.text = d[this.textField];
			d.url = d[this.urlField];
			d.iconCls = d[this.iconField]
		}
	},
	_doLoad : function() {
		var a = [];
		try {
			a = fui.getData(this.url)
		} catch (b) {
			if (fui_debugger == true) {
				alert("outlooktree json is error.")
			}
		}
		if (this.dataField) {
			a = fui._getMap(this.dataField, a)
		}
		if (!a) {
			a = []
		}
		if (this.resultAsTree == false) {
			a = fui.arrayToTree(a, this.nodesField, this.idField,
					this.parentField)
		}
		var c = fui.treeToArray(a, this.nodesField, this.idField,
				this.parentField);
		this._doParseFields(c);
		this.createNavBarTree(a);
		this.fire("load")
	},
	loadList : function(c, b, d) {
		b = b || this.idField;
		d = d || this.parentField;
		this._doParseFields(c);
		var a = fui.arrayToTree(c, this.nodesField, b, d);
		this.load(a)
	},
	load : function(b) {
		if (typeof b == "string") {
			this.setUrl(b)
		} else {
			var a = fui.treeToArray(b, this.itemsField, this.idField,
					this.parentField);
			this._doParseFields(a);
			this.createNavBarTree(b)
		}
	},
	setData : function(a) {
		this.load(a)
	},
	getData : function() {
		return this.data
	},
	setUrl : function(a) {
		this.url = a;
		this._doLoad()
	},
	getUrl : function() {
		return this.url
	},
	setTextField : function(a) {
		this.textField = a
	},
	getTextField : function() {
		return this.textField
	},
	setIconField : function(a) {
		this.iconField = a
	},
	getIconField : function() {
		return this.iconField
	},
	setUrlField : function(a) {
		this.urlField = a
	},
	getUrlField : function() {
		return this.urlField
	},
	setResultAsTree : function(a) {
		this.resultAsTree = a
	},
	getResultAsTree : function() {
		return this.resultAsTree
	},
	setNodesField : function(a) {
		this.nodesField = a
	},
	getNodesField : function() {
		return this.nodesField
	},
	setIdField : function(a) {
		this.idField = a
	},
	getIdField : function() {
		return this.idField
	},
	setParentField : function(a) {
		this.parentField = a
	},
	getParentField : function() {
		return this.parentField
	},
	_selected : null,
	getSelected : function() {
		return this._selected
	},
	selectNode : function(b) {
		b = this.getNode(b);
		if (!b) {
			return
		}
		var a = this._getOwnerTree(b);
		a.selectNode(b)
	},
	expandPath : function(b) {
		b = this.getNode(b);
		if (!b) {
			return
		}
		var a = this._getOwnerTree(b);
		a.expandPath(b);
		this.expandGroup(a._ownerGroup)
	},
	findNodes : function(f, e) {
		var c = [];
		e = e || this;
		for (var d = 0, b = this._trees.length; d < b; d++) {
			var a = this._trees[d];
			var g = a.findNodes(f, e);
			c.addRange(g)
		}
		return c
	},
	getNode : function(d) {
		for (var c = 0, b = this._trees.length; c < b; c++) {
			var a = this._trees[c];
			var e = a.getNode(d);
			if (e) {
				return e
			}
		}
		return null
	},
	getList : function() {
		var e = [];
		for (var d = 0, b = this._trees.length; d < b; d++) {
			var a = this._trees[d];
			var c = a.getList();
			e.addRange(c)
		}
		return e
	},
	_getOwnerTree : function(d) {
		if (!d) {
			return
		}
		for (var c = 0, b = this._trees.length; c < b; c++) {
			var a = this._trees[c];
			if (a.getby_id(d._id)) {
				return a
			}
		}
	},
	expandOnLoad : false,
	setExpandOnLoad : function(a) {
		this.expandOnLoad = a
	},
	getExpandOnLoad : function() {
		return this.expandOnLoad
	},
	getAttrs : function(b) {
		var a = fui.OutlookTree.superclass.getAttrs.call(this, b);
		a.text = b.innerHTML;
		fui._ParseString(b, a, [ "url", "textField", "urlField", "idField",
				"parentField", "nodesField", "iconField", "onnodeclick",
				"onnodeselect", "onnodemousedown", "expandOnLoad" ]);
		fui._ParseBool(b, a, [ "resultAsTree" ]);
		if (a.expandOnLoad) {
			var c = parseInt(a.expandOnLoad);
			if (fui.isNumber(c)) {
				a.expandOnLoad = c
			} else {
				a.expandOnLoad = a.expandOnLoad == "true" ? true : false
			}
		}
		return a
	},
	autoCollapse : true,
	activeIndex : 0,
	createNavBarTree : function(b) {
		if (!fui.isArray(b)) {
			b = []
		}
		this.data = b;
		var a = [];
		for (var d = 0, c = this.data.length; d < c; d++) {
			var g = this.data[d];
			var f = {};
			f.title = g.text;
			f.iconCls = g.iconCls;
			a.push(f);
			f._children = g[this.nodesField]
		}
		this.setGroups(a);
		this.setActiveIndex(this.activeIndex);
		this._trees = [];
		for (var d = 0, c = this.groups.length; d < c; d++) {
			var f = this.groups[d];
			var e = this.getGroupBodyEl(f);
			var b = new fui.Tree();
			b.set({
				idField : this.idField,
				parentField : this.parentField,
				textField : this.textField,
				expandOnLoad : this.expandOnLoad,
				showTreeIcon : true,
				style : "width:100%;height:100%;border:0;background:none",
				data : f._children
			});
			b.render(e);
			b.on("nodeclick", this.__OnNodeClick, this);
			b.on("nodeselect", this.__OnNodeSelect, this);
			b.on("nodemousedown", this.__OnNodeMouseDown, this);
			this._trees.push(b);
			delete f._children;
			b._ownerGroup = f
		}
	},
	__OnNodeMouseDown : function(b) {
		var a = {
			node : b.node,
			isLeaf : b.sender.isLeaf(b.node),
			htmlEvent : b.htmlEvent
		};
		this.fire("nodemousedown", a)
	},
	__OnNodeClick : function(b) {
		var a = {
			node : b.node,
			isLeaf : b.sender.isLeaf(b.node),
			htmlEvent : b.htmlEvent
		};
		this.fire("nodeclick", a)
	},
	__OnNodeSelect : function(f) {
		if (!f.node) {
			return
		}
		for (var c = 0, b = this._trees.length; c < b; c++) {
			var a = this._trees[c];
			if (a != f.sender) {
				a.selectNode(null)
			}
		}
		var d = {
			node : f.node,
			isLeaf : f.sender.isLeaf(f.node),
			htmlEvent : f.htmlEvent
		};
		this._selected = f.node;
		this.fire("nodeselect", d)
	}
});
fui.regClass(fui.OutlookTree, "outlooktree");
fui.NavBar = function() {
	fui.NavBar.superclass.constructor.call(this)
};
fui.extend(fui.NavBar, fui.OutlookBar, {
	uiCls : "fui-navbar"
});
fui.regClass(fui.NavBar, "navbar");
fui.NavBarMenu = function() {
	fui.NavBarMenu.superclass.constructor.call(this)
};
fui.extend(fui.NavBarMenu, fui.OutlookMenu, {
	uiCls : "fui-navbarmenu"
});
fui.regClass(fui.NavBarMenu, "navbarmenu");
fui.NavBarTree = function() {
	fui.NavBarTree.superclass.constructor.call(this)
};
fui.extend(fui.NavBarTree, fui.OutlookTree, {
	uiCls : "fui-navbartree"
});
fui.regClass(fui.NavBarTree, "navbartree");
fui.ToolBar = function() {
	fui.ToolBar.superclass.constructor.call(this)
};
fui.extend(fui.ToolBar, fui.Container, {
	_clearBorder : false,
	style : "",
	uiCls : "fui-toolbar",
	_create : function() {
		this.el = document.createElement("div");
		this.el.className = "fui-toolbar"
	},
	_initEvents : function() {
	},
	doLayout : function() {
		if (!this.canLayout()) {
			return
		}
		var b = fui.getChildNodes(this.el, true);
		for (var c = 0, a = b.length; c < a; c++) {
			fui.layout(b[c])
		}
	},
	set_bodyParent : function(a) {
		if (!a) {
			return
		}
		this.el = a;
		this.doLayout()
	},
	getAttrs : function(b) {
		var a = {};
		fui._ParseString(b, a, [ "id", "borderStyle" ]);
		this.el = b;
		this.el.uid = this.uid;
		this.addCls(this.uiCls);
		return a
	}
});
fui.regClass(fui.ToolBar, "toolbar");
fui.Pager = function() {
	fui.Pager.superclass.constructor.call(this)
};
fui
		.extend(
				fui.Pager,
				fui.Control,
				{
					pageIndex : 0,
					pageSize : 10,
					totalCount : 0,
					totalPage : 0,
					showPageIndex : true,
					showPageSize : true,
					showTotalCount : true,
					showPageInfo : true,
					showReloadButton : true,
					_clearBorder : false,
					showButtonText : false,
					showButtonIcon : true,
					firstText : "首页",
					prevText : "上一页",
					nextText : "下一页",
					lastText : "尾页",
					pageInfoText : "每页 {0} 条, 共 {1} 条",
					sizeList : [ 10, 20, 50, 100 ],
					uiCls : "fui-pager",
					_create : function() {
						this.el = document.createElement("div");
						this.el.className = "fui-pager";
						var a = '<div class="fui-pager-left"><table cellspacing="0" cellpadding="0" border="0"><tr><td></td><td></td></tr></table></div><div class="fui-pager-right"></div>';
						this.el.innerHTML = a;
						this._leftEl = this.el.childNodes[0];
						this._rightEl = this.el.childNodes[1];
						this._barEl = this._leftEl.firstChild.rows[0].cells[0];
						this._barEl2 = this._leftEl.firstChild.rows[0].cells[1];
						this.sizeEl = fui.append(this._barEl,
								'<span class="fui-pager-size"></span>');
						this.sizeCombo = new fui.ComboBox();
						this.sizeCombo.setName("pagesize");
						this.sizeCombo.setWidth(48);
						this.sizeCombo.render(this.sizeEl);
						fui.append(this.sizeEl,
								'<span class="separator"></span>');
						this.firstButton = new fui.Button();
						this.firstButton.render(this._barEl);
						this.prevButton = new fui.Button();
						this.prevButton.render(this._barEl);
						this.indexEl = document.createElement("span");
						this.indexEl.className = "fui-pager-index";
						this.indexEl.innerHTML = '<input id="" type="text" class="fui-pager-num"/><span class="fui-pager-pages">/ 0</span>';
						this._barEl.appendChild(this.indexEl);
						this.numInput = this.indexEl.firstChild;
						this.pagesLabel = this.indexEl.lastChild;
						this.nextButton = new fui.Button();
						this.nextButton.render(this._barEl);
						this.lastButton = new fui.Button();
						this.lastButton.render(this._barEl);
						fui.append(this._barEl,
								'<span class="separator"></span>');
						this.reloadButton = new fui.Button();
						this.reloadButton.render(this._barEl);
						this.firstButton.setPlain(true);
						this.prevButton.setPlain(true);
						this.nextButton.setPlain(true);
						this.lastButton.setPlain(true);
						this.reloadButton.setPlain(true);
						this.buttonsEl = fui.append(this._barEl2,
								'<div class="fui-page-buttons"></div>');
						this.update()
					},
					setButtons : function(a) {
						__fui_setControls(a, this.buttonsEl, this)
					},
					getButtonsEl : function() {
						return this.buttonsEl
					},
					destroy : function(a) {
						if (this.pageSelect) {
							fui.clearEvent(this.pageSelect);
							this.pageSelect = null
						}
						if (this.numInput) {
							fui.clearEvent(this.numInput);
							this.numInput = null
						}
						this.sizeEl = null;
						this._leftEl = null;
						fui.Pager.superclass.destroy.call(this, a)
					},
					_initEvents : function() {
						fui.Pager.superclass._initEvents.call(this);
						this.firstButton.on("click", function(c) {
							this._OnPageChanged(0)
						}, this);
						this.prevButton.on("click", function(c) {
							this._OnPageChanged(this.pageIndex - 1)
						}, this);
						this.nextButton.on("click", function(c) {
							this._OnPageChanged(this.pageIndex + 1)
						}, this);
						this.lastButton.on("click", function(c) {
							this._OnPageChanged(this.totalPage)
						}, this);
						this.reloadButton.on("click", function(c) {
							this._OnPageChanged()
						}, this);
						function a() {
							if (b) {
								return
							}
							b = true;
							var c = parseInt(this.numInput.value);
							if (isNaN(c)) {
								this.update()
							} else {
								this._OnPageChanged(c - 1)
							}
							setTimeout(function() {
								b = false
							}, 100)
						}
						var b = false;
						fui.on(this.numInput, "change", function(c) {
							a.call(this)
						}, this);
						fui.on(this.numInput, "keydown", function(c) {
							if (c.keyCode == 13) {
								a.call(this);
								c.stopPropagation()
							}
						}, this);
						this.sizeCombo.on("valuechanged",
								this.__OnPageSelectChanged, this)
					},
					doLayout : function() {
						if (!this.canLayout()) {
							return
						}
						fui.layout(this._leftEl);
						fui.layout(this._rightEl)
					},
					setPageIndex : function(a) {
						if (isNaN(a)) {
							return
						}
						this.pageIndex = a;
						this.update()
					},
					getPageIndex : function() {
						return this.pageIndex
					},
					setPageSize : function(a) {
						if (isNaN(a)) {
							return
						}
						this.pageSize = a;
						this.update()
					},
					getPageSize : function() {
						return this.pageSize
					},
					setTotalCount : function(a) {
						a = parseInt(a);
						if (isNaN(a)) {
							return
						}
						this.totalCount = a;
						this.update()
					},
					getTotalCount : function() {
						return this.totalCount
					},
					setSizeList : function(a) {
						if (!fui.isArray(a)) {
							return
						}
						this.sizeList = a;
						this.update()
					},
					getSizeList : function() {
						return this.sizeList
					},
					setShowPageSize : function(a) {
						this.showPageSize = a;
						this.update()
					},
					getShowPageSize : function() {
						return this.showPageSize
					},
					setShowPageIndex : function(a) {
						this.showPageIndex = a;
						this.update()
					},
					getShowPageIndex : function() {
						return this.showPageIndex
					},
					setShowTotalCount : function(a) {
						this.showTotalCount = a;
						this.update()
					},
					getShowTotalCount : function() {
						return this.showTotalCount
					},
					setShowPageInfo : function(a) {
						this.showPageInfo = a;
						this.update()
					},
					getShowPageInfo : function() {
						return this.showPageInfo
					},
					setShowReloadButton : function(a) {
						this.showReloadButton = a;
						this.update()
					},
					getShowReloadButton : function() {
						return this.showReloadButton
					},
					getTotalPage : function() {
						return this.totalPage
					},
					update : function(e, p, j) {
						if (fui.isNumber(e)) {
							this.pageIndex = parseInt(e)
						}
						if (fui.isNumber(p)) {
							this.pageSize = parseInt(p)
						}
						if (fui.isNumber(j)) {
							this.totalCount = parseInt(j)
						}
						this.totalPage = parseInt(this.totalCount
								/ this.pageSize) + 1;
						if ((this.totalPage - 1) * this.pageSize == this.totalCount) {
							this.totalPage -= 1
						}
						if (this.totalCount == 0) {
							this.totalPage = 0
						}
						if (this.pageIndex > this.totalPage - 1) {
							this.pageIndex = this.totalPage - 1
						}
						if (this.pageIndex <= 0) {
							this.pageIndex = 0
						}
						if (this.totalPage <= 0) {
							this.totalPage = 0
						}
						this.firstButton.enable();
						this.prevButton.enable();
						this.nextButton.enable();
						this.lastButton.enable();
						if (this.pageIndex == 0) {
							this.firstButton.disable();
							this.prevButton.disable()
						}
						if (this.pageIndex >= this.totalPage - 1) {
							this.nextButton.disable();
							this.lastButton.disable()
						}
						this.numInput.value = this.pageIndex > -1 ? this.pageIndex + 1
								: 0;
						this.pagesLabel.innerHTML = "/ " + this.totalPage;
						var k = this.sizeList.clone();
						if (k.indexOf(this.pageSize) == -1) {
							k.push(this.pageSize);
							k = k.sort(function(l, i) {
								return l > i
							})
						}
						var o = [];
						for (var b = 0, a = k.length; b < a; b++) {
							var d = k[b];
							var c = {};
							c.text = d;
							c.id = d;
							o.push(c)
						}
						this.sizeCombo.setData(o);
						this.sizeCombo.setValue(this.pageSize);
						var f = this.firstText, h = this.prevText, n = this.nextText, g = this.lastText;
						if (this.showButtonText == false) {
							f = h = n = g = ""
						}
						this.firstButton.setText(f);
						this.prevButton.setText(h);
						this.nextButton.setText(n);
						this.lastButton.setText(g);
						var f = this.firstText, h = this.prevText, n = this.nextText, g = this.lastText;
						if (this.showButtonText == true) {
							f = h = n = g = ""
						}
						this.firstButton.setTooltip(f);
						this.prevButton.setTooltip(h);
						this.nextButton.setTooltip(n);
						this.lastButton.setTooltip(g);
						this.firstButton
								.setIconCls(this.showButtonIcon ? "fui-pager-first"
										: "");
						this.prevButton
								.setIconCls(this.showButtonIcon ? "fui-pager-prev"
										: "");
						this.nextButton
								.setIconCls(this.showButtonIcon ? "fui-pager-next"
										: "");
						this.lastButton
								.setIconCls(this.showButtonIcon ? "fui-pager-last"
										: "");
						this.reloadButton
								.setIconCls(this.showButtonIcon ? "fui-pager-reload"
										: "");
						this.reloadButton.setVisible(this.showReloadButton);
						var m = this.reloadButton.el.previousSibling;
						if (m) {
							m.style.display = this.showReloadButton ? ""
									: "none"
						}
						this._rightEl.innerHTML = String.format(
								this.pageInfoText, this.pageSize,
								this.totalCount);
						this.indexEl.style.display = this.showPageIndex ? ""
								: "none";
						this.sizeEl.style.display = this.showPageSize ? ""
								: "none";
						this._rightEl.style.display = this.showPageInfo ? ""
								: "none"
					},
					__OnPageSelectChanged : function(b) {
						var a = parseInt(this.sizeCombo.getValue());
						this._OnPageChanged(0, a)
					},
					_OnPageChanged : function(a, b) {
						var c = {
							pageIndex : fui.isNumber(a) ? a : this.pageIndex,
							pageSize : fui.isNumber(b) ? b : this.pageSize,
							cancel : false
						};
						if (c.pageIndex > this.totalPage - 1) {
							c.pageIndex = this.totalPage - 1
						}
						if (c.pageIndex < 0) {
							c.pageIndex = 0
						}
						this.fire("beforepagechanged", c);
						if (c.cancel == true) {
							return
						}
						this.fire("pagechanged", c);
						this.update(c.pageIndex, c.pageSize)
					},
					onPageChanged : function(b, a) {
						this.on("pagechanged", b, a)
					},
					getAttrs : function(el) {
						var attrs = fui.Pager.superclass.getAttrs
								.call(this, el);
						fui._ParseString(el, attrs, [ "onpagechanged",
								"sizeList", "onbeforepagechanged", "buttons" ]);
						fui._ParseBool(el, attrs, [ "showPageIndex",
								"showPageSize", "showTotalCount",
								"showPageInfo", "showReloadButton" ]);
						fui._ParseInt(el, attrs, [ "pageIndex", "pageSize",
								"totalCount" ]);
						if (typeof attrs.sizeList == "string") {
							attrs.sizeList = eval(attrs.sizeList)
						}
						if (attrs.buttons) {
							attrs.buttons = fui.byId(attrs.buttons)
						}
						return attrs
					}
				});
fui.regClass(fui.Pager, "pager");
fui.DataBinding = function() {
	this._bindFields = [];
	this._bindForms = [];
	fui.DataBinding.superclass.constructor.call(this)
};
fui.extend(fui.DataBinding, fui.Component, {
	bindField : function(d, a, c, e, b) {
		d = fui.get(d);
		a = fui.get(a);
		if (!d || !a || !c) {
			return
		}
		var f = {
			control : d,
			source : a,
			field : c,
			convert : b,
			mode : e
		};
		this._bindFields.push(f);
		a.on("currentchanged", this.__OnCurrentChanged, this);
		d.on("valuechanged", this.__OnValueChanged, this)
	},
	bindForm : function(d, e, h, g) {
		d = fui.byId(d);
		e = fui.get(e);
		if (!d || !e) {
			return
		}
		var d = new fui.Form(d);
		var b = d.getFields();
		for (var c = 0, a = b.length; c < a; c++) {
			var f = b[c];
			this.bindField(f, e, f.getName(), h, g)
		}
	},
	__OnCurrentChanged : function(g) {
		if (this._doSetting) {
			return
		}
		this._doSetting = true;
		var a = g.sender;
		var f = g.record;
		for (var d = 0, b = this._bindFields.length; d < b; d++) {
			var h = this._bindFields[d];
			if (h.source != a) {
				continue
			}
			var c = h.control;
			var k = h.field;
			if (c.setValue) {
				if (f) {
					var m = f[k];
					c.setValue(m)
				} else {
					c.setValue("")
				}
			}
			if (c.setText && c.textName) {
				if (f) {
					c.setText(f[c.textName])
				} else {
					c.setText("")
				}
			}
		}
		var j = this;
		setTimeout(function() {
			j._doSetting = false
		}, 10)
	},
	__OnValueChanged : function(g) {
		if (this._doSetting) {
			return
		}
		this._doSetting = true;
		var d = g.sender;
		var m = d.getValue();
		for (var f = 0, b = this._bindFields.length; f < b; f++) {
			var j = this._bindFields[f];
			if (j.control != d || j.mode === false) {
				continue
			}
			var a = j.source;
			var h = a.getCurrent();
			if (!h) {
				continue
			}
			var c = {};
			c[j.field] = m;
			if (d.getText && d.textName) {
				c[d.textName] = d.getText()
			}
			a.updateRow(h, c)
		}
		var k = this;
		setTimeout(function() {
			k._doSetting = false
		}, 10)
	}
});
fui.regClass(fui.DataBinding, "databinding");
fui.DataSet = function() {
	this._sources = {};
	this._data = {};
	this._links = [];
	this._originals = {};
	fui.DataSet.superclass.constructor.call(this)
};
fui.extend(fui.DataSet, fui.Component, {
	add : function(a, b) {
		if (!a || !b) {
			return
		}
		this._sources[a] = b;
		this._data[a] = [];
		b._set_autoCreateNewID(true);
		b._set_originalIdField(b.getIdField());
		b._set_clearOriginals(false);
		b.on("addrow", this.__OnRowChanged, this);
		b.on("updaterow", this.__OnRowChanged, this);
		b.on("deleterow", this.__OnRowChanged, this);
		b.on("removerow", this.__OnRowChanged, this);
		b.on("preload", this.__OnDataPreLoad, this);
		b.on("selectionchanged", this.__OnDataSelectionChanged, this)
	},
	addLink : function(b, a, d) {
		if (!b || !a || !d) {
			return
		}
		if (!this._sources[b] || !this._sources[a]) {
			return
		}
		var c = {
			parentName : b,
			childName : a,
			parentField : d
		};
		this._links.push(c)
	},
	clearData : function() {
		this._data = {};
		this._originals = {};
		for ( var a in this._sources) {
			this._data = []
		}
	},
	getData : function() {
		return this._data
	},
	_getNameByListControl : function(b) {
		for ( var a in this._sources) {
			var d = this._sources[a];
			if (d == b) {
				return a
			}
		}
	},
	_getRecord : function(d, b, c) {
		var f = this._data[d];
		if (!f) {
			return false
		}
		for (var e = 0, a = f.length; e < a; e++) {
			var g = f[e];
			if (g[c] == b[c]) {
				return g
			}
		}
		return null
	},
	__OnRowChanged : function(i) {
		var f = i.type;
		var b = i.record;
		var d = this._getNameByListControl(i.sender);
		var c = this._getRecord(d, b, i.sender.getIdField());
		var g = this._data[d];
		if (c) {
			var g = this._data[d];
			g.remove(c)
		}
		if (f == "removerow" && b._state == "added") {
		} else {
			g.push(b)
		}
		this._originals[d] = i.sender._get_originals();
		if (b._state == "added") {
			var a = this._getParentSource(i.sender);
			if (a) {
				var h = a.getSelected();
				if (h) {
					b._parentId = h[a.getIdField()]
				} else {
					g.remove(b)
				}
			}
		}
	},
	__OnDataPreLoad : function(m) {
		var b = m.sender;
		var c = this._getNameByListControl(b);
		var d = m.sender.getIdField();
		var s = this._data[c];
		var p = {};
		for (var h = 0, g = s.length; h < g; h++) {
			var r = s[h];
			p[r[d]] = r
		}
		var j = this._originals[c];
		if (j) {
			b._set_originals(j)
		}
		var a = m.data || [];
		for (var h = 0, g = a.length; h < g; h++) {
			var r = a[h];
			var f = p[r[d]];
			if (f) {
				delete f._uid;
				fui.copyTo(r, f)
			}
		}
		var o = this._getParentSource(b);
		if (b.getPageIndex && b.getPageIndex() == 0) {
			var n = [];
			for (var h = 0, g = s.length; h < g; h++) {
				var r = s[h];
				if (r._state == "added") {
					if (o) {
						var k = o.getSelected();
						if (k && k[o.getIdField()] == r._parentId) {
							n.push(r)
						}
					} else {
						n.push(r)
					}
				}
			}
			n.reverse();
			a.insertRange(0, n)
		}
		var q = [];
		for (var h = a.length - 1; h >= 0; h--) {
			var r = a[h];
			var f = p[r[d]];
			if (f && f._state == "removed") {
				a.removeAt(h);
				q.push(f)
			}
		}
	},
	_getParentSource : function(e) {
		var b = this._getNameByListControl(e);
		for (var c = 0, a = this._links.length; c < a; c++) {
			var d = this._links[c];
			if (d.childName == b) {
				return this._sources[d.parentName]
			}
		}
	},
	_getLinks : function(f) {
		var c = this._getNameByListControl(f);
		var b = [];
		for (var d = 0, a = this._links.length; d < a; d++) {
			var e = this._links[d];
			if (e.parentName == c) {
				b.push(e)
			}
		}
		return b
	},
	__OnDataSelectionChanged : function(g) {
		var b = g.sender;
		var f = b.getSelected();
		var k = this._getLinks(b);
		for (var d = 0, c = k.length; d < c; d++) {
			var j = k[d];
			var a = this._sources[j.childName];
			if (f) {
				var h = {};
				h[j.parentField] = f[b.getIdField()];
				a.load(h)
			} else {
				a.loadData([])
			}
		}
	}
});
fui.regClass(fui.DataSet, "dataset");
fui.DataSource = function() {
	fui.DataSource.superclass.constructor.call(this);
	this._init()
};
fui.extend(fui.DataSource, fui.Component, {
	idField : "id",
	textField : "text",
	_originalIdField : "_id",
	_clearOriginals : true,
	_autoCreateNewID : false,
	_init : function() {
		this.source = [];
		this.dataview = [];
		this.visibleRows = null;
		this._ids = {};
		this._removeds = [];
		if (this._clearOriginals) {
			this._originals = {}
		}
		this._errors = {};
		this._selected = null;
		this._selecteds = [];
		this._idSelecteds = {};
		this.__changeCount = 0
	},
	getSource : function() {
		return this.source
	},
	getList : function() {
		return this.source.clone()
	},
	getDataView : function() {
		return this.dataview.clone()
	},
	getVisibleRows : function() {
		if (!this.visibleRows) {
			this.visibleRows = this.getDataView().clone()
		}
		return this.visibleRows
	},
	setData : function(a) {
		this.loadData(a)
	},
	loadData : function(a) {
		if (!fui.isArray(a)) {
			a = []
		}
		this._init();
		this._doLoadData(a);
		this._dataChanged();
		this.fire("loaddata");
		return true
	},
	_doLoadData : function(f) {
		this.source = f;
		this.dataview = f;
		var e = this.source, d = this._ids;
		for (var c = 0, b = e.length; c < b; c++) {
			var a = e[c];
			a._id = fui.DataSource.RecordId++;
			d[a._id] = a;
			a._uid = a._id
		}
	},
	clearData : function() {
		this._init();
		this._dataChanged();
		this.fire("cleardata")
	},
	clear : function() {
		this.clearData()
	},
	updateRecord : function(a, g, e) {
		if (fui.isNull(a)) {
			return
		}
		var d = fui._getMap, c = fui._setMap;
		this.fire("beforeupdate", {
			record : a
		});
		if (typeof g == "string") {
			var b = d(g, a);
			if (fui.isEquals(b, e)) {
				return false
			}
			this.beginChange();
			c(g, e, a);
			this._setModified(a, g, b);
			this.endChange()
		} else {
			this.beginChange();
			for ( var f in g) {
				var b = d(f, a);
				var e = g[f];
				if (fui.isEquals(b, e)) {
					continue
				}
				c(f, e, a);
				this._setModified(a, f, b)
			}
			this.endChange()
		}
		this.fire("update", {
			record : a
		})
	},
	deleteRecord : function(a) {
		this._setDeleted(a);
		this._dataChanged();
		this.fire("delete", {
			record : a
		})
	},
	getby_id : function(a) {
		a = typeof a == "object" ? a._id : a;
		return this._ids[a]
	},
	getbyId : function(g) {
		var d = typeof g;
		if (d == "number") {
			return this.getAt(g)
		}
		if (typeof g == "object") {
			if (this.getby_id(g)) {
				return g
			}
			g = g[this.idField]
		}
		var e = this.getList();
		g = String(g);
		for (var c = 0, a = e.length; c < a; c++) {
			var f = e[c];
			var b = !fui.isNull(f[this.idField]) ? String(f[this.idField])
					: null;
			if (b == g) {
				return f
			}
		}
		return null
	},
	getsByIds : function(f) {
		if (fui.isNull(f)) {
			f = ""
		}
		f = String(f);
		var b = [];
		var d = String(f).split(",");
		for (var c = 0, a = d.length; c < a; c++) {
			var e = this.getbyId(d[c]);
			if (e) {
				b.push(e)
			}
		}
		return b
	},
	getRecord : function(a) {
		return this.getRow(a)
	},
	getRow : function(a) {
		var b = typeof a;
		if (b == "string") {
			return this.getbyId(a)
		} else {
			if (b == "number") {
				return this.getAt(a)
			} else {
				if (b == "object") {
					return a
				}
			}
		}
	},
	delimiter : ",",
	getValueAndText : function(e, d) {
		if (fui.isNull(e)) {
			e = []
		}
		d = d || this.delimiter;
		if (typeof e == "string" || typeof e == "number") {
			e = this.getsByIds(e)
		} else {
			if (!fui.isArray(e)) {
				e = [ e ]
			}
		}
		var c = [];
		var g = [];
		for (var f = 0, b = e.length; f < b; f++) {
			var a = e[f];
			if (a) {
				c.push(this.getItemValue(a));
				g.push(this.getItemText(a))
			}
		}
		return [ c.join(d), g.join(d) ]
	},
	getItemValue : function(b) {
		if (!b) {
			return ""
		}
		var a = fui._getMap(this.idField, b);
		return fui.isNull(a) ? "" : String(a)
	},
	getItemText : function(b) {
		if (!b) {
			return ""
		}
		var a = fui._getMap(this.textField, b);
		return fui.isNull(a) ? "" : String(a)
	},
	isModified : function(a, c) {
		var b = this._originals[a[this._originalIdField]];
		if (!b) {
			return false
		}
		if (fui.isNull(c)) {
			return false
		}
		return b.hasOwnProperty(c)
	},
	hasRecord : function(a) {
		return !!this.getby_id(a)
	},
	findRecords : function(k, j) {
		var g = typeof k == "function";
		var h = k;
		var m = j || this;
		var d = this.source;
		var b = [];
		for (var e = 0, c = d.length; e < c; e++) {
			var a = d[e];
			if (g) {
				var f = h.call(m, a);
				if (f == true) {
					b[b.length] = a
				}
				if (f === 1) {
					break
				}
			} else {
				if (a[k] == j) {
					b[b.length] = a
				}
			}
		}
		return b
	},
	findRecord : function(c, b) {
		var a = this.findRecords(c, b);
		return a[0]
	},
	each : function(b, a) {
		var c = this.getDataView().clone();
		a = a || this;
		fui.forEach(c, b, a)
	},
	getCount : function() {
		return this.getDataView().length
	},
	setIdField : function(a) {
		this.idField = a
	},
	setTextField : function(a) {
		this.textField = a
	},
	__changeCount : 0,
	beginChange : function() {
		this.__changeCount++
	},
	endChange : function(a) {
		this.__changeCount--;
		if (this.__changeCount < 0) {
			this.__changeCount = 0
		}
		if ((a !== false && this.__changeCount == 0) || a == true) {
			this.__changeCount = 0;
			this._dataChanged()
		}
	},
	_dataChanged : function() {
		this.visibleRows = null;
		if (this.__changeCount == 0) {
			this.fire("datachanged")
		}
	},
	_setAdded : function(a) {
		a._id = fui.DataSource.RecordId++;
		if (this._autoCreateNewID && !a[this.idField]) {
			a[this.idField] = UUID()
		}
		a._uid = a._id;
		a._state = "added";
		this._ids[a._id] = a;
		delete this._originals[a[this._originalIdField]]
	},
	_setModified : function(a, d, b) {
		if (a._state != "added" && a._state != "deleted"
				&& a._state != "removed") {
			a._state = "modified";
			var c = this._getOriginal(a);
			if (!c.hasOwnProperty(d)) {
				c[d] = b
			}
		}
	},
	_setDeleted : function(a) {
		if (a._state != "added" && a._state != "deleted"
				&& a._state != "removed") {
			a._state = "deleted"
		}
	},
	_setRemoved : function(a) {
		delete this._ids[a._id];
		if (a._state != "added" && a._state != "removed") {
			a._state = "removed";
			delete this._originals[a[this._originalIdField]];
			this._removeds.push(a)
		}
	},
	_getOriginal : function(a) {
		var b = a[this._originalIdField];
		var c = this._originals[b];
		if (!c) {
			c = this._originals[b] = {}
		}
		return c
	},
	_selected : null,
	_selecteds : [],
	_idSelecteds : null,
	multiSelect : false,
	isSelected : function(a) {
		if (!a) {
			return false
		}
		if (typeof a != "string") {
			a = a._id
		}
		return !!this._idSelecteds[a]
	},
	setSelected : function(a) {
		a = this.getby_id(a);
		var b = this.getSelected();
		if (b != a) {
			this._selected = a;
			if (a) {
				this.select(a)
			} else {
				this.deselect(this.getSelected())
			}
			this._OnCurrentChanged(a)
		}
	},
	getSelected : function() {
		if (this.isSelected(this._selected)) {
			return this._selected
		}
		return this._selecteds[0]
	},
	setCurrent : function(a) {
		this.setSelected(a)
	},
	getCurrent : function() {
		return this.getSelected()
	},
	getSelecteds : function() {
		return this._selecteds.clone()
	},
	select : function(a) {
		if (fui.isNull(a)) {
			return
		}
		this.selects([ a ])
	},
	deselect : function(a) {
		if (fui.isNull(a)) {
			return
		}
		this.deselects([ a ])
	},
	selectAll : function() {
		this.selects(this.getList())
	},
	deselectAll : function() {
		this.deselects(this.getList())
	},
	selects : function(c) {
		if (!fui.isArray(c)) {
			return
		}
		c = c.clone();
		if (this.multiSelect == false) {
			this.deselects(this.getSelecteds());
			if (c.length > 0) {
				c.length = 1
			}
			this._selecteds = [];
			this._idSelecteds = {}
		}
		var e = [];
		for (var d = 0, b = c.length; d < b; d++) {
			var a = this.getbyId(c[d]);
			if (!a) {
				continue
			}
			if (!this.isSelected(a)) {
				this._selecteds.push(a);
				this._idSelecteds[a._id] = a;
				e.push(a)
			}
		}
		this._OnSelectionChanged(c, true, e)
	},
	deselects : function(b) {
		if (!fui.isArray(b)) {
			return
		}
		b = b.clone();
		var d = [];
		for (var c = b.length - 1; c >= 0; c--) {
			var a = this.getbyId(b[c]);
			if (!a) {
				continue
			}
			if (this.isSelected(a)) {
				this._selecteds.remove(a);
				delete this._idSelecteds[a._id];
				d.push(a)
			}
		}
		this._OnSelectionChanged(b, false, d)
	},
	_OnSelectionChanged : function(b, a, g) {
		var f = {
			records : b,
			select : a,
			selected : this.getSelected(),
			selecteds : this.getSelecteds(),
			_records : g
		};
		this.fire("SelectionChanged", f);
		var d = this._current;
		var c = this.getCurrent();
		if (d != c) {
			this._current = c;
			this._OnCurrentChanged(c)
		}
	},
	_OnCurrentChanged : function(a) {
		if (this._currentTimer) {
			clearTimeout(this._currentTimer)
		}
		var b = this;
		this._currentTimer = setTimeout(function() {
			b._currentTimer = null;
			var c = {
				record : a
			};
			b.fire("CurrentChanged", c)
		}, 1)
	},
	_checkSelecteds : function() {
		for (var b = this._selecteds.length - 1; b >= 0; b--) {
			var a = this._selecteds[b];
			var c = this.getby_id(a._id);
			if (!c) {
				this._selecteds.removeAt(b);
				delete this._idSelecteds[a._id]
			}
		}
		if (this._selected && this.getby_id(this._selected._id) == null) {
			this._selected = null
		}
	},
	setMultiSelect : function(a) {
		if (this.multiSelect != a) {
			this.multiSelect = a;
			if (a == false) {
			}
		}
	},
	getMultiSelect : function() {
		return this.multiSelect
	},
	selectPrev : function() {
		var a = this.getSelected();
		if (!a) {
			a = this.getAt(0)
		} else {
			var b = this.indexOf(a);
			a = this.getAt(b - 1)
		}
		if (a) {
			this.deselectAll();
			this.select(a);
			this.setCurrent(a)
		}
	},
	selectNext : function() {
		var a = this.getSelected();
		if (!a) {
			a = this.getAt(0)
		} else {
			var b = this.indexOf(a);
			a = this.getAt(b + 1)
		}
		if (a) {
			this.deselectAll();
			this.select(a);
			this.setCurrent(a)
		}
	},
	selectFirst : function() {
		var a = this.getAt(0);
		if (a) {
			this.deselectAll();
			this.select(a);
			this.setCurrent(a)
		}
	},
	selectLast : function() {
		var b = this.getVisibleRows();
		var a = this.getAt(b.length - 1);
		if (a) {
			this.deselectAll();
			this.select(a);
			this.setCurrent(a)
		}
	},
	getSelectedsId : function(b) {
		var a = this.getSelecteds();
		var c = this.getValueAndText(a, b);
		return c[0]
	},
	getSelectedsText : function(b) {
		var a = this.getSelecteds();
		var c = this.getValueAndText(a, b);
		return c[1]
	},
	_filterInfo : null,
	_sortInfo : null,
	filter : function(b, a) {
		if (typeof b != "function") {
			return
		}
		a = a || this;
		this._filterInfo = [ b, a ];
		this._doFilter();
		this._doSort();
		this._dataChanged();
		this.fire("filter")
	},
	clearFilter : function() {
		if (!this._filterInfo) {
			return
		}
		this._filterInfo = null;
		this._doFilter();
		this._doSort();
		this._dataChanged();
		this.fire("filter")
	},
	sort : function(c, b, a) {
		if (typeof c != "function") {
			return
		}
		b = b || this;
		this._sortInfo = [ c, b, a ];
		this._doSort();
		this._dataChanged();
		this.fire("sort")
	},
	clearSort : function() {
		this._sortInfo = null;
		this.sortField = this.sortOrder = null;
		this._doFilter();
		this._dataChanged();
		this.fire("filter")
	},
	_doClientSortField : function(b, d, a) {
		var e = this._getSortFnByField(b, a);
		if (!e) {
			return
		}
		this.sortField = b;
		this.sortOrder = d;
		var c = d == "desc";
		this.sort(e, this, c)
	},
	_getSortFnByField : function(c, d) {
		if (!c) {
			return null
		}
		var b = null;
		var a = fui.sortTypes[d];
		if (!a) {
			a = fui.sortTypes.string
		}
		function e(h, f) {
			var g = fui._getMap(c, h), i = fui._getMap(c, f);
			var k = fui.isNull(g) || g === "";
			var j = fui.isNull(i) || i === "";
			if (k) {
				return -1
			}
			if (j) {
				return 1
			}
			var m = a(g);
			var l = a(i);
			if (m > l) {
				return 1
			} else {
				if (m == l) {
					return 0
				} else {
					return -1
				}
			}
		}
		b = e;
		return b
	},
	ajaxOptions : null,
	autoLoad : false,
	url : "",
	pageSize : 10,
	pageIndex : 0,
	totalCount : 0,
	totalPage : 0,
	sortField : "",
	sortOrder : "",
	loadParams : null,
	getLoadParams : function() {
		return this.loadParams || {}
	},
	sortMode : "server",
	pageIndexField : "pageIndex",
	pageSizeField : "pageSize",
	sortFieldField : "sortField",
	sortOrderField : "sortOrder",
	totalField : "total",
	dataField : "data",
	load : function(e, d, b, a) {
		if (typeof e == "string") {
			this.setUrl(e);
			return
		}
		if (this._loadTimer) {
			clearTimeout(this._loadTimer)
		}
		this.loadParams = e || {};
		if (!fui.isNumber(this.loadParams.pageIndex)) {
			this.loadParams.pageIndex = 0
		}
		if (this.ajaxAsync) {
			var c = this;
			this._loadTimer = setTimeout(function() {
				c._doLoadAjax(c.loadParams, d, b, a);
				c._loadTimer = null
			}, 1)
		} else {
			this._doLoadAjax(this.loadParams, d, b, a)
		}
	},
	reload : function(c, b, a) {
		this.load(this.loadParams, c, b, a)
	},
	gotoPage : function(a, b) {
		var c = this.loadParams || {};
		if (fui.isNumber(a)) {
			c.pageIndex = a
		}
		if (fui.isNumber(b)) {
			c.pageSize = b
		}
		this.load(c)
	},
	sortBy : function(a, b) {
		this.sortField = a;
		this.sortOrder = b == "asc" ? "asc" : "desc";
		if (this.sortMode == "server") {
			var c = this.getLoadParams();
			c.sortField = a;
			c.sortOrder = b;
			c.pageIndex = this.pageIndex;
			this.load(c)
		} else {
		}
	},
	setSortField : function(a) {
		this.sortField = a;
		if (this.sortMode == "server") {
			var b = this.getLoadParams();
			b.sortField = a
		}
	},
	setSortOrder : function(a) {
		this.sortOrder = a;
		if (this.sortMode == "server") {
			var b = this.getLoadParams();
			b.sortOrder = a
		}
	},
	checkSelectOnLoad : true,
	selectOnLoad : false,
	ajaxData : null,
	ajaxAsync : true,
	ajaxType : "",
	_doLoadAjax : function(f, n, m, b, j) {
		f = f || {};
		if (fui.isNull(f.pageIndex)) {
			f.pageIndex = this.pageIndex
		}
		if (fui.isNull(f.pageSize)) {
			f.pageSize = this.pageSize
		}
		if (f.sortField) {
			this.sortField = f.sortField
		}
		if (f.sortOrder) {
			this.sortOrder = f.sortOrder
		}
		f.sortField = this.sortField;
		f.sortOrder = this.sortOrder;
		this.loadParams = f;
		var a = this._evalUrl();
		var l = this._evalType(a);
		var i = {
			url : a,
			async : this.ajaxAsync,
			type : l,
			data : f,
			params : f,
			cache : false,
			cancel : false
		};
		if (i.data != i.params && i.params != f) {
			i.data = i.params
		}
		var h = fui._evalAjaxData(this.ajaxData, this);
		fui.copyTo(i.data, h);
		fui.copyTo(i, this.ajaxOptions);
		this._OnBeforeLoad(i);
		if (i.cancel == true) {
			f.pageIndex = this.getPageIndex();
			f.pageSize = this.getPageSize();
			return
		}
		var c = {};
		c[this.pageIndexField] = f.pageIndex;
		c[this.pageSizeField] = f.pageSize;
		if (f.sortField) {
			c[this.sortFieldField] = f.sortField
		}
		if (f.sortOrder) {
			c[this.sortOrderField] = f.sortOrder
		}
		fui.copyTo(f, c);
		if (this.sortMode == "client") {
			f[this.sortFieldField] = "";
			f[this.sortOrderField] = ""
		}
		var g = this.getSelected();
		this._selectedValue = g ? g[this.idField] : null;
		if (fui.isNumber(this._selectedValue)) {
			this._selectedValue = String(this._selectedValue)
		}
		var k = this;
		k._resultObject = null;
		var d = i.async;
		fui.copyTo(i, {
			success : function(u, v, t) {
				if (!u || u == "null") {
					u = {
						tatal : 0,
						data : []
					}
				}
				var e = null;
				try {
					e = fui.decode(u)
				} catch (p) {
					if (fui_debugger == true) {
						alert(a + "\n json is error.")
					}
				}
				if (e && !fui.isArray(e)) {
					e.total = parseInt(fui._getMap(k.totalField, e));
					e.data = fui._getMap(k.dataField, e)
				} else {
					if (e == null) {
						e = {};
						e.data = [];
						e.total = 0
					} else {
						if (fui.isArray(e)) {
							var q = {};
							q.data = e;
							q.total = e.length;
							e = q
						}
					}
				}
				if (!e.data) {
					e.data = []
				}
				if (!e.total) {
					e.total = 0
				}
				k._resultObject = e;
				if (!fui.isArray(e.data)) {
					e.data = [ e.data ]
				}
				var p = {
					xhr : t,
					text : u,
					textStatus : v,
					result : e,
					total : e.total,
					data : e.data.clone(),
					pageIndex : f[k.pageIndexField],
					pageSize : f[k.pageSizeField]
				};
				if (fui.isNumber(e.error) && e.error != 0) {
					p.textStatus = "servererror";
					p.errorCode = e.error;
					p.stackTrace = e.stackTrace;
					p.errorMsg = e.errorMsg;
					if (fui_debugger == true) {
						alert(a + "\n" + p.textStatus + "\n" + p.stackTrace)
					}
					k.fire("loaderror", p);
					if (m) {
						m.call(k, p)
					}
				} else {
					if (j) {
						j(p)
					} else {
						k.pageIndex = p.pageIndex;
						k.pageSize = p.pageSize;
						k.setTotalCount(p.total);
						k._OnPreLoad(p);
						k.setData(p.data);
						if (k._selectedValue && k.checkSelectOnLoad) {
							var s = k.getbyId(k._selectedValue);
							if (s) {
								k.select(s)
							}
						}
						if (k.getSelected() == null && k.selectOnLoad
								&& k.getDataView().length > 0) {
							k.select(0)
						}
						k.fire("load", p);
						if (n) {
							if (d) {
								setTimeout(function() {
									n.call(k, p)
								}, 20)
							} else {
								n.call(k, p)
							}
						}
					}
				}
			},
			error : function(p, q, o) {
				var e = {
					xhr : p,
					text : p.responseText,
					textStatus : q
				};
				e.errorMsg = p.responseText;
				e.errorCode = p.status;
				if (fui_debugger == true) {
					alert(a + "\n" + e.errorCode + "\n" + e.errorMsg)
				}
				k.fire("loaderror", e);
				if (m) {
					m.call(k, e)
				}
			},
			complete : function(o, p) {
				var e = {
					xhr : o,
					text : o.responseText,
					textStatus : p
				};
				k.fire("loadcomplete", e);
				if (b) {
					b.call(k, e)
				}
				k._xhr = null
			}
		});
		if (this._xhr) {
		}
		this._xhr = fui.ajax(i)
	},
	_OnBeforeLoad : function(a) {
		this.fire("beforeload", a)
	},
	_OnPreLoad : function(a) {
		this.fire("preload", a)
	},
	_evalUrl : function() {
		var url = this.url;
		if (typeof url == "function") {
			url = url()
		} else {
			try {
				url = eval(url)
			} catch (ex) {
				url = this.url
			}
			if (!url) {
				url = this.url
			}
		}
		return url
	},
	_evalType : function(a) {
		var b = this.ajaxType;
		if (!b) {
			b = "post";
			if (a) {
				if (a.indexOf(".txt") != -1 || a.indexOf(".json") != -1) {
					b = "get"
				}
			} else {
				b = "get"
			}
		}
		return b
	},
	setSortMode : function(a) {
		this.sortMode = a
	},
	getSortMode : function() {
		return this.sortMode
	},
	setAjaxOptions : function(a) {
		this.ajaxOptions = a
	},
	getAjaxOptions : function() {
		return this.ajaxOptions
	},
	setAutoLoad : function(a) {
		this.autoLoad = a
	},
	getAutoLoad : function() {
		return this.autoLoad
	},
	setUrl : function(a) {
		this.url = a;
		if (this.autoLoad) {
			this.load()
		}
	},
	getUrl : function() {
		return this.url
	},
	setPageIndex : function(a) {
		this.pageIndex = a;
		this.fire("pageinfochanged")
	},
	getPageIndex : function() {
		return this.pageIndex
	},
	setPageSize : function(a) {
		this.pageSize = a;
		this.fire("pageinfochanged")
	},
	getPageSize : function() {
		return this.pageSize
	},
	setTotalCount : function(a) {
		this.totalCount = a;
		this.fire("pageinfochanged")
	},
	getTotalCount : function() {
		return this.totalCount
	},
	getTotalPage : function() {
		return this.totalPage
	},
	setCheckSelectOnLoad : function(a) {
		this.checkSelectOnLoad = a
	},
	getCheckSelectOnLoad : function() {
		return this.checkSelectOnLoad
	},
	setSelectOnLoad : function(a) {
		this.selectOnLoad = a
	},
	getSelectOnLoad : function() {
		return this.selectOnLoad
	}
});
fui.DataSource.RecordId = 1;
fui.DataTable = function() {
	fui.DataTable.superclass.constructor.call(this)
};
fui
		.extend(
				fui.DataTable,
				fui.DataSource,
				{
					_init : function() {
						fui.DataTable.superclass._init.call(this);
						this._filterInfo = null;
						this._sortInfo = null
					},
					add : function(a) {
						return this.insert(this.source.length, a)
					},
					addRange : function(a) {
						this.insertRange(this.source.length, a)
					},
					insert : function(d, b) {
						if (!b) {
							return null
						}
						var g = {
							index : d,
							record : b
						};
						this.fire("beforeadd", g);
						if (!fui.isNumber(d)) {
							var c = this.getRecord(d);
							if (c) {
								d = this.indexOf(c)
							} else {
								d = this.getDataView().length
							}
						}
						var f = this.dataview[d];
						if (f) {
							this.dataview.insert(d, b)
						} else {
							this.dataview.add(b)
						}
						if (this.dataview != this.source) {
							if (f) {
								var a = this.source.indexOf(f);
								this.source.insert(a, b)
							} else {
								this.source.add(b)
							}
						}
						this._setAdded(b);
						this._dataChanged();
						this.fire("add", g)
					},
					insertRange : function(d, c) {
						if (!fui.isArray(c)) {
							return
						}
						this.beginChange();
						c = c.clone();
						for (var e = 0, b = c.length; e < b; e++) {
							var a = c[e];
							this.insert(d + e, a)
						}
						this.endChange()
					},
					remove : function(a, c) {
						var b = this.indexOf(a);
						return this.removeAt(b, c)
					},
					removeAt : function(f, d) {
						var b = this.getAt(f);
						if (!b) {
							return null
						}
						var g = {
							record : b
						};
						this.fire("beforeremove", g);
						var c = this.isSelected(b);
						this.source.removeAt(f);
						if (this.dataview !== this.source) {
							this.dataview.removeAt(f)
						}
						this._setRemoved(b);
						this._checkSelecteds();
						this._dataChanged();
						this.fire("remove", g);
						if (c && d) {
							var a = this.getAt(f);
							if (!a) {
								a = this.getAt(f - 1)
							}
							this.deselectAll();
							this.select(a)
						}
					},
					removeRange : function(b, c) {
						if (!fui.isArray(b)) {
							return
						}
						this.beginChange();
						b = b.clone();
						for (var d = 0, a = b.length; d < a; d++) {
							var e = b[d];
							this.remove(e, c)
						}
						this.endChange()
					},
					move : function(g, o) {
						if (!g || !fui.isNumber(o)) {
							return
						}
						if (o < 0) {
							return
						}
						if (fui.isArray(g)) {
							this.beginChange();
							var d = g, b = this.getAt(o);
							var j = this;
							fui.sort(d, function(i, e) {
								return j.indexOf(i) > j.indexOf(e)
							}, this);
							for (var f = 0, c = d.length; f < c; f++) {
								var a = d[f];
								var h = this.indexOf(b);
								this.move(a, h)
							}
							this.endChange();
							return
						}
						var m = {
							index : o,
							record : g
						};
						this.fire("beforemove", m);
						var k = this.dataview[o];
						this.dataview.remove(g);
						var n = this.dataview.indexOf(k);
						if (n != -1) {
							o = n
						}
						if (k) {
							this.dataview.insert(o, g)
						} else {
							this.dataview.add(g)
						}
						if (this.dataview != this.source) {
							this.source.remove(g);
							var n = this.source.indexOf(k);
							if (n != -1) {
								o = n
							}
							if (k) {
								this.source.insert(o, g)
							} else {
								this.source.add(g)
							}
						}
						this._dataChanged();
						this.fire("move", m)
					},
					indexOf : function(a) {
						return this.getVisibleRows().indexOf(a)
					},
					getAt : function(a) {
						return this.getVisibleRows()[a]
					},
					getRange : function(g, b) {
						if (g > b) {
							var e = g;
							g = b;
							b = e
						}
						var c = [];
						for (var d = g, a = b; d <= a; d++) {
							var f = this.dataview[d];
							c.push(f)
						}
						return c
					},
					selectRange : function(c, a) {
						if (!fui.isNumber(c)) {
							c = this.indexOf(c)
						}
						if (!fui.isNumber(a)) {
							a = this.indexOf(a)
						}
						if (fui.isNull(c) || fui.isNull(a)) {
							return
						}
						var b = this.getRange(c, a);
						this.selects(b)
					},
					toArray : function() {
						return this.source.clone()
					},
					isChanged : function() {
						return this.getChanges().length > 0
					},
					getChanges : function(a, e) {
						var h = [];
						if (a == "removed" || a == null) {
							h.addRange(this._removeds.clone())
						}
						for (var c = 0, b = this.source.length; c < b; c++) {
							var d = this.source[c];
							if (!d._state) {
								continue
							}
							if (d._state == a || a == null) {
								h[h.length] = d
							}
						}
						var m = h;
						if (e) {
							for (var c = 0, b = m.length; c < b; c++) {
								var k = m[c];
								if (k._state == "modified") {
									var j = {};
									j._state = k._state;
									j[this.idField] = k[this.idField];
									for ( var g in k) {
										var f = this.isModified(k, g);
										if (f) {
											j[g] = k[g]
										}
									}
									m[c] = j
								}
							}
						}
						return h
					},
					accept : function() {
						this.beginChange();
						for (var c = 0, b = this.source.length; c < b; c++) {
							var a = this.source[c];
							this.acceptRecord(a)
						}
						this._removeds = [];
						this._originals = {};
						this.endChange()
					},
					reject : function() {
						this.beginChange();
						for (var c = 0, b = this.source.length; c < b; c++) {
							var a = this.source[c];
							this.rejectRecord(a)
						}
						this._removeds = [];
						this._originals = {};
						this.endChange()
					},
					acceptRecord : function(a) {
						if (!a._state) {
							return
						}
						delete this._originals[a[this._originalIdField]];
						if (a._state == "deleted") {
							this.remove(a)
						} else {
							delete a._state;
							delete this._originals[a[this._originalIdField]];
							this._dataChanged()
						}
						this.fire("update", {
							record : a
						})
					},
					rejectRecord : function(a) {
						if (!a._state) {
							return
						}
						if (a._state == "added") {
							this.remove(a)
						} else {
							if (a._state == "modified" || a._state == "deleted") {
								var b = this._getOriginal(a);
								fui.copyTo(a, b);
								delete a._state;
								delete this._originals[a[this._originalIdField]];
								this._dataChanged();
								this.fire("update", {
									record : a
								})
							}
						}
					},
					_doFilter : function() {
						if (!this._filterInfo) {
							this.dataview = this.source;
							return
						}
						var e = this._filterInfo[0], d = this._filterInfo[1];
						var b = [];
						var g = this.source;
						for (var c = 0, a = g.length; c < a; c++) {
							var f = g[c];
							var h = e.call(d, f, c, this);
							if (h !== false) {
								b.push(f)
							}
						}
						this.dataview = b
					},
					_doSort : function() {
						if (!this._sortInfo) {
							return
						}
						var d = this._sortInfo[0], c = this._sortInfo[1], a = this._sortInfo[2];
						var b = this.getDataView().clone();
						fui.sort(b, d, c);
						if (a) {
							b.reverse()
						}
						this.dataview = b
					}
				});
fui.regClass(fui.DataTable, "datatable");
fui.DataTree = function() {
	fui.DataTree.superclass.constructor.call(this)
};
fui
		.extend(
				fui.DataTree,
				fui.DataSource,
				{
					isTree : true,
					expandOnLoad : false,
					idField : "id",
					parentField : "pid",
					nodesField : "children",
					checkedField : "checked",
					resultAsTree : true,
					dataField : "",
					checkModel : "cascade",
					autoCheckParent : false,
					onlyLeafCheckable : false,
					setExpandOnLoad : function(a) {
						this.expandOnLoad = a
					},
					getExpandOnLoad : function() {
						return this.expandOnLoad
					},
					setParentField : function(a) {
						this.parentField = a
					},
					setNodesField : function(b) {
						if (this.nodesField != b) {
							var a = this.root[this.nodesField];
							this.nodesField = b;
							this._doLoadData(a)
						}
					},
					setResultAsTree : function(a) {
						this.resultAsTree = a
					},
					setCheckRecursive : function(a) {
						this.checkModel = a ? "cascade" : "multiple"
					},
					getCheckRecursive : function() {
						return this.checkModel == "cascade"
					},
					setShowFolderCheckBox : function(a) {
						this.onlyLeafCheckable = !a
					},
					getShowFolderCheckBox : function() {
						return !this.onlyLeafCheckable
					},
					_doExpandOnLoad : function(a) {
						var d = this.nodesField;
						var c = this.expandOnLoad;
						function b(f, k) {
							for (var g = 0, e = f.length; g < e; g++) {
								var h = f[g];
								if (fui.isNull(h.expanded)) {
									if (c === true
											|| (fui.isNumber(c) && k <= c)) {
										h.expanded = true
									} else {
										h.expanded = false
									}
								} else {
								}
								var j = h[d];
								if (j) {
									b(j, k + 1)
								}
							}
						}
						b(a, 0)
					},
					_OnBeforeLoad : function(b) {
						var a = this._loadingNode || this.root;
						b.node = a;
						if (this._isNodeLoading()) {
							b.async = true;
							b.isRoot = b.node == this.root;
							if (!b.isRoot) {
								b.data[this.idField] = this
										.getItemValue(b.node)
							}
						}
						this.fire("beforeload", b)
					},
					_OnPreLoad : function(a) {
						if (this.resultAsTree == false) {
							a.data = fui.arrayToTree(a.data, this.nodesField,
									this.idField, this.parentField)
						}
						this.fire("preload", a)
					},
					_init : function() {
						fui.DataTree.superclass._init.call(this);
						this.root = {
							_id : -1,
							_level : -1
						};
						this.source = this.root[this.nodesField] = [];
						this.viewNodes = null;
						this.dataview = null;
						this.visibleRows = null;
						this._ids[this.root._id] = this.root
					},
					_doLoadData : function(e) {
						e = e || [];
						this._doExpandOnLoad(e);
						this.source = this.root[this.nodesField] = e;
						this.viewNodes = null;
						this.dataview = null;
						this.visibleRows = null;
						var b = fui.treeToArray(e, this.nodesField);
						var a = this._ids;
						a[this.root._id] = this.root;
						for (var f = 0, d = b.length; f < d; f++) {
							var c = b[f];
							c._id = fui.DataSource.RecordId++;
							a[c._id] = c;
							c._uid = c._id
						}
						var j = this.checkedField;
						var b = fui.treeToArray(e, this.nodesField, "_id",
								"_pid", this.root._id);
						for (var f = 0, d = b.length; f < d; f++) {
							var c = b[f];
							var g = this.getParentNode(c);
							c._pid = g._id;
							c._level = g._level + 1;
							delete c._state;
							c.checked = c[j];
							if (c.checked) {
								c.checked = c.checked != "false"
							}
							if (this.isLeafNode(c) == false) {
								var h = c[this.nodesField];
								if (h && h.length > 0) {
								}
							}
						}
						this._doUpdateLoadedCheckedNodes()
					},
					_setAdded : function(b) {
						var a = this.getParentNode(b);
						b._id = fui.DataSource.RecordId++;
						if (this._autoCreateNewID && !b[this.idField]) {
							b[this.idField] = UUID()
						}
						b._uid = b._id;
						b._pid = a._id;
						if (a[this.idField]) {
							b[this.parentField] = a[this.idField]
						}
						b._level = a._level + 1;
						b._state = "added";
						this._ids[b._id] = b;
						delete this._originals[b[this._originalIdField]]
					},
					_createNodes : function(b) {
						var a = b[this.nodesField];
						if (!a) {
							a = b[this.nodesField] = []
						}
						if (this.viewNodes && !this.viewNodes[b._id]) {
							this.viewNodes[b._id] = []
						}
						return a
					},
					addNode : function(b, a) {
						if (!b) {
							return
						}
						return this.insertNode(b, -1, a)
					},
					addNodes : function(c, a, f) {
						if (!fui.isArray(c)) {
							return
						}
						if (fui.isNull(f)) {
							f = "add"
						}
						for (var d = 0, b = c.length; d < b; d++) {
							var e = c[d];
							this.insertNode(e, f, a)
						}
					},
					insertNodes : function(d, e, a) {
						if (!fui.isNumber(e)) {
							return
						}
						if (!fui.isArray(d)) {
							return
						}
						if (!a) {
							a = this.root
						}
						this.beginChange();
						var c = this._createNodes(a);
						if (e < 0 || e > c.length) {
							e = c.length
						}
						d = d.clone();
						for (var f = 0, b = d.length; f < b; f++) {
							this.insertNode(d[f], e + f, a)
						}
						this.endChange();
						return d
					},
					removeNode : function(c) {
						var a = this.getParentNode(c);
						if (!a) {
							return
						}
						var b = this.indexOfNode(c);
						return this.removeNodeAt(b, a)
					},
					removeNodes : function(b) {
						if (!fui.isArray(b)) {
							return
						}
						this.beginChange();
						b = b.clone();
						for (var c = 0, a = b.length; c < a; c++) {
							this.removeNode(b[c])
						}
						this.endChange()
					},
					moveNodes : function(b, g, f) {
						if (!b || b.length == 0 || !g || !f) {
							return
						}
						this.beginChange();
						var e = this;
						fui.sort(b, function(i, h) {
							return e.indexOf(i) > e.indexOf(h)
						}, this);
						for (var c = 0, a = b.length; c < a; c++) {
							var d = b[c];
							this.moveNode(d, g, f);
							if (c != 0) {
								g = d;
								f = "after"
							}
						}
						this.endChange()
					},
					moveNode : function(a, h, b) {
						if (!a || !h || fui.isNull(b)) {
							return
						}
						if (this.viewNodes) {
							var d = h;
							var f = b;
							if (f == "before") {
								d = this.getParentNode(h);
								f = this.indexOfNode(h)
							} else {
								if (f == "after") {
									d = this.getParentNode(h);
									f = this.indexOfNode(h) + 1
								} else {
									if (f == "add" || f == "append") {
										if (!d[this.nodesField]) {
											d[this.nodesField] = []
										}
										f = d[this.nodesField].length
									} else {
										if (!fui.isNumber(f)) {
											return
										}
									}
								}
							}
							if (this.isAncestor(a, d)) {
								return false
							}
							var j = this.getChildNodes(d);
							if (f < 0 || f > j.length) {
								f = j.length
							}
							var i = {};
							j.insert(f, i);
							var k = this.getParentNode(a);
							var c = this.getChildNodes(k);
							c.remove(a);
							f = j.indexOf(i);
							j[f] = a
						}
						var d = h;
						var f = b;
						var j = this._createNodes(d);
						if (f == "before") {
							d = this.getParentNode(h);
							j = this._createNodes(d);
							f = j.indexOf(h)
						} else {
							if (f == "after") {
								d = this.getParentNode(h);
								j = this._createNodes(d);
								f = j.indexOf(h) + 1
							} else {
								if (f == "add" || f == "append") {
									f = j.length
								} else {
									if (!fui.isNumber(f)) {
										return
									}
								}
							}
						}
						if (this.isAncestor(a, d)) {
							return false
						}
						if (f < 0 || f > j.length) {
							f = j.length
						}
						var i = {};
						j.insert(f, i);
						var k = this.getParentNode(a);
						k[this.nodesField].remove(a);
						f = j.indexOf(i);
						j[f] = a;
						this._updateParentAndLevel(a, d);
						this._dataChanged();
						var g = {
							parentNode : d,
							index : f,
							node : a
						};
						this.fire("movenode", g)
					},
					insertNode : function(f, d, b) {
						if (!f) {
							return
						}
						if (!b) {
							b = this.root;
							d = "add"
						}
						if (!fui.isNumber(d)) {
							switch (d) {
							case "before":
								d = this.indexOfNode(b);
								b = this.getParentNode(b);
								this.insertNode(f, d, b);
								break;
							case "after":
								d = this.indexOfNode(b);
								b = this.getParentNode(b);
								this.insertNode(f, d + 1, b);
								break;
							case "append":
							case "add":
								this.addNode(f, b);
								break;
							default:
								break
							}
							return
						}
						var a = this._createNodes(b);
						var c = this.getChildNodes(b);
						if (d < 0) {
							d = c.length
						}
						c.insert(d, f);
						d = c.indexOf(f);
						if (this.viewNodes) {
							var i = c[d - 1];
							if (i) {
								var h = a.indexOf(i);
								a.insert(h + 1, f)
							} else {
								a.insert(0, f)
							}
						}
						f._pid = b._id;
						this._setAdded(f);
						this.cascadeChild(f, function(k, e, j) {
							k._pid = j._id;
							this._setAdded(k)
						}, this);
						this._dataChanged();
						var g = {
							parentNode : b,
							index : d,
							node : f
						};
						this.fire("addnode", g);
						return f
					},
					removeNodeAt : function(d, b) {
						if (!b) {
							b = this.root
						}
						var c = this.getChildNodes(b);
						var f = c[d];
						if (!f) {
							return null
						}
						c.removeAt(d);
						if (this.viewNodes) {
							var a = b[this.nodesField];
							a.remove(f)
						}
						this._setRemoved(f);
						this.cascadeChild(f, function(j, e, h) {
							this._setRemoved(j)
						}, this);
						this._checkSelecteds();
						this._dataChanged();
						var g = {
							parentNode : b,
							index : d,
							node : f
						};
						this.fire("removenode", g);
						return f
					},
					bubbleParent : function(d, c, b) {
						b = b || this;
						if (d) {
							c.call(this, d)
						}
						var a = this.getParentNode(d);
						if (a && a != this.root) {
							this.bubbleParent(a, c, b)
						}
					},
					cascadeChild : function(g, f, e) {
						if (!f) {
							return
						}
						if (!g) {
							g = this.root
						}
						var b = g[this.nodesField];
						if (b) {
							b = b.clone();
							for (var d = 0, a = b.length; d < a; d++) {
								var h = b[d];
								if (f.call(e || this, h, d, g) === false) {
									return
								}
								this.cascadeChild(h, f, e)
							}
						}
					},
					eachChild : function(f, e, d) {
						if (!e || !f) {
							return
						}
						var b = f[this.nodesField];
						if (b) {
							var g = b.clone();
							for (var c = 0, a = g.length; c < a; c++) {
								var h = g[c];
								if (e.call(d || this, h, c, f) === false) {
									break
								}
							}
						}
					},
					collapse : function(b, a) {
						if (!b) {
							return
						}
						this.beginChange();
						b.expanded = false;
						if (a) {
							this.eachChild(b, function(d) {
								if (d[this.nodesField] != null) {
									this.collapse(d, a)
								}
							}, this)
						}
						this.endChange();
						var c = {
							node : b
						};
						this.fire("collapse", c)
					},
					expand : function(b, a) {
						if (!b) {
							return
						}
						this.beginChange();
						b.expanded = true;
						if (a) {
							this.eachChild(b, function(d) {
								if (d[this.nodesField] != null) {
									this.expand(d, a)
								}
							}, this)
						}
						this.endChange();
						var c = {
							node : b
						};
						this.fire("expand", c)
					},
					toggle : function(a) {
						if (this.isExpandedNode(a)) {
							this.collapse(a)
						} else {
							this.expand(a)
						}
					},
					expandNode : function(a) {
						this.expand(a)
					},
					collapseNode : function(a) {
						this.collapse(a)
					},
					collapseAll : function() {
						this.collapse(this.root, true)
					},
					expandAll : function() {
						this.expand(this.root, true)
					},
					collapseLevel : function(b, a) {
						this.beginChange();
						this.each(function(d) {
							var c = this.getLevel(d);
							if (b == c) {
								this.collapse(d, a)
							}
						}, this);
						this.endChange()
					},
					expandLevel : function(b, a) {
						this.beginChange();
						this.each(function(d) {
							var c = this.getLevel(d);
							if (b == c) {
								this.expand(d, a)
							}
						}, this);
						this.endChange()
					},
					expandPath : function(d) {
						d = this.getNode(d);
						if (!d) {
							return
						}
						var b = this.getAncestors(d);
						for (var c = 0, a = b.length; c < a; c++) {
							this.expandNode(b[c])
						}
					},
					collapsePath : function(d) {
						d = this.getNode(d);
						if (!d) {
							return
						}
						var b = this.getAncestors(d);
						for (var c = 0, a = b.length; c < a; c++) {
							this.collapseNode(b[c])
						}
					},
					isAncestor : function(a, e) {
						if (a == e) {
							return true
						}
						if (!a || !e) {
							return false
						}
						var c = this.getAncestors(e);
						for (var d = 0, b = c.length; d < b; d++) {
							if (c[d] == a) {
								return true
							}
						}
						return false
					},
					getAncestors : function(c) {
						var b = [];
						while (1) {
							var a = this.getParentNode(c);
							if (!a || a == this.root) {
								break
							}
							b[b.length] = a;
							c = a
						}
						b.reverse();
						return b
					},
					getNode : function(a) {
						return this.getRecord(a)
					},
					getRootNode : function() {
						return this.root
					},
					getParentNode : function(a) {
						if (!a) {
							return null
						}
						return this.getby_id(a._pid)
					},
					getAllChildNodes : function(a) {
						return this.getChildNodes(a, true)
					},
					getChildNodes : function(b, h, j) {
						b = this.getNode(b);
						if (!b) {
							b = this.getRootNode()
						}
						var a = b[this.nodesField];
						if (this.viewNodes && j !== false) {
							a = this.viewNodes[b._id]
						}
						if (h === true && a) {
							var g = [];
							for (var d = 0, c = a.length; d < c; d++) {
								var f = a[d];
								g[g.length] = f;
								var e = this.getChildNodes(f, h, j);
								if (e && e.length > 0) {
									g.addRange(e)
								}
							}
							a = g
						}
						return a || []
					},
					getChildNodeAt : function(b, c) {
						var a = this.getChildNodes(c);
						if (a) {
							return a[b]
						}
						return null
					},
					hasChildNodes : function(b) {
						var a = this.getChildNodes(b);
						return a.length > 0
					},
					getLevel : function(a) {
						return a._level
					},
					_is_true : function(a) {
						return a === true || a === 1 || a === "Y" || a === "y"
					},
					_is_false : function(a) {
						return a === false || a === 0 || a === "N" || a === "n"
					},
					leafField : "isLeaf",
					isLeafNode : function(a) {
						return this.isLeaf(a)
					},
					isLeaf : function(c) {
						var b = c[this.leafField];
						if (!c || this._is_false(b)) {
							return false
						}
						var a = this.getChildNodes(c);
						if (a.length > 0) {
							return false
						}
						return true
					},
					hasChildren : function(b) {
						var a = this.getChildNodes(b);
						return !!(a && a.length > 0)
					},
					isFirstNode : function(b) {
						if (b == this.root) {
							return true
						}
						var a = this.getParentNode(b);
						if (!a) {
							return false
						}
						return this.getFirstNode(a) == b
					},
					isLastNode : function(b) {
						if (b == this.root) {
							return true
						}
						var a = this.getParentNode(b);
						if (!a) {
							return false
						}
						return this.getLastNode(a) == b
					},
					isCheckedNode : function(a) {
						return a.checked === true
					},
					isExpandedNode : function(a) {
						return a.expanded == true || a.expanded == 1
								|| fui.isNull(a.expanded)
					},
					isEnabledNode : function(a) {
						return a.enabled !== false
					},
					isVisibleNode : function(a) {
						if (a.visible == false) {
							return false
						}
						var b = this._ids[a._pid];
						if (!b || b == this.root) {
							return true
						}
						if (b.expanded === false) {
							return false
						}
						return this.isVisibleNode(b)
					},
					getNextNode : function(c) {
						var a = this.getby_id(c._pid);
						if (!a) {
							return null
						}
						var b = this.indexOfNode(c);
						return this.getChildNodes(a)[b + 1]
					},
					getPrevNode : function(c) {
						var a = this.getby_id(c._pid);
						if (!a) {
							return null
						}
						var b = this.indexOfNode(c);
						return this.getChildNodes(a)[b - 1]
					},
					getFirstNode : function(a) {
						return this.getChildNodes(a)[0]
					},
					getLastNode : function(a) {
						var b = this.getChildNodes(a);
						return b[b.length - 1]
					},
					indexOfNode : function(b) {
						var a = this.getby_id(b._pid);
						if (a) {
							return this.getChildNodes(a).indexOf(b)
						}
						return -1
					},
					indexOfList : function(a) {
						return this.getList().indexOf(a)
					},
					getAt : function(a) {
						return this.getVisibleRows()[a]
					},
					indexOf : function(a) {
						return this.getVisibleRows().indexOf(a)
					},
					getRange : function(h, b) {
						if (h > b) {
							var e = h;
							h = b;
							b = e
						}
						var f = this.getChildNodes(this.root, true);
						var c = [];
						for (var d = h, a = b; d <= a; d++) {
							var g = f[d];
							if (g) {
								c.push(g)
							}
						}
						return c
					},
					selectRange : function(d, a) {
						var c = this.getChildNodes(this.root, true);
						if (!fui.isNumber(d)) {
							d = c.indexOf(d)
						}
						if (!fui.isNumber(a)) {
							a = c.indexOf(a)
						}
						if (fui.isNull(d) || fui.isNull(a)) {
							return
						}
						var b = this.getRange(d, a);
						this.selects(b)
					},
					findRecords : function(k, j) {
						var d = this.toArray();
						var g = typeof k == "function";
						var h = k;
						var m = j || this;
						var b = [];
						for (var e = 0, c = d.length; e < c; e++) {
							var a = d[e];
							if (g) {
								var f = h.call(m, a);
								if (f == true) {
									b[b.length] = a
								}
								if (f === 1) {
									break
								}
							} else {
								if (a[k] == j) {
									b[b.length] = a
								}
							}
						}
						return b
					},
					_dataChangedCount : 0,
					_dataChanged : function() {
						this._dataChangedCount++;
						this.dataview = null;
						this.visibleRows = null;
						if (this.__changeCount == 0) {
							this.fire("datachanged")
						}
					},
					_createDataView : function() {
						var a = this.getChildNodes(this.root, true);
						return a
					},
					_createVisibleRows : function() {
						var e = this.getChildNodes(this.root, true);
						var b = [];
						for (var c = 0, a = e.length; c < a; c++) {
							var d = e[c];
							if (this.isVisibleNode(d)) {
								b[b.length] = d
							}
						}
						return b
					},
					getList : function() {
						return fui.treeToList(this.source, this.nodesField)
					},
					getDataView : function() {
						if (!this.dataview) {
							this.dataview = this._createDataView()
						}
						return this.dataview.clone()
					},
					getVisibleRows : function() {
						if (!this.visibleRows) {
							this.visibleRows = this._createVisibleRows()
						}
						return this.visibleRows
					},
					_doFilter : function() {
						if (!this._filterInfo) {
							this.viewNodes = null;
							return
						}
						var d = this._filterInfo[0], c = this._filterInfo[1];
						var a = this.viewNodes = {}, e = this.nodesField;
						function b(k) {
							var g = k[e];
							if (!g) {
								return false
							}
							var h = k._id;
							var o = a[h] = [];
							for (var n = 0, m = g.length; n < m; n++) {
								var f = g[n];
								var j = b(f);
								var p = d.call(c, f, n, this);
								if (p === true || j) {
									o.push(f)
								}
							}
							return o.length > 0
						}
						b(this.root)
					},
					_doSort : function() {
						if (!this._filterInfo && !this._sortInfo) {
							this.viewNodes = null;
							return
						}
						if (!this._sortInfo) {
							return
						}
						var e = this._sortInfo[0], d = this._sortInfo[1], b = this._sortInfo[2];
						var g = this.nodesField;
						if (!this.viewNodes) {
							var a = this.viewNodes = {};
							a[this.root._id] = this.root[g].clone();
							this.cascadeChild(this.root, function(k, j, l) {
								var h = k[g];
								if (h) {
									a[k._id] = h.clone()
								}
							})
						}
						var f = this;
						function c(n) {
							var j = f.getChildNodes(n);
							fui.sort(j, e, d);
							if (b) {
								j.reverse()
							}
							for (var k = 0, h = j.length; k < h; k++) {
								var m = j[k];
								c(m)
							}
						}
						c(this.root)
					},
					toArray : function() {
						if (!this._array
								|| this._dataChangedCount != this._dataChangedCount2) {
							this._dataChangedCount2 = this._dataChangedCount;
							this._array = this.getChildNodes(this.root, true,
									false)
						}
						return this._array
					},
					toTree : function() {
						return this.root[this.nodesField]
					},
					isChanged : function() {
						return this.getChanges().length > 0
					},
					getChanges : function(a, d) {
						var g = [];
						if (a == "removed" || a == null) {
							g.addRange(this._removeds.clone())
						}
						this.cascadeChild(this.root, function(l, m, n) {
							if (l._state == null || l._state == "") {
								return
							}
							if (l._state == a || a == null) {
								g[g.length] = l
							}
						}, this);
						var k = g;
						if (d) {
							for (var c = 0, b = k.length; c < b; c++) {
								var j = k[c];
								if (j._state == "modified") {
									var h = {};
									h[this.idField] = j[this.idField];
									for ( var f in j) {
										var e = this.isModified(j, f);
										if (e) {
											h[f] = j[f]
										}
									}
									k[c] = h
								}
							}
						}
						return g
					},
					accept : function(a) {
						a = a || this.root;
						this.beginChange();
						this.cascadeChild(this.root, function(b) {
							this.acceptRecord(b)
						}, this);
						this._removeds = [];
						this._originals = {};
						this.endChange()
					},
					reject : function(a) {
						this.beginChange();
						this.cascadeChild(this.root, function(b) {
							this.rejectRecord(b)
						}, this);
						this._removeds = [];
						this._originals = {};
						this.endChange()
					},
					acceptRecord : function(a) {
						if (!a._state) {
							return
						}
						delete this._originals[a[this._originalIdField]];
						if (a._state == "deleted") {
							this.removeNode(a)
						} else {
							delete a._state;
							delete this._originals[a[this._originalIdField]];
							this._dataChanged();
							this.fire("update", {
								record : a
							})
						}
					},
					rejectRecord : function(a) {
						if (!a._state) {
							return
						}
						if (a._state == "added") {
							this.removeNode(a)
						} else {
							if (a._state == "modified" || a._state == "deleted") {
								var b = this._getOriginal(a);
								fui.copyTo(a, b);
								delete a._state;
								delete this._originals[a[this._originalIdField]];
								this._dataChanged();
								this.fire("update", {
									record : a
								})
							}
						}
					},
					upGrade : function(b) {
						var e = this.getParentNode(b);
						if (e == this.root || b == this.root) {
							return false
						}
						var c = e[this.nodesField];
						var g = c.indexOf(b);
						var h = b[this.nodesField] ? b[this.nodesField].length
								: 0;
						for (var f = c.length - 1; f >= g; f--) {
							var a = c[f];
							c.removeAt(f);
							if (a != b) {
								if (!b[this.nodesField]) {
									b[this.nodesField] = []
								}
								b[this.nodesField].insert(h, a)
							}
						}
						var d = this.getParentNode(e);
						var j = d[this.nodesField];
						var g = j.indexOf(e);
						j.insert(g + 1, b);
						this._updateParentAndLevel(b, d);
						this._doFilter();
						this._dataChanged()
					},
					downGrade : function(e) {
						if (this.isFirstNode(e)) {
							return false
						}
						var d = this.getParentNode(e);
						var c = d[this.nodesField];
						var b = c.indexOf(e);
						var a = c[b - 1];
						c.removeAt(b);
						if (!a[this.nodesField]) {
							a[this.nodesField] = []
						}
						a[this.nodesField].add(e);
						this._updateParentAndLevel(e, a);
						this._doFilter();
						this._dataChanged()
					},
					_updateParentAndLevel : function(b, a) {
						b._pid = a._id;
						b._level = a._level + 1;
						this.cascadeChild(b, function(e, c, d) {
							e._pid = d._id;
							e._level = d._level + 1;
							e[this.parentField] = d[this.idField]
						}, this);
						this._setModified(b)
					},
					setCheckModel : function(a) {
						this.checkModel = a
					},
					getCheckModel : function() {
						return this.checkModel
					},
					setOnlyLeafCheckable : function(a) {
						this.onlyLeafCheckable = a
					},
					getOnlyLeafCheckable : function() {
						return this.onlyLeafCheckable
					},
					setAutoCheckParent : function(a) {
						this.autoCheckParent = a
					},
					getAutoCheckParent : function() {
						return this.autoCheckParent
					},
					_doUpdateLoadedCheckedNodes : function() {
						var b = this.getAllChildNodes(this.root);
						for (var c = 0, a = b.length; c < a; c++) {
							var d = b[c];
							if (d.checked == true) {
								if (this.autoCheckParent == false
										|| !this.hasChildNodes(d)) {
									this._doUpdateNodeCheckState(d)
								}
							}
						}
					},
					_doUpdateNodeCheckState : function(a) {
						if (!a) {
							return
						}
						var j = this.isChecked(a);
						if (this.checkModel == "cascade"
								|| this.autoCheckParent) {
							this.cascadeChild(a, function(i) {
								this.doCheckNodes(i, j)
							}, this);
							if (!this.autoCheckParent) {
								var k = this.getAncestors(a);
								k.reverse();
								for (var d = 0, b = k.length; d < b; d++) {
									var e = k[d];
									var n = this.getChildNodes(e);
									var o = true;
									for (var m = 0, h = n.length; m < h; m++) {
										var g = n[m];
										if (!this.isCheckedNode(g)) {
											o = false
										}
									}
									if (o) {
										this.doCheckNodes(e, true)
									} else {
										this.doCheckNodes(e, false)
									}
									this.fire("checkchanged", {
										nodes : [ e ],
										_nodes : [ e ]
									})
								}
							}
						}
						var f = this;
						function c(p) {
							var r = f.getChildNodes(p);
							for (var i = 0, q = r.length; i < q; i++) {
								var l = r[i];
								if (f.isCheckedNode(l)) {
									return true
								}
							}
							return false
						}
						if (this.autoCheckParent) {
							var k = this.getAncestors(a);
							k.reverse();
							for (var d = 0, b = k.length; d < b; d++) {
								var e = k[d];
								e.checked = c(e);
								this.fire("checkchanged", {
									nodes : [ e ],
									_nodes : [ e ]
								})
							}
						}
					},
					doCheckNodes : function(b, f, a) {
						if (!b) {
							return
						}
						if (typeof b == "string") {
							b = b.split(",")
						}
						if (!fui.isArray(b)) {
							b = [ b ]
						}
						b = b.clone();
						var g = [];
						f = f !== false;
						if (a === true) {
							if (this.checkModel == "single") {
								this.uncheckAllNodes()
							}
						}
						for (var c = b.length - 1; c >= 0; c--) {
							var e = this.getRecord(b[c]);
							if (!e || (f && e.checked === true)
									|| (!f && e.checked !== true)) {
								if (e) {
									if (a === true) {
										this._doUpdateNodeCheckState(e)
									}
								}
								continue
							}
							e.checked = f;
							g.push(e);
							if (a === true) {
								this._doUpdateNodeCheckState(e)
							}
						}
						var d = this;
						setTimeout(function() {
							d.fire("checkchanged", {
								nodes : b,
								_nodes : g,
								checked : f
							})
						}, 1)
					},
					checkNode : function(b, a) {
						this.doCheckNodes([ b ], true, a !== false)
					},
					uncheckNode : function(b, a) {
						this.doCheckNodes([ b ], false, a !== false)
					},
					checkNodes : function(b, a) {
						if (!fui.isArray(b)) {
							b = []
						}
						this.doCheckNodes(b, true, a !== false)
					},
					uncheckNodes : function(b, a) {
						if (!fui.isArray(b)) {
							b = []
						}
						this.doCheckNodes(b, false, a !== false)
					},
					checkAllNodes : function() {
						var a = this.getList();
						this.doCheckNodes(a, true, false)
					},
					uncheckAllNodes : function() {
						var a = this.getList();
						this.doCheckNodes(a, false, false)
					},
					getCheckedNodes : function(c) {
						if (c === false) {
							c = "leaf"
						}
						var a = [];
						var b = {};
						this.cascadeChild(this.root, function(j) {
							if (j.checked == true) {
								var f = this.isLeafNode(j);
								if (c === true) {
									if (!b[j._id]) {
										b[j._id] = j;
										a.push(j)
									}
									var e = this.getAncestors(j);
									for (var g = 0, d = e.length; g < d; g++) {
										var h = e[g];
										if (!b[h._id]) {
											b[h._id] = h;
											a.push(h)
										}
									}
								} else {
									if (c === "parent") {
										if (!f) {
											if (!b[j._id]) {
												b[j._id] = j;
												a.push(j)
											}
										}
									} else {
										if (c === "leaf") {
											if (f) {
												if (!b[j._id]) {
													b[j._id] = j;
													a.push(j)
												}
											}
										} else {
											if (!b[j._id]) {
												b[j._id] = j;
												a.push(j)
											}
										}
									}
								}
							}
						}, this);
						return a
					},
					getCheckedNodesId : function(d, b) {
						var a = this.getCheckedNodes(d);
						var c = this.getValueAndText(a, b);
						return c[0]
					},
					getCheckedNodesText : function(d, b) {
						var a = this.getCheckedNodes(d);
						var c = this.getValueAndText(a, b);
						return c[1]
					},
					isChecked : function(a) {
						a = this.getRecord(a);
						if (!a) {
							return null
						}
						return a.checked === true || a.checked === 1
					},
					getCheckState : function(d) {
						d = this.getRecord(d);
						if (!d) {
							return null
						}
						if (d.checked === true) {
							return "checked"
						}
						if (!d[this.nodesField]) {
							return "unchecked"
						}
						var c = this.getChildNodes(d, true);
						for (var b = 0, a = c.length; b < a; b++) {
							var d = c[b];
							if (d.checked === true) {
								return "indeterminate"
							}
						}
						return "unchecked"
					},
					getUnCheckableNodes : function() {
						var a = [];
						this.cascadeChild(this.root, function(c) {
							var b = this.getCheckable(c);
							if (b == false) {
								a.push(c)
							}
						}, this);
						return a
					},
					setCheckable : function(b, a) {
						if (!b) {
							return
						}
						if (!fui.isArray(b)) {
							b = [ b ]
						}
						b = b.clone();
						a = !!a;
						for (var c = b.length - 1; c >= 0; c--) {
							var d = this.getRecord(b[c]);
							if (!d) {
								continue
							}
							d.checkable = checked
						}
					},
					getCheckable : function(a) {
						a = this.getRecord(a);
						if (!a) {
							return false
						}
						if (a.checkable === true) {
							return true
						}
						if (a.checkable === false) {
							return false
						}
						return this.isLeafNode(a) ? true
								: !this.onlyLeafCheckable
					},
					showNodeCheckbox : function(b, a) {
					},
					_isNodeLoading : function() {
						return !!this._loadingNode
					},
					loadNode : function(c, a) {
						this._loadingNode = c;
						var f = {
							node : c
						};
						this.fire("beforeloadnode", f);
						var d = new Date();
						var b = this;
						b._doLoadAjax(b.loadParams, null, null, null, function(
								h) {
							var g = new Date() - d;
							if (g < 60) {
								g = 60 - g
							}
							setTimeout(function() {
								h.node = c;
								b._OnPreLoad(h);
								h.node = b._loadingNode;
								b._loadingNode = null;
								var i = c[b.nodesField];
								b.removeNodes(i);
								var e = h.data;
								if (e && e.length > 0) {
									b.addNodes(e, c);
									if (a !== false) {
										b.expand(c, true)
									} else {
										b.collapse(c, true)
									}
								} else {
									delete c[b.leafField];
									b.expand(c, true)
								}
								b.fire("loadnode", h);
								b.fire("load", h)
							}, g)
						}, true)
					}
				});
fui.regClass(fui.DataTree, "datatree");
fui._DataTableApplys = {
	idField : "id",
	textField : "text",
	setAjaxData : function(a) {
		this._dataSource.ajaxData = a
	},
	getby_id : function(a) {
		return this._dataSource.getby_id(a)
	},
	getValueAndText : function(b, a) {
		return this._dataSource.getValueAndText(b, a)
	},
	setIdField : function(a) {
		this._dataSource.setIdField(a);
		this.idField = a
	},
	getIdField : function() {
		return this._dataSource.idField
	},
	setTextField : function(a) {
		this._dataSource.setTextField(a);
		this.textField = a
	},
	getTextField : function() {
		return this._dataSource.textField
	},
	clearData : function() {
		this._dataSource.clearData()
	},
	loadData : function(a) {
		this._dataSource.loadData(a)
	},
	setData : function(a) {
		this._dataSource.loadData(a)
	},
	getData : function() {
		return this._dataSource.getSource().clone()
	},
	getList : function() {
		return this._dataSource.getList()
	},
	getDataView : function() {
		return this._dataSource.getDataView()
	},
	getVisibleRows : function() {
		if (this._useEmptyView) {
			return []
		}
		return this._dataSource.getVisibleRows()
	},
	toArray : function() {
		return this._dataSource.toArray()
	},
	getRecord : function(a) {
		return this._dataSource.getRecord(a)
	},
	getRow : function(a) {
		return this._dataSource.getRow(a)
	},
	getRange : function(b, a) {
		if (fui.isNull(b) || fui.isNull(a)) {
			return
		}
		return this._dataSource.getRange(b, a)
	},
	getAt : function(a) {
		return this._dataSource.getAt(a)
	},
	indexOf : function(a) {
		return this._dataSource.indexOf(a)
	},
	getRowByUID : function(a) {
		return this._dataSource.getby_id(a)
	},
	getRowById : function(a) {
		return this._dataSource.getbyId(a)
	},
	clearRows : function() {
		this._dataSource.clearData()
	},
	updateRow : function(a, c, b) {
		this._dataSource.updateRecord(a, c, b)
	},
	addRow : function(a, b) {
		return this._dataSource.insert(b, a)
	},
	removeRow : function(a, b) {
		return this._dataSource.remove(a, b)
	},
	removeRows : function(a, b) {
		return this._dataSource.removeRange(a, b)
	},
	removeRowAt : function(b, a) {
		return this._dataSource.removeAt(b, a)
	},
	moveRow : function(b, a) {
		this._dataSource.move(b, a)
	},
	addRows : function(a, b) {
		return this._dataSource.insertRange(b, a)
	},
	findRows : function(b, a) {
		return this._dataSource.findRecords(b, a)
	},
	findRow : function(b, a) {
		return this._dataSource.findRecord(b, a)
	},
	multiSelect : false,
	setMultiSelect : function(a) {
		this._dataSource.setMultiSelect(a);
		this.multiSelect = a
	},
	getMultiSelect : function() {
		return this._dataSource.getMultiSelect()
	},
	setCurrent : function(a) {
		this._dataSource.setCurrent(a)
	},
	getCurrent : function() {
		return this._dataSource.getCurrent()
	},
	isSelected : function(a) {
		return this._dataSource.isSelected(a)
	},
	setSelected : function(a) {
		this._dataSource.setSelected(a)
	},
	getSelected : function() {
		return this._dataSource.getSelected()
	},
	getSelecteds : function() {
		return this._dataSource.getSelecteds()
	},
	select : function(a) {
		this._dataSource.select(a)
	},
	selects : function(a) {
		this._dataSource.selects(a)
	},
	deselect : function(a) {
		this._dataSource.deselect(a)
	},
	deselects : function(a) {
		this._dataSource.deselects(a)
	},
	selectAll : function() {
		this._dataSource.selectAll()
	},
	deselectAll : function() {
		this._dataSource.deselectAll()
	},
	clearSelect : function() {
		this.deselectAll()
	},
	selectPrev : function() {
		this._dataSource.selectPrev()
	},
	selectNext : function() {
		this._dataSource.selectNext()
	},
	selectFirst : function() {
		this._dataSource.selectFirst()
	},
	selectLast : function() {
		this._dataSource.selectLast()
	},
	selectRange : function(b, a) {
		this._dataSource.selectRange(b, a)
	},
	filter : function(b, a) {
		this._dataSource.filter(b, a)
	},
	clearFilter : function() {
		this._dataSource.clearFilter()
	},
	sort : function(b, a) {
		this._dataSource.sort(b, a)
	},
	clearSort : function() {
		this._dataSource.clearSort()
	},
	getResultObject : function() {
		return this._dataSource._resultObject || {}
	},
	isChanged : function() {
		return this._dataSource.isChanged()
	},
	getChanges : function(b, a) {
		return this._dataSource.getChanges(b, a)
	},
	accept : function() {
		this._dataSource.accept()
	},
	reject : function() {
		this._dataSource.reject()
	},
	acceptRecord : function(a) {
		this._dataSource.acceptRecord(a)
	},
	rejectRecord : function(a) {
		this._dataSource.rejectRecord(a)
	}
};
fui._DataTreeApplys = {
	addRow : null,
	removeRow : null,
	removeRows : null,
	removeRowAt : null,
	moveRow : null,
	setExpandOnLoad : function(a) {
		this._dataSource.setExpandOnLoad(a)
	},
	getExpandOnLoad : function() {
		return this._dataSource.getExpandOnLoad()
	},
	selectNode : function(a) {
		if (a) {
			this._dataSource.select(a)
		} else {
			this._dataSource.deselect(this.getSelectedNode())
		}
	},
	getSelectedNode : function() {
		return this.getSelected()
	},
	getSelectedNodes : function() {
		return this.getSelecteds()
	},
	updateNode : function(a, c, b) {
		this._dataSource.updateRecord(a, c, b)
	},
	addNode : function(b, c, a) {
		return this._dataSource.insertNode(b, c, a)
	},
	removeNodeAt : function(b, a) {
		return this._dataSource.removeNodeAt(b, a);
		this._changed = true
	},
	removeNode : function(a) {
		return this._dataSource.removeNode(a)
	},
	moveNode : function(a, b, c) {
		this._dataSource.moveNode(a, b, c)
	},
	addNodes : function(b, a, c) {
		return this._dataSource.addNodes(b, a, c)
	},
	insertNodes : function(b, c, a) {
		return this._dataSource.insertNodes(c, b, a)
	},
	moveNodes : function(a, c, b) {
		this._dataSource.moveNodes(a, c, b)
	},
	removeNodes : function(a) {
		return this._dataSource.removeNodes(a)
	},
	expandOnLoad : false,
	checkRecursive : true,
	autoCheckParent : false,
	showFolderCheckBox : true,
	idField : "id",
	textField : "text",
	parentField : "pid",
	nodesField : "children",
	checkedField : "checked",
	leafField : "isLeaf",
	resultAsTree : true,
	setShowFolderCheckBox : function(a) {
		this._dataSource.setShowFolderCheckBox(a);
		if (this.doUpdate) {
			this.doUpdate()
		}
		this.showFolderCheckBox = a
	},
	getShowFolderCheckBox : function() {
		return this._dataSource.getShowFolderCheckBox()
	},
	setCheckRecursive : function(a) {
		this._dataSource.setCheckRecursive(a);
		this.checkRecursive = a
	},
	getCheckRecursive : function() {
		return this._dataSource.getCheckRecursive()
	},
	setResultAsTree : function(a) {
		this._dataSource.setResultAsTree(a)
	},
	getResultAsTree : function(a) {
		return this._dataSource.resultAsTree
	},
	setParentField : function(a) {
		this._dataSource.setParentField(a);
		this.parentField = a
	},
	getParentField : function() {
		return this._dataSource.parentField
	},
	setLeafField : function(a) {
		this._dataSource.leafField = a;
		this.leafField = a
	},
	getLeafField : function() {
		return this._dataSource.leafField
	},
	setNodesField : function(a) {
		this._dataSource.setNodesField(a);
		this.nodesField = a
	},
	getNodesField : function() {
		return this._dataSource.nodesField
	},
	setCheckedField : function(a) {
		this._dataSource.checkedField = a;
		this.checkedField = a
	},
	getCheckedField : function() {
		return this.checkedField
	},
	findNodes : function(b, a) {
		return this._dataSource.findRecords(b, a)
	},
	getLevel : function(a) {
		return this._dataSource.getLevel(a)
	},
	isVisibleNode : function(a) {
		return this._dataSource.isVisibleNode(a)
	},
	isEnabledNode : function(a) {
		return this._dataSource.isEnabledNode(a)
	},
	isExpandedNode : function(a) {
		return this._dataSource.isExpandedNode(a)
	},
	isCheckedNode : function(a) {
		return this._dataSource.isCheckedNode(a)
	},
	isLeaf : function(a) {
		return this._dataSource.isLeafNode(a)
	},
	hasChildren : function(a) {
		return this._dataSource.hasChildren(a)
	},
	isAncestor : function(b, a) {
		return this._dataSource.isAncestor(b, a)
	},
	getNode : function(a) {
		return this._dataSource.getRecord(a)
	},
	getRootNode : function() {
		return this._dataSource.getRootNode()
	},
	getParentNode : function(a) {
		return this._dataSource.getParentNode
				.apply(this._dataSource, arguments)
	},
	getAncestors : function(a) {
		return this._dataSource.getAncestors(a)
	},
	getAllChildNodes : function(a) {
		return this._dataSource.getAllChildNodes.apply(this._dataSource,
				arguments)
	},
	getChildNodes : function(b, a) {
		return this._dataSource.getChildNodes
				.apply(this._dataSource, arguments)
	},
	getChildNodeAt : function(a, b) {
		return this._dataSource.getChildNodeAt.apply(this._dataSource,
				arguments)
	},
	indexOfNode : function(a) {
		return this._dataSource.indexOfNode.apply(this._dataSource, arguments)
	},
	hasChildNodes : function(a) {
		return this._dataSource.hasChildNodes
				.apply(this._dataSource, arguments)
	},
	isFirstNode : function(a) {
		return this._dataSource.isFirstNode.apply(this._dataSource, arguments)
	},
	isLastNode : function(a) {
		return this._dataSource.isLastNode.apply(this._dataSource, arguments)
	},
	getNextNode : function(a) {
		return this._dataSource.getNextNode.apply(this._dataSource, arguments)
	},
	getPrevNode : function(a) {
		return this._dataSource.getPrevNode.apply(this._dataSource, arguments)
	},
	getFirstNode : function(a) {
		return this._dataSource.getFirstNode.apply(this._dataSource, arguments)
	},
	getLastNode : function(a) {
		return this._dataSource.getLastNode.apply(this._dataSource, arguments)
	},
	toggleNode : function(a) {
		this._dataSource.toggle(a)
	},
	collapseNode : function(b, a) {
		this._dataSource.collapse(b, a)
	},
	expandNode : function(b, a) {
		this._dataSource.expand(b, a)
	},
	collapseAll : function() {
		this.useAnimation = false;
		this._dataSource.collapseAll();
		this.useAnimation = true
	},
	expandAll : function() {
		this.useAnimation = false;
		this._dataSource.expandAll();
		this.useAnimation = true
	},
	expandLevel : function(a) {
		this.useAnimation = false;
		this._dataSource.expandLevel(a);
		this.useAnimation = true
	},
	collapseLevel : function(a) {
		this.useAnimation = false;
		this._dataSource.collapseLevel(a);
		this.useAnimation = true
	},
	expandPath : function(a) {
		this.useAnimation = false;
		this._dataSource.expandPath(a);
		this.useAnimation = true
	},
	collapsePath : function(a) {
		this.useAnimation = false;
		this._dataSource.collapsePath(a);
		this.useAnimation = true
	},
	loadNode : function(b, a) {
		this._dataSource.loadNode(b, a)
	},
	setCheckModel : function(a) {
		this._dataSource.setCheckModel(a)
	},
	getCheckModel : function() {
		return this._dataSource.getCheckModel()
	},
	setOnlyLeafCheckable : function(a) {
		this._dataSource.setOnlyLeafCheckable(a)
	},
	getOnlyLeafCheckable : function() {
		return this._dataSource.getOnlyLeafCheckable()
	},
	setAutoCheckParent : function(a) {
		this._dataSource.setAutoCheckParent(a)
	},
	getAutoCheckParent : function() {
		return this._dataSource.getAutoCheckParent()
	},
	checkNode : function(b, a) {
		this._dataSource.checkNode(b, a)
	},
	uncheckNode : function(b, a) {
		this._dataSource.uncheckNode(b, a)
	},
	checkNodes : function(b, a) {
		this._dataSource.checkNodes(b, a)
	},
	uncheckNodes : function(b, a) {
		this._dataSource.uncheckNodes(b, a)
	},
	checkAllNodes : function() {
		this._dataSource.checkAllNodes()
	},
	uncheckAllNodes : function() {
		this._dataSource.uncheckAllNodes()
	},
	getCheckedNodes : function() {
		return this._dataSource.getCheckedNodes.apply(this._dataSource,
				arguments)
	},
	getCheckedNodesId : function() {
		return this._dataSource.getCheckedNodesId.apply(this._dataSource,
				arguments)
	},
	getCheckedNodesText : function() {
		return this._dataSource.getCheckedNodesText.apply(this._dataSource,
				arguments)
	},
	getNodesByValue : function(f) {
		if (fui.isNull(f)) {
			f = ""
		}
		f = String(f);
		var b = [];
		var d = String(f).split(",");
		for (var c = 0, a = d.length; c < a; c++) {
			var e = this.getNode(d[c]);
			if (e) {
				b.push(e)
			}
		}
		return b
	},
	isChecked : function(a) {
		return this._dataSource.isChecked.apply(this._dataSource, arguments)
	},
	getCheckState : function(a) {
		return this._dataSource.getCheckState
				.apply(this._dataSource, arguments)
	},
	setCheckable : function(b, a) {
		this._dataSource.setCheckable.apply(this._dataSource, arguments)
	},
	getCheckable : function(a) {
		return this._dataSource.getCheckable.apply(this._dataSource, arguments)
	},
	bubbleParent : function(c, b, a) {
		this._dataSource.bubbleParent.apply(this._dataSource, arguments)
	},
	cascadeChild : function(c, b, a) {
		this._dataSource.cascadeChild.apply(this._dataSource, arguments)
	},
	eachChild : function(c, b, a) {
		this._dataSource.eachChild.apply(this._dataSource, arguments)
	}
};
fui.ColumnModel = function(a) {
	this.owner = a;
	fui.ColumnModel.superclass.constructor.call(this);
	this._init()
};
fui.ColumnModel_ColumnID = 1;
fui
		.extend(
				fui.ColumnModel,
				fui.Component,
				{
					_defaultColumnWidth : 100,
					_init : function() {
						this.columns = [];
						this._columnsRow = [];
						this._visibleColumnsRow = [];
						this._bottomColumns = [];
						this._visibleColumns = [];
						this._idColumns = {};
						this._nameColumns = {};
						this._fieldColumns = {}
					},
					getColumns : function() {
						return this.columns
					},
					getAllColumns : function() {
						var a = [];
						for ( var c in this._idColumns) {
							var b = this._idColumns[c];
							a.push(b)
						}
						return a
					},
					getColumnsRow : function() {
						return this._columnsRow
					},
					getVisibleColumnsRow : function() {
						return this._visibleColumnsRow
					},
					getBottomColumns : function() {
						return this._bottomColumns
					},
					getVisibleColumns : function() {
						return this._visibleColumns
					},
					_getBottomColumnsByColumn : function(f) {
						f = this.getColumn(f);
						var d = this._bottomColumns;
						var e = [];
						for (var b = 0, a = d.length; b < a; b++) {
							var g = d[b];
							if (this.isAncestorColumn(f, g)) {
								e.push(g)
							}
						}
						return e
					},
					_getVisibleColumnsByColumn : function(f) {
						f = this.getColumn(f);
						var d = this._visibleColumns;
						var e = [];
						for (var b = 0, a = d.length; b < a; b++) {
							var g = d[b];
							if (this.isAncestorColumn(f, g)) {
								e.push(g)
							}
						}
						return e
					},
					setColumns : function(a) {
						if (!fui.isArray(a)) {
							a = []
						}
						this._init();
						this.columns = a;
						this._columnsChanged()
					},
					_columnsChanged : function() {
						this._updateColumnsView();
						this.fire("columnschanged")
					},
					_updateColumnsView : function() {
						this._maxColumnLevel = 0;
						var level = 0;
						function init(column, index, parentColumn) {
							if (column.type) {
								if (!fui.isNull(column.header)
										&& typeof column.header !== "function") {
									if (column.header.trim() == "") {
										delete column.header
									}
								}
								var col = fui._getColumn(column.type);
								if (col) {
									var _column = fui.copyTo({}, column);
									fui.copyTo(column, col);
									fui.copyTo(column, _column)
								}
							}
							column._id = fui.ColumnModel_ColumnID++;
							column._pid = parentColumn == this ? -1
									: parentColumn._id;
							this._idColumns[column._id] = column;
							if (column.name) {
								this._nameColumns[column.name] = column
							}
							column._level = level;
							level += 1;
							this.eachColumns(column, init, this);
							level -= 1;
							if (column._level > this._maxColumnLevel) {
								this._maxColumnLevel = column._level
							}
							var width = parseInt(column.width);
							if (fui.isNumber(width)
									&& String(width) == column.width) {
								column.width = width + "px"
							}
							if (fui.isNull(column.width)) {
								column.width = this._defaultColumnWidth + "px"
							}
							column.visible = column.visible !== false;
							column.allowResize = column.allowResize !== false;
							column.allowMove = column.allowMove !== false;
							column.allowSort = column.allowSort === true;
							column.allowDrag = !!column.allowDrag;
							column.readOnly = !!column.readOnly;
							column.autoEscape = !!column.autoEscape;
							column.enabled = column.enabled !== false;
							column.vtype = column.vtype || "";
							if (typeof column.filter == "string") {
								column.filter = eval("(" + column.filter + ")")
							}
							if (column.filter && !column.filter.el) {
								column.filter = fui.create(column.filter)
							}
							if (typeof column.init == "function"
									&& column.inited != true) {
								column.init(this.owner)
							}
							column.inited = true;
							column._gridUID = this.owner.uid;
							column._rowIdField = this.owner._rowIdField
						}
						this.eachColumns(this, init, this);
						this._createColumnsRow();
						var index = 0;
						var view = this._visibleColumns = [];
						var bottoms = this._bottomColumns = [];
						this.cascadeColumns(this, function(column) {
							if (!column.columns || column.columns.length == 0) {
								bottoms.push(column);
								if (this.isVisibleColumn(column)) {
									view.push(column);
									column._index = index++
								}
							}
						}, this);
						this._fieldColumns = {};
						var columns = this.getAllColumns();
						for (var i = 0, l = columns.length; i < l; i++) {
							var column = columns[i];
							if (column.field
									&& !this._fieldColumns[column.field]) {
								this._fieldColumns[column.field] = column
							}
						}
						this._createFrozenColSpan()
					},
					_frozenStartColumn : -1,
					_frozenEndColumn : -1,
					isFrozen : function() {
						return this._frozenStartColumn >= 0
								&& this._frozenEndColumn >= this._frozenStartColumn
					},
					isFrozenColumn : function(b) {
						if (!this.isFrozen()) {
							return false
						}
						b = this.getColumn(b);
						if (!b) {
							return false
						}
						var a = this.getVisibleColumns().indexOf(b);
						return this._frozenStartColumn <= a
								&& a <= this._frozenEndColumn
					},
					frozen : function(b, c) {
						b = this.getColumn(b);
						c = this.getColumn(c);
						var a = this.getVisibleColumns();
						this._frozenStartColumn = a.indexOf(b);
						this._frozenEndColumn = a.indexOf(c);
						if (b && c) {
							this._columnsChanged()
						}
					},
					unFrozen : function() {
						this._frozenStartColumn = -1;
						this._frozenEndColumn = -1;
						this._columnsChanged()
					},
					setFrozenStartColumn : function(a) {
						this.frozen(a, this._frozenEndColumn)
					},
					setFrozenEndColumn : function(a) {
						this.frozen(this._frozenStartColumn, a)
					},
					getFrozenColumns : function() {
						var c = [], d = this.isFrozen();
						for (var b = 0, a = this._visibleColumns.length; b < a; b++) {
							if (d && this._frozenStartColumn <= b
									&& b <= this._frozenEndColumn) {
								c.push(this._visibleColumns[b])
							}
						}
						return c
					},
					getUnFrozenColumns : function() {
						var c = [], d = this.isFrozen();
						for (var b = 0, a = this._visibleColumns.length; b < a; b++) {
							if ((d && b > this._frozenEndColumn) || !d) {
								c.push(this._visibleColumns[b])
							}
						}
						return c
					},
					getFrozenColumnsRow : function() {
						return this.isFrozen() ? this._columnsRow1 : []
					},
					getUnFrozenColumnsRow : function() {
						return this.isFrozen() ? this._columnsRow2 : this
								.getVisibleColumnsRow()
					},
					_createFrozenColSpan : function() {
						var s = this;
						var u = this.getVisibleColumns();
						var a = this._frozenStartColumn, h = this._frozenEndColumn;
						function t(z, w) {
							var y = s.isBottomColumn(z) ? [ z ] : s
									._getVisibleColumnsByColumn(z);
							for (var x = 0, j = y.length; x < j; x++) {
								var A = y[x];
								var k = u.indexOf(A);
								if (w == 0 && k < a) {
									return true
								}
								if (w == 1 && a <= k && k <= h) {
									return true
								}
								if (w == 2 && k > h) {
									return true
								}
							}
							return false
						}
						function b(x, w) {
							var j = fui.treeToList(x.columns, "columns");
							var z = 0;
							for (var y = 0, k = j.length; y < k; y++) {
								var A = j[y];
								if (s.isVisibleColumn(A) == false
										|| t(A, w) == false) {
									continue
								}
								if (!A.columns || A.columns.length == 0) {
									z += 1
								}
							}
							return z
						}
						var o = fui.treeToList(this.columns, "columns");
						for (var n = 0, f = o.length; n < f; n++) {
							var e = o[n];
							delete e.colspan0;
							delete e.colspan1;
							delete e.colspan2;
							delete e.viewIndex0;
							delete e.viewIndex1;
							delete e.viewIndex2;
							if (this.isFrozen()) {
								if (e.columns && e.columns.length > 0) {
									e.colspan1 = b(e, 1);
									e.colspan2 = b(e, 2);
									e.colspan0 = b(e, 0)
								} else {
									e.colspan1 = 1;
									e.colspan2 = 1;
									e.colspan0 = 1
								}
								if (t(e, 0)) {
									e["viewIndex" + 0] = true
								}
								if (t(e, 1)) {
									e["viewIndex" + 1] = true
								}
								if (t(e, 2)) {
									e["viewIndex" + 2] = true
								}
							}
						}
						var v = this._getMaxColumnLevel();
						this._columnsRow1 = [];
						this._columnsRow2 = [];
						for (var n = 0, f = this._visibleColumnsRow.length; n < f; n++) {
							var d = this._visibleColumnsRow[n];
							var r = [];
							var p = [];
							this._columnsRow1.push(r);
							this._columnsRow2.push(p);
							for (var m = 0, g = d.length; m < g; m++) {
								var q = d[m];
								if (q.viewIndex1) {
									r.push(q)
								}
								if (q.viewIndex2) {
									p.push(q)
								}
							}
						}
					},
					_createColumnsRow : function() {
						var m = this._getMaxColumnLevel();
						var k = [];
						var a = [];
						for (var e = 0, d = m; e <= d; e++) {
							k.push([]);
							a.push([])
						}
						var h = this;
						function b(p) {
							var n = fui.treeToList(p.columns, "columns");
							var r = 0;
							for (var q = 0, o = n.length; q < o; q++) {
								var s = n[q];
								if (h.isVisibleColumn(s) == false) {
									continue
								}
								if (!s.columns || s.columns.length == 0) {
									r += 1
								}
							}
							return r
						}
						var g = fui.treeToList(this.columns, "columns");
						for (var e = 0, d = g.length; e < d; e++) {
							var c = g[e];
							var j = k[c._level];
							var f = a[c._level];
							delete c.rowspan;
							delete c.colspan;
							if (c.columns && c.columns.length > 0) {
								c.colspan = b(c)
							}
							if ((!c.columns || c.columns.length == 0)
									&& c._level < m) {
								c.rowspan = m - c._level + 1
							}
							j.push(c);
							if (this.isVisibleColumn(c)) {
								f.push(c)
							}
						}
						this._columnsRow = k;
						this._visibleColumnsRow = a
					},
					_getMaxColumnLevel : function() {
						return this._maxColumnLevel
					},
					cascadeColumns : function(g, f, e) {
						if (!f) {
							return
						}
						var b = g.columns;
						if (b) {
							b = b.clone();
							for (var d = 0, a = b.length; d < a; d++) {
								var h = b[d];
								if (f.call(e || this, h, d, g) === false) {
									return
								}
								this.cascadeColumns(h, f, e)
							}
						}
					},
					eachColumns : function(f, e, d) {
						var c = f.columns;
						if (c) {
							var g = c.clone();
							for (var b = 0, a = g.length; b < a; b++) {
								var h = g[b];
								if (e.call(d, h, b, f) === false) {
									break
								}
							}
						}
					},
					getColumn : function(a) {
						var b = typeof a;
						if (b == "number") {
							return this._bottomColumns[a]
						} else {
							if (b == "object") {
								return a
							} else {
								return this._nameColumns[a]
							}
						}
					},
					getColumnByField : function(a) {
						if (!a) {
							return null
						}
						return this._fieldColumns[a]
					},
					_getColumnById : function(a) {
						return this._idColumns[a]
					},
					_getDataTypeByField : function(e) {
						var f = "string";
						var c = this.getBottomColumns();
						for (var b = 0, a = c.length; b < a; b++) {
							var d = c[b];
							if (d.field == e) {
								if (d.dataType) {
									f = d.dataType.toLowerCase()
								}
								break
							}
						}
						return f
					},
					getParentColumn : function(b) {
						b = this.getColumn(b);
						var a = b._pid;
						if (a == -1) {
							return this
						}
						return this._idColumns[a]
					},
					getAncestorColumns : function(c) {
						var b = [ c ];
						while (1) {
							var a = this.getParentColumn(c);
							if (!a || a == this) {
								break
							}
							b[b.length] = a;
							c = a
						}
						b.reverse();
						return b
					},
					isAncestorColumn : function(a, e) {
						if (a == e) {
							return true
						}
						if (!a || !e) {
							return false
						}
						var c = this.getAncestorColumns(e);
						for (var d = 0, b = c.length; d < b; d++) {
							if (c[d] == a) {
								return true
							}
						}
						return false
					},
					isVisibleColumn : function(f) {
						f = this.getColumn(f);
						if (f.visible == false) {
							return false
						}
						var e = this.getAncestorColumns(f);
						for (var d = 0, a = e.length; d < a; d++) {
							if (e[d].visible == false) {
								return false
							}
						}
						var b = f.columns;
						if (b) {
							var c = true;
							for (var d = 0, a = b.length; d < a; d++) {
								var g = b[d];
								if (this.isVisibleColumn(g)) {
									c = false;
									break
								}
							}
							if (c) {
								return false
							}
						}
						return true
					},
					isBottomColumn : function(a) {
						a = this.getColumn(a);
						return !(a.columns && a.columns.length > 0)
					},
					updateColumn : function(b, a) {
						b = this.getColumn(b);
						if (!b) {
							return
						}
						fui.copyTo(b, a);
						this._columnsChanged()
					},
					moveColumn : function(d, c, e) {
						d = this.getColumn(d);
						c = this.getColumn(c);
						if (!d || !c || !e || d == c) {
							return
						}
						if (this.isAncestorColumn(d, c)) {
							return
						}
						var a = this.getParentColumn(d);
						if (a) {
							a.columns.remove(d)
						}
						var f = c;
						var b = e;
						if (b == "before") {
							f = this.getParentColumn(c);
							b = f.columns.indexOf(c)
						} else {
							if (b == "after") {
								f = this.getParentColumn(c);
								b = f.columns.indexOf(c) + 1
							} else {
								if (b == "add" || b == "append") {
									if (!f.columns) {
										f.columns = []
									}
									b = f.columns.length
								} else {
									if (!fui.isNumber(b)) {
										return
									}
								}
							}
						}
						f.columns.insert(b, d);
						this._columnsChanged()
					},
					addColumn : function() {
						this._columnsChanged()
					},
					removeColumn : function() {
						this._columnsChanged()
					}
				});
fui.GridView = function() {
	this._createTime = new Date();
	this._createColumnModel();
	this._bindColumnModel();
	this.data = [];
	this._createSource();
	this._bindSource();
	this._initData();
	fui.GridView.superclass.constructor.call(this);
	this._doUpdateFilterRow();
	this._doUpdateSummaryRow();
	this.doUpdate()
};
fui
		.extend(
				fui.GridView,
				fui.Panel,
				{
					_displayStyle : "block",
					_rowIdField : "_id",
					width : "100%",
					showColumns : true,
					showFilterRow : false,
					showSummaryRow : false,
					showPager : false,
					allowCellWrap : false,
					allowHeaderWrap : false,
					showModified : true,
					showNewRow : true,
					showEmptyText : false,
					emptyText : "No data returned.",
					showHGridLines : true,
					showVGridLines : true,
					allowAlternating : false,
					_alternatingCls : "fui-grid-row-alt",
					_rowCls : "fui-grid-row",
					_cellCls : "fui-grid-cell",
					_headerCellCls : "fui-grid-headerCell",
					_rowSelectedCls : "fui-grid-row-selected",
					_rowHoverCls : "fui-grid-row-hover",
					_cellSelectedCls : "fui-grid-cell-selected",
					defaultRowHeight : 21,
					fixedRowHeight : false,
					isFixedRowHeight : function() {
						return this.fixedRowHeight
					},
					fitColumns : true,
					isFitColumns : function() {
						return this.fitColumns
					},
					uiCls : "fui-gridview",
					_create : function() {
						fui.GridView.superclass._create.call(this);
						var f = this.el;
						fui.addClass(f, "fui-grid");
						fui.addClass(this._borderEl, "fui-grid-border");
						fui.addClass(this._viewportEl, "fui-grid-viewport");
						var a = '<div class="fui-grid-pager"></div>';
						var e = '<div class="fui-grid-filterRow"><div class="fui-grid-filterRow-view"></div><div class="fui-grid-scrollHeaderCell"></div></div>';
						var b = '<div class="fui-grid-summaryRow"><div class="fui-grid-summaryRow-view"></div><div class="fui-grid-scrollHeaderCell"></div></div>';
						var c = '<div class="fui-grid-columns"><div class="fui-grid-columns-view"></div><div class="fui-grid-scrollHeaderCell"></div></div>';
						this._columnsEl = fui.after(this._toolbarEl, c);
						this._filterEl = fui.after(this._columnsEl, e);
						this._rowsEl = this._bodyEl;
						fui.addClass(this._rowsEl, "fui-grid-rows");
						this._summaryEl = fui.after(this._rowsEl, b);
						this._bottomPagerEl = fui.after(this._summaryEl, a);
						this._columnsViewEl = this._columnsEl.childNodes[0];
						this._topRightCellEl = this._columnsEl.childNodes[1];
						this._rowsViewEl = fui
								.append(
										this._rowsEl,
										'<div class="fui-grid-rows-view"><div class="fui-grid-rows-content"></div></div>');
						this._rowsViewContentEl = this._rowsViewEl.firstChild;
						this._filterViewEl = this._filterEl.childNodes[0];
						this._summaryViewEl = this._summaryEl.childNodes[0];
						var d = '<a href="#" class="fui-grid-focus" style="position:absolute;left:0px;top:0px;width:0px;height:0px;outline:none;" hideFocus onclick="return false" ></a>';
						this._focusEl = fui.append(this._borderEl, d)
					},
					_initEvents : function() {
						fui.GridView.superclass._initEvents.call(this);
						fui.on(this._rowsViewEl, "scroll",
								this.__OnRowViewScroll, this)
					},
					_setBodyWidth : false,
					doLayout : function() {
						if (!this.canLayout()) {
							return
						}
						fui.GridView.superclass.doLayout.call(this);
						this._stopLayout();
						var c = this.isAutoHeight();
						var g = this._columnsViewEl.firstChild;
						var b = this._rowsViewContentEl.firstChild;
						var f = this._filterViewEl.firstChild;
						var a = this._summaryViewEl.firstChild;
						function e(h) {
							if (this.isFitColumns()) {
								b.style.width = "100%";
								if (fui.isChrome || fui.isIE6) {
									h.style.width = b.offsetWidth + "px"
								} else {
									if (this._rowsViewEl.scrollHeight > this._rowsViewEl.clientHeight) {
										h.style.width = "100%";
										h.parentNode.style.width = "auto";
										h.parentNode.style.paddingRight = "17px"
									} else {
										h.style.width = "100%";
										h.parentNode.style.width = "100%";
										h.parentNode.style.paddingRight = "0px"
									}
								}
							} else {
								b.style.width = "0px";
								h.style.width = "0px";
								if (fui.isChrome || fui.isIE6) {
								} else {
									h.parentNode.style.width = "100%";
									h.parentNode.style.paddingRight = "0px"
								}
							}
						}
						e.call(this, g);
						e.call(this, f);
						e.call(this, a);
						this._syncScroll();
						var d = this;
						setTimeout(function() {
							fui.layout(d._filterEl);
							fui.layout(d._summaryEl)
						}, 10);
						if (fui.isIE10 && this.isFrozen()) {
							setTimeout(function() {
								if (d.isFitColumns()) {
									g.style.width = "auto";
									g.offsetWidth;
									g.style.width = "100%"
								} else {
									g.style.width = "0px"
								}
							}, 0)
						}
					},
					setBody : function() {
					},
					_createTopRowHTML : function(c) {
						var f = "";
						if (fui.isIE) {
							if (fui.isIE6 || fui.isIE7 || !fui.boxModel) {
								f += '<tr style="display:none;height:0px;">'
							} else {
								f += '<tr style="height:0px;">'
							}
						} else {
							f += '<tr style="height:0px;">'
						}
						for (var b = 0, a = c.length; b < a; b++) {
							var e = c[b];
							var d = e.width;
							var g = e._id;
							f += '<td id="'
									+ g
									+ '" style="padding:0;border:0;margin:0;height:0px;';
							if (e.width) {
								f += "width:" + e.width
							}
							f += '" ></td>'
						}
						f += '<td style="width:0px;"></td>';
						f += "</tr>";
						return f
					},
					_createColumnsHTML : function(u, s, r) {
						var r = r ? r : this.getVisibleColumns();
						var q = [ '<table class="fui-grid-table" cellspacing="0" cellpadding="0" border="0">' ];
						q.push(this._createTopRowHTML(r));
						var p = this.getSortField();
						var c = this.getSortOrder();
						for (var m = 0, g = u.length; m < g; m++) {
							var f = u[m];
							q[q.length] = "<tr>";
							for (var n = 0, e = f.length; n < e; n++) {
								var d = f[n];
								var o = this._createHeaderText(d, s);
								var a = this._createHeaderCellId(d, s);
								var h = "";
								if (p && p == d.field) {
									h = c == "asc" ? "fui-grid-asc"
											: "fui-grid-desc"
								}
								var t = "";
								if (this.allowHeaderWrap == false) {
									t = " fui-grid-headerCell-nowrap "
								}
								q[q.length] = '<td id="';
								q[q.length] = a;
								q[q.length] = '" class="fui-grid-headerCell '
										+ h + " " + (d.headerCls || "") + " ";
								var b = !(d.columns && d.columns.length > 0);
								if (b) {
									q[q.length] = " fui-grid-bottomCell "
								}
								if (n == e - 1) {
									q[q.length] = " fui-grid-rightCell "
								}
								q[q.length] = '" style="';
								if (d.headerStyle) {
									q[q.length] = d.headerStyle + ";"
								}
								if (d.headerAlign) {
									q[q.length] = "text-align:" + d.headerAlign
											+ ";"
								}
								q[q.length] = '" ';
								if (d.rowspan) {
									q[q.length] = 'rowspan="' + d.rowspan
											+ '" '
								}
								this._createColumnColSpan(d, q, s);
								q[q.length] = '><div class="fui-grid-headerCell-outer"><div class="fui-grid-headerCell-inner '
										+ t + '">';
								q[q.length] = o;
								if (h) {
									q[q.length] = '<span class="fui-grid-sortIcon"></span>'
								}
								q[q.length] = '</div><div id="'
										+ d._id
										+ '" class="fui-grid-column-splitter"></div>';
								q[q.length] = "</div></td>"
							}
							if (this.isFrozen() && s == 1) {
								q[q.length] = '<td class="fui-grid-headerCell" style="width:0;"><div class="fui-grid-headerCell-inner" style="';
								q[q.length] = '">0</div></td>'
							}
							q[q.length] = "</tr>"
						}
						q.push("</table>");
						return q.join("")
					},
					_createHeaderText : function(b, a) {
						var c = b.header;
						if (typeof c == "function") {
							c = c.call(this, b)
						}
						if (fui.isNull(c) || c === "") {
							c = "&nbsp;"
						}
						return c
					},
					_createColumnColSpan : function(b, c, a) {
						if (b.colspan) {
							c[c.length] = 'colspan="' + b.colspan + '" '
						}
					},
					doUpdateColumns : function() {
						var d = this._columnsViewEl.scrollLeft;
						var c = this.getVisibleColumnsRow();
						var a = this._createColumnsHTML(c, 2);
						var b = '<div class="fui-grid-topRightCell"></div>';
						a += b;
						this._columnsViewEl.innerHTML = a;
						this._columnsViewEl.scrollLeft = d
					},
					doUpdate : function() {
						if (this.canUpdate() == false) {
							return
						}
						var c = this._isCreating();
						var b = new Date();
						this._doUpdateSummaryRow();
						var a = this;
						function d() {
							a.doUpdateColumns();
							a.doUpdateRows();
							a.doLayout();
							a._doUpdateTimer = null
						}
						a.doUpdateColumns();
						if (c) {
							this._useEmptyView = true
						}
						if (this._rowsViewContentEl
								&& this._rowsViewContentEl.firstChild) {
							this._rowsViewContentEl
									.removeChild(this._rowsViewContentEl.firstChild)
						}
						if (this._rowsLockContentEl
								&& this._rowsLockContentEl.firstChild) {
							this._rowsLockContentEl
									.removeChild(this._rowsLockContentEl.firstChild)
						}
						a.doUpdateRows();
						if (c) {
							this._useEmptyView = false
						}
						a.doLayout();
						if (c && !this._doUpdateTimer) {
							this._doUpdateTimer = setTimeout(d, 15)
						}
						this.unmask()
					},
					_isCreating : function() {
						return (new Date() - this._createTime) < 1000
					},
					deferUpdate : function(b) {
						if (!b) {
							b = 5
						}
						if (this._updateTimer || this._doUpdateTimer) {
							return
						}
						var a = this;
						this._updateTimer = setTimeout(function() {
							a._updateTimer = null;
							a.doUpdate()
						}, b)
					},
					_updateCount : 0,
					beginUpdate : function() {
						this._updateCount++
					},
					endUpdate : function(a) {
						this._updateCount--;
						if (this._updateCount == 0 || a === true) {
							this._updateCount = 0;
							this.doUpdate()
						}
					},
					canUpdate : function() {
						return this._updateCount == 0
					},
					setDefaultRowHeight : function(a) {
						this.defaultRowHeight = a
					},
					getDefaultRowHeight : function() {
						return this.defaultRowHeight
					},
					_getRowHeight : function(a) {
						var b = this.defaultRowHeight;
						if (a._height) {
							b = parseInt(a._height);
							if (isNaN(parseInt(a._height))) {
								b = rowHeight
							}
						}
						b -= 4;
						b -= 1;
						return b
					},
					_createGroupingHTML : function(g, s) {
						var f = this.getGroupingView();
						var b = this._showGroupSummary;
						var n = this.isFrozen();
						var q = 0;
						var o = this;
						function m(v, w) {
							p
									.push('<table class="fui-grid-table" cellspacing="0" cellpadding="0" border="0">');
							if (g.length > 0) {
								p.push(o._createTopRowHTML(g));
								for (var u = 0, e = v.length; u < e; u++) {
									var x = v[u];
									o._createRowHTML(x, q++, g, s, p)
								}
							}
							if (b) {
							}
							p.push("</table>")
						}
						var p = [ '<table class="fui-grid-table" cellspacing="0" cellpadding="0" border="0">' ];
						p.push(this._createTopRowHTML(g));
						for (var i = 0, h = f.length; i < h; i++) {
							var r = f[i];
							var d = this._createRowGroupId(r, s);
							var c = this._createRowGroupRowsId(r, s);
							var l = this._OnDrawGroup(r);
							var t = r.expanded ? ""
									: " fui-grid-group-collapse ";
							p[p.length] = '<tr id="';
							p[p.length] = d;
							p[p.length] = '" class="fui-grid-groupRow';
							p[p.length] = t;
							p[p.length] = '"><td class="fui-grid-groupCell" colspan="';
							p[p.length] = g.length;
							p[p.length] = '"><div class="fui-grid-groupHeader">';
							if (!n || (n && s == 1)) {
								p[p.length] = '<div class="fui-grid-group-ecicon"></div>';
								p[p.length] = '<div class="fui-grid-groupTitle">'
										+ l.cellHtml + "</div>"
							} else {
								p[p.length] = "&nbsp;"
							}
							p[p.length] = "</div></td></tr>";
							var a = r.expanded ? "" : "display:none";
							p[p.length] = '<tr class="fui-grid-groupRows-tr" style="';
							p[p.length] = '"><td class="fui-grid-groupRows-td" colspan="';
							p[p.length] = g.length;
							p[p.length] = '"><div id="';
							p[p.length] = c;
							p[p.length] = '" class="fui-grid-groupRows" style="';
							p[p.length] = a;
							p[p.length] = '">';
							m(r.rows, r);
							p[p.length] = "</div></td></tr>"
						}
						p.push("</table>");
						return p.join("")
					},
					_isFastCreating : function() {
						var a = this.getVisibleRows();
						if (a.length > 50) {
							return this._isCreating()
									|| this.getScrollTop() < 50 * this._defaultRowHeight
						}
						return false
					},
					_createRowHTML : function(g, p, d, n, a) {
						var m = !a;
						if (!a) {
							a = []
						}
						var f = "";
						var s = this.isFixedRowHeight();
						if (s) {
							f = this._getRowHeight(g)
						}
						var k = -1;
						var q = " ";
						var j = -1;
						var v = " ";
						a[a.length] = '<tr class="fui-grid-row ';
						if (g._state == "added" && this.showNewRow) {
							a[a.length] = "fui-grid-newRow "
						}
						if (this.allowAlternating && p % 2 == 1) {
							a[a.length] = this._alternatingCls;
							a[a.length] = " "
						}
						var o = this._dataSource.isSelected(g);
						if (o) {
							a[a.length] = this._rowSelectedCls;
							a[a.length] = " "
						}
						k = a.length;
						a[a.length] = q;
						a[a.length] = '" style="';
						j = a.length;
						a[a.length] = v;
						if (g.visible === false) {
							a[a.length] = ";display:none;"
						}
						a[a.length] = '" id="';
						a[a.length] = this._createRowId(g, n);
						a[a.length] = '">';
						var x = this._currentCell;
						for (var t = 0, r = d.length; t < r; t++) {
							var h = d[t];
							var w = this._createCellId(g, h);
							var c = "";
							var u = this._OnDrawCell(g, h, p, h._index);
							if (u.cellHtml === null || u.cellHtml === undefined
									|| u.cellHtml === "") {
								u.cellHtml = "&nbsp;"
							}
							a[a.length] = "<td ";
							if (u.rowSpan) {
								a[a.length] = 'rowspan="' + u.rowSpan + '"'
							}
							if (u.colSpan) {
								a[a.length] = 'colspan="' + u.colSpan + '"'
							}
							a[a.length] = ' id="';
							a[a.length] = w;
							a[a.length] = '" class="fui-grid-cell ';
							if (t == r - 1) {
								a[a.length] = " fui-grid-rightCell "
							}
							if (u.cellCls) {
								a[a.length] = " " + u.cellCls + " "
							}
							if (c) {
								a[a.length] = c
							}
							if (x && x[0] == g && x[1] == h) {
								a[a.length] = " ";
								a[a.length] = this._cellSelectedCls
							}
							a[a.length] = '" style="';
							if (u.showHGridLines == false) {
								a[a.length] = "border-bottom:0;"
							}
							if (u.showVGridLines == false) {
								a[a.length] = "border-right:0;"
							}
							if (!u.visible) {
								a[a.length] = "display:none;"
							}
							if (h.align) {
								a[a.length] = "text-align:";
								a[a.length] = h.align;
								a[a.length] = ";"
							}
							if (u.cellStyle) {
								a[a.length] = u.cellStyle
							}
							a[a.length] = '">';
							a[a.length] = '<div class="fui-grid-cell-inner ';
							if (!u.allowCellWrap) {
								a[a.length] = " fui-grid-cell-nowrap "
							}
							if (u.cellInnerCls) {
								a[a.length] = u.cellInnerCls
							}
							var b = h.field ? this._dataSource.isModified(g,
									h.field) : false;
							if (b && this.showModified) {
								a[a.length] = " fui-grid-cell-dirty"
							}
							a[a.length] = '" style="';
							if (s) {
								a[a.length] = "height:";
								a[a.length] = f;
								a[a.length] = "px;"
							}
							if (u.cellInnerStyle) {
								a[a.length] = u.cellInnerStyle
							}
							a[a.length] = '">';
							a[a.length] = u.cellHtml;
							a[a.length] = "</div>";
							a[a.length] = "</td>";
							if (u.rowCls) {
								q = u.rowCls
							}
							if (u.rowStyle) {
								v = u.rowStyle
							}
						}
						if (this.isFrozen() && n == 1) {
							a[a.length] = '<td class="fui-grid-cell" style="width:0;';
							if (this.showHGridLines == false) {
								a[a.length] = "border-bottom:0;"
							}
							a[a.length] = '"><div class="fui-grid-cell-inner" style="';
							if (s) {
								a[a.length] = "height:";
								a[a.length] = f;
								a[a.length] = "px;"
							}
							a[a.length] = '">0</div></td>'
						}
						a[k] = q;
						a[j] = v;
						a[a.length] = "</tr>";
						if (m) {
							return a.join("")
						}
					},
					_createRowsHTML : function(b, o, e, l) {
						e = e || this.getVisibleRows();
						var i = [ '<table class="fui-grid-table" cellspacing="0" cellpadding="0" border="0">' ];
						i.push(this._createTopRowHTML(b));
						var m = this.uid + "$emptytext" + o;
						if (o == 2) {
							var a = (this.showEmptyText && e.length == 0) ? ""
									: "display:none;";
							i
									.push('<tr id="'
											+ m
											+ '" style="'
											+ a
											+ '"><td class="fui-grid-emptyText" colspan="'
											+ b.length + '">' + this.emptyText
											+ "</td></tr>")
						}
						var n = 0;
						if (e.length > 0) {
							var g = e[0];
							n = this.getVisibleRows().indexOf(g)
						}
						for (var d = 0, c = e.length; d < c; d++) {
							var h = n + d;
							var f = e[d];
							this._createRowHTML(f, h, b, o, i)
						}
						if (l) {
							i.push(l)
						}
						i.push("</table>");
						return i.join("")
					},
					doUpdateRows : function() {
						var c = this.getVisibleRows();
						var b = this.getVisibleColumns();
						if (this.isGrouping()) {
							var a = this._createGroupingHTML(b, 2);
							this._rowsViewContentEl.innerHTML = a
						} else {
							var a = this._createRowsHTML(b, 2, c);
							this._rowsViewContentEl.innerHTML = a
						}
					},
					_createFilterRowHTML : function(d, b) {
						var h = [ '<table class="fui-grid-table" cellspacing="0" cellpadding="0" border="0">' ];
						h.push(this._createTopRowHTML(d));
						h[h.length] = "<tr>";
						for (var c = 0, a = d.length; c < a; c++) {
							var f = d[c];
							var g = this._createFilterCellId(f);
							h[h.length] = '<td id="';
							h[h.length] = g;
							h[h.length] = '" class="fui-grid-filterCell" style="';
							h[h.length] = '">&nbsp;</td>'
						}
						h[h.length] = '</tr></table><div class="fui-grid-scrollHeaderCell"></div>';
						var e = h.join("");
						return e
					},
					_doRenderFilters : function() {
						var d = this.getVisibleColumns();
						for (var c = 0, a = d.length; c < a; c++) {
							var e = d[c];
							if (e.filter) {
								var b = this.getFilterCellEl(e);
								if (b) {
									b.innerHTML = "";
									e.filter.render(b)
								}
							}
						}
					},
					_doUpdateFilterRow : function() {
						if (this._filterViewEl.firstChild) {
							this._filterViewEl
									.removeChild(this._filterViewEl.firstChild)
						}
						var c = this.isFrozen();
						var b = this.getVisibleColumns();
						var a = this._createFilterRowHTML(b, 2);
						this._filterViewEl.innerHTML = a;
						this._doRenderFilters()
					},
					_createSummaryRowHTML : function(d, k) {
						var b = this.getDataView();
						var j = [ '<table class="fui-grid-table" cellspacing="0" cellpadding="0" border="0">' ];
						j.push(this._createTopRowHTML(d));
						j[j.length] = "<tr>";
						for (var g = 0, f = d.length; g < f; g++) {
							var c = d[g];
							var a = this._createSummaryCellId(c);
							var h = this._OnDrawSummaryCell(b, c);
							j[j.length] = '<td id="';
							j[j.length] = a;
							j[j.length] = '" class="fui-grid-summaryCell '
									+ h.cellCls + '" style="' + h.cellStyle
									+ ";";
							j[j.length] = '">';
							j[j.length] = h.cellHtml;
							j[j.length] = "</td>"
						}
						j[j.length] = '</tr></table><div class="fui-grid-scrollHeaderCell"></div>';
						var m = j.join("");
						return m
					},
					_doUpdateSummaryRow : function() {
						var b = this.getVisibleColumns();
						var a = this._createSummaryRowHTML(b, 2);
						this._summaryViewEl.innerHTML = a
					},
					_doSortByField : function(b, c) {
						if (!b) {
							return null
						}
						var a = this._columnModel._getDataTypeByField(b);
						this._dataSource._doClientSortField(b, c, a)
					},
					_expandGroupOnLoad : true,
					_GroupID : 1,
					_groupField : "",
					_groupDir : "",
					groupBy : function(b, a) {
						if (!b) {
							return
						}
						this._groupField = b;
						if (typeof a == "string") {
							a = a.toLowerCase()
						}
						this._groupDir = a;
						this._createGroupingView();
						this.deferUpdate()
					},
					clearGroup : function() {
						this._groupField = "";
						this._groupDir = "";
						this._groupDataView = null;
						this.deferUpdate()
					},
					setGroupField : function(a) {
						this.groupBy(a)
					},
					setGroupDir : function(a) {
						this._groupDir = field;
						this.groupBy(this._groupField, a)
					},
					isGrouping : function() {
						return this._groupField != ""
					},
					getGroupingView : function() {
						return this._groupDataView
					},
					_createGroupingView : function() {
						if (this.isGrouping() == false) {
							return
						}
						this._groupDataView = null;
						var j = this._groupField, d = this._groupDir;
						this._doSortByField(j, d);
						var f = this.getVisibleRows();
						var c = [];
						var h = {};
						for (var g = 0, e = f.length; g < e; g++) {
							var b = f[g];
							var m = b[j];
							var a = fui.isDate(m) ? m.getTime() : m;
							var k = h[a];
							if (!k) {
								k = h[a] = {};
								k.field = j, k.dir = d;
								k.value = m;
								k.rows = [];
								c.push(k);
								k.id = "g" + this._GroupID++;
								k.expanded = this._expandGroupOnLoad
							}
							k.rows.push(b)
						}
						this._groupDataView = c
					},
					_OnDrawGroup : function(b) {
						var a = {
							group : b,
							rows : b.rows,
							field : b.field,
							dir : b.dir,
							value : b.value,
							cellHtml : b.field + " (" + b.rows.length
									+ " Items)"
						};
						this.fire("drawgroup", a);
						return a
					},
					getRowGroup : function(b) {
						var a = typeof b;
						if (a == "number") {
							return this.getGroupingView()[b]
						}
						if (a == "string") {
							return this._getRowGroupById(b)
						}
						return b
					},
					_getRowGroupByEvent : function(c) {
						var a = fui.findParent(c.target, "fui-grid-groupRow");
						if (a) {
							var b = a.id.split("$");
							if (b[0] != this._id) {
								return null
							}
							var d = b[b.length - 1];
							return this._getRowGroupById(d)
						}
						return null
					},
					_getRowGroupById : function(e) {
						var a = this.getGroupingView();
						for (var c = 0, b = a.length; c < b; c++) {
							var d = a[c];
							if (d.id == e) {
								return d
							}
						}
						return null
					},
					_createRowGroupId : function(b, a) {
						return this._id + "$group" + a + "$" + b.id
					},
					_createRowGroupRowsId : function(b, a) {
						return this._id + "$grouprows" + a + "$" + b.id
					},
					_createRowId : function(b, a) {
						var c = this._id + "$row" + a + "$" + b._id;
						return c
					},
					_createHeaderCellId : function(b, a) {
						var c = this._id + "$headerCell" + a + "$" + b._id;
						return c
					},
					_createCellId : function(b, a) {
						var c = b._id + "$cell$" + a._id;
						return c
					},
					_createFilterCellId : function(a) {
						return this._id + "$filter$" + a._id
					},
					_createSummaryCellId : function(a) {
						return this._id + "$summary$" + a._id
					},
					getFilterCellEl : function(a) {
						a = this.getColumn(a);
						if (!a) {
							return null
						}
						return document.getElementById(this
								._createFilterCellId(a))
					},
					getSummaryCellEl : function(a) {
						a = this.getColumn(a);
						if (!a) {
							return null
						}
						return document.getElementById(this
								._createSummaryCellId(a))
					},
					_doVisibleEls : function() {
						fui.GridView.superclass._doVisibleEls.call(this);
						this._columnsEl.style.display = this.showColumns ? "block"
								: "none";
						this._filterEl.style.display = this.showFilterRow ? "block"
								: "none";
						this._summaryEl.style.display = this.showSummaryRow ? "block"
								: "none";
						this._bottomPagerEl.style.display = this.showPager ? "block"
								: "none"
					},
					setShowColumns : function(a) {
						this.showColumns = a;
						this._doVisibleEls();
						this.deferLayout()
					},
					setShowFilterRow : function(a) {
						this.showFilterRow = a;
						this._doVisibleEls();
						this.deferLayout()
					},
					setShowSummaryRow : function(a) {
						this.showSummaryRow = a;
						this._doVisibleEls();
						this.deferLayout()
					},
					setShowPager : function(a) {
						this.showPager = a;
						this._doVisibleEls();
						this.deferLayout()
					},
					setFitColumns : function(a) {
						this.fitColumns = a;
						fui.removeClass(this.el, "fui-grid-fixwidth");
						if (this.fitColumns == false) {
							fui.addClass(this.el, "fui-grid-fixwidth")
						}
						this.deferLayout()
					},
					getBodyHeight : function(b) {
						var a = fui.GridView.superclass.getBodyHeight.call(
								this, b);
						a = a - this.getColumnsHeight()
								- this.getFilterHeight()
								- this.getSummaryHeight()
								- this.getPagerHeight();
						return a
					},
					getColumnsHeight : function() {
						return this.showColumns ? fui
								.getHeight(this._columnsEl) : 0
					},
					getFilterHeight : function() {
						return this.showFilterRow ? fui
								.getHeight(this._filterEl) : 0
					},
					getSummaryHeight : function() {
						return this.showSummaryRow ? fui
								.getHeight(this._summaryEl) : 0
					},
					getPagerHeight : function() {
						return this.showPager ? fui
								.getHeight(this._bottomPagerEl) : 0
					},
					getGridViewBox : function(c) {
						var b = fui.getBox(this._columnsEl);
						var a = fui.getBox(this._bodyEl);
						b.height = a.bottom - b.top;
						b.bottom = b.top + b.height;
						return b
					},
					getSortField : function(a) {
						return this._dataSource.sortField
					},
					getSortOrder : function(a) {
						return this._dataSource.sortOrder
					},
					_createSource : function() {
						this._dataSource = new fui.DataTable()
					},
					_bindSource : function() {
						var a = this._dataSource;
						a.on("loaddata", this.__OnSourceLoadData, this);
						a.on("cleardata", this.__OnSourceClearData, this)
					},
					__OnSourceLoadData : function(a) {
						this._initData();
						this.doUpdate()
					},
					__OnSourceClearData : function(a) {
						this._initData();
						this.doUpdate()
					},
					_initData : function() {
					},
					isFrozen : function() {
						var b = this._columnModel._frozenStartColumn, a = this._columnModel._frozenEndColumn;
						return this._columnModel.isFrozen()
					},
					_createColumnModel : function() {
						this._columnModel = new fui.ColumnModel(this)
					},
					_bindColumnModel : function() {
						this._columnModel.on("columnschanged",
								this.__OnColumnsChanged, this)
					},
					__OnColumnsChanged : function(a) {
						this.columns = this._columnModel.columns;
						this._doUpdateFilterRow();
						this._doUpdateSummaryRow();
						this.doUpdate();
						this.fire("columnschanged")
					},
					setColumns : function(a) {
						this._columnModel.setColumns(a);
						this.columns = this._columnModel.columns
					},
					getColumns : function() {
						return this._columnModel.getColumns()
					},
					getBottomColumns : function() {
						return this._columnModel.getBottomColumns()
					},
					getVisibleColumnsRow : function() {
						var a = this._columnModel.getVisibleColumnsRow()
								.clone();
						return a
					},
					getVisibleColumns : function() {
						var a = this._columnModel.getVisibleColumns().clone();
						return a
					},
					getFrozenColumns : function() {
						var a = this._columnModel.getFrozenColumns().clone();
						return a
					},
					getUnFrozenColumns : function() {
						var a = this._columnModel.getUnFrozenColumns().clone();
						return a
					},
					getColumn : function(a) {
						return this._columnModel.getColumn(a)
					},
					updateColumn : function(b, a) {
						this._columnModel.updateColumn(b, a)
					},
					showColumns : function(c) {
						for (var b = 0, a = c.length; b < a; b++) {
							var d = this.getColumn(c[b]);
							if (!d) {
								continue
							}
							d.visible = true
						}
						this._columnModel._columnsChanged()
					},
					hideColumns : function(c) {
						for (var b = 0, a = c.length; b < a; b++) {
							var d = this.getColumn(c[b]);
							if (!d) {
								continue
							}
							d.visible = false
						}
						this._columnModel._columnsChanged()
					},
					showColumn : function(a) {
						this.updateColumn(a, {
							visible : true
						})
					},
					hideColumn : function(a) {
						this.updateColumn(a, {
							visible : false
						})
					},
					moveColumn : function(b, a, c) {
						this._columnModel.moveColumn(b, a, c)
					},
					removeColumn : function(b) {
						b = this.getColumn(b);
						if (!b) {
							return
						}
						var a = this.getParentColumn(b);
						if (b && a) {
							a.columns.remove(b);
							this._columnModel._columnsChanged()
						}
						return b
					},
					setColumnWidth : function(b, a) {
						this.updateColumn(b, {
							width : a
						})
					},
					getColumnWidth : function(a) {
						var b = this.getColumnBox(a);
						return b.width
					},
					getParentColumn : function(a) {
						return this._columnModel.getParentColumn(a)
					},
					getMaxColumnLevel : function() {
						return this._columnModel._getMaxColumnLevel()
					},
					_isCellVisible : function(b, a) {
						return true
					},
					_createDrawCellEvent : function(b, d, h, c) {
						var f = fui._getMap(d.field, b);
						var g = {
							sender : this,
							rowIndex : h,
							columnIndex : c,
							record : b,
							row : b,
							column : d,
							field : d.field,
							value : f,
							cellHtml : f,
							rowCls : "",
							rowStyle : null,
							cellCls : d.cellCls || "",
							cellStyle : d.cellStyle || "",
							allowCellWrap : this.allowCellWrap,
							showHGridLines : this.showHGridLines,
							showVGridLines : this.showVGridLines,
							cellInnerCls : "",
							cellInnnerStyle : "",
							autoEscape : d.autoEscape
						};
						g.visible = this._isCellVisible(h, c);
						if (g.visible == true && this._mergedCellMaps) {
							var a = this._mergedCellMaps[h + ":" + c];
							if (a) {
								g.rowSpan = a.rowSpan;
								g.colSpan = a.colSpan
							}
						}
						return g
					},
					_OnDrawCell : function(a, c, h, b) {
						var g = this._createDrawCellEvent(a, c, h, b);
						var f = g.value;
						if (c.dateFormat) {
							if (fui.isDate(g.value)) {
								g.cellHtml = fui.formatDate(f, c.dateFormat)
							} else {
								g.cellHtml = f
							}
						}
						if (c.dataType == "float") {
							var f = parseFloat(g.value);
							if (!isNaN(f)) {
								decimalPlaces = parseInt(c.decimalPlaces);
								if (isNaN(decimalPlaces)) {
									decimalPlaces = 0
								}
								g.cellHtml = f.toFixed(decimalPlaces)
							}
						}
						if (c.dataType == "currency") {
							g.cellHtml = fui.formatCurrency(g.value,
									c.currencyUnit)
						}
						if (c.displayField) {
							g.cellHtml = fui._getMap(c.displayField, a)
						}
						if (g.autoEscape == true) {
							g.cellHtml = fui.htmlEncode(g.cellHtml)
						}
						var d = c.renderer;
						if (d) {
							fn = typeof d == "function" ? d : fui
									._getFunctoin(d);
							if (fn) {
								g.cellHtml = fn.call(c, g)
							}
						}
						this.fire("drawcell", g);
						if (g.cellHtml && !!g.cellHtml.unshift
								&& g.cellHtml.length == 0) {
							g.cellHtml = "&nbsp;"
						}
						if (g.cellHtml === null || g.cellHtml === undefined
								|| g.cellHtml === "") {
							g.cellHtml = "&nbsp;"
						}
						return g
					},
					_OnDrawSummaryCell : function(a, c) {
						var g = {
							result : this.getResultObject(),
							sender : this,
							data : a,
							column : c,
							field : c.field,
							value : "",
							cellHtml : "",
							cellCls : c.cellCls || "",
							cellStyle : c.cellStyle || "",
							allowCellWrap : this.allowCellWrap
						};
						if (c.summaryType) {
							var b = fui.summaryTypes[c.summaryType];
							if (b) {
								g.value = b(a, c.field)
							}
						}
						var f = g.value;
						g.cellHtml = g.value;
						if (g.value && parseInt(g.value) != g.value
								&& g.value.toFixed) {
							decimalPlaces = parseInt(c.decimalPlaces);
							if (isNaN(decimalPlaces)) {
								decimalPlaces = 2
							}
							g.cellHtml = parseFloat(g.value
									.toFixed(decimalPlaces))
						}
						if (c.dateFormat) {
							if (fui.isDate(g.value)) {
								g.cellHtml = fui.formatDate(f, c.dateFormat)
							} else {
								g.cellHtml = f
							}
						}
						if (c.dataType == "currency") {
							g.cellHtml = fui.formatCurrency(g.cellHtml,
									c.currencyUnit)
						}
						var d = c.summaryRenderer;
						if (d) {
							b = typeof d == "function" ? d : window[d];
							if (b) {
								g.cellHtml = b.call(c, g)
							}
						}
						c.summaryValue = g.value;
						this.fire("drawsummarycell", g);
						if (g.cellHtml === null || g.cellHtml === undefined
								|| g.cellHtml === "") {
							g.cellHtml = "&nbsp;"
						}
						return g
					},
					getScrollTop : function() {
						return this._rowsViewEl.scrollTop
					},
					setScrollTop : function(a) {
						this._rowsViewEl.scrollTop = a
					},
					getScrollLeft : function() {
						return this._rowsViewEl.scrollLeft
					},
					setScrollLeft : function(a) {
						this._rowsViewEl.scrollLeft = a
					},
					_syncScroll : function() {
						var a = this._rowsViewEl.scrollLeft;
						this._filterViewEl.scrollLeft = a;
						this._summaryViewEl.scrollLeft = a;
						this._columnsViewEl.scrollLeft = a
					},
					__OnRowViewScroll : function(a) {
						this._syncScroll()
					},
					_pagers : [],
					_createPagers : function() {
						this._pagers = [];
						var a = new fui.Pager();
						this._setBottomPager(a)
					},
					_setBottomPager : function(a) {
						a = fui.create(a);
						if (!a) {
							return
						}
						if (this._bottomPager) {
							this.unbindPager(this._bottomPager);
							this._bottomPagerEl
									.removeChild(this._bottomPager.el)
						}
						this._bottomPager = a;
						a.render(this._bottomPagerEl);
						this.bindPager(a)
					},
					bindPager : function(a) {
						this._pagers.add(a)
					},
					unbindPager : function(a) {
						this._pagers.remove(a)
					},
					setShowEmptyText : function(a) {
						this.showEmptyText = a
					},
					getShowEmptyText : function() {
						return this.showEmptyText
					},
					setEmptyText : function(a) {
						this.emptyText = a
					},
					getEmptyText : function() {
						return this.emptyText
					},
					setShowModified : function(a) {
						this.showModified = a
					},
					getShowModified : function() {
						return this.showModified
					},
					setShowNewRow : function(a) {
						this.showNewRow = a
					},
					getShowNewRow : function() {
						return this.showNewRow
					},
					setAllowCellWrap : function(a) {
						this.allowCellWrap = a
					},
					getAllowCellWrap : function() {
						return this.allowCellWrap
					},
					setAllowHeaderWrap : function(a) {
						this.allowHeaderWrap = a
					},
					getAllowHeaderWrap : function() {
						return this.allowHeaderWrap
					},
					setShowHGridLines : function(a) {
						if (this.showHGridLines != a) {
							this.showHGridLines = a;
							this.deferUpdate()
						}
					},
					getShowHGridLines : function() {
						return this.showHGridLines
					},
					setShowVGridLines : function(a) {
						if (this.showVGridLines != a) {
							this.showVGridLines = a;
							this.deferUpdate()
						}
					},
					getShowVGridLines : function() {
						return this.showVGridLines
					}
				});
fui.copyTo(fui.GridView.prototype, fui._DataTableApplys);
fui.regClass(fui.GridView, "gridview");
fui.FrozenGridView = function() {
	fui.FrozenGridView.superclass.constructor.call(this)
};
fui
		.extend(
				fui.FrozenGridView,
				fui.GridView,
				{
					isFixedRowHeight : function() {
						return this.fixedRowHeight || this.isFrozen()
					},
					_create : function() {
						fui.FrozenGridView.superclass._create.call(this);
						var c = this.el;
						var b = '<div class="fui-grid-columns-lock"></div>';
						var e = '<div class="fui-grid-rows-lock"><div class="fui-grid-rows-content"></div></div>';
						this._columnsLockEl = fui
								.before(this._columnsViewEl, b);
						this._rowsLockEl = fui.before(this._rowsViewEl, e);
						this._rowsLockContentEl = this._rowsLockEl.firstChild;
						var d = '<div class="fui-grid-filterRow-lock"></div>';
						this._filterLockEl = fui.before(this._filterViewEl, d);
						var a = '<div class="fui-grid-summaryRow-lock"></div>';
						this._summaryLockEl = fui
								.before(this._summaryViewEl, a)
					},
					_initEvents : function() {
						fui.FrozenGridView.superclass._initEvents.call(this);
						fui.on(this._rowsEl, "mousewheel", this.__OnMouseWheel,
								this)
					},
					_createHeaderText : function(b, a) {
						var c = b.header;
						if (typeof c == "function") {
							c = c.call(this, b)
						}
						if (fui.isNull(c) || c === "") {
							c = "&nbsp;"
						}
						if (this.isFrozen() && a == 2) {
							if (b.viewIndex1) {
								c = "&nbsp;"
							}
						}
						return c
					},
					_createColumnColSpan : function(b, d, a) {
						if (this.isFrozen()) {
							var c = b["colspan" + a];
							if (c) {
								d[d.length] = 'colspan="' + c + '" '
							}
						} else {
							if (b.colspan) {
								d[d.length] = 'colspan="' + b.colspan + '" '
							}
						}
					},
					doUpdateColumns : function() {
						var f = this.isFrozen() ? this.getFrozenColumnsRow()
								: [];
						var a = this.isFrozen() ? this.getUnFrozenColumnsRow()
								: this.getVisibleColumnsRow();
						var h = this.isFrozen() ? this.getFrozenColumns() : [];
						var g = this.isFrozen() ? this.getUnFrozenColumns()
								: this.getVisibleColumns();
						var c = this._createColumnsHTML(f, 1, h);
						var b = this._createColumnsHTML(a, 2, g);
						var e = '<div class="fui-grid-topRightCell"></div>';
						c += e;
						b += e;
						this._columnsLockEl.innerHTML = c;
						this._columnsViewEl.innerHTML = b;
						var d = this._columnsLockEl.firstChild;
						d.style.width = "0px"
					},
					doUpdateRows : function() {
						var d = this.getVisibleRows();
						var f = this.getFrozenColumns();
						var e = this.getUnFrozenColumns();
						if (this.isGrouping()) {
							var b = this._createGroupingHTML(f, 1);
							var a = this._createGroupingHTML(e, 2);
							this._rowsLockContentEl.innerHTML = b;
							this._rowsViewContentEl.innerHTML = a
						} else {
							var b = this._createRowsHTML(f, 1,
									this.isFrozen() ? d : []);
							var a = this._createRowsHTML(e, 2, d);
							this._rowsLockContentEl.innerHTML = b;
							this._rowsViewContentEl.innerHTML = a
						}
						var c = this._rowsLockContentEl.firstChild;
						c.style.width = "0px"
					},
					_doUpdateFilterRow : function() {
						if (this._filterLockEl.firstChild) {
							this._filterLockEl
									.removeChild(this._filterLockEl.firstChild)
						}
						if (this._filterViewEl.firstChild) {
							this._filterViewEl
									.removeChild(this._filterViewEl.firstChild)
						}
						var d = this.getFrozenColumns();
						var c = this.getUnFrozenColumns();
						var b = this._createFilterRowHTML(d, 1);
						var a = this._createFilterRowHTML(c, 2);
						this._filterLockEl.innerHTML = b;
						this._filterViewEl.innerHTML = a;
						this._doRenderFilters()
					},
					_doUpdateSummaryRow : function() {
						var d = this.getFrozenColumns();
						var c = this.getUnFrozenColumns();
						var b = this._createSummaryRowHTML(d, 1);
						var a = this._createSummaryRowHTML(c, 2);
						this._summaryLockEl.innerHTML = b;
						this._summaryViewEl.innerHTML = a
					},
					_syncColumnHeight : function() {
						var c = this._columnsLockEl.firstChild, a = this._columnsViewEl.firstChild;
						c.style.height = a.style.height = "auto";
						if (this.isFrozen()) {
							var d = c.offsetHeight;
							var b = a.offsetHeight;
							d = d > b ? d : b;
							c.style.height = a.style.height = d + "px"
						}
						var c = this._summaryLockEl, a = this._summaryViewEl;
						c.style.height = a.style.height = "auto";
						if (this.isFrozen()) {
							var d = c.offsetHeight;
							var b = a.offsetHeight;
							d = d > b ? d : b;
							c.style.height = a.style.height = d + "px"
						}
					},
					doLayout : function() {
						if (this.canLayout() == false) {
							return
						}
						this._doLayoutScroll = false;
						this._doEmptyText();
						this._syncColumnHeight();
						fui.FrozenGridView.superclass.doLayout.call(this);
						var c = this.isAutoHeight();
						var e = this.isFrozen();
						var a = this.getViewportWidth(true);
						var b = this.getLockedWidth();
						var d = a - b;
						if (e) {
							this._filterViewEl.style.marginLeft = b + "px";
							this._summaryViewEl.style.marginLeft = b + "px";
							this._columnsViewEl.style.marginLeft = b + "px";
							this._rowsViewEl.style.marginLeft = b + "px";
							if (fui.isChrome || fui.isIE6) {
								this._filterViewEl.style.width = d + "px";
								this._summaryViewEl.style.width = d + "px";
								this._columnsViewEl.style.width = d + "px"
							} else {
								this._filterViewEl.style.width = "auto";
								this._summaryViewEl.style.width = "auto";
								this._columnsViewEl.style.width = "auto"
							}
							if (fui.isChrome || fui.isIE6) {
								this._rowsViewEl.style.width = d + "px"
							}
							fui.setWidth(this._filterLockEl, b);
							fui.setWidth(this._summaryLockEl, b);
							fui.setWidth(this._columnsLockEl, b);
							fui.setWidth(this._rowsLockEl, b);
							this._filterLockEl.style.left = "0px";
							this._summaryLockEl.style.left = "0px";
							this._columnsLockEl.style.left = "0px";
							this._rowsLockEl.style.left = "0px"
						} else {
							this._doClearFrozen()
						}
						if (c) {
							this._rowsLockEl.style.height = "auto"
						} else {
							this._rowsLockEl.style.height = "100%"
						}
					},
					_doEmptyText : function() {
					},
					_getRowEl : function(c, a) {
						c = this.getRecord(c);
						var d = this._createRowId(c, a);
						var b = document.getElementById(d);
						return b
					},
					_doClearFrozen : function() {
						this._filterLockEl.style.left = "-10px";
						this._summaryLockEl.style.left = "-10px";
						this._columnsLockEl.style.left = "-10px";
						this._rowsLockEl.style.left = "-10px";
						this._filterLockEl.style.width = "0px";
						this._summaryLockEl.style.width = "0px";
						this._columnsLockEl.style.width = "0px";
						this._rowsLockEl.style.width = "0px";
						this._filterLockEl.style.marginLeft = "0px";
						this._summaryLockEl.style.marginLeft = "0px";
						this._columnsViewEl.style.marginLeft = "0px";
						this._rowsViewEl.style.marginLeft = "0px";
						this._filterViewEl.style.width = "auto";
						this._summaryViewEl.style.width = "auto";
						this._columnsViewEl.style.width = "auto";
						this._rowsViewEl.style.width = "auto";
						if (fui.isChrome || fui.isIE6) {
							this._filterViewEl.style.width = "100%";
							this._summaryViewEl.style.width = "100%";
							this._columnsViewEl.style.width = "100%";
							this._rowsViewEl.style.width = "100%"
						}
					},
					frozenColumns : function(a, b) {
						this.frozen(a, b)
					},
					unFrozenColumns : function() {
						this.unFrozen()
					},
					frozen : function(a, b) {
						this._doClearFrozen();
						this._columnModel.frozen(a, b)
					},
					unFrozen : function() {
						this._doClearFrozen();
						this._columnModel.unFrozen()
					},
					setFrozenStartColumn : function(a) {
						this._columnModel.setFrozenStartColumn(a)
					},
					setFrozenEndColumn : function(a) {
						return this._columnModel.setFrozenEndColumn(a)
					},
					getFrozenStartColumn : function(a) {
						return this._columnModel._frozenStartColumn
					},
					getFrozenEndColumn : function(a) {
						return this._columnModel._frozenEndColumn
					},
					getFrozenColumnsRow : function() {
						return this._columnModel.getFrozenColumnsRow()
					},
					getUnFrozenColumnsRow : function() {
						return this._columnModel.getUnFrozenColumnsRow()
					},
					getLockedWidth : function() {
						if (!this.isFrozen()) {
							return 0
						}
						var b = this._columnsLockEl.firstChild.firstChild;
						var a = b ? b.offsetWidth : 0;
						return a
					},
					_canDeferSyncScroll : function() {
						return this.isFrozen()
					},
					_syncScroll : function() {
						var c = this._rowsViewEl.scrollLeft;
						this._filterViewEl.scrollLeft = c;
						this._summaryViewEl.scrollLeft = c;
						this._columnsViewEl.scrollLeft = c;
						var a = this;
						var b = a._rowsViewEl.scrollTop;
						a._rowsLockEl.scrollTop = b;
						if (this._canDeferSyncScroll()) {
							setTimeout(
									function() {
										a._rowsViewEl.scrollTop = a._rowsLockEl.scrollTop
									}, 50)
						}
					},
					__OnMouseWheel : function(c) {
						var b = this.getScrollTop() - c.wheelDelta;
						var a = this.getScrollTop();
						this.setScrollTop(b);
						if (a != this.getScrollTop()) {
							c.preventDefault()
						}
					}
				});
fui.regClass(fui.FrozenGridView, "FrozenGridView");
fui.ScrollGridView = function() {
	fui.ScrollGridView.superclass.constructor.call(this)
};
fui
		.extend(
				fui.ScrollGridView,
				fui.FrozenGridView,
				{
					virtualScroll : true,
					virtualRows : 25,
					defaultRowHeight : 23,
					_canDeferSyncScroll : function() {
						return this.isFrozen() && !this.isVirtualScroll()
					},
					setVirtualScroll : function(a) {
						this.virtualScroll = a;
						this.doUpdate()
					},
					getVirtualScroll : function(a) {
						return this.virtualScroll
					},
					isFixedRowHeight : function() {
						return this.fixedRowHeight || this.isVirtualScroll()
								|| this.isFrozen()
					},
					isVirtualScroll : function() {
						if (this.virtualScroll) {
							return this.isAutoHeight() == false
									&& this.isGrouping() == false
						}
						return false
					},
					_getScrollView : function() {
						var a = this.getVisibleRows();
						return a
					},
					_getScrollViewCount : function() {
						return this._getScrollView().length
					},
					_getScrollRowHeight : function(a, c) {
						if (c && c._height) {
							var b = parseInt(c._height);
							if (!isNaN(b)) {
								return b
							}
						}
						return this.defaultRowHeight
					},
					_getRangeHeight : function(g, b) {
						var a = 0;
						var e = this._getScrollView();
						for (var c = g; c < b; c++) {
							var f = e[c];
							var d = this._getScrollRowHeight(c, f);
							a += d
						}
						return a
					},
					_getIndexByScrollTop : function(g) {
						var a = 0;
						var f = this._getScrollView();
						var e = this._getScrollViewCount();
						for (var c = 0, b = e; c < b; c++) {
							var j = f[c];
							var d = this._getScrollRowHeight(c, j);
							a += d;
							if (a >= g) {
								return c
							}
						}
						return e
					},
					__getScrollViewRange : function(c, a) {
						var b = this._getScrollView();
						return b.getRange(c, a)
					},
					_getViewRegion : function() {
						var k = this._getScrollView();
						if (this.isVirtualScroll() == false) {
							var o = {
								top : 0,
								bottom : 0,
								rows : k,
								start : 0,
								end : 0
							};
							return o
						}
						var b = this.defaultRowHeight;
						var c = this._getViewNowRegion();
						var e = this.getScrollTop();
						var p = this._vscrollEl.offsetHeight;
						var m = this._getScrollViewCount();
						var d = c.start, h = c.end;
						for (var j = 0, g = m; j < g; j += this.virtualRows) {
							var f = j + this.virtualRows;
							if (j <= d && d < f) {
								d = j
							}
							if (j < h && h <= f) {
								h = f
							}
						}
						if (h > m) {
							h = m
						}
						if (h == 0) {
							h = this.virtualRows
						}
						var n = this._getRangeHeight(0, d);
						var a = this._getRangeHeight(h, this
								._getScrollViewCount());
						var k = this.__getScrollViewRange(d, h);
						var o = {
							top : n,
							bottom : a,
							rows : k,
							start : d,
							end : h,
							viewStart : d,
							viewEnd : h
						};
						o.viewTop = this._getRangeHeight(0, o.viewStart);
						o.viewBottom = this._getRangeHeight(o.viewEnd, this
								._getScrollViewCount());
						return o
					},
					_getViewNowRegion : function() {
						var d = this.defaultRowHeight;
						var f = this.getScrollTop();
						var g = this._vscrollEl.offsetHeight;
						var b = this._getIndexByScrollTop(f);
						var a = this._getIndexByScrollTop(f + g + 30);
						var c = this._getScrollViewCount();
						if (a > c) {
							a = c
						}
						var e = {
							start : b,
							end : a
						};
						return e
					},
					_canVirtualUpdate : function() {
						if (!this._viewRegion) {
							return true
						}
						var a = this._getViewNowRegion();
						if (this._viewRegion.start <= a.start
								&& a.end <= this._viewRegion.end) {
							return false
						}
						return true
					},
					__OnColumnsChanged : function(a) {
						this.columns = this._columnModel.columns;
						this._doUpdateFilterRow();
						this._doUpdateSummaryRow();
						if (this.getVisibleRows().length == 0) {
							this.doUpdate()
						} else {
							this.deferUpdate()
						}
						if (this.isVirtualScroll()) {
							this.__OnVScroll()
						}
						this.fire("columnschanged")
					},
					doLayout : function() {
						if (this.canLayout() == false) {
							return
						}
						fui.ScrollGridView.superclass.doLayout.call(this);
						this._layoutScroll()
					},
					_createRowsHTML : function(d, o, g, m, a, l) {
						var c = this.isVirtualScroll();
						if (!c) {
							return fui.ScrollGridView.superclass._createRowsHTML
									.apply(this, arguments)
						}
						var n = c ? this._getViewRegion() : null;
						var i = [ '<table class="fui-grid-table" cellspacing="0" cellpadding="0" border="0">' ];
						i.push(this._createTopRowHTML(d));
						if (this.isVirtualScroll()) {
							var b = m == 0 ? "display:none;" : "";
							i
									.push('<tr class="fui-grid-virtualscroll-top" style="padding:0;border:0;'
											+ b
											+ '"><td colspan="'
											+ d.length
											+ '" style="height:'
											+ m
											+ "px;padding:0;border:0;"
											+ b
											+ '"></td></tr>')
						}
						if (o == 1 && this.isFrozen() == false) {
						} else {
							for (var f = 0, e = g.length; f < e; f++) {
								var h = g[f];
								this._createRowHTML(h, l, d, o, i);
								l++
							}
						}
						if (this.isVirtualScroll()) {
							i
									.push('<tr class="fui-grid-virtualscroll-bottom" style="padding:0;border:0;"><td colspan="'
											+ d.length
											+ '" style="height:'
											+ a
											+ 'px;padding:0;border:0;"></td></tr>')
						}
						i.push("</table>");
						return i.join("")
					},
					doUpdateRows : function() {
						if (this.isVirtualScroll() == false) {
							fui.ScrollGridView.superclass.doUpdateRows
									.call(this);
							return
						}
						var i = this._getViewRegion();
						this._viewRegion = i;
						var g = this.getFrozenColumns();
						var f = this.getUnFrozenColumns();
						var h = i.viewStart;
						var a = i.start;
						var b = i.viewEnd;
						if (this._scrollPaging) {
							var d = this.getPageIndex() * this.getPageSize();
							h -= d;
							a -= d;
							b -= d
						}
						var j = new Date();
						var e = this._createRowsHTML(g, 1, i.rows, i.viewTop,
								i.viewBottom, h);
						var c = this._createRowsHTML(f, 2, i.rows, i.viewTop,
								i.viewBottom, h);
						this._rowsLockContentEl.innerHTML = e;
						this._rowsViewContentEl.innerHTML = c
					},
					_create : function() {
						fui.ScrollGridView.superclass._create.call(this);
						this._vscrollEl = fui
								.append(
										this._rowsEl,
										'<div class="fui-grid-vscroll"><div class="fui-grid-vscroll-content"></div></div>');
						this._vscrollContentEl = this._vscrollEl.firstChild
					},
					_initEvents : function() {
						fui.ScrollGridView.superclass._initEvents.call(this);
						var a = this;
						fui.on(this._vscrollEl, "scroll", this.__OnVScroll,
								this);
						fui._onScrollDownUp(this._vscrollEl, function(b) {
							a._VScrollMouseDown = true
						}, function(b) {
							a._VScrollMouseDown = false
						})
					},
					_layoutScroll : function() {
						var d = this.isVirtualScroll();
						if (d) {
							var b = this.getScrollHeight();
							var c = b > this._rowsViewEl.offsetHeight;
							if (d && c) {
								this._vscrollEl.style.display = "block";
								this._vscrollContentEl.style.height = b + "px"
							} else {
								this._vscrollEl.style.display = "none"
							}
							if (this._rowsViewEl.scrollWidth > this._rowsViewEl.clientWidth + 1) {
								var a = this.getBodyHeight(true) - 18;
								if (a < 0) {
									a = 0
								}
								this._vscrollEl.style.height = a + "px"
							} else {
								this._vscrollEl.style.height = "100%"
							}
						} else {
							this._vscrollEl.style.display = "none"
						}
					},
					getScrollHeight : function() {
						var a = this.getVisibleRows();
						return this._getRangeHeight(0, a.length)
					},
					setScrollTop : function(a) {
						if (this.isVirtualScroll()) {
							this._vscrollEl.scrollTop = a
						} else {
							this._rowsViewEl.scrollTop = a
						}
					},
					getScrollTop : function() {
						if (this.isVirtualScroll()) {
							return this._vscrollEl.scrollTop
						} else {
							return this._rowsViewEl.scrollTop
						}
					},
					__OnVScroll : function(b) {
						var c = this.isVirtualScroll();
						if (c) {
							this._scrollTop = this._vscrollEl.scrollTop;
							var a = this;
							setTimeout(function() {
								a._rowsViewEl.scrollTop = a._scrollTop;
								a.__scrollTimer = null
							}, 8);
							if (this._scrollTopTimer) {
								clearTimeout(this._scrollTopTimer)
							}
							this._scrollTopTimer = setTimeout(function() {
								a._scrollTopTimer = null;
								a._tryUpdateScroll();
								a._rowsViewEl.scrollTop = a._scrollTop
							}, 80)
						}
					},
					__OnMouseWheel : function(f) {
						var b = f.wheelDelta ? f : f.originalEvent;
						var a = b.wheelDelta || -b.detail * 24;
						var d = this.getScrollTop() - a;
						var c = this.getScrollTop();
						this.setScrollTop(d);
						if (c != this.getScrollTop() || this.isVirtualScroll()) {
							f.preventDefault()
						}
					},
					_tryUpdateScroll : function() {
						var c = this._canVirtualUpdate();
						if (c) {
							if (this._scrollPaging) {
								var b = this;
								this.reload(null, null, function(d) {
								})
							} else {
								var a = new Date();
								this.doUpdateRows()
							}
						} else {
						}
					}
				});
fui.regClass(fui.ScrollGridView, "ScrollGridView");
fui._onScrollDownUp = function(e, d, f) {
	function a(g) {
		if (fui.isFirefox) {
			fui.on(document, "mouseup", b)
		} else {
			fui.on(document, "mousemove", c)
		}
		d(g)
	}
	function c(g) {
		fui.un(document, "mousemove", c);
		f(g)
	}
	function b(g) {
		fui.un(document, "mouseup", b);
		f(g)
	}
	fui.on(e, "mousedown", a)
};
fui._Grid_Select = function(a) {
	this.owner = a, el = a.el;
	a.on("rowmousemove", this.__OnRowMouseMove, this);
	fui.on(a._viewportEl, "mouseout", this.__OnMouseOut, this);
	fui.on(a._viewportEl, "mousewheel", this.__OnMouseWheel, this);
	a.on("cellmousedown", this.__OnCellMouseDown, this);
	a.on("cellclick", this.__OnGridCellClick, this);
	a.on("celldblclick", this.__OnGridCellClick, this);
	fui.on(a.el, "keydown", this.__OnGridKeyDown, this)
};
fui._Grid_Select.prototype = {
	__OnGridKeyDown : function(g) {
		var a = this.owner;
		if (fui.isAncestor(a._filterEl, g.target)
				|| fui.isAncestor(a._summaryEl, g.target)
				|| fui.isAncestor(a._toolbarEl, g.target)
				|| fui.isAncestor(a._footerEl, g.target)
				|| fui.findParent(g.target, "fui-grid-detailRow")
				|| fui.findParent(g.target, "fui-grid-rowEdit")
				|| fui.findParent(g.target, "fui-tree-editinput")) {
			return
		}
		var j = a.getCurrentCell();
		if (g.shiftKey || g.ctrlKey || g.altKey) {
			return
		}
		if (g.keyCode == 37 || g.keyCode == 38 || g.keyCode == 39
				|| g.keyCode == 40) {
			g.preventDefault()
		}
		var c = a.getVisibleColumns();
		var b = j ? j[1] : null, d = j ? j[0] : null;
		if (!j) {
			d = a.getCurrent()
		}
		var h = c.indexOf(b);
		var i = a.indexOf(d);
		var f = a.getVisibleRows().length;
		switch (g.keyCode) {
		case 9:
			if (a.allowCellEdit && a.editOnTabKey) {
				g.preventDefault();
				a._beginEditNextCell(g.shiftKey == false);
				return
			}
			break;
		case 27:
			break;
		case 13:
			if (a.allowCellEdit && a.editNextOnEnterKey) {
				if (a.isEditingCell(j) || !b.editor) {
					a._beginEditNextCell(g.shiftKey == false);
					return
				}
			}
			if (a.allowCellEdit && j && !b.readOnly) {
				a.beginEditCell()
			}
			break;
		case 37:
			if (b) {
				if (h > 0) {
					h -= 1
				}
			} else {
				h = 0
			}
			break;
		case 38:
			if (d) {
				if (i > 0) {
					i -= 1
				}
			} else {
				i = 0
			}
			if (i != 0 && a.isVirtualScroll()) {
				if (a._viewRegion.start > i) {
					a._bodyEl.scrollTop -= a._rowHeight;
					a._tryUpdateScroll()
				}
			}
			break;
		case 39:
			if (b) {
				if (h < c.length - 1) {
					h += 1
				}
			} else {
				h = 0
			}
			break;
		case 40:
			if (d) {
				if (i < f - 1) {
					i += 1
				}
			} else {
				i = 0
			}
			if (a.isVirtualScroll()) {
				if (a._viewRegion.end < i) {
					a._bodyEl.scrollTop += a._rowHeight;
					a._tryUpdateScroll()
				}
			}
			break;
		default:
			break
		}
		b = c[h];
		d = a.getAt(i);
		if (b && d && a.allowCellSelect) {
			var j = [ d, b ];
			a.setCurrentCell(j);
			a.scrollIntoView(d, b)
		}
		if (d && a.allowRowSelect) {
			a.deselectAll();
			a.setCurrent(d);
			if (d) {
				a.scrollIntoView(d)
			}
		}
	},
	__OnMouseWheel : function(b) {
		var a = this.owner;
		if (a.allowCellEdit) {
			a.commitEdit()
		}
	},
	__OnGridCellClick : function(d) {
		var b = this.owner;
		if (b.allowCellEdit == false) {
			return
		}
		if (b.cellEditAction != d.type) {
			return
		}
		var a = d.record, c = d.column;
		if (!c.readOnly && !b.isReadOnly()) {
			if (d.htmlEvent.shiftKey || d.htmlEvent.ctrlKey) {
			} else {
				b.beginEditCell()
			}
		}
	},
	__OnCellMouseDown : function(b) {
		var a = this;
		setTimeout(function() {
			a.__doSelect(b)
		}, 1)
	},
	__OnRowMouseMove : function(c) {
		var b = this.owner;
		var a = c.record;
		if (!b.enabled || b.enableHotTrack == false) {
			return
		}
		b.focusRow(a)
	},
	__OnMouseOut : function(a) {
		this.owner.focusRow(null)
	},
	__doSelect : function(h) {
		var b = h.record, f = h.column;
		var d = this.owner;
		if (b.enabled === false) {
			return
		}
		if (d.allowCellSelect) {
			var a = [ b, f ];
			d.setCurrentCell(a)
		}
		if (d.allowRowSelect) {
			var c = {
				record : b,
				selected : b,
				cancel : false
			};
			if (b) {
				d.fire("beforerowselect", c)
			}
			if (c.cancel) {
				return
			}
			if (d.getMultiSelect()) {
				d.el.onselectstart = function() {
				};
				if (h.htmlEvent.shiftKey) {
					d.el.onselectstart = function() {
						return false
					};
					h.htmlEvent.preventDefault();
					var g = d.getCurrent();
					if (g) {
						d.deselectAll();
						d.selectRange(g, b);
						d.setCurrent(g)
					} else {
						d.select(b);
						d.setCurrent(b)
					}
				} else {
					d.el.onselectstart = function() {
					};
					if (h.htmlEvent.ctrlKey) {
						d.el.onselectstart = function() {
							return false
						};
						h.htmlEvent.preventDefault()
					}
					if (h.column._multiRowSelect === true
							|| h.htmlEvent.ctrlKey || d.allowUnselect) {
						if (d.isSelected(b)) {
							d.deselect(b)
						} else {
							d.select(b);
							d.setCurrent(b)
						}
					} else {
						if (d.isSelected(b)) {
						} else {
							d.deselectAll();
							d.select(b);
							d.setCurrent(b)
						}
					}
				}
			} else {
				if (!d.isSelected(b)) {
					d.deselectAll();
					d.select(b)
				} else {
					if (h.htmlEvent.ctrlKey || d.allowUnselect) {
						d.deselectAll()
					}
				}
			}
		}
	}
};
fui._Grid_RowGroup = function(a) {
	this.owner = a, el = a.el;
	fui.on(a._bodyEl, "click", this.__OnClick, this)
};
fui._Grid_RowGroup.prototype = {
	__OnClick : function(c) {
		var a = this.owner;
		var b = a._getRowGroupByEvent(c);
		if (b) {
			a.toggleRowGroup(b)
		}
	}
};
fui._Grid_ColumnsMenu = function(a) {
	this.owner = a;
	this.menu = this.createMenu();
	fui.on(a.el, "contextmenu", this.__OnContextMenu, this)
};
fui._Grid_ColumnsMenu.prototype = {
	createMenu : function() {
		var a = fui.create({
			type : "menu",
			hideOnClick : false
		});
		a.on("itemclick", this.__OnItemClick, this);
		return a
	},
	updateMenu : function() {
		var e = this.owner, h = this.menu;
		var d = e.getBottomColumns();
		var b = [];
		for (var c = 0, a = d.length; c < a; c++) {
			var f = d[c];
			var g = {};
			g.checked = f.visible;
			g.checkOnClick = true;
			g.text = e._createHeaderText(f);
			if (g.text == "&nbsp;") {
				if (f.type == "indexcolumn") {
					g.text = "序号"
				}
				if (f.type == "checkcolumn") {
					g.text = "选择"
				}
			}
			b.push(g);
			g.enabled = f.enabled;
			g._column = f
		}
		h.setItems(b)
	},
	__OnContextMenu : function(b) {
		var a = this.owner;
		if (a.showColumnsMenu == false) {
			return
		}
		if (fui.isAncestor(a._columnsEl, b.target) == false) {
			return
		}
		this.updateMenu();
		this.menu.showAtPos(b.pageX, b.pageY);
		return false
	},
	__OnItemClick : function(k) {
		var a = this.owner, b = this.menu;
		var f = a.getBottomColumns();
		var m = b.getItems();
		var o = k.item, d = o._column;
		var g = 0;
		for (var j = 0, c = m.length; j < c; j++) {
			var h = m[j];
			if (h.getChecked()) {
				g++
			}
		}
		if (g < 1) {
			o.setChecked(true)
		}
		var n = o.getChecked();
		if (n) {
			a.showColumn(d)
		} else {
			a.hideColumn(d)
		}
	}
};
fui._Grid_CellToolTip = function(a) {
	this.owner = a;
	fui.on(this.owner._bodyEl, "mousemove", this.__OnGridMouseMove, this)
};
fui._Grid_CellToolTip.prototype = {
	__OnGridMouseMove : function(g) {
		var d = this.owner;
		var a = d._getCellByEvent(g);
		var b = d._getCellEl(a[0], a[1]);
		var c = d.getCellError(a[0], a[1]);
		if (b) {
			if (c) {
				setTimeout(function() {
					b.title = c.errorText
				}, 10);
				return
			}
			if (b.firstChild) {
				if (fui.hasClass(b.firstChild, "fui-grid-cell-inner")) {
					b = b.firstChild
				}
			}
			if (b.scrollWidth > b.clientWidth) {
				var f = b.innerText || b.textContent || "";
				b.title = f.trim()
			} else {
				b.title = ""
			}
		}
	}
};
fui._Grid_Sorter = function(a) {
	this.owner = a;
	this.owner.on("headercellclick", this.__OnGridHeaderCellClick, this);
	fui.on(a._headerEl, "mousemove", this.__OnGridHeaderMouseMove, this);
	fui.on(a._headerEl, "mouseout", this.__OnGridHeaderMouseOut, this)
};
fui._Grid_Sorter.prototype = {
	__OnGridHeaderMouseOut : function(a) {
		if (this._focusedColumnEl) {
			fui.removeClass(this._focusedColumnEl, "fui-grid-headerCell-hover")
		}
	},
	__OnGridHeaderMouseMove : function(b) {
		var a = fui.findParent(b.target, "fui-grid-headerCell");
		if (a) {
			fui.addClass(a, "fui-grid-headerCell-hover");
			this._focusedColumnEl = a
		}
	},
	__OnGridHeaderCellClick : function(d) {
		var a = this.owner;
		if (!fui.hasClass(d.htmlEvent.target, "fui-grid-column-splitter")) {
			if (a.allowSortColumn && a.isEditing() == false) {
				var c = d.column;
				if (!c.columns || c.columns.length == 0) {
					if (c.field && c.allowSort !== false) {
						var b = "asc";
						if (a.getSortField() == c.field) {
							b = a.getSortOrder() == "asc" ? "desc" : "asc"
						}
						a.sortBy(c.field, b)
					}
				}
			}
		}
	}
};
fui._Grid_ColumnMove = function(a) {
	this.owner = a;
	fui.on(this.owner.el, "mousedown", this.__onGridMouseDown, this)
};
fui._Grid_ColumnMove.prototype = {
	__onGridMouseDown : function(d) {
		var b = this.owner;
		if (b.isEditing()) {
			return
		}
		if (fui.hasClass(d.target, "fui-grid-column-splitter")) {
			return
		}
		if (d.button == fui.MouseButton.Right) {
			return
		}
		var a = fui.findParent(d.target, b._headerCellCls);
		if (a) {
			this._remove();
			var c = b._getColumnByEvent(d);
			if (b.allowMoveColumn && c && c.allowMove) {
				this.dragColumn = c;
				this._columnEl = a;
				this.getDrag().start(d)
			}
		}
	},
	getDrag : function() {
		if (!this.drag) {
			this.drag = new fui.Drag({
				capture : false,
				onStart : fui.createDelegate(this._OnDragStart, this),
				onMove : fui.createDelegate(this._OnDragMove, this),
				onStop : fui.createDelegate(this._OnDragStop, this)
			})
		}
		return this.drag
	},
	_OnDragStart : function(b) {
		function c(d) {
			var e = d.header;
			if (typeof e == "function") {
				e = e.call(a, d)
			}
			if (fui.isNull(e) || e === "") {
				e = "&nbsp;"
			}
			return e
		}
		var a = this.owner;
		this._dragProxy = fui.append(document.body,
				'<div class="fui-grid-columnproxy"></div>');
		this._dragProxy.innerHTML = '<div class="fui-grid-columnproxy-inner" style="height:26px;">'
				+ c(this.dragColumn) + "</div>";
		fui.setXY(this._dragProxy, b.now[0] + 15, b.now[1] + 18);
		fui.addClass(this._dragProxy, "fui-grid-no");
		this.moveTop = fui.append(document.body,
				'<div class="fui-grid-movetop"></div>');
		this.moveBottom = fui.append(document.body,
				'<div class="fui-grid-movebottom"></div>')
	},
	_OnDragMove : function(d) {
		var a = this.owner;
		var e = d.now[0];
		fui.setXY(this._dragProxy, e + 15, d.now[1] + 18);
		this.targetColumn = this.insertAction = null;
		var i = fui.findParent(d.event.target, a._headerCellCls);
		if (i) {
			var b = a._getColumnByEvent(d.event);
			if (b && b != this.dragColumn) {
				var h = a.getParentColumn(this.dragColumn);
				var f = a.getParentColumn(b);
				if (h == f) {
					this.targetColumn = b;
					this.insertAction = "before";
					var g = a.getColumnBox(this.targetColumn);
					if (e > g.x + g.width / 2) {
						this.insertAction = "after"
					}
				}
			}
		}
		if (this.targetColumn) {
			fui.addClass(this._dragProxy, "fui-grid-ok");
			fui.removeClass(this._dragProxy, "fui-grid-no");
			var c = a.getColumnBox(this.targetColumn);
			this.moveTop.style.display = "block";
			this.moveBottom.style.display = "block";
			if (this.insertAction == "before") {
				fui.setXY(this.moveTop, c.x - 4, c.y - 9);
				fui.setXY(this.moveBottom, c.x - 4, c.bottom)
			} else {
				fui.setXY(this.moveTop, c.right - 4, c.y - 9);
				fui.setXY(this.moveBottom, c.right - 4, c.bottom)
			}
		} else {
			fui.removeClass(this._dragProxy, "fui-grid-ok");
			fui.addClass(this._dragProxy, "fui-grid-no");
			this.moveTop.style.display = "none";
			this.moveBottom.style.display = "none"
		}
	},
	_remove : function() {
		var a = this.owner;
		fui.removeNode(this._dragProxy);
		fui.removeNode(this.moveTop);
		fui.removeNode(this.moveBottom);
		this._dragProxy = this.moveTop = this.moveBottom = this.dragColumn = this.targetColumn = null
	},
	_OnDragStop : function(b) {
		var a = this.owner;
		a.moveColumn(this.dragColumn, this.targetColumn, this.insertAction);
		this._remove()
	}
};
fui._Grid_ColumnSplitter = function(a) {
	this.owner = a;
	fui.on(a.el, "mousedown", this.__OnMouseDown, this)
};
fui._Grid_ColumnSplitter.prototype = {
	__OnMouseDown : function(d) {
		var b = this.owner;
		var a = d.target;
		if (fui.hasClass(a, "fui-grid-column-splitter")) {
			var c = b._getColumnById(a.id);
			if (b.isEditing()) {
				return
			}
			if (b.allowResizeColumn && c && c.allowResize) {
				this.splitterColumn = c;
				this.getDrag().start(d)
			}
		}
	},
	getDrag : function() {
		if (!this.drag) {
			this.drag = new fui.Drag({
				capture : true,
				onStart : fui.createDelegate(this._OnDragStart, this),
				onMove : fui.createDelegate(this._OnDragMove, this),
				onStop : fui.createDelegate(this._OnDragStop, this)
			})
		}
		return this.drag
	},
	_OnDragStart : function(c) {
		var b = this.owner;
		var a = b.getColumnBox(this.splitterColumn);
		this.columnBox = a;
		this._dragProxy = fui.append(document.body,
				'<div class="fui-grid-proxy"></div>');
		var d = b.getGridViewBox();
		d.x = a.x;
		d.width = a.width;
		d.right = a.right;
		fui.setBox(this._dragProxy, d)
	},
	_OnDragMove : function(c) {
		var a = this.owner;
		var d = fui.copyTo({}, this.columnBox);
		var b = d.width + (c.now[0] - c.init[0]);
		if (b < a.columnMinWidth) {
			b = a.columnMinWidth
		}
		if (b > a.columnMaxWidth) {
			b = a.columnMaxWidth
		}
		fui.setWidth(this._dragProxy, b)
	},
	_OnDragStop : function(f) {
		var a = this.owner;
		var e = fui.getBox(this._dragProxy);
		var g = this;
		var h = a.allowSortColumn;
		a.allowSortColumn = false;
		setTimeout(function() {
			jQuery(g._dragProxy).remove();
			g._dragProxy = null;
			a.allowSortColumn = h
		}, 10);
		var d = this.splitterColumn;
		var c = parseInt(d.width);
		if (c + "%" != d.width) {
			var b = a.getColumnWidth(d);
			var i = parseInt(c / b * e.width);
			a.setColumnWidth(d, i)
		}
	}
};
fui._Grid_DragDrop = function(a) {
	this.owner = a;
	this.owner.on("CellMouseDown", this.__OnGridCellMouseDown, this)
};
fui._Grid_DragDrop.prototype = {
	__OnGridCellMouseDown : function(f) {
		if (f.htmlEvent.button == fui.MouseButton.Right) {
			return
		}
		var c = this.owner;
		if (c._dragging) {
			return
		}
		this.dropObj = c;
		if (fui.findParent(f.htmlEvent.target, "fui-tree-editinput")) {
			return
		}
		if (c.isReadOnly() || c.isAllowDrag(f.record, f.column) == false) {
			return
		}
		var b = c._OnDragStart(f.record, f.column);
		if (b.cancel) {
			return
		}
		this.dragText = b.dragText;
		var a = f.record;
		this.isTree = !!c.isTree;
		this.beginRecord = a;
		var d = this._getDrag();
		d.start(f.htmlEvent)
	},
	_OnDragStart : function(c) {
		var b = this.owner;
		b._dragging = true;
		var a = this.beginRecord;
		this.dragData = b._getDragData();
		if (this.dragData.indexOf(a) == -1) {
			this.dragData.push(a)
		}
		this.feedbackEl = fui.append(document.body,
				'<div class="fui-feedback"></div>');
		this.feedbackEl.innerHTML = this.dragText;
		this.lastFeedbackClass = "";
		this.enableHotTrack = b.getEnableHotTrack();
		b.setEnableHotTrack(false)
	},
	_getDropTargetObj : function(a) {
		var b = fui.findParent(a.target, "fui-grid", 500);
		if (b) {
			return fui.get(b)
		}
	},
	_OnDragMove : function(d) {
		var c = this.owner;
		var e = this._getDropTargetObj(d.event);
		this.dropObj = e;
		var a = d.now[0], f = d.now[1];
		fui.setXY(this.feedbackEl, a + 15, f + 18);
		if (e && e.allowDrop) {
			this.isTree = e.isTree;
			var b = e._getRecordByEvent(d.event);
			this.dropRecord = b;
			if (b) {
				if (this.isTree) {
					this.dragAction = this.getFeedback(b, f, 3)
				} else {
					this.dragAction = this.getFeedback(b, f, 2)
				}
			} else {
				this.dragAction = "no"
			}
		} else {
			this.dragAction = "no"
		}
		if (e && e.allowDrop && !b && e.getData().length == 0) {
			this.dragAction = "add"
		}
		this.lastFeedbackClass = "fui-feedback-" + this.dragAction;
		this.feedbackEl.className = "fui-feedback " + this.lastFeedbackClass;
		if (this.dragAction == "no") {
			b = null
		}
		this.setRowFeedback(b, this.dragAction)
	},
	_OnDragStop : function(o) {
		var a = this.owner;
		var s = this.dropObj;
		a._dragging = false;
		fui.removeNode(this.feedbackEl);
		a.setEnableHotTrack(this.enableHotTrack);
		this.feedbackEl = null;
		this.setRowFeedback(null);
		if (this.isTree) {
			var c = [];
			for (var n = 0, f = this.dragData.length; n < f; n++) {
				var q = this.dragData[n];
				var t = false;
				for (var m = 0, h = this.dragData.length; m < h; m++) {
					var d = this.dragData[m];
					if (d != q) {
						t = a.isAncestor(d, q);
						if (t) {
							break
						}
					}
				}
				if (!t) {
					c.push(q)
				}
			}
			this.dragData = c
		}
		if (this.dragAction == "add" && !this.dropRecord) {
			this.dropRecord = s.getRootNode()
		}
		if (this.dropRecord && s && this.dragAction != "no") {
			var r = a._OnDragDrop(this.dragData, this.dropRecord,
					this.dragAction);
			if (!r.cancel) {
				var c = r.dragNodes, b = r.targetNode, g = r.action;
				if (s.isTree) {
					if (a == s) {
						s.moveNodes(c, b, g)
					} else {
						a.removeNodes(c);
						s.addNodes(c, b, g)
					}
				} else {
					var p = s.indexOf(b);
					if (g == "after") {
						p += 1
					}
					s.moveRow(c, p)
				}
				var r = {
					dragNode : r.dragNodes[0],
					dropNode : r.targetNode,
					dragAction : r.action,
					dragNodes : r.dragNodes,
					targetNode : r.targetNode
				};
				s.fire("drop", r)
			}
		}
		this.dropRecord = null;
		this.dragData = null
	},
	setRowFeedback : function(d, c) {
		var e = this.owner;
		var g = this.dropObj;
		if (this.lastAddDomRow && g) {
			g.removeRowCls(this.lastAddDomRow, "fui-tree-feedback-add")
		}
		if (d == null || this.dragAction == "add") {
			fui.removeNode(this.feedbackLine);
			this.feedbackLine = null
		}
		this.lastRowFeedback = d;
		if (d != null) {
			if (c == "before" || c == "after") {
				if (!this.feedbackLine) {
					this.feedbackLine = fui.append(document.body,
							"<div class='fui-feedback-line'></div>")
				}
				this.feedbackLine.style.display = "block";
				var b = g.getRowBox(d);
				var a = b.x, h = b.y - 1;
				if (c == "after") {
					h += b.height
				}
				fui.setXY(this.feedbackLine, a, h);
				var f = g.getBox(true);
				fui.setWidth(this.feedbackLine, f.width)
			} else {
				g.addRowCls(d, "fui-tree-feedback-add");
				this.lastAddDomRow = d
			}
		}
	},
	getFeedback : function(q, m, p) {
		var a = this.owner;
		var n = this.dropObj;
		var o = n.getRowBox(q);
		var g = o.height;
		var r = m - o.y;
		var s = null;
		if (this.dragData.indexOf(q) != -1) {
			return "no"
		}
		var f = false;
		if (p == 3) {
			f = n.isLeaf(q);
			for (var d = 0, c = this.dragData.length; d < c; d++) {
				var j = this.dragData[d];
				var b = n.isAncestor(j, q);
				if (b) {
					s = "no";
					break
				}
			}
		}
		if (s == null) {
			if (p == 2) {
				if (r > g / 2) {
					s = "after"
				} else {
					s = "before"
				}
			} else {
				if (f && n.allowLeafDropIn === false) {
					if (r > g / 2) {
						s = "after"
					} else {
						s = "before"
					}
				} else {
					if (r > (g / 3) * 2) {
						s = "after"
					} else {
						if (g / 3 <= r && r <= (g / 3 * 2)) {
							s = "add"
						} else {
							s = "before"
						}
					}
				}
			}
		}
		var k = n._OnGiveFeedback(s, this.dragData, q, a);
		return k.effect
	},
	_getDrag : function() {
		if (!this.drag) {
			this.drag = new fui.Drag({
				onStart : fui.createDelegate(this._OnDragStart, this),
				onMove : fui.createDelegate(this._OnDragMove, this),
				onStop : fui.createDelegate(this._OnDragStop, this)
			})
		}
		return this.drag
	}
};
fui._Grid_Events = function(a) {
	this.owner = a, el = a.el;
	fui.on(el, "click", this.__OnClick, this);
	fui.on(el, "dblclick", this.__OnDblClick, this);
	fui.on(el, "mousedown", this.__OnMouseDown, this);
	fui.on(el, "mouseup", this.__OnMouseUp, this);
	fui.on(el, "mousemove", this.__OnMouseMove, this);
	fui.on(el, "mouseover", this.__OnMouseOver, this);
	fui.on(el, "mouseout", this.__OnMouseOut, this);
	fui.on(el, "keydown", this.__OnKeyDown, this);
	fui.on(el, "keyup", this.__OnKeyUp, this);
	fui.on(el, "contextmenu", this.__OnContextMenu, this)
};
fui._Grid_Events.prototype = {
	__OnClick : function(a) {
		this._fireEvent(a, "Click")
	},
	__OnDblClick : function(a) {
		this._fireEvent(a, "Dblclick")
	},
	__OnMouseDown : function(b) {
		if (fui.findParent(b.target, "fui-tree-editinput")) {
			return
		}
		this._fireEvent(b, "MouseDown");
		var a = this.owner;
		setTimeout(function() {
			a._tryFocus(b)
		}, 30)
	},
	__OnMouseUp : function(a) {
		if (fui.findParent(a.target, "fui-tree-editinput")) {
			return
		}
		if (fui.isAncestor(this.el, a.target)) {
			this.owner._tryFocus(a);
			this._fireEvent(a, "MouseUp")
		}
	},
	__OnMouseMove : function(a) {
		this._fireEvent(a, "MouseMove")
	},
	__OnMouseOver : function(a) {
		this._fireEvent(a, "MouseOver")
	},
	__OnMouseOut : function(a) {
		this._fireEvent(a, "MouseOut")
	},
	__OnKeyDown : function(a) {
		this._fireEvent(a, "KeyDown")
	},
	__OnKeyUp : function(a) {
		this._fireEvent(a, "KeyUp")
	},
	__OnContextMenu : function(a) {
		this._fireEvent(a, "ContextMenu")
	},
	_fireEvent : function(h, b) {
		var a = this.owner;
		var j = a._getCellByEvent(h);
		var f = j[0], d = j[1];
		if (f) {
			var g = {
				record : f,
				row : f,
				htmlEvent : h
			};
			var i = a["_OnRow" + b];
			if (i) {
				i.call(a, g)
			} else {
				a.fire("row" + b, g)
			}
		}
		if (d) {
			var g = {
				column : d,
				field : d.field,
				htmlEvent : h
			};
			var i = a["_OnColumn" + b];
			if (i) {
				i.call(a, g)
			} else {
				a.fire("column" + b, g)
			}
		}
		if (f && d) {
			var g = {
				sender : a,
				record : f,
				row : f,
				column : d,
				field : d.field,
				htmlEvent : h
			};
			var i = a["_OnCell" + b];
			if (i) {
				i.call(a, g)
			} else {
				a.fire("cell" + b, g)
			}
			if (d["onCell" + b]) {
				d["onCell" + b].call(d, g)
			}
		}
		if (!f && d && fui.findParent(h.target, "fui-grid-headerCell")) {
			var g = {
				column : d,
				htmlEvent : h
			};
			var i = a["_OnHeaderCell" + b];
			if (i) {
				i.call(a, g)
			} else {
				var c = "onheadercell" + b.toLowerCase();
				if (d[c]) {
					g.sender = a;
					d[c](g)
				}
				a.fire("headercell" + b, g)
			}
		}
	}
};
fui.DataGrid = function(a) {
	fui.DataGrid.superclass.constructor.call(this, a);
	this._Events = new fui._Grid_Events(this);
	this._Select = new fui._Grid_Select(this);
	this._DragDrop = new fui._Grid_DragDrop(this);
	this._RowGroup = new fui._Grid_RowGroup(this);
	this._Splitter = new fui._Grid_ColumnSplitter(this);
	this._ColumnMove = new fui._Grid_ColumnMove(this);
	this._Sorter = new fui._Grid_Sorter(this);
	this._CellToolTip = new fui._Grid_CellToolTip(this);
	this._ColumnsMenu = new fui._Grid_ColumnsMenu(this);
	this._createPagers()
};
fui
		.extend(
				fui.DataGrid,
				fui.ScrollGridView,
				{
					uiCls : "fui-datagrid",
					selectOnLoad : false,
					showHeader : false,
					showPager : true,
					allowUnselect : false,
					allowRowSelect : true,
					allowCellSelect : false,
					allowCellEdit : false,
					cellEditAction : "cellclick",
					allowCellValid : false,
					allowResizeColumn : true,
					allowSortColumn : true,
					allowMoveColumn : true,
					showColumnsMenu : false,
					virtualScroll : false,
					enableHotTrack : true,
					showLoading : true,
					set : function(e) {
						if (typeof e == "string") {
							return this
						}
						var d = e.value;
						delete e.value;
						var a = e.url;
						delete e.url;
						var c = e.data;
						delete e.data;
						var b = e.columns;
						delete e.columns;
						if (!fui.isNull(b)) {
							this.setColumns(b)
						}
						fui.DataGrid.superclass.set.call(this, e);
						if (!fui.isNull(c)) {
							this.setData(c)
						}
						if (!fui.isNull(a)) {
							this.setUrl(a)
						}
						if (!fui.isNull(d)) {
							this.setValue(d)
						}
						return this
					},
					doUpdate : function() {
						this._destroyEditors();
						fui.DataGrid.superclass.doUpdate.apply(this, arguments)
					},
					_destroyEditors : function() {
						var b = fui.getChildControls(this);
						var d = [];
						for (var c = 0, a = b.length; c < a; c++) {
							var e = b[c];
							if (e.el && fui.findParent(e.el, this._rowCls)) {
								d.push(e);
								e.destroy()
							}
						}
					},
					_OnDrawCell : function() {
						var b = fui.DataGrid.superclass._OnDrawCell.apply(this,
								arguments);
						var a = this.getCellError(b.record, b.column);
						if (a) {
							if (!b.cellCls) {
								b.cellCls = ""
							}
							b.cellCls += " fui-grid-cell-error "
						}
						return b
					},
					_bindSource : function() {
						var a = this._dataSource;
						a.on("beforeload", this.__OnSourceBeforeLoad, this);
						a.on("preload", this.__OnSourcePreLoad, this);
						a.on("load", this.__OnSourceLoadSuccess, this);
						a.on("loaderror", this.__OnSourceLoadError, this);
						a.on("loaddata", this.__OnSourceLoadData, this);
						a.on("cleardata", this.__OnSourceClearData, this);
						a.on("sort", this.__OnSourceSort, this);
						a.on("filter", this.__OnSourceFilter, this);
						a.on("pageinfochanged", this.__OnPageInfoChanged, this);
						a.on("selectionchanged", this.__OnSelectionChanged,
								this);
						a.on("currentchanged", function(b) {
							this.fire("currentchanged", b)
						}, this);
						a.on("add", this.__OnSourceAdd, this);
						a.on("update", this.__OnSourceUpdate, this);
						a.on("remove", this.__OnSourceRemove, this);
						a.on("move", this.__OnSourceMove, this);
						a.on("beforeadd", function(b) {
							this.fire("beforeaddrow", b)
						}, this);
						a.on("beforeupdate", function(b) {
							this.fire("beforeupdaterow", b)
						}, this);
						a.on("beforeremove", function(b) {
							this.fire("beforeremoverow", b)
						}, this);
						a.on("beforemove", function(b) {
							this.fire("beforemoverow", b)
						}, this)
					},
					_initData : function() {
						this.data = this.getData();
						this.pageIndex = this.getPageIndex();
						this.pageSize = this.getPageSize();
						this.totalCount = this.getTotalCount();
						this.totalPage = this.getTotalPage();
						this.sortField = this.getSortField();
						this.sortOrder = this.getSortOrder();
						this.url = this.getUrl();
						this._mergedCellMaps = {};
						this._mergedCells = {};
						this._cellErrors = [];
						this._cellMapErrors = {}
					},
					__OnSourceBeforeLoad : function(a) {
						this.fire("beforeload", a);
						if (a.cancel == true) {
							return
						}
						if (this.showLoading) {
							this.loading()
						}
					},
					__OnSourcePreLoad : function(a) {
						this.fire("preload", a)
					},
					__OnSourceLoadSuccess : function(a) {
						if (this.isGrouping()) {
							this.groupBy(this._groupField, this._groupDir)
						}
						this.fire("load", a);
						this.unmask()
					},
					__OnSourceLoadError : function(a) {
						this.fire("loaderror", a);
						this.unmask()
					},
					__OnSourceSort : function(a) {
						this.deferUpdate();
						this.fire("sort", a)
					},
					__OnSourceFilter : function(a) {
						this.deferUpdate();
						this.fire("filter", a)
					},
					__OnSourceAdd : function(a) {
						this._doAddRowEl(a.record);
						this._doUpdateSummaryRow();
						this.fire("addrow", a)
					},
					__OnSourceUpdate : function(a) {
						this._doUpdateRowEl(a.record);
						this._doUpdateSummaryRow();
						this.fire("updaterow", a)
					},
					__OnSourceRemove : function(a) {
						this._doRemoveRowEl(a.record);
						this._doUpdateSummaryRow();
						this.fire("removerow", a);
						if (this.isVirtualScroll()) {
							this.deferUpdate()
						}
					},
					__OnSourceMove : function(a) {
						this._doMoveRowEl(a.record, a.index);
						this._doUpdateSummaryRow();
						this.fire("moverow", a)
					},
					__OnSelectionChanged : function(c) {
						if (c.select) {
							this.fire("rowselect", c)
						} else {
							this.fire("rowdeselect", c)
						}
						var b = this;
						if (this._selectionTimer) {
							clearTimeout(this._selectionTimer);
							this._selectionTimer = null
						}
						this._selectionTimer = setTimeout(function() {
							b._selectionTimer = null;
							b.fire("SelectionChanged", c)
						}, 1);
						var a = new Date();
						this._doRowSelect(c._records, c.select)
					},
					__OnPageInfoChanged : function(a) {
						this._updatePagesInfo()
					},
					_updatePagesInfo : function() {
						var a = this.getPageIndex();
						var e = this.getPageSize();
						var d = this.getTotalCount();
						var h = this.getTotalPage();
						var f = this._pagers;
						for (var g = 0, c = f.length; g < c; g++) {
							var b = f[g];
							b.update(a, e, d);
							this._dataSource.totalPage = b.totalPage
						}
					},
					setPagerButtons : function(a) {
						this._bottomPager.setButtons(a)
					},
					setPager : function(b) {
						if (typeof b == "string") {
							var a = fui.byId(b);
							if (!a) {
								return
							}
							fui.parse(b);
							b = fui.get(b)
						}
						if (b) {
							this.bindPager(b)
						}
					},
					bindPager : function(a) {
						if (!a) {
							return
						}
						this.unbindPager(a);
						this._pagers.add(a);
						a.on("beforepagechanged", this.__OnPageChanged, this)
					},
					unbindPager : function(a) {
						if (!a) {
							return
						}
						this._pagers.remove(a);
						a.un("pagechanged", this.__OnPageChanged, this)
					},
					__OnPageChanged : function(a) {
						a.cancel = true;
						this.gotoPage(a.pageIndex, a.pageSize)
					},
					_canUpdateRowEl : true,
					_doUpdateRowEl : function(d) {
						var f = this.getFrozenColumns();
						var c = this.getUnFrozenColumns();
						var e = this.indexOf(d);
						var b = this._createRowHTML(d, e, c, 2);
						var a = this._getRowEl(d, 2);
						jQuery(a).before(b);
						if (a) {
							a.parentNode.removeChild(a)
						}
						if (this.isFrozen()) {
							var b = this._createRowHTML(d, e, f, 1);
							var a = this._getRowEl(d, 1);
							jQuery(a).before(b);
							a.parentNode.removeChild(a)
						}
						this.deferLayout()
					},
					_doAddRowEl : function(i) {
						var d = this.getFrozenColumns();
						var c = this.getUnFrozenColumns();
						var g = this._rowsLockContentEl.firstChild;
						var e = this._rowsViewContentEl.firstChild;
						var f = this.indexOf(i);
						var h = this.getAt(f + 1);
						function b(o, l, m, k) {
							var n = this._createRowHTML(o, f, m, l);
							if (h) {
								var j = this._getRowEl(h, l);
								jQuery(j).before(n)
							} else {
								fui.append(k, n)
							}
						}
						b.call(this, i, 2, c, e);
						if (this.isFrozen()) {
							b.call(this, i, 1, d, g)
						}
						this.deferLayout();
						var a = jQuery(".fui-grid-emptyText", this._bodyEl)[0];
						if (a) {
							a.style.display = "none";
							a.parentNode.style.display = "none"
						}
					},
					_doRemoveRowEl : function(e) {
						var a = this._getRowEl(e, 1);
						var d = this._getRowEl(e, 2);
						if (a) {
							a.parentNode.removeChild(a)
						}
						if (d) {
							d.parentNode.removeChild(d)
						}
						var c = this._getRowDetailEl(e, 1);
						var f = this._getRowDetailEl(e, 2);
						if (c) {
							c.parentNode.removeChild(c)
						}
						if (f) {
							f.parentNode.removeChild(f)
						}
						this.deferLayout();
						if (this.showEmptyText
								&& this.getVisibleRows().length == 0) {
							var b = jQuery(".fui-grid-emptyText", this._bodyEl)[0];
							if (b) {
								b.style.display = "";
								b.parentNode.style.display = ""
							}
						}
					},
					_doMoveRowEl : function(b, a) {
						this._doRemoveRowEl(b);
						this._doAddRowEl(b)
					},
					_getRowGroupEl : function(c, a) {
						if (a == 1 && !this.isFrozen()) {
							return null
						}
						var d = this._createRowGroupId(c, a);
						var b = fui.byId(d, this.el);
						return b
					},
					_getRowGroupRowsEl : function(c, a) {
						if (a == 1 && !this.isFrozen()) {
							return null
						}
						var d = this._createRowGroupRowsId(c, a);
						var b = fui.byId(d, this.el);
						return b
					},
					_getRowEl : function(c, a) {
						if (a == 1 && !this.isFrozen()) {
							return null
						}
						c = this.getRecord(c);
						var d = this._createRowId(c, a);
						var b = fui.byId(d, this.el);
						return b
					},
					_getHeaderCellEl : function(c, a) {
						if (a == 1 && !this.isFrozen()) {
							return null
						}
						c = this.getColumn(c);
						var d = this._createHeaderCellId(c, a);
						var b = fui.byId(d, this.el);
						return b
					},
					_getCellEl : function(c, b) {
						c = this.getRecord(c);
						b = this.getColumn(b);
						if (!c || !b) {
							return null
						}
						var d = this._createCellId(c, b);
						var a = fui.byId(d, this.el);
						return a
					},
					getRecordByEvent : function(a) {
						return this._getRecordByEvent(a)
					},
					_getRecordByEvent : function(d) {
						var b = fui.findParent(d.target, this._rowCls);
						if (!b) {
							return null
						}
						var c = b.id.split("$");
						var a = c[c.length - 1];
						return this._getRowByID(a)
					},
					_getColumnByEvent : function(c) {
						var a = fui.findParent(c.target, this._cellCls);
						if (!a) {
							a = fui.findParent(c.target, this._headerCellCls)
						}
						if (a) {
							var b = a.id.split("$");
							var d = b[b.length - 1];
							return this._getColumnById(d)
						}
						return null
					},
					_getCellByEvent : function(c) {
						var a = this._getRecordByEvent(c);
						var b = this._getColumnByEvent(c);
						return [ a, b ]
					},
					_getRowByID : function(a) {
						return this._dataSource.getby_id(a)
					},
					_getColumnById : function(a) {
						return this._columnModel._getColumnById(a)
					},
					addRowCls : function(d, a) {
						var c = this._getRowEl(d, 1);
						var b = this._getRowEl(d, 2);
						if (c) {
							fui.addClass(c, a)
						}
						if (b) {
							fui.addClass(b, a)
						}
					},
					removeRowCls : function(d, a) {
						var c = this._getRowEl(d, 1);
						var b = this._getRowEl(d, 2);
						if (c) {
							fui.removeClass(c, a)
						}
						if (b) {
							fui.removeClass(b, a)
						}
					},
					getCellBox : function(c, b) {
						c = this.getRow(c);
						b = this.getColumn(b);
						if (!c || !b) {
							return null
						}
						var a = this._getCellEl(c, b);
						if (!a) {
							return null
						}
						return fui.getBox(a)
					},
					getColumnBox : function(b) {
						var d = this._createHeaderCellId(b, 2);
						var a = document.getElementById(d);
						if (!a) {
							d = this._createHeaderCellId(b, 1);
							a = document.getElementById(d)
						}
						if (a) {
							var c = fui.getBox(a);
							c.x -= 1;
							c.left = c.x;
							c.right = c.x + c.width;
							return c
						}
					},
					getRowBox : function(e) {
						var b = this._getRowEl(e, 1);
						var d = this._getRowEl(e, 2);
						if (!d) {
							return null
						}
						var c = fui.getBox(d);
						if (b) {
							var a = fui.getBox(b);
							c.x = c.left = a.left;
							c.width = c.right - c.x
						}
						return c
					},
					_doRowSelect : function(f, a) {
						var e = new Date();
						for (var d = 0, c = f.length; d < c; d++) {
							var b = f[d];
							if (a) {
								this.addRowCls(b, this._rowSelectedCls)
							} else {
								this.removeRowCls(b, this._rowSelectedCls)
							}
						}
					},
					_tryFocus : function(c) {
						try {
							var b = c.target.tagName.toLowerCase();
							if (b == "input" || b == "textarea"
									|| b == "select") {
								return
							}
							if (fui.findParent(c.target,
									"fui-grid-rows-content")) {
								fui.setXY(this._focusEl, c.pageX, c.pageY);
								this.focus()
							}
						} catch (a) {
						}
					},
					focus : function() {
						try {
							var a = this.getCurrentCell();
							if (a) {
								var d = this.getCellBox(a[0], a[1]);
								fui.setX(this._focusEl, d.x)
							}
							var g = this.getCurrent();
							if (g) {
								var c = this._getRowEl(g, 2);
								if (c) {
									var b = fui.getBox(c);
									fui.setY(this._focusEl, b.top);
									if (isOpera) {
										c.focus()
									} else {
										if (isChrome) {
											this._focusEl.focus()
										} else {
											if (isGecko) {
												this._focusEl.focus()
											} else {
												this._focusEl.focus()
											}
										}
									}
								}
							} else {
								if (isGecko) {
									this.el.focus()
								} else {
									this._focusEl.focus()
								}
							}
						} catch (f) {
						}
					},
					focusRow : function(a) {
						if (this._focusRow == a) {
							return
						}
						if (this._focusRow) {
							this
									.removeRowCls(this._focusRow,
											this._rowHoverCls)
						}
						this._focusRow = a;
						if (a) {
							this.addRowCls(a, this._rowHoverCls)
						}
					},
					scrollIntoView : function(f, c) {
						try {
							if (c) {
								if (this._columnModel.isFrozenColumn(c)) {
									c = null
								}
							}
							if (c) {
								var a = this._getCellEl(f, c);
								fui.scrollIntoView(a, this._rowsViewEl, true)
							} else {
								var b = this._getRowEl(f, 2);
								fui.scrollIntoView(b, this._rowsViewEl, false)
							}
						} catch (d) {
						}
					},
					setShowLoading : function(a) {
						this.showLoading = a
					},
					getShowLoading : function() {
						return this.showLoading
					},
					setEnableHotTrack : function(a) {
						this.enableHotTrack = a
					},
					getEnableHotTrack : function() {
						return this.enableHotTrack
					},
					setAllowUnselect : function(a) {
						this.allowUnselect = a
					},
					getAllowUnselect : function() {
						return this.allowUnselect
					},
					setAllowRowSelect : function(a) {
						this.allowRowSelect = a
					},
					getAllowRowSelect : function() {
						return this.allowRowSelect
					},
					setAllowCellSelect : function(a) {
						this.allowCellSelect = a
					},
					getAllowCellSelect : function() {
						return this.allowCellSelect
					},
					setAllowCellEdit : function(a) {
						this.allowCellEdit = a
					},
					getAllowCellEdit : function() {
						return this.allowCellEdit
					},
					setCellEditAction : function(a) {
						this.cellEditAction = a
					},
					getCellEditAction : function() {
						return this.cellEditAction
					},
					setAllowCellValid : function(a) {
						this.allowCellValid = a
					},
					getAllowCellValid : function() {
						return this.allowCellValid
					},
					setAllowResizeColumn : function(a) {
						this.allowResizeColumn = a;
						fui.removeClass(this.el, "fui-grid-resizeColumns-no");
						if (!a) {
							fui.addClass(this.el, "fui-grid-resizeColumns-no")
						}
					},
					getAllowResizeColumn : function() {
						return this.allowResizeColumn
					},
					setAllowSortColumn : function(a) {
						this.allowSortColumn = a
					},
					getAllowSortColumn : function() {
						return this.allowSortColumn
					},
					setAllowMoveColumn : function(a) {
						this.allowMoveColumn = a
					},
					getAllowMoveColumn : function() {
						return this.allowMoveColumn
					},
					setShowColumnsMenu : function(a) {
						this.showColumnsMenu = a
					},
					getShowColumnsMenu : function() {
						return this.showColumnsMenu
					},
					setEditNextRowCell : function(a) {
						this.editNextRowCell = a
					},
					getEditNextRowCell : function() {
						return this.editNextRowCell
					},
					setEditNextOnEnterKey : function(a) {
						this.editNextOnEnterKey = a
					},
					getEditNextOnEnterKey : function() {
						return this.editNextOnEnterKey
					},
					setEditOnTabKey : function(a) {
						this.editOnTabKey = a
					},
					getEditOnTabKey : function() {
						return this.editOnTabKey
					},
					setCreateOnEnter : function(a) {
						this.createOnEnter = a
					},
					getCreateOnEnter : function() {
						return this.createOnEnter
					},
					_currentCell : null,
					_doCurrentCell : function(a) {
						if (this._currentCell) {
							var b = this._currentCell[0], d = this._currentCell[1];
							var c = this._getCellEl(b, d);
							if (c) {
								if (a) {
									fui.addClass(c, this._cellSelectedCls)
								} else {
									fui.removeClass(c, this._cellSelectedCls)
								}
							}
						}
					},
					setCurrentCell : function(a) {
						if (this._currentCell != a) {
							this._doCurrentCell(false);
							this._currentCell = a;
							if (a) {
								var c = this.getRow(a[0]);
								var b = this.getColumn(a[1]);
								if (c && b) {
									this._currentCell = [ c, b ]
								} else {
									this._currentCell = null
								}
							}
							this._doCurrentCell(true);
							if (a) {
								if (this.isFrozen()) {
									this.scrollIntoView(a[0])
								} else {
									this.scrollIntoView(a[0], a[1])
								}
							}
							this.fire("currentcellchanged")
						}
					},
					getCurrentCell : function() {
						var a = this._currentCell;
						if (a) {
							if (this.indexOf(a[0]) == -1) {
								this._currentCell = null;
								a = null
							}
						}
						return a
					},
					_editingCell : null,
					isEditingCell : function(a) {
						return this._editingCell
								&& this._editingCell[0] == a[0]
								&& this._editingCell[1] == a[1]
					},
					beginEditCell : function(d, c) {
						d = this.getRow(d);
						c = this.getColumn(c);
						var a = [ d, c ];
						if (d && c) {
							this.setCurrentCell(a)
						}
						var a = this.getCurrentCell();
						if (this._editingCell && a) {
							if (this._editingCell[0] == a[0]
									&& this._editingCell[1] == a[1]) {
								return
							}
						}
						if (this._editingCell) {
							this.commitEdit()
						}
						if (a) {
							var d = a[0], c = a[1];
							var b = this._OnCellBeginEdit(d, c, this
									.getCellEditor(c));
							if (b !== false) {
								this.scrollIntoView(d, c);
								this._editingCell = a;
								this._OnCellShowingEdit(d, c)
							}
						}
					},
					cancelEdit : function() {
						if (this.allowCellEdit) {
							if (this._editingCell) {
								this._OnCellEndEdit()
							}
						} else {
							if (this.isEditing()) {
								this._allowLayout = false;
								var c = this.getDataView();
								for (var b = 0, a = c.length; b < a; b++) {
									var d = c[b];
									if (d._editing == true) {
										this.cancelEditRow(b)
									}
								}
								this._allowLayout = true;
								this.doLayout()
							}
						}
					},
					commitEdit : function() {
						if (this.allowCellEdit) {
							if (this._editingCell) {
								this._OnCellCommitEdit(this._editingCell[0],
										this._editingCell[1]);
								this._OnCellEndEdit()
							}
						} else {
							if (this.isEditing()) {
								this._allowLayout = false;
								var c = this.getDataView();
								for (var b = 0, a = c.length; b < a; b++) {
									var d = c[b];
									if (d._editing == true) {
										this.commitEditRow(b)
									}
								}
								this._allowLayout = true;
								this.doLayout()
							}
						}
					},
					getCellEditor : function(b, c) {
						b = this.getColumn(b);
						if (!b) {
							return
						}
						if (this.allowCellEdit) {
							var a = b.__editor;
							if (!a) {
								a = fui.getAndCreate(b.editor)
							}
							if (a && a != b.editor) {
								b.editor = a
							}
							return a
						} else {
							c = this.getRow(c);
							b = this.getColumn(b);
							if (!c) {
								c = this.getEditingRow()
							}
							if (!c || !b) {
								return null
							}
							var d = this.uid + "$" + c._uid + "$" + b._id
									+ "$editor";
							return fui.get(d)
						}
					},
					_OnCellBeginEdit : function(b, d, c) {
						var f = fui._getMap(d.field, b);
						var h = {
							sender : this,
							rowIndex : this.indexOf(b),
							row : b,
							record : b,
							column : d,
							field : d.field,
							editor : c,
							value : f,
							cancel : false
						};
						this.fire("cellbeginedit", h);
						if (!fui.isNull(d.defaultValue)
								&& (fui.isNull(h.value) || h.value === "")) {
							var a = d.defaultValue;
							var g = fui.clone({
								d : a
							});
							h.value = g.d
						}
						var c = h.editor;
						f = h.value;
						if (h.cancel) {
							return false
						}
						if (!c) {
							return false
						}
						if (fui.isNull(f)) {
							f = ""
						}
						if (c.setValue) {
							c.setValue(f)
						}
						c.ownerRowID = b._uid;
						if (d.displayField && c.setText) {
							var i = fui._getMap(d.displayField, b);
							if (!fui.isNull(d.defaultText)
									&& (fui.isNull(i) || i === "")) {
								var g = fui.clone({
									d : d.defaultText
								});
								i = g.d
							}
							c.setText(i)
						}
						if (this.allowCellEdit) {
							this._editingControl = h.editor
						}
						return true
					},
					_OnCellCommitEdit : function(f, d, j, g) {
						var h = {
							sender : this,
							rowIndex : this.indexOf(f),
							record : f,
							row : f,
							column : d,
							field : d.field,
							editor : g ? g : this.getCellEditor(d),
							value : fui.isNull(j) ? "" : j,
							text : "",
							cancel : false
						};
						if (h.editor && h.editor.getValue) {
							try {
								h.editor.blur()
							} catch (i) {
							}
							h.value = h.editor.getValue()
						}
						if (h.editor && h.editor.getText) {
							h.text = h.editor.getText()
						}
						var a = f[d.field], b = h.value;
						h.oldValue = a;
						if (fui.isEquals(a, b)) {
							return h
						}
						this.fire("cellcommitedit", h);
						if (h.cancel == false) {
							if (this.allowCellEdit) {
								var c = {};
								c[d.field] = h.value;
								if (d.displayField) {
									c[d.displayField] = h.text
								}
								this.updateRow(f, c)
							}
						}
						return h
					},
					_OnCellEndEdit : function() {
						if (!this._editingCell) {
							return
						}
						var a = this._editingCell[0];
						var f = this._editingCell[1];
						var g = {
							sender : this,
							rowIndex : this.indexOf(a),
							record : a,
							row : a,
							column : f,
							field : f.field,
							editor : this._editingControl,
							value : a[f.field]
						};
						this.fire("cellendedit", g);
						if (this.allowCellEdit) {
							var d = g.editor;
							if (d && d.setIsValid) {
								d.setIsValid(true)
							}
							if (this._editWrap) {
								this._editWrap.style.display = "none"
							}
							var h = this._editWrap.childNodes;
							for (var b = h.length - 1; b >= 0; b--) {
								var c = h[b];
								this._editWrap.removeChild(c)
							}
							if (d && d.hidePopup) {
								d.hidePopup()
							}
							if (d && d.setValue) {
								d.setValue("")
							}
							this._editingControl = null;
							this._editingCell = null;
							if (this.allowCellValid) {
								this.validateCell(a, f)
							}
						}
					},
					_OnCellShowingEdit : function(d, b) {
						if (!this._editingControl) {
							return false
						}
						var i = this.getCellBox(d, b);
						var c = document.body.scrollWidth;
						if (i.right > c) {
							i.width = c - i.left;
							if (i.width < 10) {
								i.width = 10
							}
							i.right = i.left + i.width
						}
						var g = {
							sender : this,
							rowIndex : this.indexOf(d),
							record : d,
							row : d,
							column : b,
							field : b.field,
							cellBox : i,
							editor : this._editingControl
						};
						this.fire("cellshowingedit", g);
						var f = g.editor;
						if (f && f.setIsValid) {
							f.setIsValid(true)
						}
						var h = this._getEditWrap(i);
						this._editWrap.style.zIndex = fui.getMaxZIndex();
						if (f.render) {
							f.render(this._editWrap);
							setTimeout(function() {
								f.focus();
								if (f.selectText) {
									f.selectText()
								}
							}, 50);
							if (f.setVisible) {
								f.setVisible(true)
							}
						} else {
							if (f.el) {
								this._editWrap.appendChild(f.el);
								setTimeout(function() {
									try {
										f.el.focus()
									} catch (k) {
									}
								}, 50)
							}
						}
						if (f.setWidth) {
							var a = i.width;
							if (a < 20) {
								a = 20
							}
							f.setWidth(a)
						}
						if (f.setHeight && f.type == "textarea") {
							var j = i.height - 1;
							if (f.minHeight && j < f.minHeight) {
								j = f.minHeight
							}
							f.setHeight(j)
						}
						if (f.setWidth) {
							var a = i.width - 1;
							if (f.minWidth && a < f.minWidth) {
								a = f.minWidth
							}
							f.setWidth(a)
						}
						fui.on(document, "mousedown", this.__OnBodyMouseDown,
								this);
						if (b.autoShowPopup && f.showPopup) {
							f.showPopup()
						}
					},
					__OnBodyMouseDown : function(f) {
						if (this._editingControl) {
							var a = this._getCellByEvent(f);
							if (this._editingCell && a) {
								if (this._editingCell[0] == a.record
										&& this._editingCell[1] == a.column) {
									return false
								}
							}
							var b = false;
							if (this._editingControl.within) {
								b = this._editingControl.within(f)
							} else {
								b = fui.isAncestor(this._editWrap, f.target)
							}
							if (b == false) {
								var d = this;
								if (fui.isAncestor(this._bodyEl, f.target) == false) {
									setTimeout(function() {
										d.commitEdit()
									}, 1)
								} else {
									var c = d._editingCell;
									setTimeout(function() {
										var e = d._editingCell;
										if (c == e) {
											d.commitEdit()
										}
									}, 70)
								}
								fui.un(document, "mousedown",
										this.__OnBodyMouseDown, this)
							}
						}
					},
					_getEditWrap : function(b) {
						if (!this._editWrap) {
							this._editWrap = fui
									.append(document.body,
											'<div class="fui-grid-editwrap" style="position:absolute;"></div>');
							fui.on(this._editWrap, "keydown",
									this.___OnEditControlKeyDown, this)
						}
						this._editWrap.style.zIndex = 1000000000;
						this._editWrap.style.display = "block";
						fui.setXY(this._editWrap, b.x, b.y);
						fui.setWidth(this._editWrap, b.width);
						var a = document.body.scrollWidth;
						if (b.x > a) {
							fui.setX(this._editWrap, -1000)
						}
						return this._editWrap
					},
					___OnEditControlKeyDown : function(c) {
						var b = this._editingControl;
						if (c.keyCode == 13 && b && b.type == "textarea") {
							return
						}
						if (c.keyCode == 13) {
							var a = this._editingCell;
							if (a && a[1] && a[1].enterCommit === false) {
								return
							}
							this.commitEdit();
							this.focus();
							if (this.editNextOnEnterKey) {
								this._beginEditNextCell(c.shiftKey == false)
							} else {
							}
						} else {
							if (c.keyCode == 27) {
								this.cancelEdit();
								this.focus()
							} else {
								if (c.keyCode == 9) {
									this.commitEdit();
									if (this.editOnTabKey) {
										c.preventDefault();
										this.commitEdit();
										this
												._beginEditNextCell(c.shiftKey == false)
									} else {
									}
								}
							}
						}
					},
					editNextRowCell : false,
					editNextOnEnterKey : false,
					editOnTabKey : true,
					createOnEnter : false,
					_beginEditNextCell : function(d) {
						var a = this;
						var i = this.getCurrentCell();
						if (!i) {
							return
						}
						this.focus();
						var c = a.getVisibleColumns();
						var b = i ? i[1] : null, e = i ? i[0] : null;
						var g = c.indexOf(b);
						var h = a.indexOf(e);
						var f = a.getData().length;
						if (d === false) {
							g -= 1;
							b = c[g];
							if (!b) {
								b = c[c.length - 1];
								e = a.getAt(h - 1);
								if (!e) {
									return
								}
							}
						} else {
							if (this.editNextRowCell) {
								if (h + 1 < f) {
									e = a.getAt(h + 1)
								}
							} else {
								g += 1;
								b = c[g];
								if (!b) {
									b = c[0];
									e = a.getAt(h + 1);
									if (!e) {
										if (this.createOnEnter) {
											e = {};
											this.addRow(e)
										} else {
											return
										}
									}
								}
							}
						}
						var i = [ e, b ];
						a.setCurrentCell(i);
						a.deselectAll();
						a.setCurrent(e);
						a.scrollIntoView(e, b);
						a.beginEditCell()
					},
					getEditorOwnerRow : function(b) {
						var a = b.ownerRowID;
						return this.getRowByUID(a)
					},
					beginEditRow : function(row) {
						if (this.allowCellEdit) {
							return
						}
						var sss = new Date();
						row = this.getRow(row);
						if (!row) {
							return
						}
						var rowEl = this._getRowEl(row, 2);
						if (!rowEl) {
							return
						}
						row._editing = true;
						this._doUpdateRowEl(row);
						var rowEl = this._getRowEl(row, 2);
						fui.addClass(rowEl, "fui-grid-rowEdit");
						var columns = this.getVisibleColumns();
						for (var i = 0, l = columns.length; i < l; i++) {
							var column = columns[i];
							var value = row[column.field];
							var cellEl = this._getCellEl(row, column);
							if (!cellEl) {
								continue
							}
							if (typeof column.editor == "string") {
								column.editor = eval("(" + column.editor + ")")
							}
							var editorConfig = fui.copyTo({}, column.editor);
							editorConfig.id = this.uid + "$" + row._uid + "$"
									+ column._id + "$editor";
							var editor = fui.create(editorConfig);
							if (this._OnCellBeginEdit(row, column, editor)) {
								if (editor) {
									fui.addClass(cellEl, "fui-grid-cellEdit");
									cellEl.innerHTML = "";
									cellEl.appendChild(editor.el);
									fui.addClass(editor.el, "fui-grid-editor")
								}
							}
						}
						this.doLayout()
					},
					cancelEditRow : function(k) {
						if (this.allowCellEdit) {
							return
						}
						k = this.getRow(k);
						if (!k || !k._editing) {
							return
						}
						delete k._editing;
						var f = this._getRowEl(k);
						var e = this.getVisibleColumns();
						for (var h = 0, g = e.length; h < g; h++) {
							var d = e[h];
							var a = this._createCellId(k, e[h]);
							var b = document.getElementById(a);
							var c = b.firstChild;
							var j = fui.get(c);
							if (!j) {
								continue
							}
							j.destroy()
						}
						this._doUpdateRowEl(k);
						this.doLayout()
					},
					commitEditRow : function(b) {
						if (this.allowCellEdit) {
							return
						}
						b = this.getRow(b);
						if (!b || !b._editing) {
							return
						}
						var a = this.getEditRowData(b, false, false);
						this._canUpdateRowEl = false;
						this.updateRow(b, a);
						this._canUpdateRowEl = true;
						this.cancelEditRow(b)
					},
					isEditing : function() {
						var c = this.getDataView();
						for (var b = 0, a = c.length; b < a; b++) {
							var d = c[b];
							if (d._editing == true) {
								return true
							}
						}
						return false
					},
					isEditingRow : function(a) {
						a = this.getRow(a);
						if (!a) {
							return false
						}
						return !!a._editing
					},
					isNewRow : function(a) {
						return a._state == "added"
					},
					getEditingRows : function() {
						var d = [];
						var c = this.getDataView();
						for (var b = 0, a = c.length; b < a; b++) {
							var e = c[b];
							if (e._editing == true) {
								d.push(e)
							}
						}
						return d
					},
					getEditingRow : function() {
						var a = this.getEditingRows();
						return a[0]
					},
					getEditData : function(c) {
						var e = [];
						var e = this.getDataView();
						for (var b = 0, a = e.length; b < a; b++) {
							var f = e[b];
							if (f._editing == true) {
								var d = this.getEditRowData(b, c);
								d._index = b;
								e.push(d)
							}
						}
						return e
					},
					getEditRowData : function(h, b, s) {
						h = this.getRow(h);
						if (!h || !h._editing) {
							return null
						}
						var g = this.getIdField();
						var r = this.getParentField ? this.getParentField()
								: null;
						var j = {};
						var a = this.getVisibleColumns();
						for (var t = 0, q = a.length; t < q; t++) {
							var c = a[t];
							var v = this._createCellId(h, a[t]);
							var m = document.getElementById(v);
							var u = null;
							if (c.type == "checkboxcolumn"
									|| c.type == "radiobuttoncolumn") {
								var k = c.getCheckBoxEl(h, c);
								var p = k.checked ? c.trueValue : c.falseValue;
								u = this._OnCellCommitEdit(h, c, p)
							} else {
								var f = m.firstChild;
								var d = fui.get(f);
								if (!d) {
									continue
								}
								u = this._OnCellCommitEdit(h, c, null, d)
							}
							if (s !== false) {
								fui._setMap(c.field, u.value, j);
								if (c.displayField) {
									fui._setMap(c.displayField, u.text, j)
								}
							} else {
								j[c.field] = u.value;
								if (c.displayField) {
									j[c.displayField] = u.text
								}
							}
						}
						j[g] = h[g];
						if (r) {
							j[r] = h[r]
						}
						if (b) {
							var n = fui.copyTo({}, h);
							j = fui.copyTo(n, j)
						}
						return j
					},
					collapseGroups : function() {
						if (!this.isGrouping()) {
							return
						}
						this._allowLayout = false;
						var a = this.getGroupingView();
						for (var c = 0, b = a.length; c < b; c++) {
							var d = a[c];
							this.collapseRowGroup(d)
						}
						this._allowLayout = true;
						this.doLayout()
					},
					expandGroups : function() {
						if (!this.isGrouping()) {
							return
						}
						this._allowLayout = false;
						var a = this.getGroupingView();
						for (var c = 0, b = a.length; c < b; c++) {
							var d = a[c];
							this.expandRowGroup(d)
						}
						this._allowLayout = true;
						this.doLayout()
					},
					toggleRowGroup : function(a) {
						if (a.expanded) {
							this.collapseRowGroup(a)
						} else {
							this.expandRowGroup(a)
						}
					},
					collapseRowGroup : function(d) {
						d = this.getRowGroup(d);
						if (!d) {
							return
						}
						d.expanded = false;
						var b = this._getRowGroupEl(d, 1);
						var c = this._getRowGroupRowsEl(d, 1);
						var a = this._getRowGroupEl(d, 2);
						var e = this._getRowGroupRowsEl(d, 2);
						if (c) {
							c.style.display = "none"
						}
						if (e) {
							e.style.display = "none"
						}
						if (b) {
							fui.addClass(b, "fui-grid-group-collapse")
						}
						if (a) {
							fui.addClass(a, "fui-grid-group-collapse")
						}
						this.doLayout()
					},
					expandRowGroup : function(d) {
						d = this.getRowGroup(d);
						if (!d) {
							return
						}
						d.expanded = true;
						var b = this._getRowGroupEl(d, 1);
						var c = this._getRowGroupRowsEl(d, 1);
						var a = this._getRowGroupEl(d, 2);
						var e = this._getRowGroupRowsEl(d, 2);
						if (c) {
							c.style.display = ""
						}
						if (e) {
							e.style.display = ""
						}
						if (b) {
							fui.removeClass(b, "fui-grid-group-collapse")
						}
						if (a) {
							fui.removeClass(a, "fui-grid-group-collapse")
						}
						this.doLayout()
					},
					showAllRowDetail : function() {
						this._allowLayout = false;
						var c = this.getDataView();
						for (var b = 0, a = c.length; b < a; b++) {
							var d = c[b];
							this.showRowDetail(d)
						}
						this._allowLayout = true;
						this.doLayout()
					},
					hideAllRowDetail : function() {
						this._allowLayout = false;
						var c = this.getDataView();
						for (var b = 0, a = c.length; b < a; b++) {
							var d = c[b];
							this.hideRowDetail(d)
						}
						this._allowLayout = true;
						this.doLayout()
					},
					isShowRowDetail : function(a) {
						a = this.getRow(a);
						if (!a) {
							return false
						}
						return !!a._showDetail
					},
					toggleRowDetail : function(a) {
						a = this.getRow(a);
						if (!a) {
							return
						}
						if (grid.isShowRowDetail(a)) {
							grid.hideRowDetail(a)
						} else {
							grid.showRowDetail(a)
						}
					},
					showRowDetail : function(d) {
						d = this.getRow(d);
						if (!d || d._showDetail == true) {
							return
						}
						d._showDetail = true;
						var b = this._getRowDetailEl(d, 1, true);
						var e = this._getRowDetailEl(d, 2, true);
						if (b) {
							b.style.display = ""
						}
						if (e) {
							e.style.display = ""
						}
						var a = this._getRowEl(d, 1);
						var c = this._getRowEl(d, 2);
						if (a) {
							fui.addClass(a, "fui-grid-expandRow")
						}
						if (c) {
							fui.addClass(c, "fui-grid-expandRow")
						}
						this.fire("showrowdetail", {
							record : d
						});
						this.doLayout()
					},
					hideRowDetail : function(d) {
						d = this.getRow(d);
						if (!d || d._showDetail !== true) {
							return
						}
						d._showDetail = false;
						var b = this._getRowDetailEl(d, 1);
						var e = this._getRowDetailEl(d, 2);
						if (b) {
							b.style.display = "none"
						}
						if (e) {
							e.style.display = "none"
						}
						var a = this._getRowEl(d, 1);
						var c = this._getRowEl(d, 2);
						if (a) {
							fui.removeClass(a, "fui-grid-expandRow")
						}
						if (c) {
							fui.removeClass(c, "fui-grid-expandRow")
						}
						this.fire("hiderowdetail", {
							record : d
						});
						this.doLayout()
					},
					_getRowDetailEl : function(d, a, c) {
						d = this.getRow(d);
						if (!d) {
							return null
						}
						var e = this._createRowDetailId(d, a);
						var b = document.getElementById(e);
						if (!b && c === true) {
							b = this._createRowDetail(d, a)
						}
						return b
					},
					_createRowDetail : function(e, a) {
						var h = this.getFrozenColumns();
						var d = this.getUnFrozenColumns();
						var g = h.length;
						if (a == 2) {
							g = d.length
						}
						var c = this._getRowEl(e, a);
						if (!c) {
							return null
						}
						var f = this._createRowDetailId(e, a);
						var b = '<tr id="'
								+ f
								+ '" class="fui-grid-detailRow"><td class="fui-grid-detailCell" colspan="'
								+ g + '"></td></tr>';
						jQuery(c).after(b);
						return document.getElementById(f)
					},
					_createRowDetailId : function(b, a) {
						return this._id + "$detail" + a + "$" + b._id
					},
					getRowDetailCellEl : function(c, a) {
						if (!a) {
							a = 2
						}
						var b = this._getRowDetailEl(c, a);
						if (b) {
							return b.cells[0]
						}
					},
					autoHideRowDetail : true,
					setAutoHideRowDetail : function(a) {
						this.autoHideRowDetail = a
					},
					getAutoHideRowDetail : function() {
						return this.autoHideRowDetail
					},
					mergeColumns : function(d) {
						if (d && fui.isArray(d) == false) {
							d = [ d ]
						}
						var a = this;
						var b = a.getVisibleColumns();
						if (!d) {
							d = b
						}
						var f = a.getDataView();
						f.push({});
						var h = [];
						for (var g = 0, e = d.length; g < e; g++) {
							var c = d[g];
							c = a.getColumn(c);
							if (!c) {
								continue
							}
							var k = j(c);
							h.addRange(k)
						}
						function j(m) {
							if (!m.field) {
								return
							}
							var v = [];
							var r = -1, q = 1, p = b.indexOf(m);
							var u = null;
							for (var o = 0, n = f.length; o < n; o++) {
								var w = f[o];
								var s = fui._getMap(m.field, w);
								if (r == -1 || s != u) {
									if (q > 1) {
										var t = {
											rowIndex : r,
											columnIndex : p,
											rowSpan : q,
											colSpan : 1
										};
										v.push(t)
									}
									r = o;
									q = 1;
									u = s
								} else {
									q++
								}
							}
							return v
						}
						a.mergeCells(h)
					},
					mergeCells : function(c) {
						if (!fui.isArray(c)) {
							return
						}
						this._mergedCells = c;
						var e = this._mergedCellMaps = {};
						function f(r, p, q, o, s) {
							for (var n = r, g = r + q; n < g; n++) {
								for (var m = p, h = p + o; m < h; m++) {
									if (n == r && m == p) {
										e[n + ":" + m] = s
									} else {
										e[n + ":" + m] = true
									}
								}
							}
						}
						var c = this._mergedCells;
						if (c) {
							for (var d = 0, b = c.length; d < b; d++) {
								var a = c[d];
								if (!a.rowSpan) {
									a.rowSpan = 1
								}
								if (!a.colSpan) {
									a.colSpan = 1
								}
								f(a.rowIndex, a.columnIndex, a.rowSpan,
										a.colSpan, a)
							}
						}
						this.deferUpdate()
					},
					margeCells : function(a) {
						this.mergeCells(a)
					},
					_isCellVisible : function(c, b) {
						if (!this._mergedCellMaps) {
							return true
						}
						var a = this._mergedCellMaps[c + ":" + b];
						return !(a === true)
					},
					_getCellEls : function(n, h, m, g) {
						var p = [];
						if (!fui.isNumber(n)) {
							return []
						}
						if (!fui.isNumber(h)) {
							return []
						}
						var b = this.getVisibleColumns();
						var e = this.getDataView();
						for (var f = n, a = n + m; f < a; f++) {
							for (var d = h, c = h + g; d < c; d++) {
								var o = this._getCellEl(f, d);
								if (o) {
									p.push(o)
								}
							}
						}
						return p
					},
					_getDragData : function() {
						return this.getSelecteds().clone()
					},
					_getDragText : function(a) {
						return "Records " + a.length
					},
					allowDrag : false,
					allowDrop : false,
					allowLeafDropIn : false,
					setAllowLeafDropIn : function(a) {
						this.allowLeafDropIn = a
					},
					getAllowLeafDropIn : function() {
						return this.allowLeafDropIn
					},
					setAllowDrag : function(a) {
						this.allowDrag = a
					},
					getAllowDrag : function() {
						return this.allowDrag
					},
					setAllowDrop : function(a) {
						this.allowDrop = a
					},
					getAllowDrop : function() {
						return this.allowDrop
					},
					isAllowDrag : function(b, a) {
						if (this.isReadOnly() || this.enabled == false) {
							return false
						}
						if (!this.allowDrag || !a.allowDrag) {
							return false
						}
						if (b.allowDrag === false) {
							return false
						}
						return true
					},
					_OnDragStart : function(b, a) {
						var c = {
							node : b,
							nodes : this._getDragData(),
							column : a,
							cancel : false
						};
						c.record = c.node;
						c.records = c.nodes;
						c.dragText = this._getDragText(c.nodes);
						this.fire("dragstart", c);
						return c
					},
					_OnGiveFeedback : function(c, b, a, f) {
						var d = {};
						d.from = f;
						d.effect = c;
						d.nodes = b;
						d.node = d.nodes[0];
						d.targetNode = a;
						d.dragNodes = b;
						d.dragNode = d.dragNodes[0];
						d.dropNode = d.targetNode;
						d.dragAction = d.action;
						this.fire("givefeedback", d);
						return d
					},
					_OnDragDrop : function(c, b, a) {
						c = c.clone();
						var d = {
							dragNodes : c,
							targetNode : b,
							action : a,
							cancel : false
						};
						d.dragNode = d.dragNodes[0];
						d.dropNode = d.targetNode;
						d.dragAction = d.action;
						this.fire("beforedrop", d);
						this.fire("dragdrop", d);
						return d
					},
					moveUp : function(b) {
						if (!fui.isArray(b)) {
							return
						}
						var f = this;
						b = b.sort(function(h, g) {
							var j = f.indexOf(h);
							var i = f.indexOf(g);
							if (j > i) {
								return 1
							}
							return -1
						});
						for (var d = 0, a = b.length; d < a; d++) {
							var e = b[d];
							var c = this.indexOf(e);
							this.moveRow(e, c - 1)
						}
					},
					moveDown : function(b) {
						if (!fui.isArray(b)) {
							return
						}
						var f = this;
						b = b.sort(function(h, g) {
							var j = f.indexOf(h);
							var i = f.indexOf(g);
							if (j > i) {
								return 1
							}
							return -1
						});
						b.reverse();
						for (var d = 0, a = b.length; d < a; d++) {
							var e = b[d];
							var c = this.indexOf(e);
							this.moveRow(e, c + 2)
						}
					},
					pageSize : 20,
					pageIndex : 0,
					totalCount : 0,
					totalPage : 0,
					sortField : "",
					sortOrder : "",
					url : "",
					setAjaxAsync : function(a) {
						this._dataSource.ajaxAsync = a;
						this.ajaxAsync = a
					},
					getAjaxAsync : function() {
						return this._dataSource.ajaxAsync
					},
					setAjaxMethod : function(a) {
						this._dataSource.ajaxMethod = a;
						this.ajaxMethod = a
					},
					getAjaxMethod : function() {
						return this._dataSource.ajaxMethod
					},
					setAjaxOptions : function(a) {
						this._dataSource.setAjaxOptions(a)
					},
					getAjaxOptions : function() {
						return this._dataSource.getAjaxOptions()
					},
					setAutoLoad : function(a) {
						this._dataSource.setAutoLoad(a)
					},
					getAutoLoad : function() {
						return this._dataSource.getAutoLoad()
					},
					setUrl : function(a) {
						this._dataSource.setUrl(a);
						this.url = a
					},
					getUrl : function() {
						return this._dataSource.getUrl()
					},
					load : function(d, c, b, a) {
						this._dataSource.load(d, c, b, a)
					},
					reload : function(c, b, a) {
						this.accept();
						this._dataSource.reload(c, b, a)
					},
					gotoPage : function(a, b) {
						this._dataSource.gotoPage(a, b)
					},
					sortBy : function(b, c) {
						if (!b) {
							return null
						}
						if (this._dataSource.sortMode == "server") {
							this._dataSource.sortBy(b, c)
						} else {
							var a = this._columnModel._getDataTypeByField(b);
							this._dataSource._doClientSortField(b, c, a)
						}
					},
					setCheckSelectOnLoad : function(a) {
						this._dataSource.setCheckSelectOnLoad(a);
						this.checkSelectOnLoad = a
					},
					getCheckSelectOnLoad : function() {
						return this._dataSource.getCheckSelectOnLoad()
					},
					setSelectOnLoad : function(a) {
						this._dataSource.setSelectOnLoad(a);
						this.selectOnLoad = a
					},
					getSelectOnLoad : function() {
						return this._dataSource.getSelectOnLoad()
					},
					setSortMode : function(a) {
						this._dataSource.setSortMode(a);
						this.sortMode = a
					},
					getSortMode : function() {
						return this._dataSource.getSortMode()
					},
					setPageIndex : function(a) {
						this._dataSource.setPageIndex(a);
						this.pageIndex = a
					},
					getPageIndex : function() {
						return this._dataSource.getPageIndex()
					},
					setPageSize : function(a) {
						this._dataSource.setPageSize(a);
						this._virtualRows = a;
						this.pageSize = a
					},
					getPageSize : function() {
						return this._dataSource.getPageSize()
					},
					setTotalCount : function(a) {
						this._dataSource.setTotalCount(a);
						this.totalCount = a
					},
					getTotalCount : function() {
						return this._dataSource.getTotalCount()
					},
					getTotalPage : function() {
						return this._dataSource.getTotalPage()
					},
					setSortField : function(a) {
						this._dataSource.setSortField(a);
						this.sortField = a
					},
					getSortField : function() {
						return this._dataSource.sortField
					},
					setSortOrder : function(a) {
						this._dataSource.setSortOrder(a);
						this.sortOrder = a
					},
					getSortOrder : function() {
						return this._dataSource.sortOrder
					},
					setPageIndexField : function(a) {
						this._dataSource.pageIndexField = a;
						this.pageIndexField = a
					},
					getPageIndexField : function() {
						return this._dataSource.pageIndexField
					},
					setPageSizeField : function(a) {
						this._dataSource.pageSizeField = a;
						this.pageSizeField = a
					},
					getPageSizeField : function() {
						return this._dataSource.pageSizeField
					},
					setSortFieldField : function(a) {
						this._dataSource.sortFieldField = a;
						this.sortFieldField = a
					},
					getSortFieldField : function() {
						return this._dataSource.sortFieldField
					},
					setSortOrderField : function(a) {
						this._dataSource.sortOrderField = a;
						this.sortOrderField = a
					},
					getSortOrderField : function() {
						return this._dataSource.sortOrderField
					},
					setTotalField : function(a) {
						this._dataSource.totalField = a;
						this.totalField = a
					},
					getTotalField : function() {
						return this._dataSource.totalField
					},
					setDataField : function(a) {
						this._dataSource.dataField = a;
						this.dataField = a
					},
					getDataField : function() {
						return this._dataSource.dataField
					},
					setShowReloadButton : function(a) {
						this._bottomPager.setShowReloadButton(a)
					},
					getShowReloadButton : function() {
						return this._bottomPager.getShowReloadButton()
					},
					setShowPageInfo : function(a) {
						this._bottomPager.setShowPageInfo(a)
					},
					getShowPageInfo : function() {
						return this._bottomPager.getShowPageInfo()
					},
					setSizeList : function(a) {
						if (!fui.isArray(a)) {
							return
						}
						this._bottomPager.setSizeList(a)
					},
					getSizeList : function() {
						return this._bottomPager.getSizeList()
					},
					setShowPageSize : function(a) {
						this._bottomPager.setShowPageSize(a)
					},
					getShowPageSize : function() {
						return this._bottomPager.getShowPageSize()
					},
					setShowPageIndex : function(a) {
						this.showPageIndex = a;
						this._bottomPager.setShowPageIndex(a)
					},
					getShowPageIndex : function() {
						return this._bottomPager.getShowPageIndex()
					},
					setShowTotalCount : function(a) {
						this._bottomPager.setShowTotalCount(a)
					},
					getShowTotalCount : function() {
						return this._bottomPager.getShowTotalCount()
					},
					setPagerStyle : function(a) {
						this.pagerStyle = a;
						fui.setStyle(this._bottomPager.el, a)
					},
					setPagerCls : function(a) {
						this.pagerCls = a;
						fui.addClass(this._bottomPager.el, a)
					},
					_beforeOpenContentMenu : function(c, b) {
						var a = fui
								.isAncestor(this._bodyEl, b.htmlEvent.target);
						if (a) {
							c.fire("BeforeOpen", b)
						} else {
							b.cancel = true
						}
					},
					__OnHtmlContextMenu : function(b) {
						var a = {
							popupEl : this.el,
							htmlEvent : b,
							cancel : false
						};
						if (fui.isAncestor(this._columnsEl, b.target)) {
							if (this.headerContextMenu) {
								this.headerContextMenu.fire("BeforeOpen", a);
								if (a.cancel == true) {
									return
								}
								this.headerContextMenu.fire("opening", a);
								if (a.cancel == true) {
									return
								}
								this.headerContextMenu.showAtPos(b.pageX,
										b.pageY);
								this.headerContextMenu.fire("Open", a)
							}
						} else {
							var c = fui.findParent(b.target,
									"fui-grid-detailRow");
							if (c && fui.isAncestor(this.el, c)) {
								return
							}
							if (this.contextMenu) {
								this
										._beforeOpenContentMenu(
												this.contextMenu, a);
								if (a.cancel == true) {
									return
								}
								this.contextMenu.fire("opening", a);
								if (a.cancel == true) {
									return
								}
								this.contextMenu.showAtPos(b.pageX, b.pageY);
								this.contextMenu.fire("Open", a)
							}
						}
						return false
					},
					headerContextMenu : null,
					setHeaderContextMenu : function(b) {
						var a = this._getContextMenu(b);
						if (!a) {
							return
						}
						if (this.headerContextMenu !== a) {
							this.headerContextMenu = a;
							this.headerContextMenu.owner = this;
							fui.on(this.el, "contextmenu",
									this.__OnHtmlContextMenu, this)
						}
					},
					getHeaderContextMenu : function() {
						return this.headerContextMenu
					},
					_get_originals : function() {
						return this._dataSource._originals
					},
					_set_originals : function(a) {
						this._dataSource._originals = a
					},
					_set_clearOriginals : function(a) {
						this._dataSource._clearOriginals = a
					},
					_set_originalIdField : function(a) {
						this._dataSource._originalIdField = a
					},
					_set_autoCreateNewID : function(a) {
						this._dataSource._autoCreateNewID = a
					},
					getAttrs : function(el) {
						var attrs = fui.DataGrid.superclass.getAttrs.call(this,
								el);
						var cs = fui.getChildNodes(el);
						for (var i = 0, l = cs.length; i < l; i++) {
							var node = cs[i];
							var property = jQuery(node).attr("property");
							if (!property) {
								continue
							}
							property = property.toLowerCase();
							if (property == "columns") {
								attrs.columns = fui._ParseColumns(node);
								fui.removeNode(node)
							} else {
								if (property == "data") {
									attrs.data = node.innerHTML;
									fui.removeNode(node)
								}
							}
						}
						fui._ParseString(el, attrs, [ "url", "sizeList",
								"bodyCls", "bodyStyle", "footerCls",
								"footerStyle", "pagerCls", "pagerStyle",
								"onheadercellclick", "onheadercellmousedown",
								"onheadercellcontextmenu", "onrowdblclick",
								"onrowclick", "onrowmousedown",
								"onrowcontextmenu", "oncellclick",
								"oncellmousedown", "oncellcontextmenu",
								"onbeforeload", "onpreload", "onloaderror",
								"onload", "ondrawcell", "oncellbeginedit",
								"onselectionchanged", "ondrawgroup",
								"onbeforeshowrowdetail",
								"onbeforehiderowdetail", "onshowrowdetail",
								"onhiderowdetail", "idField", "valueField",
								"pager", "oncellcommitedit", "oncellendedit",
								"headerContextMenu", "loadingMsg", "emptyText",
								"cellEditAction", "sortMode",
								"oncellvalidation", "onsort",
								"ondrawsummarycell", "ondrawgroupsummarycell",
								"onresize", "oncolumnschanged", "ajaxMethod",
								"ajaxOptions", "onaddrow", "onupdaterow",
								"onremoverow", "onmoverow", "onbeforeaddrow",
								"onbeforeupdaterow", "onbeforeremoverow",
								"onbeforemoverow", "pageIndexField",
								"pageSizeField", "sortFieldField",
								"sortOrderField", "totalField", "dataField",
								"sortField", "sortOrder", "pagerButtons" ]);
						fui._ParseBool(el, attrs, [ "showColumns",
								"showFilterRow", "showSummaryRow", "showPager",
								"showFooter", "showHGridLines",
								"showVGridLines", "allowSortColumn",
								"allowMoveColumn", "allowResizeColumn",
								"fitColumns", "showLoading", "multiSelect",
								"allowAlternating", "resultAsData",
								"allowRowSelect", "allowUnselect",
								"enableHotTrack", "showPageIndex",
								"showPageSize", "showTotalCount",
								"checkSelectOnLoad", "allowResize", "autoLoad",
								"autoHideRowDetail", "allowCellSelect",
								"allowCellEdit", "allowCellWrap",
								"allowHeaderWrap", "selectOnLoad",
								"virtualScroll", "collapseGroupOnLoad",
								"showGroupSummary", "showEmptyText",
								"allowCellValid", "showModified",
								"showColumnsMenu", "showPageInfo",
								"showReloadButton", "showNewRow",
								"editNextOnEnterKey", "createOnEnter",
								"ajaxAsync", "allowDrag", "allowDrop",
								"allowLeafDropIn", "editNextRowCell" ]);
						fui._ParseInt(el, attrs, [ "frozenStartColumn",
								"frozenEndColumn", "pageIndex", "pageSize",
								"defaultRowHeight" ]);
						if (typeof attrs.ajaxOptions == "string") {
							attrs.ajaxOptions = eval("(" + attrs.ajaxOptions
									+ ")")
						}
						if (typeof attrs.sizeList == "string") {
							attrs.sizeList = eval("(" + attrs.sizeList + ")")
						}
						if (!attrs.idField && attrs.valueField) {
							attrs.idField = attrs.valueField
						}
						if (attrs.pagerButtons) {
							attrs.pagerButtons = fui.byId(attrs.pagerButtons)
						}
						return attrs
					}
				});
fui.regClass(fui.DataGrid, "datagrid");
fui_DataGrid_CellValidator_Prototype = {
	getCellErrors : function() {
		var h = this._cellErrors.clone();
		var e = this.getDataView();
		for (var c = 0, a = h.length; c < a; c++) {
			var b = h[c];
			var f = b.record;
			var d = b.column;
			if (e.indexOf(f) == -1) {
				var g = f[this._rowIdField] + "$" + d._id;
				delete this._cellMapErrors[g];
				this._cellErrors.remove(b)
			}
		}
		return this._cellErrors
	},
	getCellError : function(b, a) {
		b = this.getNode ? this.getNode(b) : this.getRow(b);
		a = this.getColumn(a);
		if (!b || !a) {
			return
		}
		var c = b[this._rowIdField] + "$" + a._id;
		return this._cellMapErrors[c]
	},
	isValid : function() {
		return this.getCellErrors().length == 0
	},
	validate : function() {
		var c = this.getDataView();
		for (var b = 0, a = c.length; b < a; b++) {
			var d = c[b];
			this.validateRow(d)
		}
	},
	validateRow : function(e) {
		var c = this.getBottomColumns();
		for (var b = 0, a = c.length; b < a; b++) {
			var d = c[b];
			this.validateCell(e, d)
		}
	},
	validateCell : function(n, c) {
		n = this.getNode ? this.getNode(n) : this.getRow(n);
		c = this.getColumn(c);
		if (!n || !c) {
			return
		}
		var h = {
			record : n,
			row : n,
			node : n,
			column : c,
			field : c.field,
			value : n[c.field],
			isValid : true,
			errorText : ""
		};
		if (c.vtype) {
			fui._ValidateVType(c.vtype, h.value, h, c)
		}
		if (h.isValid == true && c.unique && c.field) {
			var j = {};
			var f = this.data, k = c.field;
			for (var g = 0, d = f.length; g < d; g++) {
				var a = f[g];
				var m = a[k];
				if (fui.isNull(m) || m === "") {
				} else {
					var b = j[m];
					if (b && a == n) {
						h.isValid = false;
						h.errorText = fui._getErrorText(c, "uniqueErrorText");
						this.setCellIsValid(b, c, h.isValid, h.errorText);
						break
					}
					j[m] = a
				}
			}
		}
		this.fire("cellvalidation", h);
		this.setCellIsValid(n, c, h.isValid, h.errorText)
	},
	setIsValid : function(d) {
		if (d) {
			var e = this._cellErrors.clone();
			for (var c = 0, a = e.length; c < a; c++) {
				var b = e[c];
				this.setCellIsValid(b.record, b.column, true)
			}
		}
	},
	_removeRowError : function(f) {
		var d = this.getColumns();
		for (var c = 0, a = d.length; c < a; c++) {
			var e = d[c];
			var g = f[this._rowIdField] + "$" + e._id;
			var b = this._cellMapErrors[g];
			if (b) {
				delete this._cellMapErrors[g];
				this._cellErrors.remove(b)
			}
		}
	},
	setCellIsValid : function(f, d, e, a) {
		f = this.getRow(f);
		d = this.getColumn(d);
		if (!f || !d) {
			return
		}
		var g = f[this._rowIdField] + "$" + d._id;
		var b = this._getCellEl(f, d);
		var c = this._cellMapErrors[g];
		delete this._cellMapErrors[g];
		this._cellErrors.remove(c);
		if (e === true) {
			if (b && c) {
				fui.removeClass(b, "fui-grid-cell-error")
			}
		} else {
			c = {
				record : f,
				column : d,
				isValid : e,
				errorText : a
			};
			this._cellMapErrors[g] = c;
			this._cellErrors.add(c);
			if (b) {
				fui.addClass(b, "fui-grid-cell-error")
			}
		}
	}
};
fui.copyTo(fui.DataGrid.prototype, fui_DataGrid_CellValidator_Prototype);
fui.TreeGrid = function() {
	fui.TreeGrid.superclass.constructor.call(this);
	fui.addClass(this.el, "fui-tree");
	this.setAjaxAsync(false);
	this.setAutoLoad(true);
	if (this.showTreeLines == true) {
		fui.addClass(this.el, "fui-tree-treeLine")
	}
	this._AsyncLoader = new fui._Tree_AsyncLoader(this);
	this._Expander = new fui._Tree_Expander(this)
};
fui.copyTo(fui.TreeGrid.prototype, fui._DataTreeApplys);
fui
		.extend(
				fui.TreeGrid,
				fui.DataGrid,
				{
					isTree : true,
					uiCls : "fui-treegrid",
					showPager : false,
					showNewRow : false,
					showCheckBox : false,
					showTreeIcon : true,
					showExpandButtons : true,
					showTreeLines : false,
					showArrow : false,
					expandOnDblClick : true,
					expandOnNodeClick : false,
					loadOnExpand : true,
					_checkBoxType : "checkbox",
					iconField : "iconCls",
					_treeColumn : null,
					leafIconCls : "fui-tree-leaf",
					folderIconCls : "fui-tree-folder",
					fixedRowHeight : false,
					_checkBoxCls : "fui-tree-checkbox",
					_expandNodeCls : "fui-tree-expand",
					_collapseNodeCls : "fui-tree-collapse",
					_eciconCls : "fui-tree-node-ecicon",
					_inNodeCls : "fui-tree-nodeshow",
					indexOf : function(a) {
						return this._dataSource.indexOfList(a)
					},
					_getDragText : function(a) {
						return "Nodes " + a.length
					},
					_initEvents : function() {
						fui.TreeGrid.superclass._initEvents.call(this);
						this.on("nodedblclick", this.__OnNodeDblClick, this);
						this.on("nodeclick", this.__OnNodeClick, this);
						this.on("cellclick", function(a) {
							a.node = a.record;
							a.isLeaf = this.isLeaf(a.node);
							this.fire("nodeclick", a)
						}, this);
						this.on("cellmousedown", function(a) {
							a.node = a.record;
							a.isLeaf = this.isLeaf(a.node);
							this.fire("nodemousedown", a)
						}, this);
						this.on("celldblclick", function(a) {
							a.node = a.record;
							a.isLeaf = this.isLeaf(a.node);
							this.fire("nodedblclick", a)
						}, this);
						this.on("beforerowselect", function(a) {
							a.node = a.selected;
							a.isLeaf = this.isLeaf(a.node);
							this.fire("beforenodeselect", a)
						}, this);
						this.on("rowselect", function(a) {
							a.node = a.selected;
							a.isLeaf = this.isLeaf(a.node);
							this.fire("nodeselect", a)
						}, this)
					},
					setValue : function(d, b) {
						if (fui.isNull(d)) {
							d = ""
						}
						d = String(d);
						if (this.getValue() != d) {
							var a = this.getCheckedNodes();
							this.uncheckNodes(a);
							this.value = d;
							if (this.showCheckBox) {
								var c = String(d).split(",");
								this._dataSource.doCheckNodes(c, true,
										b !== false)
							} else {
								this.selectNode(d)
							}
						}
					},
					getValue : function(a) {
						if (this.showCheckBox) {
							if (a === false) {
								a = "leaf"
							}
							return this._dataSource.getCheckedNodesId(a)
						} else {
							return this._dataSource.getSelectedsId()
						}
					},
					getText : function() {
						var c = [];
						if (this.showCheckBox) {
							c = this.getCheckedNodes()
						} else {
							var e = this.getSelectedNode();
							if (e) {
								c.push(e)
							}
						}
						var f = [], b = this.getTextField();
						for (var d = 0, a = c.length; d < a; d++) {
							var e = c[d];
							f.push(e[b])
						}
						return f.join(",")
					},
					isGrouping : function() {
						return false
					},
					_createSource : function() {
						this._dataSource = new fui.DataTree()
					},
					_bindSource : function() {
						fui.TreeGrid.superclass._bindSource.call(this);
						var a = this._dataSource;
						a.on("expand", this.__OnTreeExpand, this);
						a.on("collapse", this.__OnTreeCollapse, this);
						a.on("checkchanged", this.__OnCheckChanged, this);
						a.on("addnode", this.__OnSourceAddNode, this);
						a.on("removenode", this.__OnSourceRemoveNode, this);
						a.on("movenode", this.__OnSourceMoveNode, this);
						a.on("beforeloadnode", this.__OnBeforeLoadNode, this);
						a.on("loadnode", this.__OnLoadNode, this)
					},
					__OnBeforeLoadNode : function(a) {
						this.__showLoading = this.showLoading;
						this.showLoading = false;
						this.addNodeCls(a.node, "fui-tree-loading");
						this.fire("beforeloadnode", a)
					},
					__OnLoadNode : function(a) {
						this.showLoading = this.__showLoading;
						this.removeNodeCls(a.node, "fui-tree-loading");
						this.fire("loadnode", a)
					},
					__OnSourceAddNode : function(a) {
						this._doAddNodeEl(a.node);
						this.fire("addnode", a)
					},
					__OnSourceRemoveNode : function(c) {
						this._doRemoveNodeEl(c.node);
						var a = this.getParentNode(c.node);
						var b = this.getChildNodes(a);
						if (b.length == 0) {
							this._doUpdateTreeNodeEl(a)
						}
						this.fire("removenode", c)
					},
					__OnSourceMoveNode : function(a) {
						this._doMoveNodeEl(a.node);
						this.fire("movenode", a)
					},
					_doAddNodeEl : function(c) {
						var g = this.getFrozenColumns();
						var e = this.getUnFrozenColumns();
						var a = this.getParentNode(c);
						var f = this.indexOf(c);
						var b = false;
						function d(m, k, j) {
							var l = this._createRowHTML(m, f, k, j);
							var i = this.indexOfNode(m) + 1;
							var n = this.getChildNodeAt(i, a);
							if (n) {
								var o = this._getNodeEl(n, j);
								jQuery(o).before(l)
							} else {
								var h = this._getNodesEl(a, j);
								if (h) {
									fui.append(h.firstChild, l)
								} else {
									b = true
								}
							}
						}
						d.call(this, c, e, 2);
						d.call(this, c, g, 1);
						if (b) {
							this._doUpdateTreeNodeEl(a)
						}
					},
					_doRemoveNodeEl : function(c) {
						this._doRemoveRowEl(c);
						var a = this._getNodesEl(c, 1);
						var b = this._getNodesEl(c, 2);
						if (a) {
							a.parentNode.removeChild(a)
						}
						if (b) {
							b.parentNode.removeChild(b)
						}
					},
					_doMoveNodeEl : function(b) {
						this._doRemoveNodeEl(b);
						var a = this.getParentNode(b);
						this._doUpdateTreeNodeEl(a)
					},
					_doUpdateNodeTitle : function(a) {
						this._doUpdateTreeNodeEl(a, false)
					},
					_doUpdateTreeNodeEl : function(e, f) {
						f = f !== false;
						var d = this.getRootNode();
						if (d == e) {
							this.doUpdate();
							return
						}
						var l = e;
						var a = this.getFrozenColumns();
						var c = this.getUnFrozenColumns();
						var j = this._createNodeHTML(e, a, 1, null, f);
						var h = this._createNodeHTML(e, c, 2, null, f);
						var n = this._getNodeEl(e, 1);
						var m = this._getNodeEl(e, 2);
						var k = this._getNodesTr(e, 1);
						var i = this._getNodesTr(e, 2);
						var g = fui.createElements(j);
						var e = g[0];
						var b = g[1];
						if (n) {
							fui.before(n, e);
							if (f) {
								fui.before(n, b)
							}
							fui.removeNode(n);
							if (f) {
								fui.removeNode(k)
							}
						}
						var g = fui.createElements(h);
						var e = g[0];
						var b = g[1];
						if (m) {
							fui.before(m, e);
							if (f) {
								fui.before(m, b)
							}
							fui.removeNode(m);
							if (f) {
								fui.removeNode(i)
							}
						}
						if (e.checked != true && !this.isLeaf(e)) {
							this._doCheckNodeEl(l)
						}
					},
					addNodeCls : function(b, a) {
						this.addRowCls(b, a)
					},
					removeNodeCls : function(b, a) {
						this.removeRowCls(b, a)
					},
					doUpdate : function() {
						fui.TreeGrid.superclass.doUpdate.apply(this, arguments)
					},
					setData : function(a) {
						if (!a) {
							a = []
						}
						this._dataSource.setData(a)
					},
					loadList : function(c, b, d) {
						b = b || this.getIdField();
						d = d || this.getParentField();
						var a = fui.listToTree(c, this.getNodesField(), b, d);
						this.setData(a)
					},
					_createDrawCellEvent : function(a, c, f, b) {
						var d = fui.TreeGrid.superclass._createDrawCellEvent
								.call(this, a, c, f, b);
						d.node = d.record;
						d.isLeaf = this.isLeaf(d.node);
						if (this._treeColumn && this._treeColumn == c.name) {
							d.isTreeCell = true;
							d.img = a[this.imgField];
							d.iconCls = this._getNodeIcon(a);
							d.nodeCls = "";
							d.nodeStyle = "";
							d.nodeHtml = "";
							d.showTreeIcon = this.showTreeIcon;
							d.checkBoxType = this._checkBoxType;
							d.showCheckBox = this.showCheckBox;
							if (d.showCheckBox && !d.isLeaf) {
								d.showCheckBox = this.showFolderCheckBox
							}
							d.checkable = this.getCheckable(d.node)
						}
						return d
					},
					_OnDrawCell : function(a, c, f, b) {
						var d = fui.TreeGrid.superclass._OnDrawCell.call(this,
								a, c, f, b);
						if (this._treeColumn && this._treeColumn == c.name) {
							this.fire("drawnode", d);
							if (d.nodeStyle) {
								d.cellStyle = d.nodeStyle
							}
							if (d.nodeCls) {
								d.cellCls = d.nodeCls
							}
							if (d.nodeHtml) {
								d.cellHtml = d.nodeHtml
							}
							this._createTreeColumn(d)
						}
						return d
					},
					_isViewFirstNode : function(b) {
						if (this._viewNodes) {
							var c = this.getParentNode(b);
							var a = this._getViewChildNodes(c);
							return a[0] === b
						} else {
							return this.isFirstNode(b)
						}
					},
					_isViewLastNode : function(b) {
						if (this._viewNodes) {
							var c = this.getParentNode(b);
							var a = this._getViewChildNodes(c);
							return a[a.length - 1] === b
						} else {
							return this.isLastNode(b)
						}
					},
					_isInViewLastNode : function(f, h) {
						if (this._viewNodes) {
							var g = null;
							var d = this.getAncestors(f);
							for (var e = 0, c = d.length; e < c; e++) {
								var b = d[e];
								if (this.getLevel(b) == h) {
									g = b
								}
							}
							if (!g || g == this.root) {
								return false
							}
							return this._isViewLastNode(g)
						} else {
							return this.isInLastNode(f, h)
						}
					},
					isInLastNode : function(f, h) {
						var g = null;
						var d = this.getAncestors(f);
						for (var e = 0, c = d.length; e < c; e++) {
							var b = d[e];
							if (this.getLevel(b) == h) {
								g = b
							}
						}
						if (!g || g == this.root) {
							return false
						}
						return this.isLastNode(g)
					},
					_createNodeTitle : function(q, b, t) {
						var f = !b;
						if (!b) {
							b = []
						}
						var u = this.isLeaf(q);
						var a = this.getLevel(q);
						var c = t.nodeCls;
						if (!u) {
							c = this.isExpandedNode(q) ? this._expandNodeCls
									: this._collapseNodeCls
						}
						if (q.enabled === false) {
							c += " fui-disabled"
						}
						if (!u) {
							c += " fui-tree-parentNode"
						}
						var d = this.getChildNodes(q);
						var r = d && d.length > 0;
						b[b.length] = '<div class="fui-tree-nodetitle ' + c
								+ '" style="' + t.nodeStyle + '">';
						var h = this.getParentNode(q);
						var m = 0;
						for (var s = m; s <= a; s++) {
							if (s == a) {
								continue
							}
							if (u) {
								if (s > a - 1) {
									continue
								}
							}
							var k = "";
							if (this._isInViewLastNode(q, s)) {
								k = "background:none"
							}
							b[b.length] = '<span class="fui-tree-indent " style="'
									+ k + '"></span>'
						}
						var l = "";
						if (this._isViewFirstNode(q) && a == 0) {
							l = "fui-tree-node-ecicon-first"
						} else {
							if (this._isViewLastNode(q)) {
								l = "fui-tree-node-ecicon-last"
							}
						}
						if (this._isViewFirstNode(q) && this._isViewLastNode(q)) {
							l = "fui-tree-node-ecicon-last";
							if (h == this.root) {
								l = "fui-tree-node-ecicon-firstLast"
							}
						}
						if (!u) {
							b[b.length] = '<a class="'
									+ this._eciconCls
									+ " "
									+ l
									+ '" style="'
									+ (this.showExpandButtons ? ""
											: "display:none")
									+ '" href="javascript:void(0);" onclick="return false;" hidefocus></a>'
						} else {
							b[b.length] = '<span class="'
									+ this._eciconCls
									+ " "
									+ l
									+ '" style="'
									+ (this.showExpandButtons ? ""
											: "display:none") + '"></span>'
						}
						b[b.length] = '<span class="fui-tree-nodeshow">';
						if (t.showTreeIcon) {
							if (t.img) {
								var v = this.imgPath + t.img;
								b[b.length] = '<span class="fui-tree-icon" style="background-image:url('
										+ v + ');"></span>'
							} else {
								b[b.length] = '<span class="' + t.iconCls
										+ ' fui-tree-icon"></span>'
							}
						}
						if (t.showCheckBox) {
							var o = this._createCheckNodeId(q);
							var g = this.isCheckedNode(q);
							var j = t.enabled === false ? "disabled" : "";
							if (t.enabled !== false) {
								j = t.checkable === false ? "disabled" : ""
							}
							b[b.length] = '<input type="checkbox" id="' + o
									+ '" class="' + this._checkBoxCls
									+ '" hidefocus ' + (g ? "checked" : "")
									+ " " + (j) + ' onclick="return false;"/>'
						}
						b[b.length] = '<span class="fui-tree-nodetext">';
						if (this._editingNode == q) {
							var p = this._id + "$edit$" + q._id;
							var n = t.value;
							b[b.length] = '<input id="'
									+ p
									+ '" type="text" class="fui-tree-editinput" value="'
									+ n + '"/>'
						} else {
							b[b.length] = t.cellHtml
						}
						b[b.length] = "</span>";
						b[b.length] = "</span>";
						b[b.length] = "</div>";
						if (f) {
							return b.join("")
						}
					},
					_createTreeColumn : function(f) {
						var d = f.record, c = f.column;
						f.headerCls += " fui-tree-treecolumn";
						f.cellCls += " fui-tree-treecell";
						f.cellStyle += ";padding:0;vertical-align:top;";
						var a = this.isLeaf(d);
						f.cellHtml = this._createNodeTitle(d, null, f);
						if (d.checked != true && !a) {
							var b = this.getCheckState(d);
							if (b == "indeterminate") {
								this._renderCheckState(d)
							}
						}
					},
					_createCheckNodeId : function(a) {
						return this._id + "$checkbox$" + a._id
					},
					_renderCheckState : function(b) {
						if (!this._renderCheckStateNodes) {
							this._renderCheckStateNodes = []
						}
						this._renderCheckStateNodes.push(b);
						if (this._renderCheckStateTimer) {
							return
						}
						var a = this;
						this._renderCheckStateTimer = setTimeout(function() {
							a._renderCheckStateTimer = null;
							var d = a._renderCheckStateNodes;
							a._renderCheckStateNodes = null;
							for (var e = 0, c = d.length; e < c; e++) {
								a._doCheckNodeEl(d[e])
							}
						}, 1)
					},
					_createNodeHTML : function(c, e, m, j, d) {
						var i = !j;
						if (!j) {
							j = []
						}
						var a = this._dataSource;
						var k = a.getDataView().indexOf(c);
						this._createRowHTML(c, k, e, m, j);
						if (d !== false) {
							var h = a.getChildNodes(c);
							var g = this.isVisibleNode(c);
							if (h && h.length > 0) {
								var f = this.isExpandedNode(c);
								if (f == true) {
									var b = (f && g) ? "" : "display:none";
									var l = this._createNodesId(c, m);
									j[j.length] = '<tr class="fui-tree-nodes-tr" style="';
									if (fui.isIE) {
										j[j.length] = b
									}
									j[j.length] = '" ><td class="fui-tree-nodes-td" colspan="';
									j[j.length] = e.length;
									j[j.length] = '" >';
									j[j.length] = '<div class="fui-tree-nodes" id="';
									j[j.length] = l;
									j[j.length] = '" style="';
									j[j.length] = b;
									j[j.length] = '">';
									this._createNodesHTML(h, e, m, j);
									j[j.length] = "</div>";
									j[j.length] = "</td></tr>"
								}
							}
						}
						if (i) {
							return j.join("")
						}
					},
					_createNodesHTML : function(c, f, e, h) {
						if (!c) {
							return ""
						}
						var a = !h;
						if (!h) {
							h = []
						}
						h
								.push('<table class="fui-grid-table" cellspacing="0" cellpadding="0" border="0">');
						h.push(this._createTopRowHTML(f));
						if (f.length > 0) {
							for (var d = 0, b = c.length; d < b; d++) {
								var g = c[d];
								this._createNodeHTML(g, f, e, h)
							}
						}
						h.push("</table>");
						if (a) {
							return h.join("")
						}
					},
					_createRowsHTML : function(e, d) {
						if (this.isVirtualScroll()) {
							return fui.TreeGrid.superclass._createRowsHTML
									.apply(this, arguments)
						}
						var g = this._dataSource, f = this;
						var h = [];
						var c = [];
						var b = g.getRootNode();
						if (this._useEmptyView !== true) {
							c = g.getChildNodes(b)
						}
						var a = d == 2 ? this._rowsViewEl.firstChild
								: this._rowsLockEl.firstChild;
						a.id = this._createNodesId(b, d);
						this._createNodesHTML(c, e, d, h);
						return h.join("")
					},
					_createNodesId : function(b, a) {
						var c = this._id + "$nodes" + a + "$" + b._id;
						return c
					},
					_getNodeEl : function(b, a) {
						return this._getRowEl(b, a)
					},
					_getNodesEl : function(b, a) {
						b = this.getNode(b);
						var c = this._createNodesId(b, a);
						return document.getElementById(c)
					},
					_getNodesTr : function(c, a) {
						var b = this._getNodesEl(c, a);
						if (b) {
							return b.parentNode.parentNode
						}
					},
					setTreeColumn : function(a) {
						this._treeColumn = a;
						this.deferUpdate()
					},
					getTreeColumn : function() {
						return this._treeColumn
					},
					setShowTreeIcon : function(a) {
						this.showTreeIcon = a;
						this.deferUpdate()
					},
					getShowTreeIcon : function() {
						return this.showTreeIcon
					},
					setShowCheckBox : function(a) {
						this.showCheckBox = a;
						this.deferUpdate()
					},
					getShowCheckBox : function() {
						return this.showCheckBox
					},
					setCheckBoxType : function(a) {
						this._checkBoxType = a;
						this._doUpdateCheckState()
					},
					getCheckBoxType : function() {
						return this._checkBoxType
					},
					setIconsField : function(a) {
						this._iconsField = a
					},
					getIconsField : function() {
						return this._iconsField
					},
					_getNodeIcon : function(b) {
						var a = b[this.iconField];
						if (!a) {
							if (this.isLeaf(b)) {
								a = this.leafIconCls
							} else {
								a = this.folderIconCls
							}
						}
						return a
					},
					_getCheckBoxEl : function(a) {
						if (this.isVisibleNode(a) == false) {
							return null
						}
						var b = this._id + "$checkbox$" + a._id;
						return fui.byId(b, this.el)
					},
					useAnimation : true,
					_doExpandCollapseNode : function(e) {
						var d = new Date();
						if (this.isVirtualScroll() == true) {
							this.doUpdateRows();
							this.deferLayout(50);
							return
						}
						function c() {
							this._doUpdateTreeNodeEl(e);
							this.deferLayout(20)
						}
						if (false || fui.isIE6 || !this.useAnimation) {
							c.call(this)
						} else {
							var a = this.isExpandedNode(e);
							function f(n, j, m) {
								var g = this._getNodesEl(n, j);
								if (g) {
									var k = fui.getHeight(g);
									g.style.overflow = "hidden";
									g.style.height = "0px";
									var i = {
										height : k + "px"
									};
									var l = this;
									l._inAniming = true;
									var o = jQuery(g);
									o.animate(i, 180, function() {
										g.style.height = "auto";
										l._inAniming = false;
										l.doLayout();
										fui.repaint(g)
									})
								} else {
								}
							}
							function b(n, j, m) {
								var g = this._getNodesEl(n, j);
								if (g) {
									var k = fui.getHeight(g);
									var i = {
										height : 0 + "px"
									};
									var l = this;
									l._inAniming = true;
									var o = jQuery(g);
									o.animate(i, 180, function() {
										g.style.height = "auto";
										l._inAniming = false;
										if (m) {
											m.call(l)
										}
										l.doLayout();
										fui.repaint(g)
									})
								} else {
									if (m) {
										m.call(this)
									}
								}
							}
							if (a) {
								c.call(this);
								f.call(this, e, 2);
								f.call(this, e, 1)
							} else {
								b.call(this, e, 2, c);
								b.call(this, e, 1)
							}
						}
					},
					__OnTreeCollapse : function(a) {
						this._doExpandCollapseNode(a.node)
					},
					__OnTreeExpand : function(a) {
						this._doExpandCollapseNode(a.node)
					},
					_doCheckNodeEl : function(d) {
						var b = this._getCheckBoxEl(d);
						if (b) {
							var a = this.getCheckModel();
							b.checked = d.checked;
							if (a == "cascade") {
								var c = this.getCheckState(d);
								if (c == "indeterminate") {
									b.indeterminate = true
								} else {
									b.indeterminate = false
								}
							}
						}
					},
					__OnCheckChanged : function(f) {
						for (var b = 0, a = f._nodes.length; b < a; b++) {
							var d = f._nodes[b];
							this._doCheckNodeEl(d)
						}
						if (this._checkChangedTimer) {
							clearTimeout(this._checkChangedTimer);
							this._checkChangedTimer = null
						}
						var c = this;
						this._checkChangedTimer = setTimeout(function() {
							c._checkChangedTimer = null;
							c.fire("checkchanged")
						}, 1)
					},
					_tryToggleCheckNode : function(c) {
						var a = this.getCheckable(c);
						if (a == false) {
							return
						}
						var b = this.isCheckedNode(c);
						var d = {
							node : c,
							cancel : false,
							checked : b,
							isLeaf : this.isLeaf(c)
						};
						this.fire("beforenodecheck", d);
						if (d.cancel) {
							return
						}
						this._dataSource.doCheckNodes(c, !b, true);
						this.fire("nodecheck", d)
					},
					_tryToggleNode : function(a) {
						var c = this.isExpandedNode(a);
						var b = {
							node : a,
							cancel : false
						};
						if (c) {
							this.fire("beforecollapse", b);
							if (b.cancel == true) {
								return
							}
							this.collapseNode(a);
							this.fire("collapse", b)
						} else {
							this.fire("beforeexpand", b);
							if (b.cancel == true) {
								return
							}
							this.expandNode(a);
							this.fire("expand", b)
						}
					},
					_OnCellMouseDown : function(a) {
						if (fui.findParent(a.htmlEvent.target, this._eciconCls)) {
						} else {
							if (fui.findParent(a.htmlEvent.target,
									"fui-tree-checkbox")) {
							} else {
								this.fire("cellmousedown", a)
							}
						}
					},
					_OnCellClick : function(a) {
						if (fui.findParent(a.htmlEvent.target, this._eciconCls)) {
							return
						}
						if (fui.findParent(a.htmlEvent.target,
								"fui-tree-checkbox")) {
							this._tryToggleCheckNode(a.record)
						} else {
							this.fire("cellclick", a)
						}
					},
					__OnNodeDblClick : function(a) {
					},
					__OnNodeClick : function(a) {
					},
					setIconField : function(a) {
						this.iconField = a
					},
					getIconField : function() {
						return this.iconField
					},
					setAllowSelect : function(a) {
						this.setAllowRowSelect(a)
					},
					getAllowSelect : function() {
						return this.getAllowRowSelect()
					},
					setShowExpandButtons : function(a) {
						if (this.showExpandButtons != a) {
							this.showExpandButtons = a;
							this.doUpdate()
						}
					},
					getShowExpandButtons : function() {
						return this.showExpandButtons
					},
					setShowTreeLines : function(a) {
						this.showTreeLines = a;
						if (a == true) {
							fui.addClass(this.el, "fui-tree-treeLine")
						} else {
							fui.removeClass(this.el, "fui-tree-treeLine")
						}
					},
					getShowTreeLines : function() {
						return this.showTreeLines
					},
					setShowArrow : function(a) {
						this.showArrow = a;
						if (a == true) {
							fui.addClass(this.el, "fui-tree-showArrows")
						} else {
							fui.removeClass(this.el, "fui-tree-showArrows")
						}
					},
					getShowArrow : function() {
						return this.showArrow
					},
					setLeafIcon : function(a) {
						this.leafIcon = a
					},
					getLeafIcon : function() {
						return this.leafIcon
					},
					setFolderIcon : function(a) {
						this.folderIcon = a
					},
					getFolderIcon : function() {
						return this.folderIcon
					},
					getExpandOnDblClick : function() {
						return this.expandOnDblClick
					},
					setExpandOnNodeClick : function(a) {
						this.expandOnNodeClick = a;
						if (a) {
							fui.addClass(this.el, "fui-tree-nodeclick")
						} else {
							fui.removeClass(this.el, "fui-tree-nodeclick")
						}
					},
					getExpandOnNodeClick : function() {
						return this.expandOnNodeClick
					},
					setLoadOnExpand : function(a) {
						this.loadOnExpand = a
					},
					getLoadOnExpand : function() {
						return this.loadOnExpand
					},
					hideNode : function(a) {
						a = this.getNode(a);
						if (!a) {
							return
						}
						a.visible = false;
						this._doUpdateTreeNodeEl(a)
					},
					showNode : function(a) {
						a = this.getNode(a);
						if (!a) {
							return
						}
						a.visible = true;
						this._doUpdateTreeNodeEl(a)
					},
					enableNode : function(d) {
						d = this.getNode(d);
						if (!d) {
							return
						}
						d.enabled = true;
						var c = this._getNodeEl(d, 1);
						var b = this._getNodeEl(d, 2);
						if (c) {
							fui.removeClass(c, "fui-disabled")
						}
						if (b) {
							fui.removeClass(b, "fui-disabled")
						}
						var a = this._getCheckBoxEl(d);
						if (a) {
							a.disabled = false
						}
					},
					disableNode : function(d) {
						d = this.getNode(d);
						if (!d) {
							return
						}
						d.enabled = false;
						var c = this._getNodeEl(d, 1);
						var b = this._getNodeEl(d, 2);
						if (c) {
							fui.addClass(c, "fui-disabled")
						}
						if (b) {
							fui.addClass(b, "fui-disabled")
						}
						var a = this._getCheckBoxEl(d);
						if (a) {
							a.disabled = true
						}
					},
					imgPath : "",
					setImgPath : function(a) {
						this.imgPath = a
					},
					getImgPath : function() {
						return this.imgPath
					},
					imgField : "img",
					setImgField : function(a) {
						this.imgField = a
					},
					getImgField : function() {
						return this.imgField
					},
					getAttrs : function(c) {
						var i = fui.TreeGrid.superclass.getAttrs.call(this, c);
						fui._ParseString(c, i, [ "value", "url", "idField",
								"textField", "iconField", "nodesField",
								"parentField", "valueField", "checkedField",
								"leafIcon", "folderIcon", "leafField",
								"ondrawnode", "onbeforenodeselect",
								"onnodeselect", "onnodemousedown",
								"onnodeclick", "onnodedblclick",
								"onbeforenodecheck", "onnodecheck",
								"onbeforeexpand", "onexpand",
								"onbeforecollapse", "oncollapse",
								"dragGroupName", "dropGroupName", "onendedit",
								"expandOnLoad", "ondragstart", "onbeforedrop",
								"ondrop", "ongivefeedback", "treeColumn",
								"onaddnode", "onremovenode", "onmovenode",
								"imgPath", "imgField" ]);
						fui._ParseBool(c, i, [ "allowSelect", "showCheckBox",
								"showExpandButtons", "showTreeIcon",
								"showTreeLines", "checkRecursive",
								"enableHotTrack", "showFolderCheckBox",
								"resultAsTree", "allowDrag", "allowDrop",
								"showArrow", "expandOnDblClick",
								"removeOnCollapse", "autoCheckParent",
								"loadOnExpand", "expandOnNodeClick" ]);
						if (i.expandOnLoad) {
							var a = parseInt(i.expandOnLoad);
							if (fui.isNumber(a)) {
								i.expandOnLoad = a
							} else {
								i.expandOnLoad = i.expandOnLoad == "true" ? true
										: false
							}
						}
						var b = i.idField || this.getIdField();
						var e = i.textField || this.getTextField();
						var d = i.iconField || this.getIconField();
						var h = i.nodesField || this.getNodesField();
						function g(j) {
							var r = [];
							for (var s = 0, q = j.length; s < q; s++) {
								var n = j[s];
								var t = fui.getChildNodes(n);
								var u = t[0];
								var z = t[1];
								if (!u || !z) {
									u = n
								}
								var x = jQuery(u);
								var m = {};
								var k = m[b] = u.getAttribute("value");
								m[d] = x.attr("iconCls");
								m[e] = u.innerHTML;
								r.add(m);
								var w = x.attr("expanded");
								if (w) {
									m.expanded = w == "false" ? false : true
								}
								var p = x.attr("allowSelect");
								if (p) {
									m.allowSelect = p == "false" ? false : true
								}
								if (!z) {
									continue
								}
								var v = fui.getChildNodes(z);
								var y = g(v);
								if (y.length > 0) {
									m[h] = y
								}
							}
							return r
						}
						var f = g(fui.getChildNodes(c));
						if (f.length > 0) {
							i.data = f
						}
						if (!i.idField && i.valueField) {
							i.idField = i.valueField
						}
						return i
					}
				});
fui.regClass(fui.TreeGrid, "TreeGrid");
fui.Tree = function() {
	fui.Tree.superclass.constructor.call(this);
	var a = [ {
		name : "node",
		header : "",
		field : this.getTextField(),
		width : "auto",
		allowDrag : true,
		editor : {
			type : "textbox"
		}
	} ];
	this._columnModel.setColumns(a);
	this._column = this._columnModel.getColumn("node");
	fui.removeClass(this.el, "fui-treegrid");
	fui.addClass(this.el, "fui-tree-nowrap");
	this.setBorderStyle("border:0")
};
fui.extend(fui.Tree, fui.TreeGrid,
		{
			setTextField : function(a) {
				this._dataSource.setTextField(a);
				this._columnModel.updateColumn("node", {
					field : a
				});
				this.textField = a
			},
			uiCls : "fui-tree",
			_rowHoverCls : "fui-tree-node-hover",
			_rowSelectedCls : "fui-tree-selectedNode",
			_getRecordByEvent : function(a, c) {
				var b = fui.Tree.superclass._getRecordByEvent.call(this, a);
				if (c === false) {
					return b
				}
				if (b && fui.findParent(a.target, "fui-tree-nodeshow")) {
					return b
				}
				return null
			},
			_treeColumn : "node",
			defaultRowHeight : 22,
			_getRowHeight : function(a) {
				var b = this.defaultRowHeight;
				if (a._height) {
					b = parseInt(a._height);
					if (isNaN(parseInt(a._height))) {
						b = rowHeight
					}
				}
				return b
			},
			showHeader : false,
			showTopbar : false,
			showFooter : false,
			showColumns : false,
			showHGridLines : false,
			showVGridLines : false,
			showTreeLines : true,
			setTreeColumn : null,
			setColumns : null,
			getColumns : null,
			frozen : null,
			unFrozen : null,
			showModified : false,
			setNodeText : function(a, c) {
				a = this.getNode(a);
				if (!a) {
					return
				}
				var b = {};
				b[this.getTextField()] = c;
				this.updateNode(a, b)
			},
			setNodeIconCls : function(b, a) {
				b = this.getNode(b);
				if (!b) {
					return
				}
				var c = {};
				c[this.iconField] = a;
				this.updateNode(b, c)
			},
			_OnCellMouseDown : function(a) {
				if (this._editInput) {
					this._editInput.blur()
				}
				this.fire("cellmousedown", a)
			},
			isEditingNode : function(a) {
				return this._editingNode == a
			},
			beginEdit : function(b) {
				b = this.getNode(b);
				if (!b) {
					return
				}
				var a = this.getColumn(0);
				var c = fui._getMap(a.field, b);
				var d = {
					record : b,
					node : b,
					column : a,
					field : a.field,
					value : c,
					cancel : false
				};
				this.fire("cellbeginedit", d);
				if (d.cancel == true) {
					return
				}
				this._editingNode = b;
				this._doUpdateNodeTitle(b);
				var f = this._id + "$edit$" + b._id;
				this._editInput = document.getElementById(f);
				this._editInput.focus();
				fui.selectRange(this._editInput, 0, 1000);
				fui.on(this._editInput, "keydown", this.__OnEditInputKeyDown,
						this);
				fui.on(this._editInput, "blur", this.__OnEditInputBlur, this)
			},
			cancelEdit : function() {
				var a = this._editingNode;
				this._editingNode = null;
				if (a) {
					this._doUpdateNodeTitle(a);
					fui.un(this._editInput, "keydown",
							this.__OnEditInputKeyDown, this);
					fui.un(this._editInput, "blur", this.__OnEditInputBlur,
							this)
				}
				this._editInput = null
			},
			__OnEditInputKeyDown : function(b) {
				if (b.keyCode == 13) {
					var a = this._editingNode;
					var c = this._editInput.value;
					this.setNodeText(a, c);
					this.cancelEdit();
					this.fire("endedit", {
						node : a,
						text : c
					})
				} else {
					if (b.keyCode == 27) {
						this.cancelEdit()
					}
				}
			},
			__OnEditInputBlur : function(b) {
				var a = this._editingNode;
				if (a) {
					var c = this._editInput.value;
					this.cancelEdit();
					this.setNodeText(a, c);
					this.fire("endedit", {
						node : a,
						text : c
					})
				}
			},
			addRowCls : function(d, a) {
				var c = this._getRowEl(d, 1);
				var b = this._getRowEl(d, 2);
				if (c) {
					fui.addClass(c.firstChild, a)
				}
				if (b) {
					fui.addClass(b.firstChild, a)
				}
			},
			removeRowCls : function(d, a) {
				var c = this._getRowEl(d, 1);
				var b = this._getRowEl(d, 2);
				if (c) {
					fui.removeClass(c, a);
					fui.removeClass(c.firstChild, a)
				}
				if (b) {
					fui.removeClass(b, a);
					fui.removeClass(b.firstChild, a)
				}
			},
			scrollIntoView : function(b) {
				b = this.getNode(b);
				if (!b) {
					return
				}
				if (!this.isVisibleNode(b)) {
					this.expandPath(b)
				}
				var a = this;
				setTimeout(function() {
					var c = a._getNodeEl(b, 2);
					fui.scrollIntoView(c, a._rowsViewEl, false)
				}, 10)
			}
		});
fui.regClass(fui.Tree, "Tree");
fui._Tree_Expander = function(a) {
	this.owner = a;
	fui.on(a.el, "click", this.__OnClick, this);
	fui.on(a.el, "dblclick", this.__OnDblClick, this)
};
fui._Tree_Expander.prototype = {
	_canToggle : function() {
		return !this.owner._dataSource._isNodeLoading()
	},
	__OnClick : function(d) {
		var a = this.owner;
		var c = a._getRecordByEvent(d, false);
		if (!c || c.enabled === false) {
			return
		}
		if (fui.findParent(d.target, "fui-tree-checkbox")) {
			return
		}
		var b = a.isLeaf(c);
		if (fui.findParent(d.target, a._eciconCls)) {
			if (this._canToggle() == false) {
				return
			}
			a._tryToggleNode(c)
		} else {
			if (a.expandOnNodeClick && !b && !a._inAniming) {
				if (this._canToggle() == false) {
					return
				}
				a._tryToggleNode(c)
			}
		}
	},
	__OnDblClick : function(d) {
		var a = this.owner;
		var c = a._getRecordByEvent(d, false);
		if (!c || c.enabled === false) {
			return
		}
		var b = a.isLeaf(c);
		if (a._inAniming) {
			return
		}
		if (fui.findParent(d.target, a._eciconCls)) {
			return
		}
		if (a.expandOnNodeClick) {
			return
		}
		if (a.expandOnDblClick && !b) {
			if (this._canToggle() == false) {
				return
			}
			a._tryToggleNode(c)
		}
	}
};
fui._Tree_AsyncLoader = function(a) {
	this.owner = a;
	a.on("beforeexpand", this.__OnBeforeNodeExpand, this)
};
fui._Tree_AsyncLoader.prototype = {
	__OnBeforeNodeExpand : function(f) {
		var a = this.owner;
		var d = f.node;
		var b = a.isLeaf(d);
		var c = d[a.getNodesField()];
		if (!b && (!c || c.length == 0)) {
			if (a.loadOnExpand && d.asyncLoad !== false) {
				f.cancel = true;
				a.loadNode(d)
			}
		}
	}
};
fui.Richtext = function() {
	fui.Richtext.superclass.constructor.call(this)
};
fui.extend(fui.Richtext, fui.Control, {
	width : "100%",
	height : 300,
	uiCls : "fui-richtext",
	_create : function() {
		this.el = document.createElement("div");
		this.el.innerHTML = '<textarea style="display:none"></textarea>';
		this._fromEditor = this.el.firstChild;
		this._editor = new fui.TextArea();
		this._editor.setVisible(false);
		this._editor.render(this.el);
		var a = this;
		fui.loadRes("ckeditor", function() {
			a._initEditor()
		})
	},
	render : function(a) {
		fui.Richtext.superclass.constructor.call(this, a)
	},
	_initEditor : function() {
		var a = this;
		setTimeout(function() {
			a._doInitEditor()
		}, 1)
	},
	_doInitEditor : function() {
		if (this.isRender() == false) {
			return
		}
		if (this.editor) {
			return
		}
		var a = this;
		this._editor.set({
			name : a.name,
			id : a.id + "_editor"
		});
		this._fromEditor.id = this.id + "_fromEditor";
		this.editor = CKEDITOR.replace(a._fromEditor.id, {
			width : a.width.replace("px", ""),
			height : a.height.replace("px", "") - 100,
			readOnly : a.readOnly
		});
		this.editor.isReady = false;
		this.editor.on("instanceReady", function(b) {
			b.editor.resize(b.editor.config.width, a.height.replace("px", ""));
			b.editor.isReady = true;
			a.setValue(a.value);
			a.fire("initeditor")
		});
		this.editor.on("resize", function(c) {
			var b = c.editor.container.$.clientHeight;
			fui.Richtext.superclass.setHeight.call(a, b)
		})
	},
	setValue : function(a) {
		if (this.editor && this.editor.isReady) {
			this.editor.setData(a);
			this._editor.setValue(a)
		} else {
			this.value = a
		}
	},
	getValue : function() {
		if (this.editor) {
			return this.editor.getData()
		}
		return this.value
	},
	setSubmitData : function() {
		if (this._editor) {
			this._editor.setValue(this.getValue())
		}
	},
	getSubmitData : function() {
		if (this._editor) {
			return this._editor.getValue()
		}
		return this.getValue()
	},
	setWidth : function(a) {
		fui.Richtext.superclass.setWidth.call(this, a);
		if (this.editor) {
			this.editor.resize(a, this.getHeight())
		}
	},
	setHeight : function(a) {
		fui.Richtext.superclass.setHeight.call(this, a);
		if (this.editor) {
			this.editor.resize(this.getWidth(), a)
		}
	},
	setReadOnly : function(a) {
		if (this.editor) {
			this.editor.setReadOnly(a);
			this.readOnly = a
		} else {
			this.readOnly = a
		}
	},
	getReadOnly : function() {
		if (this.editor) {
			return this.editor.readOnly
		}
		return this.readOnly
	}
});
fui.regClass(fui.Richtext, "richtext");
(function() {
	fui.DictCheckboxGroup = function() {
		fui.DictCheckboxGroup.superclass.constructor.call(this)
	};
	fui.DictRadioGroup = function() {
		fui.DictRadioGroup.superclass.constructor.call(this)
	};
	fui.DictComboBox = function() {
		fui.DictComboBox.superclass.constructor.call(this)
	};
	var a = {
		map : {},
		loadingMap : {},
		removeEmpty : function(e) {
			for (var d = 0, c = e.length; d < c; d++) {
				if (e[d] && e[d].__NullItem) {
					e.splice(d, 1)
				}
			}
		},
		getDictName : function(f, d) {
			var e = [];
			for (var g = 0, c = f.length; g < c; g++) {
				var h = f[g];
				if (fui.fn.contains(d, h.dictID)) {
					e.push(h.dictName)
				}
			}
			return e.join(",")
		},
		ajaxLoad : function(d) {
			var c = {
				dictTypeId : d.dictTypeId
			};
			fui.ajax({
				url : "dict/getDictData",
				data : c,
				type : "POST",
				async : false,
				success : function(f) {
					var e = f.dictList;
					a.map[dictTypeId] = e;
					d._setDictData(e)
				}
			})
		},
		getDictText : function(c, e) {
			var d = a.map[c];
			if (d) {
				return a.getDictName(d, e)
			}
			var f = "";
			fui.ajax({
				url : "dict/getDictData",
				data : {
					dictTypeId : c
				},
				type : "POST",
				async : false,
				success : function(h) {
					var g = h.dictList;
					a.map[c] = g;
					f = a.getDictName(g, e)
				}
			});
			return f
		},
		loadData : function() {
			var c = this.dictTypeId;
			if (!c) {
				return
			}
			var d = a.map[c];
			if (!d) {
				fui.ajax({
					url : "dict/getDictData",
					data : {
						dictTypeId : c
					},
					type : "POST",
					async : false,
					success : function(f) {
						f = fui.decode(f);
						var e = f.dictList;
						a.map[c] = e
					}
				});
				d = a.map[c]
			}
			a.removeEmpty(d);
			this._setDictData(d)
		}
	};
	fui.getDictText = a.getDictText;
	var b = {
		dictTypeId : "",
		textField : "dictName",
		valueField : "dictID",
		_initData : function() {
			a.loadData.call(this)
		},
		_setDictData : function(c) {
			this.loadData(c);
			if (this.value) {
				this.setValue(this.value)
			}
		}
	};
	b.uiCls = "fui-dictcheckboxgroup";
	jQuery.extend(b, {
		uiCls : "fui-dictcheckboxgroup",
		set : function(c) {
			fui.DictCheckboxGroup.superclass.set.call(this, c);
			this._initData()
		},
		getAttrs : function(d) {
			var c = fui.DictCheckboxGroup.superclass.getAttrs.call(this, d);
			var e = jQuery(d);
			fui._ParseString(d, c, [ "dictTypeId" ]);
			return c
		}
	});
	fui.extend(fui.DictCheckboxGroup, fui.CheckBoxList, b);
	jQuery.extend(b, {
		uiCls : "fui-dictradiogroup",
		set : function(c) {
			fui.DictRadioGroup.superclass.set.call(this, c);
			this._initData()
		},
		getAttrs : function(d) {
			var c = fui.DictRadioGroup.superclass.getAttrs.call(this, d);
			var e = jQuery(d);
			fui._ParseString(d, c, [ "dictTypeId" ]);
			return c
		}
	});
	fui.extend(fui.DictRadioGroup, fui.RadioButtonList, b);
	jQuery.extend(b, {
		uiCls : "fui-dictcombobox",
		_afterApply : function(c) {
			fui.DictComboBox.superclass._afterApply.call(this, c);
			this._initData()
		},
		getAttrs : function(d) {
			var c = fui.DictComboBox.superclass.getAttrs.call(this, d);
			var e = jQuery(d);
			fui._ParseString(d, c, [ "dictTypeId" ]);
			return c
		},
		_setDictData : function(d) {
			this.setValueField(this.valueField);
			this.setTextField(this.textField);
			this.setData(d);
			if (this.value) {
				var c = this.value;
				this.value = "";
				this.setValue(c)
			}
		}
	});
	fui.extend(fui.DictComboBox, fui.ComboBox, b);
	fui.regClass(fui.DictCheckboxGroup, "dictcheckboxgroup");
	fui.regClass(fui.DictRadioGroup, "dictradiogroup");
	fui.regClass(fui.DictComboBox, "dictcombobox")
})(fui);
(function(a) {
	a.ajax = function(c) {
		var b = c.url;
		if (b && b.length > 4 && b.lastIndexOf(".ext") == b.length - 4) {
			if (!c.dataType) {
				c.dataType = "json"
			}
			if (!c.contentType) {
				c.contentType = "application/json; charset=UTF-8"
			}
			if (c.data && fui.isNull(c.data.pageIndex) == false) {
				var d = c.data.page = {};
				d.begin = c.data.pageIndex * c.data.pageSize;
				d.length = c.data.pageSize
			}
			if (c.dataType == "json" && typeof (c.data) == "object") {
				c.data = fui.encode(c.data);
				if (c.data == "{}") {
					delete c.data
				}
				c.type = "POST"
			}
		}
		return window.jQuery.ajax(c)
	}
})(fui);
(function(c) {
	c.getClassByUICls = function(e) {
		e = e.toLowerCase();
		var d = this.uiClasses[e];
		if (!d) {
			e = e.replace("fui-", "fui-");
			d = this.uiClasses[e]
		}
		return d
	};
	c.DatePicker.prototype.valueFormat = "yyyy-MM-dd HH:mm:ss";
	c.ajax = function(e) {
		var d = e.url;
		if (d && d.length > 4 && d.lastIndexOf(".ext") == d.length - 4) {
			if (!e.dataType) {
				e.dataType = "json"
			}
			if (!e.contentType) {
				e.contentType = "application/json; charset=UTF-8"
			}
			if (e.data && fui.isNull(e.data.pageIndex) == false) {
				var f = e.data.page = {};
				f.begin = e.data.pageIndex * e.data.pageSize;
				f.length = e.data.pageSize
			}
			if (e.dataType == "json" && typeof (e.data) == "object") {
				e.data = fui.encode(e.data);
				if (e.data == "{}") {
					delete e.data
				}
				e.type = "POST"
			}
		}
		return window.jQuery.ajax(e)
	};
	c.fn = {
		contains : function(d, e) {
			return ("," + d + ",").indexOf("," + e + ",") != -1
		},
		endWidth : function(d, e) {
			if (d.length < e.length) {
				return false
			}
			return d.substr(d.length - e.length) === e
		},
		startWidth : function(d, e) {
			return d.substr(0, e.length) === e
		}
	};
	var b = jQuery;
	var a = {
		map : {},
		loaded : {},
		timeSeed : true,
		path : "",
		isAbsolutePath : function(d) {
			return c.fn.startWidth(d, "http") || c.fn.startWidth(d, "/")
		},
		getJSPath : function(h) {
			var e = document.scripts;
			for (var g = 0, d = e.length; g < d; g++) {
				var j = e[g].src;
				j = j.split("?")[0];
				var f = c.fn.endWidth(j, h);
				if (f) {
					return j.substr(0, j.lastIndexOf("/")) + "/"
				}
			}
			return ""
		},
		hasLoaded : function(d) {
			return this.loaded[d]
		},
		getLoadInfo : function(d) {
			return this.loaded[d]
		},
		loadCSS : function(e) {
			if (!b.isArray(e)) {
				e = [ e ]
			}
			for (var f = 0, d = e.length; f < d; f++) {
				this.loadCSS(e[f])
			}
		},
		loadJS : function(k, f, e) {
			if (!b.isArray(k)) {
				k = [ k ]
			}
			var d = k.length;
			var j = 0;
			if (e) {
				var h = function(m, l) {
					a._loadJS(k[m], function() {
						m++;
						if (m < d) {
							h(m, l)
						} else {
							l()
						}
					})
				};
				h(0, f)
			} else {
				for (var g = 0; g < d; g++) {
					a._loadJS(k[g], function() {
						j++;
						if (j == d) {
							f()
						}
					})
				}
			}
		},
		_loadCSS : function(e, f) {
			if (this.getLoadInfo(e)) {
				return
			}
			f = f || document;
			var d = f.createElement("link");
			d.type = "text/css";
			if (NUI.timeSeed) {
				d.href = e + "?" + (new Date())
			} else {
				d.href = e
			}
			d.rel = "stylesheet";
			f.getElementsByTagName("head")[0].appendChild(d);
			this.loaded[e] = true;
			return d
		},
		_loadJS : function(h, d, g) {
			d = d || function() {
			};
			if (!a.isAbsolutePath(h)) {
				h = a.path + h
			}
			var e = this.getLoadInfo(h);
			if (e) {
				switch (e.status) {
				case "loading":
					e.handler.push(d);
					break;
				case "loaded":
					d();
					break
				}
				return
			} else {
				this.loaded[h] = {
					status : "loading",
					handler : [ d ]
				}
			}
			g = g || document;
			var f = g.createElement("script");
			f.type = "text/javascript";
			if (this.timeSeed) {
				f.src = h + "?" + (new Date())
			} else {
				f.src = h
			}
			f.onreadystatechange = f.onload = function() {
				if (!this.readyState
						|| (this.readyState == "complete" || this.readyState == "loaded")) {
					a.loaded[h] = a.loaded[h] || {};
					a.loaded[h].status = "loaded";
					var k = a.loaded[h].handler;
					for (var l = 0, j = k.length; l < j; l++) {
						var m = k[l];
						if (m && typeof (m) == "function") {
							m()
						}
					}
				}
			};
			g.getElementsByTagName("head")[0].appendChild(f);
			return f
		}
	};
	a.path = a.getJSPath("fui.js");
	c.res = {
		hasLoaded : function(d) {
			return a.loaded[d]
		},
		add : function(d, e) {
			e = e || {};
			e.js = e.js || [];
			e.css = e.css || [];
			e.order = e.order || false;
			a.map[d] = e
		},
		remove : function(d) {
			delete a.map[d]
		},
		get : function(d) {
			return a.map[d]
		},
		load : function(f, d) {
			var e = this.get(f);
			if (!e) {
				d();
				return
			}
			a.loadCSS(e.css);
			a.loadJS(e.js, d, e.order)
		}
	};
	c.loadRes = function(e, d) {
		c.res.load(e, d)
	};
	c.res.add("ckeditor", {
		js : [ "resource/ckeditor/ckeditor.js" ]
	});
	c.res.add("swfupload", {});
	window.fui = c
})(fui);
fui.MenuBarX = function() {
	fui.MenuBarX.superclass.constructor.call(this)
};
fui.extend(fui.MenuBarX, fui.MenuBar, {
	uiCls : "fui-menubarx",
	_itemType : "menuitemx"
});
fui.regClass(fui.MenuBarX, "menubarx");
fui.MenuItemX = function() {
	fui.MenuItemX.superclass.constructor.call(this)
};
fui.extend(fui.MenuItemX, fui.MenuItem, {
	setMenu : function(b) {
		if (fui.isArray(b)) {
			b = {
				type : "menu",
				items : b
			}
		}
		if (this.menu !== b) {
			var a = fui._getTopFUI();
			this.menu = a.getAndCreate(b);
			this.menu.hide();
			this.menu.ownerItem = this;
			this.doUpdate();
			this.menu.on("itemschanged", this.__OnItemsChanged, this);
			this.menu.window = a.window
		}
	},
	showMenu : function() {
		if (this.menu && this.menu.isDisplay() == false) {
			this.menu.setHideAction("outerclick");
			var a = {
				xAlign : "outright",
				yAlign : "top",
				outXAlign : "outleft",
				popupCls : "fui-menu-popup"
			};
			if (this.ownerMenu && this.ownerMenu.vertical == false) {
				a.xAlign = "left";
				a.yAlign = "below";
				a.outXAlign = null
			}
			a.window = window;
			a.topWindow = this.menu.window;
			this.menu.showAtEl(this.el, a)
		}
	}
});
fui.regClass(fui.MenuItemX, "menuitemx");
fui.Menu.prototype._getWindowOffset = function(b) {
	var c = b.window, a = b.topWindow;
	if (c && a && c != a) {
		return fui._getWindowOffset(c, a)
	} else {
		return [ 0, 0 ]
	}
};
fui._getTopFUI = function() {
	var b = [];
	function a(d) {
		try {
			d.___try = 1;
			if (!d.fui) {
				return
			}
			b.push(d)
		} catch (c) {
		}
		if (d.parent && d.parent != d) {
			a(d.parent)
		}
	}
	a(window);
	return b[b.length - 1].fui
};
fui._getWindowOffset = function(h, d) {
	var g = [];
	function b(u) {
		var t = u.parent;
		var r = t.document.getElementsByTagName("iframe");
		for (var q = 0, o = r.length; q < o; q++) {
			var s = r[q];
			if (s.contentWindow == u) {
				g.add(s);
				break
			}
		}
		if (t != d) {
			b(t)
		}
	}
	b(h);
	g.reverse();
	var n = 0, m = 0;
	var j = d.fui;
	for (var e = 0, c = g.length; e < c; e++) {
		var a = g[e];
		var f = j.getBox(a);
		n += f.x;
		m += f.y;
		var k = j.getBorders(a);
		n += k.left;
		m += k.top;
		j = a.contentWindow.fui
	}
	return [ n, m ]
};
var __TopFUI = fui._getTopFUI();
fui.DatePickerX = function() {
	fui.DatePickerX.superclass.constructor.call(this)
};
fui.extend(fui.DatePickerX, fui.DatePicker, {
	uiCls : "fui-datepickerx",
	destroy : function(b) {
		if (this._calendar) {
			this._calendar.destroy();
			this._calendar = null
		}
		var a = __TopFUI;
		a.DatePicker._Calendar = null;
		fui.DatePickerX.superclass.destroy.call(this, b)
	},
	_createPopup : function() {
		var a = __TopFUI;
		this.popup = new a.Popup();
		this.popup.setShowAction("none");
		this.popup.setHideAction("outerclick");
		this.popup.setPopupEl(this.el);
		this.popup.on("BeforeClose", this.__OnPopupBeforeClose, this);
		a.on(this.popup.el, "keydown", this.__OnPopupKeyDown, this);
		this._calendar = this._getCalendar()
	},
	_getCalendar : function() {
		var a = __TopFUI;
		if (!a.DatePicker._Calendar) {
			var b = a.DatePicker._Calendar = new a.Calendar();
			b.setStyle("border:0;")
		}
		return a.DatePicker._Calendar
	},
	_doShowAtEl : function(c, b) {
		var a = this.getPopup();
		a._getWindowOffset = fui.Menu.prototype._getWindowOffset;
		b.window = window;
		b.topWindow = __TopFUI.window;
		a.showAtEl(c, b)
	}
});
fui.regClass(fui.DatePickerX, "DatePickerX");