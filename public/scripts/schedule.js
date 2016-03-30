var Schedule = (function () {
    
    var 
        _legues = [],
        _template = function(idTemplate) {
            var source = $('#' + idTemplate).html();
            return Handlebars.compile(source);
        },
        _isOpen = false;
        
   
    function Schedule(el, trigger, opts) {
        this.el = el;
        this.trigger = trigger;
        this.options = $.extend( this.options, opts );
        
        _isOpen = this.el.classList.contains('js--open');
        
        this._fetch();
        this._bind();
    }
    
    Schedule.prototype._bind = function () {
        var _self = this;
        
        this.trigger.addEventListener(Modernizr.touch ? 'touchstart' : 'click', function (e) {
            e.preventDefault();
            
            if(_isOpen) {
                _self.el.classList.remove('js--open');
                _self.el.classList.add('js--close')
            }else {
                _self.el.classList.remove('js--close');
                _self.el.classList.add('js--open');
            }
            
            _isOpen = !_isOpen;
            
        }, false);
    }
    
    Schedule.prototype._fetch = function () {
        var _self = this;
        
        $.getJSON(this.options.url, function (schedule) {
            _schedule = schedule;
            _self._render();
        });
    }
    
    Schedule.prototype._render = function () {
        var markup = _template(this.options.template)(_schedule);
        this.el.innerHTML = markup;
                  
    }
    
    Schedule.prototype.constructor = Schedule;
    
    return Schedule;
})();

var s = new Schedule(document.getElementById('sche-root'),document.getElementById('sche-trigger'),{
    'url': 'http://localhost:3000/leagues',
    'template': 'schedule-template'
});