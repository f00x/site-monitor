watcher = function () {

//    console.log(this.getSourcePath());
var th = this;
this.loadScriptLibrary(this.getSourcePath()+'/bower_components/f00x-js/f00x-3.1.0.js',function(){
    th.addEventClick()
});

}
watcher.prototype.currentUrl = false
watcher.prototype.getCurrentScriptUrl = function ()
{
    if (!this.currentUrl) {
        var ElementScrypt = document.querySelector('script[src*="click_watcher.js"]');
        this.currentUrl = ElementScrypt.getAttribute('src');
    }
    return this.currentUrl;
}
watcher.prototype.loadScriptLibrary = function (url, callBack)
{
    var newScript = document.createElement('script');
    newScript.setAttribute('type', "text/javascript");
    newScript.setAttribute('src', url)
    newScript.addEventListener('load', callBack)
    document.head.appendChild(newScript);
}
watcher.prototype.getSourcePath = function () {
    var urlScript = this.getCurrentScriptUrl();
    var arraySplit = urlScript.split('/');
    console.log(arraySplit);
    return arraySplit.slice(0, 1).join('/');
}
watcher.prototype.addEventClick = function () {
    var th =this
    window.addEventListener('click', function (event) {
        var DataEvent =
                {x: event.clientX,
                    y: event.clientY,
                    event_key: 'click',
                    domain_name: window.location.hostname

                }
        var swap=new f00x.swap();
        swap.url=th.getSourcePath()+'/api/site/event/register';
        swap.sendPostFromObject(DataEvent);
    });
}

window.addEventListener('load', function () {
    var watcherObject = new watcher();
})




