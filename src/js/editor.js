
class Editor {

    constructor(element, options={
        position: "static",
        showToolbar: true,
        toolbar: {
            top: 0,
            options: [
                "h1",
                "h2",
                "h3",
                "paragraph",
                "bold",
                "italic",
                "underline",
                "link",
                "quote",
                "ordered",
                "unordered",
                "align-left",
                "align-center",
                "align-right",
                "justify",
                "decrease-indent",
                "increase-indent",
                "equation",
                "color"
            ]
        },
        placeholder: ""
    }){
        this.KEY_PRESS_BUFFER = [
            {key: '', newLine: false},
            {key: '', newLine: false},
            {key: '', newLine: false},
            {key: '', newLine: false},
            {key: '', newLine: false}
        ];
        this.LINK_RANGE;
        this.EQUATION_RANGE;
        this.ELEMENT = element;
        this.UUID = this.generateUUID();
        this.equationModal = false;
        this.linkModal = false;
        this.fixedFocus = false;
        this.colorModal = false;
        this.options = this.parseOptions(options);
        this.bubbleToolbarOpen = false;
        this.changeEvent = new CustomEvent('textchange', {
            bubbles: true,
            detail: {
                text: () => this.getText()
            }
        })
        this.initialiseToolbar(this.options);
        this.initialiseEditor(this.options);
        this.initialiseFloaters();
        this.editor = document.getElementById("editor-window-" + this.UUID);
    }

    parseOptions(options){
        var parsed = {};
        if (options.position == undefined){
            parsed["position"] = "static";
        } else {
            parsed["position"] = options.position;
        }
        if (options.showToolbar == undefined){
            parsed["showToolbar"] = true;
        } else {
            parsed["showToolbar"] = options.showToolbar;
        }
        if (options.toolbar == undefined){
            parsed["toolbar"] = {
                top: 0,
                options: [
                    "h1",
                    "h2",
                    "h3",
                    "paragraph",
                    "bold",
                    "italic",
                    "underline",
                    "link",
                    "quote",
                    "ordered",
                    "unordered",
                    "align-left",
                    "align-center",
                    "align-right",
                    "justify",
                    "decrease-indent",
                    "increase-indent",
                    "equation",
                    "color"
                ]
            };
        } else {
            parsed["toolbar"] = options.toolbar;
            if (options.toolbar.top == undefined){
                parsed.toolbar.top = 0;
            }
            if (options.toolbar.options == undefined){
                parsed.toolbar["options"] = [
                    "h1",
                    "h2",
                    "h3",
                    "paragraph",
                    "bold",
                    "italic",
                    "underline",
                    "link",
                    "quote",
                    "ordered",
                    "unordered",
                    "align-left",
                    "align-center",
                    "align-right",
                    "justify",
                    "decrease-indent",
                    "increase-indent",
                    "equation",
                    "color"
                ];
            }
        }
        if (options.placeholder == undefined){
            parsed.placeholder = "";
        } else {
            parsed.placeholder = options.placeholder;
        }
        return parsed;
    }

