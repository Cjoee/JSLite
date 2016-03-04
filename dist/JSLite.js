;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['JSLite'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('JSLite'));
  } else {
    root.JSLite = factory(root.JSLite);
  }
}(this, function(JSLite) {
window && !window.getComputedStyle && (window.getComputedStyle = function(el, pseudo) {
    return this.el = el, this.getPropertyValue = function(prop) {
        var re = /(\-([a-z]){1})/g;
        return "float" == prop && (prop = "styleFloat"), re.test(prop) && (prop = prop.replace(re, function() {
            return arguments[2].toUpperCase();
        })), el.currentStyle[prop] ? el.currentStyle[prop] : null;
    }, this;
}), Array.prototype.filter || (Array.prototype.filter = function(fun) {
    "use strict";
    if (void 0 === this || null === this) throw new TypeError();
    var t = Object(this), len = t.length >>> 0;
    if ("function" != typeof fun) throw new TypeError();
    for (var res = [], thisArg = arguments.length >= 2 ? arguments[1] : void 0, i = 0; len > i; i++) if (i in t) {
        var val = t[i];
        fun.call(thisArg, val, i, t) && res.push(val);
    }
    return res;
}), Array.indexOf || (Array.prototype.indexOf = function(obj) {
    for (var i = 0; i < this.length; i++) if (this[i] == obj) return i;
    return -1;
}), Array.prototype.forEach || (Array.prototype.forEach = function(fun) {
    var len = this.length;
    if ("function" != typeof fun) throw new TypeError();
    for (var thisp = arguments[1], i = 0; len > i; i++) i in this && fun.call(thisp, this[i], i, this);
}), Array.prototype.remove || (Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    return index > -1 && this.splice(index, 1), this;
}), String.prototype.trim || (String.prototype.trim = function() {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
});

function likeArray(obj) {
    return obj ? "number" == typeof obj.length : null;
}

function each(elements, callback) {
    var i, key;
    if (likeArray(elements)) {
        for (i = 0; i < elements.length; i++) if (callback.call(elements[i], i, elements[i]) === !1) return elements;
    } else for (key in elements) if (callback.call(elements[key], key, elements[key]) === !1) return elements;
    return elements;
}

var class2type = {};

each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
});

function type(obj) {
    return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
}

function isFunction(fn) {
    return "function" == type(fn);
}

function isObject(obj) {
    return "object" == type(obj);
}

function isArray(arr) {
    return Array.isArray ? Array.isArray(arr) : "array" === type(arr);
}

function isString(obj) {
    return "string" == typeof obj;
}

function isPlainObject(obj) {
    function hasOwn(class2type) {
        return class2type.hasOwnProperty;
    }
    return "object" !== JSLite.type(obj) || obj.nodeType || JSLite.isWindow(obj) ? !1 : obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ? !1 : !0;
}

function isJson(obj) {
    var isjson = "object" == typeof obj && "[object object]" == toString.call(obj).toLowerCase() && !obj.length;
    return isjson;
}

function isWindow(win) {
    return win && win == win.window;
}

function isDocument(doc) {
    return doc && doc.nodeType == doc.DOCUMENT_NODE;
}

var P = {};

P = {
    singleTagRE: /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    fragmentRE: /^\s*<(\w+|!)[^>]*>/,
    tagExpanderRE: /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    table: document.createElement("table"),
    tableRow: document.createElement("tr"),
    containers: {
        "*": document.createElement("div"),
        tr: document.createElement("tbody"),
        tbody: P.table,
        thead: P.table,
        tfoot: P.table,
        td: P.tableRow,
        th: P.tableRow
    }
};

function fragment(html, name) {
    var dom, container;
    return P.singleTagRE.test(html) && (dom = JSLite(document.createElement(RegExp.$1))), 
    dom || (html.replace && (html = html.replace(P.tagExpanderRE, "<$1></$2>")), void 0 === name && (name = P.fragmentRE.test(html) && RegExp.$1), 
    name in P.containers || (name = "*"), container = P.containers[name], container.innerHTML = "" + html, 
    dom = each(slice.call(container.childNodes), function() {
        container.removeChild(this);
    })), dom;
}

function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg;
}

function camelCase(string) {
    return string.replace(/^-ms-/, "ms-").replace(/-([a-z])/g, function(all, letter) {
        return letter.toUpperCase();
    });
}

