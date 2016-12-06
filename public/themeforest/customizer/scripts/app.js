function navigation() {
  $("nav.navigation a").on("click", function (a) {
    var b = $(this),
      c = (b.parents("li"), b.closest("li")),
      d = b.next();
    if (d.hasClass("sub-menu")) return d.is("ul") && !d.is(":visible") ? (c.addClass("open"), d.slideDown(300)) : d.is("ul") && d.is(":visible") && (c.removeClass("open"), d.slideUp(300)), "#" === b.attr("href") && a.preventDefault(), d.is("ul") ? !1 : (a.stopPropagation(), !0)
  })
}
var less = {
    env: "development"
  },
  $products, $current_product = "urban";
$products = {
    urban: {
      name: "Urban - Responsive Admin Template + Customizer Access",
      sname: "Urban",
      id: "11250113",
      url: ["./themes/urban/customizer.less"],
      config: "./themes/urban/customizer.json",
      defaults: "./themes/urban/defaults.json",
      workspace: "guide.html",
      purchase: "http://themeforest.net/item/urban-responsive-admin-template-customizer-access/11250113?ref=iamnyasha"
    }
  }, ! function (a, b) {
    function c(b) {
      return a.less[b.split("/")[1]]
    }

    function d(a, b) {
      "undefined" != typeof console && w.logLevel >= b && console.log("less: " + a)
    }

    function e(a) {
      return a.replace(/^[a-z-]+:\/+?[^\/]+/, "").replace(/^\//, "").replace(/\.[a-zA-Z]+$/, "").replace(/[^\.\w-]+/g, "-").replace(/\./g, ":")
    }

    function f(a, c) {
      var e = "{line} {content}",
        f = a.filename || c,
        g = [],
        h = (a.type || "Syntax") + "Error: " + (a.message || "There is an error in your .less file") + " in " + f + " ",
        i = function (a, c, d) {
          a.extract[c] !== b && g.push(e.replace(/\{line\}/, (parseInt(a.line, 10) || 0) + (c - 1)).replace(/\{class\}/, d).replace(/\{content\}/, a.extract[c]))
        };
      a.extract ? (i(a, 0, ""), i(a, 1, "line"), i(a, 2, ""), h += "on line " + a.line + ", column " + (a.column + 1) + ":\n" + g.join("\n")) : a.stack && (h += a.stack), d(h, z.errors)
    }

    function g(a, b, c) {
      var f = b.href || "",
        g = "less:" + (b.title || e(f)),
        h = document.getElementById(g),
        i = !1,
        j = document.createElement("style");
      j.setAttribute("type", "text/css"), b.media && j.setAttribute("media", b.media), j.id = g, j.styleSheet || (j.appendChild(document.createTextNode(a)), i = null !== h && h.childNodes.length > 0 && j.childNodes.length > 0 && h.firstChild.nodeValue === j.firstChild.nodeValue);
      var k = document.getElementsByTagName("head")[0];
      if (null === h || i === !1) {
        var l = b && b.nextSibling || null;
        l ? l.parentNode.insertBefore(j, l) : k.appendChild(j)
      }
      if (h && i === !1 && h.parentNode.removeChild(h), j.styleSheet) try {
        j.styleSheet.cssText = a
      } catch (m) {
        throw new Error("Couldn't reassign styleSheet.cssText.")
      }
      if (c && D) {
        d("saving " + f + " to cache.", z.info);
        try {
          D.setItem(f, a), D.setItem(f + ":timestamp", c)
        } catch (m) {
          d("failed to save", z.errors)
        }
      }
    }

    function h(a) {
      return w.postProcessor && "function" == typeof w.postProcessor && (a = w.postProcessor.call(a, a) || a), a
    }

    function i(a, c) {
      var d, f, h = "less-error-message:" + e(c || ""),
        i = '<li><label>{line}</label><pre class="{class}">{content}</pre></li>',
        j = document.createElement("div"),
        k = [],
        l = a.filename || c,
        m = l.match(/([^\/]+(\?.*)?)$/)[1];
      j.id = h, j.className = "less-error-message", f = "<h3>" + (a.type || "Syntax") + "Error: " + (a.message || "There is an error in your .less file") + '</h3><p>in <a href="' + l + '">' + m + "</a> ";
      var n = function (a, c, d) {
        a.extract[c] !== b && k.push(i.replace(/\{line\}/, (parseInt(a.line, 10) || 0) + (c - 1)).replace(/\{class\}/, d).replace(/\{content\}/, a.extract[c]))
      };
      a.extract ? (n(a, 0, ""), n(a, 1, "line"), n(a, 2, ""), f += "on line " + a.line + ", column " + (a.column + 1) + ":</p><ul>" + k.join("") + "</ul>") : a.stack && (f += "<br/>" + a.stack.split("\n").slice(1).join("<br/>")), j.innerHTML = f, g([".less-error-message ul, .less-error-message li {", "list-style-type: none;", "margin-right: 15px;", "padding: 4px 0;", "margin: 0;", "}", ".less-error-message label {", "font-size: 12px;", "margin-right: 15px;", "padding: 4px 0;", "color: #cc7777;", "}", ".less-error-message pre {", "color: #dd6666;", "padding: 4px 0;", "margin: 0;", "display: inline-block;", "}", ".less-error-message pre.line {", "color: #ff0000;", "}", ".less-error-message h3 {", "font-size: 20px;", "font-weight: bold;", "padding: 15px 0 5px 0;", "margin: 0;", "}", ".less-error-message a {", "color: #10a", "}", ".less-error-message .error {", "color: red;", "font-weight: bold;", "padding-bottom: 2px;", "border-bottom: 1px dashed red;", "}"].join("\n"), {
        title: "error-message"
      }), j.style.cssText = ["font-family: Arial, sans-serif", "border: 1px solid #e00", "background-color: #eee", "border-radius: 5px", "-webkit-border-radius: 5px", "-moz-border-radius: 5px", "color: #e00", "padding: 15px", "margin-bottom: 15px"].join(";"), "development" == w.env && (d = setInterval(function () {
        document.body && (document.getElementById(h) ? document.body.replaceChild(j, document.getElementById(h)) : document.body.insertBefore(j, document.body.firstChild), clearInterval(d))
      }, 10))
    }

    function j(a, b) {
      w.errorReporting && "html" !== w.errorReporting ? "console" === w.errorReporting ? f(a, b) : "function" == typeof w.errorReporting && w.errorReporting("add", a, b) : i(a, b)
    }

    function k(a) {
      var b = document.getElementById("less-error-message:" + e(a));
      b && b.parentNode.removeChild(b)
    }

    function l() {}

    function m(a) {
      w.errorReporting && "html" !== w.errorReporting ? "console" === w.errorReporting ? l(a) : "function" == typeof w.errorReporting && w.errorReporting("remove", a) : k(a)
    }

    function n(a) {
      for (var b, c = document.getElementsByTagName("style"), d = 0; d < c.length; d++)
        if (b = c[d], b.type.match(C)) {
          var e = new w.tree.parseEnv(w),
            f = b.innerHTML || "";
          e.filename = document.location.href.replace(/#.*$/, ""), (a || w.globalVars) && (e.useFileCache = !0);
          var g = function (a) {
            return function (b, c) {
              if (b) return j(b, "inline");
              var d = c.toCSS(w);
              a.type = "text/css", a.styleSheet ? a.styleSheet.cssText = d : a.innerHTML = d
            }
          }(b);
          new w.Parser(e).parse(f, g, {
            globalVars: w.globalVars,
            modifyVars: a
          })
        }
    }

    function o(a, b) {
      var c, d, e = /^((?:[a-z-]+:)?\/+?(?:[^\/\?#]*\/)|([\/\\]))?((?:[^\/\\\?#]*[\/\\])*)([^\/\\\?#]*)([#\?].*)?$/i,
        f = a.match(e),
        g = {},
        h = [];
      if (!f) throw new Error("Could not parse sheet href - '" + a + "'");
      if (!f[1] || f[2]) {
        if (d = b.match(e), !d) throw new Error("Could not parse page url - '" + b + "'");
        f[1] = f[1] || d[1] || "", f[2] || (f[3] = d[3] + f[3])
      }
      if (f[3]) {
        for (h = f[3].replace(/\\/g, "/").split("/"), c = 0; c < h.length; c++) "." === h[c] && (h.splice(c, 1), c -= 1);
        for (c = 0; c < h.length; c++) ".." === h[c] && c > 0 && (h.splice(c - 1, 2), c -= 2)
      }
      return g.hostPart = f[1], g.directories = h, g.path = f[1] + h.join("/"), g.fileUrl = g.path + (f[4] || ""), g.url = g.fileUrl + (f[5] || ""), g
    }

    function p(a, b) {
      var c, d, e, f, g = o(a),
        h = o(b),
        i = "";
      if (g.hostPart !== h.hostPart) return "";
      for (d = Math.max(h.directories.length, g.directories.length), c = 0; d > c && h.directories[c] === g.directories[c]; c++);
      for (f = h.directories.slice(c), e = g.directories.slice(c), c = 0; c < f.length - 1; c++) i += "../";
      for (c = 0; c < e.length - 1; c++) i += e[c] + "/";
      return i
    }

    function q() {
      if (a.XMLHttpRequest && !("file:" === a.location.protocol && "ActiveXObject" in a)) return new XMLHttpRequest;
      try {
        return new ActiveXObject("Microsoft.XMLHTTP")
      } catch (b) {
        return d("browser doesn't support AJAX.", z.errors), null
      }
    }

    function r(a, b, c, e) {
      function f(b, c, d) {
        b.status >= 200 && b.status < 300 ? c(b.responseText, b.getResponseHeader("Last-Modified")) : "function" == typeof d && d(b.status, a)
      }
      var g = q(),
        h = y ? w.fileAsync : w.async;
      "function" == typeof g.overrideMimeType && g.overrideMimeType("text/css"), d("XHR: Getting '" + a + "'", z.debug), g.open("GET", a, h), g.setRequestHeader("Accept", b || "text/x-less, text/css; q=0.9, */*; q=0.5"), g.send(null), y && !w.fileAsync ? 0 === g.status || g.status >= 200 && g.status < 300 ? c(g.responseText) : e(g.status, a) : h ? g.onreadystatechange = function () {
        4 == g.readyState && f(g, c, e)
      } : f(g, c, e)
    }

    function s(b, c, d, e) {
      c && c.currentDirectory && !/^([A-Za-z-]+:)?\//.test(b) && (b = c.currentDirectory + b);
      var f = o(b, a.location.href),
        g = f.url,
        h = {
          currentDirectory: f.path,
          filename: g
        };
      if (c ? (h.entryPath = c.entryPath, h.rootpath = c.rootpath, h.rootFilename = c.rootFilename, h.relativeUrls = c.relativeUrls) : (h.entryPath = f.path, h.rootpath = w.rootpath || f.path, h.rootFilename = g, h.relativeUrls = e.relativeUrls), h.relativeUrls && (h.rootpath = e.rootpath ? o(e.rootpath + p(f.path, h.entryPath)).path : f.path), e.useFileCache && E[g]) try {
        var i = E[g];
        d(null, i, g, h, {
          lastModified: new Date
        })
      } catch (j) {
        d(j, null, g)
      } else r(g, e.mime, function (a, b) {
        E[g] = a;
        try {
          d(null, a, g, h, {
            lastModified: b
          })
        } catch (c) {
          d(c, null, g)
        }
      }, function (a, b) {
        d({
          type: "File",
          message: "'" + b + "' wasn't found (" + a + ")"
        }, null, g)
      })
    }

    function t(a, b, c, d, e) {
      var f = new w.tree.parseEnv(w);
      f.mime = a.type, (e || w.globalVars) && (f.useFileCache = !0), s(a.href, null, function (h, i, j, k, l) {
        if (l) {
          l.remaining = d;
          var n = D && D.getItem(j),
            o = D && D.getItem(j + ":timestamp");
          if (!c && o && l.lastModified && new Date(l.lastModified).valueOf() === new Date(o).valueOf()) return g(n, a), l.local = !0, void b(null, null, i, a, l, j)
        }
        m(j), i ? (f.currentFileInfo = k, new w.Parser(f).parse(i, function (c, d) {
          if (c) return b(c, null, null, a);
          try {
            b(c, d, i, a, l, j)
          } catch (c) {
            b(c, null, null, a)
          }
        }, {
          modifyVars: e,
          globalVars: w.globalVars
        })) : b(h, null, null, a, l, j)
      }, f, e)
    }

    function u(a, b, c) {
      for (var d = 0; d < w.sheets.length; d++) t(w.sheets[d], a, b, w.sheets.length - (d + 1), c)
    }

    function v() {
      "development" === w.env ? (w.optimization = 0, w.watchTimer = setInterval(function () {
        w.watchMode && u(function (a, b, c, d, e) {
          if (a) j(a, d.href);
          else if (b) {
            var f = b.toCSS(w);
            f = h(f), g(f, d, e.lastModified)
          }
        })
      }, w.poll)) : w.optimization = 3
    }("undefined" == typeof a.less || "undefined" != typeof a.less.nodeType) && (a.less = {}), w = a.less, x = a.less.tree = {}, w.mode = "browser";
    var w, x;
    w === b && (w = exports, x = c("./tree"), w.mode = "node"), w.Parser = function (a) {
        function d() {
          D = y, G.push({
            current: C,
            i: y,
            j: z
          })
        }

        function e() {
          var a = G.pop();
          C = a.current, D = y = a.i, z = a.j
        }

        function f() {
          G.pop()
        }

        function g() {
          y > D && (C = C.slice(y - D), D = y)
        }

        function h(a, b) {
          var c = a.charCodeAt(0 | b);
          return 32 >= c && (32 === c || 10 === c || 9 === c)
        }

        function i(a) {
          var b, c, d = typeof a;
          return "string" === d ? v.charAt(y) !== a ? null : (l(1), a) : (g(), (b = a.exec(C)) ? (c = b[0].length, l(c), "string" == typeof b ? b : 1 === b.length ? b[0] : b) : null)
        }

        function j(a) {
          y > D && (C = C.slice(y - D), D = y);
          var b = a.exec(C);
          return b ? (l(b[0].length), "string" == typeof b ? b : 1 === b.length ? b[0] : b) : null
        }

        function k(a) {
          return v.charAt(y) !== a ? null : (l(1), a)
        }

        function l(a) {
          for (var b, c = y, d = z, e = y - D, f = y + C.length - e, g = y += a, h = v; f > y && (b = h.charCodeAt(y), !(b > 32)) && (32 === b || 10 === b || 9 === b || 13 === b); y++);
          return C = C.slice(a + y - g + e), D = y, !C.length && z < B.length - 1 ? (C = B[++z], l(0), !0) : c !== y || d !== z
        }

        function m(a, b) {
          var c = "[object Function]" === Object.prototype.toString.call(a) ? a.call(F) : i(a);
          return c ? c : void o(b || ("string" == typeof a ? "expected '" + a + "' got '" + v.charAt(y) + "'" : "unexpected token"))
        }

        function n(a, b) {
          return v.charAt(y) === a ? (l(1), a) : void o(b || "expected '" + a + "' got '" + v.charAt(y) + "'")
        }

        function o(a, b) {
          var c = new Error(a);
          throw c.index = y, c.type = b || "Syntax", c
        }

        function p(a) {
          return "string" == typeof a ? v.charAt(y) === a : a.test(C)
        }

        function q(a) {
          return v.charAt(y) === a
        }

        function r(a, b) {
          return a.filename && b.currentFileInfo.filename && a.filename !== b.currentFileInfo.filename ? E.imports.contents[a.filename] : v
        }

        function s(a, b) {
          for (var c = a + 1, d = null, e = -1; --c >= 0 && "\n" !== b.charAt(c);) e++;
          return "number" == typeof a && (d = (b.slice(0, a).match(/\n/g) || "").length), {
            line: d,
            column: e
          }
        }

        function t(a, b, d) {
          var e = d.currentFileInfo.filename;
          return "browser" !== w.mode && "rhino" !== w.mode && (e = c("path").resolve(e)), {
            lineNumber: s(a, b).line + 1,
            fileName: e
          }
        }

        function u(a, b) {
          var c = r(a, b),
            d = s(a.index, c),
            e = d.line,
            f = d.column,
            g = a.call && s(a.call, c).line,
            h = c.split("\n");
          this.type = a.type || "Syntax", this.message = a.message, this.filename = a.filename || b.currentFileInfo.filename, this.index = a.index, this.line = "number" == typeof e ? e + 1 : null, this.callLine = g + 1, this.callExtract = h[g], this.stack = a.stack, this.column = f, this.extract = [h[e - 1], h[e], h[e + 1]]
        }
        var v, y, z, A, B, C, D, E, F, G = [],
          H = a && a.filename;
        a instanceof x.parseEnv || (a = new x.parseEnv(a));
        var I = this.imports = {
            paths: a.paths || [],
            queue: [],
            files: a.files,
            contents: a.contents,
            contentsIgnoredChars: a.contentsIgnoredChars,
            mime: a.mime,
            error: null,
            push: function (b, c, d, e) {
              var f = this;
              this.queue.push(b);
              var g = function (a, c, d) {
                f.queue.splice(f.queue.indexOf(b), 1);
                var g = d === H;
                f.files[d] = c, a && !f.error && (f.error = a), e(a, c, g, d)
              };
              w.Parser.importer ? w.Parser.importer(b, c, g, a) : w.Parser.fileLoader(b, c, function (b, e, f, h) {
                if (b) return void g(b);
                var i = new x.parseEnv(a);
                i.currentFileInfo = h, i.processImports = !1, i.contents[f] = e, (c.reference || d.reference) && (h.reference = !0), d.inline ? g(null, e, f) : new w.Parser(i).parse(e, function (a, b) {
                  g(a, b, f)
                })
              }, a)
            }
          },
          J = j;
        return u.prototype = new Error, u.prototype.constructor = u, this.env = a = a || {}, this.optimization = "optimization" in this.env ? this.env.optimization : 1, E = {
          imports: I,
          parse: function (d, e, f) {
            var g, h, i, j, k, l = null,
              m = "";
            if (y = z = D = A = 0, j = f && f.globalVars ? w.Parser.serializeVars(f.globalVars) + "\n" : "", k = f && f.modifyVars ? "\n" + w.Parser.serializeVars(f.modifyVars) : "", (j || f && f.banner) && (m = (f && f.banner ? f.banner : "") + j, E.imports.contentsIgnoredChars[a.currentFileInfo.filename] = m.length), d = d.replace(/\r\n/g, "\n"), v = d = m + d.replace(/^\uFEFF/, "") + k, E.imports.contents[a.currentFileInfo.filename] = d, B = function (b) {
                function c(b, c) {
                  l = new u({
                    index: c || i,
                    type: "Parse",
                    message: b,
                    filename: a.currentFileInfo.filename
                  }, a)
                }

                function d(a) {
                  var c = i - s;
                  512 > c && !a || !c || (r.push(b.slice(s, i + 1)), s = i + 1)
                }
                var e, f, g, h, i, j, k, m, n, o = b.length,
                  p = 0,
                  q = 0,
                  r = [],
                  s = 0;
                for (i = 0; o > i; i++)
                  if (k = b.charCodeAt(i), !(k >= 97 && 122 >= k || 34 > k)) switch (k) {
                  case 40:
                    q++, f = i;
                    continue;
                  case 41:
                    if (--q < 0) return c("missing opening `(`");
                    continue;
                  case 59:
                    q || d();
                    continue;
                  case 123:
                    p++, e = i;
                    continue;
                  case 125:
                    if (--p < 0) return c("missing opening `{`");
                    p || q || d();
                    continue;
                  case 92:
                    if (o - 1 > i) {
                      i++;
                      continue
                    }
                    return c("unescaped `\\`");
                  case 34:
                  case 39:
                  case 96:
                    for (n = 0, j = i, i += 1; o > i; i++)
                      if (m = b.charCodeAt(i), !(m > 96)) {
                        if (m == k) {
                          n = 1;
                          break
                        }
                        if (92 == m) {
                          if (i == o - 1) return c("unescaped `\\`");
                          i++
                        }
                      }
                    if (n) continue;
                    return c("unmatched `" + String.fromCharCode(k) + "`", j);
                  case 47:
                    if (q || i == o - 1) continue;
                    if (m = b.charCodeAt(i + 1), 47 == m)
                      for (i += 2; o > i && (m = b.charCodeAt(i), !(13 >= m) || 10 != m && 13 != m); i++);
                    else if (42 == m) {
                      for (g = j = i, i += 2; o - 1 > i && (m = b.charCodeAt(i), 125 == m && (h = i), 42 != m || 47 != b.charCodeAt(i + 1)); i++);
                      if (i == o - 1) return c("missing closing `*/`", j);
                      i++
                    }
                    continue;
                  case 42:
                    if (o - 1 > i && 47 == b.charCodeAt(i + 1)) return c("unmatched `/*`");
                    continue
                  }
                  return 0 !== p ? g > e && h > g ? c("missing closing `}` or `*/`", e) : c("missing closing `}`", e) : 0 !== q ? c("missing closing `)`", f) : (d(!0), r)
              }(d), l) return e(new u(l, a));
            C = B[0];
            try {
              g = new x.Ruleset(null, this.parsers.primary()), g.root = !0, g.firstRoot = !0
            } catch (n) {
              return e(new u(n, a))
            }
            if (g.toCSS = function (d) {
                return function (e, f) {
                  e = e || {};
                  var g, h, i = new x.evalEnv(e);
                  "object" != typeof f || Array.isArray(f) || (f = Object.keys(f).map(function (a) {
                    var b = f[a];
                    return b instanceof x.Value || (b instanceof x.Expression || (b = new x.Expression([b])), b = new x.Value([b])), new x.Rule("@" + a, b, !1, null, 0)
                  }), i.frames = [new x.Ruleset(null, f)]);
                  try {
                    var j, k = [],
                      l = [new x.joinSelectorVisitor, new x.processExtendsVisitor, new x.toCSSVisitor({
                        compress: Boolean(e.compress)
                      })],
                      m = this;
                    if (e.plugins)
                      for (j = 0; j < e.plugins.length; j++) e.plugins[j].isPreEvalVisitor ? k.push(e.plugins[j]) : e.plugins[j].isPreVisitor ? l.splice(0, 0, e.plugins[j]) : l.push(e.plugins[j]);
                    for (j = 0; j < k.length; j++) k[j].run(m);
                    for (g = d.call(m, i), j = 0; j < l.length; j++) l[j].run(g);
                    e.sourceMap && (g = new x.sourceMapOutput({
                      contentsIgnoredCharsMap: E.imports.contentsIgnoredChars,
                      writeSourceMap: e.writeSourceMap,
                      rootNode: g,
                      contentsMap: E.imports.contents,
                      sourceMapFilename: e.sourceMapFilename,
                      sourceMapURL: e.sourceMapURL,
                      outputFilename: e.sourceMapOutputFilename,
                      sourceMapBasepath: e.sourceMapBasepath,
                      sourceMapRootpath: e.sourceMapRootpath,
                      outputSourceFiles: e.outputSourceFiles,
                      sourceMapGenerator: e.sourceMapGenerator
                    })), h = g.toCSS({
                      compress: Boolean(e.compress),
                      dumpLineNumbers: a.dumpLineNumbers,
                      strictUnits: Boolean(e.strictUnits),
                      numPrecision: 8
                    })
                  } catch (n) {
                    throw new u(n, a)
                  }
                  if (e.cleancss && "node" === w.mode) {
                    var o = c("clean-css"),
                      p = e.cleancssOptions || {};
                    return p.keepSpecialComments === b && (p.keepSpecialComments = "*"), p.processImport = !1, p.noRebase = !0, p.noAdvanced === b && (p.noAdvanced = !0), new o(p).minify(h)
                  }
                  return e.compress ? h.replace(/(^(\s)+)|((\s)+$)/g, "") : h
                }
              }(g.eval), y < v.length - 1) {
              y = A;
              var o = s(y, v);
              i = v.split("\n"), h = o.line + 1, l = {
                type: "Parse",
                message: "Unrecognised input",
                index: y,
                filename: a.currentFileInfo.filename,
                line: h,
                column: o.column,
                extract: [i[h - 2], i[h - 1], i[h]]
              }
            }
            var p = function (b) {
              return b = l || b || E.imports.error, b ? (b instanceof u || (b = new u(b, a)), e(b)) : e(null, g)
            };
            return a.processImports === !1 ? p() : void new x.importVisitor(this.imports, p).run(g)
          },
          parsers: F = {
            primary: function () {
              for (var a, b = this.mixin, c = J, d = []; C;) {
                if (a = this.extendRule() || b.definition() || this.rule() || this.ruleset() || b.call() || this.comment() || this.rulesetCall() || this.directive()) d.push(a);
                else if (!c(/^[\s\n]+/) && !c(/^;+/)) break;
                if (q("}")) break
              }
              return d
            },
            comment: function () {
              var b;
              return "/" === v.charAt(y) ? "/" === v.charAt(y + 1) ? new x.Comment(j(/^\/\/.*/), !0, y, a.currentFileInfo) : (b = j(/^\/\*(?:[^*]|\*+[^\/*])*\*+\/\n?/), b ? new x.Comment(b, !1, y, a.currentFileInfo) : void 0) : void 0
            },
            comments: function () {
              for (var a, b = []; a = this.comment(), a;) b.push(a);
              return b
            },
            entities: {
              quoted: function () {
                var b, c, d = y,
                  e = y;
                return "~" === v.charAt(d) && (d++, c = !0), '"' === v.charAt(d) || "'" === v.charAt(d) ? (c && k("~"), b = j(/^"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'/), b ? new x.Quoted(b[0], b[1] || b[2], c, e, a.currentFileInfo) : void 0) : void 0
              },
              keyword: function () {
                var a;
                if (a = j(/^%|^[_A-Za-z-][_A-Za-z0-9-]*/)) {
                  var b = x.Color.fromKeyword(a);
                  return b ? b : new x.Keyword(a)
                }
              },
              call: function () {
                var b, c, d, e, f = y;
                if (b = /^([\w-]+|%|progid:[\w\.]+)\(/.exec(C)) {
                  if (b = b[1], c = b.toLowerCase(), "url" === c) return null;
                  if (y += b.length, "alpha" === c && (e = F.alpha(), "undefined" != typeof e)) return e;
                  if (k("("), d = this.arguments(), k(")")) return b ? new x.Call(b, d, f, a.currentFileInfo) : void 0
                }
              },
              arguments: function () {
                for (var a, b = [];
                  (a = this.assignment() || F.expression(), a) && (b.push(a), k(",")););
                return b
              },
              literal: function () {
                return this.dimension() || this.color() || this.quoted() || this.unicodeDescriptor()
              },
              assignment: function () {
                var a, b;
                return a = j(/^\w+(?=\s?=)/i), a && k("=") ? (b = F.entity(), b ? new x.Assignment(a, b) : void 0) : void 0
              },
              url: function () {
                var b;
                return "u" === v.charAt(y) && j(/^url\(/) ? (b = this.quoted() || this.variable() || j(/^(?:(?:\\[\(\)'"])|[^\(\)'"])+/) || "", n(")"), new x.URL(null != b.value || b instanceof x.Variable ? b : new x.Anonymous(b), a.currentFileInfo)) : void 0
              },
              variable: function () {
                var b, c = y;
                return "@" === v.charAt(y) && (b = j(/^@@?[\w-]+/)) ? new x.Variable(b, c, a.currentFileInfo) : void 0
              },
              variableCurly: function () {
                var b, c = y;
                return "@" === v.charAt(y) && (b = j(/^@\{([\w-]+)\}/)) ? new x.Variable("@" + b[1], c, a.currentFileInfo) : void 0
              },
              color: function () {
                var a;
                if ("#" === v.charAt(y) && (a = j(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/))) {
                  var b = a.input.match(/^#([\w]+).*/);
                  return b = b[1], b.match(/^[A-Fa-f0-9]+$/) || o("Invalid HEX color code"), new x.Color(a[1])
                }
              },
              dimension: function () {
                var a, b = v.charCodeAt(y);
                return b > 57 || 43 > b || 47 === b || 44 == b ? void 0 : (a = j(/^([+-]?\d*\.?\d+)(%|[a-z]+)?/), a ? new x.Dimension(a[1], a[2]) : void 0)
              },
              unicodeDescriptor: function () {
                var a;
                return a = j(/^U\+[0-9a-fA-F?]+(\-[0-9a-fA-F?]+)?/), a ? new x.UnicodeDescriptor(a[0]) : void 0
              },
              javascript: function () {
                var c, d, e = y;
                return "~" === v.charAt(e) && (e++, d = !0), "`" === v.charAt(e) ? (a.javascriptEnabled === b || a.javascriptEnabled || o("You are using JavaScript, which has been disabled."), d && k("~"), c = j(/^`([^`]*)`/), c ? new x.JavaScript(c[1], y, d) : void 0) : void 0
              }
            },
            variable: function () {
              var a;
              return "@" === v.charAt(y) && (a = j(/^(@[\w-]+)\s*:/)) ? a[1] : void 0
            },
            rulesetCall: function () {
              var a;
              return "@" === v.charAt(y) && (a = j(/^(@[\w-]+)\s*\(\s*\)\s*;/)) ? new x.RulesetCall(a[1]) : void 0
            },
            extend: function (a) {
              var b, c, d, e, f, g = y;
              if (j(a ? /^&:extend\(/ : /^:extend\(/)) {
                do {
                  for (d = null, b = null; !(d = j(/^(all)(?=\s*(\)|,))/)) && (c = this.element());) b ? b.push(c) : b = [c];
                  d = d && d[1], b || o("Missing target selector for :extend()."), f = new x.Extend(new x.Selector(b), d, g), e ? e.push(f) : e = [f]
                } while (k(","));
                return m(/^\)/), a && m(/^;/), e
              }
            },
            extendRule: function () {
              return this.extend(!0)
            },
            mixin: {
              call: function () {
                var b, c, g, h, i, l, m = v.charAt(y),
                  o = !1,
                  p = y;
                if ("." === m || "#" === m) {
                  for (d(); b = y, h = j(/^[#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/), h;) g = new x.Element(i, h, b, a.currentFileInfo), c ? c.push(g) : c = [g], i = k(">");
                  return c && (k("(") && (l = this.args(!0).args, n(")")), F.important() && (o = !0), F.end()) ? (f(), new x.mixin.Call(c, l, p, a.currentFileInfo, o)) : void e()
                }
              },
              args: function (a) {
                var b, c, g, h, i, l, m = E.parsers,
                  n = m.entities,
                  p = {
                    args: null,
                    variadic: !1
                  },
                  q = [],
                  r = [],
                  s = [];
                for (d();;) {
                  if (a) l = m.detachedRuleset() || m.expression();
                  else {
                    if (m.comments(), "." === v.charAt(y) && j(/^\.{3}/)) {
                      p.variadic = !0, k(";") && !b && (b = !0), (b ? r : s).push({
                        variadic: !0
                      });
                      break
                    }
                    l = n.variable() || n.literal() || n.keyword()
                  }
                  if (!l) break;
                  h = null, l.throwAwayComments && l.throwAwayComments(), i = l;
                  var t = null;
                  if (a ? l.value && 1 == l.value.length && (t = l.value[0]) : t = l, t && t instanceof x.Variable)
                    if (k(":")) {
                      if (q.length > 0 && (b && o("Cannot mix ; and , as delimiter types"), c = !0), i = a && m.detachedRuleset() || m.expression(), !i) {
                        if (!a) return e(), p.args = [], p;
                        o("could not understand value for named argument")
                      }
                      h = g = t.name
                    } else {
                      if (!a && j(/^\.{3}/)) {
                        p.variadic = !0, k(";") && !b && (b = !0), (b ? r : s).push({
                          name: l.name,
                          variadic: !0
                        });
                        break
                      }
                      a || (g = h = t.name, i = null)
                    }
                  i && q.push(i), s.push({
                    name: h,
                    value: i
                  }), k(",") || (k(";") || b) && (c && o("Cannot mix ; and , as delimiter types"), b = !0, q.length > 1 && (i = new x.Value(q)), r.push({
                    name: g,
                    value: i
                  }), g = null, q = [], c = !1)
                }
                return f(), p.args = b ? r : s, p
              },
              definition: function () {
                var a, b, c, g, h = [],
                  i = !1;
                if (!("." !== v.charAt(y) && "#" !== v.charAt(y) || p(/^[^{]*\}/)))
                  if (d(), b = j(/^([#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+)\s*\(/)) {
                    a = b[1];
                    var l = this.args(!1);
                    if (h = l.args, i = l.variadic, !k(")")) return A = y, void e();
                    if (F.comments(), j(/^when/) && (g = m(F.conditions, "expected condition")), c = F.block()) return f(), new x.mixin.Definition(a, h, c, g, i);
                    e()
                  } else f()
              }
            },
            entity: function () {
              var a = this.entities;
              return a.literal() || a.variable() || a.url() || a.call() || a.keyword() || a.javascript() || this.comment()
            },
            end: function () {
              return k(";") || q("}")
            },
            alpha: function () {
              var a;
              return j(/^\(opacity=/i) ? (a = j(/^\d+/) || this.entities.variable(), a ? (n(")"), new x.Alpha(a)) : void 0) : void 0
            },
            element: function () {
              var b, c, g, h = y;
              return c = this.combinator(), b = j(/^(?:\d+\.\d+|\d+)%/) || j(/^(?:[.#]?|:*)(?:[\w-]|[^\x00-\x9f]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/) || k("*") || k("&") || this.attribute() || j(/^\([^()@]+\)/) || j(/^[\.#](?=@)/) || this.entities.variableCurly(), b || (d(), k("(") ? (g = this.selector()) && k(")") ? (b = new x.Paren(g), f()) : e() : f()), b ? new x.Element(c, b, h, a.currentFileInfo) : void 0
            },
            combinator: function () {
              var a = v.charAt(y);
              if ("/" === a) {
                d();
                var b = j(/^\/[a-z]+\//i);
                if (b) return f(), new x.Combinator(b);
                e()
              }
              if (">" === a || "+" === a || "~" === a || "|" === a || "^" === a) {
                for (y++, "^" === a && "^" === v.charAt(y) && (a = "^^", y++); h(v, y);) y++;
                return new x.Combinator(a)
              }
              return new x.Combinator(h(v, y - 1) ? " " : null)
            },
            lessSelector: function () {
              return this.selector(!0)
            },
            selector: function (b) {
              for (var c, d, e, f, g, h, i, j = y, k = J;
                (b && (g = this.extend()) || b && (h = k(/^when/)) || (f = this.element())) && (h ? i = m(this.conditions, "expected condition") : i ? o("CSS guard can only be used at the end of selector") : g ? d ? d.push(g) : d = [g] : (d && o("Extend can only be used at the end of selector"), e = v.charAt(y), c ? c.push(f) : c = [f], f = null), "{" !== e && "}" !== e && ";" !== e && "," !== e && ")" !== e););
              return c ? new x.Selector(c, d, i, j, a.currentFileInfo) : void(d && o("Extend must be used to extend a selector, it cannot be used on its own"))
            },
            attribute: function () {
              if (k("[")) {
                var a, b, c, d = this.entities;
                return (a = d.variableCurly()) || (a = m(/^(?:[_A-Za-z0-9-\*]*\|)?(?:[_A-Za-z0-9-]|\\.)+/)), c = j(/^[|~*$^]?=/), c && (b = d.quoted() || j(/^[0-9]+%/) || j(/^[\w-]+/) || d.variableCurly()), n("]"), new x.Attribute(a, c, b)
              }
            },
            block: function () {
              var a;
              return k("{") && (a = this.primary()) && k("}") ? a : void 0
            },
            blockRuleset: function () {
              var a = this.block();
              return a && (a = new x.Ruleset(null, a)), a
            },
            detachedRuleset: function () {
              var a = this.blockRuleset();
              return a ? new x.DetachedRuleset(a) : void 0
            },
            ruleset: function () {
              var b, c, g, h;
              for (d(), a.dumpLineNumbers && (h = t(y, v, a));
                (c = this.lessSelector(), c) && (b ? b.push(c) : b = [c], this.comments(), c.condition && b.length > 1 && o("Guards are only currently allowed on a single selector."), k(","));) c.condition && o("Guards are only currently allowed on a single selector."), this.comments();
              if (b && (g = this.block())) {
                f();
                var i = new x.Ruleset(b, g, a.strictImports);
                return a.dumpLineNumbers && (i.debugInfo = h), i
              }
              A = y, e()
            },
            rule: function (b) {
              var c, g, h, i, j, k = y,
                l = v.charAt(k);
              if ("." !== l && "#" !== l && "&" !== l)
                if (d(), c = this.variable() || this.ruleProperty()) {
                  if (j = "string" == typeof c, j && (g = this.detachedRuleset()), this.comments(), g || (g = b || !a.compress && !j ? this.anonymousValue() || this.value() : this.value() || this.anonymousValue(), h = this.important(), i = !j && c.pop().value), g && this.end()) return f(), new x.Rule(c, g, h, i, k, a.currentFileInfo);
                  if (A = y, e(), g && !b) return this.rule(!0)
                } else f()
            },
            anonymousValue: function () {
              var a;
              return a = /^([^@+\/'"*`(;{}-]*);/.exec(C), a ? (y += a[0].length - 1, new x.Anonymous(a[1])) : void 0
            },
            "import": function () {
              var b, c, d = y,
                e = j(/^@import?\s+/);
              if (e) {
                var f = (e ? this.importOptions() : null) || {};
                if (b = this.entities.quoted() || this.entities.url()) return c = this.mediaFeatures(), i(";") || (y = d, o("missing semi-colon or unrecognised media features on import")), c = c && new x.Value(c), new x.Import(b, c, f, d, a.currentFileInfo);
                y = d, o("malformed import statement")
              }
            },
            importOptions: function () {
              var a, b, c, d = {};
              if (!k("(")) return null;
              do
                if (a = this.importOption()) {
                  switch (b = a, c = !0, b) {
                  case "css":
                    b = "less", c = !1;
                    break;
                  case "once":
                    b = "multiple", c = !1
                  }
                  if (d[b] = c, !k(",")) break
                }
              while (a);
              return n(")"), d
            },
            importOption: function () {
              var a = j(/^(less|css|multiple|once|inline|reference)/);
              return a ? a[1] : void 0
            },
            mediaFeature: function () {
              var b, c, d = this.entities,
                e = [];
              do
                if (b = d.keyword() || d.variable()) e.push(b);
                else if (k("(")) {
                if (c = this.property(), b = this.value(), !k(")")) return null;
                if (c && b) e.push(new x.Paren(new x.Rule(c, b, null, null, y, a.currentFileInfo, !0)));
                else {
                  if (!b) return null;
                  e.push(new x.Paren(b))
                }
              } while (b);
              return e.length > 0 ? new x.Expression(e) : void 0
            },
            mediaFeatures: function () {
              var a, b = this.entities,
                c = [];
              do
                if (a = this.mediaFeature()) {
                  if (c.push(a), !k(",")) break
                } else if (a = b.variable(), a && (c.push(a), !k(","))) break; while (a);
              return c.length > 0 ? c : null
            },
            media: function () {
              var b, c, d, e;
              return a.dumpLineNumbers && (e = t(y, v, a)), j(/^@media/) && (b = this.mediaFeatures(), c = this.block()) ? (d = new x.Media(c, b, y, a.currentFileInfo), a.dumpLineNumbers && (d.debugInfo = e), d) : void 0
            },
            directive: function () {
              var b, c, g, h, i, l, m, n = y,
                p = !0;
              if ("@" === v.charAt(y)) {
                if (c = this["import"]() || this.media()) return c;
                if (d(), b = j(/^@[a-z-]+/)) {
                  switch (h = b, "-" == b.charAt(1) && b.indexOf("-", 2) > 0 && (h = "@" + b.slice(b.indexOf("-", 2) + 1)), h) {
                  case "@charset":
                    i = !0, p = !1;
                    break;
                  case "@namespace":
                    l = !0, p = !1;
                    break;
                  case "@keyframes":
                    i = !0;
                    break;
                  case "@host":
                  case "@page":
                  case "@document":
                  case "@supports":
                    m = !0
                  }
                  return this.comments(), i ? (c = this.entity(), c || o("expected " + b + " identifier")) : l ? (c = this.expression(), c || o("expected " + b + " expression")) : m && (c = (j(/^[^{;]+/) || "").trim(), c && (c = new x.Anonymous(c))), this.comments(), p && (g = this.blockRuleset()), g || !p && c && k(";") ? (f(), new x.Directive(b, c, g, n, a.currentFileInfo, a.dumpLineNumbers ? t(n, v, a) : null)) : void e()
                }
              }
            },
            value: function () {
              var a, b = [];
              do
                if (a = this.expression(), a && (b.push(a), !k(","))) break;
              while (a);
              return b.length > 0 ? new x.Value(b) : void 0
            },
            important: function () {
              return "!" === v.charAt(y) ? j(/^! *important/) : void 0
            },
            sub: function () {
              var a, b;
              return k("(") && (a = this.addition()) ? (b = new x.Expression([a]), n(")"), b.parens = !0, b) : void 0
            },
            multiplication: function () {
              var a, b, c, g, i;
              if (a = this.operand()) {
                for (i = h(v, y - 1); !p(/^\/[*\/]/);) {
                  if (d(), c = k("/") || k("*"), !c) {
                    f();
                    break
                  }
                  if (b = this.operand(), !b) {
                    e();
                    break
                  }
                  f(), a.parensInOp = !0, b.parensInOp = !0, g = new x.Operation(c, [g || a, b], i), i = h(v, y - 1)
                }
                return g || a
              }
            },
            addition: function () {
              var a, b, c, d, e;
              if (a = this.multiplication()) {
                for (e = h(v, y - 1);
                  (c = j(/^[-+]\s+/) || !e && (k("+") || k("-")), c) && (b = this.multiplication(), b);) a.parensInOp = !0, b.parensInOp = !0, d = new x.Operation(c, [d || a, b], e), e = h(v, y - 1);
                return d || a
              }
            },
            conditions: function () {
              var a, b, c, d = y;
              if (a = this.condition()) {
                for (; p(/^,\s*(not\s*)?\(/) && k(",") && (b = this.condition(), b);) c = new x.Condition("or", c || a, b, d);
                return c || a
              }
            },
            condition: function () {
              var a, b, c, d, e = this.entities,
                f = y,
                g = !1;
              return j(/^not/) && (g = !0), n("("), a = this.addition() || e.keyword() || e.quoted(), a ? (d = j(/^(?:>=|<=|=<|[<=>])/), d ? (b = this.addition() || e.keyword() || e.quoted(), b ? c = new x.Condition(d, a, b, f, g) : o("expected expression")) : c = new x.Condition("=", a, new x.Keyword("true"), f, g), n(")"), j(/^and/) ? new x.Condition("and", c, this.condition()) : c) : void 0
            },
            operand: function () {
              var a, b = this.entities,
                c = v.charAt(y + 1);
              "-" !== v.charAt(y) || "@" !== c && "(" !== c || (a = k("-"));
              var d = this.sub() || b.dimension() || b.color() || b.variable() || b.call();
              return a && (d.parensInOp = !0, d = new x.Negative(d)), d
            },
            expression: function () {
              var a, b, c = [];
              do a = this.addition() || this.entity(), a && (c.push(a), p(/^\/[\/*]/) || (b = k("/"), b && c.push(new x.Anonymous(b)))); while (a);
              return c.length > 0 ? new x.Expression(c) : void 0
            },
            property: function () {
              var a = j(/^(\*?-?[_a-zA-Z0-9-]+)\s*:/);
              return a ? a[1] : void 0
            },
            ruleProperty: function () {
              function b(a) {
                var b = a.exec(f);
                return b ? (h.push(y + i), i += b[0].length, f = f.slice(b[1].length), g.push(b[1])) : void 0
              }

              function c() {
                var a = /^\s*\/\*(?:[^*]|\*+[^\/*])*\*+\//.exec(f);
                return a ? (i += a[0].length, f = f.slice(a[0].length), !0) : !1
              }
              var d, e, f = C,
                g = [],
                h = [],
                i = 0;
              for (b(/^(\*?)/); b(/^((?:[\w-]+)|(?:@\{[\w-]+\}))/););
              for (; c(););
              if (g.length > 1 && b(/^\s*((?:\+_|\+)?)\s*:/)) {
                for (l(i), "" === g[0] && (g.shift(), h.shift()), e = 0; e < g.length; e++) d = g[e], g[e] = "@" !== d.charAt(0) ? new x.Keyword(d) : new x.Variable("@" + d.slice(2, -1), h[e], a.currentFileInfo);
                return g
              }
            }
          }
        }
      }, w.Parser.serializeVars = function (a) {
        var b = "";
        for (var c in a)
          if (Object.hasOwnProperty.call(a, c)) {
            var d = a[c];
            b += ("@" === c[0] ? "" : "@") + c + ": " + d + (";" === ("" + d).slice(-1) ? "" : ";")
          }
        return b
      },
      function (d) {
        function e(a, b, c) {
          if (!(c instanceof d.Dimension)) throw {
            type: "Argument",
            message: "argument must be a number"
          };
          return null == b ? b = c.unit : c = c.unify(), new d.Dimension(a(parseFloat(c.value)), b)
        }

        function f(a, b, c) {
          var e, f, g, h, i = b.alpha,
            j = c.alpha,
            k = [];
          g = j + i * (1 - j);
          for (var l = 0; 3 > l; l++) e = b.rgb[l] / 255, f = c.rgb[l] / 255, h = a(e, f), g && (h = (j * f + i * (e - j * (e + f - h))) / g), k[l] = 255 * h;
          return new d.Color(k, g)
        }

        function g() {
          var a, b = d.functions;
          for (a in l) l.hasOwnProperty(a) && (b[a] = e.bind(null, Math[a], l[a]));
          for (a in m) m.hasOwnProperty(a) && (b[a] = f.bind(null, m[a]));
          a = d.defaultFunc, b["default"] = a.eval.bind(a)
        }

        function h(a) {
          return d.functions.hsla(a.h, a.s, a.l, a.a)
        }

        function i(a, b) {
          return a instanceof d.Dimension && a.unit.is("%") ? parseFloat(a.value * b / 100) : j(a)
        }

        function j(a) {
          if (a instanceof d.Dimension) return parseFloat(a.unit.is("%") ? a.value / 100 : a.value);
          if ("number" == typeof a) return a;
          throw {
            error: "RuntimeError",
            message: "color functions take numbers as parameters"
          }
        }

        function k(a) {
          return Math.min(1, Math.max(0, a))
        }
        d.functions = {
          rgb: function (a, b, c) {
            return this.rgba(a, b, c, 1)
          },
          rgba: function (a, b, c, e) {
            var f = [a, b, c].map(function (a) {
              return i(a, 255)
            });
            return e = j(e), new d.Color(f, e)
          },
          hsl: function (a, b, c) {
            return this.hsla(a, b, c, 1)
          },
          hsla: function (a, b, c, d) {
            function e(a) {
              return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 1 > 6 * a ? g + (f - g) * a * 6 : 1 > 2 * a ? f : 2 > 3 * a ? g + (f - g) * (2 / 3 - a) * 6 : g
            }
            a = j(a) % 360 / 360, b = k(j(b)), c = k(j(c)), d = k(j(d));
            var f = .5 >= c ? c * (b + 1) : c + b - c * b,
              g = 2 * c - f;
            return this.rgba(255 * e(a + 1 / 3), 255 * e(a), 255 * e(a - 1 / 3), d)
          },
          hsv: function (a, b, c) {
            return this.hsva(a, b, c, 1)
          },
          hsva: function (a, b, c, d) {
            a = j(a) % 360 / 360 * 360, b = j(b), c = j(c), d = j(d);
            var e, f;
            e = Math.floor(a / 60 % 6), f = a / 60 - e;
            var g = [c, c * (1 - b), c * (1 - f * b), c * (1 - (1 - f) * b)],
              h = [[0, 3, 1], [2, 0, 1], [1, 0, 3], [1, 2, 0], [3, 1, 0], [0, 1, 2]];
            return this.rgba(255 * g[h[e][0]], 255 * g[h[e][1]], 255 * g[h[e][2]], d)
          },
          hue: function (a) {
            return new d.Dimension(a.toHSL().h)
          },
          saturation: function (a) {
            return new d.Dimension(100 * a.toHSL().s, "%")
          },
          lightness: function (a) {
            return new d.Dimension(100 * a.toHSL().l, "%")
          },
          hsvhue: function (a) {
            return new d.Dimension(a.toHSV().h)
          },
          hsvsaturation: function (a) {
            return new d.Dimension(100 * a.toHSV().s, "%")
          },
          hsvvalue: function (a) {
            return new d.Dimension(100 * a.toHSV().v, "%")
          },
          red: function (a) {
            return new d.Dimension(a.rgb[0])
          },
          green: function (a) {
            return new d.Dimension(a.rgb[1])
          },
          blue: function (a) {
            return new d.Dimension(a.rgb[2])
          },
          alpha: function (a) {
            return new d.Dimension(a.toHSL().a)
          },
          luma: function (a) {
            return new d.Dimension(a.luma() * a.alpha * 100, "%")
          },
          luminance: function (a) {
            var b = .2126 * a.rgb[0] / 255 + .7152 * a.rgb[1] / 255 + .0722 * a.rgb[2] / 255;
            return new d.Dimension(b * a.alpha * 100, "%")
          },
          saturate: function (a, b) {
            if (!a.rgb) return null;
            var c = a.toHSL();
            return c.s += b.value / 100, c.s = k(c.s), h(c)
          },
          desaturate: function (a, b) {
            var c = a.toHSL();
            return c.s -= b.value / 100, c.s = k(c.s), h(c)
          },
          lighten: function (a, b) {
            var c = a.toHSL();
            return c.l += b.value / 100, c.l = k(c.l), h(c)
          },
          darken: function (a, b) {
            var c = a.toHSL();
            return c.l -= b.value / 100, c.l = k(c.l), h(c)
          },
          fadein: function (a, b) {
            var c = a.toHSL();
            return c.a += b.value / 100, c.a = k(c.a), h(c)
          },
          fadeout: function (a, b) {
            var c = a.toHSL();
            return c.a -= b.value / 100, c.a = k(c.a), h(c)
          },
          fade: function (a, b) {
            var c = a.toHSL();
            return c.a = b.value / 100, c.a = k(c.a), h(c)
          },
          spin: function (a, b) {
            var c = a.toHSL(),
              d = (c.h + b.value) % 360;
            return c.h = 0 > d ? 360 + d : d, h(c)
          },
          mix: function (a, b, c) {
            c || (c = new d.Dimension(50));
            var e = c.value / 100,
              f = 2 * e - 1,
              g = a.toHSL().a - b.toHSL().a,
              h = ((f * g == -1 ? f : (f + g) / (1 + f * g)) + 1) / 2,
              i = 1 - h,
              j = [a.rgb[0] * h + b.rgb[0] * i, a.rgb[1] * h + b.rgb[1] * i, a.rgb[2] * h + b.rgb[2] * i],
              k = a.alpha * e + b.alpha * (1 - e);

            return new d.Color(j, k)
          },
          greyscale: function (a) {
            return this.desaturate(a, new d.Dimension(100))
          },
          contrast: function (a, b, c, d) {
            if (!a.rgb) return null;
            if ("undefined" == typeof c && (c = this.rgba(255, 255, 255, 1)), "undefined" == typeof b && (b = this.rgba(0, 0, 0, 1)), b.luma() > c.luma()) {
              var e = c;
              c = b, b = e
            }
            return d = "undefined" == typeof d ? .43 : j(d), a.luma() < d ? c : b
          },
          e: function (a) {
            return new d.Anonymous(a instanceof d.JavaScript ? a.evaluated : a.value)
          },
          escape: function (a) {
            return new d.Anonymous(encodeURI(a.value).replace(/=/g, "%3D").replace(/:/g, "%3A").replace(/#/g, "%23").replace(/;/g, "%3B").replace(/\(/g, "%28").replace(/\)/g, "%29"))
          },
          replace: function (a, b, c, e) {
            var f = a.value;
            return f = f.replace(new RegExp(b.value, e ? e.value : ""), c.value), new d.Quoted(a.quote || "", f, a.escaped)
          },
          "%": function (a) {
            for (var b = Array.prototype.slice.call(arguments, 1), c = a.value, e = 0; e < b.length; e++) c = c.replace(/%[sda]/i, function (a) {
              var c = a.match(/s/i) ? b[e].value : b[e].toCSS();
              return a.match(/[A-Z]$/) ? encodeURIComponent(c) : c
            });
            return c = c.replace(/%%/g, "%"), new d.Quoted(a.quote || "", c, a.escaped)
          },
          unit: function (a, b) {
            if (!(a instanceof d.Dimension)) throw {
              type: "Argument",
              message: "the first argument to unit must be a number" + (a instanceof d.Operation ? ". Have you forgotten parenthesis?" : "")
            };
            return b = b ? b instanceof d.Keyword ? b.value : b.toCSS() : "", new d.Dimension(a.value, b)
          },
          convert: function (a, b) {
            return a.convertTo(b.value)
          },
          round: function (a, b) {
            var c = "undefined" == typeof b ? 0 : b.value;
            return e(function (a) {
              return a.toFixed(c)
            }, null, a)
          },
          pi: function () {
            return new d.Dimension(Math.PI)
          },
          mod: function (a, b) {
            return new d.Dimension(a.value % b.value, a.unit)
          },
          pow: function (a, b) {
            if ("number" == typeof a && "number" == typeof b) a = new d.Dimension(a), b = new d.Dimension(b);
            else if (!(a instanceof d.Dimension && b instanceof d.Dimension)) throw {
              type: "Argument",
              message: "arguments must be numbers"
            };
            return new d.Dimension(Math.pow(a.value, b.value), a.unit)
          },
          _minmax: function (a, c) {
            switch (c = Array.prototype.slice.call(c), c.length) {
            case 0:
              throw {
                type: "Argument",
                message: "one or more arguments required"
              }
            }
            var e, f, g, h, i, j, k, l, m = [],
              n = {};
            for (e = 0; e < c.length; e++)
              if (g = c[e], g instanceof d.Dimension)
                if (h = "" === g.unit.toString() && l !== b ? new d.Dimension(g.value, l).unify() : g.unify(), j = "" === h.unit.toString() && k !== b ? k : h.unit.toString(), k = "" !== j && k === b || "" !== j && "" === m[0].unify().unit.toString() ? j : k, l = "" !== j && l === b ? g.unit.toString() : l, f = n[""] !== b && "" !== j && j === k ? n[""] : n[j], f !== b) i = "" === m[f].unit.toString() && l !== b ? new d.Dimension(m[f].value, l).unify() : m[f].unify(), (a && h.value < i.value || !a && h.value > i.value) && (m[f] = g);
                else {
                  if (k !== b && j !== k) throw {
                    type: "Argument",
                    message: "incompatible types"
                  };
                  n[j] = m.length, m.push(g)
                } else Array.isArray(c[e].value) && Array.prototype.push.apply(c, Array.prototype.slice.call(c[e].value));
            return 1 == m.length ? m[0] : (c = m.map(function (a) {
              return a.toCSS(this.env)
            }).join(this.env.compress ? "," : ", "), new d.Anonymous((a ? "min" : "max") + "(" + c + ")"))
          },
          min: function () {
            return this._minmax(!0, arguments)
          },
          max: function () {
            return this._minmax(!1, arguments)
          },
          "get-unit": function (a) {
            return new d.Anonymous(a.unit)
          },
          argb: function (a) {
            return new d.Anonymous(a.toARGB())
          },
          percentage: function (a) {
            return new d.Dimension(100 * a.value, "%")
          },
          color: function (a) {
            if (a instanceof d.Quoted) {
              var b, c = a.value;
              if (b = d.Color.fromKeyword(c)) return b;
              if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/.test(c)) return new d.Color(c.slice(1));
              throw {
                type: "Argument",
                message: "argument must be a color keyword or 3/6 digit hex e.g. #FFF"
              }
            }
            throw {
              type: "Argument",
              message: "argument must be a string"
            }
          },
          iscolor: function (a) {
            return this._isa(a, d.Color)
          },
          isnumber: function (a) {
            return this._isa(a, d.Dimension)
          },
          isstring: function (a) {
            return this._isa(a, d.Quoted)
          },
          iskeyword: function (a) {
            return this._isa(a, d.Keyword)
          },
          isurl: function (a) {
            return this._isa(a, d.URL)
          },
          ispixel: function (a) {
            return this.isunit(a, "px")
          },
          ispercentage: function (a) {
            return this.isunit(a, "%")
          },
          isem: function (a) {
            return this.isunit(a, "em")
          },
          isunit: function (a, b) {
            return a instanceof d.Dimension && a.unit.is(b.value || b) ? d.True : d.False
          },
          _isa: function (a, b) {
            return a instanceof b ? d.True : d.False
          },
          tint: function (a, b) {
            return this.mix(this.rgb(255, 255, 255), a, b)
          },
          shade: function (a, b) {
            return this.mix(this.rgb(0, 0, 0), a, b)
          },
          extract: function (a, b) {
            return b = b.value - 1, Array.isArray(a.value) ? a.value[b] : Array(a)[b]
          },
          length: function (a) {
            var b = Array.isArray(a.value) ? a.value.length : 1;
            return new d.Dimension(b)
          },
          "data-uri": function (b, e) {
            if ("undefined" != typeof a) return new d.URL(e || b, this.currentFileInfo).eval(this.env);
            var f = b.value,
              g = e && e.value,
              h = c("./fs"),
              i = c("path"),
              j = !1;
            arguments.length < 2 && (g = f);
            var k = g.indexOf("#"),
              l = "";
            if (-1 !== k && (l = g.slice(k), g = g.slice(0, k)), this.env.isPathRelative(g) && (g = this.currentFileInfo.relativeUrls ? i.join(this.currentFileInfo.currentDirectory, g) : i.join(this.currentFileInfo.entryPath, g)), arguments.length < 2) {
              var m;
              try {
                m = c("mime")
              } catch (n) {
                m = d._mime
              }
              f = m.lookup(g);
              var o = m.charsets.lookup(f);
              j = ["US-ASCII", "UTF-8"].indexOf(o) < 0, j && (f += ";base64")
            } else j = /;base64$/.test(f);
            var p = h.readFileSync(g),
              q = 32,
              r = parseInt(p.length / 1024, 10);
            if (r >= q && this.env.ieCompat !== !1) return this.env.silent || console.warn("Skipped data-uri embedding of %s because its size (%dKB) exceeds IE8-safe %dKB!", g, r, q), new d.URL(e || b, this.currentFileInfo).eval(this.env);
            p = j ? p.toString("base64") : encodeURIComponent(p);
            var s = '"data:' + f + "," + p + l + '"';
            return new d.URL(new d.Anonymous(s))
          },
          "svg-gradient": function (a) {
            function e() {
              throw {
                type: "Argument",
                message: "svg-gradient expects direction, start_color [start_position], [color position,]..., end_color [end_position]"
              }
            }
            arguments.length < 3 && e();
            var f, g, h, i, j, k, l, m = Array.prototype.slice.call(arguments, 1),
              n = "linear",
              o = 'x="0" y="0" width="1" height="1"',
              p = !0,
              q = {
                compress: !1
              },
              r = a.toCSS(q);
            switch (r) {
            case "to bottom":
              f = 'x1="0%" y1="0%" x2="0%" y2="100%"';
              break;
            case "to right":
              f = 'x1="0%" y1="0%" x2="100%" y2="0%"';
              break;
            case "to bottom right":
              f = 'x1="0%" y1="0%" x2="100%" y2="100%"';
              break;
            case "to top right":
              f = 'x1="0%" y1="100%" x2="100%" y2="0%"';
              break;
            case "ellipse":
            case "ellipse at center":
              n = "radial", f = 'cx="50%" cy="50%" r="75%"', o = 'x="-50" y="-50" width="101" height="101"';
              break;
            default:
              throw {
                type: "Argument",
                message: "svg-gradient direction must be 'to bottom', 'to right', 'to bottom right', 'to top right' or 'ellipse at center'"
              }
            }
            for (g = '<?xml version="1.0" ?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none"><' + n + 'Gradient id="gradient" gradientUnits="userSpaceOnUse" ' + f + ">", h = 0; h < m.length; h += 1) m[h].value ? (i = m[h].value[0], j = m[h].value[1]) : (i = m[h], j = b), i instanceof d.Color && ((0 === h || h + 1 === m.length) && j === b || j instanceof d.Dimension) || e(), k = j ? j.toCSS(q) : 0 === h ? "0%" : "100%", l = i.alpha, g += '<stop offset="' + k + '" stop-color="' + i.toRGB() + '"' + (1 > l ? ' stop-opacity="' + l + '"' : "") + "/>";
            if (g += "</" + n + "Gradient><rect " + o + ' fill="url(#gradient)" /></svg>', p) try {
              g = c("./encoder").encodeBase64(g)
            } catch (s) {
              p = !1
            }
            return g = "'data:image/svg+xml" + (p ? ";base64" : "") + "," + g + "'", new d.URL(new d.Anonymous(g))
          }
        }, d._mime = {
          _types: {
            ".htm": "text/html",
            ".html": "text/html",
            ".gif": "image/gif",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png"
          },
          lookup: function (a) {
            var e = c("path").extname(a),
              f = d._mime._types[e];
            if (f === b) throw new Error('Optional dependency "mime" is required for ' + e);
            return f
          },
          charsets: {
            lookup: function (a) {
              return a && /^text\//.test(a) ? "UTF-8" : ""
            }
          }
        };
        var l = {
            ceil: null,
            floor: null,
            sqrt: null,
            abs: null,
            tan: "",
            sin: "",
            cos: "",
            atan: "rad",
            asin: "rad",
            acos: "rad"
          },
          m = {
            multiply: function (a, b) {
              return a * b
            },
            screen: function (a, b) {
              return a + b - a * b
            },
            overlay: function (a, b) {
              return a *= 2, 1 >= a ? m.multiply(a, b) : m.screen(a - 1, b)
            },
            softlight: function (a, b) {
              var c = 1,
                d = a;
              return b > .5 && (d = 1, c = a > .25 ? Math.sqrt(a) : ((16 * a - 12) * a + 4) * a), a - (1 - 2 * b) * d * (c - a)
            },
            hardlight: function (a, b) {
              return m.overlay(b, a)
            },
            difference: function (a, b) {
              return Math.abs(a - b)
            },
            exclusion: function (a, b) {
              return a + b - 2 * a * b
            },
            average: function (a, b) {
              return (a + b) / 2
            },
            negation: function (a, b) {
              return 1 - Math.abs(a + b - 1)
            }
          };
        d.defaultFunc = {
          eval: function () {
            var a = this.value_,
              b = this.error_;
            if (b) throw b;
            return null != a ? a ? d.True : d.False : void 0
          },
          value: function (a) {
            this.value_ = a
          },
          error: function (a) {
            this.error_ = a
          },
          reset: function () {
            this.value_ = this.error_ = null
          }
        }, g(), d.fround = function (a, b) {
          var c = a && a.numPrecision;
          return null == c ? b : Number((b + 2e-16).toFixed(c))
        }, d.functionCall = function (a, b) {
          this.env = a, this.currentFileInfo = b
        }, d.functionCall.prototype = d.functions
      }(c("./tree")),
      function (a) {
        a.colors = {
          aliceblue: "#f0f8ff",
          antiquewhite: "#faebd7",
          aqua: "#00ffff",
          aquamarine: "#7fffd4",
          azure: "#f0ffff",
          beige: "#f5f5dc",
          bisque: "#ffe4c4",
          black: "#000000",
          blanchedalmond: "#ffebcd",
          blue: "#0000ff",
          blueviolet: "#8a2be2",
          brown: "#a52a2a",
          burlywood: "#deb887",
          cadetblue: "#5f9ea0",
          chartreuse: "#7fff00",
          chocolate: "#d2691e",
          coral: "#ff7f50",
          cornflowerblue: "#6495ed",
          cornsilk: "#fff8dc",
          crimson: "#dc143c",
          cyan: "#00ffff",
          darkblue: "#00008b",
          darkcyan: "#008b8b",
          darkgoldenrod: "#b8860b",
          darkgray: "#a9a9a9",
          darkgrey: "#a9a9a9",
          darkgreen: "#006400",
          darkkhaki: "#bdb76b",
          darkmagenta: "#8b008b",
          darkolivegreen: "#556b2f",
          darkorange: "#ff8c00",
          darkorchid: "#9932cc",
          darkred: "#8b0000",
          darksalmon: "#e9967a",
          darkseagreen: "#8fbc8f",
          darkslateblue: "#483d8b",
          darkslategray: "#2f4f4f",
          darkslategrey: "#2f4f4f",
          darkturquoise: "#00ced1",
          darkviolet: "#9400d3",
          deeppink: "#ff1493",
          deepskyblue: "#00bfff",
          dimgray: "#696969",
          dimgrey: "#696969",
          dodgerblue: "#1e90ff",
          firebrick: "#b22222",
          floralwhite: "#fffaf0",
          forestgreen: "#228b22",
          fuchsia: "#ff00ff",
          gainsboro: "#dcdcdc",
          ghostwhite: "#f8f8ff",
          gold: "#ffd700",
          goldenrod: "#daa520",
          gray: "#808080",
          grey: "#808080",
          green: "#008000",
          greenyellow: "#adff2f",
          honeydew: "#f0fff0",
          hotpink: "#ff69b4",
          indianred: "#cd5c5c",
          indigo: "#4b0082",
          ivory: "#fffff0",
          khaki: "#f0e68c",
          lavender: "#e6e6fa",
          lavenderblush: "#fff0f5",
          lawngreen: "#7cfc00",
          lemonchiffon: "#fffacd",
          lightblue: "#add8e6",
          lightcoral: "#f08080",
          lightcyan: "#e0ffff",
          lightgoldenrodyellow: "#fafad2",
          lightgray: "#d3d3d3",
          lightgrey: "#d3d3d3",
          lightgreen: "#90ee90",
          lightpink: "#ffb6c1",
          lightsalmon: "#ffa07a",
          lightseagreen: "#20b2aa",
          lightskyblue: "#87cefa",
          lightslategray: "#778899",
          lightslategrey: "#778899",
          lightsteelblue: "#b0c4de",
          lightyellow: "#ffffe0",
          lime: "#00ff00",
          limegreen: "#32cd32",
          linen: "#faf0e6",
          magenta: "#ff00ff",
          maroon: "#800000",
          mediumaquamarine: "#66cdaa",
          mediumblue: "#0000cd",
          mediumorchid: "#ba55d3",
          mediumpurple: "#9370d8",
          mediumseagreen: "#3cb371",
          mediumslateblue: "#7b68ee",
          mediumspringgreen: "#00fa9a",
          mediumturquoise: "#48d1cc",
          mediumvioletred: "#c71585",
          midnightblue: "#191970",
          mintcream: "#f5fffa",
          mistyrose: "#ffe4e1",
          moccasin: "#ffe4b5",
          navajowhite: "#ffdead",
          navy: "#000080",
          oldlace: "#fdf5e6",
          olive: "#808000",
          olivedrab: "#6b8e23",
          orange: "#ffa500",
          orangered: "#ff4500",
          orchid: "#da70d6",
          palegoldenrod: "#eee8aa",
          palegreen: "#98fb98",
          paleturquoise: "#afeeee",
          palevioletred: "#d87093",
          papayawhip: "#ffefd5",
          peachpuff: "#ffdab9",
          peru: "#cd853f",
          pink: "#ffc0cb",
          plum: "#dda0dd",
          powderblue: "#b0e0e6",
          purple: "#800080",
          red: "#ff0000",
          rosybrown: "#bc8f8f",
          royalblue: "#4169e1",
          saddlebrown: "#8b4513",
          salmon: "#fa8072",
          sandybrown: "#f4a460",
          seagreen: "#2e8b57",
          seashell: "#fff5ee",
          sienna: "#a0522d",
          silver: "#c0c0c0",
          skyblue: "#87ceeb",
          slateblue: "#6a5acd",
          slategray: "#708090",
          slategrey: "#708090",
          snow: "#fffafa",
          springgreen: "#00ff7f",
          steelblue: "#4682b4",
          tan: "#d2b48c",
          teal: "#008080",
          thistle: "#d8bfd8",
          tomato: "#ff6347",
          turquoise: "#40e0d0",
          violet: "#ee82ee",
          wheat: "#f5deb3",
          white: "#ffffff",
          whitesmoke: "#f5f5f5",
          yellow: "#ffff00",
          yellowgreen: "#9acd32"
        }
      }(c("./tree")),
      function (a) {
        a.debugInfo = function (b, c, d) {
          var e = "";
          if (b.dumpLineNumbers && !b.compress) switch (b.dumpLineNumbers) {
          case "comments":
            e = a.debugInfo.asComment(c);
            break;
          case "mediaquery":
            e = a.debugInfo.asMediaQuery(c);
            break;
          case "all":
            e = a.debugInfo.asComment(c) + (d || "") + a.debugInfo.asMediaQuery(c)
          }
          return e
        }, a.debugInfo.asComment = function (a) {
          return "/* line " + a.debugInfo.lineNumber + ", " + a.debugInfo.fileName + " */\n"
        }, a.debugInfo.asMediaQuery = function (a) {
          return "@media -sass-debug-info{filename{font-family:" + ("file://" + a.debugInfo.fileName).replace(/([.:\/\\])/g, function (a) {
            return "\\" == a && (a = "/"), "\\" + a
          }) + "}line{font-family:\\00003" + a.debugInfo.lineNumber + "}}\n"
        }, a.find = function (a, b) {
          for (var c, d = 0; d < a.length; d++)
            if (c = b.call(a, a[d])) return c;
          return null
        }, a.jsify = function (a) {
          return Array.isArray(a.value) && a.value.length > 1 ? "[" + a.value.map(function (a) {
            return a.toCSS()
          }).join(", ") + "]" : a.toCSS()
        }, a.toCSS = function (a) {
          var b = [];
          return this.genCSS(a, {
            add: function (a) {
              b.push(a)
            },
            isEmpty: function () {
              return 0 === b.length
            }
          }), b.join("")
        }, a.outputRuleset = function (a, b, c) {
          var d, e = c.length;
          if (a.tabLevel = (0 | a.tabLevel) + 1, a.compress) {
            for (b.add("{"), d = 0; e > d; d++) c[d].genCSS(a, b);
            return b.add("}"), void a.tabLevel--
          }
          var f = "\n" + Array(a.tabLevel).join("  "),
            g = f + "  ";
          if (e) {
            for (b.add(" {" + g), c[0].genCSS(a, b), d = 1; e > d; d++) b.add(g), c[d].genCSS(a, b);
            b.add(f + "}")
          } else b.add(" {" + f + "}");
          a.tabLevel--
        }
      }(c("./tree")),
      function (a) {
        a.Alpha = function (a) {
          this.value = a
        }, a.Alpha.prototype = {
          type: "Alpha",
          accept: function (a) {
            this.value = a.visit(this.value)
          },
          eval: function (b) {
            return this.value.eval ? new a.Alpha(this.value.eval(b)) : this
          },
          genCSS: function (a, b) {
            b.add("alpha(opacity="), this.value.genCSS ? this.value.genCSS(a, b) : b.add(this.value), b.add(")")
          },
          toCSS: a.toCSS
        }
      }(c("../tree")),
      function (a) {
        a.Anonymous = function (a, b, c, d, e) {
          this.value = a, this.index = b, this.mapLines = d, this.currentFileInfo = c, this.rulesetLike = "undefined" == typeof e ? !1 : e
        }, a.Anonymous.prototype = {
          type: "Anonymous",
          eval: function () {
            return new a.Anonymous(this.value, this.index, this.currentFileInfo, this.mapLines, this.rulesetLike)
          },
          compare: function (a) {
            if (!a.toCSS) return -1;
            var b = this.toCSS(),
              c = a.toCSS();
            return b === c ? 0 : c > b ? -1 : 1
          },
          isRulesetLike: function () {
            return this.rulesetLike
          },
          genCSS: function (a, b) {
            b.add(this.value, this.currentFileInfo, this.index, this.mapLines)
          },
          toCSS: a.toCSS
        }
      }(c("../tree")),
      function (a) {
        a.Assignment = function (a, b) {
          this.key = a, this.value = b
        }, a.Assignment.prototype = {
          type: "Assignment",
          accept: function (a) {
            this.value = a.visit(this.value)
          },
          eval: function (b) {
            return this.value.eval ? new a.Assignment(this.key, this.value.eval(b)) : this
          },
          genCSS: function (a, b) {
            b.add(this.key + "="), this.value.genCSS ? this.value.genCSS(a, b) : b.add(this.value)
          },
          toCSS: a.toCSS
        }
      }(c("../tree")),
      function (a) {
        a.Call = function (a, b, c, d) {
          this.name = a, this.args = b, this.index = c, this.currentFileInfo = d
        }, a.Call.prototype = {
          type: "Call",
          accept: function (a) {
            this.args && (this.args = a.visitArray(this.args))
          },
          eval: function (b) {
            var c, d, e = this.args.map(function (a) {
                return a.eval(b)
              }),
              f = this.name.toLowerCase();
            if (f in a.functions) try {
              if (d = new a.functionCall(b, this.currentFileInfo), c = d[f].apply(d, e), null != c) return c
            } catch (g) {
              throw {
                type: g.type || "Runtime",
                message: "error evaluating function `" + this.name + "`" + (g.message ? ": " + g.message : ""),
                index: this.index,
                filename: this.currentFileInfo.filename
              }
            }
            return new a.Call(this.name, e, this.index, this.currentFileInfo)
          },
          genCSS: function (a, b) {
            b.add(this.name + "(", this.currentFileInfo, this.index);
            for (var c = 0; c < this.args.length; c++) this.args[c].genCSS(a, b), c + 1 < this.args.length && b.add(", ");
            b.add(")")
          },
          toCSS: a.toCSS
        }
      }(c("../tree")),
      function (a) {
        function b(a) {
          return "#" + a.map(function (a) {
            return a = c(Math.round(a), 255), (16 > a ? "0" : "") + a.toString(16)
          }).join("")
        }

        function c(a, b) {
          return Math.min(Math.max(a, 0), b)
        }
        a.Color = function (a, b) {
          this.rgb = Array.isArray(a) ? a : 6 == a.length ? a.match(/.{2}/g).map(function (a) {
            return parseInt(a, 16)
          }) : a.split("").map(function (a) {
            return parseInt(a + a, 16)
          }), this.alpha = "number" == typeof b ? b : 1
        };
        var d = "transparent";
        a.Color.prototype = {
          type: "Color",
          eval: function () {
            return this
          },
          luma: function () {
            var a = this.rgb[0] / 255,
              b = this.rgb[1] / 255,
              c = this.rgb[2] / 255;
            return a = .03928 >= a ? a / 12.92 : Math.pow((a + .055) / 1.055, 2.4), b = .03928 >= b ? b / 12.92 : Math.pow((b + .055) / 1.055, 2.4), c = .03928 >= c ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4), .2126 * a + .7152 * b + .0722 * c
          },
          genCSS: function (a, b) {
            b.add(this.toCSS(a))
          },
          toCSS: function (b, e) {
            var f = b && b.compress && !e,
              g = a.fround(b, this.alpha);
            if (1 > g) return 0 === g && this.isTransparentKeyword ? d : "rgba(" + this.rgb.map(function (a) {
              return c(Math.round(a), 255)
            }).concat(c(g, 1)).join("," + (f ? "" : " ")) + ")";
            var h = this.toRGB();
            if (f) {
              var i = h.split("");
              i[1] === i[2] && i[3] === i[4] && i[5] === i[6] && (h = "#" + i[1] + i[3] + i[5])
            }
            return h
          },
          operate: function (b, c, d) {
            for (var e = [], f = this.alpha * (1 - d.alpha) + d.alpha, g = 0; 3 > g; g++) e[g] = a.operate(b, c, this.rgb[g], d.rgb[g]);
            return new a.Color(e, f)
          },
          toRGB: function () {
            return b(this.rgb)
          },
          toHSL: function () {
            var a, b, c = this.rgb[0] / 255,
              d = this.rgb[1] / 255,
              e = this.rgb[2] / 255,
              f = this.alpha,
              g = Math.max(c, d, e),
              h = Math.min(c, d, e),
              i = (g + h) / 2,
              j = g - h;
            if (g === h) a = b = 0;
            else {
              switch (b = i > .5 ? j / (2 - g - h) : j / (g + h), g) {
              case c:
                a = (d - e) / j + (e > d ? 6 : 0);
                break;
              case d:
                a = (e - c) / j + 2;
                break;
              case e:
                a = (c - d) / j + 4
              }
              a /= 6
            }
            return {
              h: 360 * a,
              s: b,
              l: i,
              a: f
            }
          },
          toHSV: function () {
            var a, b, c = this.rgb[0] / 255,
              d = this.rgb[1] / 255,
              e = this.rgb[2] / 255,
              f = this.alpha,
              g = Math.max(c, d, e),
              h = Math.min(c, d, e),
              i = g,
              j = g - h;
            if (b = 0 === g ? 0 : j / g, g === h) a = 0;
            else {
              switch (g) {
              case c:
                a = (d - e) / j + (e > d ? 6 : 0);
                break;
              case d:
                a = (e - c) / j + 2;
                break;
              case e:
                a = (c - d) / j + 4
              }
              a /= 6
            }
            return {
              h: 360 * a,
              s: b,
              v: i,
              a: f
            }
          },
          toARGB: function () {
            return b([255 * this.alpha].concat(this.rgb))
          },
          compare: function (a) {
            return a.rgb && a.rgb[0] === this.rgb[0] && a.rgb[1] === this.rgb[1] && a.rgb[2] === this.rgb[2] && a.alpha === this.alpha ? 0 : -1
          }
        }, a.Color.fromKeyword = function (b) {
          if (b = b.toLowerCase(), a.colors.hasOwnProperty(b)) return new a.Color(a.colors[b].slice(1));
          if (b === d) {
            var c = new a.Color([0, 0, 0], 0);
            return c.isTransparentKeyword = !0, c
          }
        }
      }(c("../tree")),
      function (a) {
        a.Comment = function (a, b, c, d) {
          this.value = a, this.silent = !!b, this.currentFileInfo = d
        }, a.Comment.prototype = {
          type: "Comment",
          genCSS: function (b, c) {
            this.debugInfo && c.add(a.debugInfo(b, this), this.currentFileInfo, this.index), c.add(this.value.trim())
          },
          toCSS: a.toCSS,
          isSilent: function (a) {
            var b = this.currentFileInfo && this.currentFileInfo.reference && !this.isReferenced,
              c = a.compress && !this.value.match(/^\/\*!/);
            return this.silent || b || c
          },
          eval: function () {
            return this
          },
          markReferenced: function () {
            this.isReferenced = !0
          }
        }
      }(c("../tree")),
      function (a) {
        a.Condition = function (a, b, c, d, e) {
          this.op = a.trim(), this.lvalue = b, this.rvalue = c, this.index = d, this.negate = e
        }, a.Condition.prototype = {
          type: "Condition",
          accept: function (a) {
            this.lvalue = a.visit(this.lvalue), this.rvalue = a.visit(this.rvalue)
          },
          eval: function (a) {
            var b, c = this.lvalue.eval(a),
              d = this.rvalue.eval(a),
              e = this.index;
            return b = function (a) {
              switch (a) {
              case "and":
                return c && d;
              case "or":
                return c || d;
              default:
                if (c.compare) b = c.compare(d);
                else {
                  if (!d.compare) throw {
                    type: "Type",
                    message: "Unable to perform comparison",
                    index: e
                  };
                  b = d.compare(c)
                }
                switch (b) {
                case -1:
                  return "<" === a || "=<" === a || "<=" === a;
                case 0:
                  return "=" === a || ">=" === a || "=<" === a || "<=" === a;
                case 1:
                  return ">" === a || ">=" === a
                }
              }
            }(this.op), this.negate ? !b : b
          }
        }
      }(c("../tree")),
      function (a) {
        a.DetachedRuleset = function (a, b) {
          this.ruleset = a, this.frames = b
        }, a.DetachedRuleset.prototype = {
          type: "DetachedRuleset",
          accept: function (a) {
            this.ruleset = a.visit(this.ruleset)
          },
          eval: function (b) {
            var c = this.frames || b.frames.slice(0);
            return new a.DetachedRuleset(this.ruleset, c)
          },
          callEval: function (b) {
            return this.ruleset.eval(this.frames ? new a.evalEnv(b, this.frames.concat(b.frames)) : b)
          }
        }
      }(c("../tree")),
      function (a) {
        a.Dimension = function (c, d) {
          this.value = parseFloat(c), this.unit = d && d instanceof a.Unit ? d : new a.Unit(d ? [d] : b)
        }, a.Dimension.prototype = {
          type: "Dimension",
          accept: function (a) {
            this.unit = a.visit(this.unit)
          },
          eval: function () {
            return this
          },
          toColor: function () {
            return new a.Color([this.value, this.value, this.value])
          },
          genCSS: function (b, c) {
            if (b && b.strictUnits && !this.unit.isSingular()) throw new Error("Multiple units in dimension. Correct the units or use the unit function. Bad unit: " + this.unit.toString());
            var d = a.fround(b, this.value),
              e = String(d);
            if (0 !== d && 1e-6 > d && d > -1e-6 && (e = d.toFixed(20).replace(/0+$/, "")), b && b.compress) {
              if (0 === d && this.unit.isLength()) return void c.add(e);
              d > 0 && 1 > d && (e = e.substr(1))
            }
            c.add(e), this.unit.genCSS(b, c)
          },
          toCSS: a.toCSS,
          operate: function (b, c, d) {
            var e = a.operate(b, c, this.value, d.value),
              f = this.unit.clone();
            if ("+" === c || "-" === c)
              if (0 === f.numerator.length && 0 === f.denominator.length) f.numerator = d.unit.numerator.slice(0), f.denominator = d.unit.denominator.slice(0);
              else if (0 === d.unit.numerator.length && 0 === f.denominator.length);
            else {
              if (d = d.convertTo(this.unit.usedUnits()), b.strictUnits && d.unit.toString() !== f.toString()) throw new Error("Incompatible units. Change the units or use the unit function. Bad units: '" + f.toString() + "' and '" + d.unit.toString() + "'.");
              e = a.operate(b, c, this.value, d.value)
            } else "*" === c ? (f.numerator = f.numerator.concat(d.unit.numerator).sort(), f.denominator = f.denominator.concat(d.unit.denominator).sort(), f.cancel()) : "/" === c && (f.numerator = f.numerator.concat(d.unit.denominator).sort(), f.denominator = f.denominator.concat(d.unit.numerator).sort(), f.cancel());
            return new a.Dimension(e, f)
          },
          compare: function (b) {
            if (b instanceof a.Dimension) {
              var c, d, e, f;
              if (this.unit.isEmpty() || b.unit.isEmpty()) c = this, d = b;
              else if (c = this.unify(), d = b.unify(), 0 !== c.unit.compare(d.unit)) return -1;
              return e = c.value, f = d.value, f > e ? -1 : e > f ? 1 : 0
            }
            return -1
          },
          unify: function () {
            return this.convertTo({
              length: "px",
              duration: "s",
              angle: "rad"
            })
          },
          convertTo: function (b) {
            var c, d, e, f, g, h = this.value,
              i = this.unit.clone(),
              j = {};
            if ("string" == typeof b) {
              for (c in a.UnitConversions) a.UnitConversions[c].hasOwnProperty(b) && (j = {}, j[c] = b);
              b = j
            }
            g = function (a, b) {
              return e.hasOwnProperty(a) ? (b ? h /= e[a] / e[f] : h *= e[a] / e[f], f) : a
            };
            for (d in b) b.hasOwnProperty(d) && (f = b[d], e = a.UnitConversions[d], i.map(g));
            return i.cancel(), new a.Dimension(h, i)
          }
        }, a.UnitConversions = {
          length: {
            m: 1,
            cm: .01,
            mm: .001,
            "in": .0254,
            px: .0254 / 96,
            pt: .0254 / 72,
            pc: .0254 / 72 * 12
          },
          duration: {
            s: 1,
            ms: .001
          },
          angle: {
            rad: 1 / (2 * Math.PI),
            deg: 1 / 360,
            grad: .0025,
            turn: 1
          }
        }, a.Unit = function (a, b, c) {
          this.numerator = a ? a.slice(0).sort() : [], this.denominator = b ? b.slice(0).sort() : [], this.backupUnit = c
        }, a.Unit.prototype = {
          type: "Unit",
          clone: function () {
            return new a.Unit(this.numerator.slice(0), this.denominator.slice(0), this.backupUnit)
          },
          genCSS: function (a, b) {
            this.numerator.length >= 1 ? b.add(this.numerator[0]) : this.denominator.length >= 1 ? b.add(this.denominator[0]) : a && a.strictUnits || !this.backupUnit || b.add(this.backupUnit)
          },
          toCSS: a.toCSS,
          toString: function () {
            var a, b = this.numerator.join("*");
            for (a = 0; a < this.denominator.length; a++) b += "/" + this.denominator[a];
            return b
          },
          compare: function (a) {
            return this.is(a.toString()) ? 0 : -1
          },
          is: function (a) {
            return this.toString() === a
          },
          isLength: function () {
            return Boolean(this.toCSS().match(/px|em|%|in|cm|mm|pc|pt|ex/))
          },
          isEmpty: function () {
            return 0 === this.numerator.length && 0 === this.denominator.length
          },
          isSingular: function () {
            return this.numerator.length <= 1 && 0 === this.denominator.length
          },
          map: function (a) {
            var b;
            for (b = 0; b < this.numerator.length; b++) this.numerator[b] = a(this.numerator[b], !1);
            for (b = 0; b < this.denominator.length; b++) this.denominator[b] = a(this.denominator[b], !0)
          },
          usedUnits: function () {
            var b, c, d = {};
            c = function (a) {
              return b.hasOwnProperty(a) && !d[e] && (d[e] = a), a
            };
            for (var e in a.UnitConversions) a.UnitConversions.hasOwnProperty(e) && (b = a.UnitConversions[e], this.map(c));
            return d
          },
          cancel: function () {
            var a, b, c, d = {};
            for (b = 0; b < this.numerator.length; b++) a = this.numerator[b], c || (c = a), d[a] = (d[a] || 0) + 1;
            for (b = 0; b < this.denominator.length; b++) a = this.denominator[b], c || (c = a), d[a] = (d[a] || 0) - 1;
            this.numerator = [], this.denominator = [];
            for (a in d)
              if (d.hasOwnProperty(a)) {
                var e = d[a];
                if (e > 0)
                  for (b = 0; e > b; b++) this.numerator.push(a);
                else if (0 > e)
                  for (b = 0; - e > b; b++) this.denominator.push(a)
              }
            0 === this.numerator.length && 0 === this.denominator.length && c && (this.backupUnit = c), this.numerator.sort(), this.denominator.sort()
          }
        }
      }(c("../tree")),
      function (a) {
        a.Directive = function (a, b, c, d, e, f) {
          this.name = a, this.value = b, c && (this.rules = c, this.rules.allowImports = !0), this.index = d, this.currentFileInfo = e, this.debugInfo = f
        }, a.Directive.prototype = {
          type: "Directive",
          accept: function (a) {
            var b = this.value,
              c = this.rules;
            c && (c = a.visit(c)), b && (b = a.visit(b))
          },
          isRulesetLike: function () {
            return !this.isCharset()
          },
          isCharset: function () {
            return "@charset" === this.name
          },
          genCSS: function (b, c) {
            var d = this.value,
              e = this.rules;
            c.add(this.name, this.currentFileInfo, this.index), d && (c.add(" "), d.genCSS(b, c)), e ? a.outputRuleset(b, c, [e]) : c.add(";")
          },
          toCSS: a.toCSS,
          eval: function (b) {
            var c = this.value,
              d = this.rules;
            return c && (c = c.eval(b)), d && (d = d.eval(b), d.root = !0), new a.Directive(this.name, c, d, this.index, this.currentFileInfo, this.debugInfo)
          },
          variable: function (b) {
            return this.rules ? a.Ruleset.prototype.variable.call(this.rules, b) : void 0
          },
          find: function () {
            return this.rules ? a.Ruleset.prototype.find.apply(this.rules, arguments) : void 0
          },
          rulesets: function () {
            return this.rules ? a.Ruleset.prototype.rulesets.apply(this.rules) : void 0
          },
          markReferenced: function () {
            var a, b;
            if (this.isReferenced = !0, this.rules)
              for (b = this.rules.rules, a = 0; a < b.length; a++) b[a].markReferenced && b[a].markReferenced()
          }
        }
      }(c("../tree")),
      function (a) {
        a.Element = function (b, c, d, e) {
          this.combinator = b instanceof a.Combinator ? b : new a.Combinator(b), this.value = "string" == typeof c ? c.trim() : c ? c : "", this.index = d, this.currentFileInfo = e
        }, a.Element.prototype = {
          type: "Element",
          accept: function (a) {
            var b = this.value;
            this.combinator = a.visit(this.combinator), "object" == typeof b && (this.value = a.visit(b))
          },
          eval: function (b) {
            return new a.Element(this.combinator, this.value.eval ? this.value.eval(b) : this.value, this.index, this.currentFileInfo)
          },
          genCSS: function (a, b) {
            b.add(this.toCSS(a), this.currentFileInfo, this.index)
          },
          toCSS: function (a) {
            var b = this.value.toCSS ? this.value.toCSS(a) : this.value;
            return "" === b && "&" === this.combinator.value.charAt(0) ? "" : this.combinator.toCSS(a || {}) + b
          }
        }, a.Attribute = function (a, b, c) {
          this.key = a, this.op = b, this.value = c
        }, a.Attribute.prototype = {
          type: "Attribute",
          eval: function (b) {
            return new a.Attribute(this.key.eval ? this.key.eval(b) : this.key, this.op, this.value && this.value.eval ? this.value.eval(b) : this.value)
          },
          genCSS: function (a, b) {
            b.add(this.toCSS(a))
          },
          toCSS: function (a) {
            var b = this.key.toCSS ? this.key.toCSS(a) : this.key;
            return this.op && (b += this.op, b += this.value.toCSS ? this.value.toCSS(a) : this.value), "[" + b + "]"
          }
        }, a.Combinator = function (a) {
          this.value = " " === a ? " " : a ? a.trim() : ""
        }, a.Combinator.prototype = {
          type: "Combinator",
          _noSpaceCombinators: {
            "": !0,
            " ": !0,
            "|": !0
          },
          genCSS: function (a, b) {
            var c = a.compress || this._noSpaceCombinators[this.value] ? "" : " ";
            b.add(c + this.value + c)
          },
          toCSS: a.toCSS
        }
      }(c("../tree")),
      function (a) {
        a.Expression = function (a) {
          this.value = a
        }, a.Expression.prototype = {
          type: "Expression",
          accept: function (a) {
            this.value && (this.value = a.visitArray(this.value))
          },
          eval: function (b) {
            var c, d = this.parens && !this.parensInOp,
              e = !1;
            return d && b.inParenthesis(), this.value.length > 1 ? c = new a.Expression(this.value.map(function (a) {
              return a.eval(b)
            })) : 1 === this.value.length ? (this.value[0].parens && !this.value[0].parensInOp && (e = !0), c = this.value[0].eval(b)) : c = this, d && b.outOfParenthesis(), this.parens && this.parensInOp && !b.isMathOn() && !e && (c = new a.Paren(c)), c
          },
          genCSS: function (a, b) {
            for (var c = 0; c < this.value.length; c++) this.value[c].genCSS(a, b), c + 1 < this.value.length && b.add(" ")
          },
          toCSS: a.toCSS,
          throwAwayComments: function () {
            this.value = this.value.filter(function (b) {
              return !(b instanceof a.Comment)
            })
          }
        }
      }(c("../tree")),
      function (a) {
        a.Extend = function (b, c, d) {
          switch (this.selector = b, this.option = c, this.index = d, this.object_id = a.Extend.next_id++, this.parent_ids = [this.object_id], c) {
          case "all":
            this.allowBefore = !0, this.allowAfter = !0;
            break;
          default:
            this.allowBefore = !1, this.allowAfter = !1
          }
        }, a.Extend.next_id = 0, a.Extend.prototype = {
          type: "Extend",
          accept: function (a) {
            this.selector = a.visit(this.selector)
          },
          eval: function (b) {
            return new a.Extend(this.selector.eval(b), this.option, this.index)
          },
          clone: function () {
            return new a.Extend(this.selector, this.option, this.index)
          },
          findSelfSelectors: function (a) {
            var b, c, d = [];
            for (b = 0; b < a.length; b++) c = a[b].elements, b > 0 && c.length && "" === c[0].combinator.value && (c[0].combinator.value = " "), d = d.concat(a[b].elements);
            this.selfSelectors = [{
              elements: d
            }]
          }
        }
      }(c("../tree")),
      function (a) {
        a.Import = function (a, c, d, e, f) {
          if (this.options = d, this.index = e, this.path = a, this.features = c, this.currentFileInfo = f, this.options.less !== b || this.options.inline) this.css = !this.options.less || this.options.inline;
          else {
            var g = this.getPath();
            g && /css([\?;].*)?$/.test(g) && (this.css = !0)
          }
        }, a.Import.prototype = {
          type: "Import",
          accept: function (a) {
            this.features && (this.features = a.visit(this.features)), this.path = a.visit(this.path), !this.options.inline && this.root && (this.root = a.visit(this.root))
          },
          genCSS: function (a, b) {
            this.css && (b.add("@import ", this.currentFileInfo, this.index), this.path.genCSS(a, b), this.features && (b.add(" "), this.features.genCSS(a, b)), b.add(";"))
          },
          toCSS: a.toCSS,
          getPath: function () {
            if (this.path instanceof a.Quoted) {
              var c = this.path.value;
              return this.css !== b || /(\.[a-z]*$)|([\?;].*)$/.test(c) ? c : c + ".less"
            }
            return this.path instanceof a.URL ? this.path.value.value : null
          },
          evalForImport: function (b) {
            return new a.Import(this.path.eval(b), this.features, this.options, this.index, this.currentFileInfo)
          },
          evalPath: function (b) {
            var c = this.path.eval(b),
              d = this.currentFileInfo && this.currentFileInfo.rootpath;
            if (!(c instanceof a.URL)) {
              if (d) {
                var e = c.value;
                e && b.isPathRelative(e) && (c.value = d + e)
              }
              c.value = b.normalizePath(c.value)
            }
            return c
          },
          eval: function (b) {
            var c, d = this.features && this.features.eval(b);
            if (this.skip && ("function" == typeof this.skip && (this.skip = this.skip()), this.skip)) return [];
            if (this.options.inline) {
              var e = new a.Anonymous(this.root, 0, {
                filename: this.importedFilename
              }, !0, !0);
              return this.features ? new a.Media([e], this.features.value) : [e]
            }
            if (this.css) {
              var f = new a.Import(this.evalPath(b), d, this.options, this.index);
              if (!f.css && this.error) throw this.error;
              return f
            }
            return c = new a.Ruleset(null, this.root.rules.slice(0)), c.evalImports(b), this.features ? new a.Media(c.rules, this.features.value) : c.rules
          }
        }
      }(c("../tree")),
      function (a) {
        a.JavaScript = function (a, b, c) {
          this.escaped = c, this.expression = a, this.index = b
        }, a.JavaScript.prototype = {
          type: "JavaScript",
          eval: function (b) {
            var c, d = this,
              e = {},
              f = this.expression.replace(/@\{([\w-]+)\}/g, function (c, e) {
                return a.jsify(new a.Variable("@" + e, d.index).eval(b))
              });
            try {
              f = new Function("return (" + f + ")")
            } catch (g) {
              throw {
                message: "JavaScript evaluation error: " + g.message + " from `" + f + "`",
                index: this.index
              }
            }
            var h = b.frames[0].variables();
            for (var i in h) h.hasOwnProperty(i) && (e[i.slice(1)] = {
              value: h[i].value,
              toJS: function () {
                return this.value.eval(b).toCSS()
              }
            });
            try {
              c = f.call(e)
            } catch (g) {
              throw {
                message: "JavaScript evaluation error: '" + g.name + ": " + g.message.replace(/["]/g, "'") + "'",
                index: this.index
              }
            }
            return "number" == typeof c ? new a.Dimension(c) : "string" == typeof c ? new a.Quoted('"' + c + '"', c, this.escaped, this.index) : new a.Anonymous(Array.isArray(c) ? c.join(", ") : c)
          }
        }
      }(c("../tree")),
      function (a) {
        a.Keyword = function (a) {
          this.value = a
        }, a.Keyword.prototype = {
          type: "Keyword",
          eval: function () {
            return this
          },
          genCSS: function (a, b) {
            if ("%" === this.value) throw {
              type: "Syntax",
              message: "Invalid % without number"
            };
            b.add(this.value)
          },
          toCSS: a.toCSS,
          compare: function (b) {
            return b instanceof a.Keyword ? b.value === this.value ? 0 : 1 : -1
          }
        }, a.True = new a.Keyword("true"), a.False = new a.Keyword("false")
      }(c("../tree")),
      function (a) {
        a.Media = function (b, c, d, e) {
          this.index = d, this.currentFileInfo = e;
          var f = this.emptySelectors();
          this.features = new a.Value(c), this.rules = [new a.Ruleset(f, b)], this.rules[0].allowImports = !0
        }, a.Media.prototype = {
          type: "Media",
          accept: function (a) {
            this.features && (this.features = a.visit(this.features)), this.rules && (this.rules = a.visitArray(this.rules))
          },
          genCSS: function (b, c) {
            c.add("@media ", this.currentFileInfo, this.index), this.features.genCSS(b, c), a.outputRuleset(b, c, this.rules)
          },
          toCSS: a.toCSS,
          eval: function (b) {
            b.mediaBlocks || (b.mediaBlocks = [], b.mediaPath = []);
            var c = new a.Media(null, [], this.index, this.currentFileInfo);
            this.debugInfo && (this.rules[0].debugInfo = this.debugInfo, c.debugInfo = this.debugInfo);
            var d = !1;
            b.strictMath || (d = !0, b.strictMath = !0);
            try {
              c.features = this.features.eval(b)
            } finally {
              d && (b.strictMath = !1)
            }
            return b.mediaPath.push(c), b.mediaBlocks.push(c), b.frames.unshift(this.rules[0]), c.rules = [this.rules[0].eval(b)], b.frames.shift(), b.mediaPath.pop(), 0 === b.mediaPath.length ? c.evalTop(b) : c.evalNested(b)
          },
          variable: function (b) {
            return a.Ruleset.prototype.variable.call(this.rules[0], b)
          },
          find: function () {
            return a.Ruleset.prototype.find.apply(this.rules[0], arguments)
          },
          rulesets: function () {
            return a.Ruleset.prototype.rulesets.apply(this.rules[0])
          },
          emptySelectors: function () {
            var b = new a.Element("", "&", this.index, this.currentFileInfo),
              c = [new a.Selector([b], null, null, this.index, this.currentFileInfo)];
            return c[0].mediaEmpty = !0, c
          },
          markReferenced: function () {
            var a, b = this.rules[0].rules;
            for (this.rules[0].markReferenced(), this.isReferenced = !0, a = 0; a < b.length; a++) b[a].markReferenced && b[a].markReferenced()
          },
          evalTop: function (b) {
            var c = this;
            if (b.mediaBlocks.length > 1) {
              var d = this.emptySelectors();
              c = new a.Ruleset(d, b.mediaBlocks), c.multiMedia = !0
            }
            return delete b.mediaBlocks, delete b.mediaPath, c
          },
          evalNested: function (b) {
            var c, d, e = b.mediaPath.concat([this]);
            for (c = 0; c < e.length; c++) d = e[c].features instanceof a.Value ? e[c].features.value : e[c].features, e[c] = Array.isArray(d) ? d : [d];
            return this.features = new a.Value(this.permute(e).map(function (b) {
              for (b = b.map(function (b) {
                  return b.toCSS ? b : new a.Anonymous(b)
                }), c = b.length - 1; c > 0; c--) b.splice(c, 0, new a.Anonymous("and"));
              return new a.Expression(b)
            })), new a.Ruleset([], [])
          },
          permute: function (a) {
            if (0 === a.length) return [];
            if (1 === a.length) return a[0];
            for (var b = [], c = this.permute(a.slice(1)), d = 0; d < c.length; d++)
              for (var e = 0; e < a[0].length; e++) b.push([a[0][e]].concat(c[d]));
            return b
          },
          bubbleSelectors: function (b) {
            b && (this.rules = [new a.Ruleset(b.slice(0), [this.rules[0]])])
          }
        }
      }(c("../tree")),
      function (a) {
        a.mixin = {}, a.mixin.Call = function (b, c, d, e, f) {
          this.selector = new a.Selector(b), this.arguments = c && c.length ? c : null, this.index = d, this.currentFileInfo = e, this.important = f
        }, a.mixin.Call.prototype = {
          type: "MixinCall",
          accept: function (a) {
            this.selector && (this.selector = a.visit(this.selector)), this.arguments && (this.arguments = a.visitArray(this.arguments))
          },
          eval: function (b) {
            var c, d, e, f, g, h, i, j, k, l, m, n, o, p = [],
              q = !1,
              r = [],
              s = [],
              t = a.defaultFunc,
              u = 0,
              v = 1,
              w = 2;
            for (e = this.arguments && this.arguments.map(function (a) {
                return {
                  name: a.name,
                  value: a.value.eval(b)
                }
              }), f = 0; f < b.frames.length; f++)
              if ((c = b.frames[f].find(this.selector)).length > 0) {
                for (j = !0, g = 0; g < c.length; g++) {
                  for (d = c[g], i = !1, h = 0; h < b.frames.length; h++)
                    if (!(d instanceof a.mixin.Definition) && d === (b.frames[h].originalRuleset || b.frames[h])) {
                      i = !0;
                      break
                    }
                  if (!i && d.matchArgs(e, b)) {
                    if (l = {
                        mixin: d,
                        group: u
                      }, d.matchCondition) {
                      for (h = 0; 2 > h; h++) t.value(h), s[h] = d.matchCondition(e, b);
                      (s[0] || s[1]) && (s[0] != s[1] && (l.group = s[1] ? v : w), r.push(l))
                    } else r.push(l);
                    q = !0
                  }
                }
                for (t.reset(), n = [0, 0, 0], g = 0; g < r.length; g++) n[r[g].group] ++;
                if (n[u] > 0) m = w;
                else if (m = v, n[v] + n[w] > 1) throw {
                  type: "Runtime",
                  message: "Ambiguous use of `default()` found when matching for `" + this.format(e) + "`",
                  index: this.index,
                  filename: this.currentFileInfo.filename
                };
                for (g = 0; g < r.length; g++)
                  if (l = r[g].group, l === u || l === m) try {
                    d = r[g].mixin, d instanceof a.mixin.Definition || (o = d.originalRuleset || d, d = new a.mixin.Definition("", [], d.rules, null, !1), d.originalRuleset = o), Array.prototype.push.apply(p, d.evalCall(b, e, this.important).rules)
                  } catch (x) {
                    throw {
                      message: x.message,
                      index: this.index,
                      filename: this.currentFileInfo.filename,
                      stack: x.stack
                    }
                  }
                  if (q) {
                    if (!this.currentFileInfo || !this.currentFileInfo.reference)
                      for (f = 0; f < p.length; f++) k = p[f], k.markReferenced && k.markReferenced();
                    return p
                  }
              }
            throw j ? {
              type: "Runtime",
              message: "No matching definition was found for `" + this.format(e) + "`",
              index: this.index,
              filename: this.currentFileInfo.filename
            } : {
              type: "Name",
              message: this.selector.toCSS().trim() + " is undefined",
              index: this.index,
              filename: this.currentFileInfo.filename
            }
          },
          format: function (a) {
            return this.selector.toCSS().trim() + "(" + (a ? a.map(function (a) {
              var b = "";
              return a.name && (b += a.name + ":"), b += a.value.toCSS ? a.value.toCSS() : "???"
            }).join(", ") : "") + ")"
          }
        }, a.mixin.Definition = function (b, c, d, e, f, g) {
          this.name = b, this.selectors = [new a.Selector([new a.Element(null, b, this.index, this.currentFileInfo)])], this.params = c, this.condition = e, this.variadic = f, this.arity = c.length, this.rules = d, this._lookups = {}, this.required = c.reduce(function (a, b) {
            return !b.name || b.name && !b.value ? a + 1 : a
          }, 0), this.parent = a.Ruleset.prototype, this.frames = g
        }, a.mixin.Definition.prototype = {
          type: "MixinDefinition",
          accept: function (a) {
            this.params && this.params.length && (this.params = a.visitArray(this.params)), this.rules = a.visitArray(this.rules), this.condition && (this.condition = a.visit(this.condition))
          },
          variable: function (a) {
            return this.parent.variable.call(this, a)
          },
          variables: function () {
            return this.parent.variables.call(this)
          },
          find: function () {
            return this.parent.find.apply(this, arguments)
          },
          rulesets: function () {
            return this.parent.rulesets.apply(this)
          },
          evalParams: function (b, c, d, e) {
            var f, g, h, i, j, k, l, m, n = new a.Ruleset(null, null),
              o = this.params.slice(0),
              p = 0;
            if (c = new a.evalEnv(c, [n].concat(c.frames)), d)
              for (d = d.slice(0), p = d.length, h = 0; p > h; h++)
                if (g = d[h], k = g && g.name) {
                  for (l = !1, i = 0; i < o.length; i++)
                    if (!e[i] && k === o[i].name) {
                      e[i] = g.value.eval(b), n.prependRule(new a.Rule(k, g.value.eval(b))), l = !0;
                      break
                    }
                  if (l) {
                    d.splice(h, 1), h--;
                    continue
                  }
                  throw {
                    type: "Runtime",
                    message: "Named argument for " + this.name + " " + d[h].name + " not found"
                  }
                }
            for (m = 0, h = 0; h < o.length; h++)
              if (!e[h]) {
                if (g = d && d[m], k = o[h].name)
                  if (o[h].variadic) {
                    for (f = [], i = m; p > i; i++) f.push(d[i].value.eval(b));
                    n.prependRule(new a.Rule(k, new a.Expression(f).eval(b)))
                  } else {
                    if (j = g && g.value) j = j.eval(b);
                    else {
                      if (!o[h].value) throw {
                        type: "Runtime",
                        message: "wrong number of arguments for " + this.name + " (" + p + " for " + this.arity + ")"
                      };
                      j = o[h].value.eval(c), n.resetCache()
                    }
                    n.prependRule(new a.Rule(k, j)), e[h] = j
                  }
                if (o[h].variadic && d)
                  for (i = m; p > i; i++) e[i] = d[i].value.eval(b);
                m++
              }
            return n
          },
          eval: function (b) {
            return new a.mixin.Definition(this.name, this.params, this.rules, this.condition, this.variadic, this.frames || b.frames.slice(0))
          },
          evalCall: function (b, c, d) {
            var e, f, g = [],
              h = this.frames ? this.frames.concat(b.frames) : b.frames,
              i = this.evalParams(b, new a.evalEnv(b, h), c, g);
            return i.prependRule(new a.Rule("@arguments", new a.Expression(g).eval(b))), e = this.rules.slice(0), f = new a.Ruleset(null, e), f.originalRuleset = this, f = f.eval(new a.evalEnv(b, [this, i].concat(h))), d && (f = this.parent.makeImportant.apply(f)), f
          },
          matchCondition: function (b, c) {
            return this.condition && !this.condition.eval(new a.evalEnv(c, [this.evalParams(c, new a.evalEnv(c, this.frames ? this.frames.concat(c.frames) : c.frames), b, [])].concat(this.frames).concat(c.frames))) ? !1 : !0
          },
          matchArgs: function (a, b) {
            var c, d = a && a.length || 0;
            if (this.variadic) {
              if (d < this.required - 1) return !1
            } else {
              if (d < this.required) return !1;
              if (d > this.params.length) return !1
            }
            c = Math.min(d, this.arity);
            for (var e = 0; c > e; e++)
              if (!this.params[e].name && !this.params[e].variadic && a[e].value.eval(b).toCSS() != this.params[e].value.eval(b).toCSS()) return !1;
            return !0
          }
        }
      }(c("../tree")),
      function (a) {
        a.Negative = function (a) {
          this.value = a
        }, a.Negative.prototype = {
          type: "Negative",
          accept: function (a) {
            this.value = a.visit(this.value)
          },
          genCSS: function (a, b) {
            b.add("-"), this.value.genCSS(a, b)
          },
          toCSS: a.toCSS,
          eval: function (b) {
            return b.isMathOn() ? new a.Operation("*", [new a.Dimension(-1), this.value]).eval(b) : new a.Negative(this.value.eval(b))
          }
        }
      }(c("../tree")),
      function (a) {
        a.Operation = function (a, b, c) {
          this.op = a.trim(), this.operands = b, this.isSpaced = c
        }, a.Operation.prototype = {
          type: "Operation",
          accept: function (a) {
            this.operands = a.visit(this.operands)
          },
          eval: function (b) {
            var c = this.operands[0].eval(b),
              d = this.operands[1].eval(b);
            if (b.isMathOn()) {
              if (c instanceof a.Dimension && d instanceof a.Color && (c = c.toColor()), d instanceof a.Dimension && c instanceof a.Color && (d = d.toColor()), !c.operate) throw {
                type: "Operation",
                message: "Operation on an invalid type"
              };
              return c.operate(b, this.op, d)
            }
            return new a.Operation(this.op, [c, d], this.isSpaced)
          },
          genCSS: function (a, b) {
            this.operands[0].genCSS(a, b), this.isSpaced && b.add(" "), b.add(this.op), this.isSpaced && b.add(" "), this.operands[1].genCSS(a, b)
          },
          toCSS: a.toCSS
        }, a.operate = function (a, b, c, d) {
          switch (b) {
          case "+":
            return c + d;
          case "-":
            return c - d;
          case "*":
            return c * d;
          case "/":
            return c / d
          }
        }
      }(c("../tree")),
      function (a) {
        a.Paren = function (a) {
          this.value = a
        }, a.Paren.prototype = {
          type: "Paren",
          accept: function (a) {
            this.value = a.visit(this.value)
          },
          genCSS: function (a, b) {
            b.add("("), this.value.genCSS(a, b), b.add(")")
          },
          toCSS: a.toCSS,
          eval: function (b) {
            return new a.Paren(this.value.eval(b))
          }
        }
      }(c("../tree")),
      function (a) {
        a.Quoted = function (a, b, c, d, e) {
          this.escaped = c, this.value = b || "", this.quote = a.charAt(0), this.index = d, this.currentFileInfo = e
        }, a.Quoted.prototype = {
          type: "Quoted",
          genCSS: function (a, b) {
            this.escaped || b.add(this.quote, this.currentFileInfo, this.index), b.add(this.value), this.escaped || b.add(this.quote)
          },
          toCSS: a.toCSS,
          eval: function (b) {
            var c = this,
              d = this.value.replace(/`([^`]+)`/g, function (d, e) {
                return new a.JavaScript(e, c.index, !0).eval(b).value
              }).replace(/@\{([\w-]+)\}/g, function (d, e) {
                var f = new a.Variable("@" + e, c.index, c.currentFileInfo).eval(b, !0);
                return f instanceof a.Quoted ? f.value : f.toCSS()
              });
            return new a.Quoted(this.quote + d + this.quote, d, this.escaped, this.index, this.currentFileInfo)
          },
          compare: function (a) {
            if (!a.toCSS) return -1;
            var b, c;
            return "Quoted" !== a.type || this.escaped || a.escaped ? (b = this.toCSS(), c = a.toCSS()) : (b = a.value, c = this.value), b === c ? 0 : c > b ? -1 : 1
          }
        }
      }(c("../tree")),
      function (a) {
        function c(a, b) {
          var c, d = "",
            e = b.length,
            f = {
              add: function (a) {
                d += a
              }
            };
          for (c = 0; e > c; c++) b[c].eval(a).genCSS(a, f);
          return d
        }
        a.Rule = function (c, d, e, f, g, h, i, j) {
          this.name = c, this.value = d instanceof a.Value || d instanceof a.Ruleset ? d : new a.Value([d]), this.important = e ? " " + e.trim() : "", this.merge = f, this.index = g, this.currentFileInfo = h, this.inline = i || !1, this.variable = j !== b ? j : c.charAt && "@" === c.charAt(0)
        }, a.Rule.prototype = {
          type: "Rule",
          accept: function (a) {
            this.value = a.visit(this.value)
          },
          genCSS: function (a, b) {
            b.add(this.name + (a.compress ? ":" : ": "), this.currentFileInfo, this.index);
            try {
              this.value.genCSS(a, b)
            } catch (c) {
              throw c.index = this.index, c.filename = this.currentFileInfo.filename, c
            }
            b.add(this.important + (this.inline || a.lastRule && a.compress ? "" : ";"), this.currentFileInfo, this.index)
          },
          toCSS: a.toCSS,
          eval: function (b) {
            var d, e = !1,
              f = this.name,
              g = this.variable;
            "string" != typeof f && (f = 1 === f.length && f[0] instanceof a.Keyword ? f[0].value : c(b, f), g = !1), "font" !== f || b.strictMath || (e = !0, b.strictMath = !0);
            try {
              if (d = this.value.eval(b), !this.variable && "DetachedRuleset" === d.type) throw {
                message: "Rulesets cannot be evaluated on a property.",
                index: this.index,
                filename: this.currentFileInfo.filename
              };
              return new a.Rule(f, d, this.important, this.merge, this.index, this.currentFileInfo, this.inline, g)
            } catch (h) {
              throw "number" != typeof h.index && (h.index = this.index, h.filename = this.currentFileInfo.filename), h
            } finally {
              e && (b.strictMath = !1)
            }
          },
          makeImportant: function () {
            return new a.Rule(this.name, this.value, "!important", this.merge, this.index, this.currentFileInfo, this.inline)
          }
        }
      }(c("../tree")),
      function (a) {
        a.RulesetCall = function (a) {
          this.variable = a
        }, a.RulesetCall.prototype = {
          type: "RulesetCall",
          accept: function () {},
          eval: function (b) {
            var c = new a.Variable(this.variable).eval(b);
            return c.callEval(b)
          }
        }
      }(c("../tree")),
      function (a) {
        a.Ruleset = function (a, b, c) {
          this.selectors = a, this.rules = b, this._lookups = {}, this.strictImports = c
        }, a.Ruleset.prototype = {
          type: "Ruleset",
          accept: function (a) {
            this.paths ? a.visitArray(this.paths, !0) : this.selectors && (this.selectors = a.visitArray(this.selectors)), this.rules && this.rules.length && (this.rules = a.visitArray(this.rules))
          },
          eval: function (b) {
            var c, d, e, f, g = this.selectors,
              h = a.defaultFunc,
              i = !1;
            if (g && (d = g.length)) {
              for (c = [], h.error({
                  type: "Syntax",
                  message: "it is currently only allowed in parametric mixin guards,"
                }), f = 0; d > f; f++) e = g[f].eval(b), c.push(e), e.evaldCondition && (i = !0);
              h.reset()
            } else i = !0;
            var j, k, l = this.rules ? this.rules.slice(0) : null,
              m = new a.Ruleset(c, l, this.strictImports);
            m.originalRuleset = this, m.root = this.root, m.firstRoot = this.firstRoot, m.allowImports = this.allowImports, this.debugInfo && (m.debugInfo = this.debugInfo), i || (l.length = 0);
            var n = b.frames;
            n.unshift(m);
            var o = b.selectors;
            o || (b.selectors = o = []), o.unshift(this.selectors), (m.root || m.allowImports || !m.strictImports) && m.evalImports(b);
            var p = m.rules,
              q = p ? p.length : 0;
            for (f = 0; q > f; f++)(p[f] instanceof a.mixin.Definition || p[f] instanceof a.DetachedRuleset) && (p[f] = p[f].eval(b));
            var r = b.mediaBlocks && b.mediaBlocks.length || 0;
            for (f = 0; q > f; f++) p[f] instanceof a.mixin.Call ? (l = p[f].eval(b).filter(function (b) {
              return b instanceof a.Rule && b.variable ? !m.variable(b.name) : !0
            }), p.splice.apply(p, [f, 1].concat(l)), q += l.length - 1, f += l.length - 1, m.resetCache()) : p[f] instanceof a.RulesetCall && (l = p[f].eval(b).rules.filter(function (b) {
              return b instanceof a.Rule && b.variable ? !1 : !0
            }), p.splice.apply(p, [f, 1].concat(l)), q += l.length - 1, f += l.length - 1, m.resetCache());
            for (f = 0; f < p.length; f++) j = p[f], j instanceof a.mixin.Definition || j instanceof a.DetachedRuleset || (p[f] = j = j.eval ? j.eval(b) : j);
            for (f = 0; f < p.length; f++)
              if (j = p[f], j instanceof a.Ruleset && j.selectors && 1 === j.selectors.length && j.selectors[0].isJustParentSelector()) {
                p.splice(f--, 1);
                for (var s = 0; s < j.rules.length; s++) k = j.rules[s], k instanceof a.Rule && k.variable || p.splice(++f, 0, k)
              }
            if (n.shift(), o.shift(), b.mediaBlocks)
              for (f = r; f < b.mediaBlocks.length; f++) b.mediaBlocks[f].bubbleSelectors(c);
            return m
          },
          evalImports: function (b) {
            var c, d, e = this.rules;
            if (e)
              for (c = 0; c < e.length; c++) e[c] instanceof a.Import && (d = e[c].eval(b), d && d.length ? (e.splice.apply(e, [c, 1].concat(d)), c += d.length - 1) : e.splice(c, 1, d), this.resetCache())
          },
          makeImportant: function () {
            return new a.Ruleset(this.selectors, this.rules.map(function (a) {
              return a.makeImportant ? a.makeImportant() : a
            }), this.strictImports)
          },
          matchArgs: function (a) {
            return !a || 0 === a.length
          },
          matchCondition: function (b, c) {
            var d = this.selectors[this.selectors.length - 1];
            return d.evaldCondition ? d.condition && !d.condition.eval(new a.evalEnv(c, c.frames)) ? !1 : !0 : !1
          },
          resetCache: function () {
            this._rulesets = null, this._variables = null, this._lookups = {}
          },
          variables: function () {
            return this._variables || (this._variables = this.rules ? this.rules.reduce(function (b, c) {
              return c instanceof a.Rule && c.variable === !0 && (b[c.name] = c), b
            }, {}) : {}), this._variables
          },
          variable: function (a) {
            return this.variables()[a]
          },
          rulesets: function () {
            if (!this.rules) return null;
            var b, c, d = a.Ruleset,
              e = a.mixin.Definition,
              f = [],
              g = this.rules,
              h = g.length;
            for (b = 0; h > b; b++) c = g[b], (c instanceof d || c instanceof e) && f.push(c);
            return f
          },
          prependRule: function (a) {
            var b = this.rules;
            b ? b.unshift(a) : this.rules = [a]
          },
          find: function (b, c) {
            c = c || this;
            var d, e = [],
              f = b.toCSS();
            return f in this._lookups ? this._lookups[f] : (this.rulesets().forEach(function (f) {
              if (f !== c)
                for (var g = 0; g < f.selectors.length; g++)
                  if (d = b.match(f.selectors[g])) {
                    b.elements.length > d ? Array.prototype.push.apply(e, f.find(new a.Selector(b.elements.slice(d)), c)) : e.push(f);
                    break
                  }
            }), this._lookups[f] = e, e)
          },
          genCSS: function (b, c) {
            function d(b, c) {
              return b.rules ? !0 : b instanceof a.Media || c && b instanceof a.Comment ? !0 : b instanceof a.Directive || b instanceof a.Anonymous ? b.isRulesetLike() : !1
            }
            var e, f, g, h, i, j, k = [],
              l = [],
              m = [];
            b.tabLevel = b.tabLevel || 0, this.root || b.tabLevel++;
            var n, o = b.compress ? "" : Array(b.tabLevel + 1).join("  "),
              p = b.compress ? "" : Array(b.tabLevel).join("  ");
            for (e = 0; e < this.rules.length; e++) i = this.rules[e], d(i, this.root) ? m.push(i) : i.isCharset && i.isCharset() ? k.push(i) : l.push(i);
            if (l = k.concat(l), !this.root) {
              h = a.debugInfo(b, this, p), h && (c.add(h), c.add(p));
              var q, r = this.paths,
                s = r.length;
              for (n = b.compress ? "," : ",\n" + p, e = 0; s > e; e++)
                if (j = r[e], q = j.length)
                  for (e > 0 && c.add(n), b.firstSelector = !0, j[0].genCSS(b, c), b.firstSelector = !1, f = 1; q > f; f++) j[f].genCSS(b, c);
              c.add((b.compress ? "{" : " {\n") + o)
            }
            for (e = 0; e < l.length; e++) i = l[e], e + 1 !== l.length || this.root && 0 !== m.length && !this.firstRoot || (b.lastRule = !0), i.genCSS ? i.genCSS(b, c) : i.value && c.add(i.value.toString()), b.lastRule ? b.lastRule = !1 : c.add(b.compress ? "" : "\n" + o);
            if (this.root || (c.add(b.compress ? "}" : "\n" + p + "}"), b.tabLevel--), n = (b.compress ? "" : "\n") + (this.root ? o : p), g = m.length)
              for (l.length && n && c.add(n), m[0].genCSS(b, c), e = 1; g > e; e++) n && c.add(n), m[e].genCSS(b, c);
            c.isEmpty() || b.compress || !this.firstRoot || c.add("\n")
          },
          toCSS: a.toCSS,
          markReferenced: function () {
            if (this.selectors)
              for (var a = 0; a < this.selectors.length; a++) this.selectors[a].markReferenced()
          },
          joinSelectors: function (a, b, c) {
            for (var d = 0; d < c.length; d++) this.joinSelector(a, b, c[d])
          },
          joinSelector: function (b, c, d) {
            var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
            for (e = 0; e < d.elements.length; e++) j = d.elements[e], "&" === j.value && (h = !0);
            if (h) {
              for (r = [], i = [[]], e = 0; e < d.elements.length; e++)
                if (j = d.elements[e], "&" !== j.value) r.push(j);
                else {
                  for (s = [], r.length > 0 && this.mergeElementsOnToSelectors(r, i), f = 0; f < i.length; f++)
                    if (k = i[f], 0 === c.length) k.length > 0 && (k[0].elements = k[0].elements.slice(0), k[0].elements.push(new a.Element(j.combinator, "", j.index, j.currentFileInfo))), s.push(k);
                    else
                      for (g = 0; g < c.length; g++) l = c[g], m = [], n = [], p = !0, k.length > 0 ? (m = k.slice(0), q = m.pop(), o = d.createDerived(q.elements.slice(0)), p = !1) : o = d.createDerived([]), l.length > 1 && (n = n.concat(l.slice(1))), l.length > 0 && (p = !1, o.elements.push(new a.Element(j.combinator, l[0].elements[0].value, j.index, j.currentFileInfo)), o.elements = o.elements.concat(l[0].elements.slice(1))), p || m.push(o), m = m.concat(n), s.push(m);
                  i = s, r = []
                }
              for (r.length > 0 && this.mergeElementsOnToSelectors(r, i), e = 0; e < i.length; e++) i[e].length > 0 && b.push(i[e])
            } else if (c.length > 0)
              for (e = 0; e < c.length; e++) b.push(c[e].concat(d));
            else b.push([d])
          },
          mergeElementsOnToSelectors: function (b, c) {
            var d, e;
            if (0 === c.length) return void c.push([new a.Selector(b)]);
            for (d = 0; d < c.length; d++) e = c[d], e.length > 0 ? e[e.length - 1] = e[e.length - 1].createDerived(e[e.length - 1].elements.concat(b)) : e.push(new a.Selector(b))
          }
        }
      }(c("../tree")),
      function (a) {
        a.Selector = function (a, b, c, d, e, f) {
          this.elements = a, this.extendList = b, this.condition = c, this.currentFileInfo = e || {}, this.isReferenced = f, c || (this.evaldCondition = !0)
        }, a.Selector.prototype = {
          type: "Selector",
          accept: function (a) {
            this.elements && (this.elements = a.visitArray(this.elements)), this.extendList && (this.extendList = a.visitArray(this.extendList)), this.condition && (this.condition = a.visit(this.condition))
          },
          createDerived: function (b, c, d) {
            d = null != d ? d : this.evaldCondition;
            var e = new a.Selector(b, c || this.extendList, null, this.index, this.currentFileInfo, this.isReferenced);
            return e.evaldCondition = d, e.mediaEmpty = this.mediaEmpty, e
          },
          match: function (a) {
            var b, c, d = this.elements,
              e = d.length;
            if (a.CacheElements(), b = a._elements.length, 0 === b || b > e) return 0;
            for (c = 0; b > c; c++)
              if (d[c].value !== a._elements[c]) return 0;
            return b
          },
          CacheElements: function () {
            var a, b, c, d = "";
            if (!this._elements) {
              for (a = this.elements.length, c = 0; a > c; c++)
                if (b = this.elements[c], d += b.combinator.value, b.value.value) {
                  if ("string" != typeof b.value.value) {
                    d = "";
                    break
                  }
                  d += b.value.value
                } else d += b.value;
              this._elements = d.match(/[,&#\*\.\w-]([\w-]|(\\.))*/g), this._elements ? "&" === this._elements[0] && this._elements.shift() : this._elements = []
            }
          },
          isJustParentSelector: function () {
            return !this.mediaEmpty && 1 === this.elements.length && "&" === this.elements[0].value && (" " === this.elements[0].combinator.value || "" === this.elements[0].combinator.value)
          },
          eval: function (a) {
            var b = this.condition && this.condition.eval(a),
              c = this.elements,
              d = this.extendList;
            return c = c && c.map(function (b) {
              return b.eval(a)
            }), d = d && d.map(function (b) {
              return b.eval(a)
            }), this.createDerived(c, d, b)
          },
          genCSS: function (a, b) {
            var c, d;
            if (a && a.firstSelector || "" !== this.elements[0].combinator.value || b.add(" ", this.currentFileInfo, this.index), !this._css)
              for (c = 0; c < this.elements.length; c++) d = this.elements[c], d.genCSS(a, b)
          },
          toCSS: a.toCSS,
          markReferenced: function () {
            this.isReferenced = !0
          },
          getIsReferenced: function () {
            return !this.currentFileInfo.reference || this.isReferenced
          },
          getIsOutput: function () {
            return this.evaldCondition
          }
        }
      }(c("../tree")),
      function (a) {
        a.UnicodeDescriptor = function (a) {
          this.value = a
        }, a.UnicodeDescriptor.prototype = {
          type: "UnicodeDescriptor",
          genCSS: function (a, b) {
            b.add(this.value)
          },
          toCSS: a.toCSS,
          eval: function () {
            return this
          }
        }
      }(c("../tree")),
      function (a) {
        a.URL = function (a, b, c) {
          this.value = a, this.currentFileInfo = b, this.isEvald = c
        }, a.URL.prototype = {
          type: "Url",
          accept: function (a) {
            this.value = a.visit(this.value)
          },
          genCSS: function (a, b) {
            b.add("url("), this.value.genCSS(a, b), b.add(")")
          },
          toCSS: a.toCSS,
          eval: function (b) {
            var c, d = this.value.eval(b);
            if (!this.isEvald && (c = this.currentFileInfo && this.currentFileInfo.rootpath, c && "string" == typeof d.value && b.isPathRelative(d.value) && (d.quote || (c = c.replace(/[\(\)'"\s]/g, function (a) {
                return "\\" + a
              })), d.value = c + d.value), d.value = b.normalizePath(d.value), b.urlArgs && !d.value.match(/^\s*data:/))) {
              var e = -1 === d.value.indexOf("?") ? "?" : "&",
                f = e + b.urlArgs; - 1 !== d.value.indexOf("#") ? d.value = d.value.replace("#", f + "#") : d.value += f
            }
            return new a.URL(d, this.currentFileInfo, !0)
          }
        }
      }(c("../tree")),
      function (a) {
        a.Value = function (a) {
          this.value = a
        }, a.Value.prototype = {
          type: "Value",
          accept: function (a) {
            this.value && (this.value = a.visitArray(this.value))
          },
          eval: function (b) {
            return 1 === this.value.length ? this.value[0].eval(b) : new a.Value(this.value.map(function (a) {
              return a.eval(b)
            }))
          },
          genCSS: function (a, b) {
            var c;
            for (c = 0; c < this.value.length; c++) this.value[c].genCSS(a, b), c + 1 < this.value.length && b.add(a && a.compress ? "," : ", ")
          },
          toCSS: a.toCSS
        }
      }(c("../tree")),
      function (a) {
        a.Variable = function (a, b, c) {
          this.name = a, this.index = b, this.currentFileInfo = c || {}
        }, a.Variable.prototype = {
          type: "Variable",
          eval: function (b) {
            var c, d = this.name;
            if (0 === d.indexOf("@@") && (d = "@" + new a.Variable(d.slice(1)).eval(b).value), this.evaluating) throw {
              type: "Name",
              message: "Recursive variable definition for " + d,
              filename: this.currentFileInfo.file,
              index: this.index
            };
            if (this.evaluating = !0, c = a.find(b.frames, function (a) {
                var c = a.variable(d);
                return c ? c.value.eval(b) : void 0
              })) return this.evaluating = !1, c;
            throw {
              type: "Name",
              message: "variable " + d + " is undefined",
              filename: this.currentFileInfo.filename,
              index: this.index
            }
          }
        }
      }(c("../tree")),
      function (a) {
        var b = ["paths", "optimization", "files", "contents", "contentsIgnoredChars", "relativeUrls", "rootpath", "strictImports", "insecure", "dumpLineNumbers", "compress", "processImports", "syncImport", "javascriptEnabled", "mime", "useFileCache", "currentFileInfo"];
        a.parseEnv = function (a) {
          if (d(a, this, b), this.contents || (this.contents = {}), this.contentsIgnoredChars || (this.contentsIgnoredChars = {}), this.files || (this.files = {}), "string" == typeof this.paths && (this.paths = [this.paths]), !this.currentFileInfo) {
            var c = a && a.filename || "input",
              e = c.replace(/[^\/\\]*$/, "");
            a && (a.filename = null), this.currentFileInfo = {
              filename: c,
              relativeUrls: this.relativeUrls,
              rootpath: a && a.rootpath || "",
              currentDirectory: e,
              entryPath: e,
              rootFilename: c
            }
          }
        };
        var c = ["silent", "verbose", "compress", "yuicompress", "ieCompat", "strictMath", "strictUnits", "cleancss", "sourceMap", "importMultiple", "urlArgs"];
        a.evalEnv = function (a, b) {
          d(a, this, c), this.frames = b || []
        }, a.evalEnv.prototype.inParenthesis = function () {
          this.parensStack || (this.parensStack = []), this.parensStack.push(!0)
        }, a.evalEnv.prototype.outOfParenthesis = function () {
          this.parensStack.pop()
        }, a.evalEnv.prototype.isMathOn = function () {
          return this.strictMath ? this.parensStack && this.parensStack.length : !0
        }, a.evalEnv.prototype.isPathRelative = function (a) {
          return !/^(?:[a-z-]+:|\/)/.test(a)
        }, a.evalEnv.prototype.normalizePath = function (a) {
          var b, c = a.split("/").reverse();
          for (a = []; 0 !== c.length;) switch (b = c.pop()) {
          case ".":
            break;
          case "..":
            0 === a.length || ".." === a[a.length - 1] ? a.push(b) : a.pop();
            break;
          default:
            a.push(b)
          }
          return a.join("/")
        };
        var d = function (a, b, c) {
          if (a)
            for (var d = 0; d < c.length; d++) a.hasOwnProperty(c[d]) && (b[c[d]] = a[c[d]])
        }
      }(c("./tree")),
      function (a) {
        function b(a) {
          return a
        }

        function c(a, b) {
          var d, e;
          for (d in a)
            if (a.hasOwnProperty(d)) switch (e = a[d], typeof e) {
            case "function":
              e.prototype && e.prototype.type && (e.prototype.typeIndex = b++);
              break;
            case "object":
              b = c(e, b)
            }
            return b
        }
        var d = {
            visitDeeper: !0
          },
          e = !1;
        a.visitor = function (b) {
          this._implementation = b, this._visitFnCache = [], e || (c(a, 1), e = !0)
        }, a.visitor.prototype = {
          visit: function (a) {
            if (!a) return a;
            var c = a.typeIndex;
            if (!c) return a;
            var e, f = this._visitFnCache,
              g = this._implementation,
              h = c << 1,
              i = 1 | h,
              j = f[h],
              k = f[i],
              l = d;
            if (l.visitDeeper = !0, j || (e = "visit" + a.type, j = g[e] || b, k = g[e + "Out"] || b, f[h] = j, f[i] = k), j !== b) {
              var m = j.call(g, a, l);
              g.isReplacing && (a = m)
            }
            return l.visitDeeper && a && a.accept && a.accept(this), k != b && k.call(g, a), a
          },
          visitArray: function (a, b) {
            if (!a) return a;
            var c, d = a.length;
            if (b || !this._implementation.isReplacing) {
              for (c = 0; d > c; c++) this.visit(a[c]);
              return a
            }
            var e = [];
            for (c = 0; d > c; c++) {
              var f = this.visit(a[c]);
              f.splice ? f.length && this.flatten(f, e) : e.push(f)
            }
            return e
          },
          flatten: function (a, b) {
            b || (b = []);
            var c, d, e, f, g, h;
            for (d = 0, c = a.length; c > d; d++)
              if (e = a[d], e.splice)
                for (g = 0, f = e.length; f > g; g++) h = e[g], h.splice ? h.length && this.flatten(h, b) : b.push(h);
              else b.push(e);
            return b
          }
        }
      }(c("./tree")),
      function (a) {
        a.importVisitor = function (b, c, d, e, f) {
          if (this._visitor = new a.visitor(this), this._importer = b, this._finish = c, this.env = d || new a.evalEnv, this.importCount = 0, this.onceFileDetectionMap = e || {}, this.recursionDetector = {}, f)
            for (var g in f) f.hasOwnProperty(g) && (this.recursionDetector[g] = !0)
        }, a.importVisitor.prototype = {
          isReplacing: !0,
          run: function (a) {
            var b;
            try {
              this._visitor.visit(a)
            } catch (c) {
              b = c
            }
            this.isFinished = !0, 0 === this.importCount && this._finish(b)
          },
          visitImport: function (b, c) {
            var d, e = this,
              f = b.options.inline;
            if (!b.css || f) {
              try {
                d = b.evalForImport(this.env)
              } catch (g) {
                g.filename || (g.index = b.index, g.filename = b.currentFileInfo.filename), b.css = !0, b.error = g
              }
              if (d && (!d.css || f)) {
                b = d, this.importCount++;
                var h = new a.evalEnv(this.env, this.env.frames.slice(0));
                b.options.multiple && (h.importMultiple = !0), this._importer.push(b.getPath(), b.currentFileInfo, b.options, function (c, d, g, i) {
                  c && !c.filename && (c.index = b.index, c.filename = b.currentFileInfo.filename);
                  var j = g || i in e.recursionDetector;
                  h.importMultiple || (b.skip = j ? !0 : function () {
                    return i in e.onceFileDetectionMap ? !0 : (e.onceFileDetectionMap[i] = !0, !1)
                  });
                  var k = function (a) {
                    e.importCount--, 0 === e.importCount && e.isFinished && e._finish(a)
                  };
                  return !d || (b.root = d, b.importedFilename = i, f || !h.importMultiple && j) ? void k() : (e.recursionDetector[i] = !0, void new a.importVisitor(e._importer, k, h, e.onceFileDetectionMap, e.recursionDetector).run(d))
                })
              }
            }
            return c.visitDeeper = !1, b
          },
          visitRule: function (a, b) {
            return b.visitDeeper = !1, a
          },
          visitDirective: function (a) {
            return this.env.frames.unshift(a), a
          },
          visitDirectiveOut: function () {
            this.env.frames.shift()
          },
          visitMixinDefinition: function (a) {
            return this.env.frames.unshift(a), a
          },
          visitMixinDefinitionOut: function () {
            this.env.frames.shift()
          },
          visitRuleset: function (a) {
            return this.env.frames.unshift(a), a
          },
          visitRulesetOut: function () {
            this.env.frames.shift()
          },
          visitMedia: function (a) {
            return this.env.frames.unshift(a.rules[0]), a
          },
          visitMediaOut: function () {
            this.env.frames.shift()
          }
        }
      }(c("./tree")),
      function (a) {
        a.joinSelectorVisitor = function () {
          this.contexts = [[]], this._visitor = new a.visitor(this)
        }, a.joinSelectorVisitor.prototype = {
          run: function (a) {
            return this._visitor.visit(a)
          },
          visitRule: function (a, b) {
            b.visitDeeper = !1
          },
          visitMixinDefinition: function (a, b) {
            b.visitDeeper = !1
          },
          visitRuleset: function (a) {
            var b, c = this.contexts[this.contexts.length - 1],
              d = [];
            this.contexts.push(d), a.root || (b = a.selectors, b && (b = b.filter(function (a) {
              return a.getIsOutput()
            }), a.selectors = b.length ? b : b = null, b && a.joinSelectors(d, c, b)), b || (a.rules = null), a.paths = d)
          },
          visitRulesetOut: function () {
            this.contexts.length = this.contexts.length - 1
          },
          visitMedia: function (a) {
            var b = this.contexts[this.contexts.length - 1];
            a.rules[0].root = 0 === b.length || b[0].multiMedia
          }
        }
      }(c("./tree")),
      function (a) {
        a.toCSSVisitor = function (b) {
          this._visitor = new a.visitor(this), this._env = b
        }, a.toCSSVisitor.prototype = {
          isReplacing: !0,
          run: function (a) {
            return this._visitor.visit(a)
          },
          visitRule: function (a) {
            return a.variable ? [] : a
          },
          visitMixinDefinition: function (a) {
            return a.frames = [], []
          },
          visitExtend: function () {
            return []
          },
          visitComment: function (a) {
            return a.isSilent(this._env) ? [] : a
          },
          visitMedia: function (a, b) {
            return a.accept(this._visitor), b.visitDeeper = !1, a.rules.length ? a : []
          },
          visitDirective: function (b) {
            if (b.currentFileInfo.reference && !b.isReferenced) return [];
            if ("@charset" === b.name) {
              if (this.charset) {
                if (b.debugInfo) {
                  var c = new a.Comment("/* " + b.toCSS(this._env).replace(/\n/g, "") + " */\n");
                  return c.debugInfo = b.debugInfo, this._visitor.visit(c)
                }
                return []
              }
              this.charset = !0
            }
            return b.rules && b.rules.rules && this._mergeRules(b.rules.rules), b
          },
          checkPropertiesInRoot: function (b) {
            for (var c, d = 0; d < b.length; d++)
              if (c = b[d], c instanceof a.Rule && !c.variable) throw {
                message: "properties must be inside selector blocks, they cannot be in the root.",
                index: c.index,
                filename: c.currentFileInfo ? c.currentFileInfo.filename : null
              }
          },
          visitRuleset: function (b, c) {
            var d, e = [];
            if (b.firstRoot && this.checkPropertiesInRoot(b.rules), b.root) b.accept(this._visitor), c.visitDeeper = !1, (b.firstRoot || b.rules && b.rules.length > 0) && e.splice(0, 0, b);
            else {
              b.paths && (b.paths = b.paths.filter(function (b) {
                var c;
                for (" " === b[0].elements[0].combinator.value && (b[0].elements[0].combinator = new a.Combinator("")), c = 0; c < b.length; c++)
                  if (b[c].getIsReferenced() && b[c].getIsOutput()) return !0;
                return !1
              }));
              for (var f = b.rules, g = f ? f.length : 0, h = 0; g > h;) d = f[h], d && d.rules ? (e.push(this._visitor.visit(d)), f.splice(h, 1), g--) : h++;
              g > 0 ? b.accept(this._visitor) : b.rules = null, c.visitDeeper = !1, f = b.rules, f && (this._mergeRules(f), f = b.rules), f && (this._removeDuplicateRules(f), f = b.rules), f && f.length > 0 && b.paths.length > 0 && e.splice(0, 0, b)
            }
            return 1 === e.length ? e[0] : e
          },
          _removeDuplicateRules: function (b) {
            if (b) {
              var c, d, e, f = {};
              for (e = b.length - 1; e >= 0; e--)
                if (d = b[e], d instanceof a.Rule)
                  if (f[d.name]) {
                    c = f[d.name], c instanceof a.Rule && (c = f[d.name] = [f[d.name].toCSS(this._env)]);
                    var g = d.toCSS(this._env); - 1 !== c.indexOf(g) ? b.splice(e, 1) : c.push(g)
                  } else f[d.name] = d
            }
          },
          _mergeRules: function (b) {
            if (b) {
              for (var c, d, e, f = {}, g = 0; g < b.length; g++) d = b[g], d instanceof a.Rule && d.merge && (e = [d.name, d.important ? "!" : ""].join(","), f[e] ? b.splice(g--, 1) : f[e] = [], f[e].push(d));
              Object.keys(f).map(function (b) {
                function e(b) {
                  return new a.Expression(b.map(function (a) {
                    return a.value
                  }))
                }

                function g(b) {
                  return new a.Value(b.map(function (a) {
                    return a
                  }))
                }
                if (c = f[b], c.length > 1) {
                  d = c[0];
                  var h = [],
                    i = [];
                  c.map(function (a) {
                    "+" === a.merge && (i.length > 0 && h.push(e(i)), i = []), i.push(a)
                  }), h.push(e(i)), d.value = g(h)
                }
              })
            }
          }
        }
      }(c("./tree")),
      function (a) {
        a.extendFinderVisitor = function () {
          this._visitor = new a.visitor(this), this.contexts = [], this.allExtendsStack = [[]]
        }, a.extendFinderVisitor.prototype = {
          run: function (a) {
            return a = this._visitor.visit(a), a.allExtends = this.allExtendsStack[0], a
          },
          visitRule: function (a, b) {
            b.visitDeeper = !1
          },
          visitMixinDefinition: function (a, b) {
            b.visitDeeper = !1
          },
          visitRuleset: function (b) {
            if (!b.root) {
              var c, d, e, f, g = [],
                h = b.rules,
                i = h ? h.length : 0;
              for (c = 0; i > c; c++) b.rules[c] instanceof a.Extend && (g.push(h[c]), b.extendOnEveryPath = !0);
              var j = b.paths;
              for (c = 0; c < j.length; c++) {
                var k = j[c],
                  l = k[k.length - 1],
                  m = l.extendList;
                for (f = m ? m.slice(0).concat(g) : g, f && (f = f.map(function (a) {
                    return a.clone()
                  })), d = 0; d < f.length; d++) this.foundExtends = !0, e = f[d], e.findSelfSelectors(k), e.ruleset = b, 0 === d && (e.firstExtendOnThisSelectorPath = !0), this.allExtendsStack[this.allExtendsStack.length - 1].push(e)
              }
              this.contexts.push(b.selectors)
            }
          },
          visitRulesetOut: function (a) {
            a.root || (this.contexts.length = this.contexts.length - 1)
          },
          visitMedia: function (a) {
            a.allExtends = [], this.allExtendsStack.push(a.allExtends)
          },
          visitMediaOut: function () {
            this.allExtendsStack.length = this.allExtendsStack.length - 1
          },
          visitDirective: function (a) {
            a.allExtends = [], this.allExtendsStack.push(a.allExtends)
          },
          visitDirectiveOut: function () {
            this.allExtendsStack.length = this.allExtendsStack.length - 1
          }
        }, a.processExtendsVisitor = function () {
          this._visitor = new a.visitor(this)
        }, a.processExtendsVisitor.prototype = {
          run: function (b) {
            var c = new a.extendFinderVisitor;
            return c.run(b), c.foundExtends ? (b.allExtends = b.allExtends.concat(this.doExtendChaining(b.allExtends, b.allExtends)), this.allExtendsStack = [b.allExtends], this._visitor.visit(b)) : b
          },
          doExtendChaining: function (b, c, d) {
            var e, f, g, h, i, j, k, l, m = [],
              n = this;
            for (d = d || 0, e = 0; e < b.length; e++)
              for (f = 0; f < c.length; f++) j = b[e], k = c[f], j.parent_ids.indexOf(k.object_id) >= 0 || (i = [k.selfSelectors[0]], g = n.findMatch(j, i), g.length && j.selfSelectors.forEach(function (b) {
                h = n.extendSelector(g, i, b), l = new a.Extend(k.selector, k.option, 0), l.selfSelectors = h, h[h.length - 1].extendList = [l], m.push(l), l.ruleset = k.ruleset, l.parent_ids = l.parent_ids.concat(k.parent_ids, j.parent_ids), k.firstExtendOnThisSelectorPath && (l.firstExtendOnThisSelectorPath = !0, k.ruleset.paths.push(h))
              }));
            if (m.length) {
              if (this.extendChainCount++, d > 100) {
                var o = "{unable to calculate}",
                  p = "{unable to calculate}";
                try {
                  o = m[0].selfSelectors[0].toCSS(), p = m[0].selector.toCSS()
                } catch (q) {}
                throw {
                  message: "extend circular reference detected. One of the circular extends is currently:" + o + ":extend(" + p + ")"
                }
              }
              return m.concat(n.doExtendChaining(m, c, d + 1))
            }
            return m
          },
          visitRule: function (a, b) {
            b.visitDeeper = !1
          },
          visitMixinDefinition: function (a, b) {
            b.visitDeeper = !1
          },
          visitSelector: function (a, b) {
            b.visitDeeper = !1
          },
          visitRuleset: function (a) {
            if (!a.root) {
              var b, c, d, e, f = this.allExtendsStack[this.allExtendsStack.length - 1],
                g = [],
                h = this;
              for (d = 0; d < f.length; d++)
                for (c = 0; c < a.paths.length; c++)
                  if (e = a.paths[c], !a.extendOnEveryPath) {
                    var i = e[e.length - 1].extendList;
                    i && i.length || (b = this.findMatch(f[d], e), b.length && f[d].selfSelectors.forEach(function (a) {
                      g.push(h.extendSelector(b, e, a))
                    }))
                  }
              a.paths = a.paths.concat(g)
            }
          },
          findMatch: function (a, b) {
            var c, d, e, f, g, h, i, j = this,
              k = a.selector.elements,
              l = [],
              m = [];
            for (c = 0; c < b.length; c++)
              for (d = b[c], e = 0; e < d.elements.length; e++)
                for (f = d.elements[e], (a.allowBefore || 0 === c && 0 === e) && l.push({
                    pathIndex: c,
                    index: e,
                    matched: 0,
                    initialCombinator: f.combinator
                  }), h = 0; h < l.length; h++) i = l[h], g = f.combinator.value, "" === g && 0 === e && (g = " "), !j.isElementValuesEqual(k[i.matched].value, f.value) || i.matched > 0 && k[i.matched].combinator.value !== g ? i = null : i.matched++, i && (i.finished = i.matched === k.length, i.finished && !a.allowAfter && (e + 1 < d.elements.length || c + 1 < b.length) && (i = null)), i ? i.finished && (i.length = k.length, i.endPathIndex = c, i.endPathElementIndex = e + 1, l.length = 0, m.push(i)) : (l.splice(h, 1), h--);
            return m
          },
          isElementValuesEqual: function (b, c) {
            if ("string" == typeof b || "string" == typeof c) return b === c;
            if (b instanceof a.Attribute) return b.op !== c.op || b.key !== c.key ? !1 : b.value && c.value ? (b = b.value.value || b.value, c = c.value.value || c.value, b === c) : b.value || c.value ? !1 : !0;
            if (b = b.value, c = c.value, b instanceof a.Selector) {
              if (!(c instanceof a.Selector) || b.elements.length !== c.elements.length) return !1;
              for (var d = 0; d < b.elements.length; d++) {
                if (b.elements[d].combinator.value !== c.elements[d].combinator.value && (0 !== d || (b.elements[d].combinator.value || " ") !== (c.elements[d].combinator.value || " "))) return !1;
                if (!this.isElementValuesEqual(b.elements[d].value, c.elements[d].value)) return !1
              }
              return !0
            }
            return !1
          },
          extendSelector: function (b, c, d) {
            var e, f, g, h, i, j = 0,
              k = 0,
              l = [];
            for (e = 0; e < b.length; e++) h = b[e], f = c[h.pathIndex], g = new a.Element(h.initialCombinator, d.elements[0].value, d.elements[0].index, d.elements[0].currentFileInfo), h.pathIndex > j && k > 0 && (l[l.length - 1].elements = l[l.length - 1].elements.concat(c[j].elements.slice(k)), k = 0, j++), i = f.elements.slice(k, h.index).concat([g]).concat(d.elements.slice(1)), j === h.pathIndex && e > 0 ? l[l.length - 1].elements = l[l.length - 1].elements.concat(i) : (l = l.concat(c.slice(j, h.pathIndex)), l.push(new a.Selector(i))), j = h.endPathIndex, k = h.endPathElementIndex, k >= c[j].elements.length && (k = 0, j++);
            return j < c.length && k > 0 && (l[l.length - 1].elements = l[l.length - 1].elements.concat(c[j].elements.slice(k)), j++), l = l.concat(c.slice(j, c.length))
          },
          visitRulesetOut: function () {},
          visitMedia: function (a) {
            var b = a.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
            b = b.concat(this.doExtendChaining(b, a.allExtends)), this.allExtendsStack.push(b)
          },
          visitMediaOut: function () {
            this.allExtendsStack.length = this.allExtendsStack.length - 1
          },
          visitDirective: function (a) {
            var b = a.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
            b = b.concat(this.doExtendChaining(b, a.allExtends)), this.allExtendsStack.push(b)
          },
          visitDirectiveOut: function () {
            this.allExtendsStack.length = this.allExtendsStack.length - 1
          }
        }
      }(c("./tree")),
      function (a) {
        a.sourceMapOutput = function (a) {
          this._css = [], this._rootNode = a.rootNode, this._writeSourceMap = a.writeSourceMap, this._contentsMap = a.contentsMap, this._contentsIgnoredCharsMap = a.contentsIgnoredCharsMap, this._sourceMapFilename = a.sourceMapFilename, this._outputFilename = a.outputFilename, this._sourceMapURL = a.sourceMapURL, a.sourceMapBasepath && (this._sourceMapBasepath = a.sourceMapBasepath.replace(/\\/g, "/")), this._sourceMapRootpath = a.sourceMapRootpath, this._outputSourceFiles = a.outputSourceFiles, this._sourceMapGeneratorConstructor = a.sourceMapGenerator || c("source-map").SourceMapGenerator, this._sourceMapRootpath && "/" !== this._sourceMapRootpath.charAt(this._sourceMapRootpath.length - 1) && (this._sourceMapRootpath += "/"), this._lineNumber = 0, this._column = 0
        }, a.sourceMapOutput.prototype.normalizeFilename = function (a) {
          return a = a.replace(/\\/g, "/"), this._sourceMapBasepath && 0 === a.indexOf(this._sourceMapBasepath) && (a = a.substring(this._sourceMapBasepath.length), ("\\" === a.charAt(0) || "/" === a.charAt(0)) && (a = a.substring(1))), (this._sourceMapRootpath || "") + a
        }, a.sourceMapOutput.prototype.add = function (a, b, c, d) {
          if (a) {
            var e, f, g, h, i;
            if (b) {
              var j = this._contentsMap[b.filename];
              this._contentsIgnoredCharsMap[b.filename] && (c -= this._contentsIgnoredCharsMap[b.filename], 0 > c && (c = 0), j = j.slice(this._contentsIgnoredCharsMap[b.filename])), j = j.substring(0, c), f = j.split("\n"), h = f[f.length - 1]
            }
            if (e = a.split("\n"), g = e[e.length - 1], b)
              if (d)
                for (i = 0; i < e.length; i++) this._sourceMapGenerator.addMapping({
                  generated: {
                    line: this._lineNumber + i + 1,
                    column: 0 === i ? this._column : 0
                  },
                  original: {
                    line: f.length + i,
                    column: 0 === i ? h.length : 0
                  },
                  source: this.normalizeFilename(b.filename)
                });
              else this._sourceMapGenerator.addMapping({
                generated: {
                  line: this._lineNumber + 1,
                  column: this._column
                },
                original: {
                  line: f.length,
                  column: h.length
                },
                source: this.normalizeFilename(b.filename)
              });
            1 === e.length ? this._column += g.length : (this._lineNumber += e.length - 1, this._column = g.length), this._css.push(a)
          }
        }, a.sourceMapOutput.prototype.isEmpty = function () {
          return 0 === this._css.length
        }, a.sourceMapOutput.prototype.toCSS = function (a) {
          if (this._sourceMapGenerator = new this._sourceMapGeneratorConstructor({
              file: this._outputFilename,
              sourceRoot: null
            }), this._outputSourceFiles)
            for (var b in this._contentsMap)
              if (this._contentsMap.hasOwnProperty(b)) {
                var d = this._contentsMap[b];
                this._contentsIgnoredCharsMap[b] && (d = d.slice(this._contentsIgnoredCharsMap[b])), this._sourceMapGenerator.setSourceContent(this.normalizeFilename(b), d)
              }
          if (this._rootNode.genCSS(a, this), this._css.length > 0) {
            var e, f = JSON.stringify(this._sourceMapGenerator.toJSON());
            this._sourceMapURL ? e = this._sourceMapURL : this._sourceMapFilename && (e = this.normalizeFilename(this._sourceMapFilename)), this._writeSourceMap ? this._writeSourceMap(f) : e = "data:application/json;base64," + c("./encoder.js").encodeBase64(f), e && this._css.push("/*# sourceMappingURL=" + e + " */")
          }
          return this._css.join("")
        }
      }(c("./tree"));
    var y = /^(file|chrome(-extension)?|resource|qrc|app):/.test(location.protocol);
    w.env = w.env || ("127.0.0.1" == location.hostname || "0.0.0.0" == location.hostname || "localhost" == location.hostname || location.port && location.port.length > 0 || y ? "development" : "production");
    var z = {
      debug: 3,
      info: 2,
      errors: 1,
      none: 0
    };
    if (w.logLevel = "undefined" != typeof w.logLevel ? w.logLevel : "development" === w.env ? z.debug : z.errors, w.async = w.async || !1, w.fileAsync = w.fileAsync || !1, w.poll = w.poll || (y ? 1e3 : 1500), w.functions)
      for (var A in w.functions) w.functions.hasOwnProperty(A) && (w.tree.functions[A] = w.functions[A]);
    var B = /!dumpLineNumbers:(comments|mediaquery|all)/.exec(location.hash);
    B && (w.dumpLineNumbers = B[1]);
    var C = /^text\/(x-)?less$/,
      D = null,
      E = {};
    if (w.watch = function () {
        return w.watchMode || (w.env = "development", v()), this.watchMode = !0, !0
      }, w.unwatch = function () {
        return clearInterval(w.watchTimer), this.watchMode = !1, !1
      }, /!watch/.test(location.hash) && w.watch(), "development" != w.env) try {
      D = "undefined" == typeof a.localStorage ? null : a.localStorage
    } catch (F) {}
    var G = document.getElementsByTagName("link");
    w.sheets = [];
    for (var H = 0; H < G.length; H++)("stylesheet/less" === G[H].rel || G[H].rel.match(/stylesheet/) && G[H].type.match(C)) && w.sheets.push(G[H]);
    w.modifyVars = function (a) {
      w.refresh(!1, a)
    }, w.refresh = function (a, b) {
      var c, e;
      c = e = new Date, u(function (a, b, f, i, k) {
        if (a) return j(a, i.href);
        if (k.local) d("loading " + i.href + " from cache.", z.info);
        else {
          d("parsed " + i.href + " successfully.", z.debug);
          var l = b.toCSS(w);
          l = h(l), g(l, i, k.lastModified)
        }
        d("css for " + i.href + " generated in " + (new Date - e) + "ms", z.info), 0 === k.remaining && d("less has finished. css generated in " + (new Date - c) + "ms", z.info), e = new Date
      }, a, b), n(b)
    }, w.refreshStyles = n, w.Parser.fileLoader = s, w.refresh("development" === w.env), "function" == typeof define && define.amd && define(function () {
      return w
    })
  }(window),
  function (a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
      if (!a.document) throw new Error("jQuery requires a window with a document");
      return b(a)
    } : b(a)
  }("undefined" != typeof window ? window : this, function (a, b) {
    function c(a) {
      var b = a.length,
        c = _.type(a);
      return "function" === c || _.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }

    function d(a, b, c) {
      if (_.isFunction(b)) return _.grep(a, function (a, d) {
        return !!b.call(a, d, a) !== c
      });
      if (b.nodeType) return _.grep(a, function (a) {
        return a === b !== c
      });
      if ("string" == typeof b) {
        if (ha.test(b)) return _.filter(b, a, c);
        b = _.filter(b, a)
      }
      return _.grep(a, function (a) {
        return U.call(b, a) >= 0 !== c
      })
    }

    function e(a, b) {
      for (;
        (a = a[b]) && 1 !== a.nodeType;);
      return a
    }

    function f(a) {
      var b = oa[a] = {};
      return _.each(a.match(na) || [], function (a, c) {
        b[c] = !0
      }), b
    }

    function g() {
      Z.removeEventListener("DOMContentLoaded", g, !1), a.removeEventListener("load", g, !1), _.ready()
    }

    function h() {
      Object.defineProperty(this.cache = {}, 0, {
        get: function () {
          return {}
        }
      }), this.expando = _.expando + h.uid++
    }

    function i(a, b, c) {
      var d;
      if (void 0 === c && 1 === a.nodeType)
        if (d = "data-" + b.replace(ua, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
          try {
            c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : ta.test(c) ? _.parseJSON(c) : c
          } catch (e) {}
          sa.set(a, b, c)
        } else c = void 0;
      return c
    }

    function j() {
      return !0
    }

    function k() {
      return !1
    }

    function l() {
      try {
        return Z.activeElement
      } catch (a) {}
    }

    function m(a, b) {
      return _.nodeName(a, "table") && _.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function n(a) {
      return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
    }

    function o(a) {
      var b = Ka.exec(a.type);
      return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function p(a, b) {
      for (var c = 0, d = a.length; d > c; c++) ra.set(a[c], "globalEval", !b || ra.get(b[c], "globalEval"))
    }

    function q(a, b) {
      var c, d, e, f, g, h, i, j;
      if (1 === b.nodeType) {
        if (ra.hasData(a) && (f = ra.access(a), g = ra.set(b, f), j = f.events)) {
          delete g.handle, g.events = {};
          for (e in j)
            for (c = 0, d = j[e].length; d > c; c++) _.event.add(b, e, j[e][c])
        }
        sa.hasData(a) && (h = sa.access(a), i = _.extend({}, h), sa.set(b, i))
      }
    }

    function r(a, b) {
      var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
      return void 0 === b || b && _.nodeName(a, b) ? _.merge([a], c) : c
    }

    function s(a, b) {
      var c = b.nodeName.toLowerCase();
      "input" === c && ya.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
    }

    function t(b, c) {
      var d, e = _(c.createElement(b)).appendTo(c.body),
        f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : _.css(e[0], "display");
      return e.detach(), f
    }

    function u(a) {
      var b = Z,
        c = Oa[a];
      return c || (c = t(a, b), "none" !== c && c || (Na = (Na || _("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = Na[0].contentDocument, b.write(), b.close(), c = t(a, b), Na.detach()), Oa[a] = c), c
    }

    function v(a, b, c) {
      var d, e, f, g, h = a.style;
      return c = c || Ra(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || _.contains(a.ownerDocument, a) || (g = _.style(a, b)), Qa.test(g) && Pa.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
    }

    function w(a, b) {
      return {
        get: function () {
          return a() ? void delete this.get : (this.get = b).apply(this, arguments)
        }
      }
    }

    function x(a, b) {
      if (b in a) return b;
      for (var c = b[0].toUpperCase() + b.slice(1), d = b, e = Xa.length; e--;)
        if (b = Xa[e] + c, b in a) return b;
      return d
    }

    function y(a, b, c) {
      var d = Ta.exec(b);
      return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function z(a, b, c, d, e) {
      for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += _.css(a, c + wa[f], !0, e)), d ? ("content" === c && (g -= _.css(a, "padding" + wa[f], !0, e)), "margin" !== c && (g -= _.css(a, "border" + wa[f] + "Width", !0, e))) : (g += _.css(a, "padding" + wa[f], !0, e), "padding" !== c && (g += _.css(a, "border" + wa[f] + "Width", !0, e)));
      return g
    }

    function A(a, b, c) {
      var d = !0,
        e = "width" === b ? a.offsetWidth : a.offsetHeight,
        f = Ra(a),
        g = "border-box" === _.css(a, "boxSizing", !1, f);
      if (0 >= e || null == e) {
        if (e = v(a, b, f), (0 > e || null == e) && (e = a.style[b]), Qa.test(e)) return e;
        d = g && (Y.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
      }
      return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    function B(a, b) {
      for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = ra.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && xa(d) && (f[g] = ra.access(d, "olddisplay", u(d.nodeName)))) : (e = xa(d), "none" === c && e || ra.set(d, "olddisplay", e ? c : _.css(d, "display"))));
      for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
      return a
    }

    function C(a, b, c, d, e) {
      return new C.prototype.init(a, b, c, d, e)
    }

    function D() {
      return setTimeout(function () {
        Ya = void 0
      }), Ya = _.now()
    }

    function E(a, b) {
      var c, d = 0,
        e = {
          height: a
        };
      for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = wa[d], e["margin" + c] = e["padding" + c] = a;
      return b && (e.opacity = e.width = a), e
    }

    function F(a, b, c) {
      for (var d, e = (cb[b] || []).concat(cb["*"]), f = 0, g = e.length; g > f; f++)
        if (d = e[f].call(c, b, a)) return d
    }

    function G(a, b, c) {
      var d, e, f, g, h, i, j, k, l = this,
        m = {},
        n = a.style,
        o = a.nodeType && xa(a),
        p = ra.get(a, "fxshow");
      c.queue || (h = _._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
        h.unqueued || i()
      }), h.unqueued++, l.always(function () {
        l.always(function () {
          h.unqueued--, _.queue(a, "fx").length || h.empty.fire()
        })
      })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], j = _.css(a, "display"), k = "none" === j ? ra.get(a, "olddisplay") || u(a.nodeName) : j, "inline" === k && "none" === _.css(a, "float") && (n.display = "inline-block")), c.overflow && (n.overflow = "hidden", l.always(function () {
        n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
      }));
      for (d in b)
        if (e = b[d], $a.exec(e)) {
          if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
            if ("show" !== e || !p || void 0 === p[d]) continue;
            o = !0
          }
          m[d] = p && p[d] || _.style(a, d)
        } else j = void 0;
      if (_.isEmptyObject(m)) "inline" === ("none" === j ? u(a.nodeName) : j) && (n.display = j);
      else {
        p ? "hidden" in p && (o = p.hidden) : p = ra.access(a, "fxshow", {}), f && (p.hidden = !o), o ? _(a).show() : l.done(function () {
          _(a).hide()
        }), l.done(function () {
          var b;
          ra.remove(a, "fxshow");
          for (b in m) _.style(a, b, m[b])
        });
        for (d in m) g = F(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
      }
    }

    function H(a, b) {
      var c, d, e, f, g;
      for (c in a)
        if (d = _.camelCase(c), e = b[d], f = a[c], _.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = _.cssHooks[d], g && "expand" in g) {
          f = g.expand(f), delete a[d];
          for (c in f) c in a || (a[c] = f[c], b[c] = e)
        } else b[d] = e
    }

    function I(a, b, c) {
      var d, e, f = 0,
        g = bb.length,
        h = _.Deferred().always(function () {
          delete i.elem
        }),
        i = function () {
          if (e) return !1;
          for (var b = Ya || D(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
          return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
        },
        j = h.promise({
          elem: a,
          props: _.extend({}, b),
          opts: _.extend(!0, {
            specialEasing: {}
          }, c),
          originalProperties: b,
          originalOptions: c,
          startTime: Ya || D(),
          duration: c.duration,
          tweens: [],
          createTween: function (b, c) {
            var d = _.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
            return j.tweens.push(d), d
          },
          stop: function (b) {
            var c = 0,
              d = b ? j.tweens.length : 0;
            if (e) return this;
            for (e = !0; d > c; c++) j.tweens[c].run(1);
            return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
          }
        }),
        k = j.props;
      for (H(k, j.opts.specialEasing); g > f; f++)
        if (d = bb[f].call(j, a, k, j.opts)) return d;
      return _.map(k, F, j), _.isFunction(j.opts.start) && j.opts.start.call(a, j), _.fx.timer(_.extend(i, {
        elem: a,
        anim: j,
        queue: j.opts.queue
      })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }

    function J(a) {
      return function (b, c) {
        "string" != typeof b && (c = b, b = "*");
        var d, e = 0,
          f = b.toLowerCase().match(na) || [];
        if (_.isFunction(c))
          for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
      }
    }

    function K(a, b, c, d) {
      function e(h) {
        var i;
        return f[h] = !0, _.each(a[h] || [], function (a, h) {
          var j = h(b, c, d);
          return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
        }), i
      }
      var f = {},
        g = a === tb;
      return e(b.dataTypes[0]) || !f["*"] && e("*")
    }

    function L(a, b) {
      var c, d, e = _.ajaxSettings.flatOptions || {};
      for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
      return d && _.extend(!0, a, d), a
    }

    function M(a, b, c) {
      for (var d, e, f, g, h = a.contents, i = a.dataTypes;
        "*" === i[0];) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
      if (d)
        for (e in h)
          if (h[e] && h[e].test(d)) {
            i.unshift(e);
            break
          }
      if (i[0] in c) f = i[0];
      else {
        for (e in c) {
          if (!i[0] || a.converters[e + " " + i[0]]) {
            f = e;
            break
          }
          g || (g = e)
        }
        f = f || g
      }
      return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function N(a, b, c, d) {
      var e, f, g, h, i, j = {},
        k = a.dataTypes.slice();
      if (k[1])
        for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
      for (f = k.shift(); f;)
        if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
          if ("*" === f) f = i;
          else if ("*" !== i && i !== f) {
        if (g = j[i + " " + f] || j["* " + f], !g)
          for (e in j)
            if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
              g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
              break
            }
        if (g !== !0)
          if (g && a["throws"]) b = g(b);
          else try {
            b = g(b)
          } catch (l) {
            return {
              state: "parsererror",
              error: g ? l : "No conversion from " + i + " to " + f
            }
          }
      }
      return {
        state: "success",
        data: b
      }
    }

    function O(a, b, c, d) {
      var e;
      if (_.isArray(b)) _.each(b, function (b, e) {
        c || yb.test(a) ? d(a, e) : O(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
      });
      else if (c || "object" !== _.type(b)) d(a, b);
      else
        for (e in b) O(a + "[" + e + "]", b[e], c, d)
    }

    function P(a) {
      return _.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
    }
    var Q = [],
      R = Q.slice,
      S = Q.concat,
      T = Q.push,
      U = Q.indexOf,
      V = {},
      W = V.toString,
      X = V.hasOwnProperty,
      Y = {},
      Z = a.document,
      $ = "2.1.3",
      _ = function (a, b) {
        return new _.fn.init(a, b)
      },
      aa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      ba = /^-ms-/,
      ca = /-([\da-z])/gi,
      da = function (a, b) {
        return b.toUpperCase()
      };
    _.fn = _.prototype = {
      jquery: $,
      constructor: _,
      selector: "",
      length: 0,
      toArray: function () {
        return R.call(this)
      },
      get: function (a) {
        return null != a ? 0 > a ? this[a + this.length] : this[a] : R.call(this)
      },
      pushStack: function (a) {
        var b = _.merge(this.constructor(), a);
        return b.prevObject = this, b.context = this.context, b
      },
      each: function (a, b) {
        return _.each(this, a, b)
      },
      map: function (a) {
        return this.pushStack(_.map(this, function (b, c) {
          return a.call(b, c, b)
        }))
      },
      slice: function () {
        return this.pushStack(R.apply(this, arguments))
      },
      first: function () {
        return this.eq(0)
      },
      last: function () {
        return this.eq(-1)
      },
      eq: function (a) {
        var b = this.length,
          c = +a + (0 > a ? b : 0);
        return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
      },
      end: function () {
        return this.prevObject || this.constructor(null)
      },
      push: T,
      sort: Q.sort,
      splice: Q.splice
    }, _.extend = _.fn.extend = function () {
      var a, b, c, d, e, f, g = arguments[0] || {},
        h = 1,
        i = arguments.length,
        j = !1;
      for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || _.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
        if (null != (a = arguments[h]))
          for (b in a) c = g[b], d = a[b], g !== d && (j && d && (_.isPlainObject(d) || (e = _.isArray(d))) ? (e ? (e = !1, f = c && _.isArray(c) ? c : []) : f = c && _.isPlainObject(c) ? c : {}, g[b] = _.extend(j, f, d)) : void 0 !== d && (g[b] = d));
      return g
    }, _.extend({
      expando: "jQuery" + ($ + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (a) {
        throw new Error(a)
      },
      noop: function () {},
      isFunction: function (a) {
        return "function" === _.type(a)
      },
      isArray: Array.isArray,
      isWindow: function (a) {
        return null != a && a === a.window
      },
      isNumeric: function (a) {
        return !_.isArray(a) && a - parseFloat(a) + 1 >= 0
      },
      isPlainObject: function (a) {
        return "object" !== _.type(a) || a.nodeType || _.isWindow(a) ? !1 : a.constructor && !X.call(a.constructor.prototype, "isPrototypeOf") ? !1 : !0
      },
      isEmptyObject: function (a) {
        var b;
        for (b in a) return !1;
        return !0
      },
      type: function (a) {
        return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? V[W.call(a)] || "object" : typeof a
      },
      globalEval: function (a) {
        var b, c = eval;
        a = _.trim(a), a && (1 === a.indexOf("use strict") ? (b = Z.createElement("script"), b.text = a, Z.head.appendChild(b).parentNode.removeChild(b)) : c(a))
      },
      camelCase: function (a) {
        return a.replace(ba, "ms-").replace(ca, da)
      },
      nodeName: function (a, b) {
        return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
      },
      each: function (a, b, d) {
        var e, f = 0,
          g = a.length,
          h = c(a);
        if (d) {
          if (h)
            for (; g > f && (e = b.apply(a[f], d), e !== !1); f++);
          else
            for (f in a)
              if (e = b.apply(a[f], d), e === !1) break
        } else if (h)
          for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++);
        else
          for (f in a)
            if (e = b.call(a[f], f, a[f]), e === !1) break; return a
      },
      trim: function (a) {
        return null == a ? "" : (a + "").replace(aa, "")
      },
      makeArray: function (a, b) {
        var d = b || [];
        return null != a && (c(Object(a)) ? _.merge(d, "string" == typeof a ? [a] : a) : T.call(d, a)), d
      },
      inArray: function (a, b, c) {
        return null == b ? -1 : U.call(b, a, c)
      },
      merge: function (a, b) {
        for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];
        return a.length = e, a
      },
      grep: function (a, b, c) {
        for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
        return e
      },
      map: function (a, b, d) {
        var e, f = 0,
          g = a.length,
          h = c(a),
          i = [];
        if (h)
          for (; g > f; f++) e = b(a[f], f, d), null != e && i.push(e);
        else
          for (f in a) e = b(a[f], f, d), null != e && i.push(e);
        return S.apply([], i)
      },
      guid: 1,
      proxy: function (a, b) {
        var c, d, e;
        return "string" == typeof b && (c = a[b], b = a, a = c), _.isFunction(a) ? (d = R.call(arguments, 2), e = function () {
          return a.apply(b || this, d.concat(R.call(arguments)))
        }, e.guid = a.guid = a.guid || _.guid++, e) : void 0
      },
      now: Date.now,
      support: Y
    }), _.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
      V["[object " + b + "]"] = b.toLowerCase()
    });
    var ea = function (a) {
      function b(a, b, c, d) {
        var e, f, g, h, i, j, l, n, o, p;
        if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], h = b.nodeType, "string" != typeof a || !a || 1 !== h && 9 !== h && 11 !== h) return c;
        if (!d && I) {
          if (11 !== h && (e = sa.exec(a)))
            if (g = e[1]) {
              if (9 === h) {
                if (f = b.getElementById(g), !f || !f.parentNode) return c;
                if (f.id === g) return c.push(f), c
              } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c
            } else {
              if (e[2]) return $.apply(c, b.getElementsByTagName(a)), c;
              if ((g = e[3]) && v.getElementsByClassName) return $.apply(c, b.getElementsByClassName(g)), c
            }
          if (v.qsa && (!J || !J.test(a))) {
            if (n = l = N, o = b, p = 1 !== h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
              for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ua, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;) j[i] = n + m(j[i]);
              o = ta.test(a) && k(b.parentNode) || b, p = j.join(",")
            }
            if (p) try {
              return $.apply(c, o.querySelectorAll(p)), c
            } catch (q) {} finally {
              l || b.removeAttribute("id")
            }
          }
        }
        return B(a.replace(ia, "$1"), b, c, d)
      }

      function c() {
        function a(c, d) {
          return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d
        }
        var b = [];
        return a
      }

      function d(a) {
        return a[N] = !0, a
      }

      function e(a) {
        var b = G.createElement("div");
        try {
          return !!a(b)
        } catch (c) {
          return !1
        } finally {
          b.parentNode && b.parentNode.removeChild(b), b = null
        }
      }

      function f(a, b) {
        for (var c = a.split("|"), d = a.length; d--;) w.attrHandle[c[d]] = b
      }

      function g(a, b) {
        var c = b && a,
          d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
        if (d) return d;
        if (c)
          for (; c = c.nextSibling;)
            if (c === b) return -1;
        return a ? 1 : -1
      }

      function h(a) {
        return function (b) {
          var c = b.nodeName.toLowerCase();
          return "input" === c && b.type === a
        }
      }

      function i(a) {
        return function (b) {
          var c = b.nodeName.toLowerCase();
          return ("input" === c || "button" === c) && b.type === a
        }
      }

      function j(a) {
        return d(function (b) {
          return b = +b, d(function (c, d) {
            for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
          })
        })
      }

      function k(a) {
        return a && "undefined" != typeof a.getElementsByTagName && a
      }

      function l() {}

      function m(a) {
        for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
        return d
      }

      function n(a, b, c) {
        var d = b.dir,
          e = c && "parentNode" === d,
          f = Q++;
        return b.first ? function (b, c, f) {
          for (; b = b[d];)
            if (1 === b.nodeType || e) return a(b, c, f)
        } : function (b, c, g) {
          var h, i, j = [P, f];
          if (g) {
            for (; b = b[d];)
              if ((1 === b.nodeType || e) && a(b, c, g)) return !0
          } else
            for (; b = b[d];)
              if (1 === b.nodeType || e) {
                if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
                if (i[d] = j, j[2] = a(b, c, g)) return !0
              }
        }
      }

      function o(a) {
        return a.length > 1 ? function (b, c, d) {
          for (var e = a.length; e--;)
            if (!a[e](b, c, d)) return !1;
          return !0
        } : a[0]
      }

      function p(a, c, d) {
        for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
        return d
      }

      function q(a, b, c, d, e) {
        for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
        return g
      }

      function r(a, b, c, e, f, g) {
        return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function (d, g, h, i) {
          var j, k, l, m = [],
            n = [],
            o = g.length,
            r = d || p(b || "*", h.nodeType ? [h] : h, []),
            s = !a || !d && b ? r : q(r, m, a, h, i),
            t = c ? f || (d ? a : o || e) ? [] : g : s;
          if (c && c(s, t, h, i), e)
            for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
          if (d) {
            if (f || a) {
              if (f) {
                for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                f(null, t = [], j, i)
              }
              for (k = t.length; k--;)(l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
            }
          } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t)
        })
      }

      function s(a) {
        for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function (a) {
            return a === b
          }, g, !0), j = n(function (a) {
            return aa(b, a) > -1
          }, g, !0), k = [function (a, c, d) {
            var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
            return b = null, e
          }]; e > h; h++)
          if (c = w.relative[a[h].type]) k = [n(o(k), c)];
          else {
            if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
              for (d = ++h; e > d && !w.relative[a[d].type]; d++);
              return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                value: " " === a[h - 2].type ? "*" : ""
              })).replace(ia, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a))
            }
            k.push(c)
          }
        return o(k)
      }

      function t(a, c) {
        var e = c.length > 0,
          f = a.length > 0,
          g = function (d, g, h, i, j) {
            var k, l, m, n = 0,
              o = "0",
              p = d && [],
              r = [],
              s = C,
              t = d || f && w.find.TAG("*", j),
              u = P += null == s ? 1 : Math.random() || .1,
              v = t.length;
            for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
              if (f && k) {
                for (l = 0; m = a[l++];)
                  if (m(k, g, h)) {
                    i.push(k);
                    break
                  }
                j && (P = u)
              }
              e && ((k = !m && k) && n--, d && p.push(k))
            }
            if (n += o, e && o !== n) {
              for (l = 0; m = c[l++];) m(p, r, g, h);
              if (d) {
                if (n > 0)
                  for (; o--;) p[o] || r[o] || (r[o] = Y.call(i));
                r = q(r)
              }
              $.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
            }
            return j && (P = u, C = s), p
          };
        return e ? d(g) : g
      }
      var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date,
        O = a.document,
        P = 0,
        Q = 0,
        R = c(),
        S = c(),
        T = c(),
        U = function (a, b) {
          return a === b && (E = !0), 0
        },
        V = 1 << 31,
        W = {}.hasOwnProperty,
        X = [],
        Y = X.pop,
        Z = X.push,
        $ = X.push,
        _ = X.slice,
        aa = function (a, b) {
          for (var c = 0, d = a.length; d > c; c++)
            if (a[c] === b) return c;
          return -1
        },
        ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        ca = "[\\x20\\t\\r\\n\\f]",
        da = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        ea = da.replace("w", "w#"),
        fa = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ea + "))|)" + ca + "*\\]",
        ga = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + fa + ")*)|.*)\\)|)",
        ha = new RegExp(ca + "+", "g"),
        ia = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"),
        ja = new RegExp("^" + ca + "*," + ca + "*"),
        ka = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"),
        la = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"),
        ma = new RegExp(ga),
        na = new RegExp("^" + ea + "$"),
        oa = {
          ID: new RegExp("^#(" + da + ")"),
          CLASS: new RegExp("^\\.(" + da + ")"),
          TAG: new RegExp("^(" + da.replace("w", "w*") + ")"),
          ATTR: new RegExp("^" + fa),
          PSEUDO: new RegExp("^" + ga),
          CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
          bool: new RegExp("^(?:" + ba + ")$", "i"),
          needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i")
        },
        pa = /^(?:input|select|textarea|button)$/i,
        qa = /^h\d$/i,
        ra = /^[^{]+\{\s*\[native \w/,
        sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        ta = /[+~]/,
        ua = /'|\\/g,
        va = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"),
        wa = function (a, b, c) {
          var d = "0x" + b - 65536;
          return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
        },
        xa = function () {
          F()
        };
      try {
        $.apply(X = _.call(O.childNodes), O.childNodes), X[O.childNodes.length].nodeType
      } catch (ya) {
        $ = {
          apply: X.length ? function (a, b) {
            Z.apply(a, _.call(b))
          } : function (a, b) {
            for (var c = a.length, d = 0; a[c++] = b[d++];);
            a.length = c - 1
          }
        }
      }
      v = b.support = {}, y = b.isXML = function (a) {
        var b = a && (a.ownerDocument || a).documentElement;
        return b ? "HTML" !== b.nodeName : !1
      }, F = b.setDocument = function (a) {
        var b, c, d = a ? a.ownerDocument || a : O;
        return d !== G && 9 === d.nodeType && d.documentElement ? (G = d, H = d.documentElement, c = d.defaultView, c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)), I = !y(d), v.attributes = e(function (a) {
          return a.className = "i", !a.getAttribute("className")
        }), v.getElementsByTagName = e(function (a) {
          return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length
        }), v.getElementsByClassName = ra.test(d.getElementsByClassName), v.getById = e(function (a) {
          return H.appendChild(a).id = N, !d.getElementsByName || !d.getElementsByName(N).length
        }), v.getById ? (w.find.ID = function (a, b) {
          if ("undefined" != typeof b.getElementById && I) {
            var c = b.getElementById(a);
            return c && c.parentNode ? [c] : []
          }
        }, w.filter.ID = function (a) {
          var b = a.replace(va, wa);
          return function (a) {
            return a.getAttribute("id") === b
          }
        }) : (delete w.find.ID, w.filter.ID = function (a) {
          var b = a.replace(va, wa);
          return function (a) {
            var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
            return c && c.value === b
          }
        }), w.find.TAG = v.getElementsByTagName ? function (a, b) {
          return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0
        } : function (a, b) {
          var c, d = [],
            e = 0,
            f = b.getElementsByTagName(a);
          if ("*" === a) {
            for (; c = f[e++];) 1 === c.nodeType && d.push(c);
            return d
          }
          return f
        }, w.find.CLASS = v.getElementsByClassName && function (a, b) {
          return I ? b.getElementsByClassName(a) : void 0
        }, K = [], J = [], (v.qsa = ra.test(d.querySelectorAll)) && (e(function (a) {
          H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + ca + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + ca + "*(?:value|" + ba + ")"), a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="), a.querySelectorAll(":checked").length || J.push(":checked"), a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]")
        }), e(function (a) {
          var b = d.createElement("input");
          b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + ca + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
        })), (v.matchesSelector = ra.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function (a) {
          v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", ga)
        }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = ra.test(H.compareDocumentPosition), M = b || ra.test(H.contains) ? function (a, b) {
          var c = 9 === a.nodeType ? a.documentElement : a,
            d = b && b.parentNode;
          return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
        } : function (a, b) {
          if (b)
            for (; b = b.parentNode;)
              if (b === a) return !0;
          return !1
        }, U = b ? function (a, b) {
          if (a === b) return E = !0, 0;
          var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
          return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === d || a.ownerDocument === O && M(O, a) ? -1 : b === d || b.ownerDocument === O && M(O, b) ? 1 : D ? aa(D, a) - aa(D, b) : 0 : 4 & c ? -1 : 1)
        } : function (a, b) {
          if (a === b) return E = !0, 0;
          var c, e = 0,
            f = a.parentNode,
            h = b.parentNode,
            i = [a],
            j = [b];
          if (!f || !h) return a === d ? -1 : b === d ? 1 : f ? -1 : h ? 1 : D ? aa(D, a) - aa(D, b) : 0;
          if (f === h) return g(a, b);
          for (c = a; c = c.parentNode;) i.unshift(c);
          for (c = b; c = c.parentNode;) j.unshift(c);
          for (; i[e] === j[e];) e++;
          return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
        }, d) : G
      }, b.matches = function (a, c) {
        return b(a, null, null, c)
      }, b.matchesSelector = function (a, c) {
        if ((a.ownerDocument || a) !== G && F(a), c = c.replace(la, "='$1']"), !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try {
          var d = L.call(a, c);
          if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
        } catch (e) {}
        return b(c, G, null, [a]).length > 0
      }, b.contains = function (a, b) {
        return (a.ownerDocument || a) !== G && F(a), M(a, b)
      }, b.attr = function (a, b) {
        (a.ownerDocument || a) !== G && F(a);
        var c = w.attrHandle[b.toLowerCase()],
          d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
        return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
      }, b.error = function (a) {
        throw new Error("Syntax error, unrecognized expression: " + a)
      }, b.uniqueSort = function (a) {
        var b, c = [],
          d = 0,
          e = 0;
        if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
          for (; b = a[e++];) b === a[e] && (d = c.push(e));
          for (; d--;) a.splice(c[d], 1)
        }
        return D = null, a
      }, x = b.getText = function (a) {
        var b, c = "",
          d = 0,
          e = a.nodeType;
        if (e) {
          if (1 === e || 9 === e || 11 === e) {
            if ("string" == typeof a.textContent) return a.textContent;
            for (a = a.firstChild; a; a = a.nextSibling) c += x(a)
          } else if (3 === e || 4 === e) return a.nodeValue
        } else
          for (; b = a[d++];) c += x(b);
        return c
      }, w = b.selectors = {
        cacheLength: 50,
        createPseudo: d,
        match: oa,
        attrHandle: {},
        find: {},
        relative: {
          ">": {
            dir: "parentNode",
            first: !0
          },
          " ": {
            dir: "parentNode"
          },
          "+": {
            dir: "previousSibling",
            first: !0
          },
          "~": {
            dir: "previousSibling"
          }
        },
        preFilter: {
          ATTR: function (a) {
            return a[1] = a[1].replace(va, wa), a[3] = (a[3] || a[4] || a[5] || "").replace(va, wa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);

          },
          CHILD: function (a) {
            return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
          },
          PSEUDO: function (a) {
            var b, c = !a[6] && a[2];
            return oa.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ma.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
          }
        },
        filter: {
          TAG: function (a) {
            var b = a.replace(va, wa).toLowerCase();
            return "*" === a ? function () {
              return !0
            } : function (a) {
              return a.nodeName && a.nodeName.toLowerCase() === b
            }
          },
          CLASS: function (a) {
            var b = R[a + " "];
            return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && R(a, function (a) {
              return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
            })
          },
          ATTR: function (a, c, d) {
            return function (e) {
              var f = b.attr(e, a);
              return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ha, " ") + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
            }
          },
          CHILD: function (a, b, c, d, e) {
            var f = "nth" !== a.slice(0, 3),
              g = "last" !== a.slice(-4),
              h = "of-type" === b;
            return 1 === d && 0 === e ? function (a) {
              return !!a.parentNode
            } : function (b, c, i) {
              var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                q = b.parentNode,
                r = h && b.nodeName.toLowerCase(),
                s = !i && !h;
              if (q) {
                if (f) {
                  for (; p;) {
                    for (l = b; l = l[p];)
                      if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                    o = p = "only" === a && !o && "nextSibling"
                  }
                  return !0
                }
                if (o = [g ? q.firstChild : q.lastChild], g && s) {
                  for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                    if (1 === l.nodeType && ++m && l === b) {
                      k[a] = [P, n, m];
                      break
                    }
                } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
                else
                  for (;
                    (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
                return m -= e, m === d || m % d === 0 && m / d >= 0
              }
            }
          },
          PSEUDO: function (a, c) {
            var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
            return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function (a, b) {
              for (var d, e = f(a, c), g = e.length; g--;) d = aa(a, e[g]), a[d] = !(b[d] = e[g])
            }) : function (a) {
              return f(a, 0, e)
            }) : f
          }
        },
        pseudos: {
          not: d(function (a) {
            var b = [],
              c = [],
              e = A(a.replace(ia, "$1"));
            return e[N] ? d(function (a, b, c, d) {
              for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
            }) : function (a, d, f) {
              return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop()
            }
          }),
          has: d(function (a) {
            return function (c) {
              return b(a, c).length > 0
            }
          }),
          contains: d(function (a) {
            return a = a.replace(va, wa),
              function (b) {
                return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
              }
          }),
          lang: d(function (a) {
            return na.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(va, wa).toLowerCase(),
              function (b) {
                var c;
                do
                  if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
                while ((b = b.parentNode) && 1 === b.nodeType);
                return !1
              }
          }),
          target: function (b) {
            var c = a.location && a.location.hash;
            return c && c.slice(1) === b.id
          },
          root: function (a) {
            return a === H
          },
          focus: function (a) {
            return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
          },
          enabled: function (a) {
            return a.disabled === !1
          },
          disabled: function (a) {
            return a.disabled === !0
          },
          checked: function (a) {
            var b = a.nodeName.toLowerCase();
            return "input" === b && !!a.checked || "option" === b && !!a.selected
          },
          selected: function (a) {
            return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
          },
          empty: function (a) {
            for (a = a.firstChild; a; a = a.nextSibling)
              if (a.nodeType < 6) return !1;
            return !0
          },
          parent: function (a) {
            return !w.pseudos.empty(a)
          },
          header: function (a) {
            return qa.test(a.nodeName)
          },
          input: function (a) {
            return pa.test(a.nodeName)
          },
          button: function (a) {
            var b = a.nodeName.toLowerCase();
            return "input" === b && "button" === a.type || "button" === b
          },
          text: function (a) {
            var b;
            return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
          },
          first: j(function () {
            return [0]
          }),
          last: j(function (a, b) {
            return [b - 1]
          }),
          eq: j(function (a, b, c) {
            return [0 > c ? c + b : c]
          }),
          even: j(function (a, b) {
            for (var c = 0; b > c; c += 2) a.push(c);
            return a
          }),
          odd: j(function (a, b) {
            for (var c = 1; b > c; c += 2) a.push(c);
            return a
          }),
          lt: j(function (a, b, c) {
            for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
            return a
          }),
          gt: j(function (a, b, c) {
            for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
            return a
          })
        }
      }, w.pseudos.nth = w.pseudos.eq;
      for (u in {
          radio: !0,
          checkbox: !0,
          file: !0,
          password: !0,
          image: !0
        }) w.pseudos[u] = h(u);
      for (u in {
          submit: !0,
          reset: !0
        }) w.pseudos[u] = i(u);
      return l.prototype = w.filters = w.pseudos, w.setFilters = new l, z = b.tokenize = function (a, c) {
        var d, e, f, g, h, i, j, k = S[a + " "];
        if (k) return c ? 0 : k.slice(0);
        for (h = a, i = [], j = w.preFilter; h;) {
          (!d || (e = ja.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ka.exec(h)) && (d = e.shift(), f.push({
            value: d,
            type: e[0].replace(ia, " ")
          }), h = h.slice(d.length));
          for (g in w.filter) !(e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
            value: d,
            type: g,
            matches: e
          }), h = h.slice(d.length));
          if (!d) break
        }
        return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
      }, A = b.compile = function (a, b) {
        var c, d = [],
          e = [],
          f = T[a + " "];
        if (!f) {
          for (b || (b = z(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
          f = T(a, t(e, d)), f.selector = a
        }
        return f
      }, B = b.select = function (a, b, c, d) {
        var e, f, g, h, i, j = "function" == typeof a && a,
          l = !d && z(a = j.selector || a);
        if (c = c || [], 1 === l.length) {
          if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
            if (b = (w.find.ID(g.matches[0].replace(va, wa), b) || [])[0], !b) return c;
            j && (b = b.parentNode), a = a.slice(f.shift().value.length)
          }
          for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);)
            if ((i = w.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) {
              if (f.splice(e, 1), a = d.length && m(f), !a) return $.apply(c, d), c;
              break
            }
        }
        return (j || A(a, l))(d, b, !I, c, ta.test(a) && k(b.parentNode) || b), c
      }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, F(), v.sortDetached = e(function (a) {
        return 1 & a.compareDocumentPosition(G.createElement("div"))
      }), e(function (a) {
        return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
      }) || f("type|href|height|width", function (a, b, c) {
        return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
      }), v.attributes && e(function (a) {
        return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
      }) || f("value", function (a, b, c) {
        return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
      }), e(function (a) {
        return null == a.getAttribute("disabled")
      }) || f(ba, function (a, b, c) {
        var d;
        return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
      }), b
    }(a);
    _.find = ea, _.expr = ea.selectors, _.expr[":"] = _.expr.pseudos, _.unique = ea.uniqueSort, _.text = ea.getText, _.isXMLDoc = ea.isXML, _.contains = ea.contains;
    var fa = _.expr.match.needsContext,
      ga = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      ha = /^.[^:#\[\.,]*$/;
    _.filter = function (a, b, c) {
      var d = b[0];
      return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? _.find.matchesSelector(d, a) ? [d] : [] : _.find.matches(a, _.grep(b, function (a) {
        return 1 === a.nodeType
      }))
    }, _.fn.extend({
      find: function (a) {
        var b, c = this.length,
          d = [],
          e = this;
        if ("string" != typeof a) return this.pushStack(_(a).filter(function () {
          for (b = 0; c > b; b++)
            if (_.contains(e[b], this)) return !0
        }));
        for (b = 0; c > b; b++) _.find(a, e[b], d);
        return d = this.pushStack(c > 1 ? _.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
      },
      filter: function (a) {
        return this.pushStack(d(this, a || [], !1))
      },
      not: function (a) {
        return this.pushStack(d(this, a || [], !0))
      },
      is: function (a) {
        return !!d(this, "string" == typeof a && fa.test(a) ? _(a) : a || [], !1).length
      }
    });
    var ia, ja = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      ka = _.fn.init = function (a, b) {
        var c, d;
        if (!a) return this;
        if ("string" == typeof a) {
          if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : ja.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || ia).find(a) : this.constructor(b).find(a);
          if (c[1]) {
            if (b = b instanceof _ ? b[0] : b, _.merge(this, _.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : Z, !0)), ga.test(c[1]) && _.isPlainObject(b))
              for (c in b) _.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
            return this
          }
          return d = Z.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = Z, this.selector = a, this
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : _.isFunction(a) ? "undefined" != typeof ia.ready ? ia.ready(a) : a(_) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), _.makeArray(a, this))
      };
    ka.prototype = _.fn, ia = _(Z);
    var la = /^(?:parents|prev(?:Until|All))/,
      ma = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
      };
    _.extend({
      dir: function (a, b, c) {
        for (var d = [], e = void 0 !== c;
          (a = a[b]) && 9 !== a.nodeType;)
          if (1 === a.nodeType) {
            if (e && _(a).is(c)) break;
            d.push(a)
          }
        return d
      },
      sibling: function (a, b) {
        for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
        return c
      }
    }), _.fn.extend({
      has: function (a) {
        var b = _(a, this),
          c = b.length;
        return this.filter(function () {
          for (var a = 0; c > a; a++)
            if (_.contains(this, b[a])) return !0
        })
      },
      closest: function (a, b) {
        for (var c, d = 0, e = this.length, f = [], g = fa.test(a) || "string" != typeof a ? _(a, b || this.context) : 0; e > d; d++)
          for (c = this[d]; c && c !== b; c = c.parentNode)
            if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && _.find.matchesSelector(c, a))) {
              f.push(c);
              break
            }
        return this.pushStack(f.length > 1 ? _.unique(f) : f)
      },
      index: function (a) {
        return a ? "string" == typeof a ? U.call(_(a), this[0]) : U.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
      },
      add: function (a, b) {
        return this.pushStack(_.unique(_.merge(this.get(), _(a, b))))
      },
      addBack: function (a) {
        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
      }
    }), _.each({
      parent: function (a) {
        var b = a.parentNode;
        return b && 11 !== b.nodeType ? b : null
      },
      parents: function (a) {
        return _.dir(a, "parentNode")
      },
      parentsUntil: function (a, b, c) {
        return _.dir(a, "parentNode", c)
      },
      next: function (a) {
        return e(a, "nextSibling")
      },
      prev: function (a) {
        return e(a, "previousSibling")
      },
      nextAll: function (a) {
        return _.dir(a, "nextSibling")
      },
      prevAll: function (a) {
        return _.dir(a, "previousSibling")
      },
      nextUntil: function (a, b, c) {
        return _.dir(a, "nextSibling", c)
      },
      prevUntil: function (a, b, c) {
        return _.dir(a, "previousSibling", c)
      },
      siblings: function (a) {
        return _.sibling((a.parentNode || {}).firstChild, a)
      },
      children: function (a) {
        return _.sibling(a.firstChild)
      },
      contents: function (a) {
        return a.contentDocument || _.merge([], a.childNodes)
      }
    }, function (a, b) {
      _.fn[a] = function (c, d) {
        var e = _.map(this, b, c);
        return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = _.filter(d, e)), this.length > 1 && (ma[a] || _.unique(e), la.test(a) && e.reverse()), this.pushStack(e)
      }
    });
    var na = /\S+/g,
      oa = {};
    _.Callbacks = function (a) {
      a = "string" == typeof a ? oa[a] || f(a) : _.extend({}, a);
      var b, c, d, e, g, h, i = [],
        j = !a.once && [],
        k = function (f) {
          for (b = a.memory && f, c = !0, h = e || 0, e = 0, g = i.length, d = !0; i && g > h; h++)
            if (i[h].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
              b = !1;
              break
            }
          d = !1, i && (j ? j.length && k(j.shift()) : b ? i = [] : l.disable())
        },
        l = {
          add: function () {
            if (i) {
              var c = i.length;
              ! function f(b) {
                _.each(b, function (b, c) {
                  var d = _.type(c);
                  "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c)
                })
              }(arguments), d ? g = i.length : b && (e = c, k(b))
            }
            return this
          },
          remove: function () {
            return i && _.each(arguments, function (a, b) {
              for (var c;
                (c = _.inArray(b, i, c)) > -1;) i.splice(c, 1), d && (g >= c && g--, h >= c && h--)
            }), this
          },
          has: function (a) {
            return a ? _.inArray(a, i) > -1 : !(!i || !i.length)
          },
          empty: function () {
            return i = [], g = 0, this
          },
          disable: function () {
            return i = j = b = void 0, this
          },
          disabled: function () {
            return !i
          },
          lock: function () {
            return j = void 0, b || l.disable(), this
          },
          locked: function () {
            return !j
          },
          fireWith: function (a, b) {
            return !i || c && !j || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? j.push(b) : k(b)), this
          },
          fire: function () {
            return l.fireWith(this, arguments), this
          },
          fired: function () {
            return !!c
          }
        };
      return l
    }, _.extend({
      Deferred: function (a) {
        var b = [["resolve", "done", _.Callbacks("once memory"), "resolved"], ["reject", "fail", _.Callbacks("once memory"), "rejected"], ["notify", "progress", _.Callbacks("memory")]],
          c = "pending",
          d = {
            state: function () {
              return c
            },
            always: function () {
              return e.done(arguments).fail(arguments), this
            },
            then: function () {
              var a = arguments;
              return _.Deferred(function (c) {
                _.each(b, function (b, f) {
                  var g = _.isFunction(a[b]) && a[b];
                  e[f[1]](function () {
                    var a = g && g.apply(this, arguments);
                    a && _.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                  })
                }), a = null
              }).promise()
            },
            promise: function (a) {
              return null != a ? _.extend(a, d) : d
            }
          },
          e = {};
        return d.pipe = d.then, _.each(b, function (a, f) {
          var g = f[2],
            h = f[3];
          d[f[1]] = g.add, h && g.add(function () {
            c = h
          }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
            return e[f[0] + "With"](this === e ? d : this, arguments), this
          }, e[f[0] + "With"] = g.fireWith
        }), d.promise(e), a && a.call(e, e), e
      },
      when: function (a) {
        var b, c, d, e = 0,
          f = R.call(arguments),
          g = f.length,
          h = 1 !== g || a && _.isFunction(a.promise) ? g : 0,
          i = 1 === h ? a : _.Deferred(),
          j = function (a, c, d) {
            return function (e) {
              c[a] = this, d[a] = arguments.length > 1 ? R.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
            }
          };
        if (g > 1)
          for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && _.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
        return h || i.resolveWith(d, f), i.promise()
      }
    });
    var pa;
    _.fn.ready = function (a) {
      return _.ready.promise().done(a), this
    }, _.extend({
      isReady: !1,
      readyWait: 1,
      holdReady: function (a) {
        a ? _.readyWait++ : _.ready(!0)
      },
      ready: function (a) {
        (a === !0 ? --_.readyWait : _.isReady) || (_.isReady = !0, a !== !0 && --_.readyWait > 0 || (pa.resolveWith(Z, [_]), _.fn.triggerHandler && (_(Z).triggerHandler("ready"), _(Z).off("ready"))))
      }
    }), _.ready.promise = function (b) {
      return pa || (pa = _.Deferred(), "complete" === Z.readyState ? setTimeout(_.ready) : (Z.addEventListener("DOMContentLoaded", g, !1), a.addEventListener("load", g, !1))), pa.promise(b)
    }, _.ready.promise();
    var qa = _.access = function (a, b, c, d, e, f, g) {
      var h = 0,
        i = a.length,
        j = null == c;
      if ("object" === _.type(c)) {
        e = !0;
        for (h in c) _.access(a, b, h, c[h], !0, f, g)
      } else if (void 0 !== d && (e = !0, _.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
          return j.call(_(a), c)
        })), b))
        for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
      return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    };
    _.acceptData = function (a) {
      return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    }, h.uid = 1, h.accepts = _.acceptData, h.prototype = {
      key: function (a) {
        if (!h.accepts(a)) return 0;
        var b = {},
          c = a[this.expando];
        if (!c) {
          c = h.uid++;
          try {
            b[this.expando] = {
              value: c
            }, Object.defineProperties(a, b)
          } catch (d) {
            b[this.expando] = c, _.extend(a, b)
          }
        }
        return this.cache[c] || (this.cache[c] = {}), c
      },
      set: function (a, b, c) {
        var d, e = this.key(a),
          f = this.cache[e];
        if ("string" == typeof b) f[b] = c;
        else if (_.isEmptyObject(f)) _.extend(this.cache[e], b);
        else
          for (d in b) f[d] = b[d];
        return f
      },
      get: function (a, b) {
        var c = this.cache[this.key(a)];
        return void 0 === b ? c : c[b]
      },
      access: function (a, b, c) {
        var d;
        return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, _.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
      },
      remove: function (a, b) {
        var c, d, e, f = this.key(a),
          g = this.cache[f];
        if (void 0 === b) this.cache[f] = {};
        else {
          _.isArray(b) ? d = b.concat(b.map(_.camelCase)) : (e = _.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(na) || [])), c = d.length;
          for (; c--;) delete g[d[c]]
        }
      },
      hasData: function (a) {
        return !_.isEmptyObject(this.cache[a[this.expando]] || {})
      },
      discard: function (a) {
        a[this.expando] && delete this.cache[a[this.expando]]
      }
    };
    var ra = new h,
      sa = new h,
      ta = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      ua = /([A-Z])/g;
    _.extend({
      hasData: function (a) {
        return sa.hasData(a) || ra.hasData(a)
      },
      data: function (a, b, c) {
        return sa.access(a, b, c)
      },
      removeData: function (a, b) {
        sa.remove(a, b)
      },
      _data: function (a, b, c) {
        return ra.access(a, b, c)
      },
      _removeData: function (a, b) {
        ra.remove(a, b)
      }
    }), _.fn.extend({
      data: function (a, b) {
        var c, d, e, f = this[0],
          g = f && f.attributes;
        if (void 0 === a) {
          if (this.length && (e = sa.get(f), 1 === f.nodeType && !ra.get(f, "hasDataAttrs"))) {
            for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = _.camelCase(d.slice(5)), i(f, d, e[d])));
            ra.set(f, "hasDataAttrs", !0)
          }
          return e
        }
        return "object" == typeof a ? this.each(function () {
          sa.set(this, a)
        }) : qa(this, function (b) {
          var c, d = _.camelCase(a);
          if (f && void 0 === b) {
            if (c = sa.get(f, a), void 0 !== c) return c;
            if (c = sa.get(f, d), void 0 !== c) return c;
            if (c = i(f, d, void 0), void 0 !== c) return c
          } else this.each(function () {
            var c = sa.get(this, d);
            sa.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && sa.set(this, a, b)
          })
        }, null, b, arguments.length > 1, null, !0)
      },
      removeData: function (a) {
        return this.each(function () {
          sa.remove(this, a)
        })
      }
    }), _.extend({
      queue: function (a, b, c) {
        var d;
        return a ? (b = (b || "fx") + "queue", d = ra.get(a, b), c && (!d || _.isArray(c) ? d = ra.access(a, b, _.makeArray(c)) : d.push(c)), d || []) : void 0
      },
      dequeue: function (a, b) {
        b = b || "fx";
        var c = _.queue(a, b),
          d = c.length,
          e = c.shift(),
          f = _._queueHooks(a, b),
          g = function () {
            _.dequeue(a, b)
          };
        "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
      },
      _queueHooks: function (a, b) {
        var c = b + "queueHooks";
        return ra.get(a, c) || ra.access(a, c, {
          empty: _.Callbacks("once memory").add(function () {
            ra.remove(a, [b + "queue", c])
          })
        })
      }
    }), _.fn.extend({
      queue: function (a, b) {
        var c = 2;
        return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? _.queue(this[0], a) : void 0 === b ? this : this.each(function () {
          var c = _.queue(this, a, b);
          _._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && _.dequeue(this, a)
        })
      },
      dequeue: function (a) {
        return this.each(function () {
          _.dequeue(this, a)
        })
      },
      clearQueue: function (a) {
        return this.queue(a || "fx", [])
      },
      promise: function (a, b) {
        var c, d = 1,
          e = _.Deferred(),
          f = this,
          g = this.length,
          h = function () {
            --d || e.resolveWith(f, [f])
          };
        for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = ra.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
        return h(), e.promise(b)
      }
    });
    var va = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      wa = ["Top", "Right", "Bottom", "Left"],
      xa = function (a, b) {
        return a = b || a, "none" === _.css(a, "display") || !_.contains(a.ownerDocument, a)
      },
      ya = /^(?:checkbox|radio)$/i;
    ! function () {
      var a = Z.createDocumentFragment(),
        b = a.appendChild(Z.createElement("div")),
        c = Z.createElement("input");
      c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), Y.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", Y.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
    }();
    var za = "undefined";
    Y.focusinBubbles = "onfocusin" in a;
    var Aa = /^key/,
      Ba = /^(?:mouse|pointer|contextmenu)|click/,
      Ca = /^(?:focusinfocus|focusoutblur)$/,
      Da = /^([^.]*)(?:\.(.+)|)$/;
    _.event = {
      global: {},
      add: function (a, b, c, d, e) {
        var f, g, h, i, j, k, l, m, n, o, p, q = ra.get(a);
        if (q)
          for (c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = _.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function (b) {
              return typeof _ !== za && _.event.triggered !== b.type ? _.event.dispatch.apply(a, arguments) : void 0
            }), b = (b || "").match(na) || [""], j = b.length; j--;) h = Da.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = _.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = _.event.special[n] || {}, k = _.extend({
            type: n,
            origType: p,
            data: d,
            handler: c,
            guid: c.guid,
            selector: e,
            needsContext: e && _.expr.match.needsContext.test(e),
            namespace: o.join(".")
          }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), _.event.global[n] = !0)
      },
      remove: function (a, b, c, d, e) {
        var f, g, h, i, j, k, l, m, n, o, p, q = ra.hasData(a) && ra.get(a);
        if (q && (i = q.events)) {
          for (b = (b || "").match(na) || [""], j = b.length; j--;)
            if (h = Da.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
              for (l = _.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
              g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || _.removeEvent(a, n, q.handle), delete i[n])
            } else
              for (n in i) _.event.remove(a, n + b[j], c, d, !0);
          _.isEmptyObject(i) && (delete q.handle, ra.remove(a, "events"))
        }
      },
      trigger: function (b, c, d, e) {
        var f, g, h, i, j, k, l, m = [d || Z],
          n = X.call(b, "type") ? b.type : b,
          o = X.call(b, "namespace") ? b.namespace.split(".") : [];
        if (g = h = d = d || Z, 3 !== d.nodeType && 8 !== d.nodeType && !Ca.test(n + _.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[_.expando] ? b : new _.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : _.makeArray(c, [b]), l = _.event.special[n] || {}, e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
          if (!e && !l.noBubble && !_.isWindow(d)) {
            for (i = l.delegateType || n, Ca.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), h = g;
            h === (d.ownerDocument || Z) && m.push(h.defaultView || h.parentWindow || a)
          }
          for (f = 0;
            (g = m[f++]) && !b.isPropagationStopped();) b.type = f > 1 ? i : l.bindType || n, k = (ra.get(g, "events") || {})[b.type] && ra.get(g, "handle"), k && k.apply(g, c), k = j && g[j], k && k.apply && _.acceptData(g) && (b.result = k.apply(g, c), b.result === !1 && b.preventDefault());
          return b.type = n, e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !_.acceptData(d) || j && _.isFunction(d[n]) && !_.isWindow(d) && (h = d[j], h && (d[j] = null), _.event.triggered = n, d[n](), _.event.triggered = void 0, h && (d[j] = h)), b.result
        }
      },
      dispatch: function (a) {
        a = _.event.fix(a);
        var b, c, d, e, f, g = [],
          h = R.call(arguments),
          i = (ra.get(this, "events") || {})[a.type] || [],
          j = _.event.special[a.type] || {};
        if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
          for (g = _.event.handlers.call(this, a, i), b = 0;
            (e = g[b++]) && !a.isPropagationStopped();)
            for (a.currentTarget = e.elem, c = 0;
              (f = e.handlers[c++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(f.namespace)) && (a.handleObj = f, a.data = f.data, d = ((_.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
          return j.postDispatch && j.postDispatch.call(this, a), a.result
        }
      },
      handlers: function (a, b) {
        var c, d, e, f, g = [],
          h = b.delegateCount,
          i = a.target;
        if (h && i.nodeType && (!a.button || "click" !== a.type))
          for (; i !== this; i = i.parentNode || this)
            if (i.disabled !== !0 || "click" !== a.type) {
              for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? _(e, this).index(i) >= 0 : _.find(e, this, null, [i]).length), d[e] && d.push(f);
              d.length && g.push({
                elem: i,
                handlers: d
              })
            }
        return h < b.length && g.push({
          elem: this,
          handlers: b.slice(h)
        }), g
      },
      props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
      fixHooks: {},
      keyHooks: {
        props: "char charCode key keyCode".split(" "),
        filter: function (a, b) {
          return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
        }
      },
      mouseHooks: {
        props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
        filter: function (a, b) {
          var c, d, e, f = b.button;
          return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || Z, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
        }
      },
      fix: function (a) {
        if (a[_.expando]) return a;
        var b, c, d, e = a.type,
          f = a,
          g = this.fixHooks[e];
        for (g || (this.fixHooks[e] = g = Ba.test(e) ? this.mouseHooks : Aa.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new _.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
        return a.target || (a.target = Z), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
      },
      special: {
        load: {
          noBubble: !0
        },
        focus: {
          trigger: function () {
            return this !== l() && this.focus ? (this.focus(), !1) : void 0
          },
          delegateType: "focusin"
        },
        blur: {
          trigger: function () {
            return this === l() && this.blur ? (this.blur(), !1) : void 0
          },
          delegateType: "focusout"
        },
        click: {
          trigger: function () {
            return "checkbox" === this.type && this.click && _.nodeName(this, "input") ? (this.click(), !1) : void 0
          },
          _default: function (a) {
            return _.nodeName(a.target, "a")
          }
        },
        beforeunload: {
          postDispatch: function (a) {
            void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
          }
        }
      },
      simulate: function (a, b, c, d) {
        var e = _.extend(new _.Event, c, {
          type: a,
          isSimulated: !0,
          originalEvent: {}
        });
        d ? _.event.trigger(e, null, b) : _.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
      }
    }, _.removeEvent = function (a, b, c) {
      a.removeEventListener && a.removeEventListener(b, c, !1)
    }, _.Event = function (a, b) {
      return this instanceof _.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? j : k) : this.type = a, b && _.extend(this, b), this.timeStamp = a && a.timeStamp || _.now(), void(this[_.expando] = !0)) : new _.Event(a, b)
    }, _.Event.prototype = {
      isDefaultPrevented: k,
      isPropagationStopped: k,
      isImmediatePropagationStopped: k,
      preventDefault: function () {
        var a = this.originalEvent;
        this.isDefaultPrevented = j, a && a.preventDefault && a.preventDefault()
      },
      stopPropagation: function () {
        var a = this.originalEvent;
        this.isPropagationStopped = j, a && a.stopPropagation && a.stopPropagation()
      },
      stopImmediatePropagation: function () {
        var a = this.originalEvent;
        this.isImmediatePropagationStopped = j, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
      }
    }, _.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout"
    }, function (a, b) {
      _.event.special[a] = {
        delegateType: b,
        bindType: b,
        handle: function (a) {
          var c, d = this,
            e = a.relatedTarget,
            f = a.handleObj;
          return (!e || e !== d && !_.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
        }
      }
    }), Y.focusinBubbles || _.each({
      focus: "focusin",
      blur: "focusout"
    }, function (a, b) {
      var c = function (a) {
        _.event.simulate(b, a.target, _.event.fix(a), !0)
      };
      _.event.special[b] = {
        setup: function () {
          var d = this.ownerDocument || this,
            e = ra.access(d, b);
          e || d.addEventListener(a, c, !0), ra.access(d, b, (e || 0) + 1)
        },
        teardown: function () {
          var d = this.ownerDocument || this,
            e = ra.access(d, b) - 1;
          e ? ra.access(d, b, e) : (d.removeEventListener(a, c, !0), ra.remove(d, b))
        }
      }
    }), _.fn.extend({
      on: function (a, b, c, d, e) {
        var f, g;
        if ("object" == typeof a) {
          "string" != typeof b && (c = c || b, b = void 0);
          for (g in a) this.on(g, b, c, a[g], e);
          return this
        }
        if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = k;
        else if (!d) return this;
        return 1 === e && (f = d, d = function (a) {
          return _().off(a), f.apply(this, arguments)
        }, d.guid = f.guid || (f.guid = _.guid++)), this.each(function () {
          _.event.add(this, a, d, c, b)
        })
      },
      one: function (a, b, c, d) {
        return this.on(a, b, c, d, 1)
      },
      off: function (a, b, c) {
        var d, e;
        if (a && a.preventDefault && a.handleObj) return d = a.handleObj, _(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
        if ("object" == typeof a) {
          for (e in a) this.off(e, b, a[e]);
          return this
        }
        return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = k), this.each(function () {
          _.event.remove(this, a, c, b)
        })
      },
      trigger: function (a, b) {
        return this.each(function () {
          _.event.trigger(a, b, this)
        })
      },
      triggerHandler: function (a, b) {
        var c = this[0];
        return c ? _.event.trigger(a, b, c, !0) : void 0
      }
    });
    var Ea = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      Fa = /<([\w:]+)/,
      Ga = /<|&#?\w+;/,
      Ha = /<(?:script|style|link)/i,
      Ia = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Ja = /^$|\/(?:java|ecma)script/i,
      Ka = /^true\/(.*)/,
      La = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      Ma = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
      };
    Ma.optgroup = Ma.option, Ma.tbody = Ma.tfoot = Ma.colgroup = Ma.caption = Ma.thead, Ma.th = Ma.td, _.extend({
      clone: function (a, b, c) {
        var d, e, f, g, h = a.cloneNode(!0),
          i = _.contains(a.ownerDocument, a);
        if (!(Y.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || _.isXMLDoc(a)))
          for (g = r(h), f = r(a), d = 0, e = f.length; e > d; d++) s(f[d], g[d]);
        if (b)
          if (c)
            for (f = f || r(a), g = g || r(h), d = 0, e = f.length; e > d; d++) q(f[d], g[d]);
          else q(a, h);
        return g = r(h, "script"), g.length > 0 && p(g, !i && r(a, "script")), h
      },
      buildFragment: function (a, b, c, d) {
        for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, n = a.length; n > m; m++)
          if (e = a[m], e || 0 === e)
            if ("object" === _.type(e)) _.merge(l, e.nodeType ? [e] : e);
            else if (Ga.test(e)) {
          for (f = f || k.appendChild(b.createElement("div")), g = (Fa.exec(e) || ["", ""])[1].toLowerCase(), h = Ma[g] || Ma._default, f.innerHTML = h[1] + e.replace(Ea, "<$1></$2>") + h[2], j = h[0]; j--;) f = f.lastChild;
          _.merge(l, f.childNodes), f = k.firstChild, f.textContent = ""
        } else l.push(b.createTextNode(e));
        for (k.textContent = "", m = 0; e = l[m++];)
          if ((!d || -1 === _.inArray(e, d)) && (i = _.contains(e.ownerDocument, e), f = r(k.appendChild(e), "script"), i && p(f), c))
            for (j = 0; e = f[j++];) Ja.test(e.type || "") && c.push(e);
        return k
      },
      cleanData: function (a) {
        for (var b, c, d, e, f = _.event.special, g = 0; void 0 !== (c = a[g]); g++) {
          if (_.acceptData(c) && (e = c[ra.expando], e && (b = ra.cache[e]))) {
            if (b.events)
              for (d in b.events) f[d] ? _.event.remove(c, d) : _.removeEvent(c, d, b.handle);
            ra.cache[e] && delete ra.cache[e]
          }
          delete sa.cache[c[sa.expando]]
        }
      }
    }), _.fn.extend({
      text: function (a) {
        return qa(this, function (a) {
          return void 0 === a ? _.text(this) : this.empty().each(function () {
            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a)
          })
        }, null, a, arguments.length)
      },
      append: function () {
        return this.domManip(arguments, function (a) {
          if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
            var b = m(this, a);
            b.appendChild(a)
          }
        })
      },
      prepend: function () {
        return this.domManip(arguments, function (a) {
          if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
            var b = m(this, a);
            b.insertBefore(a, b.firstChild)
          }
        })
      },
      before: function () {
        return this.domManip(arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this)
        })
      },
      after: function () {
        return this.domManip(arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
        })
      },
      remove: function (a, b) {
        for (var c, d = a ? _.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || _.cleanData(r(c)), c.parentNode && (b && _.contains(c.ownerDocument, c) && p(r(c, "script")), c.parentNode.removeChild(c));
        return this
      },
      empty: function () {
        for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (_.cleanData(r(a, !1)), a.textContent = "");
        return this
      },
      clone: function (a, b) {
        return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
          return _.clone(this, a, b)
        })
      },
      html: function (a) {
        return qa(this, function (a) {
          var b = this[0] || {},
            c = 0,
            d = this.length;
          if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
          if ("string" == typeof a && !Ha.test(a) && !Ma[(Fa.exec(a) || ["", ""])[1].toLowerCase()]) {
            a = a.replace(Ea, "<$1></$2>");
            try {
              for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (_.cleanData(r(b, !1)), b.innerHTML = a);
              b = 0
            } catch (e) {}
          }
          b && this.empty().append(a)
        }, null, a, arguments.length)
      },
      replaceWith: function () {
        var a = arguments[0];
        return this.domManip(arguments, function (b) {
          a = this.parentNode, _.cleanData(r(this)), a && a.replaceChild(b, this)
        }), a && (a.length || a.nodeType) ? this : this.remove()
      },
      detach: function (a) {
        return this.remove(a, !0)
      },
      domManip: function (a, b) {
        a = S.apply([], a);
        var c, d, e, f, g, h, i = 0,
          j = this.length,
          k = this,
          l = j - 1,
          m = a[0],
          p = _.isFunction(m);
        if (p || j > 1 && "string" == typeof m && !Y.checkClone && Ia.test(m)) return this.each(function (c) {
          var d = k.eq(c);
          p && (a[0] = m.call(this, c, d.html())), d.domManip(a, b)
        });
        if (j && (c = _.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
          for (e = _.map(r(c, "script"), n), f = e.length; j > i; i++) g = c, i !== l && (g = _.clone(g, !0, !0), f && _.merge(e, r(g, "script"))), b.call(this[i], g, i);
          if (f)
            for (h = e[e.length - 1].ownerDocument, _.map(e, o), i = 0; f > i; i++) g = e[i], Ja.test(g.type || "") && !ra.access(g, "globalEval") && _.contains(h, g) && (g.src ? _._evalUrl && _._evalUrl(g.src) : _.globalEval(g.textContent.replace(La, "")))
        }
        return this
      }
    }), _.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    }, function (a, b) {
      _.fn[a] = function (a) {
        for (var c, d = [], e = _(a), f = e.length - 1, g = 0; f >= g; g++) c = g === f ? this : this.clone(!0), _(e[g])[b](c), T.apply(d, c.get());
        return this.pushStack(d)
      }
    });
    var Na, Oa = {},
      Pa = /^margin/,
      Qa = new RegExp("^(" + va + ")(?!px)[a-z%]+$", "i"),
      Ra = function (b) {
        return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
      };
    ! function () {
      function b() {
        g.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",
          g.innerHTML = "", e.appendChild(f);
        var b = a.getComputedStyle(g, null);
        c = "1%" !== b.top, d = "4px" === b.width, e.removeChild(f)
      }
      var c, d, e = Z.documentElement,
        f = Z.createElement("div"),
        g = Z.createElement("div");
      g.style && (g.style.backgroundClip = "content-box", g.cloneNode(!0).style.backgroundClip = "", Y.clearCloneStyle = "content-box" === g.style.backgroundClip, f.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", f.appendChild(g), a.getComputedStyle && _.extend(Y, {
        pixelPosition: function () {
          return b(), c
        },
        boxSizingReliable: function () {
          return null == d && b(), d
        },
        reliableMarginRight: function () {
          var b, c = g.appendChild(Z.createElement("div"));
          return c.style.cssText = g.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", g.style.width = "1px", e.appendChild(f), b = !parseFloat(a.getComputedStyle(c, null).marginRight), e.removeChild(f), g.removeChild(c), b
        }
      }))
    }(), _.swap = function (a, b, c, d) {
      var e, f, g = {};
      for (f in b) g[f] = a.style[f], a.style[f] = b[f];
      e = c.apply(a, d || []);
      for (f in b) a.style[f] = g[f];
      return e
    };
    var Sa = /^(none|table(?!-c[ea]).+)/,
      Ta = new RegExp("^(" + va + ")(.*)$", "i"),
      Ua = new RegExp("^([+-])=(" + va + ")", "i"),
      Va = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      Wa = {
        letterSpacing: "0",
        fontWeight: "400"
      },
      Xa = ["Webkit", "O", "Moz", "ms"];
    _.extend({
      cssHooks: {
        opacity: {
          get: function (a, b) {
            if (b) {
              var c = v(a, "opacity");
              return "" === c ? "1" : c
            }
          }
        }
      },
      cssNumber: {
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0
      },
      cssProps: {
        "float": "cssFloat"
      },
      style: function (a, b, c, d) {
        if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
          var e, f, g, h = _.camelCase(b),
            i = a.style;
          return b = _.cssProps[h] || (_.cssProps[h] = x(i, h)), g = _.cssHooks[b] || _.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Ua.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(_.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || _.cssNumber[h] || (c += "px"), Y.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0)
        }
      },
      css: function (a, b, c, d) {
        var e, f, g, h = _.camelCase(b);
        return b = _.cssProps[h] || (_.cssProps[h] = x(a.style, h)), g = _.cssHooks[b] || _.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = v(a, b, d)), "normal" === e && b in Wa && (e = Wa[b]), "" === c || c ? (f = parseFloat(e), c === !0 || _.isNumeric(f) ? f || 0 : e) : e
      }
    }), _.each(["height", "width"], function (a, b) {
      _.cssHooks[b] = {
        get: function (a, c, d) {
          return c ? Sa.test(_.css(a, "display")) && 0 === a.offsetWidth ? _.swap(a, Va, function () {
            return A(a, b, d)
          }) : A(a, b, d) : void 0
        },
        set: function (a, c, d) {
          var e = d && Ra(a);
          return y(a, c, d ? z(a, b, d, "border-box" === _.css(a, "boxSizing", !1, e), e) : 0)
        }
      }
    }), _.cssHooks.marginRight = w(Y.reliableMarginRight, function (a, b) {
      return b ? _.swap(a, {
        display: "inline-block"
      }, v, [a, "marginRight"]) : void 0
    }), _.each({
      margin: "",
      padding: "",
      border: "Width"
    }, function (a, b) {
      _.cssHooks[a + b] = {
        expand: function (c) {
          for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + wa[d] + b] = f[d] || f[d - 2] || f[0];
          return e
        }
      }, Pa.test(a) || (_.cssHooks[a + b].set = y)
    }), _.fn.extend({
      css: function (a, b) {
        return qa(this, function (a, b, c) {
          var d, e, f = {},
            g = 0;
          if (_.isArray(b)) {
            for (d = Ra(a), e = b.length; e > g; g++) f[b[g]] = _.css(a, b[g], !1, d);
            return f
          }
          return void 0 !== c ? _.style(a, b, c) : _.css(a, b)
        }, a, b, arguments.length > 1)
      },
      show: function () {
        return B(this, !0)
      },
      hide: function () {
        return B(this)
      },
      toggle: function (a) {
        return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
          xa(this) ? _(this).show() : _(this).hide()
        })
      }
    }), _.Tween = C, C.prototype = {
      constructor: C,
      init: function (a, b, c, d, e, f) {
        this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (_.cssNumber[c] ? "" : "px")
      },
      cur: function () {
        var a = C.propHooks[this.prop];
        return a && a.get ? a.get(this) : C.propHooks._default.get(this)
      },
      run: function (a) {
        var b, c = C.propHooks[this.prop];
        return this.options.duration ? this.pos = b = _.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : C.propHooks._default.set(this), this
      }
    }, C.prototype.init.prototype = C.prototype, C.propHooks = {
      _default: {
        get: function (a) {
          var b;
          return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = _.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
        },
        set: function (a) {
          _.fx.step[a.prop] ? _.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[_.cssProps[a.prop]] || _.cssHooks[a.prop]) ? _.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
        }
      }
    }, C.propHooks.scrollTop = C.propHooks.scrollLeft = {
      set: function (a) {
        a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
      }
    }, _.easing = {
      linear: function (a) {
        return a
      },
      swing: function (a) {
        return .5 - Math.cos(a * Math.PI) / 2
      }
    }, _.fx = C.prototype.init, _.fx.step = {};
    var Ya, Za, $a = /^(?:toggle|show|hide)$/,
      _a = new RegExp("^(?:([+-])=|)(" + va + ")([a-z%]*)$", "i"),
      ab = /queueHooks$/,
      bb = [G],
      cb = {
        "*": [function (a, b) {
          var c = this.createTween(a, b),
            d = c.cur(),
            e = _a.exec(b),
            f = e && e[3] || (_.cssNumber[a] ? "" : "px"),
            g = (_.cssNumber[a] || "px" !== f && +d) && _a.exec(_.css(c.elem, a)),
            h = 1,
            i = 20;
          if (g && g[3] !== f) {
            f = f || g[3], e = e || [], g = +d || 1;
            do h = h || ".5", g /= h, _.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
          }
          return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
        }]
      };
    _.Animation = _.extend(I, {
        tweener: function (a, b) {
          _.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
          for (var c, d = 0, e = a.length; e > d; d++) c = a[d], cb[c] = cb[c] || [], cb[c].unshift(b)
        },
        prefilter: function (a, b) {
          b ? bb.unshift(a) : bb.push(a)
        }
      }), _.speed = function (a, b, c) {
        var d = a && "object" == typeof a ? _.extend({}, a) : {
          complete: c || !c && b || _.isFunction(a) && a,
          duration: a,
          easing: c && b || b && !_.isFunction(b) && b
        };
        return d.duration = _.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in _.fx.speeds ? _.fx.speeds[d.duration] : _.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function () {
          _.isFunction(d.old) && d.old.call(this), d.queue && _.dequeue(this, d.queue)
        }, d
      }, _.fn.extend({
        fadeTo: function (a, b, c, d) {
          return this.filter(xa).css("opacity", 0).show().end().animate({
            opacity: b
          }, a, c, d)
        },
        animate: function (a, b, c, d) {
          var e = _.isEmptyObject(a),
            f = _.speed(b, c, d),
            g = function () {
              var b = I(this, _.extend({}, a), f);
              (e || ra.get(this, "finish")) && b.stop(!0)
            };
          return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        },
        stop: function (a, b, c) {
          var d = function (a) {
            var b = a.stop;
            delete a.stop, b(c)
          };
          return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
            var b = !0,
              e = null != a && a + "queueHooks",
              f = _.timers,
              g = ra.get(this);
            if (e) g[e] && g[e].stop && d(g[e]);
            else
              for (e in g) g[e] && g[e].stop && ab.test(e) && d(g[e]);
            for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
            (b || !c) && _.dequeue(this, a)
          })
        },
        finish: function (a) {
          return a !== !1 && (a = a || "fx"), this.each(function () {
            var b, c = ra.get(this),
              d = c[a + "queue"],
              e = c[a + "queueHooks"],
              f = _.timers,
              g = d ? d.length : 0;
            for (c.finish = !0, _.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
            for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
            delete c.finish
          })
        }
      }), _.each(["toggle", "show", "hide"], function (a, b) {
        var c = _.fn[b];
        _.fn[b] = function (a, d, e) {
          return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(E(b, !0), a, d, e)
        }
      }), _.each({
        slideDown: E("show"),
        slideUp: E("hide"),
        slideToggle: E("toggle"),
        fadeIn: {
          opacity: "show"
        },
        fadeOut: {
          opacity: "hide"
        },
        fadeToggle: {
          opacity: "toggle"
        }
      }, function (a, b) {
        _.fn[a] = function (a, c, d) {
          return this.animate(b, a, c, d)
        }
      }), _.timers = [], _.fx.tick = function () {
        var a, b = 0,
          c = _.timers;
        for (Ya = _.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
        c.length || _.fx.stop(), Ya = void 0
      }, _.fx.timer = function (a) {
        _.timers.push(a), a() ? _.fx.start() : _.timers.pop()
      }, _.fx.interval = 13, _.fx.start = function () {
        Za || (Za = setInterval(_.fx.tick, _.fx.interval))
      }, _.fx.stop = function () {
        clearInterval(Za), Za = null
      }, _.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
      }, _.fn.delay = function (a, b) {
        return a = _.fx ? _.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
          var d = setTimeout(b, a);
          c.stop = function () {
            clearTimeout(d)
          }
        })
      },
      function () {
        var a = Z.createElement("input"),
          b = Z.createElement("select"),
          c = b.appendChild(Z.createElement("option"));
        a.type = "checkbox", Y.checkOn = "" !== a.value, Y.optSelected = c.selected, b.disabled = !0, Y.optDisabled = !c.disabled, a = Z.createElement("input"), a.value = "t", a.type = "radio", Y.radioValue = "t" === a.value
      }();
    var db, eb, fb = _.expr.attrHandle;
    _.fn.extend({
      attr: function (a, b) {
        return qa(this, _.attr, a, b, arguments.length > 1)
      },
      removeAttr: function (a) {
        return this.each(function () {
          _.removeAttr(this, a)
        })
      }
    }), _.extend({
      attr: function (a, b, c) {
        var d, e, f = a.nodeType;
        if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === za ? _.prop(a, b, c) : (1 === f && _.isXMLDoc(a) || (b = b.toLowerCase(), d = _.attrHooks[b] || (_.expr.match.bool.test(b) ? eb : db)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = _.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void _.removeAttr(a, b))
      },
      removeAttr: function (a, b) {
        var c, d, e = 0,
          f = b && b.match(na);
        if (f && 1 === a.nodeType)
          for (; c = f[e++];) d = _.propFix[c] || c, _.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
      },
      attrHooks: {
        type: {
          set: function (a, b) {
            if (!Y.radioValue && "radio" === b && _.nodeName(a, "input")) {
              var c = a.value;
              return a.setAttribute("type", b), c && (a.value = c), b
            }
          }
        }
      }
    }), eb = {
      set: function (a, b, c) {
        return b === !1 ? _.removeAttr(a, c) : a.setAttribute(c, c), c
      }
    }, _.each(_.expr.match.bool.source.match(/\w+/g), function (a, b) {
      var c = fb[b] || _.find.attr;
      fb[b] = function (a, b, d) {
        var e, f;
        return d || (f = fb[b], fb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, fb[b] = f), e
      }
    });
    var gb = /^(?:input|select|textarea|button)$/i;
    _.fn.extend({
      prop: function (a, b) {
        return qa(this, _.prop, a, b, arguments.length > 1)
      },
      removeProp: function (a) {
        return this.each(function () {
          delete this[_.propFix[a] || a]
        })
      }
    }), _.extend({
      propFix: {
        "for": "htmlFor",
        "class": "className"
      },
      prop: function (a, b, c) {
        var d, e, f, g = a.nodeType;
        if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !_.isXMLDoc(a), f && (b = _.propFix[b] || b, e = _.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
      },
      propHooks: {
        tabIndex: {
          get: function (a) {
            return a.hasAttribute("tabindex") || gb.test(a.nodeName) || a.href ? a.tabIndex : -1
          }
        }
      }
    }), Y.optSelected || (_.propHooks.selected = {
      get: function (a) {
        var b = a.parentNode;
        return b && b.parentNode && b.parentNode.selectedIndex, null
      }
    }), _.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
      _.propFix[this.toLowerCase()] = this
    });
    var hb = /[\t\r\n\f]/g;
    _.fn.extend({
      addClass: function (a) {
        var b, c, d, e, f, g, h = "string" == typeof a && a,
          i = 0,
          j = this.length;
        if (_.isFunction(a)) return this.each(function (b) {
          _(this).addClass(a.call(this, b, this.className))
        });
        if (h)
          for (b = (a || "").match(na) || []; j > i; i++)
            if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hb, " ") : " ")) {
              for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
              g = _.trim(d), c.className !== g && (c.className = g)
            }
        return this
      },
      removeClass: function (a) {
        var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a,
          i = 0,
          j = this.length;
        if (_.isFunction(a)) return this.each(function (b) {
          _(this).removeClass(a.call(this, b, this.className))
        });
        if (h)
          for (b = (a || "").match(na) || []; j > i; i++)
            if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hb, " ") : "")) {
              for (f = 0; e = b[f++];)
                for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
              g = a ? _.trim(d) : "", c.className !== g && (c.className = g)
            }
        return this
      },
      toggleClass: function (a, b) {
        var c = typeof a;
        return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(_.isFunction(a) ? function (c) {
          _(this).toggleClass(a.call(this, c, this.className, b), b)
        } : function () {
          if ("string" === c)
            for (var b, d = 0, e = _(this), f = a.match(na) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
          else(c === za || "boolean" === c) && (this.className && ra.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : ra.get(this, "__className__") || "")
        })
      },
      hasClass: function (a) {
        for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
          if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(hb, " ").indexOf(b) >= 0) return !0;
        return !1
      }
    });
    var ib = /\r/g;
    _.fn.extend({
      val: function (a) {
        var b, c, d, e = this[0]; {
          if (arguments.length) return d = _.isFunction(a), this.each(function (c) {
            var e;
            1 === this.nodeType && (e = d ? a.call(this, c, _(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : _.isArray(e) && (e = _.map(e, function (a) {
              return null == a ? "" : a + ""
            })), b = _.valHooks[this.type] || _.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
          });
          if (e) return b = _.valHooks[e.type] || _.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(ib, "") : null == c ? "" : c)
        }
      }
    }), _.extend({
      valHooks: {
        option: {
          get: function (a) {
            var b = _.find.attr(a, "value");
            return null != b ? b : _.trim(_.text(a))
          }
        },
        select: {
          get: function (a) {
            for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
              if (c = d[i], !(!c.selected && i !== e || (Y.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && _.nodeName(c.parentNode, "optgroup"))) {
                if (b = _(c).val(), f) return b;
                g.push(b)
              }
            return g
          },
          set: function (a, b) {
            for (var c, d, e = a.options, f = _.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = _.inArray(d.value, f) >= 0) && (c = !0);
            return c || (a.selectedIndex = -1), f
          }
        }
      }
    }), _.each(["radio", "checkbox"], function () {
      _.valHooks[this] = {
        set: function (a, b) {
          return _.isArray(b) ? a.checked = _.inArray(_(a).val(), b) >= 0 : void 0
        }
      }, Y.checkOn || (_.valHooks[this].get = function (a) {
        return null === a.getAttribute("value") ? "on" : a.value
      })
    }), _.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
      _.fn[b] = function (a, c) {
        return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
      }
    }), _.fn.extend({
      hover: function (a, b) {
        return this.mouseenter(a).mouseleave(b || a)
      },
      bind: function (a, b, c) {
        return this.on(a, null, b, c)
      },
      unbind: function (a, b) {
        return this.off(a, null, b)
      },
      delegate: function (a, b, c, d) {
        return this.on(b, a, c, d)
      },
      undelegate: function (a, b, c) {
        return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
      }
    });
    var jb = _.now(),
      kb = /\?/;
    _.parseJSON = function (a) {
      return JSON.parse(a + "")
    }, _.parseXML = function (a) {
      var b, c;
      if (!a || "string" != typeof a) return null;
      try {
        c = new DOMParser, b = c.parseFromString(a, "text/xml")
      } catch (d) {
        b = void 0
      }
      return (!b || b.getElementsByTagName("parsererror").length) && _.error("Invalid XML: " + a), b
    };
    var lb = /#.*$/,
      mb = /([?&])_=[^&]*/,
      nb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      ob = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      pb = /^(?:GET|HEAD)$/,
      qb = /^\/\//,
      rb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      sb = {},
      tb = {},
      ub = "*/".concat("*"),
      vb = a.location.href,
      wb = rb.exec(vb.toLowerCase()) || [];
    _.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: vb,
        type: "GET",
        isLocal: ob.test(wb[1]),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": ub,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript"
        },
        contents: {
          xml: /xml/,
          html: /html/,
          json: /json/
        },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON"
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": _.parseJSON,
          "text xml": _.parseXML
        },
        flatOptions: {
          url: !0,
          context: !0
        }
      },
      ajaxSetup: function (a, b) {
        return b ? L(L(a, _.ajaxSettings), b) : L(_.ajaxSettings, a)
      },
      ajaxPrefilter: J(sb),
      ajaxTransport: J(tb),
      ajax: function (a, b) {
        function c(a, b, c, g) {
          var i, k, r, s, u, w = b;
          2 !== t && (t = 2, h && clearTimeout(h), d = void 0, f = g || "", v.readyState = a > 0 ? 4 : 0, i = a >= 200 && 300 > a || 304 === a, c && (s = M(l, v, c)), s = N(l, s, v, i), i ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (_.lastModified[e] = u), u = v.getResponseHeader("etag"), u && (_.etag[e] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, k = s.data, r = s.error, i = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || w) + "", i ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]), v.statusCode(q), q = void 0, j && n.trigger(i ? "ajaxSuccess" : "ajaxError", [v, l, i ? k : r]), p.fireWith(m, [v, w]), j && (n.trigger("ajaxComplete", [v, l]), --_.active || _.event.trigger("ajaxStop")))
        }
        "object" == typeof a && (b = a, a = void 0), b = b || {};
        var d, e, f, g, h, i, j, k, l = _.ajaxSetup({}, b),
          m = l.context || l,
          n = l.context && (m.nodeType || m.jquery) ? _(m) : _.event,
          o = _.Deferred(),
          p = _.Callbacks("once memory"),
          q = l.statusCode || {},
          r = {},
          s = {},
          t = 0,
          u = "canceled",
          v = {
            readyState: 0,
            getResponseHeader: function (a) {
              var b;
              if (2 === t) {
                if (!g)
                  for (g = {}; b = nb.exec(f);) g[b[1].toLowerCase()] = b[2];
                b = g[a.toLowerCase()]
              }
              return null == b ? null : b
            },
            getAllResponseHeaders: function () {
              return 2 === t ? f : null
            },
            setRequestHeader: function (a, b) {
              var c = a.toLowerCase();
              return t || (a = s[c] = s[c] || a, r[a] = b), this
            },
            overrideMimeType: function (a) {
              return t || (l.mimeType = a), this
            },
            statusCode: function (a) {
              var b;
              if (a)
                if (2 > t)
                  for (b in a) q[b] = [q[b], a[b]];
                else v.always(a[v.status]);
              return this
            },
            abort: function (a) {
              var b = a || u;
              return d && d.abort(b), c(0, b), this
            }
          };
        if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || vb) + "").replace(lb, "").replace(qb, wb[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = _.trim(l.dataType || "*").toLowerCase().match(na) || [""], null == l.crossDomain && (i = rb.exec(l.url.toLowerCase()), l.crossDomain = !(!i || i[1] === wb[1] && i[2] === wb[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (wb[3] || ("http:" === wb[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = _.param(l.data, l.traditional)), K(sb, l, b, v), 2 === t) return v;
        j = _.event && l.global, j && 0 === _.active++ && _.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !pb.test(l.type), e = l.url, l.hasContent || (l.data && (e = l.url += (kb.test(e) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = mb.test(e) ? e.replace(mb, "$1_=" + jb++) : e + (kb.test(e) ? "&" : "?") + "_=" + jb++)), l.ifModified && (_.lastModified[e] && v.setRequestHeader("If-Modified-Since", _.lastModified[e]), _.etag[e] && v.setRequestHeader("If-None-Match", _.etag[e])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + ub + "; q=0.01" : "") : l.accepts["*"]);
        for (k in l.headers) v.setRequestHeader(k, l.headers[k]);
        if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
        u = "abort";
        for (k in {
            success: 1,
            error: 1,
            complete: 1
          }) v[k](l[k]);
        if (d = K(tb, l, b, v)) {
          v.readyState = 1, j && n.trigger("ajaxSend", [v, l]), l.async && l.timeout > 0 && (h = setTimeout(function () {
            v.abort("timeout")
          }, l.timeout));
          try {
            t = 1, d.send(r, c)
          } catch (w) {
            if (!(2 > t)) throw w;
            c(-1, w)
          }
        } else c(-1, "No Transport");
        return v
      },
      getJSON: function (a, b, c) {
        return _.get(a, b, c, "json")
      },
      getScript: function (a, b) {
        return _.get(a, void 0, b, "script")
      }
    }), _.each(["get", "post"], function (a, b) {
      _[b] = function (a, c, d, e) {
        return _.isFunction(c) && (e = e || d, d = c, c = void 0), _.ajax({
          url: a,
          type: b,
          dataType: e,
          data: c,
          success: d
        })
      }
    }), _._evalUrl = function (a) {
      return _.ajax({
        url: a,
        type: "GET",
        dataType: "script",
        async: !1,
        global: !1,
        "throws": !0
      })
    }, _.fn.extend({
      wrapAll: function (a) {
        var b;
        return _.isFunction(a) ? this.each(function (b) {
          _(this).wrapAll(a.call(this, b))
        }) : (this[0] && (b = _(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
          for (var a = this; a.firstElementChild;) a = a.firstElementChild;
          return a
        }).append(this)), this)
      },
      wrapInner: function (a) {
        return this.each(_.isFunction(a) ? function (b) {
          _(this).wrapInner(a.call(this, b))
        } : function () {
          var b = _(this),
            c = b.contents();
          c.length ? c.wrapAll(a) : b.append(a)
        })
      },
      wrap: function (a) {
        var b = _.isFunction(a);
        return this.each(function (c) {
          _(this).wrapAll(b ? a.call(this, c) : a)
        })
      },
      unwrap: function () {
        return this.parent().each(function () {
          _.nodeName(this, "body") || _(this).replaceWith(this.childNodes)
        }).end()
      }
    }), _.expr.filters.hidden = function (a) {
      return a.offsetWidth <= 0 && a.offsetHeight <= 0
    }, _.expr.filters.visible = function (a) {
      return !_.expr.filters.hidden(a)
    };
    var xb = /%20/g,
      yb = /\[\]$/,
      zb = /\r?\n/g,
      Ab = /^(?:submit|button|image|reset|file)$/i,
      Bb = /^(?:input|select|textarea|keygen)/i;
    _.param = function (a, b) {
      var c, d = [],
        e = function (a, b) {
          b = _.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
      if (void 0 === b && (b = _.ajaxSettings && _.ajaxSettings.traditional), _.isArray(a) || a.jquery && !_.isPlainObject(a)) _.each(a, function () {
        e(this.name, this.value)
      });
      else
        for (c in a) O(c, a[c], b, e);
      return d.join("&").replace(xb, "+")
    }, _.fn.extend({
      serialize: function () {
        return _.param(this.serializeArray())
      },
      serializeArray: function () {
        return this.map(function () {
          var a = _.prop(this, "elements");
          return a ? _.makeArray(a) : this
        }).filter(function () {
          var a = this.type;
          return this.name && !_(this).is(":disabled") && Bb.test(this.nodeName) && !Ab.test(a) && (this.checked || !ya.test(a))
        }).map(function (a, b) {
          var c = _(this).val();
          return null == c ? null : _.isArray(c) ? _.map(c, function (a) {
            return {
              name: b.name,
              value: a.replace(zb, "\r\n")
            }
          }) : {
            name: b.name,
            value: c.replace(zb, "\r\n")
          }
        }).get()
      }
    }), _.ajaxSettings.xhr = function () {
      try {
        return new XMLHttpRequest
      } catch (a) {}
    };
    var Cb = 0,
      Db = {},
      Eb = {
        0: 200,
        1223: 204
      },
      Fb = _.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function () {
      for (var a in Db) Db[a]()
    }), Y.cors = !!Fb && "withCredentials" in Fb, Y.ajax = Fb = !!Fb, _.ajaxTransport(function (a) {
      var b;
      return Y.cors || Fb && !a.crossDomain ? {
        send: function (c, d) {
          var e, f = a.xhr(),
            g = ++Cb;
          if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
            for (e in a.xhrFields) f[e] = a.xhrFields[e];
          a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
          for (e in c) f.setRequestHeader(e, c[e]);
          b = function (a) {
            return function () {
              b && (delete Db[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Eb[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
                text: f.responseText
              } : void 0, f.getAllResponseHeaders()))
            }
          }, f.onload = b(), f.onerror = b("error"), b = Db[g] = b("abort");
          try {
            f.send(a.hasContent && a.data || null)
          } catch (h) {
            if (b) throw h
          }
        },
        abort: function () {
          b && b()
        }
      } : void 0
    }), _.ajaxSetup({
      accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
      },
      contents: {
        script: /(?:java|ecma)script/
      },
      converters: {
        "text script": function (a) {
          return _.globalEval(a), a
        }
      }
    }), _.ajaxPrefilter("script", function (a) {
      void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
    }), _.ajaxTransport("script", function (a) {
      if (a.crossDomain) {
        var b, c;
        return {
          send: function (d, e) {
            b = _("<script>").prop({
              async: !0,
              charset: a.scriptCharset,
              src: a.url
            }).on("load error", c = function (a) {
              b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
            }), Z.head.appendChild(b[0])
          },
          abort: function () {
            c && c()
          }
        }
      }
    });
    var Gb = [],
      Hb = /(=)\?(?=&|$)|\?\?/;
    _.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
        var a = Gb.pop() || _.expando + "_" + jb++;
        return this[a] = !0, a
      }
    }), _.ajaxPrefilter("json jsonp", function (b, c, d) {
      var e, f, g, h = b.jsonp !== !1 && (Hb.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Hb.test(b.data) && "data");
      return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = _.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Hb, "$1" + e) : b.jsonp !== !1 && (b.url += (kb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
        return g || _.error(e + " was not called"), g[0]
      }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
        g = arguments
      }, d.always(function () {
        a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Gb.push(e)), g && _.isFunction(f) && f(g[0]), g = f = void 0
      }), "script") : void 0
    }), _.parseHTML = function (a, b, c) {
      if (!a || "string" != typeof a) return null;
      "boolean" == typeof b && (c = b, b = !1), b = b || Z;
      var d = ga.exec(a),
        e = !c && [];
      return d ? [b.createElement(d[1])] : (d = _.buildFragment([a], b, e), e && e.length && _(e).remove(), _.merge([], d.childNodes))
    };
    var Ib = _.fn.load;
    _.fn.load = function (a, b, c) {
      if ("string" != typeof a && Ib) return Ib.apply(this, arguments);
      var d, e, f, g = this,
        h = a.indexOf(" ");
      return h >= 0 && (d = _.trim(a.slice(h)), a = a.slice(0, h)), _.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && _.ajax({
        url: a,
        type: e,
        dataType: "html",
        data: b
      }).done(function (a) {
        f = arguments, g.html(d ? _("<div>").append(_.parseHTML(a)).find(d) : a)
      }).complete(c && function (a, b) {
        g.each(c, f || [a.responseText, b, a])
      }), this
    }, _.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
      _.fn[b] = function (a) {
        return this.on(b, a)
      }
    }), _.expr.filters.animated = function (a) {
      return _.grep(_.timers, function (b) {
        return a === b.elem
      }).length
    };
    var Jb = a.document.documentElement;
    _.offset = {
      setOffset: function (a, b, c) {
        var d, e, f, g, h, i, j, k = _.css(a, "position"),
          l = _(a),
          m = {};
        "static" === k && (a.style.position = "relative"), h = l.offset(), f = _.css(a, "top"), i = _.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), _.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
      }
    }, _.fn.extend({
      offset: function (a) {
        if (arguments.length) return void 0 === a ? this : this.each(function (b) {
          _.offset.setOffset(this, a, b)
        });
        var b, c, d = this[0],
          e = {
            top: 0,
            left: 0
          },
          f = d && d.ownerDocument;
        if (f) return b = f.documentElement, _.contains(b, d) ? (typeof d.getBoundingClientRect !== za && (e = d.getBoundingClientRect()), c = P(f), {
          top: e.top + c.pageYOffset - b.clientTop,
          left: e.left + c.pageXOffset - b.clientLeft
        }) : e
      },
      position: function () {
        if (this[0]) {
          var a, b, c = this[0],
            d = {
              top: 0,
              left: 0
            };
          return "fixed" === _.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), _.nodeName(a[0], "html") || (d = a.offset()), d.top += _.css(a[0], "borderTopWidth", !0), d.left += _.css(a[0], "borderLeftWidth", !0)), {
            top: b.top - d.top - _.css(c, "marginTop", !0),
            left: b.left - d.left - _.css(c, "marginLeft", !0)
          }
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (var a = this.offsetParent || Jb; a && !_.nodeName(a, "html") && "static" === _.css(a, "position");) a = a.offsetParent;
          return a || Jb
        })
      }
    }), _.each({
      scrollLeft: "pageXOffset",
      scrollTop: "pageYOffset"
    }, function (b, c) {
      var d = "pageYOffset" === c;
      _.fn[b] = function (e) {
        return qa(this, function (b, e, f) {
          var g = P(b);
          return void 0 === f ? g ? g[c] : b[e] : void(g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f)
        }, b, e, arguments.length, null)
      }
    }), _.each(["top", "left"], function (a, b) {
      _.cssHooks[b] = w(Y.pixelPosition, function (a, c) {
        return c ? (c = v(a, b), Qa.test(c) ? _(a).position()[b] + "px" : c) : void 0
      })
    }), _.each({
      Height: "height",
      Width: "width"
    }, function (a, b) {
      _.each({
        padding: "inner" + a,
        content: b,
        "": "outer" + a
      }, function (c, d) {
        _.fn[d] = function (d, e) {
          var f = arguments.length && (c || "boolean" != typeof d),
            g = c || (d === !0 || e === !0 ? "margin" : "border");
          return qa(this, function (b, c, d) {
            var e;
            return _.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? _.css(b, c, g) : _.style(b, c, d, g)
          }, b, f ? d : void 0, f, null)
        }
      })
    }), _.fn.size = function () {
      return this.length
    }, _.fn.andSelf = _.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
      return _
    });
    var Kb = a.jQuery,
      Lb = a.$;
    return _.noConflict = function (b) {
      return a.$ === _ && (a.$ = Lb), b && a.jQuery === _ && (a.jQuery = Kb), _
    }, typeof b === za && (a.jQuery = a.$ = _), _
  }),
  function (a) {
    function b(b, d) {
      function e(b) {
        var c = "";
        i.variables && a.each(i.variables, function (a, b) {
          c += ("@" === a.slice(0, 1) ? "" : "@") + a + ": " + (";" === b.slice(-1) ? b : b + ";")
        }), c ? (new less.Parser).parse(c, function (a, c) {
          if (a) return g.reject(a);
          var d = b.rules;
          b.rules = b.rules.concat(c.rules), f(b), b.rules = d
        }) : f(b)
      }

      function f(a) {
        try {
          g.resolve(a.toCSS(i))
        } catch (b) {
          i.id && h[i.id] && delete h[i.id], g.reject(b)
        }
      }
      var g = a.Deferred(),
        i = d || {};
      return (i.imports ? c(b) : a.Deferred().resolve(b)).done(function (a) {
        i.id && h[i.id] ? e(h[i.id]) : (new less.Parser).parse(a, function (a, b) {
          return a ? g.reject(a) : (i.id && (h[i.id] = b), void e(b))
        })
      }), g.promise()
    }

    function c(b) {
      function c(b) {
        var c = [],
          d = null;
        return a.each(b, function (a, b) {
          c.push(d = d ? d.then(b) : b.call())
        }), a.when.apply(a, c)
      }

      function d(a, b) {
        return a = a.replace(/@import\s['"]?(.+?)['"]?\s*;/g, function (a, b) {
          return -1 != a.indexOf("url(") ? a : '@import url("' + b + '");'
        }), a.replace(j, function (a, c) {
          return a.match(/data\:image\//) ? a : a.replace(c, g(c, b).url)
        })
      }
      a(".load .text").text("Loading Dependencies");
      var e = a.Deferred(),
        f = {},
        h = g(window.location.href).host,
        i = /@import\s+url\s*\(['"]?(.+?)['"]?\)\s*;/g,
        j = /url\s*\(['"]?(.+?)['"]?\)/g;
      return function k(b) {
        var j = [];
        return b = b.replace(/@import\s['"]?(.+?)['"]?\s*;/g, function (a, b) {
          return -1 != a.indexOf("url(") ? a : '@import url("' + b + '");'
        }), b.replace(i, function (b, c) {
          return f[c] || h != g(c).host || j.push(function () {
            return a.ajax({
              url: c,
              cache: !1
            }).done(function (a) {
              f[c] = d(a.replace(/\/\*(?:[^*]|\*+[^\/*])*\*+\/|^((?!:).)?\/\/.*/g, ""), c)
            }).fail(function (a, b, d) {
              console.log(c), f[c] = "/* Can't resolve import '" + c + "' (" + b + ", " + d + ") */"
            })
          }), b
        }), c(j).always(function () {
          b = b.replace(i, function (a, b) {
            return f[b] ? f[b] : a
          }), j.length ? b = k(b) : e.resolve(b)
        }), b
      }(d(b.replace(/\/\*(?:[^*]|\*+[^\/*])*\*+\/|^((?!:).)?\/\/.*/g, ""))), e.promise()
    }

    function d(b) {
      var c, d = {},
        e = b.split("\n");
      for (c = 0, max = e.length; c < max; c++) {
        var f = a.trim(e[c]);
        if (f.length && /@[\w\-]+\s*:.[^;]*;/.test(f)) {
          var g = a.trim(f.replace(";", "").replace(/\s+/, "")).split(":");
          g[1] = a.trim(g[1].replace(";", "").split("//")[0]), d[g[0]] = g[1]
        }
      }
      return d
    }

    function e(a, b) {
      return a.replace(/url\s*\(['"]?(.+?)['"]?\)/g, function (a, c) {
        return c.match(/^(http|\/\/)/) || a.match(/data\:image\//) ? a : a.replace(c, f(g(c, b).url, b))
      })
    }

    function f(a, b) {
      var c, d, e, f, h = g(a),
        i = g(b),
        j = "";
      if (h.host !== i.host) return "";
      for (e = Math.max(i.dirs.length, h.dirs.length), f = 0; e > f && i.dirs[f] === h.dirs[f]; f++);
      for (c = h.dirs.slice(f), d = i.dirs.slice(f), f = 0; f < d.length - 1; f++) j += "../";
      for (f = 0; f < c.length - 1; f++) j += c[f] + "/";
      return j + h.file + h.query
    }

    function g(a, b) {
      var c, d, e = /^((?:[a-z-]+:)?\/\/(?:[^\/\?#]*\/)|([\/\\]))?((?:[^\/\\\?#]*[\/\\])*)([^\/\\\?#]*)([#\?].*)?$/,
        f = a.match(e),
        g = {},
        h = [];
      if (!f) throw new Exception("Could not parse url - '" + a + "'");
      if (!f[1] || f[2]) {
        if (b || (b = window.location.href), c = b.match(e), !c) throw new Exception("Could not parse url - '" + b + "'");
        f[1] = c[1], f[2] || (f[3] = c[3] + f[3])
      }
      if (f[3])
        for (h = f[3].replace("\\", "/").split("/"), d = 0; d < h.length; d++) ".." === h[d] && d > 0 && (h.splice(d - 1, 2), d -= 2);
      return g.host = f[1], g.path = f[1] + h.join("/"), g.file = f[4] || "", g.query = f[5] || "", g.url = g.path + g.file + g.query, g.dirs = h, g
    }
    var h = {};
    a.less = a.less || function () {
      return {
        getCSS: b,
        getVars: d,
        resolveImports: c,
        rewriteUrls: e,
        pathDiff: f,
        extractUrlParts: g
      }
    }()
  }(jQuery), ! function (a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
    else if ("function" == typeof define && define.amd) define([], a);
    else {
      var b;
      "undefined" != typeof window ? b = window : "undefined" != typeof global ? b = global : "undefined" != typeof self && (b = self), b.JSZip = a()
    }
  }(function () {
    return function a(b, c, d) {
      function e(g, h) {
        if (!c[g]) {
          if (!b[g]) {
            var i = "function" == typeof require && require;
            if (!h && i) return i(g, !0);
            if (f) return f(g, !0);
            throw new Error("Cannot find module '" + g + "'")
          }
          var j = c[g] = {
            exports: {}
          };
          b[g][0].call(j.exports, function (a) {
            var c = b[g][1][a];
            return e(c ? c : a)
          }, j, j.exports, a, b, c, d)
        }
        return c[g].exports
      }
      for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
      return e
    }({
      1: [function (a, b, c) {
        "use strict";
        var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        c.encode = function (a, b) {
          for (var c, e, f, g, h, i, j, k = "", l = 0; l < a.length;) c = a.charCodeAt(l++), e = a.charCodeAt(l++), f = a.charCodeAt(l++), g = c >> 2, h = (3 & c) << 4 | e >> 4, i = (15 & e) << 2 | f >> 6, j = 63 & f, isNaN(e) ? i = j = 64 : isNaN(f) && (j = 64), k = k + d.charAt(g) + d.charAt(h) + d.charAt(i) + d.charAt(j);
          return k
        }, c.decode = function (a, b) {
          var c, e, f, g, h, i, j, k = "",
            l = 0;
          for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < a.length;) g = d.indexOf(a.charAt(l++)), h = d.indexOf(a.charAt(l++)), i = d.indexOf(a.charAt(l++)), j = d.indexOf(a.charAt(l++)), c = g << 2 | h >> 4, e = (15 & h) << 4 | i >> 2, f = (3 & i) << 6 | j, k += String.fromCharCode(c), 64 != i && (k += String.fromCharCode(e)), 64 != j && (k += String.fromCharCode(f));
          return k
        }
      }, {}],
      2: [function (a, b, c) {
        "use strict";

        function d() {
          this.compressedSize = 0, this.uncompressedSize = 0, this.crc32 = 0, this.compressionMethod = null, this.compressedContent = null;

        }
        d.prototype = {
          getContent: function () {
            return null
          },
          getCompressedContent: function () {
            return null
          }
        }, b.exports = d
      }, {}],
      3: [function (a, b, c) {
        "use strict";
        c.STORE = {
          magic: "\x00\x00",
          compress: function (a, b) {
            return a
          },
          uncompress: function (a) {
            return a
          },
          compressInputType: null,
          uncompressInputType: null
        }, c.DEFLATE = a("./flate")
      }, {
        "./flate": 8
      }],
      4: [function (a, b, c) {
        "use strict";
        var d = a("./utils"),
          e = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
        b.exports = function (a, b) {
          if ("undefined" == typeof a || !a.length) return 0;
          var c = "string" !== d.getTypeOf(a);
          "undefined" == typeof b && (b = 0);
          var f = 0,
            g = 0,
            h = 0;
          b = -1 ^ b;
          for (var i = 0, j = a.length; j > i; i++) h = c ? a[i] : a.charCodeAt(i), g = 255 & (b ^ h), f = e[g], b = b >>> 8 ^ f;
          return -1 ^ b
        }
      }, {
        "./utils": 21
      }],
      5: [function (a, b, c) {
        "use strict";

        function d(a) {
          this.data = null, this.length = 0, this.index = 0
        }
        var e = a("./utils");
        d.prototype = {
          checkOffset: function (a) {
            this.checkIndex(this.index + a)
          },
          checkIndex: function (a) {
            if (this.length < a || 0 > a) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + a + "). Corrupted zip ?")
          },
          setIndex: function (a) {
            this.checkIndex(a), this.index = a
          },
          skip: function (a) {
            this.setIndex(this.index + a)
          },
          byteAt: function (a) {},
          readInt: function (a) {
            var b, c = 0;
            for (this.checkOffset(a), b = this.index + a - 1; b >= this.index; b--) c = (c << 8) + this.byteAt(b);
            return this.index += a, c
          },
          readString: function (a) {
            return e.transformTo("string", this.readData(a))
          },
          readData: function (a) {},
          lastIndexOfSignature: function (a) {},
          readDate: function () {
            var a = this.readInt(4);
            return new Date((a >> 25 & 127) + 1980, (a >> 21 & 15) - 1, a >> 16 & 31, a >> 11 & 31, a >> 5 & 63, (31 & a) << 1)
          }
        }, b.exports = d
      }, {
        "./utils": 21
      }],
      6: [function (a, b, c) {
        "use strict";
        c.base64 = !1, c.binary = !1, c.dir = !1, c.createFolders = !1, c.date = null, c.compression = null, c.compressionOptions = null, c.comment = null, c.unixPermissions = null, c.dosPermissions = null
      }, {}],
      7: [function (a, b, c) {
        "use strict";
        var d = a("./utils");
        c.string2binary = function (a) {
          return d.string2binary(a)
        }, c.string2Uint8Array = function (a) {
          return d.transformTo("uint8array", a)
        }, c.uint8Array2String = function (a) {
          return d.transformTo("string", a)
        }, c.string2Blob = function (a) {
          var b = d.transformTo("arraybuffer", a);
          return d.arrayBuffer2Blob(b)
        }, c.arrayBuffer2Blob = function (a) {
          return d.arrayBuffer2Blob(a)
        }, c.transformTo = function (a, b) {
          return d.transformTo(a, b)
        }, c.getTypeOf = function (a) {
          return d.getTypeOf(a)
        }, c.checkSupport = function (a) {
          return d.checkSupport(a)
        }, c.MAX_VALUE_16BITS = d.MAX_VALUE_16BITS, c.MAX_VALUE_32BITS = d.MAX_VALUE_32BITS, c.pretty = function (a) {
          return d.pretty(a)
        }, c.findCompression = function (a) {
          return d.findCompression(a)
        }, c.isRegExp = function (a) {
          return d.isRegExp(a)
        }
      }, {
        "./utils": 21
      }],
      8: [function (a, b, c) {
        "use strict";
        var d = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
          e = a("pako");
        c.uncompressInputType = d ? "uint8array" : "array", c.compressInputType = d ? "uint8array" : "array", c.magic = "\b\x00", c.compress = function (a, b) {
          return e.deflateRaw(a, {
            level: b.level || -1
          })
        }, c.uncompress = function (a) {
          return e.inflateRaw(a)
        }
      }, {
        pako: 24
      }],
      9: [function (a, b, c) {
        "use strict";

        function d(a, b) {
          return this instanceof d ? (this.files = {}, this.comment = null, this.root = "", a && this.load(a, b), void(this.clone = function () {
            var a = new d;
            for (var b in this) "function" != typeof this[b] && (a[b] = this[b]);
            return a
          })) : new d(a, b)
        }
        var e = a("./base64");
        d.prototype = a("./object"), d.prototype.load = a("./load"), d.support = a("./support"), d.defaults = a("./defaults"), d.utils = a("./deprecatedPublicUtils"), d.base64 = {
          encode: function (a) {
            return e.encode(a)
          },
          decode: function (a) {
            return e.decode(a)
          }
        }, d.compressions = a("./compressions"), b.exports = d
      }, {
        "./base64": 1,
        "./compressions": 3,
        "./defaults": 6,
        "./deprecatedPublicUtils": 7,
        "./load": 10,
        "./object": 13,
        "./support": 17
      }],
      10: [function (a, b, c) {
        "use strict";
        var d = a("./base64"),
          e = a("./zipEntries");
        b.exports = function (a, b) {
          var c, f, g, h;
          for (b = b || {}, b.base64 && (a = d.decode(a)), f = new e(a, b), c = f.files, g = 0; g < c.length; g++) h = c[g], this.file(h.fileName, h.decompressed, {
            binary: !0,
            optimizedBinaryString: !0,
            date: h.date,
            dir: h.dir,
            comment: h.fileComment.length ? h.fileComment : null,
            unixPermissions: h.unixPermissions,
            dosPermissions: h.dosPermissions,
            createFolders: b.createFolders
          });
          return f.zipComment.length && (this.comment = f.zipComment), this
        }
      }, {
        "./base64": 1,
        "./zipEntries": 22
      }],
      11: [function (a, b, c) {
        (function (a) {
          "use strict";
          b.exports = function (b, c) {
            return new a(b, c)
          }, b.exports.test = function (b) {
            return a.isBuffer(b)
          }
        }).call(this, "undefined" != typeof Buffer ? Buffer : void 0)
      }, {}],
      12: [function (a, b, c) {
        "use strict";

        function d(a) {
          this.data = a, this.length = this.data.length, this.index = 0
        }
        var e = a("./uint8ArrayReader");
        d.prototype = new e, d.prototype.readData = function (a) {
          this.checkOffset(a);
          var b = this.data.slice(this.index, this.index + a);
          return this.index += a, b
        }, b.exports = d
      }, {
        "./uint8ArrayReader": 18
      }],
      13: [function (a, b, c) {
        "use strict";
        var d = a("./support"),
          e = a("./utils"),
          f = a("./crc32"),
          g = a("./signature"),
          h = a("./defaults"),
          i = a("./base64"),
          j = a("./compressions"),
          k = a("./compressedObject"),
          l = a("./nodeBuffer"),
          m = a("./utf8"),
          n = a("./stringWriter"),
          o = a("./uint8ArrayWriter"),
          p = function (a) {
            if (a._data instanceof k && (a._data = a._data.getContent(), a.options.binary = !0, a.options.base64 = !1, "uint8array" === e.getTypeOf(a._data))) {
              var b = a._data;
              a._data = new Uint8Array(b.length), 0 !== b.length && a._data.set(b, 0)
            }
            return a._data
          },
          q = function (a) {
            var b = p(a),
              c = e.getTypeOf(b);
            return "string" === c ? !a.options.binary && d.nodebuffer ? l(b, "utf-8") : a.asBinary() : b
          },
          r = function (a) {
            var b = p(this);
            return null === b || "undefined" == typeof b ? "" : (this.options.base64 && (b = i.decode(b)), b = a && this.options.binary ? E.utf8decode(b) : e.transformTo("string", b), a || this.options.binary || (b = e.transformTo("string", E.utf8encode(b))), b)
          },
          s = function (a, b, c) {
            this.name = a, this.dir = c.dir, this.date = c.date, this.comment = c.comment, this.unixPermissions = c.unixPermissions, this.dosPermissions = c.dosPermissions, this._data = b, this.options = c, this._initialMetadata = {
              dir: c.dir,
              date: c.date
            }
          };
        s.prototype = {
          asText: function () {
            return r.call(this, !0)
          },
          asBinary: function () {
            return r.call(this, !1)
          },
          asNodeBuffer: function () {
            var a = q(this);
            return e.transformTo("nodebuffer", a)
          },
          asUint8Array: function () {
            var a = q(this);
            return e.transformTo("uint8array", a)
          },
          asArrayBuffer: function () {
            return this.asUint8Array().buffer
          }
        };
        var t = function (a, b) {
            var c, d = "";
            for (c = 0; b > c; c++) d += String.fromCharCode(255 & a), a >>>= 8;
            return d
          },
          u = function () {
            var a, b, c = {};
            for (a = 0; a < arguments.length; a++)
              for (b in arguments[a]) arguments[a].hasOwnProperty(b) && "undefined" == typeof c[b] && (c[b] = arguments[a][b]);
            return c
          },
          v = function (a) {
            return a = a || {}, a.base64 !== !0 || null !== a.binary && void 0 !== a.binary || (a.binary = !0), a = u(a, h), a.date = a.date || new Date, null !== a.compression && (a.compression = a.compression.toUpperCase()), a
          },
          w = function (a, b, c) {
            var d, f = e.getTypeOf(b);
            if (c = v(c), "string" == typeof c.unixPermissions && (c.unixPermissions = parseInt(c.unixPermissions, 8)), c.unixPermissions && 16384 & c.unixPermissions && (c.dir = !0), c.dosPermissions && 16 & c.dosPermissions && (c.dir = !0), c.dir && (a = y(a)), c.createFolders && (d = x(a)) && z.call(this, d, !0), c.dir || null === b || "undefined" == typeof b) c.base64 = !1, c.binary = !1, b = null, f = null;
            else if ("string" === f) c.binary && !c.base64 && c.optimizedBinaryString !== !0 && (b = e.string2binary(b));
            else {
              if (c.base64 = !1, c.binary = !0, !(f || b instanceof k)) throw new Error("The data of '" + a + "' is in an unsupported format !");
              "arraybuffer" === f && (b = e.transformTo("uint8array", b))
            }
            var g = new s(a, b, c);
            return this.files[a] = g, g
          },
          x = function (a) {
            "/" == a.slice(-1) && (a = a.substring(0, a.length - 1));
            var b = a.lastIndexOf("/");
            return b > 0 ? a.substring(0, b) : ""
          },
          y = function (a) {
            return "/" != a.slice(-1) && (a += "/"), a
          },
          z = function (a, b) {
            return b = "undefined" != typeof b ? b : !1, a = y(a), this.files[a] || w.call(this, a, null, {
              dir: !0,
              createFolders: b
            }), this.files[a]
          },
          A = function (a, b, c) {
            var d, g = new k;
            return a._data instanceof k ? (g.uncompressedSize = a._data.uncompressedSize, g.crc32 = a._data.crc32, 0 === g.uncompressedSize || a.dir ? (b = j.STORE, g.compressedContent = "", g.crc32 = 0) : a._data.compressionMethod === b.magic ? g.compressedContent = a._data.getCompressedContent() : (d = a._data.getContent(), g.compressedContent = b.compress(e.transformTo(b.compressInputType, d), c))) : (d = q(a), (!d || 0 === d.length || a.dir) && (b = j.STORE, d = ""), g.uncompressedSize = d.length, g.crc32 = f(d), g.compressedContent = b.compress(e.transformTo(b.compressInputType, d), c)), g.compressedSize = g.compressedContent.length, g.compressionMethod = b.magic, g
          },
          B = function (a, b) {
            var c = a;
            return a || (c = b ? 16893 : 33204), (65535 & c) << 16
          },
          C = function (a, b) {
            return 63 & (a || 0)
          },
          D = function (a, b, c, d, h) {
            var i, j, k, l, n = (c.compressedContent, e.transformTo("string", m.utf8encode(b.name))),
              o = b.comment || "",
              p = e.transformTo("string", m.utf8encode(o)),
              q = n.length !== b.name.length,
              r = p.length !== o.length,
              s = b.options,
              u = "",
              v = "",
              w = "";
            k = b._initialMetadata.dir !== b.dir ? b.dir : s.dir, l = b._initialMetadata.date !== b.date ? b.date : s.date;
            var x = 0,
              y = 0;
            k && (x |= 16), "UNIX" === h ? (y = 798, x |= B(b.unixPermissions, k)) : (y = 20, x |= C(b.dosPermissions, k)), i = l.getHours(), i <<= 6, i |= l.getMinutes(), i <<= 5, i |= l.getSeconds() / 2, j = l.getFullYear() - 1980, j <<= 4, j |= l.getMonth() + 1, j <<= 5, j |= l.getDate(), q && (v = t(1, 1) + t(f(n), 4) + n, u += "up" + t(v.length, 2) + v), r && (w = t(1, 1) + t(this.crc32(p), 4) + p, u += "uc" + t(w.length, 2) + w);
            var z = "";
            z += "\n\x00", z += q || r ? "\x00\b" : "\x00\x00", z += c.compressionMethod, z += t(i, 2), z += t(j, 2), z += t(c.crc32, 4), z += t(c.compressedSize, 4), z += t(c.uncompressedSize, 4), z += t(n.length, 2), z += t(u.length, 2);
            var A = g.LOCAL_FILE_HEADER + z + n + u,
              D = g.CENTRAL_FILE_HEADER + t(y, 2) + z + t(p.length, 2) + "\x00\x00\x00\x00" + t(x, 4) + t(d, 4) + n + u + p;
            return {
              fileRecord: A,
              dirRecord: D,
              compressedObject: c
            }
          },
          E = {
            load: function (a, b) {
              throw new Error("Load method is not defined. Is the file jszip-load.js included ?")
            },
            filter: function (a) {
              var b, c, d, e, f = [];
              for (b in this.files) this.files.hasOwnProperty(b) && (d = this.files[b], e = new s(d.name, d._data, u(d.options)), c = b.slice(this.root.length, b.length), b.slice(0, this.root.length) === this.root && a(c, e) && f.push(e));
              return f
            },
            file: function (a, b, c) {
              if (1 === arguments.length) {
                if (e.isRegExp(a)) {
                  var d = a;
                  return this.filter(function (a, b) {
                    return !b.dir && d.test(a)
                  })
                }
                return this.filter(function (b, c) {
                  return !c.dir && b === a
                })[0] || null
              }
              return a = this.root + a, w.call(this, a, b, c), this
            },
            folder: function (a) {
              if (!a) return this;
              if (e.isRegExp(a)) return this.filter(function (b, c) {
                return c.dir && a.test(b)
              });
              var b = this.root + a,
                c = z.call(this, b),
                d = this.clone();
              return d.root = c.name, d
            },
            remove: function (a) {
              a = this.root + a;
              var b = this.files[a];
              if (b || ("/" != a.slice(-1) && (a += "/"), b = this.files[a]), b && !b.dir) delete this.files[a];
              else
                for (var c = this.filter(function (b, c) {
                    return c.name.slice(0, a.length) === a
                  }), d = 0; d < c.length; d++) delete this.files[c[d].name];
              return this
            },
            generate: function (a) {
              a = u(a || {}, {
                base64: !0,
                compression: "STORE",
                compressionOptions: null,
                type: "base64",
                platform: "DOS",
                comment: null,
                mimeType: "application/zip"
              }), e.checkSupport(a.type), ("darwin" === a.platform || "freebsd" === a.platform || "linux" === a.platform || "sunos" === a.platform) && (a.platform = "UNIX"), "win32" === a.platform && (a.platform = "DOS");
              var b, c, d = [],
                f = 0,
                h = 0,
                k = e.transformTo("string", this.utf8encode(a.comment || this.comment || ""));
              for (var l in this.files)
                if (this.files.hasOwnProperty(l)) {
                  var m = this.files[l],
                    p = m.options.compression || a.compression.toUpperCase(),
                    q = j[p];
                  if (!q) throw new Error(p + " is not a valid compression method !");
                  var r = m.options.compressionOptions || a.compressionOptions || {},
                    s = A.call(this, m, q, r),
                    v = D.call(this, l, m, s, f, a.platform);
                  f += v.fileRecord.length + s.compressedSize, h += v.dirRecord.length, d.push(v)
                }
              var w = "";
              w = g.CENTRAL_DIRECTORY_END + "\x00\x00\x00\x00" + t(d.length, 2) + t(d.length, 2) + t(h, 4) + t(f, 4) + t(k.length, 2) + k;
              var x = a.type.toLowerCase();
              for (b = "uint8array" === x || "arraybuffer" === x || "blob" === x || "nodebuffer" === x ? new o(f + h + w.length) : new n(f + h + w.length), c = 0; c < d.length; c++) b.append(d[c].fileRecord), b.append(d[c].compressedObject.compressedContent);
              for (c = 0; c < d.length; c++) b.append(d[c].dirRecord);
              b.append(w);
              var y = b.finalize();
              switch (a.type.toLowerCase()) {
              case "uint8array":
              case "arraybuffer":
              case "nodebuffer":
                return e.transformTo(a.type.toLowerCase(), y);
              case "blob":
                return e.arrayBuffer2Blob(e.transformTo("arraybuffer", y), a.mimeType);
              case "base64":
                return a.base64 ? i.encode(y) : y;
              default:
                return y
              }
            },
            crc32: function (a, b) {
              return f(a, b)
            },
            utf8encode: function (a) {
              return e.transformTo("string", m.utf8encode(a))
            },
            utf8decode: function (a) {
              return m.utf8decode(a)
            }
          };
        b.exports = E
      }, {
        "./base64": 1,
        "./compressedObject": 2,
        "./compressions": 3,
        "./crc32": 4,
        "./defaults": 6,
        "./nodeBuffer": 11,
        "./signature": 14,
        "./stringWriter": 16,
        "./support": 17,
        "./uint8ArrayWriter": 19,
        "./utf8": 20,
        "./utils": 21
      }],
      14: [function (a, b, c) {
        "use strict";
        c.LOCAL_FILE_HEADER = "PK", c.CENTRAL_FILE_HEADER = "PK", c.CENTRAL_DIRECTORY_END = "PK", c.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", c.ZIP64_CENTRAL_DIRECTORY_END = "PK", c.DATA_DESCRIPTOR = "PK\b"
      }, {}],
      15: [function (a, b, c) {
        "use strict";

        function d(a, b) {
          this.data = a, b || (this.data = f.string2binary(this.data)), this.length = this.data.length, this.index = 0
        }
        var e = a("./dataReader"),
          f = a("./utils");
        d.prototype = new e, d.prototype.byteAt = function (a) {
          return this.data.charCodeAt(a)
        }, d.prototype.lastIndexOfSignature = function (a) {
          return this.data.lastIndexOf(a)
        }, d.prototype.readData = function (a) {
          this.checkOffset(a);
          var b = this.data.slice(this.index, this.index + a);
          return this.index += a, b
        }, b.exports = d
      }, {
        "./dataReader": 5,
        "./utils": 21
      }],
      16: [function (a, b, c) {
        "use strict";
        var d = a("./utils"),
          e = function () {
            this.data = []
          };
        e.prototype = {
          append: function (a) {
            a = d.transformTo("string", a), this.data.push(a)
          },
          finalize: function () {
            return this.data.join("")
          }
        }, b.exports = e
      }, {
        "./utils": 21
      }],
      17: [function (a, b, c) {
        (function (a) {
          "use strict";
          if (c.base64 = !0, c.array = !0, c.string = !0, c.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, c.nodebuffer = "undefined" != typeof a, c.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) c.blob = !1;
          else {
            var b = new ArrayBuffer(0);
            try {
              c.blob = 0 === new Blob([b], {
                type: "application/zip"
              }).size
            } catch (d) {
              try {
                var e = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
                  f = new e;
                f.append(b), c.blob = 0 === f.getBlob("application/zip").size
              } catch (d) {
                c.blob = !1
              }
            }
          }
        }).call(this, "undefined" != typeof Buffer ? Buffer : void 0)
      }, {}],
      18: [function (a, b, c) {
        "use strict";

        function d(a) {
          a && (this.data = a, this.length = this.data.length, this.index = 0)
        }
        var e = a("./dataReader");
        d.prototype = new e, d.prototype.byteAt = function (a) {
          return this.data[a]
        }, d.prototype.lastIndexOfSignature = function (a) {
          for (var b = a.charCodeAt(0), c = a.charCodeAt(1), d = a.charCodeAt(2), e = a.charCodeAt(3), f = this.length - 4; f >= 0; --f)
            if (this.data[f] === b && this.data[f + 1] === c && this.data[f + 2] === d && this.data[f + 3] === e) return f;
          return -1
        }, d.prototype.readData = function (a) {
          if (this.checkOffset(a), 0 === a) return new Uint8Array(0);
          var b = this.data.subarray(this.index, this.index + a);
          return this.index += a, b
        }, b.exports = d
      }, {
        "./dataReader": 5
      }],
      19: [function (a, b, c) {
        "use strict";
        var d = a("./utils"),
          e = function (a) {
            this.data = new Uint8Array(a), this.index = 0
          };
        e.prototype = {
          append: function (a) {
            0 !== a.length && (a = d.transformTo("uint8array", a), this.data.set(a, this.index), this.index += a.length)
          },
          finalize: function () {
            return this.data
          }
        }, b.exports = e
      }, {
        "./utils": 21
      }],
      20: [function (a, b, c) {
        "use strict";
        for (var d = a("./utils"), e = a("./support"), f = a("./nodeBuffer"), g = new Array(256), h = 0; 256 > h; h++) g[h] = h >= 252 ? 6 : h >= 248 ? 5 : h >= 240 ? 4 : h >= 224 ? 3 : h >= 192 ? 2 : 1;
        g[254] = g[254] = 1;
        var i = function (a) {
            var b, c, d, f, g, h = a.length,
              i = 0;
            for (f = 0; h > f; f++) c = a.charCodeAt(f), 55296 === (64512 & c) && h > f + 1 && (d = a.charCodeAt(f + 1), 56320 === (64512 & d) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++)), i += 128 > c ? 1 : 2048 > c ? 2 : 65536 > c ? 3 : 4;
            for (b = e.uint8array ? new Uint8Array(i) : new Array(i), g = 0, f = 0; i > g; f++) c = a.charCodeAt(f), 55296 === (64512 & c) && h > f + 1 && (d = a.charCodeAt(f + 1), 56320 === (64512 & d) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++)), 128 > c ? b[g++] = c : 2048 > c ? (b[g++] = 192 | c >>> 6, b[g++] = 128 | 63 & c) : 65536 > c ? (b[g++] = 224 | c >>> 12, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c) : (b[g++] = 240 | c >>> 18, b[g++] = 128 | c >>> 12 & 63, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c);
            return b
          },
          j = function (a, b) {
            var c;
            for (b = b || a.length, b > a.length && (b = a.length), c = b - 1; c >= 0 && 128 === (192 & a[c]);) c--;
            return 0 > c ? b : 0 === c ? b : c + g[a[c]] > b ? c : b
          },
          k = function (a) {
            var b, c, e, f, h = a.length,
              i = new Array(2 * h);
            for (c = 0, b = 0; h > b;)
              if (e = a[b++], 128 > e) i[c++] = e;
              else if (f = g[e], f > 4) i[c++] = 65533, b += f - 1;
            else {
              for (e &= 2 === f ? 31 : 3 === f ? 15 : 7; f > 1 && h > b;) e = e << 6 | 63 & a[b++], f--;
              f > 1 ? i[c++] = 65533 : 65536 > e ? i[c++] = e : (e -= 65536, i[c++] = 55296 | e >> 10 & 1023, i[c++] = 56320 | 1023 & e)
            }
            return i.length !== c && (i.subarray ? i = i.subarray(0, c) : i.length = c), d.applyFromCharCode(i)
          };
        c.utf8encode = function (a) {
          return e.nodebuffer ? f(a, "utf-8") : i(a)
        }, c.utf8decode = function (a) {
          if (e.nodebuffer) return d.transformTo("nodebuffer", a).toString("utf-8");
          a = d.transformTo(e.uint8array ? "uint8array" : "array", a);
          for (var b = [], c = 0, f = a.length, g = 65536; f > c;) {
            var h = j(a, Math.min(c + g, f));
            b.push(e.uint8array ? k(a.subarray(c, h)) : k(a.slice(c, h))), c = h
          }
          return b.join("")
        }
      }, {
        "./nodeBuffer": 11,
        "./support": 17,
        "./utils": 21
      }],
      21: [function (a, b, c) {
        "use strict";

        function d(a) {
          return a
        }

        function e(a, b) {
          for (var c = 0; c < a.length; ++c) b[c] = 255 & a.charCodeAt(c);
          return b
        }

        function f(a) {
          var b = 65536,
            d = [],
            e = a.length,
            f = c.getTypeOf(a),
            g = 0,
            h = !0;
          try {
            switch (f) {
            case "uint8array":
              String.fromCharCode.apply(null, new Uint8Array(0));
              break;
            case "nodebuffer":
              String.fromCharCode.apply(null, j(0))
            }
          } catch (i) {
            h = !1
          }
          if (!h) {
            for (var k = "", l = 0; l < a.length; l++) k += String.fromCharCode(a[l]);
            return k
          }
          for (; e > g && b > 1;) try {
            d.push("array" === f || "nodebuffer" === f ? String.fromCharCode.apply(null, a.slice(g, Math.min(g + b, e))) : String.fromCharCode.apply(null, a.subarray(g, Math.min(g + b, e)))), g += b
          } catch (i) {
            b = Math.floor(b / 2)
          }
          return d.join("")
        }

        function g(a, b) {
          for (var c = 0; c < a.length; c++) b[c] = a[c];
          return b
        }
        var h = a("./support"),
          i = a("./compressions"),
          j = a("./nodeBuffer");
        c.string2binary = function (a) {
          for (var b = "", c = 0; c < a.length; c++) b += String.fromCharCode(255 & a.charCodeAt(c));
          return b
        }, c.arrayBuffer2Blob = function (a, b) {
          c.checkSupport("blob"), b = b || "application/zip";
          try {
            return new Blob([a], {
              type: b
            })
          } catch (d) {
            try {
              var e = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
                f = new e;
              return f.append(a), f.getBlob(b)
            } catch (d) {
              throw new Error("Bug : can't construct the Blob.")
            }
          }
        }, c.applyFromCharCode = f;
        var k = {};
        k.string = {
          string: d,
          array: function (a) {
            return e(a, new Array(a.length))
          },
          arraybuffer: function (a) {
            return k.string.uint8array(a).buffer
          },
          uint8array: function (a) {
            return e(a, new Uint8Array(a.length))
          },
          nodebuffer: function (a) {
            return e(a, j(a.length))
          }
        }, k.array = {
          string: f,
          array: d,
          arraybuffer: function (a) {
            return new Uint8Array(a).buffer
          },
          uint8array: function (a) {
            return new Uint8Array(a)
          },
          nodebuffer: function (a) {
            return j(a)
          }
        }, k.arraybuffer = {
          string: function (a) {
            return f(new Uint8Array(a))
          },
          array: function (a) {
            return g(new Uint8Array(a), new Array(a.byteLength))
          },
          arraybuffer: d,
          uint8array: function (a) {
            return new Uint8Array(a)
          },
          nodebuffer: function (a) {
            return j(new Uint8Array(a))
          }
        }, k.uint8array = {
          string: f,
          array: function (a) {
            return g(a, new Array(a.length))
          },
          arraybuffer: function (a) {
            return a.buffer
          },
          uint8array: d,
          nodebuffer: function (a) {
            return j(a)
          }
        }, k.nodebuffer = {
          string: f,
          array: function (a) {
            return g(a, new Array(a.length))
          },
          arraybuffer: function (a) {
            return k.nodebuffer.uint8array(a).buffer
          },
          uint8array: function (a) {
            return g(a, new Uint8Array(a.length))
          },
          nodebuffer: d
        }, c.transformTo = function (a, b) {
          if (b || (b = ""), !a) return b;
          c.checkSupport(a);
          var d = c.getTypeOf(b),
            e = k[d][a](b);
          return e
        }, c.getTypeOf = function (a) {
          return "string" == typeof a ? "string" : "[object Array]" === Object.prototype.toString.call(a) ? "array" : h.nodebuffer && j.test(a) ? "nodebuffer" : h.uint8array && a instanceof Uint8Array ? "uint8array" : h.arraybuffer && a instanceof ArrayBuffer ? "arraybuffer" : void 0
        }, c.checkSupport = function (a) {
          var b = h[a.toLowerCase()];
          if (!b) throw new Error(a + " is not supported by this browser")
        }, c.MAX_VALUE_16BITS = 65535, c.MAX_VALUE_32BITS = -1, c.pretty = function (a) {
          var b, c, d = "";
          for (c = 0; c < (a || "").length; c++) b = a.charCodeAt(c), d += "\\x" + (16 > b ? "0" : "") + b.toString(16).toUpperCase();
          return d
        }, c.findCompression = function (a) {
          for (var b in i)
            if (i.hasOwnProperty(b) && i[b].magic === a) return i[b];
          return null
        }, c.isRegExp = function (a) {
          return "[object RegExp]" === Object.prototype.toString.call(a)
        }
      }, {
        "./compressions": 3,
        "./nodeBuffer": 11,
        "./support": 17
      }],
      22: [function (a, b, c) {
        "use strict";

        function d(a, b) {
          this.files = [], this.loadOptions = b, a && this.load(a)
        }
        var e = a("./stringReader"),
          f = a("./nodeBufferReader"),
          g = a("./uint8ArrayReader"),
          h = a("./utils"),
          i = a("./signature"),
          j = a("./zipEntry"),
          k = a("./support"),
          l = a("./object");
        d.prototype = {
          checkSignature: function (a) {
            var b = this.reader.readString(4);
            if (b !== a) throw new Error("Corrupted zip or bug : unexpected signature (" + h.pretty(b) + ", expected " + h.pretty(a) + ")")
          },
          readBlockEndOfCentral: function () {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2), this.zipComment = this.reader.readString(this.zipCommentLength), this.zipComment = l.utf8decode(this.zipComment)
          },
          readBlockZip64EndOfCentral: function () {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.versionMadeBy = this.reader.readString(2), this.versionNeeded = this.reader.readInt(2), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var a, b, c, d = this.zip64EndOfCentralSize - 44, e = 0; d > e;) a = this.reader.readInt(2), b = this.reader.readInt(4), c = this.reader.readString(b), this.zip64ExtensibleData[a] = {
              id: a,
              length: b,
              value: c
            }
          },
          readBlockZip64EndOfCentralLocator: function () {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), this.disksCount > 1) throw new Error("Multi-volumes zip are not supported")
          },
          readLocalFiles: function () {
            var a, b;
            for (a = 0; a < this.files.length; a++) b = this.files[a], this.reader.setIndex(b.localHeaderOffset), this.checkSignature(i.LOCAL_FILE_HEADER), b.readLocalPart(this.reader), b.handleUTF8(), b.processAttributes()
          },
          readCentralDir: function () {
            var a;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readString(4) === i.CENTRAL_FILE_HEADER;) a = new j({
              zip64: this.zip64
            }, this.loadOptions), a.readCentralPart(this.reader), this.files.push(a)
          },
          readEndOfCentral: function () {
            var a = this.reader.lastIndexOfSignature(i.CENTRAL_DIRECTORY_END);
            if (-1 === a) {
              var b = !0;
              try {
                this.reader.setIndex(0), this.checkSignature(i.LOCAL_FILE_HEADER), b = !1
              } catch (c) {}
              throw new Error(b ? "Can't find end of central directory : is this a zip file ? If it is, see http://stuk.github.io/jszip/documentation/howto/read_zip.html" : "Corrupted zip : can't find end of central directory")
            }
            if (this.reader.setIndex(a), this.checkSignature(i.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === h.MAX_VALUE_16BITS || this.diskWithCentralDirStart === h.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === h.MAX_VALUE_16BITS || this.centralDirRecords === h.MAX_VALUE_16BITS || this.centralDirSize === h.MAX_VALUE_32BITS || this.centralDirOffset === h.MAX_VALUE_32BITS) {
              if (this.zip64 = !0, a = this.reader.lastIndexOfSignature(i.ZIP64_CENTRAL_DIRECTORY_LOCATOR), -1 === a) throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");
              this.reader.setIndex(a), this.checkSignature(i.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(i.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral()
            }
          },
          prepareReader: function (a) {
            var b = h.getTypeOf(a);
            "string" !== b || k.uint8array ? "nodebuffer" === b ? this.reader = new f(a) : this.reader = new g(h.transformTo("uint8array", a)) : this.reader = new e(a, this.loadOptions.optimizedBinaryString)
          },
          load: function (a) {
            this.prepareReader(a), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles()
          }
        }, b.exports = d
      }, {
        "./nodeBufferReader": 12,
        "./object": 13,
        "./signature": 14,
        "./stringReader": 15,
        "./support": 17,
        "./uint8ArrayReader": 18,
        "./utils": 21,
        "./zipEntry": 23
      }],
      23: [function (a, b, c) {
        "use strict";

        function d(a, b) {
          this.options = a, this.loadOptions = b
        }
        var e = a("./stringReader"),
          f = a("./utils"),
          g = a("./compressedObject"),
          h = a("./object"),
          i = 0,
          j = 3;
        d.prototype = {
          isEncrypted: function () {
            return 1 === (1 & this.bitFlag)
          },
          useUTF8: function () {
            return 2048 === (2048 & this.bitFlag)
          },
          prepareCompressedContent: function (a, b, c) {
            return function () {
              var d = a.index;
              a.setIndex(b);
              var e = a.readData(c);
              return a.setIndex(d), e
            }
          },
          prepareContent: function (a, b, c, d, e) {
            return function () {
              var a = f.transformTo(d.uncompressInputType, this.getCompressedContent()),
                b = d.uncompress(a);
              if (b.length !== e) throw new Error("Bug : uncompressed data size mismatch");
              return b
            }
          },
          readLocalPart: function (a) {
            var b, c;
            if (a.skip(22), this.fileNameLength = a.readInt(2), c = a.readInt(2), this.fileName = a.readString(this.fileNameLength), a.skip(c), -1 == this.compressedSize || -1 == this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize == -1 || uncompressedSize == -1)");
            if (b = f.findCompression(this.compressionMethod), null === b) throw new Error("Corrupted zip : compression " + f.pretty(this.compressionMethod) + " unknown (inner file : " + this.fileName + ")");
            if (this.decompressed = new g, this.decompressed.compressedSize = this.compressedSize, this.decompressed.uncompressedSize = this.uncompressedSize, this.decompressed.crc32 = this.crc32, this.decompressed.compressionMethod = this.compressionMethod, this.decompressed.getCompressedContent = this.prepareCompressedContent(a, a.index, this.compressedSize, b), this.decompressed.getContent = this.prepareContent(a, a.index, this.compressedSize, b, this.uncompressedSize), this.loadOptions.checkCRC32 && (this.decompressed = f.transformTo("string", this.decompressed.getContent()), h.crc32(this.decompressed) !== this.crc32)) throw new Error("Corrupted zip : CRC32 mismatch")
          },
          readCentralPart: function (a) {
            if (this.versionMadeBy = a.readInt(2), this.versionNeeded = a.readInt(2), this.bitFlag = a.readInt(2), this.compressionMethod = a.readString(2), this.date = a.readDate(), this.crc32 = a.readInt(4), this.compressedSize = a.readInt(4), this.uncompressedSize = a.readInt(4), this.fileNameLength = a.readInt(2), this.extraFieldsLength = a.readInt(2), this.fileCommentLength = a.readInt(2), this.diskNumberStart = a.readInt(2), this.internalFileAttributes = a.readInt(2), this.externalFileAttributes = a.readInt(4), this.localHeaderOffset = a.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            this.fileName = a.readString(this.fileNameLength), this.readExtraFields(a), this.parseZIP64ExtraField(a), this.fileComment = a.readString(this.fileCommentLength)
          },
          processAttributes: function () {
            this.unixPermissions = null, this.dosPermissions = null;
            var a = this.versionMadeBy >> 8;
            this.dir = 16 & this.externalFileAttributes ? !0 : !1, a === i && (this.dosPermissions = 63 & this.externalFileAttributes), a === j && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileName.slice(-1) || (this.dir = !0)
          },
          parseZIP64ExtraField: function (a) {
            if (this.extraFields[1]) {
              var b = new e(this.extraFields[1].value);
              this.uncompressedSize === f.MAX_VALUE_32BITS && (this.uncompressedSize = b.readInt(8)), this.compressedSize === f.MAX_VALUE_32BITS && (this.compressedSize = b.readInt(8)), this.localHeaderOffset === f.MAX_VALUE_32BITS && (this.localHeaderOffset = b.readInt(8)), this.diskNumberStart === f.MAX_VALUE_32BITS && (this.diskNumberStart = b.readInt(4))
            }
          },
          readExtraFields: function (a) {
            var b, c, d, e = a.index;
            for (this.extraFields = this.extraFields || {}; a.index < e + this.extraFieldsLength;) b = a.readInt(2), c = a.readInt(2), d = a.readString(c), this.extraFields[b] = {
              id: b,
              length: c,
              value: d
            }
          },
          handleUTF8: function () {
            if (this.useUTF8()) this.fileName = h.utf8decode(this.fileName), this.fileComment = h.utf8decode(this.fileComment);
            else {
              var a = this.findExtraFieldUnicodePath();
              null !== a && (this.fileName = a);
              var b = this.findExtraFieldUnicodeComment();
              null !== b && (this.fileComment = b)
            }
          },
          findExtraFieldUnicodePath: function () {
            var a = this.extraFields[28789];
            if (a) {
              var b = new e(a.value);
              return 1 !== b.readInt(1) ? null : h.crc32(this.fileName) !== b.readInt(4) ? null : h.utf8decode(b.readString(a.length - 5))
            }
            return null
          },
          findExtraFieldUnicodeComment: function () {
            var a = this.extraFields[25461];
            if (a) {
              var b = new e(a.value);
              return 1 !== b.readInt(1) ? null : h.crc32(this.fileComment) !== b.readInt(4) ? null : h.utf8decode(b.readString(a.length - 5))
            }
            return null
          }
        }, b.exports = d
      }, {
        "./compressedObject": 2,
        "./object": 13,
        "./stringReader": 15,
        "./utils": 21
      }],
      24: [function (a, b, c) {
        "use strict";
        var d = a("./lib/utils/common").assign,
          e = a("./lib/deflate"),
          f = a("./lib/inflate"),
          g = a("./lib/zlib/constants"),
          h = {};
        d(h, e, f, g), b.exports = h
      }, {
        "./lib/deflate": 25,
        "./lib/inflate": 26,
        "./lib/utils/common": 27,
        "./lib/zlib/constants": 30
      }],
      25: [function (a, b, c) {
        "use strict";

        function d(a, b) {
          var c = new s(b);
          if (c.push(a, !0), c.err) throw c.msg;
          return c.result
        }

        function e(a, b) {
          return b = b || {}, b.raw = !0, d(a, b)
        }

        function f(a, b) {
          return b = b || {}, b.gzip = !0, d(a, b)
        }
        var g = a("./zlib/deflate.js"),
          h = a("./utils/common"),
          i = a("./utils/strings"),
          j = a("./zlib/messages"),
          k = a("./zlib/zstream"),
          l = 0,
          m = 4,
          n = 0,
          o = 1,
          p = -1,
          q = 0,
          r = 8,
          s = function (a) {
            this.options = h.assign({
              level: p,
              method: r,
              chunkSize: 16384,
              windowBits: 15,
              memLevel: 8,
              strategy: q,
              to: ""
            }, a || {});
            var b = this.options;
            b.raw && b.windowBits > 0 ? b.windowBits = -b.windowBits : b.gzip && b.windowBits > 0 && b.windowBits < 16 && (b.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new k, this.strm.avail_out = 0;
            var c = g.deflateInit2(this.strm, b.level, b.method, b.windowBits, b.memLevel, b.strategy);
            if (c !== n) throw new Error(j[c]);
            b.header && g.deflateSetHeader(this.strm, b.header)
          };
        s.prototype.push = function (a, b) {
          var c, d, e = this.strm,
            f = this.options.chunkSize;
          if (this.ended) return !1;
          d = b === ~~b ? b : b === !0 ? m : l, "string" == typeof a ? e.input = i.string2buf(a) : e.input = a, e.next_in = 0, e.avail_in = e.input.length;
          do {
            if (0 === e.avail_out && (e.output = new h.Buf8(f), e.next_out = 0, e.avail_out = f), c = g.deflate(e, d), c !== o && c !== n) return this.onEnd(c), this.ended = !0, !1;
            (0 === e.avail_out || 0 === e.avail_in && d === m) && this.onData("string" === this.options.to ? i.buf2binstring(h.shrinkBuf(e.output, e.next_out)) : h.shrinkBuf(e.output, e.next_out))
          } while ((e.avail_in > 0 || 0 === e.avail_out) && c !== o);
          return d === m ? (c = g.deflateEnd(this.strm), this.onEnd(c), this.ended = !0, c === n) : !0
        }, s.prototype.onData = function (a) {
          this.chunks.push(a)
        }, s.prototype.onEnd = function (a) {
          a === n && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = h.flattenChunks(this.chunks)), this.chunks = [], this.err = a, this.msg = this.strm.msg
        }, c.Deflate = s, c.deflate = d, c.deflateRaw = e, c.gzip = f
      }, {
        "./utils/common": 27,
        "./utils/strings": 28,
        "./zlib/deflate.js": 32,
        "./zlib/messages": 37,
        "./zlib/zstream": 39
      }],
      26: [function (a, b, c) {
        "use strict";

        function d(a, b) {
          var c = new m(b);
          if (c.push(a, !0), c.err) throw c.msg;
          return c.result
        }

        function e(a, b) {
          return b = b || {}, b.raw = !0, d(a, b)
        }
        var f = a("./zlib/inflate.js"),
          g = a("./utils/common"),
          h = a("./utils/strings"),
          i = a("./zlib/constants"),
          j = a("./zlib/messages"),
          k = a("./zlib/zstream"),
          l = a("./zlib/gzheader"),
          m = function (a) {
            this.options = g.assign({
              chunkSize: 16384,
              windowBits: 0,
              to: ""
            }, a || {});
            var b = this.options;
            b.raw && b.windowBits >= 0 && b.windowBits < 16 && (b.windowBits = -b.windowBits, 0 === b.windowBits && (b.windowBits = -15)), !(b.windowBits >= 0 && b.windowBits < 16) || a && a.windowBits || (b.windowBits += 32), b.windowBits > 15 && b.windowBits < 48 && 0 === (15 & b.windowBits) && (b.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new k, this.strm.avail_out = 0;
            var c = f.inflateInit2(this.strm, b.windowBits);
            if (c !== i.Z_OK) throw new Error(j[c]);
            this.header = new l, f.inflateGetHeader(this.strm, this.header)
          };
        m.prototype.push = function (a, b) {
          var c, d, e, j, k, l = this.strm,
            m = this.options.chunkSize;
          if (this.ended) return !1;
          d = b === ~~b ? b : b === !0 ? i.Z_FINISH : i.Z_NO_FLUSH, "string" == typeof a ? l.input = h.binstring2buf(a) : l.input = a, l.next_in = 0, l.avail_in = l.input.length;
          do {
            if (0 === l.avail_out && (l.output = new g.Buf8(m), l.next_out = 0, l.avail_out = m), c = f.inflate(l, i.Z_NO_FLUSH), c !== i.Z_STREAM_END && c !== i.Z_OK) return this.onEnd(c), this.ended = !0, !1;
            l.next_out && (0 === l.avail_out || c === i.Z_STREAM_END || 0 === l.avail_in && d === i.Z_FINISH) && ("string" === this.options.to ? (e = h.utf8border(l.output, l.next_out), j = l.next_out - e, k = h.buf2string(l.output, e), l.next_out = j, l.avail_out = m - j, j && g.arraySet(l.output, l.output, e, j, 0), this.onData(k)) : this.onData(g.shrinkBuf(l.output, l.next_out)))
          } while (l.avail_in > 0 && c !== i.Z_STREAM_END);
          return c === i.Z_STREAM_END && (d = i.Z_FINISH), d === i.Z_FINISH ? (c = f.inflateEnd(this.strm), this.onEnd(c), this.ended = !0, c === i.Z_OK) : !0
        }, m.prototype.onData = function (a) {
          this.chunks.push(a)
        }, m.prototype.onEnd = function (a) {
          a === i.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = g.flattenChunks(this.chunks)), this.chunks = [], this.err = a, this.msg = this.strm.msg
        }, c.Inflate = m, c.inflate = d, c.inflateRaw = e, c.ungzip = d
      }, {
        "./utils/common": 27,
        "./utils/strings": 28,
        "./zlib/constants": 30,
        "./zlib/gzheader": 33,
        "./zlib/inflate.js": 35,
        "./zlib/messages": 37,
        "./zlib/zstream": 39
      }],
      27: [function (a, b, c) {
        "use strict";
        var d = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
        c.assign = function (a) {
          for (var b = Array.prototype.slice.call(arguments, 1); b.length;) {
            var c = b.shift();
            if (c) {
              if ("object" != typeof c) throw new TypeError(c + "must be non-object");
              for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d])
            }
          }
          return a
        }, c.shrinkBuf = function (a, b) {
          return a.length === b ? a : a.subarray ? a.subarray(0, b) : (a.length = b, a)
        };
        var e = {
            arraySet: function (a, b, c, d, e) {
              if (b.subarray && a.subarray) return void a.set(b.subarray(c, c + d), e);
              for (var f = 0; d > f; f++) a[e + f] = b[c + f]
            },
            flattenChunks: function (a) {
              var b, c, d, e, f, g;
              for (d = 0, b = 0, c = a.length; c > b; b++) d += a[b].length;
              for (g = new Uint8Array(d), e = 0, b = 0, c = a.length; c > b; b++) f = a[b], g.set(f, e), e += f.length;
              return g
            }
          },
          f = {
            arraySet: function (a, b, c, d, e) {
              for (var f = 0; d > f; f++) a[e + f] = b[c + f]
            },
            flattenChunks: function (a) {
              return [].concat.apply([], a)
            }
          };
        c.setTyped = function (a) {
          a ? (c.Buf8 = Uint8Array, c.Buf16 = Uint16Array, c.Buf32 = Int32Array, c.assign(c, e)) : (c.Buf8 = Array, c.Buf16 = Array, c.Buf32 = Array, c.assign(c, f))
        }, c.setTyped(d)
      }, {}],
      28: [function (a, b, c) {
        "use strict";

        function d(a, b) {
          if (65537 > b && (a.subarray && g || !a.subarray && f)) return String.fromCharCode.apply(null, e.shrinkBuf(a, b));
          for (var c = "", d = 0; b > d; d++) c += String.fromCharCode(a[d]);
          return c
        }
        var e = a("./common"),
          f = !0,
          g = !0;
        try {
          String.fromCharCode.apply(null, [0])
        } catch (h) {
          f = !1
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1))
        } catch (h) {
          g = !1
        }
        for (var i = new e.Buf8(256), j = 0; 256 > j; j++) i[j] = j >= 252 ? 6 : j >= 248 ? 5 : j >= 240 ? 4 : j >= 224 ? 3 : j >= 192 ? 2 : 1;
        i[254] = i[254] = 1, c.string2buf = function (a) {
          var b, c, d, f, g, h = a.length,
            i = 0;
          for (f = 0; h > f; f++) c = a.charCodeAt(f), 55296 === (64512 & c) && h > f + 1 && (d = a.charCodeAt(f + 1), 56320 === (64512 & d) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++)), i += 128 > c ? 1 : 2048 > c ? 2 : 65536 > c ? 3 : 4;
          for (b = new e.Buf8(i), g = 0, f = 0; i > g; f++) c = a.charCodeAt(f), 55296 === (64512 & c) && h > f + 1 && (d = a.charCodeAt(f + 1), 56320 === (64512 & d) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++)), 128 > c ? b[g++] = c : 2048 > c ? (b[g++] = 192 | c >>> 6, b[g++] = 128 | 63 & c) : 65536 > c ? (b[g++] = 224 | c >>> 12, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c) : (b[g++] = 240 | c >>> 18, b[g++] = 128 | c >>> 12 & 63, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c);
          return b
        }, c.buf2binstring = function (a) {
          return d(a, a.length)
        }, c.binstring2buf = function (a) {
          for (var b = new e.Buf8(a.length), c = 0, d = b.length; d > c; c++) b[c] = a.charCodeAt(c);
          return b
        }, c.buf2string = function (a, b) {
          var c, e, f, g, h = b || a.length,
            j = new Array(2 * h);
          for (e = 0, c = 0; h > c;)
            if (f = a[c++], 128 > f) j[e++] = f;
            else if (g = i[f], g > 4) j[e++] = 65533, c += g - 1;
          else {
            for (f &= 2 === g ? 31 : 3 === g ? 15 : 7; g > 1 && h > c;) f = f << 6 | 63 & a[c++], g--;
            g > 1 ? j[e++] = 65533 : 65536 > f ? j[e++] = f : (f -= 65536, j[e++] = 55296 | f >> 10 & 1023, j[e++] = 56320 | 1023 & f)
          }
          return d(j, e)
        }, c.utf8border = function (a, b) {
          var c;
          for (b = b || a.length, b > a.length && (b = a.length), c = b - 1; c >= 0 && 128 === (192 & a[c]);) c--;
          return 0 > c ? b : 0 === c ? b : c + i[a[c]] > b ? c : b
        }
      }, {
        "./common": 27
      }],
      29: [function (a, b, c) {
        "use strict";

        function d(a, b, c, d) {
          for (var e = 65535 & a | 0, f = a >>> 16 & 65535 | 0, g = 0; 0 !== c;) {
            g = c > 2e3 ? 2e3 : c, c -= g;
            do e = e + b[d++] | 0, f = f + e | 0; while (--g);
            e %= 65521, f %= 65521
          }
          return e | f << 16 | 0
        }
        b.exports = d
      }, {}],
      30: [function (a, b, c) {
        b.exports = {
          Z_NO_FLUSH: 0,
          Z_PARTIAL_FLUSH: 1,
          Z_SYNC_FLUSH: 2,
          Z_FULL_FLUSH: 3,
          Z_FINISH: 4,
          Z_BLOCK: 5,
          Z_TREES: 6,
          Z_OK: 0,
          Z_STREAM_END: 1,
          Z_NEED_DICT: 2,
          Z_ERRNO: -1,
          Z_STREAM_ERROR: -2,
          Z_DATA_ERROR: -3,
          Z_BUF_ERROR: -5,
          Z_NO_COMPRESSION: 0,
          Z_BEST_SPEED: 1,
          Z_BEST_COMPRESSION: 9,
          Z_DEFAULT_COMPRESSION: -1,
          Z_FILTERED: 1,
          Z_HUFFMAN_ONLY: 2,
          Z_RLE: 3,
          Z_FIXED: 4,
          Z_DEFAULT_STRATEGY: 0,
          Z_BINARY: 0,
          Z_TEXT: 1,
          Z_UNKNOWN: 2,
          Z_DEFLATED: 8
        }
      }, {}],
      31: [function (a, b, c) {
        "use strict";

        function d() {
          for (var a, b = [], c = 0; 256 > c; c++) {
            a = c;
            for (var d = 0; 8 > d; d++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
            b[c] = a
          }
          return b
        }

        function e(a, b, c, d) {
          var e = f,
            g = d + c;
          a = -1 ^ a;
          for (var h = d; g > h; h++) a = a >>> 8 ^ e[255 & (a ^ b[h])];
          return -1 ^ a
        }
        var f = d();
        b.exports = e
      }, {}],
      32: [function (a, b, c) {
        "use strict";

        function d(a, b) {
          return a.msg = G[b], b
        }

        function e(a) {
          return (a << 1) - (a > 4 ? 9 : 0)
        }

        function f(a) {
          for (var b = a.length; --b >= 0;) a[b] = 0
        }

        function g(a) {
          var b = a.state,
            c = b.pending;
          c > a.avail_out && (c = a.avail_out), 0 !== c && (C.arraySet(a.output, b.pending_buf, b.pending_out, c, a.next_out), a.next_out += c, b.pending_out += c, a.total_out += c, a.avail_out -= c, b.pending -= c, 0 === b.pending && (b.pending_out = 0))
        }

        function h(a, b) {
          D._tr_flush_block(a, a.block_start >= 0 ? a.block_start : -1, a.strstart - a.block_start, b), a.block_start = a.strstart, g(a.strm)
        }

        function i(a, b) {
          a.pending_buf[a.pending++] = b
        }

        function j(a, b) {
          a.pending_buf[a.pending++] = b >>> 8 & 255, a.pending_buf[a.pending++] = 255 & b
        }

        function k(a, b, c, d) {
          var e = a.avail_in;
          return e > d && (e = d), 0 === e ? 0 : (a.avail_in -= e, C.arraySet(b, a.input, a.next_in, e, c), 1 === a.state.wrap ? a.adler = E(a.adler, b, e, c) : 2 === a.state.wrap && (a.adler = F(a.adler, b, e, c)), a.next_in += e, a.total_in += e, e)
        }

        function l(a, b) {
          var c, d, e = a.max_chain_length,
            f = a.strstart,
            g = a.prev_length,
            h = a.nice_match,
            i = a.strstart > a.w_size - ja ? a.strstart - (a.w_size - ja) : 0,
            j = a.window,
            k = a.w_mask,
            l = a.prev,
            m = a.strstart + ia,
            n = j[f + g - 1],
            o = j[f + g];
          a.prev_length >= a.good_match && (e >>= 2), h > a.lookahead && (h = a.lookahead);
          do
            if (c = b, j[c + g] === o && j[c + g - 1] === n && j[c] === j[f] && j[++c] === j[f + 1]) {
              f += 2, c++;
              do; while (j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && m > f);
              if (d = ia - (m - f), f = m - ia, d > g) {
                if (a.match_start = b, g = d, d >= h) break;
                n = j[f + g - 1], o = j[f + g]
              }
            }
          while ((b = l[b & k]) > i && 0 !== --e);
          return g <= a.lookahead ? g : a.lookahead
        }

        function m(a) {
          var b, c, d, e, f, g = a.w_size;
          do {
            if (e = a.window_size - a.lookahead - a.strstart, a.strstart >= g + (g - ja)) {
              C.arraySet(a.window, a.window, g, g, 0), a.match_start -= g, a.strstart -= g, a.block_start -= g, c = a.hash_size, b = c;
              do d = a.head[--b], a.head[b] = d >= g ? d - g : 0; while (--c);
              c = g, b = c;
              do d = a.prev[--b], a.prev[b] = d >= g ? d - g : 0; while (--c);
              e += g
            }
            if (0 === a.strm.avail_in) break;
            if (c = k(a.strm, a.window, a.strstart + a.lookahead, e), a.lookahead += c, a.lookahead + a.insert >= ha)
              for (f = a.strstart - a.insert, a.ins_h = a.window[f], a.ins_h = (a.ins_h << a.hash_shift ^ a.window[f + 1]) & a.hash_mask; a.insert && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[f + ha - 1]) & a.hash_mask, a.prev[f & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = f, f++, a.insert--, !(a.lookahead + a.insert < ha)););
          } while (a.lookahead < ja && 0 !== a.strm.avail_in)
        }

        function n(a, b) {
          var c = 65535;
          for (c > a.pending_buf_size - 5 && (c = a.pending_buf_size - 5);;) {
            if (a.lookahead <= 1) {
              if (m(a), 0 === a.lookahead && b === H) return sa;
              if (0 === a.lookahead) break
            }
            a.strstart += a.lookahead, a.lookahead = 0;
            var d = a.block_start + c;
            if ((0 === a.strstart || a.strstart >= d) && (a.lookahead = a.strstart - d, a.strstart = d, h(a, !1), 0 === a.strm.avail_out)) return sa;
            if (a.strstart - a.block_start >= a.w_size - ja && (h(a, !1), 0 === a.strm.avail_out)) return sa
          }
          return a.insert = 0, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ua : va) : a.strstart > a.block_start && (h(a, !1), 0 === a.strm.avail_out) ? sa : sa
        }

        function o(a, b) {
          for (var c, d;;) {
            if (a.lookahead < ja) {
              if (m(a), a.lookahead < ja && b === H) return sa;
              if (0 === a.lookahead) break
            }
            if (c = 0, a.lookahead >= ha && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + ha - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart), 0 !== c && a.strstart - c <= a.w_size - ja && (a.match_length = l(a, c)), a.match_length >= ha)
              if (d = D._tr_tally(a, a.strstart - a.match_start, a.match_length - ha), a.lookahead -= a.match_length, a.match_length <= a.max_lazy_match && a.lookahead >= ha) {
                a.match_length--;
                do a.strstart++, a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + ha - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart; while (0 !== --a.match_length);
                a.strstart++
              } else a.strstart += a.match_length, a.match_length = 0, a.ins_h = a.window[a.strstart], a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 1]) & a.hash_mask;
            else d = D._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++;
            if (d && (h(a, !1), 0 === a.strm.avail_out)) return sa
          }
          return a.insert = a.strstart < ha - 1 ? a.strstart : ha - 1, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ua : va) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? sa : ta
        }

        function p(a, b) {
          for (var c, d, e;;) {
            if (a.lookahead < ja) {
              if (m(a), a.lookahead < ja && b === H) return sa;
              if (0 === a.lookahead) break
            }
            if (c = 0, a.lookahead >= ha && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + ha - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart), a.prev_length = a.match_length, a.prev_match = a.match_start, a.match_length = ha - 1, 0 !== c && a.prev_length < a.max_lazy_match && a.strstart - c <= a.w_size - ja && (a.match_length = l(a, c), a.match_length <= 5 && (a.strategy === S || a.match_length === ha && a.strstart - a.match_start > 4096) && (a.match_length = ha - 1)), a.prev_length >= ha && a.match_length <= a.prev_length) {
              e = a.strstart + a.lookahead - ha, d = D._tr_tally(a, a.strstart - 1 - a.prev_match, a.prev_length - ha), a.lookahead -= a.prev_length - 1, a.prev_length -= 2;
              do ++a.strstart <= e && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + ha - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart); while (0 !== --a.prev_length);
              if (a.match_available = 0, a.match_length = ha - 1, a.strstart++, d && (h(a, !1), 0 === a.strm.avail_out)) return sa
            } else if (a.match_available) {
              if (d = D._tr_tally(a, 0, a.window[a.strstart - 1]), d && h(a, !1), a.strstart++, a.lookahead--, 0 === a.strm.avail_out) return sa
            } else a.match_available = 1, a.strstart++, a.lookahead--
          }
          return a.match_available && (d = D._tr_tally(a, 0, a.window[a.strstart - 1]), a.match_available = 0), a.insert = a.strstart < ha - 1 ? a.strstart : ha - 1, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ua : va) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? sa : ta
        }

        function q(a, b) {
          for (var c, d, e, f, g = a.window;;) {
            if (a.lookahead <= ia) {
              if (m(a), a.lookahead <= ia && b === H) return sa;
              if (0 === a.lookahead) break
            }
            if (a.match_length = 0, a.lookahead >= ha && a.strstart > 0 && (e = a.strstart - 1, d = g[e], d === g[++e] && d === g[++e] && d === g[++e])) {
              f = a.strstart + ia;
              do; while (d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && f > e);
              a.match_length = ia - (f - e), a.match_length > a.lookahead && (a.match_length = a.lookahead)
            }
            if (a.match_length >= ha ? (c = D._tr_tally(a, 1, a.match_length - ha), a.lookahead -= a.match_length, a.strstart += a.match_length, a.match_length = 0) : (c = D._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++), c && (h(a, !1), 0 === a.strm.avail_out)) return sa
          }
          return a.insert = 0, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ua : va) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? sa : ta
        }

        function r(a, b) {
          for (var c;;) {
            if (0 === a.lookahead && (m(a), 0 === a.lookahead)) {
              if (b === H) return sa;
              break
            }
            if (a.match_length = 0, c = D._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++, c && (h(a, !1), 0 === a.strm.avail_out)) return sa
          }
          return a.insert = 0, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ua : va) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? sa : ta
        }

        function s(a) {
          a.window_size = 2 * a.w_size, f(a.head), a.max_lazy_match = B[a.level].max_lazy, a.good_match = B[a.level].good_length, a.nice_match = B[a.level].nice_length, a.max_chain_length = B[a.level].max_chain, a.strstart = 0, a.block_start = 0, a.lookahead = 0, a.insert = 0, a.match_length = a.prev_length = ha - 1, a.match_available = 0, a.ins_h = 0
        }

        function t() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Y, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new C.Buf16(2 * fa), this.dyn_dtree = new C.Buf16(2 * (2 * da + 1)), this.bl_tree = new C.Buf16(2 * (2 * ea + 1)), f(this.dyn_ltree), f(this.dyn_dtree), f(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new C.Buf16(ga + 1), this.heap = new C.Buf16(2 * ca + 1), f(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new C.Buf16(2 * ca + 1), f(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
        }

        function u(a) {
          var b;
          return a && a.state ? (a.total_in = a.total_out = 0, a.data_type = X, b = a.state, b.pending = 0, b.pending_out = 0, b.wrap < 0 && (b.wrap = -b.wrap), b.status = b.wrap ? la : qa, a.adler = 2 === b.wrap ? 0 : 1, b.last_flush = H, D._tr_init(b), M) : d(a, O)
        }

        function v(a) {
          var b = u(a);
          return b === M && s(a.state), b
        }

        function w(a, b) {
          return a && a.state ? 2 !== a.state.wrap ? O : (a.state.gzhead = b, M) : O
        }

        function x(a, b, c, e, f, g) {
          if (!a) return O;
          var h = 1;
          if (b === R && (b = 6), 0 > e ? (h = 0, e = -e) : e > 15 && (h = 2, e -= 16), 1 > f || f > Z || c !== Y || 8 > e || e > 15 || 0 > b || b > 9 || 0 > g || g > V) return d(a, O);
          8 === e && (e = 9);
          var i = new t;
          return a.state = i, i.strm = a, i.wrap = h, i.gzhead = null, i.w_bits = e, i.w_size = 1 << i.w_bits, i.w_mask = i.w_size - 1, i.hash_bits = f + 7, i.hash_size = 1 << i.hash_bits, i.hash_mask = i.hash_size - 1, i.hash_shift = ~~((i.hash_bits + ha - 1) / ha), i.window = new C.Buf8(2 * i.w_size), i.head = new C.Buf16(i.hash_size), i.prev = new C.Buf16(i.w_size), i.lit_bufsize = 1 << f + 6, i.pending_buf_size = 4 * i.lit_bufsize, i.pending_buf = new C.Buf8(i.pending_buf_size), i.d_buf = i.lit_bufsize >> 1, i.l_buf = 3 * i.lit_bufsize, i.level = b, i.strategy = g, i.method = c, v(a)
        }

        function y(a, b) {
          return x(a, b, Y, $, _, W)
        }

        function z(a, b) {
          var c, h, k, l;
          if (!a || !a.state || b > L || 0 > b) return a ? d(a, O) : O;
          if (h = a.state, !a.output || !a.input && 0 !== a.avail_in || h.status === ra && b !== K) return d(a, 0 === a.avail_out ? Q : O);
          if (h.strm = a, c = h.last_flush, h.last_flush = b, h.status === la)
            if (2 === h.wrap) a.adler = 0, i(h, 31), i(h, 139), i(h, 8), h.gzhead ? (i(h, (h.gzhead.text ? 1 : 0) + (h.gzhead.hcrc ? 2 : 0) + (h.gzhead.extra ? 4 : 0) + (h.gzhead.name ? 8 : 0) + (h.gzhead.comment ? 16 : 0)), i(h, 255 & h.gzhead.time), i(h, h.gzhead.time >> 8 & 255), i(h, h.gzhead.time >> 16 & 255), i(h, h.gzhead.time >> 24 & 255), i(h, 9 === h.level ? 2 : h.strategy >= T || h.level < 2 ? 4 : 0), i(h, 255 & h.gzhead.os), h.gzhead.extra && h.gzhead.extra.length && (i(h, 255 & h.gzhead.extra.length), i(h, h.gzhead.extra.length >> 8 & 255)), h.gzhead.hcrc && (a.adler = F(a.adler, h.pending_buf, h.pending, 0)), h.gzindex = 0, h.status = ma) : (i(h, 0), i(h, 0), i(h, 0), i(h, 0), i(h, 0), i(h, 9 === h.level ? 2 : h.strategy >= T || h.level < 2 ? 4 : 0), i(h, wa), h.status = qa);
            else {
              var m = Y + (h.w_bits - 8 << 4) << 8,
                n = -1;
              n = h.strategy >= T || h.level < 2 ? 0 : h.level < 6 ? 1 : 6 === h.level ? 2 : 3, m |= n << 6, 0 !== h.strstart && (m |= ka), m += 31 - m % 31, h.status = qa, j(h, m), 0 !== h.strstart && (j(h, a.adler >>> 16), j(h, 65535 & a.adler)), a.adler = 1
            }
          if (h.status === ma)
            if (h.gzhead.extra) {
              for (k = h.pending; h.gzindex < (65535 & h.gzhead.extra.length) && (h.pending !== h.pending_buf_size || (h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), g(a), k = h.pending, h.pending !== h.pending_buf_size));) i(h, 255 & h.gzhead.extra[h.gzindex]), h.gzindex++;
              h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), h.gzindex === h.gzhead.extra.length && (h.gzindex = 0, h.status = na)
            } else h.status = na;
          if (h.status === na)
            if (h.gzhead.name) {
              k = h.pending;
              do {
                if (h.pending === h.pending_buf_size && (h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), g(a), k = h.pending, h.pending === h.pending_buf_size)) {
                  l = 1;
                  break
                }
                l = h.gzindex < h.gzhead.name.length ? 255 & h.gzhead.name.charCodeAt(h.gzindex++) : 0, i(h, l)
              } while (0 !== l);
              h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), 0 === l && (h.gzindex = 0, h.status = oa)
            } else h.status = oa;
          if (h.status === oa)
            if (h.gzhead.comment) {
              k = h.pending;
              do {
                if (h.pending === h.pending_buf_size && (h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), g(a), k = h.pending, h.pending === h.pending_buf_size)) {
                  l = 1;
                  break
                }
                l = h.gzindex < h.gzhead.comment.length ? 255 & h.gzhead.comment.charCodeAt(h.gzindex++) : 0, i(h, l)
              } while (0 !== l);
              h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), 0 === l && (h.status = pa)
            } else h.status = pa;
          if (h.status === pa && (h.gzhead.hcrc ? (h.pending + 2 > h.pending_buf_size && g(a), h.pending + 2 <= h.pending_buf_size && (i(h, 255 & a.adler), i(h, a.adler >> 8 & 255), a.adler = 0, h.status = qa)) : h.status = qa), 0 !== h.pending) {
            if (g(a), 0 === a.avail_out) return h.last_flush = -1, M
          } else if (0 === a.avail_in && e(b) <= e(c) && b !== K) return d(a, Q);
          if (h.status === ra && 0 !== a.avail_in) return d(a, Q);
          if (0 !== a.avail_in || 0 !== h.lookahead || b !== H && h.status !== ra) {
            var o = h.strategy === T ? r(h, b) : h.strategy === U ? q(h, b) : B[h.level].func(h, b);
            if ((o === ua || o === va) && (h.status = ra), o === sa || o === ua) return 0 === a.avail_out && (h.last_flush = -1), M;
            if (o === ta && (b === I ? D._tr_align(h) : b !== L && (D._tr_stored_block(h, 0, 0, !1), b === J && (f(h.head), 0 === h.lookahead && (h.strstart = 0, h.block_start = 0, h.insert = 0))), g(a), 0 === a.avail_out)) return h.last_flush = -1, M
          }
          return b !== K ? M : h.wrap <= 0 ? N : (2 === h.wrap ? (i(h, 255 & a.adler), i(h, a.adler >> 8 & 255), i(h, a.adler >> 16 & 255), i(h, a.adler >> 24 & 255), i(h, 255 & a.total_in), i(h, a.total_in >> 8 & 255), i(h, a.total_in >> 16 & 255), i(h, a.total_in >> 24 & 255)) : (j(h, a.adler >>> 16), j(h, 65535 & a.adler)), g(a), h.wrap > 0 && (h.wrap = -h.wrap), 0 !== h.pending ? M : N)
        }

        function A(a) {
          var b;
          return a && a.state ? (b = a.state.status, b !== la && b !== ma && b !== na && b !== oa && b !== pa && b !== qa && b !== ra ? d(a, O) : (a.state = null, b === qa ? d(a, P) : M)) : O
        }
        var B, C = a("../utils/common"),
          D = a("./trees"),
          E = a("./adler32"),
          F = a("./crc32"),
          G = a("./messages"),
          H = 0,
          I = 1,
          J = 3,
          K = 4,
          L = 5,
          M = 0,
          N = 1,
          O = -2,
          P = -3,
          Q = -5,
          R = -1,
          S = 1,
          T = 2,
          U = 3,
          V = 4,
          W = 0,
          X = 2,
          Y = 8,
          Z = 9,
          $ = 15,
          _ = 8,
          aa = 29,
          ba = 256,
          ca = ba + 1 + aa,
          da = 30,
          ea = 19,
          fa = 2 * ca + 1,
          ga = 15,
          ha = 3,
          ia = 258,
          ja = ia + ha + 1,
          ka = 32,
          la = 42,
          ma = 69,
          na = 73,
          oa = 91,
          pa = 103,
          qa = 113,
          ra = 666,
          sa = 1,
          ta = 2,
          ua = 3,
          va = 4,
          wa = 3,
          xa = function (a, b, c, d, e) {
            this.good_length = a, this.max_lazy = b, this.nice_length = c, this.max_chain = d, this.func = e
          };
        B = [new xa(0, 0, 0, 0, n), new xa(4, 4, 8, 4, o), new xa(4, 5, 16, 8, o), new xa(4, 6, 32, 32, o), new xa(4, 4, 16, 16, p), new xa(8, 16, 32, 32, p), new xa(8, 16, 128, 128, p), new xa(8, 32, 128, 256, p), new xa(32, 128, 258, 1024, p), new xa(32, 258, 258, 4096, p)], c.deflateInit = y, c.deflateInit2 = x, c.deflateReset = v, c.deflateResetKeep = u, c.deflateSetHeader = w, c.deflate = z, c.deflateEnd = A, c.deflateInfo = "pako deflate (from Nodeca project)"
      }, {
        "../utils/common": 27,
        "./adler32": 29,
        "./crc32": 31,
        "./messages": 37,
        "./trees": 38
      }],
      33: [function (a, b, c) {
        "use strict";

        function d() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
        }
        b.exports = d
      }, {}],
      34: [function (a, b, c) {
        "use strict";
        var d = 30,
          e = 12;
        b.exports = function (a, b) {
          var c, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C;
          c = a.state, f = a.next_in, B = a.input, g = f + (a.avail_in - 5), h = a.next_out, C = a.output, i = h - (b - a.avail_out), j = h + (a.avail_out - 257), k = c.dmax, l = c.wsize, m = c.whave, n = c.wnext, o = c.window, p = c.hold, q = c.bits, r = c.lencode, s = c.distcode, t = (1 << c.lenbits) - 1, u = (1 << c.distbits) - 1;
          a: do {
            15 > q && (p += B[f++] << q, q += 8, p += B[f++] << q, q += 8), v = r[p & t];
            b: for (;;) {
              if (w = v >>> 24, p >>>= w, q -= w, w = v >>> 16 & 255, 0 === w) C[h++] = 65535 & v;
              else {
                if (!(16 & w)) {
                  if (0 === (64 & w)) {
                    v = r[(65535 & v) + (p & (1 << w) - 1)];
                    continue b
                  }
                  if (32 & w) {
                    c.mode = e;
                    break a
                  }
                  a.msg = "invalid literal/length code", c.mode = d;
                  break a
                }
                x = 65535 & v, w &= 15, w && (w > q && (p += B[f++] << q, q += 8), x += p & (1 << w) - 1, p >>>= w, q -= w), 15 > q && (p += B[f++] << q, q += 8, p += B[f++] << q, q += 8), v = s[p & u];
                c: for (;;) {
                  if (w = v >>> 24, p >>>= w, q -= w, w = v >>> 16 & 255, !(16 & w)) {
                    if (0 === (64 & w)) {
                      v = s[(65535 & v) + (p & (1 << w) - 1)];
                      continue c
                    }
                    a.msg = "invalid distance code", c.mode = d;
                    break a
                  }
                  if (y = 65535 & v, w &= 15, w > q && (p += B[f++] << q, q += 8, w > q && (p += B[f++] << q, q += 8)), y += p & (1 << w) - 1, y > k) {
                    a.msg = "invalid distance too far back", c.mode = d;
                    break a
                  }
                  if (p >>>= w, q -= w, w = h - i, y > w) {
                    if (w = y - w, w > m && c.sane) {
                      a.msg = "invalid distance too far back", c.mode = d;
                      break a
                    }
                    if (z = 0, A = o, 0 === n) {
                      if (z += l - w, x > w) {
                        x -= w;
                        do C[h++] = o[z++]; while (--w);
                        z = h - y, A = C
                      }
                    } else if (w > n) {
                      if (z += l + n - w, w -= n, x > w) {
                        x -= w;
                        do C[h++] = o[z++]; while (--w);
                        if (z = 0, x > n) {
                          w = n, x -= w;
                          do C[h++] = o[z++]; while (--w);
                          z = h - y, A = C
                        }
                      }
                    } else if (z += n - w, x > w) {
                      x -= w;
                      do C[h++] = o[z++]; while (--w);
                      z = h - y, A = C
                    }
                    for (; x > 2;) C[h++] = A[z++], C[h++] = A[z++], C[h++] = A[z++], x -= 3;
                    x && (C[h++] = A[z++], x > 1 && (C[h++] = A[z++]))
                  } else {
                    z = h - y;
                    do C[h++] = C[z++], C[h++] = C[z++], C[h++] = C[z++], x -= 3; while (x > 2);
                    x && (C[h++] = C[z++], x > 1 && (C[h++] = C[z++]))
                  }
                  break
                }
              }
              break
            }
          } while (g > f && j > h);
          x = q >> 3, f -= x, q -= x << 3, p &= (1 << q) - 1, a.next_in = f, a.next_out = h, a.avail_in = g > f ? 5 + (g - f) : 5 - (f - g), a.avail_out = j > h ? 257 + (j - h) : 257 - (h - j), c.hold = p, c.bits = q
        }
      }, {}],
      35: [function (a, b, c) {
        "use strict";

        function d(a) {
          return (a >>> 24 & 255) + (a >>> 8 & 65280) + ((65280 & a) << 8) + ((255 & a) << 24)
        }

        function e() {
          this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
        }

        function f(a) {
          var b;
          return a && a.state ? (b = a.state, a.total_in = a.total_out = b.total = 0, a.msg = "", b.wrap && (a.adler = 1 & b.wrap), b.mode = K, b.last = 0, b.havedict = 0, b.dmax = 32768, b.head = null, b.hold = 0, b.bits = 0, b.lencode = b.lendyn = new r.Buf32(oa), b.distcode = b.distdyn = new r.Buf32(pa), b.sane = 1, b.back = -1, C) : F
        }

        function g(a) {
          var b;
          return a && a.state ? (b = a.state, b.wsize = 0, b.whave = 0, b.wnext = 0, f(a)) : F
        }

        function h(a, b) {
          var c, d;
          return a && a.state ? (d = a.state, 0 > b ? (c = 0, b = -b) : (c = (b >> 4) + 1, 48 > b && (b &= 15)), b && (8 > b || b > 15) ? F : (null !== d.window && d.wbits !== b && (d.window = null), d.wrap = c, d.wbits = b, g(a))) : F
        }

        function i(a, b) {
          var c, d;
          return a ? (d = new e, a.state = d, d.window = null, c = h(a, b), c !== C && (a.state = null), c) : F
        }

        function j(a) {
          return i(a, ra)
        }

        function k(a) {
          if (sa) {
            var b;
            for (p = new r.Buf32(512), q = new r.Buf32(32), b = 0; 144 > b;) a.lens[b++] = 8;
            for (; 256 > b;) a.lens[b++] = 9;
            for (; 280 > b;) a.lens[b++] = 7;
            for (; 288 > b;) a.lens[b++] = 8;
            for (v(x, a.lens, 0, 288, p, 0, a.work, {
                bits: 9
              }), b = 0; 32 > b;) a.lens[b++] = 5;
            v(y, a.lens, 0, 32, q, 0, a.work, {
              bits: 5
            }), sa = !1
          }
          a.lencode = p, a.lenbits = 9, a.distcode = q, a.distbits = 5
        }

        function l(a, b, c, d) {
          var e, f = a.state;
          return null === f.window && (f.wsize = 1 << f.wbits, f.wnext = 0, f.whave = 0, f.window = new r.Buf8(f.wsize)), d >= f.wsize ? (r.arraySet(f.window, b, c - f.wsize, f.wsize, 0), f.wnext = 0, f.whave = f.wsize) : (e = f.wsize - f.wnext, e > d && (e = d), r.arraySet(f.window, b, c - d, e, f.wnext), d -= e, d ? (r.arraySet(f.window, b, c - d, d, 0), f.wnext = d, f.whave = f.wsize) : (f.wnext += e, f.wnext === f.wsize && (f.wnext = 0), f.whave < f.wsize && (f.whave += e))), 0
        }

        function m(a, b) {
          var c, e, f, g, h, i, j, m, n, o, p, q, oa, pa, qa, ra, sa, ta, ua, va, wa, xa, ya, za, Aa = 0,
            Ba = new r.Buf8(4),
            Ca = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
          if (!a || !a.state || !a.output || !a.input && 0 !== a.avail_in) return F;
          c = a.state, c.mode === V && (c.mode = W), h = a.next_out, f = a.output, j = a.avail_out, g = a.next_in, e = a.input, i = a.avail_in, m = c.hold, n = c.bits, o = i, p = j, xa = C;
          a: for (;;) switch (c.mode) {
          case K:
            if (0 === c.wrap) {
              c.mode = W;
              break
            }
            for (; 16 > n;) {
              if (0 === i) break a;
              i--, m += e[g++] << n, n += 8
            }
            if (2 & c.wrap && 35615 === m) {
              c.check = 0, Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, c.check = t(c.check, Ba, 2, 0), m = 0, n = 0, c.mode = L;
              break
            }
            if (c.flags = 0, c.head && (c.head.done = !1), !(1 & c.wrap) || (((255 & m) << 8) + (m >> 8)) % 31) {
              a.msg = "incorrect header check", c.mode = la;
              break
            }
            if ((15 & m) !== J) {
              a.msg = "unknown compression method", c.mode = la;
              break
            }
            if (m >>>= 4, n -= 4, wa = (15 & m) + 8, 0 === c.wbits) c.wbits = wa;
            else if (wa > c.wbits) {
              a.msg = "invalid window size", c.mode = la;
              break
            }
            c.dmax = 1 << wa, a.adler = c.check = 1, c.mode = 512 & m ? T : V, m = 0, n = 0;
            break;
          case L:
            for (; 16 > n;) {
              if (0 === i) break a;
              i--, m += e[g++] << n, n += 8
            }
            if (c.flags = m, (255 & c.flags) !== J) {
              a.msg = "unknown compression method", c.mode = la;
              break
            }
            if (57344 & c.flags) {
              a.msg = "unknown header flags set", c.mode = la;
              break
            }
            c.head && (c.head.text = m >> 8 & 1), 512 & c.flags && (Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, c.check = t(c.check, Ba, 2, 0)), m = 0, n = 0, c.mode = M;
          case M:
            for (; 32 > n;) {
              if (0 === i) break a;
              i--, m += e[g++] << n, n += 8
            }
            c.head && (c.head.time = m), 512 & c.flags && (Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, Ba[2] = m >>> 16 & 255, Ba[3] = m >>> 24 & 255, c.check = t(c.check, Ba, 4, 0)), m = 0, n = 0, c.mode = N;
          case N:
            for (; 16 > n;) {
              if (0 === i) break a;
              i--, m += e[g++] << n, n += 8
            }
            c.head && (c.head.xflags = 255 & m, c.head.os = m >> 8), 512 & c.flags && (Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, c.check = t(c.check, Ba, 2, 0)), m = 0, n = 0, c.mode = O;
          case O:
            if (1024 & c.flags) {
              for (; 16 > n;) {
                if (0 === i) break a;
                i--, m += e[g++] << n, n += 8
              }
              c.length = m, c.head && (c.head.extra_len = m), 512 & c.flags && (Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, c.check = t(c.check, Ba, 2, 0)), m = 0, n = 0
            } else c.head && (c.head.extra = null);
            c.mode = P;
          case P:
            if (1024 & c.flags && (q = c.length, q > i && (q = i), q && (c.head && (wa = c.head.extra_len - c.length, c.head.extra || (c.head.extra = new Array(c.head.extra_len)), r.arraySet(c.head.extra, e, g, q, wa)), 512 & c.flags && (c.check = t(c.check, e, q, g)), i -= q, g += q, c.length -= q), c.length)) break a;
            c.length = 0, c.mode = Q;
          case Q:
            if (2048 & c.flags) {
              if (0 === i) break a;
              q = 0;
              do wa = e[g + q++], c.head && wa && c.length < 65536 && (c.head.name += String.fromCharCode(wa)); while (wa && i > q);
              if (512 & c.flags && (c.check = t(c.check, e, q, g)), i -= q, g += q, wa) break a
            } else c.head && (c.head.name = null);
            c.length = 0, c.mode = R;
          case R:
            if (4096 & c.flags) {
              if (0 === i) break a;
              q = 0;
              do wa = e[g + q++], c.head && wa && c.length < 65536 && (c.head.comment += String.fromCharCode(wa)); while (wa && i > q);
              if (512 & c.flags && (c.check = t(c.check, e, q, g)), i -= q, g += q, wa) break a
            } else c.head && (c.head.comment = null);
            c.mode = S;
          case S:
            if (512 & c.flags) {
              for (; 16 > n;) {
                if (0 === i) break a;
                i--, m += e[g++] << n, n += 8
              }
              if (m !== (65535 & c.check)) {
                a.msg = "header crc mismatch", c.mode = la;
                break
              }
              m = 0, n = 0
            }
            c.head && (c.head.hcrc = c.flags >> 9 & 1, c.head.done = !0), a.adler = c.check = 0, c.mode = V;
            break;
          case T:
            for (; 32 > n;) {
              if (0 === i) break a;
              i--, m += e[g++] << n, n += 8
            }
            a.adler = c.check = d(m), m = 0, n = 0, c.mode = U;
          case U:
            if (0 === c.havedict) return a.next_out = h, a.avail_out = j, a.next_in = g, a.avail_in = i, c.hold = m, c.bits = n, E;
            a.adler = c.check = 1, c.mode = V;
          case V:
            if (b === A || b === B) break a;
          case W:
            if (c.last) {
              m >>>= 7 & n, n -= 7 & n, c.mode = ia;
              break
            }
            for (; 3 > n;) {
              if (0 === i) break a;
              i--, m += e[g++] << n, n += 8
            }
            switch (c.last = 1 & m, m >>>= 1, n -= 1, 3 & m) {
            case 0:
              c.mode = X;
              break;
            case 1:
              if (k(c), c.mode = ba, b === B) {
                m >>>= 2, n -= 2;
                break a
              }
              break;
            case 2:
              c.mode = $;
              break;
            case 3:
              a.msg = "invalid block type", c.mode = la
            }
            m >>>= 2, n -= 2;
            break;
          case X:
            for (m >>>= 7 & n, n -= 7 & n; 32 > n;) {
              if (0 === i) break a;
              i--, m += e[g++] << n, n += 8
            }
            if ((65535 & m) !== (m >>> 16 ^ 65535)) {
              a.msg = "invalid stored block lengths", c.mode = la;
              break
            }
            if (c.length = 65535 & m, m = 0, n = 0, c.mode = Y, b === B) break a;
          case Y:
            c.mode = Z;
          case Z:
            if (q = c.length) {
              if (q > i && (q = i), q > j && (q = j), 0 === q) break a;
              r.arraySet(f, e, g, q, h), i -= q, g += q, j -= q, h += q, c.length -= q;
              break
            }
            c.mode = V;
            break;
          case $:
            for (; 14 > n;) {
              if (0 === i) break a;
              i--, m += e[g++] << n, n += 8
            }
            if (c.nlen = (31 & m) + 257, m >>>= 5, n -= 5, c.ndist = (31 & m) + 1, m >>>= 5, n -= 5, c.ncode = (15 & m) + 4, m >>>= 4, n -= 4, c.nlen > 286 || c.ndist > 30) {
              a.msg = "too many length or distance symbols", c.mode = la;
              break
            }
            c.have = 0, c.mode = _;
          case _:
            for (; c.have < c.ncode;) {
              for (; 3 > n;) {
                if (0 === i) break a;
                i--, m += e[g++] << n, n += 8
              }
              c.lens[Ca[c.have++]] = 7 & m, m >>>= 3, n -= 3
            }
            for (; c.have < 19;) c.lens[Ca[c.have++]] = 0;
            if (c.lencode = c.lendyn, c.lenbits = 7, ya = {
                bits: c.lenbits
              }, xa = v(w, c.lens, 0, 19, c.lencode, 0, c.work, ya), c.lenbits = ya.bits, xa) {
              a.msg = "invalid code lengths set", c.mode = la;
              break
            }
            c.have = 0, c.mode = aa;
          case aa:
            for (; c.have < c.nlen + c.ndist;) {
              for (; Aa = c.lencode[m & (1 << c.lenbits) - 1], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(n >= qa);) {
                if (0 === i) break a;
                i--, m += e[g++] << n, n += 8
              }
              if (16 > sa) m >>>= qa, n -= qa, c.lens[c.have++] = sa;
              else {
                if (16 === sa) {
                  for (za = qa + 2; za > n;) {
                    if (0 === i) break a;
                    i--, m += e[g++] << n, n += 8
                  }
                  if (m >>>= qa, n -= qa, 0 === c.have) {
                    a.msg = "invalid bit length repeat", c.mode = la;
                    break
                  }
                  wa = c.lens[c.have - 1], q = 3 + (3 & m), m >>>= 2, n -= 2
                } else if (17 === sa) {
                  for (za = qa + 3; za > n;) {
                    if (0 === i) break a;
                    i--, m += e[g++] << n, n += 8
                  }
                  m >>>= qa, n -= qa, wa = 0, q = 3 + (7 & m), m >>>= 3, n -= 3
                } else {
                  for (za = qa + 7; za > n;) {
                    if (0 === i) break a;
                    i--, m += e[g++] << n, n += 8
                  }
                  m >>>= qa, n -= qa, wa = 0, q = 11 + (127 & m), m >>>= 7, n -= 7
                }
                if (c.have + q > c.nlen + c.ndist) {
                  a.msg = "invalid bit length repeat", c.mode = la;
                  break
                }
                for (; q--;) c.lens[c.have++] = wa
              }
            }
            if (c.mode === la) break;
            if (0 === c.lens[256]) {
              a.msg = "invalid code -- missing end-of-block", c.mode = la;
              break
            }
            if (c.lenbits = 9, ya = {
                bits: c.lenbits
              }, xa = v(x, c.lens, 0, c.nlen, c.lencode, 0, c.work, ya), c.lenbits = ya.bits, xa) {
              a.msg = "invalid literal/lengths set", c.mode = la;
              break
            }
            if (c.distbits = 6, c.distcode = c.distdyn, ya = {
                bits: c.distbits
              }, xa = v(y, c.lens, c.nlen, c.ndist, c.distcode, 0, c.work, ya), c.distbits = ya.bits, xa) {
              a.msg = "invalid distances set", c.mode = la;
              break
            }
            if (c.mode = ba, b === B) break a;
          case ba:
            c.mode = ca;
          case ca:
            if (i >= 6 && j >= 258) {
              a.next_out = h, a.avail_out = j, a.next_in = g, a.avail_in = i, c.hold = m, c.bits = n, u(a, p), h = a.next_out, f = a.output, j = a.avail_out, g = a.next_in, e = a.input, i = a.avail_in, m = c.hold, n = c.bits, c.mode === V && (c.back = -1);
              break
            }
            for (c.back = 0; Aa = c.lencode[m & (1 << c.lenbits) - 1], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(n >= qa);) {
              if (0 === i) break a;
              i--, m += e[g++] << n, n += 8
            }
            if (ra && 0 === (240 & ra)) {
              for (ta = qa, ua = ra, va = sa; Aa = c.lencode[va + ((m & (1 << ta + ua) - 1) >> ta)], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(n >= ta + qa);) {
                if (0 === i) break a;
                i--, m += e[g++] << n, n += 8
              }
              m >>>= ta, n -= ta, c.back += ta
            }
            if (m >>>= qa, n -= qa, c.back += qa, c.length = sa, 0 === ra) {
              c.mode = ha;
              break
            }
            if (32 & ra) {
              c.back = -1, c.mode = V;
              break
            }
            if (64 & ra) {
              a.msg = "invalid literal/length code", c.mode = la;
              break
            }
            c.extra = 15 & ra, c.mode = da;
          case da:
            if (c.extra) {
              for (za = c.extra; za > n;) {
                if (0 === i) break a;
                i--, m += e[g++] << n, n += 8
              }
              c.length += m & (1 << c.extra) - 1, m >>>= c.extra, n -= c.extra, c.back += c.extra
            }
            c.was = c.length, c.mode = ea;
          case ea:
            for (; Aa = c.distcode[m & (1 << c.distbits) - 1], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(n >= qa);) {
              if (0 === i) break a;
              i--, m += e[g++] << n, n += 8
            }
            if (0 === (240 & ra)) {
              for (ta = qa, ua = ra, va = sa; Aa = c.distcode[va + ((m & (1 << ta + ua) - 1) >> ta)], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(n >= ta + qa);) {
                if (0 === i) break a;
                i--, m += e[g++] << n, n += 8
              }
              m >>>= ta, n -= ta, c.back += ta
            }
            if (m >>>= qa, n -= qa, c.back += qa, 64 & ra) {
              a.msg = "invalid distance code", c.mode = la;
              break
            }
            c.offset = sa, c.extra = 15 & ra, c.mode = fa;
          case fa:
            if (c.extra) {
              for (za = c.extra; za > n;) {
                if (0 === i) break a;
                i--, m += e[g++] << n, n += 8
              }
              c.offset += m & (1 << c.extra) - 1, m >>>= c.extra, n -= c.extra, c.back += c.extra
            }
            if (c.offset > c.dmax) {
              a.msg = "invalid distance too far back", c.mode = la;
              break
            }
            c.mode = ga;
          case ga:
            if (0 === j) break a;
            if (q = p - j, c.offset > q) {
              if (q = c.offset - q, q > c.whave && c.sane) {
                a.msg = "invalid distance too far back", c.mode = la;
                break
              }
              q > c.wnext ? (q -= c.wnext, oa = c.wsize - q) : oa = c.wnext - q, q > c.length && (q = c.length), pa = c.window
            } else pa = f, oa = h - c.offset, q = c.length;
            q > j && (q = j), j -= q, c.length -= q;
            do f[h++] = pa[oa++]; while (--q);
            0 === c.length && (c.mode = ca);
            break;
          case ha:
            if (0 === j) break a;
            f[h++] = c.length, j--, c.mode = ca;
            break;
          case ia:
            if (c.wrap) {
              for (; 32 > n;) {
                if (0 === i) break a;
                i--, m |= e[g++] << n, n += 8
              }
              if (p -= j, a.total_out += p, c.total += p, p && (a.adler = c.check = c.flags ? t(c.check, f, p, h - p) : s(c.check, f, p, h - p)), p = j, (c.flags ? m : d(m)) !== c.check) {
                a.msg = "incorrect data check", c.mode = la;
                break
              }
              m = 0, n = 0
            }
            c.mode = ja;
          case ja:
            if (c.wrap && c.flags) {
              for (; 32 > n;) {
                if (0 === i) break a;
                i--, m += e[g++] << n, n += 8
              }
              if (m !== (4294967295 & c.total)) {
                a.msg = "incorrect length check", c.mode = la;
                break
              }
              m = 0, n = 0
            }
            c.mode = ka;
          case ka:
            xa = D;
            break a;
          case la:
            xa = G;
            break a;
          case ma:
            return H;
          case na:
          default:
            return F
          }
          return a.next_out = h, a.avail_out = j, a.next_in = g, a.avail_in = i, c.hold = m, c.bits = n, (c.wsize || p !== a.avail_out && c.mode < la && (c.mode < ia || b !== z)) && l(a, a.output, a.next_out, p - a.avail_out) ? (c.mode = ma, H) : (o -= a.avail_in, p -= a.avail_out, a.total_in += o, a.total_out += p, c.total += p, c.wrap && p && (a.adler = c.check = c.flags ? t(c.check, f, p, a.next_out - p) : s(c.check, f, p, a.next_out - p)), a.data_type = c.bits + (c.last ? 64 : 0) + (c.mode === V ? 128 : 0) + (c.mode === ba || c.mode === Y ? 256 : 0), (0 === o && 0 === p || b === z) && xa === C && (xa = I), xa)
        }

        function n(a) {
          if (!a || !a.state) return F;
          var b = a.state;
          return b.window && (b.window = null), a.state = null, C
        }

        function o(a, b) {
          var c;
          return a && a.state ? (c = a.state, 0 === (2 & c.wrap) ? F : (c.head = b, b.done = !1, C)) : F
        }
        var p, q, r = a("../utils/common"),
          s = a("./adler32"),
          t = a("./crc32"),
          u = a("./inffast"),
          v = a("./inftrees"),
          w = 0,
          x = 1,
          y = 2,
          z = 4,
          A = 5,
          B = 6,
          C = 0,
          D = 1,
          E = 2,
          F = -2,
          G = -3,
          H = -4,
          I = -5,
          J = 8,
          K = 1,
          L = 2,
          M = 3,
          N = 4,
          O = 5,
          P = 6,
          Q = 7,
          R = 8,
          S = 9,
          T = 10,
          U = 11,
          V = 12,
          W = 13,
          X = 14,
          Y = 15,
          Z = 16,
          $ = 17,
          _ = 18,
          aa = 19,
          ba = 20,
          ca = 21,
          da = 22,
          ea = 23,
          fa = 24,
          ga = 25,
          ha = 26,
          ia = 27,
          ja = 28,
          ka = 29,
          la = 30,
          ma = 31,
          na = 32,
          oa = 852,
          pa = 592,
          qa = 15,
          ra = qa,
          sa = !0;
        c.inflateReset = g, c.inflateReset2 = h, c.inflateResetKeep = f, c.inflateInit = j, c.inflateInit2 = i, c.inflate = m, c.inflateEnd = n, c.inflateGetHeader = o, c.inflateInfo = "pako inflate (from Nodeca project)"
      }, {
        "../utils/common": 27,
        "./adler32": 29,
        "./crc32": 31,
        "./inffast": 34,
        "./inftrees": 36
      }],
      36: [function (a, b, c) {
        "use strict";
        var d = a("../utils/common"),
          e = 15,
          f = 852,
          g = 592,
          h = 0,
          i = 1,
          j = 2,
          k = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
          l = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
          m = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
          n = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        b.exports = function (a, b, c, o, p, q, r, s) {
          var t, u, v, w, x, y, z, A, B, C = s.bits,
            D = 0,
            E = 0,
            F = 0,
            G = 0,
            H = 0,
            I = 0,
            J = 0,
            K = 0,
            L = 0,
            M = 0,
            N = null,
            O = 0,
            P = new d.Buf16(e + 1),
            Q = new d.Buf16(e + 1),
            R = null,
            S = 0;
          for (D = 0; e >= D; D++) P[D] = 0;
          for (E = 0; o > E; E++) P[b[c + E]] ++;
          for (H = C, G = e; G >= 1 && 0 === P[G]; G--);
          if (H > G && (H = G), 0 === G) return p[q++] = 20971520, p[q++] = 20971520, s.bits = 1, 0;
          for (F = 1; G > F && 0 === P[F]; F++);
          for (F > H && (H = F), K = 1, D = 1; e >= D; D++)
            if (K <<= 1, K -= P[D], 0 > K) return -1;
          if (K > 0 && (a === h || 1 !== G)) return -1;
          for (Q[1] = 0, D = 1; e > D; D++) Q[D + 1] = Q[D] + P[D];
          for (E = 0; o > E; E++) 0 !== b[c + E] && (r[Q[b[c + E]] ++] = E);
          if (a === h ? (N = R = r, y = 19) : a === i ? (N = k, O -= 257, R = l, S -= 257, y = 256) : (N = m, R = n, y = -1), M = 0, E = 0, D = F, x = q, I = H, J = 0, v = -1, L = 1 << H, w = L - 1, a === i && L > f || a === j && L > g) return 1;
          for (var T = 0;;) {
            T++, z = D - J, r[E] < y ? (A = 0, B = r[E]) : r[E] > y ? (A = R[S + r[E]], B = N[O + r[E]]) : (A = 96, B = 0), t = 1 << D - J, u = 1 << I, F = u;
            do u -= t, p[x + (M >> J) + u] = z << 24 | A << 16 | B | 0; while (0 !== u);
            for (t = 1 << D - 1; M & t;) t >>= 1;
            if (0 !== t ? (M &= t - 1, M += t) : M = 0, E++, 0 === --P[D]) {
              if (D === G) break;
              D = b[c + r[E]]
            }
            if (D > H && (M & w) !== v) {
              for (0 === J && (J = H), x += F, I = D - J, K = 1 << I; G > I + J && (K -= P[I + J], !(0 >= K));) I++, K <<= 1;
              if (L += 1 << I, a === i && L > f || a === j && L > g) return 1;
              v = M & w, p[v] = H << 24 | I << 16 | x - q | 0
            }
          }
          return 0 !== M && (p[x + M] = D - J << 24 | 64 << 16 | 0), s.bits = H, 0
        }
      }, {
        "../utils/common": 27
      }],
      37: [function (a, b, c) {
        "use strict";
        b.exports = {
          2: "need dictionary",
          1: "stream end",
          0: "",
          "-1": "file error",
          "-2": "stream error",
          "-3": "data error",
          "-4": "insufficient memory",
          "-5": "buffer error",
          "-6": "incompatible version"
        }
      }, {}],
      38: [function (a, b, c) {
        "use strict";

        function d(a) {
          for (var b = a.length; --b >= 0;) a[b] = 0
        }

        function e(a) {
          return 256 > a ? ga[a] : ga[256 + (a >>> 7)]
        }

        function f(a, b) {
          a.pending_buf[a.pending++] = 255 & b, a.pending_buf[a.pending++] = b >>> 8 & 255
        }

        function g(a, b, c) {
          a.bi_valid > V - c ? (a.bi_buf |= b << a.bi_valid & 65535, f(a, a.bi_buf), a.bi_buf = b >> V - a.bi_valid, a.bi_valid += c - V) : (a.bi_buf |= b << a.bi_valid & 65535, a.bi_valid += c)
        }

        function h(a, b, c) {
          g(a, c[2 * b], c[2 * b + 1])
        }

        function i(a, b) {
          var c = 0;
          do c |= 1 & a, a >>>= 1, c <<= 1; while (--b > 0);
          return c >>> 1
        }

        function j(a) {
          16 === a.bi_valid ? (f(a, a.bi_buf), a.bi_buf = 0, a.bi_valid = 0) : a.bi_valid >= 8 && (a.pending_buf[a.pending++] = 255 & a.bi_buf, a.bi_buf >>= 8, a.bi_valid -= 8)
        }

        function k(a, b) {
          var c, d, e, f, g, h, i = b.dyn_tree,
            j = b.max_code,
            k = b.stat_desc.static_tree,
            l = b.stat_desc.has_stree,
            m = b.stat_desc.extra_bits,
            n = b.stat_desc.extra_base,
            o = b.stat_desc.max_length,
            p = 0;
          for (f = 0; U >= f; f++) a.bl_count[f] = 0;
          for (i[2 * a.heap[a.heap_max] + 1] = 0, c = a.heap_max + 1; T > c; c++) d = a.heap[c], f = i[2 * i[2 * d + 1] + 1] + 1, f > o && (f = o, p++), i[2 * d + 1] = f, d > j || (a.bl_count[f] ++, g = 0, d >= n && (g = m[d - n]), h = i[2 * d], a.opt_len += h * (f + g), l && (a.static_len += h * (k[2 * d + 1] + g)));
          if (0 !== p) {
            do {
              for (f = o - 1; 0 === a.bl_count[f];) f--;
              a.bl_count[f] --, a.bl_count[f + 1] += 2, a.bl_count[o] --, p -= 2
            } while (p > 0);
            for (f = o; 0 !== f; f--)
              for (d = a.bl_count[f]; 0 !== d;) e = a.heap[--c], e > j || (i[2 * e + 1] !== f && (a.opt_len += (f - i[2 * e + 1]) * i[2 * e], i[2 * e + 1] = f), d--)
          }
        }

        function l(a, b, c) {
          var d, e, f = new Array(U + 1),
            g = 0;
          for (d = 1; U >= d; d++) f[d] = g = g + c[d - 1] << 1;
          for (e = 0; b >= e; e++) {
            var h = a[2 * e + 1];
            0 !== h && (a[2 * e] = i(f[h] ++, h))
          }
        }

        function m() {
          var a, b, c, d, e, f = new Array(U + 1);
          for (c = 0, d = 0; O - 1 > d; d++)
            for (ia[d] = c, a = 0; a < 1 << _[d]; a++) ha[c++] = d;
          for (ha[c - 1] = d, e = 0, d = 0; 16 > d; d++)
            for (ja[d] = e, a = 0; a < 1 << aa[d]; a++) ga[e++] = d;
          for (e >>= 7; R > d; d++)
            for (ja[d] = e << 7, a = 0; a < 1 << aa[d] - 7; a++) ga[256 + e++] = d;
          for (b = 0; U >= b; b++) f[b] = 0;
          for (a = 0; 143 >= a;) ea[2 * a + 1] = 8, a++, f[8] ++;
          for (; 255 >= a;) ea[2 * a + 1] = 9, a++, f[9] ++;
          for (; 279 >= a;) ea[2 * a + 1] = 7, a++, f[7] ++;
          for (; 287 >= a;) ea[2 * a + 1] = 8, a++, f[8] ++;
          for (l(ea, Q + 1, f), a = 0; R > a; a++) fa[2 * a + 1] = 5, fa[2 * a] = i(a, 5);
          ka = new na(ea, _, P + 1, Q, U), la = new na(fa, aa, 0, R, U), ma = new na(new Array(0), ba, 0, S, W)
        }

        function n(a) {
          var b;
          for (b = 0; Q > b; b++) a.dyn_ltree[2 * b] = 0;
          for (b = 0; R > b; b++) a.dyn_dtree[2 * b] = 0;
          for (b = 0; S > b; b++) a.bl_tree[2 * b] = 0;
          a.dyn_ltree[2 * X] = 1, a.opt_len = a.static_len = 0, a.last_lit = a.matches = 0
        }

        function o(a) {
          a.bi_valid > 8 ? f(a, a.bi_buf) : a.bi_valid > 0 && (a.pending_buf[a.pending++] = a.bi_buf), a.bi_buf = 0, a.bi_valid = 0
        }

        function p(a, b, c, d) {
          o(a), d && (f(a, c), f(a, ~c)), E.arraySet(a.pending_buf, a.window, b, c, a.pending), a.pending += c
        }

        function q(a, b, c, d) {
          var e = 2 * b,
            f = 2 * c;
          return a[e] < a[f] || a[e] === a[f] && d[b] <= d[c]
        }

        function r(a, b, c) {
          for (var d = a.heap[c], e = c << 1; e <= a.heap_len && (e < a.heap_len && q(b, a.heap[e + 1], a.heap[e], a.depth) && e++, !q(b, d, a.heap[e], a.depth));) a.heap[c] = a.heap[e], c = e, e <<= 1;
          a.heap[c] = d
        }

        function s(a, b, c) {
          var d, f, i, j, k = 0;
          if (0 !== a.last_lit)
            do d = a.pending_buf[a.d_buf + 2 * k] << 8 | a.pending_buf[a.d_buf + 2 * k + 1], f = a.pending_buf[a.l_buf + k], k++, 0 === d ? h(a, f, b) : (i = ha[f], h(a, i + P + 1, b), j = _[i], 0 !== j && (f -= ia[i], g(a, f, j)), d--, i = e(d), h(a, i, c), j = aa[i], 0 !== j && (d -= ja[i], g(a, d, j))); while (k < a.last_lit);
          h(a, X, b)
        }

        function t(a, b) {
          var c, d, e, f = b.dyn_tree,
            g = b.stat_desc.static_tree,
            h = b.stat_desc.has_stree,
            i = b.stat_desc.elems,
            j = -1;
          for (a.heap_len = 0, a.heap_max = T, c = 0; i > c; c++) 0 !== f[2 * c] ? (a.heap[++a.heap_len] = j = c, a.depth[c] = 0) : f[2 * c + 1] = 0;
          for (; a.heap_len < 2;) e = a.heap[++a.heap_len] = 2 > j ? ++j : 0, f[2 * e] = 1, a.depth[e] = 0, a.opt_len--, h && (a.static_len -= g[2 * e + 1]);
          for (b.max_code = j, c = a.heap_len >> 1; c >= 1; c--) r(a, f, c);
          e = i;
          do c = a.heap[1], a.heap[1] = a.heap[a.heap_len--], r(a, f, 1), d = a.heap[1], a.heap[--a.heap_max] = c, a.heap[--a.heap_max] = d, f[2 * e] = f[2 * c] + f[2 * d], a.depth[e] = (a.depth[c] >= a.depth[d] ? a.depth[c] : a.depth[d]) + 1, f[2 * c + 1] = f[2 * d + 1] = e, a.heap[1] = e++, r(a, f, 1); while (a.heap_len >= 2);
          a.heap[--a.heap_max] = a.heap[1], k(a, b), l(f, j, a.bl_count)
        }

        function u(a, b, c) {
          var d, e, f = -1,
            g = b[1],
            h = 0,
            i = 7,
            j = 4;
          for (0 === g && (i = 138, j = 3), b[2 * (c + 1) + 1] = 65535, d = 0; c >= d; d++) e = g, g = b[2 * (d + 1) + 1], ++h < i && e === g || (j > h ? a.bl_tree[2 * e] += h : 0 !== e ? (e !== f && a.bl_tree[2 * e] ++, a.bl_tree[2 * Y] ++) : 10 >= h ? a.bl_tree[2 * Z] ++ : a.bl_tree[2 * $] ++, h = 0, f = e, 0 === g ? (i = 138, j = 3) : e === g ? (i = 6, j = 3) : (i = 7, j = 4))
        }

        function v(a, b, c) {
          var d, e, f = -1,
            i = b[1],
            j = 0,
            k = 7,
            l = 4;
          for (0 === i && (k = 138, l = 3), d = 0; c >= d; d++)
            if (e = i, i = b[2 * (d + 1) + 1], !(++j < k && e === i)) {
              if (l > j) {
                do h(a, e, a.bl_tree); while (0 !== --j)
              } else 0 !== e ? (e !== f && (h(a, e, a.bl_tree), j--), h(a, Y, a.bl_tree), g(a, j - 3, 2)) : 10 >= j ? (h(a, Z, a.bl_tree), g(a, j - 3, 3)) : (h(a, $, a.bl_tree), g(a, j - 11, 7));
              j = 0, f = e, 0 === i ? (k = 138, l = 3) : e === i ? (k = 6, l = 3) : (k = 7, l = 4)
            }
        }

        function w(a) {
          var b;
          for (u(a, a.dyn_ltree, a.l_desc.max_code), u(a, a.dyn_dtree, a.d_desc.max_code), t(a, a.bl_desc), b = S - 1; b >= 3 && 0 === a.bl_tree[2 * ca[b] + 1]; b--);
          return a.opt_len += 3 * (b + 1) + 5 + 5 + 4, b
        }

        function x(a, b, c, d) {
          var e;
          for (g(a, b - 257, 5), g(a, c - 1, 5), g(a, d - 4, 4), e = 0; d > e; e++) g(a, a.bl_tree[2 * ca[e] + 1], 3);
          v(a, a.dyn_ltree, b - 1), v(a, a.dyn_dtree, c - 1)
        }

        function y(a) {
          var b, c = 4093624447;
          for (b = 0; 31 >= b; b++, c >>>= 1)
            if (1 & c && 0 !== a.dyn_ltree[2 * b]) return G;
          if (0 !== a.dyn_ltree[18] || 0 !== a.dyn_ltree[20] || 0 !== a.dyn_ltree[26]) return H;
          for (b = 32; P > b; b++)
            if (0 !== a.dyn_ltree[2 * b]) return H;
          return G
        }

        function z(a) {
          pa || (m(), pa = !0), a.l_desc = new oa(a.dyn_ltree, ka), a.d_desc = new oa(a.dyn_dtree, la), a.bl_desc = new oa(a.bl_tree, ma), a.bi_buf = 0, a.bi_valid = 0, n(a)
        }

        function A(a, b, c, d) {
          g(a, (J << 1) + (d ? 1 : 0), 3), p(a, b, c, !0)
        }

        function B(a) {
          g(a, K << 1, 3), h(a, X, ea), j(a)
        }

        function C(a, b, c, d) {
          var e, f, h = 0;
          a.level > 0 ? (a.strm.data_type === I && (a.strm.data_type = y(a)), t(a, a.l_desc), t(a, a.d_desc), h = w(a), e = a.opt_len + 3 + 7 >>> 3, f = a.static_len + 3 + 7 >>> 3, e >= f && (e = f)) : e = f = c + 5, e >= c + 4 && -1 !== b ? A(a, b, c, d) : a.strategy === F || f === e ? (g(a, (K << 1) + (d ? 1 : 0), 3), s(a, ea, fa)) : (g(a, (L << 1) + (d ? 1 : 0), 3), x(a, a.l_desc.max_code + 1, a.d_desc.max_code + 1, h + 1), s(a, a.dyn_ltree, a.dyn_dtree)), n(a), d && o(a)
        }

        function D(a, b, c) {
          return a.pending_buf[a.d_buf + 2 * a.last_lit] = b >>> 8 & 255, a.pending_buf[a.d_buf + 2 * a.last_lit + 1] = 255 & b, a.pending_buf[a.l_buf + a.last_lit] = 255 & c, a.last_lit++, 0 === b ? a.dyn_ltree[2 * c] ++ : (a.matches++, b--, a.dyn_ltree[2 * (ha[c] + P + 1)] ++, a.dyn_dtree[2 * e(b)] ++), a.last_lit === a.lit_bufsize - 1
        }
        var E = a("../utils/common"),
          F = 4,
          G = 0,
          H = 1,
          I = 2,
          J = 0,
          K = 1,
          L = 2,
          M = 3,
          N = 258,
          O = 29,
          P = 256,
          Q = P + 1 + O,
          R = 30,
          S = 19,
          T = 2 * Q + 1,
          U = 15,
          V = 16,
          W = 7,
          X = 256,
          Y = 16,
          Z = 17,
          $ = 18,
          _ = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
          aa = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
          ba = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
          ca = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
          da = 512,
          ea = new Array(2 * (Q + 2));
        d(ea);
        var fa = new Array(2 * R);
        d(fa);
        var ga = new Array(da);
        d(ga);
        var ha = new Array(N - M + 1);
        d(ha);
        var ia = new Array(O);
        d(ia);
        var ja = new Array(R);
        d(ja);
        var ka, la, ma, na = function (a, b, c, d, e) {
            this.static_tree = a, this.extra_bits = b, this.extra_base = c, this.elems = d, this.max_length = e, this.has_stree = a && a.length
          },
          oa = function (a, b) {
            this.dyn_tree = a, this.max_code = 0, this.stat_desc = b
          },
          pa = !1;
        c._tr_init = z, c._tr_stored_block = A, c._tr_flush_block = C, c._tr_tally = D, c._tr_align = B
      }, {
        "../utils/common": 27
      }],
      39: [function (a, b, c) {
        "use strict";

        function d() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
        }
        b.exports = d
      }, {}]
    }, {}, [9])(9)
  });
var saveAs = saveAs || "undefined" != typeof navigator && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator) || function (a) {
  "use strict";
  if ("undefined" == typeof navigator || !/MSIE [1-9]\./.test(navigator.userAgent)) {
    var b = a.document,
      c = function () {
        return a.URL || a.webkitURL || a
      },
      d = a.URL || a.webkitURL || a,
      e = b.createElementNS("http://www.w3.org/1999/xhtml", "a"),
      f = !a.externalHost && "download" in e,
      g = a.webkitRequestFileSystem,
      h = a.requestFileSystem || g || a.mozRequestFileSystem,
      i = function (b) {
        (a.setImmediate || a.setTimeout)(function () {
          throw b
        }, 0)
      },
      j = "application/octet-stream",
      k = 0,
      l = [],
      m = function () {
        for (var a = l.length; a--;) {
          var b = l[a];
          "string" == typeof b ? d.revokeObjectURL(b) : b.remove()
        }
        l.length = 0
      },
      n = function (a, b, c) {
        b = [].concat(b);
        for (var d = b.length; d--;) {
          var e = a["on" + b[d]];
          if ("function" == typeof e) try {
            e.call(a, c || a)
          } catch (f) {
            i(f)
          }
        }
      },
      o = function (d, i) {
        var m, o, p, q = this,
          r = d.type,
          s = !1,
          t = function () {
            var a = c().createObjectURL(d);
            return l.push(a), a
          },
          u = function () {
            n(q, "writestart progress write writeend".split(" "))
          },
          v = function () {
            (s || !m) && (m = t(d)), o ? o.location.href = m : window.open(m, "_blank"), q.readyState = q.DONE, u()
          },
          w = function (a) {
            return function () {
              return q.readyState !== q.DONE ? a.apply(this, arguments) : void 0
            }
          },
          x = {
            create: !0,
            exclusive: !1
          };
        if (q.readyState = q.INIT, i || (i = "download"), f) {
          m = t(d), b = a.document, e = b.createElementNS("http://www.w3.org/1999/xhtml", "a"), e.href = m, e.download = i;
          var y = b.createEvent("MouseEvents");
          return y.initMouseEvent("click", !0, !1, a, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), e.dispatchEvent(y), q.readyState = q.DONE, void u()
        }
        return a.chrome && r && r !== j && (p = d.slice || d.webkitSlice, d = p.call(d, 0, d.size, j), s = !0), g && "download" !== i && (i += ".download"), (r === j || g) && (o = a), h ? (k += d.size, void h(a.TEMPORARY, k, w(function (a) {
          a.root.getDirectory("saved", x, w(function (a) {
            var b = function () {
              a.getFile(i, x, w(function (a) {
                a.createWriter(w(function (b) {
                  b.onwriteend = function (b) {
                    o.location.href = a.toURL(), l.push(a), q.readyState = q.DONE, n(q, "writeend", b)
                  }, b.onerror = function () {
                    var a = b.error;
                    a.code !== a.ABORT_ERR && v()
                  }, "writestart progress write abort".split(" ").forEach(function (a) {
                    b["on" + a] = q["on" + a]
                  }), b.write(d), q.abort = function () {
                    b.abort(), q.readyState = q.DONE
                  }, q.readyState = q.WRITING
                }), v)
              }), v)
            };
            a.getFile(i, {
              create: !1
            }, w(function (a) {
              a.remove(), b()
            }), w(function (a) {
              a.code === a.NOT_FOUND_ERR ? b() : v()
            }))
          }), v)
        }), v)) : void v()
      },
      p = o.prototype,
      q = function (a, b) {
        return new o(a, b)
      };
    return p.abort = function () {
      var a = this;
      a.readyState = a.DONE, n(a, "abort")
    }, p.readyState = p.INIT = 0, p.WRITING = 1, p.DONE = 2, p.error = p.onwritestart = p.onprogress = p.onwrite = p.onabort = p.onerror = p.onwriteend = null, a.addEventListener("unload", m, !1), q.unload = function () {
      m(), a.removeEventListener("unload", m, !1)
    }, q
  }
}("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
"undefined" != typeof module && (module.exports = saveAs),
  function (a, b) {
    "object" == typeof exports && exports ? b(exports) : "function" == typeof define && define.amd ? define(["exports"], b) : b(a.Mustache = {})
  }(this, function (a) {
    function b(a) {
      return "function" == typeof a
    }

    function c(a) {
      return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
    }

    function d(a, b) {
      return o.call(a, b)
    }

    function e(a) {
      return !d(p, a)
    }

    function f(a) {
      return String(a).replace(/[&<>"'\/]/g, function (a) {
        return q[a]
      })
    }

    function g(b, d) {
      function f() {
        if (w && !x)
          for (; q.length;) delete p[q.pop()];
        else q = [];
        w = !1, x = !1
      }

      function g(a) {
        if ("string" == typeof a && (a = a.split(s, 2)), !n(a) || 2 !== a.length) throw new Error("Invalid tags: " + a);
        k = new RegExp(c(a[0]) + "\\s*"), l = new RegExp("\\s*" + c(a[1])), m = new RegExp("\\s*" + c("}" + a[1]))
      }
      if (!b) return [];
      var k, l, m, o = [],
        p = [],
        q = [],
        w = !1,
        x = !1;
      g(d || a.tags);
      for (var y, z, A, B, C, D, E = new j(b); !E.eos();) {
        if (y = E.pos, A = E.scanUntil(k))
          for (var F = 0, G = A.length; G > F; ++F) B = A.charAt(F), e(B) ? q.push(p.length) : x = !0, p.push(["text", B, y, y + 1]), y += 1, "\n" === B && f();
        if (!E.scan(k)) break;
        if (w = !0, z = E.scan(v) || "name", E.scan(r), "=" === z ? (A = E.scanUntil(t), E.scan(t), E.scanUntil(l)) : "{" === z ? (A = E.scanUntil(m), E.scan(u), E.scanUntil(l), z = "&") : A = E.scanUntil(l), !E.scan(l)) throw new Error("Unclosed tag at " + E.pos);
        if (C = [z, A, y, E.pos], p.push(C), "#" === z || "^" === z) o.push(C);
        else if ("/" === z) {
          if (D = o.pop(), !D) throw new Error('Unopened section "' + A + '" at ' + y);
          if (D[1] !== A) throw new Error('Unclosed section "' + D[1] + '" at ' + y)
        } else "name" === z || "{" === z || "&" === z ? x = !0 : "=" === z && g(A)
      }
      if (D = o.pop()) throw new Error('Unclosed section "' + D[1] + '" at ' + E.pos);
      return i(h(p))
    }

    function h(a) {
      for (var b, c, d = [], e = 0, f = a.length; f > e; ++e) b = a[e], b && ("text" === b[0] && c && "text" === c[0] ? (c[1] += b[1], c[3] = b[3]) : (d.push(b), c = b));
      return d
    }

    function i(a) {
      for (var b, c, d = [], e = d, f = [], g = 0, h = a.length; h > g; ++g) switch (b = a[g], b[0]) {
      case "#":
      case "^":
        e.push(b), f.push(b), e = b[4] = [];
        break;
      case "/":
        c = f.pop(), c[5] = b[2], e = f.length > 0 ? f[f.length - 1][4] : d;
        break;
      default:
        e.push(b)
      }
      return d
    }

    function j(a) {
      this.string = a, this.tail = a, this.pos = 0
    }

    function k(a, b) {
      this.view = a, this.cache = {
        ".": this.view
      }, this.parent = b
    }

    function l() {
      this.cache = {}
    }
    var m = Object.prototype.toString,
      n = Array.isArray || function (a) {
        return "[object Array]" === m.call(a)
      },
      o = RegExp.prototype.test,
      p = /\S/,
      q = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
      },
      r = /\s*/,
      s = /\s+/,
      t = /\s*=/,
      u = /\s*\}/,
      v = /#|\^|\/|>|\{|&|=|!/;
    j.prototype.eos = function () {
      return "" === this.tail
    }, j.prototype.scan = function (a) {
      var b = this.tail.match(a);
      if (!b || 0 !== b.index) return "";
      var c = b[0];
      return this.tail = this.tail.substring(c.length), this.pos += c.length, c
    }, j.prototype.scanUntil = function (a) {
      var b, c = this.tail.search(a);
      switch (c) {
      case -1:
        b = this.tail, this.tail = "";
        break;
      case 0:
        b = "";
        break;
      default:
        b = this.tail.substring(0, c), this.tail = this.tail.substring(c)
      }
      return this.pos += b.length, b
    }, k.prototype.push = function (a) {
      return new k(a, this)
    }, k.prototype.lookup = function (a) {
      var c, d = this.cache;
      if (a in d) c = d[a];
      else {
        for (var e, f, g = this, h = !1; g;) {
          if (a.indexOf(".") > 0)
            for (c = g.view, e = a.split("."), f = 0; null != c && f < e.length;) f === e.length - 1 && null != c && (h = "object" == typeof c && c.hasOwnProperty(e[f])), c = c[e[f++]];
          else null != g.view && "object" == typeof g.view && (c = g.view[a], h = g.view.hasOwnProperty(a));
          if (h) break;
          g = g.parent
        }
        d[a] = c
      }
      return b(c) && (c = c.call(this.view)), c
    }, l.prototype.clearCache = function () {
      this.cache = {}
    }, l.prototype.parse = function (a, b) {
      var c = this.cache,
        d = c[a];
      return null == d && (d = c[a] = g(a, b)), d
    }, l.prototype.render = function (a, b, c) {
      var d = this.parse(a),
        e = b instanceof k ? b : new k(b);
      return this.renderTokens(d, e, c, a)
    }, l.prototype.renderTokens = function (a, b, c, d) {
      for (var e, f, g, h = "", i = 0, j = a.length; j > i; ++i) g = void 0, e = a[i], f = e[0], "#" === f ? g = this.renderSection(e, b, c, d) : "^" === f ? g = this.renderInverted(e, b, c, d) : ">" === f ? g = this.renderPartial(e, b, c, d) : "&" === f ? g = this.unescapedValue(e, b) : "name" === f ? g = this.escapedValue(e, b) : "text" === f && (g = this.rawValue(e)), void 0 !== g && (h += g);
      return h
    }, l.prototype.renderSection = function (a, c, d, e) {
      function f(a) {
        return g.render(a, c, d)
      }
      var g = this,
        h = "",
        i = c.lookup(a[1]);
      if (i) {
        if (n(i))
          for (var j = 0, k = i.length; k > j; ++j) h += this.renderTokens(a[4], c.push(i[j]), d, e);
        else if ("object" == typeof i || "string" == typeof i || "number" == typeof i) h += this.renderTokens(a[4], c.push(i), d, e);
        else if (b(i)) {
          if ("string" != typeof e) throw new Error("Cannot use higher-order sections without the original template");
          i = i.call(c.view, e.slice(a[3], a[5]), f), null != i && (h += i)
        } else h += this.renderTokens(a[4], c, d, e);
        return h
      }
    }, l.prototype.renderInverted = function (a, b, c, d) {
      var e = b.lookup(a[1]);
      return !e || n(e) && 0 === e.length ? this.renderTokens(a[4], b, c, d) : void 0
    }, l.prototype.renderPartial = function (a, c, d) {
      if (d) {
        var e = b(d) ? d(a[1]) : d[a[1]];
        return null != e ? this.renderTokens(this.parse(e), c, d, e) : void 0
      }
    }, l.prototype.unescapedValue = function (a, b) {
      var c = b.lookup(a[1]);
      return null != c ? c : void 0
    }, l.prototype.escapedValue = function (b, c) {
      var d = c.lookup(b[1]);
      return null != d ? a.escape(d) : void 0
    }, l.prototype.rawValue = function (a) {
      return a[1]
    }, a.name = "mustache.js", a.version = "2.0.0", a.tags = ["{{", "}}"];
    var w = new l;
    a.clearCache = function () {
      return w.clearCache()
    }, a.parse = function (a, b) {
      return w.parse(a, b)
    }, a.render = function (a, b, c) {
      return w.render(a, b, c)
    }, a.to_html = function (c, d, e, f) {
      var g = a.render(c, d, e);
      return b(f) ? void f(g) : g
    }, a.escape = f, a.Scanner = j, a.Context = k, a.Writer = l
  }),
  function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports && "object" == typeof module ? module.exports = a : a(jQuery)
  }(function (a, b) {
    "use strict";

    function c(b, c, d, e) {
      for (var f = [], g = 0; g < b.length; g++) {
        var h = b[g];
        if (h) {
          var i = tinycolor(h),
            j = i.toHsl().l < .5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
          j += tinycolor.equals(c, h) ? " sp-thumb-active" : "";
          var k = i.toString(e.preferredFormat || "rgb"),
            l = q ? "background-color:" + i.toRgbString() : "filter:" + i.toFilter();
          f.push('<span title="' + k + '" data-color="' + i.toRgbString() + '" class="' + j + '"><span class="sp-thumb-inner" style="' + l + ';" /></span>')
        } else {
          var m = "sp-clear-display";
          f.push(a("<div />").append(a('<span data-color="" style="background-color:transparent;" class="' + m + '"></span>').attr("title", e.noColorSelectedText)).html())
        }
      }
      return "<div class='sp-cf " + d + "'>" + f.join("") + "</div>"
    }

    function d() {
      for (var a = 0; a < o.length; a++) o[a] && o[a].hide()
    }

    function e(b, c) {
      var d = a.extend({}, n, b);
      return d.callbacks = {
        move: j(d.move, c),
        change: j(d.change, c),
        show: j(d.show, c),
        hide: j(d.hide, c),
        beforeShow: j(d.beforeShow, c)
      }, d
    }

    function f(f, h) {
      function j() {
        if (U.showPaletteOnly && (U.showPalette = !0), Ma.text(U.showPaletteOnly ? U.togglePaletteMoreText : U.togglePaletteLessText), U.palette) {
          na = U.palette.slice(0), oa = a.isArray(na[0]) ? na : [na], pa = {};
          for (var b = 0; b < oa.length; b++)
            for (var c = 0; c < oa[b].length; c++) {
              var d = tinycolor(oa[b][c]).toRgbString();
              pa[d] = !0
            }
        }
        xa.toggleClass("sp-flat", V), xa.toggleClass("sp-input-disabled", !U.showInput), xa.toggleClass("sp-alpha-enabled", U.showAlpha), xa.toggleClass("sp-clear-enabled", Za), xa.toggleClass("sp-buttons-disabled", !U.showButtons), xa.toggleClass("sp-palette-buttons-disabled", !U.togglePaletteOnly), xa.toggleClass("sp-palette-disabled", !U.showPalette), xa.toggleClass("sp-palette-only", U.showPaletteOnly), xa.toggleClass("sp-initial-disabled", !U.showInitial), xa.addClass(U.className).addClass(U.containerClassName), O()
      }

      function n() {
        function b(b) {
          return b.data && b.data.ignore ? (H(a(b.target).closest(".sp-thumb-el").data("color")), K()) : (H(a(b.target).closest(".sp-thumb-el").data("color")), K(), N(!0), U.hideAfterPaletteSelect && F()), !1
        }
        if (p && xa.find("*:not(input)").attr("unselectable", "on"), j(), Pa && va.after(Qa).hide(), Za || Ka.hide(), V) va.after(xa).hide();
        else {
          var c = "parent" === U.appendTo ? va.parent() : a(U.appendTo);
          1 !== c.length && (c = a("body")), c.append(xa)
        }
        t(), Ra.bind("click.spectrum touchstart.spectrum", function (b) {
          wa || B(), b.stopPropagation(), a(b.target).is("input") || b.preventDefault()
        }), (va.is(":disabled") || U.disabled === !0) && S(), xa.click(i), Ga.change(A), Ga.bind("paste", function () {
          setTimeout(A, 1)
        }), Ga.keydown(function (a) {
          13 == a.keyCode && A()
        }), Ja.text(U.cancelText), Ja.bind("click.spectrum", function (a) {
          a.stopPropagation(), a.preventDefault(), G(), F()
        }), Ka.attr("title", U.clearText), Ka.bind("click.spectrum", function (a) {
          a.stopPropagation(), a.preventDefault(), Ya = !0, K(), V && N(!0)
        }), La.text(U.chooseText), La.bind("click.spectrum", function (a) {
          a.stopPropagation(), a.preventDefault(), p && Ga.is(":focus") && Ga.trigger("change"), J() && (N(!0), F())
        }), Ma.text(U.showPaletteOnly ? U.togglePaletteMoreText : U.togglePaletteLessText), Ma.bind("click.spectrum", function (a) {
          a.stopPropagation(), a.preventDefault(), U.showPaletteOnly = !U.showPaletteOnly, U.showPaletteOnly || V || xa.css("left", "-=" + (ya.outerWidth(!0) + 5)), j()
        }), k(Ea, function (a, b, c) {
          ma = a / ga, Ya = !1, c.shiftKey && (ma = Math.round(10 * ma) / 10), K()
        }, y, z), k(Ba, function (a, b) {
          ja = parseFloat(b / ea), Ya = !1, U.showAlpha || (ma = 1), K()
        }, y, z), k(za, function (a, b, c) {
          if (c.shiftKey) {
            if (!ta) {
              var d = ka * ba,
                e = ca - la * ca,
                f = Math.abs(a - d) > Math.abs(b - e);
              ta = f ? "x" : "y"
            }
          } else ta = null;
          var g = !ta || "x" === ta,
            h = !ta || "y" === ta;
          g && (ka = parseFloat(a / ba)), h && (la = parseFloat((ca - b) / ca)), Ya = !1, U.showAlpha || (ma = 1), K()
        }, y, z), Ta ? (H(Ta), L(), Wa = Va || tinycolor(Ta).format, u(Ta)) : L(), V && C();
        var d = p ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
        Ha.delegate(".sp-thumb-el", d, b), Ia.delegate(".sp-thumb-el:nth-child(1)", d, {
          ignore: !0
        }, b)
      }

      function t() {
        if (X && window.localStorage) {
          try {
            var b = window.localStorage[X].split(",#");
            b.length > 1 && (delete window.localStorage[X], a.each(b, function (a, b) {
              u(b)
            }))
          } catch (c) {}
          try {
            qa = window.localStorage[X].split(";")
          } catch (c) {}
        }
      }

      function u(b) {
        if (W) {
          var c = tinycolor(b).toRgbString();
          if (!pa[c] && -1 === a.inArray(c, qa))
            for (qa.push(c); qa.length > ra;) qa.shift();
          if (X && window.localStorage) try {
            window.localStorage[X] = qa.join(";")
          } catch (d) {}
        }
      }

      function v() {
        var a = [];
        if (U.showPalette)
          for (var b = 0; b < qa.length; b++) {
            var c = tinycolor(qa[b]).toRgbString();
            pa[c] || a.push(qa[b])
          }
        return a.reverse().slice(0, U.maxSelectionSize)
      }

      function w() {
        var b = I(),
          d = a.map(oa, function (a, d) {
            return c(a, b, "sp-palette-row sp-palette-row-" + d, U)
          });
        t(), qa && d.push(c(v(), b, "sp-palette-row sp-palette-row-selection", U)), Ha.html(d.join(""))
      }

      function x() {
        if (U.showInitial) {
          var a = Ua,
            b = I();
          Ia.html(c([a, b], b, "sp-palette-row-initial", U))
        }
      }

      function y() {
        (0 >= ca || 0 >= ba || 0 >= ea) && O(), aa = !0, xa.addClass(sa), ta = null, va.trigger("dragstart.spectrum", [I()])
      }

      function z() {
        aa = !1, xa.removeClass(sa), va.trigger("dragstop.spectrum", [I()])
      }

      function A() {
        var a = Ga.val();
        if (null !== a && "" !== a || !Za) {
          var b = tinycolor(a);
          b.isValid() ? (H(b), N(!0)) : Ga.addClass("sp-validation-error")
        } else H(null), N(!0)
      }

      function B() {
        _ ? F() : C()
      }

      function C() {
        var b = a.Event("beforeShow.spectrum");
        return _ ? void O() : (va.trigger(b, [I()]), void(Z.beforeShow(I()) === !1 || b.isDefaultPrevented() || (d(), _ = !0, a(ua).bind("keydown.spectrum", D), a(ua).bind("click.spectrum", E), a(window).bind("resize.spectrum", $), Qa.addClass("sp-active"), xa.removeClass("sp-hidden"), O(), L(), Ua = I(), x(), Z.show(Ua), va.trigger("show.spectrum", [Ua]))))
      }

      function D(a) {
        27 === a.keyCode && F()
      }

      function E(a) {
        2 != a.button && (aa || (Xa ? N(!0) : G(), F()))
      }

      function F() {
        _ && !V && (_ = !1, a(ua).unbind("keydown.spectrum", D), a(ua).unbind("click.spectrum", E), a(window).unbind("resize.spectrum", $), Qa.removeClass("sp-active"), xa.addClass("sp-hidden"), Z.hide(I()), va.trigger("hide.spectrum", [I()]))
      }

      function G() {
        H(Ua, !0)
      }

      function H(a, b) {
        if (tinycolor.equals(a, I())) return void L();
        var c, d;
        !a && Za ? Ya = !0 : (Ya = !1, c = tinycolor(a), d = c.toHsv(), ja = d.h % 360 / 360, ka = d.s, la = d.v, ma = d.a), L(), c && c.isValid() && !b && (Wa = Va || c.getFormat())
      }

      function I(a) {
        return a = a || {}, Za && Ya ? null : tinycolor.fromRatio({
          h: ja,
          s: ka,
          v: la,
          a: Math.round(100 * ma) / 100
        }, {
          format: a.format || Wa
        })
      }

      function J() {
        return !Ga.hasClass("sp-validation-error")
      }

      function K() {
        L(), Z.move(I()), va.trigger("move.spectrum", [I()])
      }

      function L() {
        Ga.removeClass("sp-validation-error"), M();
        var a = tinycolor.fromRatio({
          h: ja,
          s: 1,
          v: 1
        });
        za.css("background-color", a.toHexString());
        var b = Wa;
        1 > ma && (0 !== ma || "name" !== b) && ("hex" === b || "hex3" === b || "hex6" === b || "name" === b) && (b = "rgb");
        var c = I({
            format: b
          }),
          d = "";
        if (Sa.removeClass("sp-clear-display"), Sa.css("background-color", "transparent"), !c && Za) Sa.addClass("sp-clear-display");
        else {
          var e = c.toHexString(),
            f = c.toRgbString();
          if (q || 1 === c.alpha ? Sa.css("background-color", f) : (Sa.css("background-color", "transparent"), Sa.css("filter", c.toFilter())), U.showAlpha) {
            var g = c.toRgb();
            g.a = 0;
            var h = tinycolor(g).toRgbString(),
              i = "linear-gradient(left, " + h + ", " + e + ")";
            p ? Da.css("filter", tinycolor(h).toFilter({
              gradientType: 1
            }, e)) : (Da.css("background", "-webkit-" + i), Da.css("background", "-moz-" + i), Da.css("background", "-ms-" + i), Da.css("background", "linear-gradient(to right, " + h + ", " + e + ")"))
          }
          d = c.toString(b)
        }
        U.showInput && Ga.val(d), U.showPalette && w(), x()
      }

      function M() {
        var a = ka,
          b = la;
        if (Za && Ya) Fa.hide(), Ca.hide(), Aa.hide();
        else {
          Fa.show(), Ca.show(), Aa.show();
          var c = a * ba,
            d = ca - b * ca;
          c = Math.max(-da, Math.min(ba - da, c - da)), d = Math.max(-da, Math.min(ca - da, d - da)), Aa.css({
            top: d + "px",
            left: c + "px"
          });
          var e = ma * ga;
          Fa.css({
            left: e - ha / 2 + "px"
          });
          var f = ja * ea;
          Ca.css({
            top: f - ia + "px"
          })
        }
      }

      function N(a) {
        var b = I(),
          c = "",
          d = !tinycolor.equals(b, Ua);
        b && (c = b.toString(Wa), u(b)), Na && va.val(c), a && d && (Z.change(b), va.trigger("change", [b]))
      }

      function O() {
        ba = za.width(), ca = za.height(), da = Aa.height(), fa = Ba.width(), ea = Ba.height(), ia = Ca.height(), ga = Ea.width(), ha = Fa.width(), V || (xa.css("position", "absolute"), xa.offset(U.offset ? U.offset : g(xa, Ra))), M(), U.showPalette && w(), va.trigger("reflow.spectrum")
      }

      function P() {
        va.show(), Ra.unbind("click.spectrum touchstart.spectrum"), xa.remove(), Qa.remove(), o[$a.id] = null
      }

      function Q(c, d) {
        return c === b ? a.extend({}, U) : d === b ? U[c] : (U[c] = d, void j())
      }

      function R() {
        wa = !1, va.attr("disabled", !1), Ra.removeClass("sp-disabled")
      }

      function S() {
        F(), wa = !0, va.attr("disabled", !0), Ra.addClass("sp-disabled")
      }

      function T(a) {
        U.offset = a, O()
      }
      var U = e(h, f),
        V = U.flat,
        W = U.showSelectionPalette,
        X = U.localStorageKey,
        Y = U.theme,
        Z = U.callbacks,
        $ = l(O, 10),
        _ = !1,
        aa = !1,
        ba = 0,
        ca = 0,
        da = 0,
        ea = 0,
        fa = 0,
        ga = 0,
        ha = 0,
        ia = 0,
        ja = 0,
        ka = 0,
        la = 0,
        ma = 1,
        na = [],
        oa = [],
        pa = {},
        qa = U.selectionPalette.slice(0),
        ra = U.maxSelectionSize,
        sa = "sp-dragging",
        ta = null,
        ua = f.ownerDocument,
        va = (ua.body, a(f)),
        wa = !1,
        xa = a(s, ua).addClass(Y),
        ya = xa.find(".sp-picker-container"),
        za = xa.find(".sp-color"),
        Aa = xa.find(".sp-dragger"),
        Ba = xa.find(".sp-hue"),
        Ca = xa.find(".sp-slider"),
        Da = xa.find(".sp-alpha-inner"),
        Ea = xa.find(".sp-alpha"),
        Fa = xa.find(".sp-alpha-handle"),
        Ga = xa.find(".sp-input"),
        Ha = xa.find(".sp-palette"),
        Ia = xa.find(".sp-initial"),
        Ja = xa.find(".sp-cancel"),
        Ka = xa.find(".sp-clear"),
        La = xa.find(".sp-choose"),
        Ma = xa.find(".sp-palette-toggle"),
        Na = va.is("input"),
        Oa = Na && "color" === va.attr("type") && m(),
        Pa = Na && !V,
        Qa = Pa ? a(r).addClass(Y).addClass(U.className).addClass(U.replacerClassName) : a([]),
        Ra = Pa ? Qa : va,
        Sa = Qa.find(".sp-preview-inner"),
        Ta = U.color || Na && va.val(),
        Ua = !1,
        Va = U.preferredFormat,
        Wa = Va,
        Xa = !U.showButtons || U.clickoutFiresChange,
        Ya = !Ta,
        Za = U.allowEmpty && !Oa;
      n();
      var $a = {
        show: C,
        hide: F,
        toggle: B,
        reflow: O,
        option: Q,
        enable: R,
        disable: S,
        offset: T,
        set: function (a) {
          H(a), N()
        },
        get: I,
        destroy: P,
        container: xa
      };
      return $a.id = o.push($a) - 1, $a
    }

    function g(b, c) {
      var d = 0,
        e = b.outerWidth(),
        f = b.outerHeight(),
        g = c.outerHeight(),
        h = b[0].ownerDocument,
        i = h.documentElement,
        j = i.clientWidth + a(h).scrollLeft(),
        k = i.clientHeight + a(h).scrollTop(),
        l = c.offset();
      return l.top += g, l.left -= Math.min(l.left, l.left + e > j && j > e ? Math.abs(l.left + e - j) : 0), l.top -= Math.min(l.top, l.top + f > k && k > f ? Math.abs(f + g - d) : d), l
    }

    function h() {}

    function i(a) {
      a.stopPropagation()
    }

    function j(a, b) {
      var c = Array.prototype.slice,
        d = c.call(arguments, 2);
      return function () {
        return a.apply(b, d.concat(c.call(arguments)))
      }
    }

    function k(b, c, d, e) {
      function f(a) {
        a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault(), a.returnValue = !1
      }

      function g(a) {
        if (k) {
          if (p && j.documentMode < 9 && !a.button) return i();
          var d = a.originalEvent && a.originalEvent.touches && a.originalEvent.touches[0],
            e = d && d.pageX || a.pageX,
            g = d && d.pageY || a.pageY,
            h = Math.max(0, Math.min(e - l.left, n)),
            q = Math.max(0, Math.min(g - l.top, m));
          o && f(a), c.apply(b, [h, q, a])
        }
      }

      function h(c) {
        var e = c.which ? 3 == c.which : 2 == c.button;
        e || k || d.apply(b, arguments) !== !1 && (k = !0, m = a(b).height(), n = a(b).width(), l = a(b).offset(), a(j).bind(q), a(j.body).addClass("sp-dragging"), g(c), f(c))
      }

      function i() {
        k && (a(j).unbind(q), a(j.body).removeClass("sp-dragging"), setTimeout(function () {
          e.apply(b, arguments)
        }, 0)), k = !1
      }
      c = c || function () {}, d = d || function () {}, e = e || function () {};
      var j = document,
        k = !1,
        l = {},
        m = 0,
        n = 0,
        o = "ontouchstart" in window,
        q = {};
      q.selectstart = f, q.dragstart = f, q["touchmove mousemove"] = g, q["touchend mouseup"] = i, a(b).bind("touchstart mousedown", h)
    }

    function l(a, b, c) {
      var d;
      return function () {
        var e = this,
          f = arguments,
          g = function () {
            d = null, a.apply(e, f)
          };
        c && clearTimeout(d), (c || !d) && (d = setTimeout(g, b))
      }
    }

    function m() {
      return a.fn.spectrum.inputTypeColorSupport()
    }
    var n = {
        beforeShow: h,
        move: h,
        change: h,
        show: h,
        hide: h,
        color: !1,
        flat: !1,
        showInput: !1,
        allowEmpty: !1,
        showButtons: !0,
        clickoutFiresChange: !0,
        showInitial: !1,
        showPalette: !1,
        showPaletteOnly: !1,
        hideAfterPaletteSelect: !1,
        togglePaletteOnly: !1,
        showSelectionPalette: !0,
        localStorageKey: !1,
        appendTo: "body",
        maxSelectionSize: 7,
        cancelText: "cancel",
        chooseText: "choose",
        togglePaletteMoreText: "more",
        togglePaletteLessText: "less",
        clearText: "Clear Color Selection",
        noColorSelectedText: "No Color Selected",
        preferredFormat: !1,
        className: "",
        containerClassName: "",
        replacerClassName: "",
        showAlpha: !1,
        theme: "sp-light",
        palette: [["#ffffff", "#000000", "#ff0000", "#ff8000", "#ffff00", "#008000", "#0000ff", "#4b0082", "#9400d3"]],
        selectionPalette: [],
        disabled: !1,
        offset: null
      },
      o = [],
      p = !!/msie/i.exec(window.navigator.userAgent),
      q = function () {
        function a(a, b) {
          return !!~("" + a).indexOf(b)
        }
        var b = document.createElement("div"),
          c = b.style;
        return c.cssText = "background-color:rgba(0,0,0,.5)", a(c.backgroundColor, "rgba") || a(c.backgroundColor, "hsla")
      }(),
      r = ["<div class='sp-replacer'>", "<div class='sp-preview'><div class='sp-preview-inner'></div></div>", "<div class='sp-dd'>&#9660;</div>", "</div>"].join(""),
      s = function () {
        var a = "";
        if (p)
          for (var b = 1; 6 >= b; b++) a += "<div class='sp-" + b + "'></div>";
        return ["<div class='sp-container sp-hidden'>", "<div class='sp-palette-container'>", "<div class='sp-palette sp-thumb sp-cf'></div>", "<div class='sp-palette-button-container sp-cf'>", "<button type='button' class='sp-palette-toggle'></button>", "</div>", "</div>", "<div class='sp-picker-container'>", "<div class='sp-top sp-cf'>", "<div class='sp-fill'></div>", "<div class='sp-top-inner'>", "<div class='sp-color'>", "<div class='sp-sat'>", "<div class='sp-val'>", "<div class='sp-dragger'></div>", "</div>", "</div>", "</div>", "<div class='sp-clear sp-clear-display'>", "</div>", "<div class='sp-hue'>", "<div class='sp-slider'></div>", a, "</div>", "</div>", "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>", "</div>", "<div class='sp-input-container sp-cf'>", "<input class='sp-input' type='text' spellcheck='false'  />", "</div>", "<div class='sp-initial sp-thumb sp-cf'></div>", "<div class='sp-button-container sp-cf'>", "<a class='sp-cancel' href='#'></a>", "<button type='button' class='sp-choose'></button>", "</div>", "</div>", "</div>"].join("");

      }(),
      t = "spectrum.id";
    a.fn.spectrum = function (b, c) {
        if ("string" == typeof b) {
          var d = this,
            e = Array.prototype.slice.call(arguments, 1);
          return this.each(function () {
            var c = o[a(this).data(t)];
            if (c) {
              var f = c[b];
              if (!f) throw new Error("Spectrum: no such method: '" + b + "'");
              "get" == b ? d = c.get() : "container" == b ? d = c.container : "option" == b ? d = c.option.apply(c, e) : "destroy" == b ? (c.destroy(), a(this).removeData(t)) : f.apply(c, e)
            }
          }), d
        }
        return this.spectrum("destroy").each(function () {
          var c = a.extend({}, b, a(this).data()),
            d = f(this, c);
          a(this).data(t, d.id)
        })
      }, a.fn.spectrum.load = !0, a.fn.spectrum.loadOpts = {}, a.fn.spectrum.draggable = k, a.fn.spectrum.defaults = n, a.fn.spectrum.inputTypeColorSupport = function u() {
        if ("undefined" == typeof u._cachedResult) {
          var b = a("<input type='color' value='!' />")[0];
          u._cachedResult = "color" === b.type && "!" !== b.value
        }
        return u._cachedResult
      }, a.spectrum = {}, a.spectrum.localization = {}, a.spectrum.palettes = {}, a.fn.spectrum.processNativeColorInputs = function () {
        var b = a("input[type=color]");
        b.length && !m() && b.spectrum({
          preferredFormat: "hex6"
        })
      },
      function () {
        function a(a) {
          var c = {
              r: 0,
              g: 0,
              b: 0
            },
            e = 1,
            g = !1,
            h = !1;
          return "string" == typeof a && (a = G(a)), "object" == typeof a && (a.hasOwnProperty("r") && a.hasOwnProperty("g") && a.hasOwnProperty("b") ? (c = b(a.r, a.g, a.b), g = !0, h = "%" === String(a.r).substr(-1) ? "prgb" : "rgb") : a.hasOwnProperty("h") && a.hasOwnProperty("s") && a.hasOwnProperty("v") ? (a.s = D(a.s), a.v = D(a.v), c = f(a.h, a.s, a.v), g = !0, h = "hsv") : a.hasOwnProperty("h") && a.hasOwnProperty("s") && a.hasOwnProperty("l") && (a.s = D(a.s), a.l = D(a.l), c = d(a.h, a.s, a.l), g = !0, h = "hsl"), a.hasOwnProperty("a") && (e = a.a)), e = w(e), {
            ok: g,
            format: a.format || h,
            r: M(255, N(c.r, 0)),
            g: M(255, N(c.g, 0)),
            b: M(255, N(c.b, 0)),
            a: e
          }
        }

        function b(a, b, c) {
          return {
            r: 255 * x(a, 255),
            g: 255 * x(b, 255),
            b: 255 * x(c, 255)
          }
        }

        function c(a, b, c) {
          a = x(a, 255), b = x(b, 255), c = x(c, 255);
          var d, e, f = N(a, b, c),
            g = M(a, b, c),
            h = (f + g) / 2;
          if (f == g) d = e = 0;
          else {
            var i = f - g;
            switch (e = h > .5 ? i / (2 - f - g) : i / (f + g), f) {
            case a:
              d = (b - c) / i + (c > b ? 6 : 0);
              break;
            case b:
              d = (c - a) / i + 2;
              break;
            case c:
              d = (a - b) / i + 4
            }
            d /= 6
          }
          return {
            h: d,
            s: e,
            l: h
          }
        }

        function d(a, b, c) {
          function d(a, b, c) {
            return 0 > c && (c += 1), c > 1 && (c -= 1), 1 / 6 > c ? a + 6 * (b - a) * c : .5 > c ? b : 2 / 3 > c ? a + (b - a) * (2 / 3 - c) * 6 : a
          }
          var e, f, g;
          if (a = x(a, 360), b = x(b, 100), c = x(c, 100), 0 === b) e = f = g = c;
          else {
            var h = .5 > c ? c * (1 + b) : c + b - c * b,
              i = 2 * c - h;
            e = d(i, h, a + 1 / 3), f = d(i, h, a), g = d(i, h, a - 1 / 3)
          }
          return {
            r: 255 * e,
            g: 255 * f,
            b: 255 * g
          }
        }

        function e(a, b, c) {
          a = x(a, 255), b = x(b, 255), c = x(c, 255);
          var d, e, f = N(a, b, c),
            g = M(a, b, c),
            h = f,
            i = f - g;
          if (e = 0 === f ? 0 : i / f, f == g) d = 0;
          else {
            switch (f) {
            case a:
              d = (b - c) / i + (c > b ? 6 : 0);
              break;
            case b:
              d = (c - a) / i + 2;
              break;
            case c:
              d = (a - b) / i + 4
            }
            d /= 6
          }
          return {
            h: d,
            s: e,
            v: h
          }
        }

        function f(a, b, c) {
          a = 6 * x(a, 360), b = x(b, 100), c = x(c, 100);
          var d = K.floor(a),
            e = a - d,
            f = c * (1 - b),
            g = c * (1 - e * b),
            h = c * (1 - (1 - e) * b),
            i = d % 6,
            j = [c, g, f, f, h, c][i],
            k = [h, c, c, g, f, f][i],
            l = [f, f, h, c, c, g][i];
          return {
            r: 255 * j,
            g: 255 * k,
            b: 255 * l
          }
        }

        function g(a, b, c, d) {
          var e = [C(L(a).toString(16)), C(L(b).toString(16)), C(L(c).toString(16))];
          return d && e[0].charAt(0) == e[0].charAt(1) && e[1].charAt(0) == e[1].charAt(1) && e[2].charAt(0) == e[2].charAt(1) ? e[0].charAt(0) + e[1].charAt(0) + e[2].charAt(0) : e.join("")
        }

        function h(a, b, c, d) {
          var e = [C(E(d)), C(L(a).toString(16)), C(L(b).toString(16)), C(L(c).toString(16))];
          return e.join("")
        }

        function i(a, b) {
          b = 0 === b ? 0 : b || 10;
          var c = P(a).toHsl();
          return c.s -= b / 100, c.s = y(c.s), P(c)
        }

        function j(a, b) {
          b = 0 === b ? 0 : b || 10;
          var c = P(a).toHsl();
          return c.s += b / 100, c.s = y(c.s), P(c)
        }

        function k(a) {
          return P(a).desaturate(100)
        }

        function l(a, b) {
          b = 0 === b ? 0 : b || 10;
          var c = P(a).toHsl();
          return c.l += b / 100, c.l = y(c.l), P(c)
        }

        function m(a, b) {
          b = 0 === b ? 0 : b || 10;
          var c = P(a).toRgb();
          return c.r = N(0, M(255, c.r - L(255 * -(b / 100)))), c.g = N(0, M(255, c.g - L(255 * -(b / 100)))), c.b = N(0, M(255, c.b - L(255 * -(b / 100)))), P(c)
        }

        function n(a, b) {
          b = 0 === b ? 0 : b || 10;
          var c = P(a).toHsl();
          return c.l -= b / 100, c.l = y(c.l), P(c)
        }

        function o(a, b) {
          var c = P(a).toHsl(),
            d = (L(c.h) + b) % 360;
          return c.h = 0 > d ? 360 + d : d, P(c)
        }

        function p(a) {
          var b = P(a).toHsl();
          return b.h = (b.h + 180) % 360, P(b)
        }

        function q(a) {
          var b = P(a).toHsl(),
            c = b.h;
          return [P(a), P({
            h: (c + 120) % 360,
            s: b.s,
            l: b.l
          }), P({
            h: (c + 240) % 360,
            s: b.s,
            l: b.l
          })]
        }

        function r(a) {
          var b = P(a).toHsl(),
            c = b.h;
          return [P(a), P({
            h: (c + 90) % 360,
            s: b.s,
            l: b.l
          }), P({
            h: (c + 180) % 360,
            s: b.s,
            l: b.l
          }), P({
            h: (c + 270) % 360,
            s: b.s,
            l: b.l
          })]
        }

        function s(a) {
          var b = P(a).toHsl(),
            c = b.h;
          return [P(a), P({
            h: (c + 72) % 360,
            s: b.s,
            l: b.l
          }), P({
            h: (c + 216) % 360,
            s: b.s,
            l: b.l
          })]
        }

        function t(a, b, c) {
          b = b || 6, c = c || 30;
          var d = P(a).toHsl(),
            e = 360 / c,
            f = [P(a)];
          for (d.h = (d.h - (e * b >> 1) + 720) % 360; --b;) d.h = (d.h + e) % 360, f.push(P(d));
          return f
        }

        function u(a, b) {
          b = b || 6;
          for (var c = P(a).toHsv(), d = c.h, e = c.s, f = c.v, g = [], h = 1 / b; b--;) g.push(P({
            h: d,
            s: e,
            v: f
          })), f = (f + h) % 1;
          return g
        }

        function v(a) {
          var b = {};
          for (var c in a) a.hasOwnProperty(c) && (b[a[c]] = c);
          return b
        }

        function w(a) {
          return a = parseFloat(a), (isNaN(a) || 0 > a || a > 1) && (a = 1), a
        }

        function x(a, b) {
          A(a) && (a = "100%");
          var c = B(a);
          return a = M(b, N(0, parseFloat(a))), c && (a = parseInt(a * b, 10) / 100), K.abs(a - b) < 1e-6 ? 1 : a % b / parseFloat(b)
        }

        function y(a) {
          return M(1, N(0, a))
        }

        function z(a) {
          return parseInt(a, 16)
        }

        function A(a) {
          return "string" == typeof a && -1 != a.indexOf(".") && 1 === parseFloat(a)
        }

        function B(a) {
          return "string" == typeof a && -1 != a.indexOf("%")
        }

        function C(a) {
          return 1 == a.length ? "0" + a : "" + a
        }

        function D(a) {
          return 1 >= a && (a = 100 * a + "%"), a
        }

        function E(a) {
          return Math.round(255 * parseFloat(a)).toString(16)
        }

        function F(a) {
          return z(a) / 255
        }

        function G(a) {
          a = a.replace(H, "").replace(I, "").toLowerCase();
          var b = !1;
          if (Q[a]) a = Q[a], b = !0;
          else if ("transparent" == a) return {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            format: "name"
          };
          var c;
          return (c = S.rgb.exec(a)) ? {
            r: c[1],
            g: c[2],
            b: c[3]
          } : (c = S.rgba.exec(a)) ? {
            r: c[1],
            g: c[2],
            b: c[3],
            a: c[4]
          } : (c = S.hsl.exec(a)) ? {
            h: c[1],
            s: c[2],
            l: c[3]
          } : (c = S.hsla.exec(a)) ? {
            h: c[1],
            s: c[2],
            l: c[3],
            a: c[4]
          } : (c = S.hsv.exec(a)) ? {
            h: c[1],
            s: c[2],
            v: c[3]
          } : (c = S.hsva.exec(a)) ? {
            h: c[1],
            s: c[2],
            v: c[3],
            a: c[4]
          } : (c = S.hex8.exec(a)) ? {
            a: F(c[1]),
            r: z(c[2]),
            g: z(c[3]),
            b: z(c[4]),
            format: b ? "name" : "hex8"
          } : (c = S.hex6.exec(a)) ? {
            r: z(c[1]),
            g: z(c[2]),
            b: z(c[3]),
            format: b ? "name" : "hex"
          } : (c = S.hex3.exec(a)) ? {
            r: z(c[1] + "" + c[1]),
            g: z(c[2] + "" + c[2]),
            b: z(c[3] + "" + c[3]),
            format: b ? "name" : "hex"
          } : !1
        }
        var H = /^[\s,#]+/,
          I = /\s+$/,
          J = 0,
          K = Math,
          L = K.round,
          M = K.min,
          N = K.max,
          O = K.random,
          P = function (b, c) {
            if (b = b ? b : "", c = c || {}, b instanceof P) return b;
            if (!(this instanceof P)) return new P(b, c);
            var d = a(b);
            this._originalInput = b, this._r = d.r, this._g = d.g, this._b = d.b, this._a = d.a, this._roundA = L(100 * this._a) / 100, this._format = c.format || d.format, this._gradientType = c.gradientType, this._r < 1 && (this._r = L(this._r)), this._g < 1 && (this._g = L(this._g)), this._b < 1 && (this._b = L(this._b)), this._ok = d.ok, this._tc_id = J++
          };
        P.prototype = {
          isDark: function () {
            return this.getBrightness() < 128
          },
          isLight: function () {
            return !this.isDark()
          },
          isValid: function () {
            return this._ok
          },
          getOriginalInput: function () {
            return this._originalInput
          },
          getFormat: function () {
            return this._format
          },
          getAlpha: function () {
            return this._a
          },
          getBrightness: function () {
            var a = this.toRgb();
            return (299 * a.r + 587 * a.g + 114 * a.b) / 1e3
          },
          setAlpha: function (a) {
            return this._a = w(a), this._roundA = L(100 * this._a) / 100, this
          },
          toHsv: function () {
            var a = e(this._r, this._g, this._b);
            return {
              h: 360 * a.h,
              s: a.s,
              v: a.v,
              a: this._a
            }
          },
          toHsvString: function () {
            var a = e(this._r, this._g, this._b),
              b = L(360 * a.h),
              c = L(100 * a.s),
              d = L(100 * a.v);
            return 1 == this._a ? "hsv(" + b + ", " + c + "%, " + d + "%)" : "hsva(" + b + ", " + c + "%, " + d + "%, " + this._roundA + ")"
          },
          toHsl: function () {
            var a = c(this._r, this._g, this._b);
            return {
              h: 360 * a.h,
              s: a.s,
              l: a.l,
              a: this._a
            }
          },
          toHslString: function () {
            var a = c(this._r, this._g, this._b),
              b = L(360 * a.h),
              d = L(100 * a.s),
              e = L(100 * a.l);
            return 1 == this._a ? "hsl(" + b + ", " + d + "%, " + e + "%)" : "hsla(" + b + ", " + d + "%, " + e + "%, " + this._roundA + ")"
          },
          toHex: function (a) {
            return g(this._r, this._g, this._b, a)
          },
          toHexString: function (a) {
            return "#" + this.toHex(a)
          },
          toHex8: function () {
            return h(this._r, this._g, this._b, this._a)
          },
          toHex8String: function () {
            return "#" + this.toHex8()
          },
          toRgb: function () {
            return {
              r: L(this._r),
              g: L(this._g),
              b: L(this._b),
              a: this._a
            }
          },
          toRgbString: function () {
            return 1 == this._a ? "rgb(" + L(this._r) + ", " + L(this._g) + ", " + L(this._b) + ")" : "rgba(" + L(this._r) + ", " + L(this._g) + ", " + L(this._b) + ", " + this._roundA + ")"
          },
          toPercentageRgb: function () {
            return {
              r: L(100 * x(this._r, 255)) + "%",
              g: L(100 * x(this._g, 255)) + "%",
              b: L(100 * x(this._b, 255)) + "%",
              a: this._a
            }
          },
          toPercentageRgbString: function () {
            return 1 == this._a ? "rgb(" + L(100 * x(this._r, 255)) + "%, " + L(100 * x(this._g, 255)) + "%, " + L(100 * x(this._b, 255)) + "%)" : "rgba(" + L(100 * x(this._r, 255)) + "%, " + L(100 * x(this._g, 255)) + "%, " + L(100 * x(this._b, 255)) + "%, " + this._roundA + ")"
          },
          toName: function () {
            return 0 === this._a ? "transparent" : this._a < 1 ? !1 : R[g(this._r, this._g, this._b, !0)] || !1
          },
          toFilter: function (a) {
            var b = "#" + h(this._r, this._g, this._b, this._a),
              c = b,
              d = this._gradientType ? "GradientType = 1, " : "";
            if (a) {
              var e = P(a);
              c = e.toHex8String()
            }
            return "progid:DXImageTransform.Microsoft.gradient(" + d + "startColorstr=" + b + ",endColorstr=" + c + ")"
          },
          toString: function (a) {
            var b = !!a;
            a = a || this._format;
            var c = !1,
              d = this._a < 1 && this._a >= 0,
              e = !b && d && ("hex" === a || "hex6" === a || "hex3" === a || "name" === a);
            return e ? "name" === a && 0 === this._a ? this.toName() : this.toRgbString() : ("rgb" === a && (c = this.toRgbString()), "prgb" === a && (c = this.toPercentageRgbString()), ("hex" === a || "hex6" === a) && (c = this.toHexString()), "hex3" === a && (c = this.toHexString(!0)), "hex8" === a && (c = this.toHex8String()), "name" === a && (c = this.toName()), "hsl" === a && (c = this.toHslString()), "hsv" === a && (c = this.toHsvString()), c || this.toHexString())
          },
          _applyModification: function (a, b) {
            var c = a.apply(null, [this].concat([].slice.call(b)));
            return this._r = c._r, this._g = c._g, this._b = c._b, this.setAlpha(c._a), this
          },
          lighten: function () {
            return this._applyModification(l, arguments)
          },
          brighten: function () {
            return this._applyModification(m, arguments)
          },
          darken: function () {
            return this._applyModification(n, arguments)
          },
          desaturate: function () {
            return this._applyModification(i, arguments)
          },
          saturate: function () {
            return this._applyModification(j, arguments)
          },
          greyscale: function () {
            return this._applyModification(k, arguments)
          },
          spin: function () {
            return this._applyModification(o, arguments)
          },
          _applyCombination: function (a, b) {
            return a.apply(null, [this].concat([].slice.call(b)))
          },
          analogous: function () {
            return this._applyCombination(t, arguments)
          },
          complement: function () {
            return this._applyCombination(p, arguments)
          },
          monochromatic: function () {
            return this._applyCombination(u, arguments)
          },
          splitcomplement: function () {
            return this._applyCombination(s, arguments)
          },
          triad: function () {
            return this._applyCombination(q, arguments)
          },
          tetrad: function () {
            return this._applyCombination(r, arguments)
          }
        }, P.fromRatio = function (a, b) {
          if ("object" == typeof a) {
            var c = {};
            for (var d in a) a.hasOwnProperty(d) && ("a" === d ? c[d] = a[d] : c[d] = D(a[d]));
            a = c
          }
          return P(a, b)
        }, P.equals = function (a, b) {
          return a && b ? P(a).toRgbString() == P(b).toRgbString() : !1
        }, P.random = function () {
          return P.fromRatio({
            r: O(),
            g: O(),
            b: O()
          })
        }, P.mix = function (a, b, c) {
          c = 0 === c ? 0 : c || 50;
          var d, e = P(a).toRgb(),
            f = P(b).toRgb(),
            g = c / 100,
            h = 2 * g - 1,
            i = f.a - e.a;
          d = h * i == -1 ? h : (h + i) / (1 + h * i), d = (d + 1) / 2;
          var j = 1 - d,
            k = {
              r: f.r * d + e.r * j,
              g: f.g * d + e.g * j,
              b: f.b * d + e.b * j,
              a: f.a * g + e.a * (1 - g)
            };
          return P(k)
        }, P.readability = function (a, b) {
          var c = P(a),
            d = P(b),
            e = c.toRgb(),
            f = d.toRgb(),
            g = c.getBrightness(),
            h = d.getBrightness(),
            i = Math.max(e.r, f.r) - Math.min(e.r, f.r) + Math.max(e.g, f.g) - Math.min(e.g, f.g) + Math.max(e.b, f.b) - Math.min(e.b, f.b);
          return {
            brightness: Math.abs(g - h),
            color: i
          }
        }, P.isReadable = function (a, b) {
          var c = P.readability(a, b);
          return c.brightness > 125 && c.color > 500
        }, P.mostReadable = function (a, b) {
          for (var c = null, d = 0, e = !1, f = 0; f < b.length; f++) {
            var g = P.readability(a, b[f]),
              h = g.brightness > 125 && g.color > 500,
              i = 3 * (g.brightness / 125) + g.color / 500;
            (h && !e || h && e && i > d || !h && !e && i > d) && (e = h, d = i, c = P(b[f]))
          }
          return c
        };
        var Q = P.names = {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "0ff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000",
            blanchedalmond: "ffebcd",
            blue: "00f",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            burntsienna: "ea7e5d",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "0ff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgreen: "006400",
            darkgrey: "a9a9a9",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkslategrey: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dimgrey: "696969",
            dodgerblue: "1e90ff",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "f0f",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            green: "008000",
            greenyellow: "adff2f",
            grey: "808080",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgray: "d3d3d3",
            lightgreen: "90ee90",
            lightgrey: "d3d3d3",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslategray: "789",
            lightslategrey: "789",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "0f0",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "f0f",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370db",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "db7093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            rebeccapurple: "663399",
            red: "f00",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            slategrey: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            wheat: "f5deb3",
            white: "fff",
            whitesmoke: "f5f5f5",
            yellow: "ff0",
            yellowgreen: "9acd32"
          },
          R = P.hexNames = v(Q),
          S = function () {
            var a = "[-\\+]?\\d+%?",
              b = "[-\\+]?\\d*\\.\\d+%?",
              c = "(?:" + b + ")|(?:" + a + ")",
              d = "[\\s|\\(]+(" + c + ")[,|\\s]+(" + c + ")[,|\\s]+(" + c + ")\\s*\\)?",
              e = "[\\s|\\(]+(" + c + ")[,|\\s]+(" + c + ")[,|\\s]+(" + c + ")[,|\\s]+(" + c + ")\\s*\\)?";
            return {
              rgb: new RegExp("rgb" + d),
              rgba: new RegExp("rgba" + e),
              hsl: new RegExp("hsl" + d),
              hsla: new RegExp("hsla" + e),
              hsv: new RegExp("hsv" + d),
              hsva: new RegExp("hsva" + e),
              hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
              hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
              hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
            }
          }();
        window.tinycolor = P
      }(), a(function () {
        a.fn.spectrum.load && a.fn.spectrum.processNativeColorInputs(), a.fn.spectrum.get = function (a) {
          return o[a]
        }
      })
  }), ! function (a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(a.jQuery)
  }(this, function (a) {
    "function" != typeof Object.create && (Object.create = function (a) {
      function b() {}
      return b.prototype = a, new b
    });
    var b = {
      init: function (b) {
        return this.options = a.extend({}, a.noty.defaults, b), this.options.layout = this.options.custom ? a.noty.layouts.inline : a.noty.layouts[this.options.layout], a.noty.themes[this.options.theme] ? this.options.theme = a.noty.themes[this.options.theme] : b.themeClassName = this.options.theme, delete b.layout, delete b.theme, this.options = a.extend({}, this.options, this.options.layout.options), this.options.id = "noty_" + (new Date).getTime() * Math.floor(1e6 * Math.random()), this.options = a.extend({}, this.options, b), this._build(), this
      },
      _build: function () {
        var b = a('<div class="noty_bar noty_type_' + this.options.type + '"></div>').attr("id", this.options.id);
        if (b.append(this.options.template).find(".noty_text").html(this.options.text), this.$bar = null !== this.options.layout.parent.object ? a(this.options.layout.parent.object).css(this.options.layout.parent.css).append(b) : b, this.options.themeClassName && this.$bar.addClass(this.options.themeClassName).addClass("noty_container_type_" + this.options.type), this.options.buttons) {
          this.options.closeWith = [], this.options.timeout = !1;
          var c = a("<div/>").addClass("noty_buttons");
          null !== this.options.layout.parent.object ? this.$bar.find(".noty_bar").append(c) : this.$bar.append(c);
          var d = this;
          a.each(this.options.buttons, function (b, c) {
            var e = a("<button/>").addClass(c.addClass ? c.addClass : "gray").html(c.text).attr("id", c.id ? c.id : "button-" + b).appendTo(d.$bar.find(".noty_buttons")).on("click", function (b) {
              a.isFunction(c.onClick) && c.onClick.call(e, d, b)
            })
          })
        }
        this.$message = this.$bar.find(".noty_message"), this.$closeButton = this.$bar.find(".noty_close"), this.$buttons = this.$bar.find(".noty_buttons"), a.noty.store[this.options.id] = this
      },
      show: function () {
        var b = this;
        return b.options.custom ? b.options.custom.find(b.options.layout.container.selector).append(b.$bar) : a(b.options.layout.container.selector).append(b.$bar), b.options.theme && b.options.theme.style && b.options.theme.style.apply(b), "function" === a.type(b.options.layout.css) ? this.options.layout.css.apply(b.$bar) : b.$bar.css(this.options.layout.css || {}), b.$bar.addClass(b.options.layout.addClass), b.options.layout.container.style.apply(a(b.options.layout.container.selector)), b.showing = !0, b.options.theme && b.options.theme.style && b.options.theme.callback.onShow.apply(this), a.inArray("click", b.options.closeWith) > -1 && b.$bar.css("cursor", "pointer").one("click", function (a) {
          b.stopPropagation(a), b.options.callback.onCloseClick && b.options.callback.onCloseClick.apply(b), b.close()
        }), a.inArray("hover", b.options.closeWith) > -1 && b.$bar.one("mouseenter", function () {
          b.close()
        }), a.inArray("button", b.options.closeWith) > -1 && b.$closeButton.one("click", function (a) {
          b.stopPropagation(a), b.close()
        }), -1 == a.inArray("button", b.options.closeWith) && b.$closeButton.remove(), b.options.callback.onShow && b.options.callback.onShow.apply(b), "string" == typeof b.options.animation.open ? (b.$bar.css("height", b.$bar.innerHeight()), b.$bar.show().addClass(b.options.animation.open).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
          b.options.callback.afterShow && b.options.callback.afterShow.apply(b), b.showing = !1, b.shown = !0
        })) : b.$bar.animate(b.options.animation.open, b.options.animation.speed, b.options.animation.easing, function () {
          b.options.callback.afterShow && b.options.callback.afterShow.apply(b), b.showing = !1, b.shown = !0
        }), b.options.timeout && b.$bar.delay(b.options.timeout).promise().done(function () {
          b.close()
        }), this
      },
      close: function () {
        if (!(this.closed || this.$bar && this.$bar.hasClass("i-am-closing-now"))) {
          var b = this;
          if (this.showing) return void b.$bar.queue(function () {
            b.close.apply(b)
          });
          if (!this.shown && !this.showing) {
            var c = [];
            return a.each(a.noty.queue, function (a, d) {
              d.options.id != b.options.id && c.push(d)
            }), void(a.noty.queue = c)
          }
          b.$bar.addClass("i-am-closing-now"), b.options.callback.onClose && b.options.callback.onClose.apply(b), "string" == typeof b.options.animation.close ? b.$bar.addClass(b.options.animation.close).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            b.options.callback.afterClose && b.options.callback.afterClose.apply(b), b.closeCleanUp()
          }) : b.$bar.clearQueue().stop().animate(b.options.animation.close, b.options.animation.speed, b.options.animation.easing, function () {
            b.options.callback.afterClose && b.options.callback.afterClose.apply(b)
          }).promise().done(function () {
            b.closeCleanUp()
          })
        }
      },
      closeCleanUp: function () {
        var b = this;
        b.options.modal && (a.notyRenderer.setModalCount(-1), 0 == a.notyRenderer.getModalCount() && a(".noty_modal").fadeOut("fast", function () {
          a(this).remove()
        })), a.notyRenderer.setLayoutCountFor(b, -1), 0 == a.notyRenderer.getLayoutCountFor(b) && a(b.options.layout.container.selector).remove(), "undefined" != typeof b.$bar && null !== b.$bar && ("string" == typeof b.options.animation.close ? (b.$bar.css("transition", "all 100ms ease").css("border", 0).css("margin", 0).height(0), b.$bar.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
          b.$bar.remove(), b.$bar = null, b.closed = !0, b.options.theme.callback && b.options.theme.callback.onClose && b.options.theme.callback.onClose.apply(b)
        })) : (b.$bar.remove(), b.$bar = null, b.closed = !0)), delete a.noty.store[b.options.id], b.options.theme.callback && b.options.theme.callback.onClose && b.options.theme.callback.onClose.apply(b), b.options.dismissQueue || (a.noty.ontap = !0, a.notyRenderer.render()), b.options.maxVisible > 0 && b.options.dismissQueue && a.notyRenderer.render()
      },
      setText: function (a) {
        return this.closed || (this.options.text = a, this.$bar.find(".noty_text").html(a)), this
      },
      setType: function (a) {
        return this.closed || (this.options.type = a, this.options.theme.style.apply(this), this.options.theme.callback.onShow.apply(this)), this
      },
      setTimeout: function (a) {
        if (!this.closed) {
          var b = this;
          this.options.timeout = a, b.$bar.delay(b.options.timeout).promise().done(function () {
            b.close()
          })
        }
        return this
      },
      stopPropagation: function (a) {
        a = a || window.event, "undefined" != typeof a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
      },
      closed: !1,
      showing: !1,
      shown: !1
    };
    a.notyRenderer = {}, a.notyRenderer.init = function (c) {
      var d = Object.create(b).init(c);
      return d.options.killer && a.noty.closeAll(), d.options.force ? a.noty.queue.unshift(d) : a.noty.queue.push(d), a.notyRenderer.render(), "object" == a.noty.returns ? d : d.options.id
    }, a.notyRenderer.render = function () {
      var b = a.noty.queue[0];
      "object" === a.type(b) ? b.options.dismissQueue ? b.options.maxVisible > 0 ? a(b.options.layout.container.selector + " li").length < b.options.maxVisible && a.notyRenderer.show(a.noty.queue.shift()) : a.notyRenderer.show(a.noty.queue.shift()) : a.noty.ontap && (a.notyRenderer.show(a.noty.queue.shift()), a.noty.ontap = !1) : a.noty.ontap = !0
    }, a.notyRenderer.show = function (b) {
      b.options.modal && (a.notyRenderer.createModalFor(b), a.notyRenderer.setModalCount(1)), b.options.custom ? 0 == b.options.custom.find(b.options.layout.container.selector).length ? b.options.custom.append(a(b.options.layout.container.object).addClass("i-am-new")) : b.options.custom.find(b.options.layout.container.selector).removeClass("i-am-new") : 0 == a(b.options.layout.container.selector).length ? a("body").append(a(b.options.layout.container.object).addClass("i-am-new")) : a(b.options.layout.container.selector).removeClass("i-am-new"), a.notyRenderer.setLayoutCountFor(b, 1), b.show()
    }, a.notyRenderer.createModalFor = function (b) {
      if (0 == a(".noty_modal").length) {
        var c = a("<div/>").addClass("noty_modal").addClass(b.options.theme).data("noty_modal_count", 0);
        b.options.theme.modal && b.options.theme.modal.css && c.css(b.options.theme.modal.css), c.prependTo(a("body")).fadeIn("fast"), a.inArray("backdrop", b.options.closeWith) > -1 && c.on("click", function (b) {
          a.noty.closeAll()
        })
      }
    }, a.notyRenderer.getLayoutCountFor = function (b) {
      return a(b.options.layout.container.selector).data("noty_layout_count") || 0
    }, a.notyRenderer.setLayoutCountFor = function (b, c) {
      return a(b.options.layout.container.selector).data("noty_layout_count", a.notyRenderer.getLayoutCountFor(b) + c)
    }, a.notyRenderer.getModalCount = function () {
      return a(".noty_modal").data("noty_modal_count") || 0
    }, a.notyRenderer.setModalCount = function (b) {
      return a(".noty_modal").data("noty_modal_count", a.notyRenderer.getModalCount() + b)
    }, a.fn.noty = function (b) {
      return b.custom = a(this), a.notyRenderer.init(b)
    }, a.noty = {}, a.noty.queue = [], a.noty.ontap = !0, a.noty.layouts = {}, a.noty.themes = {}, a.noty.returns = "object", a.noty.store = {}, a.noty.get = function (b) {
      return a.noty.store.hasOwnProperty(b) ? a.noty.store[b] : !1
    }, a.noty.close = function (b) {
      return a.noty.get(b) ? a.noty.get(b).close() : !1
    }, a.noty.setText = function (b, c) {
      return a.noty.get(b) ? a.noty.get(b).setText(c) : !1
    }, a.noty.setType = function (b, c) {
      return a.noty.get(b) ? a.noty.get(b).setType(c) : !1
    }, a.noty.clearQueue = function () {
      a.noty.queue = []
    }, a.noty.closeAll = function () {
      a.noty.clearQueue(), a.each(a.noty.store, function (a, b) {
        b.close()
      })
    };
    var c = window.alert;
    return a.noty.consumeAlert = function (b) {
      window.alert = function (c) {
        b ? b.text = c : b = {
          text: c
        }, a.notyRenderer.init(b)
      }
    }, a.noty.stopConsumeAlert = function () {
      window.alert = c
    }, a.noty.defaults = {
      layout: "top",
      theme: "defaultTheme",
      type: "alert",
      text: "",
      dismissQueue: !0,
      template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
      animation: {
        open: {
          height: "toggle"
        },
        close: {
          height: "toggle"
        },
        easing: "swing",
        speed: 500
      },
      timeout: !1,
      force: !1,
      modal: !1,
      maxVisible: 5,
      killer: !1,
      closeWith: ["click"],
      callback: {
        onShow: function () {},
        afterShow: function () {},
        onClose: function () {},
        afterClose: function () {},
        onCloseClick: function () {}
      },
      buttons: !1
    }, a(window).on("resize", function () {
      a.each(a.noty.layouts, function (b, c) {
        c.container.style.apply(a(c.container.selector))
      })
    }), window.noty = function (b) {
      return a.notyRenderer.init(b)
    }, a.noty.layouts.bottom = {
      name: "bottom",
      options: {},
      container: {
        object: '<ul id="noty_bottom_layout_container" />',
        selector: "ul#noty_bottom_layout_container",
        style: function () {
          a(this).css({
            bottom: 0,
            left: "5%",
            position: "fixed",
            width: "90%",
            height: "auto",
            margin: 0,
            padding: 0,
            listStyleType: "none",
            zIndex: 9999999
          })
        }
      },
      parent: {
        object: "<li />",
        selector: "li",
        css: {}
      },
      css: {
        display: "none"
      },
      addClass: ""
    }, a.noty.layouts.bottomCenter = {
      name: "bottomCenter",
      options: {},
      container: {
        object: '<ul id="noty_bottomCenter_layout_container" />',
        selector: "ul#noty_bottomCenter_layout_container",
        style: function () {
          a(this).css({
            bottom: 20,
            left: 0,
            position: "fixed",
            width: "310px",
            height: "auto",
            margin: 0,
            padding: 0,
            listStyleType: "none",
            zIndex: 1e7
          }), a(this).css({
            left: (a(window).width() - a(this).outerWidth(!1)) / 2 + "px"
          })
        }
      },
      parent: {
        object: "<li />",
        selector: "li",
        css: {}
      },
      css: {
        display: "none",
        width: "310px"
      },
      addClass: ""
    }, a.noty.layouts.bottomLeft = {
      name: "bottomLeft",
      options: {},
      container: {
        object: '<ul id="noty_bottomLeft_layout_container" />',
        selector: "ul#noty_bottomLeft_layout_container",
        style: function () {
          a(this).css({
            bottom: 20,
            left: 20,
            position: "fixed",
            width: "310px",
            height: "auto",
            margin: 0,
            padding: 0,
            listStyleType: "none",
            zIndex: 1e7
          }), window.innerWidth < 600 && a(this).css({
            left: 5
          })
        }
      },
      parent: {
        object: "<li />",
        selector: "li",
        css: {}
      },
      css: {
        display: "none",
        width: "310px"
      },
      addClass: ""
    }, a.noty.layouts.bottomRight = {
      name: "bottomRight",
      options: {},
      container: {
        object: '<ul id="noty_bottomRight_layout_container" />',
        selector: "ul#noty_bottomRight_layout_container",
        style: function () {
          a(this).css({
            bottom: 20,
            right: 20,
            position: "fixed",
            width: "310px",
            height: "auto",
            margin: 0,
            padding: 0,
            listStyleType: "none",
            zIndex: 1e7
          }), window.innerWidth < 600 && a(this).css({
            right: 5
          })
        }
      },
      parent: {
        object: "<li />",
        selector: "li",
        css: {}
      },
      css: {
        display: "none",
        width: "310px"
      },
      addClass: ""
    }, a.noty.layouts.center = {
      name: "center",
      options: {},
      container: {
        object: '<ul id="noty_center_layout_container" />',
        selector: "ul#noty_center_layout_container",
        style: function () {
          a(this).css({
            position: "fixed",
            width: "310px",
            height: "auto",
            margin: 0,
            padding: 0,
            listStyleType: "none",
            zIndex: 1e7
          });
          var b = a(this).clone().css({
            visibility: "hidden",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0
          }).attr("id", "dupe");
          a("body").append(b), b.find(".i-am-closing-now").remove(), b.find("li").css("display", "block");
          var c = b.height();
          b.remove(), a(this).hasClass("i-am-new") ? a(this).css({
            left: (a(window).width() - a(this).outerWidth(!1)) / 2 + "px",
            top: (a(window).height() - c) / 2 + "px"
          }) : a(this).animate({
            left: (a(window).width() - a(this).outerWidth(!1)) / 2 + "px",
            top: (a(window).height() - c) / 2 + "px"
          }, 500)
        }
      },
      parent: {
        object: "<li />",
        selector: "li",
        css: {}
      },
      css: {
        display: "none",
        width: "310px"
      },
      addClass: ""
    }, a.noty.layouts.centerLeft = {
      name: "centerLeft",
      options: {},
      container: {
        object: '<ul id="noty_centerLeft_layout_container" />',
        selector: "ul#noty_centerLeft_layout_container",
        style: function () {
          a(this).css({
            left: 20,
            position: "fixed",
            width: "310px",
            height: "auto",
            margin: 0,
            padding: 0,
            listStyleType: "none",
            zIndex: 1e7
          });
          var b = a(this).clone().css({
            visibility: "hidden",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0
          }).attr("id", "dupe");
          a("body").append(b), b.find(".i-am-closing-now").remove(), b.find("li").css("display", "block");
          var c = b.height();
          b.remove(), a(this).hasClass("i-am-new") ? a(this).css({
            top: (a(window).height() - c) / 2 + "px"
          }) : a(this).animate({
            top: (a(window).height() - c) / 2 + "px"
          }, 500), window.innerWidth < 600 && a(this).css({
            left: 5
          })
        }
      },
      parent: {
        object: "<li />",
        selector: "li",
        css: {}
      },
      css: {
        display: "none",
        width: "310px"
      },
      addClass: ""
    }, a.noty.layouts.centerRight = {
      name: "centerRight",
      options: {},
      container: {
        object: '<ul id="noty_centerRight_layout_container" />',
        selector: "ul#noty_centerRight_layout_container",
        style: function () {
          a(this).css({
            right: 20,
            position: "fixed",
            width: "310px",
            height: "auto",
            margin: 0,
            padding: 0,
            listStyleType: "none",
            zIndex: 1e7
          });
          var b = a(this).clone().css({
            visibility: "hidden",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0
          }).attr("id", "dupe");
          a("body").append(b), b.find(".i-am-closing-now").remove(), b.find("li").css("display", "block");
          var c = b.height();
          b.remove(), a(this).hasClass("i-am-new") ? a(this).css({
            top: (a(window).height() - c) / 2 + "px"
          }) : a(this).animate({
            top: (a(window).height() - c) / 2 + "px"
          }, 500), window.innerWidth < 600 && a(this).css({
            right: 5
          })
        }
      },
      parent: {
        object: "<li />",
        selector: "li",
        css: {}
      },
      css: {
        display: "none",
        width: "310px"
      },
      addClass: ""
    }, a.noty.layouts.inline = {
      name: "inline",
      options: {},
      container: {
        object: '<ul class="noty_inline_layout_container" />',
        selector: "ul.noty_inline_layout_container",
        style: function () {
          a(this).css({
            width: "100%",
            height: "auto",
            margin: 0,
            padding: 0,
            listStyleType: "none",
            zIndex: 9999999
          })
        }
      },
      parent: {
        object: "<li />",
        selector: "li",
        css: {}
      },
      css: {
        display: "none"
      },
      addClass: ""
    }, a.noty.layouts.top = {
      name: "top",
      options: {},
      container: {
        object: '<ul id="noty_top_layout_container" />',
        selector: "ul#noty_top_layout_container",
        style: function () {
          a(this).css({
            top: 0,
            left: "5%",
            position: "fixed",
            width: "90%",
            height: "auto",
            margin: 0,
            padding: 0,
            listStyleType: "none",
            zIndex: 9999999
          })
        }
      },
      parent: {
        object: "<li />",
        selector: "li",
        css: {}
      },
      css: {
        display: "none"
      },
      addClass: ""
    }, a.noty.layouts.topCenter = {
      name: "topCenter",
      options: {},
      container: {
        object: '<ul id="noty_topCenter_layout_container" />',
        selector: "ul#noty_topCenter_layout_container",
        style: function () {
          a(this).css({
            top: 20,
            left: 0,
            position: "fixed",
            width: "310px",
            height: "auto",
            margin: 0,
            padding: 0,
            listStyleType: "none",
            zIndex: 1e7
          }), a(this).css({
            left: (a(window).width() - a(this).outerWidth(!1)) / 2 + "px"
          })
        }
      },
      parent: {
        object: "<li />",
        selector: "li",
        css: {}
      },
      css: {
        display: "none",
        width: "310px"
      },
      addClass: ""
    }, a.noty.layouts.topLeft = {
      name: "topLeft",
      options: {},
      container: {
        object: '<ul id="noty_topLeft_layout_container" />',
        selector: "ul#noty_topLeft_layout_container",
        style: function () {
          a(this).css({
            top: 20,
            left: 20,
            position: "fixed",
            width: "310px",
            height: "auto",
            margin: 0,
            padding: 0,
            listStyleType: "none",
            zIndex: 1e7
          }), window.innerWidth < 600 && a(this).css({
            left: 5
          })
        }
      },
      parent: {
        object: "<li />",
        selector: "li",
        css: {}
      },
      css: {
        display: "none",
        width: "310px"
      },
      addClass: ""
    }, a.noty.layouts.topRight = {
      name: "topRight",
      options: {},
      container: {
        object: '<ul id="noty_topRight_layout_container" />',
        selector: "ul#noty_topRight_layout_container",
        style: function () {
          a(this).css({
            top: 20,
            right: 20,
            position: "fixed",
            width: "310px",
            height: "auto",
            margin: 0,
            padding: 0,
            listStyleType: "none",
            zIndex: 1e7
          }), window.innerWidth < 600 && a(this).css({
            right: 5
          })
        }
      },
      parent: {
        object: "<li />",
        selector: "li",
        css: {}
      },
      css: {
        display: "none",
        width: "310px"
      },
      addClass: ""
    }, a.noty.themes.bootstrapTheme = {
      name: "bootstrapTheme",
      modal: {
        css: {
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          zIndex: 1e4,
          opacity: .6,
          display: "none",
          left: 0,
          top: 0
        }
      },
      style: function () {
        var b = this.options.layout.container.selector;
        switch (a(b).addClass("list-group"), this.$closeButton.append('<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>'), this.$closeButton.addClass("close"), this.$bar.addClass("list-group-item").css("padding", "0px"), this.options.type) {
        case "alert":
        case "notification":
          this.$bar.addClass("list-group-item-info");
          break;
        case "warning":
          this.$bar.addClass("list-group-item-warning");
          break;
        case "error":
          this.$bar.addClass("list-group-item-danger");
          break;
        case "information":
          this.$bar.addClass("list-group-item-info");
          break;
        case "success":
          this.$bar.addClass("list-group-item-success")
        }
        this.$message.css({
          fontSize: "13px",
          lineHeight: "16px",
          textAlign: "center",
          padding: "8px 10px 9px",
          width: "auto",
          position: "relative"
        })
      },
      callback: {
        onShow: function () {},
        onClose: function () {}
      }
    }, a.noty.themes.defaultTheme = {
      name: "defaultTheme",
      helpers: {
        borderFix: function () {
          if (this.options.dismissQueue) {
            var b = this.options.layout.container.selector + " " + this.options.layout.parent.selector;

            switch (this.options.layout.name) {
            case "top":
              a(b).css({
                borderRadius: "0px 0px 0px 0px"
              }), a(b).last().css({
                borderRadius: "0px 0px 5px 5px"
              });
              break;
            case "topCenter":
            case "topLeft":
            case "topRight":
            case "bottomCenter":
            case "bottomLeft":
            case "bottomRight":
            case "center":
            case "centerLeft":
            case "centerRight":
            case "inline":
              a(b).css({
                borderRadius: "0px 0px 0px 0px"
              }), a(b).first().css({
                "border-top-left-radius": "5px",
                "border-top-right-radius": "5px"
              }), a(b).last().css({
                "border-bottom-left-radius": "5px",
                "border-bottom-right-radius": "5px"
              });
              break;
            case "bottom":
              a(b).css({
                borderRadius: "0px 0px 0px 0px"
              }), a(b).first().css({
                borderRadius: "5px 5px 0px 0px"
              })
            }
          }
        }
      },
      modal: {
        css: {
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          zIndex: 1e4,
          opacity: .6,
          display: "none",
          left: 0,
          top: 0
        }
      },
      style: function () {
        switch (this.$bar.css({
          overflow: "hidden",
          background: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAoCAQAAAClM0ndAAAAhklEQVR4AdXO0QrCMBBE0bttkk38/w8WRERpdyjzVOc+HxhIHqJGMQcFFkpYRQotLLSw0IJ5aBdovruMYDA/kT8plF9ZKLFQcgF18hDj1SbQOMlCA4kao0iiXmah7qBWPdxpohsgVZyj7e5I9KcID+EhiDI5gxBYKLBQYKHAQoGFAoEks/YEGHYKB7hFxf0AAAAASUVORK5CYII=') repeat-x scroll left top #fff"
        }), this.$message.css({
          fontSize: "13px",
          lineHeight: "16px",
          textAlign: "center",
          padding: "8px 10px 9px",
          width: "auto",
          position: "relative"
        }), this.$closeButton.css({
          position: "absolute",
          top: 4,
          right: 4,
          width: 10,
          height: 10,
          background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAxUlEQVR4AR3MPUoDURSA0e++uSkkOxC3IAOWNtaCIDaChfgXBMEZbQRByxCwk+BasgQRZLSYoLgDQbARxry8nyumPcVRKDfd0Aa8AsgDv1zp6pYd5jWOwhvebRTbzNNEw5BSsIpsj/kurQBnmk7sIFcCF5yyZPDRG6trQhujXYosaFoc+2f1MJ89uc76IND6F9BvlXUdpb6xwD2+4q3me3bysiHvtLYrUJto7PD/ve7LNHxSg/woN2kSz4txasBdhyiz3ugPGetTjm3XRokAAAAASUVORK5CYII=)",
          display: "none",
          cursor: "pointer"
        }), this.$buttons.css({
          padding: 5,
          textAlign: "right",
          borderTop: "1px solid #ccc",
          backgroundColor: "#fff"
        }), this.$buttons.find("button").css({
          marginLeft: 5
        }), this.$buttons.find("button:first").css({
          marginLeft: 0
        }), this.$bar.on({
          mouseenter: function () {
            a(this).find(".noty_close").stop().fadeTo("normal", 1)
          },
          mouseleave: function () {
            a(this).find(".noty_close").stop().fadeTo("normal", 0)
          }
        }), this.options.layout.name) {
        case "top":
          this.$bar.css({
            borderRadius: "0px 0px 5px 5px",
            borderBottom: "2px solid #eee",
            borderLeft: "2px solid #eee",
            borderRight: "2px solid #eee",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          });
          break;
        case "topCenter":
        case "center":
        case "bottomCenter":
        case "inline":
          this.$bar.css({
            borderRadius: "5px",
            border: "1px solid #eee",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          }), this.$message.css({
            fontSize: "13px",
            textAlign: "center"
          });
          break;
        case "topLeft":
        case "topRight":
        case "bottomLeft":
        case "bottomRight":
        case "centerLeft":
        case "centerRight":
          this.$bar.css({
            borderRadius: "5px",
            border: "1px solid #eee",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          }), this.$message.css({
            fontSize: "13px",
            textAlign: "left"
          });
          break;
        case "bottom":
          this.$bar.css({
            borderRadius: "5px 5px 0px 0px",
            borderTop: "2px solid #eee",
            borderLeft: "2px solid #eee",
            borderRight: "2px solid #eee",
            boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)"
          });
          break;
        default:
          this.$bar.css({
            border: "2px solid #eee",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          })
        }
        switch (this.options.type) {
        case "alert":
        case "notification":
          this.$bar.css({
            backgroundColor: "#FFF",
            borderColor: "#CCC",
            color: "#444"
          });
          break;
        case "warning":
          this.$bar.css({
            backgroundColor: "#FFEAA8",
            borderColor: "#FFC237",
            color: "#826200"
          }), this.$buttons.css({
            borderTop: "1px solid #FFC237"
          });
          break;
        case "error":
          this.$bar.css({
            backgroundColor: "red",
            borderColor: "darkred",
            color: "#FFF"
          }), this.$message.css({
            fontWeight: "bold"
          }), this.$buttons.css({
            borderTop: "1px solid darkred"
          });
          break;
        case "information":
          this.$bar.css({
            backgroundColor: "#57B7E2",
            borderColor: "#0B90C4",
            color: "#FFF"
          }), this.$buttons.css({
            borderTop: "1px solid #0B90C4"
          });
          break;
        case "success":
          this.$bar.css({
            backgroundColor: "lightgreen",
            borderColor: "#50C24E",
            color: "darkgreen"
          }), this.$buttons.css({
            borderTop: "1px solid #50C24E"
          });
          break;
        default:
          this.$bar.css({
            backgroundColor: "#FFF",
            borderColor: "#CCC",
            color: "#444"
          })
        }
      },
      callback: {
        onShow: function () {
          a.noty.themes.defaultTheme.helpers.borderFix.apply(this)
        },
        onClose: function () {
          a.noty.themes.defaultTheme.helpers.borderFix.apply(this)
        }
      }
    }, a.noty.themes.relax = {
      name: "relax",
      helpers: {},
      modal: {
        css: {
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          zIndex: 1e4,
          opacity: .6,
          display: "none",
          left: 0,
          top: 0
        }
      },
      style: function () {
        switch (this.$bar.css({
          overflow: "hidden",
          margin: "4px 0",
          borderRadius: "2px"
        }), this.$message.css({
          fontSize: "14px",
          lineHeight: "16px",
          textAlign: "center",
          padding: "10px",
          width: "auto",
          position: "relative"
        }), this.$closeButton.css({
          position: "absolute",
          top: 4,
          right: 4,
          width: 10,
          height: 10,
          background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAxUlEQVR4AR3MPUoDURSA0e++uSkkOxC3IAOWNtaCIDaChfgXBMEZbQRByxCwk+BasgQRZLSYoLgDQbARxry8nyumPcVRKDfd0Aa8AsgDv1zp6pYd5jWOwhvebRTbzNNEw5BSsIpsj/kurQBnmk7sIFcCF5yyZPDRG6trQhujXYosaFoc+2f1MJ89uc76IND6F9BvlXUdpb6xwD2+4q3me3bysiHvtLYrUJto7PD/ve7LNHxSg/woN2kSz4txasBdhyiz3ugPGetTjm3XRokAAAAASUVORK5CYII=)",
          display: "none",
          cursor: "pointer"
        }), this.$buttons.css({
          padding: 5,
          textAlign: "right",
          borderTop: "1px solid #ccc",
          backgroundColor: "#fff"
        }), this.$buttons.find("button").css({
          marginLeft: 5
        }), this.$buttons.find("button:first").css({
          marginLeft: 0
        }), this.$bar.on({
          mouseenter: function () {
            a(this).find(".noty_close").stop().fadeTo("normal", 1)
          },
          mouseleave: function () {
            a(this).find(".noty_close").stop().fadeTo("normal", 0)
          }
        }), this.options.layout.name) {
        case "top":
          this.$bar.css({
            borderBottom: "2px solid #eee",
            borderLeft: "2px solid #eee",
            borderRight: "2px solid #eee",
            borderTop: "2px solid #eee",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          });
          break;
        case "topCenter":
        case "center":
        case "bottomCenter":
        case "inline":
          this.$bar.css({
            border: "1px solid #eee",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          }), this.$message.css({
            fontSize: "13px",
            textAlign: "center"
          });
          break;
        case "topLeft":
        case "topRight":
        case "bottomLeft":
        case "bottomRight":
        case "centerLeft":
        case "centerRight":
          this.$bar.css({
            border: "1px solid #eee",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          }), this.$message.css({
            fontSize: "13px",
            textAlign: "left"
          });
          break;
        case "bottom":
          this.$bar.css({
            borderTop: "2px solid #eee",
            borderLeft: "2px solid #eee",
            borderRight: "2px solid #eee",
            borderBottom: "2px solid #eee",
            boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)"
          });
          break;
        default:
          this.$bar.css({
            border: "2px solid #eee",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          })
        }
        switch (this.options.type) {
        case "alert":
        case "notification":
          this.$bar.css({
            backgroundColor: "#FFF",
            borderColor: "#dedede",
            color: "#444"
          });
          break;
        case "warning":
          this.$bar.css({
            backgroundColor: "#FFEAA8",
            borderColor: "#FFC237",
            color: "#826200"
          }), this.$buttons.css({
            borderTop: "1px solid #FFC237"
          });
          break;
        case "error":
          this.$bar.css({
            backgroundColor: "#FF8181",
            borderColor: "#e25353",
            color: "#FFF"
          }), this.$message.css({
            fontWeight: "bold"
          }), this.$buttons.css({
            borderTop: "1px solid darkred"
          });
          break;
        case "information":
          this.$bar.css({
            backgroundColor: "#78C5E7",
            borderColor: "#3badd6",
            color: "#FFF"
          }), this.$buttons.css({
            borderTop: "1px solid #0B90C4"
          });
          break;
        case "success":
          this.$bar.css({
            backgroundColor: "#BCF5BC",
            borderColor: "#7cdd77",
            color: "darkgreen"
          }), this.$buttons.css({
            borderTop: "1px solid #50C24E"
          });
          break;
        default:
          this.$bar.css({
            backgroundColor: "#FFF",
            borderColor: "#CCC",
            color: "#444"
          })
        }
      },
      callback: {
        onShow: function () {},
        onClose: function () {}
      }
    }, window.noty
  }), $.noty.layouts.top = {
    name: "top",
    options: {},
    container: {
      object: '<ul class="urban-noty-top" />',
      selector: "ul.urban-noty-top",
      style: function () {}
    },
    parent: {
      object: "<li />",
      selector: "li",
      css: {}
    },
    css: {
      display: "none"
    },
    addClass: ""
  }, $.noty.layouts.topLeft = {
    name: "topLeft",
    options: {},
    container: {
      object: '<ul class="urban-noty-top-left" />',
      selector: "ul.urban-noty-top-left",
      style: function () {}
    },
    parent: {
      object: "<li />",
      selector: "li",
      css: {}
    },
    css: {
      display: "none",
      width: "300px"
    },
    addClass: ""
  }, $.noty.layouts.topRight = {
    name: "topRight",
    options: {},
    container: {
      object: '<ul class="urban-noty-top-right" />',
      selector: "ul.urban-noty-top-right",
      style: function () {}
    },
    parent: {
      object: "<li />",
      selector: "li",
      css: {}
    },
    css: {
      display: "none",
      width: "300px"
    },
    addClass: ""
  }, $.noty.layouts.bottom = {
    name: "bottom",
    options: {},
    container: {
      object: '<ul class="urban-noty-bottom" />',
      selector: "ul.urban-noty-bottom",
      style: function () {}
    },
    parent: {
      object: "<li />",
      selector: "li",
      css: {}
    },
    css: {
      display: "none"
    },
    addClass: ""
  }, $.noty.layouts.bottomLeft = {
    name: "bottomLeft",
    options: {},
    container: {
      object: '<ul class="urban-noty-bottom-left" />',
      selector: "ul.urban-noty-bottom-left",
      style: function () {}
    },
    parent: {
      object: "<li />",
      selector: "li",
      css: {}
    },
    css: {
      display: "none",
      width: "300px"
    },
    addClass: ""
  }, $.noty.layouts.bottomRight = {
    name: "bottomRight",
    options: {},
    container: {
      object: '<ul class="urban-noty-bottom-right" />',
      selector: "ul.urban-noty-bottom-right",
      style: function () {}
    },
    parent: {
      object: "<li />",
      selector: "li",
      css: {}
    },
    css: {
      display: "none",
      width: "300px"
    },
    addClass: ""
  },
  function (a) {
    var b = function (b, c) {
      function d(b) {
        var c = a.Deferred(),
          d = "";
        if (b.less) return c.resolve();
        if (a.isArray(b.url))
          for (var e = 0; e < b.url.length; e++) d += "@import url(" + b.url[e] + ");";
        else d = "@import url(" + b.url + ");";
        return b.variables = b.variables || {}, a.less.resolveImports(d).done(function (d) {
          a.ajax({
            url: b.config,
            cache: !1,
            dataType: "json"
          }).done(function (e) {
            var g = a.less.getVars(d);
            b.less = d, b.config = e, b.groups = [], b.variables = b.variables || {}, b.matchName = f, a.each(b.config.groups, function (c, d) {
              var e, h = {
                label: d.label,
                icon: d.icon,
                variables: []
              };
              a.each(d.vars, function (c, d) {
                a.each(g, function (a, c) {
                  f(d, a) && (delete g[a], e = {
                    name: a,
                    "default": c,
                    placeholder: c,
                    label: a.replace(/^@/, "").replace(/\-/g, " "),
                    more: -1 !== c.indexOf("@"),
                    value: function () {
                      return b.variables[a] ? b.variables[a] : ""
                    }
                  }, e.more && (h.more = !0, e.placeholder = "@"), h.variables.push(e))
                })
              }), h.variables.length && b.groups.push(h)
            }), c.resolve()
          })
        }), c.promise()
      }

      function e(b) {
        h.html(Mustache.render(c.template.sidebar, b)), h.find("input[data-name]").each(function () {
          var c, d, e = a(this),
            g = e.val() || e.data("default"); - 1 === e.attr("data-default").indexOf("@") && a.each(b.config.controls, function (b, h) {
            a.each(h.vars, function (b, i) {
              if (f(i, e.attr("data-name"))) switch (h.type) {
              case "color":
                var j = a('<div class="sp-placeholder"><div class="sp-placeholder-color"></div></div>').find("div").css("background-color", g).end().on("click", function () {
                  var b;
                  e.spectrum({
                    showInput: !0,
                    showAlpha: !0,
                    preferredFormat: "hex6",
                    color: "inherit" == g ? "" : g,
                    change: function (a) {
                      a.toRgb().a < 1 && e.val(a.toRgbString()).trigger("change")
                    },
                    show: function () {
                      b || (b = a.fn.spectrum.get(e.data("spectrum.id")), e.hasClass("use-gist") && b.set(e.val()), b.container.find(".sp-cancel").after(a('<a href="#" class="sp-reset">reset</a>').on("click", function (a) {
                        a.preventDefault(), b.set("inherit" == e.data("default") ? "rgba(0,0,0,0)" : e.data("default")), b.hide(), e.val("").trigger("change")
                      })))
                    }
                  }), j.remove(), setTimeout(function () {
                    e.spectrum("show")
                  }, 50)
                });
                e.addClass("input-color").hide().after(j);
                break;
              case "font":
                d = [], a.isArray(h.options) ? d.push({
                  group: "",
                  options: h.options
                }) : a.each(h.options, function (a, b) {
                  d.push({
                    group: a,
                    options: b
                  })
                }), c = a(Mustache.render('<select>{{#groups}}{{#group}}<optgroup label="{{group}}">{{/group}}{{#options}}<option value="{{value}}"{{#url}} data-url="{{url}}"{{/url}}>{{name}}</option>{{/options}}{{#group}}</optgroup>{{/group}}{{/groups}}</select>', {
                  groups: d
                })), e.replaceWith(c.val(g).attr("class", e.attr("class")).attr("name", e.attr("name")).attr("data-name", e.attr("data-name")));
                break;
              case "select":
                c = a(Mustache.render('<select>{{#options}}<option value="{{value}}">{{name}}</option>{{/options}}</select>', {
                  options: h.options
                })), e.replaceWith(c.val(g).attr("class", e.attr("class")).attr("name", e.attr("name")).attr("data-name", e.attr("data-name")));
                break;
              case "range":
                g = e.attr("placeholder").replace(h.unit, ""), feedback = e.before('<input type="text" class="range-feedback" value="" readonly>'), e.prev().attr("value", g), e.attr("type", "range").attr("min", h.min).attr("max", h.max).attr("step", 1).attr("unit", h.unit).attr("value", g)
              }
            })
          })
        })
      }

      function f(a, b) {
        var c = "^" + a.replace(/\//g, "\\/").replace(/\*\*/g, "(\\/[^\\/]+)*").replace(/\*/g, "[^\\/]+").replace(/((?!\\))\?/g, "$1.") + "$";
        return c = "^" + c + "$", null !== b.match(new RegExp(c))
      } {
        var g, h = a(c.sidebar, b);
        window.sessionStorage || {}
      }
      this.$options = c, b.on({
        update: function (a, c, f) {
          var h = ($products.urban.name, g);
          g = $products.urban, (g !== h || f) && (b.trigger("updating", g), d(g).done(function () {
            e(g), b.trigger("updated", g)
          }))
        },
        updating: c.updating,
        updated: c.updated
      }), b.on("change", "input[name=vars], select[name=vars]", function (c) {
        c.preventDefault();
        var d = a(this).attr("data-name"),
          e = a(this).val();
        "range" === a(this).attr("type") && (e = a(this).val() + a(this).attr("unit")), "" === e ? delete g.variables[d] : g.variables[d] = e, b.trigger("updated", g)
      }), b.on("input", "input[type=range]", function (b) {
        b.preventDefault(), a(this).prev().attr("value", a(this).val())
      })
    };
    a.fn.customizer = function (c) {
      return this.each(function () {
        var d = {
            updating: a.noop(),
            updated: a.noop(),
            sidebar: "nav.navigation",
            template: {
              sidebar: '<ul class="nav">                             {{#groups}}                             <li class="menu-accordion">                                 <a href="javascript:;">                                   <i class="{{icon}}"></i>                                   <span>{{label}}</span>                                 </a>                                 <ul class="sub-menu">                                   {{#variables}}                                   <li>                                     <span class="pull-right">                                         <input name="vars" type="text"{{#value}} value="{{value}}"{{/value}} placeholder="{{placeholder}}" data-name="{{name}}" data-default="{{default}}">                                     </span>                                     <span>{{label}}</span>                                   </li>                                   {{/variables}}                                 </ul>                             </li>                             {{/groups}}                         </ul>'
            }
          },
          e = a(this);
        e.data("customizer", new b(e, a.extend({}, d, c)))
      })
    }
  }(jQuery), jQuery(function (a) {
    function b() {
      n.customizer(a.extend({
        updating: function (a, b) {
          o.css("opacity", "0"), p.show()
        },
        updated: function (b, c) {
          s ? (p.find(".text").text("Loading Config"), a.ajax(c.defaults, {
            nocache: Math.random(),
            dataType: "json"
          }).always(function (b, d) {
            e(function (d) {
              d ? (c.variables = d, a.each(d, function (b, c) {
                a('input[data-name="' + b + '"]').attr("unit") ? (c = c.replace(a('input[data-name="' + b + '"]').attr("unit"), ""), a('input[data-name="' + b + '"]').prop("value", c)) : a('input[data-name="' + b + '"]').val(c), a('input[data-name="' + b + '"]').hasClass("input-color") && (a('input[data-name="' + b + '"].input-color').attr("placeholder", c).addClass("use-gist"), a('input[data-name="' + b + '"] + .sp-placeholder .sp-placeholder-color').css("background-color", c))
              }), a('input[data-name="@body-bg"]').trigger("change")) : c.variables = b[0], p.hide(), m.removeAttr("disabled"), p.find("text").text("Loading"), o.css("opacity", "1"), n.addClass("loaded"), h(l = c), navigation()
            })
          }), s = !1) : h(l = c)
        }
      }, $products)), o.on("load", function () {
        n.trigger("update", [!1, o[0].contentWindow.CustomizerForceUpdate])
      })
    }

    function c() {
      m.prop("disabled", !0).text("Compiling Custom Build");
      var b = JSON.stringify(l.variables, null, 2);
      g(b, function (c, d) {
        b = JSON.stringify(l.variables, null, 2);
        var e = t.replace(/DATE/, new Date(a.now())).replace(/STYLENAME/, l.name).replace(/PURCHASE/, l.purchase);
        if ("" !== c && "" !== d) {
          var f = "*   Customizer link: " + d + "\n*   config.json: " + c + "\n*/\n";
          e = e.replace(/\*\//, f)
        }
        a.when(j(l, e), k(l, e)).done(function (a, c) {
          i(a, c, b, function (a) {
            m.removeAttr("disabled").text("Compile"), setTimeout(function () {
              saveAs(a, $products.urban.sname.toLowerCase() + ".zip")
            }, 0)
          })
        })
      })
    }

    function d(a) {
      noty({
        theme: "urban-noty",
        text: a,
        type: "information",
        timeout: !1,
        layout: "top",
        closeWith: ["click"]
      })
    }

    function e(b) {
      var c = f("id");
      return c ? void a.ajax({
        url: q + "/" + c,
        type: "GET",
        dataType: "json"
      }).done(function (a) {
        b(JSON.parse(a.files["config.json"].content))
      }).fail(function (a) {
        b(), d("Sorry we couldn't find your config file. Defaults have been loaded.")
      }) : void b()
    }

    function f(a) {
      a = a.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
      var b = location.search.match(new RegExp("[?&]" + a + "=([^&]+)(&|$)"));
      return b && decodeURIComponent(b[1].replace(/\+/g, " "))
    }

    function g(b, c) {
      var e = {
        description: $products.urban.sname + " Customizer Config",
        "public": !1,
        files: {
          "config.json": {
            content: b
          }
        }
      };
      a.ajax({
        url: q,
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(e)
      }).done(function (a) {
        var b = a.html_url,
          d = window.location.protocol + "//" + window.location.host,
          e = d + window.location.pathname + "?product=" + $products.urban.sname.toLowerCase() + "&id=" + a.id;
        history.replaceState(!1, document.title, e), c(b, e)
      }).fail(function (a) {
        try {
          d("Could not save gist file, configuration not saved.")
        } catch (b) {}
        c("<none>", "<none>")
      })
    }

    function h(b) {
      b.variables = b.variables || {}, a.less.getCSS(b.less, {
        id: b.name,
        variables: b.variables,
        compress: !0
      }).done(function (a) {
        b.fonts && (a = b.fonts + "\n" + a), o.contents().find("[data-compiled-css]").replaceWith("<style data-compiled-css>" + a + "</style>")
      }).fail(function (a) {
        d("Failed to load preview. Try refreshing your page")
      })
    }

    function i(b, c, d, e) {
      var f = new JSZip;
      if (b) {
        var g = f.folder("styles");
        a.each(b, function (a, b) {
          g.file(a, b)
        })
      }
      if (c) {
        var h = f.folder("styles/less");
        a.each(c, function (a, b) {
          h.file(a, b)
        })
      }
      d && f.file("config.json", d);
      var i = f.generate({
        type: "blob"
      });
      e(i)
    }

    function j(b, c) {
      var d = (JSON.stringify(b.variables, null, 2), {});
      return a.less.getCSS(b.less, {
        id: b.name,
        variables: b.variables
      }).done(function (a) {
        d[$products.urban.sname.toLowerCase() + ".css"] = c + a
      }), a.less.getCSS(b.less, {
        compress: !0,
        id: b.name,
        variables: b.variables
      }).done(function (a) {
        d[$products.urban.sname.toLowerCase() + ".min.css"] = c + a
      }), d
    }

    function k(b, c) {
      var d, e = [],
        f = {};
      a.each(b.config.groups, function (c, g) {
        d = !0, a.each(g.vars, function (c, h) {
          a.each(b.variables, function (a, c) {
            b.matchName(h, a) && (f[a] || (d && e.push("\n//\n// " + g.label + "\n//\n"), e.push(a + ": " + c + ";"), d = !1, f[a] = !0))
          })
        })
      });
      var g = {};
      return g[$products.urban.sname.toLowerCase() + ".variables.less"] = c + e.join("\n"), g
    }
    var l, m, n = a("#customizer"),
      o = a("#theme-preview"),
      p = a(".preloader"),
      q = "https://api.github.com/gists",
      r = window.URL || window.webkitURL,
      s = !0,
      t = "/*\n*   Version: 1.4.0\n*   Generated: DATE\n*   Template name: STYLENAME\n*   Author: iamnyasha\n*   Author URL: htp://nyasha.me\n*   Product URL: PURCHASE\n*/";
    o.css("opacity", "0"), p.show(), m = a(".btn-compile"), m.on("click", function (a) {
        a.preventDefault(), c()
      }),
      function () {
        function b() {
          d("Browser <b>NOT</b> supported. You won't be able to download your files. Try switching to a different browser."), m.prop("disabled", !0).addClass("disabled")
        }
        var c = new Blob(["<svg xmlns='http://www.w3.org/2000/svg'></svg>"], {
            type: "image/svg+xml;charset=utf-8"
          }),
          e = r.createObjectURL(c);
        null === /^blob:/.exec(e) ? b() : a("<img>").on("load", function () {
          m.prop("disabled", !1)
        }).on("error", b).attr("src", e)
      }(), b()
  });