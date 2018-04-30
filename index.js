(function(){
  var settings;
  
  var inputs = document.querySelectorAll("input")
  var hash = document.getElementById("hash")
  var key = document.querySelector("#key")
  var tag = document.querySelector("#tag")
  var unmask = document.querySelector("#unmask")
  var unmasklabel = document.querySelector("#unmasklabel")
  var settings = document.querySelector("#settings")
  var options = document.querySelector("#options")
  var bump = document.querySelector("#bump")
  var hint = document.querySelector("#hint")
  
  function generateConfig(e) {
    var cfg = '';
    var elements = document.querySelectorAll("input");
    for(var i = 0, element; element = elements[i]; i++) {
      if(element.checked === true && element.id != 'unmask'){
        cfg += element.value;
      }
    }
    return cfg;
  }
  
  
  var notyf = new Notyf();
  function copyTextToClipboard() {
    if(!hash.value.length){
      return
    }
    // hash.select();
    if( document.execCommand('copy') ){
      notyf.confirm('Password copied to clipboard');
    }
    else{
      notyf.confirm('Unable to copy password to clipboard, press CTRL+C manually');
    }
  }

  function main() {
    
    var cfg = generateConfig()
    
    var num = cfg.replace( /^\D+/g, '');
    var elements = document.querySelectorAll("input");
    for(var i = 0, element; element = elements[i]; i++) { 
      if(typeof element.type !== 'undefined' && element.type == 'radio') {
        element.checked = element.value == num ? true : false;
      }
      else if (typeof element.type !== 'undefined' && element.type == 'checkbox' && element.id != 'unmask') {
        element.checked = cfg.indexOf(element.value) != -1 ? true : false;
      }
    }
    
    unmask.classList.remove('hidden');
    unmasklabel.classList.remove('hidden');
    
    bump.addEventListener('click', function(e){
      tag.value = PassHashCommon.bumpSiteTag(tag.value);
      hashChange()
    });
    unmask.addEventListener('click', function(e){
      if(this.checked) {
        key.setAttribute('type', 'text');
      }
      else {
        key.setAttribute('type', 'password');
      }
    });
    options.addEventListener('click', function(e){
      if(settings.classList.contains('hidden')){
        settings.classList.remove('hidden');
        options.value = 'Options <<';
      }
      else {
        settings.classList.add('hidden');
        options.value = 'Options >>';
      }
    });
    
    function hashChange(e){
      var cfg = generateConfig();
      var hashWordSize = cfg.replace( /^\D+/g, '');
      var requireDigit = ( cfg.indexOf('d') != -1 ? true : false );
      var requirePunctuation = ( cfg.indexOf('p') != -1 ? true : false );
      var requireMixedCase = ( cfg.indexOf('m') != -1 ? true : false );
      var restrictSpecial = ( cfg.indexOf('r') != -1 ? true : false ); 
      var restrictDigits = ( cfg.indexOf('g') != -1 ? true : false );
      var hashValue = ''
      var hintValue = '$$'
      if(key.value && tag.value) {
        hashValue = PassHashCommon.generateHashWord(tag.value, key.value, hashWordSize, requireDigit, requirePunctuation, requireMixedCase, restrictSpecial, restrictDigits);
      }
      if(key.value) {
        hintValue = PassHashCommon.generateHashWord(key.value, key.value, 2, true, false, true, false, false);
      }
      hint.innerText = hintValue
      hash.value = hashValue
    }
    function selectAll(){
      this.setSelectionRange(0, this.value.length)
    }
    
    Array.from(inputs).forEach(function(input){      
      input.addEventListener('input', hashChange);
      input.addEventListener('change', hashChange);
    })
    
    hash.addEventListener('click', selectAll)
    hash.addEventListener('focus', selectAll)
    
    hash.addEventListener('focus', copyTextToClipboard);
    
    key.type = 'password'
    
  }

  main()

})()
