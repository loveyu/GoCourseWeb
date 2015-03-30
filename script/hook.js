
var Hook = (function(){

	var _queue = {};

	var addAction = function(name, action, priority){
		if(!_queue.hasOwnProperty(name)){
			_queue[name] = [];
		}
		_queue[name].push({
			action : action,
			priority : priority || 10
		});
		_queue[name].sort(_compare);
	};

	var doActions = function(name, arg){
		if(typeof arg=="undefined"){
			arg = null;
		}
		if (!_queue.hasOwnProperty(name)){
			return arg;
		}
		var actions = _queue[name];
		var args  = Array.prototype.slice.call(arguments, 0);
		if(args.length>2){
            args.shift();
		}
		for (var i in actions) {
            args.shift();
            args.unshift(arg);
			arg = actions[i].action.apply(this, args);
		}
		return arg;
	};

	var hasAction = function(name){
		return _queue.hasOwnProperty(name);
	};

	var removeAction = function(name){
		if (_queue.hasOwnProperty(name))
			_queue[name] = [];
	};


	var _compare = function(hook1, hook2){
		return hook1.priority < hook2.priority;
	};

	return {
		add : addAction,
		apply : doActions,
		has : hasAction,
		remove : removeAction
	};
})();