function dasherize(str) {
    return str.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
}

function dir(nodes, selector, dir) {
    var ancestors = [];
    while (nodes.length > 0) nodes = $.map(nodes, function(node) {
        return (node = node[dir]) && !isDocument(node) && ancestors.indexOf(node) < 0 ? (ancestors.push(node), 
        node) : void 0;
    });
    return selector && isString(selector) ? $(ancestors).filter(selector) : $(ancestors);
}

var emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter, some = emptyArray.some, emptyObject = {}, toString = emptyObject.toString, elementTypes = [ 1, 9, 11 ], propMap = {
    tabindex: "tabIndex",
    readonly: "readOnly",
    "for": "htmlFor",
    "class": "className",
    maxlength: "maxLength",
    cellspacing: "cellSpacing",
    cellpadding: "cellPadding",
    rowspan: "rowSpan",
    colspan: "colSpan",
    usemap: "useMap",
    frameborder: "frameBorder",
    contenteditable: "contentEditable"
}, JSLite;

JSLite = function() {
    var JSLite = function(selector) {
        return new JSLite.fn.init(selector);
    };
    return JSLite.fn = JSLite.prototype = {
        init: function(selector) {
            var dom;
            if (selector) if ("string" == typeof selector && (selector = selector.trim()) && "<" == selector[0] && /^\s*<(\w+|!)[^>]*>/.test(selector)) dom = fragment(selector), 
            selector = null; else {
                if (isFunction(selector)) return JSLite(document).ready(selector);
                isArray(selector) ? dom = selector : isObject(selector) ? (dom = [ selector ], selector = null) : elementTypes.indexOf(selector.nodeType) >= 0 || selector === window ? (dom = [ selector ], 
                selector = null) : dom = function() {
                    var found;
                    return document && /^#([\w-]+)$/.test(selector) ? (found = document.getElementById(RegExp.$1)) ? [ found ] : [] : slice.call(/^\.([\w-]+)$/.test(selector) ? document.getElementsByClassName(RegExp.$1) : /^[\w-]+$/.test(selector) ? document.getElementsByTagName(selector) : document.querySelectorAll(selector));
                }();
            } else dom = emptyArray, dom.selector = selector || "", dom.__proto__ = JSLite.fn.init.prototype;
            return dom = dom || emptyArray, JSLite.extend(dom, JSLite.fn), dom.selector = selector || "", 
            dom;
        }
    }, JSLite.fn.init.prototype = JSLite.fn, JSLite;
}(), JSLite.extend = JSLite.fn.extend = function() {
    var options, name, src, copy, target = arguments[0], i = 1, length = arguments.length, deep = !1;
    for ("boolean" == typeof target && (deep = target, target = arguments[1] || {}, 
    i = 2), "object" == typeof target || isFunction(target) || (target = {}), length === i && (target = this, 
    --i); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
    copy = options[name], target !== copy && void 0 !== copy && (target[name] = copy);
    return target;
}, JSLite.extend({
    isDocument: isDocument,
    isFunction: isFunction,
    isObject: isObject,
    isArray: isArray,
    isString: isString,
    isWindow: isWindow,
    isPlainObject: isPlainObject,
    isJson: isJson,
    parseJSON: JSON.parse,
    type: type,
    likeArray: likeArray,
    trim: function(str) {
        return null == str ? "" : String.prototype.trim.call(str);
    },
    intersect: function(a, b) {
        var array = [];
        return a.forEach(function(item) {
            b.indexOf(item) > -1 && array.push(item);
        }), array;
    },
    error: function(msg) {
        throw msg;
    },
    getUrlParam: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"), r = window.location.search.substr(1).match(reg);
        return null != r ? unescape(r[2]) : null;
    },
    each: function(elements, callback) {
        return each.apply(this, arguments);
    },
    map: function(elements, callback) {
        var value, values = [], i, key;
        if (likeArray(elements)) for (i = 0; i < elements.length; i++) value = callback(elements[i], i), 
        null != value && values.push(value); else for (key in elements) value = callback(elements[key], key), 
        null != value && values.push(value);
        return values.length > 0 ? JSLite.fn.concat.apply([], values) : values;
    },
    grep: function(elements, callback) {
        return filter.call(elements, callback);
    },
    matches: function(element, selector) {
        if (!selector || !element || 1 !== element.nodeType) return !1;
        var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.msMatchesSelector || element.matchesSelector;
        return matchesSelector ? matchesSelector.call(element, selector) : void 0;
    },
    unique: function(array) {
        return filter.call(array, function(item, idx) {
            return array.indexOf(item) == idx;
        });
    },
    inArray: function(elem, array, i) {
        return emptyArray.indexOf.call(array, elem, i);
    },
    sibling: function(nodes, ty) {
        var ancestors = [];
        return nodes.length > 0 && (ancestors = JSLite.map(nodes, function(node) {
            return (node = node[ty]) && !isDocument(node) && ancestors.indexOf(node) < 0 && ancestors.push(node), 
            node;
        })), this.unique(ancestors);
    },
    contains: function(parent, node) {
        return parent && !node ? document.documentElement.contains(parent) : parent !== node && parent.contains(node);
    },
    camelCase: function(string) {
        return string.replace(/^-ms-/, "ms-").replace(/-([a-z])/g, function(all, letter) {
            return letter.toUpperCase();
        });
    },
    now: Date.now
}), JSLite.fn.extend({
    forEach: emptyArray.forEach,
    concat: emptyArray.concat,
    indexOf: emptyArray.indexOf,
    each: function(callback) {
        return JSLite.each(this, callback);
    },
    map: function(fn) {
        return JSLite(JSLite.map(this, function(el, i) {
            return fn.call(el, i, el);
        }));
    },
    get: function(index) {
        return void 0 === index ? slice.call(this) : this[index >= 0 ? index : index + this.length];
    },
    index: function(element) {
        return element ? "string" === type(element) ? this.indexOf(this.parent().children(element)[0]) : this.indexOf(element) : this.parent().children().indexOf(this[0]);
    },
    is: function(selector) {
        return this.length > 0 && "string" != typeof selector ? this.indexOf(selector) > -1 ? !0 : !1 : this.length > 0 && JSLite.matches(this[0], selector);
    },
    add: function(selector) {
        return JSLite(JSLite.unique(this.concat(JSLite(selector))));
    },
    eq: function(idx) {
        return JSLite(-1 === idx ? this.slice(idx) : this.slice(idx, +idx + 1));
    },
    first: function() {
        var el = this[0];
        return el && !isObject(el) ? el : JSLite(el);
    },
    slice: function(argument) {
        return JSLite(slice.apply(this, arguments));
    },
    size: function() {
        return this.length;
    },
    filter: function(selector) {
        return isFunction(selector) ? this.not(this.not(selector)) : JSLite(filter.call(this, function(element) {
            return JSLite.matches(element, selector);
        }));
    },
    not: function(selector) {
        var nodes = [];
        if (isFunction(selector) && void 0 !== selector.call) this.each(function(idx) {
            selector.call(this, idx) || nodes.push(this);
        }); else {
            var excludes = "string" == typeof selector ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? slice.call(selector) : JSLite(selector);
            this.forEach(function(el) {
                excludes.indexOf(el) < 0 && nodes.push(el);
            });
        }
        return JSLite(nodes);
    },
    children: function(selector) {
        var e = [];
        return filter.call(this.pluck("children"), function(item, idx) {
            JSLite.map(item, function(els) {
                els && 1 == els.nodeType && e.push(els);
            });
        }), JSLite(e).filter(selector || "*");
    },
    contents: function(selector) {
        return this.map(function() {
            return this.contentDocument || $.grep(this.childNodes, function(node) {
                return selector ? $.matches(node, selector) : node;
            });
        });
    },
    parent: function(selector) {
        return JSLite(JSLite.unique(this.pluck("parentNode"))).filter(selector || "*");
    },
    parents: function(selector) {
        return dir(this, selector, "parentNode");
    },
    closest: function(selector, context) {
        var node = this[0], collection = !1;
        "object" == typeof selector && (collection = JSLite(selector));
        while (node && !(collection ? collection.indexOf(node) >= 0 : JSLite.matches(node, selector))) node = node !== context && !isDocument(node) && node.parentNode;
        return JSLite(node);
    },
    prev: function(selector) {
        return JSLite(this.pluck("previousElementSibling")).filter(selector || "*");
    },
    next: function(selector) {
        return JSLite(this.pluck("nextElementSibling")).filter(selector || "*");
    },
    nextAll: function(selector) {
        return dir(this, selector, "nextElementSibling");
    },
    prevAll: function(selector) {
        return dir(this, selector, "previousElementSibling");
    },
    siblings: function(selector) {
        var n = [];
        return this.map(function(i, el) {
            filter.call(el.parentNode.children, function(els, idx) {
                els && 1 == els.nodeType && els != el && n.push(els);
            });
        }), JSLite(n).filter(selector || "*");
    },
    find: function(selector) {
        var nodes = this.children(), ancestors = [];
        while (nodes.length > 0) nodes = JSLite.map(nodes, function(node, inx) {
            return ancestors.indexOf(node) < 0 && ancestors.push(node), (nodes = JSLite(node).children()) && nodes.length > 0 ? nodes : void 0;
        });
        return JSLite(ancestors).filter(selector || "*");
    },
    replaceWith: function(newContent) {
        return this.before(newContent).remove();
    },
    unwrap: function() {
        return this.parent().each(function() {
            JSLite(this).replaceWith(JSLite(this).html());
        }), this;
    },
    remove: function(selector) {
        var elm = selector ? JSLite(this.find(funcArg(this, selector))) : this;
        return elm.each(function() {
            null != this.parentNode && this.parentNode.removeChild(this);
        });
    },
    detach: function() {
        return this.remove();
    },
    empty: function() {
        return this.each(function() {
            this.innerHTML = "";
        });
    },
    clone: function() {
        return this.map(function() {
            return this.cloneNode(!0);
        });
    },
    text: function(text) {
        return void 0 === text ? this.length > 0 ? this[0].textContent : null : this.each(function() {
            this.textContent = funcArg(this, text);
        });
    },
    html: function(html) {
        return 0 in arguments ? this.each(function(idx) {
            JSLite(this).empty().append(funcArg(this, html));
        }) : 0 in this ? this[0].innerHTML : null;
    },
    hide: function() {
        return this.css("display", "none");
    },
    show: function() {
        return this.each(function() {
            "none" == this.style.display && (this.style.display = "");
            var CurrentStyle = function(e) {
                return e.currentStyle || document.defaultView.getComputedStyle(e, null);
            };
            function defaultDisplay(nodeName) {
                var elm = document.createElement(nodeName), display;
                return JSLite("body").append(JSLite(elm)), display = CurrentStyle(elm).display, 
                elm.parentNode.removeChild(elm), display;
            }
            "none" == CurrentStyle(this).display && (this.style.display = defaultDisplay(this.nodeName));
        });
    },
    toggle: function(setting) {
        return this.each(function() {
            var el = JSLite(this);
            (void 0 === setting ? "none" == el.css("display") : setting) ? el.show() : el.hide();
        });
    },
    offset: function() {
        if (0 == this.length) return null;
        var obj = this[0].getBoundingClientRect();
        return {
            left: obj.left + window.pageXOffset,
            top: obj.top + window.pageYOffset,
            width: obj.width,
            height: obj.height
        };
    },
    css: function(property, value) {
        var elem = this[0];
        if (arguments.length < 2) {
            if (!elem) return [];
            if (!value && "string" == typeof property) return elem.style[property];
            if (isArray(property)) {
                var props = {};
                return $.each(property, function(_, prop) {
                    props[prop] = elem.style[camelCase(prop)];
                }), props;
            }
        }
        var css = {}, k;
        if ("string" == typeof property) value || 0 === value ? css[dasherize(property)] = value : this.each(function() {
            this.style.removeProperty(dasherize(property));
        }); else for (k in property) property[k] || 0 === property[k] ? css[dasherize(k)] = property[k] : this.each(function() {
            this.style.removeProperty(dasherize(k));
        });
        return this.each(function() {
            for (var a in css) this.style[a] = css[a];
        });
    },
    hasClass: function(name) {
        return name ? emptyArray.some.call(this, function(el) {
            return this.test(el.className);
        }, new RegExp("(^|\\s)" + name + "(\\s|$)")) : !1;
    },
    addClass: function(name) {
        if (!name) return this;
        var classList, cls, newName;
        return this.each(function(idx) {
            return classList = [], cls = this.className, newName = funcArg(this, name).trim(), 
            newName.split(/\s+/).forEach(function(k) {
                JSLite(this).hasClass(k) || classList.push(k);
            }, this), newName ? void (classList.length ? this.className = cls + (cls ? " " : "") + classList.join(" ") : null) : this;
        });
    },
    removeClass: function(name) {
        var cls;
        return void 0 === name ? this.removeAttr("class") : this.each(function(idx) {
            cls = this.className, funcArg(this, name, idx, cls).split(/\s+/).forEach(function(k) {
                cls = cls.replace(new RegExp("(^|\\s)" + k + "(\\s|$)"), " ").trim();
            }, this), cls ? this.className = cls : this.className = "";
        });
    },
    toggleClass: function(name) {
        return name ? this.each(function(idx) {
            var w = JSLite(this), names = funcArg(this, name);
            names.split(/\s+/g).forEach(function(cls) {
                w.hasClass(cls) ? w.removeClass(cls) : w.addClass(cls);
            });
        }) : this;
    },
    pluck: function(property) {
        return JSLite.map(this, function(el) {
            return el[property];
        });
    },
    prop: function(name, value) {
        return name = propMap[name] || name, 1 in arguments ? this.each(function(idx) {
            this[name] = funcArg(this, value, idx, this[name]);
        }) : this[0] && this[0][name];
    },
    removeProp: function(name) {
        return name = propMap[name] || name, this.each(function() {
            try {
                this[name] = void 0, delete this[name];
            } catch (e) {}
        });
    },
    attr: function(name, value) {
        var result, k;
        return "string" != typeof name || 1 in arguments ? this.each(function(n) {
            if (isObject(name)) for (k in name) this.setAttribute(k, name[k]); else this.setAttribute(name, funcArg(this, value));
        }) : this.length && 1 === this[0].nodeType ? !(result = this[0].getAttribute(name)) && name in this[0] ? this[0][name] : result : void 0;
    },
    removeAttr: function(name) {
        return this.each(function() {
            1 === this.nodeType && this.removeAttribute(name);
        });
    },
    val: function(value) {
        return 0 in arguments ? this.each(function(idx) {
            this.value = funcArg(this, value, idx, this.value);
        }) : this[0] && (this[0].multiple ? JSLite(this[0]).find("option").filter(function() {
            return this.selected;
        }).pluck("value") : this[0].value);
    },
    data: function(name, value) {
        var attrName = "data-" + name, data, a;
        if (!name) return this[0].dataset;
        if (name && isJson(name)) {
            for (a in name) this.attr("data-" + a, name[a]);
            return this;
        }
        value && (isArray(value) || isJson(value)) && (value = JSON.stringify(value)), data = 1 in arguments ? this.attr(attrName, value) : this.attr(attrName);
        try {
            data = JSON.parse(data);
        } catch (e) {}
        return data;
    }
}), JSLite.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
}, function(method, prop) {
    var top = "pageYOffset" === prop;
    JSLite.fn[method] = function(value) {
        var win = isWindow(this[0]);
        return void 0 === value ? win ? window[prop] : this[0][method] : win ? (window.scrollTo(top ? window.pageXOffset : value, top ? value : window.pageYOffset), 
        this[0]) : this.each(function() {
            this[method] = value;
        });
    };
}), [ "after", "prepend", "before", "append" ].forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2;
    JSLite.fn[operator] = function() {
        var argType, nodes = JSLite.map(arguments, function(arg) {
            return argType = type(arg), "function" == argType && (arg = funcArg(this, arg)), 
            "object" == argType || "array" == argType || null == arg ? arg : fragment(arg);
        }), parent, script, copyByClone = this.length > 1;
        return nodes.length < 1 ? this : this.each(function(_, target) {
            parent = inside ? target : target.parentNode, target = 0 == operatorIndex ? target.nextSibling : 1 == operatorIndex ? target.firstChild : 2 == operatorIndex ? target : null;
            var parentInDocument = JSLite.contains(document.documentElement, parent);
            nodes.forEach(function(node) {
                var txt;
                copyByClone && (node = node.cloneNode(!0)), parent.insertBefore(node, target), !parentInDocument || null == node.nodeName || "SCRIPT" !== node.nodeName.toUpperCase() || node.type && "text/javascript" !== node.type || node.src ? parentInDocument && node.children && node.children.length > 0 && JSLite(node) && (script = JSLite(node).find("script")) && script.length > 0 && script.each(function(_, item) {
                    txt = item.innerHTML;
                }) : txt = node.innerHTML, txt ? window.eval.call(window, txt) : void 0;
            });
        });
    }, JSLite.fn[inside ? operator + "To" : "insert" + (operatorIndex ? "Before" : "After")] = function(html) {
        return JSLite(html)[operator](this), this;
    };
}), [ "width", "height" ].forEach(function(dimension) {
    var dimensionProperty = dimension.replace(/./, dimension[0].toUpperCase());
    JSLite.fn[dimension] = function(value) {
        var offset, el = this[0];
        return void 0 === value ? isWindow(el) ? el["inner" + dimensionProperty] : isDocument(el) ? el.documentElement["scroll" + dimensionProperty] : (offset = this.offset()) && offset[dimension] : this.each(function(idx) {
            el = $(this), el.css(dimension, funcArg(this, value, idx, el[dimension]()));
        });
    };
});

