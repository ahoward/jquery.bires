(function(namespace){


  // the hi-res image downloader object
  //
    var bires = {};

    bires.selector      = 'img.bires';
    bires.too_damn_slow = 420;
    bires.debug         = false;
    bires.debug_delay   = 420;


  // downloader class and factory method
  //
    bires.downloader = new Function();

    bires.download = function(){
      var args = Array.prototype.slice.apply(arguments);

      var downloader = new bires.downloader;

      downloader.initialize.apply(downloader, args);

      jQuery(function(){
        jQuery('body').imagesLoaded(
          function(){ downloader.download() }
        );
      });

      return(downloader);
    };

    bires.downloader.prototype.initialize = function(){
      var downloader = this;

      var args = Array.prototype.slice.apply(arguments);
      var options = {};

      var opts = ['selector', 'too_damn_slow', 'debug', 'debug_delay'];

      if(args.length == 1 && typeof(args[0]) == 'object'){
        options = args[0];
      } else {
        for(var i = 0; i < opts.length; i++){
          options[opts[i]] = args[i];
        }
      }

      jQuery.map(
        opts,
        function(o){ downloader[o] = options[o] || bires[o]; }
      );

      this.imgs = jQuery(this.selector);
      this.queue = jQuery.map(this.imgs, function(img){ return jQuery(img) });

      this.timer = new bires.timer();

      this.downloading = false;
    };

    bires.downloader.prototype.download = function(){
      var downloader = this;

      var img = this.queue.shift();

      if(!img){
        this.downloading = false;
        return(false);
      } else {
        if(!this.downloading){
          if(this.debug) this.imgs.css({'opacity' : 0.42});
          this.downloading = true;
        }
      }

      img.data('lores', img.attr('src'));

      var src = img.data('hires');

      this.timer.start();

      img.imagesLoaded(function(){ downloader.success(img) }); // via: https://github.com/desandro/imagesloaded

      this.log('downloading: ' + src);

      img.attr('src', src);
    };


    bires.downloader.prototype.success = function(img){
      var downloader = this;

      this.timer.stop();

      var src = img.attr('src');

      this.log('downloaded: ' + src);
      this.log('elapsed: ' + this.timer.elapsed());

      if(this.debug) img.css({'opacity' : 42});

      var not_too_damn_slow = this.timer.avg() < this.too_damn_slow;

      var more_images_to_load = this.queue.length > 0;

      var keep_downloading = (this.debug || (more_images_to_load && not_too_damn_slow));

      if(keep_downloading){
        if(this.debug){
          setTimeout( function(){ downloader.download() }, this.debug_delay);
        } else {
          this.download();
        }
      }
    };

    bires.downloader.prototype.log = function(string){
      //if(this.debug){
        try{ console.log(string) } catch(e){};
      //}
    };


  // simple interval timer class
  //
    bires.timer = function(){
      this.time = null;
      this.samples = [];
    };

    bires.timer.prototype.start = function(){
      this.time = (new Date()).getTime();
    };

    bires.timer.prototype.stop = function(){
      var now = (new Date()).getTime();

      var elapsed = now - this.time;
      this.samples.push(elapsed);

      this.time = null;
    };

    bires.timer.prototype.avg = function(){
      var total = 0;

      for(var i = 0; i < this.samples.length; i++){
        total += this.samples[i];
      }

      return(total / this.samples.length);
    };

    bires.timer.prototype.elapsed = function(){
      return(this.samples[this.samples.length - 1]);
    };


  // export bires into the provided namespace
  //
    (namespace || window).bires = bires;

})();
