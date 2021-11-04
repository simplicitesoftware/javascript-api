/**
 * Simplicite(R) platform Javascript API client module (for node.js and browser).
 * @module simplicite
 * @version 2.2.4
 * @license Apache-2.0
 */
import fetch from "node-fetch";
import { Buffer } from "buffer";
const constants = {
  MODULE_VERSION: "2.2.4",
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
const session = (params) => {
  return new Session(params);
};
class Session {
  constructor(params) {
    if (!params)
      throw "No session parammeters";
    this.endpoint = params.endpoint || "api";
    this.log = params.logHandler || ((...args) => {
      console.log(args);
    });
    this.info = params.infoHandler || ((...args) => {
      console.info("INFO", args);
    });
    this.warn = params.warningHandler || ((...args) => {
      console.warn("WARN", args);
    });
    this.error = params.errorHandler || ((...args) => {
      console.error("ERROR", args);
    });
    this.debugMode = !!params.debug;
    this.debug = params.debugHandler || ((...args) => {
      if (this.debugMode)
        console.log("DEBUG", args);
    });
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
      timeout: params.timeout || 30,
      healthpath: (ep == "/ui" ? ep : "") + "/health?format=json",
      apppath: ep + "/json/app",
      objpath: ep + "/json/obj",
      extpath: ep + "/ext",
      docpath: ep + "/raw/document",
      respath: "/resource"
    };
    this.username = params.username || params.login;
    this.password = params.password || params.pwd;
    this.authtoken = params.authtoken || params.token;
    this.businessObjectCache = new Map();
  }
  constants = constants;
  endpoint;
  log;
  info;
  warn;
  error;
  debugMode;
  debug;
  parameters;
  username;
  setUsername = (usr) => {
    this.username = usr;
  };
  password;
  setPassword = (pwd) => {
    this.password = pwd;
  };
  authtoken;
  sessionid;
  setAuthToken = (token) => {
    this.authtoken = token;
  };
  businessObjectCache;
  getBusinessObjectCacheKey = (name, instance) => {
    return name + ":" + (instance || "js_" + name);
  };
  clear = () => {
    this.username = void 0;
    this.password = void 0;
    this.authtoken = void 0;
    this.sessionid = void 0;
    this.grant = void 0;
    this.appinfo = void 0;
    this.sysinfo = void 0;
    this.devinfo = void 0;
    this.businessObjectCache = new Map();
  };
  getBasicAuthHeader = () => {
    return this.username && this.password ? "Basic " + Buffer.from(this.username + ":" + this.password).toString("base64") : void 0;
  };
  getBearerTokenHeader = () => {
    return this.authtoken ? "Bearer " + this.authtoken : void 0;
  };
  getError = (err, status, origin) => {
    if (typeof err === "string") {
      return { message: err, status: status || 200, origin };
    } else if (err.response) {
      if (typeof err.response === "string") {
        return { message: err.response, status: status || 200, origin };
      } else {
        if (origin)
          try {
            err.response.origin = origin;
          } catch (e) {
          }
        return err.response;
      }
    } else {
      if (origin)
        try {
          err.origin = origin;
        } catch (e) {
        }
      return err;
    }
  };
  req = (path, data, callback, errorHandler) => {
    const origin = "Session.req";
    const m = data ? "POST" : "GET";
    const h = {};
    if (data)
      h["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
    let b = this.getBearerTokenHeader();
    if (b) {
      h["X-Simplicite-Authorization"] = b;
    } else {
      b = this.getBasicAuthHeader();
      if (b)
        h["Authorization"] = b;
    }
    const u = this.parameters.url + path || "/";
    const d = data ? typeof data === "string" ? data : JSON.stringify(data) : void 0;
    this.debug(`[${origin}] ${m} ${u}${d ? " with " + d : ""}`);
    fetch(u, {
      method: m,
      headers: h,
      timeout: this.parameters.timeout * 1e3,
      mode: "cors",
      credentials: "include",
      body: d
    }).then((res) => {
      if (callback) {
        res.text().then((textData) => {
          callback.call(this, textData, res.status, res.headers);
        });
      }
    }).catch((err) => {
      const s = err.response && err.response.status ? err.response.status : void 0;
      const e = err.response && err.response.data ? err.response.data : err;
      if (errorHandler)
        errorHandler.call(this, this.getError(e, s, origin));
      else
        throw e;
    });
  };
  parse = (res, status) => {
    try {
      if (status !== 200)
        return { type: "error", response: this.getError("HTTP status: " + status, status) };
      return typeof res === "object" ? res : JSON.parse(res);
    } catch (e) {
      return { type: "error", response: this.getError("Parsing error: " + e.message, status) };
    }
  };
  getHealth = (opts) => {
    const origin = "Session.getHealth";
    opts = opts || {};
    return new Promise((resolve, reject) => {
      this.req(`${this.parameters.healthpath}&full=${!!opts.full}`, void 0, (res, status) => {
        const r = this.parse(res, status);
        this.debug(`[${origin}] HTTP status = ${status}, response type = ${res}`);
        if (r.type === "error") {
          (opts.error || this.error || reject).call(this, this.getError(r.response, void 0, origin));
        } else {
          resolve && resolve.call(this, r);
        }
      }, (err) => {
        (opts.error || this.error || reject).call(this, this.getError(err, void 0, origin));
      });
    });
  };
  login = (opts) => {
    const origin = "Session.login";
    opts = opts || {};
    return new Promise((resolve, reject) => {
      if ((opts.username || opts.login) && (opts.password || opts.pwd)) {
        this.clear();
        this.username = opts.username || opts.login;
        this.password = opts.password || opts.pwd;
      } else if (opts.authtoken || opts.authToken || opts.token) {
        this.clear();
        this.authtoken = opts.authtoken || opts.authToken || opts.token;
      }
      this.req(`${this.parameters.apppath}?action=session`, void 0, (res, status) => {
        const r = this.parse(res, status);
        this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || this.error || reject).call(this, this.getError(r.response, void 0, origin));
        } else {
          this.sessionid = r.response.id;
          this.debug(`[${origin}] Session ID = ${this.sessionid}`);
          this.username = r.response.login;
          if (this.username)
            this.debug(`[${origin}] Username = ${this.username}`);
          this.authtoken = r.response.authtoken;
          if (this.authtoken)
            this.debug(`[${origin}] Auth token = ${this.authtoken}`);
          this.grant = new Grant({
            login: r.response.login,
            userid: r.response.userid,
            firstname: r.response.firstanme,
            lastname: r.response.lastname,
            email: r.response.email
          });
          resolve && resolve.call(this, r.response);
        }
      }, (err) => {
        (opts.error || this.error || reject).call(this, this.getError(err, void 0, origin));
      });
    });
  };
  logout = (opts) => {
    const origin = "Session.logout";
    opts = opts || {};
    return new Promise((resolve, reject) => {
      this.req(`${this.parameters.apppath}?action=logout`, void 0, (res, status) => {
        const r = this.parse(res, status);
        this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || this.error || reject).call(this, this.getError(r.response, void 0, origin));
        } else {
          this.clear();
          resolve && resolve.call(this, r.response);
        }
      }, (err) => {
        if (err.status === 401)
          this.authtoken = void 0;
        (opts.error || this.error || reject).call(this, this.getError(err, void 0, origin));
      });
    });
  };
  grant;
  getGrant = (opts) => {
    const origin = "Session.getGrant";
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = "&web=true";
      const pic = !!opts.inlinePicture || !!opts.picture;
      if (pic)
        p += "&inline_picture=true";
      const txt = !!opts.includeTexts || !!opts.texts;
      if (txt)
        p += "&texts=true";
      this.req(`${this.parameters.apppath}?action=getgrant${p}`, void 0, (res, status) => {
        const r = this.parse(res, status);
        this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || this.error || reject).call(this, this.getError(r.response, void 0, origin));
        } else {
          this.grant = new Grant(r.response);
          if (pic)
            this.grant.picture = new Doc(this.grant.picture);
          if (txt)
            this.grant.texts = Object.assign(new Map(), this.grant.texts);
          resolve && resolve.call(this, this.grant);
        }
      }, (err) => {
        (opts.error || this.error || reject).call(this, this.getError(err, void 0, origin));
      });
    });
  };
  changePassword = (pwd, opts) => {
    const origin = "Session.changePassword";
    opts = opts || {};
    return new Promise((resolve, reject) => {
      this.req(`${this.parameters.apppath}?action=setpassword&password=${encodeURIComponent(pwd)}`, void 0, (res, status) => {
        const r = this.parse(res, status);
        this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error")
          (opts.error || this.error || reject).call(this, this.getError(r.response, void 0, origin));
        else
          resolve && resolve.call(this, r.response);
      }, (err) => {
        (opts.error || this.error || reject).call(this, this.getError(err, void 0, origin));
      });
    });
  };
  appinfo;
  getAppInfo = (opts) => {
    const origin = "Session.getAppInfo";
    opts = opts || {};
    return new Promise((resolve, reject) => {
      this.req(`${this.parameters.apppath}?action=getinfo`, void 0, (res, status) => {
        const r = this.parse(res, status);
        this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || this.error || reject).call(this, this.getError(r.response, void 0, origin));
        } else {
          this.appinfo = r.response;
          resolve && resolve.call(this, this.appinfo);
        }
      }, (err) => {
        (opts.error || this.error || reject).call(this, this.getError(err, void 0, origin));
      });
    });
  };
  sysinfo;
  getSysInfo = (opts) => {
    const origin = "Session.getSysInfo";
    opts = opts || {};
    return new Promise((resolve, reject) => {
      this.req(`${this.parameters.apppath}?action=sysinfo`, void 0, (res, status) => {
        const r = this.parse(res, status);
        this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || this.error || reject).call(this, this.getError(r.response, void 0, origin));
        } else {
          this.sysinfo = r.response;
          resolve && resolve.call(this, this.sysinfo);
        }
      }, (err) => {
        (opts.error || this.error || reject).call(this, this.getError(err, void 0, origin));
      });
    });
  };
  devinfo;
  getDevInfo = (module, opts) => {
    const origin = "Session.getDevInfo";
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = "";
      if (module)
        p += "&module=" + encodeURIComponent(module);
      this.req(`${this.parameters.apppath}?action=devinfo${p}`, void 0, (res, status) => {
        const r = this.parse(res, status);
        this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || this.error || reject).call(this, this.getError(r.response, void 0, origin));
        } else {
          if (!module)
            this.devinfo = r.response;
          resolve && resolve.call(this, r.response);
        }
      }, (err) => {
        (opts.error || this.error || reject).call(this, this.getError(err, void 0, origin));
      });
    });
  };
  news;
  getNews = (opts) => {
    const origin = "Session.getHealth";
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = "";
      const img = !!opts.inlineImages || !!opts.images;
      if (img)
        p += "&inline_images=true";
      this.req(`${this.parameters.apppath}?action=news${p}`, void 0, (res, status) => {
        const r = this.parse(res, status);
        this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || this.error || reject).call(this, this.getError(r.response, void 0, origin));
        } else {
          this.news = r.response;
          for (const n of this.news)
            n.image = new Doc(n.image);
          resolve && resolve.call(this, this.news);
        }
      }, (err) => {
        (opts.error || this.error || reject).call(this, this.getError(err, void 0, origin));
      });
    });
  };
  indexSearch = (query, object, opts) => {
    const origin = "Session.indexSearch";
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = "";
      if (opts.metadata === true)
        p += "&_md=true";
      if (opts.context)
        p += "&context=" + encodeURIComponent(opts.context);
      this.req(`${this.parameters.apppath}?action=indexsearch&request=${encodeURIComponent(query ? query : "")}${object ? "&object=" + encodeURIComponent(object) : ""}${p}`, void 0, (res, status) => {
        const r = this.parse(res, status);
        this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error")
          (opts.error || this.error || reject).call(this, this.getError(r.response, void 0, origin));
        else
          resolve && resolve.call(this, r.response);
      }, (err) => {
        (opts.error || this.error || reject).call(this, this.getError(err, void 0, origin));
      });
    });
  };
  getBusinessObject = (name, instance) => {
    const cacheKey = this.getBusinessObjectCacheKey(name, instance);
    let obj = this.businessObjectCache[cacheKey];
    if (!obj) {
      obj = new BusinessObject(this, name, instance);
      this.businessObjectCache[cacheKey] = obj;
    }
    return obj;
  };
  getExternalObject = (name) => {
    return new ExternalObject(this, name);
  };
  getResourceURL = (code, type, object, objId) => {
    return this.parameters.url + this.parameters.respath + "?code=" + encodeURIComponent(code) + "&type=" + encodeURIComponent(type || "IMG") + (object ? "&object=" + encodeURIComponent(object) : "") + (objId ? "&objid=" + encodeURIComponent(objId) : "") + (this.authtoken ? "_x_simplicite_authorization_=" + encodeURIComponent(this.authtoken) : "");
  };
}
class Doc {
  constructor(value) {
    Object.assign(this, value);
  }
  id;
  mime;
  filename;
  content;
  thumbnail;
  getId = () => {
    return this.id;
  };
  getMIMEType = () => {
    return this.mime;
  };
  getMimeType = this.getMIMEType;
  setMIMEType = (mime) => {
    this.mime = mime;
  };
  setMimeType = this.setMIMEType;
  getFilename = () => {
    return this.filename;
  };
  getFileName = this.getFilename;
  setFilename = (filename) => {
    this.filename = filename;
  };
  setFileName = this.setFilename;
  getContent = () => {
    return this.content;
  };
  getThumbnail = () => {
    return this.thumbnail;
  };
  getBuffer(data) {
    return Buffer.from(data, "base64");
  }
  getContentAsArrayBuffer = () => {
    return this.getBuffer(this.content).buffer;
  };
  getThumbnailAsArrayBuffer = () => {
    return this.getBuffer(this.thumbnail || "").buffer;
  };
  getContentAsText = () => {
    return this.getBuffer(this.content).toString("utf-8");
  };
  setContent = (content) => {
    this.content = content;
  };
  setContentFromText = (content) => {
    this.content = Buffer.from(content, "utf-8").toString("base64");
  };
  getDataURL = (thumbnail) => {
    if (this.content)
      return "data:" + this.mime + ";base64," + (thumbnail && this.thumbnail ? this.thumbnail : this.content);
  };
  getValue = () => {
    return JSON.parse(JSON.stringify(this));
  };
}
class Grant {
  constructor(grant) {
    Object.assign(this, grant);
  }
  userid;
  login;
  lang;
  email;
  firstname;
  lastname;
  picture;
  responsibilities;
  texts;
  getUserId = () => {
    return this.userid;
  };
  getUsername = () => {
    return this.login;
  };
  getLogin = this.getUsername;
  getLang = () => {
    return this.lang;
  };
  getEmail = () => {
    return this.email;
  };
  getFirstname = () => {
    return this.firstname;
  };
  getFirstName = this.getFirstname;
  getLastname = () => {
    return this.lastname;
  };
  getLastName = this.getLastname;
  getPictureURL = () => {
    if (this.picture)
      return "data:" + this.picture.mime + ";base64," + this.picture.content;
  };
  hasResponsibility = (group) => {
    return this.responsibilities && this.responsibilities.indexOf(group) !== -1;
  };
  T = (code) => {
    return this.texts ? this.texts[code] || "" : "";
  };
}
class BusinessObjectMetadata {
  constructor(name, instance) {
    this.name = name;
    this.instance = instance;
    this.rowidfield = constants.DEFAULT_ROW_ID_NAME;
    this.label = name;
    this.help = "";
    this.fields = new Array();
  }
  id;
  name;
  instance;
  rowidfield;
  label;
  help;
  fields;
  links;
}
class BusinessObject {
  constructor(session2, name, instance) {
    this.session = session2;
    const inst = instance || "api_" + name;
    this.metadata = new BusinessObjectMetadata(name, inst);
    this.cacheKey = this.session.getBusinessObjectCacheKey(name, inst);
    this.path = this.session.parameters.objpath + "?object=" + encodeURIComponent(name) + "&inst=" + encodeURIComponent(inst);
    this.item = {};
    this.filters = {};
    this.list = [];
  }
  session;
  metadata;
  cacheKey;
  path;
  item;
  filters;
  list;
  count;
  page;
  maxpage;
  getMetaData = (opts) => {
    const origin = "BusinessObject.getMetaData";
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = "";
      if (opts.context)
        p += "&context=" + encodeURIComponent(opts.context);
      if (opts.contextParam)
        p += "&contextparam=" + encodeURIComponent(opts.contextParam);
      ses.req(this.path + "&action=metadata" + p, void 0, (res, status) => {
        const r = ses.parse(res, status);
        ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || ses.error || reject).call(this, ses.getError(r.response, void 0, origin));
        } else {
          this.metadata = r.response;
          resolve && resolve.call(this, this.metadata);
        }
      }, (err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
      });
    });
  };
  getMetadata = this.getMetaData;
  getName = () => {
    return this.metadata.name;
  };
  getInstance = () => {
    return this.metadata.instance;
  };
  getLabel = () => {
    return this.metadata.label;
  };
  getHelp = () => {
    return this.metadata.help;
  };
  getFields = () => {
    return this.metadata.fields;
  };
  getField = (fieldName) => {
    const fs = this.getFields();
    let n = 0;
    while (n < fs.length && fs[n].name !== fieldName)
      n++;
    if (n < fs.length)
      return fs[n];
  };
  getRowIdFieldName = () => {
    return this.metadata.rowidfield;
  };
  getRowIdField = () => {
    return this.getField(this.getRowIdFieldName());
  };
  getLinks = () => {
    return this.metadata.links;
  };
  getFieldType = (field) => {
    if (typeof field === "string")
      field = this.getField(field);
    if (field)
      return field.type;
  };
  getFieldLabel = (field) => {
    if (typeof field === "string")
      field = this.getField(field);
    if (field)
      return field.label;
  };
  getFieldValue = (field, item) => {
    if (!item)
      item = this.item;
    if (field && item) {
      const val = item[typeof field === "string" ? field : field.name];
      if (val && val.mime)
        return new Doc(val);
      else
        return val;
    }
  };
  getFieldListValue = (field, item) => {
    if (typeof field === "string")
      field = this.getField(field);
    const val = this.getFieldValue(field, item);
    return field && field.listOfValues ? this.getListValue(field.listOfValues, val) : val;
  };
  getFieldDataURL = (field, item) => {
    if (typeof field !== "string")
      field = field.fullinput || field.name;
    const val = this.getFieldValue(field, item);
    if (val && val.mime)
      return "data:" + val.mime + ";base64," + (val.content || val.thumbnail);
  };
  getFieldDocument = (field, item) => {
    if (typeof field !== "string")
      field = field.fullinput || field.input || field.name;
    const val = this.getFieldValue(field, item);
    if (val && val.mime)
      return new Doc(val);
    else
      return val;
  };
  getFieldDocumentURL = (field, item, thumbnail) => {
    if (typeof field !== "string")
      field = field.fullinput || field.input || field.name;
    let val = this.getFieldValue(field, item);
    if (val && val.mime)
      val = val.id;
    if (val)
      return this.session.parameters.url + this.session.parameters.docpath + "?object=" + encodeURIComponent(this.metadata.name) + "&inst=" + encodeURIComponent(this.metadata.instance) + "&field=" + encodeURIComponent(field) + "&row_id=" + encodeURIComponent(this.getRowId(item)) + "&doc_id=" + encodeURIComponent(val) + (thumbnail ? "&thumbnail=true" : "") + (this.session.authtoken ? "&_x_simplicite_authorization_=" + encodeURIComponent(this.session.authtoken) : "");
  };
  getListValue = (list, code) => {
    if (list) {
      for (let i = 0; i < list.length; i++) {
        const l = list[i];
        if (l.code === code)
          return l.value;
      }
    }
    return code;
  };
  setFieldValue = (field, value, item) => {
    if (!item)
      item = this.item;
    if (field && item) {
      item[typeof field === "string" ? field : field.name] = value instanceof Doc ? value.getValue() : value;
    }
  };
  isRowIdField = (field) => {
    return !field.ref && field.name === this.metadata.rowidfield;
  };
  isTimestampField = (field) => {
    const n = field.name;
    return !field.ref && (n === "created_by" || n === "created_dt" || n === "updated_by" || n === "updated_dt");
  };
  getFilters = (opts) => {
    const origin = "BusinessObject.getFilters";
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = "";
      if (opts.context)
        p += "&context=" + encodeURIComponent(opts.context);
      if (opts.reset)
        p += "&reset=" + !!opts.reset;
      ses.req(this.path + "&action=filters" + p, void 0, (res, status) => {
        const r = ses.parse(res, status);
        ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || ses.error || reject).call(this, ses.getError(r.response, void 0, origin));
        } else {
          this.filters = r.response;
          resolve && resolve.call(this, this.filters);
        }
      }, (err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
      });
    });
  };
  getReqOptions = (options) => {
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
  };
  getReqParams = (data) => {
    let p = "";
    if (!data)
      return p;
    let n = 0;
    for (const i in data) {
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
  };
  getCount = (filters, opts) => {
    const origin = "BusinessObject.getCount";
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      this.filters = filters || {};
      ses.req(`${this.path}&action=count`, this.getReqParams(this.filters), (res, status) => {
        const r = ses.parse(res, status);
        ses.debug("[" + origin + "] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || ses.error || reject).call(this, ses.getError(r.response, void 0, origin));
        } else {
          this.count = r.response.count;
          this.page = r.response.page >= 0 ? r.response.page + 1 : void 0;
          this.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : void 0;
          this.list = [];
          resolve && resolve.call(this, this.count);
        }
      }, (err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
      });
    });
  };
  search = (filters, opts) => {
    const origin = "BusinessObject.search";
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = this.getReqOptions(opts);
      if (opts.page > 0)
        p += "&page=" + (opts.page - 1);
      if (opts.metadata === true)
        p += "&_md=true";
      if (opts.visible === true)
        p += "&_visible=true";
      this.filters = filters || {};
      ses.req(this.path + "&action=search" + p, this.getReqParams(this.filters), (res, status) => {
        const r = ses.parse(res, status);
        ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || ses.error || reject).call(this, ses.getError(r.response, void 0, origin));
        } else {
          if (res.meta)
            this.metadata = r.response.meta;
          this.count = r.response.count;
          this.page = r.response.page >= 0 ? r.response.page + 1 : void 0;
          this.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : void 0;
          this.list = r.response.list;
          resolve && resolve.call(this, this.list);
        }
      }, (err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
      });
    });
  };
  get = (rowId, opts) => {
    const origin = "BusinessObject.get";
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = this.getReqOptions(opts);
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
      ses.req(this.path + "&action=get&" + this.metadata.rowidfield + "=" + encodeURIComponent(rowId) + p, void 0, (res, status) => {
        const r = ses.parse(res, status);
        ses.debug("[simplicite.BusinessObject.get] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || ses.error || reject).call(this, ses.getError(r.response, void 0, origin));
        } else {
          if (r.response.meta)
            this.metadata = r.response.meta;
          if (r.response.data)
            this.item = tv ? r.response.data.item : r.response.data;
          else
            this.item = tv ? r.response.item : r.response;
          resolve && resolve.call(this, tv ? r.response : this.item);
        }
      }, (err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
      });
    });
  };
  getForCreate = (opts) => {
    opts = opts || {};
    delete opts.treeview;
    delete opts.fields;
    opts.context = constants.CONTEXT_CREATE;
    return this.get(this.session.constants.DEFAULT_ROW_ID, opts);
  };
  getForUpdate = (rowId, opts) => {
    opts = opts || {};
    delete opts.treeview;
    delete opts.fields;
    opts.context = constants.CONTEXT_UPDATE;
    return this.get(rowId, opts);
  };
  getForCopy = (rowId, opts) => {
    opts = opts || {};
    delete opts.treeview;
    delete opts.fields;
    opts.context = constants.CONTEXT_COPY;
    return this.get(rowId, opts);
  };
  getForDelete = (rowId, opts) => {
    opts = opts || {};
    delete opts.treeview;
    delete opts.fields;
    opts.context = constants.CONTEXT_DELETE;
    return this.get(rowId, opts);
  };
  getRowId = (item) => {
    item = item || this.item;
    if (item)
      return item[this.getRowIdFieldName()];
  };
  populate = (rowId, opts) => {
    const origin = "BusinessObject.populate";
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      const p = this.getReqOptions(opts);
      ses.req(this.path + "&action=populate&" + this.metadata.rowidfield + "=" + encodeURIComponent(rowId) + p, void 0, (res, status) => {
        const r = ses.parse(res, status);
        ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || ses.error || reject).call(this, ses.getError(r.response, void 0, origin));
        } else {
          this.item = r.response.data ? r.response.data : r.response;
          resolve && resolve.call(this, this.item);
        }
      }, (err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
      });
    });
  };
  save = (item, opts) => {
    if (item)
      this.item = item;
    const rowId = this.item[this.metadata.rowidfield];
    if (!rowId || rowId === constants.DEFAULT_ROW_ID)
      return this.create(item, opts);
    else
      return this.update(item, opts);
  };
  create = (item, opts) => {
    const origin = "BusinessObject.create";
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      if (item)
        this.item = item;
      this.item.row_id = ses.constants.DEFAULT_ROW_ID;
      const p = this.getReqOptions(opts);
      ses.req(`${this.path}&action=create${p}`, this.getReqParams(this.item), (res, status) => {
        const r = ses.parse(res, status);
        ses.debug("[" + origin + "] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || ses.error || reject).call(this, ses.getError(r.response, void 0, origin));
        } else {
          this.item = r.response.data ? r.response.data : r.response;
          resolve && resolve.call(this, this.item);
        }
      }, (err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
      });
    });
  };
  update = (item, opts) => {
    const origin = "BusinessObject.update";
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      if (item)
        this.item = item;
      const p = this.getReqOptions(opts);
      ses.req(this.path + "&action=update" + p, this.getReqParams(this.item), (res, status) => {
        const r = ses.parse(res, status);
        ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || ses.error || reject).call(this, ses.getError(r.response, void 0, origin));
        } else {
          this.item = r.response.data ? r.response.data : r.response;
          resolve && resolve.call(this, this.item);
        }
      }, (err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
      });
    });
  };
  del = (item, opts) => {
    const origin = "BusinessObject.del";
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      if (item)
        this.item = item;
      ses.req(this.path + "&action=delete&" + this.metadata.rowidfield + "=" + encodeURIComponent(this.item[this.metadata.rowidfield]), void 0, (res, status) => {
        const r = ses.parse(res, status);
        ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || ses.error || reject).call(this, ses.getError(r.response, void 0, origin));
        } else {
          this.item = void 0;
          delete r.response.undoredo;
          resolve && resolve.call(this, r.response);
        }
      }, (err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
      });
    });
  };
  action = (action, rowId, opts) => {
    const origin = `BusinessObject.action(${action})`;
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      ses.req(this.path + "&action=" + encodeURIComponent(action) + (rowId ? "&" + this.getRowIdFieldName() + "=" + encodeURIComponent(rowId) : ""), this.getReqParams(opts.parameters), (res, status) => {
        const r = ses.parse(res, status);
        ses.debug("[" + origin + "] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || ses.error || reject).call(this, ses.getError(r.response, void 0, origin));
        } else {
          const result = r.response.result;
          resolve && resolve.call(this, result);
        }
      }, (err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
      });
    });
  };
  crosstab = (ctb, opts) => {
    const origin = `BusinessObject.crosstab(${ctb})`;
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      if (opts.filters)
        this.filters = opts.filters;
      ses.req(this.path + "&action=crosstab&crosstab=" + encodeURIComponent(ctb), this.getReqParams(this.filters), (res, status) => {
        const r = ses.parse(res, status);
        ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || ses.error || reject).call(this, ses.getError(r.response, void 0, origin));
        } else {
          resolve && resolve.call(this, r.response);
        }
      }, (err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
      });
    });
  };
  print = (prt, rowId, opts) => {
    const origin = `BusinessObject.print(${prt})`;
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      if (opts.filters)
        this.filters = opts.filters;
      let p = "";
      if (opts.all)
        p += "&all=" + !!opts.all;
      if (opts.mailing)
        p += "&mailing=" + !!opts.mailing;
      ses.req(this.path + "&action=print&printtemplate=" + encodeURIComponent(prt) + (rowId ? "&" + this.getRowIdFieldName() + "=" + encodeURIComponent(rowId) : "") + p, void 0, (res, status) => {
        const r = ses.parse(res, status);
        ses.debug("[" + origin + "] HTTP status = " + status + ", response type = " + r.type);
        if (r.type === "error") {
          (opts.error || ses.error || reject).call(this, ses.getError(r.response, void 0, origin));
        } else {
          resolve && resolve.call(this, new Doc(r.response));
        }
      }, (err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
      });
    });
  };
  setParameter = (param, value, opts) => {
    const origin = "BusinessObject.setParameter";
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      const p = { name: param };
      if (value)
        p.value = value;
      ses.req(this.path + "&action=setparameter", this.getReqParams(p), (res, status) => {
        const r = ses.parse(res, status);
        ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || ses.error || reject).call(this, r.response);
        } else {
          const result = r.response.result;
          resolve && resolve.call(this, result);
        }
      }, (err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err));
      });
    });
  };
  getParameter = (param, opts) => {
    const origin = "BusinessObject.getParameter";
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      const p = { name: param };
      ses.req(this.path + "&action=getparameter", this.getReqParams(p), (res, status) => {
        const r = ses.parse(res, status);
        ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
        if (r.type === "error") {
          (opts.error || ses.error || reject).call(this, r.response);
        } else {
          const result = r.response.result;
          resolve && resolve.call(this, result);
        }
      }, (err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err));
      });
    });
  };
  getResourceURL = (code, type) => {
    return this.session.getResourceURL(code, type, this.metadata.name, this.metadata.id);
  };
}
class ExternalObjectMetadata {
  constructor(name) {
    this.name = name;
  }
  name;
}
class ExternalObject {
  constructor(session2, name) {
    this.session = session2;
    this.metadata = new ExternalObjectMetadata(name);
    this.path = this.session.parameters.extpath + "/" + encodeURIComponent(name);
  }
  session;
  metadata;
  path;
  getName = () => {
    return this.metadata.name;
  };
  callParams = (params) => {
    let p = "";
    if (!params)
      return p;
    let n = 0;
    for (const i in params) {
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
  call = (params, data, opts) => {
    const origin = "ExternalObject.call";
    const ses = this.session;
    opts = opts || {};
    return new Promise((resolve, reject) => {
      let p = "";
      if (params)
        p = "?" + this.callParams(params);
      const m = opts.method ? opts.method.toUpperCase() : data ? "POST" : "GET";
      const h = {};
      if (opts.contentType) {
        h["Content-Type"] = opts.contentType;
      } else if (data) {
        h["Content-Type"] = typeof data === "string" ? "application/x-www-form-urlencoded" : "application/json";
      }
      let b = ses.getBearerTokenHeader();
      if (b) {
        h["X-Simplicite-Authorization"] = b;
      } else {
        b = ses.getBasicAuthHeader();
        if (b)
          h.Authorization = b;
      }
      const u = ses.parameters.url + this.path + p;
      const d = data ? typeof data === "string" ? data : JSON.stringify(data) : void 0;
      ses.debug("[simplicite.ExternalObject.call] " + m + " " + u + " with " + (d ? " with " + d : ""));
      fetch(u, {
        method: m,
        headers: h,
        timeout: ses.parameters.timeout * 1e3,
        mode: "cors",
        credentials: "include",
        body: d
      }).then((res) => {
        const type = res.headers.get("content-type");
        ses.debug(`[${origin}] HTTP status = ${res.status}, response content type = ${type}`);
        if (type && type.startsWith("application/json")) {
          res.json().then((jsonData) => {
            resolve && resolve.call(this, jsonData, res.status, res.headers);
          }).catch((err) => {
            (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
          });
        } else if (type && type.startsWith("text/")) {
          res.text().then((textData) => {
            resolve && resolve.call(this, textData, res.status, res.headers);
          }).catch((err) => {
            (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
          });
        } else {
          res.arrayBuffer().then((binData) => {
            resolve && resolve.call(this, binData, res.status, res.headers);
          }).catch((err) => {
            (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
          });
        }
      }).catch((err) => {
        (opts.error || ses.error || reject).call(this, ses.getError(err, void 0, origin));
      });
    });
  };
  invoke = this.call;
}
export default {
  constants,
  session,
  Session,
  Doc,
  Grant,
  BusinessObject,
  BusinessObjectMetadata,
  ExternalObject
};
