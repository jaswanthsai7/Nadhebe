var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// worker.ts
var CURATED_TRENDS = [
  {
    id: "claude-code-mcp",
    topic: "Claude Code MCP Servers",
    aliases: ["claude code mcp", "mcp servers claude", "model context protocol claude", "claude code skills"],
    category: "AI Developer Tools",
    source: "Nadhebe Developer Radar",
    relatedQueries: [
      "How to Connect MCP Servers to Claude Code CLI",
      "Best MCP servers for developer workflows",
      "Building custom MCP plugins for Claude Code"
    ]
  },
  {
    id: "gemini-3-6-flash",
    topic: "Gemini 3.6 Flash API & Canvas",
    aliases: ["gemini 3.6 flash", "gemini 3.6 canvas", "google gemini 3.6", "gemini api javascript node"],
    category: "AI Models & APIs",
    source: "Nadhebe Developer Radar",
    relatedQueries: [
      "Gemini 3.6 Flash benchmarks and latency",
      "How to use Gemini Canvas for coding",
      "Gemini API Node.js integration tutorial"
    ]
  },
  {
    id: "deepseek-r1-local-vllm",
    topic: "Local DeepSeek R1 Deployment with vLLM",
    aliases: ["deepseek r1 vllm", "deepseek r1 local setup", "vllm gpu oom fix", "deepseek r1 ollama"],
    category: "Local AI & LLMs",
    source: "Nadhebe Developer Radar",
    relatedQueries: [
      "How to Deploy DeepSeek R1 Locally Using vLLM",
      "Fixing vLLM GPU out of memory errors for DeepSeek R1",
      "DeepSeek R1 vs Claude 3.5 Sonnet local benchmark"
    ]
  },
  {
    id: "google-flow-storyboard-studio",
    topic: "Google Flow Storyboard Studio",
    aliases: ["google flow storyboard", "google flow ai video", "flow studio ai", "google flow video generator"],
    category: "AI Video & Visual Tools",
    source: "Nadhebe Developer Radar",
    relatedQueries: [
      "Google Flow Storyboard Studio Guide",
      "Building pre-production storyboards with Google Flow",
      "Google Flow vs Runway Gen-3 comparison"
    ]
  },
  {
    id: "kimi-k3-3d-modeling",
    topic: "Kimi K3 3D Spatial Generation",
    aliases: ["kimi k3 3d", "kimi k3 spatial ai", "kimi k3 game development", "kimi k3 mesh generation"],
    category: "3D & Spatial Computing",
    source: "Nadhebe Developer Radar",
    relatedQueries: [
      "Kimi K3 3D Generation Guide",
      "Kimi K3 3D modeling workflow for game developers",
      "Exporting Kimi K3 3D assets to Unreal Engine 5"
    ]
  },
  {
    id: "agentic-youtube-automation",
    topic: "Multi-Agent YouTube Automation",
    aliases: ["youtube automation agent", "ai youtube automation", "multi agent video generator", "python youtube bot"],
    category: "Autonomous Agents",
    source: "Nadhebe Developer Radar",
    relatedQueries: [
      "Build a Multi-Agent YouTube Workflow",
      "Setting up an open-source YouTube automation agent",
      "Automating YouTube Short uploads with AI agents"
    ]
  },
  {
    id: "instatic-cms-visual-editor",
    topic: "Instatic CMS Visual Importer",
    aliases: ["instatic cms", "instatic html importer", "instatic local vps", "instatic visual cms"],
    category: "Web Development & CMS",
    source: "Nadhebe Developer Radar",
    relatedQueries: [
      "How to import static HTML sites into Instatic CMS",
      "Deploying Instatic Docker on VPS",
      "Instatic enterprise editorial governance guide"
    ]
  },
  {
    id: "nextjs-15-server-actions",
    topic: "Next.js 15 Server Actions & PPR",
    aliases: ["next.js 15", "nextjs 15 ppr", "partial prerendering nextjs", "nextjs server actions best practices"],
    category: "Web Frameworks",
    source: "Nadhebe Developer Radar",
    relatedQueries: [
      "Next.js 15 Server Actions: Complete Guide",
      "Next.js 15 Partial Prerendering setup guide",
      "Securing Next.js Server Actions in production"
    ]
  },
  {
    id: "davinci-resolve-vertical-render",
    topic: "DaVinci Resolve 9:16 Vertical Video Workflows",
    aliases: ["davinci resolve 1080x1350", "davinci resolve 9:16", "davinci resolve shorts render", "davinci resolve aspect ratio"],
    category: "Social & Creator",
    source: "Nadhebe Developer Radar",
    relatedQueries: [
      "Best DaVinci Resolve render settings for 1080\xD71350 and 9:16 Shorts",
      "Auto-cropping 16:9 video to 9:16 vertical in DaVinci Resolve"
    ]
  }
];
function extractKeywords(text) {
  const stop = /* @__PURE__ */ new Set(["how", "to", "for", "the", "and", "in", "of", "a", "an", "with", "on", "at", "by", "is", "are", "guide", "tutorial"]);
  return text.toLowerCase().split(/[\s/_\-:,.\s]+/).filter((t) => t.length > 1 && !stop.has(t));
}
__name(extractKeywords, "extractKeywords");
function matchOpportunities(profile3) {
  const siteTopics = new Set(profile3.topics.map((t) => t.toLowerCase()));
  const siteCategories = new Set(profile3.categories.map((c) => c.toLowerCase()));
  const siteSlugs = profile3.existingSlugs.map((s) => s.toLowerCase());
  const results = [];
  for (const trend of CURATED_TRENDS) {
    const trendTokens = Array.from(/* @__PURE__ */ new Set([...extractKeywords(trend.topic), ...trend.aliases.flatMap(extractKeywords)]));
    let topicHits = 0;
    const matchedTopics = [];
    for (const token of trendTokens) {
      for (const sTopic of siteTopics) {
        if (sTopic.includes(token) || token.includes(sTopic)) {
          topicHits++;
          if (!matchedTopics.includes(sTopic)) matchedTopics.push(sTopic);
        }
      }
    }
    let catMatch = false;
    for (const cat of siteCategories) {
      if (cat.includes(trend.category.toLowerCase()) || trend.category.toLowerCase().includes(cat)) {
        catMatch = true;
        break;
      }
    }
    let relevance = 40;
    if (trendTokens.length > 0) {
      relevance += Math.round(Math.min(1, topicHits / Math.max(2, trendTokens.length)) * 40);
    }
    if (catMatch) relevance += 20;
    if (matchedTopics.length > 0) relevance += Math.min(20, matchedTopics.length * 5);
    relevance = Math.min(100, Math.max(30, relevance));
    let exactMatches = 0;
    const relatedPages = [];
    for (const slug of siteSlugs) {
      const slugTokens = extractKeywords(slug);
      const overlap = trendTokens.filter((t) => slugTokens.includes(t)).length;
      if (overlap >= Math.min(2, trendTokens.length)) {
        relatedPages.push(slug);
        if (overlap >= Math.min(3, trendTokens.length)) exactMatches++;
      }
    }
    let gapScore = 100;
    let gapStrength = "High";
    if (exactMatches > 0) {
      gapScore = 15;
      gapStrength = "Low";
    } else if (relatedPages.length >= 2) {
      gapScore = 70;
      gapStrength = "Medium";
    } else {
      gapScore = 100;
      gapStrength = "High";
    }
    const totalScore = Math.round(0.6 * relevance + 0.4 * gapScore);
    const topTopicsStr = matchedTopics.slice(0, 2).join(", ") || "related topics";
    const why = relatedPages.length > 0 ? `You cover ${topTopicsStr}, but we couldn't find an article specifically covering ${trend.topic}.` : `Missing from your ${trend.category.toLowerCase()} content.`;
    results.push({
      topic: trend.topic,
      category: trend.category,
      relevance,
      gapScore,
      gapStrength,
      totalScore,
      source: trend.source,
      why,
      suggestedWriteTitle: trend.relatedQueries[0] || `Guide to ${trend.topic}`,
      queries: trend.relatedQueries
    });
  }
  return results.sort((a, b) => b.totalScore - a.totalScore).slice(0, 5);
}
__name(matchOpportunities, "matchOpportunities");
function isSSRFSafe(urlStr) {
  try {
    const url = new URL(urlStr);
    const host = url.hostname.toLowerCase().trim();
    if (host === "localhost") return false;
    if (/^127\./.test(host)) return false;
    if (/^10\./.test(host)) return false;
    if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)) return false;
    if (/^192\.168\./.test(host)) return false;
    if (/^169\.254\./.test(host)) return false;
    if (/^0\./.test(host)) return false;
    if (host === "::1" || host.startsWith("fe80:") || host.startsWith("fc00:") || host.startsWith("fd00:")) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
