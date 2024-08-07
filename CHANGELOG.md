# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://github.com/ecomplus/application-starter/compare/v1.1.2...v1.2.0) (2024-07-24)


### Features

* **ecom-config:** add config app data to posting deadline ([79aa04f](https://github.com/ecomplus/application-starter/commit/79aa04f78499846f99397695d0a048a9f9ef9a44))


### Bug Fixes

* **deps:** update all non-major dependencies ([#68](https://github.com/ecomplus/application-starter/issues/68)) ([0d614ae](https://github.com/ecomplus/application-starter/commit/0d614ae10440dbdabc9930f60989256422cc2b7f))
* **deps:** update dependency axios to ^0.28.0 [security] ([9a1d86c](https://github.com/ecomplus/application-starter/commit/9a1d86ce53a1e8b4a4922cc598a662518827d4a9))
* **deps:** update dependency express to ^4.18.3 ([2c5d93c](https://github.com/ecomplus/application-starter/commit/2c5d93cd74fd6cdff6814af2808bcfe895ab0281))
* **deps:** update dependency express to v4.19.2 [security] ([42e98c2](https://github.com/ecomplus/application-starter/commit/42e98c24df63a7cfa23888064ea4e1bde15ab56d))
* fix updating shipping lines on tag created (webhooks) ([0ecaa86](https://github.com/ecomplus/application-starter/commit/0ecaa861aceb70ecdbda059b80177b8f89a7236d))
* properly handling warehouses (multi cd) optionally with multiple mandabem accounts ([c4e144f](https://github.com/ecomplus/application-starter/commit/c4e144ffd626677c90889c046b863c32e054c454))

### [1.1.2](https://github.com/ecomplus/application-starter/compare/v1.1.1...v1.1.2) (2021-10-27)


### Bug Fixes

* **calculate-shipping:** fix mandabem ws requests timeouts (concurrent requests) ([0e85756](https://github.com/ecomplus/application-starter/commit/0e85756a9b905437be30d7cb665c6270daf568c3))

### [1.1.1](https://github.com/ecomplus/application-starter/compare/v1.1.0...v1.1.1) (2021-10-26)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.15.5 firestore ([9fedb91](https://github.com/ecomplus/application-starter/commit/9fedb914bf9091aad9df03ed4f4be04d0b972b5f))
* **deps:** update all non-major dependencies ([#56](https://github.com/ecomplus/application-starter/issues/56)) ([e9b51d3](https://github.com/ecomplus/application-starter/commit/e9b51d371a72267b489a8021c9ac0211389e45c2))
* **deps:** update all non-major dependencies ([#66](https://github.com/ecomplus/application-starter/issues/66)) ([bd1a508](https://github.com/ecomplus/application-starter/commit/bd1a508f16f7f7a5a0e194e66a3f37c5779ab17f))
* **deps:** update dependency firebase-admin to v10 ([#67](https://github.com/ecomplus/application-starter/issues/67)) ([9730366](https://github.com/ecomplus/application-starter/commit/9730366d9f3006fcbacbe7dd2e3379bd8c14bbae))

## [1.1.0](https://github.com/ecomplus/application-starter/compare/v1.0.7...v1.1.0) (2021-08-03)


### Features

* **admin-settings:** add optional config for enabled services and disabled by zip range [[#10](https://github.com/ecomplus/application-starter/issues/10)] ([3ba13d6](https://github.com/ecomplus/application-starter/commit/3ba13d6fe617429b08c5c4f614acbfe2c8aa5c8e))


### Bug Fixes

* **deps:** update all non-major dependencies ([#46](https://github.com/ecomplus/application-starter/issues/46)) ([9382330](https://github.com/ecomplus/application-starter/commit/938233019d7ec90c1656020b7ad4d2ed80d8c1e4))

### [1.0.7](https://github.com/ecomplus/application-starter/compare/v1.0.6...v1.0.7) (2021-06-18)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.15.4 and firebase-admin v9 ([1b3a6ef](https://github.com/ecomplus/application-starter/commit/1b3a6ef2e6753fac6e990d810c58c1dbe679761e))

### [1.0.6](https://github.com/ecomplus/application-starter/compare/v1.0.5...v1.0.6) (2020-11-05)


### Bug Fixes

* **create-tag:** add 'bairro' field ([#15](https://github.com/ecomplus/application-starter/issues/15)) ([a54ab50](https://github.com/ecomplus/application-starter/commit/a54ab50117709a2b9ec9a3980ac978f60560b1be))
* **refresh-tokens:** add scheduled cloud function to run update ([f2fecc6](https://github.com/ecomplus/application-starter/commit/f2fecc67724dfbaa77d69d0045ba8584ea97ad1f))

### [1.0.5](https://github.com/ecomplus/application-starter/compare/v1.0.4...v1.0.5) (2020-08-10)


### Bug Fixes

* **calculate-shipping:** fix returned origin zip code ([ad9541e](https://github.com/ecomplus/application-starter/commit/ad9541e0f078140489d087721ec188d48f364562))
* **deps:** update all non-major dependencies ([2dc55eb](https://github.com/ecomplus/application-starter/commit/2dc55eb9f34c7bd51d4401c530f22864066133dc))

### [1.0.4](https://github.com/ecomplus/application-starter/compare/v1.0.3...v1.0.4) (2020-07-28)


### Bug Fixes

* **calculate-shipping:** fix working with response object (fix overwrite) ([6990c62](https://github.com/ecomplus/application-starter/commit/6990c62e28dc2e7af432f70af51b75e7d976c9f7))

### [1.0.3](https://github.com/ecomplus/application-starter/compare/v1.0.2...v1.0.3) (2020-07-28)


### Bug Fixes

* **calculate-shipping:** fix handling manda bem error responses ([59dbc39](https://github.com/ecomplus/application-starter/commit/59dbc39006ceeb8b32524d5934ae564ef684e9e1))
* **calculate-shipping:** fixing secure value range ([d144322](https://github.com/ecomplus/application-starter/commit/d1443224f3bb8126e8e5bc10c2c7faebadaa5801))

### [1.0.2](https://github.com/ecomplus/application-starter/compare/v1.0.1...v1.0.2) (2020-07-23)


### Bug Fixes

* **calculate-shipping:** prevent discount/total with null value ([4ac8755](https://github.com/ecomplus/application-starter/commit/4ac87557c15623af0118e8edf8b16a6e0b0ff6cc))

### [1.0.1](https://github.com/ecomplus/application-starter/compare/v1.0.0...v1.0.1) (2020-07-11)

## 1.0.0 (2020-07-10)


### Features

* **admin-settings:** add admin config options to app config ([3fa3d8f](https://github.com/ecomplus/application-starter/commit/3fa3d8f59dfdca8ec648d1897b071d70b39c53b1))
* **calculate-shipping:** handling calculate with Manda Bem WS ([571bc14](https://github.com/ecomplus/application-starter/commit/571bc145d053f601d1b936f0476b6d3174138283))
* **create-tag:** handle ecom webhook to create manda bem tag ([cff4bcf](https://github.com/ecomplus/application-starter/commit/cff4bcf4e67d12294669163b26c7919efa738756))
* **ecom-app:** setup manda bem app config ([32c011c](https://github.com/ecomplus/application-starter/commit/32c011c3acec624afd16822b0a8d91917e11e0b3))


### Bug Fixes

* **calculate-shipping:** edit mandabem credential fields on app data ([dd9d632](https://github.com/ecomplus/application-starter/commit/dd9d6320cfb1dadbeb86c76361f4990ab11ca3f2))
* **calculate-shipping:** parse calculated price to float (number) ([24d8ce2](https://github.com/ecomplus/application-starter/commit/24d8ce2f361d814e64f546c465e26376e3f57dfd))
* **calculate-shipping:** preset final weight zero ([d0102a1](https://github.com/ecomplus/application-starter/commit/d0102a13d468f5f914c38ef2306cb068bf9fcfa1))
* **calculate-shipping:** setting 'package' on shipping line object ([fe0be69](https://github.com/ecomplus/application-starter/commit/fe0be696d2625b66bb818911b36b88181d0babbc))
* **create-tag:** pass order number or id as ref to manda bem tag ([814a6aa](https://github.com/ecomplus/application-starter/commit/814a6aa2c12a48c365a09cfe05a991d1f32b5932))

## [1.0.0-starter.14](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.13...v1.0.0-starter.14) (2020-06-30)


### Bug Fixes

* **auth-callback:** check `row.setted_up` in place of 'settep_up' ([e2a73ca](https://github.com/ecomplus/application-starter/commit/e2a73ca029868d9c899d4a1c0d982f1c1ed5829f))
* **deps:** update all non-major dependencies ([#31](https://github.com/ecomplus/application-starter/issues/31)) ([702bee9](https://github.com/ecomplus/application-starter/commit/702bee9a31370579dd7718b5722180e5bb8996e8))
* **deps:** update dependency firebase-functions to ^3.7.0 ([#30](https://github.com/ecomplus/application-starter/issues/30)) ([0f459a3](https://github.com/ecomplus/application-starter/commit/0f459a3ab9fe21f8dc9e9bdfce33c0b6d43e3622))
* **deps:** update dependency firebase-tools to ^8.4.2 ([#29](https://github.com/ecomplus/application-starter/issues/29)) ([cf7e61e](https://github.com/ecomplus/application-starter/commit/cf7e61ef50aa976f33725d855ba19d06a7522fd4))
* **pkg:** update deps, start using node 10 ([172ed7f](https://github.com/ecomplus/application-starter/commit/172ed7f223cd23b9874c5d6209928b7d620b0cf6))

## [1.0.0-starter.13](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.12...v1.0.0-starter.13) (2020-06-03)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.13.0 ([b424410](https://github.com/ecomplus/application-starter/commit/b42441089e7020774c9586ed176e691ef4c755be))
* **refresh-tokens:** force appSdk update tokens task ([139a350](https://github.com/ecomplus/application-starter/commit/139a350c230fa36c37ab83e2debfe979d831cb08))

## [1.0.0-starter.12](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.11...v1.0.0-starter.12) (2020-05-29)


### Bug Fixes

* **deps:** replace @ecomplus/application-sdk to firestore version ([3d2ee85](https://github.com/ecomplus/application-starter/commit/3d2ee85feb2edab77950e5c266514152fbc9674d))
* **deps:** update all non-major dependencies ([#21](https://github.com/ecomplus/application-starter/issues/21)) ([7a370da](https://github.com/ecomplus/application-starter/commit/7a370da11dfd098c0a90da05d39fc62f9264fd63))
* **deps:** update all non-major dependencies ([#26](https://github.com/ecomplus/application-starter/issues/26)) ([e37e0e8](https://github.com/ecomplus/application-starter/commit/e37e0e8151768d79e81f4184ab937ddf9d775a4f))
* **deps:** update dependency uglify-js to ^3.9.2 ([#20](https://github.com/ecomplus/application-starter/issues/20)) ([adccf0a](https://github.com/ecomplus/application-starter/commit/adccf0a2fed37f2ccce57ded20d25af85407ac8a))

## [1.0.0-starter.11](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.10...v1.0.0-starter.11) (2020-04-27)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.11.13 ([70584c2](https://github.com/ecomplus/application-starter/commit/70584c245e97a1b539a3df3f74109f20d9a1fa3c))
* **setup:** ensure enable token updates by default ([67aea0e](https://github.com/ecomplus/application-starter/commit/67aea0eb363be3cc535a0f0f4d1b5b682958f243))

## [1.0.0-starter.10](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.9...v1.0.0-starter.10) (2020-04-27)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.11.11 ([b8217d0](https://github.com/ecomplus/application-starter/commit/b8217d03fe92b5c233615a0b6b4c01d7bad676c2))
* **deps:** update all non-major dependencies ([#19](https://github.com/ecomplus/application-starter/issues/19)) ([a99797a](https://github.com/ecomplus/application-starter/commit/a99797a129d6e2383ef5ef69c06afacd13cccfb0))
* **setup:** do not disable updates on refresh-tokens route ([b983a45](https://github.com/ecomplus/application-starter/commit/b983a45ada5575ee6435f7b3016ef35c28355762))

## [1.0.0-starter.9](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.8...v1.0.0-starter.9) (2020-04-21)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.11.10 ([8da579c](https://github.com/ecomplus/application-starter/commit/8da579c19c6530e8cc9fd338a07aece1fccc64ff))

## [1.0.0-starter.8](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.7...v1.0.0-starter.8) (2020-04-18)


### Bug Fixes

* **deps:** update all non-major dependencies ([#17](https://github.com/ecomplus/application-starter/issues/17)) ([785064e](https://github.com/ecomplus/application-starter/commit/785064ef5bf06db7c084f9b17b37a6077645735b))

## [1.0.0-starter.7](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.6...v1.0.0-starter.7) (2020-04-07)

## [1.0.0-starter.6](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.5...v1.0.0-starter.6) (2020-04-06)


### Bug Fixes

* **deps:** update all non-major dependencies ([#10](https://github.com/ecomplus/application-starter/issues/10)) ([b3c65e5](https://github.com/ecomplus/application-starter/commit/b3c65e5c7eb89a4825eb47c852ce65293d172314))
* **deps:** update all non-major dependencies ([#13](https://github.com/ecomplus/application-starter/issues/13)) ([33ff19b](https://github.com/ecomplus/application-starter/commit/33ff19bbdad1f34b6d1c255089dc0a0e4092b955))
* **deps:** update all non-major dependencies ([#8](https://github.com/ecomplus/application-starter/issues/8)) ([feba5b9](https://github.com/ecomplus/application-starter/commit/feba5b9cdc54e8304beff2b12658a6343ef37569))
* **deps:** update dependency firebase-functions to ^3.6.0 ([#15](https://github.com/ecomplus/application-starter/issues/15)) ([5f7f0a2](https://github.com/ecomplus/application-starter/commit/5f7f0a2bf5c744000996e2a0b78690b363462ee7))
* **deps:** update dependency firebase-tools to ^7.16.1 ([#14](https://github.com/ecomplus/application-starter/issues/14)) ([b8e4798](https://github.com/ecomplus/application-starter/commit/b8e479851bd02bf5929a7df8a71a761f1c1c1654))
* **deps:** update dependency firebase-tools to v8 ([#16](https://github.com/ecomplus/application-starter/issues/16)) ([b72560e](https://github.com/ecomplus/application-starter/commit/b72560e4fc86496499d553e47094ace25436272b))
* **ecom-modules:** fix parsing mod names to filenames and vice versa ([99c185a](https://github.com/ecomplus/application-starter/commit/99c185afebeae77deb61537ed9de1c77132c16ce))

## [1.0.0-starter.5](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.4...v1.0.0-starter.5) (2020-03-05)


### Features

* **market-publication:** handle full featured app publication to Market ([28379dc](https://github.com/ecomplus/application-starter/commit/28379dc3c4784e757c8f25e5d737f6143682b0db))
* **static:** handle static with server app files from public folder ([827d000](https://github.com/ecomplus/application-starter/commit/827d00079b0dc169b2eef31b8e0ac73c596307a8))

## [1.0.0-starter.4](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.3...v1.0.0-starter.4) (2020-02-21)


### Features

* **calculate-shipping:** basic setup for calculate shipping module ([db77595](https://github.com/ecomplus/application-starter/commit/db7759514bb25d151dd4508fb96b84c52b3e94ba))


### Bug Fixes

* **home:** fix replace accets regex exps to generate slug from title ([198cc0b](https://github.com/ecomplus/application-starter/commit/198cc0b911d4874d96f3cd5254d30cab5fe89765))
* **home:** gen slug from pkg name or app title if not set or default ([25c20bf](https://github.com/ecomplus/application-starter/commit/25c20bfade65a86e4f4b1026ef59a5694a022a74))

## [1.0.0-starter.3](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.2...v1.0.0-starter.3) (2020-02-21)

## [1.0.0-starter.2](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.1...v1.0.0-starter.2) (2020-02-21)


### Bug Fixes

* **config:** stop reading app from functions config ([7b9aab7](https://github.com/ecomplus/application-starter/commit/7b9aab727fefe8a5b84695e90a0d68e02b8c3f62))

## [1.0.0-starter.1](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.0...v1.0.0-starter.1) (2020-02-20)


### Features

* **get-auth:** endpoint to return auth id and token for external usage ([40a8ae2](https://github.com/ecomplus/application-starter/commit/40a8ae2e895d6e32c7032ca500040ec82c80dc5d))
* **server:** also supporting passing Store Id from query ([111f3a7](https://github.com/ecomplus/application-starter/commit/111f3a716fbfd2e155e3fb24242bddcae7cb065c))


### Bug Fixes

* **server:** remove 'routes' path when setting filename for routes ([119524c](https://github.com/ecomplus/application-starter/commit/119524c523a11364ed912769637a6f8e479af5f1))

## [1.0.0-starter.0](https://github.com/ecomplus/application-starter/compare/v0.1.1...v1.0.0-starter.0) (2020-02-18)


### Features

* **router:** recursive read routes dir to auto setup server routes ([ff2b456](https://github.com/ecomplus/application-starter/commit/ff2b45604723a8146c9481ea36a9400da5ccc2bc))


### Bug Fixes

* **home:** fix semver on for app.version (remove version tag if any) ([ad36461](https://github.com/ecomplus/application-starter/commit/ad364614a7f5599850ad39e00a94d310742e8f80))
* **middlewares:** update route files exports (named exports by methods) ([6a22e67](https://github.com/ecomplus/application-starter/commit/6a22e67135bc6110e6da6b4ab25f67ad8d77f597))

### [0.1.1](https://github.com/ecomplus/application-starter/compare/v0.1.0...v0.1.1) (2020-02-18)


### Features

* **env:** get 'pkg' from functions config ([bf45ec3](https://github.com/ecomplus/application-starter/commit/bf45ec33a2147d5be91fdc4955bd6cfa1b0867e2))
* **home:** set version and slug from root package, fix with uris ([d4b61fa](https://github.com/ecomplus/application-starter/commit/d4b61fab427aefdb2ac485d90eb1abe15d6aafc6))


### Bug Fixes

* **env:** firebase doesnt uppercase config ([502185e](https://github.com/ecomplus/application-starter/commit/502185ed30f346d8db77b849d6ba0eb48cb777cb))
* **require:** update @ecomplus/application-sdk dependency name ([d4174ac](https://github.com/ecomplus/application-starter/commit/d4174ac5425b85590db0e92d4b1d69a8567a6c55))

## [0.1.0](https://github.com/ecomplus/application-starter/compare/v0.0.4...v0.1.0) (2020-02-17)

### [0.0.4](https://github.com/ecomclub/firebase-app-boilerplate/compare/v0.0.3...v0.0.4) (2020-02-16)


### Bug Fixes

* **server:** update routes names (refresh-tokens) ([79a2910](https://github.com/ecomclub/firebase-app-boilerplate/commit/79a2910817cf4193b40e02b2b1e6b920e7fefb2d))

### [0.0.3](https://github.com/ecomclub/express-app-boilerplate/compare/v0.0.2...v0.0.3) (2020-02-15)


### Features

* **server:** start reading env options, handle operator token ([ce107b7](https://github.com/ecomclub/express-app-boilerplate/commit/ce107b74cde375e875a85cc3ba0cc6a73740785d))
* **update-tokens:** adding route to start update tokens service (no content) ([20c62ec](https://github.com/ecomclub/express-app-boilerplate/commit/20c62ec6800fc326b89e8cf54b2916f56e5910e4))


### Bug Fixes

* **auth-callback:** fix handling docRef (desn't need to get by id again) ([629ca5a](https://github.com/ecomclub/express-app-boilerplate/commit/629ca5ab9849e3822cc190f423da5bf2e0c4daab))
* **auth-callback:** save procedures if not new, check and set 'settep_up' ([#3](https://github.com/ecomclub/express-app-boilerplate/issues/3)) ([4a01f86](https://github.com/ecomclub/express-app-boilerplate/commit/4a01f86c37e09cd7c0363f6fbc80de6eeef3ba20))
* **ECOM_AUTH_UPDATE_INTERVAL:** disable set interval (no daemons on cloud functions) ([2aa2442](https://github.com/ecomclub/express-app-boilerplate/commit/2aa2442061f0308be9eb9430552fa04ad148788c))
* **env:** fixed to get appInfor variable ([e9b1a3c](https://github.com/ecomclub/express-app-boilerplate/commit/e9b1a3ce0d17ee74a5eada70589340fd5a70e786))
* **env:** fixed to get appInfor variable ([22687e2](https://github.com/ecomclub/express-app-boilerplate/commit/22687e25f611d49f8c01494af114e0289cec251e))
* **middleware:** check standard http headers for client ip ([5045113](https://github.com/ecomclub/express-app-boilerplate/commit/504511329afe9277d540f0f542a316d04634ce9e))

### 0.0.2 (2020-02-11)


### Bug Fixes

* **lib:** remove unecessary/incorrect requires with new deps ([69f2b77](https://github.com/ecomclub/express-app-boilerplate/commit/69f2b77))
* **routes:** fix handling appSdk (param) ([0cf2dde](https://github.com/ecomclub/express-app-boilerplate/commit/0cf2dde))
* **setup:** added initializeApp() to firebase admin ([e941e59](https://github.com/ecomclub/express-app-boilerplate/commit/e941e59))
* **setup:** manually setup ecomplus-app-sdk with firestore ([64e49f8](https://github.com/ecomclub/express-app-boilerplate/commit/64e49f8))
* **setup:** manually setup ecomplus-app-sdk with firestore ([c718bd0](https://github.com/ecomclub/express-app-boilerplate/commit/c718bd0))
* **setup:** manually setup ecomplus-app-sdk with firestore ([33909bf](https://github.com/ecomclub/express-app-boilerplate/commit/33909bf)), closes [/github.com/ecomclub/ecomplus-app-sdk/blob/master/main.js#L45](https://github.com/ecomclub//github.com/ecomclub/ecomplus-app-sdk/blob/master/main.js/issues/L45)
* **startup:** setup routes after appSdk ready, add home route ([d182555](https://github.com/ecomclub/express-app-boilerplate/commit/d182555))


### Features

* **firestore-app-boilerplate:** Initial commit ([c9963f0](https://github.com/ecomclub/express-app-boilerplate/commit/c9963f0))
* **firestore-app-boilerplate:** Initial commit ([be493ea](https://github.com/ecomclub/express-app-boilerplate/commit/be493ea))
* **firestore-support:** minor changes ([3718cba](https://github.com/ecomclub/express-app-boilerplate/commit/3718cba))
* **firestore-support:** refactoring to  use saveProcedures function ([62971ef](https://github.com/ecomclub/express-app-boilerplate/commit/62971ef))
* **firestore-support:** removed sqlite error clausule ([2d47996](https://github.com/ecomclub/express-app-boilerplate/commit/2d47996))
* **routes:** add home route (app json) ([42a3f2b](https://github.com/ecomclub/express-app-boilerplate/commit/42a3f2b))

# [LEGACY] Express App Boilerplate

### [0.1.1](https://github.com/ecomclub/express-app-boilerplate/compare/v0.1.0...v0.1.1) (2019-07-31)


### Bug Fixes

* **procedures:** fix checking for procedures array to run configureSetup ([1371cdc](https://github.com/ecomclub/express-app-boilerplate/commit/1371cdc))

## [0.1.0](https://github.com/ecomclub/express-app-boilerplate/compare/v0.0.2...v0.1.0) (2019-07-31)

### 0.0.2 (2019-07-31)


### Bug Fixes

* chain promise catch on lib getConfig ([281abf9](https://github.com/ecomclub/express-app-boilerplate/commit/281abf9))
* fix mergin hidden data to config ([8b64d58](https://github.com/ecomclub/express-app-boilerplate/commit/8b64d58))
* fix path to require 'get-config' from lib ([11425b0](https://github.com/ecomclub/express-app-boilerplate/commit/11425b0))
* get storeId from header and set on req object ([a3bebaa](https://github.com/ecomclub/express-app-boilerplate/commit/a3bebaa))
* handle error on get config instead of directly debug ([f182589](https://github.com/ecomclub/express-app-boilerplate/commit/f182589))
* routes common fixes ([2758a57](https://github.com/ecomclub/express-app-boilerplate/commit/2758a57))
* using req.url (from http module) instead of req.baseUrl ([d9057ca](https://github.com/ecomclub/express-app-boilerplate/commit/d9057ca))


### Features

* authentication callback ([8f18892](https://github.com/ecomclub/express-app-boilerplate/commit/8f18892))
* conventional store api error handling ([bcde87e](https://github.com/ecomclub/express-app-boilerplate/commit/bcde87e))
* function to get app config from data and hidden data ([ba470f5](https://github.com/ecomclub/express-app-boilerplate/commit/ba470f5))
* getting store id from web.js ([72f18c6](https://github.com/ecomclub/express-app-boilerplate/commit/72f18c6))
* handling E-Com Plus webhooks ([63ba19f](https://github.com/ecomclub/express-app-boilerplate/commit/63ba19f))
* main js file including bin web and local ([6b8a71a](https://github.com/ecomclub/express-app-boilerplate/commit/6b8a71a))
* pre-validate body for ecom modules endpoints ([f06bdb0](https://github.com/ecomclub/express-app-boilerplate/commit/f06bdb0))
* setup app package dependencies and main.js ([b2826ed](https://github.com/ecomclub/express-app-boilerplate/commit/b2826ed))
* setup base app.json ([015599a](https://github.com/ecomclub/express-app-boilerplate/commit/015599a))
* setup daemon processes, configure store setup ([db3ca8c](https://github.com/ecomclub/express-app-boilerplate/commit/db3ca8c))
* setup procedures object ([c5e8627](https://github.com/ecomclub/express-app-boilerplate/commit/c5e8627))
* setup web app with express ([d128430](https://github.com/ecomclub/express-app-boilerplate/commit/d128430))
