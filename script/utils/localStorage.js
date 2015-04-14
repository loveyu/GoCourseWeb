if (!('localStorage' in window)) {

    window.localStorage = (function() {
        var documentElement, isIE = !!document.all;

        if (isIE) {
            documentElement = document.documentElement;
            documentElement.addBehavior('#default#userdata');
        }

        return {
            setItem: function(key, value) {
                if (isIE) {
                    documentElement.setAttribute('value', value);
                    documentElement.save(key);
                }
                else {
                    window.globalStorage[location.hostname][key] = value;
                }
            },
            getItem: function(key) {
                if (isIE) {
                    documentElement.load(key);
                    return documentElement.getAttribute('value');
                }

                return window.globalStorage[location.hostname][key];
            },
            removeItem: function(key) {
                if (isIE) {
                    documentElement.removeAttribute('value');
                    documentElement.save(key);
                }
                else {
                    window.globalStorage[location.hostname].removeItem(key);
                }
            }
        };
    })();
}
