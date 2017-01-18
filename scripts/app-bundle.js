var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('api/rest',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "feathers-client", "localforage"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, feathers, localforage) {
    "use strict";
    var Rest = (function () {
        function Rest(http) {
            this.http = http;
            this._baseUrl = 'http://localhost:3030';
            this.isRequesting = false;
            this.app = feathers();
            var rest = feathers.rest(this._baseUrl);
            this.app
                .configure(feathers.hooks())
                .configure(rest.fetch(http.fetch.bind(http)))
                .configure(feathers.authentication({ storage: localforage }));
        }
        Rest.prototype.post = function (url, data) {
            return __awaiter(this, void 0, void 0, function () {
                var resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this._baseUrl + '/' + url;
                            return [4 /*yield*/, this.http.fetch(url, {
                                    method: 'post',
                                    body: aurelia_fetch_client_1.json(data)
                                })];
                        case 1:
                            resp = _a.sent();
                            return [4 /*yield*/, resp.json()];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return Rest;
    }());
    Rest = __decorate([
        aurelia_framework_1.autoinject(),
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
    ], Rest);
    exports.Rest = Rest;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('api/auth',["require", "exports", "aurelia-framework", "./rest"], function (require, exports, aurelia_framework_1, rest_1) {
    "use strict";
    var Auth = (function () {
        function Auth(rest) {
            this.rest = rest;
        }
        Auth.prototype.login = function (user) {
            return this.rest.app.authenticate({
                type: 'local',
                "email": user.email,
                "password": user.password
            });
        };
        Auth.prototype.logout = function () {
            return this.rest.app.logout();
        };
        Auth.prototype.register = function (user) {
            return this.rest.post('signup', user);
        };
        Auth.prototype.isAuthenticated = function () {
            return !!this.rest.app.get('user');
        };
        Auth.prototype.getLoginRoute = function () {
            return '';
        };
        Auth.prototype.setInitialUrl = function (localtion) {
        };
        Auth.prototype.getLoginRedirect = function () {
            return '';
        };
        return Auth;
    }());
    Auth = __decorate([
        aurelia_framework_1.autoinject(),
        __metadata("design:paramtypes", [rest_1.Rest])
    ], Auth);
    exports.Auth = Auth;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('api/auth-step',["require", "exports", "aurelia-framework", "aurelia-router", "./auth"], function (require, exports, aurelia_framework_1, aurelia_router_1, auth_1) {
    "use strict";
    var AuthStep = (function () {
        function AuthStep(auth) {
            this.auth = auth;
        }
        AuthStep.prototype.run = function (routingContext, next) {
            var isLoggedIn = this.auth.isAuthenticated();
            var loginRoute = this.auth.getLoginRoute();
            var instructions = routingContext.getAllInstructions();
            var hasAuthConfig = instructions.some(function (i) { return i.config.auth; });
            var hasLoginRoute = instructions.some(function (i) { return i.fragment === loginRoute; });
            if (hasAuthConfig) {
                if (!isLoggedIn) {
                    this.auth.setInitialUrl(window.location.href);
                    return next.cancel(new aurelia_router_1.Redirect(loginRoute));
                }
            }
            else if (isLoggedIn && hasLoginRoute) {
                var loginRedirect = this.auth.getLoginRedirect();
                return next.cancel(new aurelia_router_1.Redirect(loginRedirect));
            }
            return next();
        };
        return AuthStep;
    }());
    AuthStep = __decorate([
        aurelia_framework_1.autoinject(),
        __metadata("design:paramtypes", [auth_1.Auth])
    ], AuthStep);
    exports.AuthStep = AuthStep;
});

define('api/index',["require", "exports", "./rest", "./auth-step", "./auth"], function (require, exports, rest_1, auth_step_1, auth_1) {
    "use strict";
    exports.Rest = rest_1.Rest;
    exports.AuthStep = auth_step_1.AuthStep;
    exports.Auth = auth_1.Auth;
});

define('routes/home-route',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        route: 'home',
        name: 'home',
        moduleId: 'pages/home',
        nav: true,
        title: 'Home'
    };
});

define('routes/login-route',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        route: 'login',
        name: 'login',
        moduleId: 'pages/login',
        nav: false,
        title: 'Login'
    };
});

define('routes/logout-route',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        route: 'logout',
        name: 'logout',
        moduleId: 'pages/logout',
        nav: false,
        title: 'Logout'
    };
});

define('routes/register-route',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        route: 'register',
        name: 'register',
        moduleId: 'pages/register',
        nav: true,
        title: 'Register',
        auth: true
    };
});

define('routes/profile-route',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        route: 'profile',
        name: 'profile',
        moduleId: 'pages/profile',
        nav: true,
        title: 'Profile',
        auth: true
    };
});

