CursorScrollView = function(options) {
	var Scrollview      = require("famous/views/Scrollview");
	var ViewSequence    = require('famous/core/ViewSequence');
	// ---------------------------------------------------------------------------
	function _CursorScrollView(options) {
		Scrollview.apply(this, arguments);

		this.options = options;

		this.viewSequence = new ViewSequence();

		// this.options.cursor.forEach(function(document, index, cursor){
		// 	this.addItem(document);
		// }, this);

		this.sequenceFrom(this.viewSequence);

		this.options.cursor.observe({
			addedAt: this.addedAt.bind(this),
			changedAt: this.changedAt.bind(this),
			removedAt: this.removedAt.bind(this),
			movedTo: this.movedTo.bind(this)
		});
	}
	// ---------------------------------------------------------------------------
	_CursorScrollView.prototype = Object.create(Scrollview.prototype);
	_CursorScrollView.prototype.constructor = _CursorScrollView;
	// ---------------------------------------------------------------------------
	_CursorScrollView.prototype.addItem = function(document, index) {
		var item = new this.options.itemPrototype({
			document: document
		});

		//listItem.on("click", this.onClick.bind(this, listItem.value));
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

	};
	// ---------------------------------------------------------------------------
	_CursorScrollView.prototype.movedTo = function(document, fromIndex, toIndex, before){

	};
	return new _CursorScrollView(options);
};
