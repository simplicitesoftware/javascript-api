/**
 * Simplicite(R) platform Javascript API client module (for node.js and browser).
 * @module simplicite
 * @version 2.2.0
 * @license Apache-2.0
 */
import fetch from "node-fetch";
import buffer from "buffer";
const constants = {
  DEFAULT_ROW_ID_NAME: "row_id",
  DEFAULT_ROW_ID: "0",
  CONTEXT_NONE: 0,
  CONTEXT_SEARCH: 1,
  CONTEXT_LIST: 2,
  CONTEXT_CREATE: 3,
  CONTEXT_COPY: 4,
  CONTEXT_UPDATE: 5,
  CONTEXT_DELETE: 6,
  CONTEXT_GRAPH: 7,
  CONTEXT_CROSSTAB: 8,
  CONTEXT_PRINTTMPL: 9,
  CONTEXT_UPDATEALL: 10,
  CONTEXT_REFSELECT: 11,
  CONTEXT_DATAMAPSELECT: 12,
  CONTEXT_PREVALIDATE: 13,
  CONTEXT_POSTVALIDATE: 14,
  CONTEXT_STATETRANSITION: 15,
  CONTEXT_EXPORT: 16,
  CONTEXT_IMPORT: 17,
  CONTEXT_ASSOCIATE: 18,
  CONTEXT_PANELLIST: 19,
  TYPE_ID: 0,
  TYPE_INT: 1,
  TYPE_FLOAT: 2,
  TYPE_STRING: 3,
  TYPE_DATE: 4,
  TYPE_DATETIME: 5,
  TYPE_TIME: 6,
  TYPE_ENUM: 7,
  TYPE_BOOLEAN: 8,
  TYPE_PASSWORD: 9,
  TYPE_URL: 10,
  TYPE_HTML: 11,
  TYPE_EMAIL: 12,
  TYPE_LONG_STRING: 13,
  TYPE_ENUM_MULTI: 14,
  TYPE_REGEXP: 15,
  TYPE_DOC: 17,
  TYPE_FLOAT_EMPTY: 18,
  TYPE_EXTFILE: 19,
  TYPE_IMAGE: 20,
  TYPE_NOTEPAD: 21,
  TYPE_PHONENUM: 22,
  TYPE_COLOR: 23,
  TYPE_OBJECT: 24,
  TYPE_GEOCOORDS: 25,
  VIS_NOT: 0,
  VIS_HIDDEN: 0,
  VIS_LIST: 1,
  VIS_FORM: 2,
  VIS_BOTH: 3,
  SEARCH_NONE: 0,
  SEARCH_MONO: 1,
  SEARCH_MULTI_CHECK: 2,
  SEARCH_MULTI_LIST: 3,
  SEARCH_PERIOD: 4,
  TRUE: "1",
  FALSE: "0",
  ERRLEVEL_FATAL: 1,
  ERRLEVEL_ERROR: 2,
  ERRLEVEL_WARNING: 3,
  RESOURCE_TYPE_IMAGE: "IMG",
  RESOURCE_TYPE_ICON: "ICO",
  RESOURCE_TYPE_STYLESHEET: "CSS",
  RESOURCE_TYPE_JAVASCRIPT: "JS"
};
function session(params) {
  return new Session(params);
}
function Session(params) {
  params = params || {};
  this.constants = constants;
  this.endpoint = params.endpoint || "api";
  this.log = params.logHandler || ((...args) => {
    console.log(args);
  });
  this.info = params.infoHandle || ((...args) => {
    console.info("INFO", args);
  });
  this.warn = params.warningHandler || ((...args) => {
    console.warn("WARN", args);
  });
  this.error = params.errorHandler || ((...args) => {
    console.error("ERROR", args);
  });
  const _debug = !!params.debug;
  this.debug = params.debugHandler || ((...args) => {
    if (_debug)
      console.log("DEBUG", args);
  });
  this.timeout = params.timeout || 30;
  if (params.url) {
    try {
      params.scheme = params.url.replace(/:.*$/, "");
      const u = params.url.replace(new RegExp("^" + params.scheme + "://"), "").split(":");
      if (u.length === 1) {
        params.host = u[0].replace(/\/.*$/, "");
        params.port = params.scheme === "http" ? 80 : 443;
        params.root = u[0].replace(new RegExp("^" + params.host + "/?"), "");
      } else {
        params.host = u[0];
        params.port = parseInt(u[1].replace(/\/.*$/, ""), 10);
        if (isNaN(params.port))
          throw new Error("Incorrect port");
        params.root = u[1].replace(new RegExp("^" + params.port + "/?"), "");
      }
      if (params.root === "/")
        params.root = "";
    } catch (e) {
      this.error("Unable to parse URL [" + params.url + "]: " + e.message);
      return;
    }
  }
  const scheme = params.scheme || (params.port === 443 ? "https" : "http");
  if (scheme !== "http" && scheme !== "https") {
    this.error("Incorrect scheme [" + params.scheme + "]");
    return;
  }
  const host = params.host || "localhost";
  const port = params.port || 8080;
  let root = params.root || "";
  if (root === "/")
    root = "";
  let url = scheme + "://" + host;
  if (scheme === "http" && port != 80 || scheme === "https" && port != 443)
    url += ":" + port;
  if (root !== "")
    url += root.startsWith("/") ? root : "/" + root;
  this.debug("[simplicite] Base URL = " + url);
  const ep = this.endpoint == "public" ? "" : "/" + this.endpoint;
  this.parameters = {
    scheme,
    host,
    port,
    root,
    url,
    healthpath: (ep == "/ui" ? ep : "") + "/health?format=json",
    apppath: ep + "/json/app",
    objpath: ep + "/json/obj",
    extpath: ep + "/ext",
    docpath: ep + "/raw/document",
    respath: "/resource"
  };
  this.username = params.username || params.login;
  this.setUsername = (usr) => {
    this.username = usr;
  };
  this.password = params.password || params.pwd;
  this.setPassword = (pwd) => {
    this.password = pwd;
  };
  this.authtoken = params.authtoken || params.authToken || params.token;
  this.setAuthToken = (tkn) => {
    this.authtoken = tkn;
  };
  let businessObjectCache = {};
  this.getBusinessObjectCacheKey = (name, instance) => {
    return name + ":" + (instance || "js_" + name);
  };
  this.clear = () => {
    this.username = void 0;
    this.password = void 0;
    this.authtoken = void 0;
    this.sessionid = void 0;
    this.grant = void 0;
    this.appinfo = void 0;
    this.sysinfo = void 0;
    this.devinfo = void 0;
    this.userinfo = void 0;
    businessObjectCache = {};
  };
  this.getBasicAuthHeader = () => {
    return this.username && this.password ? "Basic " + buffer.Buffer.from(this.username + ":" + this.password).toString("base64") : void 0;
  };
  this.getBearerTokenHeader = () => {
    return this.authtoken ? "Bearer " + this.authtoken : void 0;
  };
  this.req = (path, data, callback, errorHandler) => {
    const self = this;
    const m = data ? "POST" : "GET";
    const h = {};
    if (data)
      h["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
    let b = self.getBearerTokenHeader();
    if (b) {
      h["X-Simplicite-Authorization"] = b;
    } else {
      b = self.getBasicAuthHeader();
      if (b)
        h.Authorization = b;
    }
    const u = self.parameters.url + path || "/";
    const d = data ? typeof data === "string" ? data : JSON.stringify(data) : void 0;
    self.debug("[simplicite.req] " + m + " " + u + (d ? " with " + d : ""));
    fetch(u, {
      method: m,
      headers: h,
      timeout: self.timeout * 1e3,
      mode: "cors",
      credentials: "include",
      body: d
    }).then((res) => {
      if (callback) {
        res.text().then((textData) => {
          callback.call(self, textData, res.status, res.headers);
        });
      }
    }).catch((err) => {
      const s = err.response && err.response.status ? err.response.status : void 0;
      const e = err.response && err.response.data ? err.response.data : err;
      if (errorHandler)
        errorHandler.call(self, self.getError.call(self, e, s));
      else
        throw e;
    });
  };
  this.getError = (err, status) => {
    if (typeof err === "string")
      return { message: err, status: status || 200 };
    else if (err.response)
      return typeof err.response === "string" ? { message: err.response, status: status || 200 } : err.response;
    else
      return err;
  };
  this.parse = (res, status) => {
    try {
      if (status !== 200)
        return { type: "error", response: this.getError("HTTP status: " + status, status) };
      return typeof res === "object" ? res : JSON.parse(res);
    } catch (e) {
      return { type: "error", response: this.getError("Parsing error: " + e.message, status) };
    }
  };
  this.getHealth = (opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      self.req.call(self, self.parameters.healthpath + "&full=" + !!opts.full, void 0, (res, status) => {
        const r = self.parse(res, status);
        self.debug("[simplicite.getHealth] HTTP status = " + status + ", response type = " + res);
        if (r.type === "error")
          (opts.error || self.error || reject).call(self, r.response);
        else
          resolve && resolve.call(self, r);
      }, (err) => {
        (opts.error || self.error || reject).call(self, self.getError(err));
      });
    });
  };
  this.login = (opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      if ((opts.username || opts.login) && (opts.password || opts.pwd)) {
        self.clear();
        self.username = opts.username || opts.login;
        self.password = opts.password || opts.pwd;
      } else if (opts.authtoken || opts.authToken || opts.token) {
        self.clear();
        self.authtoken = opts.authtoken || opts.authToken || opts.token;
      }
      self.req.call(self, self.parameters.apppath + "?action=session", void 0, (res, status) => {
        const r = self.parse(res, status);
        self.debug("[simplicite.login] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.error || reject).call(self, r.response);
        } else {
          self.sessionid = r.response.id;
          self.debug("[simplicite.login] Session ID = " + self.sessionid);
          self.username = r.response.login;
          if (self.username)
            self.debug("[simplicite.login] Username = " + self.username);
          self.authtoken = r.response.authtoken;
          if (self.authtoken)
            self.debug("[simplicite.login] Auth token = " + self.authtoken);
          self.grant = Object.assign(new Grant(), {
            login: r.response.login,
            userid: r.response.userid,
            firstname: r.response.firstanme,
            lastname: r.response.lastname,
            email: r.response.email
          });
          resolve && resolve.call(self, r.response);
        }
      }, (err) => {
        (opts.error || self.error || reject).call(self, self.getError(err));
      });
    });
  };
  this.logout = (opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      self.req.call(self, self.parameters.apppath + "?action=logout", void 0, (res, status) => {
        const r = self.parse(res, status);
        self.debug("[simplicite.logout] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.error || reject).call(self, r.response);
        } else {
          self.clear();
          resolve && resolve.call(self, r.response);
        }
      }, (err) => {
        if (err.status === 401)
          self.authtoken = void 0;
        (opts.error || self.error || reject).call(self, self.getError(err));
      });
    });
  };
  this.grant = void 0;
  this.getGrant = (opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = "&web=true";
      if (opts.inlinePicture || opts.picture)
        p += "&inline_picture=" + (!!opts.inlinePicture || !!opts.picture);
      if (opts.includeTexts || opts.texts)
        p += "&texts=" + (!!opts.includeTexts || !!opts.texts);
      self.req.call(self, self.parameters.apppath + "?action=getgrant" + p, void 0, (res, status) => {
        const r = self.parse(res, status);
        self.debug("[simplicite.getGrant] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.error || reject).call(self, r.response);
        } else {
          self.grant = Object.assign(new Grant(), r.response);
          resolve && resolve.call(self, self.grant);
        }
      }, (err) => {
        (opts.error || self.error || reject).call(self, self.getError(err));
      });
    });
  };
  this.changePassword = (pwd, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      self.req.call(self, self.parameters.apppath + "?action=setpassword&password=" + encodeURIComponent(pwd), void 0, (res, status) => {
        const r = self.parse(res, status);
        self.debug("[simplicite.changePassword] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error")
          (opts.error || self.error || reject).call(self, r.response);
        else
          resolve && resolve.call(self, r.response);
      }, (err) => {
        (opts.error || self.error || reject).call(self, self.getError(err));
      });
    });
  };
  this.getAppInfo = (opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      self.req.call(self, self.parameters.apppath + "?action=getinfo", void 0, (res, status) => {
        const r = self.parse(res, status);
        self.debug("[simplicite.getAppInfo] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.error || reject).call(self, r.response);
        } else {
          self.appinfo = r.response;
          resolve && resolve.call(self, self.appinfo);
        }
      }, (err) => {
        (opts.error || self.error || reject).call(self, self.getError(err));
      });
    });
  };
  this.getSysInfo = (opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      self.req.call(self, self.parameters.apppath + "?action=sysinfo", void 0, (res, status) => {
        const r = self.parse(res, status);
        self.debug("[simplicite.getSysInfo] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.error || reject).call(self, r.response);
        } else {
          self.sysinfo = r.response;
          resolve && resolve.call(self, self.sysinfo);
        }
      }, (err) => {
        (opts.error || self.error || reject).call(self, self.getError(err));
      });
    });
  };
  this.getDevInfo = (module, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = "";
      if (module)
        p += "&module=" + encodeURIComponent(module);
      self.req.call(self, self.parameters.apppath + "?action=devinfo" + p, void 0, (res, status) => {
        const r = self.parse(res, status);
        self.debug("[simplicite.getDevInfo] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.error || reject).call(self, r.response);
        } else {
          if (!module)
            self.devinfo = r.response;
          resolve && resolve.call(self, r.response);
        }
      }, (err) => {
        (opts.error || self.error || reject).call(self, self.getError(err));
      });
    });
  };
  this.getNews = (opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = "";
      if (opts.inlineImages)
        p += "&inline_images=" + !!opts.inlineImages;
      self.req.call(self, self.parameters.apppath + "?action=news" + p, void 0, (res, status) => {
        const r = self.parse(res, status);
        self.debug("[simplicite.getNews] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.error || reject).call(self, r.response);
        } else {
          self.news = r.response;
          resolve && resolve.call(self, self.news);
        }
      }, (err) => {
        (opts.error || self.error || reject).call(self, self.getError(err));
      });
    });
  };
  this.indexSearch = (request, object, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = "";
      if (opts.metadata === true)
        p += "&_md=true";
      if (opts.context)
        p += "&context=" + encodeURIComponent(opts.context);
      self.req.call(self, self.parameters.apppath + "?action=indexsearch&request=" + encodeURIComponent(request ? request : "") + (object ? "&object=" + encodeURIComponent(object) : "") + p, void 0, (res, status) => {
        const r = self.parse(res, status);
        self.debug("[simplicite.indexSearch] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error")
          (opts.error || self.error || reject).call(self, r.response);
        else
          resolve && resolve.call(self, r.response);
      }, (err) => {
        (opts.error || self.error || reject).call(self, self.getError(err));
      });
    });
  };
  this.getBusinessObject = (name, instance) => {
    const cacheKey = this.getBusinessObjectCacheKey(name, instance);
    let obj = businessObjectCache[cacheKey];
    if (!obj) {
      obj = new BusinessObject(this, name, instance);
      businessObjectCache[cacheKey] = obj;
    }
    return obj;
  };
  this.getExternalObject = (name) => {
    return new ExternalObject(this, name);
  };
  this.getResourceURL = (code, type, object, objId) => {
    return this.parameters.url + this.parameters.respath + "?code=" + encodeURIComponent(code) + "&type=" + encodeURIComponent(type || "IMG") + (object ? "&object=" + encodeURIComponent(object) : "") + (objId ? "&objid=" + encodeURIComponent(objId) : "") + (this.authtoken ? "_x_simplicite_authorization_=" + encodeURIComponent(this.authtoken) : "");
  };
}
function Grant() {
  this.getUserId = () => {
    return this.userid;
  };
  this.getUsername = () => {
    return this.login;
  };
  this.getLogin = this.getUsername;
  this.getLang = () => {
    return this.lang;
  };
  this.getEmail = () => {
    return this.email;
  };
  this.getFirstname = () => {
    return this.firstname;
  };
  this.getFirstName = this.getFirstname;
  this.getLastname = () => {
    return this.lastname;
  };
  this.getLastName = this.getLastname;
  this.getPictureURL = () => {
    if (this.picture)
      return "data:" + this.picture.mime + ";base64," + this.picture.content;
  };
  this.hasResponsibility = (group) => {
    return this.responsibilities && this.responsibilities.indexOf(group) !== -1;
  };
  this.T = (code) => {
    return this.texts ? this.texts[code] || "" : "";
  };
}
function Document() {
  this.getId = () => {
    return this.id;
  };
  this.getMIMEType = () => {
    return this.mime;
  };
  this.getMimeType = this.getMIMEType;
  this.setMIMEType = (mime) => {
    this.mime = mime;
  };
  this.setMimeType = this.setMIMEType;
  this.getFilename = () => {
    return this.filename;
  };
  this.getFileName = this.getFilename;
  this.setFilename = (filename) => {
    this.filename = filename;
  };
  this.setFileName = this.setFilename;
  this.getContent = () => {
    return this.content;
  };
  this.getThumbnail = () => {
    return this.thumbnail;
  };
  function getBuffer(data) {
    return buffer.Buffer.from(data, "base64");
  }
  this.getContentAsArrayBuffer = () => {
    return getBuffer(this.content).buffer;
  };
  this.getThumbnailAsArrayBuffer = () => {
    return getBuffer(this.thumbnail || "").buffer;
  };
  this.getContentAsText = (encoding) => {
    return getBuffer(this.content).toString(encoding || "utf-8");
  };
  this.setContent = (content) => {
    this.content = content;
  };
  this.setContentFromText = (content, encoding) => {
    this.content = buffer.Buffer.from(content, encoding || "utf-8").toString("base64");
  };
  this.getDataURL = (thumbnail) => {
    if (this.content)
      return "data:" + this.mime + ";base64," + (thumbnail && this.thumbnail ? this.thumbnail : this.content);
  };
  this.getValue = () => {
    return JSON.parse(JSON.stringify(this));
  };
}
function BusinessObjectMetadata(name, instance) {
  this.name = name;
  this.instance = instance;
  this.rowidfield = constants.DEFAULT_ROW_ID_NAME;
  this.label = name;
  this.help = "";
  this.fields = [];
}
function BusinessObject(ses, name, instance) {
  instance = instance || "js_" + name;
  this.session = ses;
  this.metadata = new BusinessObjectMetadata(name, instance);
  this.cacheKey = this.session.getBusinessObjectCacheKey(name, instance);
  this.path = this.session.parameters.objpath + "?object=" + encodeURIComponent(name) + "&inst=" + encodeURIComponent(instance);
  this.item = {};
  this.filters = {};
  this.list = [];
  this.getMetaData = (opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = "";
      if (opts.context)
        p += "&context=" + encodeURIComponent(opts.context);
      if (opts.contextParam)
        p += "&contextparam=" + encodeURIComponent(opts.contextParam);
      self.session.req.call(self.session, self.path + "&action=metadata" + p, void 0, (res, status) => {
        const r = self.session.parse(res, status);
        self.session.debug("[simplicite.BusinessObject.getMetaData] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.session.error || reject).call(self, r.response);
        } else {
          self.metadata = r.response;
          resolve && resolve.call(self, self.metadata);
        }
      }, (err) => {
        (opts.error || self.session.error || reject).call(self, self.session.getError(err));
      });
    });
  };
  this.getMetadata = this.getMetaData;
  this.getName = () => {
    return this.metadata.name;
  };
  this.getInstance = () => {
    return this.metadata.instance;
  };
  this.getLabel = () => {
    return this.metadata.label;
  };
  this.getHelp = () => {
    return this.metadata.help;
  };
  this.getFields = () => {
    return this.metadata.fields;
  };
  this.getField = (fieldName) => {
    let n = 0;
    const fs = this.getFields();
    while (n < fs.length && fs[n].name !== fieldName)
      n++;
    if (n < fs.length)
      return fs[n];
  };
  this.getRowIdFieldName = () => {
    return this.metadata.rowidfield;
  };
  this.getRowIdField = () => {
    return this.getField(this.getRowIdFieldName());
  };
  this.getLinks = () => {
    return this.metadata.links;
  };
  this.getFieldType = (field) => {
    if (typeof field === "string")
      field = this.getField(field);
    if (field)
      return field.type;
  };
  this.getFieldLabel = (field) => {
    if (typeof field === "string")
      field = this.getField(field);
    if (field)
      return field.label;
  };
  this.getFieldValue = (field, item) => {
    if (!item)
      item = this.item;
    if (field && item) {
      return item[typeof field === "string" ? field : field.name];
    }
  };
  this.getFieldListValue = (field, item) => {
    if (typeof field === "string")
      field = this.getField(field);
    const val = this.getFieldValue(field, item);
    return field && field.listOfValues ? this.getListValue(field.listOfValues, val) : val;
  };
  this.getFieldDataURL = (field, item) => {
    if (typeof field !== "string")
      field = field.fullinput || field.name;
    const val = this.getFieldValue(field, item);
    if (val && val.mime)
      return "data:" + val.mime + ";base64," + (val.content || val.thumbnail);
  };
  this.getFieldDocument = (field, item) => {
    if (typeof field !== "string")
      field = field.fullinput || field.input || field.name;
    const val = this.getFieldValue(field, item);
    if (val && val.mime)
      return Object.assign(new Document(), val);
    else
      return val;
  };
  this.getFieldDocumentURL = (field, item, thumbnail) => {
    if (typeof field !== "string")
      field = field.fullinput || field.input || field.name;
    let val = this.getFieldValue(field, item);
    if (val && val.mime)
      val = val.id;
    if (val)
      return this.session.parameters.url + this.session.parameters.docpath + "?object=" + encodeURIComponent(this.metadata.name) + "&inst=" + encodeURIComponent(this.metadata.instance) + "&field=" + encodeURIComponent(field) + "&row_id=" + encodeURIComponent(this.getRowId(item)) + "&doc_id=" + encodeURIComponent(val) + (thumbnail ? "&thumbnail=true" : "") + (this.session.authtoken ? "&_x_simplicite_authorization_=" + encodeURIComponent(this.session.authtoken) : "");
  };
  this.getListValue = (list, code) => {
    if (list) {
      for (let i = 0; i < list.length; i++) {
        const l = list[i];
        if (l.code === code)
          return l.value;
      }
    }
    return code;
  };
  this.setFieldValue = (field, value, item) => {
    if (!item)
      item = this.item;
    if (field && item) {
      item[typeof field === "string" ? field : field.name] = value instanceof Document ? value.getValue() : value;
    }
  };
  this.isRowIdField = (field) => {
    return !field.ref && field.name === this.metadata.rowidfield;
  };
  this.isTimestampField = (field) => {
    const n = field.name;
    return !field.ref && (n === "created_by" || n === "created_dt" || n === "updated_by" || n === "updated_dt");
  };
  this.getFilters = (opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = "";
      if (opts.context)
        p += "&context=" + encodeURIComponent(opts.context);
      if (opts.reset)
        p += "&reset=" + !!opts.reset;
      self.session.req.call(self.session, self.path + "&action=filters" + p, void 0, (res, status) => {
        const r = self.session.parse(res, status);
        self.session.debug("[simplicite.BusinessObject.getFilters] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.session.error || reject).call(self, r.response);
        } else {
          self.filters = r.response;
          resolve && resolve.call(self, self.filters);
        }
      }, (err) => {
        (opts.error || self.session.error || reject).call(self, self.session.getError(err));
      });
    });
  };
  function getReqOptions(options) {
    let opts = "";
    if (options.context)
      opts += "&context=" + encodeURIComponent(options.context);
    const id = options.inlineDocs || options.inlineDocuments || options.inlineImages;
    if (id)
      opts += "&inline_documents=" + encodeURIComponent(id.join ? id.join(",") : id);
    const it = options.inlineThumbs || options.inlineThumbnails;
    if (it)
      opts += "&inline_thumbnails=" + encodeURIComponent(it.join ? it.join(",") : it);
    const io = options.inlineObjs || options.inlineObjects;
    if (io)
      opts += "&inline_objects=" + encodeURIComponent(io.join ? io.join(",") : io);
    return opts;
  }
  function getReqParams(data) {
    let p = "";
    if (!data)
      return p;
    let n = 0;
    for (let i in data) {
      const d = data[i] || "";
      if (d.name && d.content) {
        if (d.content.startsWith("data:"))
          d.content = d.content.replace(/data:.*;base64,/, "");
        p += (n++ !== 0 ? "&" : "") + i + "=" + encodeURIComponent("id|" + (d.id ? d.id : "0") + "|name|" + d.name + "|content|" + d.content);
      } else if (d.object && d.row_id) {
        p += (n++ !== 0 ? "&" : "") + i + "=" + encodeURIComponent("object|" + d.object + "|row_id|" + d.row_id);
      } else if (d.sort) {
        for (let j = 0; j < d.length; j++)
          p += (n++ !== 0 ? "&" : "") + i + "=" + encodeURIComponent(d[j]);
      } else {
        p += (n++ !== 0 ? "&" : "") + i + "=" + encodeURIComponent(d);
      }
    }
    return p;
  }
  this.count = (filters, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      self.filters = filters || {};
      self.session.req.call(self.session, self.path + "&action=count", getReqParams(self.filters), (res, status) => {
        const r = self.session.parse(res, status);
        self.session.debug("[simplicite.BusinessObject.getCount] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.session.error || reject).call(self, r.response);
        } else {
          self.count = r.response.count;
          self.page = r.response.page >= 0 ? r.response.page + 1 : void 0;
          self.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : void 0;
          self.list = [];
          resolve && resolve.call(self, self.count);
        }
      }, (err) => {
        (opts.error || self.session.error || reject).call(self, self.session.getError(err));
      });
    });
  };
  this.getCount = this.count;
  this.search = (filters, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = getReqOptions(opts);
      if (opts.page > 0)
        p += "&page=" + (opts.page - 1);
      if (opts.metadata === true)
        p += "&_md=true";
      if (opts.visible === true)
        p += "&_visible=true";
      self.filters = filters || {};
      self.session.req.call(self.session, self.path + "&action=search" + p, getReqParams(self.filters), (res, status) => {
        const r = self.session.parse(res, status);
        self.session.debug("[simplicite.BusinessObject.search] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.session.error || reject).call(self, r.response);
        } else {
          if (res.meta)
            self.metadata = r.response.meta;
          self.count = r.response.count;
          self.page = r.response.page >= 0 ? r.response.page + 1 : void 0;
          self.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : void 0;
          self.list = r.response.list;
          resolve && resolve.call(self, self.list);
        }
      }, (err) => {
        (opts.error || self.session.error || reject).call(self, self.session.getError(err));
      });
    });
  };
  this.get = (rowId, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = getReqOptions(opts);
      const tv = opts.treeView;
      if (tv)
        p += "&treeview=" + encodeURIComponent(tv);
      if (opts.fields) {
        for (let i = 0; i < opts.fields.length; i++) {
          p += "&fields=" + encodeURIComponent(opts.fields[i].replace(".", "__"));
        }
      }
      if (opts.metadata)
        p += "&_md=true";
      if (opts.social)
        p += "&_social=true";
      self.session.req.call(self.session, self.path + "&action=get&" + self.metadata.rowidfield + "=" + encodeURIComponent(rowId) + p, void 0, (res, status) => {
        const r = self.session.parse(res, status);
        self.session.debug("[simplicite.BusinessObject.get] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.session.error || reject).call(self, r.response);
        } else {
          if (r.response.meta)
            self.metadata = r.response.meta;
          if (r.response.data)
            self.item = tv ? r.response.data.item : r.response.data;
          else
            self.item = tv ? r.response.item : r.response;
          resolve && resolve.call(self, tv ? r.response : self.item);
        }
      }, (err) => {
        (opts.error || self.session.error || reject).call(self, self.session.getError(err));
      });
    });
  };
  this.getForCreate = (opts) => {
    opts = opts || {};
    delete opts.treeview;
    delete opts.fields;
    opts.context = constants.CONTEXT_CREATE;
    return this.get(this.session.constants.DEFAULT_ROW_ID, opts);
  };
  this.getForUpdate = (rowId, opts) => {
    opts = opts || {};
    delete opts.treeview;
    delete opts.fields;
    opts.context = constants.CONTEXT_UPDATE;
    return this.get(rowId, opts);
  };
  this.getForCopy = (rowId, opts) => {
    opts = opts || {};
    delete opts.treeview;
    delete opts.fields;
    opts.context = constants.CONTEXT_COPY;
    return this.get(rowId, opts);
  };
  this.getForDelete = (rowId, opts) => {
    opts = opts || {};
    delete opts.treeview;
    delete opts.fields;
    opts.context = constants.CONTEXT_DELETE;
    return this.get(rowId, opts);
  };
  this.getRowId = (item) => {
    item = item || this.item;
    if (item)
      return item[this.getRowIdFieldName()];
  };
  this.populate = (rowId, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = getReqOptions(opts);
      self.session.req.call(self.session, self.path + "&action=populate&" + self.metadata.rowidfield + "=" + encodeURIComponent(rowId) + p, void 0, (res, status) => {
        const r = self.session.parse(res, status);
        self.session.debug("[simplicite.BusinessObject.populate] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.session.error || reject).call(self, r.response);
        } else {
          self.item = r.response.data ? r.response.data : r.response;
          resolve && resolve.call(self, self.item);
        }
      }, (err) => {
        (opts.error || self.session.error || reject).call(self, self.session.getError(err));
      });
    });
  };
  this.save = (item, opts) => {
    if (item)
      this.item = item;
    const rowId = this.item[this.metadata.rowidfield];
    if (!rowId || rowId === constants.DEFAULT_ROW_ID)
      return this.create(item, opts);
    else
      return this.update(item, opts);
  };
  this.create = (item, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      if (item)
        self.item = item;
      self.item.row_id = self.session.constants.DEFAULT_ROW_ID;
      let p = getReqOptions(opts);
      self.session.req.call(self.session, self.path + "&action=create" + p, getReqParams(self.item), (res, status) => {
        const r = self.session.parse(res, status);
        self.session.debug("[simplicite.BusinessObject.create] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.session.error || reject).call(self, r.response);
        } else {
          self.item = r.response.data ? r.response.data : r.response;
          resolve && resolve.call(self, self.item);
        }
      }, (err) => {
        (opts.error || self.session.error || reject).call(self, self.session.getError(err));
      });
    });
  };
  this.update = (item, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      if (item)
        self.item = item;
      let p = getReqOptions(opts);
      self.session.req.call(self.session, self.path + "&action=update" + p, getReqParams(self.item), (res, status) => {
        const r = self.session.parse(res, status);
        self.session.debug("[simplicite.BusinessObject.update] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.session.error || reject).call(self, r.response);
        } else {
          self.item = r.response.data ? r.response.data : r.response;
          resolve && resolve.call(self, self.item);
        }
      }, (err) => {
        (opts.error || self.session.error || reject).call(self, self.session.getError(err));
      });
    });
  };
  this.del = (item, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      if (item)
        self.item = item;
      self.session.req.call(self.session, self.path + "&action=delete&" + self.metadata.rowidfield + "=" + encodeURIComponent(self.item[self.metadata.rowidfield]), void 0, (res, status) => {
        const r = self.session.parse(res, status);
        self.session.debug("[simplicite.BusinessObject.del] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.session.error || reject).call(self, r.response);
        } else {
          self.item = void 0;
          delete r.response.undoredo;
          resolve && resolve.call(self, r.response);
        }
      }, (err) => {
        (opts.error || self.session.error || reject).call(self, self.session.getError(err));
      });
    });
  };
  this.action = (action, rowId, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      self.session.req.call(self.session, self.path + "&action=" + encodeURIComponent(action) + (rowId ? "&" + self.getRowIdFieldName() + "=" + encodeURIComponent(rowId) : ""), getReqParams(opts.parameters), (res, status) => {
        const r = self.session.parse(res, status);
        self.session.debug("[simplicite.BusinessObject.action(" + action + ")] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.session.error || reject).call(self, r.response);
        } else {
          const result = r.response.result;
          resolve && resolve.call(self, result);
        }
      }, (err) => {
        (opts.error || self.session.error || reject).call(self, self.session.getError(err));
      });
    });
  };
  this.crosstab = (crosstab, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      if (opts.filters)
        self.filters = opts.filters;
      self.session.req.call(self.session, self.path + "&action=crosstab&crosstab=" + encodeURIComponent(crosstab), getReqParams(self.filters), (res, status) => {
        const r = self.session.parse(res, status);
        self.session.debug("[simplicite.BusinessObject.crosstab(" + crosstab + ")] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.session.error || reject).call(self, r.response);
        } else {
          self.crosstabdata = r.response;
          resolve && resolve.call(self, self.crosstabdata);
        }
      }, (err) => {
        (opts.error || self.session.error || reject).call(self, self.session.getError(err));
      });
    });
  };
  this.print = (prt, rowId, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      if (opts.filters)
        self.filters = opts.filters;
      let p = "";
      if (opts.all)
        p += "&all=" + !!opts.all;
      if (opts.mailing)
        p += "&mailing=" + !!opts.mailing;
      self.session.req.call(self.session, self.path + "&action=print&printtemplate=" + encodeURIComponent(prt) + (rowId ? "&" + self.getRowIdFieldName() + "=" + encodeURIComponent(rowId) : "") + p, void 0, (res, status) => {
        const r = self.session.parse(res, status);
        self.session.debug("[simplicite.BusinessObject.print(" + prt + ")] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.session.error || reject).call(self, r.response);
        } else {
          resolve && resolve.call(self, Object.assign(new Document(), r.response));
        }
      }, (err) => {
        (opts.error || self.session.error || reject).call(self, self.session.getError(err));
      });
    });
  };
  this.setParameter = (param, value, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = { name: param };
      if (value)
        p.value = value;
      self.session.req.call(self.session, self.path + "&action=setparameter", getReqParams(p), (res, status) => {
        const r = self.session.parse(res, status);
        self.session.debug("[simplicite.BusinessObject.setParameter(" + p.name + ")] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.session.error || reject).call(self, r.response);
        } else {
          const result = r.response.result;
          resolve && resolve.call(self, result);
        }
      }, (err) => {
        (opts.error || self.session.error || reject).call(self, self.session.getError(err));
      });
    });
  };
  this.getParameter = (param, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = { name: param };
      self.session.req.call(self.session, self.path + "&action=getparameter", getReqParams(p), (res, status) => {
        const r = self.session.parse(res, status);
        self.session.debug("[simplicite.BusinessObject.getParameter(" + p.name + ")] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || self.session.error || reject).call(self, r.response);
        } else {
          const result = r.response.result;
          resolve && resolve.call(self, result);
        }
      }, (err) => {
        (opts.error || self.session.error || reject).call(self, self.session.getError(err));
      });
    });
  };
  this.getResourceURL = (code, type) => {
    return this.session.getResourceURL(code, type, this.metadata.name, this.metadata.id);
  };
}
function ExternalObjectMetadata(name) {
  this.name = name;
}
function ExternalObject(ses, name) {
  this.session = ses;
  this.metadata = new ExternalObjectMetadata(name);
  this.path = this.session.parameters.extpath + "/" + encodeURIComponent(name);
  this.getName = () => {
    return this.metadata.name;
  };
  this.callParams = (params) => {
    let p = "";
    if (!params)
      return p;
    let n = 0;
    for (let i in params) {
      const v = params[i] || "";
      if (v.sort) {
        for (let j = 0; j < v.length; j++)
          p += (n++ !== 0 ? "&" : "") + i + "=" + encodeURIComponent(v[j]);
      } else {
        p += (n++ !== 0 ? "&" : "") + i + "=" + encodeURIComponent(v);
      }
    }
    return p;
  };
  this.call = (params, data, opts) => {
    const self = this;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = "";
      if (params)
        p = "?" + self.callParams(params);
      const m = opts.method ? opts.method.toUpperCase() : data ? "POST" : "GET";
      const h = {};
      if (opts.contentType) {
        h["Content-Type"] = opts.contentType;
      } else if (data) {
        h["Content-Type"] = typeof data === "string" ? "application/x-www-form-urlencoded" : "application/json";
      }
      let b = self.session.getBearerTokenHeader();
      if (b) {
        h["X-Simplicite-Authorization"] = b;
      } else {
        b = self.session.getBasicAuthHeader();
        if (b)
          h.Authorization = b;
      }
      const u = self.session.parameters.url + self.path + p;
      const d = data ? typeof data === "string" ? data : JSON.stringify(data) : void 0;
      self.session.debug("[simplicite.ExternalObject.call] " + m + " " + u + " with " + (d ? " with " + d : ""));
      fetch(u, {
        method: m,
        headers: h,
        timeout: self.session.timeout * 1e3,
        mode: "cors",
        credentials: "include",
        body: d
      }).then((res) => {
        const type = res.headers.get("content-type");
        self.session.debug("[simplicite.ExternalObject.call(" + p + ")] HTTP status = " + res.status + ", response content type = " + type);
        if (type && type.startsWith("application/json")) {
          res.json().then((jsonData) => {
            resolve && resolve.call(self, jsonData, res.status, res.headers);
          }).catch((err) => {
            (opts.error || self.error || reject).call(self, self.getError(err));
          });
        } else if (type && type.startsWith("text/")) {
          res.text().then((textData) => {
            resolve && resolve.call(self, textData, res.status, res.headers);
          }).catch((err) => {
            (opts.error || self.error || reject).call(self, self.getError(err));
          });
        } else {
          res.arrayBuffer().then((binData) => {
            resolve && resolve.call(self, binData, res.status, res.headers);
          }).catch((err) => {
            (opts.error || self.error || reject).call(self, self.getError(err));
          });
        }
      }).catch((err) => {
        (opts.error || self.error || reject).call(self, self.getError(err));
      });
    });
  };
}
export default {
  session,
  Session,
  Grant,
  BusinessObject,
  BusinessObjectMetadata,
  ExternalObject
};