    generateUUID() {
        var d = new Date().getTime();
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;
            if(d > 0){
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    initH1Toolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "h1-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-h-1");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.h1();
        });
        return div;
    }

    initH2Toolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "h2-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-h-2");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.h2();
        });
        return div;
    }

    initH3Toolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "h3-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-h-3");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.h3();
        })
        return div;
    }

    initH4Toolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "h4-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-h-4");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.h4();
        });
        return div;
    }

    initH5Toolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "h5-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-h-5");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.h5();
        });
        return div;
    }

    initH6Toolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "h6-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-h-6");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.h6();
        });
        return div;
    }

    initParagraphToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "paragraph-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-paragraph");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.paragraph();
        });
        return div;
    }

    initBoldToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "bold-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-bold");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.bold();
        });
        return div;
    }

    initItalicToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "italic-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-italic");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.italic();
        });
        return div;
    }

    initUnderlineToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "underline-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-underline");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.underline();
        })
        return div;
    }

    initLinkToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "link-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-links-line");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.link();
        });
        return div;
    }

    initQuoteToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "quote-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-chat-quote-line");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.blockQuote();
        });
        return div;
    }

    initOrderedToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "order-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-list-ordered");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.order();
        });
        return div;

    }

    initUnOrderedToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "unordered-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-list-unordered");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.unordered();
        });
        return div;
    }

    initAlignLeftToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "align-left-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-align-left");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.justifyLeft();
        });
        return div;
    }

    initAlignCenterToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "align-center-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-align-center");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.justifyCenter();
        });
        return div;
    }

    initAlignRightToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "align-right-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-align-right");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.justifyRight();
        });
        return div;
    }

    initAlignJustifyToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "justify-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-align-justify");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.justify();
        });
        return div;
    }

    initDecreaseIndentToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "indent-decrease-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-indent-decrease");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.outdent();
        });
        return div;
    }

    initIncreaseIndentToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "indent-increase-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-indent-increase");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.indent();
        });
        return div;
    }

    initEquationToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        div.setAttribute("id", "equation-control-" + this.UUID);
        var i = document.createElement("i");
        i.setAttribute("class", "ri-functions");
        div.appendChild(i);
        div.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            this.equation();
        });
        return div;
    }

    initColorToolbar(){
        var div = document.createElement("div");
        div.setAttribute("class", "blue-orange-editor-control");
        var input = document.createElement("input");
        input.setAttribute("id", "color-control-input-" + this.UUID);
        input.setAttribute("class", "blue-orange-color-input");
        input.setAttribute("type", "color");
        input.addEventListener("change", () => {
            this.setColor();
        });
        input.addEventListener("blur", () => {
            this.setColor();
        });
        div.appendChild(input);
        div.addEventListener("mousedown", () => {
            this.colorModal = true;
        })
        return div;
    }

    initialiseStaticToolbar(options){
        var toolbar = document.createElement("div");
        toolbar.id = "blue-orange-editor-toolbar-" + this.UUID;
        toolbar.className = 'blue-orange-editor-controls';
        toolbar.style.top = options.toolbar.top;
        return toolbar;
    }

    initialiseBubbleToolbar(){
        var toolbar = document.createElement("div");
        toolbar.id = "blue-orange-editor-toolbar-" + this.UUID;
        toolbar.className = 'blue-orange-editor-controls-bubble shadow';
        return toolbar;
    }

    initialiseFixedToolbar(){
        var toolbar = document.createElement("div");
        toolbar.id = "blue-orange-editor-toolbar-" + this.UUID;
        toolbar.className = 'blue-orange-editor-controls-bubble shadow';
        return toolbar;
    }

    initialiseToolbar(options){
        if (options.showToolbar){
            var toolbar;
            if (options.position.toLowerCase() == "bubble"){
                toolbar = this.initialiseBubbleToolbar();
            } else if (options.position.toLowerCase() == "fixed"){
                toolbar = this.initialiseFixedToolbar()
            } else {
                toolbar = this.initialiseStaticToolbar(options);
            }
            for (var i =0; i < options.toolbar.options.length; i++){
                var option = options.toolbar.options[i];
                if (option.toLowerCase() == 'h1'){
                    toolbar.appendChild(this.initH1Toolbar());
                } else if (option.toLowerCase() == 'h2'){
                    toolbar.appendChild(this.initH2Toolbar());
                } else if (option.toLowerCase() == 'h3'){
                    toolbar.appendChild(this.initH3Toolbar());
                } else if (option.toLowerCase() == 'h4'){
                    toolbar.appendChild(this.initH4Toolbar());
                } else if (option.toLowerCase() == 'h5'){
                    toolbar.appendChild(this.initH5Toolbar());
                } else if (option.toLowerCase() == 'h6'){
                    toolbar.appendChild(this.initH6Toolbar());
                } else if (option.toLowerCase() == 'paragraph'){
                    toolbar.appendChild(this.initParagraphToolbar());
                } else if (option.toLowerCase() == 'bold'){
                    toolbar.appendChild(this.initBoldToolbar());
                } else if (option.toLowerCase() == 'italic'){
                    toolbar.appendChild(this.initItalicToolbar());
                } else if (option.toLowerCase() == 'underline'){
                    toolbar.appendChild(this.initUnderlineToolbar());
                } else if (option.toLowerCase() == 'link'){
                    toolbar.appendChild(this.initLinkToolbar());
                } else if (option.toLowerCase() == 'quote'){
                    toolbar.appendChild(this.initQuoteToolbar());
                } else if (option.toLowerCase() == 'ordered'){
                    toolbar.appendChild(this.initOrderedToolbar());
                } else if (option.toLowerCase() == 'unordered'){
                    toolbar.appendChild(this.initUnOrderedToolbar());
                } else if (option.toLowerCase() == 'align-left'){
                    toolbar.appendChild(this.initAlignLeftToolbar());
                } else if (option.toLowerCase() == 'align-center'){
                    toolbar.appendChild(this.initAlignCenterToolbar());
                } else if (option.toLowerCase() == 'align-right'){
                    toolbar.appendChild(this.initAlignRightToolbar());
                } else if (option.toLowerCase() == 'justify'){
                    toolbar.appendChild(this.initAlignJustifyToolbar());
                } else if (option.toLowerCase() == 'decrease-indent'){
                    toolbar.appendChild(this.initDecreaseIndentToolbar());
                } else if (option.toLowerCase() == 'increase-indent'){
                    toolbar.appendChild(this.initIncreaseIndentToolbar());
                } else if (option.toLowerCase() == 'equation'){
                    toolbar.appendChild(this.initEquationToolbar());
                } else if (option.toLowerCase() == 'color'){
                    toolbar.appendChild(this.initColorToolbar());
                }
            }
            this.ELEMENT.appendChild(toolbar);
        }
    }


    initialiseEditor(options){
        var editor = document.createElement("div");
        editor.setAttribute("id", "editor-window-" + this.UUID);
        editor.setAttribute("contenteditable", "true");
        editor.setAttribute("placeholder", options.placeholder);
        editor.className = "blue-orange-editor";
        editor.addEventListener("keydown", (ev) => {
            this.addKeyPress(ev.key, this.getNewLine());
            this.keyPressList();
            if (ev.key == "Tab" && ev.shiftKey){
                ev.preventDefault();
                this.outdent();
            } else if (ev.key == "Tab"){
                ev.preventDefault();
                this.indent();
            } else if (ev.key == "Enter"){
                if (document.queryCommandValue('formatBlock') === 'blockquote') {
                    ev.preventDefault();
                    document.execCommand("insertLineBreak");
                }
            } else if (ev.key == "Escape"){
                if (document.queryCommandValue('formatBlock') === 'blockquote') {
                    ev.preventDefault();
                    this.outdent();
                }
            }
        });
        editor.addEventListener("dblclick", (ev) => {
            var target = ev.target;
            var aClick = this.aDblClick(target);
            if (!aClick){
                this.katexDblClick(target);
            }
        });
        document.addEventListener("scroll", () => {
            if (this.linkModal){
                this.updateLinkFloater();
            }
            if (this.equationModal){
                this.updateEquationFloater();
            }
            if (this.fixedFocus){
                this.updateFixedToolbar();
            }
        })
        if (options.position.toLowerCase() == "bubble"){
            document.addEventListener("mouseup", (ev) => {
                var parent = document.getElementById("editor-window-" + this.UUID);
                var child = ev.target;
                if (this.isDescendantParent(parent, child)){
                    setTimeout(() => {
                        var text = window.getSelection().toString();
                        if (text != ""){
                            this.openBubbleToolbar();
                        } else {
                            this.closeBubbleToolbar();
                        }
                    }, 50);
                } else if (this.bubbleToolbarOpen) {
                    setTimeout(() => {
                        var text = window.getSelection().toString();
                        if (text == ""){
                            this.closeBubbleToolbar();
                        }
                    }, 50);
                }
            });
        }
        if (options.position.toLowerCase() == "fixed"){
            editor.addEventListener("focus", (ev) => {
                this.openFixedToolbar();
            });
            editor.addEventListener("blur", (ev) => {
                if (!this.colorModal){
                    this.closeFixedToolbar();
                }
            });
            editor.addEventListener("keypress", () => {
                if (options.position.toLowerCase() == "fixed"){
                    this.updateFixedToolbar();
                }
            });
        }
        editor.addEventListener("keyup", () => {
            this.dispatch();
        });
        editor.addEventListener("paste", (e) => {
            e.preventDefault();
            const text = e.clipboardData
                ? (e.originalEvent || e).clipboardData.getData('text/plain')
                : // For IE
                window.clipboardData
                    ? window.clipboardData.getData('Text')
                    : '';

            if (document.queryCommandSupported('insertText')) {
                document.execCommand('insertText', false, text);
            } else {
                const range = document.getSelection().getRangeAt(0);
                range.deleteContents();
                const textNode = document.createTextNode(text);
                range.insertNode(textNode);
                range.selectNodeContents(textNode);
                range.collapse(false);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        })
        this.ELEMENT.appendChild(editor);
    }

    generateLinkFloater(){
        var linkFloater = document.createElement("div");
        linkFloater.setAttribute("id", "blue-orange-editor-link-" + this.UUID);
        linkFloater.className = "blue-orange-editor-floater shadow";
        linkFloater.setAttribute("hidden", true);
        var linkFloaterInput = document.createElement("input");
        linkFloaterInput.setAttribute("id", "blue-orange-editor-link-input-" + this.UUID);
        linkFloaterInput.className = "blue-orange-editor-floater-input";
        linkFloaterInput.setAttribute("placeholder", "https://...");
        linkFloater.appendChild(linkFloaterInput);
        var linkFloaterCheck = document.createElement("div");
        var linkFloaterCheckIcon = document.createElement("i");
        linkFloaterCheckIcon.className = "ri-check-line";
        linkFloaterCheck.appendChild(linkFloaterCheckIcon);
        linkFloaterCheck.className = "blue-orange-editor-control";
        linkFloaterCheck.addEventListener("click", () => {
            this.addLink();
        });
        linkFloater.appendChild(linkFloaterCheck);
        var linkFloaterRemove = document.createElement("div");
        var linkFloaterRemoveIcon = document.createElement("i");
        linkFloaterRemoveIcon.className = "ri-close-line";
        linkFloaterRemove.appendChild(linkFloaterRemoveIcon);
        linkFloaterRemove.className = "blue-orange-editor-control";
        linkFloaterRemove.addEventListener("click", () => {
            this.removeLink();
        });
        linkFloater.appendChild(linkFloaterRemove);
        return linkFloater;
    }

    generateEquationFloater(){
        var equationFloater = document.createElement("div");
        equationFloater.setAttribute("id", "blue-orange-editor-equation-" + this.UUID);
        equationFloater.className = "blue-orange-editor-floater shadow";
        equationFloater.setAttribute("hidden", true);
        var equationFloaterInput = document.createElement("input");
        equationFloaterInput.setAttribute("id", "blue-orange-editor-equation-input-" + this.UUID);
        equationFloaterInput.className = "blue-orange-editor-floater-input";
        equationFloaterInput.setAttribute("placeholder", "f(x)");
        equationFloater.appendChild(equationFloaterInput);
        var equationFloaterCheck = document.createElement("div");
        var equationFloaterCheckIcon = document.createElement("i");
        equationFloaterCheckIcon.className = "ri-check-line";
        equationFloaterCheck.className = "blue-orange-editor-control";
        equationFloaterCheck.appendChild(equationFloaterCheckIcon);
        equationFloaterCheck.addEventListener("click", () => {
            this.addEquation();
        });
        equationFloater.appendChild(equationFloaterCheck);
        var equationFloaterRemove = document.createElement("div");
        var equationFloaterRemoveIcon = document.createElement("i");
        equationFloaterRemoveIcon.className = "ri-close-line";
        equationFloaterRemove.appendChild(equationFloaterRemoveIcon);
        equationFloaterRemove.className = "blue-orange-editor-control";
        equationFloaterRemove.addEventListener("click", () => {
            this.removeEquation();
        });
        equationFloater.appendChild(equationFloaterRemove);
        return equationFloater;
    }

    initialiseFloaters(){
        this.ELEMENT.appendChild(this.generateLinkFloater());
        this.ELEMENT.appendChild(this.generateEquationFloater());
    }

    h1(){
        document.execCommand('formatBlock', false, '<h1>');
        this.dispatch();
    }

    h2(){
        document.execCommand('formatBlock', false, '<h2>');
        this.dispatch();
    }

    h3(){
        document.execCommand('formatBlock', false, '<h3>');
        this.dispatch();
    }

    h4(){
        document.execCommand('formatBlock', false, '<h4>');
        this.dispatch();
    }

    h5(){
        document.execCommand('formatBlock', false, '<h5>');
        this.dispatch();
    }

    h6(){
        document.execCommand('formatBlock', false, '<h6>');
        this.dispatch();
    }

    bold(){
        document.execCommand('bold');
        this.dispatch();
    }

    italic(){
        document.execCommand('italic');
        this.dispatch();
    }

    underline(){
        document.execCommand('underline');
        this.dispatch();
    }

    justifyLeft(){
        var container = this.getSurroundingContainer();
        container.style.textAlign = "left";
        this.dispatch();
    }

    justifyCenter(){
        var container = this.getSurroundingContainer();
        container.style.textAlign = "center";
        this.dispatch();
    }

    justifyRight(){
        var container = this.getSurroundingContainer();
        container.style.textAlign = "right";
        this.dispatch();
    }

    justify(){
        var container = this.getSurroundingContainer();
        container.style.textAlign = "justify";
        this.dispatch();
    }

    unordered(){
        document.execCommand('insertUnorderedList');
        this.dispatch();
    }

    order(){
        document.execCommand('insertOrderedList');
        this.dispatch();
    }

    paragraph(){
        document.execCommand('formatBlock', false, 'div');
        this.dispatch();
    }

    blockQuote(){
        document.execCommand('formatBlock', false, '<blockquote>');
        this.dispatch();
    }

    indent(){
        document.execCommand('indent');
        this.dispatch();
    }

    outdent(){
        document.execCommand('outdent');
        this.dispatch();
    }

    setColor(){
        this.colorModal = false;
        var color = document.getElementById("color-control-input-" + this.UUID).value;
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('foreColor', false,  color);
        this.dispatch();
    }

    surroundElement(element){
        try{
            var sel = window.getSelection();
            if (sel.rangeCount) {
                var range = sel.getRangeAt(0).cloneRange();
                range.surroundContents(element);
                sel.removeAllRanges();
                sel.addRange(range);
            }
            if (window.getSelection().empty) {
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {
                window.getSelection().removeAllRanges();
            }
        } catch (e){
            var sel = window.getSelection();
            if (sel.rangeCount) {
                var range = sel.getRangeAt(0).cloneRange();
                element.appendChild(range.extractContents());
                range.insertNode(element);
            }
            if (window.getSelection().empty) {
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {
                window.getSelection().removeAllRanges();
            }
        }
    }

    insertNode(element){
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();
            element.appendChild(range.extractContents());
            range.insertNode(element);
        }
        if (window.getSelection().empty) {
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {
            window.getSelection().removeAllRanges();
        }
    }

    insertLinkFloater(){
        setTimeout(() => {
            this.linkModal = true;
        }, 500);
        var top = document.getElementById("blue-orange-editor-selection").getBoundingClientRect().top;
        var topPos = top - 52;
        var bottomPos = top + document.getElementById("blue-orange-editor-selection").offsetHeight + 10;
        var center = document.getElementById("blue-orange-editor-selection").getBoundingClientRect().left + (document.getElementById("blue-orange-editor-selection").offsetWidth / 2);
        var leftPos = Math.max(10, center - 175);
        var rightPos = leftPos + 350;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        if (rightPos > windowWidth){
            leftPos = Math.max((windowWidth / 2) - 175, 10)
        }
        var linkElement = document.getElementById("blue-orange-editor-link-" + this.UUID);
        linkElement.style.left = leftPos + "px";
        if (bottomPos + 42 > windowHeight - 50){
            linkElement.style.top = topPos + "px";
        } else {
            linkElement.style.top = bottomPos + "px";
        }
        linkElement.style.display = "flex";
        linkElement.setAttribute("class", "blue-orange-editor-floater shadow")
        document.getElementById("blue-orange-editor-link-input-" + this.UUID).value = "";
    }

    getCaretGlobalPosition(){
        const sel = document.getSelection();
        if( sel.rangeCount ){
            const r = sel.getRangeAt(0);
            const node = r.startContainer;
                const offset = r.startOffset;
                let rect,  r2;
            if (offset > 0) {
                r2 = document.createRange();
                r2.setStart(node, offset - 1);
                r2.setEnd(node, offset);
                rect = r2.getBoundingClientRect();
                return {left:rect.left, top:rect.top, bottom:rect.bottom, right: rect.right}
            } else if (offset == 0){
                r2 = document.createRange();
                r2.setStart(node, offset);
                r2.setEnd(node, offset);
                rect = r2.getBoundingClientRect();
                return {left:rect.left, top:rect.top, bottom:rect.bottom, right: rect.right}
            }
            if( node.getBoundingClientRect )
                return node.getBoundingClientRect()
        }
        return {left:-9999, top:-9999}
    }


    openBubbleToolbar(){
        this.bubbleToolbarOpen = true;
        var position = this.getCaretGlobalPosition();
        var editor = document.getElementById("editor-window-" + this.UUID);
        var editorTop = editor.getBoundingClientRect().top - 50;
        var editorLeft = editor.getBoundingClientRect().left;
        editorTop = Math.max(editorTop, 52);
        var toolbar = document.getElementById("blue-orange-editor-toolbar-" + this.UUID);
        toolbar.style.display = "flex";
        var top = position.top;
        var topPos = Math.max(top - 52, editorTop);
        var centerLeft = editorLeft - (toolbar.offsetWidth / 2);
        var center = (position.left + ((position.right - position.left) / 2)) - (toolbar.offsetWidth / 2);
        var leftPos = Math.max(10, Math.max(center , centerLeft));
        var rightPos = leftPos + toolbar.offsetWidth;
        var windowWidth = window.innerWidth;
        if (rightPos > windowWidth){
            leftPos = Math.max((windowWidth / 2) - 175, 10)
        }
        toolbar.style.left = leftPos + "px";
        toolbar.style.top = topPos + "px";
    }

    openFixedToolbar(){
        this.fixedFocus = true;
        var toolbar = document.getElementById("blue-orange-editor-toolbar-" + this.UUID);
        toolbar.style.display = "flex";
        this.updateFixedToolbar();
    }

    updateFixedToolbar(){
        var editor = document.getElementById("editor-window-" + this.UUID);
        var editorTop = editor.getBoundingClientRect().top - 50;
        var editorLeft = editor.getBoundingClientRect().left;
        var editorRight = editor.getBoundingClientRect().right;
        var editorCenter = editorLeft + ((editorRight - editorLeft) / 2);
        var toolbar = document.getElementById("blue-orange-editor-toolbar-" + this.UUID);
        var topPos = Math.max(editorTop, this.options.toolbar.top);
        var center = editorCenter - (toolbar.offsetWidth / 2);
        var leftPos = Math.max(10, center);
        var rightPos = leftPos + toolbar.offsetWidth;
        var windowWidth = window.innerWidth;
        if (rightPos > windowWidth){
            leftPos = Math.max((windowWidth / 2) - 175, 10)
        }
        toolbar.style.left = leftPos + "px";
        toolbar.style.top = topPos + "px";
    }

    closeBubbleToolbar(){
        this.bubbleToolbarOpen = false;
        var toolbar = document.getElementById("blue-orange-editor-toolbar-" + this.UUID);
        toolbar.style.display = "none";
    }

    closeFixedToolbar(){
        if (!this.linkModal && !this.equationModal){
            var toolbar = document.getElementById("blue-orange-editor-toolbar-" + this.UUID);
            toolbar.style.display = "none";
        }
    }

    updateLinkFloater(){
        var top = document.getElementById("blue-orange-editor-selection").getBoundingClientRect().top;
        var topPos = top - 52;
        var bottomPos = top + document.getElementById("blue-orange-editor-selection").offsetHeight + 10;
        var center = document.getElementById("blue-orange-editor-selection").getBoundingClientRect().left + (document.getElementById("blue-orange-editor-selection").offsetWidth / 2);
        var leftPos = Math.max(10, center - 175);
        var rightPos = leftPos + 350;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        if (rightPos > windowWidth){
            leftPos = Math.max((windowWidth / 2) - 175, 10)
        }
        var linkElement = document.getElementById("blue-orange-editor-link-" + this.UUID);
        linkElement.style.left = leftPos + "px";
        if (bottomPos + 42 > windowHeight - 50){
            linkElement.style.top = topPos + "px";
        } else {
            linkElement.style.top = bottomPos + "px";
        }
    }

    link(){
        if (window.getSelection) {
            var span = document.createElement("div");
            span.id = 'blue-orange-editor-selection';
            span.className = 'blue-orange-editor-selection';
            var sel = window.getSelection();
            if (sel.rangeCount) {
                this.LINK_RANGE = sel.getRangeAt(0).cloneRange();
            }
            this.surroundElement(span);
            this.insertLinkFloater();
        }
    }

    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

    removeLink(){
        this.linkModal = false;
        var elem = document.getElementById("blue-orange-editor-selection");
        var linkElement = document.getElementById("blue-orange-editor-link-" + this.UUID);
        linkElement.setAttribute("class", "blue-orange-editor-floater shadow")
        linkElement.style.display = "none";
        var innerHtml = elem.innerHTML;
        elem.outerHTML = innerHtml;
        this.dispatch();
        var sel = window.getSelection();
        sel.removeAllRanges();
        LINK_RANGE.setEnd(LINK_RANGE.startContainer, LINK_RANGE.startOffset + innerHtml.length);
        sel.addRange(LINK_RANGE);
    }

    addLink(){
        var text = document.getElementById("blue-orange-editor-link-input-" + this.UUID).value;
        var valid = this.validURL(text);
        if (valid){
            var a = document.createElement("a");
            a.setAttribute("href", text);
            var elem = document.getElementById("blue-orange-editor-selection");
            var linkElement = document.getElementById("blue-orange-editor-link-" + this.UUID);
            linkElement.toggleAttribute("hidden");
            linkElement.style.display = "none";
            var innerHtml = elem.innerHTML;
            if (innerHtml.endsWith(" ")){
                a.appendChild(document.createTextNode(innerHtml.trim()))
                elem.outerHTML = a.outerHTML + ' ';
            } else {
                a.appendChild(document.createTextNode(innerHtml))
                elem.outerHTML = a.outerHTML;
            }
            this.linkModal = false;
            this.dispatch();
            var sel = window.getSelection();
            sel.removeAllRanges();
            LINK_RANGE.setEnd(LINK_RANGE.startContainer, LINK_RANGE.startOffset + innerHtml.length);
            sel.addRange(LINK_RANGE);
        } else {
            var linkElement = document.getElementById("blue-orange-editor-link-" + this.UUID);
            linkElement.setAttribute("class", "blue-orange-editor-floater blue-orange-editor-floater-error shadow animate__animated animate__shakeX")
            setTimeout(() => {
                linkElement.setAttribute("class", "blue-orange-editor-floater blue-orange-editor-floater-error shadow")
            }, 1000);
        }
    }

    insertEquationFloater(){
        this.equationModal = true;
        var top = document.getElementById("blue-orange-editor-equation-selection").getBoundingClientRect().top;
        var topPos = top - 52;
        var bottomPos = top + document.getElementById("blue-orange-editor-equation-selection").offsetHeight + 10;
        var center = document.getElementById("blue-orange-editor-equation-selection").getBoundingClientRect().left + (document.getElementById("blue-orange-editor-equation-selection").offsetWidth / 2);
        var leftPos = Math.max(10, center - 175);
        var rightPos = leftPos + 350;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        if (rightPos > windowWidth){
            leftPos = Math.max((windowWidth / 2) - 175, 10)
        }
        var linkElement = document.getElementById("blue-orange-editor-equation-" + this.UUID);
        linkElement.style.left = leftPos + "px";
        if (bottomPos + 42 > windowHeight - 50){
            linkElement.style.top = topPos + "px";
        } else {
            linkElement.style.top = bottomPos + "px";
        }
        linkElement.style.display = "flex";
        linkElement.setAttribute("class", "blue-orange-editor-floater shadow")
        document.getElementById("blue-orange-editor-equation-input-" + this.UUID).value = "";
    }

    updateEquationFloater(){
        var top = document.getElementById("blue-orange-editor-equation-selection").getBoundingClientRect().top;
        var topPos = top - 52;
        var bottomPos = top + document.getElementById("blue-orange-editor-equation-selection").offsetHeight + 10;
        var center = document.getElementById("blue-orange-editor-equation-selection").getBoundingClientRect().left + (document.getElementById("blue-orange-editor-equation-selection").offsetWidth / 2);
        var leftPos = Math.max(10, center - 175);
        var rightPos = leftPos + 350;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        if (rightPos > windowWidth){
            leftPos = Math.max((windowWidth / 2) - 175, 10)
        }
        var linkElement = document.getElementById("blue-orange-editor-equation-" + this.UUID);
        linkElement.style.left = leftPos + "px";
        if (bottomPos + 42 > windowHeight - 50){
            linkElement.style.top = topPos + "px";
        } else {
            linkElement.style.top = bottomPos + "px";
        }
    }

    equation(){
        if (window.getSelection) {
            var eq = document.createElement("div");
            eq.id = 'blue-orange-editor-equation-selection';
            eq.className = 'blue-orange-editor-selection blue-orange-editor-equation';
            var eqSymbol = document.createElement("i");
            eqSymbol.setAttribute("class", "ri-functions");
            eq.appendChild(eqSymbol)
            eq.appendChild(document.createTextNode("New Equation"))
            var sel = window.getSelection();
            if (sel.rangeCount) {
                this.EQUATION_RANGE = sel.getRangeAt(0).cloneRange();
            }
            this.insertNode(eq);
            this.insertEquationFloater();
        }
    }

    removeEquation(){
        this.equationModal = false;
        var elem = document.getElementById("blue-orange-editor-equation-selection");
        var linkElement = document.getElementById("blue-orange-editor-equation-" + this.UUID);
        linkElement.setAttribute("class", "blue-orange-editor-floater shadow")
        linkElement.style.display = "none";
        elem.outerHTML = "";
        this.dispatch();
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(EQUATION_RANGE);
    }

    parseEquation(text){
        return katex.renderToString(text, {
            throwOnError: true
        });
    }

    addEquation(){
        var text = document.getElementById("blue-orange-editor-equation-input-" + this.UUID).value;
        try {
            var html = this.parseEquation(text);
            var divElement = document.createElement("span");
            divElement.setAttribute("class", "blue-orange-editor-equation-cont");
            divElement.setAttribute('contenteditable', 'false');
            var elem = document.getElementById("blue-orange-editor-equation-selection");
            var linkElement = document.getElementById("blue-orange-editor-equation-" + this.UUID);
            linkElement.toggleAttribute("hidden");
            linkElement.style.display = "none";
            divElement.innerHTML = html;
            elem.outerHTML = divElement.outerHTML + ' ';
            this.equationModal = false;
            this.dispatch();
            var sel = window.getSelection();
            sel.removeAllRanges();
            EQUATION_RANGE.setEnd(EQUATION_RANGE.startContainer, EQUATION_RANGE.startOffset + divElement.length);
            sel.addRange(EQUATION_RANGE);
        } catch (e) {
            var linkElement = document.getElementById("blue-orange-editor-equation-" + this.UUID);
            linkElement.setAttribute("class", "blue-orange-editor-floater blue-orange-editor-floater-error shadow animate__animated animate__shakeX")
            setTimeout(() => {
                linkElement.setAttribute("class", "blue-orange-editor-floater blue-orange-editor-floater-error shadow")
            }, 1000);
        }
    }

    addKeyPress(key, newLine){
        this.KEY_PRESS_BUFFER.splice(0, 0, {key: key, newLine: newLine})
        while (this.KEY_PRESS_BUFFER.length > 5){
            this.KEY_PRESS_BUFFER.splice(this.KEY_PRESS_BUFFER.length - 1, 1);
        }
    }

    getNewLine(){
        var sel = window.getSelection();
        var range = sel.getRangeAt(0).cloneRange();
        var startOffset = range.startOffset;
        var container = range.startContainer;
        var tagName = container.tagName;
        while(tagName == undefined || tagName.toLowerCase() != "div"){
            container = container.parentElement;
            tagName = container.tagName;
        }
        var starting = startOffset <= 0;
        var fe1 = container.isEqualNode(range.startContainer);
        var fe2 = container.childNodes[0] == null ? false : container.childNodes[0].isEqualNode(range.startContainer);
        var firstElement = fe1 || fe2;
        return starting && firstElement;
    }

    getSurroundingContainer(){
        var sel = window.getSelection();
        var range = sel.getRangeAt(0).cloneRange();
        var startOffset = range.startOffset;
        var container = range.startContainer;
        var tagName = container.tagName;
        while(tagName == undefined || tagName.toLowerCase() != "div"){
            container = container.parentElement;
            tagName = container.tagName;
        }
        return container;
    }

    isNumber(key){
        if (key == "1" || key == "2" || key == "3" || key == "4" || key == "5" || key == "6" || key == "7" || key == "8" || key == "9" || key == "0"){
            return true;
        }
        return false;
    }

    keyPressList(){
        if (this.KEY_PRESS_BUFFER.length >= 2){
            if (this.KEY_PRESS_BUFFER[1].key == '-' && this.KEY_PRESS_BUFFER[1].newLine && this.KEY_PRESS_BUFFER[0].key == " "){
                this.unordered();
                var sel = window.getSelection();
                var range = sel.getRangeAt(0).cloneRange();
                var container = range.startContainer;
                try{
                    container.nodeValue = container.nodeValue.substring(1, container.nodeValue.length);
                } catch(e){
                    container.nodeValue = "";
                }

            } else if (this.isNumber(this.KEY_PRESS_BUFFER[2].key == '1') && this.KEY_PRESS_BUFFER[2].newLine && this.KEY_PRESS_BUFFER[1].key == "." && this.KEY_PRESS_BUFFER[0].key == " "){
                this.order();
                var sel = window.getSelection();
                var range = sel.getRangeAt(0).cloneRange();
                var container = range.startContainer;
                try{
                    container.nodeValue = container.nodeValue.substring(2, container.nodeValue.length);
                } catch(e){
                    container.nodeValue = "";
                }
            }
        }
    }

    isDescendant(tagName, child){
        try{
            var node = child.parentNode;
            while (node != null){
                if (node.tagName.toLowerCase() === tagName.toLowerCase()){
                    return node;
                }
                node = node.parentNode;
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    isDescendantClassName(className, child){
        try{
            var node = child.parentNode;
            while (node != null){
                if (node.className.toLowerCase() === className.toLowerCase()){
                    return node;
                }
                node = node.parentNode;
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    isDescendantParent(parent, child){
        try{
            if (parent === child){
                return true;
            }
            var node = child.parentNode;
            while (node != null){
                if (node === parent){
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    aDblClick(target){
        if (target.tagName.toLowerCase() == 'a'){
            var href = target.getAttribute("href");
            var span = document.createElement("div");
            span.id = 'blue-orange-editor-selection';
            span.className = 'blue-orange-editor-selection';
            span.innerHTML = target.innerHTML;
            target.outerHTML = span.outerHTML;
            var elem = document.getElementById("blue-orange-editor-selection");
            var range = document.createRange();
            range.selectNodeContents(elem);
            this.LINK_RANGE = range;
            this.insertLinkFloater();
            document.getElementById("blue-orange-editor-link-input-" + this.UUID).value = href;
            return true;
        } else if (this.isDescendant('a', target) != null){
            var node = this.isDescendant('a', target);
            var href = node.getAttribute("href");
            var span = document.createElement("div");
            span.id = 'blue-orange-editor-selection';
            span.className = 'blue-orange-editor-selection';
            span.innerHTML = node.innerHTML;
            node.outerHTML = span.outerHTML;
            var elem = document.getElementById("blue-orange-editor-selection");
            var range = document.createRange();
            range.selectNodeContents(elem);
            this.LINK_RANGE = range;
            this.insertLinkFloater();
            document.getElementById("blue-orange-editor-link-input-" + this.UUID).value = href;
        }
        return false;
    }

    getChildClassName(className, node){
        var children = node.childNodes;
        for (var i = 0; i < children.length; i++){
            if (children[i].className.toLowerCase() == className.toLowerCase()){
                return children[i];
            }
        }
        return null;
    }

    getChildTagName(tagName, node){
        var children = node.childNodes;
        for (var i = 0; i < children.length; i++){
            if (children[i].tagName.toLowerCase() == tagName.toLowerCase()){
                return children[i];
            }
        }
        return null;
    }

    katexGetEquation(node){
        var katexMl = this.getChildClassName("katex-mathml", node);
        var katexMath = this.getChildTagName("math", katexMl);
        var semantics = this.getChildTagName("semantics", katexMath);
        var annotation = this.getChildTagName("annotation", semantics);
        return annotation.innerHTML;
    }

    katexDblClick(target){
        if (target.className.toLowerCase() == 'katex'){
            var equationTxt = this.katexGetEquation(target);
            var eq = document.createElement("div");
            eq.id = 'blue-orange-editor-equation-selection';
            eq.className = 'blue-orange-editor-selection blue-orange-editor-equation';
            var eqSymbol = document.createElement("i");
            eqSymbol.setAttribute("class", "ri-functions");
            eq.appendChild(eqSymbol)
            eq.appendChild(document.createTextNode("Edit Equation"))
            var equationCont = target.parentElement;
            equationCont.outerHTML = eq.outerHTML;
            var elem = document.getElementById("blue-orange-editor-equation-selection");
            var range = document.createRange();
            range.selectNodeContents(elem);
            this.EQUATION_RANGE = range;
            this.insertEquationFloater();
            document.getElementById("blue-orange-editor-equation-input-" + this.UUID).value = equationTxt;
        } else if (this.isDescendantClassName('katex', target) != null){
            var node = this.isDescendantClassName('katex', target);
            var equationTxt = this.katexGetEquation(node);
            var eq = document.createElement("div");
            eq.id = 'blue-orange-editor-equation-selection';
            eq.className = 'blue-orange-editor-selection blue-orange-editor-equation';
            var eqSymbol = document.createElement("i");
            eqSymbol.setAttribute("class", "ri-functions");
            eq.appendChild(eqSymbol)
            eq.appendChild(document.createTextNode("Edit Equation"))
            var equationCont = node.parentElement;
            equationCont.outerHTML = eq.outerHTML;
            var elem = document.getElementById("blue-orange-editor-equation-selection");
            var range = document.createRange();
            range.selectNodeContents(elem);
            this.EQUATION_RANGE = range;
            this.insertEquationFloater();
            document.getElementById("blue-orange-editor-equation-input-" + this.UUID).value = equationTxt;
        }
    }

    setText(text){
        document.getElementById("editor-window-" + this.UUID).innerHTML = text;
    }

    getText(){
        return document.getElementById("editor-window-" + this.UUID).innerHTML;
    }

    dispatch(){
        document.getElementById("editor-window-" + this.UUID).dispatchEvent(this.changeEvent);
    }

}