__name(isSSRFSafe, "isSSRFSafe");
async function fetchWithSafeRedirects(initialUrl, maxRedirects = 3) {
  let currentUrl = initialUrl;
  let redirectCount = 0;
  while (redirectCount <= maxRedirects) {
    if (!isSSRFSafe(currentUrl)) {
      throw new Error(`SSRF Blocked: URL target is not safe.`);
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6e3);
    const res = await fetch(currentUrl, {
      method: "GET",
      redirect: "manual",
      // Intercept redirects manually
      signal: controller.signal,
      headers: {
        "User-Agent": "NadhebeOpportunityRadar/1.0"
      }
    });
    clearTimeout(timeoutId);
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) {
        return res;
      }
      const absoluteLocation = new URL(location, currentUrl).toString();
      currentUrl = absoluteLocation;
      redirectCount++;
      continue;
    }
    return res;
  }
  throw new Error(`Too many redirects followed (max ${maxRedirects})`);
}
__name(fetchWithSafeRedirects, "fetchWithSafeRedirects");
var worker_default = {
  async fetch(request, env2) {
    const url = new URL(request.url);
    if (url.pathname === "/api/analyze-site") {
      if (request.method !== "POST") {
        return Response.json({ success: false, error: "Method Not Allowed" }, { status: 405 });
      }
      try {
        const bodyText = await request.text();
        if (bodyText.length > 1e3) {
          return Response.json({ success: false, error: "Payload Too Large" }, { status: 413 });
        }
        const { domain: domain2 } = JSON.parse(bodyText);
        if (!domain2) {
          return Response.json({ success: false, error: "Domain is required" }, { status: 400 });
        }
        let origin = domain2.trim();
        if (!/^https?:\/\//i.test(origin)) origin = "https://" + origin;
        if (!isSSRFSafe(origin)) {
          return Response.json({ success: false, error: "Access to this host is restricted for security reasons." }, { status: 403 });
        }
        const parsed = new URL(origin);
        const host = parsed.hostname;
        let sitemapText = "";
        try {
          const sitemapRes = await fetchWithSafeRedirects(`${parsed.origin}/sitemap.xml`);
          if (sitemapRes.ok) sitemapText = await sitemapRes.text();
        } catch {
        }
        if (!sitemapText) {
          try {
            const sitemap0Res = await fetchWithSafeRedirects(`${parsed.origin}/sitemap-0.xml`);
            if (sitemap0Res.ok) sitemapText = await sitemap0Res.text();
          } catch {
          }
        }
        const urls = [];
        const locRegex = /<loc>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/loc>/gi;
        let m;
        while ((m = locRegex.exec(sitemapText)) !== null) {
          if (m[1]) urls.push(m[1].trim());
        }
        const existingSlugs = [];
        const topicsSet = /* @__PURE__ */ new Set();
        const categoriesSet = /* @__PURE__ */ new Set();
        const stopWords = /* @__PURE__ */ new Set(["index", "html", "php", "page", "post", "tag", "category", "author", "archive"]);
        const targetUrls = urls.length > 0 ? urls.slice(0, 100) : [];
        for (const uStr of targetUrls) {
          try {
            const u = new URL(uStr);
            const segs = u.pathname.split("/").filter(Boolean);
            if (segs.length > 0) {
              existingSlugs.push(segs[segs.length - 1]);
              if (segs.length > 1 && !stopWords.has(segs[0])) categoriesSet.add(segs[0]);
              for (const seg of segs) {
                for (const p of seg.toLowerCase().split(/[-_.]+/)) {
                  if (p.length > 2 && !stopWords.has(p)) topicsSet.add(p);
                }
              }
            }
          } catch {
          }
        }
        const profile3 = {
          topics: Array.from(topicsSet).slice(0, 50),
          categories: Array.from(categoriesSet).slice(0, 10),
          existingSlugs: existingSlugs.slice(0, 100)
        };
        const opportunities = matchOpportunities(profile3);
        return Response.json({
          success: true,
          profile: {
            domain: host,
            urlCount: Math.max(targetUrls.length, 1),
            topics: profile3.topics,
            categories: profile3.categories,
            existingSlugs: profile3.existingSlugs,
            analyzedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          opportunities
        });
      } catch (error3) {
        return Response.json({ success: false, error: error3.message || "Internal Server Error" }, { status: 500 });
      }
    }
    if (url.pathname === "/api/research-topic") {
      if (request.method !== "POST") {
        return Response.json({ success: false, error: "Method Not Allowed" }, { status: 405 });
      }
      try {
        const bodyText = await request.text();
        if (bodyText.length > 1e3) {
          return Response.json({ success: false, error: "Payload Too Large" }, { status: 413 });
        }
        const { topic, category } = JSON.parse(bodyText);
        if (!topic || typeof topic !== "string" || topic.trim().length > 100) {
          return Response.json({ success: false, error: "Valid topic (max 100 chars) is required" }, { status: 400 });
        }
        if (category && (typeof category !== "string" || category.trim().length > 100)) {
          return Response.json({ success: false, error: "Valid category (max 100 chars) is required" }, { status: 400 });
        }
        const sanitizedTopic = topic.trim();
        const sanitizedCategory = category ? category.trim() : "General Technology";
        const systemPrompt = `You are a Senior Technical Writer and SEO Strategist. 
Generate a detailed content research brief / outline for a blog post or tutorial on the given topic.
Keep the outline structured, professional, and optimized for search intent.
Format the output in clean Markdown. Do not exceed 800 tokens.`;
        const aiResponse = await env2.AI.run("@cf/google/gemma-4-26b-a4b-it", {
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Create a detailed content research outline for the topic: "${sanitizedTopic}" (Category: "${sanitizedCategory}").` }
          ],
          max_tokens: 800
          // Strict output token limit
        });
        let brief = "";
        if (typeof aiResponse === "object" && aiResponse !== null && "response" in aiResponse) {
          brief = aiResponse.response;
        } else if (typeof aiResponse === "string") {
          brief = aiResponse;
        } else {
          brief = JSON.stringify(aiResponse);
        }
        return Response.json({
          success: true,
          topic: sanitizedTopic,
          category: sanitizedCategory,
          brief: brief.trim()
        });
      } catch (error3) {
        return Response.json({ success: false, error: error3.message || "Internal Server Error" }, { status: 500 });
      }
    }
    if (url.pathname.startsWith("/api/")) {
      return Response.json({ success: false, error: "API route not found" }, { status: 404 });
    }
    return env2.ASSETS.fetch(request);
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