define('routes/index',["require", "exports", "./home-route", "./login-route", "./logout-route", "./register-route", "./profile-route"], function (require, exports, home_route_1, login_route_1, logout_route_1, register_route_1, profile_route_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = [
        home_route_1.default, register_route_1.default, login_route_1.default, logout_route_1.default, profile_route_1.default
    ];
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "./api/index", "./routes/index"], function (require, exports, aurelia_framework_1, index_1, index_2) {
    "use strict";
    var App = (function () {
        function App(api, auth) {
            this.api = api;
            this.auth = auth;
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.title = 'App';
            config.options.pushState = true;
            config.options.root = '/';
            config.addPipelineStep('authorize', index_1.AuthStep);
            config.map(index_2.default.concat([{ route: '', redirect: 'home' }]));
            config.mapUnknownRoutes('pages/not-found');
        };
        return App;
    }());
    App = __decorate([
        aurelia_framework_1.autoinject(),
        __metadata("design:paramtypes", [index_1.Rest, index_1.Auth])
    ], App);
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('main',["require", "exports", "./environment", "bootstrap"], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        longStackTraces: environment_1.default.debug,
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('pages/home',["require", "exports"], function (require, exports) {
    "use strict";
    var Home = (function () {
        function Home() {
            this.title = 'Olá Home';
        }
        return Home;
    }());
    exports.Home = Home;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('pages/login',["require", "exports", "aurelia-framework", "../api/index", "aurelia-router"], function (require, exports, aurelia_framework_1, index_1, aurelia_router_1) {
    "use strict";
    var Login = (function () {
        function Login(auth, router) {
            this.auth = auth;
            this.router = router;
            this.user = { email: '', password: '' };
        }
        Login.prototype.singin = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.auth.login(this.user)];
                        case 1:
                            _a.sent();
                            this.router.navigateToRoute('home');
                            return [2 /*return*/];
                    }
                });
            });
        };
        return Login;
    }());
    Login = __decorate([
        aurelia_framework_1.autoinject(),
        __metadata("design:paramtypes", [index_1.Auth, aurelia_router_1.Router])
    ], Login);
    exports.Login = Login;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('pages/logout',["require", "exports", "aurelia-router", "aurelia-framework", "../api/index"], function (require, exports, aurelia_router_1, aurelia_framework_1, index_1) {
    "use strict";
    var Logout = (function () {
        function Logout(auth, router) {
            this.auth = auth;
            this.router = router;
        }
        Logout.prototype.activate = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.auth.logout()];
                        case 1:
                            _a.sent();
                            this.router.navigate('login');
                            return [2 /*return*/];
                    }
                });
            });
        };
        return Logout;
    }());
    Logout = __decorate([
        aurelia_framework_1.noView(),
        aurelia_framework_1.autoinject(),
        __metadata("design:paramtypes", [index_1.Auth, aurelia_router_1.Router])
    ], Logout);
    exports.Logout = Logout;
});

define('pages/not-found',["require", "exports"], function (require, exports) {
    "use strict";
    var NotFound = (function () {
        function NotFound() {
        }
        return NotFound;
    }());
    exports.NotFound = NotFound;
});

define('pages/profile',["require", "exports"], function (require, exports) {
    "use strict";
    var Profile = (function () {
        function Profile() {
            this.title = 'Profile';
        }
        return Profile;
    }());
    exports.Profile = Profile;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('pages/register',["require", "exports", "aurelia-framework", "aurelia-router", "../api/index"], function (require, exports, aurelia_framework_1, aurelia_router_1, index_1) {
    "use strict";
    var Register = (function () {
        function Register(auth, router) {
            this.auth = auth;
            this.router = router;
            this.user = { email: '', password: '' };
        }
        Register.prototype.singup = function () {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            debugger;
                            return [4 /*yield*/, this.auth.register(this.user)];
                        case 1:
                            user = _a.sent();
                            return [4 /*yield*/, this.auth.login(this.user)];
                        case 2:
                            _a.sent();
                            this.router.navigateToRoute('home');
                            return [2 /*return*/];
                    }
                });
            });
        };
        return Register;
    }());
    Register = __decorate([
        aurelia_framework_1.autoinject(),
        __metadata("design:paramtypes", [index_1.Auth, aurelia_router_1.Router])
    ], Register);
    exports.Register = Register;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
        config.globalResources([
            './elements/loading-indicator',
            './value-converters/auth-filter'
        ]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/loading-indicator',["require", "exports", "nprogress", "aurelia-framework"], function (require, exports, nprogress, aurelia_framework_1) {
    "use strict";
    var LoadingIndicator = (function () {
        function LoadingIndicator() {
            this.loading = false;
        }
        LoadingIndicator.prototype.loadingChanged = function (newValue) {
            if (newValue) {
                nprogress.start();
            }
            else {
                nprogress.done();
            }
        };
        return LoadingIndicator;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], LoadingIndicator.prototype, "loading", void 0);
    LoadingIndicator = __decorate([
        aurelia_framework_1.noView(['nprogress/nprogress.css'])
    ], LoadingIndicator);
    exports.LoadingIndicator = LoadingIndicator;
});

