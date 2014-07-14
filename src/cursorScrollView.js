CursorScrollView = function(options) {
	var Scrollview      = require("famous/views/Scrollview");
	var ViewSequence    = require('famous/core/ViewSequence');
	// ---------------------------------------------------------------------------
	function _CursorScrollView(options) {
		Scrollview.apply(this, arguments);

		if (options) {
			this.options = options;
		}
		else {
			this.options = {};
		}

		this.viewSequence = new ViewSequence();

		this.sequenceFrom(this.viewSequence);

		if (this.options.cursor) {
				this.setContent(this.options.cursor, this.options.itemPrototype);
		}

	}
	// ---------------------------------------------------------------------------
	_CursorScrollView.prototype = Object.create(Scrollview.prototype);
	_CursorScrollView.prototype.constructor = _CursorScrollView;
	// ---------------------------------------------------------------------------
	_CursorScrollView.prototype.setContent = function(cursor, prototype) {
		if (this.queryHandle) {
			this.queryHandle.stop();
		}

		this.viewSequence.splice(0, this.viewSequence._.array.length);

		this.options.cursor = cursor;

		this.options.itemPrototype = prototype;

		this.queryHandle = cursor.observe({
			addedAt: this.addedAt.bind(this),
			changedAt: this.changedAt.bind(this),
			removedAt: this.removedAt.bind(this),
			movedTo: this.movedTo.bind(this)
		});
	};
	// ---------------------------------------------------------------------------
	_CursorScrollView.prototype.each = function(callback, context) {
		_.each(this.viewSequence._.array, callback, context);
	};
	// ---------------------------------------------------------------------------
	_CursorScrollView.prototype.addItem = function(document, index) {
		var item = new this.options.itemPrototype({
			document: document
		});

		item.on("click", this.onItemClick.bind(this, item));
		item.pipe(this);

		this.viewSequence.push(item);
	};
	// ---------------------------------------------------------------------------
	_CursorScrollView.prototype.addedAt = function(document, atIndex, before) {
		this.addItem(document);
	};
	// ---------------------------------------------------------------------------
	_CursorScrollView.prototype.changedAt = function(newDocument, oldDocument, atIndex){

	};
	// ---------------------------------------------------------------------------
	_CursorScrollView.prototype.removedAt = function(oldDocument, atIndex){
		this.viewSequence.splice(atIndex, 1);
	};
	// ---------------------------------------------------------------------------
	_CursorScrollView.prototype.movedTo = function(document, fromIndex, toIndex, before){

	};
	// ---------------------------------------------------------------------------
	_CursorScrollView.prototype.onItemClick = function(item) {
		this._eventOutput.emit('clickItem', item.document);
	};
	// ---------------------------------------------------------------------------
	return new _CursorScrollView(options);
};