var _JSLite = window.JSLite, _$ = window.$;

JSLite.noConflict = function(deep) {
    return window.$ === JSLite && (window.$ = _$), deep && window.JSLite === JSLite && (window.JSLite = _JSLite), 
    JSLite;
}, window.JSLite = window.$ = JSLite, function($) {
    $.fn.extend({
        serializeArray: function() {
            var result = [], el, type, elm = this.get(0);
            return elm && elm.elements ? ($([].slice.call(this.get(0).elements)).each(function() {
                el = $(this), type = el.attr("type"), "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != type && "reset" != type && "button" != type && ("radio" != type && "checkbox" != type || this.checked) && result.push({
                    name: el.attr("name"),
                    value: el.val()
                });
            }), result) : result;
        },
        serialize: function(result) {
            return result = [], this.serializeArray().forEach(function(elm) {
                result.push(encodeURIComponent(elm.name) + "=" + encodeURIComponent(elm.value));
            }), result.join("&");
        }
    });
}(JSLite), function($) {
    var handlers = {}, _jid = 1;
    $.fn.extend({
        ready: function(callback) {
            return /complete|loaded|interactive/.test(document.readyState) && document.body ? callback(JSLite) : document.addEventListener("DOMContentLoaded", function() {
                callback(JSLite);
            }, !1), this;
        },
        bind: function(event, func) {
            return this.each(function() {
                add(this, event, func);
            });
        },
        unbind: function(event, func) {
            return this.each(function() {
                remove(this, event, func);
            });
        },
        on: function(event, selector, data, callback) {
            var self = this;
            return event && !$.isString(event) ? ($.each(event, function(type, fn) {
                self.on(type, selector, data, fn);
            }), self) : ($.isString(selector) || $.isFunction(callback) || callback === !1 || (callback = data, 
            data = selector, selector = void 0), ($.isFunction(data) || data === !1) && (callback = data, 
            data = void 0), callback === !1 && (callback = function() {
                return !1;
            }), this.each(function() {
                add(this, event, callback, data, selector);
            }));
        },
        off: function(event, selector, callback) {
            var self = this;
            return event && !$.isString(event) ? ($.each(event, function(type, fn) {
                self.off(type, selector, fn);
            }), self) : ($.isString(selector) || $.isFunction(callback) || callback === !1 || (callback = selector, 
            selector = void 0), callback === !1 && (callback = function() {
                return !1;
            }), self.each(function() {
                remove(this, event, callback, selector);
            }));
        },
        delegate: function(selector, event, callback) {
            return this.on(event, selector, callback);
        },
        trigger: function(event, data) {
            var type = event, specialEvents = {};
            return specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = "MouseEvents", 
            "string" == typeof type ? (event = document.createEvent(specialEvents[type] || "Events"), 
            event.initEvent(type, !0, !0), event._data = data, this.each(function() {
                "dispatchEvent" in this && this.dispatchEvent(event);
            })) : void 0;
        }
    }), $.event = {
        add: add,
        remove: remove
    };
    function add(element, events, func, data, selector) {
        var self = this, id = jid(element), set = handlers[id] || (handlers[id] = []);
        events.split(/\s/).forEach(function(event) {
            var handler = $.extend(parse(event), {
                fn: func,
                sel: selector,
                i: set.length
            }), proxyfn = handler.proxy = function(e) {
                if (selector) {
                    var $temp = $(element).find(selector), res = [].some.call($temp, function(val) {
                        return val === e.target || $.contains(val, e.target);
                    });
                    if (!res) return !1;
                }
                e.data = data;
                var result = func.apply(element, void 0 == e._data ? [ e ] : [ e ].concat(e._data));
                return result === !1 && (e.preventDefault(), e.stopPropagation()), result;
            };
            set.push(handler), element.addEventListener && element.addEventListener(handler.e, proxyfn, !1);
        });
    }
    function remove(element, events, func, selector) {
        (events || "").split(/\s/).forEach(function(event) {
            $.event = parse(event), findHandlers(element, event, func, selector).forEach(function(handler) {
                delete handlers[jid(element)][handler.i], element.removeEventListener && element.removeEventListener(handler.e, handler.proxy, !1);
            });
        });
    }
    function jid(element) {
        return element._jid || (element._jid = _jid++);
    }
    function parse(event) {
        var parts = ("" + event).split(".");
        return {
            e: parts[0],
            ns: parts.slice(1).sort().join(" ")
        };
    }
    function findHandlers(element, event, func, selector) {
        var self = this, id = jid(element);
        return event = parse(event), (handlers[jid(element)] || []).filter(function(handler) {
            return handler && (!event.e || handler.e == event.e) && (!func || handler.fn.toString() === func.toString()) && (!selector || handler.sel == selector);
        });
    }
    "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error paste drop dragstart dragover beforeunload".split(" ").forEach(function(event) {
        $.fn[event] = function(callback) {
            return callback ? this.bind(event, callback) : this.trigger(event);
        };
    });
}(JSLite), function($) {
    var jsonpID = 0;
    function parseArguments(url, data, success, dataType) {
        return $.isFunction(data) && (dataType = success, success = data, data = void 0), 
        $.isFunction(success) || (dataType = success, success = void 0), {
            url: url,
            data: data,
            success: success,
            dataType: dataType
        };
    }
    $.extend({
        ajaxSettings: {
            type: "GET",
            success: function() {},
            error: function() {},
            xhr: function() {
                return new window.XMLHttpRequest();
            },
            processData: !0,
            complete: function() {},
            accepts: {
                script: "text/javascript, application/javascript",
                json: "application/json",
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain"
            },
            cache: !0
        },
        param: function(obj, traditional, scope) {
            if ("string" == $.type(obj)) return obj;
            var params = [], str = "";
            if (params.add = function(key, value) {
                this.push(encodeURIComponent(key) + "=" + encodeURIComponent(null == value ? "" : value));
            }, 1 == scope && "object" == type(obj)) params.add(traditional, obj); else for (var p in obj) {
                var v = obj[p], str = "", k = function() {
                    return traditional ? 1 == traditional ? p : scope && "array" == type(obj) ? traditional : traditional + "[" + ("array" == $.type(obj) ? "" : p) + "]" : p;
                }();
                "object" == typeof v ? str = this.param(v, k, traditional) : isFunction(v) || (str = params.add(k, v)), 
                str && params.push(str);
            }
            return params.join("&");
        },
        get: function(url, success) {
            return $.ajax(parseArguments.apply(null, arguments));
        },
        post: function(url, data, success, dataType) {
            var options = parseArguments.apply(null, arguments);
            return options.type = "POST", $.ajax(options);
        },
        getJSON: function() {
            var options = parseArguments.apply(null, arguments), url = arguments[0];
            return url && url == document.location.host ? options.dataType = "json" : options.dataType = "jsonp", 
            this.ajax(options);
        },
        ajaxJSONP: function(options) {
            var _callbackName = options.jsonpCallback, callbackName = ($.isFunction(_callbackName) ? _callbackName() : _callbackName) || "jsonp" + ++jsonpID, script = document.createElement("script"), originalCallback = window[callbackName], responseData, xhr = {};
            return $(script).on("load error", function(e, errorType) {
                $(script).off().remove(), "error" != e.type && responseData ? options.success(responseData[0], xhr, options) : options.error(e, errorType || "error", options), 
                window[callbackName] = originalCallback, responseData && $.isFunction(originalCallback) && originalCallback(responseData[0]), 
                originalCallback = responseData = void 0;
            }), window[callbackName] = function() {
                responseData = arguments;
            }, script.src = options.url.replace(/\?(.+)=\?/, "?$1=" + callbackName), document.head.appendChild(script), 
            options.xhr();
        },
        ajax: function(options) {
            var key, settings, setHeader = function(name, value) {
                headers[name.toLowerCase()] = [ name, value ];
            }, appendQuery = function(url, query) {
                return "" == query ? url : (url + "&" + query).replace(/[&?]{1,2}/, "?");
            }, serializeData = function(options) {
                options.processData && options.data && "string" != $.type(options.data) && (options.data = $.param(options.data, options.traditional)), 
                !options.data || options.type && "GET" != options.type.toUpperCase() || (options.url = appendQuery(options.url, options.data), 
                options.data = void 0);
            };
            if (options = options || {}, $.isString(options)) if ("GET" == arguments[0]) {
                var urls = arguments[1];
                arguments[2] && $.isFunction(arguments[2]) ? $.get(urls, arguments[2]) : arguments[2] && $.isJson(arguments[2]) && $.get(urls.indexOf("?") > -1 ? urls + "&" + this.param(arguments[2]) : urls + "?" + this.param(arguments[2]), arguments[3]);
            } else "POST" == arguments[0] && $.post(arguments[1], arguments[2], arguments[3], arguments[4]); else {
                settings = $.extend({}, options || {});
                for (key in $.ajaxSettings) void 0 === settings[key] && (settings[key] = $.ajaxSettings[key]);
                serializeData(settings);
                var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url);
                if (hasPlaceholder && (dataType = "jsonp"), settings.cache !== !1 && (options && options.cache === !0 || "script" != dataType && "jsonp" != dataType) || (settings.url = appendQuery(settings.url, "_=" + Date.now())), 
                "jsonp" == dataType) return hasPlaceholder || (settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + "=?" : settings.jsonp === !1 ? "" : "callback=?")), 
                $.ajaxJSONP(settings);
                var data = settings.data, callback = settings.success || function() {}, errback = settings.error || function() {}, mime = $.ajaxSettings.accepts[settings.dataType], content = settings.contentType, xhr = new XMLHttpRequest(), nativeSetHeader = xhr.setRequestHeader, headers = {};
                if (settings.crossDomain || (setHeader("X-Requested-With", "XMLHttpRequest"), setHeader("Accept", mime || "*/*")), 
                settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name]);
                (settings.contentType || settings.contentType !== !1 && settings.data && "GET" != settings.type.toUpperCase()) && setHeader("Content-Type", settings.contentType || "application/x-www-form-urlencoded"), 
                xhr.onreadystatechange = function() {
                    if (4 == xhr.readyState) if (xhr.status >= 200 && xhr.status < 300 || 0 == xhr.status) {
                        var result, error = !1;
                        result = xhr.responseText;
                        try {
                            "script" == settings.dataType ? (1, eval)(result) : "xml" == settings.dataType ? result = xhr.responseXML : "json" == settings.dataType && (result = /^\s*$/.test(result) ? null : JSON.parse(result));
                        } catch (e) {
                            error = e;
                        }
                        error ? errback(error, "parsererror", xhr, settings) : callback(result, "success", xhr);
                    } else settings.complete(xhr, error ? "error" : "success");
                }, data && data instanceof Object && "GET" == settings.type && (data ? settings.url = settings.url.indexOf("?") > -1 ? settings.url + "&" + data : settings.url + "?" + data : null);
                var async = "async" in settings ? settings.async : !0;
                xhr.open(settings.type, settings.url, async), mime && xhr.setRequestHeader("Accept", mime), 
                data instanceof Object && "application/json" == mime && (data = JSON.stringify(data), 
                content = content || "application/json");
                for (name in headers) nativeSetHeader.apply(xhr, headers[name]);
                xhr.send(data ? data : null);
            }
        }
    });
    var _load = $.fn.load;
    $.fn.extend({
        load: function(url, data, success) {
            if (arguments[0] && "string" != typeof arguments[0] && _load) return _load.apply(this, arguments);
            if (console.log("test"), !this.length || 0 === arguments.length) return this;
            var self = this, parts = arguments[0].split(/\s/), selector, options = parseArguments(url, data, success), callback = options.success;
            return parts.length > 1 && (options.url = parts[0], selector = parts[1]), options.success = function(response) {
                response = response.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""), 
                self.html(selector ? $("<div>").html(response).find(selector) : response), callback && callback.apply(self, arguments);
            }, $.ajax(options), this;
        }
    });
}(JSLite);
return JSLite;
}));