define('resources/value-converters/auth-filter',["require", "exports"], function (require, exports) {
    "use strict";
    var AuthFilterValueConverter = (function () {
        function AuthFilterValueConverter() {
        }
        AuthFilterValueConverter.prototype.toView = function (routes, isAuthenticated) {
            var isAuth = function (r) {
                return r.config['auth'] === undefined ||
                    r.config['auth'] === isAuthenticated;
            };
            return routes.filter(isAuth);
        };
        return AuthFilterValueConverter;
    }());
    exports.AuthFilterValueConverter = AuthFilterValueConverter;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template id=\"app\">\n  <require from=\"./resources/elements/nav-bar.html\"></require>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./app.css\"></require>\n  \n  <nav-bar router.bind=\"router\" auth.bind=\"auth\"></nav-bar>\n  \n  <loading-indicator loading.bind=\"router.isNavigating || api.isRequesting\"></loading-indicator>\n  \n  <section class=\"page-host\">\n    <router-view></router-view>\n  </section>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "body {\n  margin: 0; }\n\n.splash {\n  text-align: center;\n  margin: 10% 0 0 0;\n  box-sizing: border-box; }\n  .splash .message {\n    font-size: 72px;\n    line-height: 72px;\n    text-shadow: rgba(0, 0, 0, 0.5) 0 0 15px;\n    text-transform: uppercase;\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n  .splash .fa-spinner {\n    text-align: center;\n    display: inline-block;\n    font-size: 72px;\n    margin-top: 50px; }\n\n.page-host {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50px;\n  bottom: 0;\n  overflow-x: hidden;\n  overflow-y: auto; }\n\n@media print {\n  .page-host {\n    position: absolute;\n    left: 10px;\n    right: 0;\n    top: 50px;\n    bottom: 0;\n    overflow-y: inherit;\n    overflow-x: inherit; } }\n\nsection {\n  margin: 0 20px; }\n\n.navbar-nav li.loader {\n  margin: 12px 24px 0 6px; }\n\n.pictureDetail {\n  max-width: 425px; }\n\n/* animate page transitions */\nsection.au-enter-active {\n  -webkit-animation: fadeInRight 1s;\n  animation: fadeInRight 1s; }\n\ndiv.au-stagger {\n  /* 50ms will be applied between each successive enter operation */\n  -webkit-animation-delay: 50ms;\n  animation-delay: 50ms; }\n\n.card-container.au-enter {\n  opacity: 0 !important; }\n\n.card-container.au-enter-active {\n  -webkit-animation: fadeIn 2s;\n  animation: fadeIn 2s; }\n\n.card {\n  overflow: hidden;\n  position: relative;\n  border: 1px solid #CCC;\n  border-radius: 8px;\n  text-align: center;\n  padding: 0;\n  background-color: #337ab7;\n  color: #88acd9;\n  margin-bottom: 32px;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); }\n  .card .content {\n    margin-top: 10px; }\n  .card .content .name {\n    color: white;\n    text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);\n    font-size: 18px; }\n  .card .header-bg {\n    /* This stretches the canvas across the entire hero unit */\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 70px;\n    border-bottom: 1px #FFF solid;\n    border-radius: 6px 6px 0 0; }\n  .card .avatar {\n    position: relative;\n    margin-top: 15px;\n    z-index: 100; }\n  .card .avatar img {\n    width: 100px;\n    height: 100px;\n    -webkit-border-radius: 50%;\n    -moz-border-radius: 50%;\n    border-radius: 50%;\n    border: 2px #FFF solid; }\n\n/* animation definitions */\n@-webkit-keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); }\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    -ms-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); }\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none; } }\n\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n"; });
define('text!pages/home.html', ['module'], function(module) { module.exports = "<template>\n\n  <div class=\"jumbotron\">\n    <h2 class=\"text-center\">${heading}</h2>\n    <p class=\"text-center\">\n      <a click.trigger=\"sigin()\" class=\"btn btn-primary\" if.bind=\"!token\">Login</a>\n      <a click.trigger=\"signout()\" class=\"btn btn-warning\" if.bind=\"token\">Logout</a>\n    </p>\n  </div>\n\n   <div class=\"container\">\n    <div class=\"col-md-4\" repeat.for=\"post of [1, 2, 3, 4]\">\n      <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n          <img src=\"https://cdn.auth0.com/blog/aurelia-logo.png\" class=\"img-responsive\" alt=\"\" />\n        </div>\n        <div class=\"panel-footer\"><strong>Aurelia </strong> Framework</div>\n      </div>\n    </div>\n  </div>\n\n</template>\n    "; });
define('text!pages/login.html', ['module'], function(module) { module.exports = "<template>\n\n  <div class=\"container\">\n    <form class=\"form-signin\" submit.delegate=\"singin()\">\n      <h2 class=\"form-signin-heading\">Entrar</h2>\n\n      <label for=\"inputEmail\" class=\"sr-only\">Email </label>\n      <input id=\"inputEmail\" type=\"email\" class=\"form-control\" placeholder=\"seu@email.com\" \n        required=\"\" autofocus=\"\" value.bind=\"user.email\">\n\n      <label for=\"inputPassword\" class=\"sr-only\">Senha</label>\n      <input id=\"inputPassword\" type=\"password\" class=\"form-control\" placeholder=\"Senha\" \n        required=\"\" value.bind=\"user.password\">\n\n      <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\"\n        > Sign in\n      </button>\n    </form>\n\n  </div>\n\n</template>\n"; });
define('text!resources/elements/sing.css', ['module'], function(module) { module.exports = ".form-signin {\n  max-width: 330px;\n  padding: 15px;\n  margin: 0 auto; }\n  .form-signin .form-signin-heading, .form-signin .checkbox {\n    margin-bottom: 10px; }\n  .form-signin .checkbox {\n    font-weight: normal; }\n  .form-signin .form-control {\n    position: relative;\n    height: auto;\n    box-sizing: border-box;\n    padding: 10px;\n    font-size: 16px; }\n  .form-signin .form-control:focus {\n    z-index: 2; }\n  .form-signin input[type=\"email\"] {\n    margin-bottom: -1px;\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0; }\n  .form-signin input[type=\"password\"] {\n    margin-bottom: 10px;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0; }\n"; });
define('text!pages/not-found.html', ['module'], function(module) { module.exports = "<template>\n  <h2>Pagina não encontrada</h2>\n</template>\n  "; });
define('text!pages/profile.html', ['module'], function(module) { module.exports = "<template>\n    <h2>${title}</h2>\n  </template>\n    "; });
define('text!pages/register.html', ['module'], function(module) { module.exports = "<template>\n  \n  <div class=\"container\">\n    <form class=\"form-signin\" submit.delegate=\"singup()\">\n      <h2 class=\"form-signin-heading\">Cadastro</h2>\n\n      <label for=\"inputEmail\" class=\"sr-only\">Email </label>\n      <input id=\"inputEmail\" type=\"email\" class=\"form-control\" placeholder=\"seu@email.com\" \n        required=\"\" autofocus=\"\" value.bind=\"user.email\">\n\n      <label for=\"inputPassword\" class=\"sr-only\">Senha</label>\n      <input id=\"inputPassword\" type=\"password\" class=\"form-control\" placeholder=\"Senha\" \n        required=\"\" value.bind=\"user.password\">\n      \n      <div class=\"checkbox\">\n        <label>\n          <input type=\"checkbox\" value=\"remember-me\" required> \n          Aceito os <a href=\"\">termos</a> de adesão. \n        </label>\n      </div>\n      <button class=\"btn btn-lg btn-primary btn-block\" \n        type=\"submit\"> Registrar\n      </button>\n    </form>\n  </div>\n\n</template>\n"; });
define('text!resources/elements/nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router, auth\">\n \n  <nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n        <span class=\"sr-only\">Toggle Navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\">\n        <i class=\"fa fa-home\"></i>\n        <span>${router.title}</span>\n      </a>\n    </div>\n\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n      <ul class=\"nav navbar-nav\">\n        <!-- Loop through routes to create a menu  -->\n        <li repeat.for=\"row of router.navigation | authFilter: auth.isAuthenticated()\" \n            class=\"${row.isActive ? 'active' : ''}\"\n          >\n          <a href.bind=\"row.href\">${row.title}</a>\n        </li>\n      </ul>\n      \n      <ul if.bind=\"!auth.isAuthenticated()\" class=\"nav navbar-nav navbar-right\">\n        <li><a href=\"/login\">Login</a></li>\n        <li><a href=\"/register\">Cadastra-se</a></li>\n        \n      </ul>\n      <ul if.bind=\"auth.isAuthenticated()\" class=\"nav navbar-nav navbar-right\">\n        <li><a href=\"/profile\">Bem vindoS ${auth.getMe()}</a></li>\n        <li><a href=\"/logout\">Logout</a></li>\n      </ul>\n\n      <ul class=\"nav navbar-nav navbar-right\">\n        <!-- Show loader when changin routes  -->\n        <li class=\"loader\" if.bind=\"router.isNavigating\">\n          <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n        </li>\n      </ul>\n    </div>\n  </nav>\n\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map