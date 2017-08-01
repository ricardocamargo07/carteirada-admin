/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) { 

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
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

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.5
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.5
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.5'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.5
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.5'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.5
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.5'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.5
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.5'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.5
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.5'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.5'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.5
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.5'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.5
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.5'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.5
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.5'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.5
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.5'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.5
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.5'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/**
 * bootbox.js [v4.4.0]
 *
 * http://bootboxjs.com/license.txt
 */

// @see https://github.com/makeusabrew/bootbox/issues/180
// @see https://github.com/makeusabrew/bootbox/issues/186
(function (root, factory) {

  "use strict";
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    // Browser globals (root is window)
    root.bootbox = factory(root.jQuery);
  }

}(this, function init($, undefined) {

  "use strict";

  // the base DOM structure needed to create a modal
  var templates = {
    dialog:
      "<div class='bootbox modal' tabindex='-1' role='dialog'>" +
        "<div class='modal-dialog'>" +
          "<div class='modal-content'>" +
            "<div class='modal-body'><div class='bootbox-body'></div></div>" +
          "</div>" +
        "</div>" +
      "</div>",
    header:
      "<div class='modal-header'>" +
        "<h4 class='modal-title'></h4>" +
      "</div>",
    footer:
      "<div class='modal-footer'></div>",
    closeButton:
      "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
    form:
      "<form class='bootbox-form'></form>",
    inputs: {
      text:
        "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
      textarea:
        "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
      email:
        "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
      select:
        "<select class='bootbox-input bootbox-input-select form-control'></select>",
      checkbox:
        "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
      date:
        "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
      time:
        "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
      number:
        "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
      password:
        "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
    }
  };

  var defaults = {
    // default language
    locale: "en",
    // show backdrop or not. Default to static so user has to interact with dialog
    backdrop: "static",
    // animate the modal in/out
    animate: true,
    // additional class string applied to the top level dialog
    className: null,
    // whether or not to include a close button
    closeButton: true,
    // show the dialog immediately by default
    show: true,
    // dialog container
    container: "body"
  };

  // our public object; augmented after our private API
  var exports = {};

  /**
   * @private
   */
  function _t(key) {
    var locale = locales[defaults.locale];
    return locale ? locale[key] : locales.en[key];
  }

  function processCallback(e, dialog, callback) {
    e.stopPropagation();
    e.preventDefault();

    // by default we assume a callback will get rid of the dialog,
    // although it is given the opportunity to override this

    // so, if the callback can be invoked and it *explicitly returns false*
    // then we'll set a flag to keep the dialog active...
    var preserveDialog = $.isFunction(callback) && callback.call(dialog, e) === false;

    // ... otherwise we'll bin it
    if (!preserveDialog) {
      dialog.modal("hide");
    }
  }

  function getKeyLength(obj) {
    // @TODO defer to Object.keys(x).length if available?
    var k, t = 0;
    for (k in obj) {
      t ++;
    }
    return t;
  }

  function each(collection, iterator) {
    var index = 0;
    $.each(collection, function(key, value) {
      iterator(key, value, index++);
    });
  }

  function sanitize(options) {
    var buttons;
    var total;

    if (typeof options !== "object") {
      throw new Error("Please supply an object of options");
    }

    if (!options.message) {
      throw new Error("Please specify a message");
    }

    // make sure any supplied options take precedence over defaults
    options = $.extend({}, defaults, options);

    if (!options.buttons) {
      options.buttons = {};
    }

    buttons = options.buttons;

    total = getKeyLength(buttons);

    each(buttons, function(key, button, index) {

      if ($.isFunction(button)) {
        // short form, assume value is our callback. Since button
        // isn't an object it isn't a reference either so re-assign it
        button = buttons[key] = {
          callback: button
        };
      }

      // before any further checks make sure by now button is the correct type
      if ($.type(button) !== "object") {
        throw new Error("button with key " + key + " must be an object");
      }

      if (!button.label) {
        // the lack of an explicit label means we'll assume the key is good enough
        button.label = key;
      }

      if (!button.className) {
        if (total <= 2 && index === total-1) {
          // always add a primary to the main option in a two-button dialog
          button.className = "btn-primary";
        } else {
          button.className = "btn-default";
        }
      }
    });

    return options;
  }

  /**
   * map a flexible set of arguments into a single returned object
   * if args.length is already one just return it, otherwise
   * use the properties argument to map the unnamed args to
   * object properties
   * so in the latter case:
   * mapArguments(["foo", $.noop], ["message", "callback"])
   * -> { message: "foo", callback: $.noop }
   */
  function mapArguments(args, properties) {
    var argn = args.length;
    var options = {};

    if (argn < 1 || argn > 2) {
      throw new Error("Invalid argument length");
    }

    if (argn === 2 || typeof args[0] === "string") {
      options[properties[0]] = args[0];
      options[properties[1]] = args[1];
    } else {
      options = args[0];
    }

    return options;
  }

  /**
   * merge a set of default dialog options with user supplied arguments
   */
  function mergeArguments(defaults, args, properties) {
    return $.extend(
      // deep merge
      true,
      // ensure the target is an empty, unreferenced object
      {},
      // the base options object for this type of dialog (often just buttons)
      defaults,
      // args could be an object or array; if it's an array properties will
      // map it to a proper options object
      mapArguments(
        args,
        properties
      )
    );
  }

  /**
   * this entry-level method makes heavy use of composition to take a simple
   * range of inputs and return valid options suitable for passing to bootbox.dialog
   */
  function mergeDialogOptions(className, labels, properties, args) {
    //  build up a base set of dialog properties
    var baseOptions = {
      className: "bootbox-" + className,
      buttons: createLabels.apply(null, labels)
    };

    // ensure the buttons properties generated, *after* merging
    // with user args are still valid against the supplied labels
    return validateButtons(
      // merge the generated base properties with user supplied arguments
      mergeArguments(
        baseOptions,
        args,
        // if args.length > 1, properties specify how each arg maps to an object key
        properties
      ),
      labels
    );
  }

  /**
   * from a given list of arguments return a suitable object of button labels
   * all this does is normalise the given labels and translate them where possible
   * e.g. "ok", "confirm" -> { ok: "OK, cancel: "Annuleren" }
   */
  function createLabels() {
    var buttons = {};

    for (var i = 0, j = arguments.length; i < j; i++) {
      var argument = arguments[i];
      var key = argument.toLowerCase();
      var value = argument.toUpperCase();

      buttons[key] = {
        label: _t(value)
      };
    }

    return buttons;
  }

  function validateButtons(options, buttons) {
    var allowedButtons = {};
    each(buttons, function(key, value) {
      allowedButtons[value] = true;
    });

    each(options.buttons, function(key) {
      if (allowedButtons[key] === undefined) {
        throw new Error("button key " + key + " is not allowed (options are " + buttons.join("\n") + ")");
      }
    });

    return options;
  }

  exports.alert = function() {
    var options;

    options = mergeDialogOptions("alert", ["ok"], ["message", "callback"], arguments);

    if (options.callback && !$.isFunction(options.callback)) {
      throw new Error("alert requires callback property to be a function when provided");
    }

    /**
     * overrides
     */
    options.buttons.ok.callback = options.onEscape = function() {
      if ($.isFunction(options.callback)) {
        return options.callback.call(this);
      }
      return true;
    };

    return exports.dialog(options);
  };

  exports.confirm = function() {
    var options;

    options = mergeDialogOptions("confirm", ["cancel", "confirm"], ["message", "callback"], arguments);

    /**
     * overrides; undo anything the user tried to set they shouldn't have
     */
    options.buttons.cancel.callback = options.onEscape = function() {
      return options.callback.call(this, false);
    };

    options.buttons.confirm.callback = function() {
      return options.callback.call(this, true);
    };

    // confirm specific validation
    if (!$.isFunction(options.callback)) {
      throw new Error("confirm requires a callback");
    }

    return exports.dialog(options);
  };

  exports.prompt = function() {
    var options;
    var defaults;
    var dialog;
    var form;
    var input;
    var shouldShow;
    var inputOptions;

    // we have to create our form first otherwise
    // its value is undefined when gearing up our options
    // @TODO this could be solved by allowing message to
    // be a function instead...
    form = $(templates.form);

    // prompt defaults are more complex than others in that
    // users can override more defaults
    // @TODO I don't like that prompt has to do a lot of heavy
    // lifting which mergeDialogOptions can *almost* support already
    // just because of 'value' and 'inputType' - can we refactor?
    defaults = {
      className: "bootbox-prompt",
      buttons: createLabels("cancel", "confirm"),
      value: "",
      inputType: "text"
    };

    options = validateButtons(
      mergeArguments(defaults, arguments, ["title", "callback"]),
      ["cancel", "confirm"]
    );

    // capture the user's show value; we always set this to false before
    // spawning the dialog to give us a chance to attach some handlers to
    // it, but we need to make sure we respect a preference not to show it
    shouldShow = (options.show === undefined) ? true : options.show;

    /**
     * overrides; undo anything the user tried to set they shouldn't have
     */
    options.message = form;

    options.buttons.cancel.callback = options.onEscape = function() {
      return options.callback.call(this, null);
    };

    options.buttons.confirm.callback = function() {
      var value;

      switch (options.inputType) {
        case "text":
        case "textarea":
        case "email":
        case "select":
        case "date":
        case "time":
        case "number":
        case "password":
          value = input.val();
          break;

        case "checkbox":
          var checkedItems = input.find("input:checked");

          // we assume that checkboxes are always multiple,
          // hence we default to an empty array
          value = [];

          each(checkedItems, function(_, item) {
            value.push($(item).val());
          });
          break;
      }

      return options.callback.call(this, value);
    };

    options.show = false;

    // prompt specific validation
    if (!options.title) {
      throw new Error("prompt requires a title");
    }

    if (!$.isFunction(options.callback)) {
      throw new Error("prompt requires a callback");
    }

    if (!templates.inputs[options.inputType]) {
      throw new Error("invalid prompt type");
    }

    // create the input based on the supplied type
    input = $(templates.inputs[options.inputType]);

    switch (options.inputType) {
      case "text":
      case "textarea":
      case "email":
      case "date":
      case "time":
      case "number":
      case "password":
        input.val(options.value);
        break;

      case "select":
        var groups = {};
        inputOptions = options.inputOptions || [];

        if (!$.isArray(inputOptions)) {
          throw new Error("Please pass an array of input options");
        }

        if (!inputOptions.length) {
          throw new Error("prompt with select requires options");
        }

        each(inputOptions, function(_, option) {

          // assume the element to attach to is the input...
          var elem = input;

          if (option.value === undefined || option.text === undefined) {
            throw new Error("given options in wrong format");
          }

          // ... but override that element if this option sits in a group

          if (option.group) {
            // initialise group if necessary
            if (!groups[option.group]) {
              groups[option.group] = $("<optgroup/>").attr("label", option.group);
            }

            elem = groups[option.group];
          }

          elem.append("<option value='" + option.value + "'>" + option.text + "</option>");
        });

        each(groups, function(_, group) {
          input.append(group);
        });

        // safe to set a select's value as per a normal input
        input.val(options.value);
        break;

      case "checkbox":
        var values   = $.isArray(options.value) ? options.value : [options.value];
        inputOptions = options.inputOptions || [];

        if (!inputOptions.length) {
          throw new Error("prompt with checkbox requires options");
        }

        if (!inputOptions[0].value || !inputOptions[0].text) {
          throw new Error("given options in wrong format");
        }

        // checkboxes have to nest within a containing element, so
        // they break the rules a bit and we end up re-assigning
        // our 'input' element to this container instead
        input = $("<div/>");

        each(inputOptions, function(_, option) {
          var checkbox = $(templates.inputs[options.inputType]);

          checkbox.find("input").attr("value", option.value);
          checkbox.find("label").append(option.text);

          // we've ensured values is an array so we can always iterate over it
          each(values, function(_, value) {
            if (value === option.value) {
              checkbox.find("input").prop("checked", true);
            }
          });

          input.append(checkbox);
        });
        break;
    }

    // @TODO provide an attributes option instead
    // and simply map that as keys: vals
    if (options.placeholder) {
      input.attr("placeholder", options.placeholder);
    }

    if (options.pattern) {
      input.attr("pattern", options.pattern);
    }

    if (options.maxlength) {
      input.attr("maxlength", options.maxlength);
    }

    // now place it in our form
    form.append(input);

    form.on("submit", function(e) {
      e.preventDefault();
      // Fix for SammyJS (or similar JS routing library) hijacking the form post.
      e.stopPropagation();
      // @TODO can we actually click *the* button object instead?
      // e.g. buttons.confirm.click() or similar
      dialog.find(".btn-primary").click();
    });

    dialog = exports.dialog(options);

    // clear the existing handler focusing the submit button...
    dialog.off("shown.bs.modal");

    // ...and replace it with one focusing our input, if possible
    dialog.on("shown.bs.modal", function() {
      // need the closure here since input isn't
      // an object otherwise
      input.focus();
    });

    if (shouldShow === true) {
      dialog.modal("show");
    }

    return dialog;
  };

  exports.dialog = function(options) {
    options = sanitize(options);

    var dialog = $(templates.dialog);
    var innerDialog = dialog.find(".modal-dialog");
    var body = dialog.find(".modal-body");
    var buttons = options.buttons;
    var buttonStr = "";
    var callbacks = {
      onEscape: options.onEscape
    };

    if ($.fn.modal === undefined) {
      throw new Error(
        "$.fn.modal is not defined; please double check you have included " +
        "the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ " +
        "for more details."
      );
    }

    each(buttons, function(key, button) {

      // @TODO I don't like this string appending to itself; bit dirty. Needs reworking
      // can we just build up button elements instead? slower but neater. Then button
      // can just become a template too
      buttonStr += "<button data-bb-handler='" + key + "' type='button' class='btn " + button.className + "'>" + button.label + "</button>";
      callbacks[key] = button.callback;
    });

    body.find(".bootbox-body").html(options.message);

    if (options.animate === true) {
      dialog.addClass("fade");
    }

    if (options.className) {
      dialog.addClass(options.className);
    }

    if (options.size === "large") {
      innerDialog.addClass("modal-lg");
    } else if (options.size === "small") {
      innerDialog.addClass("modal-sm");
    }

    if (options.title) {
      body.before(templates.header);
    }

    if (options.closeButton) {
      var closeButton = $(templates.closeButton);

      if (options.title) {
        dialog.find(".modal-header").prepend(closeButton);
      } else {
        closeButton.css("margin-top", "-10px").prependTo(body);
      }
    }

    if (options.title) {
      dialog.find(".modal-title").html(options.title);
    }

    if (buttonStr.length) {
      body.after(templates.footer);
      dialog.find(".modal-footer").html(buttonStr);
    }


    /**
     * Bootstrap event listeners; used handle extra
     * setup & teardown required after the underlying
     * modal has performed certain actions
     */

    dialog.on("hidden.bs.modal", function(e) {
      // ensure we don't accidentally intercept hidden events triggered
      // by children of the current dialog. We shouldn't anymore now BS
      // namespaces its events; but still worth doing
      if (e.target === this) {
        dialog.remove();
      }
    });

    /*
    dialog.on("show.bs.modal", function() {
      // sadly this doesn't work; show is called *just* before
      // the backdrop is added so we'd need a setTimeout hack or
      // otherwise... leaving in as would be nice
      if (options.backdrop) {
        dialog.next(".modal-backdrop").addClass("bootbox-backdrop");
      }
    });
    */

    dialog.on("shown.bs.modal", function() {
      dialog.find(".btn-primary:first").focus();
    });

    /**
     * Bootbox event listeners; experimental and may not last
     * just an attempt to decouple some behaviours from their
     * respective triggers
     */

    if (options.backdrop !== "static") {
      // A boolean true/false according to the Bootstrap docs
      // should show a dialog the user can dismiss by clicking on
      // the background.
      // We always only ever pass static/false to the actual
      // $.modal function because with `true` we can't trap
      // this event (the .modal-backdrop swallows it)
      // However, we still want to sort of respect true
      // and invoke the escape mechanism instead
      dialog.on("click.dismiss.bs.modal", function(e) {
        // @NOTE: the target varies in >= 3.3.x releases since the modal backdrop
        // moved *inside* the outer dialog rather than *alongside* it
        if (dialog.children(".modal-backdrop").length) {
          e.currentTarget = dialog.children(".modal-backdrop").get(0);
        }

        if (e.target !== e.currentTarget) {
          return;
        }

        dialog.trigger("escape.close.bb");
      });
    }

    dialog.on("escape.close.bb", function(e) {
      if (callbacks.onEscape) {
        processCallback(e, dialog, callbacks.onEscape);
      }
    });

    /**
     * Standard jQuery event listeners; used to handle user
     * interaction with our dialog
     */

    dialog.on("click", ".modal-footer button", function(e) {
      var callbackKey = $(this).data("bb-handler");

      processCallback(e, dialog, callbacks[callbackKey]);
    });

    dialog.on("click", ".bootbox-close-button", function(e) {
      // onEscape might be falsy but that's fine; the fact is
      // if the user has managed to click the close button we
      // have to close the dialog, callback or not
      processCallback(e, dialog, callbacks.onEscape);
    });

    dialog.on("keyup", function(e) {
      if (e.which === 27) {
        dialog.trigger("escape.close.bb");
      }
    });

    // the remainder of this method simply deals with adding our
    // dialogent to the DOM, augmenting it with Bootstrap's modal
    // functionality and then giving the resulting object back
    // to our caller

    $(options.container).append(dialog);

    dialog.modal({
      backdrop: options.backdrop ? "static": false,
      keyboard: false,
      show: false
    });

    if (options.show) {
      dialog.modal("show");
    }

    // @TODO should we return the raw element here or should
    // we wrap it in an object on which we can expose some neater
    // methods, e.g. var d = bootbox.alert(); d.hide(); instead
    // of d.modal("hide");

   /*
    function BBDialog(elem) {
      this.elem = elem;
    }

    BBDialog.prototype = {
      hide: function() {
        return this.elem.modal("hide");
      },
      show: function() {
        return this.elem.modal("show");
      }
    };
    */

    return dialog;

  };

  exports.setDefaults = function() {
    var values = {};

    if (arguments.length === 2) {
      // allow passing of single key/value...
      values[arguments[0]] = arguments[1];
    } else {
      // ... and as an object too
      values = arguments[0];
    }

    $.extend(defaults, values);
  };

  exports.hideAll = function() {
    $(".bootbox").modal("hide");

    return exports;
  };


  /**
   * standard locales. Please add more according to ISO 639-1 standard. Multiple language variants are
   * unlikely to be required. If this gets too large it can be split out into separate JS files.
   */
  var locales = {
    bg_BG : {
      OK      : "Ок",
      CANCEL  : "Отказ",
      CONFIRM : "Потвърждавам"
    },
    br : {
      OK      : "OK",
      CANCEL  : "Cancelar",
      CONFIRM : "Sim"
    },
    cs : {
      OK      : "OK",
      CANCEL  : "Zrušit",
      CONFIRM : "Potvrdit"
    },
    da : {
      OK      : "OK",
      CANCEL  : "Annuller",
      CONFIRM : "Accepter"
    },
    de : {
      OK      : "OK",
      CANCEL  : "Abbrechen",
      CONFIRM : "Akzeptieren"
    },
    el : {
      OK      : "Εντάξει",
      CANCEL  : "Ακύρωση",
      CONFIRM : "Επιβεβαίωση"
    },
    en : {
      OK      : "OK",
      CANCEL  : "Cancel",
      CONFIRM : "OK"
    },
    es : {
      OK      : "OK",
      CANCEL  : "Cancelar",
      CONFIRM : "Aceptar"
    },
    et : {
      OK      : "OK",
      CANCEL  : "Katkesta",
      CONFIRM : "OK"
    },
    fa : {
      OK      : "قبول",
      CANCEL  : "لغو",
      CONFIRM : "تایید"
    },
    fi : {
      OK      : "OK",
      CANCEL  : "Peruuta",
      CONFIRM : "OK"
    },
    fr : {
      OK      : "OK",
      CANCEL  : "Annuler",
      CONFIRM : "D'accord"
    },
    he : {
      OK      : "אישור",
      CANCEL  : "ביטול",
      CONFIRM : "אישור"
    },
    hu : {
      OK      : "OK",
      CANCEL  : "Mégsem",
      CONFIRM : "Megerősít"
    },
    hr : {
      OK      : "OK",
      CANCEL  : "Odustani",
      CONFIRM : "Potvrdi"
    },
    id : {
      OK      : "OK",
      CANCEL  : "Batal",
      CONFIRM : "OK"
    },
    it : {
      OK      : "OK",
      CANCEL  : "Annulla",
      CONFIRM : "Conferma"
    },
    ja : {
      OK      : "OK",
      CANCEL  : "キャンセル",
      CONFIRM : "確認"
    },
    lt : {
      OK      : "Gerai",
      CANCEL  : "Atšaukti",
      CONFIRM : "Patvirtinti"
    },
    lv : {
      OK      : "Labi",
      CANCEL  : "Atcelt",
      CONFIRM : "Apstiprināt"
    },
    nl : {
      OK      : "OK",
      CANCEL  : "Annuleren",
      CONFIRM : "Accepteren"
    },
    no : {
      OK      : "OK",
      CANCEL  : "Avbryt",
      CONFIRM : "OK"
    },
    pl : {
      OK      : "OK",
      CANCEL  : "Anuluj",
      CONFIRM : "Potwierdź"
    },
    pt : {
      OK      : "OK",
      CANCEL  : "Cancelar",
      CONFIRM : "Confirmar"
    },
    ru : {
      OK      : "OK",
      CANCEL  : "Отмена",
      CONFIRM : "Применить"
    },
    sq : {
      OK : "OK",
      CANCEL : "Anulo",
      CONFIRM : "Prano"
    },
    sv : {
      OK      : "OK",
      CANCEL  : "Avbryt",
      CONFIRM : "OK"
    },
    th : {
      OK      : "ตกลง",
      CANCEL  : "ยกเลิก",
      CONFIRM : "ยืนยัน"
    },
    tr : {
      OK      : "Tamam",
      CANCEL  : "İptal",
      CONFIRM : "Onayla"
    },
    zh_CN : {
      OK      : "OK",
      CANCEL  : "取消",
      CONFIRM : "确认"
    },
    zh_TW : {
      OK      : "OK",
      CANCEL  : "取消",
      CONFIRM : "確認"
    }
  };

  exports.addLocale = function(name, values) {
    $.each(["OK", "CANCEL", "CONFIRM"], function(_, v) {
      if (!values[v]) {
        throw new Error("Please supply a translation for '" + v + "'");
      }
    });

    locales[name] = {
      OK: values.OK,
      CANCEL: values.CANCEL,
      CONFIRM: values.CONFIRM
    };

    return exports;
  };

  exports.removeLocale = function(name) {
    delete locales[name];

    return exports;
  };

  exports.setLocale = function(name) {
    return exports.setDefaults("locale", name);
  };

  exports.init = function(_$) {
    return init(_$ || $);
  };

  return exports;
}));

/*! jQuery Address v${version} | (c) 2009, 2013 Rostislav Hristov | jquery.org/license */
(function ($) {

    $.address = (function () {

        var _trigger = function(name) {
               var e = $.extend($.Event(name), (function() {
                    var parameters = {},
                        parameterNames = $.address.parameterNames();
                    for (var i = 0, l = parameterNames.length; i < l; i++) {
                        parameters[parameterNames[i]] = $.address.parameter(parameterNames[i]);
                    }
                    return {
                        value: $.address.value(),
                        path: $.address.path(),
                        pathNames: $.address.pathNames(),
                        parameterNames: parameterNames,
                        parameters: parameters,
                        queryString: $.address.queryString()
                    };
                }).call($.address));
                $($.address).trigger(e);
                return e;
            },
            _array = function(obj) {
                return Array.prototype.slice.call(obj);
            },
            _bind = function(value, data, fn) {
                $().bind.apply($($.address), Array.prototype.slice.call(arguments));
                return $.address;
            },
            _unbind = function(value,  fn) {
                $().unbind.apply($($.address), Array.prototype.slice.call(arguments));
                return $.address;
            },
            _supportsState = function() {
                return (_h.pushState && _opts.state !== UNDEFINED);
            },
            _hrefState = function() {
                return ('/' + _l.pathname.replace(new RegExp(_opts.state), '') + 
                    _l.search + (_hrefHash() ? '#' + _hrefHash() : '')).replace(_re, '/');
            },
            _hrefHash = function() {
                var index = _l.href.indexOf('#');
                return index != -1 ? _l.href.substr(index + 1) : '';
            },
            _href = function() {
                return _supportsState() ? _hrefState() : _hrefHash();
            },
            _window = function() {
                try {
                    return top.document !== UNDEFINED && top.document.title !== UNDEFINED && top.jQuery !== UNDEFINED && 
                        top.jQuery.address !== UNDEFINED && top.jQuery.address.frames() !== false ? top : window;
                } catch (e) { 
                    return window;
                }
            },
            _js = function() {
                return 'javascript';
            },
            _strict = function(value) {
                value = value.toString();
                return (_opts.strict && value.substr(0, 1) != '/' ? '/' : '') + value;
            },
            _cssint = function(el, value) {
                return parseInt(el.css(value), 10);
            },
            _listen = function() {
                if (!_silent) {
                    var hash = _href(),
                        diff = decodeURI(_value) != decodeURI(hash);
                    if (diff) {
                        if (_msie && _version < 7) {
                            _l.reload();
                        } else {
                            if (_msie && !_hashchange && _opts.history) {
                                _st(_html, 50);
                            }
                            _value = hash;
                            _update(FALSE);
                        }
                    }
                }
            },
            _update = function(internal) {
                _st(_track, 10);
                return _trigger(CHANGE).isDefaultPrevented() || 
                    _trigger(internal ? INTERNAL_CHANGE : EXTERNAL_CHANGE).isDefaultPrevented();
            },
            _track = function() {
                if (_opts.tracker !== 'null' && _opts.tracker !== NULL) {
                    var fn = $.isFunction(_opts.tracker) ? _opts.tracker : _t[_opts.tracker],
                        value = (_l.pathname + _l.search + 
                                ($.address && !_supportsState() ? $.address.value() : ''))
                                .replace(/\/\//, '/').replace(/^\/$/, '');
                    if ($.isFunction(fn)) {
                        fn(value);
                    } else {
                      if ($.isFunction(_t.urchinTracker)) {
                        _t.urchinTracker(value);
                      }
                      if (_t.pageTracker !== UNDEFINED && $.isFunction(_t.pageTracker._trackPageview)) {
                          _t.pageTracker._trackPageview(value);
                      }
                      if (_t._gaq !== UNDEFINED && $.isFunction(_t._gaq.push)) {
                          _t._gaq.push(['_trackPageview', decodeURI(value)]);
                      }
                      if ($.isFunction(_t.ga)) {
                          _t.ga('send', 'pageview', value);
                      }
                    }
                }
            },
            _html = function() {
                var src = _js() + ':' + FALSE + ';document.open();document.writeln(\'<html><head><title>' + 
                    _d.title.replace(/\'/g, '\\\'') + '</title><script>var ' + ID + ' = "' + encodeURIComponent(_href()).replace(/\'/g, '\\\'') + 
                    (_d.domain != _l.hostname ? '";document.domain="' + _d.domain : '') + 
                    '";</' + 'script></head></html>\');document.close();';
                if (_version < 7) {
                    _frame.src = src;
                } else {
                    _frame.contentWindow.location.replace(src);
                }
            },
            _options = function() {
                if (_url && _qi != -1) {
                    var i, param, params = _url.substr(_qi + 1).split('&');
                    for (i = 0; i < params.length; i++) {
                        param = params[i].split('=');
                        if (/^(autoUpdate|history|strict|wrap)$/.test(param[0])) {
                            _opts[param[0]] = (isNaN(param[1]) ? /^(true|yes)$/i.test(param[1]) : (parseInt(param[1], 10) !== 0));
                        }
                        if (/^(state|tracker)$/.test(param[0])) {
                            _opts[param[0]] = param[1];
                        }
                    }
                    _url = NULL;
                }
                _value = _href();
            },
            _load = function() {
                if (!_loaded) {
                    _loaded = TRUE;
                    _options();
                    $('a[rel*="address:"]').address();
                    if (_opts.wrap) {
                        var body = $('body'),
                            wrap = $('body > *')
                                .wrapAll('<div style="padding:' + 
                                    (_cssint(body, 'marginTop') + _cssint(body, 'paddingTop')) + 'px ' + 
                                    (_cssint(body, 'marginRight') + _cssint(body, 'paddingRight')) + 'px ' + 
                                    (_cssint(body, 'marginBottom') + _cssint(body, 'paddingBottom')) + 'px ' + 
                                    (_cssint(body, 'marginLeft') + _cssint(body, 'paddingLeft')) + 'px;" />')
                                .parent()
                                .wrap('<div id="' + ID + '" style="height:100%;overflow:auto;position:relative;' + 
                                    (_webkit && !window.statusbar.visible ? 'resize:both;' : '') + '" />');
                        $('html, body')
                            .css({
                                height: '100%',
                                margin: 0,
                                padding: 0,
                                overflow: 'hidden'
                            });
                        if (_webkit) {
                            $('<style type="text/css" />')
                                .appendTo('head')
                                .text('#' + ID + '::-webkit-resizer { background-color: #fff; }');
                        }
                    }
                    if (_msie && !_hashchange) {
                        var frameset = _d.getElementsByTagName('frameset')[0];
                        _frame = _d.createElement((frameset ? '' : 'i') + 'frame');
                        _frame.src = _js() + ':' + FALSE;
                        if (frameset) {
                            frameset.insertAdjacentElement('beforeEnd', _frame);
                            frameset[frameset.cols ? 'cols' : 'rows'] += ',0';
                            _frame.noResize = TRUE;
                            _frame.frameBorder = _frame.frameSpacing = 0;
                        } else {
                            _frame.style.display = 'none';
                            _frame.style.width = _frame.style.height = 0;
                            _frame.tabIndex = -1;
                            _d.body.insertAdjacentElement('afterBegin', _frame);
                        }
                        _st(function() {
                            $(_frame).bind('load', function() {
                                var win = _frame.contentWindow;
                                _value = win[ID] !== UNDEFINED ? win[ID] : '';
                                if (_value != _href()) {
                                    _update(FALSE);
                                    _l.hash = _value;
                                }
                            });
                            if (_frame.contentWindow[ID] === UNDEFINED) {
                                _html();
                            }
                        }, 50);
                    }
                    _st(function() {
                        _trigger('init');
                        _update(FALSE);
                    }, 1);
                    if (!_supportsState()) {
                        if ((_msie && _version > 7) || (!_msie && _hashchange)) {
                            if (_t.addEventListener) {
                                _t.addEventListener(HASH_CHANGE, _listen, FALSE);
                            } else if (_t.attachEvent) {
                                _t.attachEvent('on' + HASH_CHANGE, _listen);
                            }
                        } else {
                            _si(_listen, 50);
                        }
                    }
                    if ('state' in window.history) {
                        $(window).trigger('popstate');
                    }
                }
            },
            _popstate = function() {
                if (decodeURI(_value) != decodeURI(_href())) {
                    _value = _href();
                    _update(FALSE);
                }
            },
            _unload = function() {
                if (_t.removeEventListener) {
                    _t.removeEventListener(HASH_CHANGE, _listen, FALSE);
                } else if (_t.detachEvent) {
                    _t.detachEvent('on' + HASH_CHANGE, _listen);
                }
            },
            _uaMatch = function(ua) {
                ua = ua.toLowerCase();
                var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
                    /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
                    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
                    /(msie) ([\w.]+)/.exec( ua ) ||
                    ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
                    [];
                return {
                    browser: match[ 1 ] || '',
                    version: match[ 2 ] || '0'
                };
            },
            _detectBrowser = function() {
                var browser = {},
                    matched = _uaMatch(navigator.userAgent);
                if (matched.browser) {
                    browser[matched.browser] = true;
                    browser.version = matched.version;
                }
                if (browser.chrome) {
                    browser.webkit = true;
                } else if (browser.webkit) {
                    browser.safari = true;
                }
                return browser;
            },
            UNDEFINED,
            NULL = null,
            ID = 'jQueryAddress',
            STRING = 'string',
            HASH_CHANGE = 'hashchange',
            INIT = 'init',
            CHANGE = 'change',
            INTERNAL_CHANGE = 'internalChange',
            EXTERNAL_CHANGE = 'externalChange',
            TRUE = true,
            FALSE = false,
            _opts = {
                autoUpdate: TRUE, 
                history: TRUE, 
                strict: TRUE,
                frames: TRUE,
                wrap: FALSE
            },
            _browser = _detectBrowser(),
            _version = parseFloat(_browser.version),
            _webkit = _browser.webkit || _browser.safari,
            _msie = _browser.msie,
            _t = _window(),
            _d = _t.document,
            _h = _t.history, 
            _l = _t.location,
            _si = setInterval,
            _st = setTimeout,
            _re = /\/{2,9}/g,
            _agent = navigator.userAgent,
            _hashchange = 'on' + HASH_CHANGE in _t,
            _frame,
            _form,
            _url = $('script:last').attr('src'),
            _qi = _url ? _url.indexOf('?') : -1,
            _title = _d.title, 
            _silent = FALSE,
            _loaded = FALSE,
            _juststart = TRUE,
            _updating = FALSE,
            _listeners = {}, 
            _value = _href();
            
        if (_msie) {
            _version = parseFloat(_agent.substr(_agent.indexOf('MSIE') + 4));
            if (_d.documentMode && _d.documentMode != _version) {
                _version = _d.documentMode != 8 ? 7 : 8;
            }
            var pc = _d.onpropertychange;
            _d.onpropertychange = function() {
                if (pc) {
                    pc.call(_d);
                }
                if (_d.title != _title && _d.title.indexOf('#' + _href()) != -1) {
                    _d.title = _title;
                }
            };
        }
        
        if (_h.navigationMode) {
            _h.navigationMode = 'compatible';
        }
        if (document.readyState == 'complete') {
            var interval = setInterval(function() {
                if ($.address) {
                    _load();
                    clearInterval(interval);
                }
            }, 50);
        } else {
            _options();
            $(_load);
        }
        $(window).bind('popstate', _popstate).bind('unload', _unload);

        return {
            bind: function(type, data, fn) {
                return _bind.apply(this, _array(arguments));
            },
            unbind: function(type, fn) {
                return _unbind.apply(this, _array(arguments));
            },
            init: function(data, fn) {
                return _bind.apply(this, [INIT].concat(_array(arguments)));
            },
            change: function(data, fn) {
                return _bind.apply(this, [CHANGE].concat(_array(arguments)));
            },
            internalChange: function(data, fn) {
                return _bind.apply(this, [INTERNAL_CHANGE].concat(_array(arguments)));
            },
            externalChange: function(data, fn) {
                return _bind.apply(this, [EXTERNAL_CHANGE].concat(_array(arguments)));
            },
            baseURL: function() {
                var url = _l.href;
                if (url.indexOf('#') != -1) {
                    url = url.substr(0, url.indexOf('#'));
                }
                if (/\/$/.test(url)) {
                    url = url.substr(0, url.length - 1);
                }
                return url;
            },
            autoUpdate: function(value) {
                if (value !== UNDEFINED) {
                    _opts.autoUpdate = value;
                    return this;
                }
                return _opts.autoUpdate;
            },
            history: function(value) {
                if (value !== UNDEFINED) {
                    _opts.history = value;
                    return this;
                }
                return _opts.history;
            },
            state: function(value) {
                if (value !== UNDEFINED) {
                    _opts.state = value;
                    var hrefState = _hrefState();
                    if (_opts.state !== UNDEFINED) {
                        if (_h.pushState) {
                            if (hrefState.substr(0, 3) == '/#/') {
                                _l.replace(_opts.state.replace(/^\/$/, '') + hrefState.substr(2));
                            }
                        } else if (hrefState != '/' && hrefState.replace(/^\/#/, '') != _hrefHash()) {
                            _st(function() {
                                _l.replace(_opts.state.replace(/^\/$/, '') + '/#' + hrefState);
                            }, 1);
                        }
                    }
                    return this;
                }
                return _opts.state;
            },
            frames: function(value) {
                if (value !== UNDEFINED) {
                    _opts.frames = value;
                    _t = _window();
                    return this;
                }
                return _opts.frames;
            },            
            strict: function(value) {
                if (value !== UNDEFINED) {
                    _opts.strict = value;
                    return this;
                }
                return _opts.strict;
            },
            tracker: function(value) {
                if (value !== UNDEFINED) {
                    _opts.tracker = value;
                    return this;
                }
                return _opts.tracker;
            },
            wrap: function(value) {
                if (value !== UNDEFINED) {
                    _opts.wrap = value;
                    return this;
                }
                return _opts.wrap;
            },
            update: function() {
                _updating = TRUE;
                this.value(_value);
                _updating = FALSE;
                return this;
            },
            title: function(value) {
                if (value !== UNDEFINED) {
                    _st(function() {
                        _title = _d.title = value;
                        if (_juststart && _frame && _frame.contentWindow && _frame.contentWindow.document) {
                            _frame.contentWindow.document.title = value;
                            _juststart = FALSE;
                        }
                    }, 50);
                    return this;
                }
                return _d.title;
            },
            value: function(value) {
                if (value !== UNDEFINED) {
                    value = _strict(value);
                    if (value == '/') {
                        value = '';
                    }
                    if (_value == value && !_updating) {
                        return;
                    }
                    _value = value;
                    if (_opts.autoUpdate || _updating) {
                        if (_update(TRUE)) {
                            return this;
                        }
                        if (_supportsState()) {
                            _h[_opts.history ? 'pushState' : 'replaceState']({}, '', 
                                    _opts.state.replace(/\/$/, '') + (_value === '' ? '/' : _value));
                        } else {
                            _silent = TRUE;
                            if (_webkit) {
                                if (_opts.history) {
                                    _l.hash = '#' + _value;
                                } else {
                                    _l.replace('#' + _value);
                                }
                            } else if (_value != _href()) {
                                if (_opts.history) {
                                    _l.hash = '#' + _value;
                                } else {
                                    _l.replace('#' + _value);
                                }
                            }
                            if ((_msie && !_hashchange) && _opts.history) {
                                _st(_html, 50);
                            }
                            if (_webkit) {
                                _st(function(){ _silent = FALSE; }, 1);
                            } else {
                                _silent = FALSE;
                            }
                        }
                    }
                    return this;
                }
                return _strict(_value);
            },
            path: function(value) {
                if (value !== UNDEFINED) {
                    var qs = this.queryString(),
                        hash = this.hash();
                    this.value(value + (qs ? '?' + qs : '') + (hash ? '#' + hash : ''));
                    return this;
                }
                return _strict(_value).split('#')[0].split('?')[0];
            },
            pathNames: function() {
                var path = this.path(),
                    names = path.replace(_re, '/').split('/');
                if (path.substr(0, 1) == '/' || path.length === 0) {
                    names.splice(0, 1);
                }
                if (path.substr(path.length - 1, 1) == '/') {
                    names.splice(names.length - 1, 1);
                }
                return names;
            },
            queryString: function(value) {
                if (value !== UNDEFINED) {
                    var hash = this.hash();
                    this.value(this.path() + (value ? '?' + value : '') + (hash ? '#' + hash : ''));
                    return this;
                }
                var arr = _value.split('?');
                return arr.slice(1, arr.length).join('?').split('#')[0];
            },
            parameter: function(name, value, append) {
                var i, params;
                if (value !== UNDEFINED) {
                    var names = this.parameterNames();
                    params = [];
                    value = value === UNDEFINED || value === NULL ? '' : value.toString();
                    for (i = 0; i < names.length; i++) {
                        var n = names[i],
                            v = this.parameter(n);
                        if (typeof v == STRING) {
                            v = [v];
                        }
                        if (n == name) {
                            v = (value === NULL || value === '') ? [] : 
                                (append ? v.concat([value]) : [value]);
                        }
                        for (var j = 0; j < v.length; j++) {
                            params.push(n + '=' + v[j]);
                        }
                    }
                    if ($.inArray(name, names) == -1 && value !== NULL && value !== '') {
                        params.push(name + '=' + value);
                    }
                    this.queryString(params.join('&'));
                    return this;
                }
                value = this.queryString();
                if (value) {
                    var r = [];
                    params = value.split('&');
                    for (i = 0; i < params.length; i++) {
                        var p = params[i].split('=');
                        if (p[0] == name) {
                            r.push(p.slice(1).join('='));
                        }
                    }
                    if (r.length !== 0) {
                        return r.length != 1 ? r : r[0];
                    }
                }
            },
            parameterNames: function() {
                var qs = this.queryString(),
                    names = [];
                if (qs && qs.indexOf('=') != -1) {
                    var params = qs.split('&');
                    for (var i = 0; i < params.length; i++) {
                        var name = params[i].split('=')[0];
                        if ($.inArray(name, names) == -1) {
                            names.push(name);
                        }
                    }
                }
                return names;
            },
            hash: function(value) {
                if (value !== UNDEFINED) {
                    this.value(_value.split('#')[0] + (value ? '#' + value : ''));
                    return this;
                }
                var arr = _value.split('#');
                return arr.slice(1, arr.length).join('#');                
            }
        };
    })();
    
    $.fn.address = function(fn) {
        $(this).each(function(index) {
            if (!$(this).data('address')) {
                $(this).on('click', function(e) {
                    if (e.shiftKey || e.ctrlKey || e.metaKey || e.which == 2) {
                        return true;
                    }
                    var target = e.currentTarget;
                    if ($(target).is('a')) {
                        e.preventDefault();
                        var value = fn ? fn.call(target) : 
                            /address:/.test($(target).attr('rel')) ? $(target).attr('rel').split('address:')[1].split(' ')[0] : 
                            $.address.state() !== undefined && !/^\/?$/.test($.address.state()) ? 
                                    $(target).attr('href').replace(new RegExp('^(.*' + $.address.state() + '|\\.)'), '') : 
                                    $(target).attr('href').replace(/^(#\!?|\.)/, '');
                        $.address.value(value);
                    }
                }).on('submit', function(e) {
                    var target = e.currentTarget;
                    if ($(target).is('form')) {
                        e.preventDefault();
                        var action = $(target).attr('action'),
                            value = fn ? fn.call(target) : (action.indexOf('?') != -1 ? action.replace(/&$/, '') : action + '?') + 
                                $(target).serialize();
                        $.address.value(value);
                    }
                }).data('address', true);
            }
        });
        return this;
    };
    
})(jQuery);
/*	
 * jQuery mmenu v4.7.4
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Licensed under the MIT license:
 * http://en.wikipedia.org/wiki/MIT_License
 */
!function(e){function n(){l=!0,d.$wndw=e(window),d.$html=e("html"),d.$body=e("body"),e.each([i,a,o],function(e,n){n.add=function(e){e=e.split(" ");for(var t in e)n[e[t]]=n.mm(e[t])}}),i.mm=function(e){return"mm-"+e},i.add("wrapper menu inline panel nopanel list nolist subtitle selected label spacer current highest hidden opened subopened subopen fullsubopen subclose"),i.umm=function(e){return"mm-"==e.slice(0,3)&&(e=e.slice(3)),e},a.mm=function(e){return"mm-"+e},a.add("parent"),o.mm=function(e){return e+".mm"},o.add("toggle open close setSelected transitionend webkitTransitionEnd mousedown mouseup touchstart touchmove touchend scroll resize click keydown keyup"),e[t]._c=i,e[t]._d=a,e[t]._e=o,e[t].glbl=d}var t="mmenu",s="4.7.4";if(!e[t]){var i={},a={},o={},l=!1,d={$wndw:null,$html:null,$body:null};e[t]=function(n,s,i){this.$menu=n,this.opts=s,this.conf=i,this.vars={},"function"==typeof this.___deprecated&&this.___deprecated(),this._initMenu(),this._initAnchors(),this._initEvents();var a=this.$menu.children(this.conf.panelNodetype);for(var o in e[t].addons)e[t].addons[o]._add.call(this),e[t].addons[o]._add=function(){},e[t].addons[o]._setup.call(this);return this._init(a),"function"==typeof this.___debug&&this.___debug(),this},e[t].version=s,e[t].addons={},e[t].uniqueId=0,e[t].defaults={classes:"",slidingSubmenus:!0,onClick:{setSelected:!0}},e[t].configuration={panelNodetype:"ul, ol, div",transitionDuration:400,openingInterval:25,classNames:{panel:"Panel",selected:"Selected",label:"Label",spacer:"Spacer"}},e[t].prototype={_init:function(n){n=n.not("."+i.nopanel),n=this._initPanels(n);for(var s in e[t].addons)e[t].addons[s]._init.call(this,n);this._update()},_initMenu:function(){this.opts.offCanvas&&this.conf.clone&&(this.$menu=this.$menu.clone(!0),this.$menu.add(this.$menu.find("*")).filter("[id]").each(function(){e(this).attr("id",i.mm(e(this).attr("id")))})),this.$menu.contents().each(function(){3==e(this)[0].nodeType&&e(this).remove()}),this.$menu.parent().addClass(i.wrapper);var n=[i.menu];n.push(i.mm(this.opts.slidingSubmenus?"horizontal":"vertical")),this.opts.classes&&n.push(this.opts.classes),this.$menu.addClass(n.join(" "))},_initPanels:function(n){var t=this;this.__findAddBack(n,"ul, ol").not("."+i.nolist).addClass(i.list);var s=this.__findAddBack(n,"."+i.list).find("> li");this.__refactorClass(s,this.conf.classNames.selected,"selected"),this.__refactorClass(s,this.conf.classNames.label,"label"),this.__refactorClass(s,this.conf.classNames.spacer,"spacer"),s.off(o.setSelected).on(o.setSelected,function(n,t){n.stopPropagation(),s.removeClass(i.selected),"boolean"!=typeof t&&(t=!0),t&&e(this).addClass(i.selected)}),this.__refactorClass(this.__findAddBack(n,"."+this.conf.classNames.panel),this.conf.classNames.panel,"panel"),n.add(this.__findAddBack(n,"."+i.list).children().children().filter(this.conf.panelNodetype).not("."+i.nopanel)).addClass(i.panel);var l=this.__findAddBack(n,"."+i.panel),d=e("."+i.panel,this.$menu);if(l.each(function(){var n=e(this),s=n.attr("id")||t.__getUniqueId();n.attr("id",s)}),l.each(function(){var n=e(this),s=n.is("ul, ol")?n:n.find("ul ,ol").first(),o=n.parent(),l=o.children("a, span"),d=o.closest("."+i.panel);if(o.parent().is("."+i.list)&&!n.data(a.parent)){n.data(a.parent,o);var r=e('<a class="'+i.subopen+'" href="#'+n.attr("id")+'" />').insertBefore(l);l.is("a")||r.addClass(i.fullsubopen),t.opts.slidingSubmenus&&s.prepend('<li class="'+i.subtitle+'"><a class="'+i.subclose+'" href="#'+d.attr("id")+'">'+l.text()+"</a></li>")}}),this.opts.slidingSubmenus){var r=this.__findAddBack(n,"."+i.list).find("> li."+i.selected);r.parents("li").removeClass(i.selected).end().add(r.parents("li")).each(function(){var n=e(this),t=n.find("> ."+i.panel);t.length&&(n.parents("."+i.panel).addClass(i.subopened),t.addClass(i.opened))}).closest("."+i.panel).addClass(i.opened).parents("."+i.panel).addClass(i.subopened)}else{var r=e("li."+i.selected,d);r.parents("li").removeClass(i.selected).end().add(r.parents("li")).addClass(i.opened)}var u=d.filter("."+i.opened);return u.length||(u=l.first()),u.addClass(i.opened).last().addClass(i.current),this.opts.slidingSubmenus&&l.not(u.last()).addClass(i.hidden).end().appendTo(this.$menu),l},_initAnchors:function(){var n=this;d.$body.on(o.click,"a",function(s){var a=e(this),l=!1,r=n.$menu.find(a).length;for(var u in e[t].addons)if(e[t].addons[u]._clickAnchor&&(l=e[t].addons[u]._clickAnchor.call(n,a,r)))break;if(!l&&r){var c=a.attr("href")||"";if("#"==c.slice(0,1))try{e(c,n.$menu).is("."+i.panel)&&(l=!0,e(c).trigger(n.opts.slidingSubmenus?o.open:o.toggle))}catch(p){}}if(l&&s.preventDefault(),!l&&r&&a.is("."+i.list+" > li > a")&&!a.is('[rel="external"]')&&!a.is('[target="_blank"]')){n.__valueOrFn(n.opts.onClick.setSelected,a)&&a.parent().trigger(o.setSelected);var h=n.__valueOrFn(n.opts.onClick.preventDefault,a,"#"==c.slice(0,1));h&&s.preventDefault(),n.__valueOrFn(n.opts.onClick.blockUI,a,!h)&&d.$html.addClass(i.blocking),n.__valueOrFn(n.opts.onClick.close,a,h)&&n.$menu.trigger(o.close)}})},_initEvents:function(){var n=this;this.$menu.on(o.toggle+" "+o.open+" "+o.close,"."+i.panel,function(e){e.stopPropagation()}),this.opts.slidingSubmenus?this.$menu.on(o.open,"."+i.panel,function(){return n._openSubmenuHorizontal(e(this))}):this.$menu.on(o.toggle,"."+i.panel,function(){var n=e(this);n.trigger(n.parent().hasClass(i.opened)?o.close:o.open)}).on(o.open,"."+i.panel,function(){e(this).parent().addClass(i.opened)}).on(o.close,"."+i.panel,function(){e(this).parent().removeClass(i.opened)})},_openSubmenuHorizontal:function(n){if(n.hasClass(i.current))return!1;var t=e("."+i.panel,this.$menu),s=t.filter("."+i.current);return t.removeClass(i.highest).removeClass(i.current).not(n).not(s).addClass(i.hidden),n.hasClass(i.opened)?s.addClass(i.highest).removeClass(i.opened).removeClass(i.subopened):(n.addClass(i.highest),s.addClass(i.subopened)),n.removeClass(i.hidden).addClass(i.current),setTimeout(function(){n.removeClass(i.subopened).addClass(i.opened)},this.conf.openingInterval),"open"},_update:function(e){if(this.updates||(this.updates=[]),"function"==typeof e)this.updates.push(e);else for(var n=0,t=this.updates.length;t>n;n++)this.updates[n].call(this,e)},__valueOrFn:function(e,n,t){return"function"==typeof e?e.call(n[0]):"undefined"==typeof e&&"undefined"!=typeof t?t:e},__refactorClass:function(e,n,t){return e.filter("."+n).removeClass(n).addClass(i[t])},__findAddBack:function(e,n){return e.find(n).add(e.filter(n))},__transitionend:function(e,n,t){var s=!1,i=function(){s||n.call(e[0]),s=!0};e.one(o.transitionend,i),e.one(o.webkitTransitionEnd,i),setTimeout(i,1.1*t)},__getUniqueId:function(){return i.mm(e[t].uniqueId++)}},e.fn[t]=function(s,i){return l||n(),s=e.extend(!0,{},e[t].defaults,s),i=e.extend(!0,{},e[t].configuration,i),this.each(function(){var n=e(this);n.data(t)||n.data(t,new e[t](n,s,i))})},e[t].support={touch:"ontouchstart"in window.document}}}(jQuery);
/*	
 * jQuery mmenu offCanvas addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(e){var t="mmenu",o="offCanvas";e[t].addons[o]={_init:function(){},_setup:function(){if(this.opts[o]){var t=this,s=this.opts[o],p=this.conf[o];"string"!=typeof p.pageSelector&&(p.pageSelector="> "+p.pageNodetype),a.$allMenus=(a.$allMenus||e()).add(this.$menu),this.vars.opened=!1;var r=[n.offcanvas];"left"!=s.position&&r.push(n.mm(s.position)),"back"!=s.zposition&&r.push(n.mm(s.zposition)),this.$menu.addClass(r.join(" ")).parent().removeClass(n.wrapper),this.setPage(a.$page),this[o+"_initBlocker"](),this[o+"_initWindow"](),this.$menu.on(i.open+" "+i.opening+" "+i.opened+" "+i.close+" "+i.closing+" "+i.closed+" "+i.setPage,function(e){e.stopPropagation()}).on(i.open+" "+i.close+" "+i.setPage,function(e){t[e.type]()}),this.$menu[p.menuInjectMethod+"To"](p.menuWrapperSelector)}},_add:function(){n=e[t]._c,s=e[t]._d,i=e[t]._e,n.add("offcanvas slideout modal background opening blocker page"),s.add("style"),i.add("opening opened closing closed setPage"),a=e[t].glbl},_clickAnchor:function(e){if(!this.opts[o])return!1;var t=this.$menu.attr("id");if(t&&t.length&&(this.conf.clone&&(t=n.umm(t)),e.is('[href="#'+t+'"]')))return this.open(),!0;if(a.$page){var t=a.$page.attr("id");return t&&t.length&&e.is('[href="#'+t+'"]')?(this.close(),!0):!1}}},e[t].defaults[o]={position:"left",zposition:"back",modal:!1,moveBackground:!0},e[t].configuration[o]={pageNodetype:"div",pageSelector:null,menuWrapperSelector:"body",menuInjectMethod:"prepend"},e[t].prototype.open=function(){if(this.vars.opened)return!1;var e=this;return this._openSetup(),setTimeout(function(){e._openFinish()},this.conf.openingInterval),"open"},e[t].prototype._openSetup=function(){var e=this;a.$allMenus.not(this.$menu).trigger(i.close),a.$page.data(s.style,a.$page.attr("style")||""),a.$wndw.trigger(i.resize,[!0]);var t=[n.opened];this.opts[o].modal&&t.push(n.modal),this.opts[o].moveBackground&&t.push(n.background),"left"!=this.opts[o].position&&t.push(n.mm(this.opts[o].position)),"back"!=this.opts[o].zposition&&t.push(n.mm(this.opts[o].zposition)),this.opts.classes&&t.push(this.opts.classes),a.$html.addClass(t.join(" ")),setTimeout(function(){e.vars.opened=!0},this.conf.openingInterval),this.$menu.addClass(n.current+" "+n.opened)},e[t].prototype._openFinish=function(){var e=this;this.__transitionend(a.$page,function(){e.$menu.trigger(i.opened)},this.conf.transitionDuration),a.$html.addClass(n.opening),this.$menu.trigger(i.opening)},e[t].prototype.close=function(){if(!this.vars.opened)return!1;var e=this;return this.__transitionend(a.$page,function(){e.$menu.removeClass(n.current).removeClass(n.opened),a.$html.removeClass(n.opened).removeClass(n.modal).removeClass(n.background).removeClass(n.mm(e.opts[o].position)).removeClass(n.mm(e.opts[o].zposition)),e.opts.classes&&a.$html.removeClass(e.opts.classes),a.$page.attr("style",a.$page.data(s.style)),e.vars.opened=!1,e.$menu.trigger(i.closed)},this.conf.transitionDuration),a.$html.removeClass(n.opening),this.$menu.trigger(i.closing),"close"},e[t].prototype.setPage=function(t){t||(t=e(this.conf[o].pageSelector,a.$body),t.length>1&&(t=t.wrapAll("<"+this.conf[o].pageNodetype+" />").parent())),t.addClass(n.page+" "+n.slideout),a.$page=t},e[t].prototype[o+"_initWindow"]=function(){a.$wndw.on(i.keydown,function(e){return a.$html.hasClass(n.opened)&&9==e.keyCode?(e.preventDefault(),!1):void 0});var s=0;a.$wndw.on(i.resize,function(e,t){if(t||a.$html.hasClass(n.opened)){var o=a.$wndw.height();(t||o!=s)&&(s=o,a.$page.css("minHeight",o))}}),e[t].prototype[o+"_initWindow"]=function(){}},e[t].prototype[o+"_initBlocker"]=function(){var s=e('<div id="'+n.blocker+'" class="'+n.slideout+'" />').appendTo(a.$body);s.on(i.touchstart,function(e){e.preventDefault(),e.stopPropagation(),s.trigger(i.mousedown)}).on(i.mousedown,function(e){e.preventDefault(),a.$html.hasClass(n.modal)||a.$allMenus.trigger(i.close)}),e[t].prototype[o+"_initBlocker"]=function(){}};var n,s,i,a}(jQuery);
/*	
 * jQuery mmenu buttonbars addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){var n="mmenu",a="buttonbars";t[n].addons[a]={_init:function(n){this.opts[a],this.conf[a],this.__refactorClass(t("div",n),this.conf.classNames[a].buttonbar,"buttonbar"),t("."+i.buttonbar,n).each(function(){var n=t(this),a=n.children().not("input"),o=n.children().filter("input");n.addClass(i.buttonbar+"-"+a.length),o.each(function(){var n=t(this),i=a.filter('label[for="'+n.attr("id")+'"]');i.length&&n.insertBefore(i)})})},_setup:function(){},_add:function(){i=t[n]._c,o=t[n]._d,r=t[n]._e,i.add("buttonbar"),s=t[n].glbl}},t[n].defaults[a]={},t[n].configuration.classNames[a]={buttonbar:"Buttonbar"};var i,o,r,s}(jQuery);
/*	
 * jQuery mmenu counters addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){var e="mmenu",n="counters";t[e].addons[n]={_init:function(e){var s=this,d=this.opts[n];this.conf[n],this.__refactorClass(t("em",e),this.conf.classNames[n].counter,"counter"),d.add&&e.each(function(){var e=t(this).data(o.parent);e&&(e.find("> em."+a.counter).length||e.prepend(t('<em class="'+a.counter+'" />')))}),d.update&&e.each(function(){var e=t(this),n=e.data(o.parent);if(n){var d=n.find("> em."+a.counter);d.length&&(e.is("."+a.list)||(e=e.find("> ."+a.list)),e.length&&!e.data(o.updatecounter)&&(e.data(o.updatecounter,!0),s._update(function(){var t=e.children().not("."+a.label).not("."+a.subtitle).not("."+a.hidden).not("."+a.search).not("."+a.noresultsmsg);d.html(t.length)})))}})},_setup:function(){var a=this.opts[n];"boolean"==typeof a&&(a={add:a,update:a}),"object"!=typeof a&&(a={}),a=t.extend(!0,{},t[e].defaults[n],a),this.opts[n]=a},_add:function(){a=t[e]._c,o=t[e]._d,s=t[e]._e,a.add("counter search noresultsmsg"),o.add("updatecounter"),d=t[e].glbl}},t[e].defaults[n]={add:!1,update:!1},t[e].configuration.classNames[n]={counter:"Counter"};var a,o,s,d}(jQuery);
/*	
 * jQuery mmenu dragOpen addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(e){function t(e,t,n){return t>e&&(e=t),e>n&&(e=n),e}var n="mmenu",o="dragOpen";e[n].addons[o]={_init:function(){},_setup:function(){if(this.opts.offCanvas){var s=this,p=this.opts[o],d=this.conf[o];if("boolean"==typeof p&&(p={open:p}),"object"!=typeof p&&(p={}),p=e.extend(!0,{},e[n].defaults[o],p),p.open){if(Hammer.VERSION<2)return;var f,c,h,m,u={},g=0,l=!1,v=!1,_=0,w=0;switch(this.opts.offCanvas.position){case"left":case"right":u.events="panleft panright",u.typeLower="x",u.typeUpper="X",v="width";break;case"top":case"bottom":u.events="panup pandown",u.typeLower="y",u.typeUpper="Y",v="height"}switch(this.opts.offCanvas.position){case"left":case"top":u.negative=!1;break;case"right":case"bottom":u.negative=!0}switch(this.opts.offCanvas.position){case"left":u.open_dir="right",u.close_dir="left";break;case"right":u.open_dir="left",u.close_dir="right";break;case"top":u.open_dir="down",u.close_dir="up";break;case"bottom":u.open_dir="up",u.close_dir="down"}var b=this.__valueOrFn(p.pageNode,this.$menu,r.$page);"string"==typeof b&&(b=e(b));var y=r.$page;switch(this.opts.offCanvas.zposition){case"front":y=this.$menu;break;case"next":y=y.add(this.$menu)}var $=new Hammer(b[0],p.vendors.hammer);$.on("panstart",function(e){switch(m=e.center[u.typeLower],s.opts.offCanvas.position){case"right":case"bottom":m>=r.$wndw[v]()-p.maxStartPos&&(g=1);break;default:m<=p.maxStartPos&&(g=1)}l=u.open_dir}).on(u.events+" panend",function(e){g>0&&e.preventDefault()}).on(u.events,function(e){if(f=e["delta"+u.typeUpper],u.negative&&(f=-f),f!=_&&(l=f>=_?u.open_dir:u.close_dir),_=f,_>p.threshold&&1==g){if(r.$html.hasClass(a.opened))return;g=2,s._openSetup(),s.$menu.trigger(i.opening),r.$html.addClass(a.dragging),w=t(r.$wndw[v]()*d[v].perc,d[v].min,d[v].max)}2==g&&(c=t(_,10,w)-("front"==s.opts.offCanvas.zposition?w:0),u.negative&&(c=-c),h="translate"+u.typeUpper+"("+c+"px )",y.css({"-webkit-transform":"-webkit-"+h,transform:h}))}).on("panend",function(){2==g&&(r.$html.removeClass(a.dragging),y.css("transform",""),s[l==u.open_dir?"_openFinish":"close"]()),g=0})}}},_add:function(){return"function"!=typeof Hammer?(e[n].addons[o]._init=function(){},e[n].addons[o]._setup=function(){},void 0):(a=e[n]._c,s=e[n]._d,i=e[n]._e,a.add("dragging"),r=e[n].glbl,void 0)}},e[n].defaults[o]={open:!1,maxStartPos:100,threshold:50,vendors:{hammer:{}}},e[n].configuration[o]={width:{perc:.8,min:140,max:440},height:{perc:.8,min:140,max:880}};var a,s,i,r}(jQuery);
/*	
 * jQuery mmenu fixedElements addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(o){var t="mmenu",s="fixedElements";o[t].addons[s]={_init:function(){if(this.opts.offCanvas){var t=o("div, span, a",e.$page),d=this.__refactorClass(t,this.conf.classNames[s].fixedTop,"fixed-top"),i=this.__refactorClass(t,this.conf.classNames[s].fixedBottom,"fixed-bottom");d.add(i).appendTo(e.$body).addClass(a.slideout)}},_setup:function(){},_add:function(){a=o[t]._c,d=o[t]._d,i=o[t]._e,a.add("fixed-top fixed-bottom"),e=o[t].glbl}},o[t].defaults[s]={},o[t].configuration.classNames[s]={fixedTop:"FixedTop",fixedBottom:"FixedBottom"};var a,d,i,e}(jQuery);
/*	
 * jQuery mmenu footer addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){var o="mmenu",e="footer";t[o].addons[e]={_init:function(a){var d=this,i=this.opts[e],r=t("div."+n.footer,this.$menu);r.length&&(i.update&&a.each(function(){var o=t(this),a=t("."+d.conf.classNames[e].panelFooter,o),u=a.html();u||(u=i.title);var l=function(){r[u?"show":"hide"](),r.html(u)};o.on(s.open,l),o.hasClass(n.current)&&l()}),t[o].addons.buttonbars&&t[o].addons.buttonbars._init.call(this,r))},_setup:function(){var a=this.opts[e];if("boolean"==typeof a&&(a={add:a,update:a}),"object"!=typeof a&&(a={}),a=t.extend(!0,{},t[o].defaults[e],a),this.opts[e]=a,a.add){var s=a.content?a.content:a.title;t('<div class="'+n.footer+'" />').appendTo(this.$menu).append(s),this.$menu.addClass(n.hasfooter)}},_add:function(){n=t[o]._c,a=t[o]._d,s=t[o]._e,n.add("footer hasfooter"),d=t[o].glbl}},t[o].defaults[e]={add:!1,content:!1,title:"",update:!1},t[o].configuration.classNames[e]={panelFooter:"Footer"};var n,a,s,d}(jQuery);
/*	
 * jQuery mmenu header addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(e){var t="mmenu",a="header";e[t].addons[a]={_init:function(s){var i=this,o=this.opts[a],l=(this.conf[a],e("."+n.header,this.$menu));if(l.length){if(o.update){var h=l.find("."+n.title),c=l.find("."+n.prev),f=l.find("."+n.next),p=l.find("."+n.close),u=!1;r.$page&&(u="#"+r.$page.attr("id"),p.attr("href",u)),s.each(function(){var t=e(this),s=t.find("."+i.conf.classNames[a].panelHeader),r=t.find("."+i.conf.classNames[a].panelPrev),l=t.find("."+i.conf.classNames[a].panelNext),p=s.html(),u=r.attr("href"),v=l.attr("href"),m=r.html(),b=l.html();p||(p=t.find("."+n.subclose).html()),p||(p=o.title),u||(u=t.find("."+n.subclose).attr("href"));var x=function(){h[p?"show":"hide"](),h.html(p),c[u?"attr":"removeAttr"]("href",u),c[u||m?"show":"hide"](),c.html(m),f[v?"attr":"removeAttr"]("href",v),f[v||b?"show":"hide"](),f.html(b)};t.on(d.open,x),t.hasClass(n.current)&&x()})}e[t].addons.buttonbars&&e[t].addons.buttonbars._init.call(this,l)}},_setup:function(){var s=this.opts[a];if(this.conf[a],"boolean"==typeof s&&(s={add:s,update:s}),"object"!=typeof s&&(s={}),"undefined"==typeof s.content&&(s.content=["prev","title","next"]),s=e.extend(!0,{},e[t].defaults[a],s),this.opts[a]=s,s.add){if(s.content instanceof Array){for(var d=e("<div />"),r=0,i=s.content.length;i>r;r++)switch(s.content[r]){case"prev":case"next":case"close":d.append('<a class="'+n[s.content[r]]+'" href="#"></a>');break;case"title":d.append('<span class="'+n.title+'"></span>');break;default:d.append(s.content[r])}d=d.html()}else var d=s.content;e('<div class="'+n.header+'" />').prependTo(this.$menu).append(d),this.$menu.addClass(n.hasheader)}},_add:function(){n=e[t]._c,s=e[t]._d,d=e[t]._e,n.add("header hasheader prev next close title"),r=e[t].glbl}},e[t].defaults[a]={add:!1,title:"Menu",update:!1},e[t].configuration.classNames[a]={panelHeader:"Header",panelNext:"Next",panelPrev:"Prev"};var n,s,d,r}(jQuery);
/*	
 * jQuery mmenu labels addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(l){var e="mmenu",s="labels";l[e].addons[s]={_init:function(e){var n=this.opts[s];this.__refactorClass(l("li",this.$menu),this.conf.classNames[s].collapsed,"collapsed"),n.collapse&&l("."+a.label,e).each(function(){var e=l(this),s=e.nextUntil("."+a.label,"."+a.collapsed);s.length&&(e.children("."+a.subopen).length||(e.wrapInner("<span />"),e.prepend('<a href="#" class="'+a.subopen+" "+a.fullsubopen+'" />')))})},_setup:function(){var a=this.opts[s];"boolean"==typeof a&&(a={collapse:a}),"object"!=typeof a&&(a={}),a=l.extend(!0,{},l[e].defaults[s],a),this.opts[s]=a},_add:function(){a=l[e]._c,n=l[e]._d,o=l[e]._e,a.add("collapsed uncollapsed"),t=l[e].glbl},_clickAnchor:function(l,e){if(e){var s=l.parent();if(s.is("."+a.label)){var n=s.nextUntil("."+a.label,"."+a.collapsed);return s.toggleClass(a.opened),n[s.hasClass(a.opened)?"addClass":"removeClass"](a.uncollapsed),!0}}return!1}},l[e].defaults[s]={collapse:!1},l[e].configuration.classNames[s]={collapsed:"Collapsed"};var a,n,o,t}(jQuery);
/*	
 * jQuery mmenu searchfield addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(e){function s(e){switch(e){case 9:case 16:case 17:case 18:case 37:case 38:case 39:case 40:return!0}return!1}var n="mmenu",t="searchfield";e[n].addons[t]={_init:function(n){var i=this,l=this.opts[t],d=this.conf[t];if(l.add){switch(l.addTo){case"menu":var c=this.$menu;break;case"panels":var c=n;break;default:var c=e(l.addTo,this.$menu).filter("."+a.panel)}c.length&&c.each(function(){var s=e(this),n=s.is("."+a.menu)?d.form?"form":"div":"li";if(!s.children(n+"."+a.search).length){if(s.is("."+a.menu))var t=i.$menu,r="prependTo";else var t=s.children().first(),r=t.is("."+a.subtitle)?"insertAfter":"insertBefore";var o=e("<"+n+' class="'+a.search+'" />');if("form"==n&&"object"==typeof d.form)for(var c in d.form)o.attr(c,d.form[c]);o.append('<input placeholder="'+l.placeholder+'" type="text" autocomplete="off" />'),o[r](t)}l.noResults&&(s.is("."+a.menu)&&(s=s.children("."+a.panel).first()),n=s.is("."+a.list)?"li":"div",s.children(n+"."+a.noresultsmsg).length||e("<"+n+' class="'+a.noresultsmsg+'" />').html(l.noResults).appendTo(s))})}if(this.$menu.children("."+a.search).length&&this.$menu.addClass(a.hassearch),l.search){var h=e("."+a.search,this.$menu);h.length&&h.each(function(){var n=e(this);if("menu"==l.addTo)var t=e("."+a.panel,i.$menu),d=i.$menu;else var t=n.closest("."+a.panel),d=t;var c=n.children("input"),h=i.__findAddBack(t,"."+a.list).children("li"),u=h.filter("."+a.label),f=h.not("."+a.subtitle).not("."+a.label).not("."+a.search).not("."+a.noresultsmsg),p="> a";l.showLinksOnly||(p+=", > span"),c.off(o.keyup+" "+o.change).on(o.keyup,function(e){s(e.keyCode)||n.trigger(o.search)}).on(o.change,function(){n.trigger(o.search)}),n.off(o.reset+" "+o.search).on(o.reset+" "+o.search,function(e){e.stopPropagation()}).on(o.reset,function(){n.trigger(o.search,[""])}).on(o.search,function(s,n){"string"==typeof n?c.val(n):n=c.val(),n=n.toLowerCase(),t.scrollTop(0),f.add(u).addClass(a.hidden),f.each(function(){var s=e(this);e(p,s).text().toLowerCase().indexOf(n)>-1&&s.add(s.prevAll("."+a.label).first()).removeClass(a.hidden)}),e(t.get().reverse()).each(function(s){var n=e(this),t=n.data(r.parent);if(t){var d=n.add(n.find("> ."+a.list)).find("> li").not("."+a.subtitle).not("."+a.search).not("."+a.noresultsmsg).not("."+a.label).not("."+a.hidden);d.length?t.removeClass(a.hidden).removeClass(a.nosubresults).prevAll("."+a.label).first().removeClass(a.hidden):"menu"==l.addTo&&(n.hasClass(a.opened)&&setTimeout(function(){t.trigger(o.open)},1.5*(s+1)*i.conf.openingInterval),t.addClass(a.nosubresults))}}),d[f.not("."+a.hidden).length?"removeClass":"addClass"](a.noresults),i._update()})})}},_setup:function(){var s=this.opts[t];this.conf[t],"boolean"==typeof s&&(s={add:s,search:s}),"object"!=typeof s&&(s={}),s=e.extend(!0,{},e[n].defaults[t],s),"boolean"!=typeof s.showLinksOnly&&(s.showLinksOnly="menu"==s.addTo),this.opts[t]=s},_add:function(){a=e[n]._c,r=e[n]._d,o=e[n]._e,a.add("search hassearch noresultsmsg noresults nosubresults"),o.add("search reset change"),i=e[n].glbl}},e[n].defaults[t]={add:!1,addTo:"menu",search:!1,placeholder:"Search",noResults:"No results found."},e[n].configuration[t]={form:!1};var a,r,o,i}(jQuery);
/*	
 * jQuery mmenu toggles addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(e){var t="mmenu",s="toggles";e[t].addons[s]={_init:function(t){var a=this;this.opts[s],this.conf[s],this.__refactorClass(e("input",t),this.conf.classNames[s].toggle,"toggle"),this.__refactorClass(e("input",t),this.conf.classNames[s].check,"check"),e("input."+c.toggle+", input."+c.check,t).each(function(){var t=e(this),s=t.closest("li"),l=t.hasClass(c.toggle)?"toggle":"check",n=t.attr("id")||a.__getUniqueId();s.children('label[for="'+n+'"]').length||(t.attr("id",n),s.prepend(t),e('<label for="'+n+'" class="'+c[l]+'"></label>').insertBefore(s.children("a, span").last()))})},_setup:function(){},_add:function(){c=e[t]._c,a=e[t]._d,l=e[t]._e,c.add("toggle check"),n=e[t].glbl}},e[t].defaults[s]={},e[t].configuration.classNames[s]={toggle:"Toggle",check:"Check"};var c,a,l,n}(jQuery);
/*!
 * JavaScript Cookie v2.0.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		var _OldCookies = window.Cookies;
		var api = window.Cookies = factory(window.jQuery);
		api.noConflict = function () {
			window.Cookies = _OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				value = encodeURIComponent(String(value));
				value = value.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
					attributes.path    && '; path=' + attributes.path,
					attributes.domain  && '; domain=' + attributes.domain,
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var name = parts[0].replace(rdecode, decodeURIComponent);
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					cookie = converter && converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.get = api.set = api;
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init();
}));
/*
$bg_vermelho: #ff5845;
$bt_vermelho: #bf4234;
$bg_amarelo: #ffc95e;
$bt_amarelo: #e6b555;
$bg_verde: #39c3a2;
$bt_verde: #31a68a;
$bg_azul: #217dac;
$bt_azul: #1c6a92;
$bg_roxo: #35293f;
$bt_roxo: #2d2336;
*/
var json = {
    "cartao": {
        "lei": [
            // LAZER - AZUL
            {
            	"id":"1",
                "numero": "2424-95",
    			"colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Restaurantes, bares e afins.",
                "nomelei": "Água filtrada em bares e restaurantes",
                "nome": "Água filtrada de graça quando solicitado pelo cliente.",
                "dataLei":"22 de agosto de 1995",
                "descr1": "Obriga o fornecimento gratuito de água potável, filtrada e não mineral para consumo dos clientes.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/> <br/> <strong>Art. 1º -</strong> Será obrigatoriamente filtrada a água natural potável não mineral, a ser servida aos clientes nos bares, restaurantes e estabelecimentos similares do Estado do Rio de Janeiro.<br/><br/> <strong>Art. 2º -</strong> Ao Poder Executivo caberá definir o órgão fiscalizador do cumprimento desta Lei, bem como as penalidades a serem aplicadas aos infratores.<br/><br/><strong>Art. 3º -</strong> Esta Lei entrará em vigor 30 (trinta) dias após a sua publicação, revogadas as disposições em contrário.<br/><br/> <br/> Rio de Janeiro, 22 de outubro de 1995. <strong>Marcelo Alencar</strong> Governador </p><div class="separator"></div><p><b><b>Projeto de Lei nº</b> 46-A/95<br/> Mensagem nº ---<br/> Autoria: LUIZ RIBEIRO<br/> Data de publicação: 23-08-1995<br/> Data Publ. partes vetadas ---<br/> Assunto: Bar, Restaurante, Água, Defesa Do Consumidor, Saúde<br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação: <br/> Multa estabelecida pela Lei 7047/2015, de autoria do deputado André Ceciliano. </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ. (1 UFIR-RJ 2015=R$ 2,7119). </p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp: (21) 98890-4742</p>'
            },
            {
            	"id":"2",
                "numero": "3194-99",
    			"colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Hotéis, motéis, shoppings e supermercados.",
                "nomelei": "Água filtrada em hotéis, motéis, shoppings e supermercados",
                "nome": "Água filtrada de graça quando solicitado pelo cliente.",
                "dataLei":"15 de março de 1999",
                "descr1": "Estabelece obrigatoriedade do uso de água filtrada em todos os recintos de hotéis, motéis, shoppings, supermercados e clubes esportivos do Rio de Janeiro.",
                "html": '<h3>O Presidente da Assembléia Legislativa do Estado do Rio de Janeiro,</h3><p> em conformidade com o que dispõe o § 5º combinado com o § 7º do artigo 115 da Constituição Estadual, promulga a Lei nº 3.194, de 15 de março de 1999, oriunda do <b>Projeto de Lei nº</b> 1.243-A, de 1997.<br/> <br/> A ASSEMBLÉIA LEGISLATIVA DO ESTADO DO RIO DE JANEIRO<br/>D E C R E T A:<br/><br/> <strong>Art. 1º -</strong> É obrigatório o uso de água filtrada em todos o recintos de hotéis, motéis, shopping centers, supermercados e clubes esportivos do Estado do Rio de Janeiro.<br/>* Art. 1°-A Os estabelecimentos hoteleiros e similares, situados no Estado do Rio de Janeiro, ficam obrigados a disponibilizar água potável para consumo, gratuitamente a seus hóspedes, nas habitações e a seus funcionários.<br/>* Incluído pela Lei nº 5947/2011.<br/><br/><strong>Art. 2º -</strong> A fiscalização é atribuição do órgão estadual competente, e a penalidade pelo descumprimento desta Lei acarretará no pagamento de multa diária no valor de 150 (cento e cinqüenta) UFIRS.<br/><br/><strong>Art. 3º -</strong> Esta Lei entrará em vigor 120 (cento e vinte) dias após a data de sua publicação, revogadas as disposições em contrário.Assembléia Legislativa do Estado do Rio de Janeiro, em 15 de março de 1999.<br/><br/> Rio de Janeiro, 15 de março de 1999. <strong>Deputado Sérgio Cabral</strong> Presidente </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1243-A/97</b><br/> Mensagem nº ---<br/> Autoria: ANDRÉ LUIZ<br/> Data de publicação: 16-03-1999<br/> Data Publ. partes vetadas ---<br/> Assunto: Hotel, Motel, Centro Comercial, Água, Supermercado, Shopping Center, Clube, Água<br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>A penalidade pelo descumprimento desta Lei acarretará no pagamento de multa diária no valor de 150 UFIRs (1 UFIR-RJ 2015=R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"3",
                "numero": "5517-2009",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Estabelecimentos comerciais, transportes coletivos, fundações e etc.",
                "nomelei": "É proibido fumar",
                "nome": "Proibido consumir cigarros, cigarrilhas e afins em ambientes de uso coletivo público ou privado.",
                "dataLei":"17 de agosto de 2009",
                "descr1": "É proibido, em ambientes de uso coletivo, públicos ou privados, o consumo de cigarros, cigarrilhas, charutos ou de qualquer outro produto fumígeno, derivado ou não do tabaco.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>Art. 1º -</strong> Esta lei estabelece normas de proteção à saúde e de responsabilidade por dano ao consumidor, nos termos do artigo 24, incisos V, VIII e XII, da Constituição Federal, para criação de ambientes de uso coletivo livres de produtos fumígenos. <br/><br/><strong>Art. 2º -</strong> Fica proibido no território do Estado do Rio de Janeiro, em ambientes de uso coletivo, públicos ou privados, o consumo de cigarros, cigarrilhas, charutos ou de qualquer outro produto fumígeno, derivado ou não do tabaco. <br/><br/>§1º Aplica-se o disposto no caput deste artigo aos recintos de uso coletivo, total ou parcialmente fechados em qualquer dos seus lados por parede, divisória, teto ou telhado, ainda que provisórios, onde haja permanência ou circulação de pessoas. <br/>§2º Para os fins desta lei, a expressão recintos de uso coletivo compreende, dentre outros, os ambientes de trabalho, de estudo, de cultura, de culto religioso, de lazer, de esporte ou de entretenimento, áreas comuns de condomínios, casas de espetáculos, teatros, cinemas, bares, lanchonetes, boates, restaurantes, praças de alimentação, hotéis, pousadas, centros comerciais, bancos e similares, supermercados, açougues, padarias, farmácias, drogarias, repartições públicas, instituições de saúde, escolas, museus, bibliotecas, espaços de exposições, veículos públicos ou privados de transporte coletivo, inclusive veículos sobre trilhos, embarcações e aeronaves, quando em território fluminense, viaturas oficiais de qualquer espécie e táxis.<br/>§3º Nos locais previstos nos parágrafos 1º e 2º deste artigo, deverá ser afixado aviso da proibição, em pontos de ampla visibilidade, com indicação de telefone e endereço dos órgãos estaduais responsáveis pela vigilância sanitária e pela defesa do consumidor, bem como com a penalidade cabível em caso de descumprimento da presente lei. <br/><br/><strong>Art. 3º -</strong> Os proprietários ou responsáveis pelos estabelecimentos e veículos de transporte coletivo, mencionados no art. 2º e seus parágrafos, deverão fiscalizá-los e protegê-los, para que nos seus interiores não seja praticada infração ao disposto nesta lei.<br/>Parágrafo único. Verificada inobservância à proibição de uso de produtos fumígenos por parte dos consumidores ou usuários, caberá, ao proprietário ou responsável pelo estabelecimento ou pelos veículos de transporte coletivo, adverti-los sobre a proibição nela contida, bem como sobre a obrigatoriedade, caso persista na conduta coibida, de imediata retirada do local, se necessário mediante o auxílio de força policial.<br/><br/><strong>Art. 4° -</strong> No caso de descumprimento ao disposto nessa lei, o proprietário ou responsáveis pelo estabelecimento ou pelo meio de transporte coletivo em que ocorrer a infração ficarão sujeitos à pena de multa, que deverá ser fixada em quantia entre 1.548,63 (mil, quinhentos e quarenta e oito unidades e sessenta e três centésimos de UFIRs) e 15.486,27 (quinze mil, quatrocentos e oitenta e seis unidades e vinte e sete centésimos de UFIRs) UFIRs-RJ, sem prejuízo das sanções previstas na legislação sanitária.<br/><br/>§1° Na fixação do valor da multa, deverá ser levada em consideração, concomitantemente:<br/><br/><strong>I -</strong> grau de relevância;<br/><strong>II -</strong> a capacidade econômica do infrator;<br/><strong>III -</strong> extensão do prejuízo causado à saúde pública.<br/><br/>§2º No caso de reincidência, a multa será aplicada em dobro.<br/>§3º Aplicada a multa de que trata este artigo, terá o infrator o prazo de 30 (trinta) dias para formular impugnação, observada a ampla defesa e o contraditório.<br/>§4º A impugnação será dirigida à autoridade imediatamente superior, que sobre ela decidirá no prazo de 05 (cinco) dias, ressalvada a necessidade de diligências complementares para instrução do processo administrativo, com possibilidade de recurso para o Secretário de Estado de Saúde e Defesa Civil no caso de indeferimento.<br/><br/><strong>Art. 5º -</strong> Qualquer pessoa poderá relatar, ao órgão de vigilância sanitária ou de defesa do consumidor da respectiva área de atuação, fato que tenha presenciado em desacordo com o disposto nesta lei. <br/>§1º O relato de que trata o caput deste artigo conterá, concomitantemente:<br/><br/><strong>I -</strong> a exposição do fato e suas circunstâncias; <br/><strong>II -</strong> a declaração, sob as penas da lei, de que o relato corresponde à verdade; <br/><strong>III -</strong> a identificação do autor, com nome, prenome, número da cédula de identidade, seu endereço e assinatura. <br/><br/>§2º A critério do interessado, o relato poderá ser apresentado por meio eletrônico, no sítio de rede mundial de computadores  internet - dos órgãos referidos no caput deste artigo. <br/><br/><strong>Art. 6º -</strong> Esta lei não se aplica: <br/><br/><strong>I - -</strong> aos cultos religiosos em que produtos fumígenos façam parte do ritual; <br/><strong>II -</strong> às vias públicas e aos espaços ao ar livre; <br/><strong>III -</strong> às residências;<br/><strong>IV -</strong> aos quartos ou suítes de hotéis, pousadas e afins;<br/><strong>V -</strong> às tabacarias;<br/><strong>VI -</strong> às produções teatrais;<br/><strong>VII -</strong> aos locais de filmagens cinematográficas e televisivas.<br/><br/>§1º Para fins dessa lei, entende-se por tabacaria o estabelecimento que, segundo seu contrato social, seja destinado especificamente ao consumo no próprio local de cigarros, cigarrilhas, charutos, cachimbos ou de qualquer outro produto fumígeno, derivado ou não do tabaco, e que tenham mais de 50% (cinquenta por cento) de sua receita advinda da venda desses produtos.<br/>§2º As tabacarias deverão anunciar, nas suas entradas e no seu interior, que naquele local há utilização de produto fumígeno.<br/>§3° Nos locais indicados no inciso V deste artigo deverão ser adotadas condições de isolamento, ventilação ou exaustão do ar que impeçam a contaminação de ambientes protegidos por esta lei.<br/><br/><strong>Art. 7º -</strong> As penalidades decorrentes de infrações às disposições desta lei serão impostas, nos respectivos âmbitos de atribuições, pelos órgãos estaduais ou municipais de vigilância sanitária ou de defesa do consumidor. <br/>Parágrafo único. O início da aplicação das penalidades será precedido de ampla campanha educativa, realizada pelo Governo do Estado nos meios de comunicação, como jornais, revistas, rádio e televisão, nas escolas e universidade públicas e privadas, com a distribuição de panfletos educativos nos locais explicitados no artigo 2º e seus parágrafos, para esclarecimento sobre os deveres, proibições e sanções impostos por esta lei, além da nocividade do fumo à saúde.<br/><br/><strong>Art. 8º -</strong> Caberá ao Estado capacitar, monitorar e avaliar a implantação do Programa de Controle de Tabagismo nos Municípios.<br/><br/><strong>Art. 9º -</strong> Esta lei entra em vigor no prazo de 90 (noventa) dias após a data de sua publicação.<br/><br/> Rio de Janeiro, 17 de agosto de 2009. <strong>Sérgio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 2325/2009 <br/> Mensagem nº ---<br/> Autoria: PODER EXECUTIVO<br/> Data de publicação: 18-08-2009<br/> Data Publ. partes vetadas ---<br/> Assunto: Hotel, <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Proprietário está sujeito a multa que vai variar de 1.548,63 a 15.486,27 UFIR-RJ (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"4",
                "numero": "6788-14",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Restaurantes, bares e afins.",
                "nomelei": "Cobrança de couvert",
                "nome": "Couvert, bebidas, sobremesas e afins não podem ser cobrados se não tiverem sido solicitados.",
                "dataLei":"28 de maio de 2014",
                "descr1": "Couvert, bebidas, sobremesas e outros produtos não podem ser servidos sem a solicitação expressa do consumidor. Se forem, não poderão ser cobrados.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>Art. 1º -</strong> Os restaurantes, bares, lanchonetes e estabelecimentos congêneres ficam proibidos de servir qualquer produto que não tenha sido solicitado expressamente pelo consumidor. <br/>Parágrafo único Qualquer produto ofertado e entregue ao consumidor sem que este o tenha expressamente solicitado será considerado como cortesia ou amostra grátis, não podendo ser cobrado. <br/><br/><strong>Art. 2º -</strong> São exemplos de produtos abrangidos por esta Lei:<br/><br/><strong>I -</strong> couvert; <strong>II -</strong> refrigerantes;<strong>III -</strong> bebidas alcoólicas; <strong>IV -</strong> sobremesas; <br/><br/>Parágrafo único Os produtos descritos acima são meramente exemplificativos, não excluindo outros disponibilizados pelos estabelecimentos elencados no art. 1º. <br/><br/><strong>Art. 3º -</strong> O descumprimento desta lei sujeitará os infratores às sanções dispostas na Lei nº 8.078, de 11 de setembro de 1990, sem prejuízo de outras dispostas na legislação em vigor. <br/><br/><strong>Art. 4º -</strong> Esta lei entra em vigor na data de sua publicação.<br/><br/> Rio de Janeiro, 28 de maio de 2014. <strong>Luiz Fernando de Souza</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 2325/2009 </b><br/> Mensagem nº ---<br/> Autoria: GRAÇA PEREIRA<br/> Data de publicação: 29-05-2014<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa mínima de 200 UFIR-RJ (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"5",
                "numero": "6876-14",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Estabelecimentos comerciais em geral.",
                "nomelei": "Restrição de horário para uso de vale-refeição",
                "nome": "É proibido a qualquer estabelecimento impor horário ou data para aceitação de vale-refeição.",
                "dataLei":"27 de agosto de 2014",
                "descr1": "Os estabelecimentos que adotam vale-refeição como forma de pagamento não podem restringir sua aceitação a determinado dia, data ou horário.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>Art. 1º -</strong> É vedado ao estabelecimento, que adota o vale-refeição como forma de pagamento, restringir a aceitação deste benefício a determinado dia, data ou horário.<br/><br/><strong>Art. 2º -</strong> A infração das disposições desta Lei acarretará ao responsável infrator as sanções previstas no artigo 56 da Lei Federal nº 8.078, de 11 de setembro de 1990  Código de Defesa do Consumidor, aplicáveis na forma de seus artigos 57 a 60.<br/><br/><strong>Art. 3º -</strong> As despesas decorrentes da execução desta Lei correrão à conta de dotações orçamentárias próprias.<br/><br/><strong>Art. 4º -</strong> Esta Lei entra em vigor na data de sua publicação.<br/><br/> Rio de Janeiro, 27 de agosto de 2014. <strong>Luiz Fernando de Souza</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 2293-A/2013 <br/> Mensagem nº ---<br/> Autoria: RICARDO ABRAO<br/> Data de publicação: 28-08-2014<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Infrator está sujeito às punições previstas no Código de Defesa do Consumidor. Multa mínima de 200 UFIR-RJ (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"6",
                "numero": "4198-2003",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Bares, casas noturnas e afins.",
                "nomelei": "Consumação em bares e restaurantes",
                "nome": "Proibido cobrar consumação mínima maior que 2x o valor do ingresso. ",
                "dataLei":"15 de outubro de 2003",
                "descr1": "Bares e casas noturnas não podem cobrar consumação mínima maior que 2x o valor do ingresso. Restaurantes à quilo não podem cobrar por mais de 1kg pela perda da comanda.",
                "html": '<h3>A Governadora do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>Art. 1º -</strong> Fica proibido às casas noturnas, bares e boites do Estado do Rio de Janeiro, condicionar o fornecimento de produtos e serviços a limites quantitativos, bem como ao fornecimento de outro produto ou serviço, ainda que a título de consumação mínima. <br/><br/><strong>Art. 2º -</strong> As cartelas de consumo não deverão vir impressas com menções relativas a multas ou taxas abusivas cobradas por ocasião de seu extravio.<br/><br/><strong>Parágrafo único -</strong> <span style="text-decoration:line-through;">Por abusivo entende-se valor igual ou superior a 5 (cinco) vezes o valor de ingresso ao local e, em casos de estabelecimentos que comercializem refeições a peso, o valor da cobrança pelo extravio, não poderá ultrapassar a importância de 1 KG de produto comercializado.</span><br/><strong>* Parágrafo único -</strong> Por abusivo entende-se o valor igual a ou superior a 2 (duas) vezes o valor do ingresso ao local e, em casos de estabelecimentos que comercializem refeições a peso, o valor da cobrança pelo extravio do registro da pesagem, não poderá ultrapassar a importância equivalente ao valor de 1Kg de produto comercializado.* Nova redação dada pela Lei nº 4252, de 29 de dezembro de 2003.<br/><br/><strong>Art. 3º -</strong> O descumprimento desta Lei acarretará ao infrator a pena pecuniária de duzentas (200) UFIR`s.<br/><strong>* Art. 3º -</strong> O descumprimento desta Lei sujeitará o infrator às multas previstas na Lei Federal nº 8.078 de 11 de setembro de 1990, na forma disciplinada pela Lei Estadual nº 3.906, de 25 de julho de 2002.* Nova redação dada pela Lei nº 4252, de 29 de dezembro de 2003.<br/><br/><strong>Art. 4º -</strong> Esta Lei entrará em vigor na data de sua publicação.<br/><br/><strong>Art. 5º -</strong> Ficam revogadas as disposições em contrário.<br/><br/> Rio de Janeiro, 15 de outubro de 2003. <strong>Rosinha Garotinho</strong> Governadora </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 3050/2002 </b><br/> Mensagem nº ---<br/> Autoria: PAULO MELO<br/> Data de publicação: 16-10-2003<br/> Data Publ. partes vetadas ---<br/> Assunto: Casa Noturna, Bar, Consumação<br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de acordo com o Código de Defesa do Consumidor. Mínima de 200 UFIR-RJ (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"7",
                "numero": "5901-2011",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Bancos, hotéis, restaurantes, bares e afins.",
                "nomelei": "Álcool gel em bancos, bares, hotéis e restaurantes",
                "nome": "Álcool gel sanitizante disponível para os clientes.",
                "dataLei":"24 de fevereiro de 2011",
                "descr1": "Instituições bancárias, hotéis, restaurantes, bares e similares devem disponibilizar álcool gel sanitizante para seus usuários.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <span style="text-decoration:line-through;"><strong>Art. 1º -</strong> Ficam os hotéis, restaurantes, bares e similares localizados no Estado do Rio de Janeiro, obrigados a disponibilizarem gel sanitizante aos seus usuários.</span><br/><strong>* Art. 1º -</strong> Ficam as instituições bancárias, os hotéis, restaurantes, bares e similares localizados no Estado do Rio de Janeiro obrigados a disponibilizarem gel sanitizante aos seus usuários. (NR)<br/>* Nova redação dada pela Lei nº 6143/2012.<br/><br/><span style="text-decoration:line-through;"><strong>Art. 2º -</strong> Todos os hotéis, restaurantes, bares e similares deverão colocar o gel sanitizante em local visível e de fácil acesso para o consumidor.</span><br/><strong>* Art. 2º -</strong> Todas as instituições bancárias, os hotéis, restaurantes, bares e similares deverão colocar o gel sanitizante em local visível e de fácil acesso para o consumidor. (NR)<br/>* Nova redação dada pela Lei nº 6143/2012.<br/><br/><strong>Art. 3º -</strong> Os estabelecimentos citados no artigo 1º terão prazo de 90 (noventa) dias para se adequarem ao disposto nesta Lei.<br/><br/><strong>Art. 4º -</strong> O descumprimento das disposições contidas nesta Lei acarretará aos infratores as seguintes sanções:<br/><br/><strong>I -</strong> advertência escrita;<br/><strong>II -</strong> em caso de reincidência, multa no valor de 1000 (mil) UFIRs<br/><br/><strong>Art. 5º -</strong> O Poder Executivo baixará os Atos que se fizerem necessários a sua regulamentação e determinando as formas de fiscalização da presente Lei.<br/><br/><strong>Art. 6º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 24 de fevereiro de 2011. <strong>Sergio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1986/2009 <br/> Mensagem nº ---<br/> Autoria: MARCELO SIMÃO<br/> Data de publicação: 25-02-2011<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Advertência e multa em caso de reincidência.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"8",
                "numero": "6775-14",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Cinemas, teatros, lonas culturais e afins.",
                "nomelei": "Assento vizinho para acompanhante de deficientes físicos",
                "nome": "Assento vizinho reservado para acompanhante de deficiente físico.",
                "dataLei":"16 de maio de 2014",
                "descr1": "Cinemas, teatros, casas de show e afins devem reservar assento vizinho para acompanhante da pessoa com deficiência. Se houver preço promocional na entrada, deve ser estendido ao acompanhante.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>Art. 1º -</strong> Torna-se obrigatória a reserva de assento ao acompanhante da Pessoa com Deficiência, em teatros, cinemas, casas de shows e espetáculos em geral, no Estado do Rio de Janeiro.<br/><br/><strong>Parágrafo único.</strong> O assento a que ser refere o caput deste artigo deve estar localizado ao lado do espaço reservado a pessoa com deficiência. <br/><br/><strong>Art. 2º -</strong> Havendo preço promocional de entrada para pessoa com deficiência, deverá o benefício ser estendido ao acompanhante.<br/><br/><strong>Art. 3º -</strong> Os estabelecimentos do segmento cultural terão o prazo de 180 (cento e oitenta) dias, a partir da regulamentação da presente Lei, para promoverem as adequações necessárias.<br/><br/><strong>Art. 4º -</strong> O não cumprimento ao estabelecido nessa Lei, acarretará ao infrator as penalidades do Código de Defesa do Consumidor  CDC.<br/><br/><strong>Art. 5° -</strong> Esta Lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 16 de maio de 2014. <strong>Luiz Fernando Souza</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1787/2012 <br/> Mensagem nº ---<br/> Autoria: CLARISSA GAROTINHO<br/> Data de publicação: 19-05-2014<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"9",
                "numero": "6216-2012",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Cinemas.",
                "nomelei": "Higienização de óculos 3D",
                "nome": "Óculos 3D devem ser entregues higienizados e embalados individualmente em plástico estéril.",
                "dataLei":"20 de abril de 2012",
                "descr1": "Em sessões de filme 3D, os cinemas devem disponibilizar óculos higienizados e embalados individualmente em plástico estéril.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>Art. 1º -</strong> Os cinemas e demais estabelecimentos que exibem filmes em terceira dimensão-3D ficam obrigados a disponibilizar, para cada espectador, óculos apropriados para tal finalidade, devidamente higienizados e embalados individualmente em plástico estéril com fechamento a vácuo.<br/><br/><strong>Art. 2º -</strong> A devolução dos óculos após a sessão cinematográfica, isenta o espectador da cobrança de qualquer taxa extra pela sua utilização.<br/><br/><strong>Art. 3º -</strong> Não se aplica o disposto nesta lei quando se tratar de óculos descartáveis, que não podem ser reutilizados.<br/><br/><strong>Art. 4º -</strong> Nos locais onde os óculos são distribuídos, deverá ser afixado cartaz com o seguinte informe: Óculos higienizados nos termos da Lei Estadual nº....., com indicação do telefone e endereço dos órgãos estaduais responsáveis pela vigilância sanitária e pela defesa do consumidor, para reclamações em caso de irregularidade.<br/><br/><strong>Art. 5º -</strong> O descumprimento do disposto nesta lei sujeitará o infrator às sanções previstas no artigo 56 da Lei federal n.º 8.078, de 11 de setembro de 1990 - Código de Defesa do Consumidor, aplicáveis na forma de seus artigos 57 a 60, sem prejuízo das sanções previstas na legislação sanitária, a serem impostas, nos respectivos âmbitos de atribuições, pelos órgãos estaduais de defesa do consumidor e de vigilância sanitária.<br/><br/><strong>Art. 6º -</strong> As despesas decorrentes da execução desta lei, correrão à conta das dotações orçamentárias próprias.<br/><br/><strong>Art. 7º -</strong> Esta lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 20 de abril de 2012. <strong>Sergio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 8/2011 <br/> Mensagem nº ---<br/> Autoria: LUIZ MARTINS<br/> Data de publicação: 24-04-2012<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"10",
                "numero": "6501-13",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Bares, restaurantes, hotéis e moteís.",
                "nomelei": "Cobrança por venda no cartão",
                "nome": "Comerciantes não podem cobrar a mais por vendas à vista em cartões de crédito ou débito.",
                "dataLei":"12 de agosto de 2013",
                "descr1": "Nas transações à vista com cartão de crédito ou débido, é assegurado ao consumidor pagar o mesmo valor cobrado para venda em espécie.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>A ASSEMBLEIA LEGISLATIVA DO ESTADO DO RIO DE JANEIRO</strong><br/> D E C R E T A:<br/><br/><strong>Art. 1º -</strong> Fica assegurado ao consumidor o direito de pagar o mesmo preço cobrado pelo estabelecimento comercial para venda à vista ou em espécie para transações concretizadas por meio de cartão de crédito e/ou débito, bem como por meio de cheque à vista, ficando vedado ao estabelecimento comercial, diante de sua adesão ou aceitação, qualquer distinção pecuniária entre tais modalidades de pagamento. <br/><br/><strong>Art. 2º -</strong> O descumprimento do disposto nesta Lei sujeitará os infratores às penalidades previstas na Lei nº 8.078, de 11 de setembro de 1990.<br/><br/><strong>Art. 3º -</strong> Esta Lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 12 de agosto de 2013. <strong>Deputado Paulo Melo</strong> Presidente </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 653/2011 <br/> Mensagem nº ---<br/> Autoria: ÁTILA NUNES<br/> Data de publicação: 15-08-2013<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de acordo com o Código de Defesa do Consumidor. Mínima de 200 UFIR-RJ (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"11",
                "numero": "2519-96",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Estabelecimentos culturais e de lazer.",
                "nomelei": "Meia-entrada para estudantes",
                "nome": "Estudantes do 1º, 2º ou 3º graus, mediante comprovação, pagam meia-entrada.",
                "dataLei":"17 de janeiro de 1996",
                "descr1": "Nas transações à vista com cartão de crédito ou débido, é assegurado ao consumidor pagar o mesmo valor cobrado para venda em espécie.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>Art. 1º -</strong> Fica assegurado aos estudantes matriculados regularmente em Instituições de Ensino de 1º, 2º e 3º graus das redes públicas e/ou particular, o pagamento de meia entrada do valor efetivamente cobrado para o ingresso em locais de diversão, de espetáculos teatrais, musicais e circenses, em casa de exibição cinematográfica, praças esportivas e similares das áreas de esporte, cultura e lazer no Estado do Rio de Janeiro, na conformidade da presente Lei.<br/><br/><strong>Parágrafo único -</strong> Consideram-se casas de diversões, para efeito da presente Lei, qualquer local que proporcione entretenimento e lazer.<br/><br/><span style="text-decoration:line-through;"><strong>Art. 2º -</strong> Para benefício da presente Lei, os estudantes deverão apresentar a Carteira de Identificação Estudantil da UNIÃO NACIONAL DOS ESTUDANTES - UNE e/ou da UNIÃO BRASILEIRA DOS ESTUDANTES SECUNDARISTAS - UBES.</span><br/><br/><span style="text-decoration:line-through;"><strong>* Art. 2º -</strong> Para benefício da presente Lei, os estudantes deverão apresentar a Carteira de Identificação Estudantil da União Nacional dos Estudantes  UNE, da União Brasileira dos Estudantes Secundaristas e da Federação dos Estudantes de Niterói  FESN.* Nova redação dada pela Lei nº 4153 Controle de Leis, de 11/09/2003.</span><br/><br/><strong>*Art. 2º -</strong> Para benefício da presente Lei, os estudantes deverão apresentar documento de identificação estudantil expedido pelo correspondente estabelecimento de ensino e/ou pela associação estudantil e/ou pela agremiação estudantil a que pertençam.<br/><br/><strong>§ 1º -</strong> É obrigatória a disponibilização de ingressos no valor de meia-entrada, no local do evento e em todos os postos de venda.<br/><br/><strong>§ 2º -</strong> Na falta de ingresso de meia-entrada, o ingresso comum deverá ser colocado à venda no valor de meia-entrada, para os estudantes beneficiados pela presente Lei.<br/><br/>* Nova redação dada pela Lei nº 4816/2006.<br/><br/><strong>* § 3º -</strong> Fica proibida a celebração de convênios entre as entidades descritas no caput deste artigo e empresas privadas com a finalidade de transferir a prerrogativa de expedir documento de identificação estudantil.* Incluído pela Lei nº 5158/2007.<br/><br/><strong>* § 4º -</strong> Fica vedada a emissão de documento de identificação estudantil por empresas privadas que tenham celebrado convênio ou contrato com esta finalidade com as entidades elencadas no caput do presente artigo.* Incluído pela Lei nº 5158/2007.<br/><br/><strong>* § 5º -</strong> Fica a entidade que violar o disposto nos parágrafos anteriores sujeita a multa de 10 (dez) mil UFIRs e à pena de ficar proibida de emitir o referido documento pelo prazo de 01 (um) ano.(NR)* Incluído pela Lei nº 5158/2007.<br/><br/><span style="text-decoration:line-through;"><strong>* Art. 3º -</strong> Pela presente Lei, ficam as direções das Instituições de Ensino de 1º, 2º e 3º graus obrigadas a fornecerem, anualmente, às entidades representativas dos estudantes, listagens dos alunos regularmente matriculados em seus cursos.* Suprimido pela Lei nº 4161/2003.Controle de Leis</span><br/><br/><span style="text-decoration:line-through;"><strong>* Art. 4º -</strong> O Poder Executivo fornecerá listagem dos locais sujeitos à aceitação da meia-entrada no Estado do Rio de Janeiro, em conformidade com a presente Lei.</span><br/><br/>* Suprimido pela Lei nº 4161/2003.Controle de Leis<br/><br/><strong>Art. 5º -</strong> VETADO<br/><br/><span style="text-decoration:line-through;"><strong>Art. 6º -</strong> O Poder Executivo dentro do prazo de 60 (sessenta) dias, a contar da publicação da presente Lei, procederá a sua regulamentação, provendo, inclusive, sanções aos locais infratores, variáveis de 5 (cinco) a 10 (dez) UFERJs.</span><br/><br/><span style="text-decoration:line-through;">* Art. 6º -</strong> O estabelecimento que não cumprir a presente Lei estará sujeito à pena de multa de 1000 (hum mil) UFIRŽs até 10.000 (dez mil) UFIRŽs ou qualquer outra unidade fiscal que venha a substituí-la.</span><br/><br/><span style="text-decoration:line-through;">* Nova redação dada pela Lei nº 4161/2003.Controle de Leis</span><br/><br/><strong>* Art. 6º -</strong> O não atendimento do previsto nesta Lei sujeitará o responsável ao pagamento de multa nos termos do Código de Defesa do Consumidor.* Nova redação dada pela Lei 6984/2015. <br/><br/><strong>Art. 7º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 17 de janeiro de 1996. <strong>Marcello Alencar</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 233-A/91 <br/> Mensagem nº ---<br/> Autoria: WAGNER SIQUEIRA<br/> Data de publicação: 18-01-1996<br/> Data Publ. partes vetadas ---<br/> Assunto: Educação, Cultura, Cinema, Estudante, Meia Entrada, Entretenimento <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de acordo com o Código de Defesa do Consumidor. Mínima de 200 UFIR-RJ (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"12",
                "numero": "3364-00",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Casas de diversões, praças desportivas e similares.",
                "nomelei": "Meia-entrada para menores de 21 anos",
                "nome": "Menores de 21 anos pagam 50% do valor original do ingresso.",
                "dataLei":"07 de janeiro de 2000",
                "descr1": "É assegurado o pagamento de 50% (cinqüenta por cento) do valor efetivamente cobrado para o ingresso em casas de diversões, praças desportivas e similares aos jovens de até 21 anos (vinte e um) anos de idade.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>Art. 1º -</strong> É assegurado o pagamento de 50% (cinqüenta por cento) do valor efetivamente cobrado para o ingresso em casas de diversões, praças desportivas e similares aos jovens de até 21 anos (vinte e um) anos de idade.<br/><br/><strong>Art. 2º -</strong> Consideram-se casas de diversões, para efeitos desta Lei, os estabelecimentos que realizem espetáculos musicais, artísticos, circenses, teatrais, cinematográficos, atividades sociais, recreativas e quaisquer outros que proporcionem lazer e entretenimento.<br/><br/><strong>Parágrafo único -</strong> A meia-entrada corresponderá sempre à metade do valor do ingresso cobrado, ainda que sobre os preços incidam descontos ou atividades promocionais.<br/><br/><strong>Art. 3º -</strong> A Prova de condição prevista no Art. 1º, para recebimento do benefício, será feita por qualquer documento de identidade expedido pelos órgãos públicos.<br/><br/><span style="text-decoration:line-through;"><strong>Art. 4º -</strong> O Poder Executivo regulamentará a presente lei no prazo de 90 (noventa) dias.</span><br/><br/><strong>*Art. 4º -</strong> O estabelecimento que não cumprir a presente Lei estará sujeito à pena de multa no valor de 1000 (mil) UFIRs.Parágrafo único  Em caso de reincidência a multa será dobrada, e assim sucessivamente.<br/>* Nova redação dada pela Lei nº 3570, de 28 de maio de 2001, publicada em 31/05/2001.<br/><br/><strong>Art. 5º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 07 de janeiro de 2000. <strong>Anthony Garotinho</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 190/99 <br/> Mensagem nº ---<br/> Autoria: TÂNIA RODRIGUES<br/> Data de publicação: 11-01-2000<br/> Data Publ. partes vetadas ---<br/> Assunto: Espetáculo Musical, Artístico, Circo, Teatro, Recreativa, Lazer, Entreterimento, Meia Entrada, Cultura, Cinema <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de mil UFIR-RJ. Em caso de reincidência a multa será dobrada, e assim sucessivamente (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"13",
                "numero": "6501-2013",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Estabelecimentos comerciais em geral.",
                "nomelei": "Valor mínimo para compras no cartão",
                "nome": "Proibido exigir valor mínimo para compras e consumo com cartão de crédito ou débito.",
                "dataLei":"15 de abril de 2014",
                "descr1": "Fica proibida aos estabelecimentos comerciais, no âmbito do Estado do Rio de Janeiro, a exigência de valor mínimo para compras e consumo com cartão de crédito ou débito.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Fica proibida aos estabelecimentos comerciais, no âmbito do Estado do Rio de Janeiro, a exigência de valor mínimo para compras e consumo com cartão de crédito ou débito.<strong>Art. 2º -</strong> O descumprimento ao que dispõe a presente Lei sujeitará o estabelecimento infrator às sanções estabelecidas pela Lei nº 8.078, de 11 de setembro de 1990 (Código de Defesa do Consumidor), em seu Artigo 56, aplicáveis na forma dos Artigos 57 a 60.<strong>Art. 3º -</strong> Esta Lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 15 de abril de 2014. <strong>Luiz Fernando de Souza</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 223/2011 <br/> Mensagem nº ---<br/> Autoria: ÁTILA NUNES<br/> Data de publicação: 16-04-2014<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"14",
                "numero": "1867-91",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Hotéis e motéis.",
                "nomelei": "Preservativos em motéis",
                "nome": "Preservativos gratuitos para hóspedes.",
                "dataLei":"09 de outubro de 1991",
                "descr1": "Fica proibida aos estabelecimentos comerciais, no âmbito do Estado do Rio de Janeiro, a exigência de valor mínimo para compras e consumo com cartão de crédito ou débito.",
                "html": '<p>O Presidente da Assembléia Legislativa do Estado do Rio de Janeiro, nos termos do inciso XXIV do artigo 99 da Constituição Estadual, promulga a Lei nº 1867, de 1991, oriunda do <b>Projeto de Lei nº</b> 311, de 1991. <br/><br/> <strong>Art. 1º -</strong> Os hotéis e motéis, sediados no Estado do Rio de Janeiro, ficam obrigados a colocarem, à disposição de seus hóspedes, preservativos do tipo camisa-de-vênus, para uso dos mesmos.<br/><br/><strong>Art. 2º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposição em contrário. <br/><br/> Rio de Janeiro, 09 de outubro de 1991. <strong>Deputado José Nader</strong> Presidente </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 311/91 <br/> Mensagem nº ---<br/> Autoria: Luiz Cadorna<br/> Data de publicação: 16-10-1991<br/> Data Publ. partes vetadas ---<br/> Assunto: Hotel, Motel, Saúde, Preservativo <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Procon pode aplicar multa estabelecida no Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ. (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"15",
                "numero": "7015-15",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Estabelecimentos comerciais em geral.",
                "nomelei": "TV em bares e restaurantes",
                "nome": "Proibido cobrar por exibição de programação televisiva em ambientes coletivos.",
                "dataLei":"01 de junho de 2015",
                "descr1": "Estabelecimentos não podem cobrar por exibição de programação televisiva em ambientes coletivos.",
                "html": '<h3>A Assembléia legislativa do Estado do Rio de Janeiro,</h3><br/><p> <strong>D E C R E T A:</strong> <br/><br/> <strong>Art.1º -</strong> Fica permitida a exibição de programação televisiva em ambientes coletivos no Estado do Rio de Janeiro.<br/><br/><strong>Parágrafo único.</strong> Incluem-se as TVs por assinatura no caput deste artigo.<br/><br/><strong>Art. 2º -</strong> Os ambientes coletivos de que trata esta Lei, não poderão cobrar nenhum tipo de tarifa para ingresso no local.<br/><br/><strong>Art. 3º -</strong> Esta Lei entrará em vigor na data de sua publicação. <br/><br/> Assembléia Legislativa do Estado do Rio de Janeiro, 01 de junho de 2015. <strong>Deputado Jorge Picciani</strong> Presidente </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 2328/2013 <br/> Mensagem nº ---<br/> Autoria: PAULO RAMOS<br/> Data de publicação: 02-06-2015<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Procon pode aplicar multa estabelecida no Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"16",
                "numero": "2051-92",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Estádios, ginásios esportivos e parques aquáticos do Estado do Rio de Janeiro.",
                "nomelei": "Pessoas com deficiência em estádios",
                "nome": "Entrada gratuita para pessoas com deficiência.",
                "dataLei":"30 de dezembro de 1992",
                "descr1": "A entrada em estádios, ginásios esportivos e parques aquáticos do Estado do Rio de Janeiro é gratuita para portadoras de deficiências, em todas as competições realizadas.",
                "html": '<p><strong>O GOVERNADOR DE ESTADO DO RIO DE JANEIRO,</strong><br/> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1º -</strong> Fica concedida gratuidade de entrada nos Estádios, Ginásios Esportivos e Parques Aquáticos do Estado do Rio de Janeiro, em todas as competições que se realizarem, às pessoas portadoras de deficiências.<br/><br/><strong>Art. 2º -</strong> As administrações dos Estádios, Ginásios Esportivos e Parques Aquáticos promoverão o credenciamento e a expedição de passes especiais para os interessados.<br/><br/><strong>Art. 3º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário.<br/><br/> Rio de Janeiro, 30 de dezembro de 1992.<strong>LEONEL BRIZOLA</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 398/91 <br/> Mensagem nº ---<br/> Autoria: ADROALDO PEIXOTO<br/> Data de publicação: 31-12-1992<br/> Data Publ. partes vetadas ---<br/> Assunto: Gratuidade, Deficiente Físico, Portador De Deficiência, Estádio <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Procon pode aplicar multa estabelecida no Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"17",
                "numero": "6483-13",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Todo Estado do Rio de Janeiro.",
                "nomelei": "Discriminação  e  preconceito",
                "nome": "Práticas discriminatórias por motivo de raça, cor, etnia, religião e afins são passíveis de multa.",
                "dataLei":"04 de julho de 2013",
                "descr1": "Toda prática discriminatória por motivo de raça, cor, etnia, religião ou procedência nacional é passível de multa.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Esta Lei disciplina a aplicação das penalidades administrativas, motivadas pela prática de atos de discriminação racial.<br/><br/><strong>Art. 2º -</strong> Será punido, nos termos desta lei, todo ato discriminatório por motivo de raça, cor, etnia, religião ou procedência nacional praticado no Estado do Rio de Janeiro, por qualquer pessoa, jurídica ou física, inclusive a que exerça função pública.<br/><br/><strong>Art. 3º -</strong> Consideram-se atos discriminatórios por motivo de raça, cor, etnia, religião ou procedência nacional, para os efeitos desta lei:<br/><br/><strong>I -</strong> praticar qualquer tipo de ação violenta, constrangedora, intimidatória ou vexatória;<br/><strong>II -</strong> proibir o ingresso ou a permanência em ambiente ou estabelecimento aberto ao público;<br/><strong>III -</strong> criar embaraços à utilização das dependências comuns e áreas não-privativas de edifícios;<br/><strong>IV -</strong> recusar, retardar, impedir ou onerar a utilização de serviços, meios de transporte ou de comunicação, consumo de bens, hospedagem em hotéis, motéis, pensões e estabelecimentos congêneres ou o acesso a espetáculos artísticos ou culturais;<br/><strong>V -</strong> recusar, retardar, impedir ou onerar a locação, compra, aquisição, arrendamento ou empréstimo de bens móveis ou imóveis;<br/><strong>VI -</strong> praticar o empregador, ou seu preposto, atos de coação direta ou indireta sobre o empregado;<br/><strong>VII -</strong> negar emprego, demitir, impedir ou dificultar a ascensão em empresa pública ou privada, assim como impedir ou obstar o acesso a cargo ou função pública ou certame licitatório;<br/><strong>VIII -</strong> praticar, induzir ou incitar, pelos meios de comunicação, o preconceito ou a prática de qualquer conduta discriminatória;<br/><strong>IX -</strong> criar, comercializar, distribuir ou veicular símbolos, emblemas, ornamentos, distintivos ou propagandas que incitem ou induzam à discriminação;<br/><strong>X -</strong> recusar, retardar, impedir ou onerar a prestação de serviço de saúde, público ou privado.<br/><br/><strong>Art. 4º -</strong> A prática dos atos discriminatórios a que se refere esta lei será apurada em processo administrativo, que terá início mediante:<br/><br/><strong>I -</strong> reclamação do ofendido ou de seu representante legal, ou ainda de qualquer pessoa que tenha ciência do ato discriminatório;<br/><strong>II -</strong> ato ou ofício de autoridade competente.<br/><strong>Art. 5º -</strong> Aquele que for vítima da discriminação, seu representante legal, ou quem tenha presenciado os atos a que se refere o artigo 3º desta lei, poderá relatá-los à Órgão definido pelo Poder Executivo.<br/><br/><strong>§ 1º -</strong> O relato de que trata o caput deste artigo conterá:<br/>1 - a exposição do fato e suas circunstâncias;<br/>2 - a identificação do autor, com nome, prenome, número da cédula de identidade, seu endereço e assinatura.<br/><br/><strong>§ 2º -</strong> A critério do interessado, o relato poderá ser apresentado por meio eletrônico, no sítio de rede mundial de computadores do Órgão competente. <br/><strong>§ 3º -</strong> Recebida a denúncia, competirá ao Órgão Competente:<br/><strong>I -</strong> promover a instauração do processo administrativo devido para apuração e imposição das sanções cabíveis;<br/><strong>II </strong> transmitir notícia à autoridade policial competente, para a elucidação cabível, quando o fato descrito caracterizar infração penal.<br/><strong>Art. 6º -</strong> O Estado do Rio de Janeiro para cumprir o disposto nesta lei, poderá firmar convênios com Municípios.<br/><br/><strong>Art. 7º -</strong> As sanções aplicáveis aos que praticarem atos de discriminação nos termos desta lei serão as seguintes:<br/><br/><strong>I -</strong> advertência;<br/><strong>II -</strong> multa de até 1000 (mil) UFIRŽS - Unidades Fiscais do Estado do Rio de Janeiro<br/><strong>III -</strong> multa de até 3000 (três mil) UFIRŽS - Unidades Fiscais do Estado do Rio de Janeiro, em caso de reincidência;<br/><strong>IV -</strong> suspensão da licença estadual para funcionamento por 30 (trinta) dias;<br/><strong>V -</strong> cassação da licença estadual para funcionamento.<br/><strong>§ 1º -</strong> Quando a infração for cometida por agente público, servidor público ou militar, no exercício de suas funções, sem prejuízo das sanções previstas nos incisos I a III deste artigo, serão aplicadas as penalidades disciplinares cominadas na legislação pertinente.<br/><strong>§ 2º -</strong> O valor da multa será fixado tendo-se em conta as condições pessoais e econômicas do infrator e não poderá ser inferior a 500 (quinhentas) UFIRŽS  Unidades Fiscais do Estado do Rio de Janeiro.<br/><strong>§ 3º -</strong> A multa poderá ser elevada até o triplo, quando se verificar que, em virtude da situação econômica do infrator, sua fixação em quantia inferior seria ineficaz.<br/><strong>§ 4º -</strong> Quando for imposta a pena prevista no inciso V deste artigo, deverá ser comunicada a autoridade responsável pela outorga da licença, que providenciará a sua execução, comunicando-se, igualmente, a autoridade federal ou municipal para eventuais providências no âmbito de sua competência.<br/><br/><strong>Art. 8º -</strong> Na apuração dos atos discriminatórios praticados com violação desta lei, deverão ser observados os procedimentos previstos na Lei nº 5.427, de 01 de abril de 2009, que regula o processo administrativo no âmbito da Administração Pública Estadual.<br/><br/><strong>Art. 9 -</strong> O Poder Executivo regulamentará a presente Lei.<br/><br/><strong>Art. 10 -</strong> Esta lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 04 de julho de 2013. <strong>Sérgio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 3309/2010 <br/> Mensagem nº ---<br/> Autoria: GILBERTO PALMARES<br/> Data de publicação: 05-07-2013<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Punição vai de multa (mínimo de mil Ufir) a cassação da licença do estabelecimento.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
             {
                "id":"18",
                "numero": "3295-99",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Todos os meios de transporte e repartições públicas e privadas.",
                "nomelei": "Acesso para cães-guia",
                "nome": "Cães-guias de deficientes podem acessar qualquer meio de transporte e locais públicos e privados.",
                "dataLei":"16 de novembro de 1999",
                "descr1": "Portadores de deficiência visual podem ingressar e permanecer em qualquer meio de transporte e repartições públicas e privadas com seus cães-guias.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Os cães-guias quando acompanhados de pessoas portadoras de deficiência visual (cegueira e visão sub-normal), ou de treinador, ou acompanhante habilitado poderão ingressar e permanecer nas repartições públicas ou privadas, em qualquer meio de transporte, seja hidroviário, ferroviário, metroviário, de cooperativas, táxis ou afins, em todo e qualquer estabelecimento comercial, industrial, de serviços de promoção, proteção e recuperação de saúde e demais locais públicos.<br/><br/><strong>§ 1º -</strong> Para efeito desta Lei entende-se por:<br/><br/><strong>a) -</strong> CÃO GUIA - o cão-guia que tenha obtido certificado de uma Escola filiada e aceita pela Federação Internacional de Escolas de Cães-Guias para Cegos, que esteja a serviço de uma pessoa portadora de deficiência visual ou em estágio de treinamento.<br/><strong>b) -</strong> COOPERATIVAS - transportes autorizados, kombis, micro ônibus e afins ou qualquer outro transporte alternativo de que se faça necessária sua utilização.<br/><strong>c) -</strong> LOCAIS PÚBLICOS - hotéis, restaurantes, shoppings, lojas de diversão ou lazer e, de modo geral, todo e qualquer lugar aberto ao público, quer seja a título gratuito ou oneroso.<br/><br/><strong>§ 2º -</strong> Nos casos previstos no caput deste artigo, é vedada a cobrança de preço, tarifa ou acréscimo vinculado, direta ou indiretamente, ao ingresso ou presença do cão-guia.<br/><strong>§ 3º -</strong> Sem prejuízo do disposto neste artigo, o proprietário do cão-guia responde civil e criminalmente pelos danos ou lesões causadas pelo mesmo.<br/><br/><strong>Art. 2º -</strong> Toda e qualquer pessoa que pertencer, prestar serviços ou ser proprietário dos locais mencionados no caput do artigo anterior e que venham a impedir o ingresso e permanência da pessoa portadora de deficiência visual que necessite de cão-guia, estará atentando contra os direitos humanos e será passível de punição prevista em lei.<br/><br/><strong>Art. 3º -</strong> Os estabelecimentos comerciais e industriais, as repartições públicas ou privadas, bem como os meios de transportes mencionados no artigo 1º, em caso de discriminação ou não cumprimento de estabelecido nesta Lei serão punidos com penas de interdição, multas e outras penalidades previstas em lei.<br/><br/><strong>Art. 4º -</strong> A pessoa portadora de deficiência visual tem direito de manter pelo menos um cão-guia em sua residência e de transitar com o mesmo, seguro em coleira, nas áreas e dependências comuns do respectivo condomínio, independentemente de restrições à presença de animais na convenção do condomínio ou regimento interno.<br/><br/><strong>Art. 5º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 16 de novembro de 1999. <strong>Anthony Garotinho</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 2330/98 <br/> Mensagem nº ---<br/> Autoria: SOLANGE AMARAL, TANIA RODRIGUES<br/> Data de publicação: 24-11-1999<br/> Data Publ. partes vetadas ---<br/> Assunto: Cão, Portador De Deficiência, Deficiente Visual, Deficiente Físico, Animal, Transporte <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Penas vão de multa à interdição do estabelecimento que negar a entrada.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
             {
                "id":"19",
                "numero": "3559-01",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Escolas, hospitais e empresas em geral.",
                "nomelei": "Discriminação de soropositivos",
                "nome": "Estabelecimentos que discriminem portadores de HIV devem ser penalizados.",
                "dataLei":"15 de maio de 2001",
                "descr1": "Estabelecimentos (como escolas, hospitais e empresas em geral) que discriminem pessoas portadoras de HIV devem ser penalizados.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> A violação do princípio da igualdade de direitos prevista no Art. 9º, § 1º da Constituição do Estado do Rio de Janeiro, quando praticada por estabelecimentos que discriminem portadores do vírus HIV, sintomáticos e assintomáticos, constitui infração administrativa.<br/><br/><strong>Art. 2º -</strong> O Poder Executivo, através do seu órgão competente, penalizará todo estabelecimento comercial, industrial, entidades educacionais públicas e privadas, creches, hospitais, casas de saúde, clínicas, e associações civis ou prestadoras de serviços que, por atos de seus proprietários ou prepostos, discriminem portadores do vírus HIV, sintomáticos e assintomáticos.<br/><br/><strong>Art. 3º -</strong> Constituem infrações administrativas as ações que visem discriminar os portadores do vírus HIV, dentre outras :<br/><br/><strong>I </strong> A exigência do teste HIV no processo de seleção, para admissão ao emprego;<br/><strong>II </strong> A exigência do teste HIV para permanência no emprego, mediante ameaça de rescisão contratual;<br/><strong>III </strong> A exigência do teste HIV como condição de concurso público ou privado;<br/><strong>IV </strong> A exigência do teste HIV como condição de ingresso ou permanência em creches e estabelecimentos educacionais;<br/><strong>V </strong> A recusa em aceitar o ingresso ou permanência de alunos soropositivos em estabelecimentos educacionais e creches;<br/><strong>VI </strong> A recusa de atendimento a portadores de vírus HIV, sintomáticos e assintomáticos, em hospitais públicos e privados;<br/><strong>VII </strong> A recusa na manutenção do custeio do tratamento para os portadores do vírus HIV, e na autorização para exames complementares dos pacientes associados ou segurados dos planos de saúde;<br/><strong>VIII </strong> A demissão do soropositivo ou portador do HIV em razão de sua condição de portador do vírus HIV. <br/><br/><strong>Art. 4º -</strong> Consideram-se infratores desta Lei as pessoas que, direta ou indiretamente, tenham concorrido para o cometimento da infração administrativa.<br/><br/><strong>Art. 5º -</strong> Serão aplicadas as seguintes penalidades administrativas aos infratores :<br/><br/><strong>I </strong> Multa de 50 a 50.000 UFIRŽS, ou outra unidade que venha a substitui-la;<br/><strong>II </strong> Cassação de licença de funcionamento dos estabelecimentos infratores.<br/><br/><strong>Art. 6º -</strong> Constituem penas alternativas :<br/><br/><strong>I </strong> A promoção de campanha publicitária esclarecendo sobre os direitos dos soropositivos e portadores do HIV, de acordo com a legislação federal, estadual e municipal vigente;<br/><strong>II </strong> A confecção de material informativo sobre a prevenção e os cuidados da AIDS;<br/><strong>III </strong> A prestação de trabalhos em estabelecimentos de atenção aos portadores do vírus HIV.<br/><br/><strong>Art. 7º -</strong> Fica o Poder Executivo autorizado a criar o Fundo Estadual de Informação, Prevenção e Assistência da AIDS, para o qual reverterão as multas arrecadadas, que serão aplicadas em entidades que assistam aos portadores do vírus HIV.<br/><br/><strong>Parágrafo único </strong> A Comissão Estadual de AIDS, criada pela Resolução nº 700, de 3 de dezembro de 1991, administrará os recursos mencionados no caput deste artigo.<br/><br/><strong>Art. 8º -</strong> O poder de polícia será exercido pelo órgão estadual competente.<br/><br/><strong>Art. 9º -</strong> O descumprimento da presente Lei será apurado através de processo administrativo pelo órgão competente, com ampla defesa, independente das sanções civis e penais cabíveis, definidas em normas específicas.<br/><br/><strong>Art. 10 </strong> O Ministério Público fiscalizará a aplicação desta Lei, incumbindo-lhe a propositura das ações competentes.<br/><br/><strong>Art. 11 </strong> Todos os cidadãos podem comunicar às autoridades administrativas as infrações à presente Lei.<br/><br/><strong>Art. 12  </strong>O Poder Executivo deverá manter setor especializado para receber denúncias relacionadas às infrações à presente Lei.<br/><br/><strong>Art. 13 </strong> Fica o Poder Executivo autorizado a baixar as normas regulamentares ao presente projeto de Lei, no prazo de 60 (sessenta) dias após a sua publicação.<br/><br/><strong>Art. 14 </strong> Esta Lei entrará em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 15 de maio de 2001. <strong>Anthony Garotinho</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 54-A/99 <br/> Mensagem nº ---<br/> Autoria: CARLOS MINC<br/> Data de publicação: 24-05-2001<br/> Data Publ. partes vetadas ---<br/> Assunto: Hiv, Aids, Discriminação, Doente <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 50 a 50 mil UFIRs (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
            	"id":"88",
                "numero": "4240-2003",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Deficiente Físico, Portador De Deficiência, Cultura, Lazer, Meia-Entrada",
                "nomelei": "Meia entrada para pessoas com deficiência",
                "nome": "Fica instituida em todo o território do Estado do Rio de Janeiro a meia-entrada para os deficientes físicos em estabelecimentos culturais e de lazer.",
                "dataLei":"16 de novembro de 2003",
                "descr1": "Institui em todo o território do estado do Rio de Janeiro, a meia-entrada para os deficientes físicos em estabelecimentos culturais e de lazer, e dá outras providências.",
                "html": '<h3>A Governadora do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Fica instituída em todo o território do Estado do Rio de Janeiro a meia-entrada para os deficientes físicos em estabelecimentos culturais e de lazer.<br/><strong>§ 1º -</strong> Os estabelecimentos abrangidos por esta Lei serão os destinados a diversão, espetáculos teatrais, musicais e circenses, exibições cinematográficas, eventos esportivos e outros similares nestas áreas.<br/><strong>§ 2º -</strong> Ficam excetuados deste dispositivo os estabelecimentos que já possuem gratuidade em sua entrada, como Estádios, Ginásios Esportivos e Parques Náuticos do Estado do Rio de Janeiro, conforme a Lei nº 2051, de 30 de dezembro de 1992.<br/><br/><strong>Art. 2º -</strong> Não poderá haver restrição de horário para o benefício da meia-entrada para os deficientes físicos.<br/><br/><strong>*Art. 3º -</strong> O estabelecimento que não cumprir a presente Lei estará sujeito a sanção de multa no valor de 1.000 (mil) UFIR-RJ.<br/><strong>Parágrafo único -</strong> Em caso de reincidência, a multa será dobrada ... V E T A D O ...<br/><br/><strong>Art. 4º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de mil UFIR-RJ.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"20",
                "numero": "1886-1991",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Empresas em geral.",
                "nomelei": "Discriminação sexual",
                "nome": "Proíbe exigência de testes para verificação de gravidez para admissão ou permanência no emprego.",
                "dataLei":"08 de novembro de 1991",
                "descr1": "Proíbe chantagem sexual, como exigência de teste de urina ou sangue para verificação de gravidez e comprovação de esterilização para admissão ou permanência no emprego.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Esta lei estabelece penalidades aos estabelecimentos localizados no Estado do Rio de Janeiro que discriminem mulheres, violando o princípio que adota a igualdade de direitos entre homens e mulheres de acordo com o § 1º do artigo 9º da Constituição Estadual, garantindo a proteção dos direitos individuais e coletivos.<br/><br/><span style="text-decoration:line-through;"><strong>Art. 2º -</strong> Dentro de sua competência, o Poder Executivo penalizará todo estabelecimento comercial, industrial, entidades, representações, associações, sociedades civis ou de prestações de serviços que, por atos de seus proprietários ou prepostos, discriminem mulheres em função de seu sexo, ou contra elas adotem atos de coação ou violência, tais como exigência ou tentativa de vantagem sexual da mulher por parte do patrão ou preposto, mediante ameaça de rescisão contratual.</span><br/><strong>*Art. 2º -</strong> Dentro de sua competência, o Poder Executivo penalizará todo estabelecimento comercial, industrial, entidades, representações, associações, sociedades civis ou de representação de serviços que, por atos de seus proprietários ou prepostos, discriminem pessoas em função do seu sexo, ou contra elas adotem atos de coação ou violência, tais como exigência ou tentativa de obter vantagem sexual por parte do superior hierárquico, independentemente do seu sexo e da sua opção sexual, com o objetivo de exigir favor sexual do subordinado, independentemente do seu sexo ou da sua opção sexual, sob ameaça ou efetivo prejuízo no trabalho ou perda do emprego.<br/><strong>* Nova redação dada pelo artigo 2º da Lei 3179/99 Controle de Leis</strong><br/><strong>Parágrafo Único -</strong> Considera-se como prática de restrição ao direito da mulher ao emprego, entre outras, a adoção de medidas não previstas na legislação pertinente e especialmente:<br/><br/><strong>I -</strong> Exigência ou solicitação de teste de urina ou sangue, para verificação de estado de gravidez, processos de seleção para admissão ao emprego;<br/><strong>II -</strong> Exigência ou solicitação de comprovação de esterelização, para admissão ou permanência no emprego;<br/><strong>III -</strong> Exigência de exame ginecológico periódico, como condição para permanência no emprego;<br/><strong>IV -</strong> Discriminação às mulheres casadas, ou mães, nos processos de seleção e treinamento ou rescisão de contrato de trabalho.<br/><br/><strong>Art. 3º -</strong> O descumprimento da presente Lei será apurado através de processo administrativo pelo órgão competente, independente das sanções civis e penais cabíveis, definidas em normas específicas.<br/><br/><strong>§ 1º -</strong> Aos infratores desta Lei serão aplicadas as seguintes penalidades administrativas:<br/><strong>I -</strong> advertência;<br/><strong>II -</strong> multa de 1 a 1000 UFERJs ou outra unidade que venha substituí-la;<br/><strong>III -</strong> VETADO.<br/><strong>IV -</strong> VETADO.<br/><strong>§ 2º -</strong> VETADO.<br/><strong>§ 3º -</strong> Considera-se infratora desta Lei a pessoa que direta ou indiretamente tenha concorrido para o cometimento da infração administrativa.<br/><br/><strong>Art. 4º -</strong> Todos os cidadãos podem comunicar às autoridades administrativas as infrações à presente Lei.<br/><br/><strong>Art. 5º -</strong> O Poder Executivo deverá manter setor especializado para receber denúncias relacionadas às infrações à presente Lei.<br/><br/><strong>Art. 6º -</strong> O Poder Executivo regulamentará a presente Lei em 60 (sessenta) dias, a partir de sua publicação.<br/><br/><strong>Art. 7º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 08 de novembro de 1991. <strong>Leonel Brizola</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 64/91 <br/> Mensagem nº ---<br/> Autoria: CARLOS MINC<br/> Data de publicação: 211-11-1991<br/> Data Publ. partes vetadas ---<br/> Assunto: Saúde, Violência, Assédio Sexual, Mulher <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 1 a mil UFERJs. (1 UFERJ = 44,2655 UFIR-RJ. 1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"21",
                "numero": "7041-2015",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Estabelecimentos comerciais, industriais, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços.",
                "nomelei": "Discriminação de LGBTs",
                "nome": "Estabelecimentos que discriminem orientação sexual ou identidade de gênero podem ser punidos.",
                "dataLei":"15 de julho de 2015",
                "descr1": "Estabelecimentos comerciais, industriais, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços que discriminem as pessoas em razão de sua orientação sexual e identidade de gênero estão sujeitas a penalidades administrativas.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º</strong> - Esta Lei estabelece infrações administrativas a condutas discriminatórias motivadas por preconceito de sexo ou orientação sexual, praticadas por agentes públicos e estabelecimentos localizados no Estado do Rio de Janeiro, ou que discriminem pessoas em virtude de sua orientação sexual.<br><br> <strong>Parágrafo único</strong> - Para efeitos de aplicação desta Lei, o termo “sexo” é utilizado para distinguir homens e mulheres, enquanto o termo “orientação sexual” refere-se à heterossexualidade, à homossexualidade e à bissexualidade.<br><br> <strong>Art. 2º</strong> - O Poder Executivo, no âmbito de sua competência, penalizará estabelecimento público, comercial e industrial, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços que, por atos de seus proprietários ou prepostos, discriminem pessoas em função de preconceito de sexo e de orientação sexual ou contra elas adotem atos de coação, violência física ou verbal ou omissão de socorro.<br><br> <strong>Parágrafo único</strong> - Entende-se por discriminação:<br><br> <strong>I</strong> - recusar ou impedir o acesso ou a permanência ou negar atendimento nos locais previstos no Artigo 2º desta Lei bem como impedir a hospedagem em hotel, motel, pensão, estalagem ou qualquer estabelecimento similar;<br><br> <strong>II</strong> - impor tratamento diferenciado ou cobrar preço ou tarifa extra para ingresso ou permanência em recinto público ou particular aberto ao público;<br><br> <strong>III</strong> - impedir acesso ou recusar atendimento ou permanência em estabelecimentos esportivos, sociais, culturais, casas de diversões, clubes sociais, associações, fundações e similares;<br><br> <strong>IV</strong> - recusar, negar, impedir ou dificultar a inscrição ou ingresso de aluno em estabelecimento de ensino público ou privado de qualquer nível;<br><br> <strong>V</strong> - impedir, obstar ou dificultar o acesso de pessoas, devidamente habilitadas a qualquer cargo ou emprego da Administração direta ou indireta, bem como das concessionárias e permissionárias de serviços públicos;<br><br> <strong>VI</strong> – negar, obstar ou dificultar o acesso de pessoas, devidamente habilitadas a qualquer cargo ou emprego em empresa privada; <br><br> <strong>VII</strong> - impedir o acesso ou o uso de transportes públicos, como ônibus, metrô, trens, barcas, catamarãs, táxis, vans e similares;<br><br> <strong>VIII</strong> - negar o acesso, dificultar ou retroceder o atendimento em qualquer hospital, pronto socorro, ambulatório ou em qualquer estabelecimento similar de rede pública ou privada de saúde;<br><br> <strong>IX</strong> - praticar, induzir ou incitar pelos meios de comunicação social a discriminação, preconceito ou prática de atos de violência ou coação contra qualquer pessoa em virtude de preconceito de sexo e de orientação sexual;<br><br> <strong>X</strong> - obstar a visita íntima, à pessoa privada de liberdade, nacional ou estrangeiro, homem ou mulher, de cônjuge ou outro parceiro, no estabelecimento prisional onde estiver recolhido, em ambiente reservado, cuja privacidade e inviolabilidade sejam assegurados, obedecendo sempre, os parâmetros legais pertinentes à segurança do estabelecimento, nos termos das normas vigentes;<br><br> <strong>Art. 3º</strong> - Quando o agente público, no cumprimento de suas funções, praticar um ou mais atos descritos no art. 2º desta Lei, a sua responsabilidade será apurada por meio de procedimento administrativo disciplinar instaurado pelo órgão competente, sem prejuízo das sanções civis e penais cabíveis, definidas em normas específicas. <br><br> <strong>Art. 4º</strong> - A Administração Pública poderá aplicar aos infratores, sempre garantida à prévia e ampla defesa e observado a Lei estadual n.º 5.427 de 01 de abril de 2009 em especial o seu Capítulo XVIII, com as seguintes sanções:<br><br> <strong>I</strong> – advertência;<br> <strong>II</strong> – multa até o limite de 22.132 UFIR-RJ <br> <strong>III</strong> - suspensão da inscrição estadual por até 60 (sessenta) dias;<br> <strong>IV</strong> - cassação da inscrição estadual.<br><br> <strong>§1º</strong> - As sanções previstas nos incisos deste artigo serão aplicadas gradativamente com base na reincidência do infrator.<br><br> <strong>§2º</strong> - As multas de que trata o inciso II deste artigo, deverão ser fixadas de acordo com a gravidade do fato e da capacidade econômica do infrator.<br><br> <strong>Art. 5º</strong> - Caberá à Secretaria de Estado de Assistência Social e Direitos Humanos a aplicação das penalidades, podendo, inclusive editar os atos complementares pertinentes ao inciso II do artigo 4º desta Lei.<br><br> <strong>Art. 6º</strong> - Esta lei não se aplica às instituições religiosas, templos religiosos, locais de culto, casas paroquiais, seminários religiosos, liturgias, crença, pregações religiosas, publicações e manifestação pacífica de pensamento, fundada na liberdade de consciência, de expressão intelectual, artística, científica, profissional, de imprensa e de religião de que tratam os incisos IV, VI, IX e XIII do art. 5º da Constituição Federal.<br><br> <strong>Art. 7º</strong> - O Poder Executivo regulamentará a presente Lei em 60 (sessenta) dias a partir de sua publicação.<br><br> <strong>Art. 8º</strong> - Esta Lei entrará em vigor na data de sua publicação, revogada a <a href="http://alerjln1.alerj.rj.gov.br/CONTLEI.NSF/c8aa0900025feef6032564ec0060dfff/cdee250b14447c00032568ea006760e4?OpenDocument" class="lei-link">Lei 3.406, de 15 de maio de 2000</a>. </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O não cumprimento da lei pode acarretar em advertência, multa até o limite de 22.132 UFIR-RJ; Suspensão da inscrição estadual por até 60 dias; Cassação da inscrição estadual.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>As pessoas podem recorrer ao Alô Alerj 0800-0220008 (horário comercial), ou ao <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.riosemhomofobia.rj.gov.br\', \'_system\');\">Disque Cidadania LGBT</a>: 0800-0234567 </br></p><p>WhatsApp: (21) 98890-4742</p>'
            },
            {
                "id":"200",
                "numero": "5331-2008",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Cinemas.",
                "nomelei": "Cadeiras de cinema",
                "nome": "As salas de cinema são obrigadas a numerar as cadeiras, e informar, no ingresso, o assento que o consumidor ocupará.",
                "dataLei":"24 de novembro de 2008",
                "descr1": "",
                "html": '<h4>A Assembléia legislativa do Estado do Rio de Janeiro DECRETA:</h4><br/></br/><strong>Art. 1º</strong> - Ficam as salas de cinema dos municípios do Estado do Rio de Janeiro com população igual ou superior a 300.000 (trezentos mil) habitantes, obrigadas a numerar suas cadeiras, informando ao consumidor, no momento da compra do ingresso, o assento que irá ocupar.<br/><br/>* Nova redação dada pela Lei nº 6540/2013.<br/><br/><strong>Parágrafo único.</strong> O número do assento adquirido deverá, obrigatoriamente, estar registrado no cupom de ingresso.<br/><br/><strong>Art. 2º</strong> Os referidos estabelecimentos terão o prazo de 180 (cento e oitenta) dias, a contar da publicação desta Lei, para se adequarem às suas disposições.<br/><br/><strong>Art. 3º</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário.',
                "multatexto": '<h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"201",
                "numero": "7056-2015",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Hotéis.",
                "nomelei": "Produtos vendidos em hotéis",
                "nome": "Hotéis devem informar ao cliente na hora da reserva os preços de todos os serviços e produtos vendidos no estabelecimento.",
                "dataLei":"24 de novembro de 2008",
                "descr1": "",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/><strong>Art. 1°</strong> - Os hotéis, demais meios de hospedagem e similares, situados no âmbito do Estado do Rio de Janeiro, ficam obrigados a comunicar ao cliente no ato da reserva, os preços de suas diárias e cardápios, bem como de todos os produtos e taxas possíveis de serem cobradas do consumidor, inclusive, quando for o caso, do couvert artístico ou consumação.<br/><br/><strong>Parágrafo único.</strong> Os hotéis, demais meios de hospedagem e similares em que houver refrigeradores com produtos para auto atendimento dos hóspedes também ficam obrigados a informar no ato da reserva, a relação dos preços dos produtos ali disponíveis.<br/><br/><strong>Art. 2°</strong> - É vedado aos hotéis, demais meios de hospedagem e similares o acréscimo, às notas de despesas de seus clientes, de qualquer importância que não conste do cardápio ou lista de preços, previamente fornecido pelo estabelecimento comercial ao cliente.<br/><br/><strong>Art. 3°</strong> - O não cumprimento da legislação em tela ensejará aos estabelecimentos as penalidades contidas no artigo 56 do Código de Defesa do Consumidor, incisos I, VII, IX e X;<br/><br/><strong>§ 1º</strong> - As sanções devem seguir sempre do menor potencial punitivo para o maior, em escala de reincidência;<br/><br/><strong>§ 2°</strong> - Em caso de multa o menor valor a ser aplicado deverá ser no valor correspondente a 2000 UFIRs (duas mil Unidades Fiscais do Estado do Rio de Janeiro)<br/><br/><strong>Art. 4°</strong> - Esta Lei entra em vigor na data de sua publicação.',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ. (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"96",
                "numero": "7115-2015",
                "colorheader": "white",
                "categoria": "Lazer",
                "categoriaslug": "lazer",
                "subcategoria": "Hotéis.",
                "nomelei": "Multa para estabelecimento que proibir amamentação",
                "nome": "O estabelecimento que proibir ou constranger o ato da amamentação em suas instalações estará sujeito à multa. Independentemente da existência de áreas destinadas ao aleitamento no estabelecimento, a amamentação poderá ocorrer em qualquer local, mesmo onde seja proibido o consumo de alimentos, pois a amamentação é um ato livre entre mãe e filho.",
                "dataLei":"24 de novembro de 2015",
                "descr1": "Dispõe sobre o direito ao aleitamento materno no estado do Rio de Janeiro, e dá outras providências.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/><strong>Art. 1°</strong> - Toda criança tem direito ao aleitamento materno, como recomenda a Organização Mundial da Saúde - OMS.<br/><br/><strong>Art. 2°</strong> - O estabelecimento situado no Estado do Rio de Janeiro, que proibir ou constranger o ato da amamentação em suas instalações, está sujeito à multa.<br/><br/><strong>Parágrafo único</strong> Independente da existência de áreas segregadas para o aleitamento, a amamentação é ato livre e discricionário entre mãe e filho e poderá ocorrer em qualquer local, mesmo onde seja proibido o consumo de alimentos.<br/><br/><strong>Art. 3º</strong> - Para fins desta Lei, estabelecimento é um local, que pode ser fechado ou aberto, destinado à atividade de comércio, cultural, recreativa, ou prestação de serviço público ou privado.<br/><br/><strong>Art. 4º</strong> - O estabelecimento que descumprir a presente lei será multado em 500 UFIRs (quinhentas Unidades Fiscais de Referência) e, em caso de reincidência a multa terá o valor 1000 UFIRs (mil Unidades Fiscais de Referência).<br/><br/><strong>Art. 5º</strong> - A execução da presente lei correrá por conta de dotações orçamentárias próprias, suplementadas se necessário.<br/><br/><strong>Art. 6º</strong> - O Poder Executivo regulamentará no que couber a presente lei.<br/><br/><strong>Art. 7º</strong> - Esta Lei entra em vigor na data de sua publicação.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O estabelecimento que descumprir a norma será multado em 500 UFIRs. Em caso de reincidência, a multa terá o valor 1000 UFIRs. (UFIR = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },                      
            //SERVIÇOS - VERMELHO
            {
                "id":"22",
                "numero": "5901-2011",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Bancos, hotéis, restaurantes, bares e afins.",
                "nomelei": "Álcool gel em bancos, bares, hotéis e restaurantes",
                "nome": "Álcool gel sanitizante disponível para os clientes.",
                "dataLei":"24 de fevereiro de 2011",
                "descr1": "Instituições bancárias, hotéis, restaurantes, bares e similares devem disponibilizar álcool gel sanitizante para seus usuários.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <span style="text-decoration:line-through;"><strong>Art. 1º -</strong> Ficam os hotéis, restaurantes, bares e similares localizados no Estado do Rio de Janeiro, obrigados a disponibilizarem gel sanitizante aos seus usuários.</span><br/><strong>* Art. 1º -</strong> Ficam as instituições bancárias, os hotéis, restaurantes, bares e similares localizados no Estado do Rio de Janeiro obrigados a disponibilizarem gel sanitizante aos seus usuários. (NR)<br/>* Nova redação dada pela Lei nº 6143/2012.<br/><br/><span style="text-decoration:line-through;"><strong>Art. 2º -</strong> Todos os hotéis, restaurantes, bares e similares deverão colocar o gel sanitizante em local visível e de fácil acesso para o consumidor.</span><br/><strong>* Art. 2º -</strong> Todas as instituições bancárias, os hotéis, restaurantes, bares e similares deverão colocar o gel sanitizante em local visível e de fácil acesso para o consumidor. (NR)<br/>* Nova redação dada pela Lei nº 6143/2012.<br/><br/><strong>Art. 3º -</strong> Os estabelecimentos citados no artigo 1º terão prazo de 90 (noventa) dias para se adequarem ao disposto nesta Lei.<br/><br/><strong>Art. 4º -</strong> O descumprimento das disposições contidas nesta Lei acarretará aos infratores as seguintes sanções:<br/><br/><strong>I -</strong> advertência escrita;<br/><strong>II -</strong> em caso de reincidência, multa no valor de 1000 (mil) UFIRs<br/><br/><strong>Art. 5º -</strong> O Poder Executivo baixará os Atos que se fizerem necessários a sua regulamentação e determinando as formas de fiscalização da presente Lei.<br/><br/><strong>Art. 6º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 24 de fevereiro de 2011. <strong>Sergio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1986/2009 <br/> Mensagem nº ---<br/> Autoria: MARCELO SIMÃO<br/> Data de publicação: 25-02-2011<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Advertência e multa em caso de reincidência.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"23",
                "numero": "6418-13",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "TV a cabo, jornais, revistas, cartões, telefone, internet, academia e cursos.",
                "nomelei": "Cancelamento de serviços por telefone ou internet",
                "nome": "Assinatura de serviços continuados deve poder ser cancelada pelo mesmo meio por qual foi contratada.",
                "dataLei":"21 de março de 2013",
                "descr1": "A assinatura de serviços continuados, como Tv a cabo, jornais, revistas, cartões, telefone, internet, academia e cursos, deve poder ser cancelada pelo mesmo meio por qual foi contratada.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>Art. 1º -</strong> Ficam as empresas prestadoras de serviços continuados, obrigadas a assegurar aos consumidores a faculdade de solicitar o cancelamento do serviço prestado, pelos mesmos meios e facilidades com os quais foi solicitado, quando na aquisição do mesmo.<br/><br/><strong>Art. 2º -</strong> Obrigam-se, ainda, a facilitar o cancelamento do serviço por meio do telefone, da Rede Mundial de Computadores  Internet ou do correio.<br/><br/><strong>Art. 3º -</strong> Considera-se, para os efeitos desta lei, como prestação de serviços continuados, sem prejuízos de outros similares:<br/><br/><strong>I -</strong> assinaturas de jornais e revistas e outros periódicos;<br/><strong>II -</strong> televisão por assinatura, provedores de Internet, linha telefônica fixa ou móvel, transmissão de dados e serviços acrescidos;<br/><strong>III -</strong> academias de ginástica e cursos livres;<br/><strong>IV -</strong> títulos de capitalização e seguros;<br/><strong>V -</strong> cartões de crédito e cartões de desconto.<br/><br/><br/><strong>Art. 4º -</strong> Os infratores ficam sujeitos às penalidades previstas no artigo 56 da Lei Federal nº 8078, de 11 de setembro de 1990.<br/><br/><strong>Art. 5º -</strong> Esta Lei entrará em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 21 de março de 2013. <strong>Sergio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 202/2011 <br/> Mensagem nº ---<br/> Autoria: BERNARDO ROSSI<br/> Data de publicação: 22-03-2013<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de acordo com o Código de Defesa do Consumidor. Mínima de 200 UFIR-RJ. (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"24",
                "numero": "4223-2003",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Bancos.",
                "nomelei": "Atendimento em bancos",
                "nome": "Atendimento não pode demorar mais de 20 minutos (dias úteis) ou 30 minutos (véspera/pós feriado).",
                "dataLei":"24 de novembro de 2003",
                "descr1": "O atendimento em bancos não pode demorar mais de 20 minutos, em dias normais, e de 30 minutos, em véspera e depois de feriados.",
                "html": '<h3>A Governadora do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <span style="text-decoration:line-through;"></span><strong>Art. 1º -</strong> Fica determinado que agências bancárias situadas no âmbito do Estado do Rio de Janeiro, deverão colocar à disposição dos seus usuários, pessoal suficiente e necessário, no setor de caixas, para que o atendimento seja efetivado no prazo máximo de 20 (vinte) minutos, em dias normais, e de 30 (trinta) minutos, em véspera e depois de feriados.Parágrafo único - As agências bancárias deverão informar aos seus usuários, em cartaz fixado na sua entrada, a escala de trabalho do setor de caixas colocados à disposição.<br/><br/><span style="text-decoration:line-through;"></span><strong>* Art. 1º -</strong> Fica determinado que agências bancárias, situadas no âmbito do Estado do Rio de Janeiro, deverão colocar, à disposição dos seus usuários, pessoal suficiente e necessário, no setor de caixas e na gerência, para que o atendimento seja efetivado no prazo máximo de 20 (vinte) minutos, em dias normais, e de 30 (trinta) minutos, em véspera e depois de feriados.Parágrafo único. As agências bancárias deverão informar, aos seus usuários, em cartaz fixado na sua entrada, a escala de trabalho do setor de caixas e da gerência colocados à disposição. * Nova redação dada pela Lei 6750/2014.<br/><br/><span style="text-decoration:line-through;"></span><strong>Art. 2º -</strong> O controle de atendimento de que trata esta Lei pelo cliente será realizado através de emissão de senhas numéricas emitidas pela instituição bancária, onde constará:<br/><br/><strong>* Art. 2º -</strong> O controle de atendimento de que trata esta Lei pelo cliente será realizado através de emissão de senhas numéricas emitidas pela instituição bancária e devolvidas aos clientes após o devido ao atendimento, onde constará:<br/>* Nova redaçao dada pela Lei 6771/2014.<br/><br/><strong>I </strong> nome e número da instituição;<br/><br/><strong>II </strong> número da senha;<br/><br/><strong>III </strong> data e horário de chegada do cliente;<br/><br/><span style="text-decoration:line-through;"></span><strong>IV </strong> rubrica do funcionário da instituição.<br/><br/><strong>* IV </strong> horário do efetivo atendimento, rubricado pelo funcionário da instituição. (NR)<br/>* Nova redação dada pela Lei 6085/2011.<br/><br/><span style="text-decoration:line-through;"><strong>Parágrafo único </strong> O atendimento preferencial e exclusivo dos caixas destinados aos maiores de sessenta e cinco (65) anos, gestantes, pessoas portadoras de deficiência física e pessoas com crianças de colo também será através de senha numérica e oferta de, no mínimo, 15 (quinze) assentos ergometricamente corretos.</span><br/><br/><strong>* Parágrafo único.</strong> O atendimento preferencial e exclusivo dos caixas destinados aos maiores de sessenta (60) anos, gestantes, pessoas com deficiência e pessoas com crianças de colo também será através de senha numérica e oferta de, no mínimo, 15 (quinze) assentos ergometricamente corretos. <br/>* Nova redação dada pela Lei 6771/014.<br/><br/><strong>Art. 3º -</strong> Na prestação de serviços oriundos de celebração de convênios, não poderá haver discriminação entre clientes e não clientes, nem serem estabelecidos, nas dependências, local e horário de atendimento diversos daqueles previstos para as demais atividades.<br/><br/><strong>Art. 4º -</strong> O não cumprimento do disposto nesta Lei sujeitará o infrator às seguintes sanções, não prejudicando outras ações penais:<br/><br/><span style="text-decoration:line-through;"><strong>I  advertência;</strong></span><br/>* I  advertência, com prazo de 30 (trinta) dias para regularização;<br/>* Nova redação dada pela Lei 6085/2011.<br/><br/><span style="text-decoration:line-through;"><strong>II </strong> multa de 10.000 (dez mil) à 50.000 (cinqüenta mil) UFIRs;</span><br/><strong>* II </strong> multa de R$10.000 (dez mil reais) na primeira autuação;* Nova redação dada pela Lei 6085/2011.<br/><br/><strong>III </strong> V E T A D O .<br/><br/><strong>* IV </strong> multa de R$20.000 (vinte mil reais) na segunda autuação;* Incluído pela Lei 6085/2011.<br/><br/><strong>* V </strong> multa de R$40.000 (quarenta mil reais) na terceira autuação;* Incluído pela Lei 6085/2011.<br/><br/><strong>* VI </strong> multa de R$80.000 (oitenta mil reais) na quarta autuação;* Incluído pela Lei 6085/2011.<br/><br/><strong>VII </strong> multa de R$120.000 (cento e vinte mil reais) na quinta autuação. <br/>* Incluído pela Lei 6085/2011.<br/><br/><strong>Parágrafo único </strong> V E T A D O .<br/><br/><strong>Art. 5º -</strong> As denúncias dos usuários dos serviços bancários quanto ao descumprimento desta Lei deverão ser encaminhadas à Comissão de Defesa do Consumidor nas diversas esferas municipal, estadual e federal.<br/><br/><span style="text-decoration:line-through;"><strong>Art. 5 -A -</strong> As agências bancárias deverão fixar, em local visível, o tempo máximo de espera para atendimento nos caixas, o direito à senha numérica e o direito a assentos especiais, no mínimo 15 (quinze) para uso dos idosos, pessoas com deficiência, gestantes e pessoas com criança de colo.* Incluído pela Lei 6085/2011.</span><br/><br/><strong>* Art. 5-A -</strong> As agências bancárias deverão fixar, em local visível:<br/>a) o tempo máximo de espera para atendimento nos caixas e na gerência;<br/>b) o direito à senha numérica e o direito a assentos especiais, em número proporcional ao tamanho de agências, para uso dos idosos, pessoas com deficiência, gestantes e pessoas com crianças de colo. <br/>* Nova redação dada pela Lei 6750/2014.<br/>v<strong>* Parágrafo único.</strong> As agências bancárias deverão informar, ainda, que a senha numérica deverá conter a data e o horário de chegada e do efetivo atendimento, rubricada pelo funcionário.<br/>* Incluído pela Lei 6771/2014.<br/><br/><strong>Art. 6º -</strong> As agências bancárias terão o prazo máximo de noventa (90) dias, a contar da data da publicação desta Lei, para adaptarem-se.<br/><br/><strong>Art. 7º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 24 de novembro de 2003. <strong>Rosinha Garotinho</strong> Governadora </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 936-A/1999 <br/> Mensagem nº ---<br/> Autoria: CARLOS MINC<br/> Data de publicação: 26-11-2003<br/> Data Publ. partes vetadas ---<br/> Assunto: Agência Bancária , Banco, Consumidor , Cliente, Usuário <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Advertência, e multa que pode variar de 20 mil a 120 mil reais em caso de reincidência.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"25",
                "numero": "3243-99",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Empresas que prestam serviços públicos por concessão estadual.",
                "nomelei": "Interrupção no fornecimento de água, luz ou gás",
                "nome": "Proibido interromper prestação dos serviços ou fornecimento de bens sem aviso prévio de 5 dias.",
                "dataLei":"06 de setembro de 1999",
                "descr1": "Empresas que prestam serviços públicos por concessão estadual não podem interromper a prestação dos serviços ou fornecimento de bens sem aviso prévio com 5 dias de antecedência.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>Art. 1º -</strong> Fica vedado às empresas concessionárias de serviços públicos interromper a prestação dos serviços ou o fornecimento de bens, por qualquer motivo, sem aviso prévio por escrito ao consumidor, com 5 (cinco) dias de antecedência.<br/><br/><strong>§ 1º -</strong> O não cumprimento do disposto no caput deste artigo implicará na imediata retomada da prestação do serviço ou fornecimento do bem, bem como no pagamento de multa de 1.000 UFIR a 10.000 UFIR.<br/><strong>§ 2º -</strong> Na fixação da multa referida no parágrafo anterior serão levadas em consideração como circunstâncias agravantes: ser o infrator reincidente; trazer a infração conseqüências danosas à saúde ou à segurança do consumidor, deixar o infrator, tendo conhecimento do ato lesivo, de tomar as providências para evitá-lo; ter o infrator agido com dolo ou má-fé.<br/><strong>§ 3º -</strong> A multa referida no § 1º deste artigo será aplicada pelos órgãos de proteção e defesa do consumidor, mediante provocação do interessado, respeitado o procedimento legal, e será distribuída na forma prevista nos arts. 24 a 27 do Decreto Federal nº 861/93.<br/><br/><strong>* Art. 2º -</strong> O aviso prévio a que se refere o art. 1º deverá também se dar através de contato telefônico, por meio eletrônico (e-mail), telemensagens ou outros meios de que disponha o consumidor e que sejam de conhecimento da concessionária.* Incluído pela Lei nº 5649/2010.<br/><br/><strong>*Art. 3º -</strong> <span style="text-decoration:line-through;">Art. 2º -</span> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário.* Renumerado pela Lei nº 5649/2010. <br/><br/> Rio de Janeiro, 06 de setembro de 1999. <strong>Anthony Garotinho</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 2403/98 <br/> Mensagem nº ---<br/> Autoria: SERGIO CABRAL<br/> Data de publicação: 08-09-1999<br/> Data Publ. partes vetadas ---<br/> Assunto: Concessionária De Serviço Público, Defesa Do Consumidor, Prestação De Serviço, Saúde, Prestador De Serviço <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de mil a 10 mil UFIR-RJ.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</br>- Agenersa (água, luz e gás): 0800 024 9040 (horário comercial)</br> - Anatel (telefonia): 1331 (horário comercial)</br>- Aneel (Luz): 167 (24h)</p>'
            },
            {
                "id":"26",
                "numero": "2772-1997",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Escolas públicas e privadas.",
                "nomelei": "Limite de peso da mochila de estudantes",
                "nome": "Mochila não pode ultrapassar 5% do peso do aluno da pré-escola e 10% do peso de aluno do 1º grau.",
                "dataLei":"25 de agosto de 1997",
                "descr1": "Peso máximo das mochilas de alunos do 1º grau não pode ultrapassar 5% do peso da criança da pré-escola e 10% do peso do aluno do primeiro grau.",
                "html": '<p>O Presidente da Assembléia Legislativa do Estado do Rio de Janeiro, nos termos do § 7º do Artigo 115 da "Constituição Estadual", promulga a Lei nº 2.772 de 25 de agosto de 1997, oriunda do <b>Projeto de Lei nº</b> 805-A, de 1996.<br/><br/> <strong>Art. 1º -</strong> O peso máximo total do material escolar transportado diariamente por alunos do pré-escolar e 1º grau em mochilas, pastas e similares não poderá ultrapassar:<br/><br/><strong>I -</strong> 5% do peso da criança do pré-escolar;<br/><strong>II -</strong> 10% do peso do aluno do 1º grau.<br/><br/><strong>Art. 2º -</strong> Caberá à escola, através de seus coordenadores, a definição do material escolar a ser transportado diariamente.<br/><br/><strong>Art. 3º -</strong> O material que exceder o peso máximo permitido deverá ficar guardado em armários fechados individuais ou coletivos.<br/><br/><strong>§ 1º -</strong> No caso dos armários coletivos, será designado pela escola um responsável pela abertura do mesmo no início das aulas, e seu fechamento ao final das mesmas.<br/><strong>§ 2º -</strong> Não poderá ser feito nenhum tipo de cobrança pela guarda do material.<br/><br/><strong>Art. 4º -</strong> O desrespeito aos limites de peso previstos nesta Lei implicará a atribuição das seguintes penalidades à escola transgressora:<br/><br/><strong>I -</strong> advertência;<br/><strong>II -</strong> multa de 3 (três) UFERJs por aluno com excesso de material escolar.<br/><br/><strong>Art. 5º -</strong> É obrigatória a afixação das normas contidas nesta Lei em local visível aos alunos, pais e docentes.<br/><br/><strong>Art. 6º -</strong> Esta lei entrará em vigor na data de sua publicação, revogadas todas as disposições em contrário. <br/><br/> Rio de Janeiro, 25 de agosto de 1997. <strong>Deputado Sergio Cabral Filho</strong> Presidente </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 805-A/96 <br/> Mensagem nº ---<br/> Autoria: CARLOS MINC<br/> Data de publicação: 26-08-1997<br/> Data Publ. partes vetadas ---<br/> Assunto: Educação, Criança, Quadro De Aviso, Rede De Ensino Estadual, Rede De Ensino Particular, Multa, Material Escolar <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Escola pode receber advertência e multa.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p><p>Agenersa (água, luz e gás): 0800 024 9040 (horário comercial) Anatel (telefonia): 1331 (horário comercial). Aneel (Luz): 167 (24h).</p>'
            },
            {
                "id":"27",
                "numero": "6807-14",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Filas.",
                "nomelei": "Preferência para autistas em filas",
                "nome": "Pessoas com transtorno do espectro do autismo têm preferência em filas (locais públicos e privados)",
                "dataLei":"23 de junho de 2014",
                "descr1": "Pessoas portadoras do transtorno do espectro do autismo (TEA) têm preferência em filas de estabelecimentos públicos e privados.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1° -</strong> Os Órgãos Públicos Estaduais e os estabelecimentos privados ficam obrigados a dar atendimento prioritário, não retendo, em filas, as pessoas portadoras do Transtorno do Espectro do Autismo (TEA).<br/><br/><strong>Art. 2° -</strong> As escolas da rede pública de ensino Estadual e as privadas do ensino fundamental ao ensino médio deverão observar o disposto no Parágrafo único do Art. 2º da Lei nº 6.708, de 13 de março de 2014.<br/><br/><strong>Art. 3° -</strong> Terão prioridade de tramitação, que não poderá ser superior a 60 (sessenta) dias, nos Órgãos públicos Estaduais, as solicitações de benefícios instituídos por lei para pessoas portadoras do Transtorno do Espectro do Autismo (TEA); <br/><br/><strong>Art. 4° -</strong> Será considerada falta grave a não observância ou o não cumprimento desta lei por servidor público Estadual, respondendo por sua conduta faltosa nos termos dos art. 46 a 57 do Decreto Lei nº 220, de 18 de julho de 1975. <br/><br/><strong>Art. 5° -</strong> Os estabelecimentos privados citados nesta lei, no caso de seu descumprimento, suportarão multa de 2.000 UFIRs (duas mil unidades fiscais de referência), e de 60.000 UFIRs (sessenta mil unidades fiscais de referência), a cada reincidência.<br/><br/><strong>Art. 6° -</strong> A fiscalização do cumprimento da presente lei será exercida pelo órgão competente, indicado pelo Poder Executivo, por ato próprio.<br/><br/><strong>Art. 7° -</strong> Os estabelecimentos privados e os órgão Públicos citados nesta Lei terão um prazo de 60 (sessenta) dias após a sua entrada em vigor para se adaptarem às regras da mesma.<br/><br/><strong>Art. 8° -</strong> Esta Lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 23 de junho de 2014. <strong>Luiz Fernando de Souza</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1647/2012 <br/> Mensagem nº ---<br/> Autoria: XANDRINHO<br/> Data de publicação: 24-06-2014<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 2 mil a 60 mil UFIR-RJ (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"28",
                "numero": "3652-2001",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Casas lotéricas.",
                "nomelei": "Atendimento em casas lotéricas",
                "nome": "Maiores de 65 anos, grávidas, deficientes e adultos com crianças de até 5 anos têm prioridade na fila.",
                "dataLei":"21 de setembro de 2001",
                "descr1": "Maiores de 65 anos, grávidas, pessoas com deficiência, adultos acompanhados de crianças menores de 5 anos e portadores de doenças crônicas têm prioridade de atendimento nas casas lotéricas.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Para efeito da determinação da Lei nº 2.157/93, ficam seus efeitos estendidos para o atendimento nas casas lotéricas no âmbito do Estado do Rio Janeiro.<br/><br/><strong>Art. 2º -</strong> O descumprimento do estabelecido no caput do artigo anterior ocasionará as seguintes sanções:<br/><br/><strong>I </strong> Notificação à concedente do serviço da localização da casa lotérica descumpridora da presente norma;<br/><br/><strong>II </strong> Multa de 1.000 (um mil) a 5.000 (cinco mil) UFIRS por infração, após a notificação prevista no inciso anterior.<br/><br/><strong>Art. 3º - Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 21 de setembro de 2001. <strong>Anthony Garotinho</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1583/2000 <br/> Mensagem nº ---<br/> Autoria: ANDRÉ CECILIANO<br/> Data de publicação: 24-09-2001<br/> Data Publ. partes vetadas ---<br/> Assunto: Casa Lotérica <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Advertência à lotérica e multa de mil a 5 mil UFIR-RJ (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"30",
                "numero": "6928-14",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Pet shops em geral.",
                "nomelei": "Câmeras em pet shops",
                "nome": "Pet shops devem instalar câmeras e divisórias nos locais em que são atendidos os animais.",
                "dataLei":"01 de dezembro de 2014",
                "descr1": "Petshops devem instalar câmeras e divisórias em que são atendidos os animais.",
                "html": '<h3>A Assembléia legislativa do Estado do Rio de Janeiro</h3><br/><p>D E C R E T A:<br/><br/> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Fica determinada a instalação de câmeras e de divisórias no interior dos petshops, nas dependências em que são atendidos os animais, seja para consultas médicas, banhos, tosas ou qualquer outro fim.<br/><br/><strong>Art. 2º -</strong> Esta Lei entra em vigor a partir da data desta publicação. <br/><br/> Assembléia Legislativa do Estado do Rio de Janeiro, 01 de dezembro de 2014. <strong>Deputado Paulo Melo</strong> Presidente </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1786-A/2012 <br/> Mensagem nº ---<br/> Autoria: ÁTILA NUNES<br/> Data de publicação: 02-12-2014<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Procon pode aplicar multa estabelecida no Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"31",
                "numero": "4675-2005",
                "colorheader": "",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Estabelecimentos de ensino em todo o Estado do Rio de Janeiro.",
                "nomelei": "Segunda chamada de prova",
                "nome": "Proibida cobrança por provas de segunda chamada, finais ou equivalentes",
                "dataLei":"20 de dezembro de 2005",
                "descr1": "Os estabelecimentos de ensino não podem cobrar por provas de 2ª chamada ou provas finais. Nenhum estudante pode ser impedido de fazer um exame por falta de pagamento.",
                "html": '<h3>A Governadora do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1º -</strong> Fica proibida a cobrança, pelos estabelecimentos de ensino sediados no Estado do Rio de Janeiro, por provas de segunda-chamada, provas finais ou equivalentes, não podendo os estudantes ser impedidos de fazer provas, testes, exames ou outras formas de avaliação, por falta de pagamento prévio, seja específico para esta despesa, seja relativo às mensalidades em geral.<br/><br/><strong>Art. 2º -</strong> A proibição a que se refere esta Lei estende-se às instituições de ensino superior e não se aplica a concursos públicos, vestibulares ou provas destinadas ao acesso inicial a determinado curso, bem como ao ingresso em escolas, colégios ou faculdades, incluindo os exames de habilidade específica exigidos para ingresso em determinados cursos técnicos ou superiores.<br/><br/><strong>Art. 3º -</strong> A violação a esta Lei obrigará ao estabelecimento infrator que devolva ao estudante, em décuplo, o valor cobrado abusivamente.<br/><br/><strong>Art. 4º -</strong> A presente Lei entrará em vigor na data da sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 20 de dezembro de 2005. <strong>ROSINHA GAROTINHO</strong> Governadora </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 712/2003 <br/> Mensagem nº ---<br/> Autoria: ANTONIO PEDREGAL<br/> Data de publicação: 21-12-2005<br/> Data Publ. partes vetadas ---<br/> Assunto: Ensino, Escola <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Estabelecimento terá que devolver o equivalente a 10x o valor cobrado.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br>- Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)<br />- Alô Alerj: 0800-0220008 (horário comercial)<br/> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"32",
                "numero": "3714-01",
                "colorheader": "",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Circos e similares.",
                "nomelei": "Espetáculos com animais",
                "nome": "Proibido espetáculo circense ou similar que tenha como atrativo a exibição de animais.",
                "dataLei":"21 de novembro de 2001",
                "descr1": "É proibida a apresentação de espetáculo circense ou similar que tenha como atrativo a exibição de animais. A proibição não vale para eventos sem fins lucrativos, de natureza científica, educacional ou protecional.",
                "html": '<p><strong>A ASSEMBLÉIA LEGISLATIVA DO ESTADO DO RIO DE JANEIRO:</strong><br/> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1º -</strong> Fica proibida, em todo o território do Estado do Rio de Janeiro, a apresentação de espetáculo circense ou similar que tenha como atrativo a exibição de animais de qualquer espécie.<br/><strong>Art. 2º -</strong> Os animais referidos nesta Lei compreendem todo ser irracional, quadrúpede ou bípede, doméstico, ou selvagem.<br/><strong>Art. 3º -</strong> Não se aplicará a proibição prevista no artigo 1º quando se tratar de eventos sem fins lucrativos, de natureza científica, educacional ou protecional.<br/><strong>Art. 4º -</strong> O descumprimento às disposições desta Lei implicará em multa de 10.000 UFIRs (dez mil unidades fiscais de referência).<strong>Parágrafo único </strong> A multa a que se refere este artigo será recolhida pelos órgãos competentes do Poder Executivo do Estado e revertida para as instituições de proteção e cuidados dos animais situadas no município de origem;<br/><strong>Art. 5º -</strong> Esta Lei entrará em vigor na data de sua publicação.<br/><strong>Art. 6º -</strong> Revogam-se as disposições em contrário.<br/><br/><strong>Art. 1º -</strong> É assegurado à população do sexo feminino o atendimento por Médicos Legistas do seu mesmo sexo, durante exames periciais destinados à averiguação de violências físicas.<br/><br/><strong>Art. 2º -</strong> É obrigatória a afixação em local visível, nos postos de atendimento médico de emergência, nas delegacias e nos órgãos encarregados por tais exames, de cartaz informando ao público sobre o benefício previsto por esta Lei.<br/><br/><strong>Art. 3º -</strong> Revoguem-se as disposições em contrário.<br/><br/> Assembléia Legislativa do Estado do Rio de Janeiro, em 21 de novembro de 2001.<strong>DEPUTADO SÉRGIO CABRAL</strong> Presidente </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 2634/2001 <br/> Mensagem nº ---<br/> Autoria: EDSON ALBERTASSI<br/> Data de publicação: 22-11-2001<br/> Data Publ. partes vetadas ---<br/> Assunto: Animal, Circo, Multa <br/> Tipo de Revogação: EM VIGOR <br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 10 mil UFIR-RJ (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4><p>Entre em contato com o Alô Alerj ou PROCON.</br>- Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)<br />- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"33",
                "numero": "2224-94",
                "colorheader": "",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Bancos e instituições financeiras em geral.",
                "nomelei": "Porta auxiliar em bancos",
                "nome": "Obrigatório porta auxiliar junto à de segurança para garantir o acesso de pessoas necessitadas.",
                "dataLei":"01 de fevereiro de 1994.",
                "descr1": "As instituições financeiras são obrigadas a manter uma porta auxiliar junto às portas de segurança para garantir o acesso de deficientes físicos, obesos, gestantes, idosos e pessoas com dificuldade de locomoção.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1º -</strong> Todos os estabelecimentos bancários do Estado deverão instalar em suas entradas de acesso aos usuários portas giratórias com detector de metais.<br/><br/><strong>* Art. 1º -</strong> As agências bancárias instaladas no âmbito do Estado do Rio de Janeiro deverão ter porta de segurança com detector de metais que garanta a integridade dos funcionários e clientes.<br/><strong>Parágrafo único -</strong> Para garantir o acesso da pessoa portadora de deficiência, obesos, gestantes, idosos e pessoas com dificuldade de locomoção, ficam as instituições financeiras obrigadas a manter uma porta auxiliar junto às portas de segurança. * (Artigo com nova redação dada pela Lei nº 3211/99)<br/><br/><strong>Art. 2º -</strong> Fica estipulado o prazo de 60 (sessenta) dias para o cumprimento desta Lei.<br/><br/><strong>Art. 3º -</strong> O não cumprimento desta Lei implicará em multa diária de 100 UFERJs.<br/><br/><strong>Art. 4º -</strong> O Poder Executivo Estadual fiscalizará o cumprimento da presente Lei.<br/><br/><strong>Art. 5º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário.<br/><br/> Rio de Janeiro, 01 de fevereiro de 1994.<strong>LEONEL BRIZOLA</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 888/92 <br/> Mensagem nº ---<br/> Autoria: GRAÇA MATOS<br/> Data de publicação: 02-02-1994<br/> Data Publ. partes vetadas ---<br/> Assunto: Gestante, Deficiente Físico, Portador De Deficiência, Banco, Detector De Metal<br/> Tipo de Revogação: EM VIGOR <br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O não cumprimento desta Lei implicará em multa diária de 100 UFERJs (1 UFERJ = 44,2655 UFIR-RJ. 1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4><p>Entre em contato com o Alô Alerj ou PROCON.</br>- Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)<br />- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"34",
                "numero": "3884-2002",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Estabelecimentos públicos em geral.",
                "nomelei": "Banheiro para idosos",
                "nome": "Pessoas com mais de 60 anos são isentas de qualquer tipo de pagamento para utilização de banheiros públicos.",
                "dataLei":"25 de junho de 2002",
                "descr1": "Pessoas com mais de 60 anos são isentas de qualquer tipo de pagamento para utilização de banheiros públicos.",
                "html": '<p><strong>A GOVERNADORA DO ESTADO DO RIO DE JANEIRO,</strong><br/> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <span style="text-decoration:line-through;"><strong>Art. 1º -</strong> Ficam isentas de qualquer tipo de pagamento para utilização de banheiros públicos as pessoas maiores de 65 anos.</span><br/><br/><strong>* Art. 1º -</strong> Ficam isentas de qualquer tipo de pagamento para utilização de banheiros públicos as pessoas maiores de 60 (sessenta) anos.<br/><strong>* Nova redação dada pela Lei nº 6710/2014.</strong><br/><strong>Parágrafo único </strong> O direito a este benefício poderá ser comprovado com a apresentação de qualquer documento de identidade.<br/><br/><strong>Art. 2º -</strong> Todos os banheiros públicos deverão ter afixado, em lugar visível, aviso comunicando a existência desta gratuidade.<br/><br/><strong>Art. 3º -</strong> A desobediência ao disposto na presente Lei será advertida com multa de 100 UFIRs e, em caso de reincidência de empresa concessionária, perda do direito de concessão para exploração do espaço público.<br/><br/><strong>Art. 4º -</strong> Esta Lei entra em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 25 de junho de 2002. <strong>Benedita da Silva</strong> Governadora </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1330/2000 <br/> Mensagem nº ---<br/> Autoria: SOLANGE AMARAL<br/> Data de publicação: 01-07-2002<br/> Data Publ. partes vetadas ---<br/> Assunto: Idoso, Banheiro <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 100 UFIRs para o administrador do banheiro localizado em local público (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"35",
                "numero": "6483-13",
                "colorheader": "white",
               "categoria": "Serviços",
               "categoriaslug": "servicos",
                "subcategoria": "Todo Estado do Rio de Janeiro.",
                "nomelei": "Discriminação  e  preconceito",
                "nome": "Práticas discriminatórias por motivo de raça, cor, etnia, religião e afins são passíveis de multa.",
                "dataLei":"04 de julho de 2013",
                "descr1": "Toda prática discriminatória por motivo de raça, cor, etnia, religião ou procedência nacional é passível de multa.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Esta Lei disciplina a aplicação das penalidades administrativas, motivadas pela prática de atos de discriminação racial.<br/><br/><strong>Art. 2º -</strong> Será punido, nos termos desta lei, todo ato discriminatório por motivo de raça, cor, etnia, religião ou procedência nacional praticado no Estado do Rio de Janeiro, por qualquer pessoa, jurídica ou física, inclusive a que exerça função pública.<br/><br/><strong>Art. 3º -</strong> Consideram-se atos discriminatórios por motivo de raça, cor, etnia, religião ou procedência nacional, para os efeitos desta lei:<br/><br/><strong>I -</strong> praticar qualquer tipo de ação violenta, constrangedora, intimidatória ou vexatória;<br/><strong>II -</strong> proibir o ingresso ou a permanência em ambiente ou estabelecimento aberto ao público;<br/><strong>III -</strong> criar embaraços à utilização das dependências comuns e áreas não-privativas de edifícios;<br/><strong>IV -</strong> recusar, retardar, impedir ou onerar a utilização de serviços, meios de transporte ou de comunicação, consumo de bens, hospedagem em hotéis, motéis, pensões e estabelecimentos congêneres ou o acesso a espetáculos artísticos ou culturais;<br/><strong>V -</strong> recusar, retardar, impedir ou onerar a locação, compra, aquisição, arrendamento ou empréstimo de bens móveis ou imóveis;<br/><strong>VI -</strong> praticar o empregador, ou seu preposto, atos de coação direta ou indireta sobre o empregado;<br/><strong>VII -</strong> negar emprego, demitir, impedir ou dificultar a ascensão em empresa pública ou privada, assim como impedir ou obstar o acesso a cargo ou função pública ou certame licitatório;<br/><strong>VIII -</strong> praticar, induzir ou incitar, pelos meios de comunicação, o preconceito ou a prática de qualquer conduta discriminatória;<br/><strong>IX -</strong> criar, comercializar, distribuir ou veicular símbolos, emblemas, ornamentos, distintivos ou propagandas que incitem ou induzam à discriminação;<br/><strong>X -</strong> recusar, retardar, impedir ou onerar a prestação de serviço de saúde, público ou privado.<br/><br/><strong>Art. 4º -</strong> A prática dos atos discriminatórios a que se refere esta lei será apurada em processo administrativo, que terá início mediante:<br/><br/><strong>I -</strong> reclamação do ofendido ou de seu representante legal, ou ainda de qualquer pessoa que tenha ciência do ato discriminatório;<br/><strong>II -</strong> ato ou ofício de autoridade competente.<br/><strong>Art. 5º -</strong> Aquele que for vítima da discriminação, seu representante legal, ou quem tenha presenciado os atos a que se refere o artigo 3º desta lei, poderá relatá-los à Órgão definido pelo Poder Executivo.<br/><br/><strong>§ 1º -</strong> O relato de que trata o caput deste artigo conterá:<br/>1 - a exposição do fato e suas circunstâncias;<br/>2 - a identificação do autor, com nome, prenome, número da cédula de identidade, seu endereço e assinatura.<br/><br/><strong>§ 2º -</strong> A critério do interessado, o relato poderá ser apresentado por meio eletrônico, no sítio de rede mundial de computadores do Órgão competente. <br/><strong>§ 3º -</strong> Recebida a denúncia, competirá ao Órgão Competente:<br/><strong>I -</strong> promover a instauração do processo administrativo devido para apuração e imposição das sanções cabíveis;<br/><strong>II </strong> transmitir notícia à autoridade policial competente, para a elucidação cabível, quando o fato descrito caracterizar infração penal.<br/><strong>Art. 6º -</strong> O Estado do Rio de Janeiro para cumprir o disposto nesta lei, poderá firmar convênios com Municípios.<br/><br/><strong>Art. 7º -</strong> As sanções aplicáveis aos que praticarem atos de discriminação nos termos desta lei serão as seguintes:<br/><br/><strong>I -</strong> advertência;<br/><strong>II</strong> - Punição vai de multa de até 1000 (mil) UFIRŽS - Unidades Fiscais do Estado do Rio de Janeiro<br/><strong>III -</strong> multa de até 3000 (três mil) UFIRŽS - Unidades Fiscais do Estado do Rio de Janeiro, em caso de reincidência;<br/><strong>IV -</strong> suspensão da licença estadual para funcionamento por 30 (trinta) dias;<br/><strong>V -</strong> cassação da licença estadual para funcionamento.<br/><strong>§ 1º -</strong> Quando a infração for cometida por agente público, servidor público ou militar, no exercício de suas funções, sem prejuízo das sanções previstas nos incisos I a III deste artigo, serão aplicadas as penalidades disciplinares cominadas na legislação pertinente.<br/><strong>§ 2º -</strong> O valor da multa será fixado tendo-se em conta as condições pessoais e econômicas do infrator e não poderá ser inferior a 500 (quinhentas) UFIRŽS  Unidades Fiscais do Estado do Rio de Janeiro.<br/><strong>§ 3º -</strong> A multa poderá ser elevada até o triplo, quando se verificar que, em virtude da situação econômica do infrator, sua fixação em quantia inferior seria ineficaz.<br/><strong>§ 4º -</strong> Quando for imposta a pena prevista no inciso V deste artigo, deverá ser comunicada a autoridade responsável pela outorga da licença, que providenciará a sua execução, comunicando-se, igualmente, a autoridade federal ou municipal para eventuais providências no âmbito de sua competência.<br/><br/><strong>Art. 8º -</strong> Na apuração dos atos discriminatórios praticados com violação desta lei, deverão ser observados os procedimentos previstos na Lei nº 5.427, de 01 de abril de 2009, que regula o processo administrativo no âmbito da Administração Pública Estadual.<br/><br/><strong>Art. 9 -</strong> O Poder Executivo regulamentará a presente Lei.<br/><br/><strong>Art. 10 -</strong> Esta lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 04 de julho de 2013. <strong>Sérgio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 3309/2010 <br/> Mensagem nº ---<br/> Autoria: GILBERTO PALMARES<br/> Data de publicação: 05-07-2013<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Punição vai de multa (mínimo de mil Ufir) a cassação da licença do estabelecimento.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
             {
                "id":"36",
                "numero": "3295-99",
                "colorheader": "white",
               "categoria": "Serviços",
               "categoriaslug": "servicos",
                "subcategoria": "Todos os meios de transporte e repartições públicas e privadas.",
                "nomelei": "Acesso para cães-guia",
                "nome": "Cães-guias de deficientes podem acessar qualquer meio de transporte e locais públicos e privados.",
                "dataLei":"16 de novembro de 1999",
                "descr1": "Portadores de deficiência visual podem ingressar e permanecer em qualquer meio de transporte e repartições públicas e privadas com seus cães-guias.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Os cães-guias quando acompanhados de pessoas portadoras de deficiência visual (cegueira e visão sub-normal), ou de treinador, ou acompanhante habilitado poderão ingressar e permanecer nas repartições públicas ou privadas, em qualquer meio de transporte, seja hidroviário, ferroviário, metroviário, de cooperativas, táxis ou afins, em todo e qualquer estabelecimento comercial, industrial, de serviços de promoção, proteção e recuperação de saúde e demais locais públicos.<br/><br/><strong>§ 1º -</strong> Para efeito desta Lei entende-se por:<br/><br/><strong>a) -</strong> CÃO GUIA - o cão-guia que tenha obtido certificado de uma Escola filiada e aceita pela Federação Internacional de Escolas de Cães-Guias para Cegos, que esteja a serviço de uma pessoa portadora de deficiência visual ou em estágio de treinamento.<br/><strong>b) -</strong> COOPERATIVAS - transportes autorizados, kombis, micro ônibus e afins ou qualquer outro transporte alternativo de que se faça necessária sua utilização.<br/><strong>c) -</strong> LOCAIS PÚBLICOS - hotéis, restaurantes, shoppings, lojas de diversão ou lazer e, de modo geral, todo e qualquer lugar aberto ao público, quer seja a título gratuito ou oneroso.<br/><br/><strong>§ 2º -</strong> Nos casos previstos no caput deste artigo, é vedada a cobrança de preço, tarifa ou acréscimo vinculado, direta ou indiretamente, ao ingresso ou presença do cão-guia.<br/><strong>§ 3º -</strong> Sem prejuízo do disposto neste artigo, o proprietário do cão-guia responde civil e criminalmente pelos danos ou lesões causadas pelo mesmo.<br/><br/><strong>Art. 2º -</strong> Toda e qualquer pessoa que pertencer, prestar serviços ou ser proprietário dos locais mencionados no caput do artigo anterior e que venham a impedir o ingresso e permanência da pessoa portadora de deficiência visual que necessite de cão-guia, estará atentando contra os direitos humanos e será passível de punição prevista em lei.<br/><br/><strong>Art. 3º -</strong> Os estabelecimentos comerciais e industriais, as repartições públicas ou privadas, bem como os meios de transportes mencionados no artigo 1º, em caso de discriminação ou não cumprimento de estabelecido nesta Lei serão punidos com penas de interdição, multas e outras penalidades previstas em lei.<br/><br/><strong>Art. 4º -</strong> A pessoa portadora de deficiência visual tem direito de manter pelo menos um cão-guia em sua residência e de transitar com o mesmo, seguro em coleira, nas áreas e dependências comuns do respectivo condomínio, independentemente de restrições à presença de animais na convenção do condomínio ou regimento interno.<br/><br/><strong>Art. 5º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 16 de novembro de 1999. <strong>Anthony Garotinho</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 2330/98 <br/> Mensagem nº ---<br/> Autoria: SOLANGE AMARAL, TANIA RODRIGUES<br/> Data de publicação: 24-11-1999<br/> Data Publ. partes vetadas ---<br/> Assunto: Cão, Portador De Deficiência, Deficiente Visual, Deficiente Físico, Animal, Transporte <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃOO CUMPRIMENTO:</h4> <p>Penas vão de multa à interdição do estabelecimento que negar a entrada.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
             {
                "id":"37",
                "numero": "3559-01",
                "colorheader": "white",
               "categoria": "Serviços",
               "categoriaslug": "servicos",
                "subcategoria": "Escolas, hospitais e empresas em geral.",
                "nomelei": "Discriminação de soropositivos",
                "nome": "Estabelecimentos que discriminem portadores de HIV devem ser penalizados.",
                "dataLei":"15 de maio de 2001",
                "descr1": "Estabelecimentos (como escolas, hospitais e empresas em geral) que discriminem pessoas portadoras de HIV devem ser penalizados.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> A violação do princípio da igualdade de direitos prevista no Art. 9º, § 1º da Constituição do Estado do Rio de Janeiro, quando praticada por estabelecimentos que discriminem portadores do vírus HIV, sintomáticos e assintomáticos, constitui infração administrativa.<br/><br/><strong>Art. 2º -</strong> O Poder Executivo, através do seu órgão competente, penalizará todo estabelecimento comercial, industrial, entidades educacionais públicas e privadas, creches, hospitais, casas de saúde, clínicas, e associações civis ou prestadoras de serviços que, por atos de seus proprietários ou prepostos, discriminem portadores do vírus HIV, sintomáticos e assintomáticos.<br/><br/><strong>Art. 3º -</strong> Constituem infrações administrativas as ações que visem discriminar os portadores do vírus HIV, dentre outras :<br/><br/><strong>I </strong> A exigência do teste HIV no processo de seleção, para admissão ao emprego;<br/><strong>II </strong> A exigência do teste HIV para permanência no emprego, mediante ameaça de rescisão contratual;<br/><strong>III </strong> A exigência do teste HIV como condição de concurso público ou privado;<br/><strong>IV </strong> A exigência do teste HIV como condição de ingresso ou permanência em creches e estabelecimentos educacionais;<br/><strong>V </strong> A recusa em aceitar o ingresso ou permanência de alunos soropositivos em estabelecimentos educacionais e creches;<br/><strong>VI </strong> A recusa de atendimento a portadores de vírus HIV, sintomáticos e assintomáticos, em hospitais públicos e privados;<br/><strong>VII </strong> A recusa na manutenção do custeio do tratamento para os portadores do vírus HIV, e na autorização para exames complementares dos pacientes associados ou segurados dos planos de saúde;<br/><strong>VIII </strong> A demissão do soropositivo ou portador do HIV em razão de sua condição de portador do vírus HIV. <br/><br/><strong>Art. 4º -</strong> Consideram-se infratores desta Lei as pessoas que, direta ou indiretamente, tenham concorrido para o cometimento da infração administrativa.<br/><br/><strong>Art. 5º -</strong> Serão aplicadas as seguintes penalidades administrativas aos infratores :<br/><br/><strong>I </strong> Multa de 50 a 50.000 UFIRŽS, ou outra unidade que venha a substitui-la;<br/><strong>II </strong> Cassação de licença de funcionamento dos estabelecimentos infratores.<br/><br/><strong>Art. 6º -</strong> Constituem penas alternativas :<br/><br/><strong>I </strong> A promoção de campanha publicitária esclarecendo sobre os direitos dos soropositivos e portadores do HIV, de acordo com a legislação federal, estadual e municipal vigente;<br/><strong>II </strong> A confecção de material informativo sobre a prevenção e os cuidados da AIDS;<br/><strong>III </strong> A prestação de trabalhos em estabelecimentos de atenção aos portadores do vírus HIV.<br/><br/><strong>Art. 7º -</strong> Fica o Poder Executivo autorizado a criar o Fundo Estadual de Informação, Prevenção e Assistência da AIDS, para o qual reverterão as multas arrecadadas, que serão aplicadas em entidades que assistam aos portadores do vírus HIV.<br/><br/><strong>Parágrafo único </strong> A Comissão Estadual de AIDS, criada pela Resolução nº 700, de 3 de dezembro de 1991, administrará os recursos mencionados no caput deste artigo.<br/><br/><strong>Art. 8º -</strong> O poder de polícia será exercido pelo órgão estadual competente.<br/><br/><strong>Art. 9º -</strong> O descumprimento da presente Lei será apurado através de processo administrativo pelo órgão competente, com ampla defesa, independente das sanções civis e penais cabíveis, definidas em normas específicas.<br/><br/><strong>Art. 10 </strong> O Ministério Público fiscalizará a aplicação desta Lei, incumbindo-lhe a propositura das ações competentes.<br/><br/><strong>Art. 11 </strong> Todos os cidadãos podem comunicar às autoridades administrativas as infrações à presente Lei.<br/><br/><strong>Art. 12  </strong>O Poder Executivo deverá manter setor especializado para receber denúncias relacionadas às infrações à presente Lei.<br/><br/><strong>Art. 13 </strong> Fica o Poder Executivo autorizado a baixar as normas regulamentares ao presente projeto de Lei, no prazo de 60 (sessenta) dias após a sua publicação.<br/><br/><strong>Art. 14 </strong> Esta Lei entrará em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 15 de maio de 2001. <strong>Anthony Garotinho</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 54-A/99 <br/> Mensagem nº ---<br/> Autoria: CARLOS MINC<br/> Data de publicação: 24-05-2001<br/> Data Publ. partes vetadas ---<br/> Assunto: Hiv, Aids, Discriminação, Doente <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 50 a 50 mil UFIRs (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"38",
                "numero": "1886-1991",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Empresas em geral.",
                "nomelei": "Discriminação sexual",
                "nome": "Proíbe exigência de testes para verificação de gravidez para admissão ou permanência no emprego.",
                "dataLei":"08 de novembro de 1991",
                "descr1": "Proíbe chantagem sexual, como exigência de teste de urina ou sangue para verificação de gravidez e comprovação de esterilização para admissão ou permanência no emprego.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Esta lei estabelece penalidades aos estabelecimentos localizados no Estado do Rio de Janeiro que discriminem mulheres, violando o princípio que adota a igualdade de direitos entre homens e mulheres de acordo com o § 1º do artigo 9º da Constituição Estadual, garantindo a proteção dos direitos individuais e coletivos.<br/><br/><span style="text-decoration:line-through;"><strong>Art. 2º -</strong> Dentro de sua competência, o Poder Executivo penalizará todo estabelecimento comercial, industrial, entidades, representações, associações, sociedades civis ou de prestações de serviços que, por atos de seus proprietários ou prepostos, discriminem mulheres em função de seu sexo, ou contra elas adotem atos de coação ou violência, tais como exigência ou tentativa de vantagem sexual da mulher por parte do patrão ou preposto, mediante ameaça de rescisão contratual.</span><br/><strong>*Art. 2º -</strong> Dentro de sua competência, o Poder Executivo penalizará todo estabelecimento comercial, industrial, entidades, representações, associações, sociedades civis ou de representação de serviços que, por atos de seus proprietários ou prepostos, discriminem pessoas em função do seu sexo, ou contra elas adotem atos de coação ou violência, tais como exigência ou tentativa de obter vantagem sexual por parte do superior hierárquico, independentemente do seu sexo e da sua opção sexual, com o objetivo de exigir favor sexual do subordinado, independentemente do seu sexo ou da sua opção sexual, sob ameaça ou efetivo prejuízo no trabalho ou perda do emprego.<br/><strong>* Nova redação dada pelo artigo 2º da Lei 3179/99 Controle de Leis</strong><br/><strong>Parágrafo Único -</strong> Considera-se como prática de restrição ao direito da mulher ao emprego, entre outras, a adoção de medidas não previstas na legislação pertinente e especialmente:<br/><br/><strong>I -</strong> Exigência ou solicitação de teste de urina ou sangue, para verificação de estado de gravidez, processos de seleção para admissão ao emprego;<br/><strong>II -</strong> Exigência ou solicitação de comprovação de esterelização, para admissão ou permanência no emprego;<br/><strong>III -</strong> Exigência de exame ginecológico periódico, como condição para permanência no emprego;<br/><strong>IV -</strong> Discriminação às mulheres casadas, ou mães, nos processos de seleção e treinamento ou rescisão de contrato de trabalho.<br/><br/><strong>Art. 3º -</strong> O descumprimento da presente Lei será apurado através de processo administrativo pelo órgão competente, independente das sanções civis e penais cabíveis, definidas em normas específicas.<br/><br/><strong>§ 1º -</strong> Aos infratores desta Lei serão aplicadas as seguintes penalidades administrativas:<br/><strong>I -</strong> advertência;<br/><strong>II -</strong> multa de 1 a 1000 UFERJs ou outra unidade que venha substituí-la;<br/><strong>III -</strong> VETADO.<br/><strong>IV -</strong> VETADO.<br/><strong>§ 2º -</strong> VETADO.<br/><strong>§ 3º -</strong> Considera-se infratora desta Lei a pessoa que direta ou indiretamente tenha concorrido para o cometimento da infração administrativa.<br/><br/><strong>Art. 4º -</strong> Todos os cidadãos podem comunicar às autoridades administrativas as infrações à presente Lei.<br/><br/><strong>Art. 5º -</strong> O Poder Executivo deverá manter setor especializado para receber denúncias relacionadas às infrações à presente Lei.<br/><br/><strong>Art. 6º -</strong> O Poder Executivo regulamentará a presente Lei em 60 (sessenta) dias, a partir de sua publicação.<br/><br/><strong>Art. 7º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 08 de novembro de 1991. <strong>Leonel Brizola</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 64/91 <br/> Mensagem nº ---<br/> Autoria: CARLOS MINC<br/> Data de publicação: 211-11-1991<br/> Data Publ. partes vetadas ---<br/> Assunto: Saúde, Violência, Assédio Sexual, Mulher <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 1 a mil UFERJs (1 UFERJ = 44,2655 UFIR-RJ. 1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"39",
                "numero": "7041-2015",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Estabelecimentos comerciais, industriais, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços.",
                "nomelei": "Discriminação de LGBTs",
                "nome": "Estabelecimentos que discriminem orientação sexual ou identidade de gênero podem ser punidos.",
                "dataLei":"15 de julho de 2015",
                "descr1": "Estabelecimentos comerciais, industriais, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços que discriminem as pessoas em razão de sua orientação sexual e identidade de gênero estão sujeitas a penalidades administrativas.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º</strong> - Esta Lei estabelece infrações administrativas a condutas discriminatórias motivadas por preconceito de sexo ou orientação sexual, praticadas por agentes públicos e estabelecimentos localizados no Estado do Rio de Janeiro, ou que discriminem pessoas em virtude de sua orientação sexual.<br><br> <strong>Parágrafo único</strong> - Para efeitos de aplicação desta Lei, o termo “sexo” é utilizado para distinguir homens e mulheres, enquanto o termo “orientação sexual” refere-se à heterossexualidade, à homossexualidade e à bissexualidade.<br><br> <strong>Art. 2º</strong> - O Poder Executivo, no âmbito de sua competência, penalizará estabelecimento público, comercial e industrial, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços que, por atos de seus proprietários ou prepostos, discriminem pessoas em função de preconceito de sexo e de orientação sexual ou contra elas adotem atos de coação, violência física ou verbal ou omissão de socorro.<br><br> <strong>Parágrafo único</strong> - Entende-se por discriminação:<br><br> <strong>I</strong> - recusar ou impedir o acesso ou a permanência ou negar atendimento nos locais previstos no Artigo 2º desta Lei bem como impedir a hospedagem em hotel, motel, pensão, estalagem ou qualquer estabelecimento similar;<br><br> <strong>II</strong> - impor tratamento diferenciado ou cobrar preço ou tarifa extra para ingresso ou permanência em recinto público ou particular aberto ao público;<br><br> <strong>III</strong> - impedir acesso ou recusar atendimento ou permanência em estabelecimentos esportivos, sociais, culturais, casas de diversões, clubes sociais, associações, fundações e similares;<br><br> <strong>IV</strong> - recusar, negar, impedir ou dificultar a inscrição ou ingresso de aluno em estabelecimento de ensino público ou privado de qualquer nível;<br><br> <strong>V</strong> - impedir, obstar ou dificultar o acesso de pessoas, devidamente habilitadas a qualquer cargo ou emprego da Administração direta ou indireta, bem como das concessionárias e permissionárias de serviços públicos;<br><br> <strong>VI</strong> – negar, obstar ou dificultar o acesso de pessoas, devidamente habilitadas a qualquer cargo ou emprego em empresa privada; <br><br> <strong>VII</strong> - impedir o acesso ou o uso de transportes públicos, como ônibus, metrô, trens, barcas, catamarãs, táxis, vans e similares;<br><br> <strong>VIII</strong> - negar o acesso, dificultar ou retroceder o atendimento em qualquer hospital, pronto socorro, ambulatório ou em qualquer estabelecimento similar de rede pública ou privada de saúde;<br><br> <strong>IX</strong> - praticar, induzir ou incitar pelos meios de comunicação social a discriminação, preconceito ou prática de atos de violência ou coação contra qualquer pessoa em virtude de preconceito de sexo e de orientação sexual;<br><br> <strong>X</strong> - obstar a visita íntima, à pessoa privada de liberdade, nacional ou estrangeiro, homem ou mulher, de cônjuge ou outro parceiro, no estabelecimento prisional onde estiver recolhido, em ambiente reservado, cuja privacidade e inviolabilidade sejam assegurados, obedecendo sempre, os parâmetros legais pertinentes à segurança do estabelecimento, nos termos das normas vigentes;<br><br> <strong>Art. 3º</strong> - Quando o agente público, no cumprimento de suas funções, praticar um ou mais atos descritos no art. 2º desta Lei, a sua responsabilidade será apurada por meio de procedimento administrativo disciplinar instaurado pelo órgão competente, sem prejuízo das sanções civis e penais cabíveis, definidas em normas específicas. <br><br> <strong>Art. 4º</strong> - A Administração Pública poderá aplicar aos infratores, sempre garantida à prévia e ampla defesa e observado a Lei estadual n.º 5.427 de 01 de abril de 2009 em especial o seu Capítulo XVIII, com as seguintes sanções:<br><br> <strong>I</strong> – advertência;<br> <strong>II</strong> – multa até o limite de 22.132 UFIR-RJ <br> <strong>III</strong> - suspensão da inscrição estadual por até 60 (sessenta) dias;<br> <strong>IV</strong> - cassação da inscrição estadual.<br><br> <strong>§1º</strong> - As sanções previstas nos incisos deste artigo serão aplicadas gradativamente com base na reincidência do infrator.<br><br> <strong>§2º</strong> - As multas de que trata o inciso II deste artigo, deverão ser fixadas de acordo com a gravidade do fato e da capacidade econômica do infrator.<br><br> <strong>Art. 5º</strong> - Caberá à Secretaria de Estado de Assistência Social e Direitos Humanos a aplicação das penalidades, podendo, inclusive editar os atos complementares pertinentes ao inciso II do artigo 4º desta Lei.<br><br> <strong>Art. 6º</strong> - Esta lei não se aplica às instituições religiosas, templos religiosos, locais de culto, casas paroquiais, seminários religiosos, liturgias, crença, pregações religiosas, publicações e manifestação pacífica de pensamento, fundada na liberdade de consciência, de expressão intelectual, artística, científica, profissional, de imprensa e de religião de que tratam os incisos IV, VI, IX e XIII do art. 5º da Constituição Federal.<br><br> <strong>Art. 7º</strong> - O Poder Executivo regulamentará a presente Lei em 60 (sessenta) dias a partir de sua publicação.<br><br> <strong>Art. 8º</strong> - Esta Lei entrará em vigor na data de sua publicação, revogada a <a href="http://alerjln1.alerj.rj.gov.br/CONTLEI.NSF/c8aa0900025feef6032564ec0060dfff/cdee250b14447c00032568ea006760e4?OpenDocument" class="lei-link">Lei 3.406, de 15 de maio de 2000</a>. </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O não cumprimento da lei pode acarretar em advertência, multa até o limite de 22.132 UFIR-RJ; Suspensão da inscrição estadual por até 60 dias; Cassação da inscrição estadual.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>As pessoas podem recorrer ao Alô Alerj 0800-0220008 (horário comercial), ou ao <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.riosemhomofobia.rj.gov.br\', \'_system\');\">Disque Cidadania LGBT</a>: 0800-0234567 </br></p><p>WhatsApp: (21) 98890-4742</p>'
            },
            {
                "id":"53",
                "numero": "4883-2006",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Órgãos responsáveis por habilitação e renovação de CNH.",
                "nomelei": "Isenção no Detran",
                "nome": "Pessoas com deficiência têm isenção de taxas na primeira habilitação e renovação da CNH.",
                "dataLei":"1º de novembro de 2006",
                "descr1": "",
                "html": '<p><strong>O Presidente da Assembléia Legislativa do Estado do Rio de Janeiro,</strong> em conformidade com o que dispõe o § 5º combinado com o § 7º do artigo 115 da Constituição Estadual, promulga a Lei nº 4.883, de 1º de novembro de 2006, oriunda do Projeto de Lei nº 2.318, de 2005.</p><p><strong>Art. 1º</strong> - Ficam as pessoas portadoras de necessidades especiais, assim consideradas pelo Decreto Federal nº 3.298, de 20 de dezembro de 1999, isentas do pagamento de quaisquer taxas estaduais relativas à primeira emissão, bem como à renovação da Carteira Nacional de Habilitação, emitida pelo Departamento de Trânsito  DETRAN, do Estado do Rio de Janeiro.<br/><strong>Art. 2º</strong> - As despesas geradas pela implantação desta Lei correrão à conta de dotação orçamentária própria, para exercício financeiro do Executivo Estadual de 2006, ficando ainda o Poder Executivo autorizado a abrir crédito suplementar.<br/><strong>Art. 3º</strong> - Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário.</p>',
                "multatexto": '<h4>PRECISA DE MAIS INFORMAÇÕES?</h4><p>Entre em contato com o Alô Alerj</p><p>- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"91",
                "numero": "7076-2015",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "",
                "nomelei": "Gratuidade de certidões de adoção",
                "nome": "São gratuitas as emissões de certidões exigidas para processos de adoção",
                "dataLei":"09 de outubro de 2015",
                "descr1": "Altera a lei nº. 3.350, de 29 de dezembro de 1999, que dispõe sobre as custas judiciais e emolumentos dos serviços notariais e de registros no estado do Rio de Janeiro e dá outras providências",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1º -</strong> Fica alterado o inciso VII, do art. 43, da Lei nº. 3350 de 29 de dezembro de 1999, que passa a ter a seguinte redação:<br/>(...)<br/><strong>"VII -</strong> os atos de extração de certidão, quando destinados a processos de habilitação e de adoção e ao alistamento militar, para fins eleitorais ou previdenciários, ou para outras finalidades, cuja gratuidade esteja prevista em lei, delas devendo constar nota relativa ao seu destino."<br/><br/><strong>Art. 2º -</strong> Esta Lei entrará em vigor na data de sua publicação.</p>',
                "multatexto": '<p>Não tem multa, porque é obrigação pra órgão público.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj 0800-0220008 (horário comercial).</br>'
            },
            {
                "id":"93",
                "numero": "7109-2015",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "",
                "nomelei": "Entregas em áreas de difícil acesso",
                "nome": "Correios e empresas de entrega são obrigadas a avisar ao consumidor no ato da contratação do serviço sobre eventuais restrições à entrega em locais de difícil acesso ou áreas de risco. Caso haja impossibilidade na entrega, a mercadoria deverá ser disponibilizada para retirada no ponto mais próximo ao consumidor.",
                "dataLei":"19 de novembro de 2015",
                "descr1": "Regulamenta o serviço de entrega de correspondência e mercadorias realizada por transportadoras ou empresas de entregas expressas no estado do Rio de Janeiro.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/><strong>Art. 1º</strong> - Sempre que houver restrição na entrega de correspondências e mercadorias, seja domiciliar ou no local designado pelo contratante, a transportadora ou empresa de entregas expressas deverá avisar ao consumidor no ato da contratação do serviço.<br/><br/><strong>§ 1º</strong> - Sempre que requisitado pelo consumidor, a restrição de que trata o caput deste artigo deverá ser justificada.<br/><br/><strong>§ 2º</strong> - A obrigação de que trata o caput deste artigo se aplica aos terceiros intermediários da contratação.<br/><br/><strong>Art. 2º</strong> - Em caso de impossibilidade de entrega residencial da mercadoria, esta deverá ser disponibilizada no estabelecimento pertencente à transportadora ou empresa de entrega expressa mais próxima ao endereço do consumidor.<br/><br/><strong>Art. 3º</strong> - O descumprimento ao disposto na presente Lei sujeitará o infrator às sanções dispostas no Código de Defesa do Consumidor, Lei Federal nº 8078, de 1990.<br/><br/><strong>Art. 4º</strong> - Esta Lei entra em vigor na data de sua publicação.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ. (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"94",
                "numero": "5421-2009",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "",
                "nomelei": "Proibido uso do formol nos salões de beleza",
                "nome": "É proibido o uso de produtos químicos tais como formol, em todos os salões de beleza, para efetivação de escovas progressivas e similares.",
                "dataLei":"31 de março de 2009",
                "descr1": "Proíbe o uso do formol e determina a adequação dos produtos químicos nos salões de beleza do estado do Rio de Janeiro e dá outras providências.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/><strong>Art. 1º</strong> Fica proibido no âmbito do Estado do Rio de Janeiro, o uso de produtos químicos tais como formol em todos os salões de beleza, para efetivação das escovas progressivas e atos similares.<br/><br/><strong>Art. 2º</strong> Também fica determinado que todos os salões de beleza, clínicas de estética e similares, deverão fazer o uso de produtos químicos de acordo com o que preceitua a Resolução nº 79, de 28 de agosto de 2000, da ANVISA, e legislação em vigor aplicável à espécie.<br/><br/><strong>Art. 3º</strong> Os estabelecimentos comerciais prescritos no artigo anterior, deverão ter sempre em local acessível e de fácil localização, uma tabela informando a quantidade em percentuais autorizados de produtos químicos usados em seus atos, tais como: escovas progressivas, alisamentos, relaxamentos, hidratação, penteados e todos os demais.<br/><br/><strong>Parágrafo único.</strong> Em utilizando-se os estabelecimentos dos produtos tioglicolato, guanidina ou amônia, deverá também ser informado o seu quantitativo utilizado.<br/><br/><strong>Art. 4º</strong> Caberá ao Poder Executivo de cada Município, através de seus órgãos competentes, a vistoria e devida fiscalização.<br/><br/><strong>Art. 5º</strong> A inobservância das disposições contidas no que dispõe esta Lei importará, no que couber, a aplicação das penalidades contidas nos Arts. 56 e 57 da Lei nº 8.078, de 11 de setembro de 1990.<br/><br/><strong>Art. 6º</strong> Esta Lei entra em vigor na data de sua publicação.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ. (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"97",
                "numero": "7115-2015",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Hotéis.",
                "nomelei": "Multa para estabelecimento que proibir amamentação",
                "nome": "O estabelecimento que proibir ou constranger o ato da amamentação em suas instalações estará sujeito à multa. Independentemente da existência de áreas destinadas ao aleitamento no estabelecimento, a amamentação poderá ocorrer em qualquer local, mesmo onde seja proibido o consumo de alimentos, pois a amamentação é um ato livre entre mãe e filho.",
                "dataLei":"24 de novembro de 2015",
                "descr1": "Dispõe sobre o direito ao aleitamento materno no estado do Rio de Janeiro, e dá outras providências.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/><strong>Art. 1°</strong> - Toda criança tem direito ao aleitamento materno, como recomenda a Organização Mundial da Saúde - OMS.<br/><br/><strong>Art. 2°</strong> - O estabelecimento situado no Estado do Rio de Janeiro, que proibir ou constranger o ato da amamentação em suas instalações, está sujeito à multa.<br/><br/><strong>Parágrafo único</strong> Independente da existência de áreas segregadas para o aleitamento, a amamentação é ato livre e discricionário entre mãe e filho e poderá ocorrer em qualquer local, mesmo onde seja proibido o consumo de alimentos.<br/><br/><strong>Art. 3º</strong> - Para fins desta Lei, estabelecimento é um local, que pode ser fechado ou aberto, destinado à atividade de comércio, cultural, recreativa, ou prestação de serviço público ou privado.<br/><br/><strong>Art. 4º</strong> - O estabelecimento que descumprir a presente lei será multado em 500 UFIRs (quinhentas Unidades Fiscais de Referência) e, em caso de reincidência a multa terá o valor 1000 UFIRs (mil Unidades Fiscais de Referência).<br/><br/><strong>Art. 5º</strong> - A execução da presente lei correrá por conta de dotações orçamentárias próprias, suplementadas se necessário.<br/><br/><strong>Art. 6º</strong> - O Poder Executivo regulamentará no que couber a presente lei.<br/><br/><strong>Art. 7º</strong> - Esta Lei entra em vigor na data de sua publicação.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O estabelecimento que descumprir a norma será multado em 500 UFIRs. Em caso de reincidência, a multa terá o valor 1000 UFIRs. (UFIR = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"102",
                "numero": "7135-2015",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Estabelecimentos que oferecem transporte escolar.",
                "nomelei": "Ajudante em transporte escolar",
                "nome": 'O serviço de transporte escolar, voltado a alunos com até 10 anos, deverá manter no veículo, durante todo o trajeto, ao menos um monitor maior de 18 anos, para orientar os estudantes a respeito das normas de segurança, manter o bom comportamento dos mesmos e auxiliá-los, zelando por sua proteção.',
                "dataLei":"17 de dezembro de 2015",
                "descr1": 'Determina a presença obrigatória de monitor no serviço de transporte escolar prestado no estado do Rio de Janeiro.',
                "html": '<h3>A Assembléia Legislativa do estado do Rio de Janeiro decreta:</h3><br/><p><strong>Art. 1°</strong> - O serviço de transporte escolar no Estado do Rio de Janeiro, voltado a alunos com até 10 (dez) anos de idade, deverá manter obrigatoriamente em cada um de seus veículos, ao menos, um monitor maior de 18 (dezoito) anos de idade, o qual permanecerá no veículo durante todo o trajeto para fins de orientar os estudantes a respeito das normas de segurança, bem como para manter o bom comportamento dos mesmos durante o deslocamento, auxiliando-os e zelando por sua proteção em todo o trajeto e durante o embarque e o desembarque.<br/><br/><strong>Art. 2º</strong> - O descumprimento ao que dispõe a presente lei acarretará na aplicação de multa no valor de 3.000 (Três mil) UFIR’s, aplicada em dobro no caso de reincidência, a ser revertida para o Fundo Estadual de Transportes – FET.<br/><br/><strong>Art. 3º</strong> - Esta lei entrará em vigor na data de sua publicação.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O descumprimento ao que dispõe a presente lei acarretará na aplicação de multa no valor de 3.000 (três mil) UFIR’s, aplicada em dobro no caso de reincidência, a ser revertida para o Fundo Estadual de Transportes – FET.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</p>'
            },
            {
                "id":"103",
                "numero": "7143-2015",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Instituições financeiras.",
                "nomelei": "Quitação antecipada de empréstimo",
                "nome": 'As instituições financeiras são obrigadas a fornecer, quando solicitado pelo cliente, um boleto para quitação antecipada do empréstimo concedido, com proporcional redução de juros e demais acréscimos, no prazo máximo de 5 dias.',
                "dataLei":"17 de dezembro de 2015",
                "descr1": 'Disciplina a aplicação de multa às instituições financeiras que não disponibilizarem ao consumidor o boleto para quitação antecipada do contrato, com a redução de juros e demais acréscimos proporcional ao período da quitação pleiteada.',
                "html": '<h3>A Assembléia Legislativa do estado do Rio de Janeiro decreta:</h3><br/><p><strong>Art. 1°</strong> - As Instituições Financeiras deverão fornecer, sempre que solicitado pelo consumidor que contraiu empréstimo, no prazo máximo de 5 (cinco) dias, a planilha de cálculo contendo a evolução de sua dívida e o respectivo boleto para quitação antecipada do contrato, com a redução de juros e demais acréscimos, proporcional ao período da quitação pleiteada, com expressa observância do disposto no art. 52, § 2º do Código de Defesa do Consumidor.<br/><br/><strong>Art. 2º</strong> - Em caso de descumprimento desta Lei, será devido ao consumidor multa no valor de 2% do valor do saldo devedor.<br/><br/><strong>Art. 3º</strong> - Sem prejuízo da multa estabelecida nesta Lei, a Instituição Financeira está sujeita as penalidades da Lei 6.007, de 18 de julho de 2011.<br/><br/><strong>Art. 4º</strong> - Esta lei entrará em vigor na data de sua publicação.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Em caso de descumprimento da Lei, será devolvido ao consumidor multa no valor de 2% do saldo devedor.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</p>'
            },
            {
                "id":"104",
                "numero": "7165-2015",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Fornecedores de serviços.",
                "nomelei": "Alterações em contas com débito automático",
                "nome": 'Alterações em serviços cadastrados na modalidade débito automático devem ser comunicadas com 48h de antecedência.',
                "dataLei":"18 de dezembro de 2015",
                "descr1": 'Dispõe sobre a obrigatoriedade de informação ao consumidor, antecipadamente, sobre interrupção, cancelamento ou qualquer alteração de cobrança em débito automatico.',
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1°</strong> - Os fornecedores de serviços no Estado do Rio de Janeiro, ficam obrigados a comunicar ao consumidor cadastrado na modalidade de débito em conta, antecipadamente, sobre a interrupção, o cancelamento ou qualquer mudança do valor do serviço.<br/><br/><strong>§1º</strong> - A comunicação deverá ser enviada para o endereço ou para correio eletrônico indicado no contrato ou no cadastro realizado pelo fornecedor.<br/><br/><strong>§2º</strong> - A comunicação deverá conter a data, a hora, o motivo da interrupção, do cancelamento ou alteração do valor de fatura.<br/><br/><strong>§3º</strong> - O documento a que se refere o §1º, deverá ser enviado ao consumidor no mínimo 48 (quarenta oito) horas antes da interrupção, do cancelamento ou alteração do valor de fatura.<br/><br/><strong>Art 2º</strong> - O descumprimento do disposto nesta Lei, ensejará a aplicação das sanções previstas na Lei Federal nº 8.078, de 11 de setembro de 1990 – Código de Defesa do Consumidor.<br/><br/><strong>Art. 3º</strong> - Esta lei entra em vigor na data de sua publicação.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</p>'
            },

            {
                "id":"106",
                "numero": "7003-2015",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Detran",
                "nomelei": "Infrações antes da renovação da CNH não serão pontuadas",
                "nome": 'Infrações anteriores à renovação da CNH não podem ser acumuladas no novo registro.',
                "dataLei":"11 de maio de 2015",
                "descr1": 'O Detran não pode suspender ou cassar o direito de dirigir com base na soma de pontos perdidos por infrações cometidas em data anterior à da renovação da carteira de habilitação.',
                "html": '<h3>A Assembléia Legislativa do estado do Rio de Janeiro decreta:</h3><br/><br/><strong>Art. 1°</strong> - O Departamento de Trânsito não poderá suspender ou cassar o direito de dirigir com base na soma de pontos perdidos por infrações cometidas em data anterior à data de renovação da carteira de habilitação.<br/><br/><strong>Art 2º</strong> - Esta Lei entrará em vigor na data de publicação desta Lei.<br/><br/>',
                "multatexto": '<h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"107",
                "numero": "7172-2015",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Empresas administradoras do serviço de cobrança do sistema eletrônico de pedágios conveniados",
                "nomelei": "Pedágio automático vinculado ao CPF",
                "nome": 'Pagamento automático em pedágio deve ser associado ao CPF do motorista e suas tags podem ser usadas em mais de um veículo.',
                "dataLei": "28 de dezembro de 2015",
                "descr1": 'Sistemas de pagamento automático em pedágios no estado serão vinculados ao CPF do motorista, e não mais à placa do veículo. Os tags (aparelhos que registram o pagamento) podem ser usados em mais de um veículo, e serão aceitos em todas as praças de pedágio do estado do Rio.',
                "html": '<h3>A Assembléia Legislativa do estado do Rio de Janeiro decreta:</h3> <br/> <p><br/><br/> <strong>Art. 1°</strong> - O sistema eletrônico de pagamento de pedágios utilizado em rodovias sob concessão do Estado do Rio de Janeiro observará o disposto nesta lei com base nas seguintes definições:<br/><br/> <strong>§1º</strong> - Sistema eletrônico de pagamento de pedágio para os fins desta Lei é aquele que utiliza sensor fixado no veículo, de modo a permitir a passagem sem a necessidade de parada do veículo por praças de pedágio;<br/><br/> <strong>§2º</strong> - TAG é o dispositivo sensor de identificação de veículos através de etiqueta habilitada que, instalado no para-brisas, permite:<br><br> a) a identificação do veículo por radiofrequência;<br> b) a passagem do veículo pelo sistema eletrônico que automatiza as praças de pedágio;<br> c) a geração automática das respectivas cobranças para pagamento oportuno.<br><br> <strong>§ 3º</strong> – Serviço de cobrança do sistema eletrônico de pagamento de pedágios é a mediação entre os usuários do sistema eletrônico de pagamento de pedágios e as concessionárias que administram as rodovias estaduais, por força de contrato de adesão, que permite a cobrança automática para pagamento oportuno de tarifa ou preço pelo usuário;<br><br> <strong>§ 4º</strong> – Usuário do sistema: o consumidor que celebra contrato de adesão com a empresa administradora do serviço de cobrança do sistema eletrônico de pedágios conveniados, recebendo o TAG em comodato;<br><br> <strong>Art. 2°</strong> - O equipamento de identificação eletrônica (TAG) deverá ser aceito de forma integrada e sem custo adicional, nas praças de pedágio situadas no âmbito do Estado do Rio de Janeiro, independentemente da empresa que o emita ou da concessionária que administre a rodovia ou similar.<br><br> <strong>Art. 3º</strong> – O TAG utilizado no sistema eletrônico referido no artigo 1º deve ser vinculado ao número de inscrição do usuário:<br><br> I – no Cadastro de Pessoas Físicas do Ministério de Fazenda (CPF/MF), se for pessoa física;<br> II – no Cadastro Nacional de Pessoas Jurídicas do Ministério da Fazenda (CNPJ), se for pessoa jurídica.<br><br> <strong>Art. 4°</strong> - O usuário devidamente cadastrado e adimplente com seu contrato poderá utilizar o equipamento de identificação eletrônica (TAG) em qualquer veiculo, mesmo aqueles em que o usuário figurar na condição locador ou como adquirente por alienação fiduciária.<br><br> <strong>§ 1º</strong> – Os procedimentos de cadastro de veículos, ou de alteração cadastral para inclusão ou substituição de veículos, para os fins desta lei dar-se-ão, respectivamente, no momento da adesão ao serviço ou, posteriormente, mediante o preenchimento e envio de formulário próprio disponibilizado na rede mundial de computadores (“internet”) ou nos postos de atendimento pessoal.<br><br> <strong>§ 2º</strong> – A substituição de um veículo cadastrado para os fins desta lei por outro que esteja em nome do usuário do sistema, nos termos do §1º, será isenta de cobrança adicional, desde que o TAG utilizado seja o mesmo.<br><br> <strong>§ 3º</strong> – É vedado o uso do TAG em veículo não cadastrado.<br><br> <strong>Art. 5º</strong> – Constituem responsabilidade da prestadora do serviço de cobrança do sistema de pedágio eletrônico, em relação ao TAG, visando à continuidade do serviço prestado:<br><br> I – a garantia de seu funcionamento;<br> II – sua manutenção. <br><br> <strong>Parágrafo único</strong> – Em caso de defeito de origem, a prestadora do serviço de cobrança do sistema de pedágio eletrônico deverá trocar o TAG sem custos para o usuário. <br><br> <strong>Art. 6º</strong> – A empresa prestadora de serviço de cobrança do sistema de pedágio eletrônico colocará à disposição do usuário as opções quanto à forma de pagamento.<br><br> <strong>Parágrafo único</strong> – A prestadora de serviços a que se refere o “caput” não poderá cobrar antecipadamente o serviço sem o consentimento prévio do usuário.<br><br> <strong>Art. 7º</strong> – Ficam vedadas as seguintes práticas:<br><br> I – exigência de fidelização contratual;<br> II – cobrança de nova taxa de habilitação para uso do mesmo TAG em razão de periodicidade, salvo na hipótese de interrupção e nova aquisição do serviço a pedido do usuário.<br><br> <strong>Art. 8º</strong> – Aplicar-se-á o disposto nesta lei às empresas prestadoras de serviços de gestão de meios de pagamento, responsáveis pela cobrança eletrônica e automação de tarifas de pedágio e preços de estacionamento em operação.<br><br> <strong>Art. 9°</strong> - A inobservância das disposições contidas na presente lei importará, no que couber, a aplicação das penalidades contidas no artigo 56 da lei nº 8078, de 11 de setembro de 1990.<br><br> <strong>Art. 10</strong> - Aos órgãos de defesa do consumidor do Poder executivo e do Poder legislativo, dentro de suas competências legais, cabe a adoção das medidas necessárias para fiel cumprimento das disposições contidas na presente lei.<br><br> <strong>Art. 11</strong> - Esta Lei entrará na data de sua publicação. </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contanto com o Alô Alerj: 0800-0220008 (horário comercial)</p>'
            },
            {
                "id":"110",
                "numero": "7194-2016",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Qualquer empresa ou pessoa que esteja utilizando animais para transporte",
                "nomelei": "Proibido o uso de animais para transporte",
                "nome": 'Animais não podem ser usados para transporte de carga e pessoas.',
                "dataLei": "07 de Janeiro de 2016",
                "descr1": 'O uso de animais de tração para transporte de materiais, cargas ou pessoas é proibido no Estado do Rio. A norma não se aplica aos animais utilizados em áreas rurais e turísticas.',
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br><br><strong>Art. 1º</strong> - Será responsabilizado todo indivíduo que utilizar animais para situações de fretamento, transportes de cargas, materiais ou pessoas, nas áreas urbanas e rurais, por quaisquer atos que caracterizam maus tratos aos mesmos.<br><br> <strong>§ 1°</strong> - Fica o poder público obrigado, através de seus órgãos competentes, a recolher os animais utilizados em transporte de cargas, materiais ou pessoas que sofram maus tratos por parte de seus donos e/ou usuários.<br><br> <strong>§ 2°</strong> - Entende-se como fretamento, o ato de carregar, transportar, alugar, nestes casos, charretes, carroças e demais materiais usados para tração de animais e transporte de pessoas, materiais tais como: entulhos, lixos, mobiliário, ferragens, principalmente quando utilizados por cavalos, burros, jumentos e demais animais considerados de carga.<br><br> <strong>Art. 2º</strong> - Excetua-se do cumprimento do disposto nesta Lei, a utilização de animais para o transporte de cargas, materiais ou pessoas em áreas rurais e turísticas, mesmo que em área urbana, além das localidades em que a autoridade local estabeleça a necessidade do transporte por meio animal.<br><br> <strong>Art. 3º</strong> - Qualquer cidadão, poderá quando constatado maus tratos aos animais, comunicar aos órgãos competentes e de proteção, para que seja recolhido o animal para órgãos de proteção e controle.<br><br> <strong>Art. 4º</strong> - O descumprimento desta Lei, implicará o infrator às penalidades já previstas na legislação em vigor.<br><br> <strong>Art. 5º</strong> - O Poder Executivo poderá baixar atos que se fizerem necessários para a devida regulamentação desta Lei.<br><br> <strong>Art. 6º</strong> - Esta Lei entra em vigor na data de sua publicação.<br> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O infrator poderá sofrer multa, a ser aplicada pelo órgão fiscalizador do Poder Público. </p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contanto com o Alô Alerj: 0800-0220008 (horário comercial)</p>'
            },
            {
                "id":"112",
                "numero": "7202-2016",
                "colorheader": "white",
                "categoria": "Serviços",
                "categoriaslug": "servicos",
                "subcategoria": "Instituições privadas de ensino superior",
                "nomelei": "Proibida a taxa de repetência em instituições privadas de ensino superior",
                "nome": 'Taxa de repetência é proibida em instituições privadas no ensino superior.',
                "dataLei": "08 de Janeiro de 2016",
                "descr1": 'A cobrança de taxas sobre disciplina eletiva, prova à parte e de repetência em instituições privadas de ensino superior é proibida no estado do Rio. A lei anula eventuais cláusulas contratuais que estabeleçam essas taxas.',
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br><br> <strong>Art. 1º</strong> - Fica proibida a cobrança de taxa de repetência, taxa sobre disciplina eletiva e taxa de prova por parte das instituições privadas de ensino superior no âmbito do Estado do Rio de Janeiro.<br><br> <strong>§ 1º</strong> - Entende-se por taxa de repetência o valor acrescido à mensalidade em caso de reprovação do aluno em uma ou mais disciplinas.<br><br> <strong>§ 2º</strong> - Entende-se por taxa sobre disciplina eletiva o valor acrescido em relação ao valor da disciplina obrigatória nos casos de matrícula em disciplina eletiva.<br><br> <strong>§ 3º</strong> - Entende-se por taxa de prova o valor cobrado do contratante em virtude de algum procedimento de avaliação realizado pela instituição de ensino.<br><br> <strong>Art. 2º</strong> - Fica proibida a alteração unilateral das cláusulas financeiras do contrato após a sua celebração, ressalvadas as hipóteses de reajustes previstos em lei.<br><br> <strong>Art. 3º</strong> - Será nula a cláusula contratual que obrigue o contratante ao pagamento adicional dos serviços mencionados na presente Lei, devendo ser considerado, no cálculo do valor das anuidades ou das semestralidade, os custos correspondentes.<br><br> <strong>Art. 4º</strong> - Em caso de descumprimento desta Lei aplicar-se-ão as penalidades contidas no Código de Defesa do Consumidor- CDC.<br><br> <strong>Art. 5º</strong> - Esta Lei entrará em vigor na data da sua publicação.<br> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de dois mil UFIRs-RJ em caso de descumprimento</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contanto com o Alô Alerj: 0800-0220008 (horário comercial)</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br></p>'
            },

            // TRANSPORTE - AMARELO
            {
                "id":"40",
                "numero": "3339-99",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Transpote público intermunicipal.",
                "nomelei": "Passe Livre intermunicipal",
                "nome": "Maiores de 65 anos, deficientes, alunos uniformizados da rede pública têm direito a gratuidade.",
                "dataLei":"29 de dezembro de 1999",
                "descr1": "Passe livre nos transportes urbanos intermunicipais a maiores de 65 anos, portadores de deficiências, de doença crônica de natureza física ou mental que exijam tratamento continuado e alunos uniformizados de 1º e 2º graus da rede pública.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/> <br/> <strong>Art. 1º -</strong> Aos maiores de 65 (sessenta e cinco) anos, às pessoas portadoras de deficiência e aos alunos de 1º e 2º graus uniformizados da rede pública municipal, estadual e federal, portadores de Carteira de Identidade Estudantil *, é assegurada a gratuidade nos transportes coletivos urbanos intermunicipais no território do Estado do Rio de Janeiro.<br/> * Expressão suprimida pelo art. 17 da Lei nº 4291/2004.<br/><strong>§ 1º -</strong> A gratuidade definida neste artigo se aplica exclusivamente ao período escolar e nos dias de aula.<br/> <br/> <strong>Art. 2º -</strong> Para efeito desta Lei, considera-se transportes coletivos urbanos intermunicipais: os trens, metrô, barcas, catamarães e ônibus de linhas intermunicipais da categoria AS de acordo com o Departamento de Transportes Rodoviários do Estado do Rio de Janeiro  DETRO/RJ, ou seja, tipo urbano, com duas portas e roleta<br/> <br/> <strong>§ 1º -</strong> A gratuidade definida neste artigo é válida exclusivamente para percursos de até 70 (setenta) km.<strong>§ 2º -</strong> Nos catamarães, por se tratar de transporte seletivo, a gratuidade é concedida no limite de 10% (dez por cento) de sua lotação. <br/><br/> <strong>Art. 5º -</strong> O não atendimento ao previsto nesta Lei obriga o infrator ao pagamento de multa de 100 (cem) à 1000 (mil) vezes o valor da passagem.<br/> <br/> <strong>Parágrafo único -</strong> A multa será cobrada após processo administrativo, podendo ser dobrada em caso de reincidência. <br/> <br/><strong>Art. 6º -</strong> O texto desta Lei será afixado, na sua íntegra, na entrada dos meios de transportes citados no artigo 2º e também nas bilheterias dos trens, barcas, catamarães e metrô. <br/> <br/><strong>Art. 7º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. Rio de Janeiro, 29 de dezembro de 1999. <strong>Anthony Garotinho</strong> Governador </p><div class="separator"></div><p>Projeto de Lei nº1939-A/97<br/> Mensagem nº ---<br/> Autoria: SÉRGIO CABRAL, CARLOS MINC<br/> Data de publicação 30-12-1999<br/> Data Publ. partes vetadas ---<br/> Assunto: Regulamenta Constituição Estadual, Constituição Estadual/89, Gratuidade, Transporte Coletivo, Sessenta E Cinco Anos, Passe Livre, Portador De Deficiência, Deficiênte Físico, Aluno, Uniformizado, Rede Pública, Carteira De Identidade Estudantil, Vale Transporte, Detro/Rj<br/> Tipo de Revogação: Declarado Inconstitucional<br/> Texto da Revogação: As informações aqui contidas não produzem efeitos legais. Somente a publicação no D.O. tem validade para contagem dos prazos <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 100 a 1000 vezes o valor da passagem.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</br>- Agetransp (transportes): 0800-285-9796 (horário comercial)</p>'
            },
            {
                "id":"41",
                "numero": "4733-2006",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Metrô e trem.",
                "nomelei": "Vagão exclusivo para mulheres",
                "nome": "Vagão exclusivo para mulheres nos horários de pico matutino (6h às 9h) e vespertino (17h às 20h).",
                "dataLei":"23 de março de 2006",
                "descr1": "As empresas de trem e metrô devem ter um vagão exclusivo para mulheres nos horários de pico matutino (6h às 9h) e vespertino (17h às 20h)",
                "html": '<h3>A Governadora do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>Art. 1º -</strong> As empresas que administram o sistema ferroviário e metroviário no Estado do Rio de Janeiro ficam obrigadas a destinarem vagões exclusivamente para mulheres nos horários de pico matutino e vespertino.<br/><br/><strong>§ 1º -</strong> Para efeito da presente Lei, entende-se como horário de pico matutino o intervalo entre 6h e 9h e vespertino o intervalo entre 17h e 20h.<br/><br/><strong>§ 2º -</strong> Os vagões a serem destinados para o transporte exclusivo de mulheres poderão ser destacados entre os que integram a composição dimensionada para o fluxo de passageiros nos referidos horários de pico, ou adicionados à composição, a critério da concessionária.<br/><br/><strong>§ 3º -</strong> Nos vagões que não são de uso exclusivo das mulheres poderá haver uso misto.<br/><br/><strong>§ 4º -</strong> Excetuam-se os sábados, domingos e feriados do previsto no artigo 1º da presente Lei.<br/><br/><strong>Art. 2º -</strong> As empresas terão 30 (trinta) dias para se adequar a presente Lei.<br/><br/><strong>Art. 3º -</strong> O não cumprimento do disposto no caput do art. 1º, implicará no pagamento de multa de 150 (cento e cinqüenta) UFIR/RJ.<br/><br/><strong>Parágrafo único </strong> Se a irregularidade não for sanada no prazo de 30 (trinta) dias após a notificação pelo órgão responsável pela fiscalização, será aplicada multa diária de 50 (cinqüenta) UFIR/RJ.<br/><br/><strong>Art. 4º -</strong> Esta Lei entra em vigor na data e sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 23 de março de 2006. <strong>Rosinha Garotinho</strong> Governadora </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 3168-A/2006 <br/> Mensagem nº ---<br/> Autoria: JORGE PICCIANI<br/> Data de publicação: 24-03-2006<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
				"multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>A lei não estabele punição porque tem sentido educativo. Cabe às mulheres chamarem a atenção de quem não respeita o vagão. </p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br>- Agetransp (transportes): 0800-285-9796 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"42",
                "numero": "1768-90",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Metrô, Trem, Ônibus e Barcas.",
                "nomelei": "Assento reservado para gestante e pessoa com deficiência",
                "nome": "Gestantes e pessoas com deficiência têm direito a lugar exclusivo nos transportes coletivos.",
                "dataLei":"18 de dezembro de 1990",
                "descr1": "Gestantes e pessoas com deficiência física têm direito a lugar exclusivo nos transportes coletivos.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>Art. 1º -</strong> Os transportes coletivos, de um modo geral, ficam obrigados a reservar lugar exclusivo para gestantes e deficientes físicos, preferencialmente os dois primeiros bancos.<br/><br/><strong>§ 1º -</strong> O uso ou a desocupação eventuais dos bancos referidos no caput, por outros passageiros, serão regulamentados pelo Poder Executivo, no prazo de 30 (trinta) dias contados da publicação desta Lei.<br/><br/><strong>§ 2º -</strong> As empresas concessionárias dos transportes coletivos são obrigadas a colocar nos lugares destinados às gestantes e deficientes físicos o seguinte letreiro RESERVADO PARA GESTANTES E DEFICIENTES FÍSICOS.<br/><br/><strong>Art. 2º -</strong> Os transportes coletivos municipais e intermunicipais serão adaptados para o uso de deficientes físicos dependentes imprescindíveis de cadeiras de rodas.<br/><br/><strong>Parágrafo único -</strong> Os veículos com essa destinação terão a logomarca oficial impressa externamente em, pelo menos, 20% da frota, facilitando a identificação por parte dos usuários.<br/><br/><strong>Art. 3º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 18 de dezembro de 1990. <strong>W Moreira Franco</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 857/89 <br/> Mensagem nº ---<br/> Autoria: Amadeu Chácar<br/> Data de publicação: 19-12-1990<br/> Data Publ. partes vetadas ---<br/> Assunto: Transporte, Gestante, Deficiente Físico, Cadeira De Rodas, Transporte Coletivo <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>A lei não estabele punição às pessoas que desrespeitam a lei. Cabe às pessoas chamarem a atenção de quem não cede espaço.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</br>- Agetransp (transportes): 0800-285-9796 (horário comercial)</p>'
            },
            {
                "id":"43",
                "numero": "2587-96",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Rodoviárias.",
                "nomelei": "Cadeiras de rodas em rodoviárias",
                "nome": "Rodoviárias devem manter cadeiras de roda à disposição de qualquer um que necessite usá-las.",
                "dataLei":"03 de julho de 1996",
                "descr1": "Rodoviárias devem manter cadeiras de roda à disposição de deficientes físicos ou pessoas necessitadas do uso desse equipamento.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Ficam as Estações Rodoviárias Estaduais abrigadas a manter gratuitamente cadeiras de rodas à disposição de deficientes físicos ou de pessoas circunstancialmente necessitadas do uso deste equipamento.<br/><strong>Parágrafo Único -</strong> V E T A D O<br/><br/><strong>Art. 2º -</strong> As cadeiras de rodas de que trata esta Lei deverão obedecer as normas da Associação Brasileira de Normas Técnicas - ABNT.<br/><br/><strong>Art. 3º -</strong> O Poder Executivo regulamentará as disposições desta Lei no prazo de 60 (sessenta) dias.<br/><br/><strong>Art. 4º -</strong> Fica concedido um prazo de 60 (sessenta) dias para que os concessionários das estações rodoviárias se enquadrem nas disposições desta Lei.<br/><br/><strong>Art. 5º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário <br/><br/> Rio de Janeiro, 03 de julho de 1996. <strong>Marcello Alencar</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 283-A/95 <br/> Mensagem nº ---<br/> Autoria: JARBAS STELMANN<br/> Data de publicação: 04-07-1996<br/> Data Publ. partes vetadas ---<br/> Assunto: Cadeira De Rodas, Portador De Deficiência, Idoso, Rodoviária, Deficiente Físico, Prazo <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Procon pode aplicar multa estabelecida no Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"44",
                "numero": "6969-15", 
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Rodoviárias.",
                "nomelei": "Assentos reservados nas rodoviárias",
                "nome": "Assentos preferenciais devem representar pelo menos 10% do total em rodoviárias.",
                "dataLei":"03 de março de 2015",
                "descr1": "Rodoviárias devem reservar 10% de seus assentos a idosos, gestantes, lactantes e portadores de deficiência.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Serão destinados, preferencialmente, para as pessoas com deficiência, os idosos com idade igual ou superior a 60 (sessenta) anos, as gestantes, as lactantes e as pessoas acompanhadas por crianças de colo, 10% (dez por cento) dos assentos dos terminais rodoviários localizados no Estado do Rio de Janeiro<br/><br/><strong>Art. 2º -</strong> Os assentos de que trata o art. 1º terão identificação específica, que informe a sua destinação.<br/><br/><strong>Art. 3º -</strong> Esta Lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 03 de março de 2015. <strong>Luiz Fernando de Souza</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 505-A/2011 <br/> Mensagem nº ---<br/> Autoria: MARCUS VINICIUS<br/> Data de publicação: 04-03-2015<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Procon pode aplicar multa estabelecida no Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"45",
                "numero": "6626-13",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Veículos públicos ou privados de transporte coletivo.",
                "nomelei": "Bebidas álcoolicas no transporte público",
                "nome": "É proibido o consumo de bebidas alcoólicas dentro de qualquer transporte coletivo.",
                "dataLei":"12 de dezembro de 2013",
                "descr1": "Consumo de bebidas alcóolicas no interior de veículos, públicos ou privados, de transporte coletivo é proibido.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Fica proibido o consumo de bebidas alcoólicas, de qualquer gênero, e seus derivados, no interior de veículos, públicos ou privados, de transporte coletivo de passageiros, autorizados, permitidos ou concedidos pelo Estado do Rio de Janeiro, ou por suas secretarias, autarquias e demais órgãos.<br/><br/><strong>Art. 2º -</strong> As pessoas físicas ou jurídicas responsáveis pelos veículos, públicos ou privados, de transporte coletivo de passageiros, deverão afixar aviso da proibição do consumo de bebidas alcoólicas no interior dos veículos, em locais de ampla visibilidade, com indicação de telefone e endereço dos órgãos estaduais responsáveis pela fiscalização e pela defesa do consumidor, para denúncia de qualquer cidadão, além de outras providências.<br/><br/><strong>Art. 3º -</strong> As pessoas físicas ou jurídicas responsáveis ou, ainda, os condutores dos veículos de que trata esta Lei deverão advertir os eventuais infratores sobre a proibição do consumo de bebidas alcoólicas no interior, bem como sobre a obrigatoriedade, caso persista na conduta coibida, de imediata retirada do local, se necessário, mediante o auxílio de força policial.<br/><br/><strong>Art. 4º -</strong> O responsável pelo veículo de que trata esta Lei deverá tomar todos os atos necessários para evitar a ocorrência de infração da presente Lei, sujeitando-se, em caso de omissão, às sanções previstas no artigo 56 da Lei Federal nº 8.078, de 11 de setembro de 1990  Código Defesa do Consumidor, aplicáveis na forma de seus artigos 57 a 60, sem prejuízo das sanções previstas nos procedimentos para concessões de autorizações, permissões e concessões de licenças.<br/><br/><strong>Art. 5º -</strong> O procedimento para a retirada do infrator, descrita no artigo 3º, deverá ser realizado na primeira parada do veículo após a infração, devendo o motorista, o cobrador ou qualquer passageiro, solicitar ajuda policial, se necessário.<br/><br/><strong>Art. 6º -</strong> Qualquer pessoa poderá relatar ao órgão fiscalizador ou de defesa do consumidor da respectiva área de atuação fato que tenha presenciado em desacordo com o disposto nesta Lei.<br/><br/><strong>§1º</strong> O relato de que trata o caput deste artigo conterá:<br/><br/><strong>I -</strong> a exposição do fato e suas circunstâncias;<br/><strong>II -</strong> a declaração, sob as penas da lei, de que o relato corresponde à verdade;<br/><strong>III -</strong> a identificação do autor, com nome, prenome, número da cédula de identidade, seu endereço e assinatura.<br/><br/><strong>§2º</strong> A critério do interessado, o relato poderá ser apresentado por meio eletrônico, no sítio de rede mundial de computadores internet dos órgãos referidos no caput deste artigo, devendo ser ratificado, para atendimento de todos os requisitos previstos nesta Lei.<br/><strong>§3º</strong> O relato feito nos termos deste artigo constitui prova idônea para o procedimento sancionatório.<br/><br/><strong>Art. 7º -</strong> O Poder Executivo regulamentará a presente Lei no prazo de 90 (noventa) dias.<br/><br/><strong>Art. 8º -</strong> Fica autorizado o Poder Executivo a criar, anualmente, campanhas de publicidade, de esclarecimento, de informação e de orientação sobre a presente Lei.<br/><br/><strong>Art. 9º -</strong> Esta Lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 12 de dezembro de 2013. <strong>Sérgio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1234/2012 <br/> Mensagem nº ---<br/> Autoria: ROSENVERG REIS<br/> Data de publicação: 13-12-2013<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O responsável pelo veículo deverá tomar providências para evitar a ocorrência de infração, sujeitando-se, em caso de omissão, às multas de acordo com o Código de Defesa do Consumidor. Mínima de 200 UFIR-RJ (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)<br />- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742<br />- Agetransp (transportes): 0800-285-9796 (horário comercial)</p>'
            },
            {
                "id":"46",
                "numero": "6172-2012",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Concessionária de metrô.",
                "nomelei": "Cartão do Metrô",
                "nome": "É obrigatória a devolução do valor retido no cartão pré-pago do Metrô ao usuário.",
                "dataLei":"6 de março de 2012",
                "descr1": "É obrigatória a devolução do valor retido no cartão pré-pago do Metrô sempre que solicitado pelo usuário.",
                "html": '<p><strong>A ASSEMBLÉIA LEGISLATIVA DO ESTADO DO RIO DE JANEIRO,</strong><br/> D E C R E T A:<br/><br/><br>Art. 1º Ficam as condições de compra e recarga do cartão pré-pago do Metrô submetidas a esta Lei.<br><br>Art. 2º É obrigatória a devolução do valor retido no cartão pré-pago, se solicitado pelo usuário.<br><br>Art. 3º Esta Lei entra em vigor na data de sua publicação.<br><br>Assembleia Legislativa do Estado do Rio de Janeiro, em 6 de março de 2012.<br><br><br>DEPUTADO PAULO MELO</b><br>Presidente</b></div><br><div class="separator"></div><p><b>Projeto de Lei nº</b> 560/2011<br/> Mensagem nº ---<br/> Autoria: ANDRÉ LAZARONI<br/> Data de publicação: 07-03-2012<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR <br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Procon pode aplicar multa estabelecida no Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ. (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)<br />- Alô Alerj: 0800-0220008 (horário comercial)<br />- Agetransp (transportes): 0800-285-9796 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"47",
                "numero": "5274-2008",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Concessionárias de metrô e trem.",
                "nomelei": "Horários dos trens",
                "nome": "Obrigatoriedade de painéis eletrônicos mostrando horários de saídas das composições.",
                "dataLei":"25 de junho de 2008",
                "descr1": "Concessionárias de metrô e trem devem ter painéis eletrônicos mostrando horários de saídas das composições.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1º</strong> As concessionárias responsáveis pelos transportes metroviário e ferroviário no Estado do Rio de Janeiro, ficam obrigadas a instalar painéis eletrônicos, em locais visíveis, com a finalidade de informar os horários das saídas das composições.<br/><br/><strong>Parágrafo único.</strong> Em cada estação ou terminal de transporte haverá, pelo menos, um ponto com o painel de que trata o caput.<br/><br/><strong>Art. 2º</strong> O descumprimento ao que dispõe a presente Lei acarretará à concessionária responsável multa no valor de 10.000 (dez mil) UFIRs.<br/><br/><strong>Art. 3º </strong>As concessionárias abrangidas por esta lei, terão prazo de 90 (noventa dias) para se adequarem à presente norma.<br/><br/><strong>Art. 4º </strong>Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário.<br/><br/>Rio de Janeiro, 25 de junho de 2008.<strong>SÉRGIO CABRAL</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 3557/2006<br/> Mensagem nº ---<br/> Autoria: CIDINHA CAMPOS<br/> Data de publicação: 26-06-2008<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR <br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 10 mil UFIRs (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>- Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)<br />- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742<br />- Agetransp (transportes): 0800-285-9796 (horário comercial)</p>'
            },
            {
                "id":"48",
                "numero": "3884-2002",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Rodoviárias, aeroportos e estabelecimentos em geral.",
                "nomelei": "Banheiro para idosos",
                "nome": "Pessoas com mais de 60 anos são isentas de pagamento em qualquer banheiro público.",
                "dataLei":"25 de junho de 2002",
                "descr1": "Pessoas com mais de 60 anos são isentas de qualquer tipo de pagamento para utilização de banheiros públicos.",
                "html": '<p><strong>A GOVERNADORA DO ESTADO DO RIO DE JANEIRO,</strong><br/> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <span style="text-decoration:line-through;"><strong>Art. 1º -</strong> Ficam isentas de qualquer tipo de pagamento para utilização de banheiros públicos as pessoas maiores de 65 anos.</span><br/><br/><strong>* Art. 1º -</strong> Ficam isentas de qualquer tipo de pagamento para utilização de banheiros públicos as pessoas maiores de 60 (sessenta) anos.<br/><strong>* Nova redação dada pela Lei nº 6710/2014.</strong><br/><strong>Parágrafo único </strong> O direito a este benefício poderá ser comprovado com a apresentação de qualquer documento de identidade.<br/><br/><strong>Art. 2º -</strong> Todos os banheiros públicos deverão ter afixado, em lugar visível, aviso comunicando a existência desta gratuidade.<br/><br/><strong>Art. 3º -</strong> A desobediência ao disposto na presente Lei será advertida com multa de 100 UFIRs e, em caso de reincidência de empresa concessionária, perda do direito de concessão para exploração do espaço público.<br/><br/><strong>Art. 4º -</strong> Esta Lei entra em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 25 de junho de 2002. <strong>Benedita da Silva</strong> Governadora </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1330/2000 <br/> Mensagem nº ---<br/> Autoria: SOLANGE AMARAL<br/> Data de publicação: 01-07-2002<br/> Data Publ. partes vetadas ---<br/> Assunto: Idoso, Banheiro <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 100 UFIRs para o administrador do banheiro localizado em local público.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"49",
                "numero": "6483-13",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Todo Estado do Rio de Janeiro.",
                "nomelei": "Discriminação  e  preconceito",
                "nome": "Práticas discriminatórias por motivo de raça, cor, etnia, religião e afins são passíveis de multa.",
                "dataLei":"04 de julho de 2013",
                "descr1": "Toda prática discriminatória por motivo de raça, cor, etnia, religião ou procedência nacional é passível de multa.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Esta Lei disciplina a aplicação das penalidades administrativas, motivadas pela prática de atos de discriminação racial.<br/><br/><strong>Art. 2º -</strong> Será punido, nos termos desta lei, todo ato discriminatório por motivo de raça, cor, etnia, religião ou procedência nacional praticado no Estado do Rio de Janeiro, por qualquer pessoa, jurídica ou física, inclusive a que exerça função pública.<br/><br/><strong>Art. 3º -</strong> Consideram-se atos discriminatórios por motivo de raça, cor, etnia, religião ou procedência nacional, para os efeitos desta lei:<br/><br/><strong>I -</strong> praticar qualquer tipo de ação violenta, constrangedora, intimidatória ou vexatória;<br/><strong>II -</strong> proibir o ingresso ou a permanência em ambiente ou estabelecimento aberto ao público;<br/><strong>III -</strong> criar embaraços à utilização das dependências comuns e áreas não-privativas de edifícios;<br/><strong>IV -</strong> recusar, retardar, impedir ou onerar a utilização de serviços, meios de transporte ou de comunicação, consumo de bens, hospedagem em hotéis, motéis, pensões e estabelecimentos congêneres ou o acesso a espetáculos artísticos ou culturais;<br/><strong>V -</strong> recusar, retardar, impedir ou onerar a locação, compra, aquisição, arrendamento ou empréstimo de bens móveis ou imóveis;<br/><strong>VI -</strong> praticar o empregador, ou seu preposto, atos de coação direta ou indireta sobre o empregado;<br/><strong>VII -</strong> negar emprego, demitir, impedir ou dificultar a ascensão em empresa pública ou privada, assim como impedir ou obstar o acesso a cargo ou função pública ou certame licitatório;<br/><strong>VIII -</strong> praticar, induzir ou incitar, pelos meios de comunicação, o preconceito ou a prática de qualquer conduta discriminatória;<br/><strong>IX -</strong> criar, comercializar, distribuir ou veicular símbolos, emblemas, ornamentos, distintivos ou propagandas que incitem ou induzam à discriminação;<br/><strong>X -</strong> recusar, retardar, impedir ou onerar a prestação de serviço de saúde, público ou privado.<br/><br/><strong>Art. 4º -</strong> A prática dos atos discriminatórios a que se refere esta lei será apurada em processo administrativo, que terá início mediante:<br/><br/><strong>I -</strong> reclamação do ofendido ou de seu representante legal, ou ainda de qualquer pessoa que tenha ciência do ato discriminatório;<br/><strong>II -</strong> ato ou ofício de autoridade competente.<br/><strong>Art. 5º -</strong> Aquele que for vítima da discriminação, seu representante legal, ou quem tenha presenciado os atos a que se refere o artigo 3º desta lei, poderá relatá-los à Órgão definido pelo Poder Executivo.<br/><br/><strong>§ 1º -</strong> O relato de que trata o caput deste artigo conterá:<br/>1 - a exposição do fato e suas circunstâncias;<br/>2 - a identificação do autor, com nome, prenome, número da cédula de identidade, seu endereço e assinatura.<br/><br/><strong>§ 2º -</strong> A critério do interessado, o relato poderá ser apresentado por meio eletrônico, no sítio de rede mundial de computadores do Órgão competente. <br/><strong>§ 3º -</strong> Recebida a denúncia, competirá ao Órgão Competente:<br/><strong>I -</strong> promover a instauração do processo administrativo devido para apuração e imposição das sanções cabíveis;<br/><strong>II </strong> transmitir notícia à autoridade policial competente, para a elucidação cabível, quando o fato descrito caracterizar infração penal.<br/><strong>Art. 6º -</strong> O Estado do Rio de Janeiro para cumprir o disposto nesta lei, poderá firmar convênios com Municípios.<br/><br/><strong>Art. 7º -</strong> As sanções aplicáveis aos que praticarem atos de discriminação nos termos desta lei serão as seguintes:<br/><br/><strong>I -</strong> advertência;<br/><strong>II -</strong> v multa de até 1000 (mil) UFIRŽS - Unidades Fiscais do Estado do Rio de Janeiro<br/><strong>III -</strong> multa de até 3000 (três mil) UFIRŽS - Unidades Fiscais do Estado do Rio de Janeiro, em caso de reincidência;<br/><strong>IV -</strong> suspensão da licença estadual para funcionamento por 30 (trinta) dias;<br/><strong>V -</strong> cassação da licença estadual para funcionamento.<br/><strong>§ 1º -</strong> Quando a infração for cometida por agente público, servidor público ou militar, no exercício de suas funções, sem prejuízo das sanções previstas nos incisos I a III deste artigo, serão aplicadas as penalidades disciplinares cominadas na legislação pertinente.<br/><strong>§ 2º -</strong> O valor da multa será fixado tendo-se em conta as condições pessoais e econômicas do infrator e não poderá ser inferior a 500 (quinhentas) UFIRŽS  Unidades Fiscais do Estado do Rio de Janeiro.<br/><strong>§ 3º -</strong> A multa poderá ser elevada até o triplo, quando se verificar que, em virtude da situação econômica do infrator, sua fixação em quantia inferior seria ineficaz.<br/><strong>§ 4º -</strong> Quando for imposta a pena prevista no inciso V deste artigo, deverá ser comunicada a autoridade responsável pela outorga da licença, que providenciará a sua execução, comunicando-se, igualmente, a autoridade federal ou municipal para eventuais providências no âmbito de sua competência.<br/><br/><strong>Art. 8º -</strong> Na apuração dos atos discriminatórios praticados com violação desta lei, deverão ser observados os procedimentos previstos na Lei nº 5.427, de 01 de abril de 2009, que regula o processo administrativo no âmbito da Administração Pública Estadual.<br/><br/><strong>Art. 9 -</strong> O Poder Executivo regulamentará a presente Lei.<br/><br/><strong>Art. 10 -</strong> Esta lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 04 de julho de 2013. <strong>Sérgio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 3309/2010 <br/> Mensagem nº ---<br/> Autoria: GILBERTO PALMARES<br/> Data de publicação: 05-07-2013<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Penalidades vão de advertência à cassação de licença. Multa variável entre 500 e 1.500 UFIR-RJ.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"50",
                "numero": "3295-99",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Todos os meios de transporte e repartições públicas e privadas.",
                "nomelei": "Acesso para cães-guia",
                "nome": "Cães-guias de deficientes podem acessar qualquer meio de transporte e locais públicos e privados.",
                "dataLei":"16 de novembro de 1999",
                "descr1": "Portadores de deficiência visual podem ingressar e permanecer em qualquer meio de transporte e repartições públicas e privadas com seus cães-guias.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Os cães-guias quando acompanhados de pessoas portadoras de deficiência visual (cegueira e visão sub-normal), ou de treinador, ou acompanhante habilitado poderão ingressar e permanecer nas repartições públicas ou privadas, em qualquer meio de transporte, seja hidroviário, ferroviário, metroviário, de cooperativas, táxis ou afins, em todo e qualquer estabelecimento comercial, industrial, de serviços de promoção, proteção e recuperação de saúde e demais locais públicos.<br/><br/><strong>§ 1º -</strong> Para efeito desta Lei entende-se por:<br/><br/><strong>a) -</strong> CÃO GUIA - o cão-guia que tenha obtido certificado de uma Escola filiada e aceita pela Federação Internacional de Escolas de Cães-Guias para Cegos, que esteja a serviço de uma pessoa portadora de deficiência visual ou em estágio de treinamento.<br/><strong>b) -</strong> COOPERATIVAS - transportes autorizados, kombis, micro ônibus e afins ou qualquer outro transporte alternativo de que se faça necessária sua utilização.<br/><strong>c) -</strong> LOCAIS PÚBLICOS - hotéis, restaurantes, shoppings, lojas de diversão ou lazer e, de modo geral, todo e qualquer lugar aberto ao público, quer seja a título gratuito ou oneroso.<br/><br/><strong>§ 2º -</strong> Nos casos previstos no caput deste artigo, é vedada a cobrança de preço, tarifa ou acréscimo vinculado, direta ou indiretamente, ao ingresso ou presença do cão-guia.<br/><strong>§ 3º -</strong> Sem prejuízo do disposto neste artigo, o proprietário do cão-guia responde civil e criminalmente pelos danos ou lesões causadas pelo mesmo.<br/><br/><strong>Art. 2º -</strong> Toda e qualquer pessoa que pertencer, prestar serviços ou ser proprietário dos locais mencionados no caput do artigo anterior e que venham a impedir o ingresso e permanência da pessoa portadora de deficiência visual que necessite de cão-guia, estará atentando contra os direitos humanos e será passível de punição prevista em lei.<br/><br/><strong>Art. 3º -</strong> Os estabelecimentos comerciais e industriais, as repartições públicas ou privadas, bem como os meios de transportes mencionados no artigo 1º, em caso de discriminação ou não cumprimento de estabelecido nesta Lei serão punidos com penas de interdição, multas e outras penalidades previstas em lei.<br/><br/><strong>Art. 4º -</strong> A pessoa portadora de deficiência visual tem direito de manter pelo menos um cão-guia em sua residência e de transitar com o mesmo, seguro em coleira, nas áreas e dependências comuns do respectivo condomínio, independentemente de restrições à presença de animais na convenção do condomínio ou regimento interno.<br/><br/><strong>Art. 5º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 16 de novembro de 1999. <strong>Anthony Garotinho</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 2330/98 <br/> Mensagem nº ---<br/> Autoria: SOLANGE AMARAL, TANIA RODRIGUES<br/> Data de publicação: 24-11-1999<br/> Data Publ. partes vetadas ---<br/> Assunto: Cão, Portador De Deficiência, Deficiente Visual, Deficiente Físico, Animal, Transporte <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Penas vão de multa à interdição do estabelecimento que negar a entrada.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
             {
                "id":"51",
                "numero": "3559-01",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Escolas, hospitais e empresas em geral.",
                "nomelei": "Discriminação de soropositivos",
                "nome": "Estabelecimentos que discriminem portadores de HIV devem ser penalizados.",
                "dataLei":"15 de maio de 2001",
                "descr1": "Estabelecimentos (como escolas, hospitais e empresas em geral) que discriminem pessoas portadoras de HIV devem ser penalizados.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> A violação do princípio da igualdade de direitos prevista no Art. 9º, § 1º da Constituição do Estado do Rio de Janeiro, quando praticada por estabelecimentos que discriminem portadores do vírus HIV, sintomáticos e assintomáticos, constitui infração administrativa.<br/><br/><strong>Art. 2º -</strong> O Poder Executivo, através do seu órgão competente, penalizará todo estabelecimento comercial, industrial, entidades educacionais públicas e privadas, creches, hospitais, casas de saúde, clínicas, e associações civis ou prestadoras de serviços que, por atos de seus proprietários ou prepostos, discriminem portadores do vírus HIV, sintomáticos e assintomáticos.<br/><br/><strong>Art. 3º -</strong> Constituem infrações administrativas as ações que visem discriminar os portadores do vírus HIV, dentre outras :<br/><br/><strong>I </strong> A exigência do teste HIV no processo de seleção, para admissão ao emprego;<br/><strong>II </strong> A exigência do teste HIV para permanência no emprego, mediante ameaça de rescisão contratual;<br/><strong>III </strong> A exigência do teste HIV como condição de concurso público ou privado;<br/><strong>IV </strong> A exigência do teste HIV como condição de ingresso ou permanência em creches e estabelecimentos educacionais;<br/><strong>V </strong> A recusa em aceitar o ingresso ou permanência de alunos soropositivos em estabelecimentos educacionais e creches;<br/><strong>VI </strong> A recusa de atendimento a portadores de vírus HIV, sintomáticos e assintomáticos, em hospitais públicos e privados;<br/><strong>VII </strong> A recusa na manutenção do custeio do tratamento para os portadores do vírus HIV, e na autorização para exames complementares dos pacientes associados ou segurados dos planos de saúde;<br/><strong>VIII </strong> A demissão do soropositivo ou portador do HIV em razão de sua condição de portador do vírus HIV. <br/><br/><strong>Art. 4º -</strong> Consideram-se infratores desta Lei as pessoas que, direta ou indiretamente, tenham concorrido para o cometimento da infração administrativa.<br/><br/><strong>Art. 5º -</strong> Serão aplicadas as seguintes penalidades administrativas aos infratores :<br/><br/><strong>I </strong> Multa de 50 a 50.000 UFIRŽS, ou outra unidade que venha a substitui-la;<br/><strong>II </strong> Cassação de licença de funcionamento dos estabelecimentos infratores.<br/><br/><strong>Art. 6º -</strong> Constituem penas alternativas :<br/><br/><strong>I </strong> A promoção de campanha publicitária esclarecendo sobre os direitos dos soropositivos e portadores do HIV, de acordo com a legislação federal, estadual e municipal vigente;<br/><strong>II </strong> A confecção de material informativo sobre a prevenção e os cuidados da AIDS;<br/><strong>III </strong> A prestação de trabalhos em estabelecimentos de atenção aos portadores do vírus HIV.<br/><br/><strong>Art. 7º -</strong> Fica o Poder Executivo autorizado a criar o Fundo Estadual de Informação, Prevenção e Assistência da AIDS, para o qual reverterão as multas arrecadadas, que serão aplicadas em entidades que assistam aos portadores do vírus HIV.<br/><br/><strong>Parágrafo único </strong> A Comissão Estadual de AIDS, criada pela Resolução nº 700, de 3 de dezembro de 1991, administrará os recursos mencionados no caput deste artigo.<br/><br/><strong>Art. 8º -</strong> O poder de polícia será exercido pelo órgão estadual competente.<br/><br/><strong>Art. 9º -</strong> O descumprimento da presente Lei será apurado através de processo administrativo pelo órgão competente, com ampla defesa, independente das sanções civis e penais cabíveis, definidas em normas específicas.<br/><br/><strong>Art. 10 </strong> O Ministério Público fiscalizará a aplicação desta Lei, incumbindo-lhe a propositura das ações competentes.<br/><br/><strong>Art. 11 </strong> Todos os cidadãos podem comunicar às autoridades administrativas as infrações à presente Lei.<br/><br/><strong>Art. 12  </strong>O Poder Executivo deverá manter setor especializado para receber denúncias relacionadas às infrações à presente Lei.<br/><br/><strong>Art. 13 </strong> Fica o Poder Executivo autorizado a baixar as normas regulamentares ao presente projeto de Lei, no prazo de 60 (sessenta) dias após a sua publicação.<br/><br/><strong>Art. 14 </strong> Esta Lei entrará em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 15 de maio de 2001. <strong>Anthony Garotinho</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 54-A/99 <br/> Mensagem nº ---<br/> Autoria: CARLOS MINC<br/> Data de publicação: 24-05-2001<br/> Data Publ. partes vetadas ---<br/> Assunto: Hiv, Aids, Discriminação, Doente <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 50 a 50 mil UFIRs (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"52",
                "numero": "1886-1991",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Empresas em geral.",
                "nomelei": "Discriminação sexual",
                "nome": "Proíbe exigência de testes para verificação de gravidez para admissão ou permanência no emprego.",
                "dataLei":"08 de novembro de 1991",
                "descr1": "Proíbe chantagem sexual, como exigência de teste de urina ou sangue para verificação de gravidez e comprovação de esterilização para admissão ou permanência no emprego.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Esta lei estabelece penalidades aos estabelecimentos localizados no Estado do Rio de Janeiro que discriminem mulheres, violando o princípio que adota a igualdade de direitos entre homens e mulheres de acordo com o § 1º do artigo 9º da Constituição Estadual, garantindo a proteção dos direitos individuais e coletivos.<br/><br/><span style="text-decoration:line-through;"><strong>Art. 2º -</strong> Dentro de sua competência, o Poder Executivo penalizará todo estabelecimento comercial, industrial, entidades, representações, associações, sociedades civis ou de prestações de serviços que, por atos de seus proprietários ou prepostos, discriminem mulheres em função de seu sexo, ou contra elas adotem atos de coação ou violência, tais como exigência ou tentativa de vantagem sexual da mulher por parte do patrão ou preposto, mediante ameaça de rescisão contratual.</span><br/><strong>*Art. 2º -</strong> Dentro de sua competência, o Poder Executivo penalizará todo estabelecimento comercial, industrial, entidades, representações, associações, sociedades civis ou de representação de serviços que, por atos de seus proprietários ou prepostos, discriminem pessoas em função do seu sexo, ou contra elas adotem atos de coação ou violência, tais como exigência ou tentativa de obter vantagem sexual por parte do superior hierárquico, independentemente do seu sexo e da sua opção sexual, com o objetivo de exigir favor sexual do subordinado, independentemente do seu sexo ou da sua opção sexual, sob ameaça ou efetivo prejuízo no trabalho ou perda do emprego.<br/><strong>* Nova redação dada pelo artigo 2º da Lei 3179/99 Controle de Leis</strong><br/><strong>Parágrafo Único -</strong> Considera-se como prática de restrição ao direito da mulher ao emprego, entre outras, a adoção de medidas não previstas na legislação pertinente e especialmente:<br/><br/><strong>I -</strong> Exigência ou solicitação de teste de urina ou sangue, para verificação de estado de gravidez, processos de seleção para admissão ao emprego;<br/><strong>II -</strong> Exigência ou solicitação de comprovação de esterelização, para admissão ou permanência no emprego;<br/><strong>III -</strong> Exigência de exame ginecológico periódico, como condição para permanência no emprego;<br/><strong>IV -</strong> Discriminação às mulheres casadas, ou mães, nos processos de seleção e treinamento ou rescisão de contrato de trabalho.<br/><br/><strong>Art. 3º -</strong> O descumprimento da presente Lei será apurado através de processo administrativo pelo órgão competente, independente das sanções civis e penais cabíveis, definidas em normas específicas.<br/><br/><strong>§ 1º -</strong> Aos infratores desta Lei serão aplicadas as seguintes penalidades administrativas:<br/><strong>I -</strong> advertência;<br/><strong>II -</strong> multa de 1 a 1000 UFERJs ou outra unidade que venha substituí-la;<br/><strong>III -</strong> VETADO.<br/><strong>IV -</strong> VETADO.<br/><strong>§ 2º -</strong> VETADO.<br/><strong>§ 3º -</strong> Considera-se infratora desta Lei a pessoa que direta ou indiretamente tenha concorrido para o cometimento da infração administrativa.<br/><br/><strong>Art. 4º -</strong> Todos os cidadãos podem comunicar às autoridades administrativas as infrações à presente Lei.<br/><br/><strong>Art. 5º -</strong> O Poder Executivo deverá manter setor especializado para receber denúncias relacionadas às infrações à presente Lei.<br/><br/><strong>Art. 6º -</strong> O Poder Executivo regulamentará a presente Lei em 60 (sessenta) dias, a partir de sua publicação.<br/><br/><strong>Art. 7º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 08 de novembro de 1991. <strong>Leonel Brizola</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 64/91 <br/> Mensagem nº ---<br/> Autoria: CARLOS MINC<br/> Data de publicação: 211-11-1991<br/> Data Publ. partes vetadas ---<br/> Assunto: Saúde, Violência, Assédio Sexual, Mulher <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 1 a mil UFERJs. (1 UFERJ = 44,2655 UFIR-RJ. 1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"90",
                "numero": "7041-2015",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Estabelecimentos comerciais, industriais, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços.",
                "nomelei": "Discriminação de LGBTs",
                "nome": "Estabelecimentos que discriminem orientação sexual ou identidade de gênero podem ser punidos.",
                "dataLei":"15 de julho de 2015",
                "descr1": "Estabelecimentos comerciais, industriais, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços que discriminem as pessoas em razão de sua orientação sexual e identidade de gênero estão sujeitas a penalidades administrativas.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º</strong> - Esta Lei estabelece infrações administrativas a condutas discriminatórias motivadas por preconceito de sexo ou orientação sexual, praticadas por agentes públicos e estabelecimentos localizados no Estado do Rio de Janeiro, ou que discriminem pessoas em virtude de sua orientação sexual.<br><br> <strong>Parágrafo único</strong> - Para efeitos de aplicação desta Lei, o termo “sexo” é utilizado para distinguir homens e mulheres, enquanto o termo “orientação sexual” refere-se à heterossexualidade, à homossexualidade e à bissexualidade.<br><br> <strong>Art. 2º</strong> - O Poder Executivo, no âmbito de sua competência, penalizará estabelecimento público, comercial e industrial, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços que, por atos de seus proprietários ou prepostos, discriminem pessoas em função de preconceito de sexo e de orientação sexual ou contra elas adotem atos de coação, violência física ou verbal ou omissão de socorro.<br><br> <strong>Parágrafo único</strong> - Entende-se por discriminação:<br><br> <strong>I</strong> - recusar ou impedir o acesso ou a permanência ou negar atendimento nos locais previstos no Artigo 2º desta Lei bem como impedir a hospedagem em hotel, motel, pensão, estalagem ou qualquer estabelecimento similar;<br><br> <strong>II</strong> - impor tratamento diferenciado ou cobrar preço ou tarifa extra para ingresso ou permanência em recinto público ou particular aberto ao público;<br><br> <strong>III</strong> - impedir acesso ou recusar atendimento ou permanência em estabelecimentos esportivos, sociais, culturais, casas de diversões, clubes sociais, associações, fundações e similares;<br><br> <strong>IV</strong> - recusar, negar, impedir ou dificultar a inscrição ou ingresso de aluno em estabelecimento de ensino público ou privado de qualquer nível;<br><br> <strong>V</strong> - impedir, obstar ou dificultar o acesso de pessoas, devidamente habilitadas a qualquer cargo ou emprego da Administração direta ou indireta, bem como das concessionárias e permissionárias de serviços públicos;<br><br> <strong>VI</strong> – negar, obstar ou dificultar o acesso de pessoas, devidamente habilitadas a qualquer cargo ou emprego em empresa privada; <br><br> <strong>VII</strong> - impedir o acesso ou o uso de transportes públicos, como ônibus, metrô, trens, barcas, catamarãs, táxis, vans e similares;<br><br> <strong>VIII</strong> - negar o acesso, dificultar ou retroceder o atendimento em qualquer hospital, pronto socorro, ambulatório ou em qualquer estabelecimento similar de rede pública ou privada de saúde;<br><br> <strong>IX</strong> - praticar, induzir ou incitar pelos meios de comunicação social a discriminação, preconceito ou prática de atos de violência ou coação contra qualquer pessoa em virtude de preconceito de sexo e de orientação sexual;<br><br> <strong>X</strong> - obstar a visita íntima, à pessoa privada de liberdade, nacional ou estrangeiro, homem ou mulher, de cônjuge ou outro parceiro, no estabelecimento prisional onde estiver recolhido, em ambiente reservado, cuja privacidade e inviolabilidade sejam assegurados, obedecendo sempre, os parâmetros legais pertinentes à segurança do estabelecimento, nos termos das normas vigentes;<br><br> <strong>Art. 3º</strong> - Quando o agente público, no cumprimento de suas funções, praticar um ou mais atos descritos no art. 2º desta Lei, a sua responsabilidade será apurada por meio de procedimento administrativo disciplinar instaurado pelo órgão competente, sem prejuízo das sanções civis e penais cabíveis, definidas em normas específicas. <br><br> <strong>Art. 4º</strong> - A Administração Pública poderá aplicar aos infratores, sempre garantida à prévia e ampla defesa e observado a Lei estadual n.º 5.427 de 01 de abril de 2009 em especial o seu Capítulo XVIII, com as seguintes sanções:<br><br> <strong>I</strong> – advertência;<br> <strong>II</strong> – multa até o limite de 22.132 UFIR-RJ <br> <strong>III</strong> - suspensão da inscrição estadual por até 60 (sessenta) dias;<br> <strong>IV</strong> - cassação da inscrição estadual.<br><br> <strong>§1º</strong> - As sanções previstas nos incisos deste artigo serão aplicadas gradativamente com base na reincidência do infrator.<br><br> <strong>§2º</strong> - As multas de que trata o inciso II deste artigo, deverão ser fixadas de acordo com a gravidade do fato e da capacidade econômica do infrator.<br><br> <strong>Art. 5º</strong> - Caberá à Secretaria de Estado de Assistência Social e Direitos Humanos a aplicação das penalidades, podendo, inclusive editar os atos complementares pertinentes ao inciso II do artigo 4º desta Lei.<br><br> <strong>Art. 6º</strong> - Esta lei não se aplica às instituições religiosas, templos religiosos, locais de culto, casas paroquiais, seminários religiosos, liturgias, crença, pregações religiosas, publicações e manifestação pacífica de pensamento, fundada na liberdade de consciência, de expressão intelectual, artística, científica, profissional, de imprensa e de religião de que tratam os incisos IV, VI, IX e XIII do art. 5º da Constituição Federal.<br><br> <strong>Art. 7º</strong> - O Poder Executivo regulamentará a presente Lei em 60 (sessenta) dias a partir de sua publicação.<br><br> <strong>Art. 8º</strong> - Esta Lei entrará em vigor na data de sua publicação, revogada a <a href="http://alerjln1.alerj.rj.gov.br/CONTLEI.NSF/c8aa0900025feef6032564ec0060dfff/cdee250b14447c00032568ea006760e4?OpenDocument" class="lei-link">Lei 3.406, de 15 de maio de 2000</a>. </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O não cumprimento da lei pode acarretar em advertência, multa até o limite de 22.132 UFIR-RJ; Suspensão da inscrição estadual por até 60 dias; Cassação da inscrição estadual.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>As pessoas podem recorrer ao Alô Alerj 0800-0220008 (horário comercial), ou ao <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.riosemhomofobia.rj.gov.br\', \'_system\');\">Disque Cidadania LGBT</a>: 0800-0234567 </br></p><p>WhatsApp: (21) 98890-4742</p>'
            },
            {
                "id":"98",
                "numero": "7115-2015",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Hotéis.",
                "nomelei": "Multa para estabelecimento que proibir amamentação",
                "nome": "O estabelecimento que proibir ou constranger o ato da amamentação em suas instalações estará sujeito à multa. Independentemente da existência de áreas destinadas ao aleitamento no estabelecimento, a amamentação poderá ocorrer em qualquer local, mesmo onde seja proibido o consumo de alimentos, pois a amamentação é um ato livre entre mãe e filho.",
                "dataLei":"24 de novembro de 2015",
                "descr1": "Dispõe sobre o direito ao aleitamento materno no estado do Rio de Janeiro, e dá outras providências.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/><strong>Art. 1°</strong> - Toda criança tem direito ao aleitamento materno, como recomenda a Organização Mundial da Saúde - OMS.<br/><br/><strong>Art. 2°</strong> - O estabelecimento situado no Estado do Rio de Janeiro, que proibir ou constranger o ato da amamentação em suas instalações, está sujeito à multa.<br/><br/><strong>Parágrafo único</strong> Independente da existência de áreas segregadas para o aleitamento, a amamentação é ato livre e discricionário entre mãe e filho e poderá ocorrer em qualquer local, mesmo onde seja proibido o consumo de alimentos.<br/><br/><strong>Art. 3º</strong> - Para fins desta Lei, estabelecimento é um local, que pode ser fechado ou aberto, destinado à atividade de comércio, cultural, recreativa, ou prestação de serviço público ou privado.<br/><br/><strong>Art. 4º</strong> - O estabelecimento que descumprir a presente lei será multado em 500 UFIRs (quinhentas Unidades Fiscais de Referência) e, em caso de reincidência a multa terá o valor 1000 UFIRs (mil Unidades Fiscais de Referência).<br/><br/><strong>Art. 5º</strong> - A execução da presente lei correrá por conta de dotações orçamentárias próprias, suplementadas se necessário.<br/><br/><strong>Art. 6º</strong> - O Poder Executivo regulamentará no que couber a presente lei.<br/><br/><strong>Art. 7º</strong> - Esta Lei entra em vigor na data de sua publicação.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O estabelecimento que descumprir a norma será multado em 500 UFIRs. Em caso de reincidência, a multa terá o valor 1000 UFIRs. (UFIR = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"111",
                "numero": "7194-2016",
                "colorheader": "white",
                "categoria": "Transporte",
                "categoriaslug": "transporte",
                "subcategoria": "Qualquer empresa ou pessoa que esteja utilizando animais para transporte",
                "nomelei": "Proibido o uso de animais para transporte",
                "nome": 'Animais não podem ser usados para transporte de carga e pessoas.',
                "dataLei": "07 de Janeiro de 2016",
                "descr1": 'O uso de animais de tração para transporte de materiais, cargas ou pessoas é proibido no Estado do Rio. A norma não se aplica aos animais utilizados em áreas rurais e turísticas.',
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br><br><strong>Art. 1º</strong> - Será responsabilizado todo indivíduo que utilizar animais para situações de fretamento, transportes de cargas, materiais ou pessoas, nas áreas urbanas e rurais, por quaisquer atos que caracterizam maus tratos aos mesmos.<br><br> <strong>§ 1°</strong> - Fica o poder público obrigado, através de seus órgãos competentes, a recolher os animais utilizados em transporte de cargas, materiais ou pessoas que sofram maus tratos por parte de seus donos e/ou usuários.<br><br> <strong>§ 2°</strong> - Entende-se como fretamento, o ato de carregar, transportar, alugar, nestes casos, charretes, carroças e demais materiais usados para tração de animais e transporte de pessoas, materiais tais como: entulhos, lixos, mobiliário, ferragens, principalmente quando utilizados por cavalos, burros, jumentos e demais animais considerados de carga.<br><br> <strong>Art. 2º</strong> - Excetua-se do cumprimento do disposto nesta Lei, a utilização de animais para o transporte de cargas, materiais ou pessoas em áreas rurais e turísticas, mesmo que em área urbana, além das localidades em que a autoridade local estabeleça a necessidade do transporte por meio animal.<br><br> <strong>Art. 3º</strong> - Qualquer cidadão, poderá quando constatado maus tratos aos animais, comunicar aos órgãos competentes e de proteção, para que seja recolhido o animal para órgãos de proteção e controle.<br><br> <strong>Art. 4º</strong> - O descumprimento desta Lei, implicará o infrator às penalidades já previstas na legislação em vigor.<br><br> <strong>Art. 5º</strong> - O Poder Executivo poderá baixar atos que se fizerem necessários para a devida regulamentação desta Lei.<br><br> <strong>Art. 6º</strong> - Esta Lei entra em vigor na data de sua publicação.<br> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O infrator poderá sofrer multa, a ser aplicada pelo órgão fiscalizador do Poder Público. </p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contanto com o Alô Alerj: 0800-0220008 (horário comercial)</p>'
            },



            // SAUDE - VERDE
            {
                "id":"54",
                "numero": "6233-2012",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Casas de saúde, clínicas e hospitais públicos e privados.",
                "nomelei": "Álcool gel em hospitais",
                "nome": "Estabelecimentos da rede de saúde devem disponibilizar álcool gel sanitizante gratuitamente.",
                "dataLei":"7 de maio de 2012",
                "descr1": "Os estabelecimentos públicos e privados da rede de saúde devem disponibilizar álcool gel sanitizante para seus usuários.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>Art. 1º -</strong> Todos os estabelecimentos públicos e privados da rede de saúde estadual ficam obrigados a instalar recipientes de álcool em gel, em local visível e de fácil acesso, aos seus usuários. <br/><br/><strong>Art. 2º -</strong> Os estabelecimentos citados no artigo 1º deverão adequar-se ao disposto nesta lei, no prazo de 90 (noventa) dias.<br/><br/><strong>Art. 3º -</strong> O descumprimento das disposições contidas nesta Lei acarretará aos infratores as seguintes sanções: <br/><br/><strong>I  </strong>advertência escrita;<br/><strong>II  </strong>em caso de reincidência, multa no valor de 1000 (mil) UFIRs. <br/><br/><strong>Art. 4º -</strong> O Poder Executivo regulamentará a presente Lei, estabelecendo a sua fiscalização. <br/><br/><strong>Art. 5º -</strong> Esta Lei entra em vigor na data da sua publicação. <br/><br/> Rio de Janeiro, 7 de maio de 2012. <strong>Sergio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 160/2011 <br/> Mensagem nº ---<br/> Autoria: WAGNER MONTES<br/> Data de publicação: 08-05-2012<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Advertência, e multa de mil UFIR-RJ em caso de reincidência (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"55",
                "numero": "4662-2005",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Hospitais, clínicas e afins da rede privada.",
                "nomelei": "Comprovante de pagamento do plano em hospitais e clínicas",
                "nome": "Estabelecimentos de saúde não podem exigir provas de pagamento para planos de saúde.",
                "dataLei":"14 de dezembro de 2005",
                "descr1": "Hospitais, clínicas, consultórios e afins não podem exigir comprovantes de pagamento de planos e seguros de saúde. Para prestar atendimento, podem exigir apenas cartão do plano e documento de identidade. A consulta sobre a validade do credenciamento não pode ultrapassar 30 minutos.",
                "html": '<h3>A Governadora do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/> <strong>Art. 1º -</strong> Proíbe hospitais, clínicas, consultórios e quaisquer outros estabelecimentos de prestação de serviços médicos, dentários e afins, dirigidos aos cuidados de saúde geral do indivíduo, de exigirem comprovantes de pagamentos das prestações relativas a planos e seguros de saúde, acompanhados ou não do cartão ou documento de comprovação do credenciamento junto a estas, no âmbito do Estado do Rio de Janeiro.<br/><br/><strong>Art. 2º -</strong> Para prestar o atendimento solicitado pelo consumidor, poderão as pessoas físicas ou jurídicas acima tão somente exigir o cartão ou documento equivalente do plano ou seguro de saúde do primeiro, juntamente com seu comprovante de identidade, sendo lhes facultado, através de mecanismos próprios, buscar informação diretamente do agente credenciador sobre a validade do credenciamento dado ao consumidor, sem ônus quaisquer para este.<br/><br/><strong>Art. 3º -</strong> De qualquer modo, esta consulta não poderá ultrapassar o período de 30 (trinta) minutos, devendo ser prestado o atendimento ao consumidor após este tempo, seja qual for o resultado.<br/><br/><strong>Art. 4º -</strong> Na hipótese de inobservância das disposições acima ou em caso de recusa de atendimento por falha de contato com o credenciador, será aplicada ao infrator multa de 100 (cem) UFIRS a 1.000 (um mil) UFIRS, independentemente de qualquer outra sanção aplicável.<br/><br/><strong>Art. 5º -</strong> V E TA D O. <br/><br/><strong>Art. 6º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 14 de dezembro de 2005. <strong>Rosinha Garotinho</strong> Governadora </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 160/2011 <br/> Mensagem nº ---<br/> Autoria: WAGNER MONTES<br/> Data de publicação: 08-05-2012<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 100 a mil UFIR-RJ.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"56",
                "numero": "6628-13",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Hospitais e clínicas particulares.",
                "nomelei": "Pai no parto",
                "nome": "Maternidades particulares não podem cobrar ao pai ou acompanhante que vai assistir o parto.",
                "dataLei":"12 de dezembro de 2013",
                "descr1": "Maternidades particulares não podem cobrar qualquer taxa ou valor ao pai ou acompanhante que quiser assistir o parto no centro obstétrico.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1° -</strong> Fica proibida, no âmbito do Estado do Rio de Janeiro, a cobrança de qualquer valor ou taxa, pelas maternidades particulares, para permitir que o pai ou acompanhante assistam ao parto dentro do centro obstétrico.<br/><br/><strong>Parágrafo único.</strong> A vedação do caput refere-se aos valores cobrados a título de higienização, esterilização e demais procedimentos necessários para que a pessoa possa adentrar o centro obstétrico, independentemente da nomenclatura dada à cobrança, excluídos os valores cobrados a título de outros serviços ofertados pela maternidade.<br/><br/><strong>Art. 2º -</strong> O descumprimento ao disposto nesta Lei acarretará à maternidade a aplicação das sanções previstas na Lei nº 8.078, de 11 de setembro de 1990, Código de Defesa do Consumidor.<br/><br/><strong>Art. 3° -</strong> Esta Lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 12 de dezembro de 2013. <strong>Sérgio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 329/2011 <br/> Mensagem nº ---<br/> Autoria: WAGUINHO<br/> Data de publicação: 13-12-2013<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de acordo com o Código de Defesa do Consumidor. Mínima de 200 UFIR-RJ (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"57",
                "numero": "6629-2013",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Hospitais e clínicas particulares.",
                "nomelei": "Leitos em hospitais particulares",
                "nome": "Hospitais particulares devem divulgar quadro atualizado com número de leitos disponíveis.",
                "dataLei":"12 de dezembro de 2013",
                "descr1": "Os hospitais particulares são obrigados a divulgar quadro com número atualizado de leitos disponíveis.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Os hospitais particulares, localizados no Estado do Rio de Janeiro, ficam obrigados a divulgarem quadro contendo, de forma atualizada, a disponibilidade de leitos de Unidades de Terapias Intensivas - UTIs, Centros de Tratamentos Intensivos  CTIs, e unidades intermediárias. <br/><br/><strong>Parágrafo único.</strong> O quadro de que trata o caput deste artigo deverá conter o número total de leitos ofertados pela unidade, dispondo sobre os leitos ocupados e disponíveis em cada setor, e será colocado junto à(s) recepção(ões), de forma a facilitar sua visualização. <br/><br/><strong>Art. 2º -</strong> A divulgação de que trata a presente Lei poderá ser feita através de cartazes ou qualquer meio eletrônico, tais como, televisores, computadores, dentre outros. <br/><br/><strong>Art. 3º -</strong> As unidades de saúde mencionadas nesta Lei deverão remeter, em tempo real, para as Secretarias de Saúde do Estado e do Município onde estiverem sediadas, bem como para a Secretaria de Fazenda deste último ente, a listagem de que trata o artigo 1º. <br/><br/><strong>Art. 4º -</strong> A unidade hospitalar, que descumprir o disposto na presente Lei, estará sujeita às penalidades contidas no Código de Defesa do Consumidor  CDC. <br/><br/> Rio de Janeiro, 12 de dezembro de 2013. <strong>Sérgio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1813/2012 <br/> Mensagem nº ---<br/> Autoria: ANDRÉ CECILIANO<br/> Data de publicação: 13-12-2013<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de acordo com o Código de Defesa do Consumidor. Mínima de 200 UFIR-RJ (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"58",
                "numero": "6807-14",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Estabelecimentos públicos e privados.",
                "nomelei": "Preferência para autistas em filas",
                "nome": "Pessoas portadoras do transtorno do espectro do autismo (TEA) têm preferência em filas.",
                "dataLei":"23 de junho de 2014",
                "descr1": "Pessoas portadoras do transtorno do espectro do autismo (TEA) têm preferência em filas de estabelecimentos públicos e privados.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1° -</strong> Os Órgãos Públicos Estaduais e os estabelecimentos privados ficam obrigados a dar atendimento prioritário, não retendo, em filas, as pessoas portadoras do Transtorno do Espectro do Autismo (TEA).<br/><br/><strong>Art. 2° -</strong> As escolas da rede pública de ensino Estadual e as privadas do ensino fundamental ao ensino médio deverão observar o disposto no Parágrafo único do Art. 2º da Lei nº 6.708, de 13 de março de 2014.<br/><br/><strong>Art. 3° -</strong> Terão prioridade de tramitação, que não poderá ser superior a 60 (sessenta) dias, nos Órgãos públicos Estaduais, as solicitações de benefícios instituídos por lei para pessoas portadoras do Transtorno do Espectro do Autismo (TEA); <br/><br/><strong>Art. 4° -</strong> Será considerada falta grave a não observância ou o não cumprimento desta lei por servidor público Estadual, respondendo por sua conduta faltosa nos termos dos art. 46 a 57 do Decreto Lei nº 220, de 18 de julho de 1975. <br/><br/><strong>Art. 5° -</strong> Os estabelecimentos privados citados nesta lei, no caso de seu descumprimento, suportarão multa de 2.000 UFIRs (duas mil unidades fiscais de referência), e de 60.000 UFIRs (sessenta mil unidades fiscais de referência), a cada reincidência.<br/><br/><strong>Art. 6° -</strong> A fiscalização do cumprimento da presente lei será exercida pelo órgão competente, indicado pelo Poder Executivo, por ato próprio.<br/><br/><strong>Art. 7° -</strong> Os estabelecimentos privados e os órgão Públicos citados nesta Lei terão um prazo de 60 (sessenta) dias após a sua entrada em vigor para se adaptarem às regras da mesma.<br/><br/><strong>Art. 8° -</strong> Esta Lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 23 de junho de 2014. <strong>Luiz Fernando de Souza</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1647/2012 <br/> Mensagem nº ---<br/> Autoria: XANDRINHO<br/> Data de publicação: 24-06-2014<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 2 mil a 60 mil UFIR-RJ (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"59",
                "numero": "1766-90",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Durante exames periciais destinados a averiguação de violências físicas.",
                "nomelei": "Agressões a mulheres",
                "nome": "Mulheres vítimas de violência física devem ser atendidas por Médicas Legistas mulheres.",
                "dataLei":"12 de dezembro de 1990",
                "descr1": "Mulheres vítimas de violência física devem ser atendidas por Médicas Legistas mulheres.",
                "html": '<p><strong>O GOVERNADOR DE ESTADO DO RIO DE JANEIRO,</strong><br/> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1º -</strong> É assegurado à população do sexo feminino o atendimento por Médicos Legistas do seu mesmo sexo, durante exames periciais destinados à averiguação de violências físicas.<br/><br/><strong>Art. 2º -</strong> É obrigatória a afixação em local visível, nos postos de atendimento médico de emergência, nas delegacias e nos órgãos encarregados por tais exames, de cartaz informando ao público sobre o benefício previsto por esta Lei.<br/><br/><strong>Art. 3º -</strong> Revoguem-se as disposições em contrário.<br/><br/> Rio de Janeiro, 12 de dezembro de 1990.<strong>W. MOREIRA FRANCO</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1314/90 <br/> Mensagem nº ---<br/> Autoria: Godofredo Pinto<br/> Data de publicação: 13-12-1990<br/> Data Publ. partes vetadas ---<br/> Assunto: Saúde, Mulher, Médico Legista, Perícia <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"60",
                "numero": "3426-00",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Clínicas e hospitais privados.",
                "nomelei": "Proibido cheque caução em hospitais",
                "nome": "Proibido exigência de cheque caução ou depósito para atendimento em caso de emergência.",
                "dataLei":"21 de junho de 2000",
                "descr1": "Proibido exigência de cheque caução ou depósito para atendimento ou internação de doentes em situação de urgência e emergência em clínicas ou hospitais da rede privada.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><span style="text-decoration:line-through;"><strong>Art. 1º -</strong> Fica proibida a exigência de depósito prévio de qualquer natureza, para possibilitar internação de doentes em situação de urgência e emergência (estado de sofrimento intenso e/ou risco de vida), em clínicas ou hospitais da rede pública ou privada no Estado do Rio de Janeiro.</span><br/><br/><strong>* Art. 1º</strong> Fica proibida a exigência de depósito prévio de qualquer natureza, para possibilitar o atendimento e/ou internação de doentes em situação de urgência e emergência (estado de sofrimento intenso e/ou risco de vida), em clínicas ou hospitais da rede privada no Estado do Rio de Janeiro. (NR) * Nova redação dada pela Lei nº 5519/2009.<br/><br/><span style="text-decoration:line-through;"><strong>* Parágrafo Único.</strong> As clínicas e hospitais particulares estabelecidos no âmbito do Estado do Rio de Janeiro deverão afixar em cartaz o disposto nesta Lei. * Incluído pela Lei nº 5519/2009.</span><br/><br/><strong>* Parágrafo único- </strong>O estabelecimento de saúde que realize atendimento médico hospitalar fica obrigado a afixar, em local visível, cartaz ou equivalente, com a seguinte informação: Constitui crime a exigência de cheque-caução, de nota promissória ou qualquer garantia, bem como do preenchimento prévio de formulários administrativos, como condição para o atendiemento médico-hospitalar emergencial, nos termos do Art. 135-A do Decreto-Lei n° 2.848 de 7 de Dezembro de 1940-Código Penal. * Nova redação dada pela Lei nº 6519/2013. <br/><br/><span style="text-decoration:line-through;"><strong>Art. 2º -</strong> Comprovada a exigência de depósito, o hospital será obrigado a devolver em dobro o valor depositado ao responsável pela internação.</span><br/><br/><strong>Art. 2° -</strong> Sem prejuízo das sanções previstas na Lei Federal n° 12653/12, comprovada a exigência de depósito ou caução, o hospital será obrigado a devolver em dobro o valor ao responsável pela internação. * Nova redação dada pela Lei nº 6519/2013. <br/><br/><span style="text-decoration:line-through;"><strong>Art. 3º -</strong> O descumprimento do caput do artigo 1º, sujeitará o infrator a multa de 10.000 (dez mil) UFIR-s.</span><br/><br/><strong>Art.3°-</strong> O descumprimento do § único do art.1° sujeitará o infrator á multa de 10.000(dez mil) UFIR-RJ. * Nova redação dada pela Lei nº 6519/2013. <br/><br/><strong>§ 1º -</strong> Em caso de reincidência do infrator haverá acréscimo de 50% (cinqüenta por cento) em nova multa a ser aplicada.<br/><br/><strong>Art. 4º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário.<br/><br/> Rio de Janeiro, 21 de junho de 2000.<strong>ANTHONY GAROTINHO</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 658/99<br/> Mensagem nº ---<br/> Autoria: JOSÉ DIVINO<br/> Data de publicação: 27-06-2000<br/> Data Publ. partes vetadas ---<br/> Assunto: Proíbie, Depósito Prévio, Cheque Caução, Internação, Emergência, Risco De Vida, Clínica De Saúde, Hospital Público, Hospital Particular<br/> Tipo de Revogação: EM VIGOR <br/> Texto da Revogação: Punição estabelecida pela lei 6519/2013, de autoria do deputado André Ceciliano. <br/> Punição estabelecida pela lei 6519/2013, de autoria do deputado André Ceciliano. </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Comprovada a exigência de depósito ou caução, o hospital será obrigado a devolver em dobro o valor ao responsável pela internação.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br>- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"61",
                "numero": "5245-08",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Servidoras públicas que atuam em órgãos públicos.",
                "nomelei": "Folga para mulheres fazerem exames preventivos",
                "nome": "Mulheres trabalhadoras têm direito a um dia de folga por ano para exames preventivos.",
                "dataLei":"21 de junho de 2000",
                "descr1": "Servidoras públicas, inclusive celetistas e contratadas através de quaisquer formas de mediação e que atuem em órgãos públicos, têm direito a um dia de folga ou dispensa, uma vez por ano, para realizarem exame preventivo de câncer de mama e do colo do útero.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art.1º -</strong> Todas as servidoras públicas, inclusive as celetistas e as contratadas através de quaisquer formas de mediação e que prestem serviços em órgãos públicos farão, uma vez por ano, o exame preventivo de câncer de mama e do colo do útero.<br/><br/><strong>Art.2º -</strong> Para a realização do exame, as mulheres incluídas no caput do artigo anterior terão um dia de folga ou dispensa.<br/><br/><strong>Art.3º -</strong> O comprovante do exame realizado será recolhido pelo órgão público e devidamente arquivado.<br/><br/><strong>Art.4º -</strong> O direito-dever estabelecido no art.1º, bem como o disposto nos artigos 2º e 3º desta Lei estender-se-á à iniciativa privada.<br/><br/><strong>Art.5º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário.<br/><br/> Rio de Janeiro, 20 de maio de 2008.<strong>LUIZ FERNANDO DE SOUZA</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1411/2008<br/> Mensagem nº ---<br/> Autoria: PAULO RAMOS<br/> Data de publicação: 21-05-2008<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR <br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>"- Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)<br />- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742<br/>- Conselho Estadual dos Direitos da Mulher/RJ: (21) 2332-8249</p> '
            },
            {
                "id":"62",
                "numero": "5316-2008",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Planos e seguradoras de saúde.",
                "nomelei": "Atendimento de planos de saúde em 20 min",
                "nome": "Planos de saúde devem ter atendimento presencial. Espera não pode ser maior que 20 minutos.",
                "dataLei":"17 de novembro de 2008",
                "descr1": "Planos de saúde e seguradoras devem ter postos para atendimento em não mais de 20 minutos.",
                "html": '<p><strong>A ASSEMBLÉIA LEGISLATIVA DO ESTADO DO RIO DE JANEIRO,</strong><br/> D E C R E T A:<br/><br/><strong>Art. 1º</strong> Ficam as empresas operadoras de planos de saúde, seguradoras e prestadoras de serviços públicos ou privados obrigadas a manter, em funcionamento, para atendimento dos clientes e usuários, escritório ou loja com endereço fixo.<br/><br/><strong>Art. 2º</strong> As empresas operadoras de planos de saúde, seguradoras e prestadoras de serviços públicos ou privados deverão promover o atendimento aos clientes e/ou usuários no prazo máximo de 20 (vinte) minutos.<br/><br/><strong>§1º</strong>O controle de atendimento de que trata o caput deste artigo será realizado através de emissão de senhas numéricas emitidas pela empresa ou órgão público, onde constará:<br/><br/><strong>I </strong> nome e número da instituição;<br/><br/><strong>II </strong> número da senha;<br/><br/><strong>III </strong> data e horário de chegada do cliente;<br/><br/><strong>IV </strong> rubrica do funcionário da instituição.<br/><br/><strong>§2º</strong> Será garantido o atendimento preferencial e exclusivo aos maiores de 65 (sessenta e cinco) anos, gestantes, pessoas portadoras de deficiência física e pessoas com crianças de colo, também, através de senha numérica.<br/><br/><strong>Art. 3º</strong> As empresas operadoras de planos de saúde, seguradoras e prestadoras de serviços públicos ou privados deverão promover o atendimento a todas as pessoas com deficiência, tornando os locais acessíveis com rampas quando necessários e ainda, observando-se em caso de pessoas portadoras de deficiência auditiva, atendimento prioritário em LIBRAS  Língua Brasileira de Sinais.<br/><br/><strong>Art. 4º</strong> Os locais para atendimento de que trata o Artigo 1º desta Lei deverão funcionar em horário comercial, cabendo-lhes receber as reclamações e denúncias que venham a ser feitas pelos clientes e usuários contra os serviços e/ou atendimentos oferecidos pelas empresas. <br/><br/><strong>Parágrafo único -</strong> As reclamações e/ou denúncias de que trata o caput deste artigo deverão ser obrigatoriamente protocoladas, no ato do recebimento, por funcionário devidamente identificado. <br/><br/><strong>Art. 5º</strong> Não ficam dispensadas do cumprimento que determina esta Lei as empresas que possuem sistema de tele-atendimento.<br/><br/><strong>Parágrafo único -</strong> As empresas referidas no caput desta Lei, com sede em outros estados da federação, estão, também, obrigadas a manter em funcionamento o seu escritório de atendimento aos clientes e usuários na Cidade do Rio de Janeiro.<br/><br/><strong>Art. 6º </strong>O descumprimento do disposto nesta Lei sujeitará o infrator às seguintes sanções:<br/><br/><strong>I  </strong>advertência;<br/><br/><strong>II </strong> multa de 10.000 (dez mil) a 20.000 (vinte mil) Unidades Fiscais do Estado do Rio de Janeiro.<br/><br/><strong>Art. 7º</strong> Esta Lei entrará em vigor na data de sua publicação.<br/><br/><strong>Art. 8º</strong> Ficam revogadas as disposições em contrário.<br/><br/>Assembléia Legislativa do Estado do Rio de Janeiro, em 17 de novembro de 2008.<strong>DEPUTADO JORGE PICCIANI</strong> Presidente </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1411/2008<br/> Mensagem nº ---<br/> Autoria: PAULO RAMOS<br/> Data de publicação: 21-05-2008<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR <br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 10 mil a 20 mil UFIR-RJ (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>- Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)<br />- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"63",
                "numero": "1982-1992",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Hospitais e clínicas públicos e privados.",
                "nomelei": "Acesso a leitos",
                "nome": "Mãe ou responsável direto por criança ou adolescente internado tem livre acesso à leitos.",
                "dataLei":"03 de abril de 1992",
                "descr1": "Mãe ou responsável direto por criança ou adolescente internado tem livre acesso aos leitos de hospitais estaduais.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1º -</strong> Fica assegurado o livre acesso aos leitos de hospitais estaduais, dos pais ou responsável direto pela criança ou adolescente ali internado.<br/><br/><strong>§ 1º -</strong> Estende-se o livre ingresso às organizações conveniadas, Casas de Saúde particulares ou similares.<br/><br/><strong>§ 2º -</strong> Quando o estabelecimento for próprio para tratamento de doenças infecto-contagiosas, a autorização dependerá de parecer médico.<br/><br/><strong>Art. 2º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário.<br/><br/>Rio de Janeiro, 03 de abril de 1992.<strong>LEONEL BRIZOLA</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 153/91<br/> Mensagem nº ---<br/> Autoria: Luiz Cadorna<br/> Data de publicação: 06-04-1992<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR <br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Procon pode aplicar multas nas instituições particulares.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>- Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)<br />- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"64",
                "numero": "6483-13",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Todo Estado do Rio de Janeiro.",
                "nomelei": "Discriminação  e  preconceito",
                "nome": "Práticas discriminatórias por motivo de raça, cor, etnia, religião e afins são passíveis de multa.",
                "dataLei":"04 de julho de 2013",
                "descr1": "Toda prática discriminatória por motivo de raça, cor, etnia, religião ou procedência nacional é passível de multa.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Esta Lei disciplina a aplicação das penalidades administrativas, motivadas pela prática de atos de discriminação racial.<br/><br/><strong>Art. 2º -</strong> Será punido, nos termos desta lei, todo ato discriminatório por motivo de raça, cor, etnia, religião ou procedência nacional praticado no Estado do Rio de Janeiro, por qualquer pessoa, jurídica ou física, inclusive a que exerça função pública.<br/><br/><strong>Art. 3º -</strong> Consideram-se atos discriminatórios por motivo de raça, cor, etnia, religião ou procedência nacional, para os efeitos desta lei:<br/><br/><strong>I -</strong> praticar qualquer tipo de ação violenta, constrangedora, intimidatória ou vexatória;<br/><strong>II -</strong> proibir o ingresso ou a permanência em ambiente ou estabelecimento aberto ao público;<br/><strong>III -</strong> criar embaraços à utilização das dependências comuns e áreas não-privativas de edifícios;<br/><strong>IV -</strong> recusar, retardar, impedir ou onerar a utilização de serviços, meios de transporte ou de comunicação, consumo de bens, hospedagem em hotéis, motéis, pensões e estabelecimentos congêneres ou o acesso a espetáculos artísticos ou culturais;<br/><strong>V -</strong> recusar, retardar, impedir ou onerar a locação, compra, aquisição, arrendamento ou empréstimo de bens móveis ou imóveis;<br/><strong>VI -</strong> praticar o empregador, ou seu preposto, atos de coação direta ou indireta sobre o empregado;<br/><strong>VII -</strong> negar emprego, demitir, impedir ou dificultar a ascensão em empresa pública ou privada, assim como impedir ou obstar o acesso a cargo ou função pública ou certame licitatório;<br/><strong>VIII -</strong> praticar, induzir ou incitar, pelos meios de comunicação, o preconceito ou a prática de qualquer conduta discriminatória;<br/><strong>IX -</strong> criar, comercializar, distribuir ou veicular símbolos, emblemas, ornamentos, distintivos ou propagandas que incitem ou induzam à discriminação;<br/><strong>X -</strong> recusar, retardar, impedir ou onerar a prestação de serviço de saúde, público ou privado.<br/><br/><strong>Art. 4º -</strong> A prática dos atos discriminatórios a que se refere esta lei será apurada em processo administrativo, que terá início mediante:<br/><br/><strong>I -</strong> reclamação do ofendido ou de seu representante legal, ou ainda de qualquer pessoa que tenha ciência do ato discriminatório;<br/><strong>II -</strong> ato ou ofício de autoridade competente.<br/><strong>Art. 5º -</strong> Aquele que for vítima da discriminação, seu representante legal, ou quem tenha presenciado os atos a que se refere o artigo 3º desta lei, poderá relatá-los à Órgão definido pelo Poder Executivo.<br/><br/><strong>§ 1º -</strong> O relato de que trata o caput deste artigo conterá:<br/>1 - a exposição do fato e suas circunstâncias;<br/>2 - a identificação do autor, com nome, prenome, número da cédula de identidade, seu endereço e assinatura.<br/><br/><strong>§ 2º -</strong> A critério do interessado, o relato poderá ser apresentado por meio eletrônico, no sítio de rede mundial de computadores do Órgão competente. <br/><strong>§ 3º -</strong> Recebida a denúncia, competirá ao Órgão Competente:<br/><strong>I -</strong> promover a instauração do processo administrativo devido para apuração e imposição das sanções cabíveis;<br/><strong>II </strong> transmitir notícia à autoridade policial competente, para a elucidação cabível, quando o fato descrito caracterizar infração penal.<br/><strong>Art. 6º -</strong> O Estado do Rio de Janeiro para cumprir o disposto nesta lei, poderá firmar convênios com Municípios.<br/><br/><strong>Art. 7º -</strong> As sanções aplicáveis aos que praticarem atos de discriminação nos termos desta lei serão as seguintes:<br/><br/><strong>I -</strong> advertência;<br/><strong>II -</strong> multa de até 1000 (mil) UFIRŽS - Unidades Fiscais do Estado do Rio de Janeiro<br/><strong>III -</strong> multa de até 3000 (três mil) UFIRŽS - Unidades Fiscais do Estado do Rio de Janeiro, em caso de reincidência;<br/><strong>IV -</strong> suspensão da licença estadual para funcionamento por 30 (trinta) dias;<br/><strong>V -</strong> cassação da licença estadual para funcionamento.<br/><strong>§ 1º -</strong> Quando a infração for cometida por agente público, servidor público ou militar, no exercício de suas funções, sem prejuízo das sanções previstas nos incisos I a III deste artigo, serão aplicadas as penalidades disciplinares cominadas na legislação pertinente.<br/><strong>§ 2º -</strong> O valor da multa será fixado tendo-se em conta as condições pessoais e econômicas do infrator e não poderá ser inferior a 500 (quinhentas) UFIRŽS  Unidades Fiscais do Estado do Rio de Janeiro.<br/><strong>§ 3º -</strong> A multa poderá ser elevada até o triplo, quando se verificar que, em virtude da situação econômica do infrator, sua fixação em quantia inferior seria ineficaz.<br/><strong>§ 4º -</strong> Quando for imposta a pena prevista no inciso V deste artigo, deverá ser comunicada a autoridade responsável pela outorga da licença, que providenciará a sua execução, comunicando-se, igualmente, a autoridade federal ou municipal para eventuais providências no âmbito de sua competência.<br/><br/><strong>Art. 8º -</strong> Na apuração dos atos discriminatórios praticados com violação desta lei, deverão ser observados os procedimentos previstos na Lei nº 5.427, de 01 de abril de 2009, que regula o processo administrativo no âmbito da Administração Pública Estadual.<br/><br/><strong>Art. 9 -</strong> O Poder Executivo regulamentará a presente Lei.<br/><br/><strong>Art. 10 -</strong> Esta lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 04 de julho de 2013. <strong>Sérgio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 3309/2010 <br/> Mensagem nº ---<br/> Autoria: GILBERTO PALMARES<br/> Data de publicação: 05-07-2013<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Punição vai de multa (mínimo de mil Ufir) a cassação da licença do estabelecimento.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
             {
                "id":"65",
                "numero": "3295-99",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Todos os meios de transporte e repartições públicas e privadas.",
                "nomelei": "Acesso para cães-guia",
                "nome": "Cães-guias de deficientes podem acessar qualquer meio de transporte e locais públicos e privados.",
                "dataLei":"16 de novembro de 1999",
                "descr1": "Portadores de deficiência visual podem ingressar e permanecer em qualquer meio de transporte e repartições públicas e privadas com seus cães-guias.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Os cães-guias quando acompanhados de pessoas portadoras de deficiência visual (cegueira e visão sub-normal), ou de treinador, ou acompanhante habilitado poderão ingressar e permanecer nas repartições públicas ou privadas, em qualquer meio de transporte, seja hidroviário, ferroviário, metroviário, de cooperativas, táxis ou afins, em todo e qualquer estabelecimento comercial, industrial, de serviços de promoção, proteção e recuperação de saúde e demais locais públicos.<br/><br/><strong>§ 1º -</strong> Para efeito desta Lei entende-se por:<br/><br/><strong>a) -</strong> CÃO GUIA - o cão-guia que tenha obtido certificado de uma Escola filiada e aceita pela Federação Internacional de Escolas de Cães-Guias para Cegos, que esteja a serviço de uma pessoa portadora de deficiência visual ou em estágio de treinamento.<br/><strong>b) -</strong> COOPERATIVAS - transportes autorizados, kombis, micro ônibus e afins ou qualquer outro transporte alternativo de que se faça necessária sua utilização.<br/><strong>c) -</strong> LOCAIS PÚBLICOS - hotéis, restaurantes, shoppings, lojas de diversão ou lazer e, de modo geral, todo e qualquer lugar aberto ao público, quer seja a título gratuito ou oneroso.<br/><br/><strong>§ 2º -</strong> Nos casos previstos no caput deste artigo, é vedada a cobrança de preço, tarifa ou acréscimo vinculado, direta ou indiretamente, ao ingresso ou presença do cão-guia.<br/><strong>§ 3º -</strong> Sem prejuízo do disposto neste artigo, o proprietário do cão-guia responde civil e criminalmente pelos danos ou lesões causadas pelo mesmo.<br/><br/><strong>Art. 2º -</strong> Toda e qualquer pessoa que pertencer, prestar serviços ou ser proprietário dos locais mencionados no caput do artigo anterior e que venham a impedir o ingresso e permanência da pessoa portadora de deficiência visual que necessite de cão-guia, estará atentando contra os direitos humanos e será passível de punição prevista em lei.<br/><br/><strong>Art. 3º -</strong> Os estabelecimentos comerciais e industriais, as repartições públicas ou privadas, bem como os meios de transportes mencionados no artigo 1º, em caso de discriminação ou não cumprimento de estabelecido nesta Lei serão punidos com penas de interdição, multas e outras penalidades previstas em lei.<br/><br/><strong>Art. 4º -</strong> A pessoa portadora de deficiência visual tem direito de manter pelo menos um cão-guia em sua residência e de transitar com o mesmo, seguro em coleira, nas áreas e dependências comuns do respectivo condomínio, independentemente de restrições à presença de animais na convenção do condomínio ou regimento interno.<br/><br/><strong>Art. 5º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 16 de novembro de 1999. <strong>Anthony Garotinho</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 2330/98 <br/> Mensagem nº ---<br/> Autoria: SOLANGE AMARAL, TANIA RODRIGUES<br/> Data de publicação: 24-11-1999<br/> Data Publ. partes vetadas ---<br/> Assunto: Cão, Portador De Deficiência, Deficiente Visual, Deficiente Físico, Animal, Transporte <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Penas vão de multa à interdição do estabelecimento que negar a entrada.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
             {
                "id":"66",
                "numero": "3559-01",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Escolas, hospitais e empresas em geral.",
                "nomelei": "Discriminação de soropositivos",
                "nome": "Estabelecimentos que discriminem portadores de HIV devem ser penalizados.",
                "dataLei":"15 de maio de 2001",
                "descr1": "Estabelecimentos (como escolas, hospitais e empresas em geral) que discriminem pessoas portadoras de HIV devem ser penalizados.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> A violação do princípio da igualdade de direitos prevista no Art. 9º, § 1º da Constituição do Estado do Rio de Janeiro, quando praticada por estabelecimentos que discriminem portadores do vírus HIV, sintomáticos e assintomáticos, constitui infração administrativa.<br/><br/><strong>Art. 2º -</strong> O Poder Executivo, através do seu órgão competente, penalizará todo estabelecimento comercial, industrial, entidades educacionais públicas e privadas, creches, hospitais, casas de saúde, clínicas, e associações civis ou prestadoras de serviços que, por atos de seus proprietários ou prepostos, discriminem portadores do vírus HIV, sintomáticos e assintomáticos.<br/><br/><strong>Art. 3º -</strong> Constituem infrações administrativas as ações que visem discriminar os portadores do vírus HIV, dentre outras :<br/><br/><strong>I </strong> A exigência do teste HIV no processo de seleção, para admissão ao emprego;<br/><strong>II </strong> A exigência do teste HIV para permanência no emprego, mediante ameaça de rescisão contratual;<br/><strong>III </strong> A exigência do teste HIV como condição de concurso público ou privado;<br/><strong>IV </strong> A exigência do teste HIV como condição de ingresso ou permanência em creches e estabelecimentos educacionais;<br/><strong>V </strong> A recusa em aceitar o ingresso ou permanência de alunos soropositivos em estabelecimentos educacionais e creches;<br/><strong>VI </strong> A recusa de atendimento a portadores de vírus HIV, sintomáticos e assintomáticos, em hospitais públicos e privados;<br/><strong>VII </strong> A recusa na manutenção do custeio do tratamento para os portadores do vírus HIV, e na autorização para exames complementares dos pacientes associados ou segurados dos planos de saúde;<br/><strong>VIII </strong> A demissão do soropositivo ou portador do HIV em razão de sua condição de portador do vírus HIV. <br/><br/><strong>Art. 4º -</strong> Consideram-se infratores desta Lei as pessoas que, direta ou indiretamente, tenham concorrido para o cometimento da infração administrativa.<br/><br/><strong>Art. 5º -</strong> Serão aplicadas as seguintes penalidades administrativas aos infratores :<br/><br/><strong>I </strong> Multa de 50 a 50.000 UFIRŽS, ou outra unidade que venha a substitui-la;<br/><strong>II </strong> Cassação de licença de funcionamento dos estabelecimentos infratores.<br/><br/><strong>Art. 6º -</strong> Constituem penas alternativas :<br/><br/><strong>I </strong> A promoção de campanha publicitária esclarecendo sobre os direitos dos soropositivos e portadores do HIV, de acordo com a legislação federal, estadual e municipal vigente;<br/><strong>II </strong> A confecção de material informativo sobre a prevenção e os cuidados da AIDS;<br/><strong>III </strong> A prestação de trabalhos em estabelecimentos de atenção aos portadores do vírus HIV.<br/><br/><strong>Art. 7º -</strong> Fica o Poder Executivo autorizado a criar o Fundo Estadual de Informação, Prevenção e Assistência da AIDS, para o qual reverterão as multas arrecadadas, que serão aplicadas em entidades que assistam aos portadores do vírus HIV.<br/><br/><strong>Parágrafo único </strong> A Comissão Estadual de AIDS, criada pela Resolução nº 700, de 3 de dezembro de 1991, administrará os recursos mencionados no caput deste artigo.<br/><br/><strong>Art. 8º -</strong> O poder de polícia será exercido pelo órgão estadual competente.<br/><br/><strong>Art. 9º -</strong> O descumprimento da presente Lei será apurado através de processo administrativo pelo órgão competente, com ampla defesa, independente das sanções civis e penais cabíveis, definidas em normas específicas.<br/><br/><strong>Art. 10 </strong> O Ministério Público fiscalizará a aplicação desta Lei, incumbindo-lhe a propositura das ações competentes.<br/><br/><strong>Art. 11 </strong> Todos os cidadãos podem comunicar às autoridades administrativas as infrações à presente Lei.<br/><br/><strong>Art. 12  </strong>O Poder Executivo deverá manter setor especializado para receber denúncias relacionadas às infrações à presente Lei.<br/><br/><strong>Art. 13 </strong> Fica o Poder Executivo autorizado a baixar as normas regulamentares ao presente projeto de Lei, no prazo de 60 (sessenta) dias após a sua publicação.<br/><br/><strong>Art. 14 </strong> Esta Lei entrará em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 15 de maio de 2001. <strong>Anthony Garotinho</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 54-A/99 <br/> Mensagem nº ---<br/> Autoria: CARLOS MINC<br/> Data de publicação: 24-05-2001<br/> Data Publ. partes vetadas ---<br/> Assunto: Hiv, Aids, Discriminação, Doente <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 50 a 50 mil UFIRs (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"67",
                "numero": "1886-1991",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Empresas em geral.",
                "nomelei": "Discriminação sexual",
                "nome": "Proíbe exigência de testes para verificação de gravidez para admissão ou permanência no emprego.",
                "dataLei":"08 de novembro de 1991",
                "descr1": "Proíbe chantagem sexual, como exigência de teste de urina ou sangue para verificação de gravidez e comprovação de esterilização para admissão ou permanência no emprego.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Esta lei estabelece penalidades aos estabelecimentos localizados no Estado do Rio de Janeiro que discriminem mulheres, violando o princípio que adota a igualdade de direitos entre homens e mulheres de acordo com o § 1º do artigo 9º da Constituição Estadual, garantindo a proteção dos direitos individuais e coletivos.<br/><br/><span style="text-decoration:line-through;"><strong>Art. 2º -</strong> Dentro de sua competência, o Poder Executivo penalizará todo estabelecimento comercial, industrial, entidades, representações, associações, sociedades civis ou de prestações de serviços que, por atos de seus proprietários ou prepostos, discriminem mulheres em função de seu sexo, ou contra elas adotem atos de coação ou violência, tais como exigência ou tentativa de vantagem sexual da mulher por parte do patrão ou preposto, mediante ameaça de rescisão contratual.</span><br/><strong>*Art. 2º -</strong> Dentro de sua competência, o Poder Executivo penalizará todo estabelecimento comercial, industrial, entidades, representações, associações, sociedades civis ou de representação de serviços que, por atos de seus proprietários ou prepostos, discriminem pessoas em função do seu sexo, ou contra elas adotem atos de coação ou violência, tais como exigência ou tentativa de obter vantagem sexual por parte do superior hierárquico, independentemente do seu sexo e da sua opção sexual, com o objetivo de exigir favor sexual do subordinado, independentemente do seu sexo ou da sua opção sexual, sob ameaça ou efetivo prejuízo no trabalho ou perda do emprego.<br/><strong>* Nova redação dada pelo artigo 2º da Lei 3179/99 Controle de Leis</strong><br/><strong>Parágrafo Único -</strong> Considera-se como prática de restrição ao direito da mulher ao emprego, entre outras, a adoção de medidas não previstas na legislação pertinente e especialmente:<br/><br/><strong>I -</strong> Exigência ou solicitação de teste de urina ou sangue, para verificação de estado de gravidez, processos de seleção para admissão ao emprego;<br/><strong>II -</strong> Exigência ou solicitação de comprovação de esterelização, para admissão ou permanência no emprego;<br/><strong>III -</strong> Exigência de exame ginecológico periódico, como condição para permanência no emprego;<br/><strong>IV -</strong> Discriminação às mulheres casadas, ou mães, nos processos de seleção e treinamento ou rescisão de contrato de trabalho.<br/><br/><strong>Art. 3º -</strong> O descumprimento da presente Lei será apurado através de processo administrativo pelo órgão competente, independente das sanções civis e penais cabíveis, definidas em normas específicas.<br/><br/><strong>§ 1º -</strong> Aos infratores desta Lei serão aplicadas as seguintes penalidades administrativas:<br/><strong>I -</strong> advertência;<br/><strong>II -</strong> multa de 1 a 1000 UFERJs ou outra unidade que venha substituí-la;<br/><strong>III -</strong> VETADO.<br/><strong>IV -</strong> VETADO.<br/><strong>§ 2º -</strong> VETADO.<br/><strong>§ 3º -</strong> Considera-se infratora desta Lei a pessoa que direta ou indiretamente tenha concorrido para o cometimento da infração administrativa.<br/><br/><strong>Art. 4º -</strong> Todos os cidadãos podem comunicar às autoridades administrativas as infrações à presente Lei.<br/><br/><strong>Art. 5º -</strong> O Poder Executivo deverá manter setor especializado para receber denúncias relacionadas às infrações à presente Lei.<br/><br/><strong>Art. 6º -</strong> O Poder Executivo regulamentará a presente Lei em 60 (sessenta) dias, a partir de sua publicação.<br/><br/><strong>Art. 7º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 08 de novembro de 1991. <strong>Leonel Brizola</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 64/91 <br/> Mensagem nº ---<br/> Autoria: CARLOS MINC<br/> Data de publicação: 211-11-1991<br/> Data Publ. partes vetadas ---<br/> Assunto: Saúde, Violência, Assédio Sexual, Mulher <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 1 a mil UFERJs. (1 UFERJ = 44,2655 UFIR-RJ 1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"68",
                "numero": "7041-2015",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Estabelecimentos comerciais, industriais, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços.",
                "nomelei": "Discriminação de LGBTs",
                "nome": "Estabelecimentos que discriminem orientação sexual ou identidade de gênero podem ser punidos.",
                "dataLei":"15 de julho de 2015",
                "descr1": "Estabelecimentos comerciais, industriais, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços que discriminem as pessoas em razão de sua orientação sexual e identidade de gênero estão sujeitas a penalidades administrativas.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º</strong> - Esta Lei estabelece infrações administrativas a condutas discriminatórias motivadas por preconceito de sexo ou orientação sexual, praticadas por agentes públicos e estabelecimentos localizados no Estado do Rio de Janeiro, ou que discriminem pessoas em virtude de sua orientação sexual.<br><br> <strong>Parágrafo único</strong> - Para efeitos de aplicação desta Lei, o termo “sexo” é utilizado para distinguir homens e mulheres, enquanto o termo “orientação sexual” refere-se à heterossexualidade, à homossexualidade e à bissexualidade.<br><br> <strong>Art. 2º</strong> - O Poder Executivo, no âmbito de sua competência, penalizará estabelecimento público, comercial e industrial, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços que, por atos de seus proprietários ou prepostos, discriminem pessoas em função de preconceito de sexo e de orientação sexual ou contra elas adotem atos de coação, violência física ou verbal ou omissão de socorro.<br><br> <strong>Parágrafo único</strong> - Entende-se por discriminação:<br><br> <strong>I</strong> - recusar ou impedir o acesso ou a permanência ou negar atendimento nos locais previstos no Artigo 2º desta Lei bem como impedir a hospedagem em hotel, motel, pensão, estalagem ou qualquer estabelecimento similar;<br><br> <strong>II</strong> - impor tratamento diferenciado ou cobrar preço ou tarifa extra para ingresso ou permanência em recinto público ou particular aberto ao público;<br><br> <strong>III</strong> - impedir acesso ou recusar atendimento ou permanência em estabelecimentos esportivos, sociais, culturais, casas de diversões, clubes sociais, associações, fundações e similares;<br><br> <strong>IV</strong> - recusar, negar, impedir ou dificultar a inscrição ou ingresso de aluno em estabelecimento de ensino público ou privado de qualquer nível;<br><br> <strong>V</strong> - impedir, obstar ou dificultar o acesso de pessoas, devidamente habilitadas a qualquer cargo ou emprego da Administração direta ou indireta, bem como das concessionárias e permissionárias de serviços públicos;<br><br> <strong>VI</strong> – negar, obstar ou dificultar o acesso de pessoas, devidamente habilitadas a qualquer cargo ou emprego em empresa privada; <br><br> <strong>VII</strong> - impedir o acesso ou o uso de transportes públicos, como ônibus, metrô, trens, barcas, catamarãs, táxis, vans e similares;<br><br> <strong>VIII</strong> - negar o acesso, dificultar ou retroceder o atendimento em qualquer hospital, pronto socorro, ambulatório ou em qualquer estabelecimento similar de rede pública ou privada de saúde;<br><br> <strong>IX</strong> - praticar, induzir ou incitar pelos meios de comunicação social a discriminação, preconceito ou prática de atos de violência ou coação contra qualquer pessoa em virtude de preconceito de sexo e de orientação sexual;<br><br> <strong>X</strong> - obstar a visita íntima, à pessoa privada de liberdade, nacional ou estrangeiro, homem ou mulher, de cônjuge ou outro parceiro, no estabelecimento prisional onde estiver recolhido, em ambiente reservado, cuja privacidade e inviolabilidade sejam assegurados, obedecendo sempre, os parâmetros legais pertinentes à segurança do estabelecimento, nos termos das normas vigentes;<br><br> <strong>Art. 3º</strong> - Quando o agente público, no cumprimento de suas funções, praticar um ou mais atos descritos no art. 2º desta Lei, a sua responsabilidade será apurada por meio de procedimento administrativo disciplinar instaurado pelo órgão competente, sem prejuízo das sanções civis e penais cabíveis, definidas em normas específicas. <br><br> <strong>Art. 4º</strong> - A Administração Pública poderá aplicar aos infratores, sempre garantida à prévia e ampla defesa e observado a Lei estadual n.º 5.427 de 01 de abril de 2009 em especial o seu Capítulo XVIII, com as seguintes sanções:<br><br> <strong>I</strong> – advertência;<br> <strong>II</strong> – multa até o limite de 22.132 UFIR-RJ <br> <strong>III</strong> - suspensão da inscrição estadual por até 60 (sessenta) dias;<br> <strong>IV</strong> - cassação da inscrição estadual.<br><br> <strong>§1º</strong> - As sanções previstas nos incisos deste artigo serão aplicadas gradativamente com base na reincidência do infrator.<br><br> <strong>§2º</strong> - As multas de que trata o inciso II deste artigo, deverão ser fixadas de acordo com a gravidade do fato e da capacidade econômica do infrator.<br><br> <strong>Art. 5º</strong> - Caberá à Secretaria de Estado de Assistência Social e Direitos Humanos a aplicação das penalidades, podendo, inclusive editar os atos complementares pertinentes ao inciso II do artigo 4º desta Lei.<br><br> <strong>Art. 6º</strong> - Esta lei não se aplica às instituições religiosas, templos religiosos, locais de culto, casas paroquiais, seminários religiosos, liturgias, crença, pregações religiosas, publicações e manifestação pacífica de pensamento, fundada na liberdade de consciência, de expressão intelectual, artística, científica, profissional, de imprensa e de religião de que tratam os incisos IV, VI, IX e XIII do art. 5º da Constituição Federal.<br><br> <strong>Art. 7º</strong> - O Poder Executivo regulamentará a presente Lei em 60 (sessenta) dias a partir de sua publicação.<br><br> <strong>Art. 8º</strong> - Esta Lei entrará em vigor na data de sua publicação, revogada a <a href="http://alerjln1.alerj.rj.gov.br/CONTLEI.NSF/c8aa0900025feef6032564ec0060dfff/cdee250b14447c00032568ea006760e4?OpenDocument" class="lei-link">Lei 3.406, de 15 de maio de 2000</a>. </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O não cumprimento da lei pode acarretar em advertência, multa até o limite de 22.132 UFIR-RJ; Suspensão da inscrição estadual por até 60 dias; Cassação da inscrição estadual.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>As pessoas podem recorrer ao Alô Alerj 0800-0220008 (horário comercial), ou ao <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.riosemhomofobia.rj.gov.br\', \'_system\');\">Disque Cidadania LGBT</a>: 0800-0234567 </br></p><p>WhatsApp: (21) 98890-4742</p>'
            },
            {
                "id":"89",
                "numero": "7111-2015",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Hospitais e clínicas públicos.",
                "nomelei": "Teste do Olhinho na rede pública",
                "nome": "Os hospitais públicos ou os privados que tenham convênio com o Sistema Único de Saúde (SUS) são obrigados a oferecer exames oftalmológicos em todos bebês recém-nascidos, conhecido como 'teste do olhinho'.",
                "dataLei":"23 de novembro de 2015",
                "descr1": "Altera a ementa e o art. 1º da lei nº 4582, de 25 de julho de 2005, que dispõe sobre a relização dos exames oftalmológicos nos recém ascidos.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1º -</strong> Fica autorizado o Poder executivo a modificar a Ementa da Lei Estadual n° 4.582, de 25 de julho de 2005, que passará a ter a seguinte redação:<br/> EMENTA:<br/>DISPÕE SOBRE A REALIZAÇÃO, NOS RECÉM NASCIDOS NO ÂMBITO DO ESTADO DO RIO DE JANEIRO, DOS EXAMES OFTALMOLÓGICOS QUE MENCIONA (NR). <br/><br/><strong>Art 2º -</strong> O Art. 1º da Lei nº 4.582, de 25 de julho de 2005, passa a ter a seguinte redação:<br/> Art. 1º - Serão sempre realizados exames oftalmológicos nos recém nascidos em maternidades ou hospitais públicos e àqueles encaminhados a esses locais, no âmbito do estado do Rio de Janeiro. (NR)<br/><br/><strong>Art. 3º -</strong> Esta Lei entra em vigor na data de sua publicação.</p>',
                "multatexto": '<p>Não tem multa, porque é obrigação pra órgão público.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj 0800-0220008 (horário comercial).</br>'
            },
            {
                "id":"95",
                "numero": "7118-2015",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "",
                "nomelei": "Proibido uso do formol nos salões de beleza",
                "nome": "É proibido o uso de produtos químicos tais como formol, em todos os salões de beleza, para efetivação de escovas progressivas e similares.",
                "dataLei":"",
                "descr1": "Proíbe o uso do formol e determina a adequação dos produtos químicos nos salões de beleza do estado do Rio de Janeiro e dá outras providências.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/><strong>Art. 1º</strong> Fica proibido no âmbito do Estado do Rio de Janeiro, o uso de produtos químicos tais como formol em todos os salões de beleza, para efetivação das escovas progressivas e atos similares.<br/><br/><strong>Art. 2º</strong> Também fica determinado que todos os salões de beleza, clínicas de estética e similares, deverão fazer o uso de produtos químicos de acordo com o que preceitua a Resolução nº 79, de 28 de agosto de 2000, da ANVISA, e legislação em vigor aplicável à espécie.<br/><br/><strong>Art. 3º</strong> Os estabelecimentos comerciais prescritos no artigo anterior, deverão ter sempre em local acessível e de fácil localização, uma tabela informando a quantidade em percentuais autorizados de produtos químicos usados em seus atos, tais como: escovas progressivas, alisamentos, relaxamentos, hidratação, penteados e todos os demais.<br/><br/><strong>Parágrafo único.</strong> Em utilizando-se os estabelecimentos dos produtos tioglicolato, guanidina ou amônia, deverá também ser informado o seu quantitativo utilizado.<br/><br/><strong>Art. 4º</strong> Caberá ao Poder Executivo de cada Município, através de seus órgãos competentes, a vistoria e devida fiscalização.<br/><br/><strong>Art. 5º</strong> A inobservância das disposições contidas no que dispõe esta Lei importará, no que couber, a aplicação das penalidades contidas nos Arts. 56 e 57 da Lei nº 8.078, de 11 de setembro de 1990.<br/><br/><strong>Art. 6º</strong> Esta Lei entra em vigor na data de sua publicação.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ. (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"99",
                "numero": "7115-2015",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Hotéis.",
                "nomelei": "Multa para estabelecimento que proibir amamentação",
                "nome": "O estabelecimento que proibir ou constranger o ato da amamentação em suas instalações estará sujeito à multa. Independentemente da existência de áreas destinadas ao aleitamento no estabelecimento, a amamentação poderá ocorrer em qualquer local, mesmo onde seja proibido o consumo de alimentos, pois a amamentação é um ato livre entre mãe e filho.",
                "dataLei":"24 de novembro de 2015",
                "descr1": "Dispõe sobre o direito ao aleitamento materno no estado do Rio de Janeiro, e dá outras providências.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/><strong>Art. 1°</strong> - Toda criança tem direito ao aleitamento materno, como recomenda a Organização Mundial da Saúde - OMS.<br/><br/><strong>Art. 2°</strong> - O estabelecimento situado no Estado do Rio de Janeiro, que proibir ou constranger o ato da amamentação em suas instalações, está sujeito à multa.<br/><br/><strong>Parágrafo único</strong> Independente da existência de áreas segregadas para o aleitamento, a amamentação é ato livre e discricionário entre mãe e filho e poderá ocorrer em qualquer local, mesmo onde seja proibido o consumo de alimentos.<br/><br/><strong>Art. 3º</strong> - Para fins desta Lei, estabelecimento é um local, que pode ser fechado ou aberto, destinado à atividade de comércio, cultural, recreativa, ou prestação de serviço público ou privado.<br/><br/><strong>Art. 4º</strong> - O estabelecimento que descumprir a presente lei será multado em 500 UFIRs (quinhentas Unidades Fiscais de Referência) e, em caso de reincidência a multa terá o valor 1000 UFIRs (mil Unidades Fiscais de Referência).<br/><br/><strong>Art. 5º</strong> - A execução da presente lei correrá por conta de dotações orçamentárias próprias, suplementadas se necessário.<br/><br/><strong>Art. 6º</strong> - O Poder Executivo regulamentará no que couber a presente lei.<br/><br/><strong>Art. 7º</strong> - Esta Lei entra em vigor na data de sua publicação.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O estabelecimento que descumprir a norma será multado em 500 UFIRs. Em caso de reincidência, a multa terá o valor 1000 UFIRs. (UFIR = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"101",
                "numero": "7132-2015",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Maternidades públicas.",
                "nomelei": "Teste da Linguinha nas redes pública e particular",
                "nome": 'Os hospitais públicos e privados são obrigados a oferecer exame em todos os bebês recém-nascidos, conhecido como "teste da linguinha", com a finalidade de realizar diagnóstico precoce de problemas na sucção durante a amamentação, mastigação e fala.',
                "dataLei":"17 de dezembro de 2015",
                "descr1": 'Torna obrigatória a realização do "teste da linguinha" em recém nascidos pela rede de saúde pública e particular do estado do Rio de Janeiro.',
                "html": '<h3>A Assembléia Legislativa do estado do Rio de Janeiro decreta:</h3><br/><p><strong>Art. 1°</strong> - Fica instituída a obrigatoriedade de realização do "teste da linguinha" dos recém-nascidos nas redes Públicas e Particulares do Estado do Rio de Janeiro, com a finalidade de realizar diagnóstico precoce de problemas na sucção durante a amamentação, mastigação e fala.<br/><br/><strong>Paragráfo único</strong> - O exame referido no caput deste artigo deverá ser realizado antes da alta hospitalar do recém-nascido nas maternidades e demais estabelecimentos hospitalares onde houver ocorrido o parto.<br/><br/><strong>Art. 2º</strong> - As maternidades e demais estabelecimentos hospitalares nos quais se realizam procedimentos obstétricos ficam obrigados a:<br/><strong>I</strong> - dispor dos equipamentos necessários à realização de exame da natureza mencionada no caput do art. 1º;<br/><strong>II</strong> - contar com profissionais capacitados para a aplicação do exame.<br/><br/><strong>Art. 3º</strong> - A realização do exame estabelecido pela presente lei abrange todos os recém nascidos, seja pelo Sistema Único de Saúde (SUS), por planos de saúde, ou mesmo paciente particular.<br/><br/><strong>Paragráfo único</strong> - O Poder Público somente arcará com os custos do "teste da linguinha" dos recém nascidos assistidos pelo Sistema Único de Saúde (SUS).<br/><br/><strong>Art 4º</strong> - Fica o Poder Executivo Estadual autorizado a celebrar convênios com o Ministério da Saúde e a abrir crédito adicional suplementar ao orçamento anual, para garantir a execução da presente lei.<br/><br/><strong>Art 5º</strong> - O Poder Executivo, se necessário, editará normas complementares para a fiel execução da presente lei.<br/><br/><strong>Art 6º</strong> - Esta Lei entrará em vigor na data de sua publicação.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contanto com o Alô Alerj: 0800-0220008 (horário comercial)</p>'
            },
            {
                "id":"108",
                "numero": "7191-2016",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Rede pública de saúde no Estado do Rio",
                "nomelei": "Parto humanizado na rede pública",
                "nome": 'Gestantes podem optar por parto humanizado na rede pública.',
                "dataLei":"06 de Janeiro de 2016",
                "descr1": 'Toda gestante tem direito a receber assistência humanizada, respeitando suas escolhas durante a gestação e parto na rede pública de saúde no Estado do Rio.',
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1º</strong> - Fica assegurado, a toda gestante, o direito a receber assistência humanizada durante o parto na rede pública de saúde no Estado do Rio de Janeiro.<br><br> <strong>Art. 2º</strong> - Para efeitos desta Lei, ter-se-á, por parto humanizado ou assistência humanizada ao parto, o atendimento que:<br><br> <strong>I</strong> - não comprometer a segurança do processo, nem a saúde da parturiente ou do recém-nascido;<br> <strong>II</strong> - só adotar rotinas e procedimentos, cuja extensão e conteúdo tenham sido objeto de revisão e avaliação científica por parte da Organização Mundial de Saúde (OMS) ou de outras instituições de excelência reconhecida;<br> <strong>III</strong> - garantir à gestante o direito de optar pelos procedimentos eletivos que, resguardada a segurança do parto, lhe propiciem maior conforto e bem-estar, incluindo procedimentos médicos para alívio da dor;<br> <strong>IV</strong> - garantir assistência integral à gestante que seja deficiente além da necessidade de atenção à saúde específica da sua própria condição, quando necessário;<br> <strong>IV</strong> - todos os profissionais envolvidos no procedimento terão que respeitar a autonomia da mulher e toda gestante deve ser ouvida e fazer parte do processo de tomada de decisões;<br> <strong>V</strong> - os procedimentos realizados deverão resguardar a vida da mulher e do concepto e os procedimentos para alívio da dor, tais como a raquianestesia, anestesia peridural e a inalação de Entonox podem ser recursos utilizados de acordo com critérios clínicos, com conhecimento da mulher a cerca dos efeitos adversos para mãe e bebê. <br><br> <strong>Art. 3º</strong> - São princípios do parto humanizado ou da assistência humanizada, durante o parto:<br><br> <strong>I</strong> - a harmonização entre segurança e bem-estar da gestante ou parturiente, assim como do nascituro;<br> <strong>II</strong> – a mínima interferência por parte de todos os profissionais envolvidos na cena do parto;<br> <strong>III</strong> – a preferência pela utilização dos métodos menos invasivos e mais naturais, respeitado o processo natural e fisiológico do parto; <br> <strong>IV</strong> - a oportunidade de escolha dos métodos natais, por parte da parturiente, sempre que não implicar risco para sua segurança ou do nascituro;<br> <strong>V</strong> - o fornecimento de informações à gestante ou parturiente, assim como ao pai ou acompanhante, dos métodos e procedimentos eletivos.<br><br> <strong>Art. 4º</strong> - V E T A D O .<br><br> <strong>V</strong> - as rotinas e procedimentos eletivos de assistência ao parto, pelos quais a gestante fizer a opção.<br><br> <strong>Art. 5º</strong> - A elaboração do Plano Individual de Parto deverá ser precedida de avaliação do profissional médico ou enfermeiro que acompanha a gestante, na qual serão identificados os fatores de risco da gravidez, reavaliados a cada contato da gestante com o sistema de saúde durante o pré-natal, inclusive quando do atendimento preliminar ao trabalho de parto.<br><br> <strong>Art. 6º</strong> - V E T A D O .<br><br> <strong>Art. 7º</strong> - V E T A D O .<br><br> <strong>Art. 8º</strong> - As disposições de vontade constantes do Plano Individual de Parto poderão ser contrariadas quando assim o exigirem a segurança do parto ou a saúde da mãe ou do recém-nascido.<br><br> <strong>Art. 9º</strong> - V E T A D O .<br><br> <strong>Art. 10</strong> - Será objeto de justificação por escrito, firmada pelo chefe da equipe responsável pelo parto, a adoção de qualquer dos procedimentos que os protocolos mencionados nesta Lei classifiquem como:<br><br> <strong>I</strong> - desnecessários ou prejudiciais à saúde da gestante ou parturiente ou ao nascituro;<br> <strong>II</strong> - eficácia carente de evidência científica;<br> <strong>III</strong> - suscetíveis de causar dano quando aplicados de forma generalizada ou rotineira.<br><br> <strong>§1º</strong> - A justificação de que trata este artigo será averbada ao prontuário médico após a entrega de cópia à gestante ou a seu cônjuge, companheiro ou parente.<br><br> <strong>§2º</strong> - Ressalvada disposição legal expressa em contrário, ficam sujeitos à justificação de que trata este artigo:<br><br> <strong>a)</strong> - a administração de enemas;<br> <strong>b)</strong> a administração de ocitocina, a fim de acelerar o trabalho de parto;<br> <strong>c)</strong> os esforços de puxo prolongados e dirigidos durante processo expulsivo;<br> <strong>d)</strong> a amniotomia, e<br> <strong>e)</strong> a episiotomia, quando indicado.<br><br> <strong>§3º</strong> - É vedada a realização da manobra de kristeller.<br><br> <strong>Art. 11</strong> - A equipe responsável pelo parto deverá:<br><br> <strong>I</strong> - utilizar materiais descartáveis ou realizar desinfecção apropriada de materiais reutilizáveis;<br> <strong>II</strong> - utilizar luvas no exame vaginal, durante o nascimento do bebê e na dequitação da placenta;<br> <strong>III</strong> - esterilizar adequadamente o corte do cordão;<br> <strong>IV</strong> - examinar rotineiramente a placenta e as membranas;<br> <strong>V</strong> - monitorar cuidadosamente o progresso do trabalho de parto, fazendo uso do partograma recomendado pela Organização Mundial da Saúde - OMS;<br> <strong>VI</strong> - cuidar para que o recém-nascido não seja vítima de hipotermia.<br><br> <strong>§1º</strong> - Ressalvada a prescrição médica em contrário, durante o trabalho de parto, será permitido à parturiente:<br><br> <strong>a)</strong> manter liberdade de movimento durante o trabalho de parto;<br> <strong>b)</strong> escolher a posição física que lhe pareça mais confortável durante o trabalho de parto;<br> <strong>c)</strong> ingerir líquidos e alimentos leves.<br><br> <strong>§2º</strong> - Ressalvada prescrição médica em contrário, será favorecido o contato físico precoce entre a mãe e o recém-nascido após o nascimento, especialmente para fins de amamentação.<br><br> <strong>Art. 12</strong> - V E T A D O .<br><br> <strong>Art. 13</strong> - As despesas decorrentes da execução desta Lei correrão por conta de dotações orçamentárias próprias, suplementadas, se necessário.<br><br> <strong>Art. 14</strong> - Esta Lei entra em vigor 90 (noventa) dias após a sua publicação.<br> </p>',
                "multatexto": '<p>Não tem multa, porque cria obrigação para o Poder Público.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj 0800-0220008 (horário comercial).</br>'
            },
            {
                "id":"109",
                "numero": "7193-2016",
                "colorheader": "white",
                "categoria": "Saúde",
                "categoriaslug": "saude",
                "subcategoria": "Rede pública de saúde no Estado do Rio",
                "nomelei": "Presas grávidas não podem ser algemadas no parto",
                "nome": 'Durante o parto, presas não podem estar algemadas.',
                "dataLei":"07 de Janeiro de 2016",
                "descr1": 'Proibido o uso de algemas em presas grávidas durante o trabalho de parto ou no período de recuperação após o nascimento do bebê.',
                "html": '<h3>A Assembléia Legislativa do estado do Rio de Janeiro decreta:</h3><br/><p> <strong>Art. 1º</strong> - Fica proibido o uso de algemas, calcetas ou outro meio de contenção física, abusivo ou degradante, durante o trabalho de parto da presa ou interna e subsequente período de internação, em estabelecimento de saúde pública e privada, ressalvado o protocolo médico de contenção necessário.<br><br> <strong>Parágrafo único</strong> - As eventuais situações de perigo à integridade física da própria presa ou interna, ou de terceiros deverão ser abordadas mediante meios de contenção não coercitivos, a critério da respectiva equipe médica.<br><br> <strong>Art. 2º</strong> - Esta Lei entra em vigor na data da sua publicação.<br> </p>',
                "multatexto": '<p>Não tem multa, porque cria obrigação para o Poder Público.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj 0800-0220008 (horário comercial).</br>'
            },
            // COMPRAS - ROXO
            {
                "id":"69",
                "numero": "3735-2001",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Empresas em geral.",
                "nomelei": "Agendamento da entrega de produtos",
                "nome": "Produtos e serviços devem ser entregues com agendamento prévio, feito no ato da contratação, por dia e turno (manhã, tarde ou noite). Caso a 1ª entrega falhe, o fornecedor é obrigado a remarcar a 2ª entrega com hora específica.",
                "dataLei":"10 de outubro de 2001",
                "descr1": "A entrega de produtos e serviços ao consumidor deve ser agendada no ato da contratação. O agendamento pode ser por turno: manhã, tarde ou noite.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br>Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<ul></ul><b>Art. 1º -</b> Ficam os fornecedores de bens ou serviços localizados no Estado do Rio de Janeiro, sem prejuízo do disposto na Lei nº 3669/2001, autorizados a fixar por turnos os horários de entrega de produtos ou serviços aos consumidores.<br><br><b><s>Art. 2º -</s></b><s> Os fornecedores de bens ou serviços poderão estipular no ato da contratação o cumprimento das suas obrigações nos turnos da manhã, tarde ou noite.</s><br><br><b><s>§ 1º -</s></b><s> O turno da manhã abrange o período de 07:00 hs. às 12:00 hs.</s><br><br><b><s>§ 2º -</s></b><s> O turno da tarde abrange o período após às 12:00 hs. até 18:00 hs.</s><br><br><b><s>§ 3º -</s></b><s> O turno da noite abrange o período após às 18:00 hs. até às 23:00 hs.</s><br><br>*Art. 2º - Os fornecedores de bens ou serviços poderão estipular no ato da contratação o cumprimento das suas obrigações nos turnos da manhã, tarde ou noite.<br><br>§ 1º - O turno da manhã abrange o período de 07:00 h às 12:00 h<br><br>§ 2º - O turno da tarde abrange o período após às 12:00 h até 18:00 h.<br><br>§ 3º - O turno da noite abrange o período após às 18:00 h até às 23:00 h.<br><br>§ 4º &#8211; Quando a obrigação de que trata o presente artigo não for cumprida por responsabilidade do fornecedor de bens ou serviços, o mesmo ficará obrigado a reagendar a visita com hora certa, determinada pelo consumidor, sem prejuízo do disposto no artigo 3º da presente Lei.<br>* Nova redação dada pela Lei nº 6696/2014. </b></a><br><br><b>Art. 3º -</b> Mediante convenção especial entre as partes, em separado e de forma destacada, será possível a contratação da efetivação da entrega de qualquer mercadoria ou serviço no período após às 23:00 hs. até às 07:00 hs. <br><br><b>Art. 4º -</b> A não observância do dia e período designado para a prestação do serviço ou entrega do produto por parte do fornecedor o sujeitará à multa fixada na Lei nº 3669/2001. <br><br><b>Art. 5º -</b> Esta Lei entrará em vigor na data da sua publicação, revogadas as disposições em contrário.<ul></ul><div align="center">Rio de Janeiro,  18 de dezembro de 2001.<p><br><b>ANTHONY GAROTINHO</b><br>Governador do Estado</div><br><div class="separator"></div><p><b>Projeto de Lei nº</b> 2152/2001 <br/> Mensagem nº ---<br/> Autoria: SÉRGIO CABRAL<br/> Data de publicação: 17-10-2001<br/> Data Publ. partes vetadas ---<br/> Assunto: Consumidor, Prazo De Entrega<br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação: <br/> Norma atualizada pela lei 6696/2014, do deputado André Ceciliano.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 4.500 UFIR/RJ, acrescida de 100 UFIR por dia de atraso. (1 UFIR 2015=R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"71",
                "numero": "6501-2013",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Estabelecimentos comerciais em geral",
                "nomelei": "Cobrança por venda no cartão",
                "nome": "Comerciantes não podem cobrar a mais por vendas à vista em cartões de crédito ou débito",
                "dataLei":"15 de abril de 2014",
                "descr1": "Fica proibida aos estabelecimentos comerciais, no âmbito do Estado do Rio de Janeiro, a exigência de valor mínimo para compras e consumo com cartão de crédito ou débito.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Fica proibida aos estabelecimentos comerciais, no âmbito do Estado do Rio de Janeiro, a exigência de valor mínimo para compras e consumo com cartão de crédito ou débito.<strong>Art. 2º -</strong> O descumprimento ao que dispõe a presente Lei sujeitará o estabelecimento infrator às sanções estabelecidas pela Lei nº 8.078, de 11 de setembro de 1990 (Código de Defesa do Consumidor), em seu Artigo 56, aplicáveis na forma dos Artigos 57 a 60.<strong>Art. 3º -</strong> Esta Lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 15 de abril de 2014. <strong>Luiz Fernando de Souza</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 223/2011 <br/> Mensagem nº ---<br/> Autoria: ÁTILA NUNES<br/> Data de publicação: 16-04-2014<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"72",
                "numero": "6130-2011",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Shopping centers.",
                "nomelei": "Uso de banheiros em shoppings",
                "nome": "Proibido cobrança pelo uso de banheiros.",
                "dataLei":"28 de dezembro de 2011",
                "descr1": "Proibida a cobrança pelo uso de banheiro instalado nos shopping centers no Estado do Rio de Janeiro.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Fica proibida a cobrança pelo uso de banheiro instalado nos shopping centers no âmbito do Estado do Rio de Janeiro. <strong>Art. 2º -</strong> Fica vedada qualquer forma de discriminação em virtude de raça, cor, origem, condição social ou presença de deficiência ou doença não contagiosa por contato social na utilização dos banheiros de uso público instalados nos shopping centers localizados no Estado do Rio de Janeiro.<strong>Art. 3º -</strong> Os banheiros de uso público de que trata esta lei deverão ser mantidos limpos e seguros para utilização dos consumidores.<strong>Art. 4º -</strong> O descumprimento da presente Lei acarretará ao fornecedor multa no valor de 1000 UFIRs, a ser revertida para o Fundo especial de Apoio a Programas de Proteção e Defesa do Consumidor  FEPROCON, aplicada em dobro, ocorrendo reincidência e em caso de contribuinte, cassação da inscrição estadual.<strong>Art. 5º -</strong> Esta lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 28 de dezembro de 2011. <strong>Sergio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 223/2011 <br/> Mensagem nº ---<br/> Autoria: CORONEL JAIRO<br/> Data de publicação: 29-12-2011<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa no valor de 1000 UFIRs, (1 UFIR = R$ 2.7119 em valores de 2015). Esta será aplicada em dobro no caso de reincidência, podendo também sofrer cassação da inscrição estadual.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"73",
                "numero": "7048-15",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Todo Estado do Rio de Janeiro.",
                "nomelei": "Venda de armas de brinquedo",
                "nome": "Proibido fabricação, venda, posse ou distribuição de brinquedos que imite arma de fogo ou similar.",
                "dataLei":"24 de julho de 2015",
                "descr1": "É proibida a fabricação, venda, transporte ou distribuição de brinquedos que imitem armas de fogo e qualquer outro tipo de simulacro.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Esta Lei altera a Lei nº 2.403, de 24 de maio de 1995.<br/><br/><strong>Art. 2º -</strong> Fica alterada a ementa da Lei nº 2.403, de 24 de maio de 1995, que passa a ter a seguinte redação: <br/>EMENTA: VEDA A FABRICAÇÃO, A VENDA, A COMERCIALIZAÇÃO, O TRANSPORTE E A DISTRIBUIÇÃO DE BRINQUEDOS, RÉPLICAS OU SIMULACROS DE ARMAS DE FOGO, QUE COM ELAS POSSAM SE CONFUNDIR E INSTITUI A SEMANA DO DESARMAMENTO INFANTIL, NO ÂMBITO DO ESTADO DO RIO DE JANEIRO.<br/><br/><strong>Art. 3º -</strong> Fica alterado o art.1° da Lei nº 2.403, de 24 de maio de 1995, que passa a ter a seguinte redação: <br/><br/><strong>"Art. 1º -</strong> Ficam vedadas a fabricação, a venda, a comercialização, o transporte e a distribuição de brinquedo, réplicas ou simulacros de armas de fogo, que com elas possam se confundir, no âmbito do Estado do Rio de Janeiro.<br/><br/><strong>Parágrafo único -</strong> As vedações de que trata esta lei não se aplicam às armas utilizadas para a prática do paintball e do airsoft.<br/><br/><strong>Art. 4º -</strong> A Lei nº 2.403, de 24 de maio de 1995, passa a vigorar acrescida do Art. 1º-A, Art. 1º-B, Art. 1º-C, Art. 1º-D e Art. 1º-E:<br/><br/> <strong>"Art. 1º-</strong> A - Os proprietários e possuidores de brinquedo, réplicas ou simulacros de armas de fogo, ou que com elas possam se confundir, poderão entregá-las nas Delegacias de Polícia, mediante recibo de entrega, observando-se o mesmo procedimento definido às armas de fogo, no que couber.<br/>v<strong>Parágrafo único -</strong> Os brinquedos, réplicas ou simulacros, serão destruídos juntamente com as armas de fogo, observando-se o princípio da publicidade.<br/><br/><strong>"Art. 1º-B -</strong> As infrações ao art. 1º ficam sujeitas às seguintes sanções administrativas:<br/><br/><strong>I </strong> advertência por escrito;<br/><strong>II </strong> multa no valor de R$50.000,00 (cinquenta mil reais) a R$100.000,00 (cem mil reais);<br/><strong>III </strong> suspensão da inscrição no cadastro estadual de contribuintes por até trinta dias;<br/><strong>IV </strong> cassação da inscrição no cadastro estadual de contribuintes.Parágrafo único - As sanções previstas neste artigo não impedem a aplicação de sanções de natureza civil, penal ou outras decorrentes de normas específicas.<br/><br/><strong>Art. 1º-C -</strong> As sanções de que trata esta Lei serão impostas no processo administrativo competente, observando-se os princípios da ampla defesa e do contraditório, nos termos da Lei nº 5.427, de 01 de bril de 2009.<br/><br/><strong>Art. 1º-D -</strong> Caso a venda ou a comercialização seja feita a criança ou adolescente, o infrator ficará sujeito à multa em dobro dos valores previstos no Inciso II, do art. 1º-B, desta Lei.<br/><br/><strong>Art. 1º-E -</strong> Os estabelecimentos que comercializam brinquedos deverão deixar à vista dos clientes no seu interior o teor da presente Lei, inclusive sobre as sanções aplicáveis.<br/><br/><strong>Art. 5º -</strong> A Lei nº 2.403, de 24 de maio de 1995, passa a vigorar acrescida do Art. 2º-A:<br/><br/><strong>"Art. 2º-A -</strong> Para a consecução dos objetivos desta Lei, o Poder Executivo poderá realizar campanhas educativas com o intuito de difundir a importância de uma cultura de paz e não violência no Estado do Rio de Janeiro.<br/><br/><strong>Art. 6º -</strong> Fica alterado o art.3° da Lei nº 2.403, de 24 de maio de 1995, que passa a ter a seguinte redação: <br/><br/><strong>"Art. 3° -</strong> Esta Lei entra em vigor na data de sua publicação.<br/><br/><strong>Art. 7º -</strong> Fica incluída, no Calendário Oficial do Estado do Rio de Janeiro, a Semana do Desarmamento Infantojuvenil, a ser realizada na semana do dia 12 de outubro de cada ano, inclusive com a difusão de campanhas sobre a prevenção da violência.<br/><br/><strong>Art. 8º -</strong> O Anexo da Lei nº 5.645, de 06 de janeiro de 2010, passa a vigorar com a seguinte redação:CALENDÁRIO DATAS COMEMORATIVAS DO ESTADO DO RIO DE JANEIRO:<br/><br/>()<br/>OUTUBRO<br/>()<br/>SEMANA DO DIA 12 DE OUTUBRO  Semana do Desarmamento Infantojuvenil.<br/><br/><strong>Art. 9º -</strong> A presente Lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 24 de julho de 2015. <strong>Luiz Fernando de Souza</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 172/2015 <br/> Mensagem nº ---<br/> Autoria: MARTHA ROCHA<br/> Data de publicação: 27-07-2015<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Punição gradativa, vai de advertência a multa de R$ 100 mil.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"74",
                "numero": "2644-96",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Todo Estado do Rio de Janeiro.",
                "nomelei": "Símbolos nazistas",
                "nome": "Proibido fabricação, venda ou distribuição de cruzes suásticas e qualquer símbolo referente ao nazismo.",
                "dataLei":"07 de novembro de 1996",
                "descr1": "É proibida a fabricação, venda ou distribuição de cruzes suásticas, gamas ou qualquer outro símbolo do nazismo.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Ficam proibidas em todo o território estadual a fabricação, a comercialização, a distribuição ou veiculação das cruzes suásticas, gamadas ou qualquer outro símbolo, ou ainda qualquer representação gráfica do nazismo ou ideologia similar.<br/><br/><strong>Art. 2º -</strong> o descumprimento ao disposto nesta Lei sujeitará o infrator ás seguintes sanções:<br/><br/><strong>I -</strong> multa de 10.000 (dez mil UFERJs; em caso de reincidência a multa será cobrada em dobro;<br/><strong>II -</strong> apreensão de todo o material fabricado, comercializado, distribuído ou veiculado;<br/><strong>III -</strong> perda ou restrição de incentivos e benefícios fiscais de qualquer espécie concedidos pelo poder público estadual.<br/><br/><strong>Art. 3º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 07 de novembro de 1996. <strong>Marcello Alencar</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 522/95 <br/> Mensagem nº ---<br/> Autoria: ROBERTO DINAMITE<br/> Data de publicação: 08-11-1996<br/> Data Publ. partes vetadas ---<br/> Assunto: Proibição, Nazismo, Ideologia, Multa, Comercialização, Fabricação, Apreensão <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 10 mil UFERJs  ( 1 UFERJ = 44,2655 UFIR-RJ. 1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"75",
                "numero": "5936-11",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Açougues e supermercados.",
                "nomelei": "Informação de fornecedores em açougues",
                "nome": "Informações sobre produtos e frigoríficos fornecedores devem ser repassadas aos clientes.",
                "dataLei":"04 de abril de 2011",
                "descr1": "Açougues e supermercados devem disponibilizar informações sobre seus produtos e respectivos fornecedores.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Os açougues e supermercados ficam obrigados a expor, em local visível aos consumidores, o nome, telefone e endereço do frigorífico fornecedor do produto.<br/><br/><strong>Art. 2º -</strong> O não cumprimento desta lei acarretará as penas e multas prevista no Código de Defesa do Consumidor  Lei n° 8.078, de 11 de setembro de 1990  cujos valores monetários serão revertidos para o Fundo Especial de Apoio a Programas de Proteção e Defesa do Consumidor  FEPROCON.<br/><br/><strong>*Art. 2º -</strong> Aplicam-se os dispositivos dos artigos 1º e 2º da Lei nº 6.007, de 18 de julho de 2011, nos casos de descumprimento ao disposto na presente Lei, sem prejuízo da imediata apreensão do produto. (NR)<br/>* Nova redação dada pela Lei nº 6930/2014.<br/><br/><strong>* Art. 2º -</strong> A O Poder Executivo designará o órgão de sua administração direta para fiscalizar o cumprimento da presente Lei, sem prejuízo das atribuições dos demais órgãos e instituições do Sistema Nacional de Defesa do Consumidor (SNDC), em especial o Ministério Público e o Procon (Autarquia de Proteção e Defesa do Consumidor).<br/>*Incluído pela Lei nº 6930/2014.<br/><br/><strong>Art. 3º -</strong> Esta Lei entrará em vigor na data da sua publicação. <br/><br/> Rio de Janeiro, 04 de abril de 2011. <strong>Luiz Fernando de Souza</strong> Governador em exercício </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 2240-A/2009 <br/> Mensagem nº ---<br/> Autoria: WAGNER MONTES<br/> Data de publicação: 05-04-2011<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Punição vai de multa a cassação da licença do estabelecimento.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"76",
                "numero": "2300-94",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",	
                "subcategoria": "Supermercados e afins.",
                "nomelei": "Acessibilidade em supermercados",
                "nome": "Caixa com espaço mínimo de 90 cm de distância do outro para facilitar a passagem de cadeirantes.",
                "dataLei":"28 de julho de 1994",
                "descr1": "Determina a existência de caixas adaptados para portadores de deficiência, com espaço de, pelo menos, 90 centímetros entre as baias, para permitir a passagem de cadeirantes.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Os supermercados instalados no Estado deverão contar com 1 caixa especial para atendimento a deficientes físicos, de forma a facilitar os que usam cadeiras de roda. Este caixa deverá ser de uso exclusivo dos deficientes e terá 90 cm de largura.<br/><br/><strong>Art. 2º -</strong> Os caixas de que trata o art. 1º serão instalados em até 180 dias após a publicação da presente Lei. <br/><br/> Rio de Janeiro, 28 de julho de 1994. <strong>Nilo Batista</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1207/93 <br/> Mensagem nº ---<br/> Autoria: TUNINHO DUARTE<br/> Data de publicação: 29-07-1994<br/> Data Publ. partes vetadas ---<br/> Assunto: Deficiente Físico, Portador De Deficiência, Supermercado, Deficiente Físico <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Procon pode aplicar multa estabelecida no Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"77",
                "numero": "2486-95",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Supermercados e afins.",
                "nomelei": "Balanças em supermercados",
                "nome": "Disponibilização de, ao menos, duas balanças de precisão para os clientes.",
                "dataLei":"21 de dezembro de 1995",
                "descr1": "Supermercados devem oferecer, pelo menos, duas balanças de precisão para os clientes.",
                "html": '<p><strong>O GOVERNADOR DE ESTADO DO RIO DE JANEIRO,</strong><br/> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1º -</strong> Fica obrigatória a instalação de pelo menos 02 (duas) balanças de precisão nos supermercados para uso do consumidor, com a finalidade de ser conferido, pelo próprio, o peso das mercadorias previamente embaladas ou enlatadas.<br/><br/><strong>Art. 2º -</strong> No caso de açougues, padarias, abatedouros, feiras livres e estabelecimentos afins, que comercializem, também, mercadorias previamente embaladas, será obrigatória a permissão para que o consumidor confira o peso constante na embalagem.<br/><br/><strong>Art. 3º -</strong> O Poder Executivo, no prazo de 60 (sessenta) dias, indicará o Órgão Estadual competente para o fiel cumprimento da presente Lei, bem como estabelecer sanções.<br/><br/><strong>Art. 4º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário.<br/><br/> Rio de Janeiro, 21 de dezembro de 1995.<strong>MARCELLO ALENCAR</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 43-A/95 <br/> Mensagem nº ---<br/> Autoria: APARECIDA BOAVENTURA<br/> Data de publicação: 22-12-1995<br/> Data Publ. partes vetadas ---<br/> Assunto: Supermercado, Defesa Do Consumidor, Inmetro, Comércio, Comercialização, Controle De Qualidade, Embalagem <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Procon pode aplicar multa estabelecida no Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ. (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"78",
                "numero": "6878-14",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Restaurantes e praças de alimentação de shoppings.",
                "nomelei": "Lugares em praças de alimentação",
                "nome": "5% das mesas e cadeiras devem ser reservadas e identificadas para idosos, gestantes e deficientes.",
                "dataLei":"02 de setembro de 2014",
                "descr1": "Restaurantes e praças de alimentação de shoppings devem deixar 5% das mesas e cadeiras reservadas e identificados como assentos especiais para idosos, gestantes e pessoas com deficiência.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1º -</strong> Os shoppings centers e restaurantes, estabelecidos no Estado do Rio de Janeiro, mantidos pela iniciativa pública ou privada, deverão destinar, no mínimo, cinco por cento de seus lugares para uso preferencial de pessoas com deficiência, idosos e gestantes.<br/><br/><strong>Parágrafo Único -</strong> Os lugares reservados para o cumprimento ao disposto nesta Lei deverão ser identificados por avisos ou por alguma característica que os diferencie dos assentos destinados ao público em geral. <br/><br/><strong>Art. 2º -</strong> Os estabelecimentos alcançados pela presente Lei deverão, de igual forma, adaptar-se para o acesso e uso por pessoas com deficiência.<br/><br/><strong>§1º</strong> A adaptação referida no caput consubstancia-se na instalação de rampas ou de elevadores, de portas cuja largura comporte a passagem de cadeiras de rodas, e de aparelhos sanitários apropriados para o uso de pessoas com deficiência.<br/><br/><strong>§2º</strong> Estão desobrigados do cumprimento da presente Lei, total ou parcialmente, aqueles estabelecimentos que apresentarem laudo técnico firmado por profissional habilitado, comprovando a impossibilidade de adaptar-se para os fins previstos nesta Lei.<br/><br/><strong>§3º</strong> No caso previsto no parágrafo anterior, caberá ao Poder Executivo Estadual, através do órgão competente, verificar a veracidade das informações contidas no laudo técnico. <br/><br/><strong>Art. 3º - </strong>Esta Lei entra em vigor na data de sua publicação.<br/><br/> Rio de Janeiro, em 02 de setembro de 2014.<strong>LUIZ FERNANDO DE SOUZA</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 776-A/2011<br/> Mensagem nº ---<br/> Autoria: LUIZ MARTINS<br/> Data de publicação: 03-09-2014<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR <br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Procon pode aplicar multa estabelecida no Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ. (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>- Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)<br />- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"79",
                "numero": "6568-2013",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Estacionamentos privados em geral.",
                "nomelei": "Sinalização em estacionamentos",
                "nome": "Identificador eletrônico de vagas é obrigatório em estacionamento privado com mais de 100 vagas.",
                "dataLei":"29 de outubro de 2013",
                "descr1": "Estacionamentos pagos, com mais de 100 vagas, devem ter identificador eletrônico de vagas.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1º </strong>Torna obrigatória, no âmbito do Estado do Rio de Janeiro, a instalação e o funcionamento de identificador eletrônico de vagas nos estacionamentos pagos dos shoppings centers, centros comerciais, supermercados, hipermercados, edifícios garagem e rodoviárias.<br/><br/><strong>Parágrafo único.</strong> O identificador eletrônico de vagas de que trata o caput desse artigo deverá possibilitar a identificação das vagas de garagem desocupadas, bem como o setor e a localização das mesmas.<br/><br/><strong>Art. 2º </strong>As informações inerentes à disponibilidade de vagas e sua respectiva localização deverão ser fornecidas através de painel eletrônico situado nas entradas do estacionamento.<br/><br/><strong>Art 3º</strong> Aplicar-se-á o disposto nesta Lei somente nos estacionamentos que cobram por este serviço e com capacidade acima de 100 (cem) vagas.<br/><br/><strong>Art. 4º</strong> Os estabelecimentos elencados nesta Lei terão o prazo de 180 dias (cento e oitenta dias), a contar de sua publicação, para adequarem ao disposto nesta Lei.<br/><br/><strong>Art. 5º</strong> Esta Lei entra em vigor na data da sua publicação.<br/><br/>Assembléia Legislativa do Estado do Rio de Janeiro, em 29 de outubro de 2013.<strong>DEPUTADO PAULO MELO</strong> Presidente </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 1074/2011<br/> Mensagem nº ---<br/> Autoria: SAMUEL MALAFAIA<br/> Data de publicação: 30-10-2013<br/> Data Publ. partes vetadas ---<br/> Assunto: ---<br/> Tipo de Revogação: EM VIGOR <br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Procon pode aplicar multa estabelecida no Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ. (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>- Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)<br />- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"80",
                "numero": "6483-13",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Todo Estado do Rio de Janeiro.",
                "nomelei": "Discriminação e preconceito",
                "nome": "Práticas discriminatórias por motivo de raça, cor, etnia, religião e afins são passíveis de multa.",
                "dataLei":"04 de julho de 2013",
                "descr1": "Toda prática discriminatória por motivo de raça, cor, etnia, religião ou procedência nacional é passível de multa.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Esta Lei disciplina a aplicação das penalidades administrativas, motivadas pela prática de atos de discriminação racial.<br/><br/><strong>Art. 2º -</strong> Será punido, nos termos desta lei, todo ato discriminatório por motivo de raça, cor, etnia, religião ou procedência nacional praticado no Estado do Rio de Janeiro, por qualquer pessoa, jurídica ou física, inclusive a que exerça função pública.<br/><br/><strong>Art. 3º -</strong> Consideram-se atos discriminatórios por motivo de raça, cor, etnia, religião ou procedência nacional, para os efeitos desta lei:<br/><br/><strong>I -</strong> praticar qualquer tipo de ação violenta, constrangedora, intimidatória ou vexatória;<br/><strong>II -</strong> proibir o ingresso ou a permanência em ambiente ou estabelecimento aberto ao público;<br/><strong>III -</strong> criar embaraços à utilização das dependências comuns e áreas não-privativas de edifícios;<br/><strong>IV -</strong> recusar, retardar, impedir ou onerar a utilização de serviços, meios de transporte ou de comunicação, consumo de bens, hospedagem em hotéis, motéis, pensões e estabelecimentos congêneres ou o acesso a espetáculos artísticos ou culturais;<br/><strong>V -</strong> recusar, retardar, impedir ou onerar a locação, compra, aquisição, arrendamento ou empréstimo de bens móveis ou imóveis;<br/><strong>VI -</strong> praticar o empregador, ou seu preposto, atos de coação direta ou indireta sobre o empregado;<br/><strong>VII -</strong> negar emprego, demitir, impedir ou dificultar a ascensão em empresa pública ou privada, assim como impedir ou obstar o acesso a cargo ou função pública ou certame licitatório;<br/><strong>VIII -</strong> praticar, induzir ou incitar, pelos meios de comunicação, o preconceito ou a prática de qualquer conduta discriminatória;<br/><strong>IX -</strong> criar, comercializar, distribuir ou veicular símbolos, emblemas, ornamentos, distintivos ou propagandas que incitem ou induzam à discriminação;<br/><strong>X -</strong> recusar, retardar, impedir ou onerar a prestação de serviço de saúde, público ou privado.<br/><br/><strong>Art. 4º -</strong> A prática dos atos discriminatórios a que se refere esta lei será apurada em processo administrativo, que terá início mediante:<br/><br/><strong>I -</strong> reclamação do ofendido ou de seu representante legal, ou ainda de qualquer pessoa que tenha ciência do ato discriminatório;<br/><strong>II -</strong> ato ou ofício de autoridade competente.<br/><strong>Art. 5º -</strong> Aquele que for vítima da discriminação, seu representante legal, ou quem tenha presenciado os atos a que se refere o artigo 3º desta lei, poderá relatá-los à Órgão definido pelo Poder Executivo.<br/><br/><strong>§ 1º -</strong> O relato de que trata o caput deste artigo conterá:<br/>1 - a exposição do fato e suas circunstâncias;<br/>2 - a identificação do autor, com nome, prenome, número da cédula de identidade, seu endereço e assinatura.<br/><br/><strong>§ 2º -</strong> A critério do interessado, o relato poderá ser apresentado por meio eletrônico, no sítio de rede mundial de computadores do Órgão competente. <br/><strong>§ 3º -</strong> Recebida a denúncia, competirá ao Órgão Competente:<br/><strong>I -</strong> promover a instauração do processo administrativo devido para apuração e imposição das sanções cabíveis;<br/><strong>II </strong> transmitir notícia à autoridade policial competente, para a elucidação cabível, quando o fato descrito caracterizar infração penal.<br/><strong>Art. 6º -</strong> O Estado do Rio de Janeiro para cumprir o disposto nesta lei, poderá firmar convênios com Municípios.<br/><br/><strong>Art. 7º -</strong> As sanções aplicáveis aos que praticarem atos de discriminação nos termos desta lei serão as seguintes:<br/><br/><strong>I -</strong> advertência;<br/><strong>II -</strong> v multa de até 1000 (mil) UFIRŽS - Unidades Fiscais do Estado do Rio de Janeiro<br/><strong>III -</strong> multa de até 3000 (três mil) UFIRŽS - Unidades Fiscais do Estado do Rio de Janeiro, em caso de reincidência;<br/><strong>IV -</strong> suspensão da licença estadual para funcionamento por 30 (trinta) dias;<br/><strong>V -</strong> cassação da licença estadual para funcionamento.<br/><strong>§ 1º -</strong> Quando a infração for cometida por agente público, servidor público ou militar, no exercício de suas funções, sem prejuízo das sanções previstas nos incisos I a III deste artigo, serão aplicadas as penalidades disciplinares cominadas na legislação pertinente.<br/><strong>§ 2º -</strong> O valor da multa será fixado tendo-se em conta as condições pessoais e econômicas do infrator e não poderá ser inferior a 500 (quinhentas) UFIRŽS  Unidades Fiscais do Estado do Rio de Janeiro.<br/><strong>§ 3º -</strong> A multa poderá ser elevada até o triplo, quando se verificar que, em virtude da situação econômica do infrator, sua fixação em quantia inferior seria ineficaz.<br/><strong>§ 4º -</strong> Quando for imposta a pena prevista no inciso V deste artigo, deverá ser comunicada a autoridade responsável pela outorga da licença, que providenciará a sua execução, comunicando-se, igualmente, a autoridade federal ou municipal para eventuais providências no âmbito de sua competência.<br/><br/><strong>Art. 8º -</strong> Na apuração dos atos discriminatórios praticados com violação desta lei, deverão ser observados os procedimentos previstos na Lei nº 5.427, de 01 de abril de 2009, que regula o processo administrativo no âmbito da Administração Pública Estadual.<br/><br/><strong>Art. 9 -</strong> O Poder Executivo regulamentará a presente Lei.<br/><br/><strong>Art. 10 -</strong> Esta lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 04 de julho de 2013. <strong>Sérgio Cabral</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 3309/2010 <br/> Mensagem nº ---<br/> Autoria: GILBERTO PALMARES<br/> Data de publicação: 05-07-2013<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Punição vai de multa (mínimo de mil Ufir) a cassação da licença do estabelecimento.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>- Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
             {
                "id":"81",
                "numero": "3295-99",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Todos os meios de transporte e repartições públicas e privadas.",
                "nomelei": "Acesso para cães-guia",
                "nome": "Cães-guias de deficientes podem acessar qualquer meio de transporte e locais públicos e privados.",
                "dataLei":"16 de novembro de 1999",
                "descr1": "Portadores de deficiência visual podem ingressar e permanecer em qualquer meio de transporte e repartições públicas e privadas com seus cães-guias.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Os cães-guias quando acompanhados de pessoas portadoras de deficiência visual (cegueira e visão sub-normal), ou de treinador, ou acompanhante habilitado poderão ingressar e permanecer nas repartições públicas ou privadas, em qualquer meio de transporte, seja hidroviário, ferroviário, metroviário, de cooperativas, táxis ou afins, em todo e qualquer estabelecimento comercial, industrial, de serviços de promoção, proteção e recuperação de saúde e demais locais públicos.<br/><br/><strong>§ 1º -</strong> Para efeito desta Lei entende-se por:<br/><br/><strong>a) -</strong> CÃO GUIA - o cão-guia que tenha obtido certificado de uma Escola filiada e aceita pela Federação Internacional de Escolas de Cães-Guias para Cegos, que esteja a serviço de uma pessoa portadora de deficiência visual ou em estágio de treinamento.<br/><strong>b) -</strong> COOPERATIVAS - transportes autorizados, kombis, micro ônibus e afins ou qualquer outro transporte alternativo de que se faça necessária sua utilização.<br/><strong>c) -</strong> LOCAIS PÚBLICOS - hotéis, restaurantes, shoppings, lojas de diversão ou lazer e, de modo geral, todo e qualquer lugar aberto ao público, quer seja a título gratuito ou oneroso.<br/><br/><strong>§ 2º -</strong> Nos casos previstos no caput deste artigo, é vedada a cobrança de preço, tarifa ou acréscimo vinculado, direta ou indiretamente, ao ingresso ou presença do cão-guia.<br/><strong>§ 3º -</strong> Sem prejuízo do disposto neste artigo, o proprietário do cão-guia responde civil e criminalmente pelos danos ou lesões causadas pelo mesmo.<br/><br/><strong>Art. 2º -</strong> Toda e qualquer pessoa que pertencer, prestar serviços ou ser proprietário dos locais mencionados no caput do artigo anterior e que venham a impedir o ingresso e permanência da pessoa portadora de deficiência visual que necessite de cão-guia, estará atentando contra os direitos humanos e será passível de punição prevista em lei.<br/><br/><strong>Art. 3º -</strong> Os estabelecimentos comerciais e industriais, as repartições públicas ou privadas, bem como os meios de transportes mencionados no artigo 1º, em caso de discriminação ou não cumprimento de estabelecido nesta Lei serão punidos com penas de interdição, multas e outras penalidades previstas em lei.<br/><br/><strong>Art. 4º -</strong> A pessoa portadora de deficiência visual tem direito de manter pelo menos um cão-guia em sua residência e de transitar com o mesmo, seguro em coleira, nas áreas e dependências comuns do respectivo condomínio, independentemente de restrições à presença de animais na convenção do condomínio ou regimento interno.<br/><br/><strong>Art. 5º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 16 de novembro de 1999. <strong>Anthony Garotinho</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 2330/98 <br/> Mensagem nº ---<br/> Autoria: SOLANGE AMARAL, TANIA RODRIGUES<br/> Data de publicação: 24-11-1999<br/> Data Publ. partes vetadas ---<br/> Assunto: Cão, Portador De Deficiência, Deficiente Visual, Deficiente Físico, Animal, Transporte <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Penas vão de multa à interdição do estabelecimento que negar a entrada.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
             {
                "id":"82",
                "numero": "3559-01",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Escolas, hospitais e empresas em geral.",
                "nomelei": "Discriminação de soropositivos",
                "nome": "Estabelecimentos que discriminem portadores de HIV devem ser penalizados.",
                "dataLei":"15 de maio de 2001",
                "descr1": "Estabelecimentos (como escolas, hospitais e empresas em geral) que discriminem pessoas portadoras de HIV devem ser penalizados.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> A violação do princípio da igualdade de direitos prevista no Art. 9º, § 1º da Constituição do Estado do Rio de Janeiro, quando praticada por estabelecimentos que discriminem portadores do vírus HIV, sintomáticos e assintomáticos, constitui infração administrativa.<br/><br/><strong>Art. 2º -</strong> O Poder Executivo, através do seu órgão competente, penalizará todo estabelecimento comercial, industrial, entidades educacionais públicas e privadas, creches, hospitais, casas de saúde, clínicas, e associações civis ou prestadoras de serviços que, por atos de seus proprietários ou prepostos, discriminem portadores do vírus HIV, sintomáticos e assintomáticos.<br/><br/><strong>Art. 3º -</strong> Constituem infrações administrativas as ações que visem discriminar os portadores do vírus HIV, dentre outras :<br/><br/><strong>I </strong> A exigência do teste HIV no processo de seleção, para admissão ao emprego;<br/><strong>II </strong> A exigência do teste HIV para permanência no emprego, mediante ameaça de rescisão contratual;<br/><strong>III </strong> A exigência do teste HIV como condição de concurso público ou privado;<br/><strong>IV </strong> A exigência do teste HIV como condição de ingresso ou permanência em creches e estabelecimentos educacionais;<br/><strong>V </strong> A recusa em aceitar o ingresso ou permanência de alunos soropositivos em estabelecimentos educacionais e creches;<br/><strong>VI </strong> A recusa de atendimento a portadores de vírus HIV, sintomáticos e assintomáticos, em hospitais públicos e privados;<br/><strong>VII </strong> A recusa na manutenção do custeio do tratamento para os portadores do vírus HIV, e na autorização para exames complementares dos pacientes associados ou segurados dos planos de saúde;<br/><strong>VIII </strong> A demissão do soropositivo ou portador do HIV em razão de sua condição de portador do vírus HIV. <br/><br/><strong>Art. 4º -</strong> Consideram-se infratores desta Lei as pessoas que, direta ou indiretamente, tenham concorrido para o cometimento da infração administrativa.<br/><br/><strong>Art. 5º -</strong> Serão aplicadas as seguintes penalidades administrativas aos infratores :<br/><br/><strong>I </strong> Multa de 50 a 50.000 UFIRŽS, ou outra unidade que venha a substitui-la;<br/><strong>II </strong> Cassação de licença de funcionamento dos estabelecimentos infratores.<br/><br/><strong>Art. 6º -</strong> Constituem penas alternativas :<br/><br/><strong>I </strong> A promoção de campanha publicitária esclarecendo sobre os direitos dos soropositivos e portadores do HIV, de acordo com a legislação federal, estadual e municipal vigente;<br/><strong>II </strong> A confecção de material informativo sobre a prevenção e os cuidados da AIDS;<br/><strong>III </strong> A prestação de trabalhos em estabelecimentos de atenção aos portadores do vírus HIV.<br/><br/><strong>Art. 7º -</strong> Fica o Poder Executivo autorizado a criar o Fundo Estadual de Informação, Prevenção e Assistência da AIDS, para o qual reverterão as multas arrecadadas, que serão aplicadas em entidades que assistam aos portadores do vírus HIV.<br/><br/><strong>Parágrafo único </strong> A Comissão Estadual de AIDS, criada pela Resolução nº 700, de 3 de dezembro de 1991, administrará os recursos mencionados no caput deste artigo.<br/><br/><strong>Art. 8º -</strong> O poder de polícia será exercido pelo órgão estadual competente.<br/><br/><strong>Art. 9º -</strong> O descumprimento da presente Lei será apurado através de processo administrativo pelo órgão competente, com ampla defesa, independente das sanções civis e penais cabíveis, definidas em normas específicas.<br/><br/><strong>Art. 10 </strong> O Ministério Público fiscalizará a aplicação desta Lei, incumbindo-lhe a propositura das ações competentes.<br/><br/><strong>Art. 11 </strong> Todos os cidadãos podem comunicar às autoridades administrativas as infrações à presente Lei.<br/><br/><strong>Art. 12  </strong>O Poder Executivo deverá manter setor especializado para receber denúncias relacionadas às infrações à presente Lei.<br/><br/><strong>Art. 13 </strong> Fica o Poder Executivo autorizado a baixar as normas regulamentares ao presente projeto de Lei, no prazo de 60 (sessenta) dias após a sua publicação.<br/><br/><strong>Art. 14 </strong> Esta Lei entrará em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 15 de maio de 2001. <strong>Anthony Garotinho</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 54-A/99 <br/> Mensagem nº ---<br/> Autoria: CARLOS MINC<br/> Data de publicação: 24-05-2001<br/> Data Publ. partes vetadas ---<br/> Assunto: Hiv, Aids, Discriminação, Doente <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 50 a 50 mil UFIRs (1 UFIR 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br/\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"83",
                "numero": "1886-1991",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Empresas em geral.",
                "nomelei": "Discriminação sexual",
                "nome": "Proíbe exigência de testes para verificação de gravidez para admissão ou permanência no emprego.",
                "dataLei":"08 de novembro de 1991",
                "descr1": "Proíbe chantagem sexual, como exigência de teste de urina ou sangue para verificação de gravidez e comprovação de esterilização para admissão ou permanência no emprego.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Esta lei estabelece penalidades aos estabelecimentos localizados no Estado do Rio de Janeiro que discriminem mulheres, violando o princípio que adota a igualdade de direitos entre homens e mulheres de acordo com o § 1º do artigo 9º da Constituição Estadual, garantindo a proteção dos direitos individuais e coletivos.<br/><br/><span style="text-decoration:line-through;"><strong>Art. 2º -</strong> Dentro de sua competência, o Poder Executivo penalizará todo estabelecimento comercial, industrial, entidades, representações, associações, sociedades civis ou de prestações de serviços que, por atos de seus proprietários ou prepostos, discriminem mulheres em função de seu sexo, ou contra elas adotem atos de coação ou violência, tais como exigência ou tentativa de vantagem sexual da mulher por parte do patrão ou preposto, mediante ameaça de rescisão contratual.</span><br/><strong>*Art. 2º -</strong> Dentro de sua competência, o Poder Executivo penalizará todo estabelecimento comercial, industrial, entidades, representações, associações, sociedades civis ou de representação de serviços que, por atos de seus proprietários ou prepostos, discriminem pessoas em função do seu sexo, ou contra elas adotem atos de coação ou violência, tais como exigência ou tentativa de obter vantagem sexual por parte do superior hierárquico, independentemente do seu sexo e da sua opção sexual, com o objetivo de exigir favor sexual do subordinado, independentemente do seu sexo ou da sua opção sexual, sob ameaça ou efetivo prejuízo no trabalho ou perda do emprego.<br/><strong>* Nova redação dada pelo artigo 2º da Lei 3179/99 Controle de Leis</strong><br/><strong>Parágrafo Único -</strong> Considera-se como prática de restrição ao direito da mulher ao emprego, entre outras, a adoção de medidas não previstas na legislação pertinente e especialmente:<br/><br/><strong>I -</strong> Exigência ou solicitação de teste de urina ou sangue, para verificação de estado de gravidez, processos de seleção para admissão ao emprego;<br/><strong>II -</strong> Exigência ou solicitação de comprovação de esterelização, para admissão ou permanência no emprego;<br/><strong>III -</strong> Exigência de exame ginecológico periódico, como condição para permanência no emprego;<br/><strong>IV -</strong> Discriminação às mulheres casadas, ou mães, nos processos de seleção e treinamento ou rescisão de contrato de trabalho.<br/><br/><strong>Art. 3º -</strong> O descumprimento da presente Lei será apurado através de processo administrativo pelo órgão competente, independente das sanções civis e penais cabíveis, definidas em normas específicas.<br/><br/><strong>§ 1º -</strong> Aos infratores desta Lei serão aplicadas as seguintes penalidades administrativas:<br/><strong>I -</strong> advertência;<br/><strong>II -</strong> multa de 1 a 1000 UFERJs ou outra unidade que venha substituí-la;<br/><strong>III -</strong> VETADO.<br/><strong>IV -</strong> VETADO.<br/><strong>§ 2º -</strong> VETADO.<br/><strong>§ 3º -</strong> Considera-se infratora desta Lei a pessoa que direta ou indiretamente tenha concorrido para o cometimento da infração administrativa.<br/><br/><strong>Art. 4º -</strong> Todos os cidadãos podem comunicar às autoridades administrativas as infrações à presente Lei.<br/><br/><strong>Art. 5º -</strong> O Poder Executivo deverá manter setor especializado para receber denúncias relacionadas às infrações à presente Lei.<br/><br/><strong>Art. 6º -</strong> O Poder Executivo regulamentará a presente Lei em 60 (sessenta) dias, a partir de sua publicação.<br/><br/><strong>Art. 7º -</strong> Esta Lei entrará em vigor na data de sua publicação, revogadas as disposições em contrário. <br/><br/> Rio de Janeiro, 08 de novembro de 1991. <strong>Leonel Brizola</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 64/91 <br/> Mensagem nº ---<br/> Autoria: CARLOS MINC<br/> Data de publicação: 211-11-1991<br/> Data Publ. partes vetadas ---<br/> Assunto: Saúde, Violência, Assédio Sexual, Mulher <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa de 1 a mil UFERJs. (1 UFERJ = 44,2655 UFIR-RJ 1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br/\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"84",
                "numero": "7041-2015",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Estabelecimentos comerciais, industriais, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços.",
                "nomelei": "Discriminação de LGBTs",
                "nome": "Estabelecimentos que discriminem orientação sexual ou identidade de gênero podem ser punidos.",
                "dataLei":"15 de julho de 2015",
                "descr1": "Estabelecimentos comerciais, industriais, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços que discriminem as pessoas em razão de sua orientação sexual e identidade de gênero estão sujeitas a penalidades administrativas.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º</strong> - Esta Lei estabelece infrações administrativas a condutas discriminatórias motivadas por preconceito de sexo ou orientação sexual, praticadas por agentes públicos e estabelecimentos localizados no Estado do Rio de Janeiro, ou que discriminem pessoas em virtude de sua orientação sexual.<br><br> <strong>Parágrafo único</strong> - Para efeitos de aplicação desta Lei, o termo “sexo” é utilizado para distinguir homens e mulheres, enquanto o termo “orientação sexual” refere-se à heterossexualidade, à homossexualidade e à bissexualidade.<br><br> <strong>Art. 2º</strong> - O Poder Executivo, no âmbito de sua competência, penalizará estabelecimento público, comercial e industrial, entidades, representações, associações, fundações, sociedades civis ou de prestação de serviços que, por atos de seus proprietários ou prepostos, discriminem pessoas em função de preconceito de sexo e de orientação sexual ou contra elas adotem atos de coação, violência física ou verbal ou omissão de socorro.<br><br> <strong>Parágrafo único</strong> - Entende-se por discriminação:<br><br> <strong>I</strong> - recusar ou impedir o acesso ou a permanência ou negar atendimento nos locais previstos no Artigo 2º desta Lei bem como impedir a hospedagem em hotel, motel, pensão, estalagem ou qualquer estabelecimento similar;<br><br> <strong>II</strong> - impor tratamento diferenciado ou cobrar preço ou tarifa extra para ingresso ou permanência em recinto público ou particular aberto ao público;<br><br> <strong>III</strong> - impedir acesso ou recusar atendimento ou permanência em estabelecimentos esportivos, sociais, culturais, casas de diversões, clubes sociais, associações, fundações e similares;<br><br> <strong>IV</strong> - recusar, negar, impedir ou dificultar a inscrição ou ingresso de aluno em estabelecimento de ensino público ou privado de qualquer nível;<br><br> <strong>V</strong> - impedir, obstar ou dificultar o acesso de pessoas, devidamente habilitadas a qualquer cargo ou emprego da Administração direta ou indireta, bem como das concessionárias e permissionárias de serviços públicos;<br><br> <strong>VI</strong> – negar, obstar ou dificultar o acesso de pessoas, devidamente habilitadas a qualquer cargo ou emprego em empresa privada; <br><br> <strong>VII</strong> - impedir o acesso ou o uso de transportes públicos, como ônibus, metrô, trens, barcas, catamarãs, táxis, vans e similares;<br><br> <strong>VIII</strong> - negar o acesso, dificultar ou retroceder o atendimento em qualquer hospital, pronto socorro, ambulatório ou em qualquer estabelecimento similar de rede pública ou privada de saúde;<br><br> <strong>IX</strong> - praticar, induzir ou incitar pelos meios de comunicação social a discriminação, preconceito ou prática de atos de violência ou coação contra qualquer pessoa em virtude de preconceito de sexo e de orientação sexual;<br><br> <strong>X</strong> - obstar a visita íntima, à pessoa privada de liberdade, nacional ou estrangeiro, homem ou mulher, de cônjuge ou outro parceiro, no estabelecimento prisional onde estiver recolhido, em ambiente reservado, cuja privacidade e inviolabilidade sejam assegurados, obedecendo sempre, os parâmetros legais pertinentes à segurança do estabelecimento, nos termos das normas vigentes;<br><br> <strong>Art. 3º</strong> - Quando o agente público, no cumprimento de suas funções, praticar um ou mais atos descritos no art. 2º desta Lei, a sua responsabilidade será apurada por meio de procedimento administrativo disciplinar instaurado pelo órgão competente, sem prejuízo das sanções civis e penais cabíveis, definidas em normas específicas. <br><br> <strong>Art. 4º</strong> - A Administração Pública poderá aplicar aos infratores, sempre garantida à prévia e ampla defesa e observado a Lei estadual n.º 5.427 de 01 de abril de 2009 em especial o seu Capítulo XVIII, com as seguintes sanções:<br><br> <strong>I</strong> – advertência;<br> <strong>II</strong> – multa até o limite de 22.132 UFIR-RJ <br> <strong>III</strong> - suspensão da inscrição estadual por até 60 (sessenta) dias;<br> <strong>IV</strong> - cassação da inscrição estadual.<br><br> <strong>§1º</strong> - As sanções previstas nos incisos deste artigo serão aplicadas gradativamente com base na reincidência do infrator.<br><br> <strong>§2º</strong> - As multas de que trata o inciso II deste artigo, deverão ser fixadas de acordo com a gravidade do fato e da capacidade econômica do infrator.<br><br> <strong>Art. 5º</strong> - Caberá à Secretaria de Estado de Assistência Social e Direitos Humanos a aplicação das penalidades, podendo, inclusive editar os atos complementares pertinentes ao inciso II do artigo 4º desta Lei.<br><br> <strong>Art. 6º</strong> - Esta lei não se aplica às instituições religiosas, templos religiosos, locais de culto, casas paroquiais, seminários religiosos, liturgias, crença, pregações religiosas, publicações e manifestação pacífica de pensamento, fundada na liberdade de consciência, de expressão intelectual, artística, científica, profissional, de imprensa e de religião de que tratam os incisos IV, VI, IX e XIII do art. 5º da Constituição Federal.<br><br> <strong>Art. 7º</strong> - O Poder Executivo regulamentará a presente Lei em 60 (sessenta) dias a partir de sua publicação.<br><br> <strong>Art. 8º</strong> - Esta Lei entrará em vigor na data de sua publicação, revogada a <a href="http://alerjln1.alerj.rj.gov.br/CONTLEI.NSF/c8aa0900025feef6032564ec0060dfff/cdee250b14447c00032568ea006760e4?OpenDocument" class="lei-link">Lei 3.406, de 15 de maio de 2000</a>. </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O não cumprimento da lei pode acarretar em advertência, multa até o limite de 22.132 UFIR-RJ; Suspensão da inscrição estadual por até 60 dias; Cassação da inscrição estadual.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>As pessoas podem recorrer ao Alô Alerj 0800-0220008 (horário comercial), ou ao <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.riosemhomofobia.rj.gov.br\', \'_system\');\">Disque Cidadania LGBT</a>: 0800-0234567 </br></p><p>WhatsApp: (21) 98890-4742</p>'
            },
            {
                "id":"85",
                "numero": "6501-2013",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Estabelecimentos comerciais em geral.",
                "nomelei": "Valor mínimo para compras no cartão",
                "nome": "Proibido exigir valor mínimo para compras e consumo com cartão de crédito ou débito.",
                "dataLei":"15 de abril de 2014",
                "descr1": "Fica proibida aos estabelecimentos comerciais, no âmbito do Estado do Rio de Janeiro, a exigência de valor mínimo para compras e consumo com cartão de crédito ou débito.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> <strong>Art. 1º -</strong> Fica proibida aos estabelecimentos comerciais, no âmbito do Estado do Rio de Janeiro, a exigência de valor mínimo para compras e consumo com cartão de crédito ou débito.<strong>Art. 2º -</strong> O descumprimento ao que dispõe a presente Lei sujeitará o estabelecimento infrator às sanções estabelecidas pela Lei nº 8.078, de 11 de setembro de 1990 (Código de Defesa do Consumidor), em seu Artigo 56, aplicáveis na forma dos Artigos 57 a 60.<strong>Art. 3º -</strong> Esta Lei entra em vigor na data de sua publicação. <br/><br/> Rio de Janeiro, 15 de abril de 2014. <strong>Luiz Fernando de Souza</strong> Governador </p><div class="separator"></div><p><b>Projeto de Lei nº</b> 223/2011 <br/> Mensagem nº ---<br/> Autoria: ÁTILA NUNES<br/> Data de publicação: 16-04-2014<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"86",
                "numero": "6161-2012",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Sites de compras coletivas.",
                "nomelei": "Compras coletivas",
                "nome": "Sites de compras coletivas devem informar endereço da sede física. Cupons devem ter validade mínima de 3 meses, e, em caso de problemas, valor deve ser devolvido em até 72h.",
                "dataLei":"9 de janeiro de 2012",
                "descr1": "Fica proibida aos estabelecimentos comerciais, no âmbito do Estado do Rio de Janeiro, a exigência de valor mínimo para compras e consumo com cartão de crédito ou débito.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/> Art. 1º As empresas que exploram o comércio eletrônico de vendas coletivas, deverão manter serviço telefônico de atendimento ao consumidor, gratuito e de acordo com as normas do Decreto Federal nº 6523/2008.<br><br>Art. 2º As informações sobre a localização da sede física da empresa de vendas coletivas deverá constar na página eletrônica da mesma. <br><br>Art. 3º As ofertas deverão conter no mínimo, as seguintes informações:<br><br>I &#8211; Quantidade mínima de compradores para a liberação da oferta;<br><br>II &#8211; Prazo para a utilização da oferta por parte do comprador, que deverá ser de, no mínimo, 03 (três) meses;<br><br>III &#8211; Endereço e telefone da empresa responsável pela oferta;<br><br>IV &#8211; Em se tratando se alimentos, deverá constar da oferta informações acerca de eventuais complicações alérgicas e outras complicações que o produto pode causar;<br><br>V &#8211; Quando a oferta consistir em tratamentos estéticos ou assemelhados, deverá constar no anúncio as contra indicações para sua utilização; <br><br>VI &#8211; A informação acerca da quantidade de clientes que serão atendidos por dia e a forma de agendamento para a utilização da oferta por parte dos compradores;<br><br>VII &#8211; A quantidade máxima de cupons que poderão ser adquiridos por cliente, bem como o período do ano, os dias de semana e horários em que o cupom da oferta poderá ser utilizado;<br><br>Art. 4º Caso o número mínimo de participantes para a liberação da oferta não seja atingido, a devolução dos valores pagos deverá se realizada até 72 (setenta e duas) horas.<br><br>Art. 5º As informações sobre ofertas e promoções somente poderão ser enviadas a clientes pré-cadastrados através do sítio, contendo expressa autorização para o recebimento das informações em sua conta de correio eletrônico.<br><br>Art. 6º <b> </b><b>V E T A D O.</b><br><br>Art. 7º O descumprimento do contrato, cuja compra tenha sido concluída com sucesso pelos consumidores, gerará obrigações para a empresa de compras coletivas ou para a empresa responsável pela oferta do produto ou do serviço. <br><br>Art. 8º As empresas de que trata a presente Lei terão o prazo de 90 dias para se adequarem às suas determinações. <br><br>Art.9º Esta Lei entrará em vigor na data de sua publicação.<br><br><br>Rio de Janeiro, em 9 de janeiro de 2012.<br><br><b>SÉRGIO CABRAL</b><br>GOVERNADOR<br><div class="separator"></div><p><b>Projeto de Lei nº</b> 1062/2011 <br/> Mensagem nº ---<br/> Autoria: ANDRE CECILIANO, CIDINHA CAMPOS, WAGNER MONTES<br/> Data de publicação: 10/01/2012<br/> Data Publ. partes vetadas ---<br/> Assunto: --- <br/> Tipo de Revogação: EM VIGOR<br/> Texto da Revogação --- <br/> </p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"87",
                "numero": "2868-97",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Empresas que promovem vendas e serviços a crédito.",
                "nomelei": "Financiamento",
                "nome": "Empresas devem fornecer por escrito os motivos por negar pedidos de financiamento, bem como os recibos das taxas de levantamentos efetuados.",
                "dataLei":"9 de janeiro de 2012",
                "descr1": "",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/><strong>Art. 1º</strong> - Ficam as empresas comerciais, industriais e as prestadoras de serviço, inclusive as de natureza bancária, financeira e de crédito, sediadas no âmbito do Estado do Rio de Janeiro e que promovem vendas a crédito, serviços a crédito ou serviços de crédito, obrigadas a fornecer as razões das negativas ou indeferimentos de financiamentos, por escrito, em documento hábil, emitido em papel timbrado da empresa. Nova redação dada pela Lei nº 3887/2002.<br /><strong>Parágrafo único</strong> Em caso de descumprimento das determinações contidas nesta Lei, acarretará aos responsáveis da empresa infratora as penalidades do Código de Defesa do Consumidor  CDC. (NR)<br/>* Incluído pela Lei nº 5217/2008.</strong><strong>Art. 2º</strong> - No caso das empresas imobiliárias, ficam as mesmas obrigadas a fornecer recibo discriminado referente às taxas cobradas por levantamentos feitos sobre a vida pessoal dos pretendentes.<br/><strong>Art. 3º</strong> - O infrator da presente Lei estará sujeito a multa de 300 (trezentos) UFIR\'S por infração, revertido para o PROCON.<br/>* Incluído pela Lei nº 4937/2006.',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O infrator da presente Lei estará sujeito a multa de 300 (trezentos) UFIR\'S por infração, revertido para o PROCON.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://www.procon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"92",
                "numero": "7109-2015",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "",
                "nomelei": "Entregas em áreas de difícil acesso",
                "nome": "Correios e empresas de entrega são obrigadas a avisar ao consumidor no ato da contratação do serviço sobre eventuais restrições à entrega em locais de difícil acesso ou áreas de risco. Caso haja impossibilidade na entrega, a mercadoria deverá ser disponibilizada para retirada no ponto mais próximo ao consumidor.",
                "dataLei":"19 de novembro de 2015",
                "descr1": "Regulamenta o serviço de entrega de correspondência e mercadorias realizada por transportadoras ou empresas de entregas expressas no estado do Rio de Janeiro.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/><strong>Art. 1º</strong> - Sempre que houver restrição na entrega de correspondências e mercadorias, seja domiciliar ou no local designado pelo contratante, a transportadora ou empresa de entregas expressas deverá avisar ao consumidor no ato da contratação do serviço.<br/><br/><strong>§ 1º</strong> - Sempre que requisitado pelo consumidor, a restrição de que trata o caput deste artigo deverá ser justificada.<br/><br/><strong>§ 2º</strong> - A obrigação de que trata o caput deste artigo se aplica aos terceiros intermediários da contratação.<br/><br/><strong>Art. 2º</strong> - Em caso de impossibilidade de entrega residencial da mercadoria, esta deverá ser disponibilizada no estabelecimento pertencente à transportadora ou empresa de entrega expressa mais próxima ao endereço do consumidor.<br/><br/><strong>Art. 3º</strong> - O descumprimento ao disposto na presente Lei sujeitará o infrator às sanções dispostas no Código de Defesa do Consumidor, Lei Federal nº 8078, de 1990.<br/><br/><strong>Art. 4º</strong> - Esta Lei entra em vigor na data de sua publicação.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor, no valor mínimo de 200 UFIR-RJ. (1 UFIR-RJ 2015 = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"100",
                "numero": "7115-2015",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Hotéis.",
                "nomelei": "Multa para estabelecimento que proibir amamentação",
                "nome": "O estabelecimento que proibir ou constranger o ato da amamentação em suas instalações estará sujeito à multa. Independentemente da existência de áreas destinadas ao aleitamento no estabelecimento, a amamentação poderá ocorrer em qualquer local, mesmo onde seja proibido o consumo de alimentos, pois a amamentação é um ato livre entre mãe e filho.",
                "dataLei":"24 de novembro de 2015",
                "descr1": "Dispõe sobre o direito ao aleitamento materno no estado do Rio de Janeiro, e dá outras providências.",
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei: <br/><br/><strong>Art. 1°</strong> - Toda criança tem direito ao aleitamento materno, como recomenda a Organização Mundial da Saúde - OMS.<br/><br/><strong>Art. 2°</strong> - O estabelecimento situado no Estado do Rio de Janeiro, que proibir ou constranger o ato da amamentação em suas instalações, está sujeito à multa.<br/><br/><strong>Parágrafo único</strong> Independente da existência de áreas segregadas para o aleitamento, a amamentação é ato livre e discricionário entre mãe e filho e poderá ocorrer em qualquer local, mesmo onde seja proibido o consumo de alimentos.<br/><br/><strong>Art. 3º</strong> - Para fins desta Lei, estabelecimento é um local, que pode ser fechado ou aberto, destinado à atividade de comércio, cultural, recreativa, ou prestação de serviço público ou privado.<br/><br/><strong>Art. 4º</strong> - O estabelecimento que descumprir a presente lei será multado em 500 UFIRs (quinhentas Unidades Fiscais de Referência) e, em caso de reincidência a multa terá o valor 1000 UFIRs (mil Unidades Fiscais de Referência).<br/><br/><strong>Art. 5º</strong> - A execução da presente lei correrá por conta de dotações orçamentárias próprias, suplementadas se necessário.<br/><br/><strong>Art. 6º</strong> - O Poder Executivo regulamentará no que couber a presente lei.<br/><br/><strong>Art. 7º</strong> - Esta Lei entra em vigor na data de sua publicação.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>O estabelecimento que descumprir a norma será multado em 500 UFIRs. Em caso de reincidência, a multa terá o valor 1000 UFIRs. (UFIR = R$ 2,7119).</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</br> - WhatsApp : (21) 98890-4742</p>'
            },
            {
                "id":"105",
                "numero": "7165-2015",
                "colorheader": "white",
                "categoria": "Compras",
                "categoriaslug": "compras",
                "subcategoria": "Fornecedores de serviços.",
                "nomelei": "Alterações em contas com débito automático",
                "nome": 'Alterações em serviços cadastrados na modalidade débito automático devem ser comunicadas com 48h de antecedência.',
                "dataLei":"18 de dezembro de 2015",
                "descr1": 'Dispõe sobre a obrigatoriedade de informação ao consumidor, antecipadamente, sobre interrupção, cancelamento ou qualquer alteração de cobrança em débito automatico.',
                "html": '<h3>O Governador do Estado do Rio de Janeiro,</h3><br/><p> Faço saber que a Assembléia Legislativa do Estado do Rio de Janeiro decreta e eu sanciono a seguinte Lei:<br/><br/><strong>Art. 1°</strong> - Os fornecedores de serviços no Estado do Rio de Janeiro, ficam obrigados a comunicar ao consumidor cadastrado na modalidade de débito em conta, antecipadamente, sobre a interrupção, o cancelamento ou qualquer mudança do valor do serviço.<br/><br/><strong>§1º</strong> - A comunicação deverá ser enviada para o endereço ou para correio eletrônico indicado no contrato ou no cadastro realizado pelo fornecedor.<br/><br/><strong>§2º</strong> - A comunicação deverá conter a data, a hora, o motivo da interrupção, do cancelamento ou alteração do valor de fatura.<br/><br/><strong>§3º</strong> - O documento a que se refere o §1º, deverá ser enviado ao consumidor no mínimo 48 (quarenta oito) horas antes da interrupção, do cancelamento ou alteração do valor de fatura.<br/><br/><strong>Art 2º</strong> - O descumprimento do disposto nesta Lei, ensejará a aplicação das sanções previstas na Lei Federal nº 8.078, de 11 de setembro de 1990 – Código de Defesa do Consumidor.<br/><br/><strong>Art. 3º</strong> - Esta lei entra em vigor na data de sua publicação.</p>',
                "multatexto": '<h4>EM CASO DE NÃO CUMPRIMENTO:</h4> <p>Multa aplicada de acordo com o Código de Defesa do Consumidor.</p><div class="top-25"></div><h4>PRECISA DE MAIS INFORMAÇÕES?</h4> <p>Entre em contato com o Alô Alerj ou PROCON.</br> - Procon-RJ: ligue 151 (horário comercial) ou <a href=\"#\" class="lei-link" onclick=\"window.open(\'http://meuprocon.rj.gov.br\', \'_system\');\">acesse o site</a> (24h)</br> - Alô Alerj: 0800-0220008 (horário comercial)</p>'
            }                
            
        ]
    }
};
var totalresults = 0;

jQuery(document).ready(function($)
{
  //console.log("ready");
  //console.log(document.location.hostname);

  //www.facebook.com/sharer.php?u=http://projects.paulajbastos.com/#/cartao-2424-95

  	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
		   return null;
		}
		else{
		   return results[1] || 0;
		}
	}

	
	/*********************  

    NAVEGACAO *********************/
   
	$.address.change(function(event) 
	{

		goTo(); 

	});


	function goTo()
	{
		
		$("body").removeClass();
		
		var href = $.urlParam('page');
        if(href == "" || href === null ) href = "home";

		$(".navlink").removeClass("mm-selected");
		
		//console.log(href);
		var classBody = "page-home";
		var bgcolor = "";
		var bgCompartilhar = "";
		var btcolor = "";
		var btfechar = "";

		if(href == 'home' || href == '' ){
	
			$(".back").addClass("hide");
			$("#main-title").addClass("hide");
		}
		else{
			$('#h').hide();
			$(".back").removeClass("hide");
			$("#main-title").removeClass("hide");
			
		}

		if(href == 'busca'){
			$('#h').hide();
			classBody = 'page-busca';
			$(".page-title").html("Busca");

		}
		else
			$(".page-total").addClass("hide");

		
		var pageLeiUrl = href.substring(0, 4); //lei-
		
		var pageUrl = href;
		
		if(pageLeiUrl == "lei-"){
			pageUrl = "lei";
			classBody = 'page-lei';
		}else{
		}
		
		fullurl = pageUrl + ".html";

		$('body').addClass(classBody);

		var breads = null;
        // para o clipping, não faz o post abaixo
        if (!window.location.href.match(/\/clipping\//))
		$.post(fullurl,
		{
			"hashs":breads
			}, function(page) { 
			if(page != "") 
			{ 
				//alert('callback'+ page);

				/** CARREGA A PAGINA */
				//alert(page);
				$(".content").html(page);
				
				if($('body').hasClass('page-home')){

					// $(".header-home").show();
					$("#h > div").addClass("container");
					
					$('#h .logo-carteirada img').attr('src', "assets/images/logo_carteirada_g.png");

				}else{
					// $(".header-home").show();
					/*$('#h').css('position', "fixed");*/
					// $(".header-home").hide();
					// $("#h > div").removeClass("container");
					
					// $('#h .logo-carteirada img').attr('src', "assets/images/logo_carteirada_p.png");

					$(".back").click(function(event) { 
				       window.location = "?page=home"; 
				    });

				}
			  	if($('body').hasClass('page-lei'))
			  	{
			  		$.each(json.cartao.lei, function(i, v) 
			  		{
			  			var leID = href.substr('4');
						//console.log("PAGE LEI - " + leID);

						if(v.id == leID)
						{

							$('#lei-img-top').attr('src', "assets/images/lei-"+v.numero+".png");
							$('.icon-accord').addClass("icon-"+v.categoriaslug);

							$(".page-title").html(v.categoria); // esta oculto
							$('#sub-descr').html("ONDE SE APLICA: " + v.subcategoria);
							$('#lei-nome').html(v.nome);
							$('#lei-descr').html(v.descr1);
							var numero = v.numero.replace("-", "/");
							$('#lei-numero').html("Lei "+ numero+ ", de "+ v.dataLei); //trocar o - por /
							$('#lei-html').html(v.html);
							$('#cartao-multa').html(v.multatexto);
							
							var urlCompartilheFb = "http://www.carteiradadobem.com.br?page=lei-"+v.id;
							var urlCompartilheTw = "http://www.carteiradadobem.com.br?page=lei-"+v.id+"&text="+v.nome;
							var urlCompartilheWtapp = "http://www.carteiradadobem.com.br?page=lei-"+v.id;
							//$(".compartilhe-fb").attr('href',"http://www.facebook.com/sharer.php?u="+encodeURIComponent(urlCompartilheFb));
							
							var sTituloFacebook = v.nome;
							var sDescFacebook = v.descr1;
							var sImgFb = "http://www.carteiradadobem.com.br/imagens/"+v.categoriaslug+"/"+v.numero+".jpg";
							console.log(sImgFb);
							
							sURLFinal = "http://www.facebook.com/dialog/feed?app_id=1525309634450525"+
										"&link="+encodeURIComponent(urlCompartilheFb)+
										"&picture="+encodeURIComponent(sImgFb)+
										"&name="+encodeURIComponent(sTituloFacebook)+
										"&description="+encodeURIComponent(sDescFacebook)+
										"&redirect_uri="+encodeURIComponent(urlCompartilheFb);
							
							$(".compartilhe-fb").attr('href', sURLFinal);
							$(".compartilhe-tw").attr('href',"https://twitter.com/share?url="+encodeURIComponent(urlCompartilheTw));
							$(".compartilhe-whatpp").attr('href',"whatsapp://send?text="+encodeURIComponent(urlCompartilheWtapp));

							if(v.categoriaslug == "lazer"){
								bgcolor = "#217dac";
								bgCompartilhar = "#1c6a92";
								btcolor = "azul";
								btfechar = "#1a5877";
							}
							if(v.categoriaslug == "servicos"){
								bgcolor = "#ff5845";
								bgCompartilhar = "#d94b3b";
								btcolor = "vermelho";
								btfechar = "#bf4234";
							}
							if(v.categoriaslug == "transporte"){
								bgcolor = "#ffc95e";
								bgCompartilhar = "#e6b555";
								btcolor = "amarelo";
								btfechar = "#d3a64f";
							}
							if(v.categoriaslug == "saude"){
								bgcolor = "#39c3a2";
								bgCompartilhar = "#31a68a";
								btcolor = "verde";
								btfechar = "#2ea185";
							}	
							if(v.categoriaslug == "compras"){
								bgcolor = "#35293f";
								bgCompartilhar = "#2d2336";
								btcolor = "roxo";
								btfechar = "#281f30";
							}
						}
						
					});

					$('#main-title').css('color', "#FFFFFF");
					$('.page-title').css('color', "#FFFFFF");
					$('.page-total').css('color', "#FFFFFF");


					$('.content').css('background-color', bgcolor);

					$('#header').css('margin','0');
				}
				else if($('body').hasClass('page-busca'))
				{
					
					console.log("busca = " + getUrlParameter('search'));

					var wordsearch = getUrlParameter('search');
					$(".page-total").removeClass("hide");
					var total = 0;
					$.each(json.cartao.lei, function(i, v) 
					{
						var htmlString = removerAcentos(v.html.toLowerCase());
						var subcategoria = removerAcentos(v.subcategoria.toLowerCase());
						var nome = removerAcentos(v.nome.toLowerCase());
						var nomelei = removerAcentos(v.nomelei.toLowerCase());
						var wordSearchConverted = removerAcentos(wordsearch.toLowerCase());

							if (nome.search(wordSearchConverted) != -1 
								|| htmlString.search(wordSearchConverted) != -1 
								|| subcategoria.search(wordSearchConverted) != -1 
								|| nomelei.search(wordSearchConverted) != -1 )
							{				            //alert(v.numero);

							totalresults = totalresults + 1;
				            //total = (i+1);
				            //console.log("Achou = " +i+("vezez - ")+ wordsearch);
				           //console.log("busca cout = " + total);
							if(v.categoria == "Lazer")
				           		var bgC = "#217dac";

				           	if(v.categoria == "Serviços")
				           		var bgC = "#ff5845";

				           	if(v.categoria == "Transporte")
				           		var bgC = "#FFBE3E";

				           	if(v.categoria == "Saúde")
				           		var bgC = "#39c3a2";

				           	if(v.categoria == "Compras")
				           		var bgC = "#35293f";


				          $(".page-busca .list-categorias-result-leis").append("<div class='row "+v.categoriaslug+"'> <div class='item item"+(i+1)+"' style='background-color:"+bgC+"'> <a href='?page=lei-"+v.id+"'>"+v.nomelei+"</a> <div class='clear'></div></div></div>");

				            return;
				        }
				    });
					$(".page-total").html("total "+ "-");
					if (totalresults == 0) {
						$('.no-result').show();
						totalresults = 0;
					}
					

				}
				else{

					bgcolor = "#FFFFFF";
					$('#main-title').css('color', "#000000");
					$('.page-title').css('color', "#000000");
					$('.page-total').css('color', "#000000");
					$('.bt-menu span').css('background-color', "#000000");

					if($('body').hasClass('page-home') || window.location.href.match(/\/clipping\//))
					{

						var wordsearch = $('input[name="wordsearch"]');

						$("#frm-search").on('submit', function(event) { 
							event.preventDefault();
							var wordsearch = $("#wordsearch").val();
							if(wordsearch != "")
					      	{
								window.location = "/?page=busca&search="+wordsearch;
							}
                            return false;
						});

						$('#accordion .row').each(function(i, obj) 
						{
							//MONTA LAZER
							if($(this).find(".panel-collapse").attr('id') == "lazer")
							{
								json.cartao.lei.sort(SortByName);
								var j= 1;
								$.each(json.cartao.lei, function(i, v) 
						  		{

						  			if(v.categoriaslug == "lazer")
									{	
										//console.log(" teste = " + indice);
									
										$("#lazer").append("<div class='panel-body item"+j+"'><div class='lazer'><div class='item'><a href='?page=lei-"+v.id+"'>"+v.nomelei+"</a></div></div></div>");
										
										if(j== 2)
											j = 1;
										else
											j++;
									}
						  		});
							}

							//MONTA SERVICOS
							if($(this).find(".panel-collapse").attr('id') == "servicos")
							{
								var j= 1;
								$.each(json.cartao.lei, function(i, v) 
						  		{

						  			if(v.categoriaslug == "servicos")
									{	
										//console.log(" teste = " + indice);
									
										$("#servicos").append("<div class='panel-body item"+j+"'><div class='servicos'><div class='item'><a href='?page=lei-"+v.id+"'>"+v.nomelei+"</a></div></div></div>");
										
										if(j== 2)
											j = 1;
										else
											j++;
									}
						  		});
							}


							//MONTA TRANSPORTE
							if($(this).find(".panel-collapse").attr('id') == "transporte")
							{
								var j= 1;
								$.each(json.cartao.lei, function(i, v) 
						  		{

						  			if(v.categoriaslug == "transporte")
									{	
										//console.log(" teste = " + indice);
									
										$("#transporte").append("<div class='panel-body item"+j+"'><div class='transporte'><div class='item'><a href='?page=lei-"+v.id+"'>"+v.nomelei+"</a></div></div></div>");
										
										if(j== 2)
											j = 1;
										else
											j++;
									}
						  		});
							}

							//MONTA SAUDE
							if($(this).find(".panel-collapse").attr('id') == "saude")
							{
								var j= 1;
								$.each(json.cartao.lei, function(i, v) 
						  		{

						  			if(v.categoriaslug == "saude")
									{	
										//console.log(" teste = " + indice);
									
										$("#saude").append("<div class='panel-body item"+j+"'><div class='saude'><div class='item'><a href='?page=lei-"+v.id+"'>"+v.nomelei+"</a></div></div></div>");
										
										if(j== 2)
											j = 1;
										else
											j++;
									}
						  		});
							}

							//MONTA COMPRAS
							if($(this).find(".panel-collapse").attr('id') == "compras")
							{
								var j= 1;
								$.each(json.cartao.lei, function(i, v) 
						  		{

						  			if(v.categoriaslug == "compras")
									{	
										//console.log(" teste = " + indice);
									
										$("#compras").append("<div class='panel-body item"+j+"'><div class='compras'><div class='item'><a href='?page=lei-"+v.id+"'>"+v.nomelei+"</a></div></div></div>");
										
										if(j== 2)
											j = 1;
										else
											j++;
									}
						  		});
							}
						
						});

					}
				}					 
			}
		});
	}

});

$(document).ready(function(){

	$('#wordsearch').keypress(function(e){
		if(e.keyCode == 13){
			 window.location = "/?page=busca&search="+$(this).val();
		}

	});

   $('.bt-cadastrar').click(function(){

   		var email = $('#email').val();

   		if (validateEmail(email)){

			$.ajax({url: "http://estrategiamktdigital.com/alerj/newsletter.php?email=" + email, success: function(result){
			    alert('Obrigado por se cadastrar em nossa newsletter');
			}});   	

   		} else {

   			alert('Por favor, preencha com um email válido.');

   		}

   });


	$('.tweeter-count').click(function(){
		$('.twitter-follow-button').trigger("click");
		
	});

    (function() {
        var $wrap = $('body'),
            TIMEOUT = 300,
            $btn = $('.btn-menu');
        
        $wrap.append('<span class="overlay"></span>');
        
        $btn.click(function() {
            $(this).toggleClass('active');
            $('html').toggleClass('push');
            
            return false;
        });
        
        $(document).on('click', '.overlay', function() {
            $btn.click();
        });
        
    })();
    
    setTimeout(function(){
        $('[data-equal-height]').make_children_equal_height();
    }, 200);
    $(window).resize(function() { 
        $('[data-equal-height]').make_children_equal_height()
    });

    $('.clipping-modal').on('hidden.bs.modal', function() {
        $('iframe').each(function() {
            $(this).attr('src', $(this).attr('src'));
        });
    });

    $('.clipping-modal').on('shown.bs.modal', function() {
        var pid = $(this).attr('id').split('-')[1];
        $.post(cdb.ajaxurl, {
            'action': 'addview',
            'pid': pid
        });
    });

    if(window.location.href.match(/\/clipping\//))
    {
        var wordsearch = $('input[name="wordsearch"]');

        $("#frm-search").on('submit', function(event) { 
            event.preventDefault();
            var wordsearch = $("#wordsearch").val();
            if(wordsearch != "")
            {
                window.location = "/?page=busca&search="+wordsearch;
            }
            return false;
        });
    }

});

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function removerAcentos( newStringComAcento ) {
  var string = newStringComAcento;
	var mapaAcentosHex 	= {
		a : /[\xE0-\xE6]/g,
		e : /[\xE8-\xEB]/g,
		i : /[\xEC-\xEF]/g,
		o : /[\xF2-\xF6]/g,
		u : /[\xF9-\xFC]/g,
		c : /\xE7/g,
		n : /\xF1/g
	};

	for ( var letra in mapaAcentosHex ) {
		var expressaoRegular = mapaAcentosHex[letra];
		string = string.replace( expressaoRegular, letra );
	}

	return string;
}

function SortByName(a, b){
  var aName = removerAcentos(a.nomelei.toLowerCase());
  var bName = removerAcentos(b.nomelei.toLowerCase()); 
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}
