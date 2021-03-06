angular.module('Common')
    .value('RemoteServiceBase','api/v1/')
    .constant('WEB_ROOTS',{
        PROTOCOL:'http'
        , "MAIN": "127.0.0.1"
        , "PORT": "8890"
        , "TOMCAT": "http://127.0.0.1:8080/birt"
    })
    .factory("DataService", ['$http','$state','RemoteServiceBase',
        function ($http,$state,RemoteServiceBase) { // This service connects to our REST API
            var service = {};
            service.get = function (q, config) {
                return $http.get(RemoteServiceBase + q, config).then(function (results) {
                    if(results.data.message == -110011){
                        $state.go('login');
                    }
                    return results;
                });
            };
            service.post = function (q, object, config) {
                return $http.post(RemoteServiceBase + q, object, config).then(function (results) {
                    if(results.data.message == -110011){
                        $state.go('login');
                    }
                    return results;
                });
            };
            service.put = function (q, object) {
                return $http.put(RemoteServiceBase + q, object).then(function (results) {
                    if(results.data.message == -110011){
                        $state.go('login');
                    }
                    return results;
                });
            };
            service.delete = function (q) {
                return $http.delete(RemoteServiceBase + q).then(function (results) {
                    if(results.data.message == -110011){
                        $state.go('login');
                    }
                    return results;
                });
            };

            return service;
        }])
    .factory("rptService", ['$http','$state','RemoteServiceBase',
        function ($http,$state,RemoteServiceBase) { // This service connects to our REST API
            var service = {};

            service.ge
            return service;
        }])
    .factory('ImportExportToExcel',
        function($log, $rootScope) {
            return {
                importFromExcel: function (event) {
                    if (event.target.files.length == 0) {
                        return false;
                    }
                    alasql('SELECT * FROM FILE(?,{headers:true})', [event.originalEvent], function (data) {
                        $rootScope.$broadcast('import-excel-data', data);
                    });
                },
                exportToExcel: function (fileName, targetData) {
                    if (!angular.isArray(targetData)) {
                        $log.error('Can not export error type data to excel.');
                        return;
                    }
                    alasql('SELECT * INTO XLSX("' + fileName + '.xlsx",{headers:true}) FROM ?', [targetData]);
                }
            }
        })
    .factory('CommonServices', ['$location', 'DataService'
        , function($location, DataService){
            var Service = {};
            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

            Service.GetFormChanges = function(original, edited){
                var diff = {}
                for(var key in original){
                    if(original[key] !== edited[key])
                        diff[key] = edited[key];
                }
                return diff;
            };
            Service.genRpt = function(options){
                return $location.protocol()+'://'+$location.host()+($location.port() ==80?'':':'+$location.port());
            }
            Service.getLOVs = function(data){
                return DataService.post('inboundService', data).then(function(results) {
                    return results ;
                });
            }
            Service.createRand = function(strLn) {
                strLn = strLn || 8;
                return Math.random().toString(36).substr(2,strLn);
            };
            Service.fmtNum = function(num, opts) {
                /**
                 * formatMoney(num, opts) : Format number
                 *
                 * @param Number num: The number to formaat
                 * @param object {}: can have the following options
                 *      curr    : In case it is a money value, the currency symbol to use
                 *      dp      : Decimal places
                 *      point   : The character to use for decimal point.....default "."
                 *      comma   : Character to use as seperator......default ","
                 */
                c = isNaN(opts.dp = Math.abs(opts.dp)) ? 2 : opts.dp,
                d = opts.point == undefined ? "." : opts.point,
                t = opts.comma == undefined ? "," : opts.comma,
                s = num < 0 ? "-" : "",
                i = String(parseInt(num = Math.abs(Number(num) || 0).toFixed(c))),
                j = (j = i.length) > 3 ? j % 3 : 0;
                return ((opts.curr)? opts.curr + " " :'') + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(num - i).toFixed(c).slice(2) : "");
            };
            /**
             * Query to check
             * SELECT q.quote_id,q.rfq_no,p.name,CONCAT(LEFT(q.subject , 30),IF(LENGTH(q.subject)>30, "…", "")) subject
             ,CONCAT(u.lastname,", ",u.middlename," ",u.firstname)enteredBy
             , (CASE WHEN SUM(qd.tq)>0 AND SUM(qd.submitted) >0 AND (SUM(qd.tq)+ SUM(qd.submitted))<COUNT(qd.Quote_quote_Id) THEN 'Partially Submitted'
             WHEN SUM(qd.tq)>0 THEN 'TQ on line Item'
             ELSE qs.name END) status
             ,COUNT(qd.Quote_quote_Id) totalQuotes, CONCAT("quantity:",qd.quantity,"unitprice:",qd.unitprice) showPrint
             ,DATEDIFF(q.duedate,NOW())remDays,q.entrydate, SUM(qd.submitted), SUM(qd.tq)
             FROM Quote q
             JOIN  Party p ON q.Party_Party_Id=p.Party_Id
             JOIN  QuoteStatus qs ON q.Quote_Status_Id=qs.QuoteStatus_Id
             JOIN  Users u ON q.quote_enteredBy_id=u.user_id
             LEFT JOIN QuoteDetail qd ON q.quote_Id=qd.Quote_quote_Id
             WHERE q.Party_Party_Id = 20161317
             GROUP BY q.quote_Id having SUM(qd.tq)>0 AND SUM(qd.submitted) >0
             */

            Service.postData = {
                "transactionEventType"   : "Query",
                "factName": "Party",
                "transactionMetaData" :{
                    "currentLocale" : "NG",
                    "currentRole"	: "SUPPORT_ADMIN",
                    "pageno"       : "0",
                    "itemsPerPage"    : "30",
                    "queryStore"     : "MySql",
                    "responseDataProperties" : "",
                    "sortingProperties"     : "",
                    "queryMetaData" : {
                        "queryClause":{
                            "andExpression":[],
                            "orExpression":[]
                        }
                    },
                    "groupingProperties" : {
                        "by":"",
                        "having":[]
                    }
                }
            };
            Service._buildMenu = function(data, options) {
                options = options || {};
                var ID_KEY = options.idKey || 'id';
                var PARENT_KEY = options.parentKey || 'parent';
                var CHILDREN_KEY = options.childrenKey || 'children';

                var tree = [],
                    childrenOf = {};
                var item, id, parentId;

                for (var i = 0, length = data.length; i < length; i++) {
                    item = data[i];
                    id = item[ID_KEY];
                    parentId = item[PARENT_KEY] || 0;
                    // every item may have children
                    childrenOf[id] = childrenOf[id] || [];
                    // init its children
                    item[CHILDREN_KEY] = childrenOf[id];
                    if (parentId != 0) {
                        // init its parent's children object
                        childrenOf[parentId] = childrenOf[parentId] || [];
                        // push it into its parent's children object
                        childrenOf[parentId].push(item);
                    } else {
                        tree.push(item);
                    }
                };
                return tree;
            }
            Service.base64Encode = function(input){
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            };
            Service.base64Decode = function(input){
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }

            Service._utf8_encode=function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t};
            Service._utf8_decode=function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t};

            Service.md5Hash = function(str) {
                if (null === str) {
                    return null;
                }
                var xl;
                var rotateLeft = function(lValue, iShiftBits) {
                    return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
                };
                var addUnsigned = function(lX, lY) {
                    var lX4, lY4, lX8, lY8, lResult;
                    lX8 = lX & 2147483648;
                    lY8 = lY & 2147483648;
                    lX4 = lX & 1073741824;
                    lY4 = lY & 1073741824;
                    lResult = (lX & 1073741823) + (lY & 1073741823);
                    if (lX4 & lY4) {
                        return lResult ^ 2147483648 ^ lX8 ^ lY8;
                    }
                    if (lX4 | lY4) {
                        if (lResult & 1073741824) {
                            return lResult ^ 3221225472 ^ lX8 ^ lY8;
                        } else {
                            return lResult ^ 1073741824 ^ lX8 ^ lY8;
                        }
                    } else {
                        return lResult ^ lX8 ^ lY8;
                    }
                };
                var _F = function(x, y, z) {
                    return x & y | ~x & z;
                };
                var _G = function(x, y, z) {
                    return x & z | y & ~z;
                };
                var _H = function(x, y, z) {
                    return x ^ y ^ z;
                };
                var _I = function(x, y, z) {
                    return y ^ (x | ~z);
                };
                var _FF = function(a, b, c, d, x, s, ac) {
                    a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
                    return addUnsigned(rotateLeft(a, s), b);
                };
                var _GG = function(a, b, c, d, x, s, ac) {
                    a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
                    return addUnsigned(rotateLeft(a, s), b);
                };
                var _HH = function(a, b, c, d, x, s, ac) {
                    a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
                    return addUnsigned(rotateLeft(a, s), b);
                };
                var _II = function(a, b, c, d, x, s, ac) {
                    a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
                    return addUnsigned(rotateLeft(a, s), b);
                };
                var convertToWordArray = function(str) {
                    var lWordCount;
                    var lMessageLength = str.length;
                    var lNumberOfWords_temp1 = lMessageLength + 8;
                    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64;
                    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
                    var lWordArray = new Array(lNumberOfWords - 1);
                    var lBytePosition = 0;
                    var lByteCount = 0;
                    while (lByteCount < lMessageLength) {
                        lWordCount = (lByteCount - lByteCount % 4) / 4;
                        lBytePosition = lByteCount % 4 * 8;
                        lWordArray[lWordCount] = lWordArray[lWordCount] | str.charCodeAt(lByteCount) << lBytePosition;
                        lByteCount++;
                    }
                    lWordCount = (lByteCount - lByteCount % 4) / 4;
                    lBytePosition = lByteCount % 4 * 8;
                    lWordArray[lWordCount] = lWordArray[lWordCount] | 128 << lBytePosition;
                    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                    return lWordArray;
                };
                var wordToHex = function(lValue) {
                    var wordToHexValue = "", wordToHexValue_temp = "", lByte, lCount;
                    for (lCount = 0; lCount <= 3; lCount++) {
                        lByte = lValue >>> lCount * 8 & 255;
                        wordToHexValue_temp = "0" + lByte.toString(16);
                        wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
                    }
                    return wordToHexValue;
                };
                var x = [], k, AA, BB, CC, DD, a, b, c, d, S11 = 7, S12 = 12, S13 = 17, S14 = 22, S21 = 5, S22 = 9, S23 = 14, S24 = 20, S31 = 4, S32 = 11, S33 = 16, S34 = 23, S41 = 6, S42 = 10, S43 = 15, S44 = 21;
                x = convertToWordArray(str);
                a = 1732584193;
                b = 4023233417;
                c = 2562383102;
                d = 271733878;
                xl = x.length;
                for (k = 0; k < xl; k += 16) {
                    AA = a;
                    BB = b;
                    CC = c;
                    DD = d;
                    a = _FF(a, b, c, d, x[k + 0], S11, 3614090360);
                    d = _FF(d, a, b, c, x[k + 1], S12, 3905402710);
                    c = _FF(c, d, a, b, x[k + 2], S13, 606105819);
                    b = _FF(b, c, d, a, x[k + 3], S14, 3250441966);
                    a = _FF(a, b, c, d, x[k + 4], S11, 4118548399);
                    d = _FF(d, a, b, c, x[k + 5], S12, 1200080426);
                    c = _FF(c, d, a, b, x[k + 6], S13, 2821735955);
                    b = _FF(b, c, d, a, x[k + 7], S14, 4249261313);
                    a = _FF(a, b, c, d, x[k + 8], S11, 1770035416);
                    d = _FF(d, a, b, c, x[k + 9], S12, 2336552879);
                    c = _FF(c, d, a, b, x[k + 10], S13, 4294925233);
                    b = _FF(b, c, d, a, x[k + 11], S14, 2304563134);
                    a = _FF(a, b, c, d, x[k + 12], S11, 1804603682);
                    d = _FF(d, a, b, c, x[k + 13], S12, 4254626195);
                    c = _FF(c, d, a, b, x[k + 14], S13, 2792965006);
                    b = _FF(b, c, d, a, x[k + 15], S14, 1236535329);
                    a = _GG(a, b, c, d, x[k + 1], S21, 4129170786);
                    d = _GG(d, a, b, c, x[k + 6], S22, 3225465664);
                    c = _GG(c, d, a, b, x[k + 11], S23, 643717713);
                    b = _GG(b, c, d, a, x[k + 0], S24, 3921069994);
                    a = _GG(a, b, c, d, x[k + 5], S21, 3593408605);
                    d = _GG(d, a, b, c, x[k + 10], S22, 38016083);
                    c = _GG(c, d, a, b, x[k + 15], S23, 3634488961);
                    b = _GG(b, c, d, a, x[k + 4], S24, 3889429448);
                    a = _GG(a, b, c, d, x[k + 9], S21, 568446438);
                    d = _GG(d, a, b, c, x[k + 14], S22, 3275163606);
                    c = _GG(c, d, a, b, x[k + 3], S23, 4107603335);
                    b = _GG(b, c, d, a, x[k + 8], S24, 1163531501);
                    a = _GG(a, b, c, d, x[k + 13], S21, 2850285829);
                    d = _GG(d, a, b, c, x[k + 2], S22, 4243563512);
                    c = _GG(c, d, a, b, x[k + 7], S23, 1735328473);
                    b = _GG(b, c, d, a, x[k + 12], S24, 2368359562);
                    a = _HH(a, b, c, d, x[k + 5], S31, 4294588738);
                    d = _HH(d, a, b, c, x[k + 8], S32, 2272392833);
                    c = _HH(c, d, a, b, x[k + 11], S33, 1839030562);
                    b = _HH(b, c, d, a, x[k + 14], S34, 4259657740);
                    a = _HH(a, b, c, d, x[k + 1], S31, 2763975236);
                    d = _HH(d, a, b, c, x[k + 4], S32, 1272893353);
                    c = _HH(c, d, a, b, x[k + 7], S33, 4139469664);
                    b = _HH(b, c, d, a, x[k + 10], S34, 3200236656);
                    a = _HH(a, b, c, d, x[k + 13], S31, 681279174);
                    d = _HH(d, a, b, c, x[k + 0], S32, 3936430074);
                    c = _HH(c, d, a, b, x[k + 3], S33, 3572445317);
                    b = _HH(b, c, d, a, x[k + 6], S34, 76029189);
                    a = _HH(a, b, c, d, x[k + 9], S31, 3654602809);
                    d = _HH(d, a, b, c, x[k + 12], S32, 3873151461);
                    c = _HH(c, d, a, b, x[k + 15], S33, 530742520);
                    b = _HH(b, c, d, a, x[k + 2], S34, 3299628645);
                    a = _II(a, b, c, d, x[k + 0], S41, 4096336452);
                    d = _II(d, a, b, c, x[k + 7], S42, 1126891415);
                    c = _II(c, d, a, b, x[k + 14], S43, 2878612391);
                    b = _II(b, c, d, a, x[k + 5], S44, 4237533241);
                    a = _II(a, b, c, d, x[k + 12], S41, 1700485571);
                    d = _II(d, a, b, c, x[k + 3], S42, 2399980690);
                    c = _II(c, d, a, b, x[k + 10], S43, 4293915773);
                    b = _II(b, c, d, a, x[k + 1], S44, 2240044497);
                    a = _II(a, b, c, d, x[k + 8], S41, 1873313359);
                    d = _II(d, a, b, c, x[k + 15], S42, 4264355552);
                    c = _II(c, d, a, b, x[k + 6], S43, 2734768916);
                    b = _II(b, c, d, a, x[k + 13], S44, 1309151649);
                    a = _II(a, b, c, d, x[k + 4], S41, 4149444226);
                    d = _II(d, a, b, c, x[k + 11], S42, 3174756917);
                    c = _II(c, d, a, b, x[k + 2], S43, 718787259);
                    b = _II(b, c, d, a, x[k + 9], S44, 3951481745);
                    a = addUnsigned(a, AA);
                    b = addUnsigned(b, BB);
                    c = addUnsigned(c, CC);
                    d = addUnsigned(d, DD);
                }
                var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
                return temp.toLowerCase();
            }
            return Service;
    }